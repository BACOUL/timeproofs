const req = (id, label, role, checks, dependsOn = []) => ({id,label,role,checks,dependsOn,acceptedFormats:['jwt','vc-jwt'],acquisition:{method:'registered-collector',role}});
const bound = [{field:'action_hash',op:'eq',action:'hash'},{field:'agent',op:'eq',action:'agent'},{field:'principal',op:'eq',action:'principal'}];
const money = [{field:'currency',op:'eq',action:'currency'},{field:'amount_minor',op:'eq',action:'amount_minor'},{field:'merchant',op:'eq',action:'merchant'}];
const purchase = {
 id:'authorized_purchase/v1',version:'1.0.0',status:'reference-alpha',actionType:'purchase',
 description:'Evidence of delegated authority, agent identity, agreed offer, payment execution and merchant outcome for one exact purchase.',
 requiredActionFields:['id','type','principal','agent','merchant','currency','amount_minor','offer_id'],
 requirements:[
 req('authority','Authority','authority',[...bound,{field:'currency',op:'eq',action:'currency'},{field:'merchant',op:'eq',action:'merchant'},{field:'limit_minor',op:'gte',action:'amount_minor'},{field:'authorized',op:'literal',value:true}]),
 req('identity','Identity','identity',[...bound,{field:'identified',op:'literal',value:true}]),
 req('offer','Offer','merchant',[...bound,...money,{field:'offer_id',op:'eq',action:'offer_id'},{field:'accepted',op:'literal',value:true}]),
 req('execution','Execution','processor',[...bound,...money,{field:'offer_id',op:'eq',action:'offer_id'},{field:'executed',op:'literal',value:true}],['authority','identity','offer']),
 req('outcome','Outcome','merchant',[...bound,...money,{field:'offer_id',op:'eq',action:'offer_id'},{field:'confirmed',op:'literal',value:true},{field:'transaction_id',op:'match',requirement:'execution',claim:'transaction_id'}],['execution'])
 ],limitations:['SATISFIED means this declared profile is satisfied under the verifier trust policy. It does not mean TRUE, lawful, compliant, or legally admissible.','An issuer may lie; a signature authenticates a claim, not the event.','This profile covers one purchase, not aggregate spending or settlement finality.']
};
const drafts = [
 ['fund_transfer','transfer','Transfer authority, payer, destination, execution and beneficiary confirmation.'],
 ['contract_acceptance','accept_contract','Authority, exact contract digest, terms, signature and counterparty acknowledgement.'],
 ['data_deletion','delete_data','Authority, bounded data scope, deletion attestations and independent confirmation; physical erasure is not inferred.'],
 ['agent_delegation','delegate','Delegator authority, agent identity, scope, expiry and acceptance of delegation.']
].map(([name,type,description])=>({id:`${name}/v1`,version:'1.0.0-draft.1',status:'draft-unsupported',actionType:type,description,requiredActionFields:[],requirements:[],limitations:['Draft specification only. The resolver returns UNSUPPORTED; no conformance claim.']}));
const deepFreeze = v => { Object.freeze(v); for(const x of Object.values(v)) if(x && typeof x==='object') deepFreeze(x);return v; };
export const profiles = deepFreeze([purchase,...drafts]);
export const getProfile = id => profiles.find(p=>p.id===id);
