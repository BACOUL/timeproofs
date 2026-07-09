# TimeProofs AgentReady — Commercial Demos Plan

## Purpose

This document defines the commercial demos needed to make TimeProofs AgentReady understandable, credible, and sellable.

A visitor should immediately understand:

```txt
A technically valid API or MCP tool can still be unsafe or unclear for AI agents.
TimeProofs detects those risks before deployment.
```

## Demo principle

Each demo should show:

```txt
1. A realistic API or MCP tool surface.
2. Why an AI agent may misuse it.
3. The AgentReady risks detected.
4. The score impact.
5. The recommended fixes.
6. The corrected version.
7. The improved AgentReady result.
8. The agentready.json output.
```

## Demo format

Each commercial demo should eventually include:

```txt
bad input file
fixed input file
expected agentready.json
expected Markdown report
expected screenshot or sample report page
short public explanation
```

Suggested structure:

```txt
agentready-examples/commercial/
  openapi-refund-risk.bad.json
  openapi-refund-risk.fixed.json
  mcp-email-risk.bad.json
  mcp-email-risk.fixed.json
  mcp-files-risk.bad.json
  mcp-files-risk.fixed.json
```

## Demo 1 — OpenAPI refund/payment risk

### Scenario

An API exposes a refund operation to an AI agent.

The operation is technically valid, but risky:

```txt
refundOrder can refund money.
The amount is not bounded.
The operation lacks explicit human confirmation guidance.
The success response is vague.
The error response does not help the agent recover safely.
```

### Risks TimeProofs should detect

```txt
dangerous_action_without_confirmation
unbounded_parameter
irreversible_action
missing_success_verification
non_corrective_error
ambiguous_tool_description
```

### Commercial message

```txt
A valid OpenAPI refund endpoint can still be unsafe for autonomous agents.
TimeProofs flags the missing confirmation and bounded-amount controls before deployment.
```

### Recommended fixes

```txt
- Add explicit human confirmation requirement.
- Add maximum refund amount guidance.
- Add clear required fields.
- Add clear success response.
- Add corrective error responses.
- Add runtime guardrail recommendation.
```

## Demo 2 — MCP email sending risk

### Scenario

An MCP server exposes a `sendEmail` tool.

The tool is useful, but risky:

```txt
It can send emails externally.
It may expose sensitive data.
The description is too broad.
It lacks when-not-to-use guidance.
It lacks confirmation guidance.
The output schema is weak.
```

### Risks TimeProofs should detect

```txt
dangerous_action_without_confirmation
sensitive_data_exposure
missing_when_not_to_use
ambiguous_tool_description
missing_output_schema
agent_context_confusion
```

### Commercial message

```txt
An MCP email tool can look simple, but an AI agent needs clear boundaries before it sends messages on behalf of a user.
```

### Recommended fixes

```txt
- Require user confirmation before external send.
- Block or warn when content contains sensitive data.
- Add when-to-use and when-not-to-use instructions.
- Add recipient validation.
- Add output schema with message_id and delivery status.
- Add observability tags for high-risk send actions.
```

## Demo 3 — MCP file deletion/export risk

### Scenario

An MCP server exposes a file manager tool.

The tool can read, export, or delete files.

The risk is structural:

```txt
The tool has broad permissions.
The destructive action is not clearly separated.
The description does not warn the agent.
The schema does not require exact path or confirmation.
The output does not clearly state what changed.
```

### Risks TimeProofs should detect

```txt
overbroad_permission
irreversible_action
dangerous_action_without_confirmation
sensitive_data_exposure
missing_success_verification
mcp_dangerous_tool_weak_description
```

### Commercial message

```txt
Before giving an AI agent file access, separate read/export/delete actions and require strong confirmation for destructive operations.
```

### Recommended fixes

```txt
- Split read, export, and delete into separate tools.
- Require exact path.
- Require explicit confirmation for delete.
- Add file scope boundaries.
- Add output schema with changed_files and status.
- Add simulation scenario for accidental deletion.
```

## Public demo pages later

After fixtures are created and verified, public pages can be added:

```txt
/agentready-demo-refund.html
/agentready-demo-mcp-email.html
/agentready-demo-mcp-files.html
```

Each page should contain:

```txt
- problem statement;
- bad input excerpt;
- score before;
- detected risks;
- fixes;
- score after;
- agentready.json excerpt;
- link to scan your own API/MCP tools.
```

## Acceptance criteria

The demos are commercially useful when:

```txt
- a non-expert founder understands the risk;
- a developer recognizes the technical realism;
- the scanner detects meaningful issues;
- the before/after contrast is obvious;
- the report is strong enough to show as a sample;
- the demos support SEO/GEO pages;
- the demos support future CLI and CI/CD examples.
```

## Do not do

```txt
Do not use fake security claims.
Do not claim the API is fully safe after fixes.
Do not position TimeProofs as a complete pentest.
Do not make demos too complex.
Do not require live API calls.
Do not require live MCP server execution.
```

## Mandatory limitation text

TimeProofs AgentReady does not guarantee that an AI agent will never fail.

It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
