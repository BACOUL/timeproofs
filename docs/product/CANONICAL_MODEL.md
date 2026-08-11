# TimeProofs — Canonical Transaction Model

Status: M2 canonical model
Branch: `relaunch/invariant-engine`

## Purpose

TimeProofs models an agentic transaction as a graph of protocol/provider artifacts and explicit relations between them. The core model must remain independent of UCP, AP2, A2A, MCP, payment rails, and future business protocols.

The canonical pipeline is:

`ProtocolObject → BindingEdge → InvariantDefinition → EvidenceItem → EvaluationResult → Decision`

The model MUST preserve raw source provenance and MUST NOT force all systems into one universal transaction identifier.

## Design principles

1. Source artifacts are immutable inputs to evaluation.
2. Canonical values never replace or erase raw source values.
3. Protocol and schema versions are explicit.
4. Canonicalization is adapter-owned and version-aware.
5. Unsupported or ambiguous mapping produces `UNKNOWN`, never guessed truth.
6. One economic transaction is represented by an object graph.
7. Every decision is reproducible from declared inputs, pack version, and evidence.
8. Core structures contain no UCP/AP2-specific fields.
9. Time and lifecycle state are first-class when an invariant depends on them.
10. Core enforcement is deterministic; LLM output cannot be authoritative for PASS/BLOCK.

## 1. ProtocolObject

A `ProtocolObject` represents one source artifact from a protocol, provider, or business system.

Required conceptual fields:

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
  "raw": {},
  "canonical": {},
  "integrity": {},
  "provenance": {}
}
```

### Rules

- `object_id` is TimeProofs-local and identifies the supplied artifact instance.
- `external_id` is optional because some signed objects may not expose a convenient business identifier.
- `raw` MUST preserve the source payload or a lossless reference to it.
- `canonical` contains only adapter-derived values required for cross-object comparison.
- `integrity` MAY contain signatures, hashes, JWS/SD-JWT references, or verification status.
- `provenance` records how the object was obtained: supplied file, API response, webhook, provider query, test fixture, etc.
- A canonical field MUST be traceable back to one or more raw source paths.

## 2. TransactionGraph

A transaction is not a flat record. It is:

```text
ProtocolObject A ──BindingEdge──> ProtocolObject B
      │                                │
      └────────BindingEdge─────────────┘
```

Conceptual form:

```json
{
  "graph_id": "graph_...",
  "evaluation_time": "2026-08-11T09:01:00Z",
  "objects": [],
  "bindings": [],
  "context": {}
}
```

`graph_id` is a TimeProofs evaluation handle, not a claim that a universal economic transaction ID exists in the ecosystem.

## 3. Canonical value representation

Adapters MAY expose comparable values using a small set of canonical value classes:

- money: `{ amount_minor, currency }`
- timestamp: RFC3339/UTC plus source timezone metadata when needed
- identifier: normalized string plus namespace
- entity reference: namespace + stable source identifier where available
- boolean
- integer/decimal
- set/list with explicit ordering semantics
- lifecycle state with source taxonomy preserved
- hash/reference

Canonicalization MUST NOT silently convert semantically uncertain values. Example: a merchant display name and a PSP beneficiary legal entity are not automatically the same `entity` merely because their strings resemble each other.

## 4. Canonical field provenance

Every derived field used by an invariant MUST be explainable:

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

The `derivation` identifier is versioned by the relevant adapter/pack.

## 5. Example graph — PASS

```text
obj_checkout
 UCP checkout total = 760 EUR
      │
      ├── exact-authorized-state ──> obj_payment_mandate
      │                              AP2 amount = 760 EUR
      │
      └── currency-projection ─────> EUR
```

Evaluation:

- total projection: PASS
- currency projection: PASS
- resulting decision: PASS

## 6. Example graph — BLOCK

```text
obj_checkout
 UCP checkout total = 760 EUR
      │
      └── payment-projection ──────> obj_payment_mandate
                                     AP2 amount = 810 EUR
```

Evidence is complete and values are unambiguous.

Evaluation:

`TP-CX-001 = BLOCK`

## 7. Example graph — UNKNOWN

```text
obj_payment_mandate
 amount = 760 EUR
      │
      └── execution-evidence ──────> obj_payment_receipt
                                      success receipt, but no executed amount
```

If the invariant asks whether the PSP actually executed exactly 760 EUR and no provider/network evidence containing executed amount is supplied, result is:

`UNKNOWN`

TimeProofs MUST NOT infer equality from receipt success alone.

## 8. Core versus adapters versus packs

### Core owns

- graph structure
- generic object metadata
- generic binding representation
- invariant evaluation contract
- evidence representation
- result/decision aggregation

### Adapter owns

- parsing
- schema/version recognition
- source validation where needed
- canonical field extraction
- raw→canonical provenance

### Invariant Pack owns

- which objects should be related
- which canonical fields are compared
- allowable transformations
- predicates
- evidence requirements
- severity/default action
- supported version combinations

This separation is mandatory so adding A2A/MCP/Travel/Procurement packs does not require redesigning core structures.

## 9. M2 freeze rule

M3 may add protocol-specific semantics, but it MUST NOT add UCP/AP2-specific properties to the generic `ProtocolObject`, `BindingEdge`, `EvidenceItem`, `EvaluationResult`, or `Decision` structures unless M2 is explicitly reopened through the Decision Log.
