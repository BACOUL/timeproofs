# TimeProofs AgentReady Roadmap

Active direction:

```txt
TimeProofs AgentReady = pre-deployment CI gate for agent-facing OpenAPI and MCP tools.
```

The legacy proof-of-existence product is historical material only. It must not drive new roadmap work in this repository unless explicitly requested.

## Current Baseline

Done:

- CLI alpha merged.
- OpenAPI and MCP static scanning available.
- Commercial bad/fixed CI Gate behavior validated.
- Stable rule codes AR001-AR010 added to findings and `agentready.json`.
- GitHub Action wrapper added.
- `agentready.json` spec v0.1 published and aligned with code.
- Legacy `selfhost/`, `sdk/`, `manifest.json`, and `manifest.webmanifest` removed.

## Current Product Sequence

1. Add `/agentready-ci` public page explaining CI Gate usage.
2. Run public site QA/polish.
3. Keep rule codes and `agentready.json` v0.1 stable.
4. Improve docs/examples only when they help users adopt the CI Gate.
5. Consider AgentReady Checked only after the contract and QA evidence are stable.

## CI Gate Contract

The core CI workflow is:

```txt
OpenAPI or MCP tools file
-> AgentReady CLI or GitHub Action
-> score + status + risk counts
-> rule codes AR001-AR010
-> agentready.json v0.1
-> PASS / FAIL policy decision
```

Recommended V1 policy:

```txt
--min-score 75
--fail-on critical
```

## Do Not Build Yet

- dashboard
- Stripe or payment flow
- backend
- account system
- runtime firewall
- new proof-of-existence product surface
- public safety guarantees

## Mandatory Limitation

TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
