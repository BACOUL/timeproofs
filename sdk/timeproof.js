// TimeProofs JavaScript SDK v0.2 (work in progress)
// This file is NOT used in v0.1 production. Only for the upcoming v0.2.

(function (global) {
  "use strict";

  const DEFAULT_API_BASE = "https://api.timeproofs.io/api";

  function normalizeString(input) {
    if (typeof input !== "string") {
      throw new TypeError("TimeProofs: expected a string");
    }
    // Normalize line endings to avoid different hashes across platforms
    return input.replace(/\r\n/g, "\n");
  }

  async function sha256Hex(input) {
    const text = normalizeString(input);
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  }

  async function createTimestamp(hash, options = {}) {
    const baseUrl = options.baseUrl || DEFAULT_API_BASE;

    if (!hash || typeof hash !== "string") {
      throw new TypeError("TimeProofs.timestamp: expected a hex hash string");
    }

    const res = await fetch(`${baseUrl}/timestamp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ hash })
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`TimeProofs.timestamp: API error ${res.status}: ${text}`);
    }

    const proof = await res.json();
    return proof;
  }

  function buildProofBundle({ hash, proof }) {
    if (!hash || !proof) {
      throw new TypeError("TimeProofs.bundle: hash and proof are required");
    }

    return {
      version: "v0.2",
      hash,
      algorithm: "SHA-256",
      proof,
      created_at: new Date().toISOString(),
      created_at_human: new Date().toUTCString(),
      source: "TimeProofs API v0.2 (work in progress)"
    };
  }

  const TimeProofs = {
    /**
     * Hash an arbitrary string using SHA-256 and return the hex string.
     */
    hashString: sha256Hex,

    /**
     * Call the TimeProofs API to create a timestamp for a given hash.
     */
    timestamp: createTimestamp,

    /**
     * Create a local proof bundle (.tproof.json structure) from a hash + API proof.
     */
    bundle: buildProofBundle
  };

  // Attach to window in browsers
  if (typeof global !== "undefined") {
    global.TimeProofs = TimeProofs;
  }

  // Also export for Node / bundlers
  if (typeof module !== "undefined" && module.exports) {
    module.exports = TimeProofs;
  }
})(typeof window !== "undefined" ? window : globalThis);
