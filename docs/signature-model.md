# TimeProofs Asymmetric Signature Model

Status: design foundation for future Action File sealing  
Scope: documentation only; no runtime signing implementation in this PR  
Related docs: `docs/hash-model.md`, `docs/canonicalization-profile.md`, `docs/action-file-v1.md`

## 1. Purpose

TimeProofs Action Files need a signature model that allows a third party to verify that a canonical Action File payload hash was sealed by TimeProofs without requiring access to sensitive action content.

The signature model must support:

- public verification;
- key rotation;
- long-term verification with historical public keys;
- a strict separation between customer-held Action Files and TimeProofs-held seal records;
- backward compatibility with existing `.tproof.json` proof bundles and timestamp behavior.

This document defines the target model. It does not introduce a signing endpoint, a verification endpoint, a key endpoint, or server code changes.

## 2. Core Principle

TimeProofs signs a seal payload that contains a canonical payload hash and minimal metadata.

TimeProofs does not sign raw sensitive content by default.

The customer or integrator computes:

```text
payload_hash = sha256(canonical Action File payload)
```

Then TimeProofs signs a seal payload that references that hash.

## 3. Preferred Algorithm

The preferred algorithm for future Action File seals is:

```text
Ed25519
```

Reasons:

- strong asymmetric signature model;
- compact public keys and signatures;
- deterministic signing behavior;
- suitable for offline verification;
- widely supported in modern cryptographic libraries.

If the runtime cannot support Ed25519 safely, a fallback algorithm may be documented later, but any fallback must preserve public verification and must not expose private key material.

## 4. Object Boundaries

The signature model separates four objects:

1. **Action File** — the business-level `.action.json` file held by the company.
2. **Hashable Action File payload** — the deterministic payload built from `format`, `schema_version`, and `action_core`.
3. **Payload hash** — the `sha256:<hex>` fingerprint of the canonical payload.
4. **TimeProofs Seal** — the signed record that says TimeProofs sealed this payload hash at a given time.

The signature is computed over the Seal payload, not over the final Action File including its own signature.

This prevents circular hashing and circular signing.

## 5. Seal Payload v1

A future seal payload should contain only the minimum metadata required for verification.

Recommended structure:

```json
{
  "seal_version": "timeproofs.seal.v1",
  "seal_id": "seal_demo_001",
  "payload_hash": "sha256:<64 lowercase hex>",
  "format": "timeproofs.action.v1",
  "action_id": "act_demo_001",
  "sealed_at": "2026-06-16T20:00:00Z",
  "public_key_id": "timeproofs-main-2026-01",
  "signature_algorithm": "Ed25519"
}
```

The signature is generated over a deterministic canonical representation of this Seal payload.

The signature itself is not part of the signed payload.

## 6. Seal Object v1

A future Seal object may wrap the signed payload and signature:

```json
{
  "seal_payload": {
    "seal_version": "timeproofs.seal.v1",
    "seal_id": "seal_demo_001",
    "payload_hash": "sha256:<64 lowercase hex>",
    "format": "timeproofs.action.v1",
    "action_id": "act_demo_001",
    "sealed_at": "2026-06-16T20:00:00Z",
    "public_key_id": "timeproofs-main-2026-01",
    "signature_algorithm": "Ed25519"
  },
  "signature": "base64url-or-hex-signature"
}
```

This object can be:

- embedded in `integrity.seal` of an Action File;
- stored as a detached seal record;
- returned by a future `/api/seal` endpoint;
- checked by a future `/api/verify-seal` endpoint;
- checked offline using the public key.

## 7. Public Key ID

Every seal must include:

```text
public_key_id
```

The `public_key_id` identifies which public key verifies the signature.

Recommended naming convention:

```text
timeproofs-main-YYYY-NN
```

Example:

```text
timeproofs-main-2026-01
```

Rules:

- key IDs must be stable;
- key IDs must never be reused for different key material;
- retired keys must remain published for historical verification;
- compromised keys must remain listed with a clear compromised status and date.

## 8. Private Key Rules

Private keys must never be committed to the repository.

Rules:

- private keys are stored only in secure environment variables, secret managers, or dedicated key management infrastructure;
- local development must use explicit demo keys clearly marked as unsafe;
- production signing must fail closed if private key material is missing;
- logs must never print private key material;
- CI must not expose private key material in artifacts or logs.

## 9. Public Key Publication

A future PR must create the public key endpoint or static file.

Recommended path:

```text
/.well-known/timeproofs-keys.json
```

Recommended fields:

```json
{
  "issuer": "TimeProofs",
  "keys": [
    {
      "public_key_id": "timeproofs-main-2026-01",
      "algorithm": "Ed25519",
      "public_key": "base64url-public-key-placeholder",
      "created_at": "2026-01-01T00:00:00Z",
      "status": "active"
    }
  ]
}
```

Allowed statuses:

- `active`
- `retired`
- `compromised`

## 10. Verification Flow

A verifier should:

1. load the Action File;
2. rebuild the hashable Action File payload;
3. canonicalize it using `timeproofs-json-canonical-v1`;
4. compute `payload_hash`;
5. compare it with the payload hash in the Seal;
6. load the public key matching `public_key_id`;
7. canonicalize the Seal payload;
8. verify the signature using the declared algorithm;
9. return a clear status.

Suggested statuses:

- `valid`
- `modified_payload`
- `invalid_signature`
- `unknown_key`
- `retired_key`
- `compromised_key`
- `unsupported_algorithm`
- `unsupported_format`

## 11. What Signature Verification Proves

A valid signature can prove that:

- a Seal payload was signed by the private key corresponding to the published public key;
- the Seal payload references a specific `payload_hash`;
- the Action File hashable payload matches the referenced `payload_hash`, if recomputation succeeds;
- the key ID used for verification is known and published by TimeProofs.

## 12. What Signature Verification Does Not Prove

A valid signature does not prove that:

- the AI output was correct;
- the action was lawful;
- the business decision was valid;
- the target system data is complete;
- the Action File contains every relevant fact;
- TimeProofs reviewed the raw underlying content;
- a court, regulator, insurer, bank, auditor, or partner will accept the record.

## 13. Backward Compatibility

Existing `.tproof.json` proof bundles and existing timestamp verification behavior remain backward-compatible.

This model is additive. It does not remove:

- existing ProofSpec concepts;
- existing `/api/timestamp` behavior;
- existing `/api/verify` behavior;
- existing hash-only privacy-first foundations.

## 14. Implementation Guardrails For Future PRs

Future signing implementation must be split into small PRs:

1. public keys endpoint or static file;
2. signing helper for Seal payloads;
3. `/api/seal` accepting only hashes and minimal metadata;
4. `/api/verify-seal` for seal status;
5. client-side or offline verifier support.

Do not implement these all at once.

## 15. Non-Goals

This document does not:

- create `/api/seal`;
- create `/api/verify-seal`;
- generate key material;
- commit private keys;
- modify existing APIs;
- modify the web verifier;
- create a dashboard;
- create billing;
- claim legal proof;
- claim regulatory compliance.
