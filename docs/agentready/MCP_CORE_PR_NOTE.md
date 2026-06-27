# MCP Core PR Note

## Scope

This branch now contains the first static MCP scanner core.

It is still draft and should not be deployed until Vercel credits are available again.

## Added core files

```txt
agentready-core/parse-mcp-tools.js
agentready-core/extract-mcp-tools.js
agentready-core/scan-mcp-tools.js
```

## Added fixtures

```txt
agentready-examples/mcp-tools-simple.json
agentready-examples/mcp-tools-dangerous.json
```

## Public API

```js
import { scanMcpToolsText } from './agentready-core/index.js';

const result = await scanMcpToolsText(text, {
  filename: 'mcp-tools.json'
});
```

## How it works

```txt
MCP tools JSON
→ parse server/tools[]
→ convert each tool to an AgentReady operation
→ classify action
→ detect risks
→ score
→ generate agentready.json
→ generate Markdown report
```

## Important constraints

```txt
No MCP tool execution.
No live MCP connection.
No OpenAPI behavior change.
No backend.
No payment/account/dashboard.
```

## Next after this draft

```txt
Add MCP browser test harness checks.
Then add agentready-mcp.html UI only after the core is stable.
```
