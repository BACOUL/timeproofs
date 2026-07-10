# Pull Request

## Summary

Describe what changed and why.

## AgentReady Scope

- [ ] OpenAPI scanner
- [ ] MCP scanner
- [ ] CLI
- [ ] GitHub Action wrapper
- [ ] `agentready.json` v0.1
- [ ] Rule codes AR001-AR010
- [ ] Docs only
- [ ] Other

## Guardrails

Confirm where applicable:

- [ ] No scoring change, or scoring change is explained.
- [ ] No rule code change, or rule code change is explained.
- [ ] No public HTML page change, or page change is intentional.
- [ ] No dashboard, Stripe, backend, account system, or runtime firewall.
- [ ] No live API, MCP, or LLM execution added to scanner flows.
- [ ] No legacy `selfhost/`, `sdk/timeproof.js`, `manifest.json`, or `manifest.webmanifest` reintroduced.

## Tests

List commands or manual checks run:

```txt
node agentready-core/tests/run-agentready-core-tests.mjs
node cli/tests/run-agentready-cli-tests.mjs
node cli/tests/run-agentready-action-smoke-test.mjs
```

## Commercial CI Gate Check

If this touches scanner behavior, CLI policy, rule codes, or scoring, confirm bad/fixed fixtures were checked with:

```txt
--min-score 75
--fail-on critical
```

## Limitation

TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
