# TimeProofs API v0.2 (draft)

This folder contains the draft worker for the TimeProofs API v0.2.

Status: internal draft — do not use in production.  
The v0.1 API remains the only active public/production endpoint.

## Files

### worker.js

Cloudflare Worker entrypoint for v0.2.

Routes:
- GET /api/health  
  Returns a small JSON object with fields: ok, now, version.

- POST /api/timestamp  
  Creates a v0.2 proof bundle, signs it with HMAC, stores it in the v0.2 KV namespace.

- GET /api/verify?hash=...  
  Reads the stored bundle from the v0.2 KV namespace and returns it if found.

### wrangler.toml

Wrangler configuration for this worker.

Main points:
- name = "timeproofs-api-v02"
- main = "worker.js"
- KV binding: TIMEPROOFS_V02_KV
- Secret required: HMAC_SECRET (same semantics as v0.1, set as a secret, not in plain text)

## KV layout (v0.2)

Namespace: TIMEPROOFS_V02_KV

Key structure:
- v02:hash:<sha256>

Value:
- JSON-encoded v0.2 bundle.

Example bundle shape (simplified):

    {
      "version": "tp-0.2",
      "hash": "<sha256-hex>",
      "alg": "SHA-256",
      "timestamp": 1234567890,
      "datetime": "2025-01-01T00:00:00.000Z",
      "issuer": "https://timeproofs.io",
      "sig_hmac": "<hex>",
      "sig_ed25519": null,
      "kid": "tp-v0-2-main",
      "meta": {
        "env": "demo",
        "sdk": "js-v0.2"
      }
    }

## Deployment (later)

This worker is intended to be deployed separately from the v0.1 worker.

High-level steps:
1. Add the real Cloudflare account_id in api-v02/wrangler.toml.
2. Create a KV namespace named TIMEPROOFS_V02_KV in Cloudflare and copy its id into api-v02/wrangler.toml.
3. Add the HMAC_SECRET secret for this worker (via Cloudflare dashboard or wrangler secret command).
4. Deploy this worker using wrangler with api-v02/wrangler.toml as the config file.
5. Use the resulting workers.dev URL as the baseUrl for testing the v0.2 SDK (Node and browser examples).

## Notes

- v0.2 is experimental and must not interfere with v0.1 production.
- The goal of v0.2 is to define and test:
  - the stable proof bundle shape (.tproof.json),
  - HMAC signing on the server,
  - storage and retrieval in a dedicated KV namespace,
  - future Ed25519 signing and stronger offline verification.
