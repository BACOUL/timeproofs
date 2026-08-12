# TimeProofs — M8 Runtime Enforcement Design

Status: DESIGN FROZEN BEFORE IMPLEMENTATION
Date: 2026-08-12

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
- silently fetch or update invariant packs at runtime;
- claim exactly-once external execution;
- claim that pre-commit verification proves the provider's later executed outcome.

Execution-vs-approved outcome is a separate evidence problem and the next strategic pack direction.

## Trust boundary

Caller owns:

- the agent/application;
- collection of protocol objects and evidence;
- credentials and PSP execution;
- external side effect;
- authoritative business rollback/compensation.

TimeProofs owns:

- deterministic adaptation of supported artifacts;
- pinned invariant/evidence semantics;
- evaluation result;
- enforcement policy application;
- safe decision/audit envelope.

## Runtime API concept

```js
const gate = await timeproofs.enforce({
  checkout,
  paymentMandate,
  checkoutJwt,
  policy: {
    block: ['BLOCK', 'UNKNOWN']
  }
});

if (gate.allowed) {
  await callerOwnedCommit();
}
```

The library MUST NOT execute `callerOwnedCommit()` on behalf of the caller in the first M8 implementation. Keeping decision and side-effect ownership separate minimizes liability and avoids exactly-once claims we cannot prove.

## Enforcement states

Public enforcement result:

- `ALLOW` — policy permits commit;
- `DENY` — policy prohibits commit;
- `ERROR` — evaluation could not complete safely.

The underlying verification decision remains one of:

- PASS
- WARN
- BLOCK
- UNKNOWN

Enforcement state never replaces verification evidence.

## Default policy

For financially consequential flows the default M8 policy is:

- PASS → ALLOW
- WARN → ALLOW, with warning evidence
- BLOCK → DENY
- UNKNOWN → DENY
- internal/runtime error → ERROR and no automatic allow

This is intentionally fail-closed for missing proof.

A caller MAY explicitly choose a fail-open policy for UNKNOWN/error in a lower-risk deployment, but:

- it must be explicit in configuration;
- it must be present in the audit result;
- the library must never silently downgrade to fail-open.

## Version pinning

Every enforcement evaluation records:

- core schema version;
- TimeProofs package version;
- invariant pack ID/version;
- adapter IDs/versions;
- supported protocol profiles;
- evaluation time;
- artifact digests.

M8 MUST NOT use `latest` semantics for packs or protocol mappings.

## Update policy

No remote pack update may change an in-process enforcement decision.

Future managed pack delivery, if built, must use:

1. fetch outside transaction path;
2. authenticate/verify package;
3. stage;
4. regression/self-check;
5. explicit activation/version switch;
6. rollback to previous pinned version.

## Rollback

Initial rollback mechanism is package/config version pinning:

- previous known-good TimeProofs package remains installable/pinnable;
- caller can revert the package or pack version;
- result contract versions are explicit;
- breaking semantic changes require major-version treatment according to release policy.

M8 does not invent hidden dynamic configuration.

## Latency budget

Initial local pre-commit target uses the existing measured Verify path.

Current reference benchmark:
- 1,000 line items;
- measured p95 6.004 ms on GitHub-hosted Ubuntu/Node 22;
- 100 ms p95 regression ceiling.

M8 local enforcement SHOULD remain under the same 100 ms regression ceiling for this representative profile before any network evidence connector is included.

Network/PSP evidence is measured separately and MUST NOT be folded into a misleading local-engine benchmark.

## Availability model

Initial M8 is local-first and has no required TimeProofs cloud dependency.

Therefore availability is primarily caller process/runtime availability rather than TimeProofs service availability.

If a future hosted dependency is introduced, its timeout/retry/fail policy requires a separate design and SLA. Hosted failure must never silently convert UNKNOWN/error into ALLOW.

## Secret/data policy

M8 follows M7 data safety:

- no raw payment credentials in normal result artifacts;
- no checkout proof/JWT in safe audit projection;
- raw local evidence remains process-local unless caller explicitly stores it;
- TimeProofs does not require telemetry for enforcement.

## Audit envelope

Every enforcement result includes at minimum:

- enforcement contract version;
- allowed boolean/state;
- verification decision;
- invariant result references;
- policy used;
- package/pack/adapter versions;
- artifact digests;
- evaluation timestamp;
- safe reason codes.

## M8 implementation order

1. freeze enforcement result schema;
2. implement pure `applyEnforcementPolicy(verification, policy)`;
3. add SDK `enforceTransaction()` using existing deterministic Verify path;
4. add PASS/WARN/BLOCK/UNKNOWN/error fixtures;
5. add CLI optional enforcement mode only if it improves integration clarity;
6. add customer Action enforcement option only after local semantics are frozen;
7. benchmark and adversarial-test enforcement;
8. document migration/rollback.

## M8 exit criteria

M8 is complete only when:

- default fail-closed behavior is executable and tested;
- explicit fail-open override is visible/auditable;
- no code path silently allows UNKNOWN/error;
- package/pack/adapter versions are recorded;
- safe enforcement result contract is versioned;
- local enforcement remains deterministic;
- security/property/cross-platform regressions remain green;
- representative latency remains within the chosen guard;
- TimeProofs still does not execute or custody the external financial side effect.

## Strategic link to next pack

The first M8 gate can enforce the current UCP↔AP2 pre-commit invariants.

The strategically important next pack should add **approved payment ↔ executed PSP/network outcome** evidence. That later capability may run after execution/reconciliation as well as before subsequent lifecycle actions. It must not be conflated with the initial pre-commit enforcement primitive.
