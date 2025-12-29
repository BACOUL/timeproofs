TimeProofs API v0.2 — Stateless Edition

This directory contains the Cloudflare Worker implementation for TimeProofs API v0.2.

Status: public preview (stateless).
The v0.1 API may still exist elsewhere, but v0.2 is designed as a clean, stateless protocol and must be treated as the reference moving forward.

────────────────────────────────────────
OVERVIEW
────────────────────────────────────────

TimeProofs v0.2 is a stateless, cryptographic proof-of-existence system.

Core principles:
- No storage of proofs on the server
- No database, no KV, no cache
- No blockchain
- No personal data
- Cryptographic verification only
- Portable proof bundles (.tproof.json)

The server:
- Signs a canonical payload using Ed25519
- Returns a portable proof bundle
- Never stores or retrieves proofs

Verification:
- Is fully offline and deterministic
- Uses only the embedded data and the server’s public key
- Does not depend on any server-side history

────────────────────────────────────────
API OVERVIEW
────────────────────────────────────────

Endpoints:

GET /api/health
Returns basic status and metadata.

POST /api/timestamp
Creates a signed timestamp proof from a SHA-256 hash.

POST /api/verify
Verifies a proof bundle cryptographically.
Hash-only verification is intentionally NOT supported.

GET /api/verify?hash=...
Intentionally rejected in v0.2.

────────────────────────────────────────
SECURITY MODEL
────────────────────────────────────────

- Algorithm: Ed25519
- Signature authority: server-only (key freeze)
- Public key is embedded in the server configuration
- Bundle-provided keys are ignored during verification
- Canonical string is strictly enforced

No HMAC is used.
No legacy v0.1 behavior remains.

────────────────────────────────────────
PROOF BUNDLE FORMAT (.tproof.json)
────────────────────────────────────────

A valid bundle contains:

{
  "version": "timeproofs-0.2",
  "canonical": "<hash>|<issuedAt>|<issuer>|<nonce>",
  "hash": {
    "algorithm": "SHA-256",
    "value": "<64 hex chars>"
  },
  "timestamp": {
    "issuedAt": "<ISO-8601>",
    "issuer": "https://api.timeproofs.io",
    "nonce": "<random hex>"
  },
  "proof": {
    "algo": "Ed25519",
    "signature": "<hex>",
    "publicKey": "<base64>",
    "keyId": "tp-v0-2-main"
  },
  "meta": {
    "type": "event"
  }
}

Validation rules:
- issuer must match the canonical authority exactly
- canonical must match hash + issuedAt + issuer + nonce
- signature must verify using the server’s Ed25519 public key

────────────────────────────────────────
WORKER BEHAVIOR
────────────────────────────────────────

/api/health
Returns:
- ok
- now
- version
- mode
- issuer
- keyId

/api/timestamp
Input:
{
  "hash": "<sha256>"
}

Output:
A complete signed bundle as shown above.

No state is stored.

/api/verify
Input:
- either the bundle itself
- or { "bundle": <bundle> }

Output:
{
  "ok": true|false,
  "valid": true|false,
  "version": "...",
  "hash": {...},
  "timestamp": {...}
}

────────────────────────────────────────
DEPLOYMENT
────────────────────────────────────────

This worker is designed to run on Cloudflare Workers (workers.dev).

Required secrets:
- ED25519_SECRET  (PKCS8 DER, base64)
- ED25519_PUBLIC  (SPKI DER, base64)

Set secrets using:
wrangler secret put ED25519_SECRET
wrangler secret put ED25519_PUBLIC

The worker is stateless and safe to redeploy at any time.

────────────────────────────────────────
NON-GOALS
────────────────────────────────────────

- No storage or retrieval of proofs
- No database or KV
- No blockchain anchoring
- No legal notarization claims
- No authentication or identity system

────────────────────────────────────────
SUMMARY
────────────────────────────────────────

TimeProofs v0.2 defines a minimal, auditable, cryptographic proof format.
It focuses on correctness, portability, and independence from infrastructure.
This worker is the canonical reference implementation for that model.
