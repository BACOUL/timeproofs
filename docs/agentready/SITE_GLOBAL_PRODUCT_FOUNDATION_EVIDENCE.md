# AgentReady Global Product Foundation Evidence

Status: PREFLIGHT STARTED

Batch: `ARB-SITE-GLOBAL-002`

Branch: `site-agentready-global-product`

Base branch: `site-agentready-premium-foundation`

Base head verified: `8ea9b08e9c772f151c3966288f7e82f8efe0ff10`

## Preflight Inventory

Active routes in scope:

- `index.html`
- `agentready.html`
- `agentready-mcp.html`
- `agentready-ci.html`
- `agentready-docs.html`
- `pricing.html`
- `product.html`
- `community.html`
- `pro.html`

Existing active routes available before implementation:

- `index.html`
- `agentready.html`
- `agentready-mcp.html`
- `agentready-ci.html`
- `agentready-docs.html`
- `pricing.html`

New routes planned in this batch:

- `product.html`
- `community.html`
- `pro.html`

Shared shell source:

- PR #132 branch `site-agentready-premium-foundation`
- shared CSS: `assets/site-nav.css`
- shared JavaScript: `assets/site-nav.js`

## Pricing Source Mapping

Pricing authority:

- `docs/agentready/PRICING_AND_ENTITLEMENTS_V0_1.md`
- `docs/agentready/COMMUNITY_PRO_ENTITLEMENTS.md`
- `docs/agentready/GLOBAL_STANDARD_SITE_PROGRAM.md`

Allowed public pricing for this batch:

- Community: `0 EUR`, available, no signup required for current local and CI usage.
- Pro: planned, not purchasable, `24 EUR excluding tax` monthly or `240 EUR excluding tax` annually.
- Team, Agency and Enterprise: not available launch plans and not presented as purchasable.

## Reproducible Scanner Evidence

OpenAPI fixture:

- fixture: `agentready-examples/commercial/openapi-refund-risk.bad.json`
- command: `node bin/agentready.js scan openapi agentready-examples/commercial/openapi-refund-risk.bad.json --out <temp>/openapi --min-score 75 --fail-on critical --json`
- exit code: `1`
- score: `54`
- status: `Needs fixes`
- policy: `FAIL`
- critical findings: `1`
- rule codes: `AR009_UNCLEAR_AGENT_INSTRUCTIONS`, `AR001_UNBOUNDED_WRITE_ACTION`, `AR002_MISSING_CONFIRMATION_BOUNDARY`, `AR006_MISSING_DRY_RUN_OR_PREVIEW`, `AR008_MISSING_IDEMPOTENCY_OR_ROLLBACK`, `AR005_SENSITIVE_DATA_EXPOSURE`, `AR007_OVERBROAD_TOOL_SCOPE`

MCP fixture:

- fixture: `agentready-examples/commercial/mcp-email-risk.bad.json`
- command: `node bin/agentready.js scan mcp agentready-examples/commercial/mcp-email-risk.bad.json --out <temp>/mcp --min-score 75 --fail-on critical --json`
- exit code: `1`
- score: `63`
- status: `Needs fixes`
- policy: `FAIL`
- critical findings: `1`
- rule codes: `AR009_UNCLEAR_AGENT_INSTRUCTIONS`, `AR002_MISSING_CONFIRMATION_BOUNDARY`, `AR005_SENSITIVE_DATA_EXPOSURE`, `AR007_OVERBROAD_TOOL_SCOPE`, `AR003_DESTRUCTIVE_OPERATION_AMBIGUOUS`

## Current Product Claim Inventory

Initial search found no active launch cards for Team, Agency or Enterprise on the in-scope commercial route. Existing pages already state Community is free and Pro is in preparation, but the product body content must be expanded and aligned with the global product foundation.

Known allowed limitation:

```txt
TimeProofs AgentReady does not guarantee that an AI agent will never fail. It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
```

## Owner Review

JEASON must review the combined product and pricing preview before merge.
