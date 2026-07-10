import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

const repoRoot = process.cwd();
const packageJson = JSON.parse(await fs.readFile(path.join(repoRoot, 'package.json'), 'utf8'));
const tmpRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'agentready-package-'));
const npmCli = process.env.AGENTREADY_NPM_CLI || process.env.npm_execpath || 'npm';
const npxCli = process.env.AGENTREADY_NPX_CLI || inferNpxCli(npmCli) || 'npx';

const expectedPackageFiles = [
  'LICENSE',
  'README.md',
  'agentready-core/classify-action.js',
  'agentready-core/detect-risks.js',
  'agentready-core/extract-mcp-tools.js',
  'agentready-core/extract-operations.js',
  'agentready-core/generate-agentready-json.js',
  'agentready-core/index.js',
  'agentready-core/parse-mcp-tools.js',
  'agentready-core/parse-openapi.js',
  'agentready-core/parse-yaml.js',
  'agentready-core/report.js',
  'agentready-core/scan-mcp-tools.js',
  'agentready-core/score.js',
  'agentready-core/simulation/parse-simulation-scenario.js',
  'agentready-core/simulation/run-static-simulation.js',
  'agentready-core/simulation/simulation-result.js',
  'agentready-core/types.js',
  'bin/agentready.js',
  'package.json'
];

try {
  const pack = await npm(['pack', repoRoot, '--json'], { cwd: tmpRoot });
  assert.equal(pack.code, 0, pack.stderr || pack.stdout);

  const [packInfo] = JSON.parse(pack.stdout);
  assert.ok(packInfo.filename, 'npm pack should return a tarball filename');
  assert.equal(packInfo.name, packageJson.name);
  assert.equal(packInfo.version, packageJson.version);

  const tarballPath = path.join(tmpRoot, packInfo.filename);
  await assertFileExists(tarballPath);
  assertPackageFileList(packInfo.files.map((file) => file.path));

  const cleanProject = path.join(tmpRoot, 'clean-project');
  await fs.mkdir(cleanProject);
  await npm(['init', '-y'], { cwd: cleanProject });
  const install = await npm(['install', tarballPath, '--ignore-scripts'], { cwd: cleanProject });
  assert.equal(install.code, 0, install.stderr || install.stdout);

  await copyFixture('valid-simple-openapi.json', cleanProject);
  await copyFixture('mcp-tools-simple.json', cleanProject);
  await copyFixture('dangerous-actions-openapi.json', cleanProject);

  await testInstalledVersion(cleanProject);
  await testInstalledHelp(cleanProject);
  await testInstalledOpenApiPass(cleanProject);
  await testInstalledMcpPass(cleanProject);
  await testInstalledPolicyFail(cleanProject);
  await testInstalledUsageError(cleanProject);

  console.log('AgentReady package smoke test: PASS');
} finally {
  await fs.rm(tmpRoot, { recursive: true, force: true });
}

async function testInstalledVersion(cwd) {
  const result = await npx(['--no-install', 'agentready', '--version'], { cwd });
  assert.equal(result.code, 0, result.stderr || result.stdout);
  assert.equal(result.stdout.trim(), packageJson.version);
}

async function testInstalledHelp(cwd) {
  const result = await npx(['--no-install', 'agentready', '--help'], { cwd });
  assert.equal(result.code, 0, result.stderr || result.stdout);
  assert.match(result.stdout, /agentready scan openapi/);
  assert.match(result.stdout, /agentready scan mcp/);
}

async function testInstalledOpenApiPass(cwd) {
  const outDir = path.join(cwd, 'out-openapi');
  const result = await npx([
    '--no-install',
    'agentready',
    'scan',
    'openapi',
    './fixtures/valid-simple-openapi.json',
    '--out',
    outDir,
    '--min-score',
    '75',
    '--fail-on',
    'critical'
  ], { cwd });

  assert.equal(result.code, 0, result.stderr || result.stdout);
  assert.match(result.stdout, /Policy: PASS/);
  await assertFileExists(path.join(outDir, 'agentready.json'));
  await assertFileExists(path.join(outDir, 'agentready-report.md'));
}

async function testInstalledMcpPass(cwd) {
  const outDir = path.join(cwd, 'out-mcp');
  const result = await npx([
    '--no-install',
    'agentready',
    'scan',
    'mcp',
    './fixtures/mcp-tools-simple.json',
    '--out',
    outDir,
    '--min-score',
    '75',
    '--fail-on',
    'critical'
  ], { cwd });

  assert.equal(result.code, 0, result.stderr || result.stdout);
  assert.match(result.stdout, /Policy: PASS/);
  await assertFileExists(path.join(outDir, 'agentready-mcp.json'));
  await assertFileExists(path.join(outDir, 'agentready-mcp-report.md'));
}

async function testInstalledPolicyFail(cwd) {
  const outDir = path.join(cwd, 'out-fail');
  const result = await npx([
    '--no-install',
    'agentready',
    'scan',
    'openapi',
    './fixtures/dangerous-actions-openapi.json',
    '--out',
    outDir,
    '--min-score',
    '80',
    '--fail-on',
    'critical'
  ], { cwd });

  assert.equal(result.code, 1, result.stderr || result.stdout);
  assert.match(result.stdout, /Policy: FAIL/);
  await assertFileExists(path.join(outDir, 'agentready.json'));
  await assertFileExists(path.join(outDir, 'agentready-report.md'));
}

async function testInstalledUsageError(cwd) {
  const result = await npx(['--no-install', 'agentready', 'scan', 'openapi'], { cwd });
  assert.equal(result.code, 2, result.stderr || result.stdout);
  assert.match(result.stderr, /Missing openapi file path/);
}

async function copyFixture(name, destinationRoot) {
  const fixturesDir = path.join(destinationRoot, 'fixtures');
  await fs.mkdir(fixturesDir, { recursive: true });
  await fs.copyFile(
    path.join(repoRoot, 'agentready-examples', name),
    path.join(fixturesDir, name)
  );
}

function assertPackageFileList(actualFiles) {
  const actual = [...actualFiles].sort();
  const expected = [...expectedPackageFiles].sort();
  assert.deepEqual(actual, expected, `Unexpected tarball contents:\n${actual.join('\n')}`);
}

async function assertFileExists(filePath) {
  const stat = await fs.stat(filePath);
  assert.equal(stat.isFile(), true, `${filePath} should exist`);
}

function npm(args, options) {
  return runTool(npmCli, args, options);
}

function npx(args, options) {
  return runTool(npxCli, args, options);
}

function runTool(command, args, options) {
  const isJsCli = command.endsWith('.js');
  const spawnCommand = isJsCli ? process.execPath : command;
  const spawnArgs = isJsCli ? [command, ...args] : args;

  return new Promise((resolve, reject) => {
    const child = spawn(spawnCommand, spawnArgs, {
      cwd: options.cwd,
      stdio: ['ignore', 'pipe', 'pipe'],
      env: {
        ...process.env,
        PATH: `${path.dirname(process.execPath)}${path.delimiter}${process.env.PATH || ''}`,
        npm_config_audit: 'false',
        npm_config_fund: 'false'
      }
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

function inferNpxCli(command) {
  if (!command.endsWith('npm-cli.js')) return null;
  return path.join(path.dirname(command), 'npx-cli.js');
}
