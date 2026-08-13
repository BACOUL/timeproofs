import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const out = path.resolve(process.argv[2] || '.tmp/timeproofs-package');
const packageName = process.env.TIMEPROOFS_PACKAGE_NAME || '@timeproofs/verify-preview';

const files = [
  'bin/timeproofs.js',
  'cli/timeproofs.js',
  'sdk/index.js',
  'sdk/enforcement.js',
  'adapters/ucp/checkout.js',
  'adapters/ap2/payment-mandate.js',
  'adapters/stripe/payment-intent.js',
  'timeproofs-core/index.js',
  'timeproofs-core/canonical.js',
  'packs/ucp-ap2/manifest.json',
  'packs/ucp-ap2/SPEC.md',
  'packs/ucp-ap2/COMPATIBILITY.md',
  'schemas/timeproofs-result.v0.1.schema.json',
  'schemas/timeproofs-enforcement.v0.1.schema.json',
  'schemas/timeproofs-provider-evidence.v0.1.schema.json',
  'schemas/timeproofs-core.schema.json',
  'LICENSE'
];

async function copy(rel) {
  const from = path.join(root, rel);
  const to = path.join(out, rel);
  await fs.mkdir(path.dirname(to), { recursive: true });
  await fs.copyFile(from, to);
}

await fs.rm(out, { recursive: true, force: true });
await fs.mkdir(out, { recursive: true });
for (const file of files) await copy(file);

const template = JSON.parse(await fs.readFile(path.join(root,'packaging/timeproofs/package.template.json'),'utf8'));
template.name = packageName;
await fs.writeFile(path.join(out,'package.json'), `${JSON.stringify(template,null,2)}\n`);

const readme = `# TimeProofs\n\nCross-protocol consistency verification, local-first enforcement and provider-evidence verification for agentic transactions.\n\nThis package is built from an explicit allowlist. Legacy AgentReady code is not included.\n\n## Verify CLI\n\n\`\`\`bash\ntimeproofs verify --checkout checkout.json --payment-mandate payment.json --checkout-jwt-file checkout-proof.txt\n\`\`\`\n\n## SDK — pre-commit\n\n\`\`\`js\nimport { verifyTransaction, enforceTransaction } from '${packageName}';\n\nconst gate = enforceTransaction({ checkout, paymentMandate, checkoutJwt });\nif (gate.allowed) await callerOwnedCommit();\n\`\`\`\n\n## SDK — provider evidence\n\n\`\`\`js\nimport { verifyProviderExecution } from '${packageName}';\n\nconst result = verifyProviderExecution({\n  paymentMandate,\n  providerEvidence: stripePaymentIntent,\n  provider: 'stripe',\n  providerVersion: '2026-02-25.clover'\n});\n\`\`\`\n\nDefault financial enforcement is fail-closed: BLOCK and UNKNOWN deny pre-commit execution; runtime errors do not silently allow. The caller retains ownership of the external side effect and provider retrieval.\n\nSupported initial profiles: UCP Checkout 2026-04-08, AP2 PaymentMandate mandate.payment.1, and Stripe PaymentIntent 2026-02-25.clover for M8.1 provider-evidence verification.\n`;
await fs.writeFile(path.join(out,'README.md'),readme);

const forbidden = ['agentready-core','bin/agentready.js','docs/agentready','packaging/agentready-community'];
for (const rel of forbidden) {
  try { await fs.access(path.join(out,rel)); throw new Error(`Forbidden legacy path copied into package: ${rel}`); }
  catch (e) { if (e.code !== 'ENOENT') throw e; }
}

console.log(out);
