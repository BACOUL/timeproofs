# Security Policy

TimeProofs AgentReady is a static readiness scanner for agent-facing OpenAPI and MCP tools.

It is designed to run before deployment as a CI Gate. It reads local contract files and should not execute submitted APIs, MCP tools, LLM calls, or customer systems.

## Scope

This policy covers:

- browser scanner pages;
- `agentready-core/`;
- AgentReady CLI;
- GitHub Action wrapper;
- `agentready.json` v0.1 output;
- documentation and examples in this repository.

## Security Expectations

AgentReady must remain:

- static by default;
- local/browser-first where applicable;
- free of live API execution during scans;
- free of live MCP execution during scans;
- free of LLM calls during scans;
- careful with uploaded or scanned contracts;
- honest about limitations.

## Reporting

Please report security or privacy issues privately:

```txt
security@timeproofs.io
```

Include:

- affected file, page, CLI command, or action workflow;
- steps to reproduce;
- expected behavior;
- actual behavior;
- possible impact.

## Out Of Scope

- Claims that AgentReady should guarantee absolute AI-agent safety.
- Issues in forks or modified deployments not maintained here.
- Requests to build a runtime firewall, backend, dashboard, or payment flow.

## Mandatory Limitation

TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
