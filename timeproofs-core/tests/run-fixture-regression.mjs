import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { verifyFixture } from '../index.js';
const here=path.dirname(fileURLToPath(import.meta.url));
const root=path.resolve(here,'../..');
const fixtureDir=path.join(root,'fixtures/ucp-ap2/v0.1');
const manifest=JSON.parse(await fs.readFile(path.join(fixtureDir,'manifest.json'),'utf8'));
let failures=0;
for(const entry of manifest.cases||[]){
 const file=entry.file; const fixture=JSON.parse(await fs.readFile(path.join(fixtureDir,file),'utf8')); const actual=verifyFixture(fixture); const expected=fixture.expected; const byId=Object.fromEntries(actual.results.map(r=>[r.invariant_id,r])); const errors=[];
 if(actual.decision!==expected.aggregate)errors.push(`aggregate expected ${expected.aggregate}, got ${actual.decision}`);
 for(const [id,status] of Object.entries(expected.results||{})){const got=byId[id];if(!got)errors.push(`${id}: missing result`);else if(got.status!==status)errors.push(`${id}: expected ${status}, got ${got.status}`);}
 for(const [id,reason] of Object.entries(expected.unknown_reasons||{})){const got=byId[id];if(!got)errors.push(`${id}: missing result for unknown reason`);else if(got.unknown_reason!==reason)errors.push(`${id}: expected unknown_reason ${reason}, got ${got.unknown_reason}`);}
 if(errors.length){failures++;console.error(`FAIL ${file}\n  ${errors.join('\n  ')}`);}else console.log(`PASS ${file}`);
}
if(failures){console.error(`\n${failures} fixture(s) failed`);process.exit(1);}console.log('\nAll TimeProofs M4 fixtures satisfied.');
