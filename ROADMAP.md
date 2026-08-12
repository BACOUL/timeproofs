# TimeProofs Roadmap

Canonical execution order is maintained in `docs/startup/EXECUTION_PLAN.md`.
The readiness bar before runtime enforcement is maintained in `docs/startup/WORLD_CLASS_GATE.md`.

## Product direction

TimeProofs is cross-protocol consistency infrastructure for agentic transactions.

The product expands through versioned invariant/evidence packs across protocol and business-system boundaries; it does not pivot into a scanner-score-dashboard business.

## Completed foundation

- M0 — product constitution / startup operating system
- M1 — UCP/AP2 normative audit
- M2 — canonical transaction model
- M2.1 — provenance/evidence hardening
- M3 — first UCP↔AP2 Invariant Pack specification
- M4 — fixture-first regression contract
- M5 — deterministic Verify engine
- M6 — real UCP/AP2 adapters + local SDK/CLI
- M7 — customer GitHub Action + safe result/package contract

M7 completion is evidenced in `docs/product/M7_COMPLETION_REPORT.md`.

## Active — World-Class Readiness Gate pre-M8 closure

Already established:
- adversarial-input safety and strict canonicalization;
- threat model and supply-chain policy;
- deterministic Linux/macOS/Windows × Node 22/24 regression;
- customer Action PASS/BLOCK/UNKNOWN integration;
- safe CI result projection;
- TimeProofs package allowlist and clean-room consumer install test;
- CodeQL;
- upstream UCP/AP2 schema lock/watch and explicit compatibility matrix;
- representative performance baseline.

Remaining before M8 unless explicitly waived:
- broader property/fuzz coverage;
- coherent human error-message review;
- final public package name and one canonical install/CI path;
- measured supported input/performance limits and performance-threshold decision;
- safe archive/removal of remaining public AgentReady surfaces.

Release-only controls such as npm Trusted Publishing/OIDC, npm provenance, exact-release SBOM/attestations and registry-install verification become mandatory when a real new TimeProofs package is published. They are not pre-M8 blockers before such a release exists.

Canonical interpretation: `docs/startup/WORLD_CLASS_GATE_COMPLETION_REPORT.md`.

## Next only after gate

### M8 — Enforce runtime

Inline/pre-commit control for consequential agentic transactions with explicit fail-open/fail-closed policy, latency budget, version pinning, rollback/emergency disable, runtime availability model and auditability.

### M9 — Relaunch website and documentation

The site must be designed from TimeProofs-native product primitives (objects, bindings, invariants, evidence, decisions), benchmarked against leading global infrastructure products rather than generated from a generic SaaS template. Legacy AgentReady public surfaces must be removed or safely redirected before relaunch.

### M10 — Managed TimeProofs Cloud

Only managed surfaces with real operational value: hosted enforcement, managed pack updates, evidence retention, private packs, organizational controls, connectors and enterprise deployment/SLA where justified.

## Parallel company validation

Technical maturity is not market proof. Before significant M8/M10 infrastructure spend, keep validating protocol adoption velocity, first ICP/economic buyer, cost of cross-protocol inconsistency, competitor/standard absorption risk, distribution path and whether Invariant Packs genuinely accumulate defensible knowledge.

## Rule

A milestone is not “world-class complete” because its happy path works. Feature completion, pre-runtime readiness and release provenance are separate gates.
