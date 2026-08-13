import crypto from 'node:crypto';
import { STRIPE_M8_1_RETRIEVAL_PROFILE } from './retrieve-payment-intent.js';

const TEST_KEY_PREFIXES = Object.freeze(['sk_test_', 'rk_test_']);

function assertTestKey(secretKey) {
  if (typeof secretKey !== 'string' || !TEST_KEY_PREFIXES.some(prefix => secretKey.startsWith(prefix))) {
    const error = new Error('Stripe M8.1 proof helpers require a test-mode key (sk_test_ or rk_test_).');
    error.code = 'STRIPE_TEST_KEY_REQUIRED';
    throw error;
  }
}

function assertTransactionId(transactionId) {
  if (typeof transactionId !== 'string' || !transactionId.trim()) {
    const error = new Error('AP2 transaction_id is required for Stripe test proof binding.');
    error.code = 'AP2_TRANSACTION_ID_REQUIRED';
    throw error;
  }
}

function assertMinorAmount(amountMinor) {
  if (!Number.isInteger(amountMinor) || amountMinor <= 0) {
    const error = new Error('amountMinor must be a positive integer in minor currency units.');
    error.code = 'STRIPE_TEST_AMOUNT_INVALID';
    throw error;
  }
}

function assertCurrency(currency) {
  if (typeof currency !== 'string' || !/^[A-Za-z]{3}$/.test(currency)) {
    const error = new Error('currency must be a three-letter ISO currency code.');
    error.code = 'STRIPE_TEST_CURRENCY_INVALID';
    throw error;
  }
}

function assertApiVersion(apiVersion) {
  if (apiVersion !== STRIPE_M8_1_RETRIEVAL_PROFILE.stripe_api_version) {
    const error = new Error(`Unsupported Stripe proof API version: ${apiVersion}`);
    error.code = 'UNSUPPORTED_PROVIDER_VERSION';
    throw error;
  }
}

function idempotencyKey(kind, transactionId) {
  const digest = crypto.createHash('sha256').update(transactionId, 'utf8').digest('hex');
  return `timeproofs-m8-1-${kind}-${digest}`;
}

async function postStripeForm({ secretKey, path, params, apiVersion, idempotencyKeyValue, fetchImpl }) {
  assertTestKey(secretKey);
  assertApiVersion(apiVersion);
  if (typeof fetchImpl !== 'function') throw new TypeError('fetchImpl must be a function');

  const body = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value == null) continue;
    body.append(key, String(value));
  }

  const response = await fetchImpl(`https://api.stripe.com${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secretKey}`,
      'Stripe-Version': apiVersion,
      'Idempotency-Key': idempotencyKeyValue,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: body.toString(),
    redirect: 'error'
  });

  if (!response || typeof response.ok !== 'boolean') throw new Error('Stripe write returned an invalid response object.');
  if (!response.ok) {
    const requestId = response.headers?.get?.('request-id') ?? response.headers?.get?.('Request-Id') ?? null;
    const error = new Error(`Stripe test request failed with HTTP ${response.status}${requestId ? ` (request ${requestId})` : ''}.`);
    error.code = 'STRIPE_TEST_REQUEST_FAILED';
    error.http_status = response.status;
    error.request_id = requestId;
    throw error;
  }

  const raw = await response.json();
  if (!raw || raw.object !== 'payment_intent' || typeof raw.id !== 'string') {
    const error = new Error('Stripe test request did not return a PaymentIntent.');
    error.code = 'STRIPE_TEST_OBJECT_INVALID';
    throw error;
  }
  if (raw.livemode !== false) {
    const error = new Error('Refusing Stripe proof because a write unexpectedly returned a live-mode PaymentIntent.');
    error.code = 'STRIPE_LIVE_MODE_REFUSED';
    throw error;
  }

  return raw;
}

export async function createStripeBoundTestPaymentIntent({
  secretKey,
  transactionId,
  amountMinor,
  currency,
  apiVersion = STRIPE_M8_1_RETRIEVAL_PROFILE.stripe_api_version,
  fetchImpl = globalThis.fetch
}) {
  assertTransactionId(transactionId);
  assertMinorAmount(amountMinor);
  assertCurrency(currency);

  return postStripeForm({
    secretKey,
    path: '/v1/payment_intents',
    apiVersion,
    idempotencyKeyValue: idempotencyKey('create', transactionId),
    fetchImpl,
    params: {
      amount: amountMinor,
      currency: currency.toLowerCase(),
      'payment_method_types[]': 'card',
      'metadata[timeproofs_ap2_transaction_id]': transactionId,
      description: 'TimeProofs M8.1 provider-evidence test proof'
    }
  });
}

export async function confirmStripeBoundTestPaymentIntent({
  secretKey,
  paymentIntentId,
  transactionId,
  paymentMethod = 'pm_card_visa',
  apiVersion = STRIPE_M8_1_RETRIEVAL_PROFILE.stripe_api_version,
  fetchImpl = globalThis.fetch
}) {
  assertTransactionId(transactionId);
  if (typeof paymentIntentId !== 'string' || !/^pi_[A-Za-z0-9]+$/.test(paymentIntentId)) {
    const error = new Error('A valid Stripe PaymentIntent id (pi_...) is required for confirmation.');
    error.code = 'STRIPE_PAYMENT_INTENT_ID_REQUIRED';
    throw error;
  }
  if (typeof paymentMethod !== 'string' || !paymentMethod.startsWith('pm_')) {
    const error = new Error('A Stripe test PaymentMethod id is required.');
    error.code = 'STRIPE_TEST_PAYMENT_METHOD_REQUIRED';
    throw error;
  }

  return postStripeForm({
    secretKey,
    path: `/v1/payment_intents/${encodeURIComponent(paymentIntentId)}/confirm`,
    apiVersion,
    idempotencyKeyValue: idempotencyKey('confirm', transactionId),
    fetchImpl,
    params: {
      payment_method: paymentMethod,
      error_on_requires_action: 'true'
    }
  });
}
