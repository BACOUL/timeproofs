import crypto from 'node:crypto';
import { verifyStripeWebhookTrigger } from '../../integrations/stripe/webhook-trigger.js';
import { evaluateStripeWebhookProviderEvidence } from '../../integrations/stripe/webhook-provider-evidence.js';

function assert(condition, message) { if (!condition) throw new Error(message); }
async function expectReject(fn, code, message) {
  let thrown = null;
  try { await fn(); } catch (error) { thrown = error; }
  if (!thrown) throw new Error(`${message}: expected rejection`);
  if (code && thrown.code !== code) throw new Error(`${message}: expected ${code}, got ${thrown.code ?? thrown.message}`);
}

const webhookSecret = 'whsec_timeproofs_test';
const timestamp = 2000000000;
const event = {
  id: 'evt_timeproofs_1',
  object: 'event',
  type: 'payment_intent.succeeded',
  data: {
    object: {
      id: 'pi_webhookproof1',
      object: 'payment_intent',
      amount: 999999,
      currency: 'usd',
      status: 'succeeded'
    }
  }
};
const rawBody = JSON.stringify(event);
function signatureFor(body, ts = timestamp, secret = webhookSecret) {
  return crypto.createHmac('sha256', secret).update(`${ts}.${body}`).digest('hex');
}
const signatureHeader = `t=${timestamp},v1=deadbeef,v1=${signatureFor(rawBody)}`;

const trigger = verifyStripeWebhookTrigger({
  rawBody,
  signatureHeader,
  webhookSecret,
  nowSeconds: timestamp + 10
});
assert(trigger.accepted === true, 'valid webhook must be accepted as trigger');
assert(trigger.trigger_only === true, 'webhook must be trigger only');
assert(trigger.payment_intent_id === 'pi_webhookproof1', 'webhook must expose PaymentIntent id');

await expectReject(
  () => Promise.resolve(verifyStripeWebhookTrigger({ rawBody: JSON.stringify(JSON.parse(rawBody), null, 2), signatureHeader, webhookSecret, nowSeconds: timestamp + 10 })),
  'STRIPE_WEBHOOK_SIGNATURE_INVALID',
  're-serialized body must not verify'
);
await expectReject(
  () => Promise.resolve(verifyStripeWebhookTrigger({ rawBody, signatureHeader: `t=${timestamp},v1=badbad`, webhookSecret, nowSeconds: timestamp + 10 })),
  'STRIPE_WEBHOOK_SIGNATURE_INVALID',
  'invalid signature'
);
await expectReject(
  () => Promise.resolve(verifyStripeWebhookTrigger({ rawBody, signatureHeader, webhookSecret, nowSeconds: timestamp + 301 })),
  'STRIPE_WEBHOOK_TIMESTAMP_OUT_OF_TOLERANCE',
  'stale webhook'
);

const mandate = {
  vct: 'mandate.payment.1',
  transaction_id: 'tx_webhookproof1',
  payee: { id: 'merchant' },
  payment_amount: { currency: 'EUR', amount: 500 },
  payment_instrument: { type: 'card', id: 'test' }
};
let retrievalCalls = 0;
const resolved = await evaluateStripeWebhookProviderEvidence({
  rawBody,
  signatureHeader,
  webhookSecret,
  secretKey: 'sk_test_example',
  paymentMandate: mandate,
  nowSeconds: timestamp + 10,
  fetchImpl: async url => {
    retrievalCalls += 1;
    assert(url.endsWith('/v1/payment_intents/pi_webhookproof1'), 'must retrieve webhook-referenced PaymentIntent');
    return {
      ok: true,
      status: 200,
      headers: { get: () => null },
      json: async () => ({
        id: 'pi_webhookproof1',
        object: 'payment_intent',
        amount: 500,
        amount_received: 500,
        currency: 'eur',
        status: 'succeeded',
        capture_method: 'automatic_async',
        livemode: false,
        metadata: { timeproofs_ap2_transaction_id: 'tx_webhookproof1' },
        latest_charge: 'ch_test'
      })
    };
  }
});
assert(retrievalCalls === 1, 'webhook path must retrieve provider state exactly once');
assert(resolved.evaluated === true, 'accepted PaymentIntent webhook must evaluate');
assert(resolved.provider_evidence_source === 'retrieved_payment_intent', 'retrieved state must be provider evidence');
assert(resolved.webhook_snapshot_used_as_pass_evidence === false, 'webhook snapshot must never be PASS evidence');
assert(resolved.result.decision === 'PASS', 'retrieved exact payment must PASS');
assert(resolved.result.execution_state === 'EXECUTED_CONSISTENT', 'retrieved exact payment must be executed-consistent');

const nonPiEvent = { id: 'evt_other', object: 'event', type: 'charge.succeeded', data: { object: { id: 'ch_x', object: 'charge' } } };
const nonPiRaw = JSON.stringify(nonPiEvent);
const nonPiHeader = `t=${timestamp},v1=${signatureFor(nonPiRaw)}`;
const ignored = await evaluateStripeWebhookProviderEvidence({
  rawBody: nonPiRaw,
  signatureHeader: nonPiHeader,
  webhookSecret,
  secretKey: 'sk_test_example',
  paymentMandate: mandate,
  nowSeconds: timestamp + 10,
  fetchImpl: async () => { throw new Error('must not retrieve for non PaymentIntent event'); }
});
assert(ignored.evaluated === false && ignored.reason === 'NON_PAYMENT_INTENT_EVENT', 'non PaymentIntent event must be ignored');

console.log('M8.1 Stripe webhook trigger/retrieve tests PASS');
