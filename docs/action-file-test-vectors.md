# TimeProofs Action File Synthetic Examples and Test Vectors

Status: design-stage examples  
Scope: documentation and fixtures only  
Related spec: `docs/action-file-v1.md`  
Related schema: `schemas/action-file-v1.schema.json`

## 1. Purpose

This document introduces synthetic `.action.json` examples for future TimeProofs Action File v1 work.

The examples are intentionally fake. They do not represent real customers, real AI actions, real external systems, or real legal evidence.

This PR does not implement a generator, verifier, canonicalization library, seal endpoint, SDK helper, dashboard, or billing flow.

## 2. Added Example Files

| File | Proof level | Action type | Purpose |
| --- | --- | --- | --- |
| `examples/action-files/declared-email-drafted.action.json` | `declared` | `email.drafted` | Weakest proof level: a draft action is recorded, but sending is not confirmed. |
| `examples/action-files/target-confirmed-support-ticket.action.json` | `target_confirmed` | `support.ticket_created` | Target system returned a synthetic ticket reference. |
| `examples/action-files/externally-verifiable-file-delivered.action.json` | `externally_verifiable` | `file.delivered` | External or independent receipt references are represented by fingerprints. |

## 3. Draft Canonicalization Used For These Vectors

Until a dedicated canonicalization profile is finalized, these examples use the following **draft** deterministic rule to produce the documented hashes:

1. take only this object:

```json
{
  "format": "timeproofs.action.v1",
  "schema_version": "1.0.0-design",
  "action_core": {}
}
```

2. exclude `integrity`, `local_annotations`, and `verification_result`;
3. serialize JSON with sorted object keys;
4. use compact separators, with no extra whitespace;
5. encode as UTF-8;
6. compute SHA-256;
7. prefix the result with `sha256:`.

This is a design-stage rule. A later PR may replace it with a formal canonicalization profile aligned with RFC 8785 / JCS or an explicitly documented TimeProofs profile.

## 4. Expected Draft Payload Hashes

| Vector | File | Expected `integrity.payload_hash` |
| --- | --- | --- |
| TV-001 | `declared-email-drafted.action.json` | `sha256:231c6b5ca29078119421fcf4aedaee827917b1b6ffaad8b75c1076b98c5b51ea` |
| TV-002 | `target-confirmed-support-ticket.action.json` | `sha256:51679947418fdef8abec1f0171e236685cc7f3027b548816765f8708eacc61c9` |
| TV-003 | `externally-verifiable-file-delivered.action.json` | `sha256:101d847f15ffca1dceaa26d8e1b0da761fd29b748b2acd314b8b7e12c086e6ad` |

## 5. Test Vector Rules

### TV-001 — Declared email draft

Expected behavior:

- schema shape is Action File v1 design-compatible;
- `proof_level` is `declared`;
- `action.type` is `email.drafted`;
- no target-system confirmation is required;
- payload hash is computed from `format`, `schema_version`, and `action_core` only;
- changing `local_annotations` must not change the payload hash;
- changing any stable field inside `action_core` must change the payload hash.

### TV-002 — Target-confirmed support ticket

Expected behavior:

- schema shape is Action File v1 design-compatible;
- `proof_level` is `target_confirmed`;
- `action.type` is `support.ticket_created`;
- `target_system.reference` is present;
- evidence is represented by a fingerprint, not raw support content;
- payload hash is computed from `format`, `schema_version`, and `action_core` only.

Mutation check:

- original expected hash: `sha256:51679947418fdef8abec1f0171e236685cc7f3027b548816765f8708eacc61c9`;
- if `action_core.action.summary` is changed to `Created a support ticket from a modified incoming request.`, expected draft hash becomes `sha256:0c3ee55db1b65e55eafc3cb33c1c09d5b857161f3cf0535bb169054de537c3a7`;
- if only `local_annotations` is changed, expected draft hash remains `sha256:51679947418fdef8abec1f0171e236685cc7f3027b548816765f8708eacc61c9`.

### TV-003 — Externally-verifiable file delivery

Expected behavior:

- schema shape is Action File v1 design-compatible;
- `proof_level` is `externally_verifiable`;
- `action.type` is `file.delivered`;
- target and evidence references are synthetic;
- raw document content is not included;
- external verification depends on access rights and is not guaranteed by TimeProofs.

## 6. Privacy Requirements

These examples must remain privacy-safe:

- no real personal data;
- no real customer identifiers;
- no raw prompts;
- no raw AI outputs;
- no real emails;
- no real support tickets;
- no real external URLs;
- no secrets or credentials;
- fingerprints and references only.

## 7. What These Examples Prove

These examples can help future implementation work test:

- Action File shape;
- proof-level field usage;
- target-system reference modeling;
- privacy-safe evidence references;
- hashable payload boundary;
- exclusion of `integrity`, `local_annotations`, and `verification_result`;
- synthetic data discipline.

## 8. What These Examples Do Not Prove

These examples do not prove:

- that a real AI action occurred;
- that the AI output was correct;
- that a target system accepted anything;
- that a legal or regulatory requirement is satisfied;
- that the example hashes are final production hashes;
- that the canonicalization profile is final;
- that TimeProofs has implemented a generator or verifier.

## 9. Backward Compatibility

This PR does not change existing v0.2 behavior.

Existing `.tproof.json` Proof Bundles remain valid.

Existing routes remain unchanged:

- `POST /api/timestamp`
- `POST /api/verify`

Future Action File implementation must remain additive.

## 10. Next Step

After this PR, the next safe step is to define the formal canonicalization profile or begin local helper design for:

- `canonicalizeActionFileCore`;
- `hashActionFileCore`;
- `createActionFile`;
- future `sealActionFile` and `verifyActionFile` flows.
