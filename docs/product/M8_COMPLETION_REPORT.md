# TimeProofs — M8 Completion Report

Status: COMPLETE

## Scope delivered

M8 moves TimeProofs from advisory verification to a local-first runtime decision primitive without executing or custodying the caller's external side effect.

Delivered:
- versioned enforcement contract `timeproofs.enforcement.v0.1`;
- pure policy evaluator;
- SDK `enforceTransaction()`;
- default financial fail-closed policy;
- explicit/auditable fail-open override;
- malformed/hostile policy rejection;
- frozen enforcement envelope and normalized policy snapshot;
- package clean-room VERIFY+ENFORCE contract;
- SDK-first runtime surface decision;
- rollback/migration/runtime-evidence operational contract;
- VERIFY-vs-ENFORCE performance benchmark.

## Frozen default semantics

- PASS → ALLOW
- WARN → ALLOW
- BLOCK → DENY
- UNKNOWN → DENY
- evaluation/runtime failure → ERROR with `allowed=false`

A policy less restrictive than the default for BLOCK, UNKNOWN, or runtime errors requires an explicit non-empty `policy_id` and remains audit-visible.

## Runtime boundary

TimeProofs returns a decision. The caller retains ownership of the external commit/payment/side effect.

M8 does not claim exactly-once execution or proof that the later external action occurred.

## Surface decision

M8 is SDK-first. CLI and GitHub Action remain VERIFY/adoption surfaces. Runtime ENFORCE belongs immediately before the caller-owned commit, so adding a CLI/Action enforcement switch would not strengthen the runtime guarantee and is deferred until a concrete integration requires it.

Operational contract: `docs/product/M8_RUNTIME_OPERATIONS.md`.

## Adversarial proof

The enforcement regression includes:
- PASS/WARN/BLOCK/UNKNOWN/error;
- explicit fail-open behavior;
- malformed non-object policies;
- invalid decisions in `deny_on`;
- invalid `on_error`;
- empty policy IDs;
- rejection of unnamed policies that allow UNKNOWN/BLOCK/error;
- unexpected verification decisions;
- caller mutation of policy after evaluation;
- repeat determinism.

## Cross-platform proof

`TimeProofs Core Regression` run `31649700249` — SUCCESS.

Six jobs green:
- Ubuntu / Node 22
- Ubuntu / Node 24
- macOS / Node 22
- macOS / Node 24
- Windows / Node 22
- Windows / Node 24

The full contract includes historical fixtures, adapters/SDK/CLI, M8 enforcement, security tests, generated property tests, error contract and clean-room package installation.

## Performance proof

`TimeProofs Performance Baseline` run `31649724012` — SUCCESS.

1,000-line-item representative profile on GitHub Ubuntu / Node 22:
- VERIFY p95: 2.689 ms in the paired benchmark;
- ENFORCE p95: 2.819 ms;
- measured ENFORCE overhead p95: 0.129 ms;
- enforcement overhead guard: 5 ms.

The guard is an algorithmic regression threshold, not a commercial latency SLA.

## Rollback and evidence

M8 uses exact package/config/profile pinning. No remote `latest` mutation may change an in-process decision. Suspected bad rules are handled by stopping rollout, reverting to the previous known-good version and adding a regression before re-release.

Historical decisions are never rewritten by rollback.

## Exit criteria verdict

- fail-closed default executable/tested: GREEN
- explicit fail-open audit visibility: GREEN
- no silent UNKNOWN/error allow: GREEN
- versioned enforcement contract: GREEN
- deterministic behavior: GREEN
- hostile policy handling: GREEN
- package consumer behavior: GREEN
- cross-platform/runtime matrix: GREEN
- representative local latency: GREEN
- caller retains external side-effect ownership: GREEN

**M8 verdict: COMPLETE.**

## Next strategic milestone

The next priority is not more UCP/AP2 field checks and not a dashboard. It is the first cross-owner evidence boundary:

**M8.1 — Approved AP2 PaymentMandate ↔ executed PSP/provider outcome.**

Goal: establish deterministic provider evidence semantics for what actually happened and create the foundation for RESOLVE — `Did it happen?`.
