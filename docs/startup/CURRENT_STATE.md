# TimeProofs — Current State

Last updated: 2026-08-11
Branch: `relaunch/invariant-engine`

## Where the project is

TimeProofs product direction is frozen at the constitutional level.

**Company:** Cross-Protocol Consistency Infrastructure for agentic transactions.

**Long-term product:** Cross-Protocol Consistency & Invariant Engine.

**Initial wedge:** UCP ↔ AP2 composition consistency, focused on cross-object semantic/economic consistency and evidence closure rather than generic protocol conformance.

**Current milestone:** M3 — UCP/AP2 Invariant Pack v0.1 specification.

No new TimeProofs evaluation engine has been implemented yet. Legacy AgentReady code remains intact and isolated.

## Completed foundation

- branch `relaunch/invariant-engine` created;
- master relaunch context and product constitution created;
- startup operating system, handoff, benchmark policy and execution plan created;
- M1 UCP/AP2 normative audit completed;
- UCP/AP2 gap matrix with 30 relationships created;
- payment/order audit M1.1 created;
- M1 completion report created;
- M2 canonical transaction model completed;
- machine-readable core model schema created.

## M1 result locked

1. TimeProofs does not duplicate UCP/AP2 signature/expiry/basic scope conformance as its moat.
2. AP2 already provides strong checkout↔PaymentMandate cryptographic identity binding; TimeProofs does not own raw binding.
3. Company value is semantic projection consistency and evidence closure across already valid/bound objects.
4. Missing or selectively undisclosed evidence produces `UNKNOWN`, never guessed PASS.
5. Lifecycle and external execution evidence are modeled separately from static object equality.

See `docs/research/M1_COMPLETION_REPORT.md`.

## M2 result locked

Core pipeline:

`ProtocolObject → BindingEdge → InvariantDefinition → EvidenceItem → EvaluationResult → Decision`

Frozen primitives:

- `ProtocolObject`
- `BindingEdge`
- `InvariantDefinition`
- `EvidenceItem`
- `EvaluationResult`
- `Decision`
- `TransactionGraph`

Core rules:

- raw source evidence is preserved;
- canonical values are derived overlays with provenance;
- protocol/provider versions are explicit;
- one transaction is represented as an evidence-backed object graph, not a forced universal ID;
- ambiguous/unsupported mappings produce `UNKNOWN`;
- core contains no UCP/AP2-specific business fields;
- evaluation time is explicit for temporal checks;
- external evidence is distinguishable from protocol-native artifacts;
- deterministic PASS/WARN/BLOCK/UNKNOWN is authoritative.

Artifacts:

- `docs/product/CANONICAL_MODEL.md`
- `docs/product/BINDING_MODEL.md`
- `docs/product/EVIDENCE_MODEL.md`
- `docs/product/DECISION_MODEL.md`
- `docs/product/M2_COMPLETION_REPORT.md`
- `schemas/timeproofs-core.schema.json`

M2 demonstrates PASS, BLOCK, UNKNOWN, lifecycle, and future A2A/MCP representation without redesigning core schemas.

## M1 shortlist entering M3

- `TP-CX-001 PAYMENT_TOTAL_PROJECTS_AUTHORIZED_CHECKOUT`
- `TP-CX-002 PAYMENT_CURRENCY_PROJECTS_AUTHORIZED_CHECKOUT`
- `TP-CX-003 PAYMENT_PROJECTION_REFERENCES_EXACT_AUTHORIZED_STATE`
- `TP-EV-001 EXECUTED_PAYMENT_MATCHES_APPROVED_MANDATE`
- `TP-LC-001 COMMITTED_ORDER_BINDS_ORIGINATING_CHECKOUT`
- `TP-LC-002 INVALIDATED_OR_CANCELED_STATE_NOT_COMMITTED`
- `TP-EV-002 COMPOSED_EVIDENCE_CHAIN_CLOSED`

Only TP-CX-001 and TP-CX-002 are immediate artifact-only blocking candidates. M3 owns exact version scope, source fields, pack predicates, allowed transformations and production severity.

## Work not started

- UCP/AP2 pack implementation;
- fixture corpus implementation;
- deterministic Verify engine implementation;
- UCP/AP2 adapters;
- TimeProofs CLI/SDK;
- CI integration;
- enforcement runtime;
- website relaunch;
- managed cloud.

## Immediate next task

Execute M3.

Specifically:

1. create `packs/ucp-ap2/SPEC.md`;
2. define pack ID/version and compatibility matrix;
3. freeze exact semantics for each included invariant;
4. define exact inputs/canonical fields/evidence requirements;
5. define PASS/BLOCK/UNKNOWN behavior;
6. separate immediate v0.1 production rules from deferred evidence/lifecycle rules;
7. define pack manifest schema;
8. do not modify the M2 core model unless a documented structural defect is proven.

## Mandatory reading order for a new contributor

1. `TIMEPROOFS_PRODUCT_CONSTITUTION.md`
2. `docs/startup/CURRENT_STATE.md`
3. `docs/startup/EXECUTION_PLAN.md`
4. `docs/startup/DECISION_LOG.md`
5. `TIMEPROOFS_MASTER_CONTEXT.md`
6. `docs/research/M1_COMPLETION_REPORT.md`
7. `docs/product/M2_COMPLETION_REPORT.md`
8. `docs/product/CANONICAL_MODEL.md`
9. `docs/product/BINDING_MODEL.md`
10. `docs/product/EVIDENCE_MODEL.md`
11. `docs/product/DECISION_MODEL.md`
12. `docs/startup/STARTUP_OPERATING_SYSTEM.md`
13. `docs/startup/BENCHMARK_POLICY.md`

## One-line status

> Product thesis frozen; M1 and M2 complete; M3 UCP/AP2 Invariant Pack specification is now active; engine implementation has not started.
