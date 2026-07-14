GENERATED FILE — DO NOT EDIT MANUALLY

Canonical source:
docs/agentready/AGENTREADY_EXECUTION_LEDGER.json

# Next Codex Prompt

Repository: BACOUL/timeproofs
Base: site-agentready-global-discovery

Batch ID: ARB-SITE-GLOBAL-007
Work item IDs: AR-SITE-GLOBAL-007
Owner: CODEX_AND_JEASON
Milestone: M3
Horizon: BEFORE_COMMUNITY_PUBLICATION
Objective: Complete global mobile, accessibility, performance, content, legal-data and discoverability QA for the complete stacked AgentReady public site.
Branch: qa-agentready-global-standard-site
PR title: qa(site): validate complete global standard site
Draft PR target: site-agentready-global-discovery

Documents sources:
  - docs/agentready/AGENTREADY_MASTER_PLAN.md
  - docs/agentready/EXECUTION_SEQUENCE.md
  - docs/agentready/DECISION_LOG.md
  - docs/agentready/PROJECT_CHANGE_CONTROL.md
  - docs/agentready/GLOBAL_STANDARD_SITE_PROGRAM.md
  - docs/agentready/PUBLIC_SITE_INFORMATION_ARCHITECTURE.md
  - docs/agentready/PREMIUM_SITE_REQUIREMENTS.md
  - docs/agentready/SITE_COPY_GUIDE.md
  - docs/agentready/SEO_GEO_AI_FIRST_REQUIREMENTS.md
  - docs/agentready/AGENTREADY_RULE_CODES.md
  - docs/agentready/AGENTREADY_JSON_SPEC.md
  - docs/agentready/GITHUB_ACTION_USAGE.md
  - docs/agentready/DISTRIBUTION_ADOPTION_AND_STANDARDIZATION_STRATEGY.md
  - docs/agentready/SITE_PREMIUM_FOUNDATION_EVIDENCE.md
  - docs/agentready/SITE_GLOBAL_PRODUCT_FOUNDATION_EVIDENCE.md
  - docs/agentready/SITE_GLOBAL_STANDARD_FOUNDATION_EVIDENCE.md
  - docs/agentready/SITE_GLOBAL_TRUST_LEGAL_FOUNDATION_EVIDENCE.md
  - docs/agentready/SITE_GLOBAL_DEVELOPER_DOCS_FOUNDATION_EVIDENCE.md
  - docs/agentready/SITE_GLOBAL_DISCOVERY_FOUNDATION_EVIDENCE.md
  - sitemap.xml
  - robots.txt

Dependencies:
  - ARB-SITE-GLOBAL-006

Deliverables:
  - Complete stacked-site QA implementation for the AgentReady public site
  - Mobile and responsive QA across 320px, 360px, 390px, 412px and tablet widths
  - Accessibility QA for keyboard navigation, focus, landmarks, headings, forms, contrast, reduced motion and no-JavaScript core content
  - Performance QA with static asset inventory, image and script weight review, no external framework/font verification and reproducible measurements
  - Content consistency QA across product, standard, trust, developer and discovery layers
  - Legal and data consistency QA across company facts, privacy, security, disclosure, terms and data-flow routes
  - Discoverability QA for sitemap, robots, canonical URLs, metadata, JSON-LD, Open Graph, Twitter metadata, discovery answers and source citations
  - Functional QA for scanners, simulation, CLI documentation examples, GitHub Action examples, reports, agentready.json, menu and footer links
  - Evidence register, route and viewport matrix, screenshots and validator for the complete combined stack

Routes or surfaces:
  - complete stacked public site covering PR #132 shell navigation footer
  - GLOBAL-002 product and pricing pages
  - GLOBAL-003 public standard, rules, JSON, examples, resources and sample report pages
  - GLOBAL-004 company, trust, security, privacy, disclosure, legal, data-flow, limitations and support pages
  - GLOBAL-005 developer documentation, CLI, Action, adoption, contribution and troubleshooting pages
  - GLOBAL-006 SEO, GEO, JSON-LD, AI-answer and international architecture surfaces
  - all indexable routes in sitemap.xml
  - browser OpenAPI scanner
  - browser MCP scanner
  - simulation route
  - all shared navigation, menu and footer links
  - mobile, accessibility, performance, content, legal-data and discoverability evidence registers

Allowed paths:
  - assets/**
  - *.html
  - docs/agentready/**
  - scripts/**
  - sitemap.xml
  - robots.txt

Forbidden paths:
  - agentready-core/**
  - cli/** where behavior would change
  - bin/**
  - package.json
  - action.yml
  - .github/workflows/** unless a separately identified stale validation guard requires a separately authorized correction
  - packaging/**
  - server/**
  - api/**
  - billing/**
  - account/**
  - LICENSE
  - NOTICE

Acceptance criteria by work item:
  - AR-SITE-GLOBAL-007: the complete combined stack from PR #132, GLOBAL-002, GLOBAL-003, GLOBAL-004, GLOBAL-005 and GLOBAL-006 is validated as one public site without marking any stacked PR as merged; 320px, 360px, 390px, 412px and tablet layouts have no horizontal overflow, readable typography, usable CTA sizing and spacing, working navigation and menu behavior, usable scanners and forms, and wrapped long code, filenames, URLs and tables; keyboard-only navigation, visible focus, skip link, semantic landmarks, one H1 per route, heading hierarchy, form labels, instructions, error and result announcements, contrast, reduced-motion behavior and no-JavaScript core content are verified; native details and menu patterns remain accessible without adding JavaScript-only essential behavior; static asset inventory, image dimensions and compression, CSS and JavaScript weight, no external font or frontend framework, no unnecessary blocking resource, production and preview HTTP behavior and Lighthouse or equivalent measurements are recorded with thresholds and limitations; AgentReady and TimeProofs terminology remains consistent; Community is free and available; Pro is planned and not purchasable; and no duplicated, contradictory, dead-placeholder, unsupported-promise, customer, benchmark, certification, standards-body or guaranteed-safety copy remains; company facts, privacy, data-flow, legal, terms, security and disclosure statements stay consistent with actual browser, CLI, GitHub Action, npm, Vercel and GitHub behavior, and unresolved legal blockers remain explicit; sitemap routes, robots rules, canonical URLs, unique titles and descriptions, factual JSON-LD, Open Graph and Twitter metadata, discovery answer placement after primary content, English canonical architecture, no fake translation, no unsupported hreflang and no doorway or thin page are verified; all internal source citations and CTA destinations resolve without broken routes; OpenAPI scanner, MCP scanner, simulation route, CLI documentation examples, GitHub Action examples, report and agentready.json surfaces, menu and footer links, no-JavaScript routes and production HTTP 200 checks for every indexable route are recorded; no engine, CLI, package, Action, scoring, severity, AR001 through AR010 semantic, npm, tag, Release, Marketplace, billing, account, backend, hosted scanning, telemetry, upload or runtime behavior changes occur

Batch acceptance criteria:
  - the complete combined stack from PR #132, GLOBAL-002, GLOBAL-003, GLOBAL-004, GLOBAL-005 and GLOBAL-006 is validated as one public site without marking any stacked PR as merged
  - 320px, 360px, 390px, 412px and tablet layouts have no horizontal overflow, readable typography, usable CTA sizing and spacing, working navigation and menu behavior, usable scanners and forms, and wrapped long code, filenames, URLs and tables
  - keyboard-only navigation, visible focus, skip link, semantic landmarks, one H1 per route, heading hierarchy, form labels, instructions, error and result announcements, contrast, reduced-motion behavior and no-JavaScript core content are verified
  - native details and menu patterns remain accessible without adding JavaScript-only essential behavior
  - static asset inventory, image dimensions and compression, CSS and JavaScript weight, no external font or frontend framework, no unnecessary blocking resource, production and preview HTTP behavior and Lighthouse or equivalent measurements are recorded with thresholds and limitations
  - AgentReady and TimeProofs terminology remains consistent; Community is free and available; Pro is planned and not purchasable; and no duplicated, contradictory, dead-placeholder, unsupported-promise, customer, benchmark, certification, standards-body or guaranteed-safety copy remains
  - company facts, privacy, data-flow, legal, terms, security and disclosure statements stay consistent with actual browser, CLI, GitHub Action, npm, Vercel and GitHub behavior, and unresolved legal blockers remain explicit
  - sitemap routes, robots rules, canonical URLs, unique titles and descriptions, factual JSON-LD, Open Graph and Twitter metadata, discovery answer placement after primary content, English canonical architecture, no fake translation, no unsupported hreflang and no doorway or thin page are verified
  - all internal source citations and CTA destinations resolve without broken routes
  - OpenAPI scanner, MCP scanner, simulation route, CLI documentation examples, GitHub Action examples, report and agentready.json surfaces, menu and footer links, no-JavaScript routes and production HTTP 200 checks for every indexable route are recorded
  - no engine, CLI, package, Action, scoring, severity, AR001 through AR010 semantic, npm, tag, Release, Marketplace, billing, account, backend, hosted scanning, telemetry, upload or runtime behavior changes occur

Commands:
  - node scripts/rebuild-agentready-ledger-data.mjs
  - node scripts/generate-agentready-ledger-views.mjs --write
  - node scripts/generate-agentready-status.mjs --write
  - node scripts/generate-agentready-next-action.mjs --write
  - node scripts/generate-agentready-next-prompt.mjs --write
  - node scripts/validate-agentready-site-navigation.mjs
  - node scripts/validate-agentready-global-product-site.mjs
  - node scripts/validate-agentready-standard-foundation-site.mjs
  - node scripts/validate-agentready-trust-legal-foundation-site.mjs
  - node scripts/validate-agentready-developer-docs-foundation-site.mjs
  - node scripts/validate-agentready-seo-geo-foundation-site.mjs
  - node scripts/validate-agentready-global-site-qa.mjs
  - node scripts/validate-agentready-action-marketplace-readiness.mjs
  - node scripts/validate-agentready-strategy-docs.mjs
  - node scripts/validate-agentready-execution-system.mjs
  - node cli/tests/run-agentready-community-release-workflow-test.mjs
  - git diff --check

Independent test plan:
  - inventory the complete combined stacked site before QA changes
  - test every indexable route at 320px, 360px, 390px, 412px, tablet and desktop widths
  - run keyboard, focus, skip-link, landmark, heading, form, announcement, contrast and reduced-motion checks
  - run no-JavaScript checks for core content and native details or menu behavior
  - measure static asset, image, CSS and JavaScript weight and run Lighthouse or equivalent reproducible performance checks
  - audit product, standard, trust, developer and discovery copy for consistency, duplicated claims, dead placeholders and unsupported promises
  - audit legal and data statements against verified publisher facts and actual browser, CLI, Action, npm, Vercel and GitHub data flows
  - audit sitemap, robots, canonical URLs, titles, descriptions, JSON-LD, Open Graph, Twitter metadata, discovery answer placement, hreflang and unsupported claims
  - run functional OpenAPI scanner, MCP scanner, simulation, CLI documentation example, GitHub Action example, report, agentready.json, menu and footer checks
  - verify production HTTP 200 for every indexable route
  - rerun deterministic governance regeneration and execution-system validators

Required evidence:
  - complete stacked-site source inventory
  - route and viewport matrix covering every indexable route at 320px, 360px, 390px, 412px, tablet and desktop widths
  - mobile overflow, typography, CTA spacing, navigation, scanner, form, long-code, filename, URL and table wrapping report
  - keyboard accessibility report with focus, skip-link, landmark, one-H1, heading, form, announcement, contrast and reduced-motion checks
  - no-JavaScript evidence for core content and native details or menu behavior
  - performance asset inventory, CSS and JavaScript weight report, image dimensions and compression review, no external font or framework audit and Lighthouse or equivalent reproducible measurements
  - production and preview HTTP behavior report
  - content consistency and unsupported-claim audit
  - company legal data privacy security terms disclosure and data-flow consistency audit
  - discoverability audit for exact sitemap route match, robots, canonical URLs, titles, descriptions, JSON-LD, Open Graph, Twitter metadata, discovery answer placement, English-only canonical architecture, hreflang absence and no doorway or thin page
  - functional QA report for OpenAPI scanner, MCP scanner, simulation, CLI documentation examples, GitHub Action examples, reports, agentready.json surfaces, menu and footer links
  - production HTTP 200 report for every indexable route
  - CTA and internal-link report
  - desktop and mobile screenshots
  - preview URL
  - validator and deterministic regeneration results
  - JEASON final stacked-site review record

Rollback: Revert ARB-SITE-GLOBAL-007 without reverting PR #132 shell, PR #134 product foundation, PR #135 standard foundation, PR #136 trust/legal foundation, PR #137 developer documentation foundation or PR #138 discovery foundation.

Manual actions:
  - JEASON reviews the complete combined global-site QA preview and evidence
  - JEASON confirms whether the stacked site can proceed to later Community installation validation without merging any site PR in this batch
  - JEASON reviews remaining legal-data blockers before any final production reliance

Authorized external actions:
  - perform complete static QA of the stacked public site and update factual evidence
  - make narrowly scoped static page, asset, metadata or link corrections when required by the QA acceptance criteria
  - add or update validators for mobile, accessibility, performance, content, legal-data, discoverability and functional QA
  - record desktop, mobile, keyboard, no-JavaScript, 320px overflow, performance, route and HTTP evidence

## Preliminary Codex steps

  - fetch origin and synchronize the parent branch site-agentready-global-discovery
  - verify git merge-base --is-ancestor 2d07223132dc5ec009b8c38a68a7b4aacb0a6163 HEAD before creating the implementation branch
  - record 2d07223132dc5ec009b8c38a68a7b4aacb0a6163 as the required reviewed ancestor for ARB-SITE-GLOBAL-007
  - create branch qa-agentready-global-standard-site from the current site-agentready-global-discovery HEAD that contains that reviewed ancestor
  - open a draft PR targeting site-agentready-global-discovery before broad QA fixes or evidence work
  - verify PR #132, #134, #135, #136, #137 and #138 remain open draft and unmerged
  - inventory the complete combined stack, sitemap, robots, route metadata, scanners, forms, menu, footer, evidence registers and validators before editing
  - confirm no npm, Action, tag, Release, Marketplace, engine, CLI, package, billing, account, backend or runtime operation is required



External verifications:
  - None

Forbidden actions:
  - do not modify the AgentReady engine
  - do not modify CLI behavior
  - do not modify scoring, severity or AR001 through AR010 semantics
  - do not modify package.json or action.yml
  - do not perform npm operations or change package publication state
  - do not create, move or delete tags
  - do not create or modify GitHub Releases or Marketplace operations
  - do not implement billing, accounts, backend, hosted scanning, telemetry or upload systems
  - do not add analytics trackers, external fonts or frontend frameworks
  - do not create a full post-launch SEO content cluster, competitive comparison pages, fake translations, doorway pages or thin keyword pages
  - do not claim official standards-body recognition, independent certification, benchmark validation, customers, testimonials or guaranteed safety
  - do not merge any site PR

Response format:
- branch name
- draft PR number and URL
- base branch and required reviewed ancestor
- exact head SHA
- files changed grouped by QA fixes, validators, governance and evidence
- route and viewport matrix summary
- mobile and responsive QA results
- accessibility QA results
- performance QA results
- content consistency QA results
- legal and data consistency QA results
- discoverability QA results
- functional scanner and route QA results
- local validation results
- GitHub workflow results
- preview URL
- desktop and mobile evidence paths
- keyboard no-JavaScript and 320px overflow evidence
- remaining JEASON or legal-review points
- confirmation that no npm tag Release Marketplace engine CLI billing account package Action scoring rule or runtime operation occurred
- confirmation that no PR was merged

