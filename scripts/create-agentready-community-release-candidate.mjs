import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';

const repoRoot = process.cwd();
const EXPECTED_PACKAGE_NAME = '@timeproofs/agentready';
const EXPECTED_VERSION = '0.1.0-alpha.0';
const EXPECTED_LICENSE = 'SEE LICENSE IN LICENSE';
const MANIFEST_NAME = 'agentready-community-release-candidate-manifest.json';
const RELEASE_NOTES_SOURCE = path.join(
  repoRoot,
  'docs',
  'agentready',
  'COMMUNITY_RELEASE_NOTES_0_1_0_ALPHA_0_DRAFT.md'
);

const EXPECTED_PACKAGE_FILES = [
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

const PUBLICATION_BLOCKERS = [
  'npm scope ownership not confirmed',
  'legacy LICENSE references unresolved',
  'AgentReady legal license decision not approved',
  'package remains private',
  'no public tag exists',
  'no GitHub Release exists',
  'npm publication security policy not finalized',
  'explicit release approval not granted'
];

const args = parseArgs(process.argv.slice(2));
if (!args.out) {
  throw new Error('Usage: node scripts/create-agentready-community-release-candidate.mjs --out <dir>');
}

const outputDir = path.resolve(repoRoot, args.out);
await assertSafeOutputDir(outputDir);
await fs.mkdir(outputDir, { recursive: true });

const packageJson = JSON.parse(await fs.readFile(path.join(repoRoot, 'package.json'), 'utf8'));
assert.equal(packageJson.name, EXPECTED_PACKAGE_NAME);
assert.equal(packageJson.version, EXPECTED_VERSION);
assert.equal(packageJson.private, true);
assert.equal(packageJson.license, EXPECTED_LICENSE);
assert.equal(packageJson.engines?.node, '>=20');
assert.equal(packageJson.bin?.agentready, './bin/agentready.js');
assert.deepEqual(Object.keys(packageJson.dependencies || {}), [], 'runtime dependencies must remain empty');

const plannedTag = `v${packageJson.version}`;
const commitSha = await resolveCommitSha();
const pack = await npm([
  'pack',
  repoRoot,
  '--json',
  '--pack-destination',
  outputDir
]);

if (pack.code !== 0) {
  throw new Error(`npm pack failed:\n${pack.stderr || pack.stdout}`);
}

const [packInfo] = JSON.parse(pack.stdout);
assert.equal(packInfo.name, EXPECTED_PACKAGE_NAME);
assert.equal(packInfo.version, EXPECTED_VERSION);
assert.equal(packInfo.entryCount, EXPECTED_PACKAGE_FILES.length);

const packageFiles = packInfo.files.map((file) => file.path).sort();
assert.deepEqual(packageFiles, [...EXPECTED_PACKAGE_FILES].sort());
assertNoForbiddenPackageFiles(packageFiles);

const tarballPath = path.join(outputDir, packInfo.filename);
const tarball = await fs.readFile(tarballPath);
const sha256 = createHash('sha256').update(tarball).digest('hex');
const checksumFilename = `${packInfo.filename}.sha256`;
const manifestPath = path.join(outputDir, MANIFEST_NAME);
const releaseNotesFilename = path.basename(RELEASE_NOTES_SOURCE);

await fs.writeFile(path.join(outputDir, checksumFilename), `${sha256}  ${packInfo.filename}\n`, 'utf8');
await fs.copyFile(RELEASE_NOTES_SOURCE, path.join(outputDir, releaseNotesFilename));

const manifest = {
  schema_version: '0.1',
  status: 'candidate_only',
  publication_ready: false,
  package_name: packageJson.name,
  version: packageJson.version,
  planned_tag: plannedTag,
  commit_sha: commitSha,
  node_version: process.version,
  package_private: packageJson.private,
  tarball: {
    filename: packInfo.filename,
    sha256,
    size_bytes: Number(packInfo.size),
    unpacked_size_bytes: Number(packInfo.unpackedSize),
    entry_count: Number(packInfo.entryCount),
    files: packageFiles
  },
  github_action: {
    path: '.github/actions/agentready/action.yml',
    versioned_tag_created: false
  },
  publication: {
    npm: false,
    github_release: false,
    github_tag: false,
    marketplace: false
  },
  release_notes: {
    filename: releaseNotesFilename,
    draft: true,
    published: false
  },
  blockers: PUBLICATION_BLOCKERS
};

assertNoSensitiveManifestData(manifest);
await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

console.log(`AgentReady Community release candidate created in ${path.relative(repoRoot, outputDir) || '.'}`);
console.log(`tarball=${packInfo.filename}`);
console.log(`sha256=${sha256}`);
console.log(`manifest=${MANIFEST_NAME}`);

function parseArgs(argv) {
  const parsed = {};
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--out') {
      parsed.out = argv[index + 1];
      index += 1;
      continue;
    }
    throw new Error(`Unknown argument: ${arg}`);
  }
  return parsed;
}

function assertNoForbiddenPackageFiles(files) {
  const forbiddenPatterns = [
    /^\.env(?:\.|$)/,
    /secret/i,
    /token/i,
    /^assets\//,
    /\.html$/i,
    /^docs\//,
    /^\.github\//,
    /^cli\/tests\//,
    /^agentready-examples\//,
    /stripe/i,
    /backend/i,
    /dashboard/i,
    /selfhost/i,
    /^sdk\//
  ];

  for (const file of files) {
    if (forbiddenPatterns.some((pattern) => pattern.test(file))) {
      throw new Error(`Forbidden file in release candidate tarball: ${file}`);
    }
  }
}

function assertNoSensitiveManifestData(manifest) {
  const json = JSON.stringify(manifest);
  const forbidden = [
    repoRoot.replaceAll('\\', '\\\\'),
    ['NPM', 'TOKEN'].join('_'),
    ['NODE', 'AUTH', 'TOKEN'].join('_'),
    ['GITHUB', 'TOKEN'].join('_')
  ];

  for (const value of forbidden) {
    if (json.toLowerCase().includes(value.toLowerCase())) {
      throw new Error(`Manifest contains forbidden sensitive value: ${value}`);
    }
  }
}

async function resolveCommitSha() {
  const result = await run('git', ['rev-parse', 'HEAD'], { cwd: repoRoot });
  if (result.code !== 0) {
    throw new Error(`Unable to resolve commit SHA:\n${result.stderr || result.stdout}`);
  }
  return result.stdout.trim();
}

async function assertSafeOutputDir(outputDirToCheck) {
  if (samePath(outputDirToCheck, repoRoot)) {
    throw new Error('Release candidate output directory must not be the repository root.');
  }

  let stat;
  try {
    stat = await fs.stat(outputDirToCheck);
  } catch (error) {
    if (error?.code === 'ENOENT') return;
    throw error;
  }

  if (!stat.isDirectory()) {
    throw new Error('Release candidate output directory must be empty.');
  }

  const entries = await fs.readdir(outputDirToCheck);
  if (entries.length > 0) {
    throw new Error('Release candidate output directory must be empty.');
  }
}

function samePath(left, right) {
  const normalizedLeft = path.resolve(left);
  const normalizedRight = path.resolve(right);
  if (process.platform === 'win32') {
    return normalizedLeft.toLowerCase() === normalizedRight.toLowerCase();
  }
  return normalizedLeft === normalizedRight;
}

function npm(argsToRun) {
  const npmCli = process.env.AGENTREADY_NPM_CLI || process.env.npm_execpath || 'npm';
  return runTool(npmCli, argsToRun, { cwd: repoRoot });
}

function run(command, argsToRun, options) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, argsToRun, {
      cwd: options.cwd,
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

function runTool(command, argsToRun, options) {
  const isJsCli = command.endsWith('.js');
  const spawnCommand = isJsCli ? process.execPath : command;
  const spawnArgs = isJsCli ? [command, ...argsToRun] : argsToRun;
  return run(spawnCommand, spawnArgs, options);
}
