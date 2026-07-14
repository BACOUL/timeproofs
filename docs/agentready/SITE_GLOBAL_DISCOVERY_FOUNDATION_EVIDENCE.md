# AgentReady SEO, GEO And International Architecture Evidence

Status: IN_REVIEW

Batch: ARB-SITE-GLOBAL-006

Branch: site-agentready-global-discovery

Draft PR: #138

Preview URL: https://timeproofs-git-site-agentready-global-discovery-jeason1.vercel.app/

Actual implementation base SHA: 3cb404b133ee1db01024dc9cba52cd7f8b1faeed

Required reviewed ancestor: 6b22fda5e6a5d3a39bddc6dc04a479e228b7199e

Review date: 2026-07-14

## Scope

This evidence register covers the SEO, GEO, AI-first structured data and international architecture foundation for the stacked AgentReady public site. It records route metadata, canonical URLs, JSON-LD, extractible answer content, source mapping, entity naming, international route policy, sitemap and robots alignment, unsupported-claim review and visual/accessibility evidence.

This batch does not implement the full post-launch SEO content cluster, competitive comparison pages, fake translated pages, experimental `llms.txt`, `AGENTS.md`, analytics, telemetry, backend scanning, billing, accounts, package changes, Action changes, npm operations, tags, Releases or Marketplace operations.

## Route Coverage

The batch covers exactly 34 public routes:

- `/`
- `/product.html`
- `/community.html`
- `/pro.html`
- `/pricing.html`
- `/agentready.html`
- `/agentready-mcp.html`
- `/agentready-ci.html`
- `/agentready-docs.html`
- `/agentready-cli.html`
- `/agentready-action.html`
- `/agentready-adoption.html`
- `/agentready-contributing.html`
- `/agentready-troubleshooting.html`
- `/agentready-standard.html`
- `/agentready-rule-codes.html`
- `/agentready-json.html`
- `/agentready-examples.html`
- `/agentready-resources.html`
- `/agentready-sample-report.html`
- `/agentready-simulation.html`
- `/about.html`
- `/trust.html`
- `/security.html`
- `/responsible-disclosure.html`
- `/privacy.html`
- `/terms.html`
- `/legal.html`
- `/limitations.html`
- `/agentready-data-flow.html`
- `/support.html`
- `/openapi-ai-agent-readiness.html`
- `/mcp-server-readiness.html`
- `/ai-agent-tool-risk-checklist.html`

## Metadata And Structured Data

- Unique titles, descriptions and canonical URLs were added or normalized for each covered route.
- Each covered route includes author, AgentReady version, reviewed-date, canonical-language and primary-source metadata.
- JSON-LD is factual and limited to supported WebPage, TechArticle, SoftwareApplication or SoftwareSourceCode metadata.
- JSON-LD does not contain customer, testimonial, review, aggregate rating, certification, guarantee or standards-body recognition claims.
- Open Graph and Twitter metadata were aligned with the canonical route title, description and URL.

Evidence:

- `docs/agentready/evidence/site-global-discovery-foundation/route-metadata-matrix.json`
- `docs/agentready/evidence/site-global-discovery-foundation/json-ld-audit.json`
- `docs/agentready/evidence/site-global-discovery-foundation/author-version-date-audit.json`

## AI-Answer And Primary-Source Mapping

Each covered route contains an extractible answer block with the visitor-facing heading `AgentReady at a glance`. The block remains machine-extractible through static HTML, `.ar-discovery-answer`, `data-agentready-answer`, JSON-LD and source citations, but it is no longer the first substantive content in `<main>`.

Each covered route states:

- AgentReady is a product and candidate open standard.
- AgentReady performs static pre-deployment analysis.
- AgentReady is not a runtime firewall.
- AgentReady is not independent certification, an official standards-body standard or a guaranteed-safety system.
- Community is free and available.
- Pro is planned and not purchasable.
- English is the current canonical language.

Each route maps its visible answer and JSON-LD citations to repository sources such as the master plan, global site program, rule codes, JSON specification, GitHub Action usage, trust/legal evidence, current scanner implementation or CLI tests.

Evidence:

- `docs/agentready/evidence/site-global-discovery-foundation/ai-answer-inventory.json`
- `docs/agentready/evidence/site-global-discovery-foundation/primary-source-map.json`
- `docs/agentready/evidence/site-global-discovery-foundation/source-inventory.json`

## Route Hierarchy

The discovery answer was moved near the end of each covered `<main>` so the page hero, H1, primary product value, CTA or main content appears first in source order. On `index.html`, the visible source order is:

1. header;
2. AgentReady hero;
3. H1;
4. subtitle;
5. primary CTAs;
6. reproducible result preview;
7. product and adoption sections;
8. limitations;
9. discovery answer;
10. footer.

Evidence:

- `docs/agentready/evidence/site-global-discovery-foundation/route-hierarchy-report.json`

## International Architecture

English remains the canonical language for current public content. No French route is published in this batch because no reviewed French translation exists. No `hreflang` alternate is emitted because there are no genuine translated alternate routes.

The sitemap and robots policy include only real routes and do not expose preview-only, fake-localized, doorway or duplicate routes.

Evidence:

- `docs/agentready/evidence/site-global-discovery-foundation/international-route-policy.json`
- `docs/agentready/evidence/site-global-discovery-foundation/hreflang-audit.json`
- `docs/agentready/evidence/site-global-discovery-foundation/sitemap-robots-audit.json`
- `docs/agentready/evidence/site-global-discovery-foundation/doorway-thin-fake-localization-audit.json`

## Unsupported-Claim Audit

The implemented discovery layer does not introduce:

- official standards-body recognition;
- independent certification;
- guaranteed safety;
- customer logos;
- testimonials;
- benchmark validation;
- artificial localized pages;
- doorway pages;
- thin keyword pages.

Evidence:

- `docs/agentready/evidence/site-global-discovery-foundation/unsupported-claims-audit.json`
- `docs/agentready/evidence/site-global-discovery-foundation/entity-naming-audit.json`

## Link, Accessibility And Layout Evidence

The CTA and internal-link report confirms no broken local route references for the covered pages. Desktop, mobile and no-JavaScript screenshots were generated for every covered route. The 320 px report records no horizontal overflow introduced by this discovery layer.

Evidence:

- `docs/agentready/evidence/site-global-discovery-foundation/cta-link-report.json`
- `docs/agentready/evidence/site-global-discovery-foundation/keyboard-focus-report.json`
- `docs/agentready/evidence/site-global-discovery-foundation/route-hierarchy-report.json`
- `docs/agentready/evidence/site-global-discovery-foundation/no-javascript-report.json`
- `docs/agentready/evidence/site-global-discovery-foundation/overflow-320-report.json`
- `docs/agentready/evidence/site-global-discovery-foundation/desktop/`
- `docs/agentready/evidence/site-global-discovery-foundation/mobile/`
- `docs/agentready/evidence/site-global-discovery-foundation/nojs/`

## Remaining Owner Review

JEASON must review the combined preview and confirm:

- the SEO/GEO answer blocks are factual and useful;
- the JSON-LD does not imply certification, benchmark proof, customer proof or official standards-body recognition;
- the English-only international architecture is acceptable until real translations are reviewed;
- no fake localized, doorway or thin SEO page has been introduced;
- the stacked site sequence remains intact and no site PR has been merged.
