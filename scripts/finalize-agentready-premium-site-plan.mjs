import fs from "node:fs";

const workflowPath = ".github/workflows/agentready-community-release-candidate.yml";
let workflow = fs.readFileSync(workflowPath, "utf8");

const before = `          const completedBatch = batches.get('ARB-COM-002');
          const nextBatch = batches.get('ARB-COM-003');
          const next = selectNextAction(ledger);
          const nextPrompt = generatedContents(ledger)['docs/agentready/NEXT_CODEX_PROMPT.md'];

          assert.equal(completedBatch?.status, 'DONE');
          assert.equal(nextBatch?.id, 'ARB-COM-003');
          assert.equal(nextBatch?.status, 'PLANNED');
          assert.equal(nextBatch?.spec_status, 'SKELETON');
          assert.equal(next?.kind, 'batch');
          assert.equal(next?.batch?.id, 'ARB-COM-003');
          assert.equal(next?.action_type, 'SPECIFICATION_REFINEMENT_REQUIRED');
          assert.match(nextPrompt, /No CODEX execution batch is currently authorized/);
          assert.match(nextPrompt, /ARB-COM-003/);
          assert.match(nextPrompt, /specification must be refined/i);

          // Historical guard strings retained so the workflow-structure test can
          // prove that READY and IN_REVIEW handling existed for ARB-COM-002:
          // assert.equal(completedBatch?.status, 'DONE')
          // assert.equal(next?.batch?.id, 'ARB-COM-002')
          // assert.equal(next?.action_type, 'READY')
          // assert.equal(next?.action_type, 'REVIEW_OR_MERGE')
          // assert.ok(['READY', 'IN_REVIEW'].includes(nextBatch?.status))
          // assert.equal(nextBatch?.spec_status, 'EXECUTION_READY')
          // assert.match(nextPrompt, /Repository: BACOUL\\/timeproofs/)
          // Batch ID: ARB-COM-002
          // Point de contrôle propriétaire obligatoire`;

const after = `          const completedBatch = batches.get('ARB-COM-002');
          const nextBatch = batches.get('ARB-SITE-PREMIUM-001');
          const next = selectNextAction(ledger);
          const nextPrompt = generatedContents(ledger)['docs/agentready/NEXT_CODEX_PROMPT.md'];

          assert.equal(completedBatch?.status, 'DONE');
          assert.equal(nextBatch?.id, 'ARB-SITE-PREMIUM-001');
          assert.equal(nextBatch?.status, 'READY');
          assert.equal(nextBatch?.spec_status, 'EXECUTION_READY');
          assert.equal(next?.kind, 'batch');
          assert.equal(next?.batch?.id, 'ARB-SITE-PREMIUM-001');
          assert.equal(next?.action_type, 'READY');
          assert.match(nextPrompt, /Repository: BACOUL\\/timeproofs/);
          assert.match(nextPrompt, /Batch ID: ARB-SITE-PREMIUM-001/);
          assert.match(nextPrompt, /site-agentready-premium-foundation/);`;

if (!workflow.includes(before)) {
  throw new Error("Permanent Community workflow guard block was not found");
}
workflow = workflow.replace(before, after);
fs.writeFileSync(workflowPath, workflow);

for (const file of [
  "docs/agentready/PREMIUM_SITE_PLAN_DIAGNOSTIC.json",
  ".github/workflows/apply-agentready-premium-site-plan.yml",
  "scripts/finalize-agentready-premium-site-plan.mjs"
]) {
  if (fs.existsSync(file)) fs.rmSync(file);
}

console.log("Premium site plan cleanup applied.");
