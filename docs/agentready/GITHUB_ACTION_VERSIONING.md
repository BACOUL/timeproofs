# AgentReady GitHub Action Versioning

## Purpose

This document defines the intended versioning model for the TimeProofs AgentReady GitHub Action.

Active direction:

```txt
TimeProofs AgentReady = pre-deployment CI gate for agent-facing OpenAPI and MCP tools.
```

## Current Status

No public stable action tag is created in this PR.

The CLI package candidate is still:

```txt
0.1.0-alpha.0
```

The first future tag candidate is:

```txt
v0.1.0-alpha.0
```

That tag is not created here. Tag creation is reserved for the Community release workflow PR.

## Immutable References

Future examples:

```txt
v0.1.0-alpha.0
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
- moving a major reference must not silently introduce breaking inputs, outputs, policy behavior, or contract changes;
- compatibility must include CLI exit codes, `agentready.json` v0.1 behavior, AR rule codes, and documented outputs.

## Development Branches

The branch:

```txt
timeproofs
```

is a development branch.

It may be used for temporary testing, but it is not a stable production reference.

Documentation must label it clearly:

```txt
Development branch reference - not a stable release.
```

## Planned Versioned Reference - Not Yet Available

Future example:

```yaml
uses: BACOUL/timeproofs/.github/actions/agentready@v0.1.0-alpha.0
```

Label:

```txt
Planned versioned reference - tag not created yet.
```

Do not claim this works until the tag exists.

## Runner Support

Currently validated target:

- `ubuntu-latest`;
- Node.js 20.

Do not claim Windows or macOS support until those runners are executed successfully.

## Compatibility Rules

The Action must use the same repository CLI as the package candidate:

- same `bin/agentready.js`;
- same `package.json` version;
- same Node engine;
- same AR rule codes;
- same `agentready.json` contract;
- same exit codes.

The Action must not install `@timeproofs/agentready` from npm until the package is actually published.

## Release Blockers

- no public stable tag exists yet;
- no Marketplace listing exists;
- package publication is still blocked by npm scope and legal license checks;
- the Community release workflow is not established yet.

## Mandatory Limitation

TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
