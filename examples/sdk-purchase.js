// Run from the cloned repository: node examples/sdk-purchase.js
// Package self-reference uses the same public exports as an installed SDK.
import { readFileSync } from 'node:fs';
import { EvidenceResolver, ProofCaseVerifier } from '@timeproofs/sdk';

const fixture = JSON.parse(readFileSync(new URL('./fixtures.json', import.meta.url), 'utf8'));
// Separately configured sandbox trust roots, never supplied by an imported case.
const policy = JSON.parse(readFileSync(new URL('./demo-policy.json', import.meta.url), 'utf8'));
const resolver = new EvidenceResolver({
  policy,
  collectors: {
    execution: async () => structuredClone(fixture.evidence[3]),
    outcome: async () => structuredClone(fixture.evidence[4])
  }
});
const input = {
  profile: 'authorized_purchase/v1',
  action: fixture.action,
  evidence: fixture.evidence.slice(0, 3)
};
const result = await resolver.collect(input);
const proofCase = resolver.createCase({ ...input, evidence: result.evidence });
const verification = new ProofCaseVerifier({ policy }).verify(proofCase);
console.log(JSON.stringify({ before: result.before.status, acquisition: result.events,
  after: proofCase.resolution.status, verification: verification.status }, null, 2));
console.log('Signed fixtures only. Replace collectors with your own trusted evidence sources.');
if (!verification.valid) process.exitCode = 1;
