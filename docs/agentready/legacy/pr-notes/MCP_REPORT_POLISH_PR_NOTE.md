# PR Note — MCP Scanner Report Polish

## Goal

Make the MCP scanner report feel purpose-built for MCP tools instead of reusing OpenAPI wording.

## Scope

```txt
agentready-core/types.js
agentready-core/extract-mcp-tools.js
agentready-core/detect-risks.js
agentready-core/report.js
agentready-mcp.html
docs/agentready/TODO_NEXT.md
```

## Added MCP-specific risk detection

```txt
mcp_vague_tool_name
mcp_missing_input_schema
mcp_empty_input_schema
mcp_missing_required_fields
mcp_dangerous_tool_weak_description
mcp_missing_output_schema
```

## Added MCP report improvements

```txt
MCP-specific report title
MCP source summary
MCP executive summary
Tool Details instead of Endpoint Details
Input schema / output schema visibility
Required fields visibility
MCP-specific conclusion wording
```

## Added MCP page improvements

```txt
MCP executive summary card
inputSchema / outputSchema visibility per tool
Print / Save as PDF button
V1 wording instead of V2 draft wording
```

## Non-goals

```txt
No MCP tool execution
No live MCP server connection
No backend
No accounts
No payments
No dashboard
No runtime firewall
No agent simulation yet
```

## Next recommended step

```txt
feat(agentready): polish OpenAPI scanner report
```
