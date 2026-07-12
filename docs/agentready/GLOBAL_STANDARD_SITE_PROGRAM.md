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
