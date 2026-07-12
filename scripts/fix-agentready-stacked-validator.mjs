import fs from "node:fs";

const file = "scripts/agentready-execution-lib.mjs";
let content = fs.readFileSync(file, "utf8");

const before = `      for (const dep of batch.depends_on_batches || []) add(batches.get(dep)?.status === "DONE", \`${'${batch.id}'} READY but batch dependency ${'${dep}'} is not DONE\`);`;
const after = `      for (const dep of batch.depends_on_batches || []) {
        const dependency = batches.get(dep);
        const stackedDependencyAccepted = batch.stacked_execution_authorized === true
          && batch.stacked_on_batch === dep
          && dependency?.status === "IN_REVIEW";
        add(dependency?.status === "DONE" || stackedDependencyAccepted, \`${'${batch.id}'} READY but batch dependency ${'${dep}'} is neither DONE nor an authorized IN_REVIEW stack base\`);
      }`;

if (!content.includes(before)) throw new Error("Stacked READY validator target not found");
content = content.replace(before, after);
fs.writeFileSync(file, content);

for (const temporary of [
  "scripts/fix-agentready-stacked-validator.mjs",
  "scripts/apply-agentready-global-site-program.mjs",
  "docs/agentready/GLOBAL_SITE_MIGRATION_DIAGNOSTIC.txt"
]) {
  if (fs.existsSync(temporary)) fs.rmSync(temporary);
}

console.log("Stacked batch validator corrected and temporary files removed.");
