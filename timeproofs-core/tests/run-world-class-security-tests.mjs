import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { verifyTransaction } from '../../sdk/index.js';
import { canonicalJson, sha256Base64UrlString } from '../canonical.js';

function assert(condition, message) { if (!condition) throw new Error(message); }
function checkout(amount = 76000, currency = 'EUR') {
  return { ucp:{version:'2026-04-08'}, id:'chk_security', line_items:[], status:'ready_for_complete', currency, totals:[{type:'total',amount}], links:[] };
}
function payment(proof, amount = 76000, currency = 'EUR') {
  return { vct:'mandate.payment.1', transaction_id:sha256Base64UrlString(proof), payee:{name:'Merchant'}, payment_amount:{currency,amount}, payment_instrument:{type:'CARD',id:'pi_security'} };
}
async function expectThrow(fn, fragment) {
  let error = null;
  try { await fn(); } catch (e) { error = e; }
  assert(error, `Expected error containing ${fragment}`);
  assert(String(error.message).includes(fragment), `Expected '${fragment}' in '${error.message}'`);
}
function runNode(script, env) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [script], { env:{...process.env,...env}, stdio:['ignore','pipe','pipe'] });
    let stdout='', stderr='';
    child.stdout.on('data', d => stdout += d);
    child.stderr.on('data', d => stderr += d);
    child.on('error', reject);
    child.on('close', code => resolve({code,stdout,stderr}));
  });
}

const proof = 'timeproofs-security-proof';

await expectThrow(() => Promise.resolve(canonicalJson({x:NaN})), 'non-finite');
await expectThrow(() => Promise.resolve(canonicalJson({x:undefined})), 'non-JSON');
const cyclic = {}; cyclic.self = cyclic;
await expectThrow(() => Promise.resolve(canonicalJson(cyclic)), 'cyclic');
let deep = {}; let cursor = deep;
for (let i=0;i<110;i++) { cursor.next={}; cursor=cursor.next; }
await expectThrow(() => Promise.resolve(canonicalJson(deep)), 'depth limit');

await expectThrow(() => Promise.resolve(verifyTransaction({checkout:checkout(1.5),paymentMandate:payment(proof),checkoutJwt:proof})), 'total amount');
await expectThrow(() => Promise.resolve(verifyTransaction({checkout:checkout(76000,'eur'),paymentMandate:payment(proof),checkoutJwt:proof})), 'currency');
await expectThrow(() => Promise.resolve(verifyTransaction({checkout:checkout(),paymentMandate:{...payment(proof),vct:'mandate.payment.future'},checkoutJwt:proof})), 'Unsupported AP2');
await expectThrow(() => Promise.resolve(verifyTransaction({checkout:{...checkout(),totals:[{type:'total',amount:1},{type:'total',amount:1}]},paymentMandate:payment(proof),checkoutJwt:proof})), 'exactly one');

const a = verifyTransaction({checkout:checkout(),paymentMandate:payment(proof),checkoutJwt:proof,evaluatedAt:'2026-08-12T10:00:00Z'});
const b = verifyTransaction({checkout:checkout(),paymentMandate:payment(proof),checkoutJwt:proof,evaluatedAt:'2026-08-12T10:00:00Z'});
assert(JSON.stringify(a) === JSON.stringify(b), 'Fixed-input evaluation must be deterministic.');
assert(a.result_contract_version === 'timeproofs.result.v0.1', 'SDK result contract version missing.');

const dir = await fs.mkdtemp(path.join(os.tmpdir(),'timeproofs-security-'));
const checkoutPath = path.join(dir,'checkout.json');
const paymentPath = path.join(dir,'payment.json');
const proofPath = path.join(dir,'proof.txt');
const resultPath = path.join(dir,'result.json');
await fs.writeFile(checkoutPath,JSON.stringify(checkout()),{mode:0o600});
await fs.writeFile(paymentPath,JSON.stringify(payment(proof)),{mode:0o600});
await fs.writeFile(proofPath,proof,{mode:0o600});

let run = await runNode(path.resolve('ci/github-action.mjs'), {
  TP_CHECKOUT:checkoutPath, TP_PAYMENT:paymentPath, TP_JWT_FILE:proofPath, TP_OUTPUT:resultPath,
  TP_FAIL_UNKNOWN:'true', TP_MAX_INPUT_BYTES:'1048576'
});
assert(run.code === 0, `Safe Action PASS expected 0, got ${run.code}: ${run.stderr}`);
const safeText = await fs.readFile(resultPath,'utf8');
assert(!safeText.includes(proof), 'Action result must not contain raw checkout proof.');
assert(!safeText.includes('payment_instrument'), 'Action result must not contain payment instrument payload.');
assert(!safeText.includes('merchant_authorization'), 'Action result must not contain merchant authorization payload.');
const safeResult = JSON.parse(safeText);
assert(safeResult.decision === 'PASS', 'Action result must PASS.');
assert(safeResult.result_contract_version === 'timeproofs.result.v0.1', 'Safe result contract version missing.');
assert(safeResult.redaction?.profile === 'timeproofs.ci.safe.v0.1', 'Safe redaction profile missing.');
assert(safeResult.graph.objects.every(o => !Object.hasOwn(o,'raw')), 'Safe result must omit raw protocol objects.');

run = await runNode(path.resolve('ci/github-action.mjs'), {
  TP_CHECKOUT:checkoutPath, TP_PAYMENT:paymentPath, TP_JWT_FILE:proofPath, TP_OUTPUT:checkoutPath
});
assert(run.code === 1 && run.stderr.includes('must not overwrite'), 'Action must reject output/input aliasing.');

const oversizedPath = path.join(dir,'oversized.json');
await fs.writeFile(oversizedPath,' '.repeat(2048));
run = await runNode(path.resolve('ci/github-action.mjs'), {
  TP_CHECKOUT:oversizedPath, TP_PAYMENT:paymentPath, TP_JWT_FILE:proofPath, TP_OUTPUT:resultPath,
  TP_MAX_INPUT_BYTES:'1024'
});
assert(run.code === 1 && run.stderr.includes('exceeds maximum input size'), 'Action must reject oversized input before parsing.');

console.log('TimeProofs world-class security tests PASS');
