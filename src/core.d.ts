export type CaseStatus='SATISFIED'|'INCOMPLETE'|'CONFLICT'|'INVALID'|'UNSUPPORTED';
export interface IntendedAction {id:string;type:'purchase';principal:string;agent:string;merchant:string;currency:string;amount_minor:string;offer_id:string;}
export interface ProofRequirement {id:string;label:string;role:string;checks:ReadonlyArray<Record<string,unknown>>;dependsOn:ReadonlyArray<string>;acceptedFormats:ReadonlyArray<string>;acquisition:Readonly<Record<string,string>>;}
export interface ProofProfile {id:string;version:string;status:string;actionType:string;description:string;requiredActionFields:ReadonlyArray<string>;requirements:ReadonlyArray<ProofRequirement>;limitations:ReadonlyArray<string>;}
export interface Evidence {id:string;format:string;token:string;}
export interface TrustKey {kid:string;issuer:string;roles:string[];jwk:Record<string,unknown>;revoked?:boolean;notBefore?:number;notAfter?:number;}
export interface TrustPolicy {id:string;audience:string;keys:TrustKey[];}
export interface RequirementResult {id:string;label:string;status:'SATISFIED'|'MISSING'|'BLOCKED'|'CONFLICT';evidence:string[];reason?:string;reasons:Array<{evidence:string;errors:string[]}>;claims?:Record<string,unknown>;}
export interface Resolution {engine:string;profile:string;policy:string;policyDigest:string;evaluatedAt:number;status:CaseStatus;satisfied?:number;total?:number;requirements:RequirementResult[];missing:Array<{requirement:string;role:string;dependsOn:string[];request:Record<string,string>}>;evidenceResults:Array<Record<string,unknown>>;limitation:string;}
export interface ResolveInput {profile:string;action:IntendedAction;evidence?:Evidence[];}
export interface ProofCase {version:'timeproofs.case/2';id:string;profile:string;action:IntendedAction;evidence:Evidence[];resolution:Resolution;}
export interface Verification {valid:boolean;status:CaseStatus;recordedMatches?:boolean;computed?:Resolution;reason:string;}
export interface EvidenceAdapter {id:string;version:string;formats:string[];capabilities:string[];limitations:string[];verify(evidence:Evidence,context:unknown):unknown;}
export interface ResolverOptions {policy:TrustPolicy;clock?:()=>number;collectors?:Record<string,(input:{action:IntendedAction;request:Record<string,string>})=>Promise<Evidence|undefined>>;}
export declare class EvidenceResolver {constructor(options:ResolverOptions);resolve(input:ResolveInput):Resolution;collect(input:ResolveInput):Promise<{before:Resolution;after:Resolution;evidence:Evidence[];events:Array<{requirement:string;status:string}>}>;createCase(input:ResolveInput,id?:string):ProofCase;addEvidence(proofCase:ProofCase,evidence:Evidence[]):ProofCase;}
export declare class ProofCaseVerifier {constructor(options:ResolverOptions);verify(proofCase:ProofCase):Verification;}
export declare const profiles:ReadonlyArray<ProofProfile>;
export declare const adapters:ReadonlyArray<EvidenceAdapter>;
export declare function getProfile(id:string):ProofProfile|undefined;
export declare function fingerprint(value:unknown):string;
