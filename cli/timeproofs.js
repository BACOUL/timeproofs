import fs from 'node:fs/promises';
import { verifyTransaction } from '../sdk/index.js';

function usage() {
  return `TimeProofs\n\nUsage:\n  timeproofs verify --checkout <checkout.json> --payment-mandate <payment.json> [--checkout-jwt <jwt-or-file>] [--json]\n\nOptions:\n  --checkout <path>          UCP 2026-04-08 checkout response JSON\n  --payment-mandate <path>  AP2 mandate.payment.1 JSON\n  --checkout-jwt <value>    Exact checkout_jwt string, or @path/to/file\n  --hash-algorithm <name>   Binding hash algorithm (default: sha256)\n  --transformation <name>   Declare a transformation such as fx; unsupported transforms return UNKNOWN\n  --json                     Print machine-readable JSON only\n  --help                     Show help\n`;
}

function parseArgs(argv) {
  const out = { json: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--json') out.json = true;
    else if (a === '--help' || a === '-h') out.help = true;
    else if (a.startsWith('--')) {
      const key = a.slice(2).replaceAll('-','_');
      if (i + 1 >= argv.length) throw new Error(`Missing value for ${a}`);
      out[key] = argv[++i];
    } else if (!out.command) out.command = a;
    else throw new Error(`Unexpected argument: ${a}`);
  }
  return out;
}

async function readJson(path) {
  try { return JSON.parse(await fs.readFile(path,'utf8')); }
  catch (err) { err.message = `Cannot read JSON ${path}: ${err.message}`; throw err; }
}

async function readJwt(value) {
  if (!value) return null;
  if (!value.startsWith('@')) return value;
  return (await fs.readFile(value.slice(1),'utf8')).trim();
}

function renderHuman(evaluation) {
  const lines = ['TimeProofs', '', `Decision: ${evaluation.decision}`, ''];
  for (const r of evaluation.results) {
    const marker = r.status === 'PASS' ? '✓' : r.status === 'BLOCK' ? '✗' : '?';
    lines.push(`${marker} ${r.invariant_id}  ${r.status}`);
    lines.push(`  ${r.reason_code}: ${r.message}`);
    if (r.unknown_reason) lines.push(`  unknown_reason: ${r.unknown_reason}`);
  }
  return lines.join('\n');
}

export async function runTimeProofsCli(argv, io = { stdout: process.stdout, stderr: process.stderr }) {
  try {
    const args = parseArgs(argv);
    if (args.help || !args.command) { io.stdout.write(usage()); return 0; }
    if (args.command !== 'verify') throw new Error(`Unknown command: ${args.command}`);
    if (!args.checkout) throw new Error('--checkout is required');
    if (!args.payment_mandate) throw new Error('--payment-mandate is required');
    const [checkout, paymentMandate, checkoutJwt] = await Promise.all([
      readJson(args.checkout),
      readJson(args.payment_mandate),
      readJwt(args.checkout_jwt)
    ]);
    const evaluation = verifyTransaction({
      checkout,
      paymentMandate,
      checkoutJwt,
      hashAlgorithm: args.hash_algorithm || 'sha256',
      transformation: args.transformation || null,
      sourceRefs: { checkout: args.checkout, paymentMandate: args.payment_mandate }
    });
    io.stdout.write(args.json ? `${JSON.stringify(evaluation,null,2)}\n` : `${renderHuman(evaluation)}\n`);
    if (evaluation.decision === 'BLOCK') return 2;
    if (evaluation.decision === 'UNKNOWN') return 3;
    return 0;
  } catch (err) {
    io.stderr.write(`TimeProofs error: ${err.message}\n`);
    return err.code === 'UNSUPPORTED_VERSION' ? 4 : 1;
  }
}
