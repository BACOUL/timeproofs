import { adaptUcpCheckout, UCP_CHECKOUT_ADAPTER } from '../adapters/ucp/checkout.js';
import { adaptAp2PaymentMandate, AP2_PAYMENT_ADAPTER } from '../adapters/ap2/payment-mandate.js';
import { adaptStripePaymentIntent, STRIPE_PAYMENT_INTENT_ADAPTER } from '../adapters/stripe/payment-intent.js';
import { sha256Base64UrlString } from '../timeproofs-core/canonical.js';
import { verifyTransactionGraph, verifyProviderExecutionGraph } from '../timeproofs-core/index.js';
import { applyEnforcementPolicy, enforcementError, DEFAULT_FINANCIAL_POLICY, TIMEPROOFS_ENFORCEMENT_CONTRACT_VERSION } from './enforcement.js';

export { applyEnforcementPolicy, DEFAULT_FINANCIAL_POLICY, TIMEPROOFS_ENFORCEMENT_CONTRACT_VERSION } from './enforcement.js';
export const TIMEPROOFS_PACK = Object.freeze({ id: 'ucp-ap2', version: '0.1.0-spec' });
export const TIMEPROOFS_RESULT_CONTRACT_VERSION = 'timeproofs.result.v0.1';
export const TIMEPROOFS_PROVIDER_EVIDENCE_CONTRACT_VERSION = 'timeproofs.provider-evidence.v0.1';

function verifyBinding(paymentObject, checkoutJwt, hashAlgorithm) {
  if (!checkoutJwt) return null;
  if (hashAlgorithm !== 'sha256') return { status: 'unsupported', algorithm: hashAlgorithm };
  const expected = sha256Base64UrlString(checkoutJwt);
  const observed = paymentObject.raw.transaction_id;
  return { status: expected === observed ? 'verified' : 'mismatch', algorithm: 'sha256', expected, observed };
}

export function verifyTransaction({ checkout, paymentMandate, checkoutJwt = null, hashAlgorithm = 'sha256', transformation = null, evaluatedAt = new Date().toISOString(), sourceRefs = {} }) {
  const checkoutObject = adaptUcpCheckout(checkout, { observedAt: evaluatedAt, sourceRef: sourceRefs.checkout ?? null });
  const paymentObject = adaptAp2PaymentMandate(paymentMandate, { observedAt: evaluatedAt, sourceRef: sourceRefs.paymentMandate ?? null });
  const binding = verifyBinding(paymentObject, checkoutJwt, hashAlgorithm);
  const context = {};
  if (transformation) context.declared_transformation = transformation;
  if (binding?.status === 'verified' || binding?.status === 'mismatch') context.binding_verification = binding;
  if (binding?.status === 'unsupported') context.binding_verification = null;
  const graph = { objects: [checkoutObject, paymentObject], context };
  const evaluationId = `eval:${checkoutObject.snapshot.digest.value.slice(0,12)}:${paymentObject.snapshot.digest.value.slice(0,12)}`;
  const evaluation = verifyTransactionGraph(graph, { evaluationId });
  if (binding?.status === 'unsupported') {
    const r = evaluation.results.find(x => x.invariant_id === 'TP-CX-003');
    if (r && r.status === 'UNKNOWN') {
      r.reason_code = 'UNSUPPORTED_BINDING_HASH_ALGORITHM';
      r.unknown_reason = 'UNSUPPORTED_TRANSFORMATION';
      r.message = `Binding hash algorithm ${hashAlgorithm} is not supported by this adapter profile.`;
      r.details = { algorithm: hashAlgorithm };
    }
  }
  return {
    result_contract_version: TIMEPROOFS_RESULT_CONTRACT_VERSION,
    ...evaluation,
    metadata: {
      pack: TIMEPROOFS_PACK,
      adapters: [UCP_CHECKOUT_ADAPTER, AP2_PAYMENT_ADAPTER].map(x => ({ id: x.id, version: x.version })),
      evaluated_at: evaluatedAt
    },
    graph: {
      graph_id: evaluationId.replace('eval:','graph:'),
      evaluation_time: evaluatedAt,
      objects: [checkoutObject, paymentObject],
      bindings: binding ? [{
        binding_id: 'binding:checkout-payment',
        from_object_id: checkoutObject.object_id,
        to_object_id: paymentObject.object_id,
        relation: 'AP2_PAYMENT_REFERENCES_CHECKOUT_JWT',
        basis: binding.algorithm || hashAlgorithm,
        confidence: binding.status === 'verified' ? 'DETERMINISTIC' : 'AMBIGUOUS',
        evidence_ids: [],
        valid_at: evaluatedAt,
        pack_rule: 'TP-CX-003'
      }] : [],
      evidence: [],
      context
    }
  };
}

export function enforceTransaction(input, { policy = DEFAULT_FINANCIAL_POLICY, captureErrors = true } = {}) {
  try {
    return applyEnforcementPolicy(verifyTransaction(input), policy);
  } catch (error) {
    if (!captureErrors) throw error;
    return enforcementError(error, policy);
  }
}

export function verifyProviderExecution({
  paymentMandate,
  providerEvidence,
  provider = 'stripe',
  providerVersion = '2026-02-25.clover',
  evaluatedAt = new Date().toISOString(),
  sourceRefs = {},
  bindingMetadataKey = 'timeproofs_ap2_transaction_id'
}) {
  if (provider !== 'stripe') {
    const err = new Error(`Unsupported provider: ${provider}`);
    err.code = 'UNSUPPORTED_PROVIDER';
    throw err;
  }
  const paymentObject = adaptAp2PaymentMandate(paymentMandate, { observedAt: evaluatedAt, sourceRef: sourceRefs.paymentMandate ?? null });
  const providerObject = adaptStripePaymentIntent(providerEvidence, {
    apiVersion: providerVersion,
    observedAt: evaluatedAt,
    sourceRef: sourceRefs.providerEvidence ?? null,
    bindingMetadataKey
  });
  const graph = { objects: [paymentObject, providerObject], context: { provider_profile: provider } };
  const evaluationId = `eval:provider:${paymentObject.snapshot.digest.value.slice(0,12)}:${providerObject.snapshot.digest.value.slice(0,12)}`;
  const evaluation = verifyProviderExecutionGraph(graph, { evaluationId });
  return {
    provider_evidence_contract_version: TIMEPROOFS_PROVIDER_EVIDENCE_CONTRACT_VERSION,
    ...evaluation,
    metadata: {
      adapters: [AP2_PAYMENT_ADAPTER, STRIPE_PAYMENT_INTENT_ADAPTER].map(x => ({ id: x.id, version: x.version })),
      provider,
      provider_version: providerVersion,
      evaluated_at: evaluatedAt
    },
    graph: {
      graph_id: evaluationId.replace('eval:','graph:'),
      evaluation_time: evaluatedAt,
      objects: [paymentObject, providerObject],
      bindings: [{
        binding_id: 'binding:approved-payment-provider-execution',
        from_object_id: paymentObject.object_id,
        to_object_id: providerObject.object_id,
        relation: 'PROVIDER_PAYMENT_REFERENCES_AP2_TRANSACTION',
        basis: providerObject.canonical.authorization_reference_basis,
        confidence: providerObject.canonical.authorization_reference === paymentObject.external_id ? 'PROVIDER_STORED_REFERENCE' : 'AMBIGUOUS',
        evidence_ids: [],
        valid_at: evaluatedAt,
        pack_rule: 'TP-EV-001'
      }],
      evidence: [],
      context: { provider_profile: provider }
    }
  };
}
