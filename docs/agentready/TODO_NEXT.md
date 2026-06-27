# TODO Next — TimeProofs AgentReady

## Current completed V1 base

```txt
✅ agentready.html exists
✅ agentready-docs.html exists
✅ agentready-examples.html exists
✅ agentready-test.html exists
✅ OpenAPI JSON upload works
✅ OpenAPI YAML upload works
✅ scanOpenApiText(fileText, { filename }) handles JSON/YAML
✅ AgentReady Score and status display
✅ risk counts display
✅ top risks display
✅ endpoint-by-endpoint findings display
✅ executive summary display
✅ recommended action plan display
✅ Markdown report display
✅ agentready.json download
✅ markdown report download
✅ browser print / Save as PDF export
✅ static fixture checks
✅ public docs/examples pages
✅ MCP exploration document
✅ MCP simple/dangerous fixtures
✅ mandatory limitation text shown
✅ submitted API endpoints are never called
```

## Immediate next PR

```txt
feat(agentready): add MCP static core parser
```

## Build next

Requirements:

```txt
1. Add agentready-core/parse-mcp-tools.js.
2. Add agentready-core/extract-mcp-tools.js.
3. Add agentready-core/scan-mcp-tools.js.
4. Map MCP tools to AgentReady operation objects.
5. Reuse classify-action/detect-risks/score/report/json generation.
6. Verify mcp-tools-simple.json scans successfully.
7. Verify mcp-tools-dangerous.json detects high/critical risks.
8. Keep OpenAPI V1 behavior unchanged.
9. Do not add accounts, payment, dashboard, or runtime firewall.
```

## Do not build yet

```txt
accounts
payments
dashboard
runtime firewall
```

## Mandatory limitation text

```txt
TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
```
