/* sdk/hash.js
 * TimeProofs v0.2 – Hashing helpers (browser + Node 18+)
 * - hashText(text)  → SHA-256 hex
 * - hashBytes(u8)   → SHA-256 hex
 * - hashFile(file)  → SHA-256 hex (browser only)
 */

const isBrowser =
  typeof window !== "undefined" &&
  typeof window.document !== "undefined";

const hasWebCrypto =
  typeof crypto !== "undefined" &&
  crypto &&
  typeof crypto.subtle !== "undefined";

const textEncoder = typeof TextEncoder !== "undefined" ? new TextEncoder() : null;

function toHex(u8) {
  return Array.from(u8)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function sha256HexWeb(buffer) {
  const view = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  if (!hasWebCrypto) {
    throw new Error("Web Crypto API not available in this environment");
  }
  const digest = await crypto.subtle.digest("SHA-256", view);
  return toHex(new Uint8Array(digest));
}

async function sha256HexNode(uint8) {
  if (hasWebCrypto) return sha256HexWeb(uint8);

  let nodeCrypto;
  try {
    nodeCrypto = require("crypto");
  } catch {
    throw new Error("Node.js crypto module not available");
  }

  return nodeCrypto.createHash("sha256").update(uint8).digest("hex");
}

export async function hashText(text) {
  if (typeof text !== "string") throw new Error("hashText expects a string");
  if (!textEncoder) throw new Error("TextEncoder not available in this environment");

  const bytes = textEncoder.encode(text);
  if (isBrowser || hasWebCrypto) return sha256HexWeb(bytes);
  return sha256HexNode(bytes);
}

export async function hashBytes(uint8) {
  if (!(uint8 instanceof Uint8Array)) throw new Error("hashBytes expects a Uint8Array");

  if (isBrowser || hasWebCrypto) return sha256HexWeb(uint8);
  return sha256HexNode(uint8);
}

export async function hashFile(file) {
  if (!isBrowser) throw new Error("hashFile is only available in browsers");
  if (!(file instanceof Blob)) throw new Error("hashFile expects a File/Blob");

  const buffer = await file.arrayBuffer();
  return sha256HexWeb(buffer);
}

export { isBrowser };
