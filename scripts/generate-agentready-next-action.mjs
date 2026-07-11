import { generatedPaths, readLedger, selectNextAction, writeGeneratedViews } from "./agentready-execution-lib.mjs";

const ledger = readLedger();
const next = selectNextAction(ledger);
if (!next) throw new Error("No next action could be selected.");

if (!process.argv.includes("--write")) {
  console.log(`${next.task.id}: ${next.task.title}`);
  process.exit(0);
}

writeGeneratedViews(ledger, [generatedPaths.nextAction]);
console.log("AgentReady next action generated.");
