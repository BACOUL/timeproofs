# PR Note — Long-Term Roadmap and Release Discipline

## Goal

Define the long-term product roadmap and release discipline for TimeProofs AgentReady.

This allows the project to continue toward V2, V3, V4 and beyond without prematurely claiming Browser V1 is publicly complete.

## Added

```txt
docs/agentready/LONG_TERM_PRODUCT_ROADMAP.md
docs/agentready/RELEASE_DISCIPLINE.md
```

## Updated

```txt
docs/agentready/TODO_NEXT.md
```

## Covered

```txt
Long-term product principle
Current Browser V1 scope
Release status rules
V1 Browser foundation
V1.1 hardening
V2 developer CLI
V3 AgentReady Checked
V4 public acquisition and education
V5 monetization exploration
V6 runtime or monitoring only if validated
Long-term moat
Release discipline
Allowed work before Browser V1 QA PASS
Not allowed before Browser V1 QA PASS
Public launch policy
```

## Important

This PR does not put AgentReady online.
This PR does not claim Browser V1 is complete.
This PR allows planning for future versions without violating the release gate.

## Next recommended PR

```txt
docs(agentready): define V2 CLI scope
```

## Non-goals

```txt
No code changes
No public release claim
No Browser V1 PASS claim
No live API execution
No live MCP execution
No LLM calls
No backend
No accounts
No payments
No dashboard
No runtime firewall
No deployment
```

## Mandatory limitation text

TimeProofs AgentReady does not guarantee that an AI agent will never fail.

It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
