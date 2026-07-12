# AgentReady GitHub Marketplace Distribution Specification

## Status

Specification status: `EXECUTION_READY`

Batch: `ARB-COM-002`

This specification authorizes implementation and validation only. It does not authorize npm operations, Git tag creation, GitHub Release creation, Marketplace submission, or automatic merge.

## Objective

Expose TimeProofs AgentReady as a public, immutable GitHub Action reference while preserving the current CLI behavior and keeping Marketplace publication behind an explicit owner checkpoint.

## Current State And Gap

- The repository is public.
- The tested Action metadata currently lives at `.github/actions/agentready/action.yml`.
- No root `action.yml` exists.
- The immutable tag `v0.1.0-alpha.0` points to the approved CLI release source and must not move.
- The published npm package remains `@timeproofs/agentready@0.1.0-alpha.0`.
- The next Action release candidate is `v0.1.0-alpha.1`; its release notes must state that the bundled CLI remains version `0.1.0-alpha.0`.
- No GitHub Marketplace listing currently exists.

## Implementation Design

1. Add one root `action.yml` as the public Action entrypoint.
2. Preserve `.github/actions/agentready/action.yml` as a compatibility entrypoint.
3. Move the shell implementation into one shared repository script so root and nested metadata cannot drift.
4. Preserve the current inputs: `file`, `type`, `min-score`, `fail-on`, and `out`.
5. Preserve the current outputs: `score`, `status`, `report-path`, and `contract-path`.
6. Add Marketplace branding using a supported Feather icon and supported color.
7. Test root `uses: ./` and nested compatibility usage on `ubuntu-latest` with Node.js 20.
8. Preserve policy PASS, expected policy FAIL, usage-error behavior, output generation, and CLI exit semantics.

## Marketplace Compliance Matrix

| Requirement | Implementation evidence | Publication gate |
|---|---|---|
| Public repository | Repository visibility recorded | Recheck before submission |
| One root metadata file | Root `action.yml`; no root `action.yaml` | CI assertion |
| Unique Action name | Root metadata name | GitHub Marketplace validation |
| Description and branding | Root metadata | Static test and GitHub validation |
| Immutable version tag | Planned `v0.1.0-alpha.1` | Owner-approved merged commit only |
| Release notes | Draft alpha.1 notes | Owner review |
| Marketplace categories and title | Owner-selected values | Owner checkpoint |
| Two-factor authentication | Owner account control | Owner checkpoint |
| Developer Agreement | Accepted only when GitHub requests it | Owner checkpoint |
| Repository contains appropriate Action distribution content | Current monorepo assessed by GitHub | Explicit current-repo versus dedicated-repo decision |
| GitHub reports eligibility | “Everything looks good!” or exact blocker recorded | Mandatory before submission |

## Repository Structure Decision Gate

The current repository contains the complete TimeProofs project, not only the Action distribution. That may prevent or weaken Marketplace eligibility. Implementation must not hide this fact or claim compliance in advance.

Before any Marketplace write, JEASON must record one outcome:

- `CURRENT_REPOSITORY_APPROVED`: GitHub validates the repository and the owner accepts this distribution model;
- `DEDICATED_ACTION_REPOSITORY_REQUIRED`: publication pauses and a separate repository plan is created;
- `PAUSE`: no Action tag, Release, or Marketplace submission is performed.

## Implementation Phase

Codex may:

- create the root metadata and shared entrypoint;
- update the nested compatibility metadata;
- extend integration and smoke tests;
- update Action usage and versioning documentation;
- prepare draft `v0.1.0-alpha.1` release notes;
- collect compliance evidence.

Codex must not:

- perform an npm operation;
- create, move, or delete any Git tag;
- create or modify a GitHub Release;
- submit a Marketplace listing;
- publish from a PR head;
- merge its own PR.

## Owner Checkpoint

After the implementation PR is merged and all workflows are green, JEASON must:

1. verify the exact merged commit;
2. open the Marketplace publication flow and record GitHub’s validation result;
3. decide current repository versus dedicated repository;
4. approve the exact tag `v0.1.0-alpha.1`;
5. approve listing title and categories;
6. accept the Developer Agreement only when required;
7. explicitly authorize or reject tag, prerelease, and Marketplace publication.

## Controlled Publication Phase

Only after explicit approval:

1. create immutable tag `v0.1.0-alpha.1` from the approved merged commit;
2. create a GitHub prerelease, not a stable or latest release;
3. state clearly that the Action bundles CLI `0.1.0-alpha.0`;
4. publish the Marketplace listing only when GitHub eligibility passes;
5. run a public consumer workflow using the exact immutable tag;
6. reconcile all evidence in a separate PR.

## Rollback

Before publication, revert the implementation PR.

After publication, never move an immutable tag. Correct defects with a new prerelease tag and document the superseded version. npm remains outside this rollback boundary.

## Mandatory Limitation

TimeProofs AgentReady does not guarantee that an AI agent will never fail. It identifies structural risks that may cause AI agents to misuse APIs, tools, or MCP servers.
