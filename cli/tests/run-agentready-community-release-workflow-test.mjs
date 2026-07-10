import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

const workflowPath = '.github/workflows/agentready-community-release-candidate.yml';
const scriptPath = 'scripts/create-agentready-community-release-candidate.mjs';
const packagePath = 'package.json';
const releaseNotesPath = 'docs/agentready/COMMUNITY_RELEASE_NOTES_0_1_0_ALPHA_0_DRAFT.md';
const workflowDocPath = 'docs/agentready/COMMUNITY_RELEASE_WORKFLOW.md';
const checklistPath = 'docs/agentready/COMMUNITY_RELEASE_CHECKLIST.md';
const versioningPath = 'docs/agentready/GITHUB_ACTION_VERSIONING.md';

const workflow = await fs.readFile(workflowPath, 'utf8');
const script = await fs.readFile(scriptPath, 'utf8');
const pkg = JSON.parse(await fs.readFile(packagePath, 'utf8'));
const releaseNotes = await fs.readFile(releaseNotesPath, 'utf8');
const workflowDoc = await fs.readFile(workflowDocPath, 'utf8');
const checklist = await fs.readFile(checklistPath, 'utf8');
const versioning = await fs.readFile(versioningPath, 'utf8');
const authTokenPattern = new RegExp(
  [
    ['NODE', 'AUTH', 'TOKEN'].join('_'),
    ['NPM', 'TOKEN'].join('_')
  ].join('|')
);
const idTokenWritePattern = new RegExp(`${['id-token'].join('')}:\\s*write`);
const pullRequestTargetPattern = new RegExp(['pull_request', 'target'].join('_'));

assert.match(workflow, /name:\s*AgentReady Community Release Candidate/);
assert.match(workflow, /permissions:\s*\n\s*contents:\s*read/);
assert.doesNotMatch(workflow, /contents:\s*write/);
assert.doesNotMatch(workflow, /packages:\s*write/);
assert.doesNotMatch(workflow, idTokenWritePattern);
assert.doesNotMatch(workflow, /issues:\s*write/);
assert.doesNotMatch(workflow, /pull-requests:\s*write/);
assert.doesNotMatch(workflow, pullRequestTargetPattern);
assert.doesNotMatch(workflow, /push:\s*\n[\s\S]*tags:/);
assert.doesNotMatch(workflow, /\bnpm\s+publish\b/);
assert.doesNotMatch(workflow, /\bgh\s+release\s+create\b/);
assert.doesNotMatch(workflow, /\bgit\s+tag\b/);
assert.doesNotMatch(workflow, authTokenPattern);
assert.doesNotMatch(workflow, idTokenWritePattern);
assert.match(workflow, /uses:\s*\.\/\.github\/actions\/agentready/);
assert.match(workflow, /actions\/upload-artifact@v4/);
assert.match(workflow, /retention-days:\s*7/);
assert.match(workflow, /agentready-community-release-candidate-0\.1\.0-alpha\.0/);

assert.equal(pkg.private, true);
assert.equal(pkg.name, '@timeproofs/agentready');
assert.equal(pkg.version, '0.1.0-alpha.0');
assert.equal(pkg.scripts['release:community:candidate'], 'node scripts/create-agentready-community-release-candidate.mjs');

assert.match(script, /status:\s*'candidate_only'/);
assert.match(script, /publication_ready:\s*false/);
assert.match(script, /createHash\('sha256'\)/);
assert.match(script, /'pack'/);
assert.match(script, /'--pack-destination'/);
assert.doesNotMatch(script, /\bnpm\s+publish\b/);
assert.doesNotMatch(script, /\bgh\s+release\s+create\b/);
assert.doesNotMatch(script, /\bgit\s+tag\b/);
assert.doesNotMatch(script, authTokenPattern);

assert.match(releaseNotes, /Draft release notes - not published\./);
assert.doesNotMatch(releaseNotes, /published in Marketplace|npm package available|Pro plan is available|Team plan is available|Agency plan is available/);

assert.match(workflowDoc, /Candidate Only/);
assert.match(workflowDoc, /Publication is forbidden/);
assert.match(workflowDoc, /permissions:\s*contents:\s*read/);
assert.match(workflowDoc, /v0\.1\.0-alpha\.0/);
assert.match(workflowDoc, /not created/);

assert.match(checklist, /Publication status: BLOCKED/);
assert.match(checklist, /npm scope ownership/);
assert.match(checklist, /explicit release approval/i);

assert.match(versioning, /Actual tag creation remains blocked/);
assert.match(versioning, /v0\.1\.0-alpha\.0/);
assert.match(versioning, /not created/);

console.log('AgentReady Community release workflow test: PASS');
