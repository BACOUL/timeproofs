import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

const workflowPath = '.github/workflows/agentready-community-release-candidate.yml';
const scriptPath = 'scripts/create-agentready-community-release-candidate.mjs';
const packageLibPath = 'scripts/agentready-community-package-lib.mjs';
const packagePath = 'package.json';
const releaseNotesPath = 'docs/agentready/COMMUNITY_RELEASE_NOTES_0_1_0_ALPHA_0_DRAFT.md';
const workflowDocPath = 'docs/agentready/COMMUNITY_RELEASE_WORKFLOW.md';
const checklistPath = 'docs/agentready/COMMUNITY_RELEASE_CHECKLIST.md';
const versioningPath = 'docs/agentready/GITHUB_ACTION_VERSIONING.md';

const workflow = await fs.readFile(workflowPath, 'utf8');
const script = await fs.readFile(scriptPath, 'utf8');
const packageLib = await fs.readFile(packageLibPath, 'utf8');
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
assert.match(workflow, /name:\s*Checkout reviewed source commit/);
assert.match(workflow, /ref:\s*\$\{\{\s*github\.event\.pull_request\.head\.sha\s*\|\|\s*github\.sha\s*\}\}/);
assert.match(workflow, /EXPECTED_COMMIT_SHA="\$\(git rev-parse HEAD\)"\s+node --input-type=module/);
assert.match(workflow, /assert\.equal\(manifest\.commit_sha,\s*process\.env\.EXPECTED_COMMIT_SHA\)/);
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
assert.match(workflow, /packaging\/agentready-community\/\*\*/);
assert.match(workflow, /scripts\/agentready-community-package-lib\.mjs/);
assert.match(workflow, /assert\.equal\(manifest\.community_license,\s*'Apache-2\.0'\)/);
assert.match(workflow, /assert\.equal\(manifest\.tarball\.entry_count,\s*21\)/);
assert.match(workflow, /assert\.equal\(manifest\.package_private,\s*false\)/);
assert.match(workflow, /assert\.equal\(manifest\.package_publish_access,\s*'public'\)/);
assert.match(workflow, /assert\.equal\(manifest\.package_publish_registry,\s*'https:\/\/registry\.npmjs\.org\/'\)/);
assert.match(workflow, /assert\.notEqual\(pkg\.private,\s*true\)/);
assert.match(workflow, /assert\.equal\(pkg\.publishConfig\?\.access,\s*'public'\)/);
assert.match(workflow, /assert\.equal\(pkg\.publishConfig\?\.registry,\s*'https:\/\/registry\.npmjs\.org\/'\)/);

assert.equal(pkg.private, true);
assert.equal(pkg.name, '@timeproofs/agentready');
assert.equal(pkg.version, '0.1.0-alpha.0');
assert.equal(pkg.scripts['release:community:candidate'], 'node scripts/create-agentready-community-release-candidate.mjs');

assert.match(script, /createCommunityReleaseCandidate/);
assert.doesNotMatch(script, /process\.env\.GITHUB_SHA/);
assert.doesNotMatch(script, /\bnpm\s+publish\b/);
assert.doesNotMatch(script, /\bgh\s+release\s+create\b/);
assert.doesNotMatch(script, /\bgit\s+tag\b/);
assert.doesNotMatch(script, authTokenPattern);

assert.match(packageLib, /status:\s*'candidate_only'/);
assert.match(packageLib, /publication_ready:\s*false/);
assert.match(packageLib, /package_private:\s*false/);
assert.match(packageLib, /package_publish_access:\s*COMMUNITY_PUBLISH_CONFIG\.access/);
assert.match(packageLib, /publishConfig:\s*COMMUNITY_PUBLISH_CONFIG/);
assert.match(packageLib, /community_license:\s*COMMUNITY_LICENSE/);
assert.match(packageLib, /createHash\('sha256'\)/);
assert.match(packageLib, /\['rev-parse', 'HEAD'\]/);
assert.match(packageLib, /Release candidate output directory must not be the repository root\./);
assert.match(packageLib, /Release candidate output directory must be empty\./);
assert.match(packageLib, /'pack'/);
assert.match(packageLib, /'--pack-destination'/);
assert.match(packageLib, /COMMUNITY_LICENSE = 'Apache-2\.0'/);
assert.match(packageLib, /packaging\/agentready-community\/LICENSE/);
assert.match(packageLib, /packaging\/agentready-community\/NOTICE/);
assert.match(packageLib, /packaging\/agentready-community\/README\.md/);
assert.match(packageLib, /validateCommunityTarball/);
assert.match(packageLib, /ProofSpec/);
assert.doesNotMatch(packageLib, /\bnpm\s+publish\b/);
assert.doesNotMatch(packageLib, /\bgh\s+release\s+create\b/);
assert.doesNotMatch(packageLib, /\bgit\s+tag\b/);
assert.doesNotMatch(packageLib, authTokenPattern);

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

await assertUnsafeOutputDirectoryGuards();

console.log('AgentReady Community release workflow test: PASS');

async function assertUnsafeOutputDirectoryGuards() {
  const rootResult = await runScript(['--out', '.']);
  assert.notEqual(rootResult.code, 0);
  assert.match(rootResult.stderr, /Release candidate output directory must not be the repository root\./);
  assert.doesNotMatch(rootResult.stderr, /npm pack failed/);

  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'agentready-release-output-guard-'));
  const sentinelPath = path.join(tempDir, 'sentinel.txt');
  await fs.writeFile(sentinelPath, 'keep me\n', 'utf8');

  try {
    const nonEmptyResult = await runScript(['--out', tempDir]);
    assert.notEqual(nonEmptyResult.code, 0);
    assert.match(nonEmptyResult.stderr, /Release candidate output directory must be empty\./);
    assert.equal(await fs.readFile(sentinelPath, 'utf8'), 'keep me\n');
    assert.doesNotMatch(nonEmptyResult.stderr, /npm pack failed/);
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true });
  }
}

function runScript(args) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [scriptPath, ...args], {
      cwd: process.cwd(),
      stdio: ['ignore', 'pipe', 'pipe']
    });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (chunk) => {
      stdout += chunk;
    });
    child.stderr.on('data', (chunk) => {
      stderr += chunk;
    });
    child.on('error', reject);
    child.on('close', (code) => {
      resolve({ code, stdout, stderr });
    });
  });
}
