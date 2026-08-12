import { sha256HexCanonical } from '../../timeproofs-core/canonical.js';

export const UCP_CHECKOUT_ADAPTER = Object.freeze({
  id: 'timeproofs.ucp.checkout',
  version: '0.1.0',
  supported_protocol_version: '2026-04-08',
  capability: 'dev.ucp.shopping.checkout',
  schema: 'https://ucp.dev/2026-04-08/schemas/shopping/checkout.json',
  upstream_snapshot: 'Universal-Commerce-Protocol/ucp@3b9a8dfe7c438b4765327d3f5f76c888f7d48367'
});

function assertObject(value, name) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new TypeError(`${name} must be an object`);
}

function declaredCheckoutCapability(raw) {
  const entries = raw?.ucp?.capabilities?.['dev.ucp.shopping.checkout'];
  if (!Array.isArray(entries)) return null;
  return entries.find(x => x?.version === UCP_CHECKOUT_ADAPTER.supported_protocol_version) || null;
}

export function adaptUcpCheckout(raw, { observedAt = new Date().toISOString(), sourceRef = null } = {}) {
  assertObject(raw, 'UCP checkout');
  const version = raw?.ucp?.version;
  if (version !== UCP_CHECKOUT_ADAPTER.supported_protocol_version) {
    const err = new Error(`Unsupported UCP version: ${version ?? 'missing'}`);
    err.code = 'UNSUPPORTED_VERSION';
    throw err;
  }
  if (typeof raw.id !== 'string' || !raw.id) throw new Error('Invalid UCP checkout: id is required');
  if (typeof raw.currency !== 'string' || !/^[A-Z]{3}$/.test(raw.currency)) throw new Error('Invalid UCP checkout: currency must be ISO-4217 alpha-3');
  if (!Array.isArray(raw.totals)) throw new Error('Invalid UCP checkout: totals must be an array');
  const grandTotals = raw.totals.filter(x => x?.type === 'total' && Number.isInteger(x?.amount));
  if (grandTotals.length !== 1) throw new Error('Invalid UCP checkout: totals must contain exactly one integer total amount');
  if (!Array.isArray(raw.line_items)) throw new Error('Invalid UCP checkout: line_items must be an array');
  if (!Array.isArray(raw.links)) throw new Error('Invalid UCP checkout: links must be an array');

  const capability = declaredCheckoutCapability(raw);
  return {
    object_id: `ucp:checkout:${raw.id}`,
    source: {
      namespace: 'ucp',
      object_type: 'checkout',
      protocol_version: version,
      provider: null,
      provider_version: null
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
      checkout_id: raw.id,
      currency: raw.currency,
      grand_total_minor: grandTotals[0].amount,
      checkout_status: raw.status ?? null,
      expires_at: raw.expires_at ?? null,
      ap2_merchant_authorization: raw?.ap2?.merchant_authorization ?? null,
      declared_checkout_capability: capability
    },
    integrity: {},
    provenance: {
      adapter: UCP_CHECKOUT_ADAPTER,
      mappings: {
        currency: '$.currency',
        grand_total_minor: '$.totals[?(@.type=="total")].amount'
      }
    }
  };
}
