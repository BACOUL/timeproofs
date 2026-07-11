import path from 'node:path';
import { createCommunityReleaseCandidate } from './agentready-community-package-lib.mjs';

const repoRoot = process.cwd();
const args = parseArgs(process.argv.slice(2));

if (!args.out) {
  throw new Error('Usage: node scripts/create-agentready-community-release-candidate.mjs --out <dir>');
}

const result = await createCommunityReleaseCandidate({
  repoRoot,
  outputDir: path.resolve(repoRoot, args.out)
});

console.log(`AgentReady Community release candidate created in ${path.relative(repoRoot, result.outputDir) || '.'}`);
console.log(`tarball=${result.packInfo.filename}`);
console.log(`sha256=${result.sha256}`);
console.log('manifest=agentready-community-release-candidate-manifest.json');

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
