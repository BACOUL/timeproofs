const FIXTURE_SUPPORTED = { ucp: new Set(['ucp-current-m1']), ap2: new Set(['ap2-v0.2-m1']) };
const PRODUCTION_SUPPORTED = { ucp: new Set(['2026-04-08']), ap2: new Set(['mandate.payment.1']) };
const PROVIDER_SUPPORTED = { stripe: new Set(['2026-02-25.clover']) };
const PRECEDENCE = { PASS: 0, WARN: 1, UNKNOWN: 2, BLOCK: 3 };
function result(invariant_id,status,reason_code,message,unknown_reason=null,details={}) { return {invariant_id,status,unknown_reason,reason_code,message,evidence_ids:[],details}; }
function findObject(f,n,t){ return (f.objects||[]).find(o=>o?.source?.namespace===n&&o?.source?.object_type===t)||null; }
function unsupportedVersion(objects,supported){ for(const o of objects.filter(Boolean)){const s=supported[o.source?.namespace];if(!s||!s.has(o.source?.protocol_version))return o;}return null; }
function authoritativeTotal(c){const t=c?.raw?.totals;if(!Array.isArray(t))return null;const m=t.filter(x=>x?.type==='total'&&Number.isInteger(x?.amount));return m.length===1?m[0].amount:null;}
function declaredTransformation(f){const c=f?.context||{};return c.declared_transformation||c.transformation||c.payment_transformation||c.fx||null;}
function exactState(c,p,{supported,strictBinding=false,context={}}={}){
  if(!c)return result('TP-CX-003','UNKNOWN','EXACT_AUTHORIZED_STATE_MISSING','Referenced UCP checkout artifact is unavailable.','MISSING_OBJECT');
  if(!p)return result('TP-CX-003','UNKNOWN','PAYMENT_MANDATE_MISSING','AP2 payment mandate is unavailable.','MISSING_OBJECT');
  const u=unsupportedVersion([c,p],supported);if(u)return result('TP-CX-003','UNKNOWN','UNSUPPORTED_PROTOCOL_VERSION',`Unsupported ${u.source.namespace} profile ${u.source.protocol_version}.`,'UNSUPPORTED_VERSION');
  const tx=p.raw?.transaction_id;if(!tx)return result('TP-CX-003','UNKNOWN','EXACT_STATE_BINDING_MISSING','Payment mandate does not provide the exact-state binding reference.','MISSING_EVIDENCE');
  if(strictBinding){
    const binding=context?.binding_verification;
    if(!binding)return result('TP-CX-003','UNKNOWN','EXACT_STATE_BINDING_UNVERIFIED','Exact-state cryptographic binding has not been verified.','INTEGRITY_UNVERIFIED');
    if(binding.status==='mismatch')return result('TP-CX-003','BLOCK','EXACT_STATE_BINDING_MISMATCH','Payment mandate transaction_id does not match the supplied checkout JWT hash.',null,{expected:binding.expected,observed:tx});
    if(binding.status!=='verified')return result('TP-CX-003','UNKNOWN','EXACT_STATE_BINDING_UNVERIFIED','Exact-state binding evidence is incomplete.','INTEGRITY_UNVERIFIED');
  }
  return result('TP-CX-003','PASS','EXACT_AUTHORIZED_STATE_ESTABLISHED','Exact authorized checkout state relation is available for evaluation.',null,{transaction_id:tx,checkout_external_id:c.external_id??null});
}
function dependentUnknown(id,pre,message){return result(id,'UNKNOWN','PREREQUISITE_NOT_PROVEN',message,pre.unknown_reason||'MISSING_EVIDENCE');}
function currencyProjection(f,c,p,pre){if(pre.status!=='PASS')return dependentUnknown('TP-CX-002',pre,'Currency projection cannot be evaluated until exact authorized state is established.');const tr=declaredTransformation(f);if(tr)return result('TP-CX-002','UNKNOWN','UNSUPPORTED_PAYMENT_TRANSFORMATION','Declared payment transformation is not modeled.','UNSUPPORTED_TRANSFORMATION',{transformation:tr});const uc=c?.raw?.currency,pc=p?.raw?.payment_amount?.currency;if(!uc||!pc)return result('TP-CX-002','UNKNOWN','CURRENCY_EVIDENCE_MISSING','Checkout or payment currency is missing.','MISSING_EVIDENCE');if(uc!==pc)return result('TP-CX-002','BLOCK','PAYMENT_CURRENCY_MISMATCH',`Approved payment currency ${pc} does not match authorized checkout currency ${uc}.`,null,{authorized_currency:uc,payment_currency:pc});return result('TP-CX-002','PASS','PAYMENT_CURRENCY_MATCH','Approved payment currency matches authorized checkout currency.',null,{currency:uc});}
function totalProjection(f,c,p,pre,currency){if(pre.status!=='PASS')return dependentUnknown('TP-CX-001',pre,'Total projection cannot be evaluated until exact authorized state is established.');const tr=declaredTransformation(f);if(tr)return result('TP-CX-001','UNKNOWN','UNSUPPORTED_PAYMENT_TRANSFORMATION','Declared payment transformation is not modeled.','UNSUPPORTED_TRANSFORMATION',{transformation:tr});if(currency.status==='BLOCK')return result('TP-CX-001','UNKNOWN','CURRENCY_MISMATCH_PREVENTS_AMOUNT_COMPARISON','Amount equality is not meaningful across mismatched currencies.','UNSUPPORTED_TRANSFORMATION');if(currency.status==='UNKNOWN')return result('TP-CX-001','UNKNOWN','CURRENCY_NOT_PROVEN','Amount projection requires comparable currency.',currency.unknown_reason||'MISSING_EVIDENCE');const total=authoritativeTotal(c),amount=p?.raw?.payment_amount?.amount;if(!Number.isInteger(total))return result('TP-CX-001','UNKNOWN','AUTHORITATIVE_TOTAL_MISSING','Authoritative UCP grand total is missing or ambiguous.','MISSING_EVIDENCE');if(!Number.isInteger(amount))return result('TP-CX-001','UNKNOWN','PAYMENT_AMOUNT_MISSING','AP2 approved payment amount is missing.','MISSING_EVIDENCE');if(total!==amount)return result('TP-CX-001','BLOCK','PAYMENT_TOTAL_MISMATCH',`Approved payment amount ${amount} does not match authorized checkout total ${total}.`,null,{authorized_total:total,payment_amount:amount});return result('TP-CX-001','PASS','PAYMENT_TOTAL_MATCH','Approved payment amount matches authorized checkout grand total.',null,{amount:total});}
export function aggregateDecision(results){return results.reduce((b,r)=>PRECEDENCE[r.status]>PRECEDENCE[b]?r.status:b,'PASS');}
function evaluate(input,{supported,strictBinding}){const c=findObject(input,'ucp','checkout'),p=findObject(input,'ap2','payment_mandate');const r3=exactState(c,p,{supported,strictBinding,context:input.context||{}}),r2=currencyProjection(input,c,p,r3),r1=totalProjection(input,c,p,r3,r2),results=[r3,r2,r1];return {results,decision:aggregateDecision(results)};}
export function verifyFixture(fixture){if(!fixture||typeof fixture!=='object')throw new TypeError('fixture must be an object');const out=evaluate(fixture,{supported:FIXTURE_SUPPORTED,strictBinding:false});return {core_schema_version:'m2.1',evaluation_id:`eval:${fixture.fixture_version||'unknown'}`,...out};}
export function verifyTransactionGraph(graph,{evaluationId='eval:local'}={}){if(!graph||typeof graph!=='object')throw new TypeError('graph must be an object');const out=evaluate(graph,{supported:PRODUCTION_SUPPORTED,strictBinding:true});return {core_schema_version:'m2.1',evaluation_id:evaluationId,...out};}

function providerEvidenceResult(graph){
  const mandate=findObject(graph,'ap2','payment_mandate');
  const evidence=findObject(graph,'provider','executed_payment');
  if(!mandate)return result('TP-EV-001','UNKNOWN','PAYMENT_MANDATE_MISSING','Approved AP2 PaymentMandate is unavailable.','MISSING_OBJECT',{execution_state:'UNKNOWN'});
  if(!evidence)return result('TP-EV-001','UNKNOWN','PROVIDER_EXECUTION_EVIDENCE_MISSING','Provider execution evidence is unavailable.','MISSING_OBJECT',{execution_state:'UNKNOWN'});
  if(!PRODUCTION_SUPPORTED.ap2.has(mandate.source?.protocol_version))return result('TP-EV-001','UNKNOWN','UNSUPPORTED_PROTOCOL_VERSION',`Unsupported AP2 payment profile ${mandate.source?.protocol_version??'missing'}.`,'UNSUPPORTED_VERSION',{execution_state:'UNKNOWN'});
  const provider=evidence.source?.provider;
  const versions=PROVIDER_SUPPORTED[provider];
  if(!versions||!versions.has(evidence.source?.provider_version))return result('TP-EV-001','UNKNOWN','UNSUPPORTED_PROVIDER_VERSION',`Unsupported provider profile ${provider??'missing'} ${evidence.source?.provider_version??'missing'}.`,'UNSUPPORTED_VERSION',{execution_state:'UNKNOWN'});
  const e=evidence.canonical||{},p=mandate.canonical||{};
  if(e.capture_method && e.capture_method!=='automatic')return result('TP-EV-001','UNKNOWN','UNSUPPORTED_PROVIDER_CAPTURE_MODE','This provider profile does not yet prove manual/partial capture semantics.','UNSUPPORTED_TRANSFORMATION',{execution_state:'UNKNOWN',capture_method:e.capture_method});
  if(!e.authorization_reference)return result('TP-EV-001','UNKNOWN','PROVIDER_AUTHORIZATION_BINDING_MISSING','Provider evidence is not bound to the approved AP2 mandate.','MISSING_EVIDENCE',{execution_state:'UNKNOWN',provider_payment_id:e.provider_payment_id??null});
  if(e.authorization_reference!==p.transaction_id)return result('TP-EV-001','BLOCK','PROVIDER_AUTHORIZATION_BINDING_MISMATCH','Provider evidence is bound to a different AP2 transaction.',null,{execution_state:'UNKNOWN',approved_transaction_id:p.transaction_id??null,provider_authorization_reference:e.authorization_reference,provider_payment_id:e.provider_payment_id??null});
  const status=e.provider_status;
  if(status==='canceled'){
    if(e.amount_received_minor===0)return result('TP-EV-001','PASS','PROVIDER_PAYMENT_NOT_EXECUTED','Provider final state indicates no payment was collected for the bound mandate.',null,{execution_state:'NOT_EXECUTED',provider_status:status,provider_payment_id:e.provider_payment_id??null});
    return result('TP-EV-001','UNKNOWN','CANCELED_PAYMENT_HAS_RECEIVED_AMOUNT','Canceled provider state has non-zero received amount; partial/reversal semantics are not modeled.','UNSUPPORTED_TRANSFORMATION',{execution_state:'UNKNOWN',provider_status:status,amount_received_minor:e.amount_received_minor});
  }
  if(status!=='succeeded')return result('TP-EV-001','UNKNOWN','PROVIDER_EXECUTION_NOT_FINAL','Provider state does not prove a final collected payment.','PENDING_PROVIDER_STATE',{execution_state:'UNKNOWN',provider_status:status,provider_payment_id:e.provider_payment_id??null});
  if(!Number.isInteger(e.amount_received_minor))return result('TP-EV-001','UNKNOWN','PROVIDER_RECEIVED_AMOUNT_MISSING','Provider succeeded state is missing authoritative received amount.','MISSING_EVIDENCE',{execution_state:'UNKNOWN',provider_status:status});
  if(!p.currency||!e.currency)return result('TP-EV-001','UNKNOWN','EXECUTED_CURRENCY_EVIDENCE_MISSING','Approved or executed currency evidence is missing.','MISSING_EVIDENCE',{execution_state:'UNKNOWN'});
  if(p.currency!==e.currency)return result('TP-EV-001','BLOCK','EXECUTED_PAYMENT_CURRENCY_MISMATCH',`Provider collected currency ${e.currency} does not match approved currency ${p.currency}.`,null,{execution_state:'EXECUTED_INCONSISTENT',approved_currency:p.currency,executed_currency:e.currency,provider_payment_id:e.provider_payment_id??null});
  if(!Number.isInteger(p.amount_minor))return result('TP-EV-001','UNKNOWN','APPROVED_AMOUNT_MISSING','Approved AP2 amount evidence is missing.','MISSING_EVIDENCE',{execution_state:'UNKNOWN'});
  if(p.amount_minor!==e.amount_received_minor)return result('TP-EV-001','BLOCK','EXECUTED_PAYMENT_AMOUNT_MISMATCH',`Provider collected amount ${e.amount_received_minor} does not match approved amount ${p.amount_minor}.`,null,{execution_state:'EXECUTED_INCONSISTENT',approved_amount_minor:p.amount_minor,executed_amount_minor:e.amount_received_minor,currency:p.currency,provider_payment_id:e.provider_payment_id??null});
  return result('TP-EV-001','PASS','EXECUTED_PAYMENT_MATCHES_APPROVED_MANDATE','Provider final collected payment matches the bound approved AP2 mandate.',null,{execution_state:'EXECUTED_CONSISTENT',amount_minor:p.amount_minor,currency:p.currency,provider_payment_id:e.provider_payment_id??null,provider_status:status});
}
export function verifyProviderExecutionGraph(graph,{evaluationId='eval:provider'}={}){
  if(!graph||typeof graph!=='object')throw new TypeError('graph must be an object');
  const r=providerEvidenceResult(graph);
  return {core_schema_version:'m2.1',evaluation_id:evaluationId,results:[r],decision:r.status,execution_state:r.details?.execution_state??'UNKNOWN'};
}
export const supportedProductionProfiles = Object.freeze({ucp:['2026-04-08'],ap2:['mandate.payment.1'],providers:Object.freeze({stripe:['2026-02-25.clover']})});
