# AgentReady Community License Decision

Status: LEGAL REVIEW REQUIRED

FINAL LICENSE APPROVAL REQUIRED BEFORE PUBLICATION

This document records the current licensing state for a future AgentReady Community publication. It does not change `LICENSE` or `package.json`.

## Current Repository State

`package.json` declares:

```json
"license": "SEE LICENSE IN LICENSE"
```

The current `LICENSE` file begins with MIT License text, then includes additional TimeProofs protocol and trademark terms tied to legacy ProofSpec and timestamp/proof-of-existence material.

Current blocker:

```txt
legacy LICENSE references unresolved
```

## Current Tarball License Exposure

The npm package automatically includes:

- `LICENSE`;
- `README.md`;
- `package.json`.

Because `LICENSE` is included in the tarball, its ProofSpec and legacy TimeProofs protocol terms would be shipped to Community users unless resolved before publication.

## Intended Public Layers

The following layers are intended to be public or publicly auditable, subject to final license approval:

- AgentReady Community CLI;
- GitHub Action;
- `agentready.json` format;
- AR rule taxonomy;
- Community rule documentation;
- bad/fixed examples;
- Community rule format.

## TimeProofs And AgentReady Marks

The names `TimeProofs` and `AgentReady` should remain protected product or brand identifiers. A code license decision must not imply unrestricted trademark rights.

## Assets Not Included In Community Publication

The following assets are not part of the Community package publication decision:

- Pro services;
- licensing service;
- entitlement service;
- advanced rule packs;
- calibration;
- full benchmark corpus;
- internal benchmark data;
- advanced differential engine;
- enriched future SARIF workflows;
- Team or Agency features.

## Dependency License Audit

Current package runtime dependencies:

```txt
none
```

The CLI package uses Node.js built-ins and local repository files. There are currently no third-party runtime dependencies to publish in the package metadata.

## Decision Status

No final license change is made in this PR.

Publication remains blocked until:

- the owner approves the AgentReady Community license;
- legal review confirms whether the current MIT text plus additional terms is appropriate;
- ProofSpec references in `LICENSE` are removed, replaced, or explicitly retained with a clear reason;
- package `README.md`, `package.json`, and `LICENSE` are coherent for AgentReady Community.

## Publication Impact

Publication is blocked.
