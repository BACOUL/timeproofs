# TimeProofs — Current State

Last updated: 2026-08-13
Branch: `relaunch/invariant-engine`

## Company thesis

> **TimeProofs is the transaction integrity layer between what autonomous agents were authorized to do and what external systems actually executed.**

Strategic primitives: **VERIFY → ENFORCE → RESOLVE**.

Initial wedge: UCP ↔ AP2 composition consistency. This is a beachhead, not the permanent company boundary.

## Milestone status

- M0 — Constitution / operating system: COMPLETE
- M1 — UCP/AP2 normative audit: COMPLETE
- M2 — Canonical model: COMPLETE
- M2.1 — Foundation hardening: COMPLETE
- M3 — UCP/AP2 Invariant Pack v0.1: COMPLETE
- M4 — Fixture/regression contract: COMPLETE
- M5 — Deterministic Verify engine: COMPLETE
- M6 — Real adapters + SDK/CLI: COMPLETE
- M7 — Customer CI + package contract: COMPLETE
- Pre-M8 World-Class Gate: COMPLETE / GREEN
- Company completeness + anti-omission architecture: COMPLETE AT DESIGN LEVEL
- **M8 — Local-first runtime enforcement: COMPLETE**
- **M8.1 — Authorized ↔ executed provider evidence: ACTIVE / NEXT**
- M9 — Public relaunch website/docs: NOT STARTED
- M10 — Managed cloud: NOT STARTED / COMMERCIAL GATE REQUIRED

## Executable product today

TimeProofs currently includes:
- deterministic canonicalization/core;
- UCP Checkout `2026-04-08` adapter;
- AP2 PaymentMandate `mandate.payment.1` adapter;
- `verifyTransaction()` SDK;
- `enforceTransaction()` SDK;
- CLI `timeproofs verify`;
- GitHub Action VERIFY integration;
- safe CI result projection;
- allowlisted clean-room package build;
- versioned Verify and Enforcement result contracts.

### VERIFY
Returns PASS / WARN / BLOCK / UNKNOWN.

### ENFORCE
Default financial policy:
- PASS → ALLOW
- WARN → ALLOW
- BLOCK → DENY
- UNKNOWN → DENY
- runtime/evaluation failure → ERROR with `allowed=false`

Any policy less restrictive than the default for BLOCK, UNKNOWN or runtime error requires an explicit non-empty `policy_id` and remains audit-visible.

M8 is **SDK-first** because runtime enforcement belongs immediately before a caller-owned consequential commit. CLI/Action remain Verify/adoption surfaces unless a concrete runtime integration later justifies an enforcement wrapper.

TimeProofs does **not** execute or custody the external payment/side effect.

## M8 proof

Canonical report: `docs/product/M8_COMPLETION_REPORT.md`.
Operational contract: `docs/product/M8_RUNTIME_OPERATIONS.md`.
Design: `docs/product/M8_RUNTIME_ENFORCEMENT_DESIGN.md`.

`TimeProofs Core Regression` run `31649700249`: **SUCCESS**, six jobs green:
- Ubuntu Node 22/24
- macOS Node 22/24
- Windows Node 22/24

The suite covers historical fixtures, adapters/SDK/CLI, enforcement, security, generated properties, error contract and clean-room package behavior.

`TimeProofs Performance Baseline` run `31649724012`: **SUCCESS**.
Representative 1,000-line-item paired benchmark:
- VERIFY p95 2.689 ms
- ENFORCE p95 2.819 ms
- measured ENFORCE overhead p95 0.129 ms
- overhead regression ceiling 5 ms

The performance guards are engineering regression thresholds, not customer SLAs.

## Current strategic priority — M8.1

The next important boundary is:

`APPROVED AP2 PAYMENT MANDATE ↔ ACTUAL PSP/PROVIDER EXECUTION`

This is strategically stronger than adding more narrow UCP/AP2 checks because it crosses independent system owners and begins accumulating provider-specific evidence semantics.

M8.1 must determine, conservatively and version-explicitly, what provider evidence is sufficient to say that an approved payment was:
- executed consistently;
- not executed;
- inconsistent with authorization;
- or still UNKNOWN.

Missing provider evidence remains UNKNOWN.

This work is the foundation for RESOLVE and the rule:

> **Never retry an unknown side effect. Resolve it first.**

## Business architecture baseline

Current operating hypothesis, not validated/published pricing:
- Community/local: €0
- Production: €99/month modeling baseline, 10,000 protected VERIFY/ENFORCE transactions included, then ~€0.01/protected transaction
- RESOLVE: ~€0.03–€0.10/provider-specific resolution modeling envelope
- Business: €499/month + usage baseline
- Enterprise: €15k–€25k annual minimum + usage baseline

Primary distribution baseline:
GitHub → npm → technical docs → CI/GitHub Action → protocol communities → provider/platform integrations → B2B2Developer partnerships.

## Canonical company docs

- `docs/product/PRODUCT_THESIS.md`
- `docs/startup/BUSINESS_ARCHITECTURE.md`
- `docs/startup/COMPANY_COMPLETENESS_AUDIT.md`
- `docs/startup/COMPANY_GAP_REGISTER.md`
- `docs/startup/METERING_BILLING_ARCHITECTURE.md`
- `docs/product/PACK_GOVERNANCE_AND_COMPATIBILITY.md`
- `docs/startup/INCIDENT_OBSERVABILITY_CONTINUITY.md`
- `docs/startup/PRIVACY_TRUST_ENTERPRISE_BOUNDARY.md`
- `docs/startup/PARTNERS_IP_MOAT_LOOP.md`
- `docs/product/M9_WEBSITE_DOCS_VISION.md`

## Highest unresolved company risks

1. willingness-to-pay;
2. exact economic buyer;
3. repeatable provider execution evidence pack;
4. distribution pull;
5. RESOLVE unit economics;
6. first meaningful PSP/platform partnership;
7. exact open-source/commercial split before broad public release.

Technical readiness must not be confused with product-market fit.

## Lifecycle gates

### M9/public relaunch
- remove/archive/redirect AgentReady public surfaces;
- freeze package name/registry path;
- finalize public support/deprecation/open-commercial boundary;
- finish IP/name/license checks;
- implement website/docs from the M9 design vision.

### Paid production
- implement authoritative metering/billing ledger;
- spend/abuse controls;
- legal/liability/DPA/trust package;
- incident/support workflow;
- tax/invoice/payment operations.

### Release
- Trusted Publishing/OIDC;
- provenance;
- SBOM/attestation;
- immutable release;
- clean registry install verification.

### M10/scale
No major managed-cloud spend before material commercial validation.

## Known non-claims

TimeProofs does not yet claim:
- full SD-JWT signature/key-binding verification;
- merchant authorization JWS verification;
- provider/network execution evidence;
- authoritative outcome resolution;
- exactly-once side-effect execution;
- hosted enforcement/SLA;
- product-market fit;
- validated willingness-to-pay or final published pricing.

Missing proof remains UNKNOWN.

## One-line status

> **M0–M8 are complete with executable proof. The active strategic build is M8.1: prove the authorized AP2 mandate against actual PSP/provider execution, creating the first real foundation for RESOLVE and cross-provider moat accumulation.**
