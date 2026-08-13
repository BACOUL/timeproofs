import fs from 'node:fs/promises';
import { createStripeBoundTestPaymentIntent, confirmStripeBoundTestPaymentIntent } from '../integrations/stripe/test-payment-intent.js';
import { retrieveStripeTestPaymentIntent, STRIPE_M8_1_RETRIEVAL_PROFILE } from '../integrations/stripe/retrieve-payment-intent.js';
import { verifyProviderExecution } from '../sdk/index.js';

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is required.`);
  return value;
}

const secretKey = requiredEnv('STRIPE_SECRET_KEY');
const mandateFile = process.env.TIMEPROOFS_AP2_TRANSPORT_MANDATE_FILE ?? 'examples/m8-1/stripe/payment-mandate.transport.test.json';
const paymentMethod = process.env.TIMEPROOFS_STRIPE_TEST_PAYMENT_METHOD ?? 'pm_card_visa';
const apiVersion = process.env.TIMEPROOFS_STRIPE_API_VERSION ?? STRIPE_M8_1_RETRIEVAL_PROFILE.stripe_api_version;
const paymentMandate = JSON.parse(await fs.readFile(mandateFile, 'utf8'));

const transactionId = paymentMandate?.transaction_id;
const amountMinor = paymentMandate?.payment_amount?.amount;
const currency = paymentMandate?.payment_amount?.currency;
if (typeof transactionId !== 'string' || !transactionId) throw new Error('PaymentMandate.transaction_id is required.');
if (!Number.isInteger(amountMinor)) throw new Error('PaymentMandate.payment_amount.amount must be integer minor units.');
if (typeof currency !== 'string') throw new Error('PaymentMandate.payment_amount.currency is required.');

const created = await createStripeBoundTestPaymentIntent({
  secretKey,
  transactionId,
  amountMinor,
  currency,
  apiVersion
});
const paymentIntentId = created.id;

let ambiguousError = null;
const ambiguousFetch = async (url, options) => {
  const response = await globalThis.fetch(url, options);
  if (String(url).endsWith(`/v1/payment_intents/${paymentIntentId}/confirm`)) {
    // Consume the provider response, then deliberately make the caller observe a transport-style failure.
    // This is deterministic chaos injection, not a claim that the physical network actually failed.
    await response.arrayBuffer();
    const error = new TypeError('Simulated transport ambiguity after Stripe processed confirmation.');
    error.code = 'TIMEPROOFS_SIMULATED_TRANSPORT_AMBIGUITY';
    throw error;
  }
  return response;
};

try {
  await confirmStripeBoundTestPaymentIntent({
    secretKey,
    paymentIntentId,
    transactionId,
    paymentMethod,
    apiVersion,
    fetchImpl: ambiguousFetch
  });
} catch (error) {
  ambiguousError = error;
}

if (!ambiguousError || ambiguousError.code !== 'TIMEPROOFS_SIMULATED_TRANSPORT_AMBIGUITY') {
  throw new Error('Transport ambiguity injection did not produce the expected caller-visible error.');
}

// Critical rule: do not re-confirm/retry. Resolve provider truth by retrieval first.
const providerEvidence = await retrieveStripeTestPaymentIntent({
  secretKey,
  paymentIntentId,
  apiVersion
});

const result = verifyProviderExecution({
  paymentMandate,
  providerEvidence,
  provider: 'stripe',
  providerVersion: apiVersion,
  sourceRefs: {
    paymentMandate: `file:${mandateFile}`,
    providerEvidence: `stripe:payment_intent:${paymentIntentId}:retrieved-after-transport-ambiguity`
  }
});

const first = result.results[0];
const summary = {
  proof: 'm8.1-stripe-transport-ambiguity-recovery',
  chaos_model: 'Stripe confirmation request completed; provider response was consumed then converted into a caller-visible transport-style failure',
  physical_network_failure_claimed: false,
  retry_before_resolution: false,
  provider: 'stripe',
  provider_version: apiVersion,
  livemode: providerEvidence.livemode,
  payment_intent_id: paymentIntentId,
  provider_status: providerEvidence.status,
  capture_method: providerEvidence.capture_method ?? null,
  decision: result.decision,
  execution_state: result.execution_state,
  invariant_id: first?.invariant_id ?? null,
  reason_code: first?.reason_code ?? null
};
console.log(JSON.stringify(summary, null, 2));

if (result.decision !== 'PASS' || result.execution_state !== 'EXECUTED_CONSISTENT') {
  console.error('M8.1 Stripe transport ambiguity proof did not resolve to an executed-consistent payment.');
  process.exitCode = 2;
}
