# MCP Core Clean PR Note

## Scope

This branch adds the static MCP scanner core on top of the current `timeproofs` branch without the conflicted history from PR #54.

## Added

```txt
agentready-core/parse-mcp-tools.js
agentready-core/extract-mcp-tools.js
agentready-core/scan-mcp-tools.js
```

## Updated

```txt
agentready-core/index.js
agentready-test.html
agentready-core/README.md
README.md
```

## Behavior

```txt
MCP tools JSON
→ parse tools[]
→ convert MCP tools to AgentReady operations
→ reuse classifyAction
→ reuse detectRisks
→ reuse scoring
→ generate agentready.json
→ generate Markdown report
```

## Constraints

```txt
No MCP tool execution.
No live MCP connection.
No backend.
No account/payment/dashboard.
OpenAPI V1 behavior remains unchanged.
```

## Next

```txt
feat(agentready): add agentready-mcp.html
```
