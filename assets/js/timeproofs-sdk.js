/**
 * TimeProofs SDK (v0.2)
 * Minimal client for the TimeProofs API
 * Author: TimeProofs (https://timeproofs.vercel.app)
 */

const API_BASE = "https://timeproofs-api.jeason-bacoul.workers.dev/api";

/**
 * Create a proof for a given hash, text, or file.
 * @param {Object} input - { hash?, text?, file? }
 * @returns {Promise<Object>} proof object
 */
export async function createProof(input) {
  let hash = input.hash;

  if (!hash) {
    if (input.text) hash = await sha256(input.text);
    else if (input.file) hash = await fileHash(input.file);
    else throw new Error("Missing hash, text, or file input.");
  }

  const res = await fetch(`${API_BASE}/timestamp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ hash, type: "event" }),
  });

  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return await res.json();
}

/**
 * Verify a proof for a given hash.
 * @param {string} hash - SHA256 hash to verify
 * @returns {Promise<Object>} verification result
 */
export async function verifyProof(hash) {
  const res = await fetch(`${API_BASE}/verify?hash=${hash}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return await res.json();
}

/**
 * Compute SHA256 hash of a string (UTF-8)
 */
async function sha256(message) {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return bufferToHex(hashBuffer);
}

/**
 * Compute SHA256 hash of a file (ArrayBuffer)
 */
async function fileHash(file) {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  return bufferToHex(hashBuffer);
}

/**
 * Convert ArrayBuffer to hex string
 */
function bufferToHex(buffer) {
  const bytes = new Uint8Array(buffer);
  return Array.from(bytes).map(b => b.toString(16).padStart(2, "0")).join("");
}

// Example (uncomment to test locally)
// createProof({ text: "Hello TimeProofs" }).then(console.log);
// verifyProof("e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855").then(console.log);
