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
✅ Static OpenAPI JSON core scanner merged
✅ Example OpenAPI fixtures merged
⬜ Browser upload page
⬜ YAML support
⬜ Human report UI
⬜ PDF / print export
⬜ MCP scanner
⬜ Agent simulation
```

## Main folders

```txt
agentready-core/
agentready-examples/
docs/agentready/
```

## AgentReady Core V1a

The current core can analyze OpenAPI JSON 3.0 / 3.1 and generate:

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

const result = await scanOpenApiText(openApiJsonText, {
  filename: 'openapi.json'
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

Create the first usable product page:

```txt
agentready.html
```

Required features:

```txt
local OpenAPI JSON upload
AgentReady Score display
top risks display
endpoint-by-endpoint findings
agentready.json export
Markdown report display
```

## Non-negotiable rule

Do not rebuild the legacy proof-of-existence product in this repo unless explicitly requested.

The repo direction is now:

> TimeProofs AgentReady — pre-deployment readiness for AI-agent tools.
