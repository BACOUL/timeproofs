/* sdk/timeproof.js
 * TimeProofs SDK — v0.2
 * Minimal, dependency-free. Browser + Node 18+ (global fetch).
 *
 * Principles (v0.2):
 * - Never send raw data, only hashes.
 * - Server is stateless: /api/timestamp returns a TimestampResponse.
 * - Bundles (.tproof.json) are built and verified client-side.
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

  const DEFAULT_BASE = "https://api.timeproofs.io";

  const isBrowser =
    typeof window !== "undefined" && typeof window.document !== "undefined";

  const hasSubtle =
    typeof crypto !== "undefined" && crypto && crypto.subtle ? true : false;

  const textEncoder =
    typeof TextEncoder !== "undefined" ? new TextEncoder() : null;

  // ---------------------------------------------------------
  // HEX HELPERS
  // ---------------------------------------------------------
  function toHex(uint8) {
    return Array.from(uint8)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  // ---------------------------------------------------------
  // SHA-256 HELPERS
  // ---------------------------------------------------------
  async function sha256HexBrowser(buffer) {
    if (!hasSubtle) throw new Error("Web Crypto API not available");
    const digest = await crypto.subtle.digest("SHA-256", buffer);
    return toHex(new Uint8Array(digest));
  }

  async function sha256HexNode(buffer) {
    const crypto = require("crypto");
    return crypto.createHash("sha256").update(buffer).digest("hex");
  }

  // ---------------------------------------------------------
  // PUBLIC HASHING API
  // ---------------------------------------------------------
  async function hashText(text) {
    if (typeof text !== "string") throw new Error("hashText expects a string");
    if (!textEncoder) throw new Error("TextEncoder unavailable");
    const bytes = textEncoder.encode(text);
    if (isBrowser) return sha256HexBrowser(bytes);
    return sha256HexNode(Buffer.from(bytes));
  }

  async function hashBytes(uint8) {
    if (!(uint8 instanceof Uint8Array))
      throw new Error("hashBytes expects Uint8Array");
    if (isBrowser) return sha256HexBrowser(uint8);
    return sha256HexNode(Buffer.from(uint8));
  }

  async function hashFile(file) {
    if (!isBrowser) throw new Error("hashFile only in browser");
    if (!(file instanceof Blob)) throw new Error("hashFile expects Blob/File");
    const buf = await file.arrayBuffer();
    return sha256HexBrowser(buf);
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

    const res = await fetch(
      url,
      Object.assign({}, options || {}, { headers })
    );

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
  // TIMESTAMP HELPER
  // ---------------------------------------------------------
  async function timestamp(hash, options) {
    const cfg = options || {};
    const baseUrl = cfg.baseUrl || DEFAULT_BASE;
    const apiKey = cfg.apiKey || null;

    const h = (hash || "").toLowerCase().trim();
    if (!/^[0-9a-f]{64}$/.test(h))
      throw new Error("timestamp requires a 64-char SHA-256 hex");

    return doRequest(baseUrl, apiKey, "/api/timestamp", {
      method: "POST",
      body: JSON.stringify({ hash: h }),
    });
  }

  // ---------------------------------------------------------
  // BUNDLE BUILDER
  // ---------------------------------------------------------
  function createBundle(input) {
    if (!input || typeof input !== "object")
      throw new Error("createBundle expects object");

    const { hash, timestamp: ts, proof, meta, userSign } = input;

    if (!hash || hash.algorithm !== "SHA-256")
      throw new Error("Invalid hash object");

    if (!ts || typeof ts.issuedAt !== "string")
      throw new Error("Invalid timestamp object");

    if (!proof || proof.algo !== "HMAC-SHA256+Ed25519")
      throw new Error("Invalid proof object");

    const bundle = {
      version: "timeproofs-0.2",
      hash: {
        algorithm: "SHA-256",
        value: hash.value.toLowerCase().trim(),
      },
      timestamp: {
        issuedAt: ts.issuedAt,
        issuer: ts.issuer,
      },
      proof: {
        algo: proof.algo,
        hmac: proof.hmac || null,
        signature: proof.signature || null,
        publicKey: proof.publicKey || null,
        keyId: proof.keyId,
      },
    };

    if (ts.nonce) bundle.timestamp.nonce = ts.nonce;
    if (meta) bundle.meta = meta;
    if (userSign) bundle.userSign = userSign;

    return bundle;
  }

  // ---------------------------------------------------------
  // VERIFY BUNDLE (OFFLINE)
  // ---------------------------------------------------------
  async function verifyBundle(bundle, options) {
    const opts = options || {};
    const errors = [];

    if (!bundle || typeof bundle !== "object")
      return {
        valid: false,
        schemaValid: false,
        proofValid: null,
        hashMatches: null,
        userSignValid: null,
        errors: ["bundle must be an object"],
      };

    if (bundle.version !== "timeproofs-0.2")
      errors.push('version must be "timeproofs-0.2"');

    if (!bundle.hash) errors.push("hash missing");
    if (!bundle.timestamp) errors.push("timestamp missing");
    if (!bundle.proof) errors.push("proof missing");

    const schemaValid = errors.length === 0;

    let hashMatches = null;

    if (opts.file && bundle.hash && bundle.hash.value) {
      let computed = null;
      const expected = bundle.hash.value.toLowerCase().trim();

      if (opts.file instanceof Uint8Array) {
        computed = await hashBytes(opts.file);
      } else if (isBrowser && opts.file instanceof Blob) {
        computed = await hashFile(opts.file);
      } else {
        errors.push("file must be Uint8Array or Blob");
      }

      if (computed) {
        hashMatches = computed === expected;
        if (!hashMatches) errors.push("file hash mismatch");
      }
    }

    return {
      valid: schemaValid && hashMatches !== false,
      schemaValid,
      proofValid: null,
      hashMatches,
      userSignValid: null,
      errors,
    };
  }

  // ---------------------------------------------------------
  // FORMAT PROOF (HUMAN-READABLE)
  // ---------------------------------------------------------
  function formatBundle(bundle, verifyResult) {
    const b = bundle;
    const vr = verifyResult || {};
    const lines = [];

    lines.push("TimeProofs — Proof of Existence");
    lines.push("Version: " + b.version);
    lines.push("");

    lines.push("Hash");
    lines.push("  Algorithm: " + b.hash.algorithm);
    lines.push("  Value:     " + b.hash.value);
    lines.push("");

    lines.push("Timestamp");
    lines.push("  Issued at: " + b.timestamp.issuedAt);
    lines.push("  Issuer:    " + b.timestamp.issuer);
    if (b.timestamp.nonce) lines.push("  Nonce:     " + b.timestamp.nonce);
    lines.push("");

    lines.push("Proof");
    lines.push("  Algo:      " + b.proof.algo);
    lines.push("  HMAC:      " + (b.proof.hmac || ""));
    lines.push("  Key ID:    " + b.proof.keyId);
    lines.push("");

    if (b.meta) {
      lines.push("Meta");
      for (const k of Object.keys(b.meta)) {
        lines.push("  " + k + ": " + b.meta[k]);
      }
      lines.push("");
    }

    lines.push("Verification");
    if (!verifyResult) {
      lines.push("  Status: offline");
    } else {
      lines.push("  Valid: " + vr.valid);
      lines.push("  Schema: " + vr.schemaValid);
      if (vr.hashMatches !== null)
        lines.push("  Hash matches: " + vr.hashMatches);
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
