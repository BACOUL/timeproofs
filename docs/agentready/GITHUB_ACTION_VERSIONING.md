# AgentReady GitHub Action Versioning

## Purpose

This document defines the intended versioning model for the TimeProofs
AgentReady GitHub Action.

Active direction:

```txt
TimeProofs AgentReady = pre-deployment CI gate for agent-facing OpenAPI and MCP tools.
```

## Current Status

The alpha immutable release tag exists:

```txt
v0.1.0-alpha.0
```

It points to the approved source commit:

```txt
150da23932c1fb9433cb3d546904f03c18c909e9
```

This tag may be used as the immutable alpha reference for this release.

No public stable action tag and no moving major tag are created by this release.

Current tag status:

```txt
v0.1.0-alpha.0: created
v0: not created
v1: not created
```

## Immutable References

Current immutable alpha reference:

```txt
v0.1.0-alpha.0
```

Future examples:

```txt
v0.1.0
v1.0.0
```

Rules:

- a complete version tag must not be moved after publication;
- a complete version tag should point to a reviewed release commit;
- release notes should document CLI version, Action behavior, and compatibility.

## Moving Major References

Future examples:

```txt
v0
v1
```

Rules:

- a moving major reference may advance to a compatible release after validation;
- moving a major reference must not silently introduce breaking inputs, outputs,
  policy behavior, or contract changes;
- compatibility must include CLI exit codes, `agentready.json` v0.1 behavior,
  AR rule codes, and documented outputs.

## Development Branches

The branch:

```txt
timeproofs
```

is a development branch.

It may be used for temporary testing, but it is not a stable production
reference.

Documentation must label it clearly:

```txt
Development branch reference - not a stable release.
```

## Alpha Versioned Reference

Alpha example:

```yaml
uses: BACOUL/timeproofs/.github/actions/agentready@v0.1.0-alpha.0
```

Label:

```txt
Alpha immutable versioned reference - prerelease.
```

Do not present this alpha reference as a stable release or a Marketplace
listing.

## Runner Support

Currently validated target:

- `ubuntu-latest`;
- Node.js 20.

Do not claim Windows or macOS support until those runners are executed
successfully.

## Compatibility Rules

The Action must use the same repository CLI as the package release:

- same `bin/agentready.js`;
- same `package.json` version;
- same Node engine;
- same AR rule codes;
- same `agentready.json` contract;
- same exit codes.

## Release State

- npm package `@timeproofs/agentready@0.1.0-alpha.0` is published.
- npm dist-tag `alpha` points to `0.1.0-alpha.0`.
- npm dist-tag `latest` also points to `0.1.0-alpha.0` and is temporarily
  accepted by JEASON until the first stable release.
- Git tag `v0.1.0-alpha.0` is created.
- GitHub Release `v0.1.0-alpha.0` is created as a prerelease and is not marked
  latest.
- no Marketplace listing exists.
- no new npm operation is authorized by this release evidence PR.

## Mandatory Limitation

TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
