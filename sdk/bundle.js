/* sdk/bundle.js
 * TimeProofs v0.2 – Proof Bundle helpers
 *
 * - BUNDLE_VERSION = "timeproofs-0.2"
 * - createBundle(input) → objet prêt à être sérialisé en .tproof.json
 *
 * Le bundle suit la forme :
 * {
 *   version: "timeproofs-0.2",
 *   hash: { algorithm: "SHA-256", value: "<hex>" },
 *   timestamp: { issuedAt, issuer, nonce? },
 *   proof: { algo, hmac, signature, publicKey, keyId },
 *   meta?: { ... },
 *   userSign?: { publicKey, algorithm, signature }
 * }
 */

export const BUNDLE_VERSION = "timeproofs-0.2";

/**
 * Validation basique d'un hash hex SHA-256.
 * @param {string} hex
 * @returns {boolean}
 */
function isValidSha256Hex(hex) {
  return typeof hex === "string" && /^[0-9a-fA-F]{64}$/.test(hex.trim());
}

/**
 * Normalise le champ hash.
 * Accepte soit une string hex, soit un objet { algorithm, value }.
 *
 * @param {string|object} hash
 * @returns {{ algorithm: "SHA-256", value: string }}
 */
function normalizeHash(hash) {
  if (typeof hash === "string") {
    const v = hash.toLowerCase().trim();
    if (!isValidSha256Hex(v)) {
      throw new Error("createBundle: invalid SHA-256 hex in hash string");
    }
    return {
      algorithm: "SHA-256",
      value: v,
    };
  }

  if (!hash || typeof hash !== "object") {
    throw new Error("createBundle: hash must be a string or an object");
  }

  const algo = hash.algorithm;
  const value = typeof hash.value === "string" ? hash.value.toLowerCase().trim() : "";

  if (algo !== "SHA-256") {
    throw new Error('createBundle: hash.algorithm must be "SHA-256"');
  }
  if (!isValidSha256Hex(value)) {
    throw new Error("createBundle: invalid SHA-256 hex in hash.value");
  }

  return {
    algorithm: "SHA-256",
    value,
  };
}

/**
 * Validation minimale pour timestamp.
 *
 * @param {object} timestamp
 * @returns {{ issuedAt: string, issuer: string, nonce?: string }}
 */
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

  const out = { issuedAt, issuer };
  if (typeof nonce === "string" && nonce.length > 0) {
    out.nonce = nonce;
  }
  return out;
}

/**
 * Validation minimale pour proof.
 *
 * @param {object} proof
 * @returns {{ algo: string, hmac: string|null, signature: string|null, publicKey: string|null, keyId: string }}
 */
function normalizeProof(proof) {
  if (!proof || typeof proof !== "object") {
    throw new Error("createBundle: proof must be an object");
  }

  const algo = proof.algo;
  const hmac = proof.hmac ?? null;
  const signature = proof.signature ?? null;
  const publicKey = proof.publicKey ?? null;
  const keyId = proof.keyId;

  if (typeof algo !== "string" || !algo.length) {
    throw new Error("createBundle: proof.algo must be a non-empty string");
  }
  if (typeof keyId !== "string" || !keyId.length) {
    throw new Error("createBundle: proof.keyId must be a non-empty string");
  }

  if (hmac !== null && typeof hmac !== "string") {
    throw new Error("createBundle: proof.hmac must be a string or null");
  }
  if (signature !== null && typeof signature !== "string") {
    throw new Error("createBundle: proof.signature must be a string or null");
  }
  if (publicKey !== null && typeof publicKey !== "string") {
    throw new Error("createBundle: proof.publicKey must be a string or null");
  }

  return {
    algo,
    hmac,
    signature,
    publicKey,
    keyId,
  };
}

/**
 * Normalisation simple de meta : on laisse passer l'objet tel quel
 * (les contraintes complètes sont portées par le JSON Schema officiel).
 *
 * @param {object|undefined} meta
 * @returns {object|undefined}
 */
function normalizeMeta(meta) {
  if (meta == null) return undefined;
  if (typeof meta !== "object") {
    throw new Error("createBundle: meta must be an object if provided");
  }
  return meta;
}

/**
 * Normalisation simple de userSign.
 *
 * @param {object|undefined} userSign
 * @returns {object|undefined}
 */
function normalizeUserSign(userSign) {
  if (userSign == null) return undefined;
  if (typeof userSign !== "object") {
    throw new Error("createBundle: userSign must be an object if provided");
  }

  const { publicKey, algorithm, signature } = userSign;

  if (typeof publicKey !== "string" || !publicKey.length) {
    throw new Error("createBundle: userSign.publicKey must be a non-empty string");
  }
  if (typeof algorithm !== "string" || !algorithm.length) {
    throw new Error("createBundle: userSign.algorithm must be a non-empty string");
  }
  if (typeof signature !== "string" || !signature.length) {
    throw new Error("createBundle: userSign.signature must be a non-empty string");
  }

  return { publicKey, algorithm, signature };
}

/**
 * Crée un Proof Bundle v0.2 prêt à être sérialisé en .tproof.json.
 *
 * @param {object} input
 * @param {string|object} input.hash
 * @param {object} input.timestamp
 * @param {object} input.proof
 * @param {object} [input.meta]
 * @param {object} [input.userSign]
 * @returns {object} bundle
 */
export function createBundle(input) {
  if (!input || typeof input !== "object") {
    throw new Error("createBundle: input must be an object");
  }

  const hash = normalizeHash(input.hash);
  const timestamp = normalizeTimestamp(input.timestamp);
  const proof = normalizeProof(input.proof);
  const meta = normalizeMeta(input.meta);
  const userSign = normalizeUserSign(input.userSign);

  const bundle = {
    version: BUNDLE_VERSION,
    hash,
    timestamp,
    proof,
  };

  if (meta !== undefined) {
    bundle.meta = meta;
  }
  if (userSign !== undefined) {
    bundle.userSign = userSign;
  }

  return bundle;
}
