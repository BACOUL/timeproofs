/* sdk/timeproof.js
 * TimeProofs SDK — v0.2
 * Minimal, dependency-free. Browser + Node 18+ (global fetch).
 *
 * Principles (v0.2):
 * - Never send raw data, only hashes.
 * - Server is stateless: /api/timestamp returns a TimestampResponse.
 * - Bundles (.tproof.json) are built and verified client-side.
 *
 * Typical usage:
 *   const tp = TimeProofsV02.createClient({ apiKey: 'tp_test_xxx' });
 *   const hash = await tp.hashText('hello');
 *   const ts   = await tp.timestamp(hash);
 *   const bundle = tp.createBundle({
 *     hash: ts.hash,
 *     timestamp: ts.timestamp,
 *     proof: ts.proof,
 *     meta: { type: 'document' }
 *   });
 */

(function (root, factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = factory();
  } else if (typeof define === "function" && define.amd) {
    define([], factory);
  } else {
    // Global for browser usage in v0.2
    root.TimeProofsV02 = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  // Base URL of the v0.2 stateless API
  const DEFAULT_BASE = "https://api.timeproofs.io";

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

  // ---------- SHA-256 helpers ----------

  async function sha256HexBrowser(buffer) {
    if (!hasSubtle) {
      throw new Error("Web Crypto API (crypto.subtle) not available");
    }
    const digest = await crypto.subtle.digest("SHA-256", buffer);
    return toHex(new Uint8Array(digest));
  }

  async function sha256HexNode(buffer) {
    if (typeof require === "undefined") {
      throw new Error("Node-style require() not available in this environment");
    }
    const crypto = require("crypto");
    return crypto.createHash("sha256").update(buffer).digest("hex");
  }

  // ---------- Public hashing API ----------

  async function hashText(text) {
    if (typeof text !== "string") {
      throw new Error("hashText expects a string");
    }
    if (!textEncoder) {
      throw new Error("TextEncoder not available");
    }
    const bytes = textEncoder.encode(text);
    if (isBrowser) {
      return sha256HexBrowser(bytes);
    }
    return sha256HexNode(Buffer.from(bytes));
  }

  async function hashBytes(uint8) {
    if (!(uint8 instanceof Uint8Array)) {
      throw new Error("hashBytes expects a Uint8Array");
    }
    if (isBrowser) {
      return sha256HexBrowser(uint8);
    }
    return sha256HexNode(Buffer.from(uint8));
  }

  async function hashFile(file) {
    if (!isBrowser) {
      throw new Error("hashFile is only available in browsers");
    }
    if (!(file instanceof Blob)) {
      throw new Error("hashFile expects a File/Blob");
    }
    const buffer = await file.arrayBuffer();
    return sha256HexBrowser(buffer);
  }

  // ---------- HTTP helper ----------

  async function doRequest(baseUrl, apiKey, path, options) {
    const base = (baseUrl || DEFAULT_BASE).replace(/\/+$/, "");
    const url = base + path;

    const headers = Object.assign(
      {
        "Content-Type": "application/json",
      },
      (options && options.headers) || {}
    );

    if (apiKey) {
      headers["Authorization"] = "Bearer " + apiKey;
    }

    const res = await fetch(
      url,
      Object.assign({}, options || {}, {
        headers,
      })
    );

    const text = await res.text();
    let json = null;
    try {
      json = text ? JSON.parse(text) : null;
    } catch (_) {
      // keep text in json = null
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

  // ---------- timestamp() helper (v0.2 stateless API) ----------

  /**
   * Request a timestamp for a given SHA-256 hash (hex).
   *
   * This calls POST /api/timestamp on the v0.2 stateless API and returns
   * the TimestampResponse:
   *
   * {
   *   hash:      { algorithm: "SHA-256", value: "<hex>" },
   *   timestamp: { issuedAt: "<ISO-UTC>", issuer: "<url>", nonce: "<id>" },
   *   proof:     {
   *     algo: "HMAC-SHA256+Ed25519",
   *     hmac: "<hex|null>",
   *     signature: null,
   *     publicKey: null,
   *     keyId: "tp-v0-2-main"
   *   }
   * }
   *
   * @param {string} hash - 64-char lowercase hex SHA-256 digest
   * @param {object} [options]
   * @param {string} [options.baseUrl] - API base URL (default: https://api.timeproofs.io)
   * @param {string} [options.apiKey]  - optional API key
   * @returns {Promise<object>} TimestampResponse
   */
  async function timestamp(hash, options) {
    const cfg = options || {};
    const baseUrl = cfg.baseUrl || DEFAULT_BASE;
    const apiKey = cfg.apiKey || null;

    const h = (hash || "").toLowerCase().trim();
    if (!/^[0-9a-f]{64}$/.test(h)) {
      throw new Error("timestamp requires a 64-character hex SHA-256 hash");
    }

    const body = { hash: h };

    return doRequest(baseUrl, apiKey, "/api/timestamp", {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  // ---------- Bundle helpers (v0.2) ----------

  /**
   * Build a TimeProofs v0.2 Proof Bundle (.tproof.json) from:
   * - hash:      { algorithm: "SHA-256", value: "<hex>" }
   * - timestamp: { issuedAt: "<ISO-UTC>", issuer: "<url>", nonce?: "<id>" }
   * - proof:     { algo: "HMAC-SHA256+Ed25519", hmac, signature, publicKey, keyId }
   * - meta?:     local-only metadata (never sent to the server)
   * - userSign?: optional local signature structure (not validated here)
   */
  function createBundle(input) {
    if (!input || typeof input !== "object") {
      throw new Error("createBundle expects an object argument");
    }

    const hash = input.hash;
    const timestampObj = input.timestamp;
    const proof = input.proof;
    const meta = input.meta;
    const userSign = input.userSign;

    // Basic shape checks for hash
    if (!hash || typeof hash !== "object") {
      throw new Error("createBundle requires a 'hash' object");
    }
    if (hash.algorithm !== "SHA-256") {
      throw new Error("createBundle requires hash.algorithm === 'SHA-256'");
    }
    if (
      typeof hash.value !== "string" ||
      !/^[0-9a-f]{64}$/i.test(hash.value.trim())
    ) {
      throw new Error(
        "createBundle requires hash.value to be a 64-char hex string"
      );
    }

    // Basic shape checks for timestamp
    if (!timestampObj || typeof timestampObj !== "object") {
      throw new Error("createBundle requires a 'timestamp' object");
    }
    if (typeof timestampObj.issuedAt !== "string") {
      throw new Error("createBundle requires timestamp.issuedAt (string)");
    }
    if (typeof timestampObj.issuer !== "string") {
      throw new Error("createBundle requires timestamp.issuer (string)");
    }

    // Basic shape checks for proof
    if (!proof || typeof proof !== "object") {
      throw new Error("createBundle requires a 'proof' object");
    }
    if (proof.algo !== "HMAC-SHA256+Ed25519") {
      throw new Error(
        "createBundle requires proof.algo === 'HMAC-SHA256+Ed25519'"
      );
    }
    if (typeof proof.keyId !== "string") {
      throw new Error("createBundle requires proof.keyId (string)");
    }

    // meta is optional, but if provided must be an object
    let metaClean;
    if (typeof meta === "undefined" || meta === null) {
      metaClean = undefined;
    } else if (typeof meta === "object") {
      metaClean = meta;
    } else {
      throw new Error("createBundle expects meta to be an object if provided");
    }

    // userSign is optional, pass-through (validation can be added later)
    let userSignClean;
    if (typeof userSign === "undefined" || userSign === null) {
      userSignClean = undefined;
    } else if (typeof userSign === "object") {
      userSignClean = userSign;
    } else {
      throw new Error(
        "createBundle expects userSign to be an object if provided"
      );
    }

    const bundle = {
      version: "timeproofs-0.2",
      hash: {
        algorithm: "SHA-256",
        value: hash.value.toLowerCase().trim(),
      },
      timestamp: {
        issuedAt: timestampObj.issuedAt,
        issuer: timestampObj.issuer,
      },
      proof: {
        algo: proof.algo,
        hmac: proof.hmac || null,
        signature:
          typeof proof.signature === "string" || proof.signature === null
            ? proof.signature
            : null,
        publicKey:
          typeof proof.publicKey === "string" || proof.publicKey === null
            ? proof.publicKey
            : null,
        keyId: proof.keyId,
      },
    };

    if (typeof timestampObj.nonce === "string") {
      bundle.timestamp.nonce = timestampObj.nonce;
    }

    if (typeof metaClean !== "undefined") {
      bundle.meta = metaClean;
    }

    if (typeof userSignClean !== "undefined") {
      bundle.userSign = userSignClean;
    }

    return bundle;
  }

  /**
   * verifyBundle(bundle, options?) – v0.2 minimal offline verification.
   *
   * options:
   *   - expectedIssuer?: string
   *   - file?: Uint8Array | Blob (browser) — optional, to recompute hash
   *
   * Result:
   *   {
   *     valid: boolean,
   *     schemaValid: boolean,
   *     proofValid: boolean | null,
   *     hashMatches: boolean | null,
   *     userSignValid: boolean | null,
   *     errors: string[]
   *   }
   *
   * For now:
   *   - schemaValid: validations de structure de base
   *   - proofValid: null (Ed25519 non implémenté)
   *   - hashMatches: true/false/null selon la présence du fichier
   *   - userSignValid: null (non vérifié)
   */
  async function verifyBundle(bundle, options) {
    const opts = options || {};
    const errors = [];

    if (!bundle || typeof bundle !== "object") {
      return {
        valid: false,
        schemaValid: false,
        proofValid: null,
        hashMatches: null,
        userSignValid: null,
        errors: ["bundle must be an object"],
      };
    }

    // --- Basic schema checks ---

    if (bundle.version !== "timeproofs-0.2") {
      errors.push('version must be "timeproofs-0.2"');
    }

    const hash = bundle.hash;
    if (!hash || typeof hash !== "object") {
      errors.push("hash object is required");
    } else {
      if (hash.algorithm !== "SHA-256") {
        errors.push('hash.algorithm must be "SHA-256"');
      }
      const v = (hash.value || "").toString().trim();
      if (!/^[0-9a-f]{64}$/i.test(v)) {
        errors.push("hash.value must be 64-char hex");
      }
    }

    const timestampObj = bundle.timestamp;
    if (!timestampObj || typeof timestampObj !== "object") {
      errors.push("timestamp object is required");
    } else {
      if (typeof timestampObj.issuedAt !== "string") {
        errors.push("timestamp.issuedAt must be a string");
      }
      if (typeof timestampObj.issuer !== "string") {
        errors.push("timestamp.issuer must be a string");
      }
      if (opts.expectedIssuer && timestampObj.issuer !== opts.expectedIssuer) {
        errors.push(
          "timestamp.issuer does not match expectedIssuer (" +
            opts.expectedIssuer +
            ")"
        );
      }
    }

    const proof = bundle.proof;
    if (!proof || typeof proof !== "object") {
      errors.push("proof object is required");
    } else {
      if (proof.algo !== "HMAC-SHA256+Ed25519") {
        errors.push('proof.algo must be "HMAC-SHA256+Ed25519"');
      }
      if (typeof proof.keyId !== "string") {
        errors.push("proof.keyId must be a string");
      }
    }

    const schemaValid = errors.length === 0;

    // --- Hash verification if file is provided ---

    let hashMatches = null;
    if (opts.file && bundle.hash && bundle.hash.value) {
      const targetHex = bundle.hash.value.toLowerCase().trim();
      try {
        let computed = null;

        if (opts.file instanceof Uint8Array) {
          computed = await hashBytes(opts.file);
        } else if (isBrowser && opts.file instanceof Blob) {
          computed = await hashFile(opts.file);
        } else {
          errors.push(
            "file must be Uint8Array or Blob (in browser) when provided"
          );
        }

        if (computed) {
          hashMatches = computed.toLowerCase() === targetHex;
          if (!hashMatches) {
            errors.push("file hash does not match bundle.hash.value");
          }
        }
      } catch (e) {
        errors.push(
          "error while computing hash for provided file: " +
            (e && e.message ? e.message : String(e))
        );
      }
    }

    // --- Proof and userSign (not implemented yet) ---

    const proofValid = null; // Ed25519 verification to be implemented later
    const userSignValid = null; // local signature not verified yet

    const valid = schemaValid && hashMatches !== false && proofValid !== false;

    return {
      valid,
      schemaValid,
      proofValid,
      hashMatches,
      userSignValid,
      errors,
    };
  }

  /**
   * formatBundle(bundle, verifyResult?) – human-readable v0.2 proof.
   *
   * - bundle: résultat de createBundle() ou .tproof.json parsé
   * - verifyResult (optionnel): résultat de verifyBundle(bundle)
   *
   * Retourne une string prête à afficher (CLI, UI, logs).
   */
  function formatBundle(bundle, verifyResult) {
    if (!bundle || typeof bundle !== "object") {
      throw new Error("formatBundle expects a bundle object");
    }

    const b = bundle;
    const vr = verifyResult || {};
    const h = b.hash || {};
    const t = b.timestamp || {};
    const p = b.proof || {};
    const m = b.meta && typeof b.meta === "object" ? b.meta : {};

    const lines = [];

    lines.push("TimeProofs — Proof of Existence");
    lines.push("Version: " + (b.version || "unknown"));
    lines.push("");

    lines.push("Hash");
    lines.push("  Algorithm: " + (h.algorithm || "unknown"));
    lines.push("  Value:     " + (h.value || ""));
    lines.push("");

    lines.push("Timestamp");
    lines.push("  Issued at: " + (t.issuedAt || ""));
    lines.push("  Issuer:    " + (t.issuer || ""));
    if (typeof t.nonce === "string") {
      lines.push("  Nonce:     " + t.nonce);
    }
    lines.push("");

    lines.push("Proof");
    lines.push("  Algo:      " + (p.algo || ""));
    lines.push("  HMAC:      " + (p.hmac || ""));
    lines.push("  Key ID:    " + (p.keyId || ""));
    lines.push("");

    const metaKeys = Object.keys(m);
    if (metaKeys.length > 0) {
      lines.push("Meta");
      if (m.type) {
        lines.push("  Type:      " + m.type);
      }
      metaKeys.forEach((k) => {
        if (k === "type") return;
        lines.push("  " + k + ": " + String(m[k]));
      });
      lines.push("");
    }

    lines.push("Verification");
    if (Object.keys(vr).length === 0) {
      lines.push("  Status:    not-checked (offline only)");
    } else {
      lines.push("  Valid:         " + (vr.valid === true ? "true" : "false"));
      lines.push(
        "  Schema valid: " + (vr.schemaValid === true ? "true" : "false")
      );
      if (vr.hashMatches !== undefined && vr.hashMatches !== null) {
        lines.push(
          "  Hash matches: " + (vr.hashMatches === true ? "true" : "false")
        );
      }
      if (Array.isArray(vr.errors) && vr.errors.length > 0) {
        lines.push("  Errors:");
        vr.errors.forEach((e) => {
          lines.push("    - " + String(e));
        });
      }
    }

    return lines.join("\n");
  }

  // ---------- Client factory ----------

  /**
   * createClient({ baseUrl?, apiKey? })
   *
   * Example:
   *   const tp = TimeProofsV02.createClient({ apiKey: "tp_test_xxx" });
   *   const hash = await tp.hashText("hello");
   *   const ts   = await tp.timestamp(hash);
   *   const bundle = tp.createBundle({
   *     hash: ts.hash,
   *     timestamp: ts.timestamp,
   *     proof: ts.proof
   *   });
   */
  function createClient(config) {
    const cfg = config || {};
    const baseUrl = cfg.baseUrl || DEFAULT_BASE;
    const apiKey = cfg.apiKey || null;

    return {
      hashText,
      hashBytes,
      hashFile,
      /**
       * timestamp(hash: string): Promise<TimestampResponse>
       */
      async timestamp(hash) {
        return timestamp(hash, { baseUrl, apiKey });
      },
      createBundle,
      verifyBundle,
      formatBundle,
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
    formatBundle,
  };
});
