import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { gunzip } from 'node:zlib';
import { promisify } from 'node:util';

const gunzipAsync = promisify(gunzip);

export const EXPECTED_PACKAGE_NAME = '@timeproofs/agentready';
export const EXPECTED_VERSION = '0.1.0-alpha.0';
export const EXPECTED_ROOT_LICENSE = 'SEE LICENSE IN LICENSE';
export const COMMUNITY_LICENSE = 'Apache-2.0';
export const COMMUNITY_PUBLISH_CONFIG = Object.freeze({
  access: 'public',
  registry: 'https://registry.npmjs.org/',
  tag: 'alpha'
});
export const MANIFEST_NAME = 'agentready-community-release-candidate-manifest.json';
export const RELEASE_NOTES_RELATIVE_PATH = 'docs/agentready/COMMUNITY_RELEASE_NOTES_0_1_0_ALPHA_0_DRAFT.md';

export const EXPECTED_PACKAGE_FILES = [
  'LICENSE',
  'NOTICE',
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

const COMMUNITY_SOURCE_FILES = [
  'bin/agentready.js',
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
  'agentready-core/types.js',
  'agentready-core/simulation/parse-simulation-scenario.js',
  'agentready-core/simulation/run-static-simulation.js',
  'agentready-core/simulation/simulation-result.js'
];

export const PUBLICATION_BLOCKERS = [
  'final Community tarball content not approved',
  'explicit release approval not granted',
  'no public tag exists',
  'no GitHub Release exists',
  'trusted publishing provenance not configured for publication'
];

const FORBIDDEN_PACKAGE_TERMS = [
  'ProofSpec',
  'proof-of-existence',
  'TimeProofs protocol',
  'timestamp proofs',
  'Based on the TimeProofs open protocol'
];

export async function createCommunityReleaseCandidate({ repoRoot, outputDir }) {
  const resolvedRepoRoot = path.resolve(repoRoot);
  const resolvedOutputDir = path.resolve(resolvedRepoRoot, outputDir);
  await assertSafeOutputDir(resolvedRepoRoot, resolvedOutputDir);
  await fs.mkdir(resolvedOutputDir, { recursive: true });

  const rootPackageJson = await readRootPackageJson(resolvedRepoRoot);
  const plannedTag = `v${rootPackageJson.version}`;
  const commitSha = await resolveCommitSha(resolvedRepoRoot);
  const releaseNotesSource = path.join(resolvedRepoRoot, RELEASE_NOTES_RELATIVE_PATH);

  const stagingRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'agentready-community-staging-'));
  try {
    await createCommunityPackageStaging({
      repoRoot: resolvedRepoRoot,
      stagingRoot,
      rootPackageJson
    });

    const pack = await npm(['pack', '--json', '--pack-destination', resolvedOutputDir], {
      cwd: stagingRoot
    });
    if (pack.code !== 0) {
      throw new Error(`npm pack failed:\n${pack.stderr || pack.stdout}`);
    }

    const packOutput = JSON.parse(pack.stdout);
    const rawPackInfo = Array.isArray(packOutput) ? packOutput[0] : packOutput;
    assert.equal(rawPackInfo.name, EXPECTED_PACKAGE_NAME);
    assert.equal(rawPackInfo.version, EXPECTED_VERSION);

    const normalizedFilename = path.basename(rawPackInfo.filename);
    const tarballPath = path.isAbsolute(rawPackInfo.filename)
      ? rawPackInfo.filename
      : path.join(resolvedOutputDir, normalizedFilename);
    const packageFiles = rawPackInfo.files.map((file) => file.path).sort();
    assert.deepEqual(packageFiles, [...EXPECTED_PACKAGE_FILES].sort());
    assertNoForbiddenPackageFiles(packageFiles);

    const tarball = await fs.readFile(tarballPath);
    const sha256 = createHash('sha256').update(tarball).digest('hex');
    const tarballEntries = await validateCommunityTarball(tarballPath);
    const tarballStat = await fs.stat(tarballPath);
    const packInfo = {
      ...rawPackInfo,
      filename: normalizedFilename,
      size: rawPackInfo.size ?? tarballStat.size,
      unpackedSize: rawPackInfo.unpackedSize ?? tarballEntries.reduce((sum, entry) => sum + entry.size, 0),
      entryCount: rawPackInfo.entryCount ?? packageFiles.length,
      files: rawPackInfo.files
    };
    assert.equal(packInfo.entryCount, EXPECTED_PACKAGE_FILES.length);

    const checksumFilename = `${packInfo.filename}.sha256`;
    const manifestPath = path.join(resolvedOutputDir, MANIFEST_NAME);
    const releaseNotesFilename = path.basename(releaseNotesSource);

    await fs.writeFile(path.join(resolvedOutputDir, checksumFilename), `${sha256}  ${packInfo.filename}\n`, 'utf8');
    await fs.copyFile(releaseNotesSource, path.join(resolvedOutputDir, releaseNotesFilename));

    const manifest = {
      schema_version: '0.1',
      status: 'candidate_only',
      publication_ready: false,
      package_name: rootPackageJson.name,
      version: rootPackageJson.version,
      planned_tag: plannedTag,
      commit_sha: commitSha,
      node_version: process.version,
      package_private: false,
      package_publish_access: COMMUNITY_PUBLISH_CONFIG.access,
      package_publish_registry: COMMUNITY_PUBLISH_CONFIG.registry,
      package_publish_tag: COMMUNITY_PUBLISH_CONFIG.tag,
      community_license: COMMUNITY_LICENSE,
      package_boundary: 'staged AgentReady Community package only',
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

    assertNoSensitiveManifestData(manifest, resolvedRepoRoot);
    await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

    return {
      packInfo,
      sha256,
      manifest,
      tarballPath,
      outputDir: resolvedOutputDir
    };
  } finally {
    await fs.rm(stagingRoot, { recursive: true, force: true });
  }
}

export async function createCommunityPackageStaging({ repoRoot, stagingRoot, rootPackageJson }) {
  const resolvedRepoRoot = path.resolve(repoRoot);
  const resolvedStagingRoot = path.resolve(stagingRoot);
  await fs.mkdir(resolvedStagingRoot, { recursive: true });

  await copyFileRelative(
    path.join(resolvedRepoRoot, 'packaging/agentready-community/LICENSE'),
    path.join(resolvedStagingRoot, 'LICENSE')
  );
  await copyFileRelative(
    path.join(resolvedRepoRoot, 'packaging/agentready-community/NOTICE'),
    path.join(resolvedStagingRoot, 'NOTICE')
  );
  await copyFileRelative(
    path.join(resolvedRepoRoot, 'packaging/agentready-community/README.md'),
    path.join(resolvedStagingRoot, 'README.md')
  );

  for (const file of COMMUNITY_SOURCE_FILES) {
    await copyFileRelative(path.join(resolvedRepoRoot, file), path.join(resolvedStagingRoot, file));
  }

  const communityPackageJson = {
    name: rootPackageJson.name,
    version: rootPackageJson.version,
    description: rootPackageJson.description,
    type: rootPackageJson.type,
    bin: rootPackageJson.bin,
    keywords: rootPackageJson.keywords,
    repository: rootPackageJson.repository,
    homepage: rootPackageJson.homepage,
    bugs: rootPackageJson.bugs,
    license: COMMUNITY_LICENSE,
    engines: rootPackageJson.engines,
    publishConfig: COMMUNITY_PUBLISH_CONFIG,
    dependencies: {}
  };

  await fs.writeFile(
    path.join(resolvedStagingRoot, 'package.json'),
    `${JSON.stringify(communityPackageJson, null, 2)}\n`,
    'utf8'
  );
}

export async function readRootPackageJson(repoRoot) {
  const packageJson = JSON.parse(await fs.readFile(path.join(repoRoot, 'package.json'), 'utf8'));
  assert.equal(packageJson.name, EXPECTED_PACKAGE_NAME);
  assert.equal(packageJson.version, EXPECTED_VERSION);
  assert.equal(packageJson.private, true);
  assert.equal(packageJson.license, EXPECTED_ROOT_LICENSE);
  assert.equal(packageJson.engines?.node, '>=20');
  assert.equal(packageJson.bin?.agentready, './bin/agentready.js');
  assert.deepEqual(Object.keys(packageJson.dependencies || {}), [], 'runtime dependencies must remain empty');
  return packageJson;
}

export async function validateCommunityTarball(tarballPath) {
  const entries = await readTarballEntries(tarballPath);
  const fileEntries = entries
    .filter((entry) => entry.type !== '5')
    .map((entry) => normalizePackagePath(entry.name))
    .filter(Boolean)
    .sort();

  assert.deepEqual(fileEntries, [...EXPECTED_PACKAGE_FILES].sort());

  const packageJson = JSON.parse(await readTarballText(entries, 'package.json'));
  assert.equal(packageJson.license, COMMUNITY_LICENSE);
  assert.notEqual(packageJson.private, true);
  assert.equal(packageJson.publishConfig?.access, COMMUNITY_PUBLISH_CONFIG.access);
  assert.equal(packageJson.publishConfig?.registry, COMMUNITY_PUBLISH_CONFIG.registry);
  assert.equal(packageJson.publishConfig?.tag, COMMUNITY_PUBLISH_CONFIG.tag);
  assert.deepEqual(Object.keys(packageJson.dependencies || {}), []);

  const licenseText = await readTarballText(entries, 'LICENSE');
  assert.match(licenseText, /Apache License\s+Version 2\.0, January 2004/);
  assert.match(licenseText, /TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION/);

  const noticeText = await readTarballText(entries, 'NOTICE');
  assert.match(noticeText, /AgentReady Community/);
  assert.match(noticeText, /Licensed under the Apache License, Version 2\.0\./);

  const readmeText = await readTarballText(entries, 'README.md');
  assert.match(readmeText, /AgentReady Community/);
  assert.match(readmeText, /not yet\s+published/i);
  assert.match(readmeText, /npm install @timeproofs\/agentready@alpha/);
  assert.match(readmeText, /npx @timeproofs\/agentready@alpha --help/);
  assert.match(readmeText, /not distributed under `latest`/i);
  assert.doesNotMatch(readmeText, /ProofSpec|proof-of-existence|preuve d['’]existence|timestamp proofs|TimeProofs protocol/i);

  const combinedText = [licenseText, noticeText, readmeText, JSON.stringify(packageJson)].join('\n');
  for (const term of FORBIDDEN_PACKAGE_TERMS) {
    assert.doesNotMatch(combinedText, new RegExp(escapeRegExp(term), 'i'), `forbidden term in package: ${term}`);
  }

  return entries;
}

export async function readTarballEntries(tarballPath) {
  const gzip = await fs.readFile(tarballPath);
  const buffer = await gunzipAsync(gzip);
  const entries = [];
  let offset = 0;

  while (offset + 512 <= buffer.length) {
    const header = buffer.subarray(offset, offset + 512);
    if (header.every((byte) => byte === 0)) break;
    const name = readNullTerminated(header, 0, 100);
    const prefix = readNullTerminated(header, 345, 155);
    const sizeText = readNullTerminated(header, 124, 12).trim();
    const size = Number.parseInt(sizeText || '0', 8);
    const type = String.fromCharCode(header[156] || 0);
    const fullName = prefix ? `${prefix}/${name}` : name;
    const dataStart = offset + 512;
    const dataEnd = dataStart + size;
    entries.push({
      name: fullName,
      type,
      size,
      data: buffer.subarray(dataStart, dataEnd)
    });
    offset = dataStart + Math.ceil(size / 512) * 512;
  }

  return entries;
}

export async function readTarballText(entries, relativePath) {
  const entry = entries.find((candidate) => normalizePackagePath(candidate.name) === relativePath);
  assert.ok(entry, `missing ${relativePath} in tarball`);
  return entry.data.toString('utf8');
}

export function normalizePackagePath(entryName) {
  return entryName.startsWith('package/') ? entryName.slice('package/'.length) : entryName;
}

export async function assertSafeOutputDir(repoRoot, outputDirToCheck) {
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

export function assertNoForbiddenPackageFiles(files) {
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

export function assertNoSensitiveManifestData(manifest, repoRoot) {
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

export async function resolveCommitSha(repoRoot) {
  const gitCli = process.env.AGENTREADY_GIT_CLI || 'git';
  const result = await run(gitCli, ['rev-parse', 'HEAD'], { cwd: repoRoot });
  if (result.code !== 0) {
    throw new Error(`Unable to resolve commit SHA:\n${result.stderr || result.stdout}`);
  }
  return result.stdout.trim();
}

export function npm(argsToRun, options) {
  const npmCli = process.env.AGENTREADY_NPM_CLI || process.env.npm_execpath || 'npm';
  return runTool(npmCli, argsToRun, options);
}

export function runTool(command, argsToRun, options) {
  const isJsCli = command.endsWith('.js');
  const isWindowsCmd = process.platform === 'win32' && /\.(cmd|bat)$/i.test(command);
  if (isWindowsCmd) {
    return run('cmd.exe', ['/d', '/s', '/c', [command, ...argsToRun].map(quoteCmdArg).join(' ')], options);
  }
  const spawnCommand = isJsCli ? process.execPath : command;
  const spawnArgs = isJsCli ? [command, ...argsToRun] : argsToRun;
  return run(spawnCommand, spawnArgs, options);
}

function run(command, argsToRun, options) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, argsToRun, {
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

function quoteCmdArg(value) {
  const text = String(value);
  if (!/[ \t"&|<>^]/.test(text)) return text;
  return `"${text.replace(/"/g, '\\"')}"`;
}

async function copyFileRelative(source, destination) {
  await fs.mkdir(path.dirname(destination), { recursive: true });
  await fs.copyFile(source, destination);
}

function readNullTerminated(buffer, start, length) {
  const end = start + length;
  let index = start;
  while (index < end && buffer[index] !== 0) index += 1;
  return buffer.subarray(start, index).toString('utf8');
}

function samePath(left, right) {
  const normalizedLeft = path.resolve(left);
  const normalizedRight = path.resolve(right);
  if (process.platform === 'win32') {
    return normalizedLeft.toLowerCase() === normalizedRight.toLowerCase();
  }
  return normalizedLeft === normalizedRight;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
