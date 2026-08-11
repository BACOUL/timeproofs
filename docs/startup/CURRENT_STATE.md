# TimeProofs — Current State

Last updated: 2026-08-11
Branch: `relaunch/invariant-engine`

## Where the project is

**Company:** Cross-Protocol Consistency Infrastructure for agentic transactions.

**Long-term product:** Cross-Protocol Consistency & Invariant Engine.

**Initial wedge:** UCP ↔ AP2 composition consistency focused on semantic/economic cross-object consistency and evidence closure rather than generic protocol conformance.

**Current milestone:** M4 — Fixture corpus and regression harness.

No new TimeProofs evaluation engine has been implemented yet.

## Completed milestones

- M0 — product constitution and operating system: COMPLETE
- M1 — UCP/AP2 normative composition audit: COMPLETE
- M2 — canonical transaction model: COMPLETE
- M2.1 — foundation hardening: COMPLETE
- M3 — UCP/AP2 Invariant Pack v0.1 specification: COMPLETE
- M4 — fixture corpus/regression harness: ACTIVE

## Core model now hardened

Canonical pipeline:

`ProtocolObject → BindingEdge → InvariantDefinition → EvidenceItem → EvaluationResult → Decision`

Additional frozen structural requirements from M2.1:

- every evaluation has required `core_schema_version` and `evaluation_id`;
- pack version, adapter versions and evaluation time are explicit;
- every ProtocolObject carries an exact artifact snapshot digest and digest scope;
- empty root evaluation objects are invalid;
- primary verdicts remain PASS/WARN/BLOCK/UNKNOWN;
- UNKNOWN must carry a structured reason such as MISSING_EVIDENCE, UNSUPPORTED_VERSION, UNSUPPORTED_TRANSFORMATION or AMBIGUOUS_BINDING;
- exact evidence/provenance must permit reproducible decisions.

See `docs/product/M2_1_FOUNDATION_HARDENING.md` and `schemas/timeproofs-core.schema.json`.

## M3 pack result locked

First executable artifact profile:

1. `TP-CX-003 PAYMENT_PROJECTION_REFERENCES_EXACT_AUTHORIZED_STATE` — prerequisite using protocol-native binding semantics.
2. `TP-CX-002 PAYMENT_CURRENCY_PROJECTS_AUTHORIZED_CHECKOUT` — BLOCK-capable.
3. `TP-CX-001 PAYMENT_TOTAL_PROJECTS_AUTHORIZED_CHECKOUT` — BLOCK-capable.

Deferred until real evidence/lifecycle profiles exist:
- TP-EV-001
- TP-LC-001
- TP-LC-002
- TP-EV-002

Unsupported transformations such as FX, tips, incremental authorization, partial capture, split settlement and marketplace payout yield UNKNOWN until explicitly profiled.

## Legacy boundary

AgentReady-era code, root README/package metadata, site pages and docs remain temporarily in the branch to avoid destructive migration before the new core is executable.

They are not current product truth. See `LEGACY_AGENTREADY.md`.

## Immediate next task — M4

Create human-inspectable fixtures and machine-readable expectations before engine implementation.

Minimum corpus:

1. exact-state amount/currency PASS;
2. amount mismatch BLOCK;
3. currency mismatch BLOCK;
4. missing exact referenced checkout UNKNOWN/MISSING_OBJECT or MISSING_EVIDENCE as appropriate;
5. unsupported protocol/profile UNKNOWN/UNSUPPORTED_VERSION;
6. missing authoritative checkout total UNKNOWN/MISSING_EVIDENCE;
7. unsupported FX/transformation UNKNOWN/UNSUPPORTED_TRANSFORMATION;
8. deferred evidence/lifecycle examples proving UNKNOWN behavior;
9. expected aggregate decision for each case.

Each fixture must include source artifacts/snapshot digests, version metadata, expected canonical values, bindings, invariant outcomes and UNKNOWN reasons.

## Work not started

- deterministic Verify engine;
- UCP/AP2 adapters;
- TimeProofs CLI/SDK;
- CI integration;
- enforcement runtime;
- website relaunch;
- managed cloud.

## Mandatory reading order

1. `TIMEPROOFS_PRODUCT_CONSTITUTION.md`
2. `docs/startup/CURRENT_STATE.md`
3. `docs/startup/EXECUTION_PLAN.md`
4. `docs/startup/DECISION_LOG.md`
5. `docs/product/M2_1_FOUNDATION_HARDENING.md`
6. `packs/ucp-ap2/M3_COMPLETION_REPORT.md`
7. `packs/ucp-ap2/SPEC.md`
8. `docs/research/M1_COMPLETION_REPORT.md`
9. `docs/product/CANONICAL_MODEL.md`
10. `docs/product/EVIDENCE_MODEL.md`
11. `docs/product/DECISION_MODEL.md`
12. `LEGACY_AGENTREADY.md`
13. `TIMEPROOFS_MASTER_CONTEXT.md`
14. `docs/startup/STARTUP_OPERATING_SYSTEM.md`
15. `docs/startup/BENCHMARK_POLICY.md`

## One-line status

> Product thesis stable; M0–M3 plus M2.1 hardening complete; M4 fixtures are active; engine code has not started.
