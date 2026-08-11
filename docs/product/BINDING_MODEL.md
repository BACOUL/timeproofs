# TimeProofs — Binding Model

Status: M2 canonical model

## Purpose

A binding states why two protocol/provider objects are believed to participate in the same composed transaction or lifecycle relation.

TimeProofs does not invent a universal economic intent ID. It records explicit, evidence-backed edges between concrete objects.

## BindingEdge

Conceptual structure:

```json
{
  "binding_id": "bind_...",
  "from_object_id": "obj_a",
  "to_object_id": "obj_b",
  "relation": "projects_to",
  "basis": "cryptographic_reference",
  "confidence": "DETERMINISTIC",
  "evidence": [],
  "valid_at": "2026-08-11T09:00:00Z",
  "pack_rule": "ucp-ap2.binding.payment-state.v1"
}
```

## Allowed confidence classes

- `DETERMINISTIC`: relation is proven from exact identifiers, hashes, signatures, or normative references.
- `DECLARED`: a trusted integration explicitly declares the relationship, but TimeProofs cannot independently prove it from artifacts.
- `DERIVED`: relation follows from a deterministic adapter rule over source fields.
- `AMBIGUOUS`: multiple candidate relationships remain possible.

`AMBIGUOUS` bindings MUST NOT support a blocking invariant that requires unique identity unless the invariant explicitly defines ambiguity behavior.

## Relation vocabulary

Core provides a small generic vocabulary; packs may define namespaced extensions.

Initial generic relations:

- `references`
- `authorizes`
- `projects_to`
- `results_in`
- `receipts`
- `supersedes`
- `invalidates`
- `derived_from`
- `same_transaction_candidate`

A relation name alone is never enough evidence. The `basis` and supporting `EvidenceItem`s explain why the edge exists.

## Binding basis

Examples:

- cryptographic hash/reference
- exact protocol identifier
- signed object containment
- provider transaction identifier
- merchant order reference
- webhook correlation identifier
- deterministic source-field derivation
- integration-declared mapping

String similarity, LLM semantic similarity, or approximate matching MUST NOT create a deterministic binding.

## Version awareness

Bindings are evaluated under explicit object and pack versions. If a newer protocol version changes identifier/hash semantics, the old binding rule remains reproducible under its pinned pack version.

## Temporal semantics

Bindings can become stale or superseded.

Example:

```text
checkout_v1 ──authorizes──> payment_mandate_v1
checkout_v2 ──supersedes──> checkout_v1
```

An invariant can then ask whether execution still references the current authorized state rather than merely whether a historical binding once existed.

## Failure modes

- no binding evidence → `UNKNOWN`
- contradictory deterministic bindings → `BLOCK` only if pack defines this contradiction as a violation
- multiple plausible but unprovable objects → `UNKNOWN`
- unsupported protocol/version relation → `UNKNOWN` or `UNSUPPORTED` at compatibility layer, never guessed binding

## Strategic boundary

TimeProofs is not an identity-resolution company by default. Complex legal-entity equivalence (merchant vs marketplace vs processor vs sub-merchant) belongs in later provider/entity adapters and must not be reduced to raw string equality in the core.
