# PR Note — Static Simulation Fixtures

## Goal

Add static simulation fixtures that prepare future AgentReady simulation without executing APIs, MCP tools, LLMs, or backend logic.

## Scope

```txt
docs/agentready/examples/simulation-scenarios-index.md
docs/agentready/examples/simulation-openapi-export-customers-scenario.json
docs/agentready/examples/simulation-mcp-send-email-scenario.json
docs/agentready/examples/simulation-result-openapi-refund-fail.json
docs/agentready/examples/simulation-result-mcp-delete-file-fail.json
docs/agentready/TODO_NEXT.md
```

## Added

```txt
Shared scenario index
Additional OpenAPI risky scenario
Additional MCP risky scenario
Expected OpenAPI simulation result example
Expected MCP simulation result example
Future simulation output placement in agentready.json
Result statuses: pass, warning, fail, not_applicable
```

## Non-goals

```txt
No live API execution
No live MCP execution
No LLM calls
No backend
No accounts
No payments
No dashboard
No runtime firewall
No deployment
```

## Next recommended step

```txt
docs(agentready): decide static simulation parser scope
```
