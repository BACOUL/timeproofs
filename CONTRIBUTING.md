# Contributing to TimeProofs AgentReady

Thank you for contributing to **TimeProofs AgentReady**.

The active project direction is:

```txt
TimeProofs AgentReady = pre-deployment CI gate for agent-facing OpenAPI and MCP tools.
```

AgentReady helps teams inspect OpenAPI specs and MCP tool definitions before exposing them to AI agents.

## Product boundaries

Contributions must stay aligned with the current product:

```txt
Static scanner
OpenAPI readiness
MCP tool readiness
AgentReady Score
AgentReady Report
agentready.json
agentready-simulation.json
Future CLI / CI gate outputs
```

Do not introduce these without explicit approval:

```txt
runtime firewall
dashboard
Stripe or billing
accounts
database
hosted file storage
backend scanner
live API execution
live MCP execution
LLM calls
GitHub Action
legacy proof/timestamp/verify product
```

## Repository structure

```txt
timeproofs/
├── agentready-core/          # Static OpenAPI/MCP scanner engine
├── agentready-examples/      # OpenAPI, MCP, and commercial fixtures
├── docs/agentready/          # Product, QA, roadmap, and contract docs
├── assets/                   # Shared public assets
├── *.html                    # Static public pages and scanner UI
├── package.json              # AgentReady core test script
├── README.md
├── ROADMAP.md
├── CHANGELOG.md
└── SECURITY.md
```

Legacy folders such as `selfhost/` and `sdk/` may still exist for historical reasons. Do not remove or rebuild them unless a cleanup PR explicitly approves it.

## Branching model

Use short, scoped branch names:

```txt
docs-agentready-...
chore-agentready-...
fix-agentready-...
```

Pull requests should target:

```txt
timeproofs
```

## Before changing code

Read these first when relevant:

```txt
README.md
AGENTREADY_PROJECT_CONTEXT.md
docs/agentready/REMAINING_WORK.md
docs/agentready/RELEASE_DISCIPLINE.md
docs/agentready/AGENTREADY_JSON_SPEC.md
docs/agentready/AGENTREADY_RISK_TAXONOMY.md
docs/agentready/V2_CLI_SCOPE.md
```

## Scanner changes

Changes to scanner behavior are higher risk.

If a PR touches `agentready-core/`, it should explain:

```txt
what classification or risk behavior changes
why the change is needed
which fixtures cover it
whether score thresholds changed
whether agentready.json output changed
```

Do not change score thresholds, risk severity, CLI behavior, or exported contract shape as part of a documentation or metadata cleanup PR.

## Documentation changes

Documentation should use the active positioning:

```txt
pre-deployment CI gate for agent-facing OpenAPI and MCP tools
```

Use legacy wording only when marking historical context:

```txt
legacy proof/timestamp/verify/ProofSpec direction
```

## Testing

For scanner-related work, run:

```bash
npm run test:agentready-core
```

If `npm` is unavailable in the local runtime, run the equivalent Node command:

```bash
node agentready-core/tests/run-agentready-core-tests.mjs
```

Expected current result:

```txt
AgentReady core tests: 18/18 passed
```

For static page work, use the repo's existing page checks or browser QA runbooks when applicable.

## Pull request checklist

Before opening a PR, confirm:

```txt
The PR target is timeproofs.
The change fits AgentReady CI Gate direction.
The scope is narrow and named clearly.
No unrelated files were touched.
No legacy proof/timestamp/verify feature was reintroduced.
No dashboard, Stripe, backend, or GitHub Action was added.
Scanner behavior and tests are unchanged unless the PR is explicitly a scanner PR.
```

## Security disclosure

Do not open a public issue for security vulnerabilities.

Contact:

```txt
security@timeproofs.io
https://timeproofs.io/.well-known/security.txt
```

## Mandatory limitation

TimeProofs AgentReady does not guarantee that an AI agent will never fail.

It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
