# PR Note — Static Simulation Parser Core

## Goal

Add the first code-backed static simulation parser core for AgentReady.

The parser remains local/static and does not execute APIs, MCP tools, LLMs, or backend logic.

## Added core files

```txt
agentready-core/simulation/parse-simulation-scenario.js
agentready-core/simulation/run-static-simulation.js
agentready-core/simulation/simulation-result.js
```

## Updated files

```txt
agentready-core/index.js
agentready-test.html
docs/agentready/TODO_NEXT.md
```

## Capabilities

```txt
Parse simulation scenario JSON
Validate required scenario fields
Read agentready.json plus scenario JSON
Match by expected_tool
Fallback match by expected_action_type
Return not_applicable when no tool matches
Return fail when confirmation is required but absent
Map AgentReady risks to simulation findings
Return agentready-simulation.json shape
Add browser test harness checks
```

## Output shape

```txt
agentready.json
+ simulation scenario JSON
→ agentready-simulation.json
```

## Non-goals

```txt
No live API execution
No live MCP execution
No LLM calls
No autonomous agent runner
No backend
No accounts
No payments
No dashboard
No runtime firewall
No deployment
```

## Next recommended step

```txt
feat(agentready): expose static simulation in browser
```
