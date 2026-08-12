# TimeProofs — M8 Runtime Enforcement Design

Status: IMPLEMENTED / COMPLETE
Date: 2026-08-13

Completion evidence: `docs/product/M8_COMPLETION_REPORT.md`.
Runtime operations: `docs/product/M8_RUNTIME_OPERATIONS.md`.

## Goal

Move TimeProofs from advisory verification into the consequential execution path without turning TimeProofs into a payment processor, agent runtime or generic gateway.

The M8 primitive is:

> evaluate cross-protocol invariants immediately before a consequential commit and return an explicit enforcement decision under a pinned policy.

## Non-goals

M8 does NOT:
- hold customer funds;
- execute PSP/network payments itself;
- store raw payment credentials;
- become an MCP/A2A gateway;
- infer intent with an LLM;
- silently fetch/update invariant packs at runtime;
- claim exactly-once external execution;
- claim that pre-commit verification proves the provider's later executed outcome.

## Trust boundary

Caller owns the agent/application, protocol objects/evidence collection, credentials, PSP execution, external side effect and authoritative compensation/rollback.

TimeProofs owns deterministic adaptation of supported artifacts, pinned invariant/evidence semantics, the evaluation result, enforcement policy application and safe decision envelope.

## Canonical runtime API

```js
const gate = enforceTransaction({ checkout, paymentMandate, checkoutJwt })

if (!gate.allowed) return gate
await callerOwnedCommit()
```

TimeProofs does not execute `callerOwnedCommit()`.

## Enforcement states

Public enforcement state:
- ALLOW
- DENY
- ERROR

Underlying verification decision remains:
- PASS
- WARN
- BLOCK
- UNKNOWN

Default financial policy:
- PASS → ALLOW
- WARN → ALLOW
- BLOCK → DENY
- UNKNOWN → DENY
- internal/runtime error → ERROR, `allowed=false`

A policy less restrictive than this default for BLOCK, UNKNOWN or runtime error requires an explicit non-empty `policy_id`. The normalized policy is snapshotted into the result.

## Surface decision

M8 is **SDK-first**.

CLI and GitHub Action remain VERIFY/adoption surfaces. Runtime ENFORCE belongs immediately before a caller-owned consequential commit. A CLI/Action enforcement switch is deferred unless a concrete runtime integration makes it meaningful.

## Version/update policy

Every Verify/Enforce path remains version/profile explicit. M8 MUST NOT use `latest` semantics for protocol mappings or silently mutate a pack during a transaction.

Future managed pack delivery must stage, authenticate, test, explicitly activate and remain rollbackable outside the transaction path.

## Rollback

Initial rollback is exact package/config/profile pinning. A bad version is reverted to the previous known-good version; historical decisions are not rewritten. Suspected false-block bugs require a regression before re-release.

## Latency

M8 remains local-first with no required TimeProofs network dependency.

Measured representative paired benchmark on GitHub Ubuntu / Node 22, 1,000 line items:
- VERIFY p95: 2.689 ms
- ENFORCE p95: 2.819 ms
- measured ENFORCE overhead p95: 0.129 ms
- overhead engineering guard: 5 ms

These are regression measurements, not customer SLAs. Network/provider evidence will be benchmarked separately.

## Security/data

- no raw payment credentials in normal safe artifacts;
- no checkout proof/JWT in CI-safe projection;
- local evidence remains process-local unless caller stores it;
- no required telemetry;
- malformed/hostile enforcement policies are rejected;
- no silent fail-open fallback.

## Audit envelope

Enforcement output exposes at minimum:
- enforcement contract version;
- ALLOW/DENY/ERROR and allowed boolean;
- underlying verification decision;
- stable reason code;
- normalized policy;
- underlying verification evidence/metadata.

## Implementation proof

`TimeProofs Core Regression` run `31649700249` passed on Ubuntu/macOS/Windows × Node 22/24.

Coverage includes PASS/WARN/BLOCK/UNKNOWN/error, explicit fail-open, malformed policies, unnamed unsafe policies, mutation resistance for normalized policy metadata, deterministic repeat behavior, security/property suites and clean-room package installation.

Performance run `31649724012` passed the Verify-vs-Enforce overhead guard.

## Exit verdict

All M8 exit criteria are GREEN.

**M8 is COMPLETE.**

## Strategic next step

M8 proves whether an action may run based on available authorized-state evidence. It does not prove what the PSP/provider later did.

Next: **M8.1 — AP2 approved PaymentMandate ↔ executed PSP/provider outcome**, followed by the first constrained RESOLVE semantics.
