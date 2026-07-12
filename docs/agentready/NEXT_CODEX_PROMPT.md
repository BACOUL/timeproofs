GENERATED FILE — DO NOT EDIT MANUALLY

Canonical source:
docs/agentready/AGENTREADY_EXECUTION_LEDGER.json

# Next Codex Prompt

Repository: BACOUL/timeproofs
Base: timeproofs
Batch ID: ARB-COM-001
Work item IDs: AR-COM-006
Owner: CODEX_AND_JEASON
Milestone: M3
Horizon: BEFORE_COMMUNITY_PUBLICATION
Objective: Publish Community CLI and immutable release.
Branch: release-agentready-community-cli
PR title: release(agentready): publish Community CLI and immutable release

Documents sources:
  - docs/agentready/COMMUNITY_PUBLICATION_POLICY.md
  - docs/agentready/COMMUNITY_RELEASE_WORKFLOW.md

Dependencies:
  - AR-COM-001
  - AR-COM-002
  - AR-COM-003
  - AR-COM-004
  - AR-COM-005
  - AR-COM-006A
  - AR-COM-006B

Deliverables:
  - Publish Community CLI and immutable release

Routes or surfaces:
  - one coherent file or surface family

Allowed paths:
  - CHANGELOG.md
  - docs/agentready/**

Forbidden paths:
  - package.json
  - packaging/agentready-community/**
  - agentready-core/**
  - bin/**
  - .github/workflows/**
  - .github/actions/**
  - LICENSE
  - NOTICE
  - *.html

Acceptance criteria by work item:
  - AR-COM-006: Codex verified the exact approved artifact before publication; JEASON performed the manual npm publish checkpoint with private owner 2FA; publication succeeded under npm dist-tag alpha; latest unexpectedly points to 0.1.0-alpha.0 and is accepted temporarily by JEASON until the first stable release; all future prereleases must be published explicitly with npm dist-tag alpha; immutable tag and GitHub Release remain pending and must not perform a new npm operation

Batch acceptance criteria:
  - Codex verified the exact approved artifact before publication
  - JEASON performed the manual npm publish checkpoint with private owner 2FA
  - publication succeeded under npm dist-tag alpha
  - latest unexpectedly points to 0.1.0-alpha.0 and is accepted temporarily by JEASON until the first stable release
  - all future prereleases must be published explicitly with npm dist-tag alpha
  - immutable tag and GitHub Release remain pending and must not perform a new npm operation

Commands:
  - node cli/tests/run-agentready-package-smoke-test.mjs

Independent test plan:
  - run relevant existing tests
  - run execution-system validator

Required evidence:
  - approved tarball SHA-256 verification
  - JEASON npm publication confirmation without secrets
  - npm package URL
  - documented latest exception
  - immutable tag
  - GitHub Release URL
  - public installation test

Rollback: Revert ARB-COM-001 without reverting unrelated batches.

Manual actions:
  - JEASON decision AR-COM-006B: ACCEPT_TEMPORARILY that npm latest points to 0.1.0-alpha.0 until the first stable release.
  - No new npm operation is authorized before immutable Git tag or GitHub Release creation.
  - All future prereleases must be published explicitly with npm dist-tag alpha.
  - Codex must never request, receive, print or store an npm password, 2FA code, recovery code or token.

Authorized external actions:
  - verify that @timeproofs/agentready@0.1.0-alpha.0 is published and that alpha points to 0.1.0-alpha.0
  - record that latest also points to 0.1.0-alpha.0 and is temporarily accepted until the first stable release
  - create immutable Git tag v0.1.0-alpha.0 pointing exactly to commit 150da23932c1fb9433cb3d546904f03c18c909e9 after npm publication succeeds
  - create the corresponding GitHub Release after npm publication succeeds
  - attach or reference the exact approved tarball, checksum and approved release notes

## Étape Codex préalable

  - verify the approved source commit 150da23932c1fb9433cb3d546904f03c18c909e9
  - confirm the approved tarball SHA-256 remains 602799c5dd20ada03f2ee5e27048bacd865a71654e1c09f8119a484c837da6fe in the recorded evidence
  - confirm package @timeproofs/agentready version 0.1.0-alpha.0 is published
  - confirm alpha points to 0.1.0-alpha.0
  - confirm latest also points to 0.1.0-alpha.0 and that this is temporarily accepted by JEASON until the first stable release
  - confirm no new npm operation is performed


## Après confirmation npm

  - verify the public npm package page exists
  - verify @timeproofs/agentready@0.1.0-alpha.0 exists under alpha
  - verify latest remains documented as temporarily accepted and do not modify it
  - create v0.1.0-alpha.0 pointing exactly to 150da23932c1fb9433cb3d546904f03c18c909e9
  - create the corresponding GitHub Release
  - record npm, tag, GitHub Release and public installation evidence in the publication PR

External verifications:
  - None

Forbidden actions:
  - do not perform any new npm operation
  - do not reconnect to npm
  - do not retry removal of the npm latest dist-tag
  - do not unpublish or deprecate the package
  - do not publish from the PR head or the current governance merge commit
  - do not rebuild, modify or replace the approved tarball
  - do not publish another package version
  - do not create, move or modify the npm latest dist-tag
  - do not create manual npm tokens from the npm website
  - do not configure NPM_TOKEN, NODE_AUTH_TOKEN, automation tokens or CI npm tokens
  - do not request, receive, print, store or create npm authentication material
  - do not request, receive, print or store a password, 2FA code or recovery code
  - do not create the Git tag before npm publication is confirmed
  - do not point v0.1.0-alpha.0 to any commit other than 150da23932c1fb9433cb3d546904f03c18c909e9
  - do not create the GitHub Release before npm publication is confirmed
  - do not merge the publication PR automatically

Response format: summarize files changed, validations, workflow status, draft status, and any remaining human review.

