/* sdk/timeproofs-v02.js
 * TimeProofs SDK — v0.2 (stateless, Ed25519-only)
 * Minimal, dependency-free. Browser + Node 18+ (global fetch + WebCrypto).
 *
 * Principles (v0.2):
 * - Never send raw data, only SHA-256 hashes.
 * - Server stores nothing.
 * - /api/timestamp returns a portable .tproof.json bundle structure.
 * - Verification is offline and cryptographic (Ed25519).
 */

(function (root, factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = factory();
  } else if (typeof define === "function" && define.amd) {
    define([], factory);
  } else {
    root.TimeProofsV02 = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  // Canonical authority (must match worker enforcement)
  const CANONICAL_ISSUER = "https://api.timeproofs.io";

  // Base URL of the v0.2 stateless API
  const DEFAULT_BASE = CANONICAL_ISSUER;

  const isBrowser =
    typeof window !== "undefined" && typeof window.document !== "undefined";

  const hasSubtle =
    typeof crypto !== "undefined" && crypto && crypto.subtle ? true : false;

  const textEncoder =
    typeof TextEncoder !== "undefined" ? new TextEncoder() : null;

  // ---------- Hex helpers ----------

  function toHex(uint8) {
    return Array.from(uint8)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  function hexToBytes(hex) {
    const h = String(hex || "").toLowerCase().trim();
    if (!/^[a-f0-9]+$/.test(h) || h.length % 2 !== 0) return null;
    const out = new Uint8Array(h.length / 2);
    for (let i = 0; i < out.length; i++) out[i] = parseInt(h.slice(i * 2, i * 2 + 2), 16);
    return out;
  }

  // ---------- Base64 helpers ----------

  function b64ToBytes(b64) {
    const s = String(b64 || "").trim();
    if (!s) return null;

    // Browser (atob)
    if (typeof atob === "function") {
      const bin = atob(s);
      const out = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
      return out;
    }

    // Node (Buffer)
    if (typeof Buffer !== "undefined") {
      return new Uint8Array(Buffer.from(s, "base64"));
    }

    return null;
  }

  // ---------- SHA-256 helpers ----------

  async function sha256HexBrowser(buffer) {
    if (!hasSubtle) throw new Error("Web Crypto API (crypto.subtle) not available");
    const digest = await crypto.subtle.digest("SHA-256", buffer);
    return toHex(new Uint8Array(digest));
  }

  async function sha256HexNode(buffer) {
    if (typeof require === "undefined") {
      throw new Error("Node-style require() not available in this environment");
    }
    const c = require("crypto");
    return c.createHash("sha256").update(buffer).digest("hex");
  }

  // ---------- Public hashing API ----------

  async function hashText(text) {
    if (typeof text !== "string") throw new Error("hashText expects a string");
    if (!textEncoder) throw new Error("TextEncoder not available");
    const bytes = textEncoder.encode(text);
    if (isBrowser) return sha256HexBrowser(bytes);
    return sha256HexNode(Buffer.from(bytes));
  }

  async function hashBytes(uint8) {
    if (!(uint8 instanceof Uint8Array)) throw new Error("hashBytes expects a Uint8Array");
    if (isBrowser) return sha256HexBrowser(uint8);
    return sha256HexNode(Buffer.from(uint8));
  }

  async function hashFile(file) {
    if (!isBrowser) throw new Error("hashFile is only available in browsers");
    if (!(file instanceof Blob)) throw new Error("hashFile expects a File/Blob");
    const buffer = await file.arrayBuffer();
    return sha256HexBrowser(buffer);
  }

  // ---------- HTTP helper (no auth in v0.2 stateless preview) ----------

  async function doRequest(baseUrl, path, options) {
    const base = (baseUrl || DEFAULT_BASE).replace(/\/+$/, "");
    const url = base + path;

    const headers = Object.assign(
      { "Content-Type": "application/json" },
      (options && options.headers) || {}
    );

    const res = await fetch(
      url,
      Object.assign({}, options || {}, { headers })
    );

    const text = await res.text();
    let json = null;
    try {
      json = text ? JSON.parse(text) : null;
    } catch (_) {
      json = null;
    }

    if (!res.ok) {
      const message =
        (json && (json.error || json.message)) ||
        "TimeProofs v0.2 API error (" + res.status + ")";
      const err = new Error(message);
      err.status = res.status;
      err.body = json || text;
      throw err;
    }

    return json;
  }

  // ---------- timestamp() (v0.2 stateless API) ----------

  async function timestamp(hash, options) {
    const cfg = options || {};
    const baseUrl = cfg.baseUrl || DEFAULT_BASE;

    const h = (hash || "").toLowerCase().trim();
    if (!/^[a-f0-9]{64}$/.test(h)) {
      throw new Error("timestamp requires a 64-character lowercase hex SHA-256 hash");
    }

    return doRequest(baseUrl, "/api/timestamp", {
      method: "POST",
      body: JSON.stringify({ hash: h }),
    });
  }

  // ---------- Canonical helpers ----------

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

  // ---------- Bundle creation (v0.2) ----------

  function createBundle(input) {
    if (!input || typeof input !== "object") {
      throw new Error("createBundle expects an object argument");
    }

    const version = input.version || "timeproofs-0.2";
    if (version !== "timeproofs-0.2") {
      throw new Error('version must be "timeproofs-0.2"');
    }

    const hash = normalizeHashObject(input.hash);

    const ts = input.timestamp;
    if (!ts || typeof ts !== "object") throw new Error("timestamp object is required");

    const issuedAt = typeof ts.issuedAt === "string" ? ts.issuedAt : "";
    const issuer = typeof ts.issuer === "string" ? ts.issuer : "";
    const nonce = typeof ts.nonce === "string" ? ts.nonce : "";

    if (!issuedAt) throw new Error("timestamp.issuedAt is required");
    if (!issuer) throw new Error("timestamp.issuer is required");
    if (!nonce) throw new Error("timestamp.nonce is required");

    // v0.2 frozen issuer
    if (issuer !== CANONICAL_ISSUER) {
      throw new Error("timestamp.issuer must be " + CANONICAL_ISSUER);
    }

    const expectedCanonical = buildCanonical(hash.value, issuedAt, issuer, nonce);
    const canonical = typeof input.canonical === "string" && input.canonical.trim()
      ? input.canonical.trim()
      : expectedCanonical;

    if (canonical !== expectedCanonical) {
      throw new Error("canonical mismatch (must match hash|issuedAt|issuer|nonce)");
    }

    const proof = input.proof;
    if (!proof || typeof proof !== "object") throw new Error("proof object is required");

    const algo = String(proof.algo || "").trim();
    if (algo !== "Ed25519") throw new Error('proof.algo must be "Ed25519"');

    const signature = String(proof.signature || "").toLowerCase().trim();
    if (!signature || !/^[a-f0-9]+$/.test(signature)) {
      throw new Error("proof.signature must be hex (Ed25519 signature)");
    }

    const keyId = typeof proof.keyId === "string" ? proof.keyId : "";
    if (!keyId) throw new Error("proof.keyId is required");

    const out = {
      version: "timeproofs-0.2",
      canonical,
      hash,
      timestamp: { issuedAt, issuer, nonce },
      proof: {
        algo: "Ed25519",
        signature,
        keyId,
      },
    };

    // optional informational publicKey
    if (typeof proof.publicKey === "string" && proof.publicKey.trim()) {
      out.proof.publicKey = proof.publicKey.trim();
    }

    // optional meta (local-only, not trusted by API)
    if (typeof input.meta === "object" && input.meta !== null) {
      out.meta = input.meta;
    }

    return out;
  }

  // ---------- Ed25519 verify (offline) ----------

  async function ed25519VerifySpkiB64(publicSpkiB64, msg, signatureHex) {
    if (!hasSubtle) throw new Error("Web Crypto API (crypto.subtle) not available");

    const pubBytes = b64ToBytes(publicSpkiB64);
    if (!pubBytes) throw new Error("Invalid public key (base64 SPKI expected)");

    const sigBytes = hexToBytes(signatureHex);
    if (!sigBytes) return false;

    const key = await crypto.subtle.importKey(
      "spki",
      pubBytes,
      { name: "Ed25519" },
      false,
      ["verify"]
    );

    const data = new TextEncoder().encode(msg);
    return crypto.subtle.verify("Ed25519", key, sigBytes, data);
  }

  // ---------- verifyBundle() (offline v0.2) ----------

  async function verifyBundle(bundle, options) {
    const opts = options || {};
    const errors = [];

    if (!bundle || typeof bundle !== "object") {
      return {
        valid: false,
        schemaValid: false,
        canonicalValid: false,
        proofValid: false,
        hashMatches: null,
        errors: ["bundle must be an object"],
      };
    }

    // Schema-ish checks
    if (bundle.version !== "timeproofs-0.2") errors.push('version must be "timeproofs-0.2"');

    let hashObj;
    try {
      hashObj = normalizeHashObject(bundle.hash);
    } catch (e) {
      errors.push(e && e.message ? e.message : "invalid hash object");
      hashObj = null;
    }

    const ts = bundle.timestamp;
    const issuedAt = ts && typeof ts.issuedAt === "string" ? ts.issuedAt : "";
    const issuer = ts && typeof ts.issuer === "string" ? ts.issuer : "";
    const nonce = ts && typeof ts.nonce === "string" ? ts.nonce : "";

    if (!issuedAt) errors.push("timestamp.issuedAt is required");
    if (!issuer) errors.push("timestamp.issuer is required");
    if (!nonce) errors.push("timestamp.nonce is required");

    const expectedIssuer = opts.expectedIssuer || CANONICAL_ISSUER;
    if (issuer && issuer !== expectedIssuer) {
      errors.push("timestamp.issuer must be " + expectedIssuer);
    }

    const canonical = typeof bundle.canonical === "string" ? bundle.canonical.trim() : "";
    if (!canonical) errors.push("canonical is required");

    let canonicalValid = false;
    if (hashObj && issuedAt && issuer && nonce && canonical) {
      const expectedCanonical = buildCanonical(hashObj.value, issuedAt, issuer, nonce);
      canonicalValid = canonical === expectedCanonical;
      if (!canonicalValid) errors.push("canonical mismatch (must match hash|issuedAt|issuer|nonce)");
    }

    const proof = bundle.proof;
    const algo = proof && typeof proof.algo === "string" ? proof.algo.trim() : "";
    const sig = proof && typeof proof.signature === "string" ? proof.signature.toLowerCase().trim() : "";
    const keyId = proof && typeof proof.keyId === "string" ? proof.keyId : "";

    if (algo !== "Ed25519") errors.push('proof.algo must be "Ed25519"');
    if (!sig || !/^[a-f0-9]+$/.test(sig)) errors.push("proof.signature must be hex");
    if (!keyId) errors.push("proof.keyId is required");

    const schemaValid = errors.length === 0;

    // Optional file hash verification
    let hashMatches = null;
    if (opts.file && hashObj && hashObj.value) {
      const targetHex = hashObj.value.toLowerCase().trim();
      try {
        let computed = null;

        if (opts.file instanceof Uint8Array) {
          computed = await hashBytes(opts.file);
        } else if (isBrowser && opts.file instanceof Blob) {
          computed = await hashFile(opts.file);
        } else {
          throw new Error("file must be Uint8Array or Blob (in browser)");
        }

        hashMatches = computed.toLowerCase() === targetHex;
        if (!hashMatches) errors.push("file hash does not match bundle.hash.value");
      } catch (e) {
        errors.push("error while computing hash: " + (e && e.message ? e.message : String(e)));
      }
    }

    // Ed25519 verification (offline)
    let proofValid = false;
    try {
      const trustedPublicKeyB64 =
        typeof opts.trustedPublicKey === "string" && opts.trustedPublicKey.trim()
          ? opts.trustedPublicKey.trim()
          : (proof && typeof proof.publicKey === "string" ? proof.publicKey.trim() : "");

      if (!trustedPublicKeyB64) {
        throw new Error("trustedPublicKey is required for offline verification");
      }

      if (!canonicalValid) {
        proofValid = false;
      } else {
        proofValid = await ed25519VerifySpkiB64(trustedPublicKeyB64, canonical, sig);
      }

      if (!proofValid) errors.push("invalid signature");
    } catch (e) {
      errors.push(e && e.message ? e.message : "signature verification error");
      proofValid = false;
    }

    const valid =
      schemaValid &&
      canonicalValid &&
      proofValid === true &&
      hashMatches !== false;

    return {
      valid,
      schemaValid,
      canonicalValid,
      proofValid,
      hashMatches,
      errors,
    };
  }

  // ---------- Client factory ----------

  function createClient(config) {
    const cfg = config || {};
    const baseUrl = cfg.baseUrl || DEFAULT_BASE;

    return {
      hashText,
      hashBytes,
      hashFile,
      async timestamp(hash) {
        return timestamp(hash, { baseUrl });
      },
      createBundle,
      verifyBundle,
    };
  }

  // ---------- Public API ----------

  return {
    createClient,
    hashText,
    hashBytes,
    hashFile,
    timestamp,
    createBundle,
    verifyBundle,
  };
});
