# TimeProofs — Current State

Last updated: 2026-08-12
Branch: `relaunch/invariant-engine`

## Where the project is

**Company:** Cross-Protocol Consistency Infrastructure for agentic transactions.

**Long-term product:** Cross-Protocol Consistency & Invariant Engine.

**Initial wedge:** UCP ↔ AP2 composition consistency focused on semantic/economic cross-object consistency and evidence closure rather than generic protocol conformance.

**Current milestone:** M7 COMPLETE. World-Class Gate pre-M8 closure ACTIVE. M8 NOT STARTED.

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

## Current executable product

Implemented production path:
- `adapters/ucp/checkout.js`
- `adapters/ap2/payment-mandate.js`
- `sdk/index.js`
- `cli/timeproofs.js`
- `bin/timeproofs.js`
- `timeproofs-core/canonical.js`
- `verifyTransactionGraph()` in core
- `action.yml`
- `ci/github-action.mjs`
- `ci/safe-result.mjs`

Supported initial profiles:
- UCP `2026-04-08` Checkout (`dev.ucp.shopping.checkout`)
- AP2 PaymentMandate VCT `mandate.payment.1`

Developer flow:

`timeproofs verify --checkout checkout.json --payment-mandate payment.json --checkout-jwt '<exact-proof>'`

Machine JSON is available with `--json`.

Frozen exit semantics:
- 0 PASS/WARN
- 2 BLOCK
- 3 UNKNOWN
- 4 unsupported protocol/profile
- 1 invalid input/runtime error

## Binding behavior

Production TP-CX-003 does not PASS from transaction_id presence alone.

For the supported SHA-256 binding profile, TimeProofs hashes the exact supplied checkout proof/JWT and compares it with AP2 `transaction_id`.

- verified hash → PASS prerequisite
- mismatch → BLOCK
- no checkout proof/JWT → UNKNOWN / INTEGRITY_UNVERIFIED
- unsupported binding algorithm/profile → explicit unsupported/UNKNOWN behavior

Full SD-JWT/key/signature verification is not claimed.

## M7 customer-facing contract

M7 adds:
- root GitHub Action;
- versioned public result contract;
- CI-safe redacted result profile;
- PASS/BLOCK/UNKNOWN customer integration behavior;
- bounded CI inputs and output/input alias protection;
- TimeProofs package build by explicit allowlist;
- clean-room pack/install/SDK/CLI test;
- explicit legacy AgentReady inventory.

See `docs/product/M7_COMPLETION_REPORT.md`.

## Validation proof

### Cross-platform core/SDK/CLI/security matrix

Workflow: `TimeProofs Core Regression`

Successful baseline run:
- run id `31591704219`
- head `ad48374959a6ddf72b2116a4fe057ceb0aa1fca5`
- conclusion `success`

Green environments:
- Ubuntu Node 22/24
- macOS Node 22/24
- Windows Node 22/24

### Generated property regression

The full test contract now also includes 250 deterministic generated transaction families covering:
- exact projection PASS;
- amount mutation BLOCK;
- currency mutation BLOCK;
- binding mutation BLOCK;
- absent-proof UNKNOWN;
- fixed-input replay determinism.

Verified successful run:
- run id `31618680408`
- head `175f92213ca722d873437749d1b911664142e663`
- conclusion `success`.

### Customer Action

Successful run:
- run id `31591960176`
- head `93c24e72611b2bfe2f95ffaa89c406e88c017b40`
- conclusion `success`

PASS, BLOCK and UNKNOWN customer cases are all contract-tested.

### Package clean room

Successful run:
- run id `31592422020`
- head `2ed60dd931f120ef204a058cdd84c7b28373354f`
- conclusion `success`

### CodeQL

Successful run:
- run id `31592599707`
- head `8cef869cbc895814ae6f161da691fd98337a64c4`
- conclusion `success`

### Performance baseline and guard

Historical measured baseline:
- run id `31592637945`
- p50 `3.668 ms`
- p95 `6.004 ms`
- max `6.805 ms`
- RSS `70.3 MiB`
- 1,000 line items / 50 iterations / Ubuntu / Node 22.

A provisional `100 ms` p95 algorithmic-regression ceiling is now enforced for that benchmark profile.

Verified threshold run:
- run id `31618899028`
- head `7e3cbbf948f6402bf24c8fc1791afd5393c93041`
- conclusion `success`.

See `docs/product/PERFORMANCE_AND_INPUT_PROFILE.md`.

## Protocol drift control

Current audited upstream schema snapshots are locked in `protocols/upstream-lock.json` and checked by `timeproofs-upstream-watch.yml`.

The compatibility claim is maintained in `packs/ucp-ap2/COMPATIBILITY.md`. Upstream change triggers review; it does not silently expand support.

## Security/data posture

Current local/CI surface includes:
- threat model;
- supply-chain policy;
- adversarial regression;
- deterministic generated property regression;
- strict canonicalization boundaries;
- least-privilege CI permissions;
- pinned third-party Actions;
- checkout credential non-persistence in hardened workflows;
- CI-safe result projection that excludes raw checkout proof/JWT, payment instrument, merchant authorization and raw protocol objects.

## Market/strategy audit

The 2026-08-12 market audit concludes **CONTINUE / BUILD**, with an important constraint: TimeProofs must not remain a narrow UCP↔AP2 amount/currency checker.

Current strategic expansion priority:
1. approved PaymentMandate ↔ executed PSP/network outcome;
2. checkout/payment ↔ committed order lifecycle;
3. cumulative mandate constraints ↔ prior fulfilment state;
4. cancellation/refund ↔ order/payment/provider state.

Why: these boundaries remain cross-system and can accumulate provider/evidence knowledge that a single protocol owner is less likely to absorb completely.

Primary business risk remains **willingness-to-pay evidence**, not current technical feasibility.

Canonical audit: `docs/research/MARKET_STRATEGIC_AUDIT_2026-08-12.md`.

## Known non-claims

TimeProofs does not yet claim:
- SD-JWT signature/key-binding verification;
- merchant authorization JWS verification;
- arbitrary AP2 hash-algorithm support;
- automatic compatibility with future UCP/AP2 schema versions;
- provider/network execution evidence;
- lifecycle Order enforcement;
- modeled FX/tips/incremental authorization/partial capture/split settlement/marketplace payout;
- hosted/runtime enforcement;
- release provenance for a new TimeProofs package that has not yet been published.

Missing proof remains UNKNOWN.

## World-Class Gate status

M7 is closed. Remaining pre-M8 work is now concentrated in:
- coherent human error-message review;
- final public package-name decision and one canonical install/CI path;
- safe removal/archive of legacy public AgentReady surfaces;
- M8 runtime trust-boundary + fail-open/fail-closed design before implementation.

Release-only controls such as npm OIDC/provenance, exact-release SBOM and artifact attestations are tracked separately and can only become green during a real release.

See:
- `docs/startup/WORLD_CLASS_GATE.md`
- `docs/startup/WORLD_CLASS_GATE_COMPLETION_REPORT.md`

## One-line status

> M0–M7 are complete; generated property testing, measured performance guard and 2026 market audit are now in place; TimeProofs should continue toward cross-system outcome/evidence enforcement, while final pre-M8 developer/repository/runtime-boundary items remain open.
