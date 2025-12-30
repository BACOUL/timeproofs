🧩 TimeProofs v0.2 — Stateless Proof of Existence for All Data

TimeProofs is an open, privacy-first timestamp API and proof protocol.
Version 0.2 introduces a major evolution: full stateless operation and client-side proof bundles, designed for all data domains (AI, web, datasets, legal, finance, healthcare, supply chain, etc.).

Website: https://timeproofs.io  
API: https://api.timeproofs.io  
Status: Public Beta v0.2 (development branch)

v0.1 remains stable and online with the legacy verify endpoint.  
v0.2 is the next-generation protocol, focused on stateless proofs and offline verification.

WHAT’S NEW IN v0.2

• Fully stateless timestamp API  
• No KV storage, no server-side persistence  
• Timestamp responses include issuer, nonce and HMAC proof  
• Clients generate local .tproof.json bundles  
• Offline verification (no server request required)  
• New SDK v0.2 with hashing, timestamping, bundling and verifying  
• Maintains continuity with v0.1 philosophy (hash-only, privacy-first, no blockchain)  
• Designed to cover all data domains, not only AI  

QUICK USAGE (v0.2)

1. Compute a SHA-256 hash locally  
2. POST it to /api/timestamp  
3. Receive a stateless timestamp response  
4. Build a .tproof.json bundle client-side  
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

API REFERENCE (v0.2)

POST /api/timestamp  
Body: { "hash": "<sha256-hex>" }

Rules:
• hash must be a 64-character lowercase SHA-256 hex string  
• server never receives files or metadata, only the hash  

Returns:
• hash.algorithm and hash.value  
• timestamp.issuedAt (RFC 3339 UTC)  
• timestamp.issuer (API base URL)  
• timestamp.nonce  
• proof.algo, proof.hmac, proof.signature (future), proof.publicKey (future), proof.keyId  

GET /api/verify  
Not implemented for v0.2.  
Verification is offline only via .tproof.json bundles.  
The v0.1 API keeps the legacy online verify endpoint.

PROOF BUNDLES (.tproof.json)

Bundles are created on the client and contain:

• version  
• hash  
• timestamp  
• proof  
• optional metadata (type, purpose, domain, tool, labels, notes)  
• optional local user signature  

Files are never sent to the server.  
Hashes are the only input sent to the API.

Supported metadata types include:
document, image, video, code, dataset, model, log, contract, release,
config, archive, financial-statement, medical-record, supply-record,
product-info, ai-output, ai-training-set, ai-prompt, audit-proof, evidence.

JSON Schema available at:
spec/proof-bundle-v0.2.schema.json

SDK (v0.2)

JavaScript SDK (Browser + Node 18+):

• hashText  
• hashBytes  
• hashFile  
• timestamp  
• createBundle  
• verifyBundle  

Typical flow:
1. Hash data locally  
2. Call timestamp(hash)  
3. Build bundle with createBundle  
4. Store bundle  
5. Verify later offline  

Location: sdk/timeproofs-v02.js

PRIVACY & PRINCIPLES

• No files  
• No personal data  
• No content  
• No metadata about users  
• Stateless API  
• No blockchain  
• Open verification  
• Predictable cost  
• Local-only metadata and optional signatures  

The server only sees the hash and protocol parameters.

SUPPORTED ROOT PROTOCOLS

TimeProofs can timestamp and verify integrity for:
robots.txt  
security.txt  
humans.txt  
integrity.txt  
authenticity.txt  
rights.txt  
explainable-ia.txt  

These remain independent standards.

MIGRATION FROM v0.1 → v0.2

v0.1:
• Server stores timestamps  
• Online verification  
• Simple proof format  

v0.2:
• Fully stateless  
• New timestamp format with issuer and nonce  
• New proof structure (HMAC + future Ed25519)  
• Offline verification  
• SDK-managed bundles  

Both versions remain compatible at the SHA-256 level.

PROJECT STRUCTURE (v0.2)

api-v02/worker.js  
sdk/timeproofs-v02.js  
spec/proof-bundle-v0.2.schema.json  
protocols/ (integrity, authenticity, rights, explainable-ia)  
index.html, proofspec.html, docs.html, security.html, privacy.html, legal.html, use-cases.html, about.html  
assets/

ROADMAP

v0.2.1 — Ed25519 signatures + JWKS  
v0.2.2 — CLI for hashing and verification  
v0.3   — ProofSpec v1  
v1.0   — Dashboard, API keys, pricing  
v2.0   — Distributed ProofChain  
v3.0   — TimeProofs Foundation + formal standardisation  

LICENSE

MPL-2.0

MAINTAINER

TimeProofs is developed and maintained by Jeason Bacoul  
GitHub: https://github.com/BACOUL/timeproofs
