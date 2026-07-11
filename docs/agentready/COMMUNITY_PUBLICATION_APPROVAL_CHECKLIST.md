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
```

## Required Before Changing To YES

- npm scope ownership verified;
- npm package publishability verified;
- root repository package remains `private: true`;
- staged Community tarball package omits `private: true`;
- staged Community tarball package uses public npm `publishConfig`;
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
