import { enforceTransaction, applyEnforcementPolicy } from '../../sdk/index.js';
import { sha256Base64UrlString } from '../canonical.js';

function assert(cond,msg){if(!cond)throw new Error(msg);}
function expectThrow(fn,pattern,msg){let thrown=false;try{fn();}catch(e){thrown=true;if(pattern&&!pattern.test(e.message))throw new Error(`${msg}: unexpected error ${e.message}`);}if(!thrown)throw new Error(`${msg}: expected throw`);}
function checkout(amount=76000,currency='EUR') { return { ucp:{version:'2026-04-08',status:'success',payment_handlers:{},capabilities:{'dev.ucp.shopping.checkout':[{'version':'2026-04-08','schema':'https://ucp.dev/2026-04-08/schemas/shopping/checkout.json'}]}}, id:'chk_m8',line_items:[],status:'ready_for_complete',currency,totals:[{type:'total',amount}],links:[] }; }
function payment(jwt,amount=76000,currency='EUR') { return {vct:'mandate.payment.1',transaction_id:sha256Base64UrlString(jwt),payee:{id:'merchant_1'},payment_amount:{currency,amount},payment_instrument:{type:'card',id:'pi_1'}}; }

const jwt='header.payload.signature';
const base={checkout:checkout(),paymentMandate:payment(jwt),checkoutJwt:jwt,evaluatedAt:'2026-08-12T17:00:00Z'};

let r=enforceTransaction(base);
assert(r.state==='ALLOW' && r.allowed===true && r.verification_decision==='PASS','PASS must ALLOW');
assert(r.policy.deny_on.includes('UNKNOWN'),'default policy must deny UNKNOWN');
assert(Object.isFrozen(r),'enforcement envelope must be frozen');
assert(Object.isFrozen(r.policy) && Object.isFrozen(r.policy.deny_on),'normalized policy must be frozen');

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

for (const invalid of [true,42,'fail-open',[],()=>{}]) {
  expectThrow(()=>applyEnforcementPolicy({decision:'PASS'},invalid),/plain object/,'non-object policy');
}
expectThrow(()=>applyEnforcementPolicy({decision:'PASS'},{deny_on:['NOT_A_DECISION']}),/deny_on/,'unknown decision in deny_on');
expectThrow(()=>applyEnforcementPolicy({decision:'PASS'},{deny_on:'BLOCK'}),/deny_on/,'deny_on must be array');
expectThrow(()=>applyEnforcementPolicy({decision:'PASS'},{on_error:'IGNORE'}),/on_error/,'unknown on_error');
expectThrow(()=>applyEnforcementPolicy({decision:'PASS'},{policy_id:'',deny_on:['BLOCK','UNKNOWN']}),/policy_id/,'empty policy id');
expectThrow(()=>applyEnforcementPolicy({decision:'UNKNOWN'},{deny_on:['BLOCK'],on_error:'ERROR'}),/explicit policy_id/,'UNKNOWN fail-open requires named policy');
expectThrow(()=>applyEnforcementPolicy({decision:'BLOCK'},{deny_on:['UNKNOWN'],on_error:'ERROR'}),/explicit policy_id/,'BLOCK fail-open requires named policy');
expectThrow(()=>applyEnforcementPolicy({decision:'PASS'},{deny_on:['BLOCK','UNKNOWN'],on_error:'ALLOW'}),/explicit policy_id/,'error fail-open requires named policy');
expectThrow(()=>applyEnforcementPolicy({decision:'MAYBE'}),/verification.decision/,'unexpected verification decision');
expectThrow(()=>applyEnforcementPolicy(null),/verification.decision/,'missing verification decision');

const mutablePolicy={policy_id:'test.snapshot',deny_on:['BLOCK','UNKNOWN'],on_error:'ERROR'};
r=applyEnforcementPolicy({decision:'PASS',results:[]},mutablePolicy);
mutablePolicy.deny_on.length=0;
mutablePolicy.on_error='ALLOW';
mutablePolicy.policy_id='changed';
assert(r.state==='ALLOW' && r.allowed===true,'decision envelope must remain stable');
assert(r.policy.policy_id==='test.snapshot','normalized policy id must be snapshotted');
assert(r.policy.deny_on.includes('BLOCK') && r.policy.deny_on.includes('UNKNOWN'),'normalized deny_on must be snapshotted');
assert(r.policy.on_error==='ERROR','normalized on_error must be snapshotted');

const first=enforceTransaction(base);
for(let i=0;i<25;i++){
  const next=enforceTransaction(base);
  assert(next.state===first.state && next.allowed===first.allowed && next.reason_code===first.reason_code && next.verification_decision===first.verification_decision,'enforcement must be deterministic');
}

console.log('M8 enforcement policy + adversarial SDK tests PASS');
