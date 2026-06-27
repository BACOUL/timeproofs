# TODO Next — TimeProofs AgentReady

## Current completed V1 base

```txt
✅ agentready.html exists
✅ OpenAPI JSON upload works
✅ OpenAPI YAML upload works
✅ scanOpenApiText(fileText, { filename }) handles JSON/YAML
✅ AgentReady Score and status display
✅ risk counts display
✅ top risks display
✅ endpoint-by-endpoint findings display
✅ Markdown report display
✅ agentready.json download
✅ markdown report download
✅ mandatory limitation text shown
✅ submitted API endpoints are never called
```

## Immediate next PR

```txt
feat(agentready): polish report and add print export
```

## Build next

Requirements:

```txt
1. Improve the report section layout.
2. Add a clearer executive summary.
3. Add recommended action plan.
4. Add print-friendly CSS.
5. Add a Print / Save as PDF button using browser print.
6. Keep agentready.json export unchanged.
7. Do not add backend PDF generation.
```

## Do not build yet

```txt
MCP scanner
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
