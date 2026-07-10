import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const repoRoot = process.cwd();

const requiredDocs = [
  "docs/agentready/COMMUNITY_NPM_SCOPE_AUDIT.md",
  "docs/agentready/COMMUNITY_LICENSE_DECISION.md",
  "docs/agentready/COMMUNITY_PROOFSPEC_REFERENCE_AUDIT.md",
  "docs/agentready/COMMUNITY_PUBLICATION_POLICY.md",
  "docs/agentready/COMMUNITY_PUBLICATION_APPROVAL_CHECKLIST.md",
  "docs/agentready/COMMUNITY_PUBLICATION_BLOCKERS.md",
  "docs/agentready/COMMUNITY_TARBALL_PUBLIC_CONTENT_AUDIT.md",
];

function read(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function fail(message) {
  console.error(`AgentReady publication blockers validation: FAIL\n${message}`);
  process.exit(1);
}

function assert(condition, message) {
  if (!condition) fail(message);
}

function assertIncludes(file, expected) {
  const content = read(file);
  assert(content.includes(expected), `${file} must include: ${expected}`);
}

function walk(relativeDir) {
  const absoluteDir = path.join(repoRoot, relativeDir);
  const out = [];
  if (!existsSync(absoluteDir)) return out;
  for (const entry of readdirSync(absoluteDir, { withFileTypes: true })) {
    const relative = path.join(relativeDir, entry.name).replaceAll(path.sep, "/");
    if (entry.isDirectory()) out.push(...walk(relative));
    if (entry.isFile()) out.push(relative);
  }
  return out;
}

for (const file of requiredDocs) {
  assert(existsSync(path.join(repoRoot, file)), `${file} must exist`);
}

const packageJson = JSON.parse(read("package.json"));
assert(packageJson.name === "@timeproofs/agentready", "package name must remain @timeproofs/agentready");
assert(packageJson.version === "0.1.0-alpha.0", "package version must remain 0.1.0-alpha.0");
assert(packageJson.private === true, "package must remain private: true");
assert(packageJson.license === "SEE LICENSE IN LICENSE", "package license field must remain SEE LICENSE IN LICENSE until explicit approval");

const publishSensitiveFiles = [
  "package.json",
  ...walk(".github/workflows"),
  ...walk(".github/actions"),
  ...walk("scripts"),
].filter((file) => existsSync(path.join(repoRoot, file)) && file !== "scripts/validate-agentready-publication-blockers.mjs");

for (const file of publishSensitiveFiles) {
  const content = read(file);
  assert(!/\bnpm\s+publish\b/i.test(content), `${file} must not add npm publish`);
  assert(!/\bgh\s+release\s+create\b/i.test(content), `${file} must not create a GitHub Release`);
  assert(!/\bgit\s+tag\b/i.test(content), `${file} must not create a git tag`);
  assert(!/NPM_TOKEN|NODE_AUTH_TOKEN/.test(content), `${file} must not introduce npm publication tokens`);
}

assertIncludes("docs/agentready/COMMUNITY_PUBLICATION_APPROVAL_CHECKLIST.md", "PUBLICATION APPROVED: NO");
const approval = read("docs/agentready/COMMUNITY_PUBLICATION_APPROVAL_CHECKLIST.md");
assert(!approval.includes("PUBLICATION APPROVED: YES"), "publication approval must not be YES in this PR");

const scopeAudit = read("docs/agentready/COMMUNITY_NPM_SCOPE_AUDIT.md");
assert(scopeAudit.includes("Scope control: OWNER ACTION REQUIRED"), "npm scope control must remain owner action required until verified");
assert(!/Scope control:\s*RESOLVED/i.test(scopeAudit), "npm scope must not be declared resolved without proof");
assert(scopeAudit.includes("E404 Not Found"), "npm package E404 evidence must be recorded");
assert(scopeAudit.includes("ENEEDAUTH"), "npm unauthenticated evidence must be recorded");

const license = read("LICENSE");
const licenseDecision = read("docs/agentready/COMMUNITY_LICENSE_DECISION.md");
assert(license.includes("ProofSpec"), "current LICENSE should still expose the known ProofSpec blocker");
assert(licenseDecision.includes("FINAL LICENSE APPROVAL REQUIRED BEFORE PUBLICATION"), "license decision must require final approval");
assert(licenseDecision.includes("legacy LICENSE references unresolved"), "license decision must record unresolved legacy license references");

const proofSpecAudit = read("docs/agentready/COMMUNITY_PROOFSPEC_REFERENCE_AUDIT.md");
assert(proofSpecAudit.includes("| `LICENSE` | ProofSpec"), "ProofSpec audit must classify LICENSE");
assert(proofSpecAudit.includes("| `README.md` | Previous proof-of-existence"), "ProofSpec audit must classify README");
assert(proofSpecAudit.includes("LEGAL REVIEW REQUIRED"), "ProofSpec audit must require legal review for package references");
assert(proofSpecAudit.includes("Publication is blocked"), "ProofSpec audit must block publication");

const blockers = read("docs/agentready/COMMUNITY_PUBLICATION_BLOCKERS.md");
for (const expected of [
  "npm scope `@timeproofs` control",
  "package `@timeproofs/agentready` availability",
  "AgentReady Community license",
  "package-included ProofSpec references",
  "exact tarball public content",
]) {
  assert(blockers.includes(expected), `blocker table must include ${expected}`);
}
assert(blockers.includes("OWNER ACTION REQUIRED"), "blockers must record owner actions");
assert(blockers.includes("LEGAL REVIEW REQUIRED"), "blockers must record legal review");
assert(blockers.includes("PUBLICATION APPROVED: NO"), "blocker table must keep publication approval NO");
assert(blockers.includes("The next authorized action is owner/legal resolution of open blockers, not publication."), "next action must not be publication while blockers remain open");

const policy = read("docs/agentready/COMMUNITY_PUBLICATION_POLICY.md");
for (const expected of [
  "@timeproofs/agentready",
  "0.1.0-alpha.0",
  "\"private\": true",
  "trusted publishing",
  "no long-lived npm token",
  "no `NPM_TOKEN`",
  "no `NODE_AUTH_TOKEN`",
  "Publication is forbidden from:",
  "an open pull request",
  "an unverified local commit",
]) {
  assert(policy.includes(expected), `publication policy must include ${expected}`);
}

const tarballAudit = read("docs/agentready/COMMUNITY_TARBALL_PUBLIC_CONTENT_AUDIT.md");
for (const expected of [
  "bin/agentready.js",
  "agentready-core/*.js",
  "agentready-core/simulation/*.js",
  "public HTML site",
  "backend",
  "Stripe",
  "dashboard",
  "secrets",
  "LICENSE` still contains legacy ProofSpec",
]) {
  assert(tarballAudit.includes(expected), `tarball audit must include ${expected}`);
}

const executionDocs = [
  "docs/agentready/AGENTREADY_MASTER_PLAN.md",
  "docs/agentready/EXECUTION_SEQUENCE.md",
  "docs/agentready/TODO_NEXT.md",
  "docs/agentready/REMAINING_WORK.md",
  "docs/agentready/EXECUTION_LOCK_90_DAYS.md",
  "README.md",
  "ROADMAP.md",
  "AGENTREADY_PROJECT_CONTEXT.md",
  "docs/agentready/README.md",
];

for (const file of executionDocs) {
  const content = read(file);
  assert(content.includes("COMMUNITY_PUBLICATION_BLOCKERS.md") || content.includes("Resolve documented owner/legal Community publication blockers"), `${file} must point to publication blockers or owner/legal action`);
}

console.log("AgentReady publication blockers validation: PASS");
