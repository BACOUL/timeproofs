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
- `/agentready-ci` public page added.
- Homepage repositioned around AgentReady CI Gate.
- Legacy `selfhost/`, `sdk/`, `manifest.json`, and `manifest.webmanifest` removed.

## Current Product Sequence - Self-Service Commercial Architecture

1. Finalize the self-service commercial architecture.
2. Stabilize Community features.
3. Build Pro features.
4. Define and implement entitlements.
5. Build the minimal license service.
6. Integrate Stripe Checkout in test mode.
7. Process webhooks.
8. Build the customer portal.
9. Create transactional emails.
10. Test renewal, upgrade, downgrade, cancellation, and failed payment.
11. Build Team.
12. Build Agency.
13. Rebuild `pricing.html`.
14. Finalize company, legal, privacy, and cookies.
15. Complete SEO, structured data, and AI discovery.
16. Execute the global launch audit.
17. Open Stripe in production.

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
- Team: 79 EUR HT/month or 790 EUR HT/year.
- Agency: 199 EUR HT/month or 1,990 EUR HT/year.

The prices are an initial product decision and may evolve before real Stripe activation.

There is no manual review offer, mandatory contact-sales step, manual payment path, or Enterprise plan at launch.

## Mandatory Limitation

TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
