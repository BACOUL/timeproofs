/* sdk/timeproof.js
 * TimeProofs SDK — v0.2 (stateless, Ed25519-only, key-freeze verify)
 * Minimal, dependency-free. Browser + Node 18+.
 *
 * - Never send raw data, only hashes.
 * - /api/timestamp returns a signed timestamp response.
 * - Clients build `.tproof.json` bundles locally and verify offline.
 *
 * NOTE: Offline Ed25519 verification requires WebCrypto (crypto.subtle).
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

  const VERSION = "timeproofs-0.2";
  const DEFAULT_BASE = "https://api.timeproofs.io";
  const CANONICAL_ISSUER = "https://api.timeproofs.io";

  const isBrowser =
    typeof window !== "undefined" && typeof window.document !== "undefined";

  const hasSubtle =
    typeof crypto !== "undefined" && crypto && crypto.subtle ? true : false;

  const textEncoder =
    typeof TextEncoder !== "undefined" ? new TextEncoder() : null;

  // ---------------------------------------------------------
  // HEX / BASE64 HELPERS
  // ---------------------------------------------------------
  function toHex(uint8) {
    return Array.from(uint8)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

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

  // ---------------------------------------------------------
  // SHA-256 HELPERS
  // ---------------------------------------------------------
  async function sha256HexWeb(buffer) {
    if (!hasSubtle) throw new Error("Web Crypto API (crypto.subtle) not available");
    const view = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
    const digest = await crypto.subtle.digest("SHA-256", view);
    return toHex(new Uint8Array(digest));
  }

  async function sha256HexNodeFallback(uint8) {
    const cryptoMod = require("crypto");
    return cryptoMod.createHash("sha256").update(uint8).digest("hex");
  }

  // ---------------------------------------------------------
  // PUBLIC HASHING API
  // ---------------------------------------------------------
  async function hashText(text) {
    if (typeof text !== "string") throw new Error("hashText expects a string");
    if (!textEncoder) throw new Error("TextEncoder unavailable");
    const bytes = textEncoder.encode(text);

    if (hasSubtle) return sha256HexWeb(bytes);
    if (!isBrowser) return sha256HexNodeFallback(bytes);

    throw new Error("No hashing backend available");
  }

  async function hashBytes(uint8) {
    if (!(uint8 instanceof Uint8Array)) throw new Error("hashBytes expects Uint8Array");

    if (hasSubtle) return sha256HexWeb(uint8);
    if (!isBrowser) return sha256HexNodeFallback(uint8);

    throw new Error("No hashing backend available");
  }

  async function hashFile(file) {
    if (!isBrowser) throw new Error("hashFile only in browser");
    if (!(file instanceof Blob)) throw new Error("hashFile expects Blob/File");
    const buf = await file.arrayBuffer();
    return sha256HexWeb(buf);
  }

  // ---------------------------------------------------------
  // HTTP REQUEST HELPER
  // ---------------------------------------------------------
  async function doRequest(baseUrl, apiKey, path, options) {
    const base = (baseUrl || DEFAULT_BASE).replace(/\/+$/, "");
    const url = base + path;

    const headers = Object.assign(
      { "Content-Type": "application/json" },
      (options && options.headers) || {}
    );

    if (apiKey) headers["Authorization"] = "Bearer " + apiKey;

    const res = await fetch(url, Object.assign({}, options || {}, { headers }));

    const text = await res.text();
    let json = null;
    try {
      json = text ? JSON.parse(text) : null;
    } catch (_) {}

    if (!res.ok) {
      const msg =
        (json && (json.error || json.message)) ||
        "TimeProofs v0.2 API error (" + res.status + ")";
      const err = new Error(msg);
      err.status = res.status;
      err.body = json || text;
      throw err;
    }

    return json;
  }

  // ---------------------------------------------------------
  // TIMESTAMP
  // ---------------------------------------------------------
  async function timestamp(hash, options) {
    const cfg = options || {};
    const baseUrl = cfg.baseUrl || DEFAULT_BASE;
    const apiKey = cfg.apiKey || null;

    const h = (hash || "").toLowerCase().trim();
    if (!isValidSha256HexLower(h)) {
      throw new Error("timestamp requires a 64-char lowercase SHA-256 hex");
    }

    return doRequest(baseUrl, apiKey, "/api/timestamp", {
      method: "POST",
      body: JSON.stringify({ hash: h }),
    });
  }

  // ---------------------------------------------------------
  // CREATE BUNDLE (v0.2)
  // ---------------------------------------------------------
  function createBundle(input) {
    if (!input || typeof input !== "object") throw new Error("createBundle expects object");

    const hash = input.hash;
    const ts = input.timestamp;
    const proof = input.proof;
    const meta = input.meta;

    if (!hash || typeof hash !== "object") throw new Error("createBundle: missing hash object");
    if (hash.algorithm !== "SHA-256") throw new Error('createBundle: hash.algorithm must be "SHA-256"');

    const hashHex = typeof hash.value === "string" ? hash.value.toLowerCase().trim() : "";
    if (!isValidSha256HexLower(hashHex)) throw new Error("createBundle: hash.value invalid");

    if (!ts || typeof ts !== "object") throw new Error("createBundle: missing timestamp object");
    if (typeof ts.issuedAt !== "string" || !ts.issuedAt) throw new Error("createBundle: timestamp.issuedAt required");
    if (typeof ts.issuer !== "string" || !ts.issuer) throw new Error("createBundle: timestamp.issuer required");
    if (ts.issuer !== CANONICAL_ISSUER) throw new Error("createBundle: timestamp.issuer must be " + CANONICAL_ISSUER);
    if (typeof ts.nonce !== "string" || !ts.nonce) throw new Error("createBundle: timestamp.nonce required");

    if (!proof || typeof proof !== "object") throw new Error("createBundle: missing proof object");
    if (proof.algo !== "Ed25519") throw new Error('createBundle: proof.algo must be "Ed25519"');

    const sig = typeof proof.signature === "string" ? proof.signature.toLowerCase().trim() : "";
    if (!sig || !isValidHex(sig)) throw new Error("createBundle: proof.signature invalid");

    if (typeof proof.keyId !== "string" || !proof.keyId) throw new Error("createBundle: proof.keyId required");

    const expectedCanonical = buildCanonical(hashHex, ts.issuedAt, ts.issuer, ts.nonce);
    const canonical =
      typeof input.canonical === "string" && input.canonical.trim()
        ? input.canonical.trim()
        : expectedCanonical;

    if (canonical !== expectedCanonical) {
      throw new Error("createBundle: canonical mismatch (must match hash|issuedAt|issuer|nonce)");
    }

    const bundle = {
      version: VERSION,
      canonical,
      hash: { algorithm: "SHA-256", value: hashHex },
      timestamp: { issuedAt: ts.issuedAt, issuer: ts.issuer, nonce: ts.nonce },
      proof: { algo: "Ed25519", signature: sig, keyId: proof.keyId },
    };

    // optional informational publicKey (verify ignores it – key-freeze)
    if (typeof proof.publicKey === "string" && proof.publicKey.trim()) {
      bundle.proof.publicKey = proof.publicKey.trim();
    }

    if (meta && typeof meta === "object") {
      bundle.meta = meta;
    }

    return bundle;
  }

  // ---------------------------------------------------------
  // VERIFY BUNDLE (OFFLINE, KEY-FREEZE)
  // ---------------------------------------------------------
  async function ed25519VerifySpkiB64(publicSpkiB64, msg, signatureHex) {
    if (!hasSubtle) throw new Error("WebCrypto (crypto.subtle) not available for Ed25519 verify");

    const pubBytes = b64ToBytes(publicSpkiB64);
    if (!pubBytes) throw new Error("invalid trustedPublicKey (base64 SPKI expected)");

    const sigBytes = hexToBytes(signatureHex);
    if (!sigBytes) return false;

    const key = await crypto.subtle.importKey("spki", pubBytes, { name: "Ed25519" }, false, ["verify"]);
    const data = new TextEncoder().encode(msg);
    return crypto.subtle.verify("Ed25519", key, sigBytes, data);
  }

  async function verifyBundle(bundle, options) {
    const opts = options || {};
    const errors = [];

    const expectedIssuer = opts.expectedIssuer || CANONICAL_ISSUER;
    const trustedPublicKey =
      typeof opts.trustedPublicKey === "string" && opts.trustedPublicKey.trim()
        ? opts.trustedPublicKey.trim()
        : null;

    if (!bundle || typeof bundle !== "object") {
      return { valid: false, schemaValid: false, canonicalValid: false, proofValid: false, hashMatches: null, errors: ["bundle-not-object"] };
    }

    // schema
    if (bundle.version !== VERSION) errors.push("invalid-version");
    if (typeof bundle.canonical !== "string" || !bundle.canonical.trim()) errors.push("canonical-missing");

    const h = bundle.hash;
    const ts = bundle.timestamp;
    const p = bundle.proof;

    if (!h || h.algorithm !== "SHA-256") errors.push("hash-invalid");
    const hashHex = h && typeof h.value === "string" ? h.value.toLowerCase().trim() : "";
    if (!isValidSha256HexLower(hashHex)) errors.push("hash.value-invalid");

    if (!ts || typeof ts.issuedAt !== "string" || !ts.issuedAt) errors.push("timestamp.issuedAt-invalid");
    if (!ts || typeof ts.issuer !== "string" || !ts.issuer) errors.push("timestamp.issuer-invalid");
    if (ts && ts.issuer && ts.issuer !== expectedIssuer) errors.push("timestamp.issuer-unexpected");
    if (!ts || typeof ts.nonce !== "string" || !ts.nonce) errors.push("timestamp.nonce-missing");

    if (!p || p.algo !== "Ed25519") errors.push("proof.algo-invalid");
    const sig = p && typeof p.signature === "string" ? p.signature.toLowerCase().trim() : "";
    if (!sig || !isValidHex(sig)) errors.push("proof.signature-invalid");
    if (!p || typeof p.keyId !== "string" || !p.keyId) errors.push("proof.keyId-invalid");

    const schemaValid = errors.length === 0;

    // canonical check
    let canonicalValid = false;
    if (schemaValid) {
      const expectedCanonical = buildCanonical(hashHex, ts.issuedAt, ts.issuer, ts.nonce);
      canonicalValid = String(bundle.canonical).trim() === expectedCanonical;
      if (!canonicalValid) errors.push("canonical-mismatch");
    }

    // optional hash recompute
    let hashMatches = null;
    if (schemaValid && opts.file != null) {
      try {
        let computed = null;
        if (opts.file instanceof Uint8Array) computed = await hashBytes(opts.file);
        else if (isBrowser && opts.file instanceof Blob) computed = await hashFile(opts.file);
        else if (typeof opts.file === "string") computed = await hashText(opts.file);
        else errors.push("file-unsupported");

        if (computed) {
          hashMatches = computed.toLowerCase() === hashHex;
          if (!hashMatches) errors.push("hash-mismatch");
        }
      } catch (e) {
        errors.push("hash-recompute-error");
        hashMatches = false;
      }
    }

    // ed25519 verify (key-freeze)
    let proofValid = false;
    if (schemaValid && canonicalValid) {
      if (!trustedPublicKey) {
        errors.push("missing-trustedPublicKey");
        proofValid = false;
      } else {
        try {
          proofValid = await ed25519VerifySpkiB64(trustedPublicKey, bundle.canonical.trim(), sig);
          if (!proofValid) errors.push("invalid-signature");
        } catch (_) {
          errors.push("ed25519-verify-error");
          proofValid = false;
        }
      }
    }

    const valid = schemaValid && canonicalValid && proofValid && (hashMatches !== false);

    return { valid, schemaValid, canonicalValid, proofValid, hashMatches, errors };
  }

  // ---------------------------------------------------------
  // FORMAT (HUMAN-READABLE)
  // ---------------------------------------------------------
  function formatBundle(bundle, verifyResult) {
    const b = bundle || {};
    const vr = verifyResult || {};
    const lines = [];

    lines.push("TimeProofs — Proof of Existence");
    lines.push("Version: " + (b.version || ""));
    lines.push("");

    lines.push("Hash");
    lines.push("  Algorithm: " + (b.hash && b.hash.algorithm ? b.hash.algorithm : ""));
    lines.push("  Value:     " + (b.hash && b.hash.value ? b.hash.value : ""));
    lines.push("");

    lines.push("Timestamp");
    lines.push("  Issued at: " + (b.timestamp && b.timestamp.issuedAt ? b.timestamp.issuedAt : ""));
    lines.push("  Issuer:    " + (b.timestamp && b.timestamp.issuer ? b.timestamp.issuer : ""));
    lines.push("  Nonce:     " + (b.timestamp && b.timestamp.nonce ? b.timestamp.nonce : ""));
    lines.push("");

    lines.push("Proof");
    lines.push("  Algo:      " + (b.proof && b.proof.algo ? b.proof.algo : ""));
    lines.push("  Signature: " + (b.proof && b.proof.signature ? b.proof.signature : ""));
    lines.push("  Key ID:    " + (b.proof && b.proof.keyId ? b.proof.keyId : ""));
    lines.push("");

    if (typeof b.canonical === "string") {
      lines.push("Canonical");
      lines.push("  " + b.canonical);
      lines.push("");
    }

    if (b.meta && typeof b.meta === "object") {
      lines.push("Meta (untrusted, local-only)");
      for (const k of Object.keys(b.meta)) {
        lines.push("  " + k + ": " + String(b.meta[k]));
      }
      lines.push("");
    }

    lines.push("Verification");
    if (!verifyResult) {
      lines.push("  Status: offline (not executed)");
    } else {
      lines.push("  Valid:          " + String(vr.valid));
      lines.push("  Schema:         " + String(vr.schemaValid));
      lines.push("  Canonical:      " + String(vr.canonicalValid));
      lines.push("  Signature:      " + String(vr.proofValid));
      if (vr.hashMatches !== null && typeof vr.hashMatches !== "undefined") {
        lines.push("  Hash matches:   " + String(vr.hashMatches));
      }
      if (vr.errors && vr.errors.length > 0) {
        lines.push("  Errors:");
        vr.errors.forEach((e) => lines.push("    - " + e));
      }
    }

    return lines.join("\n");
  }

  // ---------------------------------------------------------
  // CLIENT FACTORY
  // ---------------------------------------------------------
  function createClient(config) {
    const cfg = config || {};
    const baseUrl = cfg.baseUrl || DEFAULT_BASE;
    const apiKey = cfg.apiKey || null;

    return {
      hashText,
      hashBytes,
      hashFile,
      timestamp(hash) {
        return timestamp(hash, { baseUrl, apiKey });
      },
      createBundle,
      verifyBundle,
      formatBundle,
    };
  }

  return {
    createClient,
    hashText,
    hashBytes,
    hashFile,
    timestamp,
    createBundle,
    verifyBundle,
    formatBundle,
  };
});
