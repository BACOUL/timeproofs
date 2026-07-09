import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';

const repoRoot = process.cwd();
const cliPath = path.join(repoRoot, 'bin', 'agentready.js');
const tmpRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'agentready-cli-'));

try {
  await testHelp();
  await testOpenApiScanWritesOutputs();
  await testMcpScanWritesOutputs();
  await testPolicyFailureExitCode();
  console.log('AgentReady CLI tests: PASS');
} finally {
  await fs.rm(tmpRoot, { recursive: true, force: true });
}

async function testHelp() {
  const result = await runCli(['--help']);
  assert.equal(result.code, 0);
  assert.match(result.stdout, /agentready scan openapi/);
}

async function testOpenApiScanWritesOutputs() {
  const outDir = path.join(tmpRoot, 'openapi');
  const result = await runCli([
    'scan',
    'openapi',
    './agentready-examples/valid-simple-openapi.json',
    '--out',
    outDir,
    '--min-score',
    '1',
    '--fail-on',
    'none'
  ]);

  assert.equal(result.code, 0, result.stderr || result.stdout);
  assert.match(result.stdout, /Policy: PASS/);
  await assertFileExists(path.join(outDir, 'agentready.json'));
  await assertFileExists(path.join(outDir, 'agentready-report.md'));
}

async function testMcpScanWritesOutputs() {
  const outDir = path.join(tmpRoot, 'mcp');
  const result = await runCli([
    'scan',
    'mcp',
    './agentready-examples/mcp-tools-simple.json',
    '--out',
    outDir,
    '--min-score',
    '1',
    '--fail-on',
    'none'
  ]);

  assert.equal(result.code, 0, result.stderr || result.stdout);
  assert.match(result.stdout, /Policy: PASS/);
  await assertFileExists(path.join(outDir, 'agentready-mcp.json'));
  await assertFileExists(path.join(outDir, 'agentready-mcp-report.md'));
}

async function testPolicyFailureExitCode() {
  const result = await runCli([
    'scan',
    'openapi',
    './agentready-examples/dangerous-actions-openapi.json',
    '--min-score',
    '100'
  ]);

  assert.equal(result.code, 1, result.stderr || result.stdout);
  assert.match(result.stdout, /Policy: FAIL/);
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
