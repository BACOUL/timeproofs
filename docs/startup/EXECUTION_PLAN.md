# TimeProofs — Canonical Execution Plan

Status: ACTIVE
Branch: `relaunch/invariant-engine`

This file defines the implementation order. Do not skip ahead unless the previous milestone exit criteria are met or a founder decision explicitly changes the sequence.

## Current state

Legacy AgentReady assets remain temporarily but are non-canonical for the relaunch. New TimeProofs evaluation engine code has not started.

Completed:
- M0 product constitution/operating system;
- M1 UCP/AP2 normative audit;
- M2 canonical transaction model;
- M2.1 foundation hardening;
- M3 UCP/AP2 Invariant Pack v0.1 specification.

Current active milestone: **M4 — Fixture corpus and regression harness**.

---

## M0 — Product constitution and operating system
**Status: COMPLETE**

Freeze company thesis, product boundaries, decision process, handoff and benchmark standard.

---

## M1 — UCP/AP2 normative composition audit
**Status: COMPLETE**

Primary artifacts:
- `docs/research/UCP_AP2_GAP_MATRIX.md`
- `docs/research/M1_1_PAYMENT_ORDER_AUDIT.md`
- `docs/research/M1_COMPLETION_REPORT.md`

Result: conservative seven-rule design shortlist; no dependence on protocol-local gaps already being closed by standards.

---

## M2 — Canonical transaction model
**Status: COMPLETE, HARDENED BY M2.1**

Frozen primitives:
- ProtocolObject
- BindingEdge
- InvariantDefinition
- EvidenceItem
- EvaluationResult
- Decision
- TransactionGraph

Core is graph-based, protocol-agnostic, provenance-preserving and deterministic.

---

## M2.1 — Foundation hardening
**Status: COMPLETE**

Goal: correct structural weaknesses before public fixtures/engine/API make them expensive.

Changes:
- required evaluation root envelope;
- required `core_schema_version` and `evaluation_id`;
- explicit pack/adapter versions and evaluation time;
- exact ArtifactSnapshot digest identity and digest scope;
- structured UNKNOWN reasons under the existing UNKNOWN verdict;
- stronger provenance/evidence reproducibility rules;
- explicit AgentReady legacy boundary.

Artifacts:
- `docs/product/M2_1_FOUNDATION_HARDENING.md`
- hardened `schemas/timeproofs-core.schema.json`
- updated canonical/evidence/decision docs
- `LEGACY_AGENTREADY.md`

Exit: M3 semantics remain compatible and unchanged.

---

## M3 — UCP/AP2 Invariant Pack v0.1 specification
**Status: COMPLETE**

Artifacts:
- `packs/ucp-ap2/SPEC.md`
- `packs/ucp-ap2/manifest.json`
- `packs/ucp-ap2/COMPATIBILITY.md`
- `packs/ucp-ap2/M3_COMPLETION_REPORT.md`

Initial artifact execution target:
- TP-CX-003 exact authorized-state prerequisite;
- TP-CX-002 currency projection, BLOCK-capable;
- TP-CX-001 amount projection, BLOCK-capable.

Evidence/lifecycle rules are modeled but deferred until their evidence profiles are real.

---

## M4 — Fixture corpus and regression harness
**Status: ACTIVE**

### Goal
Build the executable truth corpus before engine code.

### Minimum corpus
- exact-state amount/currency PASS;
- amount mismatch BLOCK;
- currency mismatch BLOCK;
- missing exact referenced checkout UNKNOWN;
- unsupported protocol/profile UNKNOWN;
- missing authoritative total UNKNOWN;
- unsupported FX/transformation UNKNOWN;
- evidence/lifecycle UNKNOWN examples for deferred rules.

### Every fixture must contain
- raw-like source artifacts;
- artifact snapshot digest metadata;
- protocol/profile/version metadata;
- expected canonical values;
- expected bindings;
- expected per-invariant result;
- expected UNKNOWN reason where applicable;
- expected aggregate decision.

### Exit criteria
- fixtures are source-controlled and human-inspectable;
- expectations are machine-readable;
- corpus exercises PASS/BLOCK/UNKNOWN and unsupported flows;
- future engine can run the corpus without inventing new semantics.

---

## M5 — Deterministic Verify engine
**Status: NOT STARTED**

Implement only the smallest protocol-agnostic evaluator needed to satisfy M4 fixtures: ingestion, graph, invariant evaluator, evidence collection, decision aggregation, machine result.

No auth, billing, database, dashboard or unrelated SaaS infrastructure.

---

## M6 — UCP/AP2 adapters + CLI/SDK
**Status: NOT STARTED**

Target developer workflow: `timeproofs verify <transaction-artifacts>`. First useful result should be achievable locally without account friction.

---

## M7 — CI integration
**Status: NOT STARTED**

Stable exit codes, GitHub Action/equivalent, artifact output and reproducible local/CI behavior.

---

## M8 — Enforce runtime
**Status: NOT STARTED**

Move from verification to pre-commit control with explicit latency, fail-open/fail-closed policy, version pinning, pack rollback and production threat model.

---

## M9 — Relaunch website + world-class docs
**Status: NOT STARTED**

Do not build a generic AI SaaS landing page. Center product UX on actual composed artifacts, invariant evidence and decisions. Benchmark category-leading global infrastructure products before design.

---

## M10 — Managed TimeProofs Cloud
**Status: NOT STARTED**

Only build managed features where managed operation is materially more valuable than local/CI: hosted enforcement, pack updates, evidence retention, private packs, org controls, production connectors, SLA/on-prem where justified.

---

## Parallel company workstreams

Maintain explicit work on market/ICP, competitors/standards, distribution, open-source boundary, pricing/value metric, partnerships, security/reliability, legal/licensing, finance/gross margin, brand/product design benchmarks and metrics.

These workstreams inform milestones but do not silently pivot the product.

## Change rule

Research may refine pack contents and implementation. It does not silently redefine the company. Company-thesis changes require explicit founder decision and Decision Log entry.
