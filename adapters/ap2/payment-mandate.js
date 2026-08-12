import { sha256HexCanonical } from '../../timeproofs-core/canonical.js';

export const AP2_PAYMENT_ADAPTER = Object.freeze({
  id: 'timeproofs.ap2.payment-mandate',
  version: '0.1.0',
  supported_vct: 'mandate.payment.1',
  schema: 'https://ap2-protocol.org/schemas/payment_mandate.json',
  upstream_snapshot: 'google-agentic-commerce/AP2@e1ea56db72a6385bce3e5c1112b3a56ce60acb43'
});

function assertObject(value, name) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new TypeError(`${name} must be an object`);
}

export function adaptAp2PaymentMandate(raw, { observedAt = new Date().toISOString(), sourceRef = null } = {}) {
  assertObject(raw, 'AP2 payment mandate');
  if (raw.vct !== AP2_PAYMENT_ADAPTER.supported_vct) {
    const err = new Error(`Unsupported AP2 payment mandate VCT: ${raw.vct ?? 'missing'}`);
    err.code = 'UNSUPPORTED_VERSION';
    throw err;
  }
  if (typeof raw.transaction_id !== 'string' || !raw.transaction_id) throw new Error('Invalid AP2 payment mandate: transaction_id is required');
  if (!raw.payee || typeof raw.payee !== 'object') throw new Error('Invalid AP2 payment mandate: payee is required');
  if (!raw.payment_instrument || typeof raw.payment_instrument !== 'object') throw new Error('Invalid AP2 payment mandate: payment_instrument is required');
  const amount = raw.payment_amount;
  if (!amount || !Number.isInteger(amount.amount)) throw new Error('Invalid AP2 payment mandate: payment_amount.amount must be integer minor units');
  if (typeof amount.currency !== 'string' || !/^[A-Z]{3}$/.test(amount.currency)) throw new Error('Invalid AP2 payment mandate: payment_amount.currency must be ISO-4217 alpha-3');

  return {
    object_id: `ap2:payment:${raw.transaction_id}`,
    source: {
      namespace: 'ap2',
      object_type: 'payment_mandate',
      protocol_version: raw.vct,
      provider: null,
      provider_version: null
    },
    external_id: raw.transaction_id,
    observed_at: observedAt,
    snapshot: {
      digest: { algorithm: 'sha256', value: sha256HexCanonical(raw), scope: 'CANONICAL_JSON' },
      media_type: 'application/json',
      byte_length: Buffer.byteLength(JSON.stringify(raw)),
      source_ref: sourceRef
    },
    raw,
    canonical: {
      transaction_id: raw.transaction_id,
      currency: amount.currency,
      amount_minor: amount.amount,
      payee: raw.payee,
      execution_date: raw.execution_date ?? null,
      issued_at: raw.iat ?? null,
      expires_at: raw.exp ?? null
    },
    integrity: {},
    provenance: {
      adapter: AP2_PAYMENT_ADAPTER,
      mappings: {
        transaction_id: '$.transaction_id',
        currency: '$.payment_amount.currency',
        amount_minor: '$.payment_amount.amount'
      }
    }
  };
}
