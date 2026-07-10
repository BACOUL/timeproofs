# agentready.json Specification v0.1

`agentready.json` is the machine-readable contract produced by TimeProofs AgentReady.

It is designed for pre-deployment CI gates that check whether agent-facing OpenAPI operations and MCP tools are structurally ready before agents can use them.

## Version

The published v0.1 contract version is:

```json
{
  "agentready_version": "0.1"
}
```

Implementations may include compatibility aliases while the CLI and browser exports converge on the v0.1 shape. Consumers should prefer the canonical fields documented here and may continue to read the compatibility fields listed below.

## Required Root Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agentready_version` | string | yes | Contract version. v0.1 uses `"0.1"`. |
| `source_type` | string | yes | Input type. Allowed values: `openapi`, `mcp`. |
| `source_name` | string | yes | Human-readable source name, usually the scanned filename or service name. |
| `generated_at` | string | yes | ISO 8601 UTC timestamp for this export. |
| `score` | number | yes | AgentReady score from 0 to 100. |
| `status` | string | yes | Human-readable readiness status derived from the score. |
| `risk_counts` | object | yes | Count of findings by severity. |
| `tools` | array | yes | One entry per analyzed OpenAPI operation or MCP tool. |

### Compatibility Fields

Current exports may also include:

| Field | Meaning | Compatibility guidance |
| --- | --- | --- |
| `source` | Source metadata object. | Consumers may derive `source_name` from `source.filename` or `source.server_name`. |
| `summary` | Score, status, interpretation, operation count, and risk counts. | Consumers may derive `score`, `status`, and `risk_counts` from `summary`. |

The v0.1 canonical root keeps `score`, `status`, and `risk_counts` easy to read for CI systems, while existing `summary` consumers remain supported.

## Root Field Details

### `source_type`

Allowed values:

```text
openapi
mcp
```

### `status`

Allowed values:

```text
AgentReady
Minor fixes
Needs fixes
Not AgentReady
```

### `risk_counts`

Required shape:

```json
{
  "critical": 0,
  "high": 0,
  "medium": 0,
  "low": 0
}
```

## Required Tool Fields

Each OpenAPI operation or MCP tool is represented as one `tools[]` entry.

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | yes | Stable operation/tool identifier for CI output. |
| `name` | string | yes | Display name for the operation/tool. |
| `method` | string | yes | HTTP method or `MCP_TOOL`. |
| `path` | string | yes | OpenAPI path or synthetic MCP path such as `mcp://tools/send_email`. |
| `action_type` | string | yes | AgentReady action classification. |
| `severity` | string | yes | Highest severity for this tool: `low`, `medium`, `high`, or `critical`. |
| `detected_risks` | array[string] | yes | Existing scanner finding codes. Supported for compatibility. |
| `rule_codes` | array[string] | yes | Stable AgentReady rule codes. Recommended for CI policies and waivers. |
| `detected_rules` | array[object] | yes | Detailed rule results for humans and machines. |
| `recommendations` | array[string] | yes | Fix guidance or operating guidance for this tool. |

### Tool Compatibility Fields

Current exports may also include:

| Current field | v0.1 field | Compatibility guidance |
| --- | --- | --- |
| `operation_id` | `id`, `name` | Consumers may use `operation_id` as both identifier and display name. |
| `risk_level` | `severity` | Consumers may map `risk_level` directly to `severity`. |
| `agent_recommendation` | `recommendations[]` | Consumers may wrap the string in a one-item recommendations array. |
| `requires_human_confirmation` | no direct replacement | Consumers may keep this as a useful extension field. |
| `allowed_when`, `forbidden_when`, `failure_modes` | no direct replacement | Consumers may keep these as useful extension fields. |

## Action Types

Allowed v0.1 values:

```text
READ
SEARCH
LIST
HEALTH_CHECK
WEBHOOK
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

## Risk Compatibility

### `detected_risks`

`detected_risks` remains supported. It contains existing scanner finding codes such as:

```text
missing_human_confirmation_flow
sensitive_data_exposure
overbroad_permission
mcp_missing_output_schema
```

These codes are useful for backwards compatibility and debugging, but they are not the preferred stable CI policy surface.

### `rule_codes`

`rule_codes` is the recommended stable format for CI gates, waivers, remediation tracking, and customer-facing reports.

Rule codes use the `AR###_NAME` pattern, for example:

```text
AR002_MISSING_CONFIRMATION_BOUNDARY
AR005_SENSITIVE_DATA_EXPOSURE
AR007_OVERBROAD_TOOL_SCOPE
```

### `detected_rules`

`detected_rules` gives readable detail for each rule:

```json
{
  "rule_code": "AR002_MISSING_CONFIRMATION_BOUNDARY",
  "finding_code": "missing_human_confirmation_flow",
  "severity": "critical",
  "category": "dangerous_actions",
  "recommendation": "Document the preview, explicit human confirmation step, execution step, and post-action verification."
}
```

Consumers should use:

- `rule_codes` for stable CI decisions and reporting.
- `detected_risks` for compatibility with older AgentReady exports.
- `detected_rules` when they need a readable explanation, severity, category, and recommendation.

## CI Gate Semantics

AgentReady can be used as a CI gate by applying a policy to the scan result.

Recommended v0.1 policy:

```text
min-score: 75
fail-on: critical
```

Equivalent CLI:

```text
node bin/agentready.js scan openapi ./openapi.json --min-score 75 --fail-on critical
node bin/agentready.js scan mcp ./mcp-tools.json --min-score 75 --fail-on critical
```

Policy decision:

| Result | Meaning | Exit code |
| --- | --- | --- |
| `PASS` | Score is at least `min-score` and no finding at or above `fail-on` exists. | `0` |
| `FAIL` | Score is below `min-score`, or at least one finding at or above `fail-on` exists. | `1` |

The CLI also uses:

| Exit code | Meaning |
| --- | --- |
| `2` | Invalid input or CLI usage error. |
| `3` | Unexpected internal error. |

## Minimal Complete Example

```json
{
  "agentready_version": "0.1",
  "source_type": "openapi",
  "source_name": "billing-openapi.json",
  "generated_at": "2026-07-10T05:30:00.000Z",
  "score": 90,
  "status": "AgentReady",
  "risk_counts": {
    "critical": 0,
    "high": 0,
    "medium": 0,
    "low": 0
  },
  "tools": [
    {
      "id": "listInvoices",
      "name": "listInvoices",
      "method": "GET",
      "path": "/invoices",
      "action_type": "LIST",
      "severity": "low",
      "detected_risks": [],
      "rule_codes": [],
      "detected_rules": [],
      "recommendations": [
        "Allow autonomous execution under normal authorization and validation controls."
      ]
    }
  ]
}
```

## Example With Rule Codes

```json
{
  "agentready_version": "0.1",
  "source_type": "openapi",
  "source_name": "refund-openapi.json",
  "generated_at": "2026-07-10T05:31:00.000Z",
  "score": 54,
  "status": "Needs fixes",
  "risk_counts": {
    "critical": 1,
    "high": 4,
    "medium": 6,
    "low": 0
  },
  "tools": [
    {
      "id": "refundOrder",
      "name": "refundOrder",
      "method": "POST",
      "path": "/refunds",
      "action_type": "REFUND",
      "severity": "critical",
      "detected_risks": [
        "missing_human_confirmation_flow",
        "unbounded_parameter",
        "sensitive_data_exposure"
      ],
      "rule_codes": [
        "AR002_MISSING_CONFIRMATION_BOUNDARY",
        "AR001_UNBOUNDED_WRITE_ACTION",
        "AR005_SENSITIVE_DATA_EXPOSURE"
      ],
      "detected_rules": [
        {
          "rule_code": "AR002_MISSING_CONFIRMATION_BOUNDARY",
          "finding_code": "missing_human_confirmation_flow",
          "severity": "critical",
          "category": "dangerous_actions",
          "recommendation": "Document the preview, explicit human confirmation step, execution step, and post-action verification."
        },
        {
          "rule_code": "AR001_UNBOUNDED_WRITE_ACTION",
          "finding_code": "unbounded_parameter",
          "severity": "high",
          "category": "strict_parameters",
          "recommendation": "Add minimum and maximum values for amount, quantity, limit, price, discount, or duration fields."
        },
        {
          "rule_code": "AR005_SENSITIVE_DATA_EXPOSURE",
          "finding_code": "sensitive_data_exposure",
          "severity": "high",
          "category": "sensitive_permissions",
          "recommendation": "Document permission boundaries, redaction, pagination, and least-privilege access."
        }
      ],
      "recommendations": [
        "Do not allow autonomous execution before fixing critical risks.",
        "Require explicit human confirmation before refund execution.",
        "Bound refund amount, currency, recipient, and reason parameters."
      ]
    }
  ]
}
```

## What This Spec Does Not Guarantee

TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.

This specification does not:

- execute API endpoints;
- execute MCP tools;
- connect to live MCP servers;
- validate live authentication or authorization;
- prove security compliance;
- replace penetration testing;
- replace human review for high-risk actions.
