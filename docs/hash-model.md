# TimeProofs V1 Hash Model

Status: normative design note for future TimeProofs Action File v1 work  
Scope: documentation only; no API, SDK, schema, verifier, generator, or website behavior changes  
Base object model: `docs/objects-model.md`

## Purpose

This document defines the hashing model for future TimeProofs Action File v1 work.

The goal is to make Action File fingerprinting deterministic, privacy-first, and safe from circular hashing mistakes before any generator, verifier, API route, SDK helper, or schema is implemented.

TimeProofs seals fingerprints, not sensitive action content. A future sealing flow must not upload the full Action File to TimeProofs by default.

## Core Rule

The canonical fingerprint must be computed from a stable, hashable Action File core.

The canonical fingerprint must not include fields that are created after hashing, especially:

- the TimeProofs Seal
- the Proof Bundle
- the signature
- the public key metadata used to verify the signature
- the fingerprint itself
- verifier-generated results
- mutable local annotations added after sealing

If the fingerprint includes the Seal or the fingerprint itself, the file is trying to hash its own hash. That creates a circular hash problem and makes stable verification impossible.

## Object Boundaries

The hash model depends on four separate objects.

### 1. Action File

The Action File is the customer-owned business traceability file for one observable AI action.

It may describe:

- action type
- actor or automation identifiers
- AI system, agent, workflow, or model references
- target system
- action timestamp
- status
- proof level
- business object references
- local evidence references
- redaction notes
- internal log references

The Action File can contain sensitive content only if the customer chooses to store it locally in its own environment. TimeProofs should not receive the full Action File by default.

### 2. Hashable Action File Core

The hashable Action File core is the stable part of the Action File that is canonicalized and hashed.

It should include the fields required to describe the action and its customer-owned evidence references.

It must exclude fields that are added after the fingerprint is calculated or that can change later without changing the underlying action record.

### 3. Payload Hash / Canonical Fingerprint

The payload hash is the SHA-256 digest of the canonical hashable Action File core.

Preferred field name for future specs: `integrity.payload_hash`.

The payload hash is the value that TimeProofs should seal.

### 4. Seal / Proof Bundle

The Seal or Proof Bundle proves that TimeProofs sealed a specific payload hash at a specific time.

It is proof metadata for the fingerprint. It is not the Action File itself.

A detached Seal is preferred for V1 because it avoids circular hashing and keeps verification rules clear.

## Canonical Hashing Flow

Future Action File implementations should follow this flow:

1. Build the Action File payload without `integrity.payload_hash`, `integrity.file_hash`, `integrity.seal`, `seal`, `proof`, `proof_bundle`, `signature`, or `verification` fields.
2. Strip all seal and proof fields before hashing.
3. Canonicalize the remaining hashable core using a deterministic JSON rule.
4. Compute `payload_hash = sha256(canonical_payload)`.
5. Send only `payload_hash`, `format`, and `action_id` to a future sealing endpoint by default.
6. Receive a TimeProofs Seal or Proof Bundle.
7. Store the Seal separately or embed it only outside the hashable core.
8. During verification, strip seal and proof fields again, canonicalize the same core, recompute the payload hash, and compare it with the sealed payload hash.

Conceptual model:

```text
Action File core
  -> deterministic JSON canonicalization
  -> payload_hash
  -> TimeProofs Seal / Proof Bundle
  -> local verification by recomputing the same payload_hash
```

## Fields Excluded From The Hashable Core

Future specs should exclude these fields from the hashable core by default:

```text
integrity.payload_hash
integrity.file_hash
integrity.seal
integrity.signature
integrity.proof
integrity.proof_bundle
seal
proof
proof_bundle
signature
verification
verification_result
verified_at
verifier
local_annotations
local_notes
ui_state
```

This list can be extended by a future schema, but any extension must preserve the same principle: mutable, post-seal, verifier-generated, or self-referential fields must not be included in the value that produces the sealed fingerprint.

## Fields That Can Belong In The Hashable Core

Future specs may include fields like:

```text
format
action_id
created_at
actor
action
workflow
target_system
status
proof_level
traceability
evidence_references
redaction
limitations
metadata
```

These fields should be stable and intentionally part of the traceability record.

If a field can change after sealing without changing the action record, it should not be part of the hashable core.

## Anti-Circular Hash Rule

Never calculate the Action File fingerprint over the final file if that final file already contains the fingerprint, Seal, Proof Bundle, or signature generated from that fingerprint.

Bad pattern:

```text
final Action File including payload_hash + seal
  -> hash final Action File
  -> payload_hash changes because the file contains payload_hash
  -> seal no longer matches stable content
```

Correct pattern:

```text
hashable Action File core without seal fields
  -> canonical payload hash
  -> detached or excluded Seal
  -> verification strips seal fields and hashes the same core again
```

The payload hash must represent the action record, not the proof metadata created after the action record was hashed.

## Deterministic JSON Canonicalization

Future implementations must use deterministic JSON canonicalization.

Minimum V1 requirements:

- stable object key ordering
- deterministic nested object serialization
- deterministic array preservation
- no random whitespace
- no environment-dependent formatting
- no locale-dependent date formatting
- timestamps stored as explicit ISO 8601 UTC strings where applicable
- the same hashable core must produce the same canonical payload hash across supported runtimes

Future work should align with RFC 8785 / JSON Canonicalization Scheme where possible, or document any deliberate deviation.

This document does not implement canonicalization. It defines the rule that future code and tests must satisfy.

## Privacy Boundary

TimeProofs must not receive the full Action File by default.

A future sealing request should send only minimal sealing data such as:

```json
{
  "payload_hash": "<64-character-sha256-hex>",
  "format": "timeproofs.action.v1",
  "action_id": "<action-id>"
}
```

The sealing service should not require prompts, outputs, emails, CRM records, customer names, documents, or internal business content by default.

If a future optional feature sends more than a fingerprint, that behavior must be explicit, documented, and outside the default path.

## Verification Model

A future verifier should do three separate things and explain them separately:

1. Validate the Action File shape or schema.
2. Recompute the canonical payload hash locally from the hashable core.
3. Verify the Seal or Proof Bundle and compare the sealed payload hash with the recomputed payload hash.

A valid hash and Seal mean:

- the hashable Action File core still matches the sealed fingerprint
- the Seal or Proof Bundle is cryptographically valid under the supported verification model
- the fingerprint was sealed at the stated time by the stated issuer or key, subject to the verification rules

A valid hash and Seal do not mean:

- the AI was correct
- the action was lawful
- the content is true
- the file contains every relevant fact
- a regulator, court, insurer, auditor, customer, or partner will accept it as sufficient proof
- TimeProofs has reviewed the underlying action content

## Backward Compatibility

This hash model does not change existing v0.2 behavior.

Existing `.tproof.json` Proof Bundles remain valid.

Existing routes must remain backward-compatible unless a later explicit PR changes them with tests:

- `POST /api/timestamp`
- `POST /api/verify`

Existing SDK helpers for `.tproof.json` should remain compatible.

Future Action File support should be additive and should not break current proof-bundle verification.

## Future Implementation Requirements

Before implementing a generator, seal route, verifier, SDK helper, or schema, future PRs should add tests for:

- stable canonicalization with different input key orders
- seal/proof fields excluded from the payload hash
- payload hash changes when the hashable action core changes
- payload hash does not change when detached Seal metadata changes
- sensitive action content is not sent to TimeProofs by default
- `.tproof.json` backward compatibility remains intact

## Non-Goals

This document does not:

- create a `.action.json` schema
- implement canonicalization code
- implement `createActionFile`
- implement `hashActionFile`
- implement `/api/seal`
- implement `/api/verify-seal`
- modify `verify.html`
- modify existing `.tproof.json` verification
- modify `api-v02/worker.js`
- modify `selfhost/server.js`
- modify `openapi.yaml`
- create a dashboard
- provide legal advice
- certify compliance

## Next Step

After this hash model is accepted, the next safe step is to define proof levels and evidence requirements or to create the Action File v1 specification, depending on the chosen execution order.

No generator, verifier, API, SDK, or billing work should start until the Action File format and canonicalization rules are explicit enough to test.
