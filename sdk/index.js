import { adaptUcpCheckout, UCP_CHECKOUT_ADAPTER } from '../adapters/ucp/checkout.js';
import { adaptAp2PaymentMandate, AP2_PAYMENT_ADAPTER } from '../adapters/ap2/payment-mandate.js';
import { sha256Base64UrlString } from '../timeproofs-core/canonical.js';
import { verifyTransactionGraph } from '../timeproofs-core/index.js';

export const TIMEPROOFS_PACK = Object.freeze({ id: 'ucp-ap2', version: '0.1.0-spec' });
export const TIMEPROOFS_RESULT_CONTRACT_VERSION = 'timeproofs.result.v0.1';

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
