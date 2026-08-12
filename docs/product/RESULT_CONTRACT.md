# TimeProofs Public Result Contract

Status: FROZEN FOR M7 v0.1
Contract: `timeproofs.result.v0.1`
Schema: `schemas/timeproofs-result.v0.1.schema.json`

## Purpose

The result contract is the stable machine-facing boundary shared by CLI, SDK consumers, GitHub Action outputs, future CI integrations and later runtime enforcement.

## Primary decision

Exactly one aggregate decision is emitted:

- `PASS`
- `WARN`
- `BLOCK`
- `UNKNOWN`

`UNKNOWN` is not an error alias. It means the requested conclusion cannot be proven from supported evidence/profile semantics.

## Required envelope

Every public result carries:

- `result_contract_version`;
- `core_schema_version`;
- `evaluation_id`;
- pack/adapters/evaluation metadata;
- per-invariant results;
- aggregate `decision`;
- graph identity and safe composition metadata.

## Compatibility rule

Within `timeproofs.result.v0.1`:

- existing required fields are not removed or retyped;
- existing decision/reason semantics are not silently changed;
- additive optional fields are allowed;
- a breaking machine-contract change requires a new contract version and migration note.

Pack/adapter upgrades are separately versioned and do not redefine the result envelope.

## CI-safe projection

The GitHub Action emits a redacted profile `timeproofs.ci.safe.v0.1`.

It intentionally excludes:

- raw protocol objects;
- raw checkout proof/JWT material;
- raw payment instrument payloads;
- merchant authorization credential material;
- local source paths from object snapshots.

The safe result keeps digests, supported canonical fields, adapter/pack versions, invariant results, binding metadata and decision evidence necessary for CI diagnosis.

## Exit-code contract

- `0` — PASS or WARN
- `2` — BLOCK
- `3` — UNKNOWN when fail-on-unknown is enabled / local CLI default
- `4` — unsupported protocol/profile input
- `1` — invalid input or runtime failure

Exit codes and decision values are separate surfaces. Consumers should prefer JSON decision semantics when richer behavior is needed.
