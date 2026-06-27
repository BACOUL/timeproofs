# TODO Next — TimeProofs AgentReady

## Immediate next PR

```txt
feat(agentready): add static upload page
```

## Build `agentready.html`

Requirements:

```txt
1. Load agentready-core/index.js as ES module.
2. Accept local OpenAPI JSON upload.
3. Run scanOpenApiText(fileText, { filename }).
4. Display AgentReady Score and status.
5. Display risk counts.
6. Display top risks.
7. Display endpoint-by-endpoint findings.
8. Display Markdown report.
9. Add button to download agentready.json.
10. Add button to download markdown report.
11. Show mandatory limitation text.
12. Never call submitted API endpoints.
```

## Do not build yet

```txt
YAML parsing
PDF export
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
