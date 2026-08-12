import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { verifyTransaction } from '../../sdk/index.js';
import { sha256Base64UrlString } from '../canonical.js';
import { runTimeProofsCli } from '../../cli/timeproofs.js';

function checkout(amount=76000,currency='EUR') {
  return {
    ucp:{version:'2026-04-08',status:'success',payment_handlers:{},capabilities:{'dev.ucp.shopping.checkout':[{'version':'2026-04-08','schema':'https://ucp.dev/2026-04-08/schemas/shopping/checkout.json'}]}},
    id:'chk_123', line_items:[], status:'ready_for_complete', currency,
    totals:[{type:'subtotal',amount:70000},{type:'tax',amount:6000},{type:'total',amount}], links:[]
  };
}
function payment(jwt,amount=76000,currency='EUR') {
  return {vct:'mandate.payment.1',transaction_id:sha256Base64UrlString(jwt),payee:{id:'merchant_1',name:'Merchant'},payment_amount:{currency,amount},payment_instrument:{type:'card',id:'pi_1'}};
}
function assert(cond,msg){if(!cond)throw new Error(msg);}

const jwt='header.payload.signature';
let r=verifyTransaction({checkout:checkout(),paymentMandate:payment(jwt),checkoutJwt:jwt,evaluatedAt:'2026-08-12T06:00:00Z'});
assert(r.decision==='PASS','SDK PASS transaction must PASS');
assert(r.results.every(x=>x.status==='PASS'),'all initial invariants must PASS');
assert(r.metadata.adapters.length===2,'adapter metadata missing');
assert(r.graph.objects.every(o=>o.snapshot.digest.value.length===64),'SHA-256 snapshots missing');

r=verifyTransaction({checkout:checkout(),paymentMandate:payment(jwt,81000),checkoutJwt:jwt,evaluatedAt:'2026-08-12T06:00:00Z'});
assert(r.decision==='BLOCK','amount mismatch must BLOCK');
assert(r.results.find(x=>x.invariant_id==='TP-CX-001')?.reason_code==='PAYMENT_TOTAL_MISMATCH','amount mismatch reason missing');

r=verifyTransaction({checkout:checkout(),paymentMandate:payment('different'),checkoutJwt:jwt,evaluatedAt:'2026-08-12T06:00:00Z'});
assert(r.decision==='BLOCK','binding mismatch must BLOCK');
assert(r.results.find(x=>x.invariant_id==='TP-CX-003')?.reason_code==='EXACT_STATE_BINDING_MISMATCH','binding mismatch reason missing');

r=verifyTransaction({checkout:checkout(),paymentMandate:payment(jwt),evaluatedAt:'2026-08-12T06:00:00Z'});
assert(r.decision==='UNKNOWN','missing checkout JWT must UNKNOWN');
assert(r.results.find(x=>x.invariant_id==='TP-CX-003')?.unknown_reason==='INTEGRITY_UNVERIFIED','missing binding evidence reason missing');

let unsupported=false;
try { verifyTransaction({checkout:{...checkout(),ucp:{...checkout().ucp,version:'2027-01-01'}},paymentMandate:payment(jwt),checkoutJwt:jwt}); }
catch(e){unsupported=e.code==='UNSUPPORTED_VERSION';}
assert(unsupported,'unsupported UCP version must be rejected by adapter');

const dir=await fs.mkdtemp(path.join(os.tmpdir(),'timeproofs-m6-'));
const checkoutPath=path.join(dir,'checkout.json');
const paymentPath=path.join(dir,'payment.json');
await fs.writeFile(checkoutPath,JSON.stringify(checkout()));
await fs.writeFile(paymentPath,JSON.stringify(payment(jwt)));
let stdout='',stderr='';
const code=await runTimeProofsCli(['verify','--checkout',checkoutPath,'--payment-mandate',paymentPath,'--checkout-jwt',jwt,'--json'],{stdout:{write:s=>stdout+=s},stderr:{write:s=>stderr+=s}});
assert(code===0,`CLI PASS exit expected 0 got ${code}: ${stderr}`);
const parsed=JSON.parse(stdout);
assert(parsed.decision==='PASS','CLI JSON decision must PASS');

stdout='';stderr='';
const unknownCode=await runTimeProofsCli(['verify','--checkout',checkoutPath,'--payment-mandate',paymentPath,'--json'],{stdout:{write:s=>stdout+=s},stderr:{write:s=>stderr+=s}});
assert(unknownCode===3,'CLI UNKNOWN exit must be 3');
assert(JSON.parse(stdout).decision==='UNKNOWN','CLI missing binding evidence must UNKNOWN');

console.log('M6 adapters + SDK + CLI tests PASS');
