import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { verifyFixture } from '../index.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here,'../..');
const fixtureDir = path.join(root,'fixtures/ucp-ap2/v0.1');
const manifest = JSON.parse(await fs.readFile(path.join(fixtureDir,'manifest.json'),'utf8'));
let failures = 0;

for (const entry of manifest.fixtures || manifest.cases || []) {
  const file = typeof entry === 'string' ? entry : entry.file;
  if (!file) continue;
  const fixture = JSON.parse(await fs.readFile(path.join(fixtureDir,file),'utf8'));
  const actual = verifyFixture(fixture);
  const expected = fixture.expected || {};
  const actualById = Object.fromEntries(actual.results.map(r => [r.invariant_id,r]));
  const errors = [];

  if (actual.decision !== expected.aggregate) errors.push(`aggregate expected ${expected.aggregate}, got ${actual.decision}`);

  for (const [id, exp] of Object.entries(expected.results || {})) {
    const expectedStatus = typeof exp === 'string' ? exp : exp.status;
    const got = actualById[id];
    if (!got) errors.push(`${id}: missing result`);
    else if (got.status !== expectedStatus) errors.push(`${id}: expected ${expectedStatus}, got ${got.status}`);
  }

  for (const [id, expectedUnknown] of Object.entries(expected.unknown_reasons || {})) {
    const got = actualById[id];
    if (!got) errors.push(`${id}: missing result for unknown_reason check`);
    else if (got.unknown_reason !== expectedUnknown) errors.push(`${id}: expected unknown_reason ${expectedUnknown}, got ${got.unknown_reason}`);
  }

  for (const [id, expectedReason] of Object.entries(expected.reason_codes || {})) {
    const got = actualById[id];
    if (!got) errors.push(`${id}: missing result for reason_code check`);
    else if (got.reason_code !== expectedReason) errors.push(`${id}: expected reason_code ${expectedReason}, got ${got.reason_code}`);
  }

  for (const r of actual.results) {
    if (r.status === 'UNKNOWN' && !r.unknown_reason) errors.push(`${r.invariant_id}: UNKNOWN must include unknown_reason`);
    if (r.status !== 'UNKNOWN' && r.unknown_reason !== null) errors.push(`${r.invariant_id}: non-UNKNOWN result must have null unknown_reason`);
  }

  if (errors.length) {
    failures++;
    console.error(`FAIL ${file}\n  ${errors.join('\n  ')}`);
  } else {
    console.log(`PASS ${file}`);
  }
}

if (failures) {
  console.error(`\n${failures} fixture(s) failed`);
  process.exit(1);
}
console.log('\nAll TimeProofs M4 fixtures satisfied.');
