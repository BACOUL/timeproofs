import { verifyTransaction } from '../../sdk/index.js';
import { sha256Base64UrlString } from '../canonical.js';

function assert(cond,msg){ if(!cond) throw new Error(msg); }
function rng(seed=0x5eed1234){ let x=seed>>>0; return ()=>{ x^=x<<13; x^=x>>>17; x^=x<<5; return (x>>>0)/0x100000000; }; }
const random=rng();
const at='2026-08-12T12:00:00Z';

function checkout(amount,currency='EUR',id='chk_prop'){
  return {
    ucp:{version:'2026-04-08',status:'success',payment_handlers:{},capabilities:{'dev.ucp.shopping.checkout':[{'version':'2026-04-08','schema':'https://ucp.dev/2026-04-08/schemas/shopping/checkout.json'}]}},
    id,line_items:[],status:'ready_for_complete',currency,
    totals:[{type:'subtotal',amount:Math.max(0,amount-100)},{type:'tax',amount:100},{type:'total',amount}],links:[]
  };
}
function payment(proof,amount,currency='EUR'){
  return {vct:'mandate.payment.1',transaction_id:sha256Base64UrlString(proof),payee:{id:'m_prop',name:'Merchant'},payment_amount:{currency,amount},payment_instrument:{type:'card',id:'pi_prop'}};
}
function verify(c,p,proof){ return verifyTransaction({checkout:c,paymentMandate:p,checkoutJwt:proof,evaluatedAt:at}); }

for(let i=0;i<250;i++){
  const amount=1+Math.floor(random()*5_000_000);
  const proof=`property-proof-${i}-${Math.floor(random()*1e9)}`;
  const c=checkout(amount,'EUR',`chk_${i}`);
  const p=payment(proof,amount,'EUR');

  const pass=verify(c,p,proof);
  assert(pass.decision==='PASS',`case ${i}: equal amount/currency with verified binding must PASS`);
  assert(pass.results.every(r=>r.status==='PASS'),`case ${i}: all initial invariants must PASS`);

  const delta=1+Math.floor(random()*10_000);
  const amountMismatch=verify(c,payment(proof,amount+delta,'EUR'),proof);
  assert(amountMismatch.decision==='BLOCK',`case ${i}: amount perturbation must BLOCK`);
  assert(amountMismatch.results.find(r=>r.invariant_id==='TP-CX-001')?.reason_code==='PAYMENT_TOTAL_MISMATCH',`case ${i}: amount mismatch reason drift`);

  const otherCurrency=i%2===0?'USD':'GBP';
  const currencyMismatch=verify(c,payment(proof,amount,otherCurrency),proof);
  assert(currencyMismatch.decision==='BLOCK',`case ${i}: currency perturbation must BLOCK`);
  assert(currencyMismatch.results.find(r=>r.invariant_id==='TP-CX-002')?.reason_code==='PAYMENT_CURRENCY_MISMATCH',`case ${i}: currency mismatch reason drift`);

  const bindingMismatch=verify(c,payment(`other-${proof}`,amount,'EUR'),proof);
  assert(bindingMismatch.decision==='BLOCK',`case ${i}: binding perturbation must BLOCK`);
  assert(bindingMismatch.results.find(r=>r.invariant_id==='TP-CX-003')?.reason_code==='EXACT_STATE_BINDING_MISMATCH',`case ${i}: binding mismatch reason drift`);

  const missingProof=verifyTransaction({checkout:c,paymentMandate:p,evaluatedAt:at});
  assert(missingProof.decision==='UNKNOWN',`case ${i}: absent proof must UNKNOWN`);
  assert(missingProof.results.find(r=>r.invariant_id==='TP-CX-003')?.unknown_reason==='INTEGRITY_UNVERIFIED',`case ${i}: missing proof reason drift`);

  const replay=verify(c,p,proof);
  assert(replay.evaluation_id===pass.evaluation_id,`case ${i}: fixed-input evaluation id must be deterministic`);
  assert(JSON.stringify(replay.results)===JSON.stringify(pass.results),`case ${i}: fixed-input results must be deterministic`);
}

console.log('TimeProofs deterministic property regression PASS (250 generated transaction families, 1,500+ assertions).');
