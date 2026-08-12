import fs from 'node:fs/promises';
import { verifyTransaction } from '../sdk/index.js';

const env = process.env;
function fail(message, code = 1) { const e = new Error(message); e.exitCode = code; throw e; }
async function json(path) { try { return JSON.parse(await fs.readFile(path, 'utf8')); } catch (e) { fail(`Cannot read JSON ${path}: ${e.message}`); } }
async function jwt() {
  if (env.TP_JWT && env.TP_JWT_FILE) fail('Use checkout-jwt or checkout-jwt-file, not both.');
  if (env.TP_JWT_FILE) return (await fs.readFile(env.TP_JWT_FILE, 'utf8')).trim();
  return env.TP_JWT || null;
}
function safe(value, secret) {
  if (!secret) return value;
  const text = JSON.stringify(value);
  if (text.includes(secret)) fail('Safety invariant failed: raw checkout JWT reached TimeProofs output.');
  return value;
}

try {
  if (!env.TP_CHECKOUT) fail('checkout input is required');
  if (!env.TP_PAYMENT) fail('payment-mandate input is required');
  const [checkout, paymentMandate, checkoutJwt] = await Promise.all([json(env.TP_CHECKOUT), json(env.TP_PAYMENT), jwt()]);
  if (checkoutJwt && env.GITHUB_ACTIONS === 'true') process.stdout.write(`::add-mask::${checkoutJwt}\n`);
  const evaluation = safe(verifyTransaction({ checkout, paymentMandate, checkoutJwt, transformation: env.TP_TRANSFORMATION || null, sourceRefs: { checkout: env.TP_CHECKOUT, paymentMandate: env.TP_PAYMENT } }), checkoutJwt);
  const output = env.TP_OUTPUT || 'timeproofs-result.json';
  await fs.writeFile(output, `${JSON.stringify(evaluation, null, 2)}\n`, { mode: 0o600 });
  if (env.GITHUB_OUTPUT) await fs.appendFile(env.GITHUB_OUTPUT, `decision=${evaluation.decision}\nresult-file=${output}\n`);
  process.stdout.write(`TimeProofs decision: ${evaluation.decision}\n`);
  if (evaluation.decision === 'BLOCK') process.exitCode = 2;
  else if (evaluation.decision === 'UNKNOWN' && env.TP_FAIL_UNKNOWN !== 'false') process.exitCode = 3;
} catch (e) {
  process.stderr.write(`TimeProofs error: ${e.message}\n`);
  process.exitCode = e.exitCode || (e.code === 'UNSUPPORTED_VERSION' ? 4 : 1);
}
