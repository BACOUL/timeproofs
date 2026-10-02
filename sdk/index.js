export {EvidenceResolver,ProofCaseVerifier,profiles,getProfile,adapters,fingerprint,validateProofCase} from '../src/core.js';
export class TimeProofs{
 constructor({baseUrl='http://localhost:3000',apiKey,fetch:fetcher=globalThis.fetch}={}){this.baseUrl=baseUrl.replace(/\/$/,'');this.apiKey=apiKey;this.fetch=fetcher;}
 async request(path,body){const response=await this.fetch(this.baseUrl+path,{method:body===undefined?'GET':'POST',headers:{'Content-Type':'application/json',...(this.apiKey?{Authorization:'Bearer '+this.apiKey}:{})},...(body===undefined?{}:{body:JSON.stringify(body)})});const value=await response.json();if(!response.ok)throw new Error(value.error||`HTTP ${response.status}`);return value;}
 profiles(){return this.request('/v1/profiles');}
 profile(id){return this.request('/v1/profiles/'+id.split('/').map(encodeURIComponent).join('/'));}
 resolve(input){return this.request('/v1/resolve',input);}
 createCase(input){return this.request('/v1/cases',input);}
 addEvidence(id,evidence){return this.request('/v1/cases/'+encodeURIComponent(id)+'/evidence',{evidence});}
 getCase(id){return this.request('/v1/cases/'+encodeURIComponent(id));}
 verify(proofCase){return this.request('/v1/verify',{proofCase});}
 demo(stage=0){return this.request('/v1/demo',{stage});}
}
