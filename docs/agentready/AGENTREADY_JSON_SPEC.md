# TimeProofs AgentReady — agentready.json Specification V1

## Purpose

`agentready.json` is the machine-readable output of TimeProofs AgentReady.

The human report explains the scan to people. `agentready.json` explains the same readiness result to platforms, agent runtimes, MCP marketplaces, CI/CD checks, future CLIs, and internal governance tools.

Its purpose is:

> Describe whether an API operation or MCP tool is structurally ready for AI-agent use, which risks were detected, when it may be used, when it must not be used, and whether human confirmation is required.

## Product flow

```txt
OpenAPI / MCP tools JSON / future tool schema
→ AgentReady analysis
→ AgentReady Score
→ AgentReady Report
→ agentready.json
```

## V1 status

`agentready.json` V1 is a static readiness contract. It is generated locally from the uploaded file and does not require a backend.

```json
{
  "agentready_version": "1.0"
}
```

## Required root shape

```json
{
  "agentready_version": "1.0",
  "generated_at": "2026-06-27T23:00:00.000Z",
  "source_type": "openapi",
  "source": {},
  "summary": {},
  "tools": []
}
```

## Root fields

| Field | Type | Required | Description |
|---|---:|---:|---|
| `agentready_version` | string | yes | Contract version. V1 uses `1.0`. |
| `generated_at` | string | yes | ISO 8601 timestamp generated when the scan result is exported. |
| `source_type` | string | yes | Top-level source type. V1 values: `openapi`, `mcp`. |
| `source` | object | yes | Source metadata from the uploaded file. |
| `summary` | object | yes | Global score, status and risk counts. |
| `tools` | array | yes | One entry per analyzed OpenAPI operation or MCP tool. |

## `source_type`

Allowed V1 values:

```txt
openapi
mcp
```

Future possible values, not active V1 contract values:

```txt
tool_schema
function_calling
```

## `generated_at`

`generated_at` must be an ISO 8601 UTC timestamp.

Example:

```json
{
  "generated_at": "2026-06-27T23:00:00.000Z"
}
```

Generation rule:

```txt
new Date().toISOString()
```

Important: this value makes the exported contract non-deterministic across two exports of the same file. The structural analysis can be the same, but the export timestamp changes.

## `source`

### OpenAPI source

```json
{
  "type": "openapi",
  "filename": "openapi.yaml",
  "openapi_version": "3.1.0"
}
```

Fields:

| Field | Type | Required | Description |
|---|---:|---:|---|
| `type` | string | yes | Must be `openapi`. |
| `filename` | string | yes | Uploaded filename or fallback name. |
| `openapi_version` | string | yes | Version read from the OpenAPI document. |

### MCP source

```json
{
  "type": "mcp",
  "filename": "mcp-tools.json",
  "mcp_version": "",
  "server_name": "Example MCP Server"
}
```

Fields:

| Field | Type | Required | Description |
|---|---:|---:|---|
| `type` | string | yes | Must be `mcp`. |
| `filename` | string | yes | Uploaded filename or fallback name. |
| `mcp_version` | string | yes | MCP version if provided by the source file. Empty string if absent. |
| `server_name` | string | yes | MCP server name if provided. Empty string if absent. |

## `summary`

```json
{
  "score": 72,
  "status": "Needs fixes",
  "score_interpretation": "Needs fixes before being exposed to autonomous or semi-autonomous agents.",
  "total_operations": 24,
  "critical_risks": 3,
  "high_risks": 7,
  "medium_risks": 12,
  "low_risks": 5
}
```

Fields:

| Field | Type | Required | Description |
|---|---:|---:|---|
| `score` | number | yes | AgentReady score from 0 to 100. |
| `status` | string | yes | Human-readable status derived from the score. |
| `score_interpretation` | string | yes | Plain-language meaning of the score. |
| `total_operations` | number | yes | Number of analyzed operations/tools. |
| `critical_risks` | number | yes | Count of critical findings. |
| `high_risks` | number | yes | Count of high findings. |
| `medium_risks` | number | yes | Count of medium findings. |
| `low_risks` | number | yes | Count of low findings. |

### Allowed `status` values

```txt
AgentReady
Minor fixes
Needs fixes
Not AgentReady
```

### Score interpretation rules

```txt
85–100 → Structurally ready for agent use under normal authorization and validation controls.
70–84  → Close to AgentReady, but minor fixes should be completed before broad agent exposure.
50–69  → Needs fixes before being exposed to autonomous or semi-autonomous agents.
0–49   → Not AgentReady. Do not expose to autonomous agents before structural fixes are applied.
```

## `tools[]`

Each analyzed OpenAPI operation or MCP tool becomes one `tools[]` entry.

```json
{
  "operation_id": "refundCustomer",
  "path": "/refunds",
  "method": "POST",
  "action_type": "REFUND",
  "risk_level": "critical",
  "requires_human_confirmation": true,
  "allowed_when": [],
  "forbidden_when": [],
  "failure_modes": [],
  "detected_risks": [],
  "agent_recommendation": "Do not allow autonomous execution before fixing critical risks."
}
```

## `tools[]` fields

| Field | Type | Required | Description |
|---|---:|---:|---|
| `operation_id` | string | yes | OpenAPI operationId, generated fallback ID, or MCP tool name. |
| `path` | string | yes | OpenAPI path or synthetic MCP path such as `mcp://tools/search_docs`. |
| `method` | string | yes | HTTP method or `MCP_TOOL`. |
| `action_type` | string | yes | Classified action type. |
| `risk_level` | string | yes | Highest risk level for the operation/tool. |
| `requires_human_confirmation` | boolean | yes | Whether a human must confirm before execution. |
| `allowed_when` | array[string] | yes | Conditions where an agent may use the tool. |
| `forbidden_when` | array[string] | yes | Conditions where an agent must not use the tool. |
| `failure_modes` | array[string] | yes | Likely ways an agent could fail with this tool. |
| `detected_risks` | array[string] | yes | Risk codes detected by the scan. |
| `agent_recommendation` | string | yes | Plain-language recommendation for agents or runtimes. |

## `method`

Allowed OpenAPI method values:

```txt
GET
POST
PUT
PATCH
DELETE
OPTIONS
HEAD
```

Allowed MCP method value:

```txt
MCP_TOOL
```

## `action_type`

Allowed V1 values:

```txt
READ
SEARCH
LIST
CREATE
UPDATE
DELETE
SEND
PUBLISH
PAY
REFUND
TRANSFER
EXPORT
IMPORT
AUTH
INVITE
SCHEDULE
CANCEL
SENSITIVE_DATA
UNKNOWN
```

## `risk_level`

Allowed values:

```txt
low
medium
high
critical
```

Meaning:

```txt
critical → block autonomous execution until fixed
high     → allow only with strict guardrails, permissions, or review
medium   → fix before broad agent exposure
low      → review during normal hardening
```

## Human confirmation semantics

`requires_human_confirmation: true` means:

> An agent or runtime should not execute the tool autonomously. A human should review and approve the action before execution.

It is automatically recommended for risky action types such as:

```txt
DELETE
SEND
PUBLISH
PAY
REFUND
TRANSFER
EXPORT
CANCEL
SENSITIVE_DATA
```

It should also be true when the scan detects risks such as:

```txt
dangerous_action_without_confirmation
irreversible_action
mcp_dangerous_tool_weak_description
```

## `allowed_when`

`allowed_when` gives positive execution conditions.

Example:

```json
[
  "the target resource is clearly identified",
  "all required parameters are validated"
]
```

## `forbidden_when`

`forbidden_when` gives negative execution conditions.

Example:

```json
[
  "human confirmation is missing",
  "numeric limits such as amount, quantity, price, discount or duration are not bounded"
]
```

## `failure_modes`

`failure_modes` describes likely agent failure patterns.

Examples:

```txt
wrong tool selection
wrong or unsafe parameter value
unsafe autonomous execution
agent cannot recover from error
sensitive data exposure
agent cannot verify action success
```

## `detected_risks`

OpenAPI and shared V1 risk codes:

```txt
unclear_operation_name
ambiguous_tool_description
missing_when_to_use
missing_when_not_to_use
unbounded_parameter
missing_enum
dangerous_action_without_confirmation
irreversible_action
non_corrective_error
missing_error_recovery
sensitive_data_exposure
overbroad_permission
large_unstructured_response
missing_success_verification
agent_context_confusion
unknown_action_type
```

MCP-specific V1 risk codes:

```txt
mcp_vague_tool_name
mcp_missing_input_schema
mcp_empty_input_schema
mcp_missing_required_fields
mcp_dangerous_tool_weak_description
mcp_missing_output_schema
```

## Minimal valid OpenAPI example

```json
{
  "agentready_version": "1.0",
  "generated_at": "2026-06-27T23:00:00.000Z",
  "source_type": "openapi",
  "source": {
    "type": "openapi",
    "filename": "valid-simple-openapi.json",
    "openapi_version": "3.1.0"
  },
  "summary": {
    "score": 88,
    "status": "AgentReady",
    "score_interpretation": "Structurally ready for agent use under normal authorization and validation controls.",
    "total_operations": 1,
    "critical_risks": 0,
    "high_risks": 0,
    "medium_risks": 0,
    "low_risks": 0
  },
  "tools": [
    {
      "operation_id": "listInvoices",
      "path": "/invoices",
      "method": "GET",
      "action_type": "LIST",
      "risk_level": "low",
      "requires_human_confirmation": false,
      "allowed_when": [
        "the agent has a clear user request for this data",
        "the requested data is within the user authorization scope"
      ],
      "forbidden_when": [
        "required parameters or authorization context are missing"
      ],
      "failure_modes": [
        "no major failure mode detected by V1 static analysis"
      ],
      "detected_risks": [],
      "agent_recommendation": "Allow autonomous execution under normal authorization and validation controls."
    }
  ]
}
```

## Minimal valid MCP example

```json
{
  "agentready_version": "1.0",
  "generated_at": "2026-06-27T23:00:00.000Z",
  "source_type": "mcp",
  "source": {
    "type": "mcp",
    "filename": "mcp-tools-simple.json",
    "mcp_version": "",
    "server_name": "Example MCP Server"
  },
  "summary": {
    "score": 76,
    "status": "Minor fixes",
    "score_interpretation": "Close to AgentReady, but minor fixes should be completed before broad agent exposure.",
    "total_operations": 1,
    "critical_risks": 0,
    "high_risks": 0,
    "medium_risks": 1,
    "low_risks": 0
  },
  "tools": [
    {
      "operation_id": "search_docs",
      "path": "mcp://tools/search_docs",
      "method": "MCP_TOOL",
      "action_type": "SEARCH",
      "risk_level": "medium",
      "requires_human_confirmation": false,
      "allowed_when": [
        "the agent has a clear user request for this data",
        "the requested data is within the user authorization scope"
      ],
      "forbidden_when": [
        "required parameters or authorization context are missing"
      ],
      "failure_modes": [
        "wrong tool selection"
      ],
      "detected_risks": [
        "mcp_missing_output_schema"
      ],
      "agent_recommendation": "Allow only after reviewing and applying the recommended fixes."
    }
  ]
}
```

## V1 generation rules

1. The JSON must be valid.
2. `agentready_version` must be present.
3. `generated_at` must be present and ISO 8601.
4. `source_type` must be either `openapi` or `mcp`.
5. `source.type` must match `source_type`.
6. Each analyzable OpenAPI operation or MCP tool must create one `tools[]` entry.
7. Dangerous action types should set `requires_human_confirmation: true` unless strong safety evidence exists.
8. If the action type is uncertain, use `UNKNOWN` and at least `risk_level: medium`.
9. If a critical risk exists, the global status should not be `AgentReady`.
10. If `detected_risks` contains `dangerous_action_without_confirmation`, the recommendation should block autonomous execution.
11. If `detected_risks` contains MCP-specific schema risks, the recommendation should require review before broad agent exposure.

## V1 limitations

TimeProofs AgentReady does not guarantee that an AI agent will never fail.

It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.

V1 does not:

```txt
execute API endpoints
execute MCP tools
connect to live MCP servers
validate runtime permissions
verify authentication scopes
prove security compliance
replace human review for high-risk actions
```

## Strategic role

At the start, the human report makes the product understandable.

Long term, `agentready.json` is the asset that can make TimeProofs harder to copy, because it can become the portable readiness contract for APIs, MCP tools, CI/CD checks, agent runtimes and future marketplaces.
