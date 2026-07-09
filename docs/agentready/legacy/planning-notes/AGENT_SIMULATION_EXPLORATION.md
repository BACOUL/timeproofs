# TimeProofs AgentReady — Agent Simulation Exploration V1

## Purpose

This document defines the first exploration layer for **Agent Simulation** inside TimeProofs AgentReady.

The goal is not to execute APIs, not to execute MCP tools, and not to build a runtime firewall.

The goal is to define how TimeProofs could later simulate whether an AI agent is likely to choose the right tool, supply safe parameters, require confirmation, and recover from errors before the tool is exposed to real agents.

## Positioning

Agent simulation should strengthen the core product promise:

> See where AI agents will fail before they use your API or MCP tools.

Current V1 static scanning checks the structure of APIs and MCP tools.

Agent simulation would add a scenario layer:

```txt
Tool contract
+ simulated user task
+ static agent decision expectations
→ simulated failure modes
→ stronger AgentReady report
```

## What “agent simulation” means in V1 exploration

In V1 exploration, agent simulation means:

> A static scenario-based evaluation that checks whether an API operation or MCP tool gives an AI agent enough structure to make the right decision without actually executing the tool.

It is not a live autonomous agent.

It is not a call to a production API.

It is not a call to a live MCP server.

It is a structured reasoning check over:

```txt
operation/tool name
description
input schema
output schema
required fields
action type
risk level
human confirmation requirement
error recovery information
success verification information
```

## Non-goals

Do not build these in this phase:

```txt
runtime firewall
live API execution
live MCP execution
LLM-driven autonomous tests
accounts
payments
dashboard
database
browser agent execution
server-side agent runner
```

## Scenario format

A simulation scenario should be a JSON object.

```json
{
  "scenario_id": "refund_paid_order_requires_confirmation",
  "source_type": "openapi",
  "user_task": "Refund the last paid order for customer 123.",
  "expected_action_type": "REFUND",
  "expected_tool": "refundCustomer",
  "must_require_confirmation": true,
  "required_inputs": ["customer_id", "order_id", "amount"],
  "forbidden_if": [
    "customer identity is uncertain",
    "refund amount exceeds original payment",
    "human confirmation is missing"
  ],
  "expected_failure_modes": [
    "unsafe autonomous execution",
    "wrong or unsafe parameter value",
    "agent cannot verify action success"
  ]
}
```

## Scenario fields

| Field | Type | Required | Description |
|---|---:|---:|---|
| `scenario_id` | string | yes | Stable identifier for the simulation scenario. |
| `source_type` | string | yes | `openapi` or `mcp`. |
| `user_task` | string | yes | Plain-language task an agent might receive. |
| `expected_action_type` | string | yes | Expected TimeProofs action type. |
| `expected_tool` | string | no | Expected operation ID or MCP tool name. |
| `must_require_confirmation` | boolean | yes | Whether human confirmation should be required. |
| `required_inputs` | array[string] | no | Inputs an agent should need before calling. |
| `forbidden_if` | array[string] | no | Conditions that should block tool use. |
| `expected_failure_modes` | array[string] | yes | Failure modes to check against scan results. |

## Static simulation signals

These signals can be computed without executing tools.

### 1. wrong_tool_selection

The agent may select the wrong operation/tool when:

```txt
operationId or MCP tool name is vague
description is too short or generic
when-to-use guidance is missing
when-not-to-use guidance is missing
action type is UNKNOWN
multiple similar tools are not clearly separated
```

Relevant risk codes:

```txt
unclear_operation_name
ambiguous_tool_description
missing_when_to_use
missing_when_not_to_use
unknown_action_type
mcp_vague_tool_name
```

### 2. wrong_parameter

The agent may supply an unsafe or incorrect argument when:

```txt
required fields are missing
numeric bounds are missing
closed string enums are missing
inputSchema is absent or empty
parameter descriptions are weak
```

Relevant risk codes:

```txt
unbounded_parameter
missing_enum
mcp_missing_input_schema
mcp_empty_input_schema
mcp_missing_required_fields
```

### 3. unsafe_action_without_confirmation

The agent may execute a high-risk action without human review when:

```txt
action type is destructive, financial, external, publishing, export, or sensitive
confirmation guidance is missing
the action is irreversible or hard to reverse
```

Relevant risk codes:

```txt
dangerous_action_without_confirmation
irreversible_action
mcp_dangerous_tool_weak_description
```

### 4. unrecoverable_error

The agent may fail to recover when:

```txt
error responses are missing
error responses are too generic
retry guidance is absent
conflict resolution is absent
success verification is missing
```

Relevant risk codes:

```txt
non_corrective_error
missing_error_recovery
missing_success_verification
```

### 5. sensitive_data_exposure

The agent may expose or retrieve sensitive data beyond the intended scope when:

```txt
sensitive fields are present
security appears absent or too broad
pagination or filtering is unclear
response shape is too large or unstructured
```

Relevant risk codes:

```txt
sensitive_data_exposure
overbroad_permission
large_unstructured_response
```

## Proposed OpenAPI simulation fixture

```json
{
  "scenario_id": "openapi_refund_requires_confirmation",
  "source_type": "openapi",
  "user_task": "Refund customer 123 for the latest paid order.",
  "expected_action_type": "REFUND",
  "expected_tool": "refundCustomer",
  "must_require_confirmation": true,
  "required_inputs": ["customer_id", "order_id", "amount"],
  "forbidden_if": [
    "customer identity is uncertain",
    "refund amount exceeds original payment",
    "human confirmation is missing"
  ],
  "expected_failure_modes": [
    "unsafe autonomous execution",
    "wrong or unsafe parameter value",
    "agent cannot verify action success"
  ]
}
```

## Proposed MCP simulation fixture

```json
{
  "scenario_id": "mcp_delete_file_requires_confirmation",
  "source_type": "mcp",
  "user_task": "Delete the file named final-report.pdf from the workspace.",
  "expected_action_type": "DELETE",
  "expected_tool": "delete_file",
  "must_require_confirmation": true,
  "required_inputs": ["file_id"],
  "forbidden_if": [
    "file identity is uncertain",
    "human confirmation is missing",
    "the tool has no output schema to verify deletion"
  ],
  "expected_failure_modes": [
    "wrong tool selection",
    "unsafe autonomous execution",
    "agent cannot verify action success"
  ]
}
```

## Possible simulation result shape

Future report output could include:

```json
{
  "scenario_id": "openapi_refund_requires_confirmation",
  "result": "fail",
  "matched_tool": "refundCustomer",
  "matched_action_type": "REFUND",
  "simulation_findings": [
    "confirmation_required_but_not_documented",
    "amount_parameter_unbounded",
    "success_verification_missing"
  ],
  "recommendation": "Do not allow autonomous execution until confirmation, bounds, and success verification are documented."
}
```

## Result statuses

```txt
pass
warning
fail
not_applicable
```

### `pass`

The tool contract appears structurally sufficient for the scenario.

### `warning`

The tool may work, but the report should flag ambiguity or missing guardrails.

### `fail`

The tool should not be exposed to agents for that scenario before fixes are applied.

### `not_applicable`

No relevant tool was found for the scenario.

## How simulation could appear in reports later

A future report section could be:

```txt
## Agent Simulation Scenarios

Scenario: Refund customer 123 for the latest paid order.
Expected action: REFUND
Matched operation: refundCustomer
Result: fail
Why: missing confirmation, unbounded amount, missing success verification.
Recommended fix: add preview, confirmation, min/max amount, and success response object.
```

## Decision for the next PR

The next step should remain **docs-only**, unless the project explicitly decides to add a static scenario parser.

Recommended next branch after this document:

```txt
feat(agentready): add static simulation fixtures
```

Only after fixtures exist should the project consider code-backed simulation.

## Acceptance criteria for this exploration

```txt
The repo defines what simulation means.
The repo defines what simulation does not mean.
The repo defines a scenario JSON shape.
The repo defines static simulation signals.
The repo defines OpenAPI and MCP scenario examples.
The repo keeps tool execution out of scope.
The repo keeps the browser product stable before CLI.
```

## Mandatory limitation text

TimeProofs AgentReady does not guarantee that an AI agent will never fail.

It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
