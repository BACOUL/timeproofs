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
- **M8.1 — Authorized ↔ executed provider evidence: TECHNICAL PROOF COMPLETE / EXTERNAL VALUE EVIDENCE PENDING**
- M8.2 — Outcome resolution primitive: NOT STARTED
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
- Stripe test-only create/confirm/retrieve proof helpers;
- authenticated Stripe webhook trigger verification using the raw request body;
- webhook-trigger → retrieve PaymentIntent → provider-evidence evaluation orchestration;
- deterministic transport-ambiguity recovery proof helper;
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

The Stripe profile accepts `automatic` and `automatic_async` capture semantics for the current exact-payment proof. Manual/partial capture remains UNKNOWN.

A webhook notification alone is not treated as sufficient PASS evidence. The webhook surface verifies the Stripe signature against the raw request body, extracts the PaymentIntent identifier as a trigger, then retrieves durable provider state before evaluation. The webhook snapshot is explicitly not used as PASS evidence.

Repository proof helpers provide test-mode-only paths for:

`create bound PaymentIntent → confirm → deliberately ignore confirmation outcome → retrieve PaymentIntent → verifyProviderExecution()`

and:

`create bound PaymentIntent → confirm at Stripe → convert provider response into caller-visible transport-style failure → DO NOT RETRY → retrieve PaymentIntent → verifyProviderExecution()`

Safety properties:
- only `sk_test_` / `rk_test_` keys are accepted by proof write/retrieval helpers;
- any returned `livemode=true` PaymentIntent is rejected;
- create and confirm use deterministic, distinct idempotency keys derived from the AP2 transaction id;
- no Stripe key or client secret is emitted by the proof summary;
- webhook signatures require a `whsec_...` signing secret and a raw body;
- stale or invalid webhook signatures are rejected;
- non-PaymentIntent webhook events do not trigger provider retrieval;
- no retry occurs before provider-state resolution in the transport-ambiguity proof.

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
Safe execution runbook: `docs/product/M8_1_STRIPE_TEST_PROOF_RUNBOOK.md`.

Implemented foundation:
- provider-neutral `executed_payment` canonical object;
- Stripe PaymentIntent adapter;
- TP-EV-001 deterministic evaluation;
- versioned provider-evidence contract;
- PASS/BLOCK/UNKNOWN fixture corpus including observed `automatic_async` semantics;
- SDK/package integration;
- test-only Stripe retrieval helper;
- test-only Stripe create/confirm helpers with deterministic idempotency;
- response-loss recovery proof script;
- authenticated webhook trigger parser/verifier;
- webhook-trigger → provider retrieval → evaluation path;
- transport-ambiguity recovery proof script;
- live-mode refusal guards;
- adversarial webhook/retrieval/write safety tests.

A read-only observation against a real connected Stripe account exposed `capture_method=automatic_async`, which the initial fixture-only profile had not covered. No live object was modified and no live identifier is persisted as canonical fixture proof. The profile and regression corpus were corrected accordingly.

### Real Stripe test-mode provider proof — PASSED

`TimeProofs M8.1 Stripe Test Proof` run `31712667190`: **SUCCESS**.

Observed response-loss proof:
- Stripe secret passed the test-mode guard;
- created and confirmed a Stripe test PaymentIntent;
- `livemode=false`;
- provider status `succeeded`;
- observed capture method `automatic_async`;
- confirmation result was deliberately ignored by the proof flow;
- the PaymentIntent was re-retrieved by ID as durable provider evidence;
- TimeProofs returned `PASS`;
- execution state `EXECUTED_CONSISTENT`;
- invariant `TP-EV-001`;
- reason code `EXECUTED_PAYMENT_MATCHES_APPROVED_MANDATE`.

### Webhook trigger/retrieval contract — PASSED

The regression contract now verifies:
- valid Stripe HMAC signature over the raw body;
- multiple `v1` signature candidates;
- replay/timestamp tolerance;
- rejection of a re-serialized body whose bytes no longer match the signature;
- a webhook PaymentIntent snapshot deliberately containing conflicting amount/currency data is ignored as PASS evidence;
- provider truth is re-retrieved by PaymentIntent ID and evaluated instead;
- non-PaymentIntent events do not cause provider retrieval.

### Transport ambiguity recovery — PASSED

`TimeProofs M8.1 Stripe Test Proof` run `31735097007`: **SUCCESS**.

Observed transport-ambiguity proof:
- Stripe confirmation request completed against a test PaymentIntent;
- the returned provider response was consumed and deliberately converted into a caller-visible transport-style failure;
- `retry_before_resolution=false`;
- TimeProofs retrieved the known PaymentIntent by ID before any retry;
- Stripe reported `succeeded` with `automatic_async`;
- TimeProofs returned `PASS / EXECUTED_CONSISTENT` under `TP-EV-001`.

This is deterministic chaos injection around the caller/provider boundary. It proves the recovery rule under an ambiguous caller-visible outcome, but it is **not represented as a physical network outage**.

### Regression after webhook/transport additions — PASSED

`TimeProofs Core Regression` run `31735078880`: **SUCCESS**, six jobs green:
- Ubuntu Node 22/24
- macOS Node 22/24
- Windows Node 22/24

Technical M8.1 provider semantics are therefore established for the constrained Stripe profile. M8.1 remains commercially open because external implementer/value evidence has not yet been obtained.

Still required before M8.1 is declared fully COMPLETE:
- external implementer/value evidence from a team operating consequential agentic/payment flows;
- additional provider payload/edge-case coverage when real provider behavior exposes new semantics;
- a physical network/proxy failure experiment may be added later, but current documentation must not imply that the deterministic chaos proof was a literal network outage.

The successful test-mode proofs are technical provider validation, not product-market fit or willingness-to-pay validation.

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
- provider/version evidence knowledge can become cumulative;
- first real-provider observation produced a concrete compatibility correction (`automatic_async`);
- real Stripe test-mode response-loss and transport-ambiguity proofs passed end-to-end;
- webhook-trigger → authoritative retrieval semantics are now regression-tested.

Negative:
- authorization/binding features are actively being absorbed by AP2/FIDO and major payment players;
- direct TimeProofs willingness-to-pay is still RED;
- buy-vs-build and distribution remain AMBER;
- current moat is still weak until provider/lifecycle knowledge and adoption accumulate.

No M10/cloud escalation is justified from this gate alone.

## Highest unresolved company risks

1. willingness-to-pay;
2. exact economic buyer;
3. external implementer adoption/value proof;
4. repeatability across more provider/lifecycle scenarios;
5. distribution pull;
6. RESOLVE unit economics;
7. first meaningful PSP/platform partnership;
8. exact open-source/commercial split before broad public release.

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
- physical-network-failure proof from the deterministic transport-chaos test;
- hosted enforcement/SLA;
- product-market fit;
- validated willingness-to-pay or final published pricing.

Missing proof remains UNKNOWN.

## One-line status

> **M0–M8 are complete. M8.1 has established the constrained Stripe authorized→executed provider boundary with real test-mode response-loss recovery, authenticated webhook-trigger→retrieve semantics, deterministic transport-ambiguity recovery and green cross-platform regression; external implementer/value evidence remains the gate before M8.1 is fully COMPLETE.**
