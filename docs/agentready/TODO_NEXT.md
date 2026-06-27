# TODO Next — TimeProofs AgentReady

## Current completed base

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
✅ MCP static core parser
✅ scanMcpToolsText(fileText, { filename }) handles MCP tools JSON
✅ MCP tools map to AgentReady operations
✅ mandatory limitation text shown
✅ submitted API endpoints and MCP tools are never called
```

## Immediate next PR

```txt
feat(agentready): add MCP scanner UI
```

## Build next

Requirements:

```txt
1. Add agentready-mcp.html.
2. Accept local MCP tools JSON upload.
3. Use scanMcpToolsText(fileText, { filename }).
4. Display MCP AgentReady Score and status.
5. Display risk counts and top risks.
6. Display tool-by-tool findings.
7. Export agentready.json.
8. Export Markdown report.
9. Link MCP scanner from landing/docs/examples when stable.
10. Do not add backend, accounts, payment, dashboard, or runtime firewall.
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
