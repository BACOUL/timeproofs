# 🧩 TimeProofs v0.2 — Stateless Proof of Existence for All Data

TimeProofs is an open, privacy-first timestamp API and proof protocol.  
Version 0.2 introduces a major evolution: full stateless operation and client-side proof bundles, designed for **all data domains** (AI, web, datasets, legal, finance, healthcare, supply chain, etc.).

Website: https://timeproofs.io  
API: https://api.timeproofs.io  
Status: Public Beta v0.2 (development branch)

v0.1 remains stable and online with the legacy verify endpoint.  
v0.2 is the next-generation protocol, focused on stateless proofs and offline verification.

# ✨ What’s New in v0.2

• Fully stateless timestamp API  
• No KV storage, no server-side persistence  
• Timestamp responses include issuer, nonce and HMAC proof  
• Clients generate local .tproof.json bundles  
• Offline verification (no server request required)  
• New SDK v0.2 with hashing, timestamping, bundling and verifying  
• Maintains continuity with v0.1 philosophy (hash-only, privacy-first, no blockchain)  
• Designed to cover all data domains, not only AI

# 🚀 Quick Usage (v0.2)

1. Compute a SHA-256 hash locally  
2. POST it to /api/timestamp  
3. Receive a stateless timestamp response  
4. Build a .tproof.json bundle client-side  
5. Verify the bundle offline (SDK or CLI)

Example timestamp response (simplified):

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

Rules:
• hash must be a 64-character lowercase SHA-256 hex string  
• server never receives files or metadata, only the hash  

Returns a timestamp response with:
• hash.algorithm and hash.value  
• timestamp.issuedAt (RFC 3339 UTC)  
• timestamp.issuer (API base URL)  
• timestamp.nonce (unique per proof)  
• proof.algo, proof.hmac, proof.signature (future), proof.publicKey (future), proof.keyId  

GET /api/verify  
Not implemented for v0.2.  
Verification is offline only via .tproof.json bundles (SDK or CLI).  
The v0.1 API keeps the legacy online verify endpoint.

# 📦 Proof Bundles (.tproof.json)

Bundles are created on the client and contain:

• version  
• hash  
• timestamp  
• proof  
• optional metadata meta (type, purpose, domain, tool, labels, notes, etc.)  
• optional local user signature userSign (user or organization key)

Files are never sent to the server.  
Hashes are the only input sent to the API.

The metadata meta.type is normalized to cover all data domains:

• document  
• image  
• video  
• code  
• dataset  
• model  
• log  
• contract  
• release  
• config  
• archive  
• financial-statement  
• medical-record  
• supply-record  
• product-info  
• ai-output  
• ai-training-set  
• ai-prompt  
• audit-proof  
• evidence  

A JSON Schema for bundles is provided in:

spec/proof-bundle-v0.2.schema.json

This schema can be used with standard JSON Schema validators (AJV, etc.) to validate .tproof.json files.

# 🧰 SDK (v0.2)

The SDK provides a minimal, dependency-free JavaScript library for Browser + Node 18+ (global fetch).

Includes:

• hashText  
• hashBytes  
• hashFile (browser only)  
• timestamp  
• createBundle  
• verifyBundle (offline)

Typical flow:

1. Hash data locally (text, bytes or file).  
2. Call timestamp(hash) against the v0.2 API.  
3. Build a .tproof.json bundle with createBundle({ hash, timestamp, proof, meta, userSign }).  
4. Store the bundle locally or alongside your data.  
5. Later, verifyBundle(bundle, { file? }) to check structure and hash consistency.

Location in repo: sdk/timeproofs-v02.js

# 🔐 Privacy & Principles

v0.2 keeps the original TimeProofs guarantees:

• No files  
• No personal data  
• No content  
• No metadata about users  
• Stateless API (no persistence, no KV)  
• No blockchain  
• Open verification  
• Predictable cost  
• Local-only metadata and optional local signatures

The server only sees the hash and protocol parameters needed for the timestamp.  
All context stays in the .tproof.json bundle controlled by the user or the system.

# 🌱 Supported Root Protocols

TimeProofs v0.2 can timestamp and verify the integrity of root metadata files, without owning their content or semantics:

• robots.txt  
• security.txt  
• humans.txt  
• integrity.txt  
• authenticity.txt  
• rights.txt  
• explainable-ia.txt  

These protocols remain fully independent from TimeProofs.  
TimeProofs only provides cryptographic proof of existence and integrity over time.

# 🔄 Migration from v0.1 → v0.2

v0.1:

• Server stores timestamps  
• Public online verify endpoint  
• Simple proof format tied to the API  

v0.2:

• Fully stateless (no server persistence)  
• New timestamp response with issuer and nonce  
• New proof format (HMAC + future Ed25519)  
• Verification is offline with .tproof.json bundles  
• SDK handles hashing, timestamping, bundling and verifying locally  

Both versions remain compatible at the hashing layer (SHA-256).  
Applications can gradually move from v0.1 online verify to v0.2 offline bundles.

# 🧱 Project Structure (v0.2 branch)

api-v02/worker.js            Cloudflare Worker (stateless API v0.2)  
sdk/timeproofs-v02.js        JavaScript SDK v0.2  
spec/proof-bundle-v0.2.schema.json    JSON Schema for .tproof.json  
protocols/                   integrity.txt, authenticity.txt, rights.txt, explainable-ia.txt (planned)  
index.html, proofspec.html, docs.html, security.html, privacy.html, legal.html, use-cases.html, about.html (static site copies)  
assets/*

The v0.1 production site and API live on the dedicated v0.1 branch and remain stable.

# 🔮 Roadmap

v0.2.1 — Ed25519 signatures + JWKS (public keys, key rotation)  
v0.2.2 — CLI for hashing, timestamping and offline verification  
v0.3   — ProofSpec v1 (formal protocol specification)  
v1.0   — Dashboard, API keys, limits and pricing  
v2.0   — Distributed ProofChain  
v3.0   — TimeProofs Foundation + formal standardisation

# 🧾 License

MPL-2.0 License.

# 🛠 Maintainer

TimeProofs is developed and maintained by Jeason Bacoul.  
GitHub: https://github.com/BACOUL/timeproofs
