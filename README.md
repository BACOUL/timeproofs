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
✅ Strict methodology documented
✅ Repo audit completed
✅ Static OpenAPI JSON/YAML core scanner
✅ Example OpenAPI fixtures merged
✅ Browser upload page for OpenAPI JSON/YAML
✅ Executive report section
✅ Browser print / Save as PDF export
✅ Static browser test harness
✅ Public docs page
✅ Public examples page
✅ MCP scanner exploration docs and fixtures
✅ MCP static core parser
⬜ MCP scanner UI
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
/agentready.html          OpenAPI scanner
/agentready-docs.html     Public documentation
/agentready-examples.html Public examples
/agentready-test.html     Static test harness, noindex
```

## AgentReady Scanner V1 OpenAPI

The static OpenAPI scanner page is:

```txt
agentready.html
```

It supports local OpenAPI scanning in the browser for:

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

## MCP Core V2a

The MCP UI is not built yet, but the static MCP core parser is available.

MCP example fixtures:

```txt
agentready-examples/mcp-tools-simple.json
agentready-examples/mcp-tools-dangerous.json
```

The MCP core flow is:

```txt
MCP tools JSON
→ parse tools[]
→ map each tool to an AgentReady operation
→ reuse classification, risk detection, scoring, report, and agentready.json generation
```

Usage:

```js
import { scanMcpToolsText } from './agentready-core/index.js';

const result = await scanMcpToolsText(mcpToolsText, {
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
valid JSON fixture scans successfully
valid YAML fixture scans successfully
dangerous OpenAPI fixture detects critical risks
invalid JSON/YAML fail cleanly
MCP simple fixture scans successfully
MCP dangerous fixture detects critical/high risks
invalid MCP fails cleanly
MCP tools map to AgentReady operations
agentready.json is generated
Markdown report is generated
```

## AgentReady Core

The current core can analyze:

```txt
OpenAPI 3.0 / 3.1 JSON
OpenAPI 3.0 / 3.1 YAML
MCP tools JSON
```

Core exports:

```js
scanOpenApiText(text, options)
scanOpenApiDocument(document, options)
scanMcpToolsText(text, options)
scanMcpToolsDocument(document, options)
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

Build the MCP scanner UI.

Recommended next file:

```txt
agentready-mcp.html
```

## Non-negotiable rule

Do not rebuild the legacy proof-of-existence product in this repo unless explicitly requested.

The repo direction is now:

> TimeProofs AgentReady — pre-deployment readiness for AI-agent tools.
