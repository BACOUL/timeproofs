# TimeProofs — Canonical Execution Plan

Status: ACTIVE
Branch: `relaunch/invariant-engine`

This file defines implementation order. Do not skip ahead unless prior exit criteria are met or a founder decision explicitly changes sequence.

## Current state

Completed:
- M0 product constitution / operating system;
- M1 UCP/AP2 normative audit;
- M2 canonical transaction model;
- M2.1 foundation hardening;
- M3 UCP/AP2 Invariant Pack v0.1;
- M4 fixture/regression contract;
- M5 deterministic Verify engine;
- M6 real adapters + SDK/CLI;
- M7 customer CI + package contract;
- pre-M8 World-Class Readiness Gate;
- company completeness / anti-omission operating architecture;
- **M8 local-first runtime enforcement**.

Current active milestone: **M8.1 — authorized AP2 mandate ↔ executed PSP/provider evidence**.

## M0–M7
**Status: COMPLETE**

## World-Class Gate
**Status: COMPLETE / GREEN**

## Company Architecture / Anti-Omission Layer
**Status: COMPLETE AT DESIGN LEVEL — REAL-WORLD PROOF STILL REQUIRED WHERE APPLICABLE**

Canonical lifecycle register: `docs/startup/COMPANY_GAP_REGISTER.md`.

## M8 — Local-first runtime enforcement
**Status: COMPLETE**

Goal delivered: deterministic cross-protocol evaluation immediately before a consequential caller-owned commit with a pinned enforcement policy.

Frozen default:
- PASS → ALLOW
- WARN → ALLOW
- BLOCK → DENY
- UNKNOWN → DENY
- runtime error → ERROR, never silent ALLOW

Delivered:
- enforcement schema;
- pure policy evaluator;
- SDK `enforceTransaction()`;
- explicit/auditable fail-open rules;
- hostile/malformed policy rejection;
- normalized policy snapshot;
- package clean-room VERIFY+ENFORCE behavior;
- SDK-first runtime surface decision;
- rollback/migration/runtime-evidence contract;
- VERIFY-vs-ENFORCE benchmark.

Executable proof:
- Core Regression run `31649700249` — Ubuntu/macOS/Windows × Node 22/24 — 6/6 SUCCESS;
- Performance run `31649724012` — SUCCESS;
- representative 1,000-line-item paired p95: VERIFY 2.689 ms, ENFORCE 2.819 ms, overhead 0.129 ms against 5 ms guard.

Canonical report: `docs/product/M8_COMPLETION_REPORT.md`.
Operational contract: `docs/product/M8_RUNTIME_OPERATIONS.md`.

## M8.1 — Authorized ↔ executed provider evidence
**Status: ACTIVE / NEXT BUILD**

### Strategic goal
Cross the first independent-system boundary:

**AP2 approved PaymentMandate ↔ actual PSP/provider execution outcome.**

This is the first important step from pre-commit integrity into post-execution truth and provider-specific moat accumulation.

### Required design before code
1. choose the first provider based on evidence quality, integration simplicity, demand/distribution potential and solo-founder maintainability;
2. identify authoritative provider objects/events for successful, failed, pending, reversed and ambiguous execution;
3. define canonical ExecutedPayment/ProviderOutcome evidence object without coupling core to one PSP;
4. specify exact amount/currency/payee/reference/authorization relationships that may become PASS/BLOCK/UNKNOWN;
5. distinguish provider response, durable provider state and settlement truth;
6. define retry/outcome semantics conservatively;
7. document unsupported transformations such as partial capture, FX, tips, incremental authorization and split settlement;
8. produce normative/provider references and fixtures before any BLOCK-capable invariant;
9. preserve provider/version provenance and evidence timestamps;
10. define which evidence can later support RESOLVE.

### First candidate invariant
`TP-EV-001 EXECUTED_PAYMENT_MATCHES_APPROVED_MANDATE`

It MUST NOT PASS from an AP2 PaymentReceipt alone. Provider/network evidence is required. Missing or insufficient execution evidence returns UNKNOWN.

### M8.1 exit criteria
- first provider profile explicitly selected and version-scoped;
- provider evidence adapter implemented;
- canonical provider outcome/evidence semantics frozen;
- PASS/BLOCK/UNKNOWN fixture corpus;
- approved amount/currency/state binding verified against actual provider evidence;
- ambiguous/pending outcome remains UNKNOWN;
- retries are not authorized from UNKNOWN merely because an API call timed out;
- tests and package integration green;
- provider-specific assumptions documented;
- no claim of universal PSP support.

## M8.2 — Outcome resolution primitive
**Status: NOT STARTED**

After M8.1 establishes authoritative provider evidence semantics, implement the first constrained RESOLVE path:

`Did this side effect actually happen?`

Target states may include COMMITTED / NOT_COMMITTED / UNKNOWN, but exact state machine is frozen only after M8.1 research.

Governing rule:
> **Never retry an unknown side effect. Resolve it first.**

## M9 — Public relaunch website + world-class docs
**Status: NOT STARTED / AFTER DIFFERENTIATING PROVIDER BOUNDARY**

Canonical vision: `docs/product/M9_WEBSITE_DOCS_VISION.md`.

M9 is intentionally not allowed to consume the majority of effort before the first provider execution boundary exists. Public presentation must show the differentiated TimeProofs thesis, not merely UCP/AP2 field verification.

Before relaunch:
- archive/remove/redirect AgentReady public surfaces;
- freeze package name/registry path;
- finalize support/deprecation/open-commercial boundary;
- complete IP/name/license checks;
- final website/docs benchmark and design spec;
- release provenance controls if publishing.

## PAID Production Gate
Before charging managed production customers:
- authoritative metering/billing ledger;
- spend/abuse controls;
- legal/liability/DPA/trust package;
- incident/support process;
- tax/invoice/payment-provider workflow;
- hosted customer-data lifecycle where applicable.

## ENTERPRISE Gate
Before high-ACV deployments:
- repeatable security/procurement response;
- justified SSO/RBAC/audit/PO/private deployment options;
- SLA/support economics;
- continuity/escalation runbooks.

## RELEASE Gate
For first real production package:
- final package ownership;
- Trusted Publishing/OIDC;
- provenance;
- exact-artifact SBOM/attestation;
- immutable release;
- clean registry installation proof.

## M10 — Managed TimeProofs Cloud
**Status: NOT STARTED / COMMERCIAL GATE REQUIRED**

No heavy cloud build before willingness-to-pay, distribution, provider demand and unit economics are materially evidenced.

## Change rule

Research may refine pack contents and implementation. Company-thesis changes require explicit founder decision and Decision Log entry. Lifecycle gap items require explicit closure/defer/out-of-scope state in `COMPANY_GAP_REGISTER.md`.
