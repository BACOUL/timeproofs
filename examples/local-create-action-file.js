#!/usr/bin/env node
/* examples/local-create-action-file.js
 *
 * Local TimeProofs Action File demo.
 *
 * What this does:
 * - builds a synthetic Action File locally with createActionFile;
 * - calculates integrity.payload_hash locally;
 * - writes a .action.json example file.
 *
 * What this does not do:
 * - no API calls;
 * - no /api/seal;
 * - no /api/verify-seal;
 * - no seal creation;
 * - no private keys;
 * - no sensitive content upload.
 *
 * Run from repo root:
 *   node examples/local-create-action-file.js
 */

const fs = require("fs");
const path = require("path");

const {
  createActionFile,
  hashActionFileCore,
} = require("../sdk/action-file-v1.js");

const repoRoot = path.resolve(__dirname, "..");
const outputDir = path.join(repoRoot, "examples", "generated");
const outputPath = path.join(outputDir, "local-demo-document-generated.action.json");

async function main() {
  const actionFile = createActionFile({
    action_id: "act_local_demo_document_generated_001",
    created_at: "2026-06-16T22:30:00Z",
    actor: {
      type: "automation",
      id: "local-demo-agent",
      name: "Local Demo Agent",
      version: "1.0.0",
    },
    action: {
      type: "document.generated",
      status: "executed",
      summary: "Generated a synthetic internal document record locally.",
      occurred_at: "2026-06-16T22:30:00Z",
    },
    proof_level: "executed",
    workflow: {
      provider: "local-demo",
      workflow_id: "wf_local_demo_document_generation",
      run_id: "run_local_demo_001",
      environment: "local",
    },
    target_system: {
      type: "local_filesystem",
      name: "Local demo output",
      reference: "examples/generated/local-demo-document-generated.action.json",
    },
    evidence: {
      references: [
        {
          type: "document_fingerprint",
          reference: "synthetic-document-demo-001",
          fingerprint: "sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          stored_by: "customer",
        },
      ],
    },
    redaction: {
      strategy: "synthetic-demo-only",
      sensitive_content_included: false,
      notes: "This demo uses synthetic metadata and placeholder fingerprints only.",
    },
    limitations: [
      "Synthetic local demo only.",
      "No TimeProofs Seal is created by this script.",
      "No API call is made and no sensitive content is uploaded.",
      "The payload hash proves local canonical payload integrity only until a future Seal is added.",
    ],
    metadata: {
      demo: true,
      generated_by: "examples/local-create-action-file.js",
    },
    local_annotations: {
      note: "This annotation is outside the hashable payload.",
    },
  });

  const payloadHash = await hashActionFileCore(actionFile);
  actionFile.integrity.payload_hash = payloadHash;

  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(actionFile, null, 2)}\n`, "utf8");

  console.log("TimeProofs local Action File demo complete.");
  console.log(`Output: ${path.relative(repoRoot, outputPath)}`);
  console.log(`Payload hash: ${payloadHash}`);
  console.log("No API call was made. No Seal was created.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
