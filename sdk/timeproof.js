/* sdk/timeproof.js
 * TimeProofs SDK — v0.2-draft
 * Minimal, dependency-free. Browser + Node 18+.
 *
 * Usage (browser):
 *   const tp = TimeProofs.createClient({ apiKey: 'tp_test_xxx' });
 *   const hash = await tp.hashText('hello');
 *   const proof = await tp.createProof({ hash, label: 'demo' });
 *
 * Usage (Node):
 *   const { createClient } = require('./sdk/timeproof');
 *   const tp = createClient({ apiKey: process.env.TIMEPROOFS_KEY });
 */

(function (root, factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = factory();
  } else if (typeof define === "function" && define.amd) {
    define([], factory);
  } else {
    root.TimeProofs = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  // API v0.2 base endpoint (public, stable)
  const DEFAULT_BASE = "https://api.timeproofs.io/api";

  const isBrowser =
    typeof window !== "undefined" &&
    typeof window.document !== "undefined";

  const textEncoder =
    typeof TextEncoder !== "undefined" ? new TextEncoder() : null;

  function toHex(uint8) {
    return Array.from(uint8)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  // ---------- Hashing ----------

  async function sha256HexBrowser(buffer) {
    if (!crypto || !crypto.subtle) {
      throw new Error("Web Crypto API not available in this environment");
    }
    const digest = await crypto.subtle.digest("SHA-256", buffer);
    return toHex(new Uint8Array(digest));
  }

  async function sha256HexNode(buffer) {
    if (typeof require === "undefined") {
      throw new Error("Node-style require() not available");
    }
    const crypto = require("crypto");
    return crypto.createHash("sha256").update(buffer).digest("hex");
  }

  async function hashText(text) {
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

  async function doRequest(baseUrl, apiKey, path, options = {}) {
    const url = baseUrl.replace(/\/+$/, "") + path;

    const headers = Object.assign(
      {
        "Content-Type": "application/json",
      },
      options.headers || {}
    );

    if (apiKey) {
      headers["Authorization"] = "Bearer " + apiKey;
    }

    const res = await fetch(url, Object.assign({}, options, { headers }));

    const text = await res.text();
    let json;
    try {
      json = text ? JSON.parse(text) : null;
    } catch {
      json = null;
    }

    if (!res.ok) {
      const message =
        (json && (json.error || json.message)) ||
        `TimeProofs API error (${res.status})`;
      const err = new Error(message);
      err.status = res.status;
      err.body = json || text;
      throw err;
    }

    return json;
  }

  // ---------- Client factory ----------

  function createClient(config = {}) {
    const baseUrl = config.baseUrl || DEFAULT_BASE;
    const apiKey = config.apiKey || null;

    return {
      // hashing
      hashText,
      hashBytes,
      hashFile,

      // create a new proof
      async createProof(payload) {
        if (!payload || !payload.hash) {
          throw new Error("createProof requires a { hash } field");
        }
        const body = {
          hash: payload.hash,
          label: payload.label || undefined,
          description: payload.description || undefined,
          externalId: payload.externalId || undefined,
          metadata: payload.metadata || undefined,
        };
        return doRequest(baseUrl, apiKey, "/proofs", {
          method: "POST",
          body: JSON.stringify(body),
        });
      },

      // verify a hash or proof id
      async verify(params) {
        if (!params || (!params.hash && !params.id)) {
          throw new Error("verify requires { hash } or { id }");
        }

        const q = new URLSearchParams();
        if (params.hash) q.set("hash", params.hash);
        if (params.id) q.set("id", params.id);

        return doRequest(baseUrl, apiKey, "/verify?" + q.toString(), {
          method: "GET",
        });
      },
    };
  }

  // ---------- Public API ----------

  return {
    createClient,
    // expose hashing helpers if needed
    hashText,
    hashBytes,
    hashFile,
  };
});
