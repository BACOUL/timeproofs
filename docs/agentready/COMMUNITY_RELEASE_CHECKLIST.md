# AgentReady Community Release Checklist

## Status Values

Use only:

- READY
- BLOCKED
- NOT_STARTED
- NOT_APPLICABLE

Publication status: BLOCKED
Publication execution status: NPM_PUBLISHED — UNEXPECTED_LATEST_REVIEW_REQUIRED

```txt
VERSION: 0.1.0-alpha.0
NPM DIST-TAG: alpha
LATEST TAG MODIFIED: UNEXPECTEDLY CREATED BY NPM
FIRST PUBLICATION AUTH: manual npm CLI with owner 2FA
NPM AUTOMATION TOKEN: none
TEMPORARY LOCAL OWNER LOGIN: authorized for controlled first publication only
LOCAL LOGIN STORAGE: owner device ~/.npmrc only
CREDENTIAL SHARING: forbidden
POST-PUBLICATION ACTION: npm logout immediately after verification
FUTURE AUTH: Trusted Publishing OIDC after initial package creation
PUBLICATION APPROVED: YES
APPROVED NPM DIST-TAG: alpha
IMMUTABLE GIT TAG AUTHORIZED: v0.1.0-alpha.0
GITHUB RELEASE AUTHORIZED: YES
LATEST TAG MODIFIED: UNEXPECTEDLY CREATED BY NPM
```

## Controlled Publication Execution Checkpoint

Status: NPM_PUBLISHED — UNEXPECTED_LATEST_REVIEW_REQUIRED
Preflight result: PASS
Preflight performed externally: NO
Codex binary inspection performed: YES
npm authentication status: LOGGED_OUT
approved login command: npm login --auth-type=web
temporary local owner login authorized: YES
npm automation token authorized: NO
post-publication logout required: YES
Approved artifact source: GitHub Actions artifact `agentready-community-release-candidate-0.1.0-alpha.0` from run `29169283466`
Approved tarball local inspection path: C:\Users\mattb\AppData\Local\Temp\agentready-preflight-approved-150da\unzipped\timeproofs-agentready-0.1.0-alpha.0.tgz

Package: @timeproofs/agentready
Version: 0.1.0-alpha.0
Approved source commit: 150da23932c1fb9433cb3d546904f03c18c909e9
Approved tarball SHA-256: 602799c5dd20ada03f2ee5e27048bacd865a71654e1c09f8119a484c837da6fe
npm dist-tag: alpha
Future immutable Git tag authorized: v0.1.0-alpha.0
Future Git tag target: 150da23932c1fb9433cb3d546904f03c18c909e9
latest modification authorized: NO
npm publication executed: YES
npm publication result: SUCCESS
published version: 0.1.0-alpha.0
publication confirmation: + @timeproofs/agentready@0.1.0-alpha.0
publication command used: npm publish ./timeproofs-agentready-0.1.0-alpha.0-approved.tgz --access public --tag alpha
published tarball SHA-256: 602799c5dd20ada03f2ee5e27048bacd865a71654e1c09f8119a484c837da6fe
alpha dist-tag: 0.1.0-alpha.0
latest dist-tag: 0.1.0-alpha.0
latest expected: NO
latest removal attempted: YES
latest removal command: npm dist-tag rm @timeproofs/agentready latest
latest removal result: E400 400 Bad Request DELETE /-/package/@timeproofs%2fagentready/dist-tags/latest
npm logout executed: YES
npm whoami after logout: ENEEDAUTH
Git tag created: NO
GitHub Release created: NO
continuation authorized: NO
Owner checkpoint required: YES

- package metadata verified from the approved tarball
- publishConfig.access = public
- publishConfig.registry = https://registry.npmjs.org/
- publishConfig.tag = alpha
- Apache-2.0
- dependencies empty
- no private: true in Community package
- LICENSE, NOTICE and README present
- no secret or .env
- no symbolic link
- no HTML
- no Pro, Stripe, backend or dashboard
- npm publication succeeded for @timeproofs/agentready@0.1.0-alpha.0
- alpha dist-tag observed after publication: 0.1.0-alpha.0
- latest dist-tag unexpectedly observed after publication: 0.1.0-alpha.0
- latest removal attempt failed with E400; no dist-tag was removed
- npm logout succeeded; npm whoami returned ENEEDAUTH after logout
- no npm password, 2FA code, recovery code, token or secret was recorded in the repository, GitHub, Codex, a PR or a workflow
- version command previously verified against the approved artifact evidence
- help command previously verified against the approved artifact evidence

Publication command executed by JEASON:

```sh
npm publish ./timeproofs-agentready-0.1.0-alpha.0-approved.tgz --access public --tag alpha
```

The command succeeded, but npm exposed `latest: 0.1.0-alpha.0` unexpectedly.
Continuation is not authorized until JEASON records a decision for this deviation.
No Git tag or GitHub Release may be created before that decision.

## Product

| Requirement | Status | Evidence |
|---|---|---|
| Core tests pass | READY | `node agentready-core/tests/run-agentready-core-tests.mjs` |
| CLI tests pass | READY | `node cli/tests/run-agentready-cli-tests.mjs` |
| Action tests pass | READY | `node cli/tests/run-agentready-action-smoke-test.mjs` |
| Package clean-install test passes | READY | `node cli/tests/run-agentready-package-smoke-test.mjs` |
| Community release workflow guard test passes | READY | `node cli/tests/run-agentready-community-release-workflow-test.mjs` |
| OpenAPI PASS scenario works | READY | Local Action workflow scenario |
| MCP PASS scenario works | READY | Local Action workflow scenario |
| Expected policy FAIL works | READY | Local Action workflow scenario |
| Exit code behavior is preserved | READY | CLI and Action tests |
| Markdown report is generated | READY | CLI, package, and Action tests |
| `agentready.json` contract is generated | READY | CLI, package, and Action tests |

## Package

| Requirement | Status | Evidence |
|---|---|---|
| Package name is `@timeproofs/agentready` | READY | `package.json` |
| Version is `0.1.0-alpha.0` | READY | `package.json` |
| Root repository package remains private | READY | root `package.json` keeps `private: true` |
| Community tarball package is technically publishable | READY | staged tarball `package.json` omits `private: true` and sets `publishConfig.access: public`, registry `https://registry.npmjs.org/`, and tag `alpha` |
| Tarball can be built | READY | `npm pack --json` through release candidate script |
| Tarball content is exact | READY | Release candidate script file-list assertion |
| Checksum is generated | READY | SHA-256 file |
| Clean installation works | READY | Package smoke test |
| Node.js 20 is required | READY | `engines.node` |
| License publication decision is approved | READY | Owner decision dated 2026-07-11: staged AgentReady Community package uses Apache-2.0 |
| npm scope ownership is confirmed | READY | Owner attestation dated 2026-07-11 confirms control of npm organization `timeproofs` and scope `@timeproofs` |
| Dedicated Community package assets exist | READY | `packaging/agentready-community/LICENSE`, `NOTICE`, and `README.md` |

## GitHub Action

| Requirement | Status | Evidence |
|---|---|---|
| Local composite action is tested | READY | `uses: ./.github/actions/agentready` |
| Inputs are documented | READY | `.github/actions/agentready/action.yml` |
| Outputs are documented | READY | `.github/actions/agentready/action.yml` |
| Policy FAIL preserves outputs | READY | Action integration workflow |
| Future immutable tag is defined | READY | `v0.1.0-alpha.0` candidate |
| Future immutable tag exists | BLOCKED | Tag not created |
| Development branch is not documented as stable | READY | Action usage/versioning docs |

## Legal

| Requirement | Status | Evidence |
|---|---|---|
| AgentReady Community package license validated | READY | Owner decision dated 2026-07-11: Apache-2.0 for package files only |
| Legacy root LICENSE excluded from Community package | READY | Release candidate script stages dedicated package assets |
| Package-public legacy references resolved | READY | `COMMUNITY_PROOFSPEC_REFERENCE_AUDIT.md` |
| Publisher identity confirmed | BLOCKED | Legal launch docs still require completion |
| Mandatory limitation is present | READY | Docs include limitation text |

## Publication

| Requirement | Status | Evidence |
|---|---|---|
| Explicit release approval recorded | READY | JEASON approval dated 2026-07-12 authorizes publication of `@timeproofs/agentready` version `0.1.0-alpha.0` from commit `150da23932c1fb9433cb3d546904f03c18c909e9` and tarball SHA-256 `602799c5dd20ada03f2ee5e27048bacd865a71654e1c09f8119a484c837da6fe`, exclusively under npm dist-tag `alpha`; immutable Git tag `v0.1.0-alpha.0` and corresponding GitHub Release are authorized but not yet created. |
| npm scope controlled | READY | Owner attestation dated 2026-07-11 |
| npm 2FA or trusted publishing policy validated | READY | npm 2FA enabled; trusted publishing preferred for future dedicated setup |
| Package made publishable after approval | READY | staged Community tarball package omits `private: true` and sets public npm publish config |
| Final tarball content approved | READY | JEASON approval dated 2026-07-11 for commit `150da23932c1fb9433cb3d546904f03c18c909e9`, version `0.1.0-alpha.0`, tarball SHA-256 `602799c5dd20ada03f2ee5e27048bacd865a71654e1c09f8119a484c837da6fe`, npm dist-tag `alpha` |
| npm publication executed | BLOCKED | npm publication succeeded for `@timeproofs/agentready@0.1.0-alpha.0`, but npm unexpectedly exposed `latest: 0.1.0-alpha.0`; removing `latest` failed with E400, so continuation is blocked pending owner decision. |
| Tag created on reviewed commit | BLOCKED | No tag created |
| Release notes verified | READY | Draft notes exist |
| GitHub Release created | BLOCKED | No GitHub Release exists |
| Public documentation updated after release | NOT_STARTED | Requires actual release |

## Mandatory Limitation

TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
