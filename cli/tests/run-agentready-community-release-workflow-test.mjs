import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

const workflowPath = '.github/workflows/agentready-community-release-candidate.yml';
const scriptPath = 'scripts/create-agentready-community-release-candidate.mjs';
const packageLibPath = 'scripts/agentready-community-package-lib.mjs';
const packagePath = 'package.json';
const releaseNotesPath = 'docs/agentready/COMMUNITY_RELEASE_NOTES_0_1_0_ALPHA_0.md';
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
assert.match(workflow, /uses:\s*\.\/\s*$/m);
assert.doesNotMatch(workflow, /uses:\s*\.\/\.github\/actions\/agentready/);
assert.match(workflow, /Action Marketplace readiness test/);
assert.match(workflow, /node scripts\/validate-agentready-action-marketplace-readiness\.mjs/);
assert.match(workflow, /actions\/upload-artifact@v4/);
assert.match(workflow, /retention-days:\s*7/);
assert.match(workflow, /agentready-community-release-candidate-0\.1\.0-alpha\.0/);
assert.match(workflow, /packaging\/agentready-community\/\*\*/);
assert.match(workflow, /action\.yml/);
assert.match(workflow, /scripts\/validate-agentready-action-marketplace-readiness\.mjs/);
assert.match(workflow, /scripts\/agentready-community-package-lib\.mjs/);
for (const requiredPath of [
  'scripts/agentready-execution-lib.mjs',
  'scripts/rebuild-agentready-ledger-data.mjs',
  'scripts/validate-agentready-execution-system.mjs',
  'scripts/validate-agentready-strategy-docs.mjs',
  'docs/agentready/AGENTREADY_EXECUTION_LEDGER.json',
  'docs/agentready/AGENTREADY_EXECUTION_LEDGER.md',
  'docs/agentready/AGENTREADY_STATUS.md',
  'docs/agentready/NEXT_ACTION.md',
  'docs/agentready/NEXT_CODEX_PROMPT.md'
]) {
  assert.match(workflow, new RegExp(escapeRegExp(requiredPath)));
}
for (const requiredCommand of [
  'node scripts/rebuild-agentready-ledger-data.mjs',
  'node scripts/generate-agentready-ledger-views.mjs --write',
  'node scripts/generate-agentready-status.mjs --write',
  'node scripts/generate-agentready-next-action.mjs --write',
  'node scripts/generate-agentready-next-prompt.mjs --write',
  'node scripts/validate-agentready-strategy-docs.mjs',
  'node scripts/validate-agentready-execution-system.mjs',
  'git diff --check'
]) {
  assert.match(workflow, new RegExp(escapeRegExp(requiredCommand)));
}
assert.match(workflow, /git diff --exit-code --/);
assert.ok(workflow.includes("const completedBatch = batches.get('ARB-COM-002')"));
assert.ok(workflow.includes("const premiumBatch = batches.get('ARB-SITE-PREMIUM-001')"));
assert.ok(workflow.includes("const productBatch = batches.get('ARB-SITE-GLOBAL-002')"));
assert.ok(workflow.includes("const standardBatch = batches.get('ARB-SITE-GLOBAL-003')"));
assert.ok(workflow.includes("const trustBatch = batches.get('ARB-SITE-GLOBAL-004')"));
assert.ok(workflow.includes("const docsBatch = batches.get('ARB-SITE-GLOBAL-005')"));
assert.ok(workflow.includes("const trustOwnerAcceptance = (trustBatch?.evidence || []).find((entry) => entry.type === 'owner_review_acceptance')"));
assert.ok(workflow.includes("assert.equal(completedBatch?.status, 'DONE')"));
assert.ok(workflow.includes("assert.equal(premiumBatch?.status, 'IN_REVIEW')"));
assert.ok(workflow.includes("assert.equal(premiumBatch?.spec_status, 'EXECUTION_READY')"));
assert.ok(workflow.includes("assert.equal(premiumBatch?.pr_number, 132)"));
assert.ok(workflow.includes("assert.equal(productBatch?.status, 'IN_REVIEW')"));
assert.ok(workflow.includes("assert.equal(productBatch?.spec_status, 'EXECUTION_READY')"));
assert.ok(workflow.includes("assert.equal(productBatch?.pr_number, 134)"));
assert.ok(workflow.includes("assert.equal(standardBatch?.status, 'IN_REVIEW')"));
assert.ok(workflow.includes("assert.equal(standardBatch?.spec_status, 'EXECUTION_READY')"));
assert.ok(workflow.includes("assert.equal(standardBatch?.pr_number, 135)"));
assert.ok(workflow.includes("assert.equal(standardBatch?.base_branch, 'site-agentready-global-product')"));
assert.ok(workflow.includes("assert.equal(standardBatch?.stacked_base_head_sha, '1a71cb469e608d548b42c5884a4165563216733b')"));
assert.ok(workflow.includes("assert.equal(standardBatch?.stacked_execution_can_continue, true)"));
assert.ok(workflow.includes("assert.equal(trustBatch?.status, 'IN_REVIEW')"));
assert.ok(workflow.includes("assert.equal(trustBatch?.spec_status, 'EXECUTION_READY')"));
assert.ok(workflow.includes("assert.equal(trustBatch?.owner, 'CODEX_AND_JEASON')"));
assert.ok(workflow.includes("assert.equal(trustBatch?.base_branch, 'site-agentready-global-standard')"));
assert.ok(workflow.includes("assert.equal(trustBatch?.branch, 'site-agentready-global-trust')"));
assert.ok(workflow.includes("assert.equal(trustBatch?.pr_title, 'site(trust): publish company and legal foundation')"));
assert.ok(workflow.includes("assert.equal(trustBatch?.stacked_on_batch, 'ARB-SITE-GLOBAL-003')"));
assert.ok(workflow.includes("assert.equal(trustBatch?.pr_number, 136)"));
assert.ok(workflow.includes("assert.equal(trustBatch?.stacked_execution_can_continue, true)"));
assert.ok(workflow.includes("assert.equal(trustOwnerAcceptance?.reviewed_head, '11c488ff98ecb4509dd8bbf916840bf8c9edce77')"));
assert.ok(workflow.includes("assert.equal(trustOwnerAcceptance?.current_reconciled_head, '943d9fea90748a0496ce872dc48b14253eb3a16b')"));
assert.ok(workflow.includes("assert.equal(trustBatch?.stacked_child_head_sha, '943d9fea90748a0496ce872dc48b14253eb3a16b')"));
assert.ok(workflow.includes("assert.equal(docsBatch?.status, 'READY')"));
assert.ok(workflow.includes("assert.equal(docsBatch?.spec_status, 'EXECUTION_READY')"));
assert.ok(workflow.includes("assert.equal(docsBatch?.owner, 'CODEX_AND_JEASON')"));
assert.ok(workflow.includes("assert.equal(docsBatch?.base_branch, 'site-agentready-global-trust')"));
assert.ok(workflow.includes("assert.equal(docsBatch?.branch, 'site-agentready-global-docs-adoption')"));
assert.ok(workflow.includes("assert.equal(docsBatch?.pr_title, 'site(docs): publish developer documentation and adoption foundation')"));
assert.ok(workflow.includes("assert.equal(docsBatch?.stacked_on_batch, 'ARB-SITE-GLOBAL-004')"));
assert.ok(workflow.includes("assert.equal(docsBatch?.stacked_base_head_sha, '943d9fea90748a0496ce872dc48b14253eb3a16b')"));
assert.ok(workflow.includes("assert.equal(next?.batch?.id, 'ARB-SITE-GLOBAL-005')"));
assert.ok(workflow.includes("assert.equal(next?.action_type, 'READY')"));
assert.ok(workflow.includes("assert.equal(counts.execution_batches.immediately_executable, 1)"));
assert.match(workflow, /assert\.match\(nextPrompt,\s*\/Repository: BACOUL\\\/timeproofs\/\)/);
assert.match(workflow, /Batch ID: ARB-SITE-GLOBAL-005/);
assert.match(workflow, /Base: site-agentready-global-trust/);
assert.match(workflow, /Exact approved base head: 943d9fea90748a0496ce872dc48b14253eb3a16b/);
assert.match(workflow, /Branch: site-agentready-global-docs-adoption/);
assert.match(workflow, /Draft PR target: site-agentready-global-trust/);
assert.match(workflow, /assert\.equal\(manifest\.community_license,\s*'Apache-2\.0'\)/);
assert.match(workflow, /assert\.equal\(manifest\.tarball\.entry_count,\s*21\)/);
assert.match(workflow, /assert\.equal\(manifest\.package_private,\s*false\)/);
assert.match(workflow, /assert\.equal\(manifest\.package_publish_access,\s*'public'\)/);
assert.match(workflow, /assert\.equal\(manifest\.package_publish_registry,\s*'https:\/\/registry\.npmjs\.org\/'\)/);
assert.match(workflow, /assert\.equal\(manifest\.package_publish_tag,\s*'alpha'\)/);
assert.match(workflow, /assert\.notEqual\(pkg\.private,\s*true\)/);
assert.match(workflow, /assert\.equal\(pkg\.publishConfig\?\.access,\s*'public'\)/);
assert.match(workflow, /assert\.equal\(pkg\.publishConfig\?\.registry,\s*'https:\/\/registry\.npmjs\.org\/'\)/);
assert.match(workflow, /assert\.equal\(pkg\.publishConfig\?\.tag,\s*'alpha'\)/);

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
assert.match(packageLib, /release candidate workflow is read-only and cannot publish/);
assert.match(packageLib, /release candidate workflow cannot create Git tags/);
assert.match(packageLib, /release candidate workflow cannot create GitHub Releases/);
assert.match(packageLib, /no new npm operation is authorized from this workflow/);
assert.match(packageLib, /package_private:\s*false/);
assert.match(packageLib, /package_publish_access:\s*COMMUNITY_PUBLISH_CONFIG\.access/);
assert.match(packageLib, /package_publish_tag:\s*COMMUNITY_PUBLISH_CONFIG\.tag/);
assert.match(packageLib, /publishConfig:\s*COMMUNITY_PUBLISH_CONFIG/);
assert.match(packageLib, /community_license:\s*COMMUNITY_LICENSE/);
assert.match(packageLib, /path:\s*'action\.yml'/);
assert.match(packageLib, /createHash\('sha256'\)/);
assert.match(packageLib, /\['rev-parse', 'HEAD'\]/);
assert.match(packageLib, /Release candidate output directory must not be the repository root\./);
assert.match(packageLib, /Release candidate output directory must be empty\./);
assert.match(packageLib, /'pack'/);
assert.match(packageLib, /'--pack-destination'/);
assert.match(packageLib, /COMMUNITY_LICENSE = 'Apache-2\.0'/);
assert.match(packageLib, /tag:\s*'alpha'/);
assert.match(packageLib, /packaging\/agentready-community\/LICENSE/);
assert.match(packageLib, /packaging\/agentready-community\/NOTICE/);
assert.match(packageLib, /packaging\/agentready-community\/README\.md/);
assert.match(packageLib, /validateCommunityTarball/);
assert.match(packageLib, /ProofSpec/);
assert.doesNotMatch(packageLib, /\bnpm\s+publish\b/);
assert.doesNotMatch(packageLib, /\bgh\s+release\s+create\b/);
assert.doesNotMatch(packageLib, /\bgit\s+tag\b/);
assert.doesNotMatch(packageLib, authTokenPattern);

assert.match(releaseNotes, /published AgentReady Community alpha release/);
assert.match(releaseNotes, /NPM PACKAGE STATUS:\s*PUBLISHED/);
assert.match(releaseNotes, /NPM DIST-TAG alpha:\s*0\.1\.0-alpha\.0/);
assert.match(releaseNotes, /NPM DIST-TAG latest:\s*0\.1\.0-alpha\.0/);
assert.match(releaseNotes, /LATEST ACCEPTANCE DECISION:\s*ACCEPT_TEMPORARILY/);
assert.match(releaseNotes, /GIT TAG STATUS:\s*CREATED/);
assert.match(releaseNotes, /GIT TAG TARGET:\s*150da23932c1fb9433cb3d546904f03c18c909e9/);
assert.match(releaseNotes, /GITHUB RELEASE:\s*CREATED/);
assert.match(releaseNotes, /GITHUB RELEASE PRERELEASE:\s*true/);
assert.match(releaseNotes, /GITHUB RELEASE DRAFT:\s*false/);
assert.match(releaseNotes, /GITHUB RELEASE LATEST:\s*false/);
assert.match(releaseNotes, /MARKETPLACE LISTING:\s*NOT CREATED/);
assert.match(releaseNotes, /NEW NPM OPERATION AUTHORIZED:\s*NO/);
assert.doesNotMatch(releaseNotes, /Draft release notes - not published|npm package: not published|GitHub Release: not created|GitHub tag: not created|publication approval not granted|no public tag exists|no GitHub Release exists|Planned public commands after publication|public npm availability/);
assert.doesNotMatch(releaseNotes, /published in Marketplace|npm package available|Pro plan is available|Team plan is available|Agency plan is available/);

assert.match(workflowDoc, /Read-Only Candidate Workflow/);
assert.match(workflowDoc, /NPM DIST-TAG:\s*alpha/);
assert.match(workflowDoc, /latest` dist-tag temporarily until the first stable release/);
assert.match(workflowDoc, /Publication actions are unavailable in this workflow/);
assert.match(workflowDoc, /permissions:\s*contents:\s*read/);
assert.match(workflowDoc, /v0\.1\.0-alpha\.0/);
assert.match(workflowDoc, /GitHub Release created and marked prerelease/);
assert.doesNotMatch(workflowDoc, /Candidate Only|Publication is forbidden|Actual tag creation remains blocked/);

assert.match(checklist, /Publication status: PUBLISHED_WITH_DOCUMENTED_EXCEPTION/);
assert.match(checklist, /Git tag created:\s*YES/);
assert.match(checklist, /GitHub Release created:\s*YES/);
assert.match(checklist, /GitHub Release prerelease:\s*YES/);
assert.match(checklist, /GitHub Release latest:\s*NO/);
assert.match(checklist, /npm scope ownership/);
assert.match(checklist, /explicit release approval/i);

assert.match(versioning, /Existing Immutable Repository Release/);
assert.match(versioning, /v0\.1\.0-alpha\.0/);
assert.match(versioning, /GitHub prerelease `v0\.1\.0-alpha\.0` exists and is not marked latest/);
assert.match(versioning, /no Marketplace listing exists at the start of `ARB-COM-002`/);
assert.match(versioning, /agentready-action-v0\.1\.0-alpha\.0/);
assert.match(versioning, /root `\/action\.yml` is not yet published/);
assert.doesNotMatch(versioning, /Actual tag creation remains blocked|Planned versioned reference - tag not created yet/);

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

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
