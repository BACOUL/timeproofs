# Product Scope And Non-Goals

Status: ACTIVE SPECIALIZED SPECIFICATION

Authority: `AGENTREADY_MASTER_PLAN.md`.

AgentReady is the shift-left CI gate for agent-facing contracts.

AgentReady analyzes OpenAPI specifications and MCP tools before deployment to identify ambiguous, unbounded or insufficiently controlled agent actions.

## In Scope

- static analysis;
- CI/CD checks before deployment;
- OpenAPI contracts exposed to agents;
- MCP tools exposed to agents;
- rule-coded findings AR001-AR010;
- `agentready.json`;
- Markdown reports;
- CLI;
- GitHub Action;
- CI PASS/FAIL policy.

## Non-Goals

AgentReady is not:

- a runtime firewall;
- an API gateway;
- an MCP proxy;
- an IAM solution;
- an identity provider;
- a conversation monitoring system;
- a guarantee of invulnerability;
- an official certification.

## PASS Meaning

PASS means only:

```txt
No risk covered by the selected AgentReady engine version, ruleset version and policy configuration was detected in the analyzed input.
```

## Mandatory Limitation

TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
