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
- **M8.1 — Authorized ↔ executed provider evidence: ACTIVE / FOUNDATION IMPLEMENTED**
- M9 — Public relaunch website/docs: NOT STARTED
- M10 — Managed cloud: NOT STARTED / COMMERCIAL GATE REQUIRED

## Executable product today

TimeProofs currently includes:
- deterministic canonicalization/core;
- UCP Checkout `2026-04-08` adapter;
- AP2 PaymentMandate `mandate.payment.1` adapter;
- Stripe PaymentIntent `2026-02-25.clover` evidence adapter for M8.1;
- `verifyTransaction()` SDK;
- `enforceTransaction()` SDK;
- `verifyProviderExecution()` SDK;
- CLI `timeproofs verify`;
- GitHub Action VERIFY integration;
- safe CI result projection;
- allowlisted clean-room package build;
- versioned Verify, Enforcement and Provider Evidence result contracts.

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

### M8.1 PROVIDER EVIDENCE

Initial provider profile:
- Stripe PaymentIntent;
- API profile `2026-02-25.clover`;
- provider-stored AP2 binding via `metadata.timeproofs_ap2_transaction_id`;
- invariant `TP-EV-001 EXECUTED_PAYMENT_MATCHES_APPROVED_MANDATE`.

Current output:
- PASS / BLOCK / UNKNOWN;
- execution state `EXECUTED_CONSISTENT`, `EXECUTED_INCONSISTENT`, `NOT_EXECUTED`, or `UNKNOWN`.

A webhook notification alone is not treated as sufficient PASS evidence. The initial profile evaluates a durable supplied/retrieved PaymentIntent snapshot. Provider retrieval/authentication remains caller-owned.

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

## M8.1 proof status

Canonical gate/design: `docs/product/M8_1_PROVIDER_EVIDENCE_DESIGN.md`.

Implemented foundation:
- provider-neutral `executed_payment` canonical object;
- Stripe PaymentIntent adapter;
- TP-EV-001 deterministic evaluation;
- versioned provider-evidence contract;
- eight-case PASS/BLOCK/UNKNOWN fixture corpus;
- SDK/package integration.

Still required before M8.1 is COMPLETE:
- live Stripe test-mode retrieval proof;
- webhook-trigger → retrieve → evaluate walkthrough;
- timeout/idempotency/retrieval recovery proof;
- additional malformed/adversarial provider payload tests;
- external implementer/value evidence.

Technical fixture proof must not be represented as authoritative live-provider proof.

## Business architecture baseline

Current operating hypothesis, not validated/published pricing:
- Community/local: €0
- Production: €99/month modeling baseline, 10,000 protected VERIFY/ENFORCE transactions included, then ~€0.01/protected transaction
- RESOLVE: ~€0.03–€0.10/provider-specific resolution modeling envelope
- Business: €499/month + usage baseline
- Enterprise: €15k–€25k annual minimum + usage baseline

Primary distribution baseline:
GitHub → npm → technical docs → CI/GitHub Action → protocol communities → provider/platform integrations → B2B2Developer partnerships.

## Market Proof Gate — 2026-08-13

Verdict: **CONDITIONAL GO to M8.1**.

Positive:
- real composition/runtime problems are evidenced in AP2 discussions/issues;
- agentic payment infrastructure is receiving major industry investment;
- economic failures can touch money and irreversible state;
- provider/version evidence knowledge can become cumulative.

Negative:
- authorization/binding features are actively being absorbed by AP2/FIDO and major payment players;
- direct TimeProofs willingness-to-pay is still RED;
- buy-vs-build and distribution remain AMBER;
- current moat is still weak.

No M10/cloud escalation is justified from this gate alone.

## Highest unresolved company risks

1. willingness-to-pay;
2. exact economic buyer;
3. live repeatable provider execution evidence;
4. distribution pull;
5. RESOLVE unit economics;
6. first meaningful PSP/platform partnership;
7. exact open-source/commercial split before broad public release.

Technical readiness must not be confused with product-market fit.

## Lifecycle gates

### M9/public relaunch
- demonstrate the provider boundary rather than only UCP/AP2 field checks;
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
- universal provider/network execution evidence;
- settlement or refund finality from Stripe PaymentIntent;
- authoritative cross-provider outcome resolution;
- exactly-once side-effect execution;
- hosted enforcement/SLA;
- product-market fit;
- validated willingness-to-pay or final published pricing.

Missing proof remains UNKNOWN.

## One-line status

> **M0–M8 are complete. M8.1 now has a Stripe provider-evidence foundation and conditional market GO, but remains open until live test-mode evidence and external value proof exist.**
