# TimeProofs — World-Class Readiness Gate

Status: PRE-M8 GATE COMPLETE
Applies before: M8 runtime enforcement
Last reviewed: 2026-08-12

This gate separates “feature exists” from “foundation is credible for a global infrastructure company.” The pre-M8 blocking requirements are now green with repository/external execution evidence. Release-only and public-relaunch-only controls remain mandatory at their actual lifecycle stage and are not falsely reported complete.

## A. Product truth and repository hygiene

- [x] Product constitution is canonical and separate from protocol-pack evolution.
- [x] Root README is TimeProofs-first.
- [x] Legacy AgentReady is explicitly marked non-canonical.
- [x] Legacy AgentReady GitHub Action/release workflows removed from relaunch branch.
- [x] Remaining AgentReady package/site/code assets inventoried in `docs/legacy/AGENTREADY_INVENTORY.md`.
- [x] `AI_PROJECT_ENTRYPOINT.md`, handoff and roadmap reflect the post-M7 state.

Public AgentReady site/code removal is a **pre-M9/public-relaunch** requirement, not a blocker for local M8 runtime work, because the package/release allowlist already prevents legacy inclusion.

## B. Deterministic core

- [x] No LLM is decision authority.
- [x] PASS/WARN/BLOCK/UNKNOWN semantics frozen.
- [x] Fixture-first invariant regression exists.
- [x] Fixed inputs + fixed evaluation time are deterministic.
- [x] Canonicalization rejects cycles, non-finite numbers, non-JSON values and excessive depth/node count.
- [x] Generated property regression exists beyond hand-written cases.

Property regression evidence:
- `timeproofs-core/tests/run-property-regression.mjs`;
- 250 generated transaction families per run;
- verified green in `TimeProofs Core Regression` run `31618680408`, head `175f92213ca722d873437749d1b911664142e663`.

## C. Protocol correctness

- [x] Initial UCP/AP2 profiles are explicit, not `latest`.
- [x] Unsupported versions fail explicitly.
- [x] Exact-state binding does not PASS from identifier presence alone.
- [x] Missing cryptographic/evidence proof becomes UNKNOWN.
- [x] Automated upstream schema-change watch established.
- [x] Compatibility matrix maintained per supported upstream snapshot.
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

Verified CodeQL run: `31592599707` — success.

## F. CI/runtime compatibility

- [x] Core/SDK/CLI tests exist.
- [x] Customer Action integration test exists.
- [x] Third-party Actions in hardened workflows are pinned by commit SHA.
- [x] Node 22 and Node 24 matrix configured.
- [x] Linux/macOS/Windows matrix configured.
- [x] Matrix is green.
- [x] Customer Action PASS/BLOCK/UNKNOWN cases are green.
- [x] CLI malformed/unsupported/BLOCK/UNKNOWN error contract is regression-tested across the full test matrix.

Verified matrix baseline run: `31591704219` — success.
Verified customer Action run: `31591960176` — success.
Verified expanded CLI/error full-contract run: `31619326027` — success.

## G. Supply chain and release

### Green now

- [x] Root lockfile committed.
- [x] `npm ci --ignore-scripts` used in hardened CI.
- [x] Supply-chain policy documented.
- [x] Dedicated publishable TimeProofs package separated from legacy AgentReady by allowlist.
- [x] Clean-room `npm pack` + install + SDK/CLI smoke test.
- [x] SemVer/versioning policy documented for TimeProofs path.

Verified clean-room package run: `31592422020` — success.

### Release-only — mandatory when a real new TimeProofs release is cut

- [ ] final npm package/scope ownership verified and name frozen;
- [ ] npm Trusted Publishing/OIDC configured;
- [ ] npm provenance enabled and verified on published artifact;
- [ ] SBOM generated from exact release artifact;
- [ ] GitHub artifact attestation/provenance generated for exact release artifact;
- [ ] immutable tag/release policy exercised on exact tested commit;
- [ ] registry-install smoke test against actual published package.

These are mandatory release gates, not M8-local-runtime gates.

## H. Developer experience

- [x] Local CLI exists.
- [x] JS SDK exists.
- [x] Customer GitHub Action exists.
- [x] No TimeProofs account required for local/CI use.
- [x] Clean-room package consumer flow tested from generated package artifact.
- [x] Human error/decision behavior is executable across required input, malformed JSON, unsupported profile, UNKNOWN and BLOCK cases.

One canonical public install path will be frozen after actual npm name/scope ownership is verified at release preparation. The existing clean-room package contract is sufficient for M8 local development.

## I. Performance/reliability

- [x] Baseline benchmark established.
- [x] 1,000-line-item performance workflow green.
- [x] Current input/performance profile documented in `docs/product/PERFORMANCE_AND_INPUT_PROFILE.md`.
- [x] 100 ms p95 algorithmic regression ceiling selected for the current representative profile.
- [x] New threshold verified green on GitHub.
- [x] M8 availability/fail-open/fail-closed/trust-boundary design frozen before implementation in `docs/product/M8_RUNTIME_ENFORCEMENT_DESIGN.md`.

Historical measured baseline run `31592637945`:
- p50 3.668 ms;
- p95 6.004 ms;
- max 6.805 ms;
- RSS 70.3 MiB.

Threshold enforcement run `31618899028`: success.

## J. Company/market gate

Technical readiness does not prove market success.

Canonical audit: `docs/research/MARKET_STRATEGIC_AUDIT_2026-08-12.md`.

Current conclusion:
- market direction: GREEN;
- composition-problem evidence: GREEN/AMBER;
- economic consequence: GREEN;
- current willingness-to-pay evidence: RED;
- absorption risk for narrow checks: AMBER/RED;
- long-term multi-system invariant/evidence moat: GREEN potential.

Strategic requirement: M8 and subsequent packs must move toward independent protocol/provider/system boundaries rather than make UCP↔AP2 amount/currency comparison the company boundary.

## Gate outcome

**PRE-M8 RESULT: GREEN.**

M8 runtime enforcement may begin under the frozen design in `docs/product/M8_RUNTIME_ENFORCEMENT_DESIGN.md`.

Still mandatory later:
- release provenance/supply-chain controls when publishing a real TimeProofs package;
- public AgentReady surface cleanup before M9/public relaunch;
- continued market/ICP/willingness-to-pay evidence gathering before large M10 infrastructure spend.

## Gate rule

No future milestone inherits “world-class” status automatically. Each new consequential surface adds its own measurable security, reliability, compatibility and market gates.
