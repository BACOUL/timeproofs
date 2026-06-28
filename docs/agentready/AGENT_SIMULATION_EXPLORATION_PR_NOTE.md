# PR Note — Agent Simulation Exploration

## Goal

Define the first documentation-first exploration layer for Agent Simulation without adding runtime execution or backend complexity.

## Scope

```txt
docs/agentready/AGENT_SIMULATION_EXPLORATION.md
docs/agentready/examples/simulation-openapi-refund-scenario.json
docs/agentready/examples/simulation-mcp-delete-file-scenario.json
docs/agentready/TODO_NEXT.md
```

## Added

```txt
Agent simulation definition
Non-goals
Scenario JSON format
Static simulation signals
wrong_tool_selection metric
wrong_parameter metric
unsafe_action_without_confirmation metric
unrecoverable_error metric
sensitive_data_exposure metric
OpenAPI simulation scenario fixture
MCP simulation scenario fixture
Future simulation result shape
Future report placement
```

## Non-goals

```txt
No live API execution
No live MCP execution
No LLM-driven autonomous runner
No backend
No accounts
No payments
No dashboard
No runtime firewall
No deployment
```

## Next recommended step

```txt
feat(agentready): add static simulation fixtures
```
