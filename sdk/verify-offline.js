// sdk/verify-offline.js
// Offline verification for TimeProofs proof bundles (.tproof.json)
// v0.2 – structural checks only (no crypto yet)

/**
 * Verify a .tproof.json bundle offline.
 *
 * For v0.2, this performs only STRUCTURAL validation:
 * - checks that the bundle has the expected fields for v0.2
 * - checks that the hash looks like a SHA-256 hex string
 * - optionally enforces the issuer
 *
 * Cryptographic checks (HMAC / Ed25519) are NOT implemented yet.
 *
 * @param {object} bundle - Parsed JSON content of a .tproof.json file
 * @param {object} [options]
 * @param {string} [options.expectedIssuer] - Optional issuer to enforce (e.g. "https://timeproofs.io")
 * @returns {Promise<{ ok: boolean, reason?: string }>}
 */
export async function verifyOffline(bundle, options = {}) {
  if (!bundle || typeof bundle !== "object") {
    return { ok: false, reason: "invalid-bundle" };
  }

  const {
    version,
    id,
    hash,
    alg,
    timestamp,
    datetime,
    issuer,
    sig_hmac,
    sig_ed25519,
    kid,
  } = bundle;

  // 1) Version check
  if (version !== "tp-0.2") {
    return { ok: false, reason: "unsupported-version" };
  }

  // 2) Required fields presence
  if (
    !id ||
    !hash ||
    !alg ||
    typeof timestamp !== "number" ||
    !datetime ||
    !issuer ||
    !kid
  ) {
    return { ok: false, reason: "missing-fields" };
  }

  // 3) Algorithm must be SHA-256
  if (alg !== "SHA-256") {
    return { ok: false, reason: "unsupported-algorithm" };
  }

  // 4) Hash must look like a 64-char hex string
  if (typeof hash !== "string" || !/^[a-f0-9]{64}$/i.test(hash)) {
    return { ok: false, reason: "invalid-hash-format" };
  }

  // 5) Datetime basic check (string; optional ISO sanity check)
  if (typeof datetime !== "string") {
    return { ok: false, reason: "invalid-datetime" };
  }

  // 6) Issuer check
  if (typeof issuer !== "string" || issuer.length === 0) {
    return { ok: false, reason: "invalid-issuer" };
  }

  if (options.expectedIssuer && issuer !== options.expectedIssuer) {
    return { ok: false, reason: "unexpected-issuer" };
  }

  // 7) kid basic check
  if (typeof kid !== "string" || kid.length === 0) {
    return { ok: false, reason: "invalid-kid" };
  }

  // 8) Signatures are optional in v0.2 bundles: they may be null or strings.
  if (
    sig_hmac != null &&
    (typeof sig_hmac !== "string" || !/^[a-f0-9]+$/i.test(sig_hmac))
  ) {
    return { ok: false, reason: "invalid-sig-hmac-format" };
  }

  if (sig_ed25519 != null && typeof sig_ed25519 !== "string") {
    return { ok: false, reason: "invalid-sig-ed25519-format" };
  }

  // NOTE:
  // Cryptographic checks (HMAC and Ed25519) are intentionally NOT implemented yet in v0.2.
  // This function only guarantees that the bundle "looks like" a valid v0.2 structure.

  return { ok: true, reason: "structure-valid-crypto-not-verified" };
}
