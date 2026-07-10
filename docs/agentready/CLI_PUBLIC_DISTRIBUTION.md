# AgentReady CLI Public Distribution

## Status

Prepared, but not published.

This document describes the package distribution shape for the AgentReady CLI. It does not mean the package is available from the public npm registry yet.

Community release workflow prepared.
Community public publication remains blocked and has not occurred.

Active direction:

```txt
TimeProofs AgentReady = pre-deployment CI gate for agent-facing OpenAPI and MCP tools.
```

Core promise:

```txt
Fail the build before unsafe agent-facing APIs or MCP tools are deployed.
```

## Candidate Package

```txt
@timeproofs/agentready
```

Version:

```txt
0.1.0-alpha.0
```

Runtime:

```txt
Node.js >=20
```

Binary command:

```txt
agentready
```

The package remains marked as:

```json
{
  "private": true
}
```

This prevents accidental publication in this preparation PR.

## NPM Name Check

Public unauthenticated check executed:

```txt
npm view @timeproofs/agentready version --json
```

Observed result:

```txt
E404 Not Found
```

Interpretation:

- the package name was not found in the public npm registry during this check;
- the name appears unused from this unauthenticated registry lookup;
- access to create or publish under the `@timeproofs` scope is still not confirmed;
- no npm account, organization, token, or publication was created.

## Runtime Graph Audit

Entry points inspected:

- `bin/agentready.js`;
- `agentready-core/index.js`.

Runtime required files:

- `bin/agentready.js`;
- `agentready-core/classify-action.js`;
- `agentready-core/detect-risks.js`;
- `agentready-core/extract-mcp-tools.js`;
- `agentready-core/extract-operations.js`;
- `agentready-core/generate-agentready-json.js`;
- `agentready-core/index.js`;
- `agentready-core/parse-mcp-tools.js`;
- `agentready-core/parse-openapi.js`;
- `agentready-core/parse-yaml.js`;
- `agentready-core/report.js`;
- `agentready-core/scan-mcp-tools.js`;
- `agentready-core/score.js`;
- `agentready-core/types.js`;
- `agentready-core/simulation/parse-simulation-scenario.js`;
- `agentready-core/simulation/run-static-simulation.js`;
- `agentready-core/simulation/simulation-result.js`.

Runtime built-ins used:

- `node:fs/promises`;
- `node:module`;
- `node:path`;
- `node:process`.

Not required at runtime:

- tests;
- fixtures;
- public HTML site;
- site assets;
- commercial launch docs;
- legal launch docs;
- legacy archives;
- GitHub workflow internals;
- local development scripts.

## Tarball Generation

From the repository root:

```txt
npm pack --dry-run
npm pack --json
```

The package whitelist is controlled by `package.json` `files`.

Expected included files:

- `package.json`;
- `README.md`;
- `LICENSE`;
- `bin/agentready.js`;
- `agentready-core/*.js`;
- `agentready-core/simulation/*.js`.

The package should not include:

- public HTML pages;
- site assets;
- tests;
- fixtures;
- commercial docs;
- legal launch docs;
- Stripe code;
- backend code;
- dashboard code;
- secrets or environment files.

## Local Tarball Installation

Generate a local tarball:

```txt
npm pack
```

Create a clean project and install the local tarball:

```txt
mkdir agentready-install-test
cd agentready-install-test
npm init -y
npm install ../timeproofs-agentready-0.1.0-alpha.0.tgz
```

Run the installed binary:

```txt
npx --no-install agentready --help
npx --no-install agentready --version
```

Expected version:

```txt
0.1.0-alpha.0
```

## Planned Public Installation Command - Not Yet Available

This command is planned for a future release only:

```txt
npm install @timeproofs/agentready
```

Do not document this as currently available until the package is actually published.

## OpenAPI Example

```txt
npx --no-install agentready scan openapi ./openapi.json --out ./agentready-output --min-score 75 --fail-on critical
```

Expected behavior:

- valid scan with passing policy exits `0`;
- output directory contains `agentready.json`;
- output directory contains `agentready-report.md`.

## MCP Example

```txt
npx --no-install agentready scan mcp ./mcp-tools.json --out ./agentready-output --min-score 75 --fail-on critical
```

Expected behavior:

- valid scan with passing policy exits `0`;
- output directory contains `agentready-mcp.json`;
- output directory contains `agentready-mcp-report.md`.

## PASS / FAIL Behavior

PASS:

- the scan is valid;
- score is at or above `--min-score`;
- no risk at or above `--fail-on` exists.

FAIL:

- the scan is valid;
- the configured policy fails.

Policy failure exits with code `1`.

## Exit Codes

| Code | Meaning |
| ---: | --- |
| 0 | Valid command and policy passed |
| 1 | Valid scan but policy failed |
| 2 | Invalid CLI usage or invalid input |
| 3 | Unexpected internal error |

## Clean Installation Smoke Test

Command:

```txt
node cli/tests/run-agentready-package-smoke-test.mjs
```

The test:

1. creates a temporary directory outside the repository;
2. runs `npm pack`;
3. verifies tarball creation;
4. inspects the tarball file list;
5. initializes a clean npm project;
6. installs the local tarball;
7. runs `npx --no-install agentready`;
8. verifies `--version`;
9. verifies `--help`;
10. copies existing OpenAPI and MCP fixtures;
11. runs an OpenAPI PASS scan;
12. runs an MCP PASS scan;
13. runs a policy FAIL scan;
14. verifies exit codes;
15. verifies output files;
16. removes the temporary directory.

The test does not need a published package or npm token.

## Uninstall

From a test project:

```txt
npm uninstall @timeproofs/agentready
```

If installed from a local tarball, npm still records the package under the package name.

## Limitations

- The package is not published.
- The package remains `private: true`.
- Public npm installation is not available yet.
- The scope `@timeproofs` still needs ownership/access confirmation.
- The CLI performs static local scans only.
- The CLI does not execute live APIs.
- The CLI does not execute live MCP tools.
- The CLI does not call LLMs.
- The CLI does not upload OpenAPI files, MCP definitions, reports, or secrets.
- No paid features, license checks, accounts, Stripe, or dashboard behavior are included.

## Publication Blockers

1. Access and ownership of the npm scope `@timeproofs` must be confirmed.
2. Final package-name availability must be confirmed before publication.
3. The `LICENSE` file is still marked by legacy references to ProofSpec and the old protocol.
4. The legal license decision for AgentReady must be validated before publication.
5. npm publication policy and 2FA requirements must be defined.
6. Package provenance and release workflow are prepared as a candidate-only Community workflow.
7. No package may be published from this PR.
8. Explicit release approval is still required before publication.

## Mandatory Limitation

TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
