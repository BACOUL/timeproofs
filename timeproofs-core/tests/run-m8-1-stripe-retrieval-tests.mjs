import { retrieveStripeTestPaymentIntent } from '../../integrations/stripe/retrieve-payment-intent.js';

function assert(condition, message) { if (!condition) throw new Error(message); }
async function expectReject(fn, code, message) {
  let thrown = null;
  try { await fn(); } catch (error) { thrown = error; }
  if (!thrown) throw new Error(`${message}: expected rejection`);
  if (code && thrown.code !== code) throw new Error(`${message}: expected ${code}, got ${thrown.code ?? thrown.message}`);
}

const base = {
  id: 'pi_testproof1',
  object: 'payment_intent',
  amount: 100,
  amount_received: 100,
  currency: 'eur',
  status: 'succeeded',
  capture_method: 'automatic_async',
  livemode: false,
  metadata: { timeproofs_ap2_transaction_id: 'tx_testproof1' }
};

let observedHeaders = null;
const okFetch = async (url, options) => {
  observedHeaders = options.headers;
  assert(url.endsWith('/pi_testproof1'), 'retrieval URL must target the requested PaymentIntent');
  assert(options.method === 'GET', 'retrieval must be GET-only');
  assert(options.redirect === 'error', 'redirects must be refused');
  return {
    ok: true,
    status: 200,
    headers: { get: () => null },
    json: async () => ({ ...base })
  };
};

let paymentIntent = await retrieveStripeTestPaymentIntent({
  secretKey: 'sk_test_example',
  paymentIntentId: 'pi_testproof1',
  fetchImpl: okFetch
});
assert(paymentIntent.id === 'pi_testproof1' && paymentIntent.livemode === false, 'test PaymentIntent must be returned');
assert(observedHeaders.Authorization === 'Bearer sk_test_example', 'test secret must be sent as bearer auth');
assert(observedHeaders['Stripe-Version'] === '2026-02-25.clover', 'Stripe API version must be pinned');

await expectReject(
  () => retrieveStripeTestPaymentIntent({ secretKey: 'sk_live_forbidden', paymentIntentId: 'pi_testproof1', fetchImpl: okFetch }),
  'STRIPE_TEST_KEY_REQUIRED',
  'live secret key'
);
await expectReject(
  () => retrieveStripeTestPaymentIntent({ secretKey: 'sk_test_example', paymentIntentId: 'not_a_pi', fetchImpl: okFetch }),
  'STRIPE_PAYMENT_INTENT_ID_REQUIRED',
  'invalid PaymentIntent id'
);
await expectReject(
  () => retrieveStripeTestPaymentIntent({ secretKey: 'sk_test_example', paymentIntentId: 'pi_testproof1', apiVersion: 'latest', fetchImpl: okFetch }),
  'UNSUPPORTED_PROVIDER_VERSION',
  'unpinned API version'
);
await expectReject(
  () => retrieveStripeTestPaymentIntent({
    secretKey: 'rk_test_example',
    paymentIntentId: 'pi_testproof1',
    fetchImpl: async () => ({ ok: true, status: 200, headers: { get: () => null }, json: async () => ({ ...base, livemode: true }) })
  }),
  'STRIPE_LIVE_MODE_REFUSED',
  'live-mode provider object'
);
await expectReject(
  () => retrieveStripeTestPaymentIntent({
    secretKey: 'sk_test_example',
    paymentIntentId: 'pi_testproof1',
    fetchImpl: async () => ({ ok: true, status: 200, headers: { get: () => null }, json: async () => ({ ...base, id: 'pi_other' }) })
  }),
  'STRIPE_RETRIEVAL_OBJECT_MISMATCH',
  'wrong provider object'
);
await expectReject(
  () => retrieveStripeTestPaymentIntent({
    secretKey: 'sk_test_example',
    paymentIntentId: 'pi_testproof1',
    fetchImpl: async () => ({ ok: false, status: 401, headers: { get: name => name.toLowerCase() === 'request-id' ? 'req_test' : null } })
  }),
  'STRIPE_RETRIEVAL_FAILED',
  'Stripe HTTP failure'
);

console.log('M8.1 Stripe retrieval safety tests PASS');
