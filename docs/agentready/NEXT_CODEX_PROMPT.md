GENERATED FILE — DO NOT EDIT MANUALLY

Canonical source:
docs/agentready/AGENTREADY_EXECUTION_LEDGER.json

# Next Codex Prompt

Repository: BACOUL/timeproofs
Base: timeproofs
Batch ID: ARB-SITE-PREMIUM-001
Work item IDs: AR-SITE-PREMIUM-001
Owner: CODEX_AND_JEASON
Milestone: M3
Horizon: BEFORE_COMMUNITY_PUBLICATION
Objective: Build premium design system navigation and footer.
Branch: site-agentready-premium-foundation
PR title: site(agentready): build premium design system and navigation

Documents sources:
  - docs/agentready/PREMIUM_SITE_REQUIREMENTS.md
  - docs/agentready/PUBLIC_SITE_INFORMATION_ARCHITECTURE.md
  - docs/agentready/PREMIUM_SITE_REDESIGN_EXECUTION_SPEC.md
  - docs/agentready/SITE_COPY_GUIDE.md

Dependencies:
  - ARB-COM-002

Deliverables:
  - Build premium design system navigation and footer

Routes or surfaces:
  - assets/site-nav.css
  - new shared site CSS or JavaScript assets
  - header navigation and footer on active indexable AgentReady HTML pages

Allowed paths:
  - assets/**
  - *.html
  - docs/agentready/**
  - scripts/**

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
  - AR-SITE-PREMIUM-001: one shared design system controls navigation footer typography focus states buttons and code surfaces; desktop navigation exposes Product Resources Pricing Trust GitHub and Scan a contract with real destinations; Product exposes OpenAPI MCP CI Gate and report or agentready.json destinations; Resources exposes docs examples rules methodology and changelog destinations where real routes exist; mobile navigation has large touch targets grouped links visible CTA Escape close focus containment focus restoration scroll lock and no 320px overflow; critical links remain available through progressive enhancement; footer exposes Product Standard Developers and Trust groups; active indexable AgentReady pages use the shared shell without duplicated nav or footer implementations; page body content and product sections are preserved in this foundation batch; no broken route fake page fake product external font frontend framework tracker telemetry or backend dependency is added; reduced-motion and visible keyboard focus are supported; canonical metadata structured data and mandatory limitation text are preserved

Batch acceptance criteria:
  - one shared design system controls navigation footer typography focus states buttons and code surfaces
  - desktop navigation exposes Product Resources Pricing Trust GitHub and Scan a contract with real destinations
  - Product exposes OpenAPI MCP CI Gate and report or agentready.json destinations
  - Resources exposes docs examples rules methodology and changelog destinations where real routes exist
  - mobile navigation has large touch targets grouped links visible CTA Escape close focus containment focus restoration scroll lock and no 320px overflow
  - critical links remain available through progressive enhancement
  - footer exposes Product Standard Developers and Trust groups
  - active indexable AgentReady pages use the shared shell without duplicated nav or footer implementations
  - page body content and product sections are preserved in this foundation batch
  - no broken route fake page fake product external font frontend framework tracker telemetry or backend dependency is added
  - reduced-motion and visible keyboard focus are supported
  - canonical metadata structured data and mandatory limitation text are preserved

Commands:
  - node scripts/validate-agentready-site-navigation.mjs
  - node scripts/validate-agentready-strategy-docs.mjs
  - node scripts/validate-agentready-execution-system.mjs
  - git diff --check

Independent test plan:
  - inventory every active indexable AgentReady page and existing nav footer variant
  - run static link and duplicate-shell validation
  - test desktop menus by pointer and keyboard
  - test mobile menu at 320 375 768 and 900 pixel widths
  - test Escape outside click focus containment focus restoration and body scroll lock
  - test with reduced motion and JavaScript disabled for critical links
  - record before and after desktop and mobile evidence
  - confirm no page-body redesign or product-code change entered the batch

Required evidence:
  - page and shell migration inventory
  - desktop navigation screenshots
  - mobile closed and open navigation screenshots
  - keyboard and focus test matrix
  - link validation report
  - 320px no-overflow evidence
  - reduced-motion and no-JS evidence
  - shared asset inventory and size summary
  - owner visual review before merge

Rollback: Revert ARB-SITE-PREMIUM-001 without reverting unrelated batches.

Manual actions:
  - JEASON reviews desktop and mobile visual evidence before merge

Authorized external actions:
  - create dependency-free shared CSS and minimal JavaScript assets
  - replace duplicated active-page navigation and footer markup
  - add static validators and documented visual evidence

## Étape Codex préalable

  - inventory all active indexable root HTML pages and current shared assets
  - record every navigation and footer variant
  - map every proposed menu label to an existing valid route
  - identify inline shell styles that conflict with shared assets
  - capture baseline desktop and mobile screenshots
  - open a draft PR before broad HTML migration



External verifications:
  - None

Forbidden actions:
  - do not redesign homepage or page-body sections in this batch
  - do not rewrite product claims beyond navigation and footer labels required for accuracy
  - do not modify engine CLI Action package npm tags billing accounts backend or runtime behavior
  - do not add external fonts frameworks analytics telemetry uploads or live calls
  - do not create fake pages customer logos dashboards certifications or safety claims
  - do not merge without owner visual review

Response format: summarize files changed, validations, workflow status, draft status, and any remaining human review.

