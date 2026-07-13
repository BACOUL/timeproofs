# AgentReady Global Product Foundation Evidence

Status: OWNER PRODUCT PREVIEW REQUIRED

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

Fixed comparison fixtures displayed or referenced:

- `agentready-examples/commercial/openapi-refund-risk.fixed.json`: score `84`, policy `PASS`.
- `agentready-examples/commercial/mcp-email-risk.fixed.json`: score `90`, policy `PASS`.

Displayed examples are static renderings of the current engine output. They are not customer evidence, benchmark evidence, certification evidence or scientific validation.

## Implemented Route Summary

- `/`: category problem, product action, local scanner CTA, CI path and real OpenAPI output example.
- `/product.html`: product overview, browser scanner, CLI, Action and limitation boundary.
- `/agentready.html`: OpenAPI coverage explanation, reproducible finding before file selection, preserved local browser scanner.
- `/agentready-mcp.html`: accepted MCP JSON format, detectable and non-detectable categories, reproducible finding before file selection, preserved local browser scanner.
- `/agentready-ci.html`: public GitHub Action usage, immutable tag and full-SHA pinning, PASS and policy FAIL behavior, outputs.
- `/agentready-docs.html`: product documentation entry point for browser, CLI, Action and output specs.
- `/community.html`: currently available free Community capabilities, no account, no payment and local-first behavior.
- `/pro.html`: planned Pro boundary, planned pricing, no purchase, no checkout and no availability date.
- `/pricing.html`: Community `0 EUR`, planned Pro `24 EUR excluding tax` monthly or `240 EUR excluding tax` annually, no Team/Agency/Enterprise plan cards.

## CTA And Link Report

Primary product CTAs resolve to existing routes:

- scan OpenAPI: `/agentready.html`
- scan MCP: `/agentready-mcp.html`
- CI Gate: `/agentready-ci.html`
- documentation: `/agentready-docs.html`
- product overview: `/product.html`
- Community: `/community.html`
- planned Pro: `/pro.html`
- pricing: `/pricing.html`

Navigation validation status: `PASS`.

## Availability And Claim Review

- Community is shown as available and free.
- Pro is labelled planned and not purchasable.
- Pro price is mapped to `docs/agentready/PRICING_AND_ENTITLEMENTS_V0_1.md` and `docs/agentready/COMMUNITY_PRO_ENTITLEMENTS.md`.
- Team, Agency and Enterprise are not presented as available launch plans.
- No customer logo, benchmark, certification, standard-status or guaranteed safety claim was added.
- The mandatory limitation appears on the primary product, scanner, CI, docs and pricing surfaces.

## No-JavaScript And Viewport Evidence

Evidence directory:

`docs/agentready/evidence/site-global-product-foundation/`

Generated artifacts:

- desktop screenshots for every primary page: `desktop-index.png`, `desktop-product.png`, `desktop-openapi.png`, `desktop-mcp.png`, `desktop-ci.png`, `desktop-docs.png`, `desktop-community.png`, `desktop-pro.png`, `desktop-pricing.png`.
- mobile screenshots for every primary page at `375px`.
- `320px` screenshots for every primary page.
- no-JavaScript screenshots for `index.html`, `agentready.html`, `agentready-mcp.html`, `agentready-ci.html`, `pricing.html`.
- `overflow-320-report.json`: `PASS`, no page reports horizontal overflow.
- `cta-link-report.json`: `PASS`, no local route is missing.
- `keyboard-focus-report.json`: `PASS`, focus reaches skip link, brand, navigation and CTAs.
- `no-javascript-report.json`: `PASS`, core static content remains visible without JavaScript.
- Combined preview URL: `https://timeproofs-git-site-agentready-global-product-jeason1.vercel.app/`

The core content of the product, pricing and documentation pages is static HTML. Browser scanner execution still requires JavaScript, but each scanner page exposes the coverage, limitations and reproducible example before the upload control.

## Current Product Claim Inventory

Initial search found no active launch cards for Team, Agency or Enterprise on the in-scope commercial route. Existing pages already state Community is free and Pro is in preparation, but the product body content must be expanded and aligned with the global product foundation.

Known allowed limitation:

```txt
TimeProofs AgentReady does not guarantee that an AI agent will never fail. It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
```

## Owner Review

JEASON must review the combined product and pricing preview before merge.

## Production Reconciliation - 2026-07-13

Status: TEMPORARY PRODUCTION ALIGNMENT EXCEPTION ACCEPTED BY OWNER

Expected commit:

`13abbcd4e85c0937550ecaded3cb5b253577b0c4`

Checked production routes:

| Route | HTTP status | Observed production title | Expected PR #134 title | Obsolete copy detected |
| --- | ---: | --- | --- | --- |
| `/` | 200 | `TimeProofs AgentReady - static readiness gate for agent-facing APIs and MCP tools` | `TimeProofs AgentReady - static readiness gate for agent-facing APIs and MCP tools` | No |
| `/product.html` | 200 | `AgentReady Product Overview - TimeProofs` | `AgentReady Product Overview - TimeProofs` | No |
| `/community.html` | 200 | `AgentReady Community - Free local contract readiness` | `AgentReady Community - Free local contract readiness` | No |
| `/pro.html` | 200 | `AgentReady Pro Planned - Pricing and availability` | `AgentReady Pro Planned - Pricing and availability` | No |
| `/pricing.html` | 200 | `AgentReady Pricing - Community free and Pro planned` | `AgentReady Pricing - Community free and Pro planned` | No |
| `/agentready.html` | 200 | `OpenAPI Scanner - TimeProofs AgentReady` | `OpenAPI Scanner - TimeProofs AgentReady` | No |
| `/agentready-mcp.html` | 200 | `MCP Scanner - TimeProofs AgentReady` | `MCP Scanner - TimeProofs AgentReady` | No |
| `/agentready-ci.html` | 200 | `AgentReady GitHub CI Gate - TimeProofs` | `AgentReady GitHub CI Gate - TimeProofs` | No |

Observed production evidence:

- Production server header: `Vercel`.
- Production and PR #134 preview returned matching ETags for each inspected
  route.
- Expected PR #134 copy observed on production includes Product, AgentReady
  Community, AgentReady Pro planned, `npx @timeproofs/agentready@alpha`,
  `24 EUR`, `240 EUR`, `not purchasable` and static readiness gate language
  where applicable.
- Obsolete copy checked and not observed on inspected routes: manual
  AgentReady Review offer, `149 EUR`, Fix Pack, `499 EUR`, mandatory contact
  and email-payment offer.

Interpretation:

The current public HTTP evidence does not show an active production mismatch
on the inspected routes. Public headers do not expose a Vercel project,
deployment commit or branch identifier, so this evidence cannot independently
prove the private Vercel deployment selection beyond the observed matching
content and route ETags.

This record does not complete the full global-site stack. It records only that
the Product, Community, planned Pro and pricing foundation appears aligned on
production as a temporary exception before the remaining global-site batches
are complete.

Owner acceptance:

On 2026-07-13, JEASON reviewed and accepted this reconciliation report. The
acceptance confirms that PR #132 and PR #134 remain open draft PRs, no site PR
has been merged, PR #134 head
`5c211bd4b4795c379f85da5548f2c493e546cbbb` is the current reviewed head, and
the inspected production routes currently match the PR #134 product and pricing
foundation without the obsolete `149 EUR` review offer or `499 EUR` Fix Pack.

This acceptance is limited to the temporary production alignment exception. It
does not mark `ARB-SITE-PREMIUM-001`, `ARB-SITE-GLOBAL-002` or the full
premium/global-standard site as complete. The strict sequence
`ARB-SITE-GLOBAL-003` through `ARB-SITE-GLOBAL-007` remains mandatory.
