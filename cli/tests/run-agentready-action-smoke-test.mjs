import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

const repoRoot = process.cwd();
const actionPath = path.join(repoRoot, '.github', 'actions', 'agentready', 'action.yml');
const cliPath = path.join(repoRoot, 'bin', 'agentready.js');
const tmpRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'agentready-action-'));

try {
  await testActionMetadata();
  await testActionEquivalentOpenApiScan();
  await testActionEquivalentMcpScan();
  console.log('AgentReady GitHub Action smoke test: PASS');
} finally {
  await fs.rm(tmpRoot, { recursive: true, force: true });
}

async function testActionMetadata() {
  const action = await fs.readFile(actionPath, 'utf8');

  assert.match(action, /name: TimeProofs AgentReady CI Gate/);
  assert.match(action, /file:/);
  assert.match(action, /type:/);
  assert.match(action, /min-score:/);
  assert.match(action, /fail-on:/);
  assert.match(action, /out:/);
  assert.match(action, /score:/);
  assert.match(action, /status:/);
  assert.match(action, /report-path:/);
  assert.match(action, /contract-path:/);
  assert.match(action, /bin\/agentready\.js/);
  assert.match(action, /--min-score/);
  assert.match(action, /--fail-on/);
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
