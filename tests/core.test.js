import test from 'node:test';
import assert from 'node:assert/strict';
import {generateKeyPairSync,sign} from 'node:crypto';
import {EvidenceResolver,ProofCaseVerifier,profiles,fingerprint} from '../src/core.js';
import {demoCase,demoVerify,fixture,demoResolver} from '../src/demo.js';
const NOW=1790964000;
const clone=structuredClone;
const input=()=>({profile:'authorized_purchase/v1',action:clone(fixture.action),evidence:clone(fixture.evidence)});
const resolver=()=>demoResolver(()=>NOW);
function signedMutation(index,mutate,policyMutate=()=>{}){
 const data=input(),policy=clone(fixture.policy),e=data.evidence[index];
 const [h,p]=e.token.split('.').slice(0,2).map(s=>JSON.parse(Buffer.from(s,'base64url').toString()));
 const pair=generateKeyPairSync('ed25519');policy.keys.find(k=>k.kid===h.kid).jwk=pair.publicKey.export({format:'jwk'});
 for(const other of data.evidence){if(other===e)continue;const [header,body]=other.token.split('.');const decoded=JSON.parse(Buffer.from(header,'base64url'));if(decoded.kid===h.kid){const unsigned=header+'.'+body;other.token=unsigned+'.'+sign(null,Buffer.from(unsigned),pair.privateKey).toString('base64url');}}
 mutate(p,h);policyMutate(policy);
 const b=v=>Buffer.from(JSON.stringify(v)).toString('base64url');const unsigned=b(h)+'.'+b(p);e.token=unsigned+'.'+sign(null,Buffer.from(unsigned),pair.privateKey).toString('base64url');
 return new EvidenceResolver({policy,clock:()=>NOW}).resolve(data);
}
test('reference transitions: 3/5 → 4/5 → 5/5 with independent verification',()=>{
 for(const [stage,status,count]of [[0,'INCOMPLETE',3],[1,'INCOMPLETE',4],[2,'SATISFIED',5]]){const c=demoCase(stage,()=>NOW);assert.equal(c.resolution.status,status);assert.equal(c.resolution.satisfied,count);assert.equal(demoVerify(c,()=>NOW).recordedMatches,true);assert.equal(demoVerify(c,()=>NOW).valid,stage===2);}
});
test('resolver acquisition adds only missing artifacts in dependency order',async()=>{
 const initial={...input(),evidence:fixture.evidence.slice(0,3)};const result=await resolver().collect(initial);assert.deepEqual(result.events.map(e=>e.requirement),['execution','outcome']);assert.equal(result.after.status,'SATISFIED');assert.equal(result.evidence.length,5);
});
test('missing evidence produces actionable requests, receipt alone is insufficient',()=>{const d=input();d.evidence=[d.evidence[3]];const r=resolver().resolve(d);assert.equal(r.status,'INCOMPLETE');assert.equal(r.requirements[3].status,'BLOCKED');assert.equal(r.missing.length,5);assert.equal(r.missing[0].request.actionDigest,fingerprint(d.action));});
test('two formats contribute to the same profile',()=>{const r=resolver().resolve(input());assert.equal(r.status,'SATISFIED');assert.deepEqual(new Set(r.evidenceResults.map(r=>r.format)),new Set(['jwt','vc-jwt']));});
test('all other profiles fail closed rather than empty-set satisfaction',()=>{for(const p of profiles.slice(1))assert.equal(resolver().resolve({...input(),profile:p.id}).status,'UNSUPPORTED');assert.equal(resolver().resolve({...input(),profile:'unknown/v1'}).status,'UNSUPPORTED');});
test('tampered payload rejected',()=>{const d=input();const e=d.evidence[0];const [h,p,s]=e.token.split('.');const claims=JSON.parse(Buffer.from(p,'base64url'));claims.limit_minor='9999999';e.token=[h,Buffer.from(JSON.stringify(claims)).toString('base64url'),s].join('.');assert.equal(resolver().resolve(d).status,'INVALID');});
test('wrong action, merchant, amount or currency invalidates binding',()=>{for(const [key,value]of [['id','another'],['agent','agent:evil'],['merchant','evil'],['amount_minor','1'],['currency','USD']]){const d=input();d.action[key]=value;assert.equal(resolver().resolve(d).status,'INVALID');}});
test('amounts must be exact positive integer strings',()=>{for(const n of [2800000,'28.00','-1','0','02800000','9999999999999999999']){const d=input();d.action.amount_minor=n;assert.throws(()=>resolver().resolve(d));}});
test('valid signed insufficient authority produces conflict',()=>{assert.equal(signedMutation(0,p=>p.limit_minor='2700000').status,'CONFLICT');});
test('valid signed false authorization produces conflict',()=>{assert.equal(signedMutation(0,p=>p.authorized=false).status,'CONFLICT');});
test('valid signed execution at wrong amount produces conflict',()=>{assert.equal(signedMutation(3,p=>p.amount_minor='2799999').status,'CONFLICT');});
test('valid signed outcome with different transaction produces conflict',()=>{assert.equal(signedMutation(4,p=>p.transaction_id='another-payment').status,'CONFLICT');});
test('valid signed wrong issuer role rejected',()=>{assert.equal(signedMutation(3,p=>p.role='authority').status,'INVALID');});
test('expired/not-yet-valid JWT and wrong audience/subject/jti rejected',()=>{for(const mutation of [p=>p.exp=NOW,p=>p.nbf=NOW+100,p=>p.iat=NOW+100,p=>p.aud='other',p=>p.sub='evil',p=>p.jti='',p=>delete p.exp])assert.equal(signedMutation(0,mutation).status,'INVALID');});
test('none algorithm, embedded keys, critical extensions rejected',()=>{for(const mutation of [(p,h)=>h.alg='none',(p,h)=>h.jwk={kty:'OKP'},(p,h)=>h.crit=['danger'],(p,h)=>h.jku='https://evil', (p,h)=>h.b64=false])assert.equal(signedMutation(0,mutation).status,'UNSUPPORTED');});
test('revoked and unknown issuer keys fail closed',()=>{const policy=clone(fixture.policy);policy.keys[0].revoked=true;assert.equal(new EvidenceResolver({policy,clock:()=>NOW}).resolve(input()).status,'INVALID');policy.keys=[];assert.equal(new EvidenceResolver({policy,clock:()=>NOW}).resolve(input()).status,'INVALID');});
test('key lifecycle activation and retirement enforced',()=>{assert.equal(signedMutation(0,()=>{},policy=>policy.keys[0].notBefore=NOW).status,'INVALID');assert.equal(signedMutation(0,()=>{},policy=>policy.keys[0].notAfter=NOW).status,'INVALID');});
test('key rotation accepts new independently pinned kid',()=>{assert.equal(signedMutation(0,(p,h)=>h.kid='rotated-key',policy=>policy.keys[0].kid='rotated-key').status,'SATISFIED');});
test('duplicate/replayed evidence rejected',()=>{const d=input();d.evidence.push(clone(d.evidence[0]));assert.equal(resolver().resolve(d).status,'INVALID');d.evidence.at(-1).id='different';assert.equal(resolver().resolve(d).status,'INVALID');});
test('valid contradictory claims are not silently cherry-picked',()=>{const d=input();const p=clone(fixture.policy),key=generateKeyPairSync('ed25519');p.keys[0].jwk=key.publicKey.export({format:'jwk'});const old=d.evidence[0];const [h,part]=old.token.split('.');const claims=JSON.parse(Buffer.from(part,'base64url'));function wrap(c,id){const unsigned=h+'.'+Buffer.from(JSON.stringify(c)).toString('base64url');return {id,format:'jwt',token:unsigned+'.'+sign(null,Buffer.from(unsigned),key.privateKey).toString('base64url')};}d.evidence[0]=wrap(claims,'authority');d.evidence.push(wrap({...claims,jti:'different',limit_minor:'2700000'},'contradiction'));assert.equal(new EvidenceResolver({policy:p,clock:()=>NOW}).resolve(d).status,'CONFLICT');});
test('unsupported evidence format cannot satisfy requirement',()=>{const d=input();d.evidence[1].format='ap2';assert.equal(resolver().resolve(d).status,'UNSUPPORTED');});
test('malformed evidence is rejected without crashing',()=>{for(const bad of [null,{}, {id:'x',format:'jwt',token:'bad'}, {id:'x',format:'jwt',token:'a.a.a'}]){const d=input();d.evidence.push(bad);assert.notEqual(resolver().resolve(d).status,'SATISFIED');}});
test('VC status and mismatched credential subject not treated as supported',()=>{assert.equal(signedMutation(1,p=>p.vc.credentialStatus={id:'https://example.com/status',type:'StatusList2021Entry'}).status,'UNSUPPORTED');assert.equal(signedMutation(1,p=>p.vc.credentialSubject.id='evil').status,'INVALID');});
test('case result, totals and requirements cannot be forged',()=>{for(const mutate of [c=>c.resolution.satisfied=100,c=>c.resolution.status='INCOMPLETE',c=>c.resolution.requirements[0].status='MISSING',c=>c.resolution.policy='forged',c=>c.resolution.evaluatedAt=NOW+1,c=>c.evidence.pop()]){const c=demoCase(2,()=>NOW);mutate(c);assert.equal(demoVerify(c,()=>NOW).valid,false);}});
test('uploaded trust policy cannot inject attacker keys',()=>{const c=demoCase(2,()=>NOW);c.policy={keys:[]};const policy=clone(fixture.policy);policy.keys=[];assert.equal(new ProofCaseVerifier({policy,clock:()=>NOW}).verify(c).valid,false);});
test('current revocation overrides previously satisfied case',()=>{const c=demoCase(2,()=>NOW);const p=clone(fixture.policy);p.keys[0].revoked=true;assert.equal(new ProofCaseVerifier({policy:p,clock:()=>NOW}).verify(c).valid,false);});
test('expired historical case does not stay satisfied',()=>{const c=demoCase(2,()=>NOW);assert.equal(demoVerify(c,()=>1820016001).valid,false);});
test('collector unavailable returns incomplete and structured acquisition failure',async()=>{const r=new EvidenceResolver({policy:fixture.policy,clock:()=>NOW,collectors:{execution:async()=>{throw new Error('secret should not appear');}}});const output=await r.collect({...input(),evidence:fixture.evidence.slice(0,3)});assert.equal(output.after.status,'INCOMPLETE');assert.equal(output.events[0].status,'COLLECTION_FAILED');assert.ok(!JSON.stringify(output.events).includes('secret'));});
test('strict policy rejects private or ambiguous keys',()=>{const p=clone(fixture.policy);p.keys[0].jwk.d='secret';assert.throws(()=>new EvidenceResolver({policy:p}));const q=clone(fixture.policy);q.keys.push(q.keys[0]);assert.throws(()=>new EvidenceResolver({policy:q}));});
test('profile is deeply immutable and fingerprint changes with evidence/action',()=>{assert.throws(()=>profiles[0].requirements[0].checks.push({}));assert.notEqual(fingerprint(fixture.action),fingerprint({...fixture.action,id:'other'}));});
