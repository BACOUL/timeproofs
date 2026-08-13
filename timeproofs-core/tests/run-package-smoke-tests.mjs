import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';

function run(command,args,{cwd=process.cwd(),env={}}={}) {
  return new Promise((resolve,reject)=>{
    const child=spawn(command,args,{cwd,env:{...process.env,...env},stdio:['ignore','pipe','pipe'],shell:process.platform==='win32'});
    let stdout='',stderr='';
    child.stdout.on('data',d=>stdout+=d);
    child.stderr.on('data',d=>stderr+=d);
    child.on('error',reject);
    child.on('close',code=>resolve({code,stdout,stderr}));
  });
}
function assert(condition,message){if(!condition)throw new Error(message);}

const staging=await fs.mkdtemp(path.join(os.tmpdir(),'timeproofs-package-stage-'));
let r=await run(process.execPath,['scripts/build-timeproofs-package.mjs',staging]);
assert(r.code===0,`package build failed: ${r.stderr}`);

const tree=[];
async function walk(dir,prefix=''){
  for(const entry of await fs.readdir(dir,{withFileTypes:true})){
    const rel=path.posix.join(prefix,entry.name);
    if(entry.isDirectory()) await walk(path.join(dir,entry.name),rel); else tree.push(rel);
  }
}
await walk(staging);
for(const forbidden of ['agentready-core','agentready','docs/agentready','packaging/agentready-community']){
  assert(!tree.some(p=>p.toLowerCase().includes(forbidden)),`legacy AgentReady content leaked into package: ${forbidden}`);
}
for(const required of ['package.json','bin/timeproofs.js','sdk/index.js','sdk/enforcement.js','schemas/timeproofs-enforcement.v0.1.schema.json','schemas/timeproofs-provider-evidence.v0.1.schema.json','adapters/ucp/checkout.js','adapters/ap2/payment-mandate.js','adapters/stripe/payment-intent.js','timeproofs-core/index.js','LICENSE']){
  assert(tree.includes(required),`missing package file: ${required}`);
}

r=await run('npm',['pack','--json'],{cwd:staging});
assert(r.code===0,`npm pack failed: ${r.stderr}`);
const packed=JSON.parse(r.stdout);
const tarName=packed?.[0]?.filename;
assert(tarName,'npm pack did not report tarball filename');
const tarball=path.join(staging,tarName);

const consumer=await fs.mkdtemp(path.join(os.tmpdir(),'timeproofs-consumer-'));
await fs.writeFile(path.join(consumer,'package.json'),JSON.stringify({name:'timeproofs-consumer-smoke',private:true,type:'module'}));
r=await run('npm',['install','--ignore-scripts',tarball],{cwd:consumer});
assert(r.code===0,`clean-room npm install failed: ${r.stderr}`);

const smoke=`import { verifyTransaction, enforceTransaction, verifyProviderExecution } from '@timeproofs/verify-preview';\nimport crypto from 'node:crypto';\nconst proof='consumer-proof';\nconst tid=crypto.createHash('sha256').update(proof).digest('base64url');\nconst checkout={ucp:{version:'2026-04-08'},id:'c',line_items:[],status:'ready_for_complete',currency:'EUR',totals:[{type:'total',amount:10}],links:[]};\nconst payment={vct:'mandate.payment.1',transaction_id:tid,payee:{name:'M'},payment_amount:{currency:'EUR',amount:10},payment_instrument:{type:'CARD',id:'x'}};\nconst input={checkout,paymentMandate:payment,checkoutJwt:proof,evaluatedAt:'2026-08-13T10:00:00Z'};\nconst r=verifyTransaction(input);\nif(r.decision!=='PASS') throw new Error('expected PASS');\nif(r.result_contract_version!=='timeproofs.result.v0.1') throw new Error('wrong verify contract');\nconst gate=enforceTransaction(input);\nif(gate.state!=='ALLOW'||gate.allowed!==true||gate.verification_decision!=='PASS') throw new Error('expected enforcement ALLOW');\nif(gate.enforcement_contract_version!=='timeproofs.enforcement.v0.1') throw new Error('wrong enforcement contract');\nconst unknown=enforceTransaction({...input,checkoutJwt:null});\nif(unknown.state!=='DENY'||unknown.allowed!==false||unknown.verification_decision!=='UNKNOWN') throw new Error('default enforcement must fail closed on UNKNOWN');\nconst pi={id:'pi_consumer',object:'payment_intent',amount:10,amount_received:10,currency:'eur',status:'succeeded',capture_method:'automatic',latest_charge:'ch_consumer',livemode:false,metadata:{timeproofs_ap2_transaction_id:tid}};\nconst provider=verifyProviderExecution({paymentMandate:payment,providerEvidence:pi,providerVersion:'2026-02-25.clover',evaluatedAt:'2026-08-13T10:00:00Z'});\nif(provider.decision!=='PASS'||provider.execution_state!=='EXECUTED_CONSISTENT') throw new Error('expected provider evidence PASS');\nif(provider.provider_evidence_contract_version!=='timeproofs.provider-evidence.v0.1') throw new Error('wrong provider evidence contract');\nconsole.log('SDK VERIFY+ENFORCE+PROVIDER_EVIDENCE PASS');\n`;
await fs.writeFile(path.join(consumer,'smoke.mjs'),smoke);
r=await run(process.execPath,['smoke.mjs'],{cwd:consumer});
assert(r.code===0,`clean-room SDK smoke failed: ${r.stderr}`);

const bin=process.platform==='win32'?path.join(consumer,'node_modules','.bin','timeproofs.cmd'):path.join(consumer,'node_modules','.bin','timeproofs');
r=await run(bin,['--help'],{cwd:consumer});
assert(r.code===0 && r.stdout.includes('TimeProofs'),`clean-room CLI help failed: ${r.stderr}`);

console.log('TimeProofs package clean-room smoke PASS');
