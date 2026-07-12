import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const repoRoot = process.cwd();

const requiredDocs = [
  "docs/agentready/AGENTREADY_MASTER_PLAN.md",
  "docs/agentready/PRODUCT_SCOPE_AND_NON_GOALS.md",
  "docs/agentready/COMMUNITY_PRO_ENTITLEMENTS.md",
  "docs/agentready/ENGINE_QUALITY_AND_BENCHMARK_PLAN.md",
  "docs/agentready/DISTRIBUTION_ADOPTION_AND_STANDARDIZATION_STRATEGY.md",
  "docs/agentready/THREE_MINUTE_ONBOARDING_SPEC.md",
  "docs/agentready/RULE_FORMAT_AND_GOVERNANCE.md",
  "docs/agentready/MCP_VERSION_COMPATIBILITY_POLICY.md",
  "docs/agentready/LEGAL_IP_AND_LIABILITY_STRATEGY.md",
  "docs/agentready/PRIVACY_TELEMETRY_SUPPORT_AND_TRUST_MODEL.md",
  "docs/agentready/DUE_DILIGENCE_AND_TRANSFERABILITY.md",
  "docs/agentready/EXECUTION_SEQUENCE.md",
  "docs/agentready/DECISION_LOG.md",
  "docs/agentready/AGENTREADY_EXECUTION_LEDGER.json",
  "docs/agentready/PROJECT_CHANGE_CONTROL.md",
  "docs/agentready/history/SELF_SERVICE_EXECUTION_PLAN_PRE_REBASELINE.md",
];

const keyDocs = [
  "README.md",
  "ROADMAP.md",
  "AGENTREADY_PROJECT_CONTEXT.md",
  "docs/agentready/README.md",
  "docs/agentready/TODO_NEXT.md",
  "docs/agentready/EXECUTION_LOCK_90_DAYS.md",
  "docs/agentready/REMAINING_WORK.md",
  "docs/agentready/SELF_SERVICE_EXECUTION_PLAN.md",
  "docs/agentready/SELF_SERVICE_BUSINESS_MODEL.md",
  "docs/agentready/PRICING_AND_ENTITLEMENTS_V0_1.md",
  "docs/agentready/AUTOMATED_PURCHASE_AND_BILLING_FLOW.md",
  "docs/agentready/SEO_GEO_AI_FIRST_REQUIREMENTS.md",
  "docs/agentready/GLOBAL_LAUNCH_READINESS_MATRIX.md",
];

const blockerPrTitle = "release(agentready): resolve Community publication blockers";
const blockerBranch = "release-agentready-community-publication-blockers";
const publishPrTitle = "release(agentready): publish Community CLI and immutable release";
const limitation =
  "TimeProofs AgentReady does not guarantee that an AI agent will never fail.\n" +
  "It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.";

function read(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8").replace(/\r\n/g, "\n");
}

function fail(message) {
  console.error(`AgentReady strategy docs validation: FAIL\n${message}`);
  process.exit(1);
}

function assert(condition, message) {
  if (!condition) fail(message);
}

function assertIncludes(file, expected) {
  const content = read(file);
  assert(content.includes(expected), `${file} must include: ${expected}`);
}

function section(content, start, end) {
  const startIndex = content.indexOf(start);
  assert(startIndex >= 0, `Missing section start: ${start}`);
  const endIndex = end ? content.indexOf(end, startIndex + start.length) : -1;
  return content.slice(startIndex, endIndex >= 0 ? endIndex : undefined);
}

function listMarkdownFiles(dir) {
  const root = path.join(repoRoot, dir);
  const out = [];
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    const absolute = path.join(root, entry.name);
    const relative = path.relative(repoRoot, absolute).replaceAll(path.sep, "/");
    if (entry.isDirectory()) {
      out.push(...listMarkdownFiles(relative));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      out.push(relative);
    }
  }
  return out;
}

for (const file of requiredDocs) {
  assert(existsSync(path.join(repoRoot, file)), `${file} must exist`);
}

for (const file of keyDocs) {
  assert(existsSync(path.join(repoRoot, file)), `${file} must exist`);
}

const master = read("docs/agentready/AGENTREADY_MASTER_PLAN.md");
assert(master.includes("Status: ACTIVE SOURCE OF TRUTH"), "Master Plan must be active");
assert(master.includes("This document supersedes earlier AgentReady product, commercial and execution directions wherever they conflict with this master plan."), "Master Plan must supersede conflicting earlier directions");
assert(master.includes("1. `AGENTREADY_MASTER_PLAN.md`"), "Master Plan hierarchy must list itself first");
assert(master.includes("2. `EXECUTION_SEQUENCE.md`"), "Master Plan hierarchy must list the execution sequence second");
assert(master.includes("3. `DECISION_LOG.md`"), "Master Plan hierarchy must list the decision log third");
assert(master.includes("4. `AGENTREADY_EXECUTION_LEDGER.json`"), "Master Plan hierarchy must list the canonical execution ledger fourth");
assert(master.includes("Generated Markdown views must not be edited manually."), "Master Plan must protect generated views");
assert(master.includes("Every approved known task must exist in the canonical ledger."), "Master Plan must require every known task in the ledger");
assert(master.includes("Every new implementation prompt must be generated from the ledger."), "Master Plan must require implementation prompts from the ledger");
assert(master.includes("Unknown future events, external changes and newly discovered work are handled through the mandatory change-control process before implementation."), "Master Plan must include change-control rule for unknown future work");
assert(master.includes("If another document conflicts with AGENTREADY_MASTER_PLAN.md, the master plan prevails."), "Master Plan conflict rule is missing");
assert(master.includes("AgentReady is the shift-left CI gate for agent-facing contracts."), "Official positioning is missing");
assert(master.includes("AgentReady analyzes OpenAPI specifications and MCP tools before deployment to identify ambiguous, unbounded or insufficiently controlled agent actions."), "Official description is missing");
assert(master.includes(limitation), "Mandatory limitation is missing from Master Plan");
assert(master.includes("No risk covered by the selected AgentReady engine version, ruleset version and policy configuration was detected in the analyzed input."), "PASS/score definition is missing");
assert(master.includes("Initial launch includes only:"), "Initial launch scope is missing");
assert(master.includes("- Community;\n- Pro."), "Initial launch must be Community + Pro");
assert(master.includes("POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT"), "Team/Agency exact post-revenue marker is missing");
assert(master.includes("Community keeps CI blocking free."), "Community free CI blocking is missing");
assert(master.includes("Never put CI blocking behind Pro."), "CI blocking anti-paywall rule is missing");
assert(master.includes("Never monetize by number of Community scans."), "Community scan monetization ban is missing");
assert(master.includes("5 registered repositories"), "Pro repository limit must be five registered repositories");
assert(master.includes("Runs:\n\n```txt\nunlimited\n```"), "Pro runs must be unlimited");
assert(master.includes("No silent telemetry in Community."), "Silent Community telemetry ban is missing");
assert(master.includes("Stripe payment\n-> cryptographically random AgentReady license key\n-> only the key hash stored server-side\n-> signed entitlement token\n-> local signature verification\n-> bounded local cache\n-> documented grace period"), "Master Plan license architecture is incomplete");
assert(master.includes("An old PASS must never be shown as the current state."), "Master Plan badge freshness rule is missing");
assert(master.includes("COMMUNITY_PUBLICATION_BLOCKERS.md"), "Master Plan must point to publication blockers");
assert(master.includes(publishPrTitle), "Master Plan must name the gated publish PR");
assert(master.includes("If any blocker remains open"), "Master Plan must block publication while blockers remain open");

assertIncludes("docs/agentready/EXECUTION_SEQUENCE.md", "Status: ACTIVE SOURCE OF EXECUTION ORDER");
assertIncludes("docs/agentready/EXECUTION_SEQUENCE.md", "docs/agentready/AGENTREADY_EXECUTION_LEDGER.json");
assertIncludes("docs/agentready/EXECUTION_SEQUENCE.md", "docs(project): add canonical AgentReady execution system");
assertIncludes("docs/agentready/EXECUTION_SEQUENCE.md", "Phase 2 - Resolve Community Blockers");
assertIncludes("docs/agentready/EXECUTION_SEQUENCE.md", "Phase 6 - MVP Pro");
assertIncludes("docs/agentready/EXECUTION_SEQUENCE.md", "## Post-Revenue");
assertIncludes("docs/agentready/EXECUTION_SEQUENCE.md", blockerPrTitle);
assertIncludes("docs/agentready/EXECUTION_SEQUENCE.md", publishPrTitle);

assertIncludes("docs/agentready/DECISION_LOG.md", "Community and Pro at launch");
assertIncludes("docs/agentready/DECISION_LOG.md", "Decision ID: DL-2026-07-10-CANONICAL-EXECUTION-SYSTEM");
assertIncludes("docs/agentready/DECISION_LOG.md", "The canonical execution-system PR is inserted before further publication-blocker resolution in order to prevent project drift, omissions and improvised execution prompts.");
assertIncludes("docs/agentready/DECISION_LOG.md", "Team and Agency are post-revenue");
assertIncludes("docs/agentready/DECISION_LOG.md", "Community includes free CI blocking");
assertIncludes("docs/agentready/DECISION_LOG.md", "No silent Community telemetry");

for (const file of [
  "README.md",
  "ROADMAP.md",
  "AGENTREADY_PROJECT_CONTEXT.md",
  "docs/agentready/README.md",
  "docs/agentready/TODO_NEXT.md",
  "docs/agentready/EXECUTION_LOCK_90_DAYS.md",
  "docs/agentready/REMAINING_WORK.md",
]) {
  assert(read(file).includes("AGENTREADY_EXECUTION_LEDGER.json") || file === "docs/agentready/EXECUTION_LOCK_90_DAYS.md", `${file} must mention the canonical execution ledger or be covered by execution lock`);
  assert(read(file).includes(blockerPrTitle) || read(file).includes("COMMUNITY_PUBLICATION_BLOCKERS.md") || read(file).includes("Resolve documented owner/legal Community publication blockers"), `${file} must point to the blocker flow`);
}

assertIncludes("docs/agentready/PROJECT_CHANGE_CONTROL.md", "No implementation task may change the product strategy, launch scope,");
assertIncludes("docs/agentready/PROJECT_CHANGE_CONTROL.md", "The ledger represents all known approved work, not unknowable future work.");

for (const file of [
  "README.md",
  "ROADMAP.md",
  "AGENTREADY_PROJECT_CONTEXT.md",
  "docs/agentready/README.md",
  "docs/agentready/SELF_SERVICE_BUSINESS_MODEL.md",
  "docs/agentready/PRICING_AND_ENTITLEMENTS_V0_1.md",
  "docs/agentready/AUTOMATED_PURCHASE_AND_BILLING_FLOW.md",
  "docs/agentready/GLOBAL_LAUNCH_READINESS_MATRIX.md",
]) {
  assertIncludes(file, "POST_REVENUE");
}

assertIncludes("docs/agentready/history/SELF_SERVICE_EXECUTION_PLAN_PRE_REBASELINE.md", "Status: HISTORICAL — DO NOT EXECUTE");
assertIncludes("docs/agentready/history/SELF_SERVICE_EXECUTION_PLAN_PRE_REBASELINE.md", "It must not be used to select the next PR or product scope.");

const activeExecutionPlan = read("docs/agentready/SELF_SERVICE_EXECUTION_PLAN.md");
for (const forbidden of [
  "feat(pro): add versioned AgentReady policy configuration",
  "feat(team):",
  "feat(agency):",
  "Expected #113",
  "Expected #125",
  "Expected #129",
  "## Pro",
  "## Team",
  "## Agency",
]) {
  assert(!activeExecutionPlan.includes(forbidden), `Active SELF_SERVICE_EXECUTION_PLAN.md must not contain old execution item: ${forbidden}`);
}
assert(activeExecutionPlan.includes("COMMUNITY_PUBLICATION_BLOCKERS.md") || activeExecutionPlan.includes("release(agentready): resolve Community publication blockers"), "Active SELF_SERVICE_EXECUTION_PLAN.md must point to blockers or the blocker PR");

const licenseFiles = [
  "docs/agentready/AGENTREADY_MASTER_PLAN.md",
  "docs/agentready/COMMUNITY_PRO_ENTITLEMENTS.md",
  "docs/agentready/AUTOMATED_PURCHASE_AND_BILLING_FLOW.md",
  "docs/agentready/PRIVACY_TELEMETRY_SUPPORT_AND_TRUST_MODEL.md",
];
for (const file of licenseFiles) {
  assertIncludes(file, "cryptographically random AgentReady license key");
  assertIncludes(file, "only the key hash stored server-side");
  assertIncludes(file, "signed entitlement token");
  assertIncludes(file, "local signature verification");
  assertIncludes(file, "bounded local cache");
  assertIncludes(file, "documented grace period");
  assertIncludes(file, "never use a Stripe identifier as a secret");
  assertIncludes(file, "never store a raw license key server-side");
  assertIncludes(file, "no network call is mandatory on every scan");
  assertIncludes(file, "no OpenAPI/MCP contract is sent to the license service");
  assertIncludes(file, "Community works without account, license, or server");
}

const business = read("docs/agentready/SELF_SERVICE_BUSINESS_MODEL.md");
const businessPro = section(business, "### AgentReady Pro", "### AgentReady Team");
const businessInitialPro = section(businessPro, "Includes:", "Explicitly `POST_MVP`");
for (const forbidden of [
  "premium reports",
  "hosted result history",
  "notifications",
  "collaboration",
  "organizations",
  "advanced individual developer features",
  "client workspaces",
]) {
  assert(!businessInitialPro.includes(forbidden), `Initial Pro must not include ${forbidden}`);
}
assert(businessPro.includes("Explicitly `POST_MVP`, not initial Pro entitlement"), "Business model must mark post-MVP Pro backlog");

const entitlements = read("docs/agentready/COMMUNITY_PRO_ENTITLEMENTS.md");
const entitlementMvp = section(entitlements, "MVP functions:", "Not in Pro MVP:");
for (const forbidden of [
  "premium reports",
  "hosted result history",
  "notifications",
  "collaboration",
  "organizations",
  "advanced individual developer features",
  "client workspaces",
]) {
  assert(!entitlementMvp.includes(forbidden), `Initial Pro entitlement list must not include ${forbidden}`);
}
assert(entitlements.includes("`POST_MVP`, not initial Pro entitlement"), "Entitlements must mark post-MVP Pro backlog");

const pricing = read("docs/agentready/PRICING_AND_ENTITLEMENTS_V0_1.md");
assert(pricing.includes("| Organizations | no hosted organization | no organization |"), "Pro must not create an organization in the entitlement matrix");
assert(pricing.includes("| Premium reports | no | POST_MVP |"), "Premium reports must be POST_MVP for Pro");
assert(pricing.includes("| Result history | local artifacts only | POST_MVP hosted history |"), "Hosted history must be POST_MVP for Pro");
assert(pricing.includes("| Notifications | no | POST_MVP |"), "Notifications must be POST_MVP for Pro");

const billingFlow = read("docs/agentready/AUTOMATED_PURCHASE_AND_BILLING_FLOW.md");
const targetFlow = section(billingFlow, "```txt\nStripe payment", "```\n\nPro V0.1 creates no organization.");
assert(!targetFlow.toLowerCase().includes("organization"), "Initial Pro target flow must not create an organization");
assert(targetFlow.includes("customer/account record"), "Initial Pro flow must create customer/account record");
assert(targetFlow.includes("subscription record"), "Initial Pro flow must create subscription record");
assert(targetFlow.includes("Community/Pro entitlement"), "Initial Pro flow must create Community/Pro entitlement");
assert(targetFlow.includes("repository registration"), "Initial Pro flow must register repositories");
assert(billingFlow.includes("Pro V0.1 creates no organization."), "Billing flow must explicitly state Pro creates no organization");

const distribution = read("docs/agentready/DISTRIBUTION_ADOPTION_AND_STANDARDIZATION_STRATEGY.md");
for (const expected of [
  "Framework Integration Roadmap",
  "MCP TypeScript SDK",
  "MCP Python SDK",
  "FastMCP",
  "LangChain MCP",
  "OpenAPI Generator",
  "about ten relevant repositories",
  "Do not run 100 automated pull requests",
  "Public Observatory Policy",
  "benchmark foundation exists",
  "Adoption Metrics",
  "public npm downloads",
  "Do not claim to know private runs or findings",
]) {
  assertIncludes("docs/agentready/DISTRIBUTION_ADOPTION_AND_STANDARDIZATION_STRATEGY.md", expected);
}

for (const file of [
  "docs/agentready/AGENTREADY_MASTER_PLAN.md",
  "docs/agentready/DISTRIBUTION_ADOPTION_AND_STANDARDIZATION_STRATEGY.md",
]) {
  assertIncludes(file, "engine version");
  assertIncludes(file, "ruleset version");
  assertIncludes(file, "policy configuration/version");
  assertIncludes(file, "commit");
  assertIncludes(file, "input hash");
  assertIncludes(file, "scan date");
  assertIncludes(file, "old PASS");
}

for (const file of [
  "README.md",
  "ROADMAP.md",
  "docs/agentready/README.md",
  "docs/agentready/SELF_SERVICE_BUSINESS_MODEL.md",
  "docs/agentready/PRICING_AND_ENTITLEMENTS_V0_1.md",
  "docs/agentready/GLOBAL_LAUNCH_READINESS_MATRIX.md",
]) {
  assertIncludes(file, "Community");
  assertIncludes(file, "Pro");
}

const activeDocs = [...new Set([...requiredDocs, ...keyDocs])];
for (const file of activeDocs) {
  const content = read(file);
  if (content.includes("feat(pro): add versioned AgentReady policy configuration")) {
    const allowed = file === "docs/agentready/EXECUTION_SEQUENCE.md" || file === "docs/agentready/AGENTREADY_EXECUTION_LEDGER.json" || content.includes("SUPERSEDED BY");
    assert(allowed, `${file} must not actively launch Pro policy immediately after #112`);
  }
}

for (const file of listMarkdownFiles("docs/agentready")) {
  if (file.includes("/legacy/")) continue;
  const content = read(file);
  const superseded = content.includes("SUPERSEDED BY");
  if (superseded) continue;

  assert(!/Team\s*\|\s*79 EUR/i.test(content), `${file} must not present Team as an active launch price`);
  assert(!/Agency\s*\|\s*199 EUR/i.test(content), `${file} must not present Agency as an active launch price`);
  assert(!/Upgrade to Pro to enable CI blocking/i.test(content) || content.includes("Forbidden"), `${file} must not paywall CI blocking`);
  assert(!/official global standard/i.test(content) || content.includes("Forbidden"), `${file} must not claim an official global standard`);
  assert(!/guaranteed secure/i.test(content) || content.includes("Forbidden") || content.includes("Avoid"), `${file} must not claim guaranteed security`);
  assert(!/AgentReady Certified/i.test(content) || content.includes("Forbidden"), `${file} must not claim certification`);
  assert(!/Certificate of Compliance/i.test(content) || content.includes("Forbidden"), `${file} must not claim a certificate of compliance`);
}

for (const file of [
  "docs/agentready/AGENTREADY_MASTER_PLAN.md",
  "docs/agentready/PRODUCT_SCOPE_AND_NON_GOALS.md",
  "docs/agentready/LEGAL_IP_AND_LIABILITY_STRATEGY.md",
  "docs/agentready/PRIVACY_TELEMETRY_SUPPORT_AND_TRUST_MODEL.md",
]) {
  assertIncludes(file, limitation);
}

console.log("AgentReady strategy docs validation: PASS");
