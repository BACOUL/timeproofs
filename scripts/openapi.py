import json
sref=lambda name:{'$ref':'#/components/schemas/'+name}
obj=lambda properties,required=None,additional=False:{'type':'object','properties':properties,'required':required or list(properties),'additionalProperties':additional}
string={'type':'string'}
action=obj({k:string for k in ['id','type','principal','agent','merchant','currency','amount_minor','offer_id']})
action['properties']['amount_minor']={'type':'string','pattern':'^[1-9][0-9]{0,17}$'}
action['properties']['type']={'const':'purchase'}
action['properties']['currency']={'type':'string','pattern':'^[A-Z]{3}$'}
evidence=obj({'id':string,'format':{'type':'string','enum':['jwt','vc-jwt']},'token':{'type':'string','maxLength':32768}})
schemas={'IntendedAction':action,'Evidence':evidence,'ResolveInput':obj({'profile':string,'action':sref('IntendedAction'),'evidence':{'type':'array','maxItems':100,'items':sref('Evidence')}},['profile','action']),
 'ProofRequirement':obj({'id':string,'label':string,'role':string,'checks':{'type':'array','items':{'type':'object'}},'dependsOn':{'type':'array','items':string},'acceptedFormats':{'type':'array','items':string},'acquisition':{'type':'object'}}),
 'ProofProfile':{'type':'object','required':['id','version','status','requirements'],'properties':{'id':string,'version':string,'status':string,'requirements':{'type':'array','items':sref('ProofRequirement')}}},
 'Resolution':{'type':'object','required':['status','requirements','policyDigest','evaluatedAt'],'properties':{'status':{'enum':['SATISFIED','INCOMPLETE','CONFLICT','INVALID','UNSUPPORTED']},'requirements':{'type':'array','items':{'type':'object'}},'satisfied':{'type':'integer'},'total':{'type':'integer'},'missing':{'type':'array','items':{'type':'object'}},'evidenceResults':{'type':'array','items':{'type':'object'}},'policyDigest':string,'evaluatedAt':{'type':'integer'}}},
 'ProofCase':obj({'version':{'const':'timeproofs.case/2'},'id':string,'profile':string,'action':sref('IntendedAction'),'evidence':{'type':'array','items':sref('Evidence')},'resolution':sref('Resolution')}),
 'Verification':{'type':'object','required':['valid','status','reason'],'properties':{'valid':{'type':'boolean'},'status':string,'reason':string,'recordedMatches':{'type':'boolean'},'computed':sref('Resolution')}},
 'Error':obj({'error':string})}
paths={}
def route(path,method,description,response,body=None,private=False,code='200',params=[]):
 op={'summary':description,'security':[{'apiKey':[]}] if private else [],'responses':{code:{'description':'Success','content':{'application/json':{'schema':response}}},'400':{'description':'Invalid input','content':{'application/json':{'schema':sref('Error')}}},'429':{'description':'Rate limited'}}}
 if private:op['responses'].update({'401':{'description':'Unauthorized'},'503':{'description':'Private API not configured'}})
 if body:op['requestBody']={'required':True,'content':{'application/json':{'schema':body}}}
 if params:op['parameters']=[{'in':'path','name':n,'required':True,'schema':string} for n in params]
 paths.setdefault(path,{})[method]=op
route('/v1/profiles','get','List public versioned profiles',{'type':'array','items':sref('ProofProfile')})
route('/v1/profiles/{name}/{version}','get','Get one public profile',sref('ProofProfile'),params=['name','version'])
route('/v1/resolve','post','Resolve evidence under configured trust policy',sref('Resolution'),sref('ResolveInput'),True)
route('/v1/cases','post','Create and persist a private case',sref('ProofCase'),sref('ResolveInput'),True,'201')
route('/v1/cases/{id}','get','Retrieve a private case',sref('ProofCase'),private=True,params=['id'])
route('/v1/cases/{id}/evidence','post','Append evidence and recompute',sref('ProofCase'),obj({'evidence':{'type':'array','minItems':1,'maxItems':100,'items':sref('Evidence')}}),True,params=['id'])
route('/v1/verify','post','Free verification under server-owned sandbox policy',sref('Verification'),obj({'proofCase':sref('ProofCase')}))
route('/v1/verify-private','post','Recompute under private configured policy',sref('Verification'),obj({'proofCase':sref('ProofCase')}),True)
route('/v1/demo','post','Run signed fixture reference stage (no real purchase)',obj({'sandbox':{'const':True},'proofCase':sref('ProofCase'),'verification':sref('Verification'),'acquisition':{'type':'array','items':{'type':'object'}}}),obj({'stage':{'type':'integer','minimum':0,'maximum':2}}))
route('/v1/demo-policy','get','Read independently pinned demo public keys',{'type':'object'})
route('/v1/adapters','get','Read exact adapter capabilities and limits',{'type':'array','items':{'type':'object'}})
route('/healthz','get','Reference health check',{'type':'object'})
spec={'openapi':'3.1.0','info':{'title':'TimeProofs V2 Reference API','version':'2.0.0-alpha.1','description':'Deterministic proof orchestration. SATISFIED is not truth, legality, compliance or legal admissibility. Private endpoints require a self-host trust policy and API key. Public preview only runs sandbox evidence.'},'servers':[{'url':'http://localhost:3000','description':'Local reference server'}],'paths':paths,'components':{'securitySchemes':{'apiKey':{'type':'http','scheme':'bearer'}},'schemas':schemas}}
open('public/openapi.json','w').write(json.dumps(spec,indent=2)+'\n')
