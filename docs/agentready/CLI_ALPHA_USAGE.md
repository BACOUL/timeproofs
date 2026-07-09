# TimeProofs AgentReady — CLI Alpha Usage

## Status

```txt
CLI status: alpha foundation
Purpose: make AgentReady usable from a terminal and CI runner
Backend: none
Account: none
Payment: none
Live API execution: none
Live MCP execution: none
LLM call: none
```

The CLI is the first step toward the AgentReady CI Gate:

```txt
OpenAPI / MCP tools file
→ local AgentReady scan
→ score /100
→ report
→ agentready.json
→ optional CI policy failure
```

## Install / run locally from this repository

```bash
npm run agentready -- --help
```

or directly:

```bash
node bin/agentready.js --help
```

## Scan OpenAPI

```bash
node bin/agentready.js scan openapi ./agentready-examples/valid-simple-openapi.json --out ./agentready-output
```

CI-style policy check:

```bash
node bin/agentready.js scan openapi ./agentready-examples/dangerous-actions-openapi.json --min-score 80 --fail-on critical
```

Expected behavior:

```txt
exit 0 if the scan passes the configured policy
exit 1 if the scan is valid but policy fails
exit 2 for invalid input or usage error
exit 3 for unexpected internal error
```

## Scan MCP tools

```bash
node bin/agentready.js scan mcp ./agentready-examples/mcp-tools-simple.json --out ./agentready-output
```

CI-style policy check:

```bash
node bin/agentready.js scan mcp ./agentready-examples/mcp-tools-dangerous.json --min-score 80 --fail-on critical
```

## Outputs

OpenAPI scan with `--out` writes:

```txt
agentready.json
agentready-report.md
```

MCP scan with `--out` writes:

```txt
agentready-mcp.json
agentready-mcp-report.md
```

## Static simulation

```bash
node bin/agentready.js simulate ./agentready-output/agentready.json ./agentready-examples/simulation/openapi-refund-risk.scenario.json --out ./agentready-output
```

This writes:

```txt
agentready-simulation.json
```

## Report summary

```bash
node bin/agentready.js report ./agentready-output/agentready.json
```

## CI policy flags

### `--min-score`

Fails with exit code `1` if the AgentReady score is below the chosen threshold.

```bash
node bin/agentready.js scan openapi ./openapi.yaml --min-score 80
```

### `--fail-on`

Fails with exit code `1` if at least one risk at or above the severity exists.

```bash
node bin/agentready.js scan mcp ./mcp-tools.json --fail-on critical
```

Allowed values:

```txt
critical
high
medium
low
none
```

`--fail-on high` means high or critical risks fail.

## Privacy principle

The CLI reads local files and reuses `agentready-core`.

Default behavior:

```txt
No OpenAPI upload.
No MCP tool upload.
No source code upload.
No hosted scan.
No live API endpoint calls.
No live MCP execution.
No LLM call.
```

## Next step

After this alpha foundation is reviewed:

```txt
1. Run CLI against commercial bad/fixed fixtures.
2. Improve risk contrast if needed.
3. Add automated CLI fixture tests.
4. Add GitHub Action wrapper.
5. Add public /agentready-ci page only after CLI behavior is stable.
```

## Mandatory limitation

TimeProofs AgentReady does not guarantee that an AI agent will never fail.

It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
