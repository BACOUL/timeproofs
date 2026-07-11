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

The root repository `package.json` must remain:

```json
"private": true
```

This protects the repository root against accidental publication.

The staged AgentReady Community tarball `package.json` must be technically publishable after approval:

```json
{
  "license": "Apache-2.0",
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org/",
    "tag": "alpha"
  }
}
```

The staged tarball package must not contain `private: true`.

Publication remains forbidden until final tarball approval and explicit release approval are recorded.

## Alpha Release Channel

```txt
VERSION: 0.1.0-alpha.0
NPM DIST-TAG: alpha
LATEST TAG MODIFIED: NO
FIRST PUBLICATION AUTH: manual npm CLI with owner 2FA
NPM TOKEN: none
FUTURE AUTH: Trusted Publishing OIDC after initial package creation
PUBLICATION APPROVED: NO
```

The first publication of `0.1.0-alpha.0`, if later approved, must use the
explicit npm `alpha` dist-tag. It must not create, move or rely on the
implicit `latest` tag.

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

First-publication method for `0.1.0-alpha.0`:

```txt
manual npm CLI with owner 2FA
```

No npm token is to be created or stored for the first publication. Trusted
Publishing OIDC remains the preferred future method after initial package
creation and a dedicated configuration PR.

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
- root `package.json` remains `private: true`;
- staged package `package.json` does not contain `private: true`;
- staged package `publishConfig.access` is `public`;
- staged package `publishConfig.registry` is `https://registry.npmjs.org/`;
- staged package `publishConfig.tag` is `alpha`;
- staged package `package.json` license is `Apache-2.0`;
- staged package includes the dedicated Apache-2.0 `LICENSE`;
- staged package includes `NOTICE`;
- staged package includes the dedicated Community `README.md`;
- exact file list;
- no secrets;
- no `.env`;
- no public HTML site;
- no backend;
- no Stripe;
- no dashboard;
- no private data;
- no root repository `LICENSE` in the tarball;
- no root repository `README.md` in the tarball;
- no package-public legacy ProofSpec or timestamp language;
- `README.md`, `package.json`, `NOTICE`, and `LICENSE` coherence;
- SHA-256 checksum;
- source commit SHA;
- release manifest.

The Community package boundary must be built from:

```txt
packaging/agentready-community/
```

The root repository `LICENSE` remains outside the npm package boundary.

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
- remove `private: true` from the root repository `package.json`;
- create a tag;
- create a GitHub Release;
- create a Marketplace listing;
- add npm credentials;
- enable automatic publication.
