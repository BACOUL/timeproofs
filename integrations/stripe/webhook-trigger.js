import crypto from 'node:crypto';

const DEFAULT_TOLERANCE_SECONDS = 300;

function timingSafeHexEqual(left, right) {
  if (typeof left !== 'string' || typeof right !== 'string') return false;
  if (!/^[a-f0-9]+$/i.test(left) || !/^[a-f0-9]+$/i.test(right)) return false;
  const a = Buffer.from(left, 'hex');
  const b = Buffer.from(right, 'hex');
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

function parseStripeSignatureHeader(header) {
  if (typeof header !== 'string' || !header.trim()) {
    const error = new Error('Stripe-Signature header is required.');
    error.code = 'STRIPE_WEBHOOK_SIGNATURE_REQUIRED';
    throw error;
  }

  const fields = header.split(',').map(part => part.trim()).filter(Boolean);
  let timestamp = null;
  const v1 = [];
  for (const field of fields) {
    const index = field.indexOf('=');
    if (index < 1) continue;
    const key = field.slice(0, index);
    const value = field.slice(index + 1);
    if (key === 't' && /^\d+$/.test(value)) timestamp = Number(value);
    if (key === 'v1' && value) v1.push(value);
  }

  if (!Number.isSafeInteger(timestamp)) {
    const error = new Error('Stripe webhook signature timestamp is missing or invalid.');
    error.code = 'STRIPE_WEBHOOK_TIMESTAMP_INVALID';
    throw error;
  }
  if (v1.length === 0) {
    const error = new Error('Stripe webhook signature has no v1 signature.');
    error.code = 'STRIPE_WEBHOOK_V1_REQUIRED';
    throw error;
  }
  return { timestamp, v1 };
}

export function verifyStripeWebhookTrigger({
  rawBody,
  signatureHeader,
  webhookSecret,
  nowSeconds = Math.floor(Date.now() / 1000),
  toleranceSeconds = DEFAULT_TOLERANCE_SECONDS
}) {
  if (!(typeof rawBody === 'string' || Buffer.isBuffer(rawBody))) {
    const error = new Error('Stripe webhook verification requires the raw request body.');
    error.code = 'STRIPE_WEBHOOK_RAW_BODY_REQUIRED';
    throw error;
  }
  if (typeof webhookSecret !== 'string' || !webhookSecret.startsWith('whsec_')) {
    const error = new Error('A Stripe webhook signing secret (whsec_...) is required.');
    error.code = 'STRIPE_WEBHOOK_SECRET_REQUIRED';
    throw error;
  }
  if (!Number.isSafeInteger(nowSeconds) || !Number.isInteger(toleranceSeconds) || toleranceSeconds < 0) {
    throw new TypeError('Invalid webhook verification clock/tolerance.');
  }

  const parsedSignature = parseStripeSignatureHeader(signatureHeader);
  const ageSeconds = Math.abs(nowSeconds - parsedSignature.timestamp);
  if (ageSeconds > toleranceSeconds) {
    const error = new Error('Stripe webhook signature timestamp is outside the allowed tolerance.');
    error.code = 'STRIPE_WEBHOOK_TIMESTAMP_OUT_OF_TOLERANCE';
    throw error;
  }

  const raw = Buffer.isBuffer(rawBody) ? rawBody : Buffer.from(rawBody, 'utf8');
  const signedPayload = Buffer.concat([
    Buffer.from(String(parsedSignature.timestamp), 'utf8'),
    Buffer.from('.', 'utf8'),
    raw
  ]);
  const expected = crypto.createHmac('sha256', webhookSecret).update(signedPayload).digest('hex');
  if (!parsedSignature.v1.some(signature => timingSafeHexEqual(signature, expected))) {
    const error = new Error('Stripe webhook signature verification failed.');
    error.code = 'STRIPE_WEBHOOK_SIGNATURE_INVALID';
    throw error;
  }

  let event;
  try {
    event = JSON.parse(raw.toString('utf8'));
  } catch {
    const error = new Error('Verified Stripe webhook body is not valid JSON.');
    error.code = 'STRIPE_WEBHOOK_JSON_INVALID';
    throw error;
  }

  const paymentIntent = event?.data?.object;
  if (!event || typeof event.id !== 'string' || event.object !== 'event') {
    const error = new Error('Stripe webhook payload is not an Event object.');
    error.code = 'STRIPE_WEBHOOK_EVENT_INVALID';
    throw error;
  }
  if (!paymentIntent || paymentIntent.object !== 'payment_intent' || typeof paymentIntent.id !== 'string' || !/^pi_[A-Za-z0-9]+$/.test(paymentIntent.id)) {
    return Object.freeze({
      accepted: false,
      event_id: event.id,
      event_type: event.type ?? null,
      reason: 'NON_PAYMENT_INTENT_EVENT'
    });
  }

  return Object.freeze({
    accepted: true,
    event_id: event.id,
    event_type: event.type ?? null,
    payment_intent_id: paymentIntent.id,
    trigger_only: true
  });
}

export const STRIPE_WEBHOOK_TRIGGER_PROFILE = Object.freeze({
  version: '0.1.0',
  default_tolerance_seconds: DEFAULT_TOLERANCE_SECONDS,
  evidence_semantics: 'trigger_only'
});
