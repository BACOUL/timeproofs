import { enforceTransaction, applyEnforcementPolicy } from '../../sdk/index.js';
import { sha256Base64UrlString } from '../canonical.js';

function assert(cond,msg){if(!cond)throw new Error(msg);}
function checkout(amount=76000,currency='EUR') { return { ucp:{version:'2026-04-08',status:'success',payment_handlers:{},capabilities:{'dev.ucp.shopping.checkout':[{'version':'2026-04-08','schema':'https://ucp.dev/2026-04-08/schemas/shopping/checkout.json'}]}}, id:'chk_m8',line_items:[],status:'ready_for_complete',currency,totals:[{type:'total',amount}],links:[] }; }
function payment(jwt,amount=76000,currency='EUR') { return {vct:'mandate.payment.1',transaction_id:sha256Base64UrlString(jwt),payee:{id:'merchant_1'},payment_amount:{currency,amount},payment_instrument:{type:'card',id:'pi_1'}}; }

const jwt='header.payload.signature';
const base={checkout:checkout(),paymentMandate:payment(jwt),checkoutJwt:jwt,evaluatedAt:'2026-08-12T17:00:00Z'};

let r=enforceTransaction(base);
assert(r.state==='ALLOW' && r.allowed===true && r.verification_decision==='PASS','PASS must ALLOW');
assert(r.policy.deny_on.includes('UNKNOWN'),'default policy must deny UNKNOWN');

r=enforceTransaction({...base,paymentMandate:payment(jwt,81000)});
assert(r.state==='DENY' && !r.allowed && r.verification_decision==='BLOCK','BLOCK must DENY');

r=enforceTransaction({...base,checkoutJwt:null});
assert(r.state==='DENY' && !r.allowed && r.verification_decision==='UNKNOWN','UNKNOWN must DENY by default');

r=enforceTransaction({...base,checkoutJwt:null},{policy:{policy_id:'test.explicit.fail-open',deny_on:['BLOCK'],on_error:'ALLOW'}});
assert(r.state==='ALLOW' && r.allowed && r.verification_decision==='UNKNOWN','explicit fail-open may ALLOW UNKNOWN');
assert(r.policy.policy_id==='test.explicit.fail-open','fail-open policy must be auditable');

r=enforceTransaction({...base,checkout:null});
assert(r.state==='ERROR' && !r.allowed,'runtime/input error must not silently allow');
assert(r.reason_code==='ENFORCEMENT_EVALUATION_ERROR','error reason must be stable');

r=enforceTransaction({...base,checkout:null},{policy:{policy_id:'test.explicit.error-open',deny_on:['BLOCK'],on_error:'ALLOW'}});
assert(r.state==='ALLOW' && r.allowed && r.reason_code==='EXPLICIT_POLICY_ALLOW_ON_ERROR','error allow requires explicit auditable policy');

const warn=applyEnforcementPolicy({decision:'WARN',results:[]});
assert(warn.state==='ALLOW' && warn.allowed,'WARN must ALLOW under default policy');

console.log('M8 enforcement policy + SDK tests PASS');
