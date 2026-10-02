import {createHash, createPublicKey, verify as cryptoVerify, randomUUID} from 'node:crypto';
import {getProfile, profiles} from './profiles.js';
export {profiles, getProfile};
export const ENGINE_VERSION='2.0.0-alpha.1';
export const LIMITATION='SATISFIED means requirements satisfied under a specific profile and trust policy, not truth, legality, compliance or legal admissibility.';
export function canonical(value){
 if(value===null || typeof value==='boolean') return JSON.stringify(value);
 if(typeof value==='string'){if(/[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/u.test(value)) throw new Error('Invalid Unicode');return JSON.stringify(value);}
 if(typeof value==='number'){if(!Number.isFinite(value))throw new Error('Nonfinite JSON'); return JSON.stringify(value);}
 if(Array.isArray(value))return '['+value.map(canonical).join(',')+']';
 if(value && typeof value==='object' && [Object.prototype,null].includes(Object.getPrototypeOf(value)))return '{'+Object.keys(value).sort().map(k=>canonical(k)+':'+canonical(value[k])).join(',')+'}';
 throw new Error('JSON value required');
}
export const fingerprint = v=> 'sha256:'+createHash('sha256').update(canonical(v)).digest('hex');
const fail=(code,message)=>({valid:false,status:code,reason:message});
const nonempty=v=>typeof v==='string'&&v.length>0&&v.length<=512;
const minor=v=>typeof v==='string'&&/^(0|[1-9][0-9]{0,17})$/.test(v);
export function validateAction(action,profile){
 if(!action||typeof action!=='object'||Array.isArray(action))throw new Error('Action object required');
 for(const f of profile.requiredActionFields)if(!nonempty(action[f]))throw new Error(`Action field required: ${f}`);
 if(action.type!==profile.actionType)throw new Error('Action type does not match profile');
 if(!minor(action.amount_minor)||BigInt(action.amount_minor)<=0n)throw new Error('amount_minor must be positive integer string');
 if(!/^[A-Z]{3}$/.test(action.currency))throw new Error('Currency must have three uppercase letters');
 if(Object.keys(action).some(k=>!profile.requiredActionFields.includes(k)))throw new Error('Unknown action field');
 canonical(action);
}
function decode(part){if(!/^[A-Za-z0-9_-]+$/.test(part)||Buffer.from(part,'base64url').toString('base64url')!==part)throw new Error('Invalid base64url');return JSON.parse(Buffer.from(part,'base64url').toString('utf8'));}
function verifyJwt(e,ctx){
 try{
 if(!nonempty(e.id)||typeof e.token!=='string'||e.token.length>32768)return fail('INVALID','Evidence id/token malformed');
 const parts=e.token.split('.');if(parts.length!==3)return fail('INVALID','Compact JWS required');
 const h=decode(parts[0]), p=decode(parts[1]);
 if(h.alg!=='EdDSA'||h.crit||h.jku||h.jwk||h.x5u||h.b64!==undefined)return fail('UNSUPPORTED','Only EdDSA compact JWS with pinned keys; no remote or embedded key');
 if(h.typ!=='JWT'||!nonempty(h.kid)||!nonempty(p.iss))return fail('INVALID','JWT type, kid and issuer required');
 const key=ctx.policy.keys.find(k=>k.kid===h.kid&&k.issuer===p.iss);
 if(!key)return fail('INVALID','Issuer key is not independently trusted');
 if(key.revoked)return fail('INVALID','Issuer key revoked');
 const publicKey=createPublicKey({key:key.jwk,format:'jwk'});
 if(publicKey.asymmetricKeyType!=='ed25519')return fail('UNSUPPORTED','Only Ed25519 keys supported');
 if(!/^[A-Za-z0-9_-]{86}$/.test(parts[2])||Buffer.from(parts[2],'base64url').toString('base64url')!==parts[2]||!cryptoVerify(null,Buffer.from(parts[0]+'.'+parts[1]),publicKey,Buffer.from(parts[2],'base64url')))return fail('INVALID','Invalid issuer signature');
 const now=ctx.now;
 if(p.aud!==ctx.policy.audience || p.sub!==ctx.action.agent || !nonempty(p.jti))return fail('INVALID','Audience, subject or evidence identifier mismatch');
 if(!Number.isSafeInteger(p.iat)||!Number.isSafeInteger(p.nbf)||!Number.isSafeInteger(p.exp)||p.iat>now||p.nbf>now||p.exp<=now||p.exp<=p.iat||p.nbf>p.exp)return fail('INVALID','Invalid or expired temporal claims');
 if((key.notBefore!==undefined&&p.iat<key.notBefore)||(key.notAfter!==undefined&&(p.iat>=key.notAfter||now>=key.notAfter)))return fail('INVALID','Key outside validity window');
 let claims=p;
 if(e.format==='vc-jwt'){
 const vc=p.vc;
 if(!vc || !Array.isArray(vc['@context']) || vc['@context'][0]!=='https://www.w3.org/2018/credentials/v1'||!Array.isArray(vc.type)||!vc.type.includes('VerifiableCredential')||!vc.credentialSubject||Array.isArray(vc.credentialSubject)||vc.credentialSubject.id!==p.sub)return fail('INVALID','VC-JWT 1.1 single subject structure required');
 if((vc.issuer!==undefined&&vc.issuer!==p.iss)||(vc.id!==undefined&&vc.id!==p.jti)||vc.credentialStatus)return fail('UNSUPPORTED','VC issuer/id inconsistency or status mechanism outside adapter scope');
 claims=vc.credentialSubject;
 }
 if(!nonempty(claims.requirement)||!nonempty(claims.action_hash))return fail('INVALID','Typed requirement and action binding required');
 if(!key.roles.includes(claims.role))return fail('INVALID','Issuer not trusted for declared role');
 if(claims.action_hash!==fingerprint(ctx.action))return fail('INVALID','Evidence bound to another action');
 return {valid:true,status:'VERIFIED',claims,issuer:p.iss,kid:h.kid,externalId:p.jti,digest:fingerprint(e),format:e.format};
 }catch{return fail('INVALID','Malformed evidence or key');}
}
export const adapters=[
 {id:'jwt',version:'1.0.0',formats:['jwt'],capabilities:['Ed25519 JWS signature','pinned issuer and role','audience, subject, temporal claims','action binding'],limitations:['Only EdDSA JWT, scalar audience, no JOSE extensions. Application claims must be mapped explicitly. Does not prove real-world execution.'],verify:verifyJwt},
 {id:'vc-jwt',version:'1.0.0',formats:['vc-jwt'],capabilities:['VC 1.1 single-subject JWT subset','Ed25519 JWS and pinned issuer role','application claim mapping'],limitations:['Not a universal VC verifier. No JSON-LD processing, Data Integrity, SD-JWT, VC 2.0, credentialStatus or presentations.'],verify:verifyJwt}
];
function validatePolicy(policy){
 if(!policy||!nonempty(policy.id)||!nonempty(policy.audience)||!Array.isArray(policy.keys)||policy.keys.length>100)throw new Error('Explicit trust policy required');
 for(const k of policy.keys)if(!nonempty(k.kid)||!nonempty(k.issuer)||!Array.isArray(k.roles)||k.roles.some(r=>!nonempty(r))||!k.jwk||k.jwk.d)throw new Error('Public issuer keys and role constraints required');
 if(new Set(policy.keys.map(k=>k.issuer+'\0'+k.kid)).size!==policy.keys.length)throw new Error('Ambiguous trust key');
}
export class EvidenceResolver{
 constructor({policy,clock=()=>Math.floor(Date.now()/1000),collectors={}}){validatePolicy(policy);this.policy=structuredClone(policy);this.clock=clock;this.collectors=collectors;}
 resolve({profile:profileId,action,evidence=[]}){
 const profile=getProfile(profileId);
 const base={engine:ENGINE_VERSION,profile:profileId,policy:this.policy.id,policyDigest:fingerprint(this.policy),evaluatedAt:this.clock(),limitation:LIMITATION};
 if(!profile||profile.status==='draft-unsupported')return {...base,status:'UNSUPPORTED',requirements:[],missing:[],evidenceResults:[],reason:'Profile absent or not implemented'};
 validateAction(action,profile);
 if(!Array.isArray(evidence)||evidence.length>100)throw new Error('At most 100 evidence records');
 const ctx={action,policy:this.policy,now:base.evaluatedAt};
 const evidenceResults=evidence.map(e=>({id:e?.id??null,...(adapters.find(a=>a.formats.includes(e?.format))?.verify(e,ctx)||fail('UNSUPPORTED','No adapter for evidence format'))}));
 const ids=new Set(), externalIds=new Set();
 for(const r of evidenceResults){if(ids.has(r.id))Object.assign(r,fail('INVALID','Duplicate evidence id'));ids.add(r.id);if(r.valid){const key=r.issuer+'\0'+r.externalId;if(externalIds.has(key))Object.assign(r,fail('INVALID','Replayed external evidence identifier'));externalIds.add(key);if(!profile.requirements.some(q=>q.id===r.claims.requirement))Object.assign(r,fail('INVALID','Unknown requirement'));}}
 const requirements=[];
 for(const req of profile.requirements){
 const relevant=evidenceResults.filter(r=>r.valid&&r.claims.requirement===req.id);
 const reasons=[], passed=[];
 const dependencies=req.dependsOn.map(id=>requirements.find(x=>x.id===id));
 for(const r of relevant){
 const errors=[];
 if(r.claims.role!==req.role)errors.push(`Expected issuer role ${req.role}`);
 for(const c of req.checks){const actual=r.claims[c.field];let ok=false,expected;
 if(c.op==='literal'){expected=c.value;ok=actual===expected;}
 if(c.op==='eq'){expected=c.action==='hash'?fingerprint(action):action[c.action];ok=actual===expected;}
 if(c.op==='gte'){expected=action[c.action];ok=minor(actual)&&BigInt(actual)>=BigInt(expected);}
 if(c.op==='match'){const dependency=dependencies.find(d=>d.id===c.requirement);expected=dependency?.claims?.[c.claim];ok=nonempty(expected)&&actual===expected;}
 if(!ok)errors.push(`${c.field}: ${c.op} check failed`);
 }
 if(['execution','outcome'].includes(req.id)&&!nonempty(r.claims.transaction_id))errors.push('transaction_id required');
 if(errors.length)reasons.push({evidence:r.id,errors});else passed.push(r);
 }
 const distinct=new Set(relevant.map(r=>fingerprint(r.claims)));
 let status=!relevant.length?'MISSING':reasons.length||distinct.size>1?'CONFLICT':'SATISFIED';
 if(status==='SATISFIED'&&dependencies.some(d=>d.status!=='SATISFIED'))status='BLOCKED';
 const detail={id:req.id,label:req.label,status,role:req.role,evidence:relevant.map(r=>r.id),checks:req.checks,reasons,dependsOn:req.dependsOn};
 if(status==='SATISFIED')detail.claims=passed[0].claims;
 if(!relevant.length)detail.reason='No valid evidence from a trusted issuer for this requirement';
 if(distinct.size>1)detail.reason='Multiple inconsistent signed claims; selection must be explicit';
 if(status==='BLOCKED')detail.reason='Prerequisite requirements are not satisfied';
 requirements.push(detail);
 }
 const statuses=requirements.map(r=>r.status);
 const status=evidenceResults.some(r=>r.status==='INVALID')?'INVALID':evidenceResults.some(r=>r.status==='UNSUPPORTED')?'UNSUPPORTED':statuses.includes('CONFLICT')?'CONFLICT':statuses.every(s=>s==='SATISFIED')?'SATISFIED':'INCOMPLETE';
 return {...base,profileVersion:profile.version,profileDigest:fingerprint(profile),actionDigest:fingerprint(action),status,satisfied:statuses.filter(s=>s==='SATISFIED').length,total:requirements.length,requirements,evidenceResults,missing:requirements.filter(r=>r.status!=='SATISFIED').map(r=>({requirement:r.id,role:r.role,dependsOn:r.dependsOn,acceptedFormats:profile.requirements.find(q=>q.id===r.id).acceptedFormats,request:{actionDigest:fingerprint(action),requirement:r.id,audience:this.policy.audience,role:r.role},acquisition:'Send to an explicitly registered collector or submit external evidence; no automatic arbitrary URL fetching.'}))};
 }
 async collect(input){
 let evidence=[...(input.evidence||[])];const before=this.resolve({...input,evidence});const events=[];
 if(['INVALID','CONFLICT','UNSUPPORTED'].includes(before.status))return {before,after:before,evidence,events};
 for(const req of getProfile(input.profile).requirements){
 const current=this.resolve({...input,evidence});const missing=current.missing.find(m=>m.requirement===req.id);
 if(!missing||current.requirements.some(r=>req.dependsOn.includes(r.id)&&r.status!=='SATISFIED'))continue;
 const collector=this.collectors[req.id];if(!collector){events.push({requirement:req.id,status:'NO_COLLECTOR'});continue;}
 try{const e=await collector({action:structuredClone(input.action),request:structuredClone(missing.request)});if(e){evidence.push(e);events.push({requirement:req.id,status:'RECEIVED'});}else events.push({requirement:req.id,status:'UNAVAILABLE'});}catch{events.push({requirement:req.id,status:'COLLECTION_FAILED'});}
 }
 return {before,after:this.resolve({...input,evidence}),evidence,events};
 }
 createCase(input,id='TP-'+randomUUID()){return {version:'timeproofs.case/2',id,profile:input.profile,action:structuredClone(input.action),evidence:structuredClone(input.evidence||[]),resolution:this.resolve(input)};}
 addEvidence(proofCase,evidence){return this.createCase({profile:proofCase.profile,action:proofCase.action,evidence:[...proofCase.evidence,...evidence]},proofCase.id);}
}
export class ProofCaseVerifier{
 constructor(options){this.resolver=new EvidenceResolver(options);}
 verify(proofCase){
 try{
 if(proofCase?.version!=='timeproofs.case/2'||!nonempty(proofCase.id))return {valid:false,status:'INVALID',reason:'Malformed Proof Case'};
 const computed=this.resolver.resolve(proofCase);
 const recorded=proofCase.resolution;
 const matches=recorded && fingerprint({...recorded,evaluatedAt:0})===fingerprint({...computed,evaluatedAt:0}) && Number.isSafeInteger(recorded.evaluatedAt) && recorded.evaluatedAt<=computed.evaluatedAt;
 return {valid:!!matches&&computed.status==='SATISFIED',status:matches?computed.status:'INVALID',recordedMatches:!!matches,computed,reason:matches?'Recomputed under verifier-owned policy and current time':'Recorded result differs from independently recomputed result'};
 }catch{return {valid:false,status:'INVALID',reason:'Malformed case or invalid action'};}
 }
}
