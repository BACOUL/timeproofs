import { reconcileBatch } from "./agentready-execution-lib.mjs";

function arg(name) {
  const index = process.argv.indexOf(name);
  return index === -1 ? null : process.argv[index + 1];
}

const batchId = arg("--batch");
const pr = arg("--pr");
const mergeSha = arg("--merge-sha");
const write = process.argv.includes("--write");

if (!batchId || !pr || !mergeSha) {
  throw new Error("Usage: node scripts/reconcile-agentready-batch.mjs --batch ARB-XXX-001 --pr 123 --merge-sha <SHA> [--write]");
}

const result = reconcileBatch({ batchId, pr, mergeSha, write });
console.log(`Reconciled ${batchId}.`);
if (result.next?.kind === "batch") {
  console.log(`Next action: ${result.next.batch.id} - ${result.next.batch.title}`);
} else {
  console.log(`Next action: ${result.next ? `${result.next.task.id} - ${result.next.task.title}` : "none"}`);
}
