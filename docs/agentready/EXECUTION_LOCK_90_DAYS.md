# TimeProofs AgentReady Execution Lock

Current inserted governance PR:

```txt
docs(project): add canonical AgentReady execution system
```

Canonical detailed execution register:

```txt
docs/agentready/AGENTREADY_EXECUTION_LEDGER.json
```

Generated Markdown views must not be edited manually. After the governance PR is merged and reconciled, the next action must be read from `docs/agentready/NEXT_ACTION.md`.

## Status

This lock replaces the earlier CLI-alpha execution lock. CLI alpha, CI Gate validation, rule codes, GitHub Action wrapper, `agentready.json` v0.1, `/agentready-ci`, homepage CI Gate positioning, self-service commercial architecture, CLI public distribution preparation, versioned GitHub Action preparation, and Community release workflow preparation are now merged or in the final review path.

Community public publication remains blocked and has not occurred.

The active lock after this rebaseline is the canonical execution system, then Community publication blocker resolution through the ledger.

## Locked Product Statement

```txt
TimeProofs AgentReady is a pre-deployment CI gate for agent-facing OpenAPI and MCP tools.
```

Core promise:

```txt
Fail the build before unsafe agent-facing APIs or MCP tools are deployed.
```

## Current Execution Phase

```txt
Phase after rebaseline: Resolve Community publication blockers
Current PR: release(agentready): resolve Community publication blockers
Base branch: timeproofs
```

## Next PR Objective

The next PR must only resolve Community publication blockers:

- npm scope;
- license;
- legacy ProofSpec references;
- publication policy;
- 2FA or trusted publishing;
- provenance;
- explicit approval path;
- keep scan, scoring, rule codes, and `agentready.json` behavior unchanged;
- avoid npm publication, release creation, or tag creation without separate explicit authorization.

Planned branch:

```txt
release-agentready-community-publication-blockers
```

## Current Lock Acceptance Criteria

1. The strategic rebaseline PR is merged before Pro work begins.
2. Community publication blockers are resolved before publication.
3. No public HTML page changes are included in the next PR.
4. No scanner scoring, rule-code, or hosted commercial behavior changes are included in the next PR.
5. No Stripe, backend, account, database, license, dashboard, or cookie implementation is included in the next PR.
6. No manual review, quote, request-by-email, manual payment, consulting-first, or Enterprise launch direction is reintroduced.
7. The mandatory limitation text remains present in core docs.

## Locked Execution Plan

The operational source of truth for future PR order is:

```txt
docs/agentready/SELF_SERVICE_EXECUTION_PLAN.md
```

The PR numbers in that document are expected numbers. If GitHub assigns a different number, the title and order remain the authority.

## Build Order

Do not reorder without an explicit recorded decision.

If blockers remain open after the blocker PR, the next authorized action is the owner or legal action named in `COMMUNITY_PUBLICATION_BLOCKERS.md`, not publication.

1. Strategic rebaseline.
2. Resolve Community blockers.
3. Publish Community.
4. Marketplace and onboarding.
5. Engine benchmark.
6. MVP Pro.
7. Engine quality alignment.
8. Licensing, Stripe, and automation.
9. Site, legal, and Trust Center.
10. Rule dictionary, badges, and integrations.
11. Launch Community + Pro.
12. Post-revenue Team and Agency.

## Do Not Build During This Lock

- new product pivot;
- old proof-of-existence product;
- timestamp product;
- public certification claim;
- runtime firewall;
- live MCP execution;
- LLM evaluation product;
- dashboard;
- account system;
- Stripe Checkout implementation;
- database;
- hosted scan storage;
- marketplace;
- broad AI security platform.

These can only move forward in the documented sequence and in dedicated implementation PRs.

## Commercial Guardrails

Launch plans:

- Community: 0 EUR.
- Pro: 24 EUR excl. VAT/month or 240 EUR excl. VAT/year.
- Team: POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT.
- Agency: POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT.

No paid plan should be displayed as available until its features are implemented and entitlements are enforceable.

There is no manual review offer, mandatory contact-sales step, quote workflow, manual payment path, or Enterprise plan at launch.

## Decision Rule Before Any New Task

Before starting any task, ask:

```txt
Does this directly move TimeProofs toward AgentReady CI Gate adoption or self-service launch readiness?
```

If the answer is no, do not do it in this execution lock.

## Mandatory Limitation

TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
