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
- full company/business architecture completeness audit;
- permanent anti-omission company gap register and operating architecture.

Current active milestone: **M8 — local-first runtime enforcement**.

Canonical references:
- `docs/product/M8_RUNTIME_ENFORCEMENT_DESIGN.md`
- `docs/startup/BUSINESS_ARCHITECTURE.md`
- `docs/startup/COMPANY_GAP_REGISTER.md`
- `docs/startup/METERING_BILLING_ARCHITECTURE.md`
- `docs/product/PACK_GOVERNANCE_AND_COMPATIBILITY.md`
- `docs/startup/INCIDENT_OBSERVABILITY_CONTINUITY.md`
- `docs/startup/PRIVACY_TRUST_ENTERPRISE_BOUNDARY.md`
- `docs/startup/PARTNERS_IP_MOAT_LOOP.md`
- `docs/product/M9_WEBSITE_DOCS_VISION.md`

Legacy AgentReady assets remain temporarily but are non-canonical and excluded from the TimeProofs package. Public legacy cleanup is required before M9/public relaunch.

## M0–M7
**Status: COMPLETE**

## World-Class Gate — pre-M8
**Status: COMPLETE / GREEN**

Evidence includes property/full run `31618680408`, performance guard `31618899028`, CLI/error matrix `31619326027`, customer Action `31591960176`, CodeQL `31592599707` and package clean-room validation.

## Company Architecture / Anti-Omission Layer
**Status: COMPLETE AT DESIGN LEVEL — REAL-WORLD PROOF STILL REQUIRED WHERE APPLICABLE**

The repo now explicitly governs:
- pricing/value metric and distribution baseline;
- metering/billing semantics;
- pack trust lifecycle and compatibility/deprecation;
- incidents/observability/false-block rollback;
- business continuity;
- privacy/data lifecycle;
- abuse controls;
- enterprise procurement boundaries;
- legal/liability preparation;
- partner economics;
- IP/trademark/licensing gate;
- moat telemetry loop;
- website/docs direction.

`COMPANY_GAP_REGISTER.md` is the permanent lifecycle register. No future milestone may silently drop an item; each must be implemented, explicitly deferred to a named lifecycle gate, or deliberately unsupported.

## M8 — Local-first runtime enforcement
**Status: ACTIVE — IMPLEMENTATION UNDERWAY**

### Goal
Evaluate deterministic cross-protocol invariants immediately before a consequential caller-owned commit and apply a pinned enforcement policy.

### Frozen boundaries
- PASS/WARN/BLOCK/UNKNOWN verification;
- ALLOW/DENY/ERROR enforcement;
- default financially consequential policy: PASS→ALLOW, WARN→ALLOW, BLOCK→DENY, UNKNOWN→DENY;
- runtime error never silently ALLOWs;
- fail-open override explicit and audit-visible;
- caller owns external side effect;
- no generic MCP/A2A gateway;
- pinned versions, no silent `latest` mutation;
- local-first, no mandatory cloud dependency.

### Implemented
1. enforcement result schema;
2. pure enforcement policy evaluator;
3. SDK `enforceTransaction()`;
4. PASS/WARN/BLOCK/UNKNOWN/error/fail-open regression coverage;
5. enforcement module/schema included in public package allowlist;
6. clean-room package test requires VERIFY+ENFORCE behavior;
7. package/schema/pack changes trigger the core regression workflow;
8. strengthened full matrix run `31624413675` — Ubuntu/macOS/Windows × Node 22/24 — **6/6 success**.

### Remaining before M8 closure
- enforcement-specific hostile policy/mutation/property cases;
- explicit VERIFY-vs-ENFORCE overhead measurement;
- decide and document SDK-first vs CLI/Action enforcement surface for M8;
- bind rollback/migration/runtime evidence docs to implemented behavior;
- close M8 only on fresh green executable proof.

### M8-relevant operating gates
Before inline paid production, incident/false-block behavior, pack pinning/rollback, abuse boundaries and continuity model must match the canonical operating docs. Full billing/legal/enterprise implementation belongs to PAID/ENTERPRISE lifecycle gates, not local M8.

### Strategic companion work
Research next high-value pack boundary:

**AP2 approved PaymentMandate ↔ executed PSP/network outcome.**

This is the first major step toward RESOLVE and provider-specific moat accumulation.

## M9 — Relaunch website + world-class docs
**Status: NOT STARTED**

Canonical direction: `docs/product/M9_WEBSITE_DOCS_VISION.md`.

Before public relaunch:
- archive/remove/redirect AgentReady public surfaces;
- freeze actual package name/registry path;
- finalize public support/deprecation policy;
- freeze exact open-source/commercial split;
- complete name/IP/license checks;
- produce final M9 design spec before substantial frontend work;
- execute release provenance controls if a real package is published.

## PAID Production Gate
Before charging managed production customers:
- implement authoritative usage ledger and billing dedupe semantics;
- spend/abuse controls;
- legal/liability/DPA/trust package;
- incident/support process;
- tax/invoice/payment-provider workflow;
- customer-data lifecycle for any hosted evidence.

## ENTERPRISE Gate
Before high-ACV contractual deployments:
- procurement/security questionnaire repeatability;
- economically justified SSO/RBAC/audit/PO/private deployment options;
- SLA/support pricing that covers operational burden;
- continuity/escalation runbooks.

## RELEASE Gate
For the first real production package:
- final package ownership;
- Trusted Publishing/OIDC;
- provenance;
- exact-artifact SBOM/attestation;
- immutable release;
- clean registry installation proof.

## M10 — Managed TimeProofs Cloud
**Status: NOT STARTED / COMMERCIAL GATE REQUIRED**

Build only managed surfaces with proven operational value. No heavy cloud platform until willingness-to-pay, distribution, provider demand and unit economics are materially evidenced.

## Change rule

Research may refine pack contents and implementation. Company-thesis changes require explicit founder decision and Decision Log entry. Lifecycle gap items require explicit closure/defer/out-of-scope state in `COMPANY_GAP_REGISTER.md`.
