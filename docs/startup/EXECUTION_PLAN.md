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
- M5 deterministic Verify engine;
- M6 real UCP/AP2 adapters + local SDK/CLI;
- M7 customer-facing CI integration + safe result/package contract;
- pre-M8 World-Class Readiness Gate.

Current active milestone: **M8 — local-first runtime enforcement**.

The M8 design is frozen before implementation in `docs/product/M8_RUNTIME_ENFORCEMENT_DESIGN.md`.

Legacy AgentReady assets remain temporarily but are non-canonical and excluded from the TimeProofs package. Public legacy cleanup is required before M9/public relaunch, not before local M8 implementation.

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

## M3 — UCP/AP2 Invariant Pack v0.1 specification
**Status: COMPLETE**

Initial executable profile:
- TP-CX-003 exact authorized-state prerequisite;
- TP-CX-002 currency projection, BLOCK-capable;
- TP-CX-001 amount projection, BLOCK-capable.

## M4 — Fixture corpus and regression harness
**Status: COMPLETE**

Source of truth: `fixtures/ucp-ap2/v0.1/`.

## M5 — Deterministic Verify engine
**Status: COMPLETE**

## M6 — UCP/AP2 adapters + CLI/SDK
**Status: COMPLETE**

Executable support is pinned to UCP Checkout `2026-04-08` and AP2 PaymentMandate `mandate.payment.1`. Exact-state production verification requires explicit checkout proof/JWT hash evidence and does not claim full SD-JWT/JWS/key verification.

## M7 — Customer-facing CI integration and package contract
**Status: COMPLETE**

Delivered customer GitHub Action, safe/versioned result contracts, package allowlist, clean-room packaging, multi-OS/runtime regression, CodeQL, upstream watch and safe secret handling.

See `docs/product/M7_COMPLETION_REPORT.md`.

## World-Class Gate — pre-M8
**Status: COMPLETE / GREEN**

Additional closure delivered:
- deterministic generated property regression across 250 transaction families;
- coherent CLI malformed/unsupported/BLOCK/UNKNOWN contract regression;
- documented input/performance profile;
- measured 1,000-line-item baseline;
- enforced provisional 100 ms p95 algorithmic-regression ceiling;
- market/strategy audit;
- M8 trust-boundary/fail policy design frozen before code.

Evidence includes:
- property/full test run `31618680408` — success;
- performance guard run `31618899028` — success;
- expanded CLI/error full-matrix run `31619326027` — success.

Canonical gate: `docs/startup/WORLD_CLASS_GATE.md`.
Canonical report: `docs/startup/WORLD_CLASS_GATE_COMPLETION_REPORT.md`.

Release-time npm provenance/SBOM/attestation controls remain mandatory only when a real TimeProofs release is cut. Public AgentReady site cleanup remains mandatory before M9/public relaunch.

## M8 — Local-first runtime enforcement
**Status: ACTIVE — IMPLEMENTATION NOT YET STARTED**

Canonical design: `docs/product/M8_RUNTIME_ENFORCEMENT_DESIGN.md`.

### Goal
Evaluate deterministic cross-protocol invariants immediately before a consequential caller-owned commit and apply a pinned enforcement policy.

### Frozen boundaries
- TimeProofs returns ALLOW/DENY/ERROR plus underlying PASS/WARN/BLOCK/UNKNOWN evidence;
- default financial policy is fail-closed: BLOCK and UNKNOWN deny; runtime error never silently allows;
- an explicit fail-open override may exist but must be configuration-visible and audit-visible;
- TimeProofs does not execute/custody the external payment or side effect;
- TimeProofs does not become an MCP/A2A gateway;
- no `latest` pack/version semantics;
- no runtime remote pack mutation;
- rollback is explicit version/config pinning;
- local-first, no required TimeProofs cloud dependency.

### Implementation order
1. freeze enforcement result schema;
2. implement pure enforcement policy evaluator;
3. add SDK `enforceTransaction()` on top of the existing Verify path;
4. fixtures/tests for PASS/WARN/BLOCK/UNKNOWN/error and fail-open override;
5. add CLI/Action enforcement surfaces only after local semantics are stable;
6. benchmark/adversarial/cross-platform validation;
7. update rollback/migration docs and close M8 only on green execution evidence.

### Strategic companion work
Research the next high-value pack boundary in parallel:

**AP2 approved PaymentMandate ↔ executed PSP/network outcome.**

This is strategically stronger than adding more local UCP/AP2 field checks because it crosses independent systems and begins accumulating provider-specific evidence knowledge.

## M9 — Relaunch website + world-class docs
**Status: NOT STARTED**

Before public relaunch:
- archive/remove/redirect legacy AgentReady public surfaces;
- freeze actual package name/registry install path;
- execute release provenance controls if publishing;
- design from TimeProofs-native primitives rather than generic SaaS patterns.

## M10 — Managed TimeProofs Cloud
**Status: NOT STARTED**

Build only managed surfaces with genuine operational value: managed pack updates, evidence retention, private packs, organizational controls, connectors and SLA/on-prem where justified. Do not build cloud merely because infrastructure startups usually have dashboards/APIs.

---

## Parallel company workstreams

Maintain current evidence for market/ICP/economic buyer, protocol adoption velocity, standards absorption, competitors, distribution, pricing/value metric, partnerships, security/reliability, legal/licensing, gross margin and product-design benchmarks.

Current canonical market audit: `docs/research/MARKET_STRATEGIC_AUDIT_2026-08-12.md`.

## Change rule

Research may refine pack contents and implementation. Company-thesis changes require explicit founder decision and Decision Log entry.
