# TimeProofs AgentReady — MCP Scanner Exploration

## Purpose

This document defines the first exploration step for adding MCP support to TimeProofs AgentReady.

The goal is not to replace the OpenAPI scanner.

The goal is to extend the same AgentReady logic to MCP tools:

```txt
MCP tools schema
→ AgentReady analysis
→ AgentReady Score
→ AgentReady Report
→ mcp agentready.json
```

---

## Product reason

AI agents increasingly use tools through MCP-style tool definitions.

An MCP tool can still be unclear, dangerous, under-described, over-permissive, or unsafe for autonomous execution.

AgentReady should answer the same question for MCP:

> Is this MCP tool safe and clear enough to expose to an AI agent?

---

## Non-goals for this exploration PR

This exploration must not:

- change the OpenAPI V1 scanner behavior;
- add accounts;
- add payments;
- add dashboard logic;
- add runtime guardrails;
- execute MCP tools;
- connect to a live MCP server;
- claim full MCP certification.

This PR is only the V2 foundation.

---

## Proposed MCP input shape V2a

The first supported input should be a static JSON document containing an array of tools:

```json
{
  "mcp_version": "2025-XX",
  "server": {
    "name": "Example MCP Server",
    "description": "Tools for support and commerce workflows."
  },
  "tools": [
    {
      "name": "refund_customer",
      "description": "Refund a customer order after human approval.",
      "inputSchema": {
        "type": "object",
        "required": ["customer_id", "order_id", "amount", "reason"],
        "properties": {
          "customer_id": { "type": "string" },
          "order_id": { "type": "string" },
          "amount": { "type": "number", "minimum": 0, "maximum": 500 },
          "reason": { "type": "string" }
        }
      }
    }
  ]
}
```

This shape is intentionally simple so the scanner can be built statically and tested locally.

---

## Mapping MCP tools to AgentReady operations

An MCP tool maps to an AgentReady operation as follows:

| AgentReady field | MCP source |
|---|---|
| `operationId` | `tool.name` |
| `summary` | optional first sentence of `tool.description` |
| `description` | `tool.description` |
| `method` | virtual method: `MCP_TOOL` |
| `path` | virtual path: `mcp://tools/{tool.name}` |
| `parameters` | empty for V2a |
| `requestFields` | flattened `tool.inputSchema.properties` |
| `responses` | empty or synthetic |
| `hasSecurity` | false unless an explicit security/permissions block is added |

This allows reuse of existing logic:

```txt
classify-action.js
detect-risks.js
score.js
generate-agentready-json.js
report.js
```

---

## MCP-specific risk checks to add later

The OpenAPI risk taxonomy can be reused, but MCP needs a few specific checks:

```txt
unclear_tool_name
missing_tool_description
ambiguous_tool_description
missing_input_schema
loose_input_schema
missing_required_fields
dangerous_tool_without_confirmation
sensitive_tool_without_permission_boundary
unknown_tool_effect
missing_output_contract
```

Initial V2a can map most of these to current risks:

```txt
unclear_tool_name → unclear_operation_name
missing_tool_description → ambiguous_tool_description
loose_input_schema → unbounded_parameter / missing_enum
unknown_tool_effect → unknown_action_type
```

---

## Dangerous MCP action keywords

The classifier should identify dangerous tools using names and descriptions containing:

```txt
refund
pay
charge
transfer
delete
remove
cancel
send
email
sms
publish
export
invite
auth
token
secret
permission
role
```

These should trigger human-confirmation recommendations when appropriate.

---

## Proposed file structure for V2a

```txt
agentready-core/
  parse-mcp-tools.js
  extract-mcp-tools.js
  scan-mcp-tools.js

agentready-examples/
  mcp-tools-simple.json
  mcp-tools-dangerous.json
```

Later UI can be added to `agentready.html` or a separate `agentready-mcp.html`.

Recommended first choice:

```txt
agentready-mcp.html
```

Reason: it avoids making the OpenAPI scanner page too complex before the MCP core is stable.

---

## V2a acceptance criteria

V2a is acceptable when:

```txt
1. A static MCP tools JSON fixture can be parsed.
2. Each MCP tool becomes an AgentReady operation.
3. Dangerous tool names are classified correctly.
4. Basic input schema fields are flattened.
5. Existing score/risk/report/json generation can run on MCP-derived operations.
6. OpenAPI V1 behavior remains unchanged.
```

---

## Suggested next PR after this exploration

```txt
feat(agentready): add MCP static core parser
```

Scope:

```txt
agentready-core/parse-mcp-tools.js
agentready-core/extract-mcp-tools.js
agentready-core/scan-mcp-tools.js
agentready-examples/mcp-tools-simple.json
agentready-examples/mcp-tools-dangerous.json
```

Do not add MCP UI until the core works.
