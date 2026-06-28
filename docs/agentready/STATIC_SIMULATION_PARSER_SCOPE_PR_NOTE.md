# PR Note — Static Simulation Parser Scope

## Goal

Decide the scope for the future AgentReady static simulation parser before writing parser code.

## Decision

The next simulation step should be code-backed, but only as a static browser/local parser.

```txt
agentready.json
+ simulation scenario JSON
→ agentready-simulation.json
```

## Added

```txt
Parser scope decision
Strict non-execution boundaries
Parser inputs
Parser outputs
Result statuses
Tool matching rules
Confirmation rule
Action type rule
Risk mapping rule
Decision to keep simulation separate from agentready.json V1
Future optional V1.1 simulation block
Implementation file placement
Acceptance tests before code
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
feat(agentready): add static simulation parser core
```
