/* sdk/bundle.js
 * TimeProofs v0.2 – Proof Bundle helpers (stateless, Ed25519-only)
 *
 * Bundle shape:
 * {
 *   version: "timeproofs-0.2",
 *   canonical: "<hash>|<issuedAt>|<issuer>|<nonce>",
 *   hash: { algorithm: "SHA-256", value: "<64 lowercase hex>" },
 *   timestamp: { issuedAt: "<ISO>", issuer: "https://api.timeproofs.io", nonce: "<hex/id>" },
 *   proof: { algo: "Ed25519", signature: "<hex>", keyId: "<string>", publicKey?: "<base64 spki>" },
 *   meta?: { ... } // local-only, untrusted
 * }
 */

export const BUNDLE_VERSION = "timeproofs-0.2";
export const CANONICAL_ISSUER = "https://api.timeproofs.io";

function isValidSha256HexLower(hex) {
  return typeof hex === "string" && /^[a-f0-9]{64}$/.test(hex);
}

function isValidHex(hex) {
  return typeof hex === "string" && /^[a-f0-9]+$/.test(hex);
}

function buildCanonical(hashHex, issuedAt, issuer, nonce) {
  return `${hashHex}|${issuedAt}|${issuer}|${nonce}`;
}

function normalizeHash(hash) {
  if (!hash || typeof hash !== "object") {
    throw new Error("createBundle: hash must be an object { algorithm, value }");
  }

  const algo = hash.algorithm;
  const value = typeof hash.value === "string" ? hash.value.toLowerCase().trim() : "";

  if (algo !== "SHA-256") {
    throw new Error('createBundle: hash.algorithm must be "SHA-256"');
  }
  if (!isValidSha256HexLower(value)) {
    throw new Error("createBundle: hash.value must be 64 lowercase hex (sha256)");
  }

  return { algorithm: "SHA-256", value };
}

function normalizeTimestamp(timestamp) {
  if (!timestamp || typeof timestamp !== "object") {
    throw new Error("createBundle: timestamp must be an object");
  }

  const issuedAt = timestamp.issuedAt;
  const issuer = timestamp.issuer;
  const nonce = timestamp.nonce;

  if (typeof issuedAt !== "string" || !issuedAt.length) {
    throw new Error("createBundle: timestamp.issuedAt must be a non-empty string");
  }
  if (typeof issuer !== "string" || !issuer.length) {
    throw new Error("createBundle: timestamp.issuer must be a non-empty string");
  }
  if (issuer !== CANONICAL_ISSUER) {
    throw new Error("createBundle: timestamp.issuer must be " + CANONICAL_ISSUER);
  }
  if (typeof nonce !== "string" || !nonce.length) {
    throw new Error("createBundle: timestamp.nonce must be a non-empty string");
  }

  return { issuedAt, issuer, nonce };
}

function normalizeProof(proof) {
  if (!proof || typeof proof !== "object") {
    throw new Error("createBundle: proof must be an object");
  }

  const algo = proof.algo;
  const signature = typeof proof.signature === "string" ? proof.signature.toLowerCase().trim() : "";
  const keyId = proof.keyId;

  if (algo !== "Ed25519") {
    throw new Error('createBundle: proof.algo must be "Ed25519"');
  }
  if (!signature || !isValidHex(signature)) {
    throw new Error("createBundle: proof.signature must be a hex string");
  }
  if (typeof keyId !== "string" || !keyId.length) {
    throw new Error("createBundle: proof.keyId must be a non-empty string");
  }

  const out = { algo: "Ed25519", signature, keyId };

  // optional informational publicKey (verify ignores it – key-freeze)
  if (typeof proof.publicKey === "string" && proof.publicKey.trim()) {
    out.publicKey = proof.publicKey.trim();
  }

  return out;
}

function normalizeMeta(meta) {
  if (meta == null) return undefined;
  if (typeof meta !== "object") {
    throw new Error("createBundle: meta must be an object if provided");
  }
  return meta;
}

export function createBundle(input) {
  if (!input || typeof input !== "object") {
    throw new Error("createBundle: input must be an object");
  }

  const hash = normalizeHash(input.hash);
  const timestamp = normalizeTimestamp(input.timestamp);
  const proof = normalizeProof(input.proof);
  const meta = normalizeMeta(input.meta);

  const expectedCanonical = buildCanonical(
    hash.value,
    timestamp.issuedAt,
    timestamp.issuer,
    timestamp.nonce
  );

  const canonical =
    typeof input.canonical === "string" && input.canonical.trim()
      ? input.canonical.trim()
      : expectedCanonical;

  if (canonical !== expectedCanonical) {
    throw new Error("createBundle: canonical mismatch (must be hash|issuedAt|issuer|nonce)");
  }

  const bundle = {
    version: BUNDLE_VERSION,
    canonical,
    hash,
    timestamp,
    proof,
  };

  if (meta !== undefined) {
    bundle.meta = meta;
  }

  return bundle;
}
