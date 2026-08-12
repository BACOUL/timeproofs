# TimeProofs — M7 Completion Report

Status: COMPLETE
Date: 2026-08-12
Branch: `relaunch/invariant-engine`

## Objective

Turn the M6 local SDK/CLI into a safe, predictable customer-facing CI/package contract without adding a hosted service, dashboard, account requirement or cloud dependency.

## Delivered

M7 now provides:

- customer-facing root GitHub Action in `action.yml`;
- hardened runner in `ci/github-action.mjs`;
- explicit CI-safe projection in `ci/safe-result.mjs`;
- public result contract `timeproofs.result.v0.1`;
- CI-safe result profile `timeproofs.ci.safe.v0.1`;
- frozen local exit semantics: 0 PASS/WARN, 2 BLOCK, 3 UNKNOWN, 4 unsupported profile, 1 invalid input/runtime error;
- PASS/BLOCK/UNKNOWN customer integration coverage;
- bounded CI input size and output/input alias protection;
- redaction boundary preventing raw checkout proof/JWT, payment instrument and merchant authorization material from being written to the normal CI result;
- third-party GitHub Actions pinned by immutable commit SHA in hardened workflows;
- Linux/macOS/Windows × Node 22/24 regression matrix;
- dedicated TimeProofs package build path under `packaging/timeproofs/`;
- package construction by allowlist rather than repository-wide inclusion;
- clean-room package smoke test that packs, installs and executes TimeProofs from a consumer directory;
- explicit AgentReady legacy inventory in `docs/legacy/AGENTREADY_INVENTORY.md`.

## Validation evidence

### Customer Action contract

Workflow: `TimeProofs Customer Action Integration`

Verified successful run:
- run id `31591960176`;
- head `93c24e72611b2bfe2f95ffaa89c406e88c017b40`;
- conclusion `success`.

The run proves:
- PASS path succeeds;
- BLOCK path deliberately fails the TimeProofs step but emits the expected decision/result contract;
- UNKNOWN path deliberately fails under fail-on-unknown policy but emits the expected decision/result contract;
- safe result does not contain the checkout proof.

### Cross-platform local contract

Workflow: `TimeProofs Core Regression`

Verified successful run:
- run id `31591704219`;
- head `ad48374959a6ddf72b2116a4fe057ceb0aa1fca5`;
- conclusion `success`.

Green jobs:
- Ubuntu / Node 22;
- Ubuntu / Node 24;
- macOS / Node 22;
- macOS / Node 24;
- Windows / Node 22;
- Windows / Node 24.

### Clean-room package contract

Workflow: `TimeProofs Core Regression`

Verified successful clean-room package run:
- run id `31592422020`;
- head `2ed60dd931f120ef204a058cdd84c7b28373354f`;
- conclusion `success`.

The package test builds the TimeProofs tarball from an explicit allowlist, installs it into a clean temporary consumer project and exercises both SDK and CLI surfaces.

## Security/reliability additions completed during M7 hardening

M7 hardening also established:

- strict canonical JSON rejection for cycles, non-finite numbers, non-JSON values and excessive depth;
- adversarial input regression suite;
- local/CI threat model;
- supply-chain policy;
- pinned CodeQL workflow;
- upstream UCP/AP2 schema lock/watch;
- representative performance baseline workflow.

These items are tracked separately by `docs/startup/WORLD_CLASS_GATE.md`; their presence does not change M7 product semantics.

## Package boundary

The repository remains a mixed historical workspace, but the release boundary is no longer mixed.

The TimeProofs package is built from a dedicated allowlist and therefore does not implicitly ship AgentReady-era code, pages, scripts or package metadata. AgentReady assets remain historical/non-canonical until archive/removal is completed safely.

## Non-claims after M7

M7 does not claim:

- npm publication of the new TimeProofs package;
- npm Trusted Publishing/OIDC or provenance;
- SBOM or GitHub artifact attestation for a published release;
- full SD-JWT/key/signature verification;
- merchant authorization JWS verification;
- arbitrary AP2 binding algorithms;
- hosted runtime enforcement;
- payment-network execution evidence;
- lifecycle Order enforcement;
- full fuzz/property-testing coverage.

## Exit decision

All M7 functional exit criteria are satisfied by repository evidence and green CI. M7 is COMPLETE.

M8 remains blocked by the World-Class Gate. Release-time controls that cannot be proven before a real publication are tracked explicitly as release-gated rather than falsely marked complete.
