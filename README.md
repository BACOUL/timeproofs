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
⬜ MCP scanner
⬜ Agent simulation
```

## Main files and folders

```txt
index.html
agentready.html
agentready-test.html
agentready-core/
agentready-examples/
docs/agentready/
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

## Static test harness

The static test page is:

```txt
agentready-test.html
```

It checks:

```txt
valid JSON fixture scans successfully
valid YAML fixture scans successfully
dangerous fixture detects critical risks
invalid JSON fails cleanly
invalid YAML fails cleanly
good fixture scores higher than dangerous fixture
agentready.json is generated
Markdown report is generated
```

## AgentReady Core V1

The current core can analyze OpenAPI 3.0 / 3.1 in JSON or YAML and generate:

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
```

## Next build step

Begin MCP scanner exploration only after validating the static test harness in browser.

## Non-negotiable rule

Do not rebuild the legacy proof-of-existence product in this repo unless explicitly requested.

The repo direction is now:

> TimeProofs AgentReady — pre-deployment readiness for AI-agent tools.
