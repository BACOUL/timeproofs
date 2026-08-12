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
- M5 deterministic Verify engine with green GitHub Actions regression;
- M6 real UCP/AP2 adapters + local SDK/CLI with green end-to-end CI.

Current active milestone: **M7 — customer-facing CI integration and package contract**.

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

## M4 — Fixture corpus and regression harness
**Status: COMPLETE**

Source of truth: `fixtures/ucp-ap2/v0.1/`.

## M5 — Deterministic Verify engine
**Status: COMPLETE**

Green executable regression proved against the frozen M4 contract. See `timeproofs-core/M5_COMPLETION_REPORT.md`.

## M6 — UCP/AP2 adapters + CLI/SDK
**Status: COMPLETE**

### Delivered
- real UCP Checkout adapter for protocol version `2026-04-08`;
- real AP2 PaymentMandate adapter for VCT `mandate.payment.1`;
- immutable canonical JSON SHA-256 snapshots;
- adapter provenance and source mappings;
- strict production TP-CX-003 binding evidence path;
- local JS SDK `verifyTransaction()`;
- CLI `timeproofs verify`;
- human and JSON output;
- explicit local exit codes;
- end-to-end adapter/SDK/CLI tests;
- full M4 + M6 GitHub Actions regression.

Validation proof:
- workflow `TimeProofs Core Regression`;
- run id `31571347893`;
- head `96ddefe88e0486b8d2be25a4a6dcae0b5bf485e4`;
- Node 22;
- conclusion `success`.

Important boundary: M6 proves exact-state equality only when explicit checkout JWT hash evidence is supplied. It does not claim full SD-JWT/JWS/key verification. See `docs/product/M6_COMPLETION_REPORT.md`.

## M7 — Customer-facing CI integration and package contract
**Status: ACTIVE**

### Goal
Make TimeProofs safe and predictable as a developer/CI dependency without adding hosted-service complexity.

### Required deliverables
- freeze public CLI syntax and compatibility policy;
- stable public result JSON contract and schema/versioning;
- customer-facing GitHub Action separate from internal regression workflow;
- Action inputs for checkout/payment/checkout-JWT evidence without credential leakage;
- Action outputs for decision/result path and safe summary;
- documented stable exit-code policy;
- redaction/secrets policy;
- generated CI artifact that excludes raw payment credentials and JWT values by default;
- package/release structure that makes TimeProofs primary and AgentReady legacy;
- install/quickstart documentation;
- example workflow;
- integration test proving PASS/BLOCK/UNKNOWN behavior;
- green Actions checks for customer-facing integration.

### Safety requirements
- do not print or upload checkout JWT/payment credential tokens by default;
- no raw secrets in GitHub step summaries;
- machine artifacts contain digests/references, not credential payloads, unless an explicit future secure evidence mode exists;
- BLOCK/UNKNOWN semantics must not change between local CLI and Action;
- unsupported profiles are explicit, never silently coerced.

### Exit criteria
- developer can add TimeProofs to a repo with a minimal workflow;
- Action and local CLI produce equivalent decisions;
- PASS/BLOCK/UNKNOWN integration cases tested;
- safe JSON artifact contract versioned;
- secret/redaction behavior tested;
- package/public naming ambiguity with AgentReady resolved for the TimeProofs path;
- all M4–M6 regressions remain green;
- M7 customer-facing Action integration is green.

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
