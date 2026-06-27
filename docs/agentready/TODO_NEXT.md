# TODO Next — TimeProofs AgentReady

## Current completed V1 base

```txt
✅ agentready.html exists
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
✅ mandatory limitation text shown
✅ submitted API endpoints are never called
```

## Immediate next PR

```txt
feat(agentready): add public docs and examples pages
```

## Build next

Requirements:

```txt
1. Add a public documentation HTML page.
2. Add a public examples HTML page.
3. Link docs/examples from index.html and agentready.html.
4. Keep markdown docs as source-of-truth.
5. Update sitemap only when pages exist.
6. Do not introduce a framework.
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
