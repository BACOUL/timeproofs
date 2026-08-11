# TimeProofs — Canonical Transaction Model

Status: M2.1 hardened canonical model
Branch: `relaunch/invariant-engine`

## Purpose

TimeProofs models an agentic transaction as a graph of protocol/provider artifacts and explicit relations between them. The core model remains independent of UCP, AP2, A2A, MCP, payment rails and future business protocols.

Canonical pipeline:

`ProtocolObject → BindingEdge → InvariantDefinition → EvidenceItem → EvaluationResult → Decision`

The model preserves source provenance and does not force one universal transaction ID.

## Design principles

1. Source artifacts are immutable evaluation inputs.
2. Every evaluated artifact has an explicit snapshot identity/digest.
3. Canonical values never replace raw source values.
4. Protocol, adapter, pack and core-schema versions are explicit.
5. Canonicalization is adapter-owned and version-aware.
6. Unsupported or ambiguous mapping produces `UNKNOWN`, never guessed truth.
7. One economic transaction is represented by an object graph.
8. Every decision is reproducible from declared artifact snapshots, versions, evidence, evaluation time and policy.
9. Core structures contain no UCP/AP2-specific fields.
10. Time/lifecycle state are first-class where needed.
11. Core enforcement is deterministic; LLM output cannot be authoritative for PASS/BLOCK.

## 1. ProtocolObject

A `ProtocolObject` represents one source artifact from a protocol, provider or business system.

Conceptual form:

```json
{
  "object_id": "obj_...",
  "source": {
    "namespace": "ucp",
    "object_type": "checkout",
    "protocol_version": "...",
    "provider": null,
    "provider_version": null
  },
  "external_id": "checkout_123",
  "observed_at": "2026-08-11T09:00:00Z",
  "snapshot": {
    "digest": {
      "algorithm": "sha256",
      "value": "...",
      "scope": "RAW_BYTES"
    },
    "media_type": "application/json",
    "byte_length": 1234,
    "source_ref": null
  },
  "raw": {},
  "canonical": {},
  "integrity": {},
  "provenance": {}
}
```

### Snapshot rule

Two artifacts with the same business identifier are not considered the same evaluated artifact unless their snapshot identity proves it.

Digest scope is explicit:

- `RAW_BYTES` when original bytes are available;
- `CANONICAL_JSON` when deterministic canonical JSON is the evaluated representation;
- `EXTERNAL_IMMUTABLE_REF` only when an adapter can establish immutability of the referenced source.

`object_id` is TimeProofs-local. `external_id` is optional. `raw` preserves the source payload or lossless evaluation representation. `canonical` contains adapter-derived comparable values. Every canonical field used by an invariant must trace back to source evidence.

## 2. Evaluation envelope

A complete machine evaluation has required reproducibility metadata:

```json
{
  "core_schema_version": "...",
  "evaluation_id": "eval_...",
  "metadata": {
    "pack": { "id": "ucp-ap2", "version": "..." },
    "adapters": [
      { "id": "ucp", "version": "..." },
      { "id": "ap2", "version": "..." }
    ],
    "evaluated_at": "2026-08-11T09:01:00Z",
    "policy": {}
  },
  "graph": {},
  "invariants": [],
  "results": [],
  "decision": "PASS"
}
```

The root schema requires these fields; an empty object is not a valid TimeProofs evaluation.

## 3. TransactionGraph

A transaction is not a flat record. It is a graph of artifact snapshots and explicit edges:

```text
ProtocolObject A ──BindingEdge──> ProtocolObject B
      │                                │
      └────────BindingEdge─────────────┘
```

`graph_id` is a TimeProofs evaluation handle, not a universal ecosystem transaction ID.

## 4. Canonical values

Adapters may expose small canonical value classes such as:

- money: `{ amount_minor, currency }`
- timestamp: RFC3339/UTC plus source timezone metadata when needed
- namespaced identifier
- entity reference where stable identity exists
- boolean
- integer/decimal
- set/list with explicit ordering semantics
- lifecycle state with source taxonomy preserved
- hash/reference

Canonicalization must not silently collapse semantically uncertain values. A merchant display name and a PSP legal beneficiary are not the same entity merely because strings resemble each other.

## 5. Canonical field provenance

Every derived field used by an invariant is explainable through source object, source path, derivation identifier and snapshot digest.

```json
{
  "canonical_path": "economics.grand_total",
  "value": { "amount_minor": 76000, "currency": "EUR" },
  "derived_from": [
    {
      "object_id": "obj_ucp_checkout",
      "raw_path": "$.totals[?(@.type=='total')].amount"
    }
  ],
  "derivation": "ucp.checkout.total.v1"
}
```

## 6. PASS / BLOCK / UNKNOWN examples

PASS: exact checkout snapshot is bound to an AP2 payment artifact and amount/currency projection matches.

BLOCK: exact binding is valid and complete evidence proves payment projection amount differs.

UNKNOWN: an invariant requires executed payment amount but only a receipt without executed amount evidence is present.

UNKNOWN must include a structured reason such as `MISSING_EVIDENCE`, `UNSUPPORTED_VERSION` or `AMBIGUOUS_BINDING`.

## 7. Core versus adapters versus packs

### Core owns
- evaluation envelope and graph structure
- generic object/snapshot metadata
- generic binding representation
- invariant evaluation contract
- evidence/result/decision structures

### Adapter owns
- parsing and version recognition
- canonical field extraction
- raw→canonical provenance
- artifact snapshot construction
- protocol-local integrity/conformance input where needed

### Invariant Pack owns
- relationships to evaluate
- canonical fields/predicates
- allowed transformations
- evidence requirements
- supported version combinations
- default severity/action

This separation is mandatory so A2A/MCP/Travel/Procurement can be added without core redesign.

## 8. M2.1 freeze rule

M2.1 fixes structural defects found before fixture/engine implementation: required evaluation envelope, immutable artifact snapshot identity, explicit pack/adapter/core versions and structured UNKNOWN reasons.

M3 semantics remain compatible. Future pack work MUST NOT add protocol-specific fields to generic core objects unless a new documented structural defect explicitly reopens the model through the Decision Log.
