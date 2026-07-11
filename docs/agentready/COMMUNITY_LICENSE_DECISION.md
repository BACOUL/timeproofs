# AgentReady Community License Decision

Status: ACTIVE DECISION

Publication status: NOT PUBLISHED

Decision date: 2026-07-11

Decision owner: Jeason Bacoul

## Decision

The future public npm package:

```txt
@timeproofs/agentready
```

will be distributed as AgentReady Community under:

```txt
Apache License 2.0
SPDX: Apache-2.0
```

This decision applies only to the files actually included in the staged
AgentReady Community npm package.

It does not relicense the whole `BACOUL/timeproofs` repository.

## Repository License Separation

The root `LICENSE` file remains unchanged. It contains historical TimeProofs
and ProofSpec terms and is not included in the AgentReady Community package
candidate.

The Community package has dedicated package assets under:

```txt
packaging/agentready-community/
```

Those package assets provide the npm distribution boundary:

- `LICENSE`: unmodified Apache License 2.0 text;
- `NOTICE`: factual attribution and trademark note;
- `README.md`: npm-focused AgentReady Community README.

The release candidate script stages these assets into the package root before
running `npm pack`.

## Trademark Boundary

The names `TimeProofs` and `AgentReady` are product names. The Apache License
2.0 does not grant trademark rights.

Descriptive uses that are normally legally allowed remain possible, but forks,
packages, services or reports must not claim to be official, approved,
certified or affiliated with TimeProofs unless that status is separately
granted.

This document does not claim that the marks are registered.

## Excluded Assets

The Apache-2.0 Community package decision does not include:

- AgentReady Pro;
- license and entitlement services;
- backend or hosted services;
- billing and customer account services;
- proprietary advanced rules;
- internal calibration;
- full benchmark corpus;
- internal benchmark data;
- advanced differential engine;
- Team or Agency features;
- secrets, infrastructure or internal operations.

## Contributor And Rights Audit

Audit scope:

- `bin/agentready.js`;
- `agentready-core/*.js`;
- `agentready-core/simulation/*.js`.

Git history reviewed on 2026-07-11 shows only these author identities on the
package-boundary source files:

- `BACOUL`;
- `Codex`.

No third-party substantive contributor was identified in that audited history.
No private email address is recorded in this document.

Current package runtime dependencies:

```txt
none
```

The package uses Node.js built-ins and local AgentReady Community source files.

## Publication Impact

`AR-COM-003 — Approve AgentReady Community license` is resolved by owner
decision for the package boundary.

This does not approve publication.

Publication remains blocked until the final Community tarball content,
publication approval, tag, release and npm publication gates are explicitly
completed.
