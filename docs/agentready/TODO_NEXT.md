# TODO Next - TimeProofs AgentReady

Active direction:

```txt
TimeProofs AgentReady is a pre-deployment CI gate for agent-facing OpenAPI and MCP tools.
```

Core promise:

```txt
Fail the build before unsafe agent-facing APIs or MCP tools are deployed.
```

## Completed Foundation

```txt
1. CLI alpha merged.
2. Commercial bad/fixed fixture CI Gate behavior validated.
3. Rule codes AR001-AR010 stabilized.
4. GitHub Action wrapper added.
5. agentready.json spec v0.1 published and aligned with code.
6. /agentready-ci public page added.
7. Homepage repositioned around AgentReady CI Gate.
```

## Immediate Next PR

```txt
docs(product): define AgentReady self-service commercial and launch architecture
```

Purpose:

- define the zero-touch B2B commercial model;
- document Community, Pro, Team, and Agency plans;
- document pricing and entitlements without implementing them;
- document future automated purchase, billing, and license flows;
- document legal, privacy, cookie, SEO, GEO, and AI-discovery readiness;
- create a global launch readiness matrix;
- remove active manual-service positioning from roadmap docs.

This PR is docs-only. It must not add Stripe, backend, account, license code, dashboard, cookies, or public HTML changes.

## Build Sequence After This PR

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

## Keep Stable

- scoring thresholds unless a fixture-backed bug is proven;
- rule codes AR001-AR010;
- `agentready.json` v0.1 compatibility;
- CLI exit behavior;
- GitHub Action inputs and outputs;
- bad/fixed commercial CI Gate decisions:
  - Refund bad FAIL / fixed PASS
  - Email bad FAIL / fixed PASS
  - Files bad FAIL / fixed PASS

## Do Not Build In This Docs PR

- dashboard
- production Stripe/payment flow
- backend
- account system
- license service
- database
- runtime firewall
- old proof-of-existence product
- public HTML changes

## Commercial Guardrails

No manual review offer, request-by-email purchase flow, quote workflow, manual payment path, consulting-first model, or Enterprise plan should be presented as the active launch direction.

No paid plan should be displayed as available until its features, entitlements, billing flow, support model, legal pages, and launch QA are ready.

## Mandatory Limitation

TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
