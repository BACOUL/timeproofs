# TimeProofs — Canonical Execution Plan

Status: ACTIVE
Branch: `relaunch/invariant-engine`

This file defines implementation order. Do not skip ahead unless prior exit criteria are met or a founder decision explicitly changes sequence.

## Current state

Completed:
- M0 product constitution/operating system;
- M1 UCP/AP2 normative audit;
- M2 canonical transaction model;
- M2.1 foundation hardening;
- M3 UCP/AP2 Invariant Pack v0.1 specification;
- M4 fixture corpus/regression contract.

Current active milestone: **M5 — Deterministic Verify Engine**.

Legacy AgentReady assets remain temporarily but are non-canonical for the relaunch.

---

## M0 — Product constitution and operating system
**Status: COMPLETE**

Freeze company thesis, product boundaries, decision process, handoff and benchmark standard.

## M1 — UCP/AP2 normative composition audit
**Status: COMPLETE**

Primary artifacts:
- `docs/research/UCP_AP2_GAP_MATRIX.md`
- `docs/research/M1_1_PAYMENT_ORDER_AUDIT.md`
- `docs/research/M1_COMPLETION_REPORT.md`

## M2 — Canonical transaction model
**Status: COMPLETE, HARDENED BY M2.1**

Frozen primitives: ProtocolObject, BindingEdge, InvariantDefinition, EvidenceItem, EvaluationResult, Decision, TransactionGraph.

## M2.1 — Foundation hardening
**Status: COMPLETE**

Added required evaluation envelope, schema/evaluation IDs, pack/adapter versions, artifact snapshot digests, structured UNKNOWN reasons and explicit AgentReady legacy boundary.

## M3 — UCP/AP2 Invariant Pack v0.1 specification
**Status: COMPLETE**

Initial artifact target:
- TP-CX-003 exact authorized-state prerequisite;
- TP-CX-002 currency projection, BLOCK-capable;
- TP-CX-001 amount projection, BLOCK-capable.

Artifacts: `packs/ucp-ap2/`.

## M4 — Fixture corpus and regression harness
**Status: COMPLETE**

Source of truth: `fixtures/ucp-ap2/v0.1/`.

Frozen cases cover:
- PASS exact projection;
- BLOCK amount mismatch;
- BLOCK currency mismatch;
- UNKNOWN missing checkout;
- UNKNOWN unsupported version;
- UNKNOWN missing authoritative total;
- UNKNOWN unsupported FX transformation.

Every case declares expected per-invariant and aggregate result before engine code. See `fixtures/ucp-ap2/v0.1/M4_COMPLETION_REPORT.md`.

## M5 — Deterministic Verify engine
**Status: ACTIVE**

### Goal
Implement the smallest deterministic evaluator that satisfies M4 without changing pack semantics.

### Initial modules
- input/fixture ingestion;
- supported-profile gate;
- canonical extraction interface;
- exact-state prerequisite evaluator;
- TP-CX-001/002 evaluator;
- structured UNKNOWN reason propagation;
- decision aggregator;
- machine-readable evaluation result;
- regression runner.

### Explicit exclusions
No auth, billing, hosted database, dashboard, cloud control plane, website relaunch or broad provider integrations.

### Exit criteria
- all M4 cases pass deterministically;
- same inputs + versions + evaluation time yield same structured result;
- UNKNOWN reasons match corpus expectations;
- BLOCK precedence is correct;
- core evaluator does not depend on LLM output;
- protocol-specific extraction is isolated from generic aggregation/evaluation contracts;
- machine output records core schema, pack, adapters and evidence identity.

## M6 — UCP/AP2 adapters + CLI/SDK
**Status: NOT STARTED**

Freeze exact machine-recognizable protocol profile identifiers and give developers a local `timeproofs verify <transaction-artifacts>` path.

## M7 — CI integration
**Status: NOT STARTED**

Stable exit codes, GitHub Action/equivalent, artifact output and reproducible local/CI behavior.

## M8 — Enforce runtime
**Status: NOT STARTED**

Pre-commit control with latency budget, fail-open/fail-closed policy, version pinning, rollback and threat model.

## M9 — Relaunch website + world-class docs
**Status: NOT STARTED**

Center UX on actual composed artifacts, invariant evidence and decisions. Benchmark global infrastructure leaders before design.

## M10 — Managed TimeProofs Cloud
**Status: NOT STARTED**

Build only managed surfaces with genuine operational value: hosted enforcement, managed pack updates, evidence retention, private packs, org controls, connectors and SLA/on-prem where justified.

---

## Parallel company workstreams

Maintain market/ICP, competitors/standards, distribution, open-source boundary, pricing/value metric, partnerships, security/reliability, legal/licensing, finance/gross margin, product-design benchmarks and metrics. They inform milestones but do not silently pivot the product.

## Change rule

Research may refine pack contents and implementation. Company-thesis changes require explicit founder decision and Decision Log entry.
