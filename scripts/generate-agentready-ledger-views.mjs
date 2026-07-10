import { generatedPaths, readLedger, writeGeneratedViews } from "./agentready-execution-lib.mjs";

if (!process.argv.includes("--write")) {
  console.log("Dry run: pass --write to update generated ledger views.");
  process.exit(0);
}

writeGeneratedViews(readLedger(), [generatedPaths.ledger, generatedPaths.ownerActions, generatedPaths.siteMatrix, generatedPaths.promptCount]);
console.log("AgentReady ledger views generated.");
