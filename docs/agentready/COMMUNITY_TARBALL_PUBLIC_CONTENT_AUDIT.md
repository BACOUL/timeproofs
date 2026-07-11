# AgentReady Community Tarball Public Content Audit

Status: BLOCKED UNTIL FINAL APPROVED ARTIFACT

This document records the planned public package contents and the checks
required before publication.

## Package Metadata

Expected package:

```txt
@timeproofs/agentready
```

Expected version:

```txt
0.1.0-alpha.0
```

The root repository package must remain private:

```json
"private": true
```

The staged Community tarball package must be technically publishable after approval:

```json
{
  "license": "Apache-2.0",
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org/"
  }
}
```

The staged Community tarball package must not contain `private: true`.

Staged Community package license field:

```json
"license": "Apache-2.0"
```

The root repository `package.json` and `LICENSE` remain unchanged. They are
not the staged package manifest or package license.

## Dedicated Package Assets

The Community tarball is built from a staging directory that copies:

```txt
packaging/agentready-community/LICENSE -> LICENSE
packaging/agentready-community/NOTICE -> NOTICE
packaging/agentready-community/README.md -> README.md
```

## Expected Files

```txt
LICENSE
NOTICE
README.md
package.json
bin/agentready.js
agentready-core/classify-action.js
agentready-core/detect-risks.js
agentready-core/extract-mcp-tools.js
agentready-core/extract-operations.js
agentready-core/generate-agentready-json.js
agentready-core/index.js
agentready-core/parse-mcp-tools.js
agentready-core/parse-openapi.js
agentready-core/parse-yaml.js
agentready-core/report.js
agentready-core/scan-mcp-tools.js
agentready-core/score.js
agentready-core/types.js
agentready-core/simulation/parse-simulation-scenario.js
agentready-core/simulation/run-static-simulation.js
agentready-core/simulation/simulation-result.js
```

## Expected Exclusions

The public package must not include:

- root repository `LICENSE`;
- root repository `README.md`;
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
- GitHub workflow internals not required at runtime;
- Pro, Team or Agency implementation;
- package-public historical ProofSpec or timestamp language.

## Current Blockers

- final tarball file list must be approved by owner;
- final source commit must be approved by owner;
- final tarball SHA-256 must be approved by owner;
- publication approval must remain `NO` until a dedicated approval flow changes it.

## Publication Impact

Publication is blocked until the final artifact contents are inspected and
explicitly approved.
