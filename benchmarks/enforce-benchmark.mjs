import { performance } from 'node:perf_hooks';
import crypto from 'node:crypto';
import { verifyTransaction, enforceTransaction } from '../sdk/index.js';

const size = Number(process.env.TIMEPROOFS_BENCH_LINE_ITEMS || 1000);
const iterations = Number(process.env.TIMEPROOFS_BENCH_ITERATIONS || 50);
const overheadCeilingMs = Number(process.env.TIMEPROOFS_ENFORCE_OVERHEAD_P95_CEILING_MS || 5);
if (!Number.isSafeInteger(size) || size < 0 || size > 10000) throw new Error('Invalid benchmark line-item size.');
if (!Number.isSafeInteger(iterations) || iterations < 1 || iterations > 1000) throw new Error('Invalid benchmark iteration count.');
if (!Number.isFinite(overheadCeilingMs) || overheadCeilingMs <= 0) throw new Error('Invalid enforcement overhead ceiling.');

const proof='timeproofs-enforcement-benchmark-proof';
const transaction_id=crypto.createHash('sha256').update(proof).digest('base64url');
const checkout={ucp:{version:'2026-04-08'},id:'bench_enforce',line_items:Array.from({length:size},(_,i)=>({id:`li_${i}`,quantity:1,item:{id:`sku_${i}`},totals:[{type:'subtotal',amount:100}]})),status:'ready_for_complete',currency:'EUR',totals:[{type:'total',amount:100000}],links:[]};
const paymentMandate={vct:'mandate.payment.1',transaction_id,payee:{name:'Benchmark Merchant'},payment_amount:{currency:'EUR',amount:100000},payment_instrument:{type:'CARD',id:'bench'}};
const input={checkout,paymentMandate,checkoutJwt:proof,evaluatedAt:'2026-08-12T10:00:00Z'};

for(let i=0;i<5;i++){verifyTransaction(input);enforceTransaction(input);}
const verifySamples=[]; const enforceSamples=[];
for(let i=0;i<iterations;i++){
  let start=performance.now();
  const verify=verifyTransaction(input);
  verifySamples.push(performance.now()-start);
  if(verify.decision!=='PASS') throw new Error(`Verify expected PASS, got ${verify.decision}`);
  start=performance.now();
  const enforce=enforceTransaction(input);
  enforceSamples.push(performance.now()-start);
  if(enforce.state!=='ALLOW'||!enforce.allowed) throw new Error(`Enforce expected ALLOW, got ${enforce.state}`);
}
verifySamples.sort((a,b)=>a-b); enforceSamples.sort((a,b)=>a-b);
const pct=(samples,p)=>samples[Math.min(samples.length-1,Math.floor((samples.length-1)*p))];
const verifyP95=pct(verifySamples,0.95); const enforceP95=pct(enforceSamples,0.95);
const overhead=Math.max(0,enforceP95-verifyP95);
const summary={benchmark:'verify-vs-enforce-ucp-ap2',line_items:size,iterations,verify_p95_ms:Number(verifyP95.toFixed(3)),enforce_p95_ms:Number(enforceP95.toFixed(3)),enforcement_overhead_p95_ms:Number(overhead.toFixed(3)),overhead_ceiling_ms:overheadCeilingMs,node:process.version,platform:process.platform,arch:process.arch};
console.log(JSON.stringify(summary,null,2));
if(summary.enforcement_overhead_p95_ms>overheadCeilingMs){console.error(`Enforcement overhead p95 ${summary.enforcement_overhead_p95_ms}ms exceeds ${overheadCeilingMs}ms ceiling.`);process.exit(2);}
