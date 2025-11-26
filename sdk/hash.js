/* sdk/hash.js
 * TimeProofs v0.2 – Hashing helpers (browser + Node 18+)
 * - hashText(text)  → SHA-256 hex
 * - hashBytes(u8)   → SHA-256 hex
 * - hashFile(file)  → SHA-256 hex (browser seulement)
 */

const isBrowser =
  typeof window !== "undefined" &&
  typeof window.document !== "undefined";

const hasWebCrypto =
  typeof crypto !== "undefined" &&
  crypto &&
  typeof crypto.subtle !== "undefined";

let textEncoder = null;
if (typeof TextEncoder !== "undefined") {
  textEncoder = new TextEncoder();
}

/**
 * Convertit un Uint8Array en hex minuscule.
 * @param {Uint8Array} u8
 * @returns {string}
 */
function toHex(u8) {
  return Array.from(u8)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * SHA-256 via Web Crypto (browser ou Node 18+ avec globalThis.crypto.subtle)
 * @param {ArrayBuffer|Uint8Array} buffer
 * @returns {Promise<string>} hex
 */
async function sha256HexWeb(buffer) {
  const view = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  if (!hasWebCrypto) {
    throw new Error("Web Crypto API not available in this environment");
  }
  const digest = await crypto.subtle.digest("SHA-256", view);
  return toHex(new Uint8Array(digest));
}

/**
 * SHA-256 via module crypto Node.js (fallback si pas de crypto.subtle)
 * @param {Uint8Array} buffer
 * @returns {Promise<string>} hex
 */
async function sha256HexNode(buffer) {
  // Si Web Crypto est dispo (Node 18+), on réutilise la même voie
  if (hasWebCrypto) {
    return sha256HexWeb(buffer);
  }

  let nodeCrypto;
  try {
    // require() uniquement côté Node
    // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
    nodeCrypto = require("crypto");
  } catch {
    throw new Error(
      "Node.js crypto module not available; run in Node 18+ or a supported environment"
    );
  }

  return nodeCrypto.createHash("sha256").update(buffer).digest("hex");
}

/**
 * Hash d'une chaîne de texte (UTF-8 → SHA-256 hex).
 * @param {string} text
 * @returns {Promise<string>}
 */
export async function hashText(text) {
  if (typeof text !== "string") {
    throw new Error("hashText expects a string");
  }
  if (!textEncoder) {
    throw new Error("TextEncoder not available in this environment");
  }
  const bytes = textEncoder.encode(text);
  if (isBrowser || hasWebCrypto) {
    return sha256HexWeb(bytes);
  }
  return sha256HexNode(Buffer.from(bytes));
}

/**
 * Hash d'un Uint8Array (SHA-256 hex).
 * @param {Uint8Array} uint8
 * @returns {Promise<string>}
 */
export async function hashBytes(uint8) {
  if (!(uint8 instanceof Uint8Array)) {
    throw new Error("hashBytes expects a Uint8Array");
  }
  if (isBrowser || hasWebCrypto) {
    return sha256HexWeb(uint8);
  }
  return sha256HexNode(Buffer.from(uint8));
}

/**
 * Hash d'un fichier (File/Blob) – uniquement côté navigateur.
 * @param {Blob} file
 * @returns {Promise<string>}
 */
export async function hashFile(file) {
  if (!isBrowser) {
    throw new Error("hashFile is only available in browsers");
  }
  if (!(file instanceof Blob)) {
    throw new Error("hashFile expects a File/Blob");
  }
  const buffer = await file.arrayBuffer();
  return sha256HexWeb(buffer);
}

// Export utilitaire si besoin dans d'autres modules
export { isBrowser };
