# AgentReady Community Publication Execution

Status: AWAITING_OWNER_NPM_PUBLICATION

Preflight result: PASS
Preflight performed externally: YES
Codex binary inspection performed: NO

This document records the owner-provided external preflight evidence for the approved AgentReady Community tarball. The mobile Codex interface did not provide the approved `.tgz` file to the workspace, so Codex did not directly inspect, rebuild, modify, recompress or replace the binary artifact.

## Approved Artifact

Package: @timeproofs/agentready
Version: 0.1.0-alpha.0
Approved source commit: 150da23932c1fb9433cb3d546904f03c18c909e9
Approved tarball SHA-256: 602799c5dd20ada03f2ee5e27048bacd865a71654e1c09f8119a484c837da6fe
npm dist-tag: alpha
Future immutable Git tag authorized: v0.1.0-alpha.0
Future Git tag target: 150da23932c1fb9433cb3d546904f03c18c909e9
latest modification authorized: NO
npm publication executed: NO
Git tag created: NO
GitHub Release created: NO
Owner checkpoint required: YES

## Externally Verified Preflight Evidence

- Package metadata conforms to the approved artifact.
- `publishConfig.access` is `public`.
- `publishConfig.registry` is `https://registry.npmjs.org/`.
- `publishConfig.tag` is `alpha`.
- License is `Apache-2.0`.
- Dependencies are empty.
- `private: true` is absent from the Community package.
- `LICENSE`, `NOTICE` and `README.md` are present.
- No secret or `.env` file is present.
- No symbolic link is present.
- No HTML file is present.
- No Pro, Stripe, backend or dashboard component is present.
- `npm publish --dry-run --access public --tag alpha` passed externally.
- Clean local installation passed externally.
- `agentready --version` returned `0.1.0-alpha.0`.
- `agentready --help` passed externally.

## Prepared Owner Command

Prepared but not executed by Codex:

```sh
npm publish "<chemin-local-vers-le-tarball-approuve>" --access public --tag alpha
```

Before running the command, JEASON must verify that the local tarball SHA-256 is exactly:

```txt
602799c5dd20ada03f2ee5e27048bacd865a71654e1c09f8119a484c837da6fe
```

## Owner Checkpoint

JEASON will execute the npm publication command himself in his own local terminal.

JEASON will enter the npm 2FA code only in his own terminal.

JEASON must not transmit any npm password, 2FA code, recovery code or npm token to Codex, GitHub, a pull request, a log or a repository file.

Codex must not ask for or receive any npm password, 2FA code, recovery code or npm token.

Codex must wait for JEASON's npm publication confirmation before any future Git tag or GitHub Release step.

## Not Yet Performed

- Real npm publication.
- Creation of `v0.1.0-alpha.0`.
- Creation of the GitHub Release.
- Modification of the npm `latest` dist-tag.
- Completion of `AR-COM-006`.
- Completion of `ARB-COM-001`.
