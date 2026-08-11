const SUPPORTED = { ucp: new Set(['ucp-current-m1']), ap2: new Set(['ap2-v0.2-m1']) };
const PRECEDENCE = { PASS: 0, WARN: 1, UNKNOWN: 2, BLOCK: 3 };

function result(invariant_id, status, reason_code, message, unknown_reason = null, details = {}) {
  return { invariant_id, status, unknown_reason, reason_code, message, evidence_ids: [], details };
}

function findObject(fixture, namespace, objectType) {
  return (fixture.objects || []).find(o => o?.source?.namespace === namespace && o?.source?.object_type === objectType) || null;
}

function unsupportedVersion(objects) {
  for (const o of objects.filter(Boolean)) {
    const versions = SUPPORTED[o.source?.namespace];
    if (!versions || !versions.has(o.source?.protocol_version)) return o;
  }
  return null;
}

function authoritativeTotal(checkout) {
  const totals = checkout?.raw?.totals;
  if (!Array.isArray(totals)) return null;
  const matches = totals.filter(t => t?.type === 'total' && Number.isInteger(t?.amount));
  return matches.length === 1 ? matches[0].amount : null;
}

function declaredTransformation(fixture) {
  const c = fixture?.context || {};
  return c.transformation || c.payment_transformation || c.fx || null;
}

function exactState(checkout, payment) {
  if (!checkout) return result('TP-CX-003','UNKNOWN','EXACT_AUTHORIZED_STATE_MISSING','Referenced UCP checkout artifact is unavailable.','MISSING_OBJECT');
  if (!payment) return result('TP-CX-003','UNKNOWN','PAYMENT_MANDATE_MISSING','AP2 payment mandate is unavailable.','MISSING_OBJECT');
  const unsupported = unsupportedVersion([checkout, payment]);
  if (unsupported) return result('TP-CX-003','UNKNOWN','UNSUPPORTED_PROTOCOL_VERSION',`Unsupported ${unsupported.source.namespace} profile ${unsupported.source.protocol_version}.`,'UNSUPPORTED_VERSION');
  const tx = payment.raw?.transaction_id;
  if (!tx) return result('TP-CX-003','UNKNOWN','EXACT_STATE_BINDING_MISSING','Payment mandate does not provide the exact-state binding reference.','MISSING_EVIDENCE');
  // M5 consumes the fixture/adaptor-declared binding semantics; cryptographic AP2 verification belongs to the adapter layer in M6.
  return result('TP-CX-003','PASS','EXACT_AUTHORIZED_STATE_ESTABLISHED','Exact authorized checkout state relation is available for evaluation.',null,{transaction_id:tx,checkout_external_id:checkout.external_id ?? null});
}

function currencyProjection(fixture, checkout, payment, prerequisite) {
  if (prerequisite.status !== 'PASS') return result('TP-CX-002','UNKNOWN','PREREQUISITE_NOT_PROVEN','Currency projection cannot be evaluated until the exact authorized state is established.',prerequisite.unknown_reason || 'MISSING_EVIDENCE');
  const transformation = declaredTransformation(fixture);
  if (transformation) return result('TP-CX-002','UNKNOWN','UNSUPPORTED_PAYMENT_TRANSFORMATION','Declared payment transformation is not modeled by the artifact profile.','UNSUPPORTED_TRANSFORMATION',{transformation});
  const uc = checkout?.raw?.currency;
  const pc = payment?.raw?.payment_amount?.currency;
  if (!uc || !pc) return result('TP-CX-002','UNKNOWN','CURRENCY_EVIDENCE_MISSING','Checkout or payment currency is missing.','MISSING_EVIDENCE');
  if (uc !== pc) return result('TP-CX-002','BLOCK','PAYMENT_CURRENCY_MISMATCH',`Approved payment currency ${pc} does not match authorized checkout currency ${uc}.`,null,{authorized_currency:uc,payment_currency:pc});
  return result('TP-CX-002','PASS','PAYMENT_CURRENCY_MATCH','Approved payment currency matches the authorized checkout currency.',null,{currency:uc});
}

function totalProjection(fixture, checkout, payment, prerequisite, currency) {
  if (prerequisite.status !== 'PASS') return result('TP-CX-001','UNKNOWN','PREREQUISITE_NOT_PROVEN','Total projection cannot be evaluated until the exact authorized state is established.',prerequisite.unknown_reason || 'MISSING_EVIDENCE');
  const transformation = declaredTransformation(fixture);
  if (transformation) return result('TP-CX-001','UNKNOWN','UNSUPPORTED_PAYMENT_TRANSFORMATION','Declared payment transformation is not modeled by the artifact profile.','UNSUPPORTED_TRANSFORMATION',{transformation});
  if (currency.status === 'BLOCK') return result('TP-CX-001','UNKNOWN','CURRENCY_MISMATCH_PREVENTS_AMOUNT_COMPARISON','Amount equality is not meaningful across mismatched currencies.','AMBIGUOUS_MAPPING');
  if (currency.status === 'UNKNOWN') return result('TP-CX-001','UNKNOWN','CURRENCY_NOT_PROVEN','Amount projection requires proven comparable currency.','MISSING_EVIDENCE');
  const total = authoritativeTotal(checkout);
  const amount = payment?.raw?.payment_amount?.amount;
  if (!Number.isInteger(total)) return result('TP-CX-001','UNKNOWN','AUTHORITATIVE_TOTAL_MISSING','Authoritative UCP grand total is missing or ambiguous.','MISSING_EVIDENCE');
  if (!Number.isInteger(amount)) return result('TP-CX-001','UNKNOWN','PAYMENT_AMOUNT_MISSING','AP2 approved payment amount is missing.','MISSING_EVIDENCE');
  if (total !== amount) return result('TP-CX-001','BLOCK','PAYMENT_TOTAL_MISMATCH',`Approved payment amount ${amount} does not match authorized checkout total ${total}.`,null,{authorized_total:total,payment_amount:amount});
  return result('TP-CX-001','PASS','PAYMENT_TOTAL_MATCH','Approved payment amount matches the authorized checkout grand total.',null,{amount:total});
}

export function aggregateDecision(results) {
  return results.reduce((best, r) => PRECEDENCE[r.status] > PRECEDENCE[best] ? r.status : best, 'PASS');
}

export function verifyFixture(fixture) {
  if (!fixture || typeof fixture !== 'object') throw new TypeError('fixture must be an object');
  const checkout = findObject(fixture,'ucp','checkout');
  const payment = findObject(fixture,'ap2','payment_mandate');
  const r3 = exactState(checkout,payment);
  const r2 = currencyProjection(fixture,checkout,payment,r3);
  const r1 = totalProjection(fixture,checkout,payment,r3,r2);
  const results = [r3,r2,r1];
  return { core_schema_version:'0.1', evaluation_id:`eval:${fixture.fixture_version || 'unknown'}:${Date.now()}`, results, decision:aggregateDecision(results) };
}
