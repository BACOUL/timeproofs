# TODO Next - TimeProofs AgentReady

Active direction:

```txt
TimeProofs AgentReady = pre-deployment CI gate for agent-facing OpenAPI and MCP tools.
```

## Completed CI Gate Sequence

```txt
1. CLI alpha merged.
2. Commercial bad/fixed fixture CI Gate behavior validated.
3. Rule codes AR001-AR010 stabilized.
4. GitHub Action wrapper added.
5. agentready.json spec v0.1 published and aligned with code.
```

## Immediate Next PR

```txt
feat(site): add AgentReady CI public page
```

Purpose:

- explain AgentReady as a CI Gate;
- show CLI usage;
- show GitHub Action usage;
- link to `agentready.json` v0.1 and AR rule codes;
- keep the page static and local-first;
- do not add backend, dashboard, Stripe, or account flows.

## Then

```txt
qa(site): run public AgentReady site QA/polish
```

QA should verify:

- homepage messaging;
- `/agentready-ci` page;
- OpenAPI scanner;
- MCP scanner;
- sample report;
- docs/examples links;
- no unintended backend/API/MCP/LLM calls.

## Keep Stable

- scoring thresholds unless a fixture-backed bug is proven;
- rule codes AR001-AR010;
- `agentready.json` v0.1 compatibility;
- bad/fixed commercial CI Gate decisions:
  - Refund bad FAIL / fixed PASS
  - Email bad FAIL / fixed PASS
  - Files bad FAIL / fixed PASS

## Do Not Build Yet

- dashboard
- Stripe/payment flow
- backend
- account system
- runtime firewall
- old proof-of-existence product

## Mandatory Limitation

TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
