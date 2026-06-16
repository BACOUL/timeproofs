# TimeProofs JSON Canonicalization Profile v1

Status: normative design profile for future Action File v1 implementation  
Profile identifier: `timeproofs-json-canonical-v1`  
Scope: documentation only; no API, SDK, verifier, generator, self-host server, OpenAPI, dashboard, billing, or website behavior changes  
Related docs: `docs/hash-model.md`, `docs/action-file-v1.md`, `docs/action-file-test-vectors.md`

## 1. Purpose

This document defines the canonical JSON serialization profile used to calculate future TimeProofs Action File v1 payload hashes.

The profile exists to make the same Action File hashable core produce the same hash across runtimes, platforms, browsers, servers, SDKs, and offline verifiers.

It is designed for the TimeProofs privacy-first model:

- sensitive content stays in the customer environment;
- the customer computes a canonical payload hash locally;
- TimeProofs receives only the payload hash and minimal sealing metadata by default;
- verification recomputes the same hash from the same hashable core.

This document does not implement canonicalization code.

## 2. Profile Identifier

The canonicalization profile identifier is:

```text
timeproofs-json-canonical-v1
```

Future Action Files should reference it in the non-hashable `integrity` envelope:

```json
{
  "integrity": {
    "canonicalization_profile": "timeproofs-json-canonical-v1",
    "hash_algorithm": "sha256",
    "payload_hash": "sha256:<hex>"
  }
}
```

The `integrity` object is not part of the hashable payload.

## 3. Hashable Payload

For Action File v1, the hashable payload is exactly:

```json
{
  "format": "timeproofs.action.v1",
  "schema_version": "1.0.0-design",
  "action_core": {}
}
```

Only these top-level fields are included:

- `format`
- `schema_version`
- `action_core`

The following fields are excluded before canonicalization:

- `integrity`
- `integrity.payload_hash`
- `integrity.seal`
- `integrity.proof_bundle`
- `integrity.signature`
- `local_annotations`
- `verification_result`
- generated verifier warnings
- generated verifier timestamps
- viewer-specific metadata
- export metadata added after sealing

This rule prevents circular hashing.

## 4. Canonicalization Algorithm

The canonicalization algorithm is:

1. Parse the Action File as JSON.
2. Build a new hashable payload containing only `format`, `schema_version`, and `action_core`.
3. Recursively canonicalize every object in that payload.
4. Sort all object keys lexicographically by Unicode code point.
5. Preserve array order exactly.
6. Serialize using compact JSON separators with no extra whitespace.
7. Encode the serialized canonical JSON as UTF-8.
8. Compute SHA-256 over the UTF-8 bytes.
9. Represent the payload hash as lowercase hexadecimal prefixed with `sha256:`.

The resulting value is:

```text
sha256:<64 lowercase hex characters>
```

## 5. Object Rules

Objects must be serialized with deterministic key ordering.

Rules:

- object keys are sorted lexicographically by Unicode code point;
- nested objects use the same rule recursively;
- duplicate JSON object keys are invalid and must be rejected by future validators;
- missing optional fields and fields explicitly set to `null` are not equivalent;
- empty objects are serialized as `{}`;
- empty arrays are serialized as `[]`.

Example canonical key order:

```json
{
  "action_core": {},
  "format": "timeproofs.action.v1",
  "schema_version": "1.0.0-design"
}
```

## 6. Array Rules

Arrays preserve their original order.

Rules:

- arrays are not sorted;
- array element order is semantically meaningful;
- every array item is canonicalized recursively if it is an object or array;
- adding, removing, or reordering array elements changes the payload hash.

This is important for evidence references. A future implementation must not sort evidence arrays unless a separate field-level rule explicitly defines an order before the Action File is created.

## 7. String Rules

Strings must be serialized as valid JSON strings.

Rules:

- strings are encoded as UTF-8 after JSON serialization;
- escaping must be deterministic;
- semantically different Unicode representations are not normalized by this profile;
- producers should normalize user-provided stable identifiers before creating the Action File when needed;
- line endings inside strings are preserved exactly as stored;
- changing capitalization, whitespace, punctuation, or Unicode representation changes the payload hash.

Future implementations may align string escaping with RFC 8785 / JCS where possible, but this document is the normative TimeProofs profile until a stricter implementation profile replaces it.

## 8. Number Rules

Action File v1 should avoid numbers in the hashable core when the value is security-critical, externally audited, or representation-sensitive.

Recommended rule:

- use strings for identifiers, amounts, percentages, scores, timestamps, and values where exact representation matters;
- avoid floating-point numbers in the hashable core;
- reject `NaN`, `Infinity`, and `-Infinity`;
- serialize valid JSON numbers without extra whitespace.

This reduces cross-runtime ambiguity.

## 9. Boolean and Null Rules

Boolean and null values use standard JSON serialization:

```text
true
false
null
```

Rules:

- `false` and missing field are not equivalent;
- `null` and missing field are not equivalent;
- changing a value from `null` to a string or object changes the payload hash.

## 10. Date and Time Rules

Timestamps should use ISO 8601 UTC format with a trailing `Z` when possible.

Recommended format:

```text
YYYY-MM-DDTHH:mm:ssZ
```

Examples:

```text
2026-06-16T18:50:00Z
2026-06-16T18:50:02Z
```

Rules:

- timestamps are strings;
- timestamps are not parsed or reformatted during canonicalization;
- two timestamp strings representing the same instant but written differently produce different hashes;
- producers should normalize timestamps before creating the Action File.

## 11. Whitespace Rules

Canonical JSON output must contain no unnecessary whitespace.

Rules:

- no indentation;
- no spaces after commas;
- no spaces after colons;
- no trailing newline required;
- whitespace inside string values is preserved.

Example:

```json
{"format":"timeproofs.action.v1","schema_version":"1.0.0-design","action_core":{}}
```

## 12. Hash Algorithm

The hash algorithm is:

```text
SHA-256
```

The displayed format is:

```text
sha256:<lowercase hex digest>
```

Future implementations must not send the full Action File to TimeProofs by default. They should send only the computed payload hash and minimal sealing metadata.

## 13. Mutation Semantics

A payload hash must change when:

- `format` changes;
- `schema_version` changes;
- any field inside `action_core` changes;
- array order changes inside `action_core`;
- evidence fingerprints change;
- proof level changes;
- target reference changes;
- stable timestamps inside `action_core` change.

A payload hash must not change when only these fields change:

- `integrity`
- `integrity.payload_hash`
- `integrity.seal`
- `integrity.proof_bundle`
- `local_annotations`
- `verification_result`
- viewer-specific verifier output
- generated warnings outside the hashable payload

## 14. Verification Semantics

A verifier using this profile should:

1. parse the Action File;
2. remove or ignore non-hashable fields;
3. rebuild the hashable payload with `format`, `schema_version`, and `action_core`;
4. canonicalize using `timeproofs-json-canonical-v1`;
5. compute SHA-256;
6. compare the recomputed hash with `integrity.payload_hash` or the payload hash sealed by a future Seal or Proof Bundle.

A matching hash means the hashable payload matches the recorded fingerprint.

It does not mean:

- the AI output was correct;
- the action was lawful;
- the action was fair;
- the Action File contains every relevant fact;
- the target system content was verified by TimeProofs;
- legal, regulatory, insurance, banking, or audit acceptance is guaranteed.

## 15. Relationship With RFC 8785 / JCS

This profile is inspired by deterministic JSON canonicalization practices, including RFC 8785 / JSON Canonicalization Scheme concepts.

However, until implementation tests are added, TimeProofs must not claim full RFC 8785 compliance.

Future implementation may either:

- align fully with RFC 8785 / JCS and document that precisely;
- keep a TimeProofs-specific profile and document deviations.

The profile identifier `timeproofs-json-canonical-v1` remains the product-level contract for Action File v1.

## 16. Privacy Boundary

Canonicalization must not require raw sensitive content to leave the customer environment.

Examples of content that should remain customer-side by default:

- raw prompts;
- raw AI outputs;
- emails;
- support tickets;
- CRM records;
- personal data;
- documents;
- secrets;
- credentials;
- internal logs.

Use fingerprints, references, redaction notes, and customer-held evidence instead.

## 17. Test Vector Compatibility

The design-stage examples in `examples/action-files/` were generated using the same rule described in this profile:

- hash only `format`, `schema_version`, and `action_core`;
- sort object keys recursively;
- preserve array order;
- use compact JSON;
- encode as UTF-8;
- compute SHA-256;
- prefix with `sha256:`.

Future code must reproduce the documented hashes unless this profile is explicitly versioned and changed in a later PR.

## 18. Non-Goals

This document does not:

- implement canonicalization code;
- add SDK helpers;
- modify API routes;
- modify `verify.html`;
- modify `selfhost/server.js`;
- modify OpenAPI;
- create `/api/seal`;
- create `/api/verify-seal`;
- create a dashboard;
- create billing;
- claim legal proof;
- claim regulatory compliance.

## 19. Next Step

After this profile is accepted, the next safe implementation step is to add local helper code and tests for:

- `canonicalizeActionFileCore`;
- `hashActionFileCore`;
- validation that `integrity`, `local_annotations`, and `verification_result` do not affect the payload hash;
- validation that `action_core` changes do affect the payload hash.
