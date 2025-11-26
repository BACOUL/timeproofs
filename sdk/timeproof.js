/* sdk/timeproof.js
 * TimeProofs SDK — v0.2
 * Minimal, dependency-free. Browser + Node 18+ (fetch global).
 *
 * v0.2 principles:
 * - Never send raw data, only hashes.
 * - Server is stateless: /api/timestamp returns a TimestampResponse.
 * - Bundles (.tproof.json) are built and verified client-side (next steps).
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
   *   proof:     { algo: "HMAC-SHA256+Ed25519", hmac: "<hex|null>", signature: null, publicKey: null, keyId: "tp-v0-2-main" }
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

  // ---------- Bundle helpers (stubs v0.2) ----------

  /**
   * createBundle – placeholder for v0.2.
   * Will build a Proof Bundle (.tproof.json) from:
   * - TimestampResponse (hash + timestamp + proof)
   * - meta (local-only metadata)
   * - optional userSign (local Ed25519 signature)
   *
   * For now, this is left unimplemented; use the CLI or manual JSON.
   */
  function createBundle() {
    throw new Error(
      "TimeProofs v0.2 SDK: createBundle() not implemented yet. Use the CLI or manual JSON bundle construction."
    );
  }

  /**
   * verifyBundle – placeholder for v0.2.
   * Will validate a .tproof.json bundle offline against schema + signature.
   * For now, this is left unimplemented.
   */
  async function verifyBundle() {
    throw new Error(
      "TimeProofs v0.2 SDK: verifyBundle() not implemented yet. Use the CLI for offline verification."
    );
  }

  // ---------- Client factory ----------

  /**
   * createClient({ baseUrl?, apiKey? })
   *
   * const tp = TimeProofsV02.createClient({ apiKey: "tp_test_xxx" });
   * const hash = await tp.hashText("hello");
   * const ts   = await tp.timestamp(hash);
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
