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
✅ executive summary display
✅ recommended action plan display
✅ Markdown report display
✅ agentready.json download
✅ markdown report download
✅ browser print / Save as PDF export
✅ mandatory limitation text shown
✅ submitted API endpoints are never called
```

## Immediate next PR

```txt
feat(agentready): add static test harness
```

## Build next

Requirements:

```txt
1. Add a static fixture test page or no-dependency test script.
2. Verify valid-simple-openapi.json scans successfully.
3. Verify valid-simple-openapi.yaml scans successfully.
4. Verify dangerous-actions-openapi.json detects critical risks.
5. Verify invalid JSON fails cleanly.
6. Verify invalid YAML fails cleanly.
7. Verify good fixture scores higher than dangerous fixture.
8. Keep test harness static and dependency-free.
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
