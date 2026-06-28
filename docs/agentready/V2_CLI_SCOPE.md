# TimeProofs AgentReady — V2 CLI Scope

## Purpose

V2 should make AgentReady usable from a developer terminal and from CI.

The CLI should reuse the existing AgentReady scanner logic instead of creating a separate product.

## Product position

Browser V1 remains the foundation.

V2 CLI is the developer workflow layer.

```txt
Browser V1: local browser scanner
V2 CLI: terminal and CI scanner
```

## Primary users

```txt
API developers
MCP tool developers
AI platform teams
technical founders
internal tooling teams
security-minded engineering teams
```

## CLI goals

```txt
Scan OpenAPI files from the terminal.
Scan MCP tools files from the terminal.
Generate agentready.json.
Generate agentready-simulation.json.
Generate Markdown reports.
Return useful terminal summaries.
Support CI pass/fail thresholds.
```

## Out of scope for V2

```txt
No hosted backend.
No account system.
No dashboard.
No payment flow.
No database.
No runtime gateway.
No public release claim before Browser V1 QA PASS.
```

## Proposed commands

### Scan OpenAPI

```bash
agentready scan openapi ./openapi.yaml
```

Expected outputs:

```txt
agentready.json
agentready-report.md
terminal score summary
```

### Scan MCP tools

```bash
agentready scan mcp ./mcp-tools.json
```

Expected outputs:

```txt
agentready-mcp.json
agentready-mcp-report.md
terminal score summary
```

### Run static simulation

```bash
agentready simulate ./agentready.json ./scenario.json
```

Expected outputs:

```txt
agentready-simulation.json
terminal simulation summary
```

### Print report summary

```bash
agentready report ./agentready.json
```

Expected output:

```txt
score
risk counts
top risks
recommended next actions
```

## Output directory option

The CLI should support an output directory.

```bash
agentready scan openapi ./openapi.yaml --out ./agentready-output
```

Expected:

```txt
./agentready-output/agentready.json
./agentready-output/agentready-report.md
```

## CI threshold options

The CLI should support simple thresholds.

```bash
agentready scan openapi ./openapi.yaml --min-score 80 --fail-on critical
```

Possible behavior:

```txt
exit 0 if score and risk policy pass
exit 1 if score is below threshold
exit 1 if blocked severity is found
exit 2 for invalid input or CLI usage error
```

## Exit code draft

```txt
0 = pass
1 = valid scan but policy failed
2 = invalid input or CLI usage error
3 = unexpected internal error
```

## Reuse existing scanner core

The CLI should reuse existing browser-compatible core modules where possible.

Current relevant folders:

```txt
agentready-core/
agentready-core/simulation/
```

Do not create separate risk logic for the CLI unless there is a clear reason.

The browser scanner and CLI scanner should produce compatible outputs.

## Contract outputs

The CLI must preserve the strategic contract outputs:

```txt
agentready.json
agentready-simulation.json
```

These are more important than terminal formatting.

## Suggested package structure

Draft only:

```txt
package.json
bin/agentready.js
agentready-core/
agentready-core/simulation/
cli/
cli/commands/
cli/output/
```

## Implementation sequence

```txt
1. Define CLI scope.
2. Decide package structure.
3. Add package.json only when implementation starts.
4. Add bin entry.
5. Wire OpenAPI scan command.
6. Wire MCP scan command.
7. Wire simulation command.
8. Add fixtures-based CLI tests.
9. Add README usage examples.
10. Add CI examples only after CLI works locally.
```

## V2 acceptance criteria

```txt
A developer can run AgentReady locally from the terminal.
The CLI can scan OpenAPI files.
The CLI can scan MCP tools files.
The CLI can generate agentready.json.
The CLI can run static simulation.
The CLI can generate agentready-simulation.json.
The CLI can return useful CI exit codes.
The CLI output remains compatible with Browser V1 outputs.
```

## Release discipline

V2 can be scoped while Browser V1 QA is pending.

V2 should not be publicly released before the release discipline is respected.

Reference:

```txt
docs/agentready/RELEASE_DISCIPLINE.md
```

## Mandatory limitation text

TimeProofs AgentReady does not guarantee that an AI agent will never fail.

It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
