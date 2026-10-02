import http from 'node:http';
import {readFile,writeFile,mkdir,rename} from 'node:fs/promises';
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {timingSafeEqual,randomUUID} from 'node:crypto';
import {EvidenceResolver,ProofCaseVerifier,profiles,adapters} from './core.js';
import {runDemo,demoVerify,fixture} from './demo.js';
const ROOT=fileURLToPath(new URL('../public/',import.meta.url));
const rates=new Map();
const envPolicy=process.env.TRUST_POLICY_FILE?JSON.parse(readFileSync(process.env.TRUST_POLICY_FILE,'utf8')):null;
const productionResolver=envPolicy?new EvidenceResolver({policy:envPolicy}):null;
const MAX_BODY=256*1024;
function send(res,code,value){res.writeHead(code,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(value));}
function auth(req){const expected=process.env.TIMEPROOFS_API_KEY;const actual=req.headers.authorization;if(!expected||expected.length<32||typeof actual!=='string')return false;const a=Buffer.from(actual),b=Buffer.from('Bearer '+expected);return a.length===b.length&&timingSafeEqual(a,b);}
async function json(req){if(req.headers['content-type']?.split(';')[0]!=='application/json')throw Object.assign(new Error('application/json required'),{status:415});let size=0,body='';for await(const chunk of req){size+=Buffer.byteLength(chunk);if(size>MAX_BODY)throw Object.assign(new Error('Request exceeds 256 KiB'),{status:413});body+=chunk;}try{return JSON.parse(body);}catch{throw Object.assign(new Error('Invalid JSON'),{status:400});}}
const directory=()=>process.env.TIMEPROOFS_DATA_DIR||'.data';
const validId=id=>/^TP-[0-9a-f-]{36}$/.test(id);
async function save(proofCase){await mkdir(directory(),{recursive:true,mode:0o700});const destination=path.join(directory(),proofCase.id+'.json'),tmp=destination+'.'+randomUUID()+'.tmp';await writeFile(tmp,JSON.stringify(proofCase),{mode:0o600});await rename(tmp,destination);}
async function load(id){if(!validId(id))throw Object.assign(new Error('Case not found'),{status:404});try{return JSON.parse(await readFile(path.join(directory(),id+'.json'),'utf8'));}catch{throw Object.assign(new Error('Case not found'),{status:404});}}
const queues=new Map();
async function serialized(id,work){const prior=queues.get(id)||Promise.resolve();const next=prior.catch(()=>{}).then(work);queues.set(id,next);try{return await next;}finally{if(queues.get(id)===next)queues.delete(id);}}
export async function handler(req,res){
 res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','no-referrer');res.setHeader('X-Frame-Options','DENY');
 res.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'");
 try{
 const url=new URL(req.url,'http://localhost'),p=decodeURIComponent(url.pathname);const ip=req.socket?.remoteAddress||'unknown';const now=Date.now();
 if(p.startsWith('/v1/')){let bucket=rates.get(ip);if(!bucket||now>bucket.until){bucket={count:0,until:now+60000};rates.set(ip,bucket);}if(++bucket.count>60){res.setHeader('Retry-After','60');return send(res,429,{error:'Rate limit exceeded'});}if(rates.size>10000){for(const [key,value]of rates)if(now>value.until)rates.delete(key);if(rates.size>10000)return send(res,503,{error:'Server busy'});}}
 if(p==='/healthz'&&req.method==='GET')return send(res,200,{status:'ok',version:'2.0.0-alpha.1',mode:'sandbox-reference',privateApi:!!productionResolver});
 if(p==='/v1/profiles'&&req.method==='GET')return send(res,200,profiles);
 if(p.startsWith('/v1/profiles/')&&req.method==='GET'){const profile=profiles.find(x=>x.id===p.slice(13));return send(res,profile?200:404,profile||{error:'Profile not found'});}
 if(p==='/v1/adapters'&&req.method==='GET')return send(res,200,adapters.map(({verify,...metadata})=>metadata));
 if(p==='/v1/demo-policy'&&req.method==='GET')return send(res,200,fixture.policy);
 if(p==='/v1/demo'&&req.method==='POST'){const body=await json(req);if(Object.keys(body).some(k=>k!=='stage')||!Number.isInteger(body.stage)||body.stage<0||body.stage>2)return send(res,400,{error:'stage must be 0, 1 or 2'});return send(res,200,await runDemo(body.stage));}
 if(p==='/v1/verify'&&req.method==='POST'){const body=await json(req);if(Object.keys(body).some(k=>k!=='proofCase'))return send(res,400,{error:'Only proofCase is accepted; policy is owned by the verifier'});return send(res,200,demoVerify(body.proofCase));}
 if(p.startsWith('/v1/')){
 if(!productionResolver)return send(res,503,{error:'Private API not configured. Run self-host with TRUST_POLICY_FILE and a TIMEPROOFS_API_KEY of at least 32 characters.'});
 if(!auth(req))return send(res,401,{error:'Valid API key required'});
 if(p==='/v1/resolve'&&req.method==='POST'){const input=await json(req);return send(res,200,productionResolver.resolve(input));}
 if(p==='/v1/cases'&&req.method==='POST'){const proofCase=productionResolver.createCase(await json(req));if(proofCase.resolution.status==='UNSUPPORTED')return send(res,422,{error:'Unsupported profile'});await save(proofCase);return send(res,201,proofCase);}
 const match=p.match(/^\/v1\/cases\/(TP-[0-9a-f-]{36})(\/evidence)?$/);
 if(match&&!match[2]&&req.method==='GET')return send(res,200,await load(match[1]));
 if(match&&match[2]&&req.method==='POST'){const body=await json(req);if(!Array.isArray(body.evidence)||!body.evidence.length)return send(res,400,{error:'Nonempty evidence array required'});const updated=await serialized(match[1],async()=>{const current=await load(match[1]);const next=productionResolver.addEvidence(current,body.evidence);await save(next);return next;});return send(res,200,updated);}
 if(p==='/v1/verify-private'&&req.method==='POST'){const {proofCase}=await json(req);return send(res,200,new ProofCaseVerifier({policy:envPolicy}).verify(proofCase));}
 return send(res,404,{error:'Route not found'});
 }
 if(req.method!=='GET'&&req.method!=='HEAD')return send(res,405,{error:'Method not allowed'});
 const assets={'/app.js':'app.js','/styles.css':'styles.css','/openapi.json':'openapi.json','/favicon.svg':'favicon.svg','/robots.txt':'robots.txt'};
 const routes=['/','/developers','/profiles','/integrations','/docs','/demo','/verify','/pricing','/security','/about','/cases/demo'];
 if(!assets[p]&&!routes.includes(p)&&!profiles.some(x=>p==='/profiles/'+x.id))return send(res,404,{error:'Page not found'});
 const name=assets[p]||'index.html';const data=await readFile(path.join(ROOT,name));const type=name.endsWith('.js')?'text/javascript':name.endsWith('.css')?'text/css':name.endsWith('.json')?'application/json':name.endsWith('.svg')?'image/svg+xml':name.endsWith('.txt')?'text/plain':'text/html';res.writeHead(200,{'Content-Type':type+'; charset=utf-8','Cache-Control':'no-cache'});res.end(req.method==='HEAD'?undefined:data);
 }catch(e){send(res,e.status||400,{error:e.status?e.message:'Invalid request: '+e.message});}
}
if(process.argv[1]===fileURLToPath(import.meta.url)){const server=http.createServer(handler);server.requestTimeout=10000;server.headersTimeout=10000;server.listen(Number(process.env.PORT||3000),'0.0.0.0',()=>console.log('TimeProofs V2 listening on '+(process.env.PORT||3000)));}
