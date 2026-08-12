# TimeProofs — Current State

Last updated: 2026-08-12
Branch: `relaunch/invariant-engine`

## Where the project is

**Company:** Cross-Protocol Consistency Infrastructure for agentic transactions.

**Constitution-level product thesis:** `docs/product/PRODUCT_THESIS.md`.

> **TimeProofs is the transaction integrity layer between what autonomous agents were authorized to do and what external systems actually executed.**

**Strategic primitives:** VERIFY → ENFORCE → RESOLVE.

**Canonical business architecture:** `docs/startup/BUSINESS_ARCHITECTURE.md`.

**Company completeness audit:** `docs/startup/COMPANY_COMPLETENESS_AUDIT.md`.

**Initial wedge:** UCP ↔ AP2 composition consistency focused on semantic/economic cross-object consistency and evidence closure rather than generic protocol conformance.

**Current milestone:** M8 — local-first runtime enforcement: ACTIVE. Implementation has begun.

**Pre-M8 World-Class Readiness Gate:** COMPLETE / GREEN.

**Company-architecture audit:** COMPLETE. No discovered gap invalidates the project; commercial proof remains materially behind technical proof.

## Completed milestones

- M0 — product constitution and operating system: COMPLETE
- M1 — UCP/AP2 normative composition audit: COMPLETE
- M2 — canonical transaction model: COMPLETE
- M2.1 — foundation hardening: COMPLETE
- M3 — UCP/AP2 Invariant Pack v0.1 specification: COMPLETE
- M4 — fixture corpus and regression contract: COMPLETE
- M5 — deterministic Verify Engine: COMPLETE
- M6 — real UCP/AP2 adapters + local SDK/CLI: COMPLETE
- M7 — customer-facing CI integration and package contract: COMPLETE
- pre-M8 World-Class Readiness Gate: COMPLETE / GREEN
- full startup/company completeness audit: COMPLETE

## Current executable product

Implemented production path:
- deterministic core and canonicalization;
- real UCP Checkout adapter;
- real AP2 PaymentMandate adapter;
- JS SDK `verifyTransaction()`;
- JS SDK `enforceTransaction()` initial M8 implementation;
- CLI `timeproofs verify`;
- customer GitHub Action;
- safe CI result projection;
- clean-room TimeProofs package build by allowlist.

Supported initial profiles:
- UCP `2026-04-08` Checkout (`dev.ucp.shopping.checkout`)
- AP2 PaymentMandate VCT `mandate.payment.1`

Developer flow:

`timeproofs verify --checkout checkout.json --payment-mandate payment.json --checkout-jwt '<exact-proof>'`

Frozen verify exit semantics:
- 0 PASS/WARN
- 2 BLOCK
- 3 UNKNOWN
- 4 unsupported protocol/profile
- 1 invalid input/runtime error

## Binding behavior

Production TP-CX-003 does not PASS from `transaction_id` presence alone.

For the supported SHA-256 binding profile, TimeProofs hashes the exact supplied checkout proof/JWT and compares it with AP2 `transaction_id`.

- verified hash → PASS prerequisite
- mismatch → BLOCK
- no checkout proof/JWT → UNKNOWN / INTEGRITY_UNVERIFIED
- unsupported binding algorithm/profile → explicit unsupported/UNKNOWN behavior

Full SD-JWT/key/signature verification is not claimed.

## Product thesis boundary

The UCP↔AP2 pack is a beachhead, not the company boundary.

TimeProofs must evolve around cross-system transaction integrity:

1. **VERIFY** — Is it valid?
2. **ENFORCE** — Can it run?
3. **RESOLVE** — Did it happen?

The highest-priority strategic boundary is:

`AUTHORIZED REALITY ↔ EXECUTED REALITY`

Examples:
- AP2 PaymentMandate ↔ PSP/network execution;
- checkout/payment ↔ committed order;
- cumulative mandate ↔ prior fulfilments;
- cancellation/refund ↔ provider/order/settlement state.

The governing future outcome rule is:

> **Never retry an unknown side effect. Resolve it first.**

## Business architecture

TimeProofs should monetize transaction integrity rather than seats/reports.

Long-term monetization architecture:
- free/local developer adoption where it improves distribution and trust;
- usage-based production VERIFY/ENFORCE on protected consequential transactions;
- potentially higher-value RESOLVE operations where provider-specific authoritative evidence is queried;
- managed/private packs, evidence history, organizational controls, connectors and SLA for higher-value deployments.

Current candidate usage pricing envelope (HYPOTHESIS ONLY, not market validated): approximately €0.005–€0.03 per protected transaction depending on depth of protection.

Revenue arithmetic is documented only to show leverage; it is not a forecast.

The desired economic shape is infrastructure-grade gross margin with revenue increasing faster than founder time.

## Company completeness audit — critical gaps

The largest unresolved company gaps are now explicit rather than implicit:

1. **P0 — willingness-to-pay / economic buyer proof**;
2. **P1 — first provider execution boundary (approved mandate ↔ PSP/network outcome)**;
3. **P1 — exact open-source/commercial split before serious public release**;
4. **P1 — paid-production liability/legal posture**;
5. **P2 — distribution channel proof**;
6. **P2 — unit economics for RESOLVE/provider reads/storage/support**;
7. **P2 — first meaningful PSP/platform partnership proof**.

These gaps do not require a pivot today. They run in parallel with M8 and become gates before heavy M10/cloud spend.

## Validation proof

### Cross-platform/runtime baseline
Verified `TimeProofs Core Regression` run `31591704219`: Ubuntu/macOS/Windows × Node 22/24 — success.

### Generated property regression
250 deterministic generated transaction families test PASS, amount/currency/binding perturbations, missing-proof UNKNOWN and replay determinism.
Verified full run `31618680408` — success.

### Customer Action
PASS/BLOCK/UNKNOWN customer contract verified in run `31591960176` — success.

### Package clean room
Pack/install/SDK/CLI consumer flow verified in run `31592422020` — success.

M8 packaging has since been strengthened to require the enforcement module/schema and clean-room `enforceTransaction()` behavior; the latest full matrix must be green before M8 is closed.

### CodeQL
Run `31592599707` — success.

### CLI/error contract
Required input, malformed JSON, unsupported profile, UNKNOWN, BLOCK and unknown-command behavior are regression-tested in the full matrix.
Run `31619326027` — success.

### Performance
Measured 1,000-line-item / 50-iteration Ubuntu Node 22 baseline:
- p50 `3.668 ms`
- p95 `6.004 ms`
- max `6.805 ms`
- RSS `70.3 MiB`

A 100 ms p95 regression ceiling is enforced for that profile as an algorithmic guard, not an SLA.
Threshold run `31618899028` — success.

## Protocol drift control

Audited upstream schema snapshots are locked in `protocols/upstream-lock.json` and watched automatically. Changed upstream schema means review; it never silently widens compatibility.

## Security/data posture

Current local/CI surface includes:
- threat model;
- supply-chain policy;
- adversarial and generated property regressions;
- strict canonicalization boundaries;
- least-privilege CI;
- pinned third-party Actions;
- checkout credential non-persistence;
- CI-safe output excluding raw proof/JWT, payment instrument, merchant authorization and raw protocol objects.

## Market/strategy audit

Canonical audit: `docs/research/MARKET_STRATEGIC_AUDIT_2026-08-12.md`.

Conclusion: **CONTINUE / BUILD**, but TimeProofs must not remain a narrow UCP↔AP2 amount/currency checker.

Canonical thesis: `docs/product/PRODUCT_THESIS.md`.

Primary business uncertainty remains willingness-to-pay evidence. Technical readiness is materially ahead of commercial proof.

## M8 active design

Canonical design: `docs/product/M8_RUNTIME_ENFORCEMENT_DESIGN.md`.

M8 adds a local-first enforcement decision layer on top of Verify.

Frozen boundaries:
- underlying verification remains PASS/WARN/BLOCK/UNKNOWN;
- enforcement returns ALLOW/DENY/ERROR;
- financially consequential default: PASS→ALLOW, WARN→ALLOW, BLOCK→DENY, UNKNOWN→DENY;
- runtime error never silently becomes ALLOW;
- optional fail-open behavior must be explicit and audit-visible;
- TimeProofs does not execute/custody the caller's payment or other side effect;
- no generic MCP/A2A gateway scope;
- no `latest` versions or silent remote pack mutation;
- local-first, no mandatory TimeProofs cloud dependency.

Current M8 implementation includes:
- `schemas/timeproofs-enforcement.v0.1.schema.json`;
- pure enforcement policy evaluator;
- `enforceTransaction()` SDK;
- default financial fail-closed policy;
- explicit/auditable fail-open override behavior;
- M8 regression tests;
- enforcement module/schema in the public package allowlist;
- strengthened clean-room package test requiring VERIFY+ENFORCE behavior.

M8 remains ACTIVE until the strengthened full matrix, clean-room package enforcement contract and remaining runtime validation are green.

## Lifecycle-separated remaining work

### Release-time only
When publishing a real TimeProofs package: verify final npm name/scope ownership, Trusted Publishing/OIDC, provenance, exact-artifact SBOM/attestation, immutable release and registry install.

### Before M9/public relaunch
Archive/remove/redirect public AgentReady surfaces and replace legacy site architecture with a TimeProofs-native experience.

### Market/company work in parallel
Validate ICP, economic buyer, incident cost, willingness-to-pay, pricing metric, distribution and first provider/partner demand. Do not make major M10/cloud investment before the commercial validation gate in `BUSINESS_ARCHITECTURE.md` is materially satisfied.

## Known non-claims

TimeProofs does not yet claim:
- full SD-JWT signature/key-binding verification;
- merchant authorization JWS verification;
- arbitrary AP2 hash algorithms;
- automatic future-version compatibility;
- provider/network execution evidence;
- outcome resolution against authoritative PSP/network state;
- lifecycle Order enforcement;
- modeled FX/tips/incremental authorization/partial capture/split settlement/marketplace payout;
- hosted enforcement or SLA;
- product-market fit;
- validated willingness-to-pay;
- validated published pricing.

Missing proof remains UNKNOWN.

## One-line status

> M0–M7, the pre-M8 World-Class Gate and the full company-completeness audit are complete; M8 local-first enforcement remains active, while commercial proof and the first authorized↔executed provider evidence boundary are the two highest-priority company risks/opportunities in parallel.