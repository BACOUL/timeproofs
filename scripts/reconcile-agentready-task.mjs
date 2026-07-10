import { reconcileTask } from "./agentready-execution-lib.mjs";

function arg(name) {
  const index = process.argv.indexOf(name);
  return index === -1 ? null : process.argv[index + 1];
}

const taskId = arg("--task");
const pr = arg("--pr");
const mergeSha = arg("--merge-sha");
const write = process.argv.includes("--write");

if (!taskId || !pr || !mergeSha) {
  throw new Error("Usage: node scripts/reconcile-agentready-task.mjs --task AR-XXX-001 --pr 123 --merge-sha <SHA> [--write]");
}

const result = reconcileTask({ taskId, pr, mergeSha, write });
console.log(`Reconciled ${taskId}.`);
console.log(`Next action: ${result.next ? `${result.next.task.id} - ${result.next.task.title}` : "none"}`);
