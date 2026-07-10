# Contributing

Thank you for contributing to TimeProofs AgentReady.

Active direction:

```txt
TimeProofs AgentReady = pre-deployment CI gate for agent-facing OpenAPI and MCP tools.
```

## Contribution Priorities

Good contributions strengthen one of these surfaces:

- OpenAPI or MCP static scan reliability.
- AgentReady CLI behavior.
- GitHub Action wrapper behavior.
- Stable rule codes AR001-AR010.
- `agentready.json` v0.1 compatibility.
- Documentation that helps teams use AgentReady as a CI Gate.

## Scope Guardrails

Do not add these without explicit approval:

- dashboard
- Stripe or payment flow
- backend
- account system
- runtime firewall
- live API execution
- live MCP execution
- LLM calls during scans
- legacy proof/timestamp/verify product surface

Do not reintroduce:

- `selfhost/`
- `sdk/timeproof.js`
- `manifest.json`
- `manifest.webmanifest`

## Testing

Run the relevant direct Node tests before opening a PR:

```txt
node agentready-core/tests/run-agentready-core-tests.mjs
node cli/tests/run-agentready-cli-tests.mjs
node cli/tests/run-agentready-action-smoke-test.mjs
```

If a change touches commercial CI Gate behavior, re-run the bad/fixed fixtures with:

```txt
--min-score 75
--fail-on critical
```

## Pull Requests

PRs should state:

- what changed;
- whether scoring changed;
- whether rule codes changed;
- whether `agentready.json` compatibility changed;
- tests executed;
- any remaining risk.

## Mandatory Limitation

TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
