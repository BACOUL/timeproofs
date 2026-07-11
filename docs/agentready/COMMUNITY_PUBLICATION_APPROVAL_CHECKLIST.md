# AgentReady Community Publication Approval Checklist

Status: BLOCKED

This checklist is the explicit publication gate. This PR does not approve publication.

```txt
PUBLICATION APPROVED: NO
APPROVED BY:
APPROVED COMMIT:
APPROVED VERSION:
APPROVED TARBALL SHA-256:
APPROVAL DATE:
NPM DIST-TAG: alpha
LATEST TAG MODIFIED: NO
FIRST PUBLICATION AUTH: manual npm CLI with owner 2FA
NPM TOKEN: none
FUTURE AUTH: Trusted Publishing OIDC after initial package creation
```

## Tarball Content Approval

```txt
TARBALL CONTENT APPROVED: NO
TARBALL APPROVED BY: JEASON
TARBALL APPROVAL DATE: 2026-07-11
APPROVED SOURCE COMMIT: 61a5dab90afe6363f7ea386712bb8cdc48e9f665
APPROVED VERSION: 0.1.0-alpha.0
APPROVED TARBALL SHA-256: f1381d16277707cfc5d1005ed5e865139aa5a1ed0fcc1fb7de35c2f1a5eab77d
PUBLICATION AUTHORIZED BY THIS APPROVAL: NO
PREVIOUS TARBALL APPROVAL SUPERSEDED: YES
SUPERSEDED DATE: 2026-07-11
SUPERSEDED REASON: release channel corrected to alpha, changing the tarball content
```

The previous tarball content approval is retained as historical evidence only.
The corrected `alpha` channel changes the staged package README and
`package.json`, so a new owner approval must record the new source commit and
tarball SHA-256 before publication can be considered.

## Required Before Changing To YES

- npm scope ownership verified;
- npm package publishability verified;
- root repository package remains `private: true`;
- staged Community tarball package omits `private: true`;
- staged Community tarball package uses public npm `publishConfig`;
- staged Community tarball package uses `publishConfig.tag: alpha`;
- npm account access list documented;
- npm 2FA enabled or trusted publishing decision completed;
- AgentReady Community package license approved for the package boundary;
- package-public legacy references resolved by staged package assets;
- package tarball contents reviewed;
- tarball SHA-256 recorded;
- source commit recorded;
- GitHub Actions candidate workflow passed;
- changelog reviewed;
- release notes reviewed;
- immutable tag plan approved;
- GitHub Release plan approved;
- rollback/deprecation policy accepted.

## Current Decision

Publication remains blocked.
