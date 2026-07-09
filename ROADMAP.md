# TimeProofs AgentReady Roadmap

This roadmap replaces the legacy proof/timestamp/verify roadmap for the active repository direction.

Current direction:

```txt
TimeProofs AgentReady = pre-deployment CI gate for agent-facing OpenAPI and MCP tools.
```

## What AgentReady is

AgentReady checks tool contracts before agents use them.

It produces:

```txt
AgentReady Score
risk findings
recommended fixes
Markdown report
agentready.json
agentready-simulation.json
```

The active product is not a runtime firewall, hosted scanner, dashboard, billing system, or broad AI security suite.

## Phase 1 - Browser V1 foundation

Status: built, strict desktop QA still pending.

Delivered:

```txt
Static OpenAPI JSON/YAML scanner
Static MCP tools JSON scanner
Static scenario simulation
agentready.json export
agentready-simulation.json export
Markdown report export
Browser print / Save as PDF support
Static browser test harness
Public docs, examples, resources, sample report, and pricing pages
Commercial bad/fixed fixtures for OpenAPI refund, MCP email, and MCP files risks
Core regression suite
```

Remaining:

```txt
Strict desktop Browser V1 QA
Manual export download checks
Desktop Print / Save as PDF checks
Network tab no-execution checks
Documentation alignment cleanup
```

## Phase 2 - Contract hardening

Goal: make the machine-readable output stable enough for repeatable review and CI use.

Work:

```txt
Keep agentready.json contract stable
Keep score/status language consistent
Keep risk taxonomy documented
Keep OpenAPI and MCP examples aligned with scanner behavior
Strengthen commercial examples without changing public safety claims
```

Non-goals:

```txt
No backend
No dashboard
No Stripe
No hosted file storage
No live API execution
No live MCP execution
No LLM calls
```

## Phase 3 - CLI scope

Goal: make AgentReady usable from terminal and CI without duplicating scanner logic.

Candidate commands:

```bash
agentready scan openapi ./openapi.yaml
agentready scan mcp ./mcp-tools.json
agentready simulate ./agentready.json ./scenario.json
agentready report ./agentready.json
```

Expected outputs:

```txt
agentready.json
agentready-mcp.json
agentready-simulation.json
agentready-report.md
terminal score summary
CI-friendly exit codes
```

Constraint:

```txt
Do not implement CLI or change CLI behavior in metadata cleanup PRs.
```

## Phase 4 - CI gate wrapper

Goal: use AgentReady as a pre-deployment gate for agent-facing OpenAPI and MCP tools.

The CI layer should call the CLI and consume `agentready.json`. It should not duplicate scanner logic.

Possible policy gates:

```txt
minimum score
maximum critical findings
maximum high findings
required human confirmation on dangerous actions
required output schemas for MCP tools
required corrective error responses
```

Constraint:

```txt
Do not create a GitHub Action until the CLI scope is explicitly approved.
```

## Phase 5 - Trust layer exploration

Goal: define AgentReady Checked as a careful artifact, not a safety guarantee.

Possible future artifacts:

```txt
AgentReady Checked report
hashable report bundle
agentready.json evidence
simulation evidence
validity date
```

Constraint:

```txt
No public badge claim before criteria are stable.
No certification claim.
No guarantee of absolute safety.
```

## Legacy direction

The old TimeProofs proof-of-existence, timestamp, verify, ProofSpec, and `.tproof.json` roadmap is legacy. It can be referenced only as historical context unless explicitly approved.

Do not rebuild it in this repository as the active product direction.

## Mandatory limitation

TimeProofs AgentReady does not guarantee that an AI agent will never fail.

It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
