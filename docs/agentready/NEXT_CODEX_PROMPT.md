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
  - AR-COM-006: Codex verifies the exact approved artifact before publication; JEASON performs the manual npm publish checkpoint with private owner 2FA; publication occurs only under npm dist-tag alpha; latest is not created, moved or modified; immutable tag and GitHub Release are created only after npm publication is confirmed; public install tested

Batch acceptance criteria:
  - Codex verifies the exact approved artifact before publication
  - JEASON performs the manual npm publish checkpoint with private owner 2FA
  - publication occurs only under npm dist-tag alpha
  - latest is not created, moved or modified
  - immutable tag and GitHub Release are created only after npm publication is confirmed
  - public install tested

Commands:
  - node cli/tests/run-agentready-package-smoke-test.mjs

Independent test plan:
  - run relevant existing tests
  - run execution-system validator

Required evidence:
  - approved tarball SHA-256 verification
  - JEASON npm publication confirmation without secrets
  - npm package URL
  - immutable tag
  - GitHub Release URL
  - public installation test

Rollback: Revert ARB-COM-001 without reverting unrelated batches.

Manual actions:
  - Codex verifies the approved artifact, checksum, package, version, source commit and alpha dist-tag before any publication.
  - JEASON runs the exact npm publish command locally and enters owner 2FA privately in his own terminal.
  - JEASON must never send or store his npm password, 2FA code, recovery codes or authentication secrets.
  - After npm publication succeeds, Codex verifies the public npm package before creating the authorized immutable Git tag and GitHub Release.

Authorized external actions:
  - publish the exact approved tarball as @timeproofs/agentready@0.1.0-alpha.0 under npm dist-tag alpha, through the JEASON manual checkpoint
  - create immutable Git tag v0.1.0-alpha.0 pointing exactly to commit 150da23932c1fb9433cb3d546904f03c18c909e9 after npm publication succeeds
  - create the corresponding GitHub Release after npm publication succeeds
  - attach or reference the exact approved tarball, checksum and approved release notes

## Étape Codex préalable

  - verify the approved source commit 150da23932c1fb9433cb3d546904f03c18c909e9
  - retrieve or use only the approved tarball
  - recalculate the tarball SHA-256 and confirm it is exactly 602799c5dd20ada03f2ee5e27048bacd865a71654e1c09f8119a484c837da6fe
  - confirm package @timeproofs/agentready, version 0.1.0-alpha.0, public access and npm dist-tag alpha
  - confirm latest will not be created, moved or modified
  - prepare the exact npm publish command
  - stop before any owner 2FA entry

## Point de contrôle propriétaire obligatoire

  - JEASON must verify the local SHA-256 is exactly 602799c5dd20ada03f2ee5e27048bacd865a71654e1c09f8119a484c837da6fe before publishing
  - JEASON runs npm publish "<path-to-approved-tarball>" --access public --tag alpha in his own local terminal
  - JEASON enters npm 2FA only in his own terminal
  - JEASON never communicates the 2FA code, password, recovery code or token to Codex
  - Codex waits for JEASON's npm publication result before continuing

## Après confirmation npm

  - verify the public npm package page exists
  - verify @timeproofs/agentready@0.1.0-alpha.0 exists under alpha
  - verify latest was not created or modified
  - create v0.1.0-alpha.0 pointing exactly to 150da23932c1fb9433cb3d546904f03c18c909e9
  - create the corresponding GitHub Release
  - record npm, tag, GitHub Release and public installation evidence in the publication PR

External verifications:
  - None

Forbidden actions:
  - do not publish from the PR head or the current governance merge commit
  - do not rebuild, modify or replace the approved tarball
  - do not publish another package version
  - do not create, move or modify the npm latest dist-tag
  - do not create or store an npm token
  - do not request, receive, print or store a password, 2FA code or recovery code
  - do not create the Git tag before npm publication is confirmed
  - do not point v0.1.0-alpha.0 to any commit other than 150da23932c1fb9433cb3d546904f03c18c909e9
  - do not create the GitHub Release before npm publication is confirmed
  - do not merge the publication PR automatically

Response format: summarize files changed, validations, workflow status, draft status, and any remaining human review.

