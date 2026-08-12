# TimeProofs Security Policy

TimeProofs is cross-protocol consistency infrastructure for agentic transactions. The current product is local/CI-first and evaluates supported UCP/AP2 artifacts without requiring a hosted TimeProofs account.

## Supported security surface

This policy currently covers the active TimeProofs relaunch code on `relaunch/invariant-engine`, including:

- `timeproofs-core/`;
- `adapters/`;
- `sdk/`;
- `cli/timeproofs.js` and `bin/timeproofs.js`;
- `ci/`;
- the root TimeProofs GitHub Action;
- TimeProofs schemas, invariant packs and fixtures.

Legacy AgentReady code remains historical/migration material and is not the active product direction.

## Security principles

TimeProofs must:

- treat protocol artifacts as untrusted input;
- use exact supported protocol/profile identifiers;
- return UNKNOWN rather than infer unsupported or missing evidence;
- keep the deterministic core free of LLM decision authority;
- avoid remote execution/fetching in the local M0–M7 path;
- never emit raw checkout proof/JWT or payment credential material in CI-safe output;
- use least-privilege GitHub Actions permissions;
- pin security/release-critical third-party Actions by immutable commit SHA;
- preserve artifact/adapter/pack provenance needed to reproduce decisions.

Threat model: `docs/security/THREAT_MODEL.md`.
Supply-chain policy: `docs/security/SUPPLY_CHAIN.md`.

## Reporting a vulnerability

Please report a suspected security or privacy vulnerability privately to:

`security@timeproofs.io`

Include, when possible:

- affected version/commit;
- affected CLI/SDK/Action path;
- minimal reproduction steps;
- expected vs actual behavior;
- security or privacy impact;
- whether logs/output may contain sensitive material.

Do not include real payment credentials or customer secrets in an initial report unless a secure channel has been agreed.

## Current non-claims

TimeProofs does not currently claim complete AP2 SD-JWT/JWS/key-binding verification, PSP/network execution proof, hosted-runtime isolation, or absolute prevention of inconsistent transactions. Supported guarantees are limited to the explicit versioned invariants/evidence profiles implemented and tested in this repository.

## Disclosure handling

Public disclosure timing should be coordinated after a fix or mitigation is available. TimeProofs will not represent an unverified report as fixed until the relevant regression/security gate is green.
