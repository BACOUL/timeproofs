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
- pre-M8 World-Class Readiness Gate;
- full company/business architecture completeness audit.

Current active milestone: **M8 — local-first runtime enforcement**.

The M8 design is frozen in `docs/product/M8_RUNTIME_ENFORCEMENT_DESIGN.md` and implementation is underway.

Canonical business architecture: `docs/startup/BUSINESS_ARCHITECTURE.md`.
Canonical company-gap audit: `docs/startup/COMPANY_COMPLETENESS_AUDIT.md`.

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

## Company Architecture Audit
**Status: COMPLETE — COMMERCIAL PROOF STILL OPEN**

The repository now contains an explicit business architecture covering ICP/buyers, monetizable failure classes, revenue model, pricing hypotheses, unit economics, distribution, expansion/retention, moat, open-source boundary, support, liability, data ownership, partnerships, metrics, international strategy, solo-founder leverage, funding optionality and commercial kill conditions.

This audit does not mark market hypotheses as facts.

Top unresolved company risks:
1. willingness-to-pay / economic-buyer proof;
2. first approved-mandate ↔ executed-provider evidence pack;
3. exact open-source/commercial split;
4. paid-production liability/legal posture;
5. distribution proof;
6. Resolve unit economics;
7. first meaningful platform/PSP partnership.

These run in parallel with M8. Significant M10/cloud spend remains gated on real commercial evidence.

## M8 — Local-first runtime enforcement
**Status: ACTIVE — IMPLEMENTATION UNDERWAY**

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

### Implemented so far
1. enforcement result schema;
2. pure enforcement policy evaluator;
3. SDK `enforceTransaction()`;
4. PASS/WARN/BLOCK/UNKNOWN/error/fail-open regression coverage;
5. public package allowlist includes enforcement module/schema;
6. clean-room package test strengthened to require VERIFY+ENFORCE behavior;
7. core regression workflow widened to trigger on package/schema/pack changes.

### Remaining before M8 closure
- latest strengthened full matrix must complete green;
- add any missing enforcement-specific adversarial/property cases exposed by review;
- decide whether CLI/Action enforcement surface belongs in M8 or can remain SDK-first;
- measure/confirm enforcement overhead and keep within local latency budget;
- finalize rollback/migration/runtime evidence documentation;
- close M8 only on green executable proof.

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
**Status: NOT STARTED / COMMERCIAL GATE REQUIRED**

Build only managed surfaces with genuine operational value: managed pack updates, evidence retention, private packs, organizational controls, connectors and SLA/on-prem where justified. Do not build cloud merely because infrastructure startups usually have dashboards/APIs.

M10 requires meaningful progress against the commercial validation gate in `docs/startup/BUSINESS_ARCHITECTURE.md`.

---

## Parallel company workstreams

Maintain current evidence for market/ICP/economic buyer, protocol adoption velocity, standards absorption, competitors, distribution, pricing/value metric, partnerships, security/reliability, legal/licensing, gross margin and product-design benchmarks.

Canonical product thesis: `docs/product/PRODUCT_THESIS.md`.
Canonical business architecture: `docs/startup/BUSINESS_ARCHITECTURE.md`.
Canonical company audit: `docs/startup/COMPANY_COMPLETENESS_AUDIT.md`.
Canonical market audit: `docs/research/MARKET_STRATEGIC_AUDIT_2026-08-12.md`.

## Change rule

Research may refine pack contents and implementation. Company-thesis changes require explicit founder decision and Decision Log entry.