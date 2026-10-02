export * from '../src/core.js';
import type {ResolveInput,Resolution,ProofProfile,ProofCase,Evidence,Verification} from '../src/core.js';
export declare class TimeProofs {
 constructor(options?:{baseUrl?:string;apiKey?:string;fetch?:typeof fetch});
 profiles():Promise<ProofProfile[]>;profile(id:string):Promise<ProofProfile>;resolve(input:ResolveInput):Promise<Resolution>;createCase(input:ResolveInput):Promise<ProofCase>;addEvidence(id:string,evidence:Evidence[]):Promise<ProofCase>;getCase(id:string):Promise<ProofCase>;verify(proofCase:ProofCase):Promise<Verification>;demo(stage?:number):Promise<{sandbox:true;proofCase:ProofCase;verification:Verification;acquisition:Array<{requirement:string;status:string}>}>;
}
