import { sha256HexCanonical } from '../../timeproofs-core/canonical.js';

export const STRIPE_PAYMENT_INTENT_ADAPTER = Object.freeze({
  id: 'timeproofs.stripe.payment-intent',
  version: '0.1.0',
  provider: 'stripe',
  supported_api_versions: Object.freeze(['2026-02-25.clover']),
  object_type: 'payment_intent',
  docs_profile: 'Stripe PaymentIntent'
});

const DEFAULT_BINDING_METADATA_KEY = 'timeproofs_ap2_transaction_id';

function assertObject(value, name) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new TypeError(`${name} must be an object`);
}

export function adaptStripePaymentIntent(
  raw,
  {
    apiVersion = STRIPE_PAYMENT_INTENT_ADAPTER.supported_api_versions[0],
    observedAt = new Date().toISOString(),
    sourceRef = null,
    bindingMetadataKey = DEFAULT_BINDING_METADATA_KEY
  } = {}
) {
  assertObject(raw, 'Stripe PaymentIntent');
  if (!STRIPE_PAYMENT_INTENT_ADAPTER.supported_api_versions.includes(apiVersion)) {
    const err = new Error(`Unsupported Stripe API version: ${apiVersion ?? 'missing'}`);
    err.code = 'UNSUPPORTED_PROVIDER_VERSION';
    throw err;
  }
  if (raw.object !== 'payment_intent') throw new Error('Invalid Stripe evidence: object must be payment_intent');
  if (typeof raw.id !== 'string' || !raw.id) throw new Error('Invalid Stripe PaymentIntent: id is required');
  if (!Number.isInteger(raw.amount)) throw new Error('Invalid Stripe PaymentIntent: amount must be integer minor units');
  if (typeof raw.currency !== 'string' || !/^[a-zA-Z]{3}$/.test(raw.currency)) {
    throw new Error('Invalid Stripe PaymentIntent: currency must be ISO-4217 alpha-3');
  }
  if (typeof raw.status !== 'string' || !raw.status) throw new Error('Invalid Stripe PaymentIntent: status is required');
  if (typeof bindingMetadataKey !== 'string' || !bindingMetadataKey) throw new TypeError('bindingMetadataKey must be a non-empty string');

  const metadata = raw.metadata && typeof raw.metadata === 'object' && !Array.isArray(raw.metadata) ? raw.metadata : {};
  const authorizationReference = typeof metadata[bindingMetadataKey] === 'string' && metadata[bindingMetadataKey]
    ? metadata[bindingMetadataKey]
    : null;

  return {
    object_id: `provider:stripe:payment_intent:${raw.id}`,
    source: {
      namespace: 'provider',
      object_type: 'executed_payment',
      protocol_version: null,
      provider: 'stripe',
      provider_version: apiVersion
    },
    external_id: raw.id,
    observed_at: observedAt,
    snapshot: {
      digest: { algorithm: 'sha256', value: sha256HexCanonical(raw), scope: 'CANONICAL_JSON' },
      media_type: 'application/json',
      byte_length: Buffer.byteLength(JSON.stringify(raw)),
      source_ref: sourceRef
    },
    raw,
    canonical: {
      provider_payment_id: raw.id,
      provider_status: raw.status,
      currency: raw.currency.toUpperCase(),
      amount_intended_minor: raw.amount,
      amount_received_minor: Number.isInteger(raw.amount_received) ? raw.amount_received : null,
      capture_method: raw.capture_method ?? null,
      latest_charge: typeof raw.latest_charge === 'string' ? raw.latest_charge : raw.latest_charge?.id ?? null,
      canceled_at: raw.canceled_at ?? null,
      livemode: typeof raw.livemode === 'boolean' ? raw.livemode : null,
      authorization_reference: authorizationReference,
      authorization_reference_basis: authorizationReference ? `metadata.${bindingMetadataKey}` : null
    },
    integrity: {},
    provenance: {
      adapter: STRIPE_PAYMENT_INTENT_ADAPTER,
      mappings: {
        provider_payment_id: '$.id',
        provider_status: '$.status',
        currency: '$.currency',
        amount_intended_minor: '$.amount',
        amount_received_minor: '$.amount_received',
        authorization_reference: `$.metadata.${bindingMetadataKey}`
      }
    }
  };
}
