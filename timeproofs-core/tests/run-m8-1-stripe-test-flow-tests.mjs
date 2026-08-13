import { createStripeBoundTestPaymentIntent, confirmStripeBoundTestPaymentIntent } from '../../integrations/stripe/test-payment-intent.js';

function assert(condition, message) { if (!condition) throw new Error(message); }
async function expectReject(fn, code, message) {
  let thrown = null;
  try { await fn(); } catch (error) { thrown = error; }
  if (!thrown) throw new Error(`${message}: expected rejection`);
  if (code && thrown.code !== code) throw new Error(`${message}: expected ${code}, got ${thrown.code ?? thrown.message}`);
}

const calls = [];
const fetchImpl = async (url, options) => {
  calls.push({ url, options });
  const isConfirm = url.endsWith('/confirm');
  return {
    ok: true,
    status: 200,
    headers: { get: () => null },
    json: async () => ({
      id: 'pi_testflow1',
      object: 'payment_intent',
      amount: 500,
      amount_received: isConfirm ? 500 : 0,
      currency: 'eur',
      status: isConfirm ? 'succeeded' : 'requires_payment_method',
      capture_method: 'automatic_async',
      livemode: false,
      metadata: { timeproofs_ap2_transaction_id: 'tx_testflow1' }
    })
  };
};

const created = await createStripeBoundTestPaymentIntent({
  secretKey: 'sk_test_example',
  transactionId: 'tx_testflow1',
  amountMinor: 500,
  currency: 'EUR',
  fetchImpl
});
assert(created.id === 'pi_testflow1' && created.livemode === false, 'create must return test PaymentIntent');
assert(calls[0].url === 'https://api.stripe.com/v1/payment_intents', 'create must use PaymentIntents endpoint');
assert(calls[0].options.method === 'POST', 'create must use POST');
assert(calls[0].options.headers['Stripe-Version'] === '2026-02-25.clover', 'create must pin API version');
assert(calls[0].options.headers['Idempotency-Key'].startsWith('timeproofs-m8-1-create-'), 'create must use deterministic idempotency key');
assert(calls[0].options.body.includes('metadata%5Btimeproofs_ap2_transaction_id%5D=tx_testflow1'), 'create must bind AP2 transaction in metadata');
assert(calls[0].options.body.includes('payment_method_types%5B%5D=card'), 'create must restrict proof to card test flow');

const confirmed = await confirmStripeBoundTestPaymentIntent({
  secretKey: 'sk_test_example',
  paymentIntentId: created.id,
  transactionId: 'tx_testflow1',
  fetchImpl
});
assert(confirmed.status === 'succeeded' && confirmed.amount_received === 500, 'confirm mock must succeed');
assert(calls[1].url.endsWith('/v1/payment_intents/pi_testflow1/confirm'), 'confirm must target created PaymentIntent');
assert(calls[1].options.headers['Idempotency-Key'].startsWith('timeproofs-m8-1-confirm-'), 'confirm must use deterministic idempotency key');
assert(calls[1].options.headers['Idempotency-Key'] !== calls[0].options.headers['Idempotency-Key'], 'create and confirm keys must be distinct');
assert(calls[1].options.body.includes('payment_method=pm_card_visa'), 'default Stripe test PaymentMethod must be pm_card_visa');
assert(calls[1].options.body.includes('error_on_requires_action=true'), 'proof flow must fail instead of requiring interactive action');

const repeatCalls = [];
await createStripeBoundTestPaymentIntent({
  secretKey: 'sk_test_example',
  transactionId: 'tx_testflow1',
  amountMinor: 500,
  currency: 'EUR',
  fetchImpl: async (url, options) => {
    repeatCalls.push({ url, options });
    return { ok: true, status: 200, headers: { get: () => null }, json: async () => ({ ...created }) };
  }
});
assert(repeatCalls[0].options.headers['Idempotency-Key'] === calls[0].options.headers['Idempotency-Key'], 'same transaction must reuse create idempotency key');

await expectReject(
  () => createStripeBoundTestPaymentIntent({ secretKey: 'sk_live_forbidden', transactionId: 'tx', amountMinor: 500, currency: 'EUR', fetchImpl }),
  'STRIPE_TEST_KEY_REQUIRED',
  'live key create'
);
await expectReject(
  () => createStripeBoundTestPaymentIntent({ secretKey: 'sk_test_example', transactionId: 'tx', amountMinor: 0, currency: 'EUR', fetchImpl }),
  'STRIPE_TEST_AMOUNT_INVALID',
  'zero amount'
);
await expectReject(
  () => confirmStripeBoundTestPaymentIntent({ secretKey: 'sk_test_example', paymentIntentId: 'bad', transactionId: 'tx', fetchImpl }),
  'STRIPE_PAYMENT_INTENT_ID_REQUIRED',
  'bad PaymentIntent id'
);
await expectReject(
  () => createStripeBoundTestPaymentIntent({
    secretKey: 'sk_test_example', transactionId: 'tx_live', amountMinor: 500, currency: 'EUR',
    fetchImpl: async () => ({ ok: true, status: 200, headers: { get: () => null }, json: async () => ({ ...created, livemode: true }) })
  }),
  'STRIPE_LIVE_MODE_REFUSED',
  'unexpected live object'
);

console.log('M8.1 Stripe test create/confirm safety tests PASS');
