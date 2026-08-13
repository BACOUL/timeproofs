const TEST_KEY_PREFIXES = Object.freeze(['sk_test_', 'rk_test_']);

export const STRIPE_M8_1_RETRIEVAL_PROFILE = Object.freeze({
  id: 'timeproofs.stripe.payment-intent-retrieval',
  version: '0.1.0',
  stripe_api_version: '2026-02-25.clover',
  test_mode_only: true
});

function assertTestKey(secretKey) {
  if (typeof secretKey !== 'string' || !TEST_KEY_PREFIXES.some(prefix => secretKey.startsWith(prefix))) {
    const error = new Error('M8.1 Stripe retrieval requires a Stripe test-mode secret/restricted key (sk_test_ or rk_test_).');
    error.code = 'STRIPE_TEST_KEY_REQUIRED';
    throw error;
  }
}

function assertPaymentIntentId(paymentIntentId) {
  if (typeof paymentIntentId !== 'string' || !/^pi_[A-Za-z0-9]+$/.test(paymentIntentId)) {
    const error = new Error('A valid Stripe PaymentIntent id (pi_...) is required.');
    error.code = 'STRIPE_PAYMENT_INTENT_ID_REQUIRED';
    throw error;
  }
}

export async function retrieveStripeTestPaymentIntent({
  secretKey,
  paymentIntentId,
  apiVersion = STRIPE_M8_1_RETRIEVAL_PROFILE.stripe_api_version,
  fetchImpl = globalThis.fetch
}) {
  assertTestKey(secretKey);
  assertPaymentIntentId(paymentIntentId);
  if (typeof fetchImpl !== 'function') throw new TypeError('fetchImpl must be a function');
  if (apiVersion !== STRIPE_M8_1_RETRIEVAL_PROFILE.stripe_api_version) {
    const error = new Error(`Unsupported Stripe retrieval API version: ${apiVersion}`);
    error.code = 'UNSUPPORTED_PROVIDER_VERSION';
    throw error;
  }

  const response = await fetchImpl(`https://api.stripe.com/v1/payment_intents/${encodeURIComponent(paymentIntentId)}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${secretKey}`,
      'Stripe-Version': apiVersion
    },
    redirect: 'error'
  });

  if (!response || typeof response.ok !== 'boolean') throw new Error('Stripe retrieval returned an invalid response object.');
  if (!response.ok) {
    const requestId = response.headers?.get?.('request-id') ?? response.headers?.get?.('Request-Id') ?? null;
    const error = new Error(`Stripe PaymentIntent retrieval failed with HTTP ${response.status}${requestId ? ` (request ${requestId})` : ''}.`);
    error.code = 'STRIPE_RETRIEVAL_FAILED';
    error.http_status = response.status;
    error.request_id = requestId;
    throw error;
  }

  const raw = await response.json();
  if (!raw || raw.object !== 'payment_intent' || raw.id !== paymentIntentId) {
    const error = new Error('Stripe retrieval did not return the requested PaymentIntent.');
    error.code = 'STRIPE_RETRIEVAL_OBJECT_MISMATCH';
    throw error;
  }
  if (raw.livemode !== false) {
    const error = new Error('Refusing Stripe provider proof because the retrieved PaymentIntent is not explicitly test mode.');
    error.code = 'STRIPE_LIVE_MODE_REFUSED';
    throw error;
  }

  return raw;
}
