# TODO Next — TimeProofs AgentReady

## Current completed V1/V2 draft base

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
✅ static OpenAPI fixture checks
✅ public docs/examples pages
✅ MCP exploration document
✅ MCP simple/dangerous fixtures
✅ MCP static core parser
✅ MCP tools to AgentReady operations mapping
✅ MCP checks in static test harness
✅ mandatory limitation text shown
✅ submitted API endpoints / MCP tools are never called
```

## Immediate next PR

```txt
feat(agentready): add MCP scanner page
```

## Build next

Requirements:

```txt
1. Add agentready-mcp.html.
2. Support local MCP tools JSON upload.
3. Add load simple MCP example button.
4. Add load dangerous MCP example button.
5. Display MCP AgentReady Score.
6. Display MCP tool findings.
7. Export agentready.json.
8. Export Markdown report.
9. Keep OpenAPI scanner page unchanged.
10. Do not add accounts, payment, dashboard, or runtime firewall.
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
