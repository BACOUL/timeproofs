import fs from "node:fs";

const read = (file) => fs.readFileSync(file, "utf8");
const write = (file, content) => fs.writeFileSync(file, content);

function replaceRequired(content, before, after, label) {
  if (!content.includes(before)) throw new Error(`Missing replacement target: ${label}`);
  return content.replace(before, after);
}

const decisionId = "DL-2026-07-12-PREMIUM-SITE-BEFORE-VALIDATION";
const specPath = "docs/agentready/PREMIUM_SITE_REDESIGN_EXECUTION_SPEC.md";

write(specPath, `# AgentReady Premium Site Redesign Execution Specification

Status: ACTIVE EXECUTION SPECIFICATION

## Decision

The public AgentReady product site is rebuilt before \`ARB-COM-003\`, public installation validation, onboarding promotion, external pilot outreach, or meaningful launch communication.

This insertion does not alter the AgentReady engine, CLI, npm package, immutable GitHub Action tag, Marketplace release, Community/Pro boundary, pricing target, or static-first positioning.

## Required Sequence

\`\`\`txt
ARB-SITE-PREMIUM-001 - shared design system, navigation and footer
ARB-SITE-PREMIUM-002 - homepage and core product pages
ARB-SITE-PREMIUM-003 - premium QA, accessibility, performance and SEO
ARB-COM-003 - public installation validation
ARB-ONB-001 - onboarding implementation
\`\`\`

No public acquisition campaign, maintainer outreach, pilot recruitment, or Marketplace promotion begins before \`ARB-SITE-PREMIUM-003\` is complete.

## Product And Visual Direction

The target is a best-in-class developer-security product site: precise, calm, technical and premium.

Required visual qualities:

- graphite and deep navy foundations;
- restrained blue and cyan accents;
- subtle gradients rather than bright color fields;
- strong typography and generous spacing;
- realistic code, CI and report surfaces;
- varied section composition rather than repeated identical cards;
- restrained borders, shadows and translucency;
- no decorative excess, generic AI imagery, emoji decoration, fake dashboards or fake customer logos;
- no excessive glassmorphism, neon glow, parallax or animation-heavy effects.

The site must feel like a serious developer tool and security product, not a generated landing-page template.

## Canonical Desktop Navigation

The shared desktop header must expose this hierarchy:

\`\`\`txt
TimeProofs / AgentReady
Product
Resources
Pricing
Trust
GitHub
Scan a contract
\`\`\`

Product menu targets:

- OpenAPI Scanner;
- MCP Scanner;
- GitHub CI Gate;
- Reports and \`agentready.json\`.

Resources menu targets:

- Documentation;
- Examples;
- AgentReady rules;
- Methodology;
- Changelog.

The implementation must map these labels to real existing destinations. It must not create broken links or imply that an unavailable page or product exists.

## Canonical Mobile Navigation

Mobile navigation must be a deliberate product surface, not a compressed desktop row.

It must provide:

- a clear menu trigger with \`aria-expanded\` and an accessible name;
- a full-height panel or drawer with grouped Product, Resources and Trust links;
- large touch targets;
- visible primary CTA;
- Escape-key close;
- click-outside close when applicable;
- focus containment and focus restoration;
- background scroll lock;
- current-page indication;
- progressive enhancement so critical links remain available without JavaScript;
- no horizontal overflow at 320 px and above.

## Canonical Footer

The shared footer must use four groups:

- Product;
- Standard;
- Developers;
- Trust.

It must surface the OpenAPI scanner, MCP scanner, CI Gate, sample report, \`agentready.json\`, rule codes, examples, limitations, CLI, GitHub Action, documentation, repository, security, privacy, terms and contact where real routes exist.

## Batch 1 - Premium Foundation

\`ARB-SITE-PREMIUM-001\` creates the shared shell only.

Scope:

- shared design tokens;
- shared typography, spacing, buttons, code blocks, focus states and layout primitives;
- desktop navigation and menus;
- mobile navigation;
- shared footer;
- active-route state;
- semantic and accessible shell markup;
- migration of active indexable AgentReady pages to the shared shell;
- automated navigation and link validation.

Batch 1 must preserve page-body content and page-specific product sections except where a conflicting header, navigation or footer implementation must be removed. It must not redesign the homepage body yet.

Preferred implementation:

- static HTML;
- shared CSS assets under \`/assets\`;
- minimal dependency-free JavaScript only where necessary;
- no frontend framework;
- no external font requirement;
- no tracking or telemetry;
- no backend dependency.

## Batch 2 - Homepage And Core Product Pages

\`ARB-SITE-PREMIUM-002\` redesigns:

- homepage;
- AgentReady CI page;
- OpenAPI scanner page;
- MCP scanner page;
- pricing page;
- primary documentation entry page.

Narrative order:

\`\`\`txt
problem
product demonstration
OpenAPI and MCP paths
CI integration
agent-specific differentiation
proof and evidence
trust and limitations
primary CTA
\`\`\`

The homepage must show a realistic finding, before/after guidance, score, CI result and machine-readable output rather than generic marketing cards.

## Batch 3 - Premium QA

\`ARB-SITE-PREMIUM-003\` performs independent QA across the public site:

- Android, iPhone-size, tablet and desktop viewports;
- keyboard navigation and focus order;
- screen-reader semantics;
- WCAG contrast and touch targets;
- reduced-motion support;
- no horizontal overflow;
- broken-link and CTA validation;
- HTML semantics and metadata;
- structured data;
- no-JS core content;
- performance and Core Web Vitals evidence;
- visual consistency;
- removal of stale commercial wording;
- preservation of mandatory limitations.

## Non-Negotiable Product Boundaries

The redesign must not:

- modify the AgentReady engine or CLI implementation;
- modify npm publication, package metadata, tags or dist-tags;
- move or recreate immutable Git or Action tags;
- change \`action.yml\` behavior;
- add Stripe, accounts, licenses, dashboards or hosted scanning;
- upload contracts;
- add silent telemetry;
- add live API, MCP or LLM execution;
- claim certification, absolute safety or GitHub endorsement;
- reintroduce proof-of-existence positioning;
- advertise Pro as available before it exists.

Mandatory limitation on key product pages:

> TimeProofs AgentReady does not guarantee that an AI agent will never fail. It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.

## Review Standard

A batch is not acceptable because it is merely cleaner than the current site. It must be reviewable against current premium developer-product standards and include factual evidence for desktop, mobile, accessibility, links and performance.
`);

let master = read("docs/agentready/AGENTREADY_MASTER_PLAN.md");
const oldSequence = `Community publication sequence:

1. resolve license;
2. confirm npm scope;
3. define 2FA or trusted publishing;
4. validate provenance;
5. publish Community package;
6. create immutable tag;
7. create GitHub Release;
8. test public installation;
9. prepare public Action repository if needed;
10. publish on GitHub Marketplace.`;
const newSequence = `Community publication and validation sequence:

1. resolve license;
2. confirm npm scope;
3. define 2FA or trusted publishing;
4. validate provenance;
5. publish Community package;
6. create immutable tag;
7. create GitHub Release;
8. publish and verify the public GitHub Action;
9. rebuild the shared premium design system, navigation and footer;
10. redesign the homepage and core product pages;
11. complete premium mobile, accessibility, performance and SEO QA;
12. test public installation from clean external environments;
13. implement and validate the three-minute onboarding path;
14. begin external pilot outreach only after the premium site and public installation gates pass.`;
master = replaceRequired(master, oldSequence, newSequence, "master distribution sequence");
if (!master.includes("## Premium Site Gate Before Public Validation")) {
  master = replaceRequired(master, "## License Architecture", `## Premium Site Gate Before Public Validation

The GitHub Marketplace Action is public, but publication is not the commercial launch. Before public installation validation, onboarding promotion, maintainer outreach or external pilot recruitment, the project must complete three premium-site batches:

1. shared design system, desktop and mobile navigation, and footer;
2. homepage and core product-page redesign;
3. independent mobile, accessibility, performance, SEO and visual-consistency QA.

The gate exists because the current public site does not yet communicate the quality, trust and hierarchy of the product. The redesign must remain static, fast, dependency-light, local-first and honest about current capabilities. It does not authorize product, engine, CLI, Action, npm, billing, account or runtime changes.

The detailed implementation boundary is defined in \`PREMIUM_SITE_REDESIGN_EXECUTION_SPEC.md\`.

## License Architecture`, "master premium gate insertion");
}
write("docs/agentready/AGENTREADY_MASTER_PLAN.md", master);

let sequence = read("docs/agentready/EXECUTION_SEQUENCE.md");
const oldPhase = `## Phase 4 - Marketplace And Onboarding

\`\`\`txt
feat(distribution): publish AgentReady GitHub Marketplace action
feat(community): add three-minute onboarding commands
\`\`\`

Marketplace is distribution, not validation by GitHub.

The distribution batch must also align the current public site with the active model: Community available, Pro in preparation, no manual review or Fix Pack offer as the active purchase path, and visible npm and Action installation instructions.

## Phase 4A - External Pilot Preparation`;
const newPhase = `## Phase 4 - Marketplace Distribution

\`\`\`txt
feat(distribution): publish AgentReady GitHub Marketplace action
\`\`\`

Marketplace is distribution, not validation by GitHub. The immutable public Action is complete and remains unchanged by the following site work.

## Phase 4B - Premium Product Site Before Public Validation

\`\`\`txt
site(agentready): build premium design system and navigation
site(agentready): redesign homepage and core product pages
qa(site): validate premium mobile accessibility performance and SEO
\`\`\`

These three batches run before \`ARB-COM-003\`. They rebuild the shared site shell, product narrative and independent QA without modifying the engine, CLI, npm package, immutable Action, billing or runtime scope. No meaningful Marketplace promotion, maintainer outreach or external pilot recruitment begins before the premium QA batch passes.

## Phase 4C - Public Installation And Onboarding

\`\`\`txt
qa(community): validate public AgentReady installation
feat(community): add three-minute onboarding commands
\`\`\`

Public installation validation follows the premium-site gate. Onboarding follows the public installation batch.

## Phase 4D - External Pilot Preparation`;
sequence = replaceRequired(sequence, oldPhase, newPhase, "execution phase 4");
write("docs/agentready/EXECUTION_SEQUENCE.md", sequence);

let requirements = read("docs/agentready/PREMIUM_SITE_REQUIREMENTS.md");
if (!requirements.includes("## Premium Foundation Visual Direction")) {
  requirements = replaceRequired(requirements, "The site should communicate engineering seriousness before marketing polish.", `The site should communicate engineering seriousness before marketing polish.

## Premium Foundation Visual Direction

The shared visual system must use graphite or deep-navy foundations, restrained blue/cyan accents and subtle gradients. It must avoid bright color fields, repetitive identical card grids, generic AI imagery, emoji decoration, fake dashboards, excessive glassmorphism and animation-heavy effects.

Sections should use varied composition and hierarchy. The design should feel like a premium developer-security product while preserving static performance, legibility and factual product evidence.

The canonical navigation, footer and three-batch execution boundary are defined in \`PREMIUM_SITE_REDESIGN_EXECUTION_SPEC.md\`.`, "premium visual direction");
}
write("docs/agentready/PREMIUM_SITE_REQUIREMENTS.md", requirements);

let ia = read("docs/agentready/PUBLIC_SITE_INFORMATION_ARCHITECTURE.md");
const navStart = ia.indexOf("## Target Navigation");
const navEnd = ia.indexOf("## Target Footer", navStart);
if (navStart < 0 || navEnd < 0) throw new Error("Target Navigation boundaries not found");
const navBlock = `## Target Navigation

Recommended desktop navigation:

\`\`\`txt
TimeProofs / AgentReady
Product ▼
Resources ▼
Pricing
Trust
GitHub
Scan a contract
\`\`\`

Product menu:

\`\`\`txt
OpenAPI Scanner
MCP Scanner
GitHub CI Gate
Reports and agentready.json
\`\`\`

Resources menu:

\`\`\`txt
Documentation
Examples
AgentReady Rules
Methodology
Changelog
\`\`\`

Every label must map to a real destination. Do not create broken routes or imply unavailable product surfaces.

Mobile navigation must use a full-height panel or drawer with grouped Product, Resources and Trust areas, large touch targets, visible primary CTA, Escape and outside-click close behavior, focus containment, focus restoration, body scroll lock, current-page state and progressive enhancement.

Mobile navigation priority:

1. Scan a contract;
2. OpenAPI Scanner;
3. MCP Scanner;
4. GitHub CI Gate;
5. Documentation;
6. Examples;
7. Pricing;
8. Trust.

`;
ia = ia.slice(0, navStart) + navBlock + ia.slice(navEnd);
write("docs/agentready/PUBLIC_SITE_INFORMATION_ARCHITECTURE.md", ia);

let decision = read("docs/agentready/DECISION_LOG.md");
if (!decision.includes(decisionId)) {
  decision += `

## 2026-07-12 - Premium site before public validation

Decision ID: ${decisionId}
Decision: Insert three premium public-site batches before \`ARB-COM-003\`, public onboarding promotion and external pilot outreach.
Reason: The Community CLI and GitHub Marketplace Action are technically credible, but the current navigation, hierarchy, mobile experience and visual system do not yet communicate a premium developer-security product. Sending first external users to that surface would reduce trust and waste launch attention.
Impact: \`ARB-SITE-PREMIUM-001\`, \`ARB-SITE-PREMIUM-002\` and \`ARB-SITE-PREMIUM-003\` are inserted after \`ARB-COM-002\`; \`ARB-COM-003\` depends on premium QA; onboarding follows public installation validation; no meaningful acquisition begins before premium QA passes.
Supersedes: the sequence that moved directly from Marketplace publication to \`ARB-COM-003\` and onboarding.
Status: ACTIVE

The npm package, immutable repository release, Action tag, Marketplace listing, static-first scope and Community/Pro boundary remain unchanged.
`;
}
write("docs/agentready/DECISION_LOG.md", decision);

let rebuild = read("scripts/rebuild-agentready-ledger-data.mjs");
rebuild = replaceRequired(rebuild,
  `  premium: "docs/agentready/PREMIUM_SITE_REQUIREMENTS.md",\n  ia: "docs/agentready/PUBLIC_SITE_INFORMATION_ARCHITECTURE.md",`,
  `  premium: "docs/agentready/PREMIUM_SITE_REQUIREMENTS.md",\n  premiumRedesign: "docs/agentready/PREMIUM_SITE_REDESIGN_EXECUTION_SPEC.md",\n  ia: "docs/agentready/PUBLIC_SITE_INFORMATION_ARCHITECTURE.md",`,
  "premium redesign doc map");
rebuild = replaceRequired(rebuild,
  `"public Action usable", "onboarding documented"`,
  `"public Action usable", "premium product shell and core pages validated", "onboarding documented"`,
  "M3 exit criterion");
rebuild = replaceRequired(rebuild,
  `["M3-ACTION", "public Action usable", ["AR-COM-007", "AR-COM-009"]], ["M3-ONBOARDING"`,
  `["M3-ACTION", "public Action usable", ["AR-COM-007", "AR-COM-009"]], ["M3-PREMIUM-SITE", "premium product shell and core pages validated", ["AR-SITE-PREMIUM-001", "AR-SITE-PREMIUM-002", "AR-SITE-PREMIUM-003"]], ["M3-ONBOARDING"`,
  "M3 premium criterion");

const taskMarker = `epic("AR-ONB-EPIC", "M3", "BEFORE_COMMUNITY_PUBLICATION", "ONB", "Community onboarding", ["AR-COM-006"]);`;
const premiumTasks = `epic("AR-SITE-PREMIUM-EPIC", "M3", "BEFORE_COMMUNITY_PUBLICATION", "SITE", "Premium public product site before external validation", ["AR-COM-006"]);
codex("AR-SITE-PREMIUM-EPIC", "AR-SITE-PREMIUM-001", "M3", "BEFORE_COMMUNITY_PUBLICATION", "SITE", "Build premium design system navigation and footer", {
  decision_ids: [...decisionIds, "${decisionId}"],
  status: "READY",
  owner: "CODEX_AND_JEASON",
  weight: 5,
  source_documents: [doc.premium, doc.ia, doc.premiumRedesign, doc.copy],
  branch: "site-agentready-premium-foundation",
  pr_title: "site(agentready): build premium design system and navigation",
  allowed_paths: ["assets/**", "*.html", "docs/agentready/**", "scripts/**"],
  forbidden_paths: ["agentready-core/**", "bin/**", "package.json", "action.yml", ".github/workflows/**", "packaging/**", "server/**", "api/**", "LICENSE", "NOTICE"],
  deliverables: ["shared premium design tokens and shell assets", "desktop Product and Resources navigation", "accessible full-height mobile navigation", "four-group premium footer", "active-page and focus states", "navigation link and shell validator", "desktop and mobile visual evidence"],
  estimated_files_or_surfaces: ["assets/site-nav.css", "new shared site CSS or JavaScript assets", "header navigation and footer on active indexable AgentReady HTML pages"],
  acceptance_criteria: ["one shared design system controls navigation footer typography focus states buttons and code surfaces", "desktop navigation exposes Product Resources Pricing Trust GitHub and Scan a contract with real destinations", "Product exposes OpenAPI MCP CI Gate and report or agentready.json destinations", "Resources exposes docs examples rules methodology and changelog destinations where real routes exist", "mobile navigation has large touch targets grouped links visible CTA Escape close focus containment focus restoration scroll lock and no 320px overflow", "critical links remain available through progressive enhancement", "footer exposes Product Standard Developers and Trust groups", "active indexable AgentReady pages use the shared shell without duplicated nav or footer implementations", "page body content and product sections are preserved in this foundation batch", "no broken route fake page fake product external font frontend framework tracker telemetry or backend dependency is added", "reduced-motion and visible keyboard focus are supported", "canonical metadata structured data and mandatory limitation text are preserved"],
  required_commands: ["node scripts/validate-agentready-site-navigation.mjs", "node scripts/validate-agentready-strategy-docs.mjs", "node scripts/validate-agentready-execution-system.mjs", "git diff --check"],
  independent_test_plan: ["inventory every active indexable AgentReady page and existing nav footer variant", "run static link and duplicate-shell validation", "test desktop menus by pointer and keyboard", "test mobile menu at 320 375 768 and 900 pixel widths", "test Escape outside click focus containment focus restoration and body scroll lock", "test with reduced motion and JavaScript disabled for critical links", "record before and after desktop and mobile evidence", "confirm no page-body redesign or product-code change entered the batch"],
  required_evidence: ["page and shell migration inventory", "desktop navigation screenshots", "mobile closed and open navigation screenshots", "keyboard and focus test matrix", "link validation report", "320px no-overflow evidence", "reduced-motion and no-JS evidence", "shared asset inventory and size summary", "owner visual review before merge"],
  manual_actions: ["JEASON reviews desktop and mobile visual evidence before merge"],
  authorized_actions: ["create dependency-free shared CSS and minimal JavaScript assets", "replace duplicated active-page navigation and footer markup", "add static validators and documented visual evidence"],
  forbidden_actions: ["do not redesign homepage or page-body sections in this batch", "do not rewrite product claims beyond navigation and footer labels required for accuracy", "do not modify engine CLI Action package npm tags billing accounts backend or runtime behavior", "do not add external fonts frameworks analytics telemetry uploads or live calls", "do not create fake pages customer logos dashboards certifications or safety claims", "do not merge without owner visual review"],
  codex_preflight_steps: ["inventory all active indexable root HTML pages and current shared assets", "record every navigation and footer variant", "map every proposed menu label to an existing valid route", "identify inline shell styles that conflict with shared assets", "capture baseline desktop and mobile screenshots", "open a draft PR before broad HTML migration"],
  rollback_boundary: "Revert the shared shell assets and navigation or footer migrations without reverting Marketplace publication or product code.",
  scope_justification: "Weight 5 justified: one coherent shared-shell system across active static pages with a single visual review and rollback boundary."
});
codex("AR-SITE-PREMIUM-EPIC", "AR-SITE-PREMIUM-002", "M3", "BEFORE_COMMUNITY_PUBLICATION", "SITE", "Redesign homepage and core product pages", {
  decision_ids: [...decisionIds, "${decisionId}"],
  weight: 5,
  source_documents: [doc.premium, doc.ia, doc.premiumRedesign, doc.copy],
  branch: "site-agentready-premium-core-pages",
  pr_title: "site(agentready): redesign homepage and core product pages",
  allowed_paths: ["assets/**", "index.html", "agentready-ci.html", "agentready.html", "agentready-mcp.html", "pricing.html", "agentready-docs.html", "docs/agentready/**", "scripts/**"],
  forbidden_paths: ["agentready-core/**", "bin/**", "package.json", "action.yml", ".github/workflows/**", "packaging/**", "server/**", "api/**", "LICENSE", "NOTICE"],
  deliverables: ["premium homepage", "premium CI Gate page", "premium OpenAPI and MCP pages", "truthful pricing page", "primary docs entry page", "realistic product demonstration and proof sections"],
  acceptance_criteria: ["hero defines the category and primary action within one viewport", "homepage follows problem demonstration OpenAPI and MCP CI differentiation proof trust limitation CTA order", "product demonstration uses real AgentReady findings outputs and policy behavior", "Community is available free and Pro remains in preparation", "no unavailable feature or fake customer proof is presented", "sections use varied composition rather than repeated card grids", "all commands tags rule codes and outputs match merged product behavior"],
  required_evidence: ["desktop and mobile page evidence", "content-source mapping", "CTA and link audit", "real product-output provenance"],
  rollback_boundary: "Revert the six core page redesigns while preserving the premium shared shell."
});
codex("AR-SITE-PREMIUM-EPIC", "AR-SITE-PREMIUM-003", "M3", "BEFORE_COMMUNITY_PUBLICATION", "SITE", "Validate premium mobile accessibility performance and SEO", {
  decision_ids: [...decisionIds, "${decisionId}"],
  weight: 5,
  source_documents: [doc.premium, doc.ia, doc.premiumRedesign, doc.seo],
  branch: "qa-agentready-premium-site",
  pr_title: "qa(site): validate premium mobile accessibility performance and SEO",
  allowed_paths: ["assets/**", "*.html", "sitemap.xml", "robots.txt", "docs/agentready/**", "scripts/**"],
  forbidden_paths: ["agentready-core/**", "bin/**", "package.json", "action.yml", ".github/workflows/**", "packaging/**", "server/**", "api/**", "LICENSE", "NOTICE"],
  deliverables: ["cross-viewport QA report", "accessibility and keyboard report", "performance and Core Web Vitals evidence", "SEO metadata and structured-data audit", "visual consistency and stale-copy audit", "blocking corrections"],
  acceptance_criteria: ["Android iPhone-size tablet and desktop layouts pass", "keyboard focus semantics contrast touch targets and reduced motion pass", "no horizontal overflow broken link empty CTA or hidden critical content remains", "critical product content is available without JavaScript", "performance evidence meets documented static-site budgets", "titles descriptions canonicals structured data and internal links are valid", "stale manual offers and unsupported product claims are absent", "mandatory limitation remains on key pages"],
  required_evidence: ["viewport matrix", "accessibility audit", "performance report", "SEO and structured-data report", "broken-link report", "final visual consistency review"],
  rollback_boundary: "Revert only QA corrections that regress the approved premium design; preserve evidence and issue records."
});
${taskMarker}`;
rebuild = replaceRequired(rebuild, taskMarker, premiumTasks, "premium task insertion");

const com003Line = `  ["ARB-COM-003", "Validate public Community installation", ["AR-COM-008"]],`;
const premiumBatches = `  ["ARB-SITE-PREMIUM-001", "Build premium design system navigation and footer", ["AR-SITE-PREMIUM-001"], { status: "READY", spec_status: "EXECUTION_READY", owner: "CODEX_AND_JEASON", depends_on_batches: ["ARB-COM-002"] }],
  ["ARB-SITE-PREMIUM-002", "Redesign homepage and core product pages", ["AR-SITE-PREMIUM-002"], { status: "PLANNED", spec_status: "SKELETON", depends_on_batches: ["ARB-SITE-PREMIUM-001"] }],
  ["ARB-SITE-PREMIUM-003", "Validate premium mobile accessibility performance and SEO", ["AR-SITE-PREMIUM-003"], { status: "PLANNED", spec_status: "SKELETON", depends_on_batches: ["ARB-SITE-PREMIUM-002"] }],
  ["ARB-COM-003", "Validate public Community installation", ["AR-COM-008"], { depends_on_batches: ["ARB-SITE-PREMIUM-003"] }],`;
rebuild = replaceRequired(rebuild, com003Line, premiumBatches, "premium batch insertion");
rebuild = replaceRequired(rebuild,
  `  ["ARB-ONB-001", "Ship Community onboarding commands and tutorial", ["AR-ONB-001", "AR-ONB-002", "AR-ONB-003", "AR-ONB-004"]],`,
  `  ["ARB-ONB-001", "Ship Community onboarding commands and tutorial", ["AR-ONB-001", "AR-ONB-002", "AR-ONB-003", "AR-ONB-004"], { depends_on_batches: ["ARB-COM-003"] }],`,
  "onboarding dependency");
write("scripts/rebuild-agentready-ledger-data.mjs", rebuild);

let releaseTest = read("cli/tests/run-agentready-community-release-workflow-test.mjs");
const testStart = releaseTest.indexOf("assert.match(workflow, /git diff --exit-code --/);");
const testEnd = releaseTest.indexOf("assert.match(workflow, /assert\\.equal\\(manifest", testStart);
if (testStart < 0 || testEnd < 0) throw new Error("Community workflow test assertion boundaries not found");
const testBlock = `assert.match(workflow, /git diff --exit-code --/);
assert.ok(workflow.includes("const completedBatch = batches.get('ARB-COM-002')"));
assert.ok(workflow.includes("const nextBatch = batches.get('ARB-SITE-PREMIUM-001')"));
assert.ok(workflow.includes("assert.equal(completedBatch?.status, 'DONE')"));
assert.ok(workflow.includes("assert.equal(nextBatch?.status, 'READY')"));
assert.ok(workflow.includes("assert.equal(nextBatch?.spec_status, 'EXECUTION_READY')"));
assert.ok(workflow.includes("assert.equal(next?.batch?.id, 'ARB-SITE-PREMIUM-001')"));
assert.ok(workflow.includes("assert.equal(next?.action_type, 'READY')"));
assert.ok(workflow.includes("assert.match(nextPrompt, /Repository: BACOUL\\/timeproofs/)"));
assert.match(workflow, /Batch ID: ARB-SITE-PREMIUM-001/);
assert.match(workflow, /site-agentready-premium-foundation/);
`;
releaseTest = releaseTest.slice(0, testStart) + testBlock + releaseTest.slice(testEnd);
write("cli/tests/run-agentready-community-release-workflow-test.mjs", releaseTest);

if (fs.existsSync("docs/agentready/BRANCH_SEED.md")) fs.rmSync("docs/agentready/BRANCH_SEED.md");
fs.rmSync(new URL(import.meta.url));

console.log("Premium site plan sources updated.");
