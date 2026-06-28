# TimeProofs AgentReady — Static Simulation Parser Scope

## Purpose

This document decides the scope for a future **static simulation parser** inside TimeProofs AgentReady.

The parser should strengthen the AgentReady V1 product without turning TimeProofs into a runtime firewall, live agent runner, backend platform, or LLM evaluation suite.

## Decision

The next simulation step should be **code-backed**, but only as a static browser/local parser.

Recommended next implementation PR:

```txt
feat(agentready): add static simulation parser
```

The parser should read existing static files and compare them without executing anything.

```txt
agentready.json
+ simulation scenario JSON
→ static simulation result JSON
```

## Why code-backed now

The documentation and fixtures now exist. A small static parser is the next logical step because it can make the simulation layer concrete without adding infrastructure.

It gives TimeProofs a stronger moat than a simple OpenAPI/MCP scanner:

```txt
scan structure
+ map user-like scenarios
+ detect likely agent failure modes
→ richer AgentReady report
```

## Strict boundaries

The parser must not:

```txt
call APIs
call MCP tools
call LLMs
run autonomous agents
connect to production systems
store user files
require accounts
require payments
require a database
act as a runtime firewall
```

## Parser inputs

### 1. `agentready.json`

The parser receives a previously generated AgentReady contract.

Required fields:

```txt
agentready_version
generated_at
source_type
source
summary
tools[]
```

### 2. Simulation scenario JSON

The parser receives one scenario or a list of scenarios.

Required fields:

```txt
scenario_id
source_type
user_task
expected_action_type
must_require_confirmation
expected_failure_modes
```

Optional fields:

```txt
expected_tool
required_inputs
forbidden_if
```

## Parser output

The parser should return a static simulation result.

```json
{
  "simulation_version": "0.1",
  "generated_at": "2026-06-28T09:00:00.000Z",
  "source_type": "openapi",
  "scenarios_total": 1,
  "pass": 0,
  "warning": 0,
  "fail": 1,
  "not_applicable": 0,
  "results": []
}
```

Each result should use this shape:

```json
{
  "scenario_id": "openapi_refund_requires_confirmation",
  "result": "fail",
  "matched_tool": "refundCustomer",
  "matched_action_type": "REFUND",
  "simulation_findings": [],
  "mapped_agentready_risks": [],
  "recommendation": "Do not allow autonomous execution until confirmation, bounds, and success verification are documented."
}
```

## Result statuses

Allowed values:

```txt
pass
warning
fail
not_applicable
```

### `pass`

The contract appears structurally sufficient for the scenario.

### `warning`

The contract may be usable, but important ambiguity or guardrail gaps exist.

### `fail`

The contract should not be exposed to agents for that scenario before fixes are applied.

### `not_applicable`

No matching tool or operation was found for the scenario.

## Matching rules

The V1 parser should stay simple and deterministic.

### Tool matching order

```txt
1. Match scenario.expected_tool to tools[].operation_id if present.
2. If no expected_tool is provided, match by expected_action_type.
3. If multiple tools match the same action type, return warning unless one exact name match exists.
4. If no tool matches, return not_applicable.
```

### Confirmation rule

If `scenario.must_require_confirmation` is true and the matched tool has `requires_human_confirmation: false`, return `fail`.

Simulation finding:

```txt
confirmation_required_but_not_documented
```

### Action type rule

If `scenario.expected_action_type` does not match the tool `action_type`, return `warning` or `fail` depending on the risk level.

Simulation finding:

```txt
expected_action_type_mismatch
```

### Risk mapping rule

The parser should map existing `detected_risks` into simulation findings.

Examples:

| AgentReady risk | Simulation finding |
|---|---|
| `dangerous_action_without_confirmation` | `confirmation_required_but_not_documented` |
| `unbounded_parameter` | `unsafe_parameter_bounds_missing` |
| `missing_enum` | `closed_set_validation_missing` |
| `missing_success_verification` | `success_verification_missing` |
| `mcp_missing_output_schema` | `output_verification_missing` |
| `mcp_missing_required_fields` | `required_inputs_not_enforced` |
| `sensitive_data_exposure` | `sensitive_data_boundary_missing` |
| `overbroad_permission` | `permission_boundary_too_broad` |

## Where output should live

### V1 decision

Do **not** add simulation output directly to the current exported `agentready.json` yet.

Reason: the current contract is stable enough for V1, and simulation should be proven separately first.

### Recommended V1 output

Use a separate file:

```txt
agentready-simulation.json
```

### Future V1.1 option

If the parser proves useful, add an optional `simulation` block to `agentready.json` later.

```json
{
  "simulation": {
    "simulation_version": "0.1",
    "scenarios_total": 2,
    "pass": 0,
    "warning": 1,
    "fail": 1,
    "not_applicable": 0,
    "results": []
  }
}
```

## Implementation placement

Recommended future files:

```txt
agentready-core/simulation/parse-simulation-scenario.js
agentready-core/simulation/run-static-simulation.js
agentready-core/simulation/simulation-result.js
```

Optional browser page later:

```txt
agentready-simulation.html
```

Do not create the browser page until the core parser works.

## Acceptance tests before code

Future implementation must pass static tests for:

```txt
valid OpenAPI refund scenario → fail when confirmation is missing
valid MCP delete file scenario → fail when output verification is missing
unknown expected_tool → not_applicable
expected_action_type mismatch → warning or fail
safe read/list scenario → pass or warning depending on risks
invalid scenario JSON → clear parser error
missing scenario_id → clear parser error
missing expected_action_type → clear parser error
```

## Recommended next PR

```txt
feat(agentready): add static simulation parser core
```

## Still not allowed

```txt
No live API execution.
No live MCP execution.
No LLM calls.
No autonomous agent runner.
No backend.
No accounts.
No payments.
No dashboard.
No runtime firewall.
```

## Mandatory limitation text

TimeProofs AgentReady does not guarantee that an AI agent will never fail.

It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
