import fs from 'node:fs/promises';
import path from 'node:path';
import { verifyTransaction } from '../sdk/index.js';

const env = process.env;
const DEFAULT_MAX_INPUT_BYTES = 10 * 1024 * 1024;

function fail(message, code = 1) {
  const e = new Error(message);
  e.exitCode = code;
  throw e;
}

function maxInputBytes() {
  if (!env.TP_MAX_INPUT_BYTES) return DEFAULT_MAX_INPUT_BYTES;
  const value = Number(env.TP_MAX_INPUT_BYTES);
  if (!Number.isSafeInteger(value) || value <= 0 || value > 50 * 1024 * 1024) fail('TP_MAX_INPUT_BYTES must be an integer between 1 and 52428800 bytes.');
  return value;
}

async function readBoundedFile(file, label, maxBytes) {
  let stat;
  try { stat = await fs.stat(file); }
  catch (e) { fail(`Cannot stat ${label} ${file}: ${e.message}`); }
  if (!stat.isFile()) fail(`${label} must be a regular file: ${file}`);
  if (stat.size > maxBytes) fail(`${label} exceeds maximum input size (${stat.size} > ${maxBytes} bytes).`);
  try { return await fs.readFile(file, 'utf8'); }
  catch (e) { fail(`Cannot read ${label} ${file}: ${e.message}`); }
}

async function json(file, label, maxBytes) {
  const raw = await readBoundedFile(file, label, maxBytes);
  try { return JSON.parse(raw); }
  catch (e) { fail(`Cannot parse JSON ${file}: ${e.message}`); }
}

async function checkoutProof(maxBytes) {
  if (env.TP_JWT && env.TP_JWT_FILE) fail('Use checkout-jwt or checkout-jwt-file, not both.');
  if (env.TP_JWT_FILE) return (await readBoundedFile(env.TP_JWT_FILE, 'checkout proof', maxBytes)).trim();
  if (env.TP_JWT && Buffer.byteLength(env.TP_JWT, 'utf8') > maxBytes) fail('checkout-jwt exceeds maximum input size.');
  return env.TP_JWT || null;
}

function assertSecretAbsent(value, secret) {
  if (!secret) return value;
  const text = JSON.stringify(value);
  if (text.includes(secret)) fail('Safety invariant failed: raw checkout proof reached TimeProofs output.');
  return value;
}

function samePath(a, b) {
  return a && b && path.resolve(a) === path.resolve(b);
}

try {
  if (!env.TP_CHECKOUT) fail('checkout input is required');
  if (!env.TP_PAYMENT) fail('payment-mandate input is required');
  const output = env.TP_OUTPUT || 'timeproofs-result.json';
  if (samePath(output, env.TP_CHECKOUT) || samePath(output, env.TP_PAYMENT) || samePath(output, env.TP_JWT_FILE)) {
    fail('output path must not overwrite an input artifact.');
  }

  const maxBytes = maxInputBytes();
  const [checkout, paymentMandate, proof] = await Promise.all([
    json(env.TP_CHECKOUT, 'checkout', maxBytes),
    json(env.TP_PAYMENT, 'payment mandate', maxBytes),
    checkoutProof(maxBytes)
  ]);

  if (proof && env.GITHUB_ACTIONS === 'true') process.stdout.write(`::add-mask::${proof}\n`);

  const evaluation = assertSecretAbsent(verifyTransaction({
    checkout,
    paymentMandate,
    checkoutJwt: proof,
    transformation: env.TP_TRANSFORMATION || null,
    sourceRefs: { checkout: env.TP_CHECKOUT, paymentMandate: env.TP_PAYMENT }
  }), proof);

  await fs.writeFile(output, `${JSON.stringify(evaluation, null, 2)}\n`, { mode: 0o600, flag: 'w' });
  if (env.GITHUB_OUTPUT) await fs.appendFile(env.GITHUB_OUTPUT, `decision=${evaluation.decision}\nresult-file=${output}\n`);
  process.stdout.write(`TimeProofs decision: ${evaluation.decision}\n`);

  if (evaluation.decision === 'BLOCK') process.exitCode = 2;
  else if (evaluation.decision === 'UNKNOWN' && env.TP_FAIL_UNKNOWN !== 'false') process.exitCode = 3;
} catch (e) {
  process.stderr.write(`TimeProofs error: ${e.message}\n`);
  process.exitCode = e.exitCode || (e.code === 'UNSUPPORTED_VERSION' ? 4 : 1);
}
