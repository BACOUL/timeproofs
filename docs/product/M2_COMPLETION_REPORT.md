# TimeProofs — M2 Completion Report

Status: COMPLETE
Date: 2026-08-11
Branch: `relaunch/invariant-engine`

## Objective

Freeze a protocol-agnostic canonical model that can represent current UCP/AP2 composition and future A2A/MCP/business-protocol packs without redesigning the core.

## Deliverables completed

- `docs/product/CANONICAL_MODEL.md`
- `docs/product/BINDING_MODEL.md`
- `docs/product/EVIDENCE_MODEL.md`
- `docs/product/DECISION_MODEL.md`
- `schemas/timeproofs-core.schema.json`

## Frozen core primitives

1. `ProtocolObject`
2. `BindingEdge`
3. `InvariantDefinition`
4. `EvidenceItem`
5. `EvaluationResult`
6. `Decision`
7. `TransactionGraph`

Core pipeline:

`ProtocolObject → BindingEdge → InvariantDefinition → EvidenceItem → EvaluationResult → Decision`

## M2 exit proofs

### PASS

A UCP checkout and an AP2 PaymentMandate are represented as two `ProtocolObject`s. A deterministic binding connects the payment mandate to the exact authorized checkout state. The pack extracts canonical grand-total and currency values. If both project exactly, TP-CX-001 and TP-CX-002 evaluate PASS.

No UCP/AP2-specific property is required in the core object schema.

### BLOCK

The same valid binding may exist while canonical economic values disagree:

- checkout grand total: 760 EUR
- payment mandate amount: 810 EUR

The binding remains valid; TP-CX-001 evaluates BLOCK from explicit evidence. This demonstrates the company thesis: valid identity/binding does not guarantee semantic consistency.

### UNKNOWN

An AP2 PaymentReceipt may prove a success receipt and bind to a closed mandate while not carrying the actually executed amount/currency. If TP-EV-001 asks whether the external payment execution exactly matched the mandate and no PSP/network amount evidence is supplied, the generic model represents the missing evidence and result is UNKNOWN.

### LIFECYCLE

A UCP Order can be represented as another ProtocolObject linked by `results_in`/`references` edges to the originating checkout. Later order artifacts can `supersede` earlier state or be accompanied by lifecycle event EvidenceItems. Therefore legitimate post-order adjustments do not require changing the graph/core model.

### FUTURE PROTOCOL

An A2A task can be represented without schema changes:

```json
{
  "object_id": "obj_a2a_task",
  "source": {
    "namespace": "a2a",
    "object_type": "task",
    "protocol_version": "future-supported-version",
    "provider": null,
    "provider_version": null
  },
  "external_id": "task_123",
  "observed_at": "2026-08-11T09:00:00Z",
  "raw": {},
  "canonical": {
    "constraints": {
      "max_amount_minor": 80000,
      "currency": "EUR"
    }
  },
  "integrity": {},
  "provenance": {}
}
```

A future A2A↔UCP pack can bind this task to a checkout and evaluate `checkout.total <= task.max_amount` without altering `ProtocolObject`, `BindingEdge`, or `Decision`.

The same applies to MCP tool calls/results and business-system artifacts.

## Architectural decisions locked by M2

- No universal economic transaction ID is required.
- Transaction identity is an evidence-backed object graph.
- Raw evidence is preserved; canonical values are derived overlays.
- Binding confidence is explicit.
- UNKNOWN is first-class and cannot be hidden by successful sibling checks.
- Evaluation time is explicit for reproducible lifecycle/temporal checks.
- External provider evidence is structurally distinct from protocol-native artifacts.
- Core contains no protocol business semantics.
- Packs own mappings, predicates, supported version combinations, exceptions, evidence requirements, and default severity.

## Intentionally deferred to M3+

M2 does NOT freeze:

- final UCP/AP2 adapter field paths;
- exact v0.1 pack manifest format beyond core compatibility needs;
- production severity for every candidate;
- all legitimate amount transformations;
- provider evidence adapter APIs;
- cloud evidence signing/retention;
- runtime fail-open/fail-closed behavior.

These are pack or deployment concerns, not canonical-core concerns.

## M2 exit decision

All M2 exit criteria in `docs/startup/EXECUTION_PLAN.md` are met sufficiently to begin M3.

Next milestone:

**M3 — UCP/AP2 Invariant Pack v0.1 specification**

M3 must now translate the conservative M1 shortlist into exact, versioned pack semantics without changing the M2 core model.
