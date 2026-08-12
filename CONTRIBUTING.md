# Contributing to TimeProofs

TimeProofs is cross-protocol consistency infrastructure for agentic transactions.

Read `AI_PROJECT_ENTRYPOINT.md` before changing product semantics or implementation.

## Contribution priorities

Useful contributions strengthen one of these surfaces:

- deterministic invariant evaluation;
- UCP/AP2 and future protocol adapters;
- evidence/provenance correctness;
- versioned Invariant Packs and fixtures;
- CLI / SDK / GitHub Action developer experience;
- adversarial/security testing;
- protocol compatibility research backed by primary sources;
- reproducible performance and release engineering.

## Product guardrails

Do not silently turn TimeProofs into:

- a readiness score product;
- a generic scanner/dashboard;
- an MCP gateway;
- an auth product;
- an observability product;
- a new universal agent protocol.

Do not make a blocking invariant broader merely because it makes an implementation easier. Blocking semantics require the evidence, protocol/version scope and fixtures defined by the pack/Decision Log.

## Protocol changes

A protocol-dependent pull request should state:

- exact upstream protocol/profile/version or source snapshot;
- affected adapter/pack;
- normative source;
- whether PASS/BLOCK/UNKNOWN behavior changes;
- new or updated fixtures;
- migration/compatibility impact.

## Testing

Run:

```bash
npm ci --ignore-scripts
npm run test:timeproofs
```

The release-quality CI also tests Linux, macOS and Windows across supported Node versions.

## Security-sensitive changes

Read:

- `docs/security/THREAT_MODEL.md`
- `docs/security/SUPPLY_CHAIN.md`
- `docs/startup/WORLD_CLASS_GATE.md`

Do not log or persist real checkout proofs, payment credentials or merchant authorization material in tests/issues/PRs.

## Pull requests

PRs should state:

- problem and scope;
- product/invariant semantics changed, if any;
- compatibility impact;
- security/privacy impact;
- tests executed;
- remaining limitations.

## Legacy AgentReady

AgentReady-era code/docs are historical. Do not extend them as part of the TimeProofs relaunch unless the change is explicitly an archival/migration task.
