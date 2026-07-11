# AgentReady Community Publication Policy

Status: ACTIVE PUBLICATION POLICY

Resolve blockers now.
Publish nothing now.

## Planned Package

```txt
@timeproofs/agentready
```

Current candidate version:

```txt
0.1.0-alpha.0
```

The package must remain:

```json
"private": true
```

until an explicit publication approval PR changes it.

## Authorized Publication Source

Publication may only occur from:

- a reviewed commit already merged into `timeproofs`;
- a commit whose candidate workflow has completed successfully;
- an approved immutable release commit;
- a version whose tarball SHA-256 is recorded in the approval checklist.

Publication is forbidden from:

- an open pull request;
- a draft pull request;
- an unverified local commit;
- a dirty working tree;
- a branch that is not the approved release source.

## Approval Authority

Approver:

```txt
TO_BE_COMPLETED_BY_OWNER
```

No automatic publication is allowed without explicit approval.

## npm Authentication Policy

Preferred future method:

```txt
trusted publishing, if npm scope/package support and owner policy allow it
```

Required security:

- npm 2FA enabled for owner accounts, unless trusted publishing fully replaces token use for publication;
- no long-lived npm token stored in the repository;
- no `NPM_TOKEN`;
- no `NODE_AUTH_TOKEN`;
- no publication credentials in docs, workflows, or logs;
- no `id-token: write` permission until a dedicated trusted-publishing PR is approved.

Owner security verification recorded on 2026-07-11:

- npm account `bacoul` has 2FA enabled;
- no long-lived npm token has been created or stored for AgentReady publication;
- no npm secret may be committed to the repository;
- npm recovery codes must never be recorded in the repository;
- trusted publishing should be preferred when it is technically configured and explicitly approved.

This verification does not authorize publication.

## Required Tests Before Publication

Run at minimum:

```txt
node scripts/validate-agentready-strategy-docs.mjs
node scripts/validate-agentready-publication-blockers.mjs
node agentready-core/tests/run-agentready-core-tests.mjs
node cli/tests/run-agentready-cli-tests.mjs
node cli/tests/run-agentready-action-smoke-test.mjs
node cli/tests/run-agentready-package-smoke-test.mjs
node cli/tests/run-agentready-community-release-workflow-test.mjs
```

The GitHub Actions Community release candidate workflow must also pass on the reviewed source commit.

## Required Tarball Inspection

Before publication, verify:

- package name;
- version;
- `private: true` until publication approval;
- exact file list;
- no secrets;
- no `.env`;
- no public HTML site;
- no backend;
- no Stripe;
- no dashboard;
- no private data;
- `README.md`, `package.json`, and `LICENSE` coherence;
- SHA-256 checksum;
- source commit SHA;
- release manifest.

## Changelog, Tag, And Release

Before publication:

1. Changelog entry must be reviewed.
2. Immutable tag must be created only after approval.
3. GitHub Release must point to the approved commit and tarball.
4. npm publication must match the approved version and SHA-256.

No tag or GitHub Release is created in this PR.

## Rollback And Deprecation

If a published package must be withdrawn:

- prefer `npm deprecate` for flawed versions;
- publish a fixed version when possible;
- unpublish only when legally or operationally necessary and within npm policy limits;
- document the incident and remediation.

## Publication Ban

This PR must not:

- run `npm publish`;
- remove `private: true`;
- create a tag;
- create a GitHub Release;
- create a Marketplace listing;
- add npm credentials;
- enable automatic publication.
