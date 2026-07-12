# AgentReady GitHub Action Marketplace Execution Specification

Status: ACTIVE EXECUTION SPECIFICATION

Batch: `ARB-COM-002`

Work items: `AR-COM-007`, `AR-COM-009`

Authority:

- `AGENTREADY_MASTER_PLAN.md`;
- `EXECUTION_SEQUENCE.md`;
- `VALIDATION_GATES_AND_EXTERNAL_PILOT.md`;
- `GITHUB_ACTION_VERSIONING.md`;
- `GITHUB_ACTION_USAGE.md`.

## Purpose

This specification makes `ARB-COM-002` executable without changing the approved AgentReady product direction.

The batch publishes the first root-level public GitHub Action distribution, prepares and completes the GitHub Marketplace listing through an explicit owner checkpoint, aligns the current public site with the active Community/Pro model, and records immutable evidence.

AgentReady remains a static, local-first CI gate for agent-facing OpenAPI and MCP contracts. This batch does not authorize runtime execution, hosted scanning, Stripe, accounts, a new npm publication, or a change to the detection engine.

## Official GitHub Requirements Used By This Specification

GitHub Marketplace publication currently requires:

- a public repository;
- a single `action.yml` or `action.yaml` metadata file at the repository root;
- a unique action metadata `name`;
- publication through a tagged GitHub Release with the Marketplace checkbox selected;
- acceptance of the GitHub Marketplace Developer Agreement when requested;
- two-factor authentication for release publication.

Official references:

- `https://docs.github.com/en/actions/how-tos/create-and-publish-actions/publish-in-github-marketplace`;
- `https://docs.github.com/en/actions/reference/workflows-and-actions/metadata-syntax`.

The GitHub user interface is the final authority for current Marketplace validation messages and category availability.

## Distribution Architecture Decision

For the alpha Marketplace release, the existing public repository `BACOUL/timeproofs` remains the distribution repository.

The implementation PR must:

1. create one canonical root metadata file at `/action.yml`;
2. remove `.github/actions/agentready/action.yml` after all internal references are migrated;
3. update repository workflows and tests to use the root Action through `uses: ./`;
4. make root execution resolve source files from `$GITHUB_ACTION_PATH`;
5. keep the Action a composite Action using the existing `bin/agentready.js` and `agentready-core` implementation;
6. avoid duplicating Action runtime logic between root and nested metadata files.

If the GitHub Marketplace user interface rejects the repository because of repository composition or another current platform requirement, publication must stop. The batch must record the exact rejection and return through change control to decide whether to create a dedicated Action repository. Codex and the owner must not bypass a Marketplace validation failure.

## Immutable Release Identity

The existing tag and release remain immutable:

```txt
v0.1.0-alpha.0
```

They must not be moved, deleted, recreated, or repurposed.

The first root Marketplace Action release reserves this distinct immutable tag:

```txt
agentready-action-v0.1.0-alpha.0
```

This tag separates the Action release channel from the already-published npm package and existing repository release.

Rules:

- the reserved tag must point exactly to the reviewed Action implementation commit approved in the PR;
- the tag is created only after all pre-publication checks pass;
- no moving `v0`, `v1`, `agentready-action-v0`, or equivalent tag is created during this alpha batch;
- `package.json` remains `0.1.0-alpha.0`;
- no npm package, version, dist-tag, token, login, or publication operation is authorized;
- the GitHub Release title must clearly identify an AgentReady Action alpha prerelease;
- the GitHub Release must be marked prerelease and must not be marked latest when the interface permits that distinction.

## Root Action Metadata

The root `/action.yml` must include:

```yaml
name: AgentReady CI Gate by TimeProofs
author: TimeProofs
description: Static CI gate for agent-facing OpenAPI and MCP contracts.
branding:
  icon: shield
  color: blue
```

The exact `name` is a publication candidate. The owner must verify in the Marketplace interface that it is unique. If GitHub reports a conflict, only the smallest factual naming adjustment is allowed, and the final name must be recorded in the evidence.

The root Action must preserve these inputs:

- `file`;
- `type`;
- `min-score`;
- `fail-on`;
- `out`.

It must preserve these outputs:

- `score`;
- `status`;
- `report-path`;
- `contract-path`.

It must preserve documented exit codes `0`, `1`, `2`, and `3`, including report and contract outputs after a valid policy failure.

## Public Workflow References

After publication, the documentation must show both forms.

Immutable human-readable alpha tag:

```yaml
uses: BACOUL/timeproofs@agentready-action-v0.1.0-alpha.0
```

Security-hardened full commit pin:

```yaml
uses: BACOUL/timeproofs@<FULL_ACTION_RELEASE_COMMIT_SHA>
```

The full commit SHA is the recommended security reference. The immutable alpha tag is the readable alternative. The default branch must not be presented as a production reference.

The current historical nested reference may remain documented only as legacy evidence:

```yaml
uses: BACOUL/timeproofs/.github/actions/agentready@v0.1.0-alpha.0
```

It must be labeled as the previous immutable source layout, not the Marketplace root Action.

## Minimum Consumer Permissions

The canonical public workflow must declare:

```yaml
permissions:
  contents: read
```

No write permission, deployment permission, identity-token permission, package permission, pull-request write permission, or secret is required by the Community Action.

The Action must not read or transmit repository secrets. It must not call a TimeProofs backend, live API, live MCP server, or LLM.

## Supply-Chain Controls

The implementation must include:

- a full-SHA consumer example;
- immutable Action tag documentation;
- exact release commit recording;
- dependency review of every third-party Action used in project workflows;
- secret scanning and code scanning where supported by the repository plan;
- a generated-file and Action metadata smoke test;
- no remote install script;
- no dynamic download of AgentReady runtime code;
- no long-lived npm or GitHub token introduced;
- a documented compromised-release response.

### Compromised-Release Response

If the Action release is later found compromised:

1. do not move or silently replace the immutable tag;
2. remove the affected release from Marketplace through the release settings when necessary;
3. publish a security notice;
4. prepare a corrected immutable Action tag;
5. update documentation to the corrected tag and SHA;
6. retain an audit trail of the affected release.

## Required Repository Changes

The implementation PR is limited to these surfaces:

- `/action.yml`;
- removal of `/.github/actions/agentready/action.yml`;
- AgentReady-related workflows under `/.github/workflows/`;
- Action and release tests under `/cli/tests/`;
- narrowly scoped validation or release helpers under `/scripts/`;
- `README.md`;
- `AGENTREADY_PROJECT_CONTEXT.md`;
- `index.html`;
- `pricing.html`;
- `agentready-ci.html`;
- active AgentReady documentation under `/docs/agentready/`;
- release notes or changelog entries required for the Action release.

The batch must not modify:

- `agentready-core/**`;
- `bin/**`;
- `package.json`;
- package staging contents;
- `LICENSE` or package licensing;
- billing, Stripe, account, entitlement, or backend implementation;
- unrelated site pages.

## Public-Site Alignment

Before Marketplace promotion, the current public pages modified by this batch must state:

- AgentReady Community is available free of charge;
- AgentReady Pro is in preparation and cannot yet be purchased;
- the explicit npm alpha command uses `@alpha`;
- the public root Action reference is visible only after publication;
- AgentReady performs static analysis and does not guarantee agent safety.

The modified public pages must remove active-path wording for:

- manual review offers;
- Fix Pack offers;
- payment by email;
- mandatory contact before Community use;
- any statement that Pro is already available.

Historical documents may retain historical wording when clearly marked historical and excluded from active public navigation.

## Codex Preflight

Before implementation, Codex must:

1. verify that `v0.1.0-alpha.0` still points to `150da23932c1fb9433cb3d546904f03c18c909e9`;
2. verify that the current Marketplace root metadata file does not exist;
3. verify the existing nested Action smoke tests pass before migration;
4. inventory every reference to `.github/actions/agentready`;
5. inventory active public pages containing manual review, Fix Pack, email payment, mandatory contact, or stale Community publication wording;
6. confirm no npm operation is needed;
7. open a draft PR before any owner publication checkpoint.

## Required Automated Validation

The implementation PR must pass at least:

```txt
node agentready-core/tests/run-agentready-core-tests.mjs
node cli/tests/run-agentready-cli-tests.mjs
node cli/tests/run-agentready-action-smoke-test.mjs
node cli/tests/run-agentready-package-smoke-test.mjs
node cli/tests/run-agentready-community-release-workflow-test.mjs
node scripts/rebuild-agentready-ledger-data.mjs
node scripts/generate-agentready-ledger-views.mjs --write
node scripts/generate-agentready-status.mjs --write
node scripts/generate-agentready-next-action.mjs --write
node scripts/generate-agentready-next-prompt.mjs --write
node scripts/validate-agentready-strategy-docs.mjs
node scripts/validate-agentready-execution-system.mjs
git diff --check
```

Additional Action validation must prove:

- `/action.yml` exists and parses;
- the root metadata contains the required name, author, description, branding, inputs, outputs, and composite runs configuration;
- the nested metadata file is absent;
- all local workflow references use the root Action;
- OpenAPI PASS works;
- MCP PASS works;
- an expected policy failure preserves outputs;
- invalid inputs return the documented usage error;
- no TimeProofs backend is contacted;
- the canonical workflow declares `contents: read` only;
- public examples contain the reserved Action tag and a full-SHA form;
- obsolete active-site commercial wording is absent from the modified pages.

## Owner Checkpoint

After Codex completes implementation and all pre-publication checks pass, the PR must stop for JEASON.

JEASON must perform these private GitHub UI actions:

1. review and approve the exact implementation commit to tag;
2. accept the GitHub Marketplace Developer Agreement if GitHub requests it;
3. create the immutable tag `agentready-action-v0.1.0-alpha.0` on the exact approved implementation commit;
4. draft the GitHub Release from that tag;
5. select `Publish this Action to the GitHub Marketplace`;
6. resolve only factual metadata warnings or name conflicts through the reviewed PR;
7. choose the closest current categories in the GitHub interface;
8. publish with the owner account and private two-factor authentication;
9. provide the public Release URL and Marketplace listing URL without sharing credentials or codes.

Codex must never request, receive, print, store, or create a password, two-factor code, recovery code, personal access token, or GitHub secret.

## Post-Checkpoint Verification

After JEASON confirms publication, Codex must:

- verify the immutable tag target;
- verify the GitHub Release exists and is a prerelease;
- verify the Marketplace listing is public;
- verify the listing name, description, branding, categories, repository links, inputs, and usage example;
- run the public Action by immutable tag from a controlled workflow;
- run or document the full-SHA reference;
- record the exact tag, commit SHA, Release URL, Marketplace URL, workflow run, and final metadata name;
- update active docs and public pages with real references rather than placeholders;
- keep the PR unmerged until evidence is recorded and reviewed.

## Required Evidence

The completed batch must contain:

- root metadata audit;
- nested-reference migration inventory;
- passing Action, CLI, package, release-workflow, strategy, and execution-system tests;
- exact approved Action implementation commit SHA;
- immutable Action tag and verified target;
- GitHub Release URL;
- Marketplace listing URL;
- owner confirmation that Marketplace agreement and 2FA steps were completed privately;
- public tag-based workflow run;
- full-SHA usage example;
- minimum-permissions review;
- supply-chain review;
- public-site alignment report;
- rollback and compromised-release procedure.

## Action Release Evidence Record

Status: PRE_OWNER_CHECKPOINT

Root metadata audit:

- root metadata file: `/action.yml`
- nested metadata file: removed after internal reference migration
- name candidate: `AgentReady CI Gate by TimeProofs`
- author: `TimeProofs`
- description: `Static CI gate for agent-facing OpenAPI and MCP contracts.`
- branding: `shield` / `blue`
- inputs: `file`, `type`, `min-score`, `fail-on`, `out`
- outputs: `score`, `status`, `report-path`, `contract-path`
- runtime: composite Action wrapping the existing CLI
- backend, account, secret and telemetry dependency: none

Reference migration inventory:

- internal workflows use `uses: ./`
- public examples use `uses: BACOUL/timeproofs@agentready-action-v0.1.0-alpha.0`
- full-SHA examples use `uses: BACOUL/timeproofs@<FULL_ACTION_RELEASE_COMMIT_SHA>` until the owner-published tag target is verified
- historical nested references are labeled as historical source layout only

Pre-owner checkpoint fields:

- Approved implementation SHA: `PENDING_OWNER_APPROVAL`
- Reserved immutable Action tag: `agentready-action-v0.1.0-alpha.0`
- Immutable Action tag target: `PENDING_OWNER_ACTION`
- GitHub prerelease URL: `PENDING_OWNER_CONFIRMATION`
- Marketplace URL: `PENDING_OWNER_CONFIRMATION`
- Public tag workflow run: `PENDING_OWNER_CONFIRMATION`
- Full-SHA usage example: `PENDING_OWNER_CONFIRMATION`
- Owner Marketplace agreement and private 2FA attestation: `PENDING_OWNER_CONFIRMATION`

Automated validation evidence is recorded in the implementation PR before the
owner checkpoint. Final public evidence must be recorded after JEASON provides
the public GitHub Release URL and Marketplace URL.

Compromised-release response:

1. do not move or delete the immutable Action tag;
2. preserve the audit trail;
3. remove the affected release from Marketplace when necessary;
4. publish a corrective notice;
5. prepare a corrected reviewed commit;
6. issue a new immutable Action tag;
7. update documentation and evidence.

## Forbidden Actions

This batch must not:

- publish, unpublish, deprecate, or modify any npm package or npm dist-tag;
- log in to npm;
- move, delete, or recreate `v0.1.0-alpha.0`;
- create a moving Action major tag;
- modify the AgentReady engine or CLI implementation;
- add silent telemetry;
- upload contracts or reports to TimeProofs;
- add runtime scanning or live execution;
- add Stripe, accounts, licenses, dashboards, or entitlements;
- imply GitHub reviewed or certified AgentReady security results;
- claim certification, guaranteed safety, or zero false positives;
- automate Marketplace agreement acceptance or two-factor authentication;
- merge before owner review and post-publication evidence.

## Rollback Boundary

Before the immutable Action tag is created, the batch can be rolled back by closing or reverting the implementation PR.

After Marketplace publication, rollback must preserve the immutable tag and audit trail. Remove the affected release from Marketplace if necessary, publish a notice, and prepare a new corrected immutable Action release rather than moving the existing tag.
