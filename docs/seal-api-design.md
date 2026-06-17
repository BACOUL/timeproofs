# TimeProofs Seal API Design

Status: design foundation only  
Scope: future `/api/seal` contract for TimeProofs Action File v1  
Last updated: 2026-06-17

This document defines the minimal target design for a future TimeProofs Seal API.

This PR does not implement the endpoint. It does not create keys, signing helpers, billing, accounts, API keys, storage, verification APIs, or runtime signing.

---

## 1. Purpose

`/api/seal` will create a TimeProofs Seal for a canonical Action File payload hash.

The endpoint must seal a fingerprint, not sensitive action content.

A future client will:

1. create an Action File locally;
2. canonicalize the hashable payload locally;
3. compute `integrity.payload_hash` locally;
4. send only the payload hash and minimal metadata to TimeProofs;
5. receive a Seal object;
6. store the Seal with, beside, or inside the Action File outside the hashable core.

---

## 2. Core privacy rule

TimeProofs must not require raw sensitive action content by default.

The default request must not include:

- prompts;
- completions;
- documents;
- customer secrets;
- customer personal data;
- full payload content;
- uploaded files;
- target system credentials;
- private keys;
- API tokens.

Allowed by default:

- canonical payload hash;
- format identifier;
- action ID;
- proof level;
- client timestamp;
- optional non-sensitive issuer/client metadata.

---

## 3. Endpoint

```text
POST /api/seal
```

Future response content type:

```text
application/json
```

The endpoint should be idempotent for the same client-controlled request when possible, but V1 may return a unique Seal ID per request if that is simpler operationally.

---

## 4. Authentication model

The sellable V1 can support a staged authentication model.

### V1 demo / pilot

Possible modes:

- unauthenticated demo with strict rate limits;
- private pilot token;
- internal-only pilot key.

### Paid V1

Possible modes:

- API key;
- account-scoped key;
- signed integration token.

Authentication design must stay outside the Action File hashable payload.

---

## 5. Request object

Minimal future request:

```json
{
  "format": "timeproofs.action.v1",
  "action_id": "act_demo_001",
  "payload_hash": "sha256:231c6b5ca29078119421fcf4aedaee827917b1b6ffaad8b75c1076b98c5b51ea",
  "proof_level": "executed",
  "client_generated_at": "2026-06-17T08:00:00Z",
  "metadata": {
    "source": "local-demo",
    "environment": "pilot"
  }
}
```

### Required fields

| Field | Required | Rule |
|---|---:|---|
| `format` | Yes | Must be `timeproofs.action.v1` for Action File v1 |
| `action_id` | Yes | Non-empty string, stable for the customer action |
| `payload_hash` | Yes | Must match `sha256:<64 lowercase hex>` |
| `proof_level` | Yes | Must be a supported proof level |
| `client_generated_at` | Recommended | ISO-like timestamp string |
| `metadata` | Optional | Non-sensitive JSON object only |

### Supported proof levels

```text
declared
executed
target_confirmed
externally_verifiable
```

---

## 6. Rejected request fields

The endpoint should reject or ignore fields that attempt to send sensitive content by default.

Recommended reject list:

```text
prompt
completion
messages
raw_content
document
file
files
attachment
attachments
secret
token
api_key
password
private_key
credential
credentials
action_core
full_action_file
```

If a future enterprise mode accepts extra evidence, it must be explicit, separate, documented, and opt-in. It must not be part of the default V1 `/api/seal` mode.

---

## 7. Seal payload created by server

The server should build the Seal payload from validated request data and server-side metadata.

Recommended Seal payload:

```json
{
  "seal_version": "timeproofs.seal.v1",
  "seal_id": "seal_01JXEXAMPLE000000000000000",
  "payload_hash": "sha256:231c6b5ca29078119421fcf4aedaee827917b1b6ffaad8b75c1076b98c5b51ea",
  "format": "timeproofs.action.v1",
  "action_id": "act_demo_001",
  "proof_level": "executed",
  "sealed_at": "2026-06-17T08:00:01Z",
  "public_key_id": "timeproofs-main-2026-01",
  "signature_algorithm": "Ed25519"
}
```

The Seal payload, not the full Action File and not the final Seal wrapper, is signed.

---

## 8. Seal object response

Recommended response:

```json
{
  "ok": true,
  "seal": {
    "seal_payload": {
      "seal_version": "timeproofs.seal.v1",
      "seal_id": "seal_01JXEXAMPLE000000000000000",
      "payload_hash": "sha256:231c6b5ca29078119421fcf4aedaee827917b1b6ffaad8b75c1076b98c5b51ea",
      "format": "timeproofs.action.v1",
      "action_id": "act_demo_001",
      "proof_level": "executed",
      "sealed_at": "2026-06-17T08:00:01Z",
      "public_key_id": "timeproofs-main-2026-01",
      "signature_algorithm": "Ed25519"
    },
    "signature": "base64url-signature-placeholder"
  },
  "verification": {
    "public_keys_url": "https://timeproofs.io/.well-known/timeproofs-keys.json",
    "verification_model": "offline-capable-public-key-verification"
  },
  "limits": [
    "Seal verifies payload hash integrity and issuer signature only.",
    "Seal does not prove AI correctness, legal validity, regulatory compliance, or third-party acceptance."
  ]
}
```

---

## 9. Error responses

Recommended errors:

| Status | Code | Meaning |
|---:|---|---|
| 400 | `invalid_json` | Body is not valid JSON |
| 400 | `invalid_format` | Unsupported format |
| 400 | `invalid_action_id` | Missing or invalid action ID |
| 400 | `invalid_payload_hash` | Missing or invalid payload hash |
| 400 | `unsupported_proof_level` | Proof level is not supported |
| 400 | `sensitive_content_rejected` | Request includes prohibited sensitive/default-disallowed fields |
| 401 | `unauthorized` | Missing or invalid future API token |
| 403 | `forbidden` | Authenticated but not allowed to seal |
| 409 | `idempotency_conflict` | Same idempotency key used for different payload |
| 422 | `validation_failed` | Structurally valid JSON but invalid semantic combination |
| 429 | `rate_limited` | Too many requests |
| 500 | `seal_failed` | Internal signing/sealing failure |
| 503 | `signing_unavailable` | Signing service unavailable; fail closed |

Example:

```json
{
  "ok": false,
  "error": {
    "code": "invalid_payload_hash",
    "message": "payload_hash must match sha256:<64 lowercase hex>"
  }
}
```

---

## 10. Idempotency

Future clients may send:

```text
Idempotency-Key: client-generated-unique-key
```

Recommended behavior:

- same idempotency key + same request hash returns same response if stored;
- same idempotency key + different request hash returns `409 idempotency_conflict`;
- V1 pilot can skip idempotency if storage is not yet introduced, but must document that behavior.

---

## 11. Storage model

The privacy-first model should avoid storing full Action Files.

Possible V1 storage:

- `seal_id`;
- `payload_hash`;
- `format`;
- `action_id`;
- `proof_level`;
- `sealed_at`;
- `public_key_id`;
- `signature_algorithm`;
- signature;
- optional account/API key owner;
- optional rate-limit metadata;
- no raw prompt/content/document by default.

If V1 chooses a stateless mode, the response must contain everything needed for future verification.

---

## 12. Signing requirements

Production signing must:

- use a private key never committed to the repo;
- fail closed if private key material is missing or malformed;
- use the `public_key_id` published in `/.well-known/timeproofs-keys.json`;
- never log private key material;
- never return private key material;
- sign the canonical Seal payload;
- not sign the final Seal wrapper including the signature itself.

Preferred algorithm:

```text
Ed25519
```

---

## 13. Verification relationship

`/api/seal` creates a Seal.

A future `/api/verify-seal` or offline verifier will:

1. load Action File;
2. rebuild hashable payload;
3. recompute payload hash;
4. compare with Seal payload hash;
5. load TimeProofs public key by `public_key_id`;
6. canonicalize Seal payload;
7. verify signature;
8. return `valid`, `modified_payload`, `invalid_signature`, `unknown_key`, or related status.

---

## 14. Non-goals for this design PR

This PR must not include:

- `/api/seal` implementation;
- `/api/verify-seal` implementation;
- private key generation;
- committed demo private keys;
- runtime signing code;
- API key accounts;
- billing;
- dashboard;
- web UI;
- OpenAPI mutation;
- database migration;
- changes to `/api/timestamp`;
- changes to `/api/verify`;
- changes to `.tproof.json` behavior.

---

## 15. Acceptance criteria for future implementation PR

A future implementation PR should be accepted only if:

- request accepts payload hash, not raw content;
- sensitive default-disallowed fields are rejected;
- payload hash format is validated;
- proof level is validated;
- Seal payload is canonicalized before signing;
- signing uses environment-provided private key or secure key management;
- public key ID matches published registry;
- missing key fails closed;
- no private key appears in code, logs, tests, fixtures, comments, or docs;
- response includes clear verification limits;
- tests cover valid seal, invalid hash, sensitive field rejection, and missing signing key.

---

## 16. Recommended next PRs

1. Add `/api/seal` minimal implementation with placeholder-disabled production signing guardrails.
2. Add signing helper in isolated module.
3. Add `/api/verify-seal` or local seal verification helper.
4. Add UI/demo only after the endpoint contract works locally.

---

© 2026 TimeProofs — La boîte noire des actions IA.
