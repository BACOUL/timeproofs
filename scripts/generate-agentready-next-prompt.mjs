import { generatedPaths, readLedger, writeGeneratedViews } from "./agentready-execution-lib.mjs";

if (!process.argv.includes("--write")) {
  console.log("Dry run: pass --write to update the next Codex prompt.");
  process.exit(0);
}

writeGeneratedViews(readLedger(), [generatedPaths.nextPrompt]);
console.log("AgentReady next Codex prompt generated.");
