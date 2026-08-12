# TimeProofs Supply-Chain & Release Security

Status: WORLD-CLASS GATE BASELINE

## Goals

A TimeProofs release must be reproducible, attributable to reviewed source, minimally privileged, and verifiable by downstream consumers.

## Current M7 baseline

- root workspace is dependency-free at runtime;
- `package-lock.json` is committed;
- CI uses `npm ci --ignore-scripts`;
- third-party GitHub Actions are pinned by full commit SHA in TimeProofs release-quality workflows;
- checkout credentials are not persisted in test workflows;
- GitHub token permission defaults are reduced to `contents: read` where no broader permission is required.

## Before first public npm release

The release must not be considered production-ready until all of the following are implemented and evidenced:

1. dedicated publishable TimeProofs package boundary, excluding legacy AgentReady files;
2. SemVer policy and changelog;
3. npm Trusted Publishing / OIDC rather than a long-lived npm automation token;
4. npm provenance enabled for public release;
5. generated SBOM for the release artifact;
6. artifact attestation/provenance from GitHub Actions;
7. immutable release tag and GitHub Release;
8. package-content smoke test from the packed tarball in a clean temp directory;
9. package digest recorded in release evidence;
10. release workflow permissions explicitly documented and minimal.

## Dependency policy

Dependencies are not added for convenience when a small standard-library implementation is safer and maintainable. Any new runtime dependency requires:

- explicit job-to-be-done;
- license review;
- maintenance/security review;
- lockfile update;
- CI coverage;
- consideration of whether the dependency executes install scripts or native code.

## GitHub Actions policy

Release/security-critical workflows pin third-party Actions to immutable commit SHAs. Version tags may be documented for readability but are not the trust anchor.

## Secrets

- no long-lived publishing token in repository files;
- no checkout proof/JWT in generated TimeProofs result artifacts;
- secrets must not be printed to logs or summaries;
- future cloud credentials require environment-level protection and least privilege.

## Release evidence

Each production release should eventually produce one evidence bundle containing:

- source commit SHA;
- package version;
- pack/core/adapter versions;
- test matrix result;
- SBOM;
- provenance/attestation identifiers;
- package digest;
- changelog/migration note;
- compatibility statement.

## Non-claim

The existence of this policy is not itself a SLSA level or third-party security certification. TimeProofs must only claim controls that are actually implemented and evidenced by the release pipeline.
