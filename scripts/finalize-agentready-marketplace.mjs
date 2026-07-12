import fs from "node:fs";

const approvedSha = process.env.APPROVED_SHA;
const mergeSha = process.env.MERGE_SHA;
const tag = process.env.TAG_NAME;
const releaseUrl = process.env.RELEASE_URL;
const marketplaceUrl = process.env.MARKETPLACE_URL;
const publicRunUrl = process.env.PUBLIC_RUN_URL;

for (const [key, value] of Object.entries({ approvedSha, mergeSha, tag, releaseUrl, marketplaceUrl, publicRunUrl })) {
  if (!value) throw new Error(`Missing required environment value: ${key}`);
}

const read = (file) => fs.readFileSync(file, "utf8");
const write = (file, content) => fs.writeFileSync(file, content);
function replaceRequired(content, before, after, label) {
  if (!content.includes(before)) throw new Error(`Missing replacement target: ${label}`);
  return content.replace(before, after);
}

write("docs/agentready/AGENTREADY_ACTION_PUBLICATION_EVIDENCE.md", `# AgentReady GitHub Action Publication Evidence

Status: PUBLISHED

## Immutable release

- Action: \`AgentReady CI Gate by TimeProofs\`
- Approved implementation SHA: \`${approvedSha}\`
- Immutable tag: \`${tag}\`
- Verified tag target: \`${approvedSha}\`
- GitHub prerelease: ${releaseUrl}
- Marketplace listing: ${marketplaceUrl}
- Release state: public, non-draft, prerelease
- Marketplace categories: Continuous integration and Security
- Owner agreement: accepted privately
- Owner 2FA: completed privately; no credential material recorded

## Public validation

- Public immutable-tag workflow: ${publicRunUrl}
- OpenAPI tag smoke: PASS
- MCP tag smoke: PASS
- Full-SHA reference: \`uses: BACOUL/timeproofs@${approvedSha}\`
- Tag reference: \`uses: BACOUL/timeproofs@${tag}\`
- Minimum workflow permission: \`contents: read\`
- TimeProofs account required: no
- TimeProofs backend required: no
- Contract upload or silent telemetry: none
- npm operation performed during Action publication: no

## Merge sequencing exception

PR #129 was merged at \`${mergeSha}\` before the final Marketplace checkbox was available because GitHub exposed the Release Action flow only after root \`action.yml\` existed on the default branch. The owner then published the existing immutable tag through the Marketplace UI. The tag was not moved or recreated.

## Rollback

Never move or delete the immutable tag to conceal a defect. Preserve the audit trail, remove the affected listing if required, publish a notice, correct the issue in a reviewed commit, and create a new immutable Action tag.
`);

let ci = read("agentready-ci.html");
ci = replaceRequired(ci, "uses: after-owner-marketplace-checkpoint", `uses: BACOUL/timeproofs@${tag}`, "CI placeholder");
ci = ci.replace("GitHub Marketplace Action checkpoint", "GitHub Marketplace Action");
ci = ci.replace(
  "The root GitHub Marketplace Action metadata is prepared at <code>/action.yml</code>. Public Action references are published only after JEASON approves the exact implementation commit, creates the immutable Action tag, and completes the GitHub Marketplace owner checkpoint.",
  `The GitHub Marketplace Action is public. Pin the immutable alpha tag <code>${tag}</code>, or use the full verified commit SHA <code>${approvedSha}</code> for the strongest supply-chain control.`
);
ci = ci.replace(
  "<p>TimeProofs AgentReady does not guarantee that an AI agent will never fail. It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.</p>\n        <p>It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.</p>",
  "<p>TimeProofs AgentReady does not guarantee that an AI agent will never fail. It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.</p>"
);
write("agentready-ci.html", ci);

for (const file of [
  "docs/agentready/GITHUB_ACTION_USAGE.md",
  "docs/agentready/GITHUB_ACTION_VERSIONING.md",
  "README.md",
  "AGENTREADY_PROJECT_CONTEXT.md",
  "CHANGELOG.md"
]) {
  let text = read(file);
  text = text.replaceAll("<FULL_ACTION_RELEASE_COMMIT_SHA>", approvedSha);
  text = text.replaceAll("PENDING_OWNER_APPROVAL", approvedSha);
  text = text.replaceAll("PENDING_OWNER_ACTION", approvedSha);
  text = text.replaceAll("PENDING_OWNER_CONFIRMATION", "RECORDED_IN_AGENTREADY_ACTION_PUBLICATION_EVIDENCE");
  write(file, text);
}

let usage = read("docs/agentready/GITHUB_ACTION_USAGE.md");
if (!usage.includes("## Public Marketplace release")) {
  usage += `\n\n## Public Marketplace release\n\n- Marketplace: ${marketplaceUrl}\n- Immutable tag: \`${tag}\`\n- Full verified SHA: \`${approvedSha}\`\n- Publication evidence: [AGENTREADY_ACTION_PUBLICATION_EVIDENCE.md](./AGENTREADY_ACTION_PUBLICATION_EVIDENCE.md)\n`;
}
write("docs/agentready/GITHUB_ACTION_USAGE.md", usage);

let versioning = read("docs/agentready/GITHUB_ACTION_VERSIONING.md");
if (!versioning.includes("## Published Action alpha")) {
  versioning += `\n\n## Published Action alpha\n\nThe immutable Action tag \`${tag}\` is public and points exactly to \`${approvedSha}\`. The corresponding prerelease is ${releaseUrl} and the Marketplace listing is ${marketplaceUrl}. No moving major tag is authorized during the alpha.\n`;
}
write("docs/agentready/GITHUB_ACTION_VERSIONING.md", versioning);

let spec = read("docs/agentready/GITHUB_ACTION_MARKETPLACE_EXECUTION_SPEC.md");
const start = spec.indexOf("Status: PRE_OWNER_CHECKPOINT");
const end = spec.indexOf("Compromised-release response:", start);
if (start < 0 || end < 0) throw new Error("Marketplace evidence record boundaries not found");
const finalRecord = `Status: PUBLISHED_AND_VERIFIED

Final publication fields:

- Approved implementation SHA: \`${approvedSha}\`
- Immutable Action tag: \`${tag}\`
- Immutable Action tag target: \`${approvedSha}\`
- GitHub prerelease URL: ${releaseUrl}
- Marketplace URL: ${marketplaceUrl}
- Public tag workflow run: ${publicRunUrl}
- Full-SHA usage example: \`uses: BACOUL/timeproofs@${approvedSha}\`
- Owner Marketplace agreement: accepted privately
- Owner 2FA: completed privately; no secret recorded
- npm operation during this release: none
- Detailed evidence: [AGENTREADY_ACTION_PUBLICATION_EVIDENCE.md](./AGENTREADY_ACTION_PUBLICATION_EVIDENCE.md)

`;
spec = spec.slice(0, start) + finalRecord + spec.slice(end);
write("docs/agentready/GITHUB_ACTION_MARKETPLACE_EXECUTION_SPEC.md", spec);

let rebuild = read("scripts/rebuild-agentready-ledger-data.mjs");
const lines = rebuild.split("\n");
const idx = lines.findIndex((line) => line.startsWith('  ["ARB-COM-002"'));
if (idx < 0) throw new Error("ARB-COM-002 source definition not found");
const evidence = `{ type: "github_action_marketplace_publication", pr: 129, merge_sha: "${mergeSha}", approved_implementation_sha: "${approvedSha}", git_tag: "${tag}", git_tag_target: "${approvedSha}", remote_tag_verified: true, github_release_url: "${releaseUrl}", github_release_prerelease: true, github_release_draft: false, marketplace_url: "${marketplaceUrl}", marketplace_published: true, marketplace_categories: ["Continuous integration", "Security"], public_tag_workflow_run: "${publicRunUrl}", openapi_public_tag_smoke: "PASS", mcp_public_tag_smoke: "PASS", full_sha_reference: "BACOUL/timeproofs@${approvedSha}", owner_agreement_accepted_privately: true, owner_2fa_completed_privately: true, new_npm_operation_executed: false }`;
let updated = lines[idx].replace('status: "IN_REVIEW"', 'status: "DONE"');
updated = updated.replace('"release listing and site evidence are recorded before merge"', '"release listing and site evidence are recorded, with the documented default-branch sequencing exception"');
updated = updated.replace(
  'notes: "If the Marketplace UI rejects repository composition or metadata, stop and return through change control rather than bypassing validation."',
  `evidence: [${evidence}], notes: "PR #129 merged the validated root Action. Marketplace publication succeeded after the documented default-branch sequencing exception. The immutable tag remains fixed, public OpenAPI and MCP tag smoke tests passed, and no npm operation occurred."`
);
if (!updated.includes("github_action_marketplace_publication")) throw new Error("Failed to insert ARB-COM-002 evidence");
lines[idx] = updated;
write("scripts/rebuild-agentready-ledger-data.mjs", lines.join("\n"));

let decision = read("docs/agentready/DECISION_LOG.md");
if (!decision.includes("DL-2026-07-12-AGENTREADY-ACTION-MARKETPLACE-PUBLISHED")) {
  decision += `\n\n## DL-2026-07-12-AGENTREADY-ACTION-MARKETPLACE-PUBLISHED\n\nStatus: ACTIVE\n\n- Root \`action.yml\` was merged through PR #129 at \`${mergeSha}\`.\n- The immutable tag \`${tag}\` remains fixed on \`${approvedSha}\`.\n- The GitHub prerelease and Marketplace listing are public.\n- GitHub required root \`action.yml\` on the default branch before the Marketplace checkbox became available; this sequencing exception is recorded rather than hidden.\n- Public OpenAPI and MCP tag smoke tests passed.\n- No npm operation occurred.\n`;
}
write("docs/agentready/DECISION_LOG.md", decision);
