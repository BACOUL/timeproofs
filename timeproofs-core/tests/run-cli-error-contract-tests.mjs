import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { runTimeProofsCli } from '../../cli/timeproofs.js';
import { sha256Base64UrlString } from '../canonical.js';

function assert(cond,msg){if(!cond)throw new Error(msg);}
async function run(args){let stdout='',stderr='';const code=await runTimeProofsCli(args,{stdout:{write:s=>stdout+=s},stderr:{write:s=>stderr+=s}});return{code,stdout,stderr};}
const dir=await fs.mkdtemp(path.join(os.tmpdir(),'timeproofs-errors-'));
const proof='error-contract-proof';
const checkout={ucp:{version:'2026-04-08'},id:'chk_err',line_items:[],status:'ready_for_complete',currency:'EUR',totals:[{type:'total',amount:1000}],links:[]};
const payment={vct:'mandate.payment.1',transaction_id:sha256Base64UrlString(proof),payee:{name:'Merchant'},payment_amount:{currency:'EUR',amount:1000},payment_instrument:{type:'card',id:'pi'}};
const cp=path.join(dir,'checkout.json'),pp=path.join(dir,'payment.json'),bad=path.join(dir,'bad.json');
await fs.writeFile(cp,JSON.stringify(checkout));await fs.writeFile(pp,JSON.stringify(payment));await fs.writeFile(bad,'{bad json');

let r=await run(['verify','--payment-mandate',pp]);
assert(r.code===1&&r.stderr.includes('--checkout is required'),'missing checkout must be actionable input error');
r=await run(['verify','--checkout',cp]);
assert(r.code===1&&r.stderr.includes('--payment-mandate is required'),'missing payment must be actionable input error');
r=await run(['verify','--checkout',bad,'--payment-mandate',pp]);
assert(r.code===1&&r.stderr.includes('Cannot read JSON'),'malformed JSON must identify parsing/read failure');
r=await run(['verify','--checkout',cp,'--payment-mandate',pp,'--json']);
assert(r.code===3,'missing binding proof must preserve UNKNOWN exit 3');
assert(JSON.parse(r.stdout).decision==='UNKNOWN','UNKNOWN must remain machine-readable');
r=await run(['verify','--checkout',cp,'--payment-mandate',pp,'--checkout-jwt','wrong','--json']);
assert(r.code===2,'binding mismatch must preserve BLOCK exit 2');
assert(JSON.parse(r.stdout).decision==='BLOCK','BLOCK must remain machine-readable');
const unsupported={...checkout,ucp:{...checkout.ucp,version:'2099-01-01'}};
const up=path.join(dir,'unsupported.json');await fs.writeFile(up,JSON.stringify(unsupported));
r=await run(['verify','--checkout',up,'--payment-mandate',pp,'--checkout-jwt',proof]);
assert(r.code===4&&r.stderr.includes('Unsupported UCP version'),'unsupported profile must use exit 4 with profile context');
r=await run(['nonsense']);
assert(r.code===1&&r.stderr.includes('Unknown command'),'unknown command must be explicit');

console.log('TimeProofs CLI error/decision contract PASS.');
