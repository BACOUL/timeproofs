# Three-Minute Onboarding Spec

Status: ACTIVE SPECIALIZED SPECIFICATION

Authority: `AGENTREADY_MASTER_PLAN.md`.

## Target Flow

```txt
discover
-> run locally
-> initialize CI
-> commit
-> first successful GitHub run
```

Target: under three minutes.

No signup, card, token, upload, or global install should be required.

## Planned Commands

These commands are planned and not implemented in this PR:

```txt
npx @timeproofs/agentready scan openapi ./openapi.yaml
npx @timeproofs/agentready scan mcp ./mcp-tools.json
npx @timeproofs/agentready init
npx @timeproofs/agentready demo
```

Possible future cleanup command:

```txt
npx @timeproofs/agentready uninstall
```

## `init` Requirements

Future `init` must:

- detect OpenAPI and MCP files;
- display files before writing;
- ask for confirmation;
- generate the Community workflow;
- run a local scan;
- not generate Pro policy.

## Ethical Upsell

Community keeps CI blocking free.

Forbidden:

```txt
Upgrade to Pro to enable CI blocking.
```

Allowed future wording:

```txt
Need baseline comparison, new-risk-only mode, SARIF annotations or expiring exceptions? Explore AgentReady Pro.
```

Use one line maximum, not in every finding, only for implemented features, and without artificial fear.
