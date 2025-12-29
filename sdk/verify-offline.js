// sdk/verify-offline.js
// Offline verification for TimeProofs proof bundles (.tproof.json)
// v0.2 — Ed25519 verification (stateless, no storage)

const CANONICAL_ISSUER = "https://api.timeproofs.io";

// ---------- Helpers ----------

function hexToBytes(hex) {
  const h = String(hex || "").toLowerCase().trim();
  if (!/^[a-f0-9]+$/.test(h) || h.length % 2 !== 0) return null;
  const out = new Uint8Array(h.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(h.slice(i * 2, i * 2 + 2), 16);
  return out;
}

function b64ToBytes(b64) {
  const s = String(b64 || "").trim();
  if (!s) return null;

  if (typeof atob === "function") {
    const bin = atob(s);
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  }

  if (typeof Buffer !== "undefined") {
    return new Uint8Array(Buffer.from(s, "base64"));
  }

  return null;
}

function buildCanonical(hashHex, issuedAt, issuer, nonce) {
  return `${hashHex}|${issuedAt}|${issuer}|${nonce}`;
}

function normalizeHashObject(h) {
  if (!h || typeof h !== "object") throw new Error("hash object is required");
  if (h.algorithm !== "SHA-256") throw new Error('hash.algorithm must be "SHA-256"');
  const v = String(h.value || "").toLowerCase().trim();
  if (!/^[a-f0-9]{64}$/.test(v)) throw new Error("hash.value must be 64-char lowercase hex");
  return { algorithm: "SHA-256", value: v };
}

async function ed25519VerifySpkiB64(publicSpkiB64, msg, signatureHex) {
  if (typeof crypto === "undefined" || !crypto.subtle) {
    throw new Error("WebCrypto (crypto.subtle) not available");
  }

  const pubBytes = b64ToBytes(publicSpkiB64);
  if (!pubBytes) throw new Error("invalid public key (base64 SPKI expected)");

  const sigBytes = hexToBytes(signatureHex);
  if (!sigBytes) return false;

  const key = await crypto.subtle.importKey("spki", pubBytes, { name: "Ed25519" }, false, [
    "verify",
  ]);

  const data = new TextEncoder().encode(msg);
  return crypto.subtle.verify("Ed25519", key, sigBytes, data);
}

/**
 * Verify a `.tproof.json` bundle offline (v0.2).
 *
 * Requirements:
 * - bundle.version === "timeproofs-0.2"
 * - issuer must match https://api.timeproofs.io (unless overridden)
 * - canonical must equal "<hash>|<issuedAt>|<issuer>|<nonce>"
 * - proof.algo === "Ed25519"
 * - proof.signature must verify against a trusted public key
 *
 * Options:
 * - expectedIssuer: string (default: https://api.timeproofs.io)
 * - trustedPublicKey: base64 SPKI Ed25519 public key (required)
 *
 * Returns:
 * { ok: boolean, valid: boolean, reason?: string, details?: object }
 */
export async function verifyOffline(bundle, options = {}) {
  try {
    if (!bundle || typeof bundle !== "object") {
      return { ok: false, valid: false, reason: "invalid_bundle" };
    }

    if (bundle.version !== "timeproofs-0.2") {
      return { ok: false, valid: false, reason: "unsupported_version" };
    }

    const expectedIssuer = options.expectedIssuer || CANONICAL_ISSUER;

    const hash = normalizeHashObject(bundle.hash);

    const ts = bundle.timestamp;
    if (!ts || typeof ts !== "object") {
      return { ok: false, valid: false, reason: "missing_timestamp" };
    }

    const issuedAt = typeof ts.issuedAt === "string" ? ts.issuedAt : "";
    const issuer = typeof ts.issuer === "string" ? ts.issuer : "";
    const nonce = typeof ts.nonce === "string" ? ts.nonce : "";

    if (!issuedAt || !issuer || !nonce) {
      return { ok: false, valid: false, reason: "missing_timestamp_fields" };
    }

    if (issuer !== expectedIssuer) {
      return { ok: false, valid: false, reason: "unexpected_issuer" };
    }

    const canonical = typeof bundle.canonical === "string" ? bundle.canonical.trim() : "";
    if (!canonical) {
      return { ok: false, valid: false, reason: "missing_canonical" };
    }

    const expectedCanonical = buildCanonical(hash.value, issuedAt, issuer, nonce);
    if (canonical !== expectedCanonical) {
      return { ok: false, valid: false, reason: "canonical_mismatch" };
    }

    const proof = bundle.proof;
    if (!proof || typeof proof !== "object") {
      return { ok: false, valid: false, reason: "missing_proof" };
    }

    const algo = typeof proof.algo === "string" ? proof.algo.trim() : "";
    const signature = typeof proof.signature === "string" ? proof.signature.toLowerCase().trim() : "";
    const keyId = typeof proof.keyId === "string" ? proof.keyId : "";

    if (algo !== "Ed25519") {
      return { ok: false, valid: false, reason: "unsupported_proof_algo" };
    }
    if (!signature || !/^[a-f0-9]+$/.test(signature)) {
      return { ok: false, valid: false, reason: "invalid_signature_format" };
    }
    if (!keyId) {
      return { ok: false, valid: false, reason: "missing_key_id" };
    }

    const trustedPublicKey =
      typeof options.trustedPublicKey === "string" && options.trustedPublicKey.trim()
        ? options.trustedPublicKey.trim()
        : null;

    if (!trustedPublicKey) {
      return { ok: false, valid: false, reason: "missing_trusted_public_key" };
    }

    const sigOk = await ed25519VerifySpkiB64(trustedPublicKey, canonical, signature);
    if (!sigOk) {
      return { ok: true, valid: false, reason: "invalid_signature" };
    }

    return {
      ok: true,
      valid: true,
      details: {
        version: bundle.version,
        issuer,
        keyId,
        hash: hash.value,
        issuedAt,
        nonce,
      },
    };
  } catch (e) {
    return {
      ok: false,
      valid: false,
      reason: "verify_error",
      details: { message: e && e.message ? e.message : String(e) },
    };
  }
      }
