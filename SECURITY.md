# Security Policy - TimeProofs AgentReady

TimeProofs AgentReady is a static readiness scanner for agent-facing OpenAPI and MCP tools.

It is not a penetration test, runtime firewall, or guarantee that agents will never fail.

## Supported Scope

This policy covers the active AgentReady repository surface:

```txt
agentready-core/
bin/agentready.js
cli/tests/
agentready-examples/
static public AgentReady pages
docs/agentready/
```

The old proof-of-existence timestamp/verify product is not the active product direction.

## Execution Sequence

```txt
1. CLI alpha merged.
2. Validate commercial bad/fixed CI gate behavior.
3. Stabilize AgentReady rule codes.
4. Add GitHub Action wrapper.
5. Publish agentready.json spec v0.1.
6. Add /agentready-ci public page.
7. Then run public site QA/polish.
```

## Reporting a Vulnerability

Please report vulnerabilities privately:

```txt
security@timeproofs.io
https://timeproofs.io/pgp.txt
```

Do not disclose security issues publicly before coordinated remediation.

Useful report details:

```txt
affected file or page
steps to reproduce
expected result
actual result
security or privacy impact
minimal proof of concept, if safe
```

## Security Principles

AgentReady should remain:

```txt
static by default
local-first in browser flows
no live API execution during scanning
no live MCP execution during scanning
no LLM calls during scanning
no submitted spec storage by default
no secret/token exposure in reports
```

## Out of Scope

```txt
old timestamp API
old verify API
old self-hosted proof runtime
old proof SDK
third-party forks
issues requiring live execution of customer APIs
```

## Vulnerability Classes of Interest

```txt
scanner executing a submitted API or MCP tool
uploaded spec data leaving the browser unexpectedly
CLI reading or writing outside requested paths
report output exposing secrets from input specs
malformed input causing unsafe behavior
cross-site scripting in static report rendering
```

## Mandatory Limitation

TimeProofs AgentReady does not guarantee that an AI agent will never fail.

It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
