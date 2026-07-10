# Commercial Fixture CI Gate Behavior

Date: 2026-07-10

## Purpose

This document validates TimeProofs AgentReady as a pre-deployment CI gate for agent-facing OpenAPI and MCP tools.

It is not a simple scanner score comparison. The goal is to prove that the CLI can make a build decision:

```txt
bad fixture -> block the build
fixed fixture -> pass the same policy, or clearly reduce severe risk
```

## Policy Used

Final gate policy:

```bash
node bin/agentready.js scan <openapi|mcp> <fixture> --min-score 75 --fail-on critical
```

Rationale:

```txt
--min-score 75 blocks weak contracts.
--fail-on critical blocks uncontrolled dangerous actions.
High findings remain visible for controlled dangerous actions, but do not automatically block the build.
```

Calibration note:

```txt
--min-score 75 --fail-on high was tested first.
It correctly failed all bad fixtures, but it also failed every fixed fixture because controlled dangerous actions still retain high findings.
That policy is useful for strict review mode, but too strict for this CI gate validation.
```

## Fixtures

| Pair | Type | Bad fixture | Fixed fixture |
|---|---|---|---|
| Refund | OpenAPI | `agentready-examples/commercial/openapi-refund-risk.bad.json` | `agentready-examples/commercial/openapi-refund-risk.fixed.json` |
| Email | MCP | `agentready-examples/commercial/mcp-email-risk.bad.json` | `agentready-examples/commercial/mcp-email-risk.fixed.json` |
| Files | MCP | `agentready-examples/commercial/mcp-files-risk.bad.json` | `agentready-examples/commercial/mcp-files-risk.fixed.json` |

## Summary

| Pair | Bad score | Bad policy | Fixed score | Fixed policy | Delta | Bad findings C/H/M/L | Fixed findings C/H/M/L | Gate-ready verdict |
|---|---:|---|---:|---|---:|---|---|---|
| Refund | 54 | FAIL | 84 | PASS | +30 | 1/4/6/0 | 0/3/0/0 | PASS |
| Email | 63 | FAIL | 90 | PASS | +27 | 1/3/4/0 | 0/2/0/0 | PASS |
| Files | 67 | FAIL | 84 | PASS | +17 | 1/3/4/0 | 0/3/0/0 | PASS |

Overall verdict:

```txt
PASS
```

The commercial fixtures validate that AgentReady can act as a CI gate under a realistic policy:

```txt
Bad fixtures fail with exit code 1.
Fixed fixtures pass with exit code 0.
Every bad fixture contains a critical missing human confirmation finding.
Every fixed fixture removes critical risk and scores above 75.
```

## Pair 1 - Refund OpenAPI

### Bad Fixture

File:

```txt
agentready-examples/commercial/openapi-refund-risk.bad.json
```

Result:

```txt
score bad: 54
policy result bad: FAIL
exit code: 1
findings critical/high/medium/low: 1/4/6/0
```

Why bad should block a build:

```txt
The refund operation is a dangerous money-moving action.
It has critical missing_human_confirmation_flow.
It scores below the minimum score threshold.
It also has high-risk findings for unbounded parameters, irreversible action, sensitive data exposure, and overbroad permission.
```

Top findings:

```txt
[critical] missing_human_confirmation_flow - refundOrder
[high] unbounded_parameter - refundOrder
[high] irreversible_action - refundOrder
[high] sensitive_data_exposure - refundOrder
[high] overbroad_permission - refundOrder
```

### Fixed Fixture

File:

```txt
agentready-examples/commercial/openapi-refund-risk.fixed.json
```

Result:

```txt
score fixed: 84
policy result fixed: PASS
exit code: 0
findings critical/high/medium/low: 0/3/0/0
delta score: +30
verdict gate-ready: PASS
```

Why fixed can pass:

```txt
The fixed refund operation removes critical uncontrolled danger.
It scores above the minimum threshold.
It still exposes real high-risk business concerns, but those are controlled enough to be review findings rather than CI blockers under this policy.
```

Remaining top findings:

```txt
[high] irreversible_action - requestOrderRefundWithApproval
[high] sensitive_data_exposure - requestOrderRefundWithApproval
[high] overbroad_permission - requestOrderRefundWithApproval
```

## Pair 2 - Email MCP

### Bad Fixture

File:

```txt
agentready-examples/commercial/mcp-email-risk.bad.json
```

Result:

```txt
score bad: 63
policy result bad: FAIL
exit code: 1
findings critical/high/medium/low: 1/3/4/0
```

Why bad should block a build:

```txt
The email tool can send external messages.
It has critical missing_human_confirmation_flow.
It scores below the minimum score threshold.
It also has high-risk sensitive data exposure, overbroad permission, and weak dangerous-tool description findings.
```

Top findings:

```txt
[critical] missing_human_confirmation_flow - send_email
[high] sensitive_data_exposure - send_email
[high] overbroad_permission - send_email
[high] mcp_dangerous_tool_weak_description - send_email
[medium] ambiguous_tool_description - send_email
```

### Fixed Fixture

File:

```txt
agentready-examples/commercial/mcp-email-risk.fixed.json
```

Result:

```txt
score fixed: 90
policy result fixed: PASS
exit code: 0
findings critical/high/medium/low: 0/2/0/0
delta score: +27
verdict gate-ready: PASS
```

Why fixed can pass:

```txt
The fixed email tool removes critical uncontrolled sending behavior.
It scores well above the minimum threshold.
The remaining high findings are reviewable risk signals for sensitive data and permission scope, not critical build blockers under this policy.
```

Remaining top findings:

```txt
[high] sensitive_data_exposure - send_confirmed_external_email
[high] overbroad_permission - send_confirmed_external_email
```

## Pair 3 - Files MCP

### Bad Fixture

File:

```txt
agentready-examples/commercial/mcp-files-risk.bad.json
```

Result:

```txt
score bad: 67
policy result bad: FAIL
exit code: 1
findings critical/high/medium/low: 1/3/4/0
```

Why bad should block a build:

```txt
The file tool can manage files with dangerous capability.
It has critical missing_human_confirmation_flow.
It scores below the minimum score threshold.
It also has high-risk irreversible action, overbroad permission, and weak dangerous-tool description findings.
```

Top findings:

```txt
[critical] missing_human_confirmation_flow - manage_files
[high] irreversible_action - manage_files
[high] overbroad_permission - manage_files
[high] mcp_dangerous_tool_weak_description - manage_files
[medium] ambiguous_tool_description - manage_files
```

### Fixed Fixture

File:

```txt
agentready-examples/commercial/mcp-files-risk.fixed.json
```

Result:

```txt
score fixed: 84
policy result fixed: PASS
exit code: 0
findings critical/high/medium/low: 0/3/0/0
delta score: +17
verdict gate-ready: PASS
```

Why fixed can pass:

```txt
The fixed files fixture splits read and delete behavior into clearer tools.
It removes critical uncontrolled danger.
It scores above the minimum threshold.
Remaining high findings are visible review signals for file sensitivity and irreversible deletion, but they no longer represent uncontrolled critical behavior under this gate.
```

Remaining top findings:

```txt
[high] sensitive_data_exposure - read_file_within_workspace
[high] irreversible_action - delete_file_after_confirmation
[high] sensitive_data_exposure - delete_file_after_confirmation
```

## Strict Review Mode Observation

The stricter policy:

```bash
node bin/agentready.js scan <openapi|mcp> <fixture> --min-score 75 --fail-on high
```

produced this behavior:

```txt
All bad fixtures: FAIL
All fixed fixtures: FAIL
```

This is expected because fixed dangerous tools still retain high findings. That mode is useful for strict human review, but it is too strict for a CI gate whose goal is to block uncontrolled critical danger while allowing controlled high-risk operations through with visible review findings.

## Conclusion

Commercial fixture CI gate verdict:

```txt
PASS
```

AgentReady can function as a pre-deployment CI gate for these commercial OpenAPI and MCP examples:

```txt
It blocks uncontrolled dangerous actions.
It allows controlled fixed versions with the same policy.
It preserves high-risk findings instead of hiding them.
It produces deterministic CLI exit codes suitable for CI.
```

## Mandatory Limitation

TimeProofs AgentReady does not guarantee that an AI agent will never fail.

It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
