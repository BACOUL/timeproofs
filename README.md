# 🧩 TimeProofs v0.2 — Stateless Proof of Existence

TimeProofs is an open, privacy-first timestamp API and proof protocol.  
Version 0.2 introduces a major evolution: full stateless operation and client-side proof bundles.

Website: https://timeproofs.io  
API: https://api.timeproofs.io  
Status: Public Beta v0.2 (development branch)

# ✨ What’s New in v0.2

• Fully stateless timestamp API  
• No KV storage, no server-side persistence  
• Timestamp responses include issuer, nonce and HMAC proof  
• Clients generate local `.tproof.json` bundles  
• Offline verification (no server request required)  
• New SDK v0.2 with hashing, timestamping, bundling and verifying  
• Maintains continuity with v0.1 philosophy (hash-only, privacy-first, no blockchain)

v0.1 remains stable and online with the legacy verify endpoint.  
v0.2 is the next-generation protocol.

# 🚀 Quick Usage (v0.2)

1. Compute a SHA-256 hash locally  
2. POST it to /api/timestamp  
3. Receive a stateless timestamp response  
4. Build a `.tproof.json` bundle client-side  
5. Verify the bundle offline (SDK or CLI)

Example timestamp response:
{
  "version": "timeproofs-0.2",
  "hash": { "algorithm": "SHA-256", "value": "<hex>" },
  "timestamp": {
    "issuedAt": "2025-11-26T20:00:00.000Z",
    "issuer": "https://api.timeproofs.io",
    "nonce": "<random-id>"
  },
  "proof": {
    "algo": "HMAC-SHA256+Ed25519",
    "hmac": "<hex-or-null>",
    "signature": null,
    "publicKey": null,
    "keyId": "tp-v0-2-main"
  }
}

# 🔌 API Reference (v0.2)

POST /api/timestamp  
Body: { "hash": "<sha256-hex>" }  
Returns a timestamp response with issuer, nonce and proof.

GET /api/verify  
Not implemented for v0.2 (verification is offline only).

# 📦 Proof Bundles (`.tproof.json`)

Bundles are created on the client and contain:
• version  
• hash  
• timestamp  
• proof  
• optional metadata (type, purpose, domain)  
• optional local user signature (userSign)

Files are never sent to the server.  
Hashes are the only input.

# 🧰 SDK (v0.2)

Includes:
• hashText  
• hashBytes  
• hashFile  
• timestamp  
• createBundle  
• verifyBundle (offline)

The SDK supports Browser + Node 18+ (global fetch).

Location in repo: `/sdk/timeproofs-v02.js`

# 🔐 Privacy & Principles

• No files  
• No personal data  
• No logs of content  
• Stateless API  
• No blockchain  
• Open verification  
• Predictable cost  
• Local-only metadata

This preserves the v0.1 guarantees while enabling advanced proof workflows.

# 🌱 Supported Root Protocols

TimeProofs v0.2 can verify or reference standard root metadata files:

• robots.txt  
• security.txt  
• humans.txt  
• integrity.txt  
• authenticity.txt  
• rights.txt  
• explainable-ia.txt

These protocols remain fully independent from TimeProofs.

# 🔄 Migration from v0.1 → v0.2

v0.1:
• Server stores timestamps  
• Public verify endpoint  
• Simple proof format

v0.2:
• Fully stateless  
• No server persistence  
• New proof format with issuer + nonce  
• Verification is offline with bundles  
• SDK handles everything locally

Both versions remain compatible at the hashing layer.

# 🧱 Project Structure (v0.2 branch)

api-v02/worker.js  
sdk/timeproofs-v02.js  
index.html (static site)  
proofspec.html  
docs.html  
security.html  
privacy.html  
legal.html  
use-cases.html  
about.html  
assets/*

# 🔮 Roadmap

v0.2.1 — Ed25519 signatures + JWKS  
v0.2.2 — CLI for offline verification  
v0.3 — ProofSpec v1  
v1.0 — Dashboard + keys + limits  
v2.0 — Distributed ProofChain  
v3.0 — TimeProofs Foundation + standardisation

# 🧾 License

MPL-2.0 License.

# 🛠 Maintainer

TimeProofs is developed and maintained by Jeason Bacoul.  
GitHub: https://github.com/BACOUL/timeproofs
