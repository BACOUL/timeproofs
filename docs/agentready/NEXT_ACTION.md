GENERATED FILE — DO NOT EDIT MANUALLY

Canonical source:
docs/agentready/AGENTREADY_EXECUTION_LEDGER.json

# Next Action

Batch ID: ARB-COM-001
Title: Publish Community CLI and immutable release
Action owner: JEASON
Action type: REVIEW_OR_MERGE
Status: IN_REVIEW
Specification: EXECUTION_READY
Objective:
Publish Community CLI and immutable release.

Work items:
  - AR-COM-006

Required evidence:
  - approved tarball SHA-256 verification
  - JEASON npm publication confirmation without secrets
  - npm package URL
  - documented latest exception
  - immutable tag
  - GitHub Release URL

Manual actions:
  - JEASON decision AR-COM-006B: ACCEPT_TEMPORARILY that npm latest points to 0.1.0-alpha.0 until the first stable release.
  - No new npm operation is authorized after publication; immutable Git tag and GitHub Release evidence is now in review.
  - All future prereleases must be published explicitly with npm dist-tag alpha.
  - Codex must never request, receive, print or store an npm password, 2FA code, recovery code or token.

Authorized external actions:
  - verify that @timeproofs/agentready@0.1.0-alpha.0 is published and that alpha points to 0.1.0-alpha.0
  - record that latest also points to 0.1.0-alpha.0 and is temporarily accepted until the first stable release
  - record immutable Git tag v0.1.0-alpha.0 pointing exactly to commit 150da23932c1fb9433cb3d546904f03c18c909e9
  - record the corresponding GitHub prerelease at https://github.com/BACOUL/timeproofs/releases/tag/v0.1.0-alpha.0
  - record the exact approved tarball, checksum and approved release notes

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

