import { readFileSync, writeFileSync } from "node:fs";

const path = "cli/tests/run-agentready-community-release-workflow-test.mjs";
const lines = readFileSync(path, "utf8").split("\n");
let replacements = 0;

const updated = lines.map((line) => {
  if (line.includes("assert.match(workflow, /Repository: BACOUL")) {
    replacements += 1;
    return 'assert.ok(workflow.includes("assert.match(nextPrompt, /Repository:"));';
  }
  return line;
});

if (replacements !== 1) {
  throw new Error(`Expected exactly one executable-prompt repository assertion, found ${replacements}.`);
}

writeFileSync(path, updated.join("\n"));
console.log("Stabilized Community release executable-prompt guard.");
