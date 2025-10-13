/* sdk/timeproof.js
   TimeProofs SDK — v0.1
   Minimal, dependency-free. Works in browser and Node 18+.
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
  const DEFAULT_BASE = "https://timeproofs-api.jeason-bacoul.workers.dev/api";

  // ————— Utilities —————

  const textEncoder = typeof TextEncoder !== "undefined" ? new TextEncoder() : null;

  function toHex(uint8) {
    return Array.from(uint8).map(b => b.toString(16).padStart(2, "0")).join("");
  }

  async function sha256HexBrowser(data) {
    const buf = await crypto.subtle.digest("SHA-256", data);
    return toHex(new Uint8Array(buf));
  }

  async function sha256HexNode(buffer) {
    // Node >=18 has global crypto; fallback to require('crypto') if needed
    const nodeCrypto = globalThis.crypto?.subtle ? null : await import('node:crypto');
    if (nodeCrypto?.createHash) {
      return nodeCrypto.createHash("sha256").update(buffer).digest("hex");
    }
    // If subtle exists in Node (webcrypto)
    const buf = await globalThis.crypto.subtle.digest("SHA-256", buffer);
    return toHex(new Uint8Array(buf));
  }

  async function sha256HexFromText(text) {
    const bytes = textEncoder ? textEncoder.encode(text || "") : Buffer.from(String(text || ""), "utf8");
    if (typeof window !== "undefined" && window.crypto?.subtle) {
      return sha256HexBrowser(bytes);
    }
    return sha256HexNode(bytes);
  }

  async function sha256HexFromBuffer(buf) {
    // buf can be ArrayBuffer, Uint8Array, Buffer
    let arrBuf;
    if (buf instanceof ArrayBuffer) arrBuf = buf;
    else if (ArrayBuffer.isView(buf)) arrBuf = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    else if (typeof Buffer !== "undefined" && Buffer.isBuffer(buf)) arrBuf = buf;
    else throw new Error("Unsupported buffer type");

    if (typeof window !== "undefined" && window.crypto?.subtle) {
      return sha256HexBrowser(arrBuf);
    }
    return sha256HexNode(arrBuf);
  }

  function assertHexSha256(str) {
    if (!/^[a-f0-9]{64}$/i.test(str || "")) {
      throw new Error("Invalid SHA-256 hex hash");
    }
  }

  // ————— Core SDK —————

  class Client {
    constructor(opts = {}) {
      this.baseUrl = (opts.baseUrl || DEFAULT_BASE).replace(/\/+$/, "");
      this.fetch = opts.fetch || (typeof fetch !== "undefined" ? fetch.bind(globalThis) : null);
      if (!this.fetch) throw new Error("fetch() is not available in this environment");
    }

    // Public helpers
    static async sha256HexFromText(text) { return sha256HexFromText(text); }
    static async sha256HexFromBuffer(buf) { return sha256HexFromBuffer(buf); }

    // Create proof from raw text (hash computed locally)
    async createFromText(text, options = {}) {
      const hash = await sha256HexFromText(text || "");
      return this.createFromHash(hash, options);
    }

    // Create proof from a browser File (hash computed locally)
    async createFromFile(file, options = {}) {
      if (typeof window === "undefined" || !file?.arrayBuffer) {
        throw new Error("createFromFile is only available in browsers with File API");
      }
      const buf = await file.arrayBuffer();
      const hash = await sha256HexFromBuffer(buf);
      return this.createFromHash(hash, options);
    }

    // Create proof from an existing SHA-256 hash
    async createFromHash(hash, { type = "event", meta = {} } = {}) {
      assertHexSha256(hash);
      // keep meta tiny
      const metaStr = JSON.stringify(meta || {});
      if (metaStr.length > 256) throw new Error("Meta too large (≤ 256 chars total)");

      const res = await this.fetch(`${this.baseUrl}/timestamp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hash, type, meta }),
      });
      const json = await res.json();
      if (!res.ok || json.error) {
        throw new Error(json.error || `Request failed (${res.status})`);
      }
      return json; // { id, hash, ts, sig, verify_url }
    }

    // Verify a previously created proof
    async verify(hash) {
      assertHexSha256(hash);
      const res = await this.fetch(`${this.baseUrl}/verify?hash=${encodeURIComponent(hash)}`);
      const json = await res.json();
      return json; // { ok, found, hash, ts, type, meta, sig } or { ok:false, found:false }
    }

    // Convenience helper to build the public verification URL
    getVerifyUrl(hash) {
      assertHexSha256(hash);
      return `${this.baseUrl}/verify?hash=${encodeURIComponent(hash)}`;
    }
  }

  // UMD export shape:
  //   const tp = new TimeProofs({ baseUrl: "..." })
  //   await tp.createFromText("hello")
  return Client;
});
