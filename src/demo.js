import {readFileSync} from 'node:fs';
import {EvidenceResolver,ProofCaseVerifier} from './core.js';
export const fixture=JSON.parse(readFileSync(new URL('../examples/fixtures.json',import.meta.url),'utf8'));
export function demoResolver(clock){return new EvidenceResolver({policy:fixture.policy,clock,collectors:Object.fromEntries(fixture.evidence.map(e=>[e.id,async()=>structuredClone(e)]))});}
export function demoCase(stage=0,clock){const count=[3,4,5][stage];if(count===undefined)throw new Error('Stage must be 0, 1 or 2');return demoResolver(clock).createCase({profile:'authorized_purchase/v1',action:fixture.action,evidence:fixture.evidence.slice(0,count)},'TP-DEMO-28000');}
export const demoVerify=(proofCase,clock)=>new ProofCaseVerifier({policy:fixture.policy,clock}).verify(proofCase);

export async function runDemo(stage=0){
 if(!Number.isInteger(stage)||stage<0||stage>2)throw new Error('Invalid demo stage');
 const resolver=demoResolver();
 resolver.collectors=Object.fromEntries(Object.entries(resolver.collectors).filter(([id])=>id==='execution'&&stage>=1||id==='outcome'&&stage===2));
 const input={profile:'authorized_purchase/v1',action:fixture.action,evidence:fixture.evidence.slice(0,3)};
 const collected=stage===0?{evidence:input.evidence,events:[]}:await resolver.collect(input);
 const proofCase=resolver.createCase({...input,evidence:collected.evidence},'TP-DEMO-28000');
 return {sandbox:true,proofCase,verification:demoVerify(proofCase),acquisition:collected.events};
}
