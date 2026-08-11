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
- M4 fixture corpus/regression contract;
- M5 deterministic Verify engine with green GitHub Actions regression.

Current active milestone: **M6 — UCP/AP2 adapters + CLI/SDK**.

Legacy AgentReady assets remain temporarily but are non-canonical for the relaunch.

---

## M0 — Product constitution and operating system
**Status: COMPLETE**

## M1 — UCP/AP2 normative composition audit
**Status: COMPLETE**

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

Frozen cases cover PASS exact projection, BLOCK amount mismatch, BLOCK currency mismatch, UNKNOWN missing checkout, unsupported version, missing total and unsupported FX.

## M5 — Deterministic Verify engine
**Status: COMPLETE**

Implemented:
- deterministic evaluator;
- TP-CX-003/002/001 execution;
- structured UNKNOWN propagation;
- deterministic aggregation;
- full fixture regression runner;
- npm test command;
- GitHub Actions regression workflow.

Validation proof:
- workflow `TimeProofs Core Regression`;
- successful run id `31543423839`;
- Node 22;
- conclusion `success`.

See `timeproofs-core/M5_COMPLETION_REPORT.md`.

## M6 — UCP/AP2 adapters + CLI/SDK
**Status: ACTIVE**

### Goal
Turn fixture-shaped internal inputs into real, local developer ingestion for supported UCP/AP2 artifacts without moving protocol semantics into the generic core.

### Required deliverables
- adapter contract/interface;
- UCP Checkout adapter;
- AP2 PaymentMandate adapter;
- exact machine-recognizable supported profile/version policy;
- raw artifact validation/parsing;
- immutable artifact snapshot/digest generation;
- canonical field extraction with provenance;
- native binding/integrity verification interface;
- normalized transaction input builder;
- JS/TS SDK entry point;
- CLI `timeproofs verify`;
- JSON output;
- human-readable terminal output;
- typed/stable error taxonomy;
- adapter tests and end-to-end CLI tests;
- green CI for new M6 tests.

### Required developer workflow
A developer must be able to supply supported local artifacts and receive a useful result without a TimeProofs account.

Target shape (subject to M6 interface freeze):

`timeproofs verify --ucp checkout.json --ap2 payment-mandate.json --json`

### Boundaries
- M5 core aggregation/evaluation remains protocol-agnostic.
- Adapters own protocol recognition, validation, source mapping and provenance.
- Do not use research profile strings as production protocol identifiers.
- Do not claim cryptographic verification unless the adapter actually verifies the protocol-native mechanism.
- Unsupported or ambiguous profiles yield explicit unsupported/UNKNOWN behavior, never guessed parsing.

### Exit criteria
- supported real-format artifacts parse deterministically;
- unsupported profiles are rejected/UNKNOWN explicitly;
- snapshot digests are generated from declared serialization scope;
- canonical values preserve source paths/provenance;
- CLI and SDK reach the same core result;
- end-to-end PASS/BLOCK/UNKNOWN tests exist;
- local quickstart works without signup;
- all M4/M5 regressions remain green;
- M6 GitHub Actions checks are green.

## M7 — CI integration
**Status: NOT STARTED**

Stable product exit codes, GitHub Action/equivalent, artifact output and reproducible local/CI behavior. The M5 regression workflow is an internal quality gate, not yet the M7 customer-facing integration.

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
