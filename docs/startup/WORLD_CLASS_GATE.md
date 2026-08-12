# TimeProofs — World-Class Readiness Gate

Status: ACTIVE
Applies before: M8 runtime enforcement

This gate separates “feature exists” from “foundation is credible for a global infrastructure company.” M8 MUST NOT begin until blocking items below are green or explicitly waived by founder decision with rationale.

## A. Product truth and repository hygiene

- [x] Product constitution is canonical and separate from protocol-pack evolution.
- [x] Root README is TimeProofs-first.
- [x] Legacy AgentReady is explicitly marked non-canonical.
- [x] Legacy AgentReady GitHub Action/release workflows removed from relaunch branch.
- [ ] Remaining AgentReady package/site/code assets inventoried for archive/removal before public TimeProofs release.
- [ ] `AI_PROJECT_ENTRYPOINT.md`, handoff and roadmap all reflect current milestone.

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
- [ ] Automated upstream schema-change watch established.
- [ ] Compatibility matrix maintained per supported upstream snapshot.

## D. Evidence and data safety

- [x] Artifact snapshot digests exist.
- [x] Adapter/pack/core versions are recorded.
- [x] Public result contract is versioned (`timeproofs.result.v0.1`).
- [x] CI-safe redaction profile exists.
- [x] CI output excludes raw protocol objects, checkout proof/JWT, payment instrument and merchant authorization material.
- [x] Output/input aliasing is rejected.
- [x] CI input size is bounded.
- [ ] Evidence-bundle signing decision deferred explicitly until needed.

## E. Security engineering

- [x] Threat model exists for local/CI surface.
- [x] Adversarial input regression exists.
- [x] GitHub token permissions are least-privilege for test workflows.
- [x] Checkout credentials are not persisted by pinned checkout action in hardened workflows.
- [ ] CodeQL/static-analysis decision and configuration reviewed.
- [ ] Responsible disclosure route aligned with active TimeProofs product.
- [ ] Security contact and response process verified before public relaunch.

## F. CI/runtime compatibility

- [x] Core/SDK/CLI tests exist.
- [x] Customer Action integration test exists.
- [x] Third-party Actions in hardened workflows are pinned by commit SHA.
- [x] Node 22 and Node 24 matrix configured.
- [x] Linux/macOS/Windows matrix configured for local product contract.
- [ ] Matrix is green on current head.
- [ ] Customer Action PASS/BLOCK/UNKNOWN cases all green on current head.

## G. Supply chain and release

- [x] Root lockfile committed.
- [x] `npm ci --ignore-scripts` used in hardened CI.
- [x] Supply-chain policy documented.
- [ ] Dedicated publishable TimeProofs package separated from legacy AgentReady.
- [ ] Clean-room `npm pack` smoke test.
- [ ] SemVer/changelog/migration policy finalized.
- [ ] npm Trusted Publishing/OIDC configured.
- [ ] npm provenance enabled.
- [ ] SBOM generated for release artifact.
- [ ] GitHub artifact attestation/provenance generated.
- [ ] Immutable tag/release policy tested.

## H. Developer experience

- [x] Local CLI exists.
- [x] JS SDK exists.
- [x] Customer GitHub Action exists.
- [x] No TimeProofs account required for local/CI use.
- [ ] Clean-repository quickstart tested by CI from only documented instructions.
- [ ] Human error messages reviewed against malformed/unsupported/UNKNOWN cases.
- [ ] Public docs contain one canonical install path and one canonical CI path.

## I. Performance/reliability

- [ ] Baseline latency/memory benchmark established for representative transaction sizes.
- [ ] Maximum supported input profile documented.
- [ ] Performance regression threshold added to release gate if justified.
- [ ] M8 availability/fail-open/fail-closed model defined before networked enforcement.

## J. Company/market gate

Technical readiness does not prove market success.

Before significant M8/M10 infrastructure spend, maintain current evidence for:
- protocol adoption velocity;
- competitor/standard absorption risk;
- first ICP and economic buyer;
- cost of cross-protocol inconsistency;
- distribution path through protocol/dev ecosystems;
- moat accumulation through packs/adapters/evidence knowledge.

## Gate rule

A check may only be marked green with repository evidence or an externally verifiable control. “Planned” is not green.
