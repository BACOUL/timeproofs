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
const mandateFile = requiredEnv('TIMEPROOFS_AP2_MANDATE_FILE');
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

// Simulate loss of the business outcome after the consequential confirmation call.
// The confirmation response body is deliberately not used to decide what happened.
await confirmStripeBoundTestPaymentIntent({
  secretKey,
  paymentIntentId,
  transactionId,
  paymentMethod,
  apiVersion
});

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
    providerEvidence: `stripe:payment_intent:${paymentIntentId}:retrieved-after-response-loss`
  }
});

const first = result.results[0];
const summary = {
  proof: 'm8.1-stripe-response-loss-recovery',
  simulation: 'confirmation response deliberately ignored; outcome reconstructed from retrieved provider state',
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
  console.error('M8.1 Stripe response-loss proof did not reconstruct an executed-consistent payment.');
  process.exitCode = 2;
}
