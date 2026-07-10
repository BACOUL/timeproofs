# Long-Term Product Roadmap

## Direction

```txt
TimeProofs AgentReady = pre-deployment CI gate for agent-facing OpenAPI and MCP tools.
```

## Product Thesis

AgentReady should become a portable readiness standard for APIs and MCP tools before AI agents use them.

The durable assets are:

- `agentready.json` v0.1;
- rule codes AR001-AR010;
- commercial bad/fixed fixture evidence;
- CLI and GitHub Action workflows;
- human-readable reports;
- future policy packs and trust layers.

## Phase 1 - CI Gate Foundation

Status: built and merged.

Includes:

- OpenAPI static scanner;
- MCP static scanner;
- CLI alpha;
- GitHub Action wrapper;
- commercial CI Gate validation;
- rule codes AR001-AR010;
- `agentready.json` v0.1 spec and export compatibility.

## Phase 2 - Public CI Adoption

Next.

Work:

- add `/agentready-ci` public page;
- explain recommended policy;
- document workflow copy/paste examples;
- show sample reports and `agentready.json`;
- run public site QA/polish after page addition.

## Phase 3 - Contract Stability

Work:

- keep scoring stable unless fixture evidence proves a bug;
- keep AR001-AR010 stable;
- keep `agentready.json` v0.1 backwards compatible;
- expand examples without changing core semantics.

## Phase 4 - Trust Layer

Possible later work:

- AgentReady Checked;
- signed or hashable report artifact;
- rule-code waivers;
- policy packs;
- private readiness review.

Boundaries:

- no absolute safety claims;
- no runtime firewall until demand is proven;
- no heavy SaaS before the CI Gate proves useful.

## Mandatory Limitation

TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
