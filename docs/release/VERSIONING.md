# TimeProofs Versioning & Compatibility Policy

Status: M7 BASELINE

TimeProofs versions independent compatibility surfaces separately.

## Public result contract

Current: `timeproofs.result.v0.1`

A breaking machine-output change requires a new result-contract version. Additive optional fields may remain within the same contract version.

## Core schema

`core_schema_version` describes the internal canonical evaluation model. A core schema change does not automatically break the public result contract if the public projection remains compatible.

## Invariant packs

Each Invariant Pack has its own version. A change that can alter a previously deterministic PASS/BLOCK result for the same supported inputs must be treated as a semantic pack change, documented and regression-tested.

## Adapters

Adapters are separately versioned because upstream protocol mappings can change independently from the core and pack.

## CLI / SDK package

Before 1.0, TimeProofs uses SemVer with conservative compatibility:

- PATCH: bug/security fix that preserves documented public behavior;
- MINOR: additive public capability, new supported protocol profile, optional field, new invariant/profile;
- MAJOR: documented breaking public CLI/SDK/result-contract behavior.

Pre-1.0 status is not permission to silently break CI contracts. Any intentional break requires a migration note.

## GitHub Action

Production consumers should pin an immutable full commit SHA or a documented immutable release tag. Floating development branches are not production trust anchors.

## Changelog requirement

Every public release must state:
- CLI/SDK changes;
- result-contract changes;
- pack changes that can affect decisions;
- adapter/upstream compatibility changes;
- security-relevant changes;
- migration instructions for breaking changes.
