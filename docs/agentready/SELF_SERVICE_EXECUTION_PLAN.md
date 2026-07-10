# AgentReady Self-Service Execution Plan

Status: SUPERSEDED SUMMARY

This active file is intentionally short after the Community + Pro rebaseline.

Execution authority now lives in:

- `AGENTREADY_MASTER_PLAN.md`
- `EXECUTION_SEQUENCE.md`
- `DECISION_LOG.md`

If this file conflicts with `AGENTREADY_MASTER_PLAN.md`, the master plan prevails.

## Current Product Direction

AgentReady is the shift-left CI gate for agent-facing contracts.

AgentReady analyzes OpenAPI specifications and MCP tools before deployment to identify ambiguous, unbounded or insufficiently controlled agent actions.

## Only Next PR

```txt
release(agentready): resolve Community publication blockers
```

Planned branch:

```txt
release-agentready-community-publication-blockers
```

The next PR must resolve blockers only:

- npm scope;
- license decision;
- legacy ProofSpec references;
- publication policy;
- 2FA or trusted publishing;
- release provenance;
- explicit approval path.

It must not publish the package without separate explicit authorization.

## Historical Plan

The pre-rebaseline execution plan is archived at:

```txt
docs/agentready/history/SELF_SERVICE_EXECUTION_PLAN_PRE_REBASELINE.md
```

That archived document is historical only and must not be used to select the next PR or product scope.

## Mandatory Limitation

TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
