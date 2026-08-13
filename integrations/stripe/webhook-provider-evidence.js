import { verifyStripeWebhookTrigger } from './webhook-trigger.js';
import { retrieveStripeTestPaymentIntent, STRIPE_M8_1_RETRIEVAL_PROFILE } from './retrieve-payment-intent.js';
import { verifyProviderExecution } from '../../sdk/index.js';

export async function evaluateStripeWebhookProviderEvidence({
  rawBody,
  signatureHeader,
  webhookSecret,
  secretKey,
  paymentMandate,
  apiVersion = STRIPE_M8_1_RETRIEVAL_PROFILE.stripe_api_version,
  nowSeconds,
  toleranceSeconds,
  fetchImpl = globalThis.fetch
}) {
  const trigger = verifyStripeWebhookTrigger({
    rawBody,
    signatureHeader,
    webhookSecret,
    ...(nowSeconds == null ? {} : { nowSeconds }),
    ...(toleranceSeconds == null ? {} : { toleranceSeconds })
  });

  if (!trigger.accepted) {
    return Object.freeze({
      trigger,
      evaluated: false,
      reason: trigger.reason
    });
  }

  const providerEvidence = await retrieveStripeTestPaymentIntent({
    secretKey,
    paymentIntentId: trigger.payment_intent_id,
    apiVersion,
    fetchImpl
  });

  const result = verifyProviderExecution({
    paymentMandate,
    providerEvidence,
    provider: 'stripe',
    providerVersion: apiVersion,
    sourceRefs: {
      paymentMandate: `ap2:payment_mandate:${paymentMandate?.transaction_id ?? 'unknown'}`,
      providerEvidence: `stripe:payment_intent:${trigger.payment_intent_id}:retrieved-after-webhook:${trigger.event_id}`
    }
  });

  return Object.freeze({
    trigger,
    evaluated: true,
    provider_evidence_source: 'retrieved_payment_intent',
    webhook_snapshot_used_as_pass_evidence: false,
    result
  });
}
