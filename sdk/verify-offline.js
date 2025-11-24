// sdk/verify-offline.js
// Offline verification for TimeProofs proof bundles (.tproof.json)
// v0.2 - skeleton

/**
 * Verify a .tproof.json bundle offline.
 *
 * For v0.2, this is a skeleton:
 * - it checks that the bundle has the expected fields
 * - the actual Ed25519 verification will be implemented later
 *
 * @param {object} bundle - Parsed JSON content of a .tproof.json file
 * @param {object} [options]
 * @param {string} [options.expectedIssuer] - Optional issuer to enforce (e.g. "https://timeproofs.io")
 * @returns {Promise<{ ok: boolean, reason?: string }>}
 */
export async function verifyOffline(bundle, options = {}) {
  if (!bundle || typeof bundle !== 'object') {
    return { ok: false, reason: 'invalid-bundle' };
  }

  const {
    version,
    hash,
    alg,
    timestamp,
    datetime,
    issuer,
    sig_hmac,
    sig_ed25519,
    kid
  } = bundle;

  // Basic structure checks
  if (!version || !hash || !alg || !timestamp || !issuer || !sig_ed25519 || !kid) {
    return { ok: false, reason: 'missing-fields' };
  }

  if (alg !== 'SHA-256') {
    return { ok: false, reason: 'unsupported-algorithm' };
  }

  if (options.expectedIssuer && issuer !== options.expectedIssuer) {
    return { ok: false, reason: 'unexpected-issuer' };
  }

  // TODO v0.2:
  // - canonicalize the signed payload
  // - fetch public key from JWKS (/.well-known/jwks.json)
  // - verify Ed25519 signature (sig_ed25519)
  // - optional HMAC checks (sig_hmac) for private logs

  throw new Error('verifyOffline cryptographic checks are not implemented yet (v0.2 WIP)');
}
