# AgentReady GitHub Action Versioning

Status: ACTIVE DISTRIBUTION SPECIFICATION

## Purpose

This document defines the versioning and immutable-reference model for the TimeProofs AgentReady GitHub Action.

Active direction:

```txt
TimeProofs AgentReady = pre-deployment CI gate for agent-facing OpenAPI and MCP tools.
```

The executable Marketplace batch is specified in `GITHUB_ACTION_MARKETPLACE_EXECUTION_SPEC.md`.

## Existing Immutable Repository Release

The existing immutable release tag is:

```txt
v0.1.0-alpha.0
```

It points to:

```txt
150da23932c1fb9433cb3d546904f03c18c909e9
```

This tag and its GitHub prerelease are already published and must remain immutable.

At that historical source layout, the Action metadata was located at:

```txt
.github/actions/agentready/action.yml
```

The corresponding immutable source reference is:

```yaml
uses: BACOUL/timeproofs/.github/actions/agentready@v0.1.0-alpha.0
```

This is a historical alpha source reference. It is not the root Marketplace Action and it must not be represented as a Marketplace listing or a current installation path.

## Root Marketplace Action Requirement

GitHub Marketplace requires the listed Action metadata file to exist at the repository root as `action.yml` or `action.yaml`.

`ARB-COM-002` therefore migrates the canonical Action metadata to:

```txt
/action.yml
```

The nested metadata file is removed after all internal references and tests are migrated. Runtime logic must not be duplicated between root and nested metadata files.

## First Marketplace Action Release

The reserved immutable tag for the first root Action release is:

```txt
agentready-action-v0.1.0-alpha.0
```

This Action-specific tag namespace avoids moving or repurposing the existing npm and repository release tag.

Rules:

- the reserved Action tag does not exist until the owner checkpoint in `ARB-COM-002`;
- it must point exactly to the reviewed implementation commit;
- it must never be moved after publication;
- no moving major Action tag is created during the alpha batch;
- the root `package.json` version remains `0.1.0-alpha.0`;
- the npm package remains `@timeproofs/agentready@0.1.0-alpha.0`;
- no npm publication or dist-tag operation is part of the Action release;
- Action release notes must identify the embedded AgentReady CLI/package version and compatibility contract;
- the Action GitHub Release must be marked prerelease and must not be marked latest when the interface permits that distinction.

## Public References After Publication

Readable immutable alpha tag:

```yaml
uses: BACOUL/timeproofs@agentready-action-v0.1.0-alpha.0
```

Security-hardened full commit reference:

```yaml
uses: BACOUL/timeproofs@<FULL_ACTION_RELEASE_COMMIT_SHA>
```

The full commit SHA is the recommended reference for maximum stability and supply-chain control.

The default branch is never a production reference:

```yaml
uses: BACOUL/timeproofs@timeproofs
```

It may be used only for explicitly labeled temporary development testing.

## Future Stable References

Future complete immutable Action tags may use the Action-specific namespace:

```txt
agentready-action-v0.1.0
agentready-action-v1.0.0
```

A future moving major reference may be considered only after stable release validation:

```txt
agentready-action-v1
```

Rules:

- a complete version tag must never move;
- a moving major tag may advance only after compatibility review;
- no update may silently break inputs, outputs, exit codes, `agentready.json`, AR rule codes, or policy behavior;
- moving-tag maintenance requires a separate approved release procedure.

## Marketplace Metadata Identity

The initial metadata candidate is:

```yaml
name: AgentReady CI Gate by TimeProofs
author: TimeProofs
description: Static CI gate for agent-facing OpenAPI and MCP contracts.
branding:
  icon: shield
  color: blue
```

The GitHub Marketplace interface must confirm the final `name` is unique before publication. Any required naming adjustment must remain factual, minimal, and recorded.

## Runner Support

Currently validated before `ARB-COM-002`:

- `ubuntu-latest`;
- Node.js 20.

Windows and macOS support are not claimed until the public-installation batch executes those runners successfully.

## Compatibility Rules

The root Action must use the same repository implementation and public contracts as the published Community CLI:

- `bin/agentready.js`;
- Node.js engine `>=20`;
- AR001-AR010 rule identifiers;
- `agentready.json` v0.1;
- exit codes `0`, `1`, `2`, and `3`;
- report and contract outputs after a valid policy failure.

The Action release may have its own Action tag while embedding the unchanged npm/CLI version. The release notes must make that distinction explicit.

## Current Release State

- npm package `@timeproofs/agentready@0.1.0-alpha.0` is published.
- npm dist-tag `alpha` points to `0.1.0-alpha.0`.
- npm dist-tag `latest` also points to `0.1.0-alpha.0` and is temporarily accepted until the first stable npm release.
- Git tag `v0.1.0-alpha.0` exists and remains immutable.
- GitHub prerelease `v0.1.0-alpha.0` exists and is not marked latest.
- root `/action.yml` is not yet published on the default branch at the start of `ARB-COM-002`.
- Action tag `agentready-action-v0.1.0-alpha.0` is reserved but not yet created.
- no Marketplace listing exists at the start of `ARB-COM-002`.
- no new npm operation is authorized.

`ARB-COM-002` creates root `/action.yml` in the implementation PR. It must still stop before tag, GitHub Release and Marketplace publication until JEASON approves the exact implementation commit.

## Compromised Release Rule

An immutable Action tag must never be moved to hide or repair a compromised release.

The response is:

1. remove the affected release from Marketplace when necessary;
2. publish a security notice;
3. preserve the tag and audit evidence;
4. prepare a corrected immutable Action tag;
5. update documentation to the corrected tag and full SHA.

## Mandatory Limitation

TimeProofs AgentReady does not guarantee that an AI agent will never fail.

It identifies structural risks that may cause AI agents to misuse APIs, tools, or MCP servers.
