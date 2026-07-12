# AgentReady Community Publication Policy

Status: ACTIVE PUBLICATION POLICY

Publication authorization is recorded.
Execute only the controlled publication handoff.

## Planned Package

```txt
@timeproofs/agentready
```

Current approved version:

```txt
0.1.0-alpha.0
```

The root repository `package.json` must remain:

```json
"private": true
```

This protects the repository root against accidental publication.

The staged AgentReady Community tarball `package.json` must be technically publishable:

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

Publication is authorized only for the exact approved artifact and only through
the controlled handoff described below. The publication has not yet been
executed.

## Alpha Release Channel

```txt
VERSION: 0.1.0-alpha.0
PUBLICATION APPROVED: YES
APPROVED BY: JEASON
APPROVAL DATE: 2026-07-12
APPROVED VERSION: 0.1.0-alpha.0
APPROVED SOURCE COMMIT: 150da23932c1fb9433cb3d546904f03c18c909e9
APPROVED TARBALL SHA-256: 602799c5dd20ada03f2ee5e27048bacd865a71654e1c09f8119a484c837da6fe
NPM DIST-TAG: alpha
LATEST TAG MODIFIED: NO
FIRST PUBLICATION AUTH: manual npm CLI with owner 2FA
NPM AUTOMATION TOKEN: none
TEMPORARY LOCAL OWNER LOGIN: authorized for controlled first publication only
LOCAL LOGIN STORAGE: owner device ~/.npmrc only
CREDENTIAL SHARING: forbidden
POST-PUBLICATION ACTION: npm logout immediately after verification
FUTURE AUTH: Trusted Publishing OIDC after initial package creation
```

The first publication of `0.1.0-alpha.0` is approved only for the explicit npm
`alpha` dist-tag. It must not create, move or rely on the implicit `latest`
tag.

## Authorized Publication Source

Publication may only occur from:

- the approved source commit `150da23932c1fb9433cb3d546904f03c18c909e9`;
- the exact approved tarball SHA-256 `602799c5dd20ada03f2ee5e27048bacd865a71654e1c09f8119a484c837da6fe`;
- the reviewed approval recorded for `AR-COM-006A`;
- the controlled publication task `AR-COM-006`.

Publication is forbidden from:

- the PR head;
- the current governance merge commit;
- an unverified local commit;
- a dirty working tree;
- any tarball rebuilt or modified after approval.

## Approval Authority

Approver:

```txt
JEASON
```

Explicit publication approval is recorded for the exact artifact and version
above. No automatic publication is allowed.

## Controlled Publication Handoff

The only approved initial `npm publish` path is:

1. Codex verifies the approved source commit, tarball SHA-256, package name,
   version, public access and npm dist-tag `alpha`.
2. Codex prepares the exact command but stops before any 2FA entry.
3. JEASON runs the npm publication command locally from his own terminal.
4. JEASON enters owner 2FA privately in his own terminal.
5. JEASON never sends or stores his npm password, 2FA code, recovery codes or
   npm secrets in Codex, GitHub, a PR, logs or files.
6. Codex waits for JEASON's npm publication result.
7. After npm publication succeeds, Codex verifies the public npm package before
   creating the authorized immutable Git tag and GitHub Release.

Equivalent owner command:

```txt
npm publish "<path-to-approved-tarball>" --access public --tag alpha
```

Before that command runs, the local tarball SHA-256 must be exactly:

```txt
602799c5dd20ada03f2ee5e27048bacd865a71654e1c09f8119a484c837da6fe
```

## npm Authentication Policy

Preferred future method:

```txt
trusted publishing, if npm scope/package support and owner policy allow it
```

First-publication method for `0.1.0-alpha.0`:

```txt
manual npm CLI with owner 2FA
```

The only authorized npm authentication for the first publication is a temporary
local owner login created automatically by:

```sh
npm login --auth-type=web
```

This login may be stored only in JEASON's personal `~/.npmrc` on the owner
device used for the controlled publication. It may be used only to publish the
exact approved artifact and must be removed immediately after publication and
verification with:

```sh
npm logout
```

Trusted Publishing OIDC remains the preferred future method after initial
package creation and a dedicated configuration PR.

Required security:

- npm 2FA enabled for owner accounts, unless trusted publishing fully replaces token use for publication;
- no long-lived npm token stored in the repository;
- no manually created npm token from the npm website;
- no npm automation token or CI token;
- no `NPM_TOKEN`;
- no `NODE_AUTH_TOKEN`;
- no publication credentials in docs, workflows, or logs;
- no password, 2FA code, recovery code or token may be requested, received, printed or stored by Codex;
- no npm credential may be stored outside the temporary local owner `~/.npmrc`;
- `npm logout` is required immediately after publication and verification;
- no `id-token: write` permission until a dedicated trusted-publishing PR is approved.

Owner security verification recorded on 2026-07-11:

- npm account `bacoul` has 2FA enabled;
- no long-lived npm token has been created or stored for AgentReady publication;
- temporary local owner login is authorized only for the controlled first publication;
- no npm secret may be committed to the repository;
- npm recovery codes must never be recorded in the repository;
- trusted publishing should be preferred when it is technically configured and explicitly approved.

This verification supports the approved manual publication path. It does not
authorize any secret to be transmitted, stored or logged.

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

The GitHub Actions Community release candidate workflow must also pass on the
reviewed source commit. The workflow remains read-only and cannot publish.

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

During controlled publication:

1. Changelog entry must be reviewed.
2. npm publication must match the approved version and SHA-256.
3. Immutable tag `v0.1.0-alpha.0` must be created only after npm publication succeeds.
4. The immutable tag must point exactly to `150da23932c1fb9433cb3d546904f03c18c909e9`.
5. GitHub Release must point to the approved commit and tarball.

No tag or GitHub Release is created in this authorization PR.

## Rollback And Deprecation

If a published package must be withdrawn:

- prefer `npm deprecate` for flawed versions;
- publish a fixed version when possible;
- unpublish only when legally or operationally necessary and within npm policy limits;
- document the incident and remediation.

## Automation And Secret Ban

Outside the controlled publication handoff, no process may:

- run `npm publish`;
- remove `private: true` from the root repository `package.json`;
- create, move or modify `latest`;
- create a Marketplace listing;
- add npm credentials;
- request, receive, print or store an npm password, 2FA code, recovery code or token;
- enable automatic publication.
