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

const nextPrTitle = "release(agentready): resolve Community publication blockers";
const nextBranch = "release-agentready-community-publication-blockers";
const limitation =
  "TimeProofs AgentReady does not guarantee that an AI agent will never fail.\n" +
  "It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.";

function read(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
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
assert(master.includes("If another document conflicts with AGENTREADY_MASTER_PLAN.md, the master plan prevails."), "Master Plan conflict rule is missing");
assert(master.includes("AgentReady is the shift-left CI gate for agent-facing contracts."), "Official positioning is missing");
assert(master.includes("AgentReady analyzes OpenAPI specifications and MCP tools before deployment to identify ambiguous, unbounded or insufficiently controlled agent actions."), "Official description is missing");
assert(master.includes(limitation), "Mandatory limitation is missing from Master Plan");
assert(master.includes("No risk covered by the selected AgentReady engine version, ruleset version and policy configuration was detected in the analyzed input."), "PASS/score definition is missing");
assert(master.includes("Initial launch includes only:"), "Initial launch scope is missing");
assert(master.includes("- Community;\n- Pro."), "Initial launch must be Community + Pro");
assert(master.includes("Team and Agency are `POST_REVENUE`."), "Team/Agency post-revenue rule is missing");
assert(master.includes("Community keeps CI blocking free."), "Community free CI blocking is missing");
assert(master.includes("Never put CI blocking behind Pro."), "CI blocking anti-paywall rule is missing");
assert(master.includes("Never monetize by number of Community scans."), "Community scan monetization ban is missing");
assert(master.includes("5 registered repositories"), "Pro repository limit must be five registered repositories");
assert(master.includes("Runs:\n\n```txt\nunlimited\n```"), "Pro runs must be unlimited");
assert(master.includes("No silent telemetry in Community."), "Silent Community telemetry ban is missing");
assert(master.includes(nextPrTitle), "Master Plan must name the only next PR");
assert(master.includes(nextBranch), "Master Plan must name the only next branch");

assertIncludes("docs/agentready/EXECUTION_SEQUENCE.md", "Status: ACTIVE SOURCE OF EXECUTION ORDER");
assertIncludes("docs/agentready/EXECUTION_SEQUENCE.md", "Phase 2 - Resolve Community Blockers");
assertIncludes("docs/agentready/EXECUTION_SEQUENCE.md", "Phase 6 - MVP Pro");
assertIncludes("docs/agentready/EXECUTION_SEQUENCE.md", "## Post-Revenue");
assertIncludes("docs/agentready/EXECUTION_SEQUENCE.md", nextPrTitle);
assertIncludes("docs/agentready/EXECUTION_SEQUENCE.md", nextBranch);

assertIncludes("docs/agentready/DECISION_LOG.md", "Community and Pro at launch");
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
  assertIncludes(file, nextPrTitle);
  assertIncludes(file, nextBranch);
}

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
    const allowed = file === "docs/agentready/EXECUTION_SEQUENCE.md" || content.includes("SUPERSEDED BY");
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
