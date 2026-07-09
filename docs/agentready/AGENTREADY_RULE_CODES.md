# AgentReady Rule Codes

TimeProofs AgentReady rule codes are stable identifiers for CI gate reporting.
They turn scanner findings into durable policy signals that can be discussed in pull requests, release gates, and remediation plans.

Active direction:

TimeProofs AgentReady = pre-deployment CI gate for agent-facing OpenAPI and MCP tools.

## Compatibility Contract

AgentReady keeps the existing finding codes for compatibility and adds stable rule codes alongside them.

- `finding.code` remains the existing scanner finding code, for example `missing_human_confirmation_flow`.
- `finding.rule_code` is the stable AgentReady rule code, for example `AR002_MISSING_CONFIRMATION_BOUNDARY`.
- `agentready.json` keeps `tools[].detected_risks` as the existing list of finding codes.
- `agentready.json` adds `tools[].rule_codes` as the stable list of AgentReady rule codes.
- `agentready.json` adds `tools[].detected_rules[]` to map each stable rule code back to the original finding, severity, category, and recommendation.

## Stable Codes

| Rule code | Meaning | Current finding codes |
| --- | --- | --- |
| `AR001_UNBOUNDED_WRITE_ACTION` | A write, money movement, or externally visible action lacks bounded parameters. | `unbounded_parameter` |
| `AR002_MISSING_CONFIRMATION_BOUNDARY` | A dangerous action lacks a documented human confirmation boundary. | `missing_human_confirmation_flow`, `dangerous_action_without_confirmation` |
| `AR003_DESTRUCTIVE_OPERATION_AMBIGUOUS` | A destructive or risky action is not described clearly enough for agent use. | `mcp_dangerous_tool_weak_description` |
| `AR004_BULK_ACTION_WITHOUT_LIMIT` | A collection, bulk, or large response operation lacks limits or structure. | `large_unstructured_response` |
| `AR005_SENSITIVE_DATA_EXPOSURE` | The tool may expose personal, financial, authentication, or customer data. | `sensitive_data_exposure` |
| `AR006_MISSING_DRY_RUN_OR_PREVIEW` | A state-changing action lacks preview, success verification, or an equivalent safe check. | `irreversible_action`, `missing_success_verification` |
| `AR007_OVERBROAD_TOOL_SCOPE` | The tool scope or permission boundary is broader than an agent should receive. | `overbroad_permission`, `agent_context_confusion` |
| `AR008_MISSING_IDEMPOTENCY_OR_ROLLBACK` | The tool does not document corrective errors, retries, rollback, or recovery behavior. | `non_corrective_error`, `missing_error_recovery` |
| `AR009_UNCLEAR_AGENT_INSTRUCTIONS` | The tool name, description, action type, or usage instructions are unclear for agents. | `unclear_operation_name`, `ambiguous_tool_description`, `missing_when_to_use`, `missing_when_not_to_use`, `unknown_action_type`, `mcp_vague_tool_name`, `mcp_missing_output_schema` |
| `AR010_MISSING_RATE_OR_SCOPE_LIMIT` | The tool contract lacks required fields, closed sets, schema constraints, or scope limits. | `missing_enum`, `mcp_missing_input_schema`, `mcp_empty_input_schema`, `mcp_missing_required_fields` |

## CI Gate Use

For the current V1 gate, policy is still severity-based:

```text
agentready scan openapi ./openapi.json --min-score 75 --fail-on critical
agentready scan mcp ./mcp-tools.json --min-score 75 --fail-on critical
```

The stable rule codes make failures easier to track without changing the scanner scoring model. Future policy wrappers can fail on exact rule codes, require explicit waivers, or compare rule-code deltas between bad and fixed contracts.

## Limitations

TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
