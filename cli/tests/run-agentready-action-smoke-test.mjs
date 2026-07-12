import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

const repoRoot = process.cwd();
const actionPath = path.join(repoRoot, 'action.yml');
const nestedActionPath = path.join(repoRoot, '.github', 'actions', 'agentready', 'action.yml');
const workflowPath = path.join(repoRoot, '.github', 'workflows', 'agentready-action-integration.yml');
const versioningDocPath = path.join(repoRoot, 'docs', 'agentready', 'GITHUB_ACTION_VERSIONING.md');
const cliPath = path.join(repoRoot, 'bin', 'agentready.js');
const tmpRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'agentready-action-'));

try {
  await testActionMetadata();
  await testActionIntegrationWorkflowMetadata();
  await testVersioningDocumentation();
  await testActionEquivalentOpenApiScan();
  await testActionEquivalentMcpScan();
  console.log('AgentReady GitHub Action smoke test: PASS');
} finally {
  await fs.rm(tmpRoot, { recursive: true, force: true });
}

async function testActionMetadata() {
  const action = await fs.readFile(actionPath, 'utf8');
  const runBlock = extractRunBlock(action);

  await assertFileMissing(nestedActionPath);
  assert.match(action, /name: AgentReady CI Gate by TimeProofs/);
  assert.match(action, /author: TimeProofs/);
  assert.match(action, /description: Static CI gate for agent-facing OpenAPI and MCP contracts\./);
  assert.match(action, /branding:\s*\n\s*icon: shield\s*\n\s*color: blue/);
  assert.match(action, /file:/);
  assert.match(action, /type:/);
  assert.match(action, /min-score:/);
  assert.match(action, /fail-on:/);
  assert.match(action, /out:/);
  assert.match(action, /score:/);
  assert.match(action, /status:/);
  assert.match(action, /report-path:/);
  assert.match(action, /contract-path:/);
  assert.match(action, /AGENTREADY_INPUT_TYPE:\s*\$\{\{ inputs\.type \}\}/);
  assert.match(action, /AGENTREADY_INPUT_FILE:\s*\$\{\{ inputs\.file \}\}/);
  assert.match(action, /AGENTREADY_INPUT_MIN_SCORE:\s*\$\{\{ inputs\.min-score \}\}/);
  assert.match(action, /AGENTREADY_INPUT_FAIL_ON:\s*\$\{\{ inputs\.fail-on \}\}/);
  assert.match(action, /AGENTREADY_INPUT_OUT:\s*\$\{\{ inputs\.out \}\}/);
  assert.doesNotMatch(runBlock, /\$\{\{ inputs\./);
  assert.doesNotMatch(runBlock, /\beval\b/);
  assert.match(runBlock, /scan_type="\$AGENTREADY_INPUT_TYPE"/);
  assert.match(runBlock, /scan_file="\$AGENTREADY_INPUT_FILE"/);
  assert.match(runBlock, /min_score="\$AGENTREADY_INPUT_MIN_SCORE"/);
  assert.match(runBlock, /fail_on="\$AGENTREADY_INPUT_FAIL_ON"/);
  assert.match(runBlock, /out_dir="\$AGENTREADY_INPUT_OUT"/);
  assert.match(runBlock, /action_repo_root="\$\(cd "\$GITHUB_ACTION_PATH" && pwd\)"/);
  assert.doesNotMatch(runBlock, /GITHUB_ACTION_PATH\/\.\.\/\.\.\/\.\./);
  assert.match(runBlock, /cd "\$GITHUB_WORKSPACE"/);
  assert.match(action, /bin\/agentready\.js/);
  assert.match(action, /--min-score/);
  assert.match(action, /--fail-on/);
  assert.match(runBlock, /exit_code=\$\?/);
  assert.match(runBlock, /exit "\$exit_code"/);
  assert.match(runBlock, /agentready-report\.md/);
  assert.match(runBlock, /agentready\.json/);
  assert.match(runBlock, /agentready-mcp-report\.md/);
  assert.match(runBlock, /agentready-mcp\.json/);
  assert.doesNotMatch(action, /npm install @timeproofs\/agentready/);
}

async function testActionIntegrationWorkflowMetadata() {
  const workflow = await fs.readFile(workflowPath, 'utf8');

  assert.match(workflow, /runs-on: ubuntu-latest/);
  assert.match(workflow, /node-version: "20"/);
  assert.match(workflow, /uses: \.\//);
  assert.doesNotMatch(workflow, /uses: \.\/\.github\/actions\/agentready/);
  assert.match(workflow, /id: openapi_pass/);
  assert.match(workflow, /id: mcp_pass/);
  assert.match(workflow, /id: openapi_policy_fail/);
  assert.match(workflow, /id: usage_error/);
  assert.match(workflow, /continue-on-error: true/);
  assert.match(workflow, /steps\.openapi_policy_fail\.outcome/);
  assert.match(workflow, /steps\.usage_error\.outcome/);
  assert.match(workflow, /agentready fixture space/);
  assert.doesNotMatch(workflow, /BACOUL\/timeproofs\/\.github\/actions\/agentready@timeproofs/);
  assert.doesNotMatch(workflow, /upload-artifact/);
}

async function testVersioningDocumentation() {
  const doc = await fs.readFile(versioningDocPath, 'utf8');

  assert.match(doc, /Existing Immutable Repository Release/);
  assert.match(doc, /Root Marketplace Action Requirement/);
  assert.match(doc, /First Marketplace Action Release/);
  assert.match(doc, /Public References After Publication/);
  assert.match(doc, /v0\.1\.0-alpha\.0/);
  assert.match(doc, /150da23932c1fb9433cb3d546904f03c18c909e9/);
  assert.match(doc, /agentready-action-v0\.1\.0-alpha\.0/);
  assert.match(doc, /must remain immutable/);
  assert.match(doc, /no moving major Action tag is created during the alpha batch/);
  assert.match(doc, /GitHub prerelease `v0\.1\.0-alpha\.0` exists and is not marked latest/);
  assert.match(doc, /root `\/action\.yml` is not yet published on the default branch at the start of `ARB-COM-002`/);
  assert.match(doc, /no Marketplace listing exists at the start of `ARB-COM-002`/);
  assert.match(doc, /ubuntu-latest/);
  assert.match(doc, /Node\.js 20/);
}

async function testActionEquivalentOpenApiScan() {
  const outDir = path.join(tmpRoot, 'openapi');
  const result = await runCli([
    'scan',
    'openapi',
    './agentready-examples/valid-simple-openapi.json',
    '--out',
    outDir,
    '--min-score',
    '75',
    '--fail-on',
    'critical',
    '--json'
  ]);

  assert.equal(result.code, 0, result.stderr || result.stdout);
  const summary = JSON.parse(result.stdout);
  assert.ok(summary.score >= 75);
  assert.equal(summary.policy.passed, true);
  await assertFileExists(path.join(outDir, 'agentready.json'));
  await assertFileExists(path.join(outDir, 'agentready-report.md'));
}

async function testActionEquivalentMcpScan() {
  const outDir = path.join(tmpRoot, 'mcp');
  const result = await runCli([
    'scan',
    'mcp',
    './agentready-examples/mcp-tools-simple.json',
    '--out',
    outDir,
    '--min-score',
    '75',
    '--fail-on',
    'critical',
    '--json'
  ]);

  assert.equal(result.code, 0, result.stderr || result.stdout);
  const summary = JSON.parse(result.stdout);
  assert.ok(summary.score >= 75);
  assert.equal(summary.policy.passed, true);
  await assertFileExists(path.join(outDir, 'agentready-mcp.json'));
  await assertFileExists(path.join(outDir, 'agentready-mcp-report.md'));
}

async function assertFileExists(filePath) {
  const stat = await fs.stat(filePath);
  assert.equal(stat.isFile(), true, `${filePath} should exist`);
}

async function assertFileMissing(filePath) {
  try {
    await fs.stat(filePath);
  } catch (error) {
    if (error?.code === 'ENOENT') return;
    throw error;
  }
  assert.fail(`${filePath} should not exist`);
}

function extractRunBlock(action) {
  const marker = '      run: |';
  const start = action.indexOf(marker);
  assert.notEqual(start, -1, 'action should include a composite run block');
  return action.slice(start + marker.length);
}

function runCli(args) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [cliPath, ...args], {
      cwd: repoRoot,
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
