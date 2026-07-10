# AgentReady Community Release Workflow

## Purpose

This document defines the Community release candidate workflow for TimeProofs AgentReady.

Active direction:

```txt
TimeProofs AgentReady is a pre-deployment CI gate for agent-facing OpenAPI and MCP tools.
```

Core promise:

```txt
Fail the build before unsafe agent-facing APIs or MCP tools are deployed.
```

## Candidate Only

The workflow prepares and validates a release candidate. It does not create a public release.

Candidate validation means:

```txt
reviewed commit
-> complete test suite
-> package tarball
-> exact package-content validation
-> clean installation
-> GitHub Action validation
-> checksum
-> release manifest
-> draft release notes
-> temporary CI artifact
-> explicit publication blockers
```

Publication is forbidden in this workflow.

The workflow must not:

- publish to npm;
- create a Git tag;
- create a GitHub Release;
- publish a Marketplace listing;
- request publication tokens;
- write repository contents.

## Workflow

Workflow file:

```txt
.github/workflows/agentready-community-release-candidate.yml
```

Workflow name:

```txt
AgentReady Community Release Candidate
```

Triggers:

- pull requests that touch Community distribution or release-candidate files;
- manual `workflow_dispatch`.

Forbidden triggers:

- tag-based automatic release;
- publication input;
- the elevated pull-request target trigger.

Permissions:

```yaml
permissions:
  contents: read
```

No write permission is granted.

## Runtime

Runner:

- `ubuntu-latest`.

Node.js:

- Node.js 20.

## Required Validation

The workflow runs:

```txt
node agentready-core/tests/run-agentready-core-tests.mjs
node cli/tests/run-agentready-cli-tests.mjs
node cli/tests/run-agentready-action-smoke-test.mjs
node cli/tests/run-agentready-package-smoke-test.mjs
node cli/tests/run-agentready-community-release-workflow-test.mjs
```

It also validates:

- package name;
- package version;
- `private: true`;
- Node engine;
- binary command;
- license field;
- absence of runtime dependencies;
- absence of tracked tarball at repository root.

## Source Commit Traceability

Pull-request runs check out the exact source commit from the PR branch, not GitHub's temporary merge commit.

The release candidate manifest records that exact checked-out commit in:

```json
{
  "commit_sha": "..."
}
```

The workflow verifies that `manifest.commit_sha` equals:

```txt
git rev-parse HEAD
```

After #112 is merged, a future `workflow_dispatch` run on `timeproofs` must validate the exact merged commit before any publication decision.

No candidate generated from a temporary pull-request merge commit may serve as a publication reference.

## GitHub Action Validation

The workflow executes the local composite action:

```yaml
uses: ./.github/actions/agentready
```

It validates:

- OpenAPI PASS;
- MCP PASS;
- expected OpenAPI policy FAIL;
- score output;
- status output;
- Markdown report path;
- `agentready.json` contract path;
- policy failure preserving outputs.

It does not use the remote branch or a version tag.

## Release Candidate Script

Script:

```txt
scripts/create-agentready-community-release-candidate.mjs
```

Package script:

```txt
npm run release:community:candidate -- --out <output-dir>
```

The script:

- reads `package.json`;
- verifies package metadata;
- verifies `private: true`;
- calculates the planned tag from the version;
- runs `npm pack --json`;
- validates the exact package file list;
- rejects forbidden package contents;
- calculates SHA-256;
- writes a checksum file;
- writes a release candidate manifest;
- copies draft release notes;
- writes only to the explicit output directory.

The output directory must not be the repository root and must be empty if it already exists. The script must not recursively delete or silently overwrite user-provided output directories.

## Manifest

Manifest file:

```txt
agentready-community-release-candidate-manifest.json
```

Required status:

```json
{
  "status": "candidate_only",
  "publication_ready": false
}
```

The manifest must not contain:

- secrets;
- tokens;
- personal data;
- absolute runner paths;
- false publication claims.

## Checksum

The tarball SHA-256 is written to:

```txt
timeproofs-agentready-0.1.0-alpha.0.tgz.sha256
```

The checksum is for candidate verification only.

## Temporary Artifact

The workflow uploads a temporary internal GitHub Actions artifact:

```txt
agentready-community-release-candidate-0.1.0-alpha.0
```

Retention:

```txt
7 days
```

The artifact contains only:

- package tarball;
- SHA-256 file;
- release candidate manifest;
- draft release notes.

This artifact is not:

- a GitHub Release;
- a public npm package;
- a public distribution channel.

## Versioning

Package candidate:

```txt
@timeproofs/agentready
```

Version:

```txt
0.1.0-alpha.0
```

Planned future tag:

```txt
v0.1.0-alpha.0
```

Tag status:

```txt
not created
```

The Community release workflow prepares and validates the release candidate. Actual tag creation remains blocked until all publication requirements and explicit release approval are satisfied.

## Future Rollback Procedure

When public release exists, rollback must be handled in a dedicated release decision:

- do not move immutable full-version tags;
- publish a corrected version if needed;
- document the issue in release notes;
- update moving major references only after validation;
- keep affected artifacts traceable.

Rollback is not active in this candidate-only workflow because no public artifact is published.

## Publication Blockers

- npm scope ownership not confirmed.
- legacy LICENSE references unresolved.
- AgentReady legal license decision not approved.
- package remains private.
- no public tag exists.
- no GitHub Release exists.
- npm publication security policy not finalized.
- explicit release approval not granted.

## Required Approvals Before Publication

Before publication can be considered:

- package scope ownership must be verified;
- legal license decision must be approved;
- publication security policy must be approved;
- 2FA or trusted publishing policy must be defined;
- release notes must be reviewed;
- exact tarball contents must be approved;
- immutable tag target commit must be approved;
- explicit release approval must be recorded.

## Mandatory Limitation

TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
