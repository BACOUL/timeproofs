#!/usr/bin/env node
import {readFileSync} from 'node:fs';
import {ProofCaseVerifier,EvidenceResolver,profiles} from '../src/core.js';
try{
 const [command,file,policyFile]=process.argv.slice(2);
 if(command==='profiles')console.log(JSON.stringify(profiles,null,2));
 else if(command==='demo')await import('../examples/purchase.js');
 else if(['verify','resolve'].includes(command)&&file&&policyFile){const input=JSON.parse(readFileSync(file,'utf8'));const policy=JSON.parse(readFileSync(policyFile,'utf8'));const output=command==='verify'?new ProofCaseVerifier({policy}).verify(input):new EvidenceResolver({policy}).resolve(input);console.log(JSON.stringify(output,null,2));if(command==='verify'&&!output.valid)process.exitCode=1;}
 else{console.log('Usage: timeproofs profiles | demo | resolve input.json trust-policy.json | verify case.json trusted-policy.json\nTrust policy must come from an independent trusted source, never from the uploaded case.');process.exitCode=1;}
}catch(e){console.error(e.message);process.exitCode=1;}
