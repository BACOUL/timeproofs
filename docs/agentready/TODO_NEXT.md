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
✅ MCP static core parser
✅ MCP tools to AgentReady operations mapping
✅ mandatory limitation text shown
✅ submitted API endpoints are never called
```

## Immediate next PR

```txt
test(agentready): add MCP checks to static test harness
```

## Build next

Requirements:

```txt
1. Load mcp-tools-simple.json in agentready-test.html.
2. Load mcp-tools-dangerous.json in agentready-test.html.
3. Verify simple MCP fixture scans successfully.
4. Verify dangerous MCP fixture scans successfully.
5. Verify dangerous MCP fixture detects high/critical risks.
6. Verify MCP scan generates agentready.json.
7. Verify MCP scan generates Markdown report.
8. Keep OpenAPI V1 checks unchanged.
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
