import fs from 'node:fs/promises';
import { retrieveStripeTestPaymentIntent, STRIPE_M8_1_RETRIEVAL_PROFILE } from '../integrations/stripe/retrieve-payment-intent.js';
import { verifyProviderExecution } from '../sdk/index.js';

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is required.`);
  return value;
}

const secretKey = requiredEnv('STRIPE_SECRET_KEY');
const paymentIntentId = requiredEnv('TIMEPROOFS_STRIPE_PAYMENT_INTENT_ID');
const mandateFile = requiredEnv('TIMEPROOFS_AP2_MANDATE_FILE');
const expectedDecision = process.env.TIMEPROOFS_EXPECT_DECISION ?? null;
const apiVersion = process.env.TIMEPROOFS_STRIPE_API_VERSION ?? STRIPE_M8_1_RETRIEVAL_PROFILE.stripe_api_version;

const paymentMandate = JSON.parse(await fs.readFile(mandateFile, 'utf8'));
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
    providerEvidence: `stripe:payment_intent:${paymentIntentId}`
  }
});

const first = result.results[0];
const summary = {
  proof_profile: STRIPE_M8_1_RETRIEVAL_PROFILE.id,
  provider: 'stripe',
  provider_version: apiVersion,
  livemode: providerEvidence.livemode,
  payment_intent_id: providerEvidence.id,
  provider_status: providerEvidence.status,
  capture_method: providerEvidence.capture_method ?? null,
  decision: result.decision,
  execution_state: result.execution_state,
  invariant_id: first?.invariant_id ?? null,
  reason_code: first?.reason_code ?? null,
  evaluated_at: result.metadata?.evaluated_at ?? null
};

console.log(JSON.stringify(summary, null, 2));

if (expectedDecision && result.decision !== expectedDecision) {
  console.error(`Expected decision ${expectedDecision}, got ${result.decision}.`);
  process.exitCode = 2;
}
