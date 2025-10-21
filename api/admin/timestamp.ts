export const config = { runtime: 'edge' };

function j(o: unknown, s=200){return new Response(JSON.stringify(o),{status:s,headers:{'content-type':'application/json'}});}

export default async function handler(req: Request){
  if(req.method!=='POST') return new Response('Only POST',{status:405});
  const auth=req.headers.get('authorization')||'';
  if(auth!==`Bearer ${process.env.ADMIN_TOKEN}`) return new Response('Unauthorized',{status:401});

  let body:any; try{body=await req.json();}catch{return j({ok:false,error:'invalid_json'},400);}
  const {hash,meta}=body||{};
  if(!/^[a-f0-9]{64}$/.test(hash)) return j({ok:false,error:'invalid_hash'},400);

  const ts=new Date().toISOString();
  const enc=new TextEncoder();
  const key=await crypto.subtle.importKey('raw',enc.encode(process.env.SIGN_KEY as string),{name:'HMAC',hash:'SHA-256'},false,['sign']);
  const sigBuf=await crypto.subtle.sign('HMAC',key,enc.encode(`${hash}|${ts}`));
  const sig=[...new Uint8Array(sigBuf)].map(b=>b.toString(16).padStart(2,'0')).join('');

  return j({ok:true,spec:'proofspec-v1',ver:1,hash,alg:'HMAC-SHA256',ts,sig,kid:'tp-admin-v0',meta:meta??null,verify_url:`https://timeproofs.io/verify.html?hash=${hash}`});
}
