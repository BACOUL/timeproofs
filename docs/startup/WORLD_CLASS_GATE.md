# TimeProofs — World-Class Readiness Gate

Status: ACTIVE — PRE-M8 CLOSURE
Applies before: M8 runtime enforcement
Last reviewed: 2026-08-12

This gate separates “feature exists” from “foundation is credible for a global infrastructure company.” M8 MUST NOT begin until blocking pre-M8 items below are green or explicitly waived by founder decision with rationale.

Release-only controls are tracked separately because they cannot honestly be green before a real release exists.

## A. Product truth and repository hygiene

- [x] Product constitution is canonical and separate from protocol-pack evolution.
- [x] Root README is TimeProofs-first.
- [x] Legacy AgentReady is explicitly marked non-canonical.
- [x] Legacy AgentReady GitHub Action/release workflows removed from relaunch branch.
- [x] Remaining AgentReady package/site/code assets inventoried in `docs/legacy/AGENTREADY_INVENTORY.md`.
- [x] `AI_PROJECT_ENTRYPOINT.md`, handoff and roadmap reflect the post-M7 pre-M8 state.
- [ ] Legacy public AgentReady site/code surfaces safely archived/removed before public TimeProofs relaunch.

## B. Deterministic core

- [x] No LLM is decision authority.
- [x] PASS/WARN/BLOCK/UNKNOWN semantics frozen.
- [x] Fixture-first invariant regression exists.
- [x] Fixed inputs + fixed evaluation time are deterministic.
- [x] Canonicalization rejects cycles, non-finite numbers, non-JSON values and excessive depth/node count.
- [ ] Property/fuzz corpus expanded beyond hand-written adversarial cases.

## C. Protocol correctness

- [x] Initial UCP/AP2 profiles are explicit, not `latest`.
- [x] Unsupported versions fail explicitly.
- [x] Exact-state binding does not PASS from identifier presence alone.
- [x] Missing cryptographic/evidence proof becomes UNKNOWN.
- [x] Automated upstream schema-change watch established.
- [x] Compatibility matrix maintained per supported upstream snapshot in `packs/ucp-ap2/COMPATIBILITY.md`.
- [x] Audited upstream schema blobs locked in `protocols/upstream-lock.json`.

## D. Evidence and data safety

- [x] Artifact snapshot digests exist.
- [x] Adapter/pack/core versions are recorded.
- [x] Public result contract is versioned (`timeproofs.result.v0.1`).
- [x] CI-safe redaction profile exists (`timeproofs.ci.safe.v0.1`).
- [x] CI output excludes raw protocol objects, checkout proof/JWT, payment instrument and merchant authorization material.
- [x] Output/input aliasing is rejected.
- [x] CI input size is bounded.
- [x] Evidence-bundle signing is explicitly deferred until a concrete consumer/use case requires it.

## E. Security engineering

- [x] Threat model exists for local/CI surface.
- [x] Adversarial input regression exists.
- [x] GitHub token permissions are least-privilege for hardened workflows.
- [x] Checkout credentials are not persisted by pinned checkout action in hardened workflows.
- [x] CodeQL/static analysis configured and verified green.
- [x] Responsible disclosure route aligned with active TimeProofs product.
- [x] Security contact/process documented in `SECURITY.md` and `.well-known/security.txt`.

Verified CodeQL run:
- run id `31592599707`;
- head `8cef869cbc895814ae6f161da691fd98337a64c4`;
- conclusion `success`.

## F. CI/runtime compatibility

- [x] Core/SDK/CLI tests exist.
- [x] Customer Action integration test exists.
- [x] Third-party Actions in hardened workflows are pinned by commit SHA.
- [x] Node 22 and Node 24 matrix configured.
- [x] Linux/macOS/Windows matrix configured for local product contract.
- [x] Matrix is green on verified multi-OS/multi-runtime run.
- [x] Customer Action PASS/BLOCK/UNKNOWN cases all green on verified run.

Verified matrix run:
- run id `31591704219`;
- head `ad48374959a6ddf72b2116a4fe057ceb0aa1fca5`;
- conclusion `success`.

Verified customer Action run:
- run id `31591960176`;
- head `93c24e72611b2bfe2f95ffaa89c406e88c017b40`;
- conclusion `success`.

## G. Supply chain and release

### Green now

- [x] Root lockfile committed.
- [x] `npm ci --ignore-scripts` used in hardened CI.
- [x] Supply-chain policy documented.
- [x] Dedicated publishable TimeProofs package separated from legacy AgentReady by allowlist.
- [x] Clean-room `npm pack` + install + SDK/CLI smoke test.
- [x] SemVer/versioning policy documented for TimeProofs path.

Verified clean-room package run:
- run id `31592422020`;
- head `2ed60dd931f120ef204a058cdd84c7b28373354f`;
- conclusion `success`.

### Release-only — mandatory when a real new TimeProofs release is cut

- [ ] npm Trusted Publishing/OIDC configured for final package name.
- [ ] npm provenance enabled and verified on published artifact.
- [ ] SBOM generated from exact release artifact.
- [ ] GitHub artifact attestation/provenance generated for exact release artifact.
- [ ] Immutable tag/release policy exercised on exact tested commit.
- [ ] Registry-install smoke test against actual published package.

These are not pre-M8 failures before a real release exists.

## H. Developer experience

- [x] Local CLI exists.
- [x] JS SDK exists.
- [x] Customer GitHub Action exists.
- [x] No TimeProofs account required for local/CI use.
- [x] Clean-room package consumer flow tested from generated package artifact.
- [ ] Human error messages reviewed as a coherent set across malformed/unsupported/UNKNOWN cases.
- [ ] Final public package name frozen.
- [ ] Public docs contain one canonical install path and one canonical CI path after package naming is frozen.

## I. Performance/reliability

- [x] Baseline benchmark established for representative transaction sizes.
- [x] Performance workflow green on representative 1,000-line-item transaction.
- [ ] Measured maximum supported input/performance profile documented for users.
- [ ] Performance regression threshold decision made and, if justified, enforced.
- [ ] M8 availability/fail-open/fail-closed model defined before networked/runtime enforcement.

Verified performance run:
- run id `31592637945`;
- head `14e1e12fe55be71eb977188f2b967f00929ab0ae`;
- conclusion `success`.

## J. Company/market gate

Technical readiness does not prove market success.

Before significant M8/M10 infrastructure spend, maintain current evidence for:
- protocol adoption velocity;
- competitor/standard absorption risk;
- first ICP and economic buyer;
- cost of cross-protocol inconsistency;
- distribution path through protocol/dev ecosystems;
- moat accumulation through packs/adapters/evidence knowledge.

## Remaining pre-M8 blockers

Unless founder-waived with explicit rationale:

1. broader property/fuzz coverage;
2. coherent human error-message review;
3. final package-name decision + canonical public install/CI path;
4. measured supported input/performance profile + performance-threshold decision;
5. safe archive/removal of legacy public AgentReady surfaces.

## Gate rule

A check may only be marked green with repository evidence or an externally verifiable control. “Planned” is not green.

Canonical status interpretation: `docs/startup/WORLD_CLASS_GATE_COMPLETION_REPORT.md`.
