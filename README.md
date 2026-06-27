# TimeProofs AgentReady

**TimeProofs AgentReady** is a pre-deployment readiness layer for AI-agent tools.

It checks whether an API, MCP server, or tool schema is ready to be safely and clearly exposed to AI agents.

## Product sentence

> See where AI agents will fail before they use your API or MCP tools.

## What this repository is now

This repository is now focused on **Agent Tool Readiness**.

The previous TimeProofs proof-of-existence website and timestamp/verify pages have been removed from the active product surface.

The current product direction is:

```txt
OpenAPI / MCP / tool schema
→ AgentReady analysis
→ AgentReady Score
→ AgentReady Report
→ agentready.json
```

## Current state

```txt
✅ Product vision documented
✅ Static OpenAPI JSON/YAML core scanner
✅ Browser upload page for OpenAPI JSON/YAML
✅ Executive report section
✅ Browser print / Save as PDF export
✅ Static browser test harness
✅ Public docs page
✅ Public examples page
✅ MCP scanner exploration docs and fixtures
✅ MCP static core parser
✅ MCP checks in static test harness
⬜ MCP scanner page
⬜ Agent simulation
```

## Main files and folders

```txt
index.html
agentready.html
agentready-docs.html
agentready-examples.html
agentready-test.html
agentready-core/
agentready-examples/
docs/agentready/
```

## Public pages

```txt
/                         Landing page
/agentready.html          Scanner
/agentready-docs.html     Public documentation
/agentready-examples.html Public examples
/agentready-test.html     Static test harness, noindex
```

## AgentReady Scanner V1

The static scanner page is:

```txt
agentready.html
```

It currently supports local OpenAPI scanning in the browser for:

```txt
openapi.json
openapi.yaml
openapi.yml
```

It can generate:

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

## MCP core V2 draft

The MCP UI is not built yet, but the static MCP core is present.

Core files:

```txt
agentready-core/parse-mcp-tools.js
agentready-core/extract-mcp-tools.js
agentready-core/scan-mcp-tools.js
```

MCP example fixtures:

```txt
agentready-examples/mcp-tools-simple.json
agentready-examples/mcp-tools-dangerous.json
```

The MCP flow is:

```txt
MCP tools JSON
→ parse server/tools[]
→ map each tool to an AgentReady operation
→ reuse classification, risk detection, scoring, report, and agentready.json generation
```

Usage:

```js
import { scanMcpToolsText } from './agentready-core/index.js';

const result = await scanMcpToolsText(text, {
  filename: 'mcp-tools.json'
});

console.log(result.summary.score);
console.log(result.agentready_json);
console.log(result.markdown_report);
```

## Static test harness

The static test page is:

```txt
agentready-test.html
```

It checks:

```txt
valid OpenAPI JSON fixture scans successfully
valid OpenAPI YAML fixture scans successfully
dangerous OpenAPI fixture detects critical risks
invalid OpenAPI JSON fails cleanly
invalid OpenAPI YAML fails cleanly
MCP simple fixture scans successfully
MCP dangerous fixture scans successfully
invalid MCP JSON fails cleanly
invalid MCP shape fails cleanly
MCP agentready.json is generated
MCP Markdown report is generated
MCP dangerous fixture detects high/critical risks
```

## AgentReady Core V1

The current OpenAPI core can analyze OpenAPI 3.0 / 3.1 in JSON or YAML and generate:

```txt
operation extraction
action classification
risk findings
AgentReady Score
agentready.json
Markdown report
```

Usage:

```js
import { scanOpenApiText } from './agentready-core/index.js';

const result = await scanOpenApiText(openApiText, {
  filename: 'openapi.yaml'
});

console.log(result.summary.score);
console.log(result.agentready_json);
console.log(result.markdown_report);
```

## Important files to read first

```txt
AGENTREADY_PROJECT_CONTEXT.md
docs/agentready/TIMEPROOFS_AGENTREADY_MASTER_PLAN.md
docs/agentready/AGENTREADY_IMPLEMENTATION_CHECKLIST.md
docs/agentready/AGENTREADY_JSON_SPEC.md
docs/agentready/LEGACY_REMOVAL_DECISION.md
docs/agentready/MCP_SCANNER_EXPLORATION.md
```

## Next build step

Add the MCP scanner page:

```txt
agentready-mcp.html
```

## Non-negotiable rule

Do not rebuild the legacy proof-of-existence product in this repo unless explicitly requested.

The repo direction is now:

> TimeProofs AgentReady — pre-deployment readiness for AI-agent tools.
