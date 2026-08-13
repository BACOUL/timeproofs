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
**Status: ACTIVE — FOUNDATION IMPLEMENTED / LIVE PROVIDER PROOF PENDING**

### Market gate

`docs/product/M8_1_PROVIDER_EVIDENCE_DESIGN.md` records the 2026-08-13 contradictory Market Proof Gate.

Verdict: **CONDITIONAL GO to M8.1**.

This does not validate product-market fit or authorize heavy cloud spend. Direct willingness-to-pay remains unproven.

### Strategic goal

Cross the first independent-system boundary:

**AP2 approved PaymentMandate ↔ actual PSP/provider execution outcome.**

This is the first important step from pre-commit integrity into post-execution truth and provider-specific moat accumulation.

### First provider profile

Selected: **Stripe PaymentIntent**.

Pinned profile:
- provider `stripe`;
- API `2026-02-25.clover`;
- adapter `timeproofs.stripe.payment-intent@0.1.0`;
- provider-stored AP2 reference `metadata.timeproofs_ap2_transaction_id`.

A webhook may trigger evaluation but does not itself create PASS. The profile evaluates a durable PaymentIntent snapshot.

### Implemented foundation

- canonical provider-neutral `executed_payment` object;
- Stripe PaymentIntent adapter;
- `TP-EV-001 EXECUTED_PAYMENT_MATCHES_APPROVED_MANDATE`;
- SDK `verifyProviderExecution()`;
- result contract `timeproofs.provider-evidence.v0.1`;
- PASS/BLOCK/UNKNOWN execution-state model;
- eight-case fixture corpus;
- package allowlist + clean-room smoke coverage.

### Frozen initial semantics

- Stripe `succeeded` + exact bound amount/currency → PASS / `EXECUTED_CONSISTENT`;
- Stripe `succeeded` + amount/currency mismatch → BLOCK / `EXECUTED_INCONSISTENT`;
- Stripe `canceled` + zero received → PASS / `NOT_EXECUTED;
- missing binding → UNKNOWN;
- binding mismatch → BLOCK;
- `processing` / `requires_]* ` → UNKNOWN;
- manual/partial capture → UNKNOWN.

### Explicit non-scope

M8.1 v0.1 does not claim:
- settlement finality;
- refund/chargeback truth;
- network clearing;
- Connect payee identity;
- partial capture;
- incremental authorization;
- FV/tips/split settlement;
- exactly-once execution.

### Remaining exit criteria

Before M8.1 can be COMPLETE:

1. exercise real Stripe test-mode retrieval with the pinned profile;
2. prove webhook-trigger → retrieve PaymentIntent → evaluate;
3. exercise timeout/retry/idempotency recovery without assuming failure;
4. extend hostile/malformed provider evidence tests;
5. preserve provider/version provenance through package/consumer flow;
6. obtain external implementer/value evidence;
7. keep all repository regression/package tests green.

## M8.2 — Outcome resolution primitive
**Status: NOT STARTED**

After M8.1 establishes authoritative provider evidence semantics, implement the first constrained RESOLVE path:

`Did this side effect actually happen?`

Target states may include COMMITTED / NOT_COMMITTED / UNKNOWN, but exact state machine is frozen only after M8.1 live provider research.

Governing rule:
> **Never retry an unknown side effect. Resolve it first.**

## M9 — Public relaunch website + world-class docs
**Status: NOT STARTED / AFTER DIFFERENTIATING PROVIDER BOUNDARY**

Canonical vision: `docs/product/M9_WEBSITE_DOCS_VISION.md`.

M9 is intentionally not allowed to consume the majority of effort before the first provider execution boundary exists. Public presentation must show the differentiated TimeProofs thesis, not merely UCP/AP2 field verification.

Before relaunch:
- demonstrate the provider boundary with reproducible evidence;
- archive/remove/redirect AgentReady public surfaces;
- freeze package name/registry path;
- finalize support/deprecation/open-commercial boundary;
- complete IP/name/license checks;
- final website/docs benchmark and design spec;
- release provenance controls if publishing.

## PARD Production Gate
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
