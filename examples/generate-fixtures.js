// Run once to create public sandbox fixtures. Private keys exist in memory only.
import {generateKeyPairSync,sign} from 'node:crypto';
import {writeFileSync} from 'node:fs';
import {fingerprint} from '../src/core.js';
const action={id:'purchase-28000-eur',type:'purchase',principal:'company:acme',agent:'agent:procurement',merchant:'merchant:industrial-supply',currency:'EUR',amount_minor:'2800000',offer_id:'offer:machine-2026-01'};
const keys=[],signers={};
for(const role of ['authority','identity','merchant','processor']){const pair=generateKeyPairSync('ed25519');signers[role]=pair.privateKey;keys.push({kid:role+'-sandbox-1',issuer:'urn:timeproofs:sandbox:'+role,roles:[role],jwk:pair.publicKey.export({format:'jwk'}),notBefore:1788220800,notAfter:1820016000,revoked:false});}
const common={action_hash:fingerprint(action),agent:action.agent,principal:action.principal};
const claims={
 authority:{...common,role:'authority',requirement:'authority',currency:action.currency,merchant:action.merchant,limit_minor:'3000000',authorized:true},
 identity:{...common,role:'identity',requirement:'identity',identified:true},
 offer:{...common,role:'merchant',requirement:'offer',currency:action.currency,merchant:action.merchant,amount_minor:action.amount_minor,offer_id:action.offer_id,accepted:true},
 execution:{...common,role:'processor',requirement:'execution',currency:action.currency,merchant:action.merchant,amount_minor:action.amount_minor,offer_id:action.offer_id,executed:true,transaction_id:'sandbox:payment:28000'},
 outcome:{...common,role:'merchant',requirement:'outcome',currency:action.currency,merchant:action.merchant,amount_minor:action.amount_minor,offer_id:action.offer_id,confirmed:true,transaction_id:'sandbox:payment:28000'}
};
const evidence=Object.entries(claims).map(([id,c])=>{const vc=id==='identity';const p={iss:'urn:timeproofs:sandbox:'+c.role,sub:action.agent,aud:'urn:timeproofs:demo',jti:'urn:fixture:'+id,iat:1788220800,nbf:1788220800,exp:1820016000,...(vc?{vc:{'@context':['https://www.w3.org/2018/credentials/v1'],type:['VerifiableCredential','AgentIdentityCredential'],credentialSubject:{id:action.agent,...c}}}:c)};const h={alg:'EdDSA',typ:'JWT',kid:c.role+'-sandbox-1'};const b=v=>Buffer.from(JSON.stringify(v)).toString('base64url');const data=b(h)+'.'+b(p);return {id,format:vc?'vc-jwt':'jwt',token:data+'.'+sign(null,Buffer.from(data),signers[c.role]).toString('base64url')};});
writeFileSync(new URL('./fixtures.json',import.meta.url),JSON.stringify({sandbox:true,action,policy:{id:'sandbox-purchase-policy/v1',audience:'urn:timeproofs:demo',keys},evidence},null,2)+'\n');
