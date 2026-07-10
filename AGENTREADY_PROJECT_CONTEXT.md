# TimeProofs AgentReady Project Context

Read this file before changing the repository.

## Active Direction

```txt
TimeProofs AgentReady = pre-deployment CI gate for agent-facing OpenAPI and MCP tools.
```

AgentReady checks whether OpenAPI operations and MCP tools are clear, bounded, and documented enough before AI agents can use them.

## Current Baseline On `timeproofs`

Built and merged:

- static OpenAPI scanner;
- static MCP tools scanner;
- AgentReady CLI alpha;
- commercial bad/fixed fixture CI Gate validation;
- stable rule codes AR001-AR010;
- GitHub Action wrapper;
- `agentready.json` spec v0.1;
- `agentready.json` export with `detected_risks`, `rule_codes`, and `detected_rules`;
- docs/examples for CLI, GitHub Action, rule codes, and v0.1 spec;
- legacy proof runtime artifacts removed.

## Current Execution Sequence

Completed:

1. CLI alpha merged.
2. Commercial bad/fixed fixture CI Gate behavior validated.
3. AgentReady rule codes stabilized.
4. GitHub Action wrapper added.
5. `agentready.json` spec v0.1 published and aligned with code.

Next:

1. Add `/agentready-ci` public page.
2. Then run public site QA/polish.

## Important Files

```txt
agentready-core/
bin/agentready.js
.github/actions/agentready/action.yml
docs/agentready/COMMERCIAL_FIXTURE_CI_GATE_BEHAVIOR.md
docs/agentready/AGENTREADY_RULE_CODES.md
docs/agentready/AGENTREADY_JSON_SPEC.md
docs/agentready/GITHUB_ACTION_USAGE.md
docs/agentready/TODO_NEXT.md
docs/agentready/REMAINING_WORK.md
```

## Guardrails

Do not create without explicit approval:

- dashboard
- Stripe/payment flow
- backend
- account system
- runtime firewall
- live API execution during scans
- live MCP execution during scans
- LLM calls during scans
- new proof-of-existence product surface

Do not reintroduce:

- `selfhost/`
- `sdk/timeproof.js`
- `manifest.json`
- `manifest.webmanifest`

## Validation Commands

```txt
node agentready-core/tests/run-agentready-core-tests.mjs
node cli/tests/run-agentready-cli-tests.mjs
node cli/tests/run-agentready-action-smoke-test.mjs
```

Commercial policy:

```txt
--min-score 75
--fail-on critical
```

## Mandatory Limitation

TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
