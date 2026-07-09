# Security Policy - TimeProofs AgentReady

TimeProofs AgentReady is a static readiness scanner and future CI gate for agent-facing OpenAPI and MCP tools.

It helps identify structural risks before tools are exposed to AI agents.

## Current security scope

This policy covers:

```txt
Public static website at https://timeproofs.io
Browser OpenAPI scanner
Browser MCP tools scanner
Static simulation page
agentready-core scanner engine
agentready.json and agentready-simulation.json exports
Repository documentation and fixtures
```

The current Browser V1 scanner is designed to run locally in the browser and not call submitted API endpoints, MCP servers, LLM providers, or a TimeProofs backend during scanning.

## Out of scope for the active product

The following are not active AgentReady product surfaces:

```txt
legacy timestamp API
legacy verify API
legacy ProofSpec pages
legacy .tproof.json proof bundles
legacy self-hosted proof server
legacy proof SDK
```

These may still appear in historical files or legacy folders until cleanup is complete.

## Reporting a vulnerability

If you believe you have discovered a security or privacy issue, report it privately.

Contact:

```txt
security@timeproofs.io
https://timeproofs.io/pgp.txt
```

Please include:

```txt
Affected page, file, or component
Steps to reproduce
Expected result
Actual result
Potential impact
Screenshots, logs, or payloads if useful
```

Do not publicly disclose issues before coordinated remediation and acknowledgment.

## Scanner-specific issues

Security reports are especially useful when they show that:

```txt
uploaded specs are sent somewhere unexpectedly
scanner pages call submitted API endpoints
MCP tools are executed instead of statically inspected
secrets from specs are exposed in UI or logs
exports contain unintended sensitive data
score/report output creates misleading safety claims
```

## Expected boundaries

AgentReady should not:

```txt
execute submitted APIs
execute MCP tools
call LLMs
store user specs by default
require accounts
require payments
act as a runtime firewall
claim absolute safety
```

## Mandatory limitation

TimeProofs AgentReady does not guarantee that an AI agent will never fail.

It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
