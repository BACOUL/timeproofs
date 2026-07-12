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

## Read-Only Candidate Workflow

The workflow prepares and validates a release candidate artifact. It remains
read-only and does not create a public release by itself.

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
-> release notes snapshot
-> temporary CI artifact
-> release evidence checks
```

Publication actions are unavailable in this workflow.

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

## Controlled Publication Handoff

The GitHub Actions workflow remains candidate-only, read-only and technically
incapable of publishing. Real publication is a separate approved procedure:

```txt
approved exact artifact
-> Codex preflight
-> JEASON manual npm publish with private owner 2FA
-> public npm verification
-> immutable tag at approved source commit
-> GitHub prerelease
-> public installation test
-> evidence recorded
-> human review before merge
```

Codex may prepare and verify the release execution. JEASON performs the first
`npm publish` locally with owner 2FA. No password, 2FA code, recovery code,
token or secret may be sent to Codex, GitHub, a pull request, logs or files.

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
- root `package.json` keeps `private: true`;
- staged Community tarball `package.json` does not contain `private: true`;
- staged Community tarball `publishConfig.access` is `public`;
- staged Community tarball `publishConfig.registry` is `https://registry.npmjs.org/`;
- staged Community tarball `publishConfig.tag` is `alpha`;
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
uses: ./
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
- verifies the root package remains `private: true`;
- generates a staged Community package manifest without `private: true`;
- sets staged Community package `publishConfig.access` to `public`;
- sets staged Community package `publishConfig.registry` to `https://registry.npmjs.org/`;
- sets staged Community package `publishConfig.tag` to `alpha`;
- calculates the planned tag from the version;
- runs `npm pack --json`;
- validates the exact package file list;
- rejects forbidden package contents;
- calculates SHA-256;
- writes a checksum file;
- writes a release candidate manifest;
- copies release notes;
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
  "publication_ready": false,
  "package_private": false,
  "package_publish_access": "public",
  "package_publish_registry": "https://registry.npmjs.org/",
  "package_publish_tag": "alpha"
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

```txt
VERSION: 0.1.0-alpha.0
PUBLICATION APPROVED: YES
APPROVED BY: JEASON
APPROVAL DATE: 2026-07-12
NPM DIST-TAG: alpha
LATEST TAG MODIFIED: TEMPORARILY ACCEPTED AS 0.1.0-alpha.0
FIRST PUBLICATION AUTH: manual npm CLI with owner 2FA
NPM AUTOMATION TOKEN: none
TEMPORARY LOCAL OWNER LOGIN: authorized for controlled first publication only
LOCAL LOGIN STORAGE: owner device ~/.npmrc only
CREDENTIAL SHARING: forbidden
POST-PUBLICATION ACTION: npm logout immediately after verification
FUTURE AUTH: Trusted Publishing OIDC after initial package creation
```

NPM DIST-TAG:

```txt
alpha
```

LATEST TAG MODIFIED:

```txt
TEMPORARILY ACCEPTED AS 0.1.0-alpha.0
```

FIRST PUBLICATION AUTH:

```txt
manual npm CLI with owner 2FA
```

NPM AUTOMATION TOKEN:

```txt
none
```

TEMPORARY LOCAL OWNER LOGIN:

```txt
authorized for controlled first publication only
```

LOCAL LOGIN STORAGE:

```txt
owner device ~/.npmrc only
```

CREDENTIAL SHARING:

```txt
forbidden
```

POST-PUBLICATION ACTION:

```txt
npm logout immediately after verification
```

FUTURE AUTH:

```txt
Trusted Publishing OIDC after initial package creation
```

Current immutable tag:

```txt
v0.1.0-alpha.0
```

Tag status:

```txt
created
```

The Community release workflow prepares and validates the release candidate.
Actual tag creation remains outside this workflow. The tag was created after the
recorded owner decision accepting the unexpected npm `latest` dist-tag temporarily until the first stable release.
No new npm operation is authorized.

## Future Rollback Procedure

When public release exists, rollback must be handled in a dedicated release decision:

- do not move immutable full-version tags;
- publish a corrected version if needed;
- document the issue in release notes;
- update moving major references only after validation;
- keep affected artifacts traceable.

Rollback or remediation is not active in this workflow step. npm publication has
succeeded, and the unexpected `latest` dist-tag is accepted temporarily by owner decision
until the first stable release. Further npm action remains forbidden; the Git tag and GitHub prerelease have been created and now require evidence review.

## Publication Blockers

- final Community tarball content approved.
- explicit publication approval granted.
- npm publication succeeded for `@timeproofs/agentready@0.1.0-alpha.0`.
- npm `alpha` dist-tag observed as `0.1.0-alpha.0`.
- npm `latest` dist-tag unexpectedly observed as `0.1.0-alpha.0`.
- attempted `latest` removal failed with E400; no dist-tag was removed.
- immutable tag `v0.1.0-alpha.0` created and remotely verified.
- GitHub Release created and marked prerelease.
- trusted publishing provenance not configured for future automated publication.
- owner decision on the unexpected `latest` deviation recorded as ACCEPT_TEMPORARILY.
- all future prereleases must be published explicitly with npm dist-tag `alpha`;

## Controlled Continuation After Latest Decision

After immutable Git tag and GitHub prerelease creation:

- JEASON has accepted temporarily that `latest` points to `0.1.0-alpha.0` until the first stable release;
- Codex must not retry npm dist-tag removal, modify `alpha`, modify `latest`,
  deprecate, unpublish or republish without a new explicit instruction;
- the immutable tag points exactly to
  `150da23932c1fb9433cb3d546904f03c18c909e9`;
- the GitHub Release references the approved artifact and evidence;
- the GitHub Release is a prerelease, not draft, and not marked latest.

## Mandatory Limitation

TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
