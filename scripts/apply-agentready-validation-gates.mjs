import { readFileSync, writeFileSync } from "node:fs";

const files = {
  master: "docs/agentready/AGENTREADY_MASTER_PLAN.md",
  sequence: "docs/agentready/EXECUTION_SEQUENCE.md",
  decision: "docs/agentready/DECISION_LOG.md",
  rebuild: "scripts/rebuild-agentready-ledger-data.mjs",
  spec: "docs/agentready/VALIDATION_GATES_AND_EXTERNAL_PILOT.md"
};

function read(file) {
  return readFileSync(file, "utf8");
}

function write(file, content) {
  writeFileSync(file, content.endsWith("\n") ? content : `${content}\n`);
}

function replaceOnce(content, before, after, label) {
  if (content.includes(after)) return content;
  const count = content.split(before).length - 1;
  if (count !== 1) throw new Error(`${label}: expected one anchor, found ${count}`);
  return content.replace(before, after);
}

function linesOf(content) {
  return content.replace(/\r\n/g, "\n").split("\n");
}

function replaceLineByIncludes(lines, needle, replacement, label) {
  const matches = lines.map((line, index) => line.includes(needle) ? index : -1).filter((index) => index >= 0);
  if (matches.length !== 1) throw new Error(`${label}: expected one matching line, found ${matches.length}`);
  const replacementLines = Array.isArray(replacement) ? replacement : linesOf(replacement);
  lines.splice(matches[0], 1, ...replacementLines);
}

function insertBeforeLine(lines, needle, insertion, label) {
  const matches = lines.map((line, index) => line.includes(needle) ? index : -1).filter((index) => index >= 0);
  if (matches.length !== 1) throw new Error(`${label}: expected one insertion point, found ${matches.length}`);
  lines.splice(matches[0], 0, ...linesOf(insertion));
}

const validationSpec = `# AgentReady Validation Gates And External Pilot

Status: ACTIVE SPECIALIZED SPECIFICATION

Authority: \`AGENTREADY_MASTER_PLAN.md\`.

Decision: \`DL-2026-07-12-VALIDATION-GATES\`.

## Purpose

This specification increases the probability of product success without changing the approved product direction.

AgentReady remains a static, shift-left CI gate for agent-facing OpenAPI and MCP contracts. This document strengthens evidence, distribution, differentiation and decision gates. It does not authorize a runtime firewall, live API execution, live MCP execution, a hosted contract scanner, silent telemetry or a new proof-of-existence product.

## Non-Negotiable Sequence

\`\`\`txt
Community distribution
-> public installation validation
-> three-minute onboarding
-> external pilot preparation
-> external pilot and measured benchmark
-> explicit continue/correct/pause/pivot/reject decision
-> Pro technical implementation
-> ten-user and payment-signal gate
-> licensing, Stripe and account infrastructure
-> first external Pro sale
-> global launch
\`\`\`

The existing next action remains \`ARB-COM-002\`.

## Community Distribution Strengthening

### Public GitHub Action

The public Action distribution work must include:

- a copyable workflow using a public distribution path;
- immutable version pinning documentation using a release tag and full commit SHA;
- minimum GitHub permissions;
- Action input and output documentation;
- supply-chain and provenance documentation;
- dependency, secret and code-scanning checks where supported;
- a revocation and replacement procedure for a compromised release;
- factual Marketplace wording that does not imply GitHub security validation.

### Immediate Public-Site Alignment

The Community distribution batch must also remove contradictory commercial messaging from the current public site.

Before broad Community promotion, public pages must:

- stop presenting manual review or Fix Pack offers as the active model;
- stop presenting email payment or mandatory contact as the Community/Pro purchase path;
- state that Community is available free of charge;
- state that Pro is in preparation until its functions are implemented;
- expose the official npm installation command;
- expose the GitHub Action installation path when public;
- retain the static-analysis and non-guarantee limitations.

This is a small alignment correction inside the distribution boundary, not the later complete commercial-site build.

## Public Installation Validation

Validation must use clean external-style environments and record evidence for:

- Linux, macOS and Windows;
- every officially supported Node.js major version;
- public and private repositories where practical;
- paths containing spaces;
- monorepositories;
- one and multiple OpenAPI or MCP inputs;
- invalid input;
- large input within documented limits;
- PASS and FAIL behavior;
- exit codes and generated report paths;
- operation without a TimeProofs backend;
- Action installation from outside the TimeProofs repository.

Failures must be recorded honestly. Unsupported cases must be documented instead of hidden.

## Three-Minute Onboarding Validation

The official onboarding flow is:

\`\`\`txt
discover
-> run locally
-> initialize CI
-> commit
-> first successful GitHub run
\`\`\`

The flow must be timed from a clean environment. It must not require signup, a card, a token, contract upload or a global installation.

The tutorial must use one canonical path, a working demo fixture, actionable errors and a visible rollback or cleanup instruction.

## External Community Pilot

### Codex Preparation Batch

One additional Codex batch prepares:

- a tester guide;
- an evidence registry;
- a false-positive and false-negative register;
- an abandonment-reason register;
- a feature-request register;
- a reusable before/fix/after case template;
- a consent and confidentiality checklist;
- an outreach candidate worksheet;
- a voluntary feedback path with preview, redaction and explicit consent.

Codex does not invent users, testimonials, findings or payment signals and does not contact projects automatically.

### Human Pilot Threshold

Before Pro implementation is authorized, the pilot must establish at least:

- five distinct external Community users;
- three real external repositories or contract surfaces;
- one real OpenAPI use;
- one real MCP use;
- two measurable return or reuse signals within 30 days where the observation window permits;
- one useful real issue detected and corrected;
- recorded false positives, false negatives, abandonment reasons and feature requests;
- one explicit signal describing a function for which an external user may pay.

Project-owned accounts, fixtures, automated installs and TimeProofs repository runs do not count.

If the 30-day observation window has not elapsed, the decision must remain pending rather than treating missing evidence as reuse.

## Benchmark And Differentiation

The benchmark must measure scientific engine quality and product differentiation.

The reproducible report must include:

- precision and recall by rule;
- false-positive and false-negative rates;
- performance and reproducibility;
- ambiguous-case behavior;
- comparison against schema validation and representative general OpenAPI linting baselines;
- a factual explanation of agent-specific risks detected by AgentReady;
- an MCP coverage matrix with detected, partially detectable and statically non-detectable risks;
- explicit limitations and complementary runtime-control categories;
- relevant external-pilot findings without confidential data.

Public competitor claims require current external verification and legal review. Absence of a finding by another tool must never be claimed without reproducible evidence.

## Gate Before Pro Technical Implementation

After pilot evidence and the benchmark report, the owner records exactly one outcome:

- \`CONTINUE\`;
- \`CORRECT\`;
- \`PAUSE\`;
- \`PIVOT\`;
- \`REJECT\`.

\`CONTINUE\` is required before the first Pro implementation batch. A \`CORRECT\` outcome creates bounded correction work through change control. The other outcomes stop automatic execution of Pro batches.

## Gate Before Licensing Stripe And Accounts

Licensing, billing, Stripe, account and transactional-email implementation must not begin until all of the following are evidenced:

- ten external Community users on real contracts or repositories;
- three explicit Pro payment signals after the real price and implemented scope are presented;
- one credible external value case based on a real issue and fix;
- benchmark and differentiation evidence accepted;
- an owner decision authorizing commercial infrastructure work.

This gate does not require the first Pro sale, because the controlled purchase system is needed to complete that sale.

## Dynamic Analysis Boundary

Dynamic execution is not an immediate success requirement and is not part of Community or Pro V0.1.

A dynamic scanner, runtime guardrail or live tool execution may be evaluated only after real revenue and repeated external demand. The first preference is integration with complementary runtime products. Any dynamic expansion requires a dedicated decision, threat model, legal review, isolation design and separate execution plan.

## Acquisition Execution

After Community is usable, the owner-led pilot should:

- identify approximately thirty relevant public OpenAPI or MCP projects;
- select a small number for careful manual outreach;
- provide useful project-specific evidence rather than bulk promotional messages;
- target five thoughtful contacts per week when suitable projects exist;
- record installation, first scan, reuse, findings, false positives and abandonment;
- request publication permission before using any quote or case.

Bulk automated pull requests, spam and invented social proof remain forbidden.

## Safety And Anti-Drift

This specification must not:

- change completed publication evidence;
- move or replace \`v0.1.0-alpha.0\`;
- authorize a new npm operation;
- change the Community/Pro feature boundary;
- place CI blocking behind Pro;
- authorize Stripe production payments;
- present Pro as available before implementation;
- create certification or guaranteed-safety claims.
`;
write(files.spec, validationSpec);

let master = read(files.master);
const masterBefore = `These gates do not block Community publication, Pro technical construction or
the first Pro sale path. They block only premature global-validation claims.

## Distribution And Onboarding`;
const masterAfter = `These four gates remain mandatory before global-validation or category-established
claims. Earlier product-construction gates are defined below.

## Early External Pilot And Commercial Evidence Gates

Community publication is not blocked by market validation. After Community distribution,
public installation validation and three-minute onboarding, the ledger must require an
external Community pilot before Pro implementation begins.

The early pilot gate requires:

- at least five distinct external Community users;
- at least three real external repositories or contract surfaces;
- at least one real OpenAPI use and one real MCP use;
- at least two measurable 30-day return or reuse signals where the observation window permits;
- at least one useful real issue detected and corrected;
- recorded false positives, false negatives, abandonment reasons and feature requests;
- at least one explicit signal identifying a function for which an external user may pay.

Pilot evidence and the reproducible benchmark must lead to an explicit owner decision:
\`CONTINUE\`, \`CORRECT\`, \`PAUSE\`, \`PIVOT\` or \`REJECT\`. \`CONTINUE\` is required
before the first Pro implementation batch.

Before licensing, Stripe, account and transactional-email implementation begins, the
ledger must additionally require:

- at least ten external Community users;
- at least three explicit Pro payment signals after presenting the real price and scope;
- at least one credible external value case based on a real issue and fix;
- accepted benchmark and differentiation evidence;
- an explicit owner decision authorizing commercial infrastructure work.

The first external Pro sale remains a later global-validation gate because commercial
infrastructure is required to complete that sale.

The detailed thresholds, evidence rules and exclusions are defined in
\`VALIDATION_GATES_AND_EXTERNAL_PILOT.md\`.

## Static-First And Dynamic-Analysis Boundary

AgentReady remains a static shift-left CI gate for Community and Pro V0.1. Dynamic
execution, runtime guardrails or live API/MCP scanning are not immediate launch
requirements. They may be evaluated only after real revenue and repeated external demand,
through a dedicated decision, threat model and execution plan. Integration with
complementary runtime products is preferred before building a new runtime product.

## Distribution And Onboarding`;
master = replaceOnce(master, masterBefore, masterAfter, "master validation gates");
write(files.master, master);

let sequence = read(files.sequence);
sequence = replaceOnce(
  sequence,
  `Marketplace is distribution, not validation by GitHub.\n\n## Phase 5 - Engine Benchmark`,
  `Marketplace is distribution, not validation by GitHub.\n\nThe distribution batch must also align the current public site with the active model: Community available, Pro in preparation, no manual review or Fix Pack offer as the active purchase path, and visible npm and Action installation instructions.\n\n## Phase 4A - External Pilot Preparation\n\n\`\`\`txt\ndocs(validation): prepare AgentReady external Community pilot kit\n\`\`\`\n\nCodex prepares the tester guide, evidence registry, false-positive register, case template and consent controls. Human outreach and evidence collection remain owner actions.\n\n## Phase 5 - Engine Benchmark`,
  "sequence pilot insertion"
);
sequence = replaceOnce(
  sequence,
  `Benchmark and critical corrections must be completed before paid launch.\n\n## Phase 6 - MVP Pro`,
  `Benchmark and critical corrections must be completed before paid launch. The reproducible report must also include factual differentiation evidence and an MCP static-coverage matrix.\n\nBefore Phase 6 begins, the external pilot and benchmark evidence must produce an explicit \`CONTINUE\`, \`CORRECT\`, \`PAUSE\`, \`PIVOT\` or \`REJECT\` decision. Only \`CONTINUE\` authorizes the first Pro implementation batch.\n\n## Phase 6 - MVP Pro`,
  "sequence pre-Pro gate"
);
sequence = replaceOnce(
  sequence,
  `## Phase 8 - Licensing, Stripe, And Automation`,
  `## Commercial Infrastructure Gate\n\nBefore licensing, Stripe, account or transactional-email implementation begins, require ten external Community users, three explicit Pro payment signals at the real price and scope, one credible external value case, accepted benchmark/differentiation evidence and an owner authorization decision.\n\n## Phase 8 - Licensing, Stripe, And Automation`,
  "sequence pre-commercial gate"
);
write(files.sequence, sequence);

let decision = read(files.decision);
decision = replaceOnce(
  decision,
  `These gates do not block Community publication, Pro technical construction, or the initial Pro sale path. They block only claims that AgentReady is globally validated or category-established.`,
  `This decision is refined by DL-2026-07-12-VALIDATION-GATES. The final global-validation thresholds remain active, while earlier pilot and commercial-infrastructure gates now control future execution.`,
  "decision refinement"
);
if (!decision.includes("DL-2026-07-12-VALIDATION-GATES")) {
  decision += `\n## 2026-07-12 - Earlier validation gates before Pro and commercial infrastructure\n\nDecision ID: DL-2026-07-12-VALIDATION-GATES\nDecision: Preserve the static-first Community/Pro strategy while moving external evidence and explicit decision gates earlier in the execution sequence.\nReason: The principal remaining risk is not the ability to build AgentReady, but whether external developers adopt it, reuse it, value its agent-specific findings and express willingness to pay.\nImpact: The next action remains ARB-COM-002; Community distribution, installation and onboarding are strengthened; one Codex pilot-preparation batch is added; five-user pilot plus benchmark evidence blocks Pro implementation; ten users, three payment signals and one credible value case block licensing, Stripe and account construction; dynamic analysis remains post-revenue and demand-gated.\nSupersedes: the part of DL-2026-07-11-COMMERCIAL-BENCHMARK-THRESHOLDS that allowed Pro and commercial infrastructure to proceed without earlier external evidence.\nStatus: ACTIVE\n\nCompleted publication evidence, the npm package, immutable tag, GitHub prerelease and Community/Pro feature boundary are unchanged.\n`;
}
write(files.decision, decision);

const rebuildLines = linesOf(read(files.rebuild));

const decisionLine = rebuildLines.findIndex((line) => line.startsWith("const decisionIds ="));
if (decisionLine < 0) throw new Error("rebuild: decisionIds line missing");
if (!rebuildLines.some((line) => line.includes("validationDecisionId"))) {
  rebuildLines.splice(decisionLine + 1, 0, `const validationDecisionId = "DL-2026-07-12-VALIDATION-GATES";`);
}

const mcpDocLine = rebuildLines.findIndex((line) => line.includes('mcp: "docs/agentready/MCP_VERSION_COMPATIBILITY_POLICY.md"'));
if (mcpDocLine < 0) throw new Error("rebuild: MCP document mapping missing");
if (!rebuildLines.some((line) => line.includes("VALIDATION_GATES_AND_EXTERNAL_PILOT.md"))) {
  rebuildLines[mcpDocLine] = rebuildLines[mcpDocLine].replace(/,$/, "");
  rebuildLines.splice(mcpDocLine + 1, 0, `  validation: "docs/agentready/VALIDATION_GATES_AND_EXTERNAL_PILOT.md"`);
  rebuildLines[mcpDocLine] += ",";
}

replaceLineByIncludes(
  rebuildLines,
  '["M4", "Engine benchmark established"',
  `  ["M4", "External pilot and engine benchmark established", "PLANNED", "BEFORE_PRO_TECHNICAL_COMPLETION", ["external pilot kit", "five-user external pilot", "OpenAPI and MCP corpora", "human annotations", "benchmark acceptance thresholds frozen before final evaluation", "precision and recall", "false-positive and false-negative rates", "performance", "reproducibility", "differentiation evidence", "MCP static coverage matrix", "explicit pre-Pro decision", "AR001 AR003 AR008 AR010 treated or documented"], [["M4-PILOT-KIT", "external pilot kit and evidence registry", ["AR-MARKET-PILOT-001"]], ["M4-PILOT-EVIDENCE", "five-user external pilot evidence", ["AR-MARKET-PILOT-001H"], true], ["M4-CORPUS", "OpenAPI and MCP corpora and harness", ["AR-ENG-001"]], ["M4-HUMAN-LABELS", "human annotations validated", ["AR-ENG-001H"], true], ["M4-THRESHOLDS", "benchmark acceptance thresholds frozen before final evaluation", ["AR-ENG-001T"], true], ["M4-METRICS", "precision recall false positive and false negative rates", ["AR-ENG-002"]], ["M4-AR-FIXES", "AR001 AR003 AR008 AR010 treated or documented", ["AR-ENG-003"]], ["M4-PERFORMANCE", "performance and reproducibility", ["AR-ENG-004", "AR-ENG-005"]], ["M4-DIFFERENTIATION", "factual differentiation evidence and MCP static coverage matrix", ["AR-ENG-005"]], ["M4-PRO-DECISION", "explicit decision before Pro implementation", ["AR-MARKET-PILOT-002"], true]]],`,
  "rebuild M4 milestone"
);

replaceLineByIncludes(
  rebuildLines,
  '["M6", "Pro commercially sellable"',
  `  ["M6", "Pro commercially sellable", "PLANNED", "BEFORE_PRO_FIRST_SALE", ["commercial infrastructure approval", "license and entitlements", "activation", "five repositories", "offline behavior", "minimal account", "Checkout", "subscription lifecycle", "portal", "emails", "legal", "support", "refund", "controlled purchase"], [["M6-MARKET-GATE", "ten-user payment-signal and value-case gate approved", ["AR-MARKET-002"], true], ["M6-ENTITLEMENTS", "license and entitlements", ["AR-LIC-001", "AR-LIC-003"]], ["M6-ACTIVATION", "activation and recovery", ["AR-LIC-006", "AR-BILL-013"]], ["M6-FIVE-REPOS", "five repositories and pseudonymization", ["AR-LIC-005"]], ["M6-OFFLINE", "offline behavior", ["AR-LIC-004"]], ["M6-ACCOUNT", "minimal account", ["AR-BILL-004"]], ["M6-CHECKOUT", "Checkout monthly and annual", ["AR-BILL-002", "AR-BILL-003"]], ["M6-WEBHOOKS", "webhooks", ["AR-BILL-005"]], ["M6-PROVISIONING", "entitlement provisioning", ["AR-BILL-006"]], ["M6-PORTAL", "Customer Portal", ["AR-BILL-007"]], ["M6-RENEWAL", "renewal", ["AR-BILL-008"]], ["M6-FAILED-PAYMENT", "failed payment", ["AR-BILL-009", "AR-LIC-004"]], ["M6-CANCEL-DOWNGRADE", "cancellation and downgrade", ["AR-BILL-010", "AR-LIC-007"]], ["M6-REFUND", "refund", ["AR-BILL-011"]], ["M6-EMAILS", "transactional emails", ["AR-BILL-012"]], ["M6-DELETION", "account deletion and data", ["AR-BILL-014"]], ["M6-VAT-INVOICES", "VAT invoices reconciliation", ["AR-FIN-001"], true], ["M6-LEGAL", "legal privacy liability", ["AR-LEG-001"], true], ["M6-SUPPORT", "support", ["AR-SUPPORT-001", "AR-SUPPORT-002"]], ["M6-SECURITY", "security signoff", ["AR-SEC-001", "AR-SEC-002", "AR-SEC-003", "AR-SEC-004"], true], ["M6-CONTROLLED-PURCHASE", "controlled purchase", ["AR-BILL-015"]]]],`,
  "rebuild M6 milestone"
);

const communityStart = rebuildLines.findIndex((line) => line.trim() === "for (const row of [" && rebuildLines.slice(Math.max(0, line), line).length === 0);
const publicationIndex = rebuildLines.findIndex((line) => line.includes('codex("AR-COM-EPIC", "AR-COM-006"'));
const communityLoopStart = rebuildLines.findIndex((line, index) => index > publicationIndex && line.trim() === "for (const row of [");
const communityLoopEnd = rebuildLines.findIndex((line, index) => index > communityLoopStart && line.includes(']) codex("AR-COM-EPIC"'));
if (communityLoopStart < 0 || communityLoopEnd < communityLoopStart) throw new Error("rebuild: Community task loop missing");
const communityTasks = linesOf(`codex("AR-COM-EPIC", "AR-COM-007", "M3", "BEFORE_COMMUNITY_PUBLICATION", "COM", "Publish public AgentReady GitHub Action distribution", {
  decision_ids: [...decisionIds, validationDecisionId],
  depends_on: ["AR-COM-006"],
  source_documents: [doc.action, doc.actionUsage, doc.validation],
  branch: "feat-distribution-agentready-marketplace-action",
  pr_title: "feat(distribution): publish AgentReady GitHub Marketplace action",
  allowed_paths: [".github/**", "docs/agentready/**", "README.md", "AGENTREADY_PROJECT_CONTEXT.md", "index.html", "pricing.html", "agentready-ci.html", "action.yml"],
  forbidden_paths: ["agentready-core/**", "bin/**", "package.json", "LICENSE"],
  deliverables: ["public Action distribution", "copyable workflow", "immutable version pinning guidance", "minimum permissions", "supply-chain and revocation guidance", "current public-site Community/Pro alignment"],
  acceptance_criteria: ["Action is consumable from a public distribution path", "release tag and full commit SHA pinning are documented", "minimum GitHub permissions are documented", "Action inputs outputs and failure behavior are documented", "provenance dependency secret and code-scanning controls are documented where supported", "compromised-release revocation and replacement procedure is documented", "public site no longer presents manual review Fix Pack email payment or mandatory contact as the active Community/Pro model", "public site states Community is available and Pro is in preparation", "npm and public Action installation paths are visible", "Marketplace wording does not imply GitHub security validation"],
  independent_test_plan: ["run Action smoke test", "run a pinned Action from an external-style fixture repository", "verify public pages contain the active Community/Pro status and no obsolete manual offer", "run strategy and execution-system validators"],
  required_commands: ["node cli/tests/run-agentready-action-smoke-test.mjs", "node scripts/validate-agentready-strategy-docs.mjs", "node scripts/validate-agentready-execution-system.mjs"],
  required_evidence: ["public Action URL or public distribution evidence", "copyable pinned workflow", "permissions review", "supply-chain control evidence", "Marketplace compliance evidence", "public-site alignment evidence"]
});

codex("AR-COM-EPIC", "AR-COM-008", "M3", "BEFORE_COMMUNITY_PUBLICATION", "COM", "Validate public Community installation", {
  decision_ids: [...decisionIds, validationDecisionId],
  depends_on: ["AR-COM-006"],
  source_documents: [doc.cli, doc.actionUsage, doc.validation],
  branch: "qa-community-public-installation",
  pr_title: "qa(community): validate public AgentReady installation",
  allowed_paths: ["cli/**", ".github/**", "agentready-examples/**", "docs/agentready/**", "scripts/**"],
  forbidden_paths: ["package.json", "LICENSE", "*.html"],
  deliverables: ["clean-environment installation matrix", "external-repository Action validation", "PASS FAIL and error-behavior evidence", "documented unsupported cases"],
  acceptance_criteria: ["public npm installation succeeds from clean environments", "Linux macOS and Windows evidence is recorded", "all officially supported Node.js major versions are tested", "paths with spaces and monorepository behavior are tested", "single and multiple OpenAPI or MCP inputs are tested", "invalid input and large input within documented limits are tested", "PASS FAIL exit codes and report paths are verified", "Community operation does not require a TimeProofs backend", "Action installation is tested outside the TimeProofs repository", "failures and unsupported cases are documented honestly"],
  independent_test_plan: ["run CLI core Action and package tests", "execute clean-environment OS matrix", "exercise external-style public and private repository fixtures", "record every unsupported scenario"],
  required_commands: ["node agentready-core/tests/run-agentready-core-tests.mjs", "node cli/tests/run-agentready-cli-tests.mjs", "node cli/tests/run-agentready-action-smoke-test.mjs", "node cli/tests/run-agentready-package-smoke-test.mjs", "node scripts/validate-agentready-execution-system.mjs"],
  required_evidence: ["OS and Node.js matrix", "external-repository workflow runs", "PASS FAIL exit-code evidence", "report path evidence", "offline or backend-independent evidence", "unsupported-case register"]
});

codex("AR-COM-EPIC", "AR-COM-009", "M3", "BEFORE_COMMUNITY_PUBLICATION", "COM", "Prepare GitHub Marketplace listing compliance", {
  decision_ids: [...decisionIds, validationDecisionId],
  depends_on: ["AR-COM-007"],
  source_documents: [doc.action, doc.validation],
  branch: "docs-marketplace-agentready-action-compliance",
  pr_title: "docs(distribution): prepare AgentReady Marketplace listing compliance",
  allowed_paths: [".github/**", "docs/agentready/**", "README.md", "action.yml"],
  forbidden_paths: ["agentready-core/**", "bin/**", "package.json", "LICENSE", "*.html"],
  deliverables: ["Marketplace metadata and branding compliance", "factual listing copy", "version and permission guidance", "listing evidence checklist"],
  acceptance_criteria: ["Marketplace metadata requirements are satisfied", "branding and repository links are valid", "listing copy states static-analysis scope and mandatory limitation", "listing does not claim certification guaranteed safety or GitHub validation", "immutable tag and SHA pinning guidance is included", "minimum permissions are visible"],
  required_commands: ["node cli/tests/run-agentready-action-smoke-test.mjs", "node scripts/validate-agentready-strategy-docs.mjs", "node scripts/validate-agentready-execution-system.mjs"],
  required_evidence: ["Marketplace metadata review", "listing copy review", "branding and links review", "version pinning and permissions review"]
});`);
rebuildLines.splice(communityLoopStart, communityLoopEnd - communityLoopStart + 1, ...communityTasks);

replaceLineByIncludes(
  rebuildLines,
  'for (const [id,title] of [["001","Add local scan onboarding command"]',
  `codex("AR-ONB-EPIC", "AR-ONB-001", "M3", "BEFORE_COMMUNITY_PUBLICATION", "ONB", "Add local scan onboarding command", { decision_ids: [...decisionIds, validationDecisionId], depends_on: ["AR-COM-006"], source_documents: [doc.onboarding, doc.cli, doc.validation], branch: "add-local-scan-onboarding-command", pr_title: "feat(community): add local scan onboarding command", allowed_paths: ["cli/**", "agentready-examples/**", "docs/agentready/**"], forbidden_paths: ["agentready-core/**", "package.json", "LICENSE", "*.html"], acceptance_criteria: ["canonical local OpenAPI and MCP scan commands work without global installation", "errors are actionable", "no signup token upload or TimeProofs backend is required"], required_commands: ["node cli/tests/run-agentready-cli-tests.mjs"], required_evidence: ["clean local scan evidence", "OpenAPI and MCP command evidence", "error output evidence"] });
codex("AR-ONB-EPIC", "AR-ONB-002", "M3", "BEFORE_COMMUNITY_PUBLICATION", "ONB", "Add init workflow generator", { decision_ids: [...decisionIds, validationDecisionId], depends_on: ["AR-ONB-001"], source_documents: [doc.onboarding, doc.cli, doc.validation], branch: "add-init-workflow-generator", pr_title: "feat(community): add init workflow generator", allowed_paths: ["cli/**", "agentready-examples/**", "docs/agentready/**"], forbidden_paths: ["agentready-core/**", "package.json", "LICENSE", "*.html"], acceptance_criteria: ["init detects OpenAPI and MCP files", "files are shown before writing", "confirmation is required", "Community workflow is generated", "a local scan is run", "Pro policy is not generated", "rollback or cleanup is documented"], required_commands: ["node cli/tests/run-agentready-cli-tests.mjs"], required_evidence: ["detection evidence", "confirmation evidence", "generated workflow", "local scan evidence", "cleanup evidence"] });
codex("AR-ONB-EPIC", "AR-ONB-003", "M3", "BEFORE_COMMUNITY_PUBLICATION", "ONB", "Add demo command and fixtures", { decision_ids: [...decisionIds, validationDecisionId], depends_on: ["AR-ONB-001"], source_documents: [doc.onboarding, doc.cli, doc.validation], branch: "add-demo-command-and-fixtures", pr_title: "feat(community): add demo command and fixtures", allowed_paths: ["cli/**", "agentready-examples/**", "docs/agentready/**"], forbidden_paths: ["agentready-core/**", "package.json", "LICENSE", "*.html"], acceptance_criteria: ["demo works without network access to TimeProofs", "demo includes a useful PASS and FAIL path", "fixtures are deterministic and documented", "demo output points to the next CI step"], required_commands: ["node cli/tests/run-agentready-cli-tests.mjs"], required_evidence: ["deterministic demo evidence", "PASS and FAIL demo output", "fixture documentation"] });
codex("AR-ONB-EPIC", "AR-ONB-004", "M3", "BEFORE_COMMUNITY_PUBLICATION", "ONB", "Publish three-minute tutorial", { decision_ids: [...decisionIds, validationDecisionId], depends_on: ["AR-ONB-001"], source_documents: [doc.onboarding, doc.cli, doc.validation], branch: "publish-three-minute-tutorial", pr_title: "docs(community): publish three-minute tutorial", allowed_paths: ["docs/agentready/**", "README.md", "index.html", "agentready-ci.html"], forbidden_paths: ["agentready-core/**", "bin/**", "package.json", "LICENSE"], acceptance_criteria: ["one canonical discover run init commit first-run path is documented", "flow is timed from a clean environment", "target is under three minutes", "no signup card token upload or global install is required", "tutorial links from public discovery surfaces", "rollback or cleanup is documented"], required_commands: ["node cli/tests/run-agentready-cli-tests.mjs", "node scripts/validate-agentready-strategy-docs.mjs", "node scripts/validate-agentready-execution-system.mjs"], required_evidence: ["dated clean-environment timing", "first successful GitHub run", "public tutorial links", "cleanup instructions"] });`,
  "rebuild onboarding tasks"
);

insertBeforeLine(
  rebuildLines,
  'epic("AR-ENG-EPIC"',
  `epic("AR-PILOT-EPIC", "M4", "BEFORE_PRO_TECHNICAL_COMPLETION", "MARKET", "External Community pilot and differentiation", ["AR-COM-008", "AR-ONB-004"]);
codex("AR-PILOT-EPIC", "AR-MARKET-PILOT-001", "M4", "BEFORE_PRO_TECHNICAL_COMPLETION", "MARKET", "Prepare external Community pilot kit and evidence registry", {
  decision_ids: [...decisionIds, validationDecisionId],
  depends_on: ["AR-COM-008", "AR-ONB-004"],
  source_documents: [doc.validation, doc.gtm, doc.adoption, doc.privacy],
  branch: "docs-agentready-external-community-pilot-kit",
  pr_title: "docs(validation): prepare AgentReady external Community pilot kit",
  allowed_paths: ["docs/agentready/**", "agentready-examples/**", "scripts/**"],
  forbidden_paths: ["agentready-core/**", "bin/**", ".github/actions/**", "package.json", "LICENSE", "*.html"],
  deliverables: ["tester guide", "pilot evidence registry", "false-positive and false-negative register", "abandonment and feature-request register", "before fix after case template", "consent and confidentiality checklist", "outreach candidate worksheet", "voluntary redacted feedback procedure"],
  acceptance_criteria: ["pilot kit can record five distinct external users and three real repositories", "OpenAPI and MCP usage are recorded separately", "first use and 30-day reuse fields exist", "real issue fix and after-result evidence can be recorded", "false positives false negatives abandonment and feature requests are captured", "payment-signal context and real price presentation can be recorded", "public quote and case publication require consent", "no automatic outreach invented evidence silent telemetry or default full-contract upload is introduced"],
  independent_test_plan: ["validate every required threshold has an evidence field", "test templates with synthetic labels clearly marked as examples", "verify consent redaction and confidentiality controls", "run execution-system validator"],
  required_commands: ["node scripts/validate-agentready-strategy-docs.mjs", "node scripts/validate-agentready-execution-system.mjs"],
  required_evidence: ["completed empty pilot templates", "threshold-to-evidence mapping", "consent and redaction review", "no-telemetry review"]
});
ownerAction("AR-PILOT-EPIC", "AR-MARKET-PILOT-001H", "M4", "BEFORE_PRO_TECHNICAL_COMPLETION", "MARKET", "Validate five-user external Community pilot", { decision_ids: [...decisionIds, validationDecisionId], depends_on: ["AR-MARKET-PILOT-001"], blocks: ["AR-MARKET-PILOT-002"], source_documents: [doc.validation, doc.gtm], acceptance_criteria: ["at least five distinct external Community users", "at least three real external repositories or contract surfaces", "at least one real OpenAPI use", "at least one real MCP use", "at least two measurable 30-day return or reuse signals where the observation window permits", "at least one useful real issue detected and corrected", "false positives false negatives abandonment reasons and feature requests recorded honestly", "at least one explicit signal identifies a function for which an external user may pay", "project accounts fixtures automated installs and TimeProofs repository runs are excluded"], required_evidence: ["pseudonymized pilot-user records", "repository or contract-surface records", "OpenAPI and MCP usage evidence", "reuse evidence or pending observation status", "real issue fix and after-result evidence", "feedback and abandonment register", "payment-function signal context"], validation_thresholds: { external_users_required: 5, real_repositories_or_surfaces_required: 3, openapi_uses_required: 1, mcp_uses_required: 1, reuse_signals_required: 2, useful_real_issue_and_fix_required: 1, explicit_payment_function_signals_required: 1, excludes_project_accounts: true, excludes_internal_fixtures: true, excludes_automated_installs: true } });
decisionGate("AR-PILOT-EPIC", "AR-MARKET-PILOT-002", "M4", "BEFORE_PRO_TECHNICAL_COMPLETION", "MARKET", "Decide whether AgentReady proceeds to Pro implementation", { decision_ids: [...decisionIds, validationDecisionId], owner: "CODEX_AND_JEASON", depends_on: ["AR-MARKET-PILOT-001H", "AR-ENG-005"], blocks: ["AR-PRO-001"], source_documents: [doc.validation, doc.engine, doc.gtm], acceptance_criteria: ["pilot threshold evidence reviewed", "benchmark thresholds and final results reviewed", "agent-specific differentiation evidence reviewed", "MCP static coverage and limitations reviewed", "false positives false negatives reuse abandonment and feature requests reviewed", "continue correct pause pivot or reject decision recorded"], required_evidence: ["pilot decision record", "benchmark review", "differentiation review", "selected outcome and owner approval"], metrics: ["external users", "real repositories", "OpenAPI and MCP usage", "30-day reuse", "useful real issues", "false positives", "false negatives", "abandonment reasons", "feature requests", "payment-function signals", "precision", "recall", "differentiation evidence"], allowed_outcomes: ["CONTINUE", "CORRECT", "PAUSE", "PIVOT", "REJECT"] });
`,
  "rebuild pilot block"
);

replaceLineByIncludes(
  rebuildLines,
  'codex("AR-ENG-EPIC", "AR-ENG-001"',
  `codex("AR-ENG-EPIC", "AR-ENG-001", "M4", "BEFORE_PRO_TECHNICAL_COMPLETION", "ENG", "Add benchmark corpus architecture and annotation schema", { decision_ids: [...decisionIds, validationDecisionId], depends_on: ["AR-COM-008"], source_documents: [doc.engine, doc.commercial, doc.validation], branch: "test-engine-benchmark-corpus-harness", pr_title: "test(engine): add AgentReady benchmark corpus foundation", allowed_paths: ["agentready-core/**", "agentready-examples/**", "docs/agentready/**"], forbidden_paths: ["package.json", "LICENSE", "*.html"], deliverables: ["safe and dangerous OpenAPI corpus schema", "safe and dangerous MCP corpus schema", "human annotation schema", "representative general-validator and linter baseline schema", "MCP static coverage classification schema"], acceptance_criteria: ["corpus supports safe dangerous ambiguous false-positive and false-negative cases", "OpenAPI and MCP cases are separated", "human labels and disagreements can be recorded", "baseline comparison fields are reproducible and tool versions are recorded", "MCP risks can be classified as detected partially detectable or statically non-detectable", "external pilot findings can be incorporated without confidential data"], required_commands: ["node agentready-core/tests/run-agentready-core-tests.mjs", "node scripts/validate-agentready-execution-system.mjs"], required_evidence: ["corpus and annotation schema", "baseline comparison schema", "MCP coverage schema", "sample reproducible fixtures"] });`,
  "rebuild engine foundation"
);

const engineLoopIndex = rebuildLines.findIndex((line) => line.includes('for (const row of [["AR-ENG-002"'));
if (engineLoopIndex < 0) throw new Error("rebuild: engine loop missing");
rebuildLines[engineLoopIndex] = rebuildLines[engineLoopIndex].replace("source_documents: [doc.engine, doc.rules]", "source_documents: [doc.engine, doc.rules, doc.validation]");
rebuildLines[engineLoopIndex] = rebuildLines[engineLoopIndex].replace(
  "required_commands: [\"node agentready-core/tests/run-agentready-core-tests.mjs\"]",
  "acceptance_criteria: row[0] === \"AR-ENG-005\" ? [\"reproducible final report publishes precision recall false-positive false-negative performance and reproducibility results\", \"representative general validation or linting baselines are versioned and reproduced\", \"agent-specific differentiation is stated factually from measured cases\", \"MCP coverage matrix distinguishes detected partially detectable and statically non-detectable risks\", \"limitations and complementary runtime categories are explicit\", \"external pilot findings are included only with consent and without confidential data\"] : [`${row[1]} complete`], required_commands: [\"node agentready-core/tests/run-agentready-core-tests.mjs\"]"
);

const proEpicIndex = rebuildLines.findIndex((line) => line.includes('epic("AR-PRO-EPIC"'));
if (proEpicIndex < 0) throw new Error("rebuild: Pro epic missing");
rebuildLines[proEpicIndex] = rebuildLines[proEpicIndex].replace('["AR-ENG-005"]', '["AR-MARKET-PILOT-002"]');
const proLoopIndex = rebuildLines.findIndex((line) => line.includes('].forEach(([id,title], i) => codex("AR-PRO-EPIC"'));
if (proLoopIndex < 0) throw new Error("rebuild: Pro loop missing");
rebuildLines[proLoopIndex] = rebuildLines[proLoopIndex].replace('i === 0 ? ["AR-ENG-005"]', 'i === 0 ? ["AR-MARKET-PILOT-002"]');
rebuildLines[proLoopIndex] = rebuildLines[proLoopIndex].replace('source_documents: [doc.entitlements]', 'source_documents: [doc.entitlements, doc.validation]');

const licEpicIndex = rebuildLines.findIndex((line) => line.includes('epic("AR-LIC-EPIC"'));
if (licEpicIndex < 0) throw new Error("rebuild: licensing epic missing");
rebuildLines[licEpicIndex] = rebuildLines[licEpicIndex].replace('["AR-PRO-008"]', '["AR-PRO-008", "AR-MARKET-002"]');
const licLoopIndex = rebuildLines.findIndex((line) => line.includes('forEach((title, i) => codex("AR-LIC-EPIC"'));
if (licLoopIndex < 0) throw new Error("rebuild: licensing loop missing");
rebuildLines[licLoopIndex] = rebuildLines[licLoopIndex].replace('i === 0 ? ["AR-PRO-008"]', 'i === 0 ? ["AR-PRO-008", "AR-MARKET-002"]');
rebuildLines[licLoopIndex] = rebuildLines[licLoopIndex].replace('source_documents: [doc.licensing, doc.entitlements]', 'source_documents: [doc.licensing, doc.entitlements, doc.validation]');

const marketAIndex = rebuildLines.findIndex((line) => line.includes('"AR-MARKET-001A"'));
if (marketAIndex < 0) throw new Error("rebuild: market validation tasks missing");
rebuildLines.splice(marketAIndex, 0, 'epic("AR-MARKET-EPIC", "M5", "BEFORE_PRO_FIRST_SALE", "MARKET", "Commercial validation and evidence gates", ["AR-MARKET-PILOT-002"]);');

for (let index = 0; index < rebuildLines.length; index += 1) {
  let line = rebuildLines[index];
  if (line.includes('"AR-MARKET-001A"')) {
    line = line.replace('decisionGate("AR-SITE-EPIC","AR-MARKET-001A","M7","BEFORE_GLOBAL_LAUNCH"', 'decisionGate("AR-MARKET-EPIC","AR-MARKET-001A","M5","BEFORE_PRO_FIRST_SALE"');
    line = line.replace('depends_on:["AR-COM-008"]', 'depends_on:["AR-MARKET-PILOT-002"]');
    line = line.replace('source_documents:[doc.gtm,doc.adoption]', 'source_documents:[doc.gtm,doc.adoption,doc.validation]');
    line = line.replace('{depends_on:', '{decision_ids:[...decisionIds,validationDecisionId],depends_on:');
  }
  if (line.includes('"AR-MARKET-001B"')) {
    line = line.replace('decisionGate("AR-SITE-EPIC","AR-MARKET-001B","M7","BEFORE_GLOBAL_LAUNCH"', 'decisionGate("AR-MARKET-EPIC","AR-MARKET-001B","M5","BEFORE_PRO_FIRST_SALE"');
    line = line.replace('source_documents:[doc.gtm,doc.pricing]', 'source_documents:[doc.gtm,doc.pricing,doc.validation]');
    line = line.replace('{depends_on:', '{decision_ids:[...decisionIds,validationDecisionId],depends_on:');
  }
  if (line.includes('"AR-MARKET-001C"')) {
    line = line.replace('decisionGate("AR-SITE-EPIC","AR-MARKET-001C"', 'decisionGate("AR-MARKET-EPIC","AR-MARKET-001C"');
  }
  if (line.includes('"AR-MARKET-001D"')) {
    line = line.replace('decisionGate("AR-SITE-EPIC","AR-MARKET-001D","M7","BEFORE_GLOBAL_LAUNCH"', 'decisionGate("AR-MARKET-EPIC","AR-MARKET-001D","M5","BEFORE_PRO_FIRST_SALE"');
    line = line.replace('source_documents:[doc.gtm,doc.engine,doc.commercial]', 'source_documents:[doc.gtm,doc.engine,doc.commercial,doc.validation]');
    line = line.replace('{owner:', '{decision_ids:[...decisionIds,validationDecisionId],owner:');
  }
  if (line.includes('"AR-MARKET-001"') && !line.includes('"AR-MARKET-001A"') && !line.includes('"AR-MARKET-001B"') && !line.includes('"AR-MARKET-001C"') && !line.includes('"AR-MARKET-001D"')) {
    line = line.replace('decisionGate("AR-SITE-EPIC","AR-MARKET-001"', 'decisionGate("AR-MARKET-EPIC","AR-MARKET-001"');
  }
  rebuildLines[index] = line;
}

const marketCLine = rebuildLines.findIndex((line) => line.includes('"AR-MARKET-001C"'));
if (marketCLine < 0) throw new Error("rebuild: first sale gate missing");
rebuildLines.splice(marketCLine, 0, `decisionGate("AR-MARKET-EPIC", "AR-MARKET-002", "M5", "BEFORE_PRO_FIRST_SALE", "MARKET", "Authorize licensing Stripe and account implementation", { decision_ids: [...decisionIds, validationDecisionId], owner: "CODEX_AND_JEASON", depends_on: ["AR-MARKET-001A", "AR-MARKET-001B", "AR-MARKET-001D"], blocks: ["AR-LIC-001"], source_documents: [doc.validation, doc.gtm, doc.pricing, doc.engine], acceptance_criteria: ["ten external Community users gate passed", "three explicit Pro payment signals gate passed at the real price and scope", "credible external value case gate passed", "benchmark and differentiation evidence accepted", "owner authorizes or refuses commercial infrastructure implementation", "continue correct pause pivot or reject decision recorded"], required_evidence: ["commercial infrastructure authorization decision", "ten-user evidence review", "payment-signal evidence review", "value-case evidence review", "benchmark and differentiation review"], metrics: ["external Community users", "30-day reuse", "explicit Pro payment signals", "credible public value cases", "precision", "recall", "false-positive rate", "differentiation evidence"], allowed_outcomes: ["CONTINUE", "CORRECT", "PAUSE", "PIVOT", "REJECT"] });`);

const batchOnboardingIndex = rebuildLines.findIndex((line) => line.includes('["ARB-ONB-001"'));
if (batchOnboardingIndex < 0) throw new Error("rebuild: onboarding batch missing");
if (!rebuildLines.some((line) => line.includes('"ARB-MARKET-PILOT-001"'))) {
  rebuildLines.splice(batchOnboardingIndex + 1, 0, `  ["ARB-MARKET-PILOT-001", "Prepare external Community pilot kit", ["AR-MARKET-PILOT-001"], { deliverables: ["tester guide", "pilot evidence registry", "false-positive and false-negative register", "abandonment and feature-request register", "before fix after case template", "consent and confidentiality checklist", "outreach candidate worksheet", "voluntary feedback procedure"], acceptance_criteria: ["all five-user pilot thresholds map to evidence fields", "templates distinguish OpenAPI and MCP use", "reuse issue fix false-positive false-negative abandonment feature-request and payment-signal evidence can be recorded", "consent redaction and confidentiality controls are explicit", "no automatic outreach invented evidence or silent telemetry is introduced"], required_evidence: ["pilot kit review", "threshold-to-evidence mapping", "consent and privacy review"], scope_justification: "One coherent documentation and evidence-system boundary for the external Community pilot." }],`);
}

const taskForDocIndex = rebuildLines.findIndex((line) => line.startsWith("function taskForDoc(file)"));
if (taskForDocIndex < 0) throw new Error("rebuild: taskForDoc missing");
if (!rebuildLines[taskForDocIndex].includes("validation_gates")) {
  rebuildLines[taskForDocIndex] = rebuildLines[taskForDocIndex].replace(
    "function taskForDoc(file) { const f = file.toLowerCase();",
    "function taskForDoc(file) { const f = file.toLowerCase(); if (f.includes('validation_gates') || f.includes('external_pilot')) return ['AR-MARKET-PILOT-001','AR-MARKET-PILOT-002'];"
  );
}

write(files.rebuild, rebuildLines.join("\n"));
console.log("AgentReady validation gates and pilot plan applied.");
