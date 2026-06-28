# AgentReady Static Simulation Scenario Fixtures

## Purpose

This directory contains static simulation scenario fixtures for the AgentReady simulation exploration layer.

These fixtures are documentation-first. They do not execute APIs, do not execute MCP tools, do not call an LLM, and do not connect to a backend.

They define what an agent-like scenario should look like before a future static simulation parser exists.

## Scenario fixtures

| File | Source type | Scenario | Expected status |
|---|---|---|---|
| `simulation-openapi-refund-scenario.json` | OpenAPI | Refund requires confirmation | `fail` if confirmation/bounds/success verification are missing |
| `simulation-mcp-delete-file-scenario.json` | MCP | Delete file requires confirmation | `fail` if confirmation/output verification are missing |
| `simulation-openapi-export-customers-scenario.json` | OpenAPI | Export customer data requires boundaries | `warning` or `fail` if permissions/filtering are weak |
| `simulation-mcp-send-email-scenario.json` | MCP | Send email requires confirmation | `fail` if recipient/content confirmation is missing |

## Expected result fixtures

| File | Purpose |
|---|---|
| `simulation-result-openapi-refund-fail.json` | Example failed result for refund scenario |
| `simulation-result-mcp-delete-file-fail.json` | Example failed result for MCP delete scenario |

## Allowed result statuses

```txt
pass
warning
fail
not_applicable
```

## Static-only rule

All simulation fixtures must remain static until a future PR explicitly adds a parser.

```txt
Do not call APIs.
Do not call MCP tools.
Do not call LLMs.
Do not add backend execution.
Do not add runtime firewall behavior.
```

## Future placement in agentready.json

A future `agentready.json` extension may add:

```json
{
  "simulation": {
    "scenarios_total": 2,
    "pass": 0,
    "warning": 0,
    "fail": 2,
    "not_applicable": 0,
    "results": []
  }
}
```

This is not active in V1 exports yet.

## Mandatory limitation text

TimeProofs AgentReady does not guarantee that an AI agent will never fail.

It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
