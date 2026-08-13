import fs from 'node:fs';
import { verifyProviderExecution } from '../../sdk/index.js';

function assert(cond,msg){if(!cond)throw new Error(msg);}
function expectThrow(fn,pattern,msg){let thrown=false;try{fn();}catch(e){thrown=true;if(pattern&&!pattern.test(e.message))throw new Error(`${msg}: unexpected error ${e.message}`);}if(!thrown)throw new Error(`${msg}: expected throw`);}

const corpus=JSON.parse(fs.readFileSync(new URL('../../fixtures/provider/stripe/v0.1/cases.json',import.meta.url),'utf8'));
for(const c of corpus.cases){
  const r=verifyProviderExecution({
    paymentMandate:c.payment_mandate,
    providerEvidence:c.provider_evidence,
    provider:corpus.profile.provider,
    providerVersion:corpus.profile.provider_version,
    bindingMetadataKey:corpus.profile.binding_metadata_key,
    evaluatedAt:'2026-08-13T10:00:00Z'
  });
  const first=r.results[0];
  assert(r.provider_evidence_contract_version==='timeproofs.provider-evidence.v0.1',`${c.name}: contract`);
  assert(r.decision===c.expected.decision,`${c.name}: expected ${c.expected.decision}, got ${r.decision}`);
  assert(first.reason_code===c.expected.reason_code,`${c.name}: expected ${c.expected.reason_code}, got ${first.reason_code}`);
  assert(r.execution_state===c.expected.execution_state,`${c.name}: expected state ${c.expected.execution_state}, got ${r.execution_state}`);
  assert(first.invariant_id==='TP-EV-001',`${c.name}: invariant id`);
}
const exact=corpus.cases.find(x=>x.name==='pass_succeeded_exact');
const a=verifyProviderExecution({paymentMandate:exact.payment_mandate,providerEvidence:exact.provider_evidence,evaluatedAt:'2026-08-13T10:00:00Z'});
const b=verifyProviderExecution({paymentMandate:exact.payment_mandate,providerEvidence:exact.provider_evidence,evaluatedAt:'2026-08-13T10:00:00Z'});
assert(a.decision===b.decision && a.execution_state===b.execution_state && a.results[0].reason_code===b.results[0].reason_code,'provider evaluation must be deterministic');
expectThrow(()=>verifyProviderExecution({paymentMandate:exact.payment_mandate,providerEvidence:exact.provider_evidence,provider:'adyen'}),/Unsupported provider/,'unsupported provider');
expectThrow(()=>verifyProviderExecution({paymentMandate:exact.payment_mandate,providerEvidence:exact.provider_evidence,providerVersion:'latest'}),/Unsupported Stripe API version/,'unpinned provider version');
console.log(`M8.1 provider evidence corpus PASS (${corpus.cases.length} cases)`);
