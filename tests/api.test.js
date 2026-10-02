import test from 'node:test';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {mkdtemp,writeFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {fixture} from '../src/demo.js';
import {TimeProofs} from '../sdk/index.js';
test('SDK HTTP, durable cases, private access, sandbox verification and limits',async()=>{
 const dir=await mkdtemp(path.join(tmpdir(),'tp-test-'));const policyPath=path.join(dir,'policy.json');await writeFile(policyPath,JSON.stringify(fixture.policy));const secret='x'.repeat(40);const child=spawn(process.execPath,['src/server.js'],{env:{...process.env,PORT:'31871',TRUST_POLICY_FILE:policyPath,TIMEPROOFS_API_KEY:secret,TIMEPROOFS_DATA_DIR:path.join(dir,'data')},stdio:['ignore','pipe','pipe']});
 await new Promise((resolve,reject)=>{child.stdout.once('data',resolve);child.once('error',reject);child.once('exit',code=>reject(new Error('Server stopped: '+code)));});
 const client=new TimeProofs({baseUrl:'http://127.0.0.1:31871',apiKey:secret});const url=client.baseUrl;
 try{
 assert.equal((await client.profiles()).length,5);assert.equal((await client.profile('authorized_purchase/v1')).requirements.length,5);
 const d=await client.demo(0);assert.equal(d.proofCase.resolution.satisfied,3);
 const unauth=await fetch(url+'/v1/cases',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({})});assert.equal(unauth.status,401);
 const c=await client.createCase({profile:'authorized_purchase/v1',action:fixture.action,evidence:fixture.evidence.slice(0,3)});assert.equal(c.resolution.status,'INCOMPLETE');
 const [a,b]=await Promise.all([client.addEvidence(c.id,[fixture.evidence[3]]),client.addEvidence(c.id,[fixture.evidence[4]])]);const final=await client.getCase(c.id);assert.equal(final.evidence.length,5);assert.equal(final.resolution.status,'SATISFIED');assert.equal((await client.verify(final)).valid,true);
 assert.equal((await fetch(url+'/v1/verify',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({proofCase:final,policy:fixture.policy})})).status,400);
 assert.equal((await fetch(url+'/v1/demo',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({stage:7})})).status,400);
 assert.equal((await fetch(url+'/v1/demo',{method:'POST',headers:{'Content-Type':'application/json'},body:'{"bad":'})).status,400);
 assert.equal((await fetch(url+'/v1/demo',{method:'POST',headers:{'Content-Type':'application/json'},body:' '.repeat(270000)})).status,413);
 const exported=await fetch(url+'/v1/export',{method:'POST',body:new URLSearchParams({proofCase:JSON.stringify(final)})});assert.equal(exported.status,200);assert.match(exported.headers.get('content-disposition'),/^attachment;/);assert.deepEqual(await exported.json(),final);
 const changed=structuredClone(final);changed.action.amount_minor='2900000';assert.equal((await fetch(url+'/v1/export',{method:'POST',body:new URLSearchParams({proofCase:JSON.stringify(changed)})})).status,400);
 const retrieved=JSON.parse(await import('node:fs/promises').then(fs=>fs.readFile(path.join(dir,'data',c.id+'.json'),'utf8')));assert.equal(retrieved.id,c.id);assert.equal(retrieved.resolution.satisfied,5);
 for(const route of ['/','/demo','/verify','/profiles/authorized_purchase/v1','/developers','/docs','/integrations','/pricing','/security','/about'])assert.equal((await fetch(url+route)).status,200);
 const headers=(await fetch(url+'/')).headers;assert.ok(headers.get('content-security-policy').includes("script-src 'self'"));
 let limited=false;for(let i=0;i<65;i++){if((await fetch(url+'/v1/profiles')).status===429){limited=true;break;}}assert.equal(limited,true);
 }finally{child.kill();await new Promise(resolve=>child.once('exit',resolve));await rm(dir,{recursive:true,force:true});}
});
