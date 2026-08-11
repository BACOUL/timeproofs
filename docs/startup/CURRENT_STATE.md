# TimeProofs — Current State

Last updated: 2026-08-11
Branch: `relaunch/invariant-engine`

## Where the project is

TimeProofs product direction is frozen at the constitutional level.

**Company:** Cross-Protocol Consistency Infrastructure for agentic transactions.

**Long-term product:** Cross-Protocol Consistency & Invariant Engine.

**Initial wedge:** UCP ↔ AP2 composition consistency, focused on cross-object semantic/economic consistency and evidence closure rather than generic protocol conformance.

**Current milestone:** M4 — Fixture corpus and regression harness.

No new TimeProofs evaluation engine has been implemented yet. Legacy AgentReady code remains intact and isolated.

## Completed milestones

- M0 — product constitution and operating system: COMPLETE
- M1 — UCP/AP2 normative composition audit: COMPLETE
- M2 — canonical transaction model: COMPLETE
- M3 — UCP/AP2 Invariant Pack v0.1 specification: COMPLETE
- M4 — fixture corpus/regression harness: ACTIVE

## M2 core model locked

`ProtocolObject → BindingEdge → InvariantDefinition → EvidenceItem → EvaluationResult → Decision`

Ambiguous or unsupported evidence produces UNKNOWN. Core remains protocol-agnostic.

## M3 pack result locked

Artifacts:
- `packs/ucp-ap2/SPEC.md`
- `packs/ucp-ap2/manifest.json`
- `packs/ucp-ap2/COMPATIBILITY.md`
- `packs/ucp-ap2/M3_COMPLETION_REPORT.md`

First executable artifact profile:

1. `TP-CX-003 PAYMENT_PROJECTION_REFERENCES_EXACT_AUTHORIZED_STATE` — prerequisite preserving/establishing the exact authorized checkout relation using protocol-native binding semantics.
2. `TP-CX-002 PAYMENT_CURRENCY_PROJECTS_AUTHORIZED_CHECKOUT` — BLOCK-capable cross-object rule.
3. `TP-CX-001 PAYMENT_TOTAL_PROJECTS_AUTHORIZED_CHECKOUT` — BLOCK-capable cross-object rule.

Deferred but represented:
- `TP-EV-001 EXECUTED_PAYMENT_MATCHES_APPROVED_MANDATE` — requires provider/network evidence.
- `TP-LC-001 COMMITTED_ORDER_BINDS_ORIGINATING_CHECKOUT` — lifecycle-aware.
- `TP-LC-002 INVALIDATED_OR_CANCELED_STATE_NOT_COMMITTED` — requires freshness/source-of-truth semantics.
- `TP-EV-002 COMPOSED_EVIDENCE_CHAIN_CLOSED` — evidence completeness property.

Explicitly unsupported without future profiles: FX, tips, incremental authorization, partial capture, split settlement, marketplace payout and other transformations that would make naive equality unsafe.

## Work not started

- fixture corpus implementation (M4 now active);
- deterministic Verify engine implementation;
- UCP/AP2 adapters;
- TimeProofs CLI/SDK;
- CI integration;
- enforcement runtime;
- website relaunch;
- managed cloud.

## Immediate next task — M4

Create human-inspectable fixtures and declared expected results before engine implementation.

Minimum corpus:

1. exact-state + amount/currency PASS;
2. amount mismatch BLOCK;
3. currency mismatch BLOCK;
4. missing exact referenced checkout UNKNOWN;
5. unsupported/unknown protocol profile UNKNOWN;
6. missing authoritative checkout total UNKNOWN;
7. unsupported FX/transformation UNKNOWN;
8. regression expectation for each fixture containing per-invariant results and aggregate decision.

Fixtures must preserve raw-like source artifacts plus expected canonical/evidence outcomes. The future engine must satisfy fixtures; implementation must not silently weaken M3 semantics.

## Mandatory reading order for a new contributor

1. `TIMEPROOFS_PRODUCT_CONSTITUTION.md`
2. `docs/startup/CURRENT_STATE.md`
3. `docs/startup/EXECUTION_PLAN.md`
4. `docs/startup/DECISION_LOG.md`
5. `TIMEPROOFS_MASTER_CONTEXT.md`
6. `docs/research/M1_COMPLETION_REPORT.md`
7. `docs/product/M2_COMPLETION_REPORT.md`
8. `packs/ucp-ap2/M3_COMPLETION_REPORT.md`
9. `packs/ucp-ap2/SPEC.md`
10. `packs/ucp-ap2/COMPATIBILITY.md`
11. `docs/product/CANONICAL_MODEL.md`
12. `docs/product/BINDING_MODEL.md`
13. `docs/product/EVIDENCE_MODEL.md`
14. `docs/product/DECISION_MODEL.md`
15. `docs/startup/STARTUP_OPERATING_SYSTEM.md`
16. `docs/startup/BENCHMARK_POLICY.md`

## One-line status

> Product thesis frozen; M0–M3 complete; M4 fixture corpus is active; no new TimeProofs evaluation engine code has been implemented yet.
