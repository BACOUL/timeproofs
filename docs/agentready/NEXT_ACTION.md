GENERATED FILE — DO NOT EDIT MANUALLY

Canonical source:
docs/agentready/AGENTREADY_EXECUTION_LEDGER.json

# Next Action

Batch ID: ARB-COM-001
Title: Publish Community CLI and immutable release
Action owner: CODEX_AND_JEASON
Action type: READY
Status: READY
Specification: EXECUTION_READY
Objective:
Publish Community CLI and immutable release.

Work items:
  - AR-COM-006

Required evidence:
  - approved tarball SHA-256 verification
  - JEASON npm publication confirmation without secrets
  - npm package URL
  - immutable tag
  - GitHub Release URL
  - public installation test

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

