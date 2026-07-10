# TimeProofs AgentReady

**TimeProofs AgentReady** is a pre-deployment readiness layer for AI-agent tools.

It checks whether an API, MCP server, or tool schema is clear and bounded enough to be exposed to AI agents.

## Product sentence

> See where AI agents will fail before they use your API or MCP tools.

## Current product direction

This repository is now focused on **Agent Tool Readiness**.

The previous TimeProofs proof-of-existence website and timestamp/verify pages have been removed from the active product surface.

The current product flow is:

```txt
OpenAPI / MCP / tool schema
-> AgentReady analysis
-> AgentReady Score
-> AgentReady CI Gate
-> AgentReady Report
-> agentready.json
-> static scenario simulation
-> agentready-simulation.json
```

## Current state

```txt
✅ Product positioning documented
✅ Legacy proof-of-existence surface removed
✅ Commercial AgentReady homepage draft
✅ Shared mobile navigation across public V1 pages
✅ Static OpenAPI JSON/YAML scanner
✅ Static MCP tools JSON scanner
✅ Static simulation page
✅ OpenAPI and MCP fixtures
✅ Simulation scenario fixtures
✅ agentready.json export
✅ agentready-simulation.json export
✅ Markdown report export
✅ Browser print / Save as PDF for scanner reports
✅ Public docs page
✅ Public examples page
✅ Static browser test harness
✅ Legal / privacy / terms draft pages
✅ AgentReady Checked trust layer draft
✅ Browser V1 QA runbook and QA gate
⚠️ Browser V1 QA remains PENDING
```

## Release status

Browser V1 is structurally built, but it is **not declared complete**.

Browser V1 can be called complete only after a real browser QA pass verifies:

```txt
page rendering
mobile navigation
OpenAPI scanner examples
MCP scanner examples
static simulation export
export downloads
print / Save as PDF
Network tab no-execution checks
```

See:

```txt
docs/agentready/BROWSER_V1_QA_RUNBOOK.md
docs/agentready/BROWSER_V1_QA_RESULT.md
docs/agentready/RELEASE_DISCIPLINE.md
```

## Main files and folders

```txt
index.html
agentready.html
agentready-mcp.html
agentready-simulation.html
agentready-docs.html
agentready-examples.html
agentready-test.html
legal.html
privacy.html
terms.html
assets/site-nav.css
assets/site-nav.js
agentready-core/
agentready-examples/
docs/agentready/
```

## Public pages

```txt
/                              Commercial landing page
/agentready.html               OpenAPI scanner
/agentready-mcp.html           MCP tools scanner
/agentready-simulation.html    Static scenario simulation
/agentready-docs.html          Public documentation
/agentready-examples.html      Public examples
/agentready-test.html          Static browser test harness, noindex
/legal.html                    Legal notice draft
/privacy.html                  Privacy draft
/terms.html                    Terms draft
```

## Browser V1

Browser V1 is the static, local-first product foundation.

It supports:

```txt
OpenAPI JSON/YAML local scanning
MCP tools JSON local scanning
AgentReady Score /100
risk counts
operation/tool findings
human-readable recommendations
Markdown reports
browser print / Save as PDF
agentready.json
static scenario simulation
agentready-simulation.json
browser test harness
```

It does not require:

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

Core flow:

```txt
MCP tools JSON
-> parse server/tools[]
-> map each tool to an AgentReady operation
-> classify action type
-> detect risk findings
-> generate score/report/agentready.json
```

Core files:

```txt
agentready-core/parse-mcp-tools.js
agentready-core/extract-mcp-tools.js
agentready-core/scan-mcp-tools.js
```

Example fixtures:

```txt
agentready-examples/mcp-tools-simple.json
agentready-examples/mcp-tools-dangerous.json
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

Outputs:

```txt
scenario result counts
scenario-level pass/warning/fail/not_applicable
agentready-simulation.json
```

## AgentReady Checked

AgentReady Checked is a future trust layer draft. It is not a safety guarantee and must not be displayed as a public badge before Browser V1 QA is PASS and the criteria are stable.

Reference:

```txt
docs/agentready/AGENTREADY_CHECKED_TRUST_LAYER.md
```

## Static test harness

Page:

```txt
agentready-test.html
```

It checks:

```txt
OpenAPI JSON/YAML scanning
OpenAPI invalid input errors
MCP scanning
MCP invalid shape errors
agentready.json root fields
agentready.json tool fields
Markdown report generation
static simulation parser
static simulation result shape
```

Open the test harness through an HTTP server, not `file://`, because browser fixture loading uses `fetch()`.

## Important files to read first

```txt
docs/agentready/TODO_NEXT.md
docs/agentready/REMAINING_WORK.md
docs/agentready/LONG_TERM_PRODUCT_ROADMAP.md
docs/agentready/RELEASE_DISCIPLINE.md
docs/agentready/BROWSER_V1_QA_RUNBOOK.md
docs/agentready/BROWSER_V1_QA_RESULT.md
docs/agentready/AGENTREADY_JSON_SPEC.md
docs/agentready/GITHUB_ACTION_USAGE.md
docs/agentready/AGENTREADY_CHECKED_TRUST_LAYER.md
docs/agentready/V2_CLI_SCOPE.md
```

## Immediate next step

```txt
qa(agentready): run Browser V1 public-site QA
```

Do not start V2 implementation before Browser V1 public-site polish is acceptable.

## Non-negotiable rule

Do not rebuild the legacy proof-of-existence product in this repo unless explicitly requested.

Do not claim AgentReady guarantees that an AI agent will never fail.

Mandatory limitation text:

```txt
TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
```
