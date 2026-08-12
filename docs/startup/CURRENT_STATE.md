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

Successful run:
- run id `31591704219`
- head `ad48374959a6ddf72b2116a4fe057ceb0aa1fca5`
- conclusion `success`

Green environments:
- Ubuntu Node 22/24
- macOS Node 22/24
- Windows Node 22/24

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

### Performance baseline

Successful run:
- run id `31592637945`
- head `14e1e12fe55be71eb977188f2b967f00929ab0ae`
- conclusion `success`

Representative benchmark includes a 1,000-line-item transaction.

## Protocol drift control

Current audited upstream schema snapshots are locked in `protocols/upstream-lock.json` and checked by `timeproofs-upstream-watch.yml`.

The compatibility claim is maintained in `packs/ucp-ap2/COMPATIBILITY.md`. Upstream change triggers review; it does not silently expand support.

## Security/data posture

Current local/CI surface includes:
- threat model;
- supply-chain policy;
- adversarial regression;
- strict canonicalization boundaries;
- least-privilege CI permissions;
- pinned third-party Actions;
- checkout credential non-persistence in hardened workflows;
- CI-safe result projection that excludes raw checkout proof/JWT, payment instrument, merchant authorization and raw protocol objects.

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

M7 is closed, but M8 remains blocked until the remaining pre-M8 items are closed or explicitly waived:
- broader property/fuzz testing;
- final public install/CI UX after package naming is frozen;
- coherent human error-message review;
- measured input/performance limit documentation;
- decision on performance regression threshold;
- safe removal/archive of legacy public AgentReady surfaces.

Release-only controls such as npm OIDC/provenance, exact-release SBOM and artifact attestations are tracked separately and can only become green during a real release.

See:
- `docs/startup/WORLD_CLASS_GATE.md`
- `docs/startup/WORLD_CLASS_GATE_COMPLETION_REPORT.md`

## One-line status

> M0–M7 are complete with green real-format adapters, deterministic core, SDK/CLI, customer GitHub Action, cross-platform CI, clean-room packaging, CodeQL, upstream protocol watch and performance baseline; pre-M8 world-class closure is the active work, and M8 has not started.
