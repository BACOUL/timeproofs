import fs from "node:fs";

const read = (file) => fs.readFileSync(file, "utf8");
const write = (file, content) => fs.writeFileSync(file, content);

function replaceRequired(content, before, after, label) {
  if (!content.includes(before)) throw new Error(`Missing replacement target: ${label}`);
  return content.replace(before, after);
}

function replaceRegexRequired(content, pattern, after, label) {
  if (!pattern.test(content)) throw new Error(`Missing regex target: ${label}`);
  return content.replace(pattern, after);
}

const decisionId = "DL-2026-07-13-GLOBAL-STANDARD-SITE-BEFORE-VALIDATION";
const globalDoc = "docs/agentready/GLOBAL_STANDARD_SITE_PROGRAM.md";

write(globalDoc, `# AgentReady Global Standard Site Program

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
`);

let master = read("docs/agentready/AGENTREADY_MASTER_PLAN.md");
master = replaceRequired(master,
`9. rebuild the shared premium design system, navigation and footer;
10. redesign the homepage and core product pages;
11. complete premium mobile, accessibility, performance and SEO QA;
12. test public installation from clean external environments;
13. implement and validate the three-minute onboarding path;
14. begin external pilot outreach only after the premium site and public installation gates pass.`,
`9. build the shared global design system, navigation and footer;
10. publish the global product, scanners, CI, Community, planned Pro and pricing foundation;
11. publish the AgentReady standard, rules, severity, versioning and governance foundation;
12. publish company, trust, security, privacy and legal foundations from verified facts;
13. publish developer documentation, adoption, examples and contribution paths;
14. complete SEO, GEO and AI-first, structured-data and international architecture;
15. complete independent global mobile, accessibility, performance, content and discoverability QA;
16. test public installation from clean external environments;
17. implement and validate the three-minute onboarding path;
18. begin external pilot outreach only after the global site and public installation gates pass.`,
"master distribution sequence");
master = replaceRegexRequired(master,
/## Premium Site Gate Before Public Validation[\s\S]*?## License Architecture/,
`## Global Standard Site Gate Before Public Validation

The GitHub Marketplace Action is public, but publication is not the commercial launch. Before public installation validation, onboarding promotion, maintainer outreach or external pilot recruitment, the project must complete the global-standard site program.

The program covers the shared shell, product and pricing, standard and rules, company and trust, legal foundations, developer documentation and adoption, SEO, GEO and AI-first architecture, international structure and independent global QA.

The existing PR #132 is retained as a technical stack base and must not be treated as the finished public site. Stacked draft PRs are authorized so the complete site can be reviewed before production is left with a partial redesign.

The program remains static, fast, dependency-light, local-first and honest about current capabilities. It does not authorize engine, CLI, Action, npm, billing, account, hosted scanning or runtime changes.

The detailed authority is defined in \`GLOBAL_STANDARD_SITE_PROGRAM.md\`. The earlier \`PREMIUM_SITE_REDESIGN_EXECUTION_SPEC.md\` remains authoritative only for the shell foundation batch.

## License Architecture`,
"master global site gate");
write("docs/agentready/AGENTREADY_MASTER_PLAN.md", master);

let sequence = read("docs/agentready/EXECUTION_SEQUENCE.md");
sequence = replaceRegexRequired(sequence,
/## Phase 4B - Premium Product Site Before Public Validation[\s\S]*?## Phase 4C - Public Installation And Onboarding/,
`## Phase 4B - Global Standard Site Before Public Validation

\`\`\`txt
site(agentready): build global design system and navigation
site(agentready): publish global product scanners CI and planned pricing
site(standard): publish AgentReady standard rules and governance foundation
site(trust): publish company security privacy and legal foundation
docs(adoption): publish developer and adoption foundation
ai(site): publish SEO GEO AI-first and international architecture
qa(site): validate the complete global site
\`\`\`

The shell PR may remain open as an approved stack base while the remaining site PRs are built against it. This avoids deploying a visibly partial redesign. The complete stack is reviewed, then merged in dependency order.

No meaningful Marketplace promotion, maintainer outreach or external pilot recruitment begins before global-site QA passes. No batch in this phase modifies the engine, CLI, npm package, immutable Action, billing or runtime scope.

## Phase 4C - Public Installation And Onboarding`,
"execution global site phase");
sequence = sequence.replace("Public installation validation follows the premium-site gate.", "Public installation validation follows the global-standard site gate.");
write("docs/agentready/EXECUTION_SEQUENCE.md", sequence);

let premiumSpec = read("docs/agentready/PREMIUM_SITE_REDESIGN_EXECUTION_SPEC.md");
premiumSpec = replaceRequired(premiumSpec,
"Status: ACTIVE EXECUTION SPECIFICATION",
"Status: ACTIVE FOR ARB-SITE-PREMIUM-001 ONLY\n\nLater premium-site batches in this document are superseded by GLOBAL_STANDARD_SITE_PROGRAM.md. The design-system, navigation, mobile menu and footer requirements remain authoritative for PR #132.",
"premium spec scope status");
write("docs/agentready/PREMIUM_SITE_REDESIGN_EXECUTION_SPEC.md", premiumSpec);

let decision = read("docs/agentready/DECISION_LOG.md");
if (!decision.includes(decisionId)) {
  decision += `\n\n## 2026-07-13 - Global standard site before public validation\n\nDecision ID: ${decisionId}\nDecision: Replace the limited three-batch premium-site sequence with a seven-stage global-standard site program before ARB-COM-003 and external promotion.\nReason: PR #132 proves the shared shell but also demonstrates that a header, footer and six product pages cannot establish AgentReady as a credible candidate standard. Pricing, standard rules, governance, company identity, trust, legal foundations, developer adoption, SEO, GEO and international architecture must be part of the baseline rather than deferred until or after launch.\nImpact: PR #132 remains open as an approved technical stack base. ARB-SITE-GLOBAL-002 becomes the next executable stacked batch. Public installation, onboarding promotion and pilot outreach depend on ARB-SITE-GLOBAL-007. Existing later SITE, SEO, GEO, DOC and CAT work becomes deeper expansion rather than the first public baseline.\nSupersedes: DL-2026-07-12-PREMIUM-SITE-BEFORE-VALIDATION for all work after ARB-SITE-PREMIUM-001.\nStatus: ACTIVE\n`;
}
write("docs/agentready/DECISION_LOG.md", decision);

let rebuild = read("scripts/rebuild-agentready-ledger-data.mjs");
rebuild = replaceRequired(rebuild,
`  premiumRedesign: "docs/agentready/PREMIUM_SITE_REDESIGN_EXECUTION_SPEC.md",\n  ia: "docs/agentready/PUBLIC_SITE_INFORMATION_ARCHITECTURE.md",`,
`  premiumRedesign: "docs/agentready/PREMIUM_SITE_REDESIGN_EXECUTION_SPEC.md",\n  globalSite: "docs/agentready/GLOBAL_STANDARD_SITE_PROGRAM.md",\n  ia: "docs/agentready/PUBLIC_SITE_INFORMATION_ARCHITECTURE.md",`,
"global site document map");

rebuild = replaceRequired(rebuild,
`["M3-PREMIUM-SITE", "premium product shell and core pages validated", ["AR-SITE-PREMIUM-001", "AR-SITE-PREMIUM-002", "AR-SITE-PREMIUM-003"]]`,
`["M3-GLOBAL-SITE", "global product standard trust documentation and discovery site validated", ["AR-SITE-PREMIUM-001", "AR-SITE-GLOBAL-002", "AR-SITE-GLOBAL-003", "AR-SITE-GLOBAL-004", "AR-SITE-GLOBAL-005", "AR-SITE-GLOBAL-006", "AR-SITE-GLOBAL-007"]]`,
"M3 global site criterion");
rebuild = rebuild.replace("premium product shell and core pages validated", "global product standard trust documentation and discovery site validated");

const globalTaskBlock = `epic("AR-SITE-PREMIUM-EPIC", "M3", "BEFORE_COMMUNITY_PUBLICATION", "SITE", "Global standard public site before external validation", ["AR-COM-006"]);
codex("AR-SITE-PREMIUM-EPIC", "AR-SITE-PREMIUM-001", "M3", "BEFORE_COMMUNITY_PUBLICATION", "SITE", "Build global site shell navigation and footer", {
  decision_ids: [...decisionIds, "DL-2026-07-12-PREMIUM-SITE-BEFORE-VALIDATION", "${decisionId}"],
  status: "IN_REVIEW",
  owner: "CODEX_AND_JEASON",
  weight: 5,
  source_documents: [doc.premium, doc.ia, doc.premiumRedesign, doc.globalSite, doc.copy],
  branch: "site-agentready-premium-foundation",
  pr_title: "site(agentready): build premium design system and navigation",
  pr_number: 132,
  allowed_paths: ["assets/**", "*.html", "docs/agentready/**", "scripts/**"],
  forbidden_paths: ["agentready-core/**", "bin/**", "package.json", "action.yml", ".github/workflows/**", "packaging/**", "server/**", "api/**", "LICENSE", "NOTICE"],
  deliverables: ["shared premium design tokens and shell assets", "desktop Product and Resources navigation", "accessible full-height mobile navigation", "four-group footer", "active-page and focus states", "navigation validator", "desktop and mobile evidence"],
  acceptance_criteria: ["PR #132 remains technically reviewable", "shared shell is a valid stack base", "page body content is not accepted as the complete site", "no product or distribution boundary changed"],
  required_commands: ["node scripts/validate-agentready-site-navigation.mjs", "node scripts/validate-agentready-strategy-docs.mjs", "node scripts/validate-agentready-execution-system.mjs", "git diff --check"],
  required_evidence: ["PR #132", "head 8ea9b08e9c772f151c3966288f7e82f8efe0ff10", "desktop and mobile shell evidence", "owner direction to continue through a complete stacked site"],
  manual_actions: ["JEASON reviews the complete stacked site before the stack is merged"],
  notes: "Approved only as a stacked technical base. Do not merge as the finished site."
});
codex("AR-SITE-PREMIUM-EPIC", "AR-SITE-GLOBAL-002", "M3", "BEFORE_COMMUNITY_PUBLICATION", "SITE", "Publish global product scanners CI and planned pricing foundation", {
  decision_ids: [...decisionIds, "${decisionId}"],
  status: "READY",
  owner: "CODEX_AND_JEASON",
  weight: 5,
  source_documents: [doc.globalSite, doc.premium, doc.ia, doc.copy, doc.pricing, doc.entitlements, doc.actionUsage, doc.json],
  branch: "site-agentready-global-product",
  pr_title: "site(agentready): publish global product and pricing foundation",
  allowed_paths: ["assets/**", "*.html", "docs/agentready/**", "scripts/**", "sitemap.xml", "robots.txt"],
  forbidden_paths: ["agentready-core/**", "bin/**", "package.json", "action.yml", ".github/workflows/**", "packaging/**", "server/**", "api/**", "LICENSE", "NOTICE"],
  deliverables: ["category-defining homepage", "product overview", "Community page", "planned Pro page", "truthful pricing page", "complete OpenAPI and MCP scanner presentation", "CI Gate and CLI adoption sections", "real report and agentready.json demonstrations", "complete combined preview based on PR #132"],
  estimated_files_or_surfaces: ["index.html", "agentready.html", "agentready-mcp.html", "agentready-ci.html", "agentready-docs.html", "pricing.html", "product.html", "community.html", "pro.html", "shared product assets"],
  acceptance_criteria: ["a new visitor understands the problem product and primary action within one viewport", "OpenAPI and MCP pages explain detection coverage and show realistic findings before file selection", "the real scanners remain functional", "browser CLI and GitHub Action paths are visible", "Community is shown as available and free", "planned Pro price is 24 EUR excluding tax monthly or 240 EUR excluding tax annually", "Pro is clearly not purchasable and unavailable features are labelled planned", "Team Agency and Enterprise are not presented as available", "real product outputs and immutable Action usage are used", "no fake proof customer benchmark certification or standard-status claim is added", "page bodies use varied premium composition rather than repetitive cards", "all pages remain usable on mobile and without JavaScript for core content"],
  required_commands: ["node scripts/validate-agentready-site-navigation.mjs", "node scripts/validate-agentready-strategy-docs.mjs", "node scripts/validate-agentready-execution-system.mjs", "git diff --check"],
  independent_test_plan: ["test every product and commercial route", "run real OpenAPI and MCP examples", "verify price and availability copy against the pricing authority", "validate all CTA destinations", "test desktop and 320 375 768 1024 pixel layouts", "test core content without JavaScript", "compare the complete preview with the PR #132 shell baseline"],
  required_evidence: ["desktop and mobile screenshots for every primary page", "real output provenance", "pricing source mapping", "CTA and link report", "no-JavaScript evidence", "combined preview URL"],
  manual_actions: ["JEASON reviews the combined product and pricing preview"],
  authorized_actions: ["create real static product Community and planned Pro pages", "redesign the six existing core page bodies", "add shared static product assets and validators"],
  forbidden_actions: ["do not change engine CLI package Action workflows npm tags releases Marketplace billing accounts or runtime behavior", "do not present Pro as purchasable", "do not invent customers benchmarks legal identities or certifications", "do not merge any site PR"],
  codex_preflight_steps: ["synchronize to exact PR #132 head 8ea9b08e9c772f151c3966288f7e82f8efe0ff10", "create the child branch from site-agentready-premium-foundation", "open a draft PR targeting site-agentready-premium-foundation before broad edits", "inventory current product claims pricing sources and working scanner behavior"],
  rollback_boundary: "Revert the global product child PR while preserving PR #132 as the technical shell base."
});
codex("AR-SITE-PREMIUM-EPIC", "AR-SITE-GLOBAL-003", "M3", "BEFORE_COMMUNITY_PUBLICATION", "STANDARD", "Publish AgentReady standard rules and governance foundation", {
  decision_ids: [...decisionIds, "${decisionId}"], weight: 5, source_documents: [doc.globalSite, doc.rules, doc.ruleFormat, doc.json, doc.mcp, doc.adoption], branch: "site-agentready-global-standard", pr_title: "site(standard): publish AgentReady standard foundation", allowed_paths: ["assets/**", "*.html", "docs/agentready/**", "scripts/**", "sitemap.xml"], forbidden_paths: ["agentready-core/**", "bin/**", "package.json", "action.yml", ".github/workflows/**", "server/**", "api/**", "LICENSE", "NOTICE"], deliverables: ["standard overview", "specification index", "AR001 through AR010 public rule foundation", "severity and scoring explanation", "versioning compatibility and governance pages", "reference implementation relationship", "adoption and contribution principles"], acceptance_criteria: ["AgentReady is described as a candidate public method and not an already recognized international standard", "each AR rule has a stable public definition scope example fix and limitation", "governance versioning compatibility and change process are explicit", "the standard and reference implementation are clearly distinguished", "machine-readable schemas and primary sources are linked"], required_evidence: ["standard route inventory", "rule coverage matrix", "source mapping", "desktop and mobile evidence", "claim review"], rollback_boundary: "Revert standard-foundation pages without reverting product or shell work."
});
codex("AR-SITE-PREMIUM-EPIC", "AR-SITE-GLOBAL-004", "M3", "BEFORE_COMMUNITY_PUBLICATION", "TRUST", "Publish company trust security privacy and legal foundation", {
  decision_ids: [...decisionIds, "${decisionId}"], weight: 5, source_documents: [doc.globalSite, doc.legal, doc.legalReq, doc.privacy, "SECURITY.md"], branch: "site-agentready-global-trust", pr_title: "site(trust): publish company and legal foundation", allowed_paths: ["assets/**", "*.html", "docs/agentready/**", "scripts/**", "sitemap.xml"], forbidden_paths: ["agentready-core/**", "bin/**", "package.json", "action.yml", ".github/workflows/**", "server/**", "api/**", "LICENSE", "NOTICE"], deliverables: ["About", "Company or Publisher identity", "Contact", "Legal notice", "Privacy", "Terms", "Security", "Responsible disclosure", "subprocessor or no-subprocessor statement", "DPA applicability statement", "future sales-terms readiness"], acceptance_criteria: ["publisher and contact information uses verified facts only", "missing legal identifiers are explicit owner blockers and never invented", "current local static processing and no-upload behavior are described accurately", "security reporting path is usable", "paid-sale terms are not presented as active before paid sales exist", "legal and trust pages are internally linked and mobile accessible"], required_evidence: ["owner-supplied identity checklist", "legal data source map", "privacy and processing map", "security contact validation", "route and link report"], manual_actions: ["JEASON supplies and verifies publisher identity registration address VAT and host facts where applicable", "legal review remains required before paid sales"], rollback_boundary: "Revert trust and legal foundation without removing factual security history or product pages."
});
codex("AR-SITE-PREMIUM-EPIC", "AR-SITE-GLOBAL-005", "M3", "BEFORE_COMMUNITY_PUBLICATION", "DOC", "Publish developer documentation adoption examples and contribution foundation", {
  decision_ids: [...decisionIds, "${decisionId}"], weight: 5, source_documents: [doc.globalSite, doc.readme, doc.actionUsage, doc.cli, doc.json, doc.adoption, doc.mcp], branch: "site-agentready-global-docs-adoption", pr_title: "docs(site): publish global developer and adoption foundation", allowed_paths: ["assets/**", "*.html", "docs/agentready/**", "agentready-examples/**", "scripts/**", "sitemap.xml"], forbidden_paths: ["agentready-core/**", "bin/**", "package.json", "action.yml", ".github/workflows/**", "server/**", "api/**", "LICENSE", "NOTICE"], deliverables: ["documentation hub", "installation and CLI reference", "GitHub Action guide", "configuration policy and output guides", "OpenAPI and MCP examples", "troubleshooting", "adoption guide", "contribution guide", "changelog discovery"], acceptance_criteria: ["a developer can discover install run and adopt AgentReady without hidden knowledge", "immutable tag and full SHA Action guidance is present", "commands and outputs match the current release", "Community operation requires no signup payment backend or upload", "advanced unimplemented Pro documentation is clearly labelled planned", "examples link to real fixtures"], required_evidence: ["clean-reader documentation walkthrough", "command verification", "Action pinning review", "example provenance", "link report"], rollback_boundary: "Revert documentation and adoption foundation without changing released artifacts."
});
codex("AR-SITE-PREMIUM-EPIC", "AR-SITE-GLOBAL-006", "M3", "BEFORE_COMMUNITY_PUBLICATION", "GEO", "Publish SEO GEO AI-first and international foundation", {
  decision_ids: [...decisionIds, "${decisionId}"], weight: 5, source_documents: [doc.globalSite, doc.seo, doc.ia, doc.copy], branch: "site-agentready-global-discovery", pr_title: "ai(site): publish SEO GEO and international foundation", allowed_paths: ["assets/**", "*.html", "docs/agentready/**", "scripts/**", "sitemap.xml", "robots.txt", "*.xml", "*.json", "*.txt"], forbidden_paths: ["agentready-core/**", "bin/**", "package.json", "action.yml", ".github/workflows/**", "server/**", "api/**", "LICENSE", "NOTICE"], deliverables: ["unique page metadata and canonicals", "structured data", "sitemap and robots policy", "canonical entity definitions", "extractable answers and factual FAQ", "publisher author date and version metadata", "machine-readable specification discovery", "English canonical and French international architecture", "AI representation test set"], acceptance_criteria: ["every indexable page has a unique intent title description canonical and internal links", "TimeProofs AgentReady naming is normalized", "what it is what it is not scope limitations price and availability have extractable answers", "structured data is factual and validates", "primary specification rules schemas and publisher pages are crawlable without JavaScript", "hreflang is emitted only for complete equivalents", "preview deployments remain non-indexable", "no thin doorway pages or fabricated authorship is added", "experimental AI discovery files do not replace ordinary crawlable content"], required_evidence: ["metadata matrix", "structured-data validation", "sitemap and robots report", "AI question answer test report", "no-JavaScript crawl evidence", "international route and hreflang plan"], rollback_boundary: "Revert discovery metadata and international routing without reverting approved page content."
});
codex("AR-SITE-PREMIUM-EPIC", "AR-SITE-GLOBAL-007", "M3", "BEFORE_COMMUNITY_PUBLICATION", "QA", "Validate complete global standard site", {
  decision_ids: [...decisionIds, "${decisionId}"], weight: 5, owner: "CODEX_AND_JEASON", source_documents: [doc.globalSite, doc.premium, doc.seo, doc.legalReq, doc.launch], branch: "qa-agentready-global-standard-site", pr_title: "qa(site): validate complete global standard site", allowed_paths: ["assets/**", "*.html", "docs/agentready/**", "scripts/**", "sitemap.xml", "robots.txt", "*.xml", "*.json", "*.txt"], forbidden_paths: ["agentready-core/**", "bin/**", "package.json", "action.yml", ".github/workflows/**", "server/**", "api/**", "LICENSE", "NOTICE"], deliverables: ["complete route inventory", "cross-device visual QA", "accessibility and keyboard audit", "performance evidence", "SEO and GEO validation", "legal-data completeness register", "broken-link and no-JavaScript report", "final owner decision"], acceptance_criteria: ["all public product standard trust legal developer and discovery routes are complete", "Android iPhone tablet and desktop layouts pass", "keyboard focus semantics contrast touch targets and reduced motion pass", "no horizontal overflow broken link empty CTA placeholder invented legal fact or unsupported claim remains", "critical content works without JavaScript", "performance budgets and metadata validation pass", "all owner-supplied company facts are verified or the affected production page remains blocked", "the full stacked preview is accepted before dependency-order merge"], required_evidence: ["viewport matrix", "accessibility report", "performance report", "SEO GEO and AI-answer report", "legal-data register", "route and link report", "full preview screenshots", "owner acceptance"], manual_actions: ["JEASON reviews and accepts or rejects the complete stacked preview", "merge the accepted stack in dependency order only after approval"], rollback_boundary: "Revert QA corrections individually; do not erase evidence or bypass an unresolved blocking finding."
});
`;
rebuild = replaceRegexRequired(rebuild,
/epic\("AR-SITE-PREMIUM-EPIC"[\s\S]*?epic\("AR-ONB-EPIC"/,
`${globalTaskBlock}epic("AR-ONB-EPIC"`,
"global site task block");

rebuild = replaceRequired(rebuild,
`    branch: input.branch ?? first.branch ?? slug(input.title),\n    pr_title: input.pr_title ?? first.pr_title ?? \`${'${first.workstream.toLowerCase()}'}(agentready): ${'${input.title.toLowerCase()}'}\`,`,
`    branch: input.branch ?? first.branch ?? slug(input.title),\n    base_branch: input.base_branch ?? "timeproofs",\n    stacked_execution_authorized: input.stacked_execution_authorized ?? false,\n    ...(input.stacked_on_batch ? { stacked_on_batch: input.stacked_on_batch } : {}),\n    ...(input.stacked_base_pr ? { stacked_base_pr: input.stacked_base_pr } : {}),\n    ...(input.stacked_base_head_sha ? { stacked_base_head_sha: input.stacked_base_head_sha } : {}),\n    pr_title: input.pr_title ?? first.pr_title ?? \`${'${first.workstream.toLowerCase()}'}(agentready): ${'${input.title.toLowerCase()}'}\`,`,
"batch stacked metadata");

rebuild = replaceRequired(rebuild,
`  ["ARB-SITE-PREMIUM-001", "Build premium design system navigation and footer", ["AR-SITE-PREMIUM-001"], { status: "READY", spec_status: "EXECUTION_READY", owner: "CODEX_AND_JEASON", depends_on_batches: ["ARB-COM-002"] }],
  ["ARB-SITE-PREMIUM-002", "Redesign homepage and core product pages", ["AR-SITE-PREMIUM-002"], { status: "PLANNED", spec_status: "SKELETON", depends_on_batches: ["ARB-SITE-PREMIUM-001"] }],
  ["ARB-SITE-PREMIUM-003", "Validate premium mobile accessibility performance and SEO", ["AR-SITE-PREMIUM-003"], { status: "PLANNED", spec_status: "SKELETON", depends_on_batches: ["ARB-SITE-PREMIUM-002"] }],
  ["ARB-COM-003", "Validate public Community installation", ["AR-COM-008"], { depends_on_batches: ["ARB-SITE-PREMIUM-003"] }],`,
`  ["ARB-SITE-PREMIUM-001", "Build global site shell navigation and footer", ["AR-SITE-PREMIUM-001"], { status: "IN_REVIEW", spec_status: "EXECUTION_READY", owner: "CODEX_AND_JEASON", pr_number: 132, base_branch: "timeproofs", depends_on_batches: ["ARB-COM-002"], evidence: [{ type: "stack_base", pr: 132, head_sha: "8ea9b08e9c772f151c3966288f7e82f8efe0ff10", approved_for_stacked_execution: true, merge_authorized: false }], notes: "Approved only as the technical base for the global-site stack; do not merge as the complete site." }],
  ["ARB-SITE-GLOBAL-002", "Publish global product scanners CI and planned pricing foundation", ["AR-SITE-GLOBAL-002"], { status: "READY", spec_status: "EXECUTION_READY", owner: "CODEX_AND_JEASON", base_branch: "site-agentready-premium-foundation", stacked_execution_authorized: true, stacked_on_batch: "ARB-SITE-PREMIUM-001", stacked_base_pr: 132, stacked_base_head_sha: "8ea9b08e9c772f151c3966288f7e82f8efe0ff10", depends_on_batches: ["ARB-SITE-PREMIUM-001"] }],
  ["ARB-SITE-GLOBAL-003", "Publish AgentReady standard rules and governance foundation", ["AR-SITE-GLOBAL-003"], { status: "PLANNED", spec_status: "SKELETON", base_branch: "site-agentready-global-product", stacked_execution_authorized: true, stacked_on_batch: "ARB-SITE-GLOBAL-002", depends_on_batches: ["ARB-SITE-GLOBAL-002"] }],
  ["ARB-SITE-GLOBAL-004", "Publish company trust security privacy and legal foundation", ["AR-SITE-GLOBAL-004"], { status: "PLANNED", spec_status: "SKELETON", base_branch: "site-agentready-global-standard", stacked_execution_authorized: true, stacked_on_batch: "ARB-SITE-GLOBAL-003", depends_on_batches: ["ARB-SITE-GLOBAL-003"] }],
  ["ARB-SITE-GLOBAL-005", "Publish developer documentation adoption examples and contribution foundation", ["AR-SITE-GLOBAL-005"], { status: "PLANNED", spec_status: "SKELETON", base_branch: "site-agentready-global-trust", stacked_execution_authorized: true, stacked_on_batch: "ARB-SITE-GLOBAL-004", depends_on_batches: ["ARB-SITE-GLOBAL-004"] }],
  ["ARB-SITE-GLOBAL-006", "Publish SEO GEO AI-first and international foundation", ["AR-SITE-GLOBAL-006"], { status: "PLANNED", spec_status: "SKELETON", base_branch: "site-agentready-global-docs-adoption", stacked_execution_authorized: true, stacked_on_batch: "ARB-SITE-GLOBAL-005", depends_on_batches: ["ARB-SITE-GLOBAL-005"] }],
  ["ARB-SITE-GLOBAL-007", "Validate complete global standard site", ["AR-SITE-GLOBAL-007"], { status: "PLANNED", spec_status: "SKELETON", owner: "CODEX_AND_JEASON", base_branch: "site-agentready-global-discovery", stacked_execution_authorized: true, stacked_on_batch: "ARB-SITE-GLOBAL-006", depends_on_batches: ["ARB-SITE-GLOBAL-006"] }],
  ["ARB-COM-003", "Validate public Community installation", ["AR-COM-008"], { depends_on_batches: ["ARB-SITE-GLOBAL-007"] }],`,
"global site batch sequence");
write("scripts/rebuild-agentready-ledger-data.mjs", rebuild);

let executionLib = read("scripts/agentready-execution-lib.mjs");
executionLib = replaceRequired(executionLib,
`function dependencyBatchesDone(batch, batches) {
  return (batch.depends_on_batches || []).every((id) => batches.get(id)?.status === "DONE");
}`,
`function dependencyBatchesDone(batch, batches) {
  return (batch.depends_on_batches || []).every((id) => {
    const dependency = batches.get(id);
    if (dependency?.status === "DONE") return true;
    return batch.stacked_execution_authorized === true
      && batch.stacked_on_batch === id
      && dependency?.status === "IN_REVIEW";
  });
}`,
"stacked batch dependency handling");
executionLib = replaceRequired(executionLib,
`export function selectNextAction(ledger) {
  const tasks = taskMap(ledger);
  const inReviewBatch = (ledger.execution_batches || []).find((batch) => batch.status === "IN_REVIEW");`,
`export function selectNextAction(ledger) {
  const tasks = taskMap(ledger);
  const stackedReadyBatch = (ledger.execution_batches || []).find((batch) => batch.stacked_execution_authorized === true && isExecutionReadyBatch(batch, ledger));
  if (stackedReadyBatch) return { kind: "batch", batch: stackedReadyBatch, action_owner: stackedReadyBatch.owner, action_type: "READY", summary: stackedReadyBatch.objective };
  const inReviewBatch = (ledger.execution_batches || []).find((batch) => batch.status === "IN_REVIEW");`,
"stacked next action priority");
executionLib = replaceRequired(executionLib,
"    `Base: timeproofs`,",
"    `Base: ${batch.base_branch || \"timeproofs\"}`,",
"dynamic prompt base branch");
write("scripts/agentready-execution-lib.mjs", executionLib);

for (const file of [".github/workflows/agentready-community-release-candidate.yml", "cli/tests/run-agentready-community-release-workflow-test.mjs"]) {
  let content = read(file);
  content = content.replaceAll("ARB-SITE-PREMIUM-001", "ARB-SITE-GLOBAL-002");
  content = content.replaceAll("site-agentready-premium-foundation", "site-agentready-global-product");
  write(file, content);
}

for (const file of ["scripts/apply-agentready-global-site-program.mjs", ".github/workflows/apply-agentready-global-site-program.yml"]) {
  if (fs.existsSync(file)) fs.rmSync(file);
}

console.log("Global standard site program applied.");
