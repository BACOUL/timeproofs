# AgentReady Global Standard Site Program

Status: ACTIVE EXECUTION AUTHORITY

## Purpose

AgentReady must be presented as both a usable product and a candidate open standard for agent-facing contract readiness. A premium header and a few product pages are not sufficient.

The public site must establish, before broad public validation:

- a usable Community product;
- a clear commercial direction;
- a public standard and rule system;
- transparent governance and versioning;
- a credible company and trust surface;
- developer documentation and adoption paths;
- search and AI discoverability;
- an international architecture;
- independent global QA.

The scanner is the reference implementation of the AgentReady method. It is not the whole identity of the project.

## Existing Foundation PR

PR #132 remains the technical shell foundation:

- branch: site-agentready-premium-foundation;
- reviewed head: 8ea9b08e9c772f151c3966288f7e82f8efe0ff10;
- scope: shared design tokens, navigation, mobile menu, footer and shell accessibility;
- state: open draft, approved only as a stacked implementation base;
- merge rule: do not merge it as the final site by itself.

The historical batch ID ARB-SITE-PREMIUM-001 is retained for audit continuity. All later site work uses ARB-SITE-GLOBAL identifiers.

## Mandatory Sequence

1. ARB-SITE-PREMIUM-001 — global shell, navigation and footer, PR #132 stack base;
2. ARB-SITE-GLOBAL-002 — global product, scanner, CI, Community, Pro and pricing foundation;
3. ARB-SITE-GLOBAL-003 — public AgentReady standard, rules, severity, versioning and governance;
4. ARB-SITE-GLOBAL-004 — company, trust, security, privacy and legal foundation;
5. ARB-SITE-GLOBAL-005 — developer documentation, adoption, examples and contribution paths;
6. ARB-SITE-GLOBAL-006 — SEO, GEO and AI-first, structured data and international architecture;
7. ARB-SITE-GLOBAL-007 — global mobile, accessibility, performance, content, legal-data and discoverability QA;
8. ARB-COM-003 — public Community installation validation;
9. ARB-ONB-001 — three-minute onboarding;
10. external pilot activity only after the preceding gates pass.

## Stacked Pull Request Policy

The site program may use stacked draft pull requests so that TimeProofs production is not left with a visibly partial redesign.

Rules:

- each child PR targets the preceding site branch until the complete preview is accepted;
- each child prompt states the exact base branch and approved base head;
- no child may rewrite or hide unresolved review findings from its parent;
- each PR remains independently reviewable and reversible;
- the final accepted stack is merged in dependency order;
- production deployment is checked after every merge;
- npm, Action tags, releases and Marketplace state remain untouched.

## Required Public Architecture

### Product

- homepage;
- product overview;
- Community;
- Pro direction;
- pricing;
- OpenAPI scanner;
- MCP scanner;
- CI Gate;
- CLI;
- reports and agentready.json;
- examples and realistic demonstrations.

### Standard

- what AgentReady is and is not;
- public specification index;
- rule overview and AR001 through AR010 pages or complete public rule sections;
- severity model;
- scoring model and limitations;
- versioning and compatibility;
- governance and change process;
- namespace and contribution principles;
- reference implementation relationship.

## ARB-SITE-GLOBAL-003 Specification Refinement

Status: IN_REVIEW IMPLEMENTATION DRAFT

Refinement date: 2026-07-13

Future base branch: `site-agentready-global-product`

Previous product implementation head: `6a0beff94240c255e40915f14b8a916fa1e13ce7`

Actual implementation branch base head: `1a71cb469e608d548b42c5884a4165563216733b`

Future implementation branch: `site-agentready-global-standard`

Future draft PR target: `site-agentready-global-product`

Future PR title: `site(standard): publish AgentReady standard foundation`

This refinement authorizes only the future implementation prompt generated from the canonical ledger. It does not implement the pages, create a child branch, merge a site PR, or change the AgentReady engine, CLI, npm package, GitHub Action, tags, releases, Marketplace state, billing, accounts or runtime behavior.

The previous product implementation head is retained as historical evidence. The actual implementation branch base head includes the required canonical specification-refinement commit and must be used when creating `site-agentready-global-standard`.

### Source Inventory

Authoritative sources for the future public standard foundation are:

- `AGENTREADY_MASTER_PLAN.md` for the product boundary, mandatory limitation, Community and Pro separation, and forbidden claims;
- `EXECUTION_SEQUENCE.md`, `DECISION_LOG.md` and `PROJECT_CHANGE_CONTROL.md` for sequencing, stacked PR rules and recorded owner decisions;
- `GLOBAL_STANDARD_SITE_PROGRAM.md`, `PUBLIC_SITE_INFORMATION_ARCHITECTURE.md`, `PREMIUM_SITE_REQUIREMENTS.md` and `SITE_COPY_GUIDE.md` for public architecture, page intent, copy tone and visual expectations;
- `AGENTREADY_RULE_CODES.md` and `agentready-core/types.js` for AR001 through AR010 names, stable identifiers, finding-code mappings, categories and current severity data;
- `AGENTREADY_SCORE_MODEL.md`, `AGENTREADY_JSON_SPEC.md`, CLI tests and current engine constants for score, status, PASS, FAIL, `min-score`, `fail-on` and exit-code behavior;
- `RULE_FORMAT_AND_GOVERNANCE.md`, `MCP_VERSION_COMPATIBILITY_POLICY.md` and `ENGINE_QUALITY_AND_BENCHMARK_PLAN.md` for namespace, rule-change requirements, compatibility and benchmark limitations;
- `GITHUB_ACTION_USAGE.md`, `GITHUB_ACTION_VERSIONING.md`, `AGENTREADY_ACTION_PUBLICATION_EVIDENCE.md` and current public pages for the reference implementation relationship across browser scanner, CLI and GitHub Action.

### Inventory Findings And Acceptance Requirements

- Several internal documents are authoritative but not suitable as public pages verbatim. The implementation must convert them into public explanation while keeping the canonical meaning.
- The public architecture contains overlapping routes for standard, rule codes, JSON, examples, resources and limitations. The implementation must connect these routes without duplicate or dead destinations.
- AR001 through AR010 are stable public identifiers, but current implementation coverage is not equally mature for every rule. The implementation must state coverage limits instead of implying complete detection.
- `ENGINE_QUALITY_AND_BENCHMARK_PLAN.md` records known rule gaps and says measured detection quality is not yet established. The implementation must not claim scientific validation, benchmark proof, certification or guaranteed security.
- Bad and fixed examples may appear only when they are reproducible from repository fixtures, current engine output or already recorded evidence. Missing examples are acceptance blockers, not gaps to fill with invented scenarios.
- AgentReady may be presented as a candidate method and standard ambition. It must not be presented as having formal standards-body recognition, independent certification authority status or a safety guarantee.
- Governance may name TimeProofs and current project change control. It must not invent a foundation, committee, legal identity, third-party endorsement or contribution process that does not exist in the repository.

### Future Public Surfaces

The future implementation must publish or align these surfaces:

- `agentready-standard.html` for the public standard overview, what AgentReady is, what it is not, scope, limitations, governance, namespace and reference implementation relationship;
- `agentready-rule-codes.html` for complete AR001 through AR010 public rule coverage;
- `agentready-json.html` for the public `agentready.json` v0.1 specification index and examples;
- `agentready-examples.html` for reproducible bad/fixed examples and output provenance where fixtures exist;
- `agentready-resources.html` for links between the method, rules, product, docs, GitHub Action and current primary sources;
- `agentready-sample-report.html` for report and result interpretation without implying certification;
- `sitemap.xml` and internal links only where needed for real routes created or aligned by the batch.

The implementation may add static assets or validators under the allowed paths when they directly support the standard foundation and remain dependency-free.

### Non-Implementation Boundary

This refinement intentionally does not:

- create or modify the future public standard pages;
- redesign page bodies or navigation;
- alter rule semantics, severity, scoring, CLI behavior or engine behavior;
- perform npm, Action, tag, Release, Marketplace, billing, account or runtime operations;
- mark ARB-SITE-GLOBAL-003 implemented, in review or done.

## ARB-SITE-GLOBAL-003 Owner Acceptance

Status: OWNER REVIEW ACCEPTED - STACKED PR IN REVIEW

Acceptance date: 2026-07-13

Owner reviewer: JEASON

Reviewed branch: `site-agentready-global-standard`

Reviewed public-content commit: `25636982cd944d3e947081740d5226f692c83741`

Production URL: `https://timeproofs.io/`

Accepted facts:

- The production deployment was manually promoted and verified.
- The homepage displays the new "Public method" presentation.
- `agentready-docs.html` displays `agentready_version: "0.1"`.
- `agentready-docs.html` displays `score: 72`.
- `agentready-docs.html` displays `status: "Minor fixes"`.
- JEASON accepts the visual and factual presentation of ARB-SITE-GLOBAL-003.
- No claim of formal standards-body recognition, independent certification or guaranteed safety was approved.
- No PR was merged.

Canonical effect:

- ARB-SITE-GLOBAL-003 remains `IN_REVIEW` because PR #135 is open and unmerged.
- The owner review is complete for stacked continuation.
- The batch is not `DONE` until PR #135 is merged and reconciled.
- The next stacked batch may proceed only through the canonical generated prompt.

## ARB-SITE-GLOBAL-004 Specification Refinement

Status: EXECUTION_READY SPECIFICATION ONLY

Refinement date: 2026-07-13

Future base branch: `site-agentready-global-standard`

Current approved public-content head for the parent stack:
`25636982cd944d3e947081740d5226f692c83741`

Actual executable stacked base head for the future GLOBAL-004 branch:
`b0946d3fb4403b1281171dd955aa2438f733086a`

Future implementation branch: `site-agentready-global-trust`

Future draft PR target: `site-agentready-global-standard`

Future PR title: `site(trust): publish company and legal foundation`

This refinement authorizes only the future implementation prompt generated
from the canonical ledger. It does not create the implementation branch,
open the implementation PR, implement pages, merge any site PR, or change the
AgentReady engine, CLI, npm package, GitHub Action, tags, releases,
Marketplace state, billing, accounts, licensing, backend or runtime behavior.

The owner-reviewed public-content commit remains recorded separately from the
future implementation base. The future implementation must branch from the
executable PR #135 head that contains this specification refinement, generated
execution views and matching CI workflow guard. If PR #135 advances before the
implementation branch is created, the base head must be reconciled again before
implementation.

### Trust And Legal Source Inventory

Authoritative or factual sources for the future trust/legal foundation are:

- `AGENTREADY_MASTER_PLAN.md`, `EXECUTION_SEQUENCE.md`,
  `PROJECT_CHANGE_CONTROL.md`, `DECISION_LOG.md` and this program for
  execution sequence, stacked PR policy, owner decisions and forbidden claims;
- `PUBLIC_SITE_INFORMATION_ARCHITECTURE.md`, `PREMIUM_SITE_REQUIREMENTS.md`
  and `SITE_COPY_GUIDE.md` for page intent, product positioning and copy
  boundaries;
- `LEGAL_PRIVACY_AND_COOKIE_REQUIREMENTS.md` for required legal identity,
  contact, privacy, cookie, processor, retention and DPA facts that remain
  incomplete until verified;
- `PRIVACY_TELEMETRY_SUPPORT_AND_TRUST_MODEL.md` for no silent Community
  telemetry, accepted signals, future support boundaries and the instruction
  not to claim "No data is ever sent.";
- `LEGAL_IP_AND_LIABILITY_STRATEGY.md` for static-analysis limitation,
  liability posture, open-core boundary and unsupported guarantee claims;
- `SECURITY.md` for the current private security/privacy reporting address
  `security@timeproofs.io`, scope and mandatory limitation;
- `privacy.html`, `legal.html` and `terms.html` for existing public draft
  legal, privacy and terms copy;
- `agentready.html` and `agentready-mcp.html` for browser scanner data flow:
  selected files are read locally, static examples may fetch public fixtures,
  and the static page does not upload the selected file to a TimeProofs
  backend;
- `bin/agentready.js`, CLI tests and current documentation for local CLI file
  behavior;
- `action.yml`, `GITHUB_ACTION_USAGE.md`,
  `GITHUB_ACTION_VERSIONING.md` and
  `AGENTREADY_ACTION_PUBLICATION_EVIDENCE.md` for GitHub Action inputs,
  outputs, local repository execution, minimum permissions, Marketplace facts
  and no hosted scanner dependency;
- `package.json`, `COMMUNITY_LICENSE_DECISION.md`,
  `COMMUNITY_PUBLICATION_POLICY.md` and root `LICENSE` for package name,
  version, root repository license boundary, Apache-2.0 Community package
  boundary and npm publication facts;
- public repository metadata and existing footer/navigation destinations for
  current GitHub, privacy, terms and product paths.

### Trust And Legal Gaps Or Conflicts

- Owner-supplied facts now confirm the operator, publication director,
  TimeProofs business name, legal form, SIREN, postal address, VAT regime and
  public legal/privacy/reporting contact for the GLOBAL-004 public layer.
- `contact@certif-scope.com` is the owner-confirmed public legal, privacy and
  responsible-disclosure contact. Do not use `hello@timeproofs.io` or assume
  `contact@timeproofs.io` is active.
- Public business telephone, Vercel telephone number, exact TimeProofs Vercel
  project configuration, Vercel log-retention periods and unsupported privacy
  legal bases, recipients and retention details remain explicit blockers.
- Earlier references to `security@timeproofs.io` are not sufficient for the
  public responsible-disclosure channel after JEASON confirmed
  `contact@certif-scope.com`.
- `privacy.html` and `legal.html` must continue to distinguish verified facts
  from final-reliance blockers until all missing facts are completed.
- `LEGAL_IP_AND_LIABILITY_STRATEGY.md` still says no final legal license was
  chosen in that earlier context. This is stale for the Community npm package
  boundary after the later Apache-2.0 decision, while the root repository
  license boundary remains separate.
- Current public copy can say browser Community scans do not require a
  TimeProofs backend or selected-file upload. It must not make a broad
  "zero data collection" claim because hosting logs, public npm statistics,
  public GitHub activity and voluntary feedback may exist.
- Hosting provider and retention details are not fully documented; retention
  periods must be omitted or marked `TO_BE_COMPLETED` unless verified.
- Support, incident, billing, privacy, legal and vulnerability channels are
  desired categories, but not all are verified public channels today.
- No company, legal entity, employee count, office, customer, partner, audit,
  certification, insurance, standards-body recognition or guarantee is
  supported by current repository evidence.

### Future Trust And Legal Routes

The future implementation must publish or align these routes:

- `about.html` - publisher and project identity, factual scope and missing
  legal facts if still unverified;
- `trust.html` - Trust Center hub linking security, privacy, terms, legal
  notice, responsible disclosure, data flow, limitations and support
  boundaries;
- `security.html` - actual static-analysis architecture, threat boundaries,
  non-goals and no hosted scanner requirement;
- `responsible-disclosure.html` - real verified disclosure contact path or
  explicit blocker if not verified;
- `privacy.html` - website, browser scanner, CLI, GitHub Action, npm,
  Vercel/GitHub, optional future Pro and voluntary-feedback data flows;
- `terms.html` - terms of use and user responsibilities without pretending
  paid Pro services are purchasable;
- `legal.html` - legal notice using only verified publisher facts and clear
  `TO_BE_COMPLETED` blockers where facts remain missing;
- `limitations.html` - static-analysis, non-firewall, non-IAM,
  non-certification and no-guarantee boundaries;
- `agentready-data-flow.html` - data-flow matrix for website, browser scanner,
  CLI, GitHub Action, npm package, repository and hosting surfaces;
- `support.html` - support boundaries and real channels only where approved;
- `sitemap.xml` and internal links only for real routes created or aligned by
  the batch.

### Future Trust And Legal Acceptance Requirements

The future implementation must satisfy all of the following:

1. Publisher and project identity are factual and consistent.
2. No company, legal entity, office, employee count, customer, partner,
   certification, audit, insurance or standards-body recognition is invented.
3. Contact details are published only when already approved and real.
4. Security explains the actual architecture and threat boundaries.
5. Responsible disclosure provides a real, usable contact path only when
   verified.
6. Privacy distinguishes browser, CLI, GitHub Action, npm package, website,
   hosting and optional future Pro data flows.
7. Local browser scanning claims are technically accurate.
8. No "zero data collection" claim is made unless every relevant surface
   supports it.
9. Cookies, analytics, hosting logs and third-party processors are described
   factually.
10. Retention periods are stated only when supported by current configuration
    or policy.
11. Legal notice and terms distinguish publisher, product, open-source
    components and planned commercial services.
12. Limitations state that AgentReady is static analysis, not a runtime
    firewall, IAM system, certification or safety guarantee.
13. Community and planned Pro claims remain consistent with approved product
    pages.
14. Existing working scanners and public routes are preserved.
15. Pages remain static, mobile-friendly, keyboard accessible, usable without
    JavaScript for core content and free of 320px overflow.
16. No external font, frontend framework, analytics tracker, telemetry system,
    account system, billing system, backend or hosted scanner is added.
17. No engine, CLI, package, Action, scoring, severity or AR001-AR010
    semantic behavior changes occur.

### Future Trust And Legal Evidence Requirements

The future implementation must record:

- legal and trust source inventory;
- stale or conflicting claim register;
- publisher-identity mapping;
- public route map;
- data-flow matrix for website, browser scanner, CLI, GitHub Action, npm,
  Vercel and GitHub;
- processor and external-service inventory;
- cookie and analytics audit;
- privacy-claim audit;
- security-claim audit;
- responsible-disclosure contact verification or blocker;
- certification and guaranteed-safety claim audit;
- desktop and mobile screenshots;
- keyboard accessibility report;
- no-JavaScript evidence;
- 320px overflow evidence;
- CTA and internal-link report;
- preview or production URL;
- validator and deterministic regeneration results.

## ARB-SITE-GLOBAL-004 Owner Acceptance

Status: OWNER REVIEW ACCEPTED - STACKED PR IN REVIEW

Acceptance date: 2026-07-13

Owner reviewer: JEASON

Reviewed branch: `site-agentready-global-trust`

Reviewed PR: #136

Reviewed head:
`11c488ff98ecb4509dd8bbf916840bf8c9edce77`

Current reconciled PR #136 head:
`50415ac768194a1448cc1081b1b9a60b3b299b96`

Reviewed preview:
`https://timeproofs-git-site-agentready-global-trust-jeason1.vercel.app/`

Accepted facts:

- The company, trust, security, privacy and legal foundation is accepted as a
  stacked implementation layer.
- Owner-confirmed publisher and contact facts are accepted.
- No invented legal, privacy, security, audit, certification, support or
  guaranteed-safety claim was identified.
- Unresolved telephone, Vercel configuration, retention, legal bases,
  recipients and retention details remain recorded as final-reliance blockers.
- This acceptance is not legal advice or final legal certification.
- No PR was merged.

Canonical effect:

- `ARB-SITE-GLOBAL-004` remains `IN_REVIEW` because PR #136 is open and
  unmerged.
- The owner review is complete for stacked-continuation purposes.
- `ARB-SITE-GLOBAL-004` is not `DONE` until PR #136 is merged and reconciled.
- Stacked execution may continue to `ARB-SITE-GLOBAL-005` through the
  canonical generated prompt.
- The reviewed public-content head is retained as historical owner-review
  evidence. The executable parent head for `ARB-SITE-GLOBAL-005` is the current
  reconciled PR #136 head because it includes the owner-acceptance
  reconciliation, generated execution views and workflow guards.

## ARB-SITE-GLOBAL-005 Specification Refinement

Status: EXECUTION_READY SPECIFICATION ONLY

Refinement date: 2026-07-13

Base branch: `site-agentready-global-trust`

Historical GLOBAL-004 reviewed public-content head:
`11c488ff98ecb4509dd8bbf916840bf8c9edce77`

Previous GLOBAL-005 reconciliation head:
`943d9fea90748a0496ce872dc48b14253eb3a16b`

Exact executable parent head:
`50415ac768194a1448cc1081b1b9a60b3b299b96`

Implementation branch: `site-agentready-global-docs-adoption`

Draft PR target: `site-agentready-global-trust`

Draft PR: #137

PR title: `site(docs): publish developer documentation and adoption foundation`

Objective: publish developer documentation, adoption, examples and contribution
paths without changing engine, CLI, package, Action, scoring, rule semantics,
npm, tags, releases, Marketplace, billing, accounts, backend or runtime
behavior.

### Developer Documentation Surfaces

The implementation creates or aligns these public routes and
surfaces:

- `agentready-docs.html` - developer documentation hub and start page;
- `agentready.html` - browser OpenAPI scanner usage and local-first guidance;
- `agentready-mcp.html` - browser MCP scanner usage and accepted input format;
- `agentready-ci.html` - GitHub Action installation, policy behavior and
  immutable pinning;
- `agentready-json.html` - agentready.json and report interpretation;
- `agentready-examples.html` - reproducible OpenAPI and MCP examples;
- `agentready-resources.html` - links between product, standard, trust and
  developer resources;
- `agentready-sample-report.html` - report walkthrough and output fields;
- `agentready-cli.html` - CLI install and command reference;
- `agentready-action.html` - Action setup details if separate from the CI page;
- `agentready-adoption.html` - adoption path from browser scan to repository CI;
- `agentready-contributing.html` - contribution process and boundaries;
- `agentready-troubleshooting.html` - troubleshooting and limitations;
- `sitemap.xml` and internal links only for real routes created or aligned by
  the batch.

### Developer Documentation Acceptance Requirements

The implementation must satisfy all of the following:

1. Developer entry points route users to browser scanner, CLI, GitHub Action,
   reports, examples, standard and trust surfaces.
2. Browser scanner guidance preserves real OpenAPI and MCP local-first scanner
   behavior.
3. CLI documentation covers only currently implemented installation and command
   behavior for `@timeproofs/agentready@alpha`.
4. GitHub Action documentation uses current Marketplace facts, immutable Action
   tag and full-SHA pinning guidance.
5. The canonical consumer workflow declares only `permissions: contents: read`
   unless a clearly scoped example requires otherwise.
6. `agentready.json` and Markdown report explanations match the current
   public schema and real outputs.
7. OpenAPI and MCP examples use reproducible repository fixtures, commands and
   outputs.
8. Adoption guidance requires no signup, upload, token, account, backend or
   Pro purchase.
9. Contribution guidance is limited to real repository capabilities and makes
   no unsupported support, response-time, partnership, governance or maintainer
   acceptance promise.
10. Troubleshooting covers invalid input, policy failure, output paths, path
    spaces, local environment issues and GitHub Action failures without CLI
    behavior changes.
11. Limitations remain explicit: AgentReady is static analysis, not a runtime
    firewall, IAM system, legal advice, audit, certification or safety
    guarantee.
12. Community remains free and available; Pro remains planned and not
    purchasable; Team, Agency and Enterprise are not presented as available.
13. Examples preserve approved package, npm alpha, Action and latest-exception
    facts without performing distribution operations.
14. Pages remain static, mobile-friendly, keyboard accessible, usable without
    JavaScript for core content and free of 320px overflow.
15. No engine, CLI, package, Action, scoring, severity, AR001-AR010 semantic,
    billing, account, backend, hosted scanning or runtime behavior changes
    occur.

### Developer Documentation Evidence Requirements

The implementation must record:

- developer documentation source inventory;
- route map for docs, scanner, CLI, Action, report, examples, adoption,
  contribution, troubleshooting and limitations surfaces;
- real OpenAPI and MCP example provenance with fixture paths, commands, scores,
  statuses and output excerpts;
- CLI command reference audit;
- GitHub Action usage and immutable pinning audit;
- `agentready.json` and Markdown report interpretation audit;
- contribution process source mapping and unsupported-promise audit;
- troubleshooting and limitations audit;
- Community and planned Pro consistency audit;
- CTA and internal-link report;
- desktop and mobile screenshots;
- keyboard accessibility report;
- no-JavaScript evidence;
- 320px overflow evidence;
- preview URL;
- validator and deterministic regeneration results.

### ARB-SITE-GLOBAL-005 Draft Implementation Review State

- PR #137 is the stacked draft implementation PR for
  `site-agentready-global-docs-adoption` targeting
  `site-agentready-global-trust`.
- `ARB-SITE-GLOBAL-005` is `IN_REVIEW` after implementation, evidence and
  validation are recorded.
- `ARB-SITE-GLOBAL-005` is not `DONE` until PR #137 is reviewed, merged and
  reconciled through the canonical execution system.
- `ARB-SITE-GLOBAL-004` remains `IN_REVIEW` and not `DONE`.
- `ARB-SITE-GLOBAL-006` remains a planned skeleton and is not activated by this
  developer-documentation implementation.

### Developers And Adoption

- installation;
- CLI reference;
- GitHub Action usage and immutable pinning;
- configuration and policy behavior;
- report and JSON schemas;
- OpenAPI and MCP examples;
- troubleshooting;
- adoption guide;
- contribution guide;
- changelog.

### Company And Trust

- About;
- Company or Publisher identity;
- Contact;
- Legal notice;
- Privacy;
- Terms;
- Security;
- Responsible disclosure;
- subprocessors or explicit no-subprocessor state where factual;
- DPA or explicit non-applicability while no hosted processing exists;
- sales and subscription terms before a paid offer becomes purchasable.

No legal form, registration number, VAT number, address, representative, insurer, host detail or data-processing claim may be invented. Missing owner-supplied facts block final publication of the affected page.

## Commercial Presentation

The current public commercial direction is:

| Plan | Monthly | Annual | Availability |
| --- | ---: | ---: | --- |
| Community | 0 EUR | 0 EUR | available |
| Pro | 24 EUR excluding tax | 240 EUR excluding tax | planned, not purchasable |

The site must state clearly that Pro pricing is planned and that Pro cannot be purchased until its features, payment, activation, entitlement and lifecycle controls are implemented and tested.

Team, Agency and Enterprise must not be shown as available launch plans.

## SEO Foundation

Every indexable page must have:

- one search intent and one canonical topic;
- unique title and description;
- canonical URL;
- useful heading hierarchy;
- internal links;
- indexability decision;
- factual structured data;
- sitemap inclusion where appropriate;
- no accidental preview indexing;
- useful no-JavaScript content.

SEO pages must serve real reader needs and must not become thin doorway pages.

## GEO And AI-First Foundation

The site must make AgentReady understandable and citable by search assistants and language models through:

- one canonical entity name: TimeProofs AgentReady;
- short extractable definitions;
- explicit what-it-is, what-it-is-not, scope and limitation answers;
- authorship, publisher, dates and version metadata;
- primary-source specification and rule pages;
- stable identifiers and machine-readable schemas;
- factual FAQ answers;
- no-JavaScript definitions and examples;
- Organization, SoftwareApplication, TechArticle, FAQPage and Breadcrumb structured data only where accurate;
- clear links between the standard and its reference implementation;
- tests for common incorrect AI representations.

Experimental AI discovery files may be evaluated, but they must not replace ordinary crawlable pages, structured data, specifications or internal links.

## International Architecture

English remains the canonical technical language for the first complete site.

The architecture must also define:

- French company and legal information where required and factually available;
- language-specific URLs;
- hreflang only for complete equivalent translations;
- x-default strategy;
- locale-aware metadata;
- no automatic partial translation presented as authoritative;
- terminology glossary for future localization.

International architecture is required now; full translation into many languages is not required in this program.

## Relation To Later Roadmap Work

This program creates the public baseline required before external validation. Existing later SITE, SEO, GEO, DOC and CAT tasks remain as deeper expansion work for advanced Pro surfaces, detailed comparison pages, framework integrations, observatory work, ongoing AI monitoring and post-launch category development.

Later tasks must extend the baseline rather than recreate it.

## Non-Negotiable Boundaries

This program does not authorize:

- AgentReady engine changes;
- CLI behavior changes except later separately authorized onboarding work;
- package.json or npm operations;
- Action metadata, immutable tag, Release or Marketplace changes;
- Stripe, accounts, licenses, databases or hosted scanning;
- contract uploads or silent telemetry;
- fake customers, logos, testimonials, benchmarks or certifications;
- claims that AgentReady is already an international standard;
- claims of guaranteed agent safety;
- invented company or legal information.

## Completion Standard

The site is not accepted because every route exists. It is accepted only when a new visitor can understand:

1. the problem;
2. the working product;
3. the public method and rules;
4. how to adopt it;
5. who publishes and governs it;
6. what is free, planned and unavailable;
7. its limitations;
8. where the primary evidence and specifications are located.
