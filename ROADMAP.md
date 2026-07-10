# TimeProofs AgentReady Roadmap

Active source of truth:

```txt
docs/agentready/AGENTREADY_MASTER_PLAN.md
```

If this roadmap conflicts with `AGENTREADY_MASTER_PLAN.md`, the master plan prevails.

Active direction:

```txt
AgentReady is the shift-left CI gate for agent-facing contracts.
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
- `/agentready-ci` public page added.
- Homepage repositioned around AgentReady CI Gate.
- Self-service commercial and launch architecture documented.
- CLI public distribution package preparation completed.
- Versioned GitHub Action preparation completed.
- Community release workflow prepared.
- Community + Pro strategy rebaselined.
- Legacy `selfhost/`, `sdk/`, `manifest.json`, and `manifest.webmanifest` removed.

Community public publication remains blocked and has not occurred.

## Locked Execution Plan

The operational source of truth for expected PR order is:

```txt
docs/agentready/SELF_SERVICE_EXECUTION_PLAN.md
```

The PR numbers in that document are expected numbers. If GitHub assigns another number, the title and order remain the authority.

## Immediate Next PR

```txt
release(agentready): resolve Community publication blockers
```

Planned branch:

```txt
release-agentready-community-publication-blockers
```

Purpose:

- resolve Community publication blockers: npm scope, license, ProofSpec references, publication policy, 2FA/trusted publishing, provenance, approval path;
- preserve existing Community CLI, GitHub Action, scoring, rule codes, and `agentready.json` behavior;
- do not publish the package without separate explicit authorization.

The versioned policy configuration PR remains planned after Community publication blockers are resolved and the execution sequence allows it.

## Current Product Sequence - Self-Service Launch

1. Strategic rebaseline.
2. Resolve Community publication blockers.
3. Publish Community.
4. GitHub Marketplace and onboarding.
5. Engine benchmark.
6. MVP Pro.
7. Engine quality alignment.
8. Licensing, Stripe, and automation.
9. Site, legal, and Trust Center.
10. Rule dictionary, badges, and integrations.
11. Launch Community + Pro.
12. Post-revenue Team and Agency.

No paid plan should be displayed as available until its features and entitlements are implemented.

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

- production Stripe payments
- billing backend
- account system
- license service
- dashboard or customer portal
- runtime firewall
- new proof-of-existence product surface
- public safety guarantees

These items are planned future implementation work, not part of docs-only PRs. They must be built in the order above with tests, legal readiness, privacy readiness, and launch QA.

## Self-Service Commercial Direction

AgentReady launch plans:

- Community: 0 EUR.
- Pro: 24 EUR HT/month or 240 EUR HT/year.
- Team: POST_REVENUE.
- Agency: POST_REVENUE.

The prices are an initial product decision and may evolve before real Stripe activation.

There is no manual review offer, mandatory contact-sales step, manual payment path, Team/Agency offer, or Enterprise plan at launch.

## Mandatory Limitation

TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
