import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const repoRoot = process.cwd();
const publishedActionSha = "d6634d0fbbe1fced510fc49d8871d52a3dc7f348";

function read(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function assertIncludes(file, expected) {
  assert.ok(read(file).includes(expected), `${file} must include ${expected}`);
}

function assertNotIncludes(file, forbidden) {
  assert.ok(!read(file).includes(forbidden), `${file} must not include ${forbidden}`);
}

function assertMatches(file, pattern) {
  assert.match(read(file), pattern, `${file} must match ${pattern}`);
}

function assertNotMatches(file, pattern) {
  assert.doesNotMatch(read(file), pattern, `${file} must not match ${pattern}`);
}

const actionPath = "action.yml";
const nestedActionPath = ".github/actions/agentready/action.yml";

assert.ok(existsSync(path.join(repoRoot, actionPath)), "root action.yml must exist");
assert.ok(!existsSync(path.join(repoRoot, nestedActionPath)), "nested Action metadata must be removed");
assert.ok(!existsSync(path.join(repoRoot, "action.yaml")), "repository must not contain both action.yml and action.yaml");

const action = read(actionPath);
assertIncludes(actionPath, "name: AgentReady CI Gate by TimeProofs");
assertIncludes(actionPath, "author: TimeProofs");
assertIncludes(actionPath, "description: Static CI gate for agent-facing OpenAPI and MCP contracts.");
assertMatches(actionPath, /branding:\s*\n\s*icon: shield\s*\n\s*color: blue/);
assertMatches(actionPath, /runs:\s*\n\s*using: composite/);
for (const input of ["file", "type", "min-score", "fail-on", "out"]) {
  assertMatches(actionPath, new RegExp(`\\n  ${input}:\\n`));
}
for (const output of ["score", "status", "report-path", "contract-path"]) {
  assertMatches(actionPath, new RegExp(`\\n  ${output}:\\n`));
}
for (const expected of [
  'node "$action_repo_root/bin/agentready.js" scan "$scan_type" "$scan_file"',
  "--min-score",
  "--fail-on",
  'exit "$exit_code"',
  "agentready-report.md",
  "agentready.json",
  "agentready-mcp-report.md",
  "agentready-mcp.json"
]) {
  assertIncludes(actionPath, expected);
}
for (const forbidden of [
  "npm install @timeproofs/agentready",
  "curl ",
  "wget ",
  "api.timeproofs",
  "OPENAI_API_KEY",
  "MCP_SERVER",
  "telemetry"
]) {
  assertNotMatches(actionPath, new RegExp(forbidden.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));
}
assert.ok(!action.includes("$GITHUB_ACTION_PATH/../../.."), "root Action must not use nested path traversal");

const workflowFiles = [
  ".github/workflows/agentready-action-integration.yml",
  ".github/workflows/agentready-community-release-candidate.yml"
];
for (const workflow of workflowFiles) {
  assertIncludes(workflow, "uses: ./");
  assertNotIncludes(workflow, "uses: ./.github/actions/agentready");
  assertMatches(workflow, /permissions:\s*\n\s*contents:\s*read/);
  assertNotMatches(workflow, /contents:\s*write|packages:\s*write|id-token:\s*write|pull-requests:\s*write/);
}
assertIncludes(".github/workflows/agentready-action-integration.yml", "- \"action.yml\"");
assertIncludes(".github/workflows/agentready-community-release-candidate.yml", "- \"action.yml\"");

const usageDoc = "docs/agentready/GITHUB_ACTION_USAGE.md";
const versioningDoc = "docs/agentready/GITHUB_ACTION_VERSIONING.md";
const executionSpec = "docs/agentready/GITHUB_ACTION_MARKETPLACE_EXECUTION_SPEC.md";
const exampleWorkflow = "docs/agentready/examples/github-action-agentready.yml";

for (const file of [usageDoc, versioningDoc, executionSpec, exampleWorkflow, "README.md", "AGENTREADY_PROJECT_CONTEXT.md"]) {
  assertIncludes(file, "agentready-action-v0.1.0-alpha.0");
}
for (const file of [usageDoc, versioningDoc, executionSpec, exampleWorkflow]) {
  const content = read(file);
  assert.ok(content.includes("uses: BACOUL/timeproofs@agentready-action-v0.1.0-alpha.0"), `${file} must include immutable tag usage`);
  assert.ok(
    content.includes("uses: BACOUL/timeproofs@<FULL_ACTION_RELEASE_COMMIT_SHA>") ||
      content.includes(`uses: BACOUL/timeproofs@${publishedActionSha}`),
    `${file} must include a placeholder or finalized full-SHA usage`
  );
}
assertMatches(usageDoc, /permissions:\s*\n\s*contents:\s*read/);
assertIncludes(executionSpec, "Action Release Evidence Record");
const executionContent = read(executionSpec);
assert.ok(
  executionContent.includes("Status: PRE_OWNER_CHECKPOINT") ||
    executionContent.includes("Status: PUBLISHED_AND_VERIFIED"),
  "execution spec must identify pre-owner or published state"
);
if (executionContent.includes("Status: PRE_OWNER_CHECKPOINT")) {
  assertIncludes(executionSpec, "Approved implementation SHA: `PENDING_OWNER_APPROVAL`");
  assertIncludes(executionSpec, "Marketplace URL: `PENDING_OWNER_CONFIRMATION`");
} else {
  assertIncludes(executionSpec, `Approved implementation SHA: \`${publishedActionSha}\``);
  assertIncludes(executionSpec, "https://github.com/marketplace/actions/agentready-ci-gate-by-timeproofs");
  assertIncludes(executionSpec, "Owner Marketplace agreement: accepted privately");
  assertIncludes(executionSpec, "Owner 2FA: completed privately; no secret recorded");
}
assertIncludes(executionSpec, "Compromised-release response");

for (const site of ["index.html", "pricing.html", "agentready-ci.html"]) {
  const content = read(site);
  assert.match(content, /AgentReady Community/i, `${site} must mention Community`);
  assert.match(content, /available for free|free/i, `${site} must show Community free availability`);
  assert.match(content, /AgentReady Pro/i, `${site} must mention Pro`);
  assert.match(content, /in preparation/i, `${site} must state Pro is in preparation`);
  assert.ok(content.includes("npx @timeproofs/agentready@alpha"), `${site} must show npm alpha command`);
  assert.ok(
    content.includes("TimeProofs AgentReady does not guarantee that an AI agent will never fail."),
    `${site} must include the mandatory limitation`
  );
  assert.doesNotMatch(content, /149\s*&euro;|499\s*&euro;|Fix Pack|payment by email|Request review by email|Request Fix Pack|mandatory contact/i);
  assert.doesNotMatch(content, /Pro (is )?(available|purchasable|ready to buy)/i);
  assert.doesNotMatch(content, /certified|certification|guaranteed safety/i);
}

assertIncludes("pricing.html", "AgentReady Community - available for free");
assertIncludes("pricing.html", "AgentReady Pro - in preparation");
assertIncludes("agentready-ci.html", "GitHub Marketplace Action");
const ciContent = read("agentready-ci.html");
assert.ok(
  ciContent.includes("after-owner-marketplace-checkpoint") ||
    ciContent.includes("uses: BACOUL/timeproofs@agentready-action-v0.1.0-alpha.0"),
  "agentready-ci.html must include pre-publication placeholder or finalized immutable tag"
);

console.log("AgentReady Action Marketplace readiness validation: PASS");
