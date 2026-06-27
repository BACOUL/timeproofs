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
✅ mandatory limitation text shown
✅ submitted API endpoints are never called
```

## Immediate next PR

```txt
feat(agentready): start MCP scanner exploration
```

## Build next

Requirements:

```txt
1. Define the MCP input shape for V2.
2. Add an MCP example fixture.
3. Document how MCP tools map to AgentReady operations.
4. Identify which OpenAPI risk checks can be reused.
5. Do not change OpenAPI V1 behavior.
6. Do not add accounts, payment, or dashboard.
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
