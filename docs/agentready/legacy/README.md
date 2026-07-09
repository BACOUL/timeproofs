# AgentReady legacy archive

Legacy historical material — not active product direction.

The active direction is:

```txt
TimeProofs AgentReady = pre-deployment CI gate for agent-facing OpenAPI and MCP tools.
```

This folder keeps historical notes, proof-of-existence references, completed planning documents, and PR notes out of the active execution path without deleting them.

Do not use this folder to reintroduce:

```txt
proof-of-existence as the main product
timestamp API
verify API
ProofSpec
.tproof.json proof bundles
dashboard
Stripe
backend scanner
runtime firewall
GitHub Action
```

Technical legacy artifacts such as `selfhost/` and `sdk/` are intentionally not moved or deleted by this archive step.

## Folders

| Folder | Contents |
|---|---|
| `proof-of-existence/` | Historical proof/timestamp/verify/tproof material and the original repo audit. |
| `planning-notes/` | Completed or superseded planning/exploration notes. |
| `pr-notes/` | Historical PR notes moved out of the active docs index. |

## Active docs

Use these active docs instead:

```txt
README.md
AGENTREADY_PROJECT_CONTEXT.md
docs/agentready/README.md
docs/agentready/REMAINING_WORK.md
docs/agentready/RELEASE_DISCIPLINE.md
docs/agentready/AGENTREADY_JSON_SPEC.md
docs/agentready/AGENTREADY_RISK_TAXONOMY.md
docs/agentready/V2_CLI_SCOPE.md
docs/agentready/CI_CD_STRATEGY.md
```

## Mandatory limitation

TimeProofs AgentReady does not guarantee that an AI agent will never fail.

It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
