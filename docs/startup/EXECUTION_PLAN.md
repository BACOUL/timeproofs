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
- M5 deterministic Verify engine with green executable regression;
- M6 real UCP/AP2 adapters + local SDK/CLI;
- M7 customer-facing CI integration + safe result/package contract.

Current active work: **World-Class Gate pre-M8 closure**.

M8 remains **NOT STARTED** until remaining pre-M8 gate items are green or explicitly waived by founder decision.

Legacy AgentReady assets remain temporarily but are non-canonical for the relaunch and are excluded from the dedicated TimeProofs package allowlist.

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

Initial executable artifact profile:
- TP-CX-003 exact authorized-state prerequisite;
- TP-CX-002 currency projection, BLOCK-capable;
- TP-CX-001 amount projection, BLOCK-capable.

Compatibility is maintained in `packs/ucp-ap2/COMPATIBILITY.md`.

## M4 — Fixture corpus and regression harness
**Status: COMPLETE**

Source of truth: `fixtures/ucp-ap2/v0.1/`.

## M5 — Deterministic Verify engine
**Status: COMPLETE**

Green executable regression proved against the frozen M4 contract. See `timeproofs-core/M5_COMPLETION_REPORT.md`.

## M6 — UCP/AP2 adapters + CLI/SDK
**Status: COMPLETE**

Delivered:
- real UCP Checkout adapter for protocol version `2026-04-08`;
- real AP2 PaymentMandate adapter for VCT `mandate.payment.1`;
- immutable canonical JSON SHA-256 snapshots;
- adapter provenance and source mappings;
- strict production TP-CX-003 binding evidence path;
- local JS SDK `verifyTransaction()`;
- CLI `timeproofs verify`;
- human and JSON output;
- explicit local exit codes;
- end-to-end adapter/SDK/CLI tests.

Important boundary: M6 proves exact-state equality only when explicit checkout proof/JWT hash evidence is supplied. It does not claim full SD-JWT/JWS/key verification. See `docs/product/M6_COMPLETION_REPORT.md`.

## M7 — Customer-facing CI integration and package contract
**Status: COMPLETE**

### Delivered
- root customer-facing GitHub Action;
- stable PASS/BLOCK/UNKNOWN Action behavior;
- public result schema/profile versioning;
- CI-safe redacted projection;
- bounded input size and output/input alias protection;
- hardened credential handling;
- cross-platform Node 22/24 regression matrix;
- dedicated TimeProofs package allowlist;
- clean-room pack/install/SDK/CLI smoke test;
- explicit legacy AgentReady inventory;
- updated security/supply-chain posture.

### Validation evidence

Customer Action:
- run `31591960176` — PASS/BLOCK/UNKNOWN contract green.

Cross-platform matrix:
- run `31591704219` — Ubuntu/macOS/Windows × Node 22/24 green.

Clean-room package:
- run `31592422020` — pack/install/SDK/CLI consumer test green.

See `docs/product/M7_COMPLETION_REPORT.md`.

## World-Class Gate — pre-M8 closure
**Status: ACTIVE**

This is not a new product milestone. It is the quality gate between M7 and M8.

Already green:
- product/repository boundary;
- deterministic and adversarial core testing;
- explicit compatibility matrix;
- upstream UCP/AP2 schema watch;
- CI result redaction;
- threat model and supply-chain policy;
- CodeQL with successful run `31592599707`;
- multi-OS/multi-runtime regression;
- customer PASS/BLOCK/UNKNOWN integration;
- clean-room package installation;
- performance baseline with successful run `31592637945`.

Remaining pre-M8 blockers unless explicitly waived:
1. expand property/fuzz coverage beyond hand-written adversarial cases;
2. review human malformed/unsupported/UNKNOWN error-message UX;
3. freeze one canonical public install path and one canonical CI path after package naming is final;
4. document measured maximum input/performance profile and decide whether a performance regression threshold is justified;
5. finish safe archive/removal of legacy public AgentReady surfaces before public relaunch.

Release-time controls are tracked separately because they cannot honestly be proven until a real release exists:
- npm Trusted Publishing/OIDC;
- npm provenance;
- exact-release SBOM;
- GitHub artifact attestation/provenance;
- immutable release/tag verification;
- registry-install smoke test of the published artifact.

Canonical gate report: `docs/startup/WORLD_CLASS_GATE_COMPLETION_REPORT.md`.

## M8 — Enforce runtime
**Status: NOT STARTED**

M8 may begin only after the pre-M8 gate is closed or founder-waived with rationale.

Planned scope:
- inline/pre-commit enforcement architecture;
- latency budget;
- fail-open/fail-closed policy;
- version pinning;
- rollback/emergency-disable path;
- runtime availability/SLO model;
- enforcement audit/event model.

M8 must not silently convert UNKNOWN into PASS.

## M9 — Relaunch website + world-class docs
**Status: NOT STARTED**

Center UX on actual composed artifacts, invariant evidence and decisions. Remove/redirect legacy AgentReady public surfaces before relaunch. Benchmark global infrastructure leaders before design.

## M10 — Managed TimeProofs Cloud
**Status: NOT STARTED**

Build only managed surfaces with genuine operational value: hosted enforcement, managed pack updates, evidence retention, private packs, org controls, connectors and SLA/on-prem where justified.

---

## Parallel company workstreams

Maintain current evidence for:
- market/ICP and economic buyer;
- protocol adoption velocity;
- competitors/standards absorption risk;
- distribution through protocol/dev ecosystems;
- open-source boundary;
- pricing/value metric;
- partnerships;
- security/reliability;
- legal/licensing;
- finance/gross margin;
- product-design benchmarks and metrics.

These workstreams inform milestones but do not silently pivot the product.

## Change rule

Research may refine pack contents and implementation. Company-thesis changes require explicit founder decision and Decision Log entry.
