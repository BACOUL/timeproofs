import { performance } from 'node:perf_hooks';
import crypto from 'node:crypto';
import { verifyTransaction } from '../sdk/index.js';

const size = Number(process.env.TIMEPROOFS_BENCH_LINE_ITEMS || 1000);
const iterations = Number(process.env.TIMEPROOFS_BENCH_ITERATIONS || 50);
if (!Number.isSafeInteger(size) || size < 0 || size > 10000) throw new Error('Invalid benchmark line-item size.');
if (!Number.isSafeInteger(iterations) || iterations < 1 || iterations > 1000) throw new Error('Invalid benchmark iteration count.');

const proof = 'timeproofs-benchmark-proof';
const transaction_id = crypto.createHash('sha256').update(proof).digest('base64url');
const checkout = {
  ucp:{version:'2026-04-08'},
  id:'bench_checkout',
  line_items:Array.from({length:size},(_,i)=>({id:`li_${i}`,quantity:1,item:{id:`sku_${i}`},totals:[{type:'subtotal',amount:100}]})),
  status:'ready_for_complete',
  currency:'EUR',
  totals:[{type:'total',amount:100000}],
  links:[]
};
const paymentMandate = {
  vct:'mandate.payment.1',
  transaction_id,
  payee:{name:'Benchmark Merchant'},
  payment_amount:{currency:'EUR',amount:100000},
  payment_instrument:{type:'CARD',id:'bench'}
};

// Warm up.
for (let i=0;i<5;i++) verifyTransaction({checkout,paymentMandate,checkoutJwt:proof,evaluatedAt:'2026-08-12T10:00:00Z'});

const samples=[];
for (let i=0;i<iterations;i++) {
  const start=performance.now();
  const result=verifyTransaction({checkout,paymentMandate,checkoutJwt:proof,evaluatedAt:'2026-08-12T10:00:00Z'});
  const elapsed=performance.now()-start;
  if(result.decision!=='PASS') throw new Error(`Benchmark evaluation expected PASS, got ${result.decision}`);
  samples.push(elapsed);
}
samples.sort((a,b)=>a-b);
const percentile = p => samples[Math.min(samples.length-1,Math.floor((samples.length-1)*p))];
const summary={
  benchmark:'verify-ucp-ap2',
  line_items:size,
  iterations,
  p50_ms:Number(percentile(0.50).toFixed(3)),
  p95_ms:Number(percentile(0.95).toFixed(3)),
  max_ms:Number(samples.at(-1).toFixed(3)),
  node:process.version,
  platform:process.platform,
  arch:process.arch,
  rss_mb:Number((process.memoryUsage().rss/1024/1024).toFixed(1))
};
console.log(JSON.stringify(summary,null,2));

// This is a catastrophic-regression guard, not a marketing benchmark.
if (summary.p95_ms > 2000) {
  console.error(`p95 ${summary.p95_ms}ms exceeds 2000ms safety ceiling.`);
  process.exit(2);
}
