import { generatedPaths, readLedger, writeGeneratedViews } from "./agentready-execution-lib.mjs";

if (!process.argv.includes("--write")) {
  console.log("Dry run: pass --write to update AgentReady status.");
  process.exit(0);
}

writeGeneratedViews(readLedger(), [generatedPaths.status, generatedPaths.promptCount]);
console.log("AgentReady status generated.");
