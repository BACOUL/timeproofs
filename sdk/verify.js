/* sdk/verify.js
 * TimeProofs v0.2 — Offline verification (stateless, Ed25519-only)
 *
 * verifyBundle(bundle, fileOrBytes?, options?)
 * → { valid, schemaValid, canonicalValid, proofValid, hashMatches, errors }
 *
 * options:
 * - expectedIssuer?: string (default: https://api.timeproofs.io)
 * - trustedPublicKey: string (base64 SPKI Ed25519 public key)  REQUIRED
 */

import { hashBytes, hashFile, hashText, isBrowser } from "./hash.js";
import { BUNDLE_VERSION, CANONICAL_ISSUER } from "./bundle.js";

function isValidSha256HexLower(hex) {
  return typeof hex === "string" && /^[a-f0-9]{64}$/.test(hex);
}

function isValidHex(hex) {
  return typeof hex === "string" && /^[a-f0-9]+$/.test(hex);
}

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

function normalizeHashObject(h, errors) {
  if (!h || typeof h !== "object") {
    errors.push("hash-missing");
    return null;
  }
  if (h.algorithm !== "SHA-256") {
    errors.push('hash.algorithm-must-be-"SHA-256"');
  }
  const v = typeof h.value === "string" ? h.value.toLowerCase().trim() : "";
  if (!isValidSha256HexLower(v)) {
    errors.push("hash.value-invalid-sha256");
  }
  if (errors.length) return null;
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

function basicSchemaCheck(bundle, errors, expectedIssuer) {
  if (!bundle || typeof bundle !== "object") {
    errors.push("bundle-not-object");
    return false;
  }

  if (bundle.version !== BUNDLE_VERSION) {
    errors.push(`invalid-version: expected ${BUNDLE_VERSION}`);
  }

  // canonical
  if (typeof bundle.canonical !== "string" || !bundle.canonical.trim()) {
    errors.push("canonical-missing");
  }

  // hash
  const hash = normalizeHashObject(bundle.hash, errors);

  // timestamp
  const t = bundle.timestamp;
  if (!t || typeof t !== "object") {
    errors.push("timestamp-missing");
  } else {
    if (typeof t.issuedAt !== "string" || !t.issuedAt.length) {
      errors.push("timestamp.issuedAt-invalid");
    }
    if (typeof t.issuer !== "string" || !t.issuer.length) {
      errors.push("timestamp.issuer-invalid");
    } else if (t.issuer !== expectedIssuer) {
      errors.push("timestamp.issuer-unexpected");
    }
    if (typeof t.nonce !== "string" || !t.nonce.length) {
      errors.push("timestamp.nonce-missing");
    }
  }

  // proof
  const p = bundle.proof;
  if (!p || typeof p !== "object") {
    errors.push("proof-missing");
  } else {
    if (p.algo !== "Ed25519") {
      errors.push('proof.algo-must-be-"Ed25519"');
    }
    const sig = typeof p.signature === "string" ? p.signature.toLowerCase().trim() : "";
    if (!sig || !isValidHex(sig)) {
      errors.push("proof.signature-invalid");
    }
    if (typeof p.keyId !== "string" || !p.keyId.length) {
      errors.push("proof.keyId-invalid");
    }
  }

  return errors.length === 0 && !!hash;
}

function checkCanonical(bundle, errors) {
  const hashHex = bundle?.hash?.value ? String(bundle.hash.value).toLowerCase().trim() : "";
  const issuedAt = bundle?.timestamp?.issuedAt || "";
  const issuer = bundle?.timestamp?.issuer || "";
  const nonce = bundle?.timestamp?.nonce || "";
  const canonical = String(bundle?.canonical || "").trim();

  if (!hashHex || !issuedAt || !issuer || !nonce || !canonical) return false;

  const expected = buildCanonical(hashHex, issuedAt, issuer, nonce);
  const ok = canonical === expected;
  if (!ok) errors.push("canonical-mismatch");
  return ok;
}

async function checkHashMatch(bundle, fileOrBytes, errors) {
  if (fileOrBytes == null) return null;

  const targetHex = (bundle.hash && bundle.hash.value ? String(bundle.hash.value) : "")
    .toLowerCase()
    .trim();

  if (!isValidSha256HexLower(targetHex)) {
    errors.push("hash.value-invalid-sha256");
    return false;
  }

  let computedHex;

  if (fileOrBytes instanceof Uint8Array) {
    computedHex = (await hashBytes(fileOrBytes)).toLowerCase();
  } else if (isBrowser && fileOrBytes instanceof Blob) {
    computedHex = (await hashFile(fileOrBytes)).toLowerCase();
  } else if (typeof fileOrBytes === "string") {
    computedHex = (await hashText(fileOrBytes)).toLowerCase();
  } else {
    errors.push("unsupported-fileOrBytes-type");
    return false;
  }

  if (computedHex !== targetHex) {
    errors.push("hash-mismatch");
    return false;
  }

  return true;
}

async function checkEd25519Proof(bundle, trustedPublicKey, errors) {
  if (!trustedPublicKey) {
    errors.push("missing-trustedPublicKey");
    return false;
  }

  const canonical = String(bundle.canonical || "").trim();
  const sig = String(bundle?.proof?.signature || "").toLowerCase().trim();

  if (!canonical || !sig) return false;

  try {
    const ok = await ed25519VerifySpkiB64(trustedPublicKey, canonical, sig);
    if (!ok) errors.push("invalid-signature");
    return ok;
  } catch (e) {
    errors.push("ed25519-verify-error");
    return false;
  }
}

export async function verifyBundle(bundle, fileOrBytes, options = {}) {
  const errors = [];
  const expectedIssuer = options.expectedIssuer || CANONICAL_ISSUER;
  const trustedPublicKey =
    typeof options.trustedPublicKey === "string" && options.trustedPublicKey.trim()
      ? options.trustedPublicKey.trim()
      : null;

  const schemaValid = basicSchemaCheck(bundle, errors, expectedIssuer);

  const canonicalValid = schemaValid ? checkCanonical(bundle, errors) : false;

  const hashMatches = schemaValid
    ? await checkHashMatch(bundle, fileOrBytes, errors)
    : null;

  const proofValid =
    schemaValid && canonicalValid ? await checkEd25519Proof(bundle, trustedPublicKey, errors) : false;

  const valid =
    schemaValid &&
    canonicalValid &&
    proofValid === true &&
    (hashMatches !== false);

  return {
    valid,
    schemaValid,
    canonicalValid,
    proofValid,
    hashMatches,
    errors,
  };
      }
