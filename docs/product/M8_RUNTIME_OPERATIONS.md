# TimeProofs — M8 Runtime Operations

Status: M8 OPERATIONAL CONTRACT

## Surface decision

M8 is **SDK-first**.

Reason: ENFORCE is meaningful only when it is called immediately before a caller-owned consequential side effect. A CLI or GitHub Action can verify artifacts, but neither naturally owns the in-process pre-commit boundary. Adding a CLI/Action `enforce` switch in M8 would risk creating a misleading sense that CI enforcement is equivalent to runtime enforcement.

Therefore:

- `verifyTransaction()` remains available to SDK/CLI/CI;
- `enforceTransaction()` is the canonical M8 runtime primitive;
- CLI/Action enforcement is deferred unless a concrete runtime integration requires it;
- future gateways/runtimes may wrap the SDK, but TimeProofs does not become a generic MCP/A2A gateway.

## Caller integration contract

```js
const gate = enforceTransaction(input)

if (!gate.allowed) {
  // do not perform the consequential side effect
  return gate
}

await callerOwnedCommit()
```

The caller MUST evaluate the returned `allowed` value from the same evaluation immediately before the protected commit. Re-evaluating or caching across changed transaction state is outside the M8 guarantee.

## Fail behavior

Default financial policy:

- PASS → ALLOW
- WARN → ALLOW
- BLOCK → DENY
- UNKNOWN → DENY
- evaluation/runtime failure → ERROR, `allowed=false`

Any policy that is less restrictive than the default for BLOCK, UNKNOWN, or runtime error MUST carry an explicit non-empty `policy_id`. The normalized policy is snapshotted into the result so caller mutation after evaluation cannot silently change the recorded policy.

## Runtime evidence

An M8 result is an enforcement decision envelope, not proof that the later PSP/provider operation executed.

The envelope records or embeds the verification evidence necessary to explain:

- enforcement contract version;
- ALLOW/DENY/ERROR state;
- underlying PASS/WARN/BLOCK/UNKNOWN decision;
- reason code;
- normalized policy ID and deny/error behavior;
- verification results and invariant evidence;
- pack/adapter/version metadata already produced by Verify;
- artifact digests/evaluation identity already produced by Verify.

The result is suitable for caller-owned audit storage subject to the data-handling rules. Safe CI/public projections remain separately redacted.

## Immutability boundary

The enforcement envelope and normalized policy are returned frozen to reduce accidental post-decision mutation of the policy/state metadata. TimeProofs does not deep-freeze caller protocol payloads or the complete underlying verification graph because those objects remain caller-owned and deep copying them would impose unnecessary cost. Consumers that require immutable archival evidence should serialize/store the result immediately in their own trusted audit path.

## Rollback

M8 rollback is deliberately boring and deterministic:

1. pin an exact TimeProofs package version;
2. pin exact supported protocol/pack profiles;
3. deploy the new version through the caller's normal release process;
4. if a regression is detected, revert to the previously known-good package/configuration;
5. do not allow remote `latest` pack mutation inside the transaction path.

A rollback changes future evaluations only. It does not rewrite historical decisions.

## Bad-rule response

If a TimeProofs rule produces suspected false blocks:

- stop rollout of the affected version;
- pin/revert to previous known-good version;
- preserve the failing artifacts in a secure reproduction fixture when permitted;
- classify whether the issue is adapter, canonicalization, invariant semantics, provider profile, or policy;
- add a regression before re-release;
- do not weaken UNKNOWN/BLOCK globally as an emergency workaround.

An explicit customer fail-open policy remains the customer's decision and must stay audit-visible.

## Migration discipline

Breaking changes to enforcement meaning require a contract/version change. Additive metadata may remain compatible if existing state/reason semantics do not change.

Protocol/provider compatibility changes are never implied by installing a newer TimeProofs version; support remains profile/version explicit.

## Runtime telemetry

The local SDK does not require telemetry. If the caller elects to measure usage, preferred non-sensitive metrics are:

- decision counts by PASS/WARN/BLOCK/UNKNOWN;
- enforcement state counts by ALLOW/DENY/ERROR;
- invariant/reason-code frequencies;
- evaluation latency;
- package/pack/adapter versions;
- explicit fail-open policy usage.

Do not send raw payment credentials, checkout proofs or full protocol payloads as default telemetry.

## M8 operational non-claims

M8 does not guarantee:

- that a later external side effect occurred;
- exactly-once execution;
- provider/network success;
- compensation/rollback of a side effect;
- outcome resolution after timeout;
- hosted availability/SLA.

Those belong to the subsequent authorized↔executed evidence and RESOLVE work.
