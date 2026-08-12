# TimeProofs — Current State

Last updated: 2026-08-12
Branch: `relaunch/invariant-engine`

## Where the project is

**Company:** Cross-Protocol Consistency Infrastructure for agentic transactions.

**Long-term product:** Cross-Protocol Consistency & Invariant Engine.

**Initial wedge:** UCP ↔ AP2 composition consistency focused on semantic/economic cross-object consistency and evidence closure rather than generic protocol conformance.

**Current milestone:** M8 — local-first runtime enforcement: ACTIVE. Implementation has not started yet.

**Pre-M8 World-Class Readiness Gate:** COMPLETE / GREEN.

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

## Current executable product

Implemented production path:
- deterministic core and canonicalization;
- real UCP Checkout adapter;
- real AP2 PaymentMandate adapter;
- JS SDK `verifyTransaction()`;
- CLI `timeproofs verify`;
- customer GitHub Action;
- safe CI result projection;
- clean-room TimeProofs package build by allowlist.

Supported initial profiles:
- UCP `2026-04-08` Checkout (`dev.ucp.shopping.checkout`)
- AP2 PaymentMandate VCT `mandate.payment.1`

Developer flow:

`timeproofs verify --checkout checkout.json --payment-mandate payment.json --checkout-jwt '<exact-proof>'`

Frozen exit semantics:
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

Strategic evidence-boundary priority:
1. approved PaymentMandate ↔ executed PSP/network outcome;
2. checkout/payment ↔ committed order lifecycle;
3. cumulative mandate constraints ↔ prior fulfilment state;
4. cancellation/refund ↔ order/payment/provider state.

Primary business uncertainty remains willingness-to-pay evidence. Technical readiness is materially ahead of commercial proof.

## M8 active design

Canonical design: `docs/product/M8_RUNTIME_ENFORCEMENT_DESIGN.md`.

M8 will add a local-first enforcement decision layer on top of Verify.

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

Implementation order:
1. enforcement result schema;
2. pure policy evaluator;
3. SDK `enforceTransaction()`;
4. fixtures/tests;
5. optional CLI/Action enforcement surfaces;
6. benchmark/adversarial/cross-platform validation;
7. M8 completion only with green executable proof.

## Lifecycle-separated remaining work

### Release-time only
When publishing a real TimeProofs package: verify final npm name/scope ownership, Trusted Publishing/OIDC, provenance, exact-artifact SBOM/attestation, immutable release and registry install.

### Before M9/public relaunch
Archive/remove/redirect public AgentReady surfaces and replace legacy site architecture with a TimeProofs-native experience.

### Market work in parallel
Continue gathering real ICP, incident/cost and willingness-to-pay evidence before large M10 infrastructure spend.

## Known non-claims

TimeProofs does not yet claim:
- full SD-JWT signature/key-binding verification;
- merchant authorization JWS verification;
- arbitrary AP2 hash algorithms;
- automatic future-version compatibility;
- provider/network execution evidence;
- lifecycle Order enforcement;
- modeled FX/tips/incremental authorization/partial capture/split settlement/marketplace payout;
- hosted enforcement or SLA;
- product-market fit.

Missing proof remains UNKNOWN.

## One-line status

> M0–M7 and the pre-M8 World-Class Gate are complete; M8 local-first runtime enforcement is active under a frozen fail-closed design, while the strategically important next evidence pack targets approved payment ↔ executed provider outcome and willingness-to-pay remains the primary company risk.
