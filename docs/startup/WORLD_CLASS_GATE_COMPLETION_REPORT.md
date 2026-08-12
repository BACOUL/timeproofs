# TimeProofs — World-Class Gate Completion Report

Status: PRE-M8 COMPLETE / GREEN
Date: 2026-08-12
Branch: `relaunch/invariant-engine`

## Purpose

This report separates pre-M8 engineering readiness from release-time provenance, public-relaunch cleanup and future hosted/runtime obligations.

## GREEN NOW

### Product/repository boundary
- TimeProofs constitution, README, roadmap, current state and execution plan are canonical.
- AgentReady is explicitly legacy/non-canonical.
- old AgentReady Action/release workflows are removed from the relaunch branch.
- remaining AgentReady assets are inventoried.
- publishable TimeProofs package is assembled by allowlist and does not inherit legacy files accidentally.

### Deterministic verification
- no LLM is a decision authority.
- PASS/WARN/BLOCK/UNKNOWN semantics are frozen.
- fixture-first regression exists.
- generated property regression covers 250 deterministic transaction families per run.
- fixed-input replay determinism is checked.
- canonicalization rejects cycles, non-finite numbers, non-JSON values and excessive structural complexity.

Verified property/full-contract run: `31618680408` — success.

### Protocol correctness
- executable support is pinned to UCP Checkout `2026-04-08` and AP2 PaymentMandate `mandate.payment.1`.
- compatibility matrix and audited upstream blobs are explicit.
- upstream schema-change watch exists.
- exact-state binding requires explicit proof; identifier presence alone is insufficient.
- unsupported or insufficient evidence does not silently become PASS.

### Evidence/data safety
- artifact digests, pack/adapter/core versions and structured evidence exist.
- result contract is versioned.
- CI-safe output excludes raw checkout proof/JWT, payment instrument, merchant authorization and raw protocol objects.
- input size is bounded and output/input aliasing is rejected.

### Security engineering
- threat model and supply-chain policy exist.
- adversarial regression exists.
- hardened workflows use least-privilege permissions, pinned Action SHAs and non-persisted checkout credentials.
- CodeQL is configured and green.
- TimeProofs security contact/disclosure route is documented.

Verified CodeQL run: `31592599707` — success.

### Compatibility / developer contract
- core/SDK/CLI regression is green across Ubuntu/macOS/Windows × Node 22/24.
- customer Action PASS/BLOCK/UNKNOWN integration is green.
- clean-room pack/install/SDK/CLI consumer test is green.
- CLI required-input, malformed JSON, unsupported profile, UNKNOWN, BLOCK and unknown-command behavior is regression-tested.

Verified matrix baseline: `31591704219` — success.
Verified customer Action: `31591960176` — success.
Verified clean-room package: `31592422020` — success.
Verified expanded error/full-contract matrix: `31619326027` — success.

### Performance
Measured representative profile:
- 1,000 UCP line items;
- 50 verification iterations;
- GitHub-hosted Ubuntu / Node 22;
- p50 3.668 ms;
- p95 6.004 ms;
- max 6.805 ms;
- RSS 70.3 MiB.

A provisional 100 ms p95 algorithmic-regression ceiling is enforced for the same profile. It is deliberately a regression guard, not a user-facing SLA.

Verified baseline: `31592637945` — success.
Verified threshold: `31618899028` — success.

### Runtime design readiness
M8 trust boundaries and fail policy were defined before implementation in `docs/product/M8_RUNTIME_ENFORCEMENT_DESIGN.md`.

Frozen design points:
- default financially consequential policy is fail-closed for BLOCK/UNKNOWN;
- runtime error never silently turns into ALLOW;
- explicit fail-open override must be configuration- and audit-visible;
- TimeProofs returns a decision but does not execute/custody the caller's financial side effect;
- package/pack/adapter/protocol versions are pinned;
- no in-process remote pack mutation;
- initial enforcement is local-first with no mandatory TimeProofs cloud dependency.

## MARKET / STRATEGIC GATE

Canonical audit: `docs/research/MARKET_STRATEGIC_AUDIT_2026-08-12.md`.

Conclusion: **CONTINUE / BUILD**, but not as a narrow UCP↔AP2 amount/currency checker.

Strategic expansion priority:
1. approved PaymentMandate ↔ executed PSP/network outcome;
2. checkout/payment ↔ committed order lifecycle;
3. cumulative mandate constraints ↔ prior fulfilment state;
4. cancellation/refund ↔ order/payment/provider state.

Current primary business risk is willingness-to-pay evidence. The generic engine and first three checks are not the moat; the moat hypothesis is accumulated provider/protocol evidence, mappings, transformations, lifecycle semantics, compatibility history and regression knowledge.

## GREEN ONLY AT A REAL RELEASE

Mandatory when the first new TimeProofs package/release is actually published:
- final npm name/scope ownership verified;
- npm Trusted Publishing/OIDC;
- npm provenance;
- SBOM from the exact release artifact;
- GitHub artifact attestation/provenance;
- immutable version tag/release from the tested commit;
- post-publication registry install/verification.

These are not marked complete before the real artifact exists.

## REQUIRED BEFORE PUBLIC RELAUNCH / M9

- safely archive/remove/redirect legacy AgentReady public site/code surfaces;
- freeze the real registry package name and canonical public install command;
- execute release-time provenance controls if a package is published;
- replace legacy website information architecture with TimeProofs-native product/docs experience.

## VOLUNTARILY UNSUPPORTED TODAY

TimeProofs does not currently claim:
- full SD-JWT signature/key-binding verification;
- merchant authorization JWS verification;
- arbitrary AP2 hash/binding algorithms;
- automatic compatibility with future UCP/AP2 schema versions;
- payment-network/provider proof of executed amount;
- lifecycle UCP Order enforcement;
- modeled FX/tips/incremental authorization/partial capture/split settlement/marketplace payout;
- hosted enforcement or SLA;
- generic conformance scanning as the company wedge.

Unsupported or insufficiently evidenced cases remain explicit UNKNOWN/unsupported states rather than being silently accepted.

## Gate conclusion

**PRE-M8 GATE: GREEN.**

M8 local-first runtime enforcement may begin under the frozen design. This does not imply product-market fit, release provenance, public relaunch readiness or hosted-service maturity. Those remain distinct gates with distinct evidence requirements.
