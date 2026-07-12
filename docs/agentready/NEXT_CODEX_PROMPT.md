GENERATED FILE — DO NOT EDIT MANUALLY

Canonical source:
docs/agentready/AGENTREADY_EXECUTION_LEDGER.json

# Next Codex Prompt

Repository: BACOUL/timeproofs
Base: site-agentready-premium-foundation
Batch ID: ARB-SITE-GLOBAL-002
Work item IDs: AR-SITE-GLOBAL-002
Owner: CODEX_AND_JEASON
Milestone: M3
Horizon: BEFORE_COMMUNITY_PUBLICATION
Objective: Publish global product scanners CI and planned pricing foundation.
Branch: site-agentready-global-product
PR title: site(agentready): publish global product and pricing foundation

Documents sources:
  - docs/agentready/GLOBAL_STANDARD_SITE_PROGRAM.md
  - docs/agentready/PREMIUM_SITE_REQUIREMENTS.md
  - docs/agentready/PUBLIC_SITE_INFORMATION_ARCHITECTURE.md
  - docs/agentready/SITE_COPY_GUIDE.md
  - docs/agentready/PRICING_AND_ENTITLEMENTS_V0_1.md
  - docs/agentready/COMMUNITY_PRO_ENTITLEMENTS.md
  - docs/agentready/GITHUB_ACTION_USAGE.md
  - docs/agentready/AGENTREADY_JSON_SPEC.md

Dependencies:
  - ARB-SITE-PREMIUM-001

Deliverables:
  - Publish global product scanners CI and planned pricing foundation

Routes or surfaces:
  - index.html
  - agentready.html
  - agentready-mcp.html
  - agentready-ci.html
  - agentready-docs.html
  - pricing.html
  - product.html
  - community.html
  - pro.html
  - shared product assets

Allowed paths:
  - assets/**
  - *.html
  - docs/agentready/**
  - scripts/**
  - sitemap.xml
  - robots.txt

Forbidden paths:
  - agentready-core/**
  - bin/**
  - package.json
  - action.yml
  - .github/workflows/**
  - packaging/**
  - server/**
  - api/**
  - LICENSE
  - NOTICE

Acceptance criteria by work item:
  - AR-SITE-GLOBAL-002: a new visitor understands the problem product and primary action within one viewport; OpenAPI and MCP pages explain detection coverage and show realistic findings before file selection; the real scanners remain functional; browser CLI and GitHub Action paths are visible; Community is shown as available and free; planned Pro price is 24 EUR excluding tax monthly or 240 EUR excluding tax annually; Pro is clearly not purchasable and unavailable features are labelled planned; Team Agency and Enterprise are not presented as available; real product outputs and immutable Action usage are used; no fake proof customer benchmark certification or standard-status claim is added; page bodies use varied premium composition rather than repetitive cards; all pages remain usable on mobile and without JavaScript for core content

Batch acceptance criteria:
  - a new visitor understands the problem product and primary action within one viewport
  - OpenAPI and MCP pages explain detection coverage and show realistic findings before file selection
  - the real scanners remain functional
  - browser CLI and GitHub Action paths are visible
  - Community is shown as available and free
  - planned Pro price is 24 EUR excluding tax monthly or 240 EUR excluding tax annually
  - Pro is clearly not purchasable and unavailable features are labelled planned
  - Team Agency and Enterprise are not presented as available
  - real product outputs and immutable Action usage are used
  - no fake proof customer benchmark certification or standard-status claim is added
  - page bodies use varied premium composition rather than repetitive cards
  - all pages remain usable on mobile and without JavaScript for core content

Commands:
  - node scripts/validate-agentready-site-navigation.mjs
  - node scripts/validate-agentready-strategy-docs.mjs
  - node scripts/validate-agentready-execution-system.mjs
  - git diff --check

Independent test plan:
  - test every product and commercial route
  - run real OpenAPI and MCP examples
  - verify price and availability copy against the pricing authority
  - validate all CTA destinations
  - test desktop and 320 375 768 1024 pixel layouts
  - test core content without JavaScript
  - compare the complete preview with the PR #132 shell baseline

Required evidence:
  - desktop and mobile screenshots for every primary page
  - real output provenance
  - pricing source mapping
  - CTA and link report
  - no-JavaScript evidence
  - combined preview URL

Rollback: Revert ARB-SITE-GLOBAL-002 without reverting unrelated batches.

Manual actions:
  - JEASON reviews the combined product and pricing preview

Authorized external actions:
  - create real static product Community and planned Pro pages
  - redesign the six existing core page bodies
  - add shared static product assets and validators

## Étape Codex préalable

  - synchronize to exact PR #132 head 8ea9b08e9c772f151c3966288f7e82f8efe0ff10
  - create the child branch from site-agentready-premium-foundation
  - open a draft PR targeting site-agentready-premium-foundation before broad edits
  - inventory current product claims pricing sources and working scanner behavior



External verifications:
  - None

Forbidden actions:
  - do not change engine CLI package Action workflows npm tags releases Marketplace billing accounts or runtime behavior
  - do not present Pro as purchasable
  - do not invent customers benchmarks legal identities or certifications
  - do not merge any site PR

Response format: summarize files changed, validations, workflow status, draft status, and any remaining human review.

