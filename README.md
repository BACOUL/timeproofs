# TimeProofs AgentReady

**TimeProofs AgentReady** is a pre-deployment CI gate for agent-facing OpenAPI and MCP tools.

It checks whether API and tool contracts are clear, bounded, and explicit enough before they are exposed to AI agents.

## Product sentence

> Find risky OpenAPI and MCP tools before AI agents use them.

## Current direction

This repository is focused on:

```txt
Agent-facing OpenAPI and MCP tool readiness
Static pre-deployment analysis
AgentReady Score
AgentReady Report
agentready.json
Static scenario simulation
CI-gate-ready outputs
```

The old TimeProofs proof-of-existence, timestamp, verify, ProofSpec, and `.tproof.json` product direction is legacy. It must not be rebuilt as the active product unless explicitly requested.

## Current product flow

```txt
OpenAPI / MCP tools JSON
-> AgentReady static analysis
-> AgentReady Score
-> risk findings
-> recommended fixes
-> Markdown report
-> agentready.json
-> static scenario simulation
-> agentready-simulation.json
```

## Current state

```txt
Built: static OpenAPI JSON/YAML scanner
Built: static MCP tools JSON scanner
Built: static simulation page
Built: browser test harness
Built: agentready.json export
Built: agentready-simulation.json export
Built: Markdown report export
Built: public AgentReady homepage, docs, examples, resources, pricing, and sample report pages
Built: commercial bad/fixed fixtures for OpenAPI refund, MCP email, and MCP files risks
Built: AgentReady core regression suite
Pending: strict desktop Browser V1 QA evidence
Future: CLI and CI wrappers after Browser V1 contracts remain stable
```

## Main files and folders

```txt
index.html                         AgentReady homepage
agentready.html                    OpenAPI scanner
agentready-mcp.html                MCP tools scanner
agentready-simulation.html         Static scenario simulation
agentready-docs.html               Public documentation
agentready-examples.html           Public examples
agentready-test.html               Browser test harness
agentready-engine-gate.html        Internal browser engine gate
agentready-sample-report.html      Sample report
pricing.html                       Manual pricing path
agentready-core/                   Static scanner engine
agentready-examples/               OpenAPI, MCP, and commercial fixtures
docs/agentready/                   Product, QA, strategy, and contract docs
```

## Local-first boundaries

Browser V1 is static and local-first. The scanner pages do not need:

```txt
backend
account
payment
dashboard
database
live API execution
live MCP execution
LLM call
runtime firewall
```

## OpenAPI scanner

Page:

```txt
agentready.html
```

Supported inputs:

```txt
openapi.json
openapi.yaml
openapi.yml
```

Outputs:

```txt
AgentReady Score
risk counts
top risks
endpoint-by-endpoint findings
executive summary
recommended action plan
agentready.json
Markdown report
browser print / Save as PDF report
```

## MCP scanner

Page:

```txt
agentready-mcp.html
```

Supported input shape:

```json
{
  "server": {},
  "tools": []
}
```

Outputs:

```txt
MCP AgentReady Score
tool-by-tool findings
confirmation and schema risks
agentready.json
Markdown report
browser print / Save as PDF report
```

## Static simulation

Page:

```txt
agentready-simulation.html
```

Purpose:

```txt
Use generated agentready.json plus scenario JSON to check risky agent task patterns without executing APIs, MCP tools, or LLMs.
```

Output:

```txt
agentready-simulation.json
```

## Tests

Primary local core check:

```bash
npm run test:agentready-core
```

Equivalent direct command when npm is unavailable:

```bash
node agentready-core/tests/run-agentready-core-tests.mjs
```

Expected current result:

```txt
AgentReady core tests: 18/18 passed
```

## Important docs

```txt
docs/agentready/TODO_NEXT.md
docs/agentready/REMAINING_WORK.md
docs/agentready/LONG_TERM_PRODUCT_ROADMAP.md
docs/agentready/RELEASE_DISCIPLINE.md
docs/agentready/BROWSER_V1_QA_RUNBOOK.md
docs/agentready/BROWSER_V1_QA_RESULT.md
docs/agentready/AGENTREADY_JSON_SPEC.md
docs/agentready/AGENTREADY_CHECKED_TRUST_LAYER.md
docs/agentready/V2_CLI_SCOPE.md
docs/agentready/CI_CD_STRATEGY.md
```

## Non-negotiable rules

```txt
Do not rebuild the legacy proof/timestamp/verify product.
Do not claim AgentReady guarantees safety.
Do not turn AgentReady into a runtime firewall.
Do not add dashboard, Stripe, accounts, database, or backend before explicit product direction.
Do not create GitHub Actions before the CLI wrapper is explicitly approved.
Do not change scanner behavior in documentation-only cleanup PRs.
```

## Mandatory limitation

TimeProofs AgentReady does not guarantee that an AI agent will never fail.

It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
