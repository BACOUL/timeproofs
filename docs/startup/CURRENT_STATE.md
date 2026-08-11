# TimeProofs — Current State

Last updated: 2026-08-11
Branch: `relaunch/invariant-engine`

## Where the project is

**Company:** Cross-Protocol Consistency Infrastructure for agentic transactions.

**Long-term product:** Cross-Protocol Consistency & Invariant Engine.

**Initial wedge:** UCP ↔ AP2 composition consistency focused on semantic/economic cross-object consistency and evidence closure rather than generic protocol conformance.

**Current milestone:** M5 — Deterministic Verify Engine.

Legacy AgentReady assets remain present but non-canonical. No new TimeProofs evaluation engine code existed before M5.

## Completed milestones

- M0 — product constitution and operating system: COMPLETE
- M1 — UCP/AP2 normative composition audit: COMPLETE
- M2 — canonical transaction model: COMPLETE
- M2.1 — foundation hardening: COMPLETE
- M3 — UCP/AP2 Invariant Pack v0.1 specification: COMPLETE
- M4 — fixture corpus and regression contract: COMPLETE
- M5 — deterministic Verify Engine: ACTIVE

## Frozen core

`ProtocolObject → BindingEdge → InvariantDefinition → EvidenceItem → EvaluationResult → Decision`

Required properties include artifact digests, explicit pack/adapter/schema versions, evaluation time, provenance and structured UNKNOWN reasons. Primary verdicts remain PASS/WARN/BLOCK/UNKNOWN.

## Frozen first executable pack

1. `TP-CX-003 PAYMENT_PROJECTION_REFERENCES_EXACT_AUTHORIZED_STATE` — exact-state prerequisite.
2. `TP-CX-002 PAYMENT_CURRENCY_PROJECTS_AUTHORIZED_CHECKOUT` — BLOCK-capable.
3. `TP-CX-001 PAYMENT_TOTAL_PROJECTS_AUTHORIZED_CHECKOUT` — BLOCK-capable.

Evidence/lifecycle rules remain modeled but deferred until real provider/lifecycle profiles exist.

## M4 regression contract

Source of truth: `fixtures/ucp-ap2/v0.1/`.

Frozen cases:
- exact projection PASS;
- amount mismatch BLOCK;
- currency mismatch BLOCK;
- missing checkout UNKNOWN/MISSING_OBJECT;
- unsupported version UNKNOWN/UNSUPPORTED_VERSION;
- missing authoritative total UNKNOWN/MISSING_EVIDENCE;
- unsupported FX UNKNOWN/UNSUPPORTED_TRANSFORMATION.

Each supplied object carries a SHA-256 fixture snapshot. M5 must satisfy these expectations without weakening M3 semantics.

## Immediate next task — M5

Implement the smallest deterministic local evaluator necessary to run the M4 corpus:

1. fixture/object ingestion;
2. profile/version gate;
3. canonical extraction for UCP checkout total/currency and AP2 payment amount/currency;
4. exact-state prerequisite interface for TP-CX-003;
5. TP-CX-002 and TP-CX-001 evaluators;
6. structured UNKNOWN propagation;
7. aggregate decision ordering `BLOCK > UNKNOWN > WARN > PASS`;
8. machine-readable evaluation output;
9. regression runner over all M4 cases.

Do not add auth, billing, database, dashboard, cloud services or website work in M5.

## Legacy boundary

AgentReady-era root package/site/docs remain temporarily to avoid destructive migration before the new core is executable. They are not product truth. See `LEGACY_AGENTREADY.md`.

## Mandatory reading order

1. `TIMEPROOFS_PRODUCT_CONSTITUTION.md`
2. `docs/startup/CURRENT_STATE.md`
3. `docs/startup/EXECUTION_PLAN.md`
4. `docs/startup/DECISION_LOG.md`
5. `docs/product/M2_1_FOUNDATION_HARDENING.md`
6. `packs/ucp-ap2/M3_COMPLETION_REPORT.md`
7. `packs/ucp-ap2/SPEC.md`
8. `fixtures/ucp-ap2/v0.1/M4_COMPLETION_REPORT.md`
9. `fixtures/ucp-ap2/v0.1/README.md`
10. `docs/research/M1_COMPLETION_REPORT.md`
11. `docs/product/CANONICAL_MODEL.md`
12. `docs/product/EVIDENCE_MODEL.md`
13. `docs/product/DECISION_MODEL.md`
14. `LEGACY_AGENTREADY.md`
15. `TIMEPROOFS_MASTER_CONTEXT.md`

## One-line status

> Product thesis stable; M0–M4 plus M2.1 hardening complete; M5 deterministic Verify Engine is active.
