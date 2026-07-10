# AgentReady Community Tarball Public Content Audit

Status: BLOCKED UNTIL FINAL APPROVED ARTIFACT

This document records the planned public package contents and the checks required before publication.

## Package Metadata

Expected package:

```txt
@timeproofs/agentready
```

Expected version:

```txt
0.1.0-alpha.0
```

Package must remain private in this PR:

```json
"private": true
```

License field:

```json
"license": "SEE LICENSE IN LICENSE"
```

## Included By npm Automatically

- `package.json`
- `README.md`
- `LICENSE`

## Included By Package Whitelist

```txt
bin/agentready.js
agentready-core/*.js
agentready-core/simulation/*.js
```

## Expected Runtime Files

- `bin/agentready.js`
- `agentready-core/classify-action.js`
- `agentready-core/detect-risks.js`
- `agentready-core/extract-mcp-tools.js`
- `agentready-core/extract-operations.js`
- `agentready-core/generate-agentready-json.js`
- `agentready-core/index.js`
- `agentready-core/parse-mcp-tools.js`
- `agentready-core/parse-openapi.js`
- `agentready-core/parse-yaml.js`
- `agentready-core/report.js`
- `agentready-core/scan-mcp-tools.js`
- `agentready-core/score.js`
- `agentready-core/types.js`
- `agentready-core/simulation/parse-simulation-scenario.js`
- `agentready-core/simulation/run-static-simulation.js`
- `agentready-core/simulation/simulation-result.js`

## Expected Exclusions

The public package must not include:

- public HTML site;
- docs directory;
- tests;
- fixtures;
- backend;
- Stripe;
- dashboard;
- secrets;
- `.env`;
- release candidate artifacts;
- GitHub workflow internals not required at runtime.

## Current Blockers

- `LICENSE` still contains legacy ProofSpec/protocol/timestamp terms.
- `README.md` contains a historical proof-of-existence note and is automatically included.
- Final tarball SHA-256 must be produced by the Community release candidate workflow after blockers are closed.

## Publication Impact

Publication is blocked until the final artifact contents are inspected and the license/ProofSpec blockers are resolved or explicitly approved.
