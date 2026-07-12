import { readFileSync, writeFileSync } from "node:fs";

function read(path) {
  return readFileSync(path, "utf8");
}

function write(path, content) {
  writeFileSync(path, content.endsWith("\n") ? content : `${content}\n`);
}

function replaceOnce(content, before, after, label) {
  const index = content.indexOf(before);
  if (index < 0) throw new Error(`Missing replacement anchor: ${label}`);
  if (content.indexOf(before, index + before.length) >= 0) throw new Error(`Ambiguous replacement anchor: ${label}`);
  return `${content.slice(0, index)}${after}${content.slice(index + before.length)}`;
}

function replaceBetween(content, start, end, replacement, label) {
  const startIndex = content.indexOf(start);
  if (startIndex < 0) throw new Error(`Missing start anchor: ${label}`);
  const endIndex = content.indexOf(end, startIndex);
  if (endIndex < 0) throw new Error(`Missing end anchor: ${label}`);
  return `${content.slice(0, startIndex)}${replacement}\n${content.slice(endIndex)}`;
}

const rebuildPath = "scripts/rebuild-agentready-ledger-data.mjs";
let rebuild = read(rebuildPath);

rebuild = replaceOnce(
  rebuild,
  '  actionUsage: "docs/agentready/GITHUB_ACTION_USAGE.md",\n',
  '  actionUsage: "docs/agentready/GITHUB_ACTION_USAGE.md",\n  actionExecution: "docs/agentready/GITHUB_ACTION_MARKETPLACE_EXECUTION_SPEC.md",\n',
  "action execution document map"
);

const arCom007 = String.raw`codex("AR-COM-EPIC", "AR-COM-007", "M3", "BEFORE_COMMUNITY_PUBLICATION", "COM", "Publish public AgentReady GitHub Action distribution", {
  decision_ids: [...decisionIds, validationDecisionId],
  depends_on: ["AR-COM-006"],
  source_documents: [doc.action, doc.actionUsage, doc.actionExecution, doc.validation],
  branch: "feat-distribution-agentready-marketplace-action",
  pr_title: "feat(distribution): publish AgentReady GitHub Marketplace action",
  allowed_paths: ["action.yml", ".github/actions/agentready/action.yml", ".github/workflows/**", "cli/tests/**", "scripts/**", "docs/agentready/**", "README.md", "AGENTREADY_PROJECT_CONTEXT.md", "CHANGELOG.md", "index.html", "pricing.html", "agentready-ci.html"],
  forbidden_paths: ["agentready-core/**", "bin/**", "package.json", "packaging/agentready-community/**", "LICENSE", "NOTICE", "server/**", "api/**"],
  deliverables: ["canonical root action.yml", "nested Action metadata removal and reference migration", "public tag-pinned and SHA-pinned workflows", "minimum permissions example", "Marketplace release preparation", "supply-chain and compromised-release procedure", "active public-site Community and Pro alignment", "Action release evidence record"],
  estimated_files_or_surfaces: ["/action.yml", "/.github/actions/agentready/action.yml removal", "AgentReady workflows", "Action tests", "README and Action docs", "index.html", "pricing.html", "agentready-ci.html", "Action release evidence"],
  acceptance_criteria: ["one Marketplace metadata file exists at repository root as action.yml", "nested Action metadata is removed after every reference is migrated", "root Action preserves file type min-score fail-on and out inputs", "root Action preserves score status report-path and contract-path outputs", "root Action preserves exit codes and policy-failure outputs", "root metadata contains the reviewed unique-name candidate author description shield branding and blue color", "internal workflows use the root Action", "public docs include immutable Action tag and full-SHA examples", "canonical consumer workflow declares contents read and no broader permissions", "no secret or TimeProofs backend is required", "existing v0.1.0-alpha.0 tag and release remain unchanged", "reserved tag agentready-action-v0.1.0-alpha.0 is used only at the owner checkpoint", "Marketplace publication is performed only through the reviewed owner checkpoint", "public site states Community is available and Pro is in preparation", "active public pages remove manual review Fix Pack email payment mandatory contact and available-Pro wording", "Marketplace wording does not imply GitHub validation certification or guaranteed safety", "no npm operation package version change engine change or runtime feature is introduced"],
  independent_test_plan: ["run the complete core CLI Action package and Community release workflow suite", "validate root metadata and absence of nested metadata", "exercise OpenAPI PASS MCP PASS expected policy FAIL and invalid-input behavior", "verify outputs survive valid policy failure", "verify canonical workflow permissions are contents read only", "verify all local Action references are migrated", "verify tag and full-SHA examples", "verify active site pages contain current Community Pro and limitation copy and no obsolete offers", "after owner publication run the public Action by immutable tag and record the full-SHA form", "run strategy and execution-system validators and deterministic regeneration"],
  required_commands: ["node agentready-core/tests/run-agentready-core-tests.mjs", "node cli/tests/run-agentready-cli-tests.mjs", "node cli/tests/run-agentready-action-smoke-test.mjs", "node cli/tests/run-agentready-package-smoke-test.mjs", "node cli/tests/run-agentready-community-release-workflow-test.mjs", "node scripts/validate-agentready-action-marketplace-readiness.mjs", "node scripts/rebuild-agentready-ledger-data.mjs", "node scripts/generate-agentready-ledger-views.mjs --write", "node scripts/generate-agentready-status.mjs --write", "node scripts/generate-agentready-next-action.mjs --write", "node scripts/generate-agentready-next-prompt.mjs --write", "node scripts/validate-agentready-strategy-docs.mjs", "node scripts/validate-agentready-execution-system.mjs", "git diff --check"],
  required_evidence: ["root action.yml metadata audit", "nested-reference migration inventory", "Action test and workflow evidence", "exact approved Action implementation commit SHA", "immutable Action tag and verified target", "GitHub prerelease URL", "Marketplace listing URL", "owner private agreement and 2FA completion attestation without secrets", "public immutable-tag workflow run", "full-SHA usage example", "minimum-permissions review", "supply-chain review", "public-site alignment report", "compromised-release and rollback procedure"],
  manual_actions: ["JEASON reviews and approves the exact implementation commit before tagging", "JEASON accepts the GitHub Marketplace Developer Agreement if requested", "JEASON privately creates the immutable Action tag and Marketplace GitHub Release with 2FA", "JEASON provides only public Release and Marketplace URLs and confirmation, never credentials or codes", "JEASON reviews final evidence before merge"],
  authorized_actions: ["create root action.yml and remove the nested Action metadata after reference migration", "update AgentReady workflows tests active docs and the three approved public pages", "prepare the Action-specific prerelease notes and evidence record", "after owner approval create public documentation using agentready-action-v0.1.0-alpha.0 and the verified full SHA", "verify the public GitHub Release and Marketplace listing"],
  forbidden_actions: ["do not perform any npm login publish unpublish deprecate or dist-tag operation", "do not move delete recreate or repurpose v0.1.0-alpha.0", "do not create a moving Action major tag", "do not modify package.json package staging AgentReady engine or CLI implementation", "do not request receive print store or create passwords 2FA codes recovery codes tokens or secrets", "do not automate Marketplace agreement acceptance or owner 2FA", "do not add telemetry contract uploads hosted scans runtime execution billing Stripe accounts licenses or dashboards", "do not claim GitHub reviewed certified or guaranteed AgentReady results", "do not merge before owner review and post-publication evidence"],
  codex_preflight_steps: ["verify v0.1.0-alpha.0 still targets 150da23932c1fb9433cb3d546904f03c18c909e9", "verify root action.yml is absent before implementation", "run the existing nested Action tests before migration", "inventory every .github/actions/agentready reference", "inventory active site wording for manual review Fix Pack email payment mandatory contact stale Community status and available-Pro claims", "confirm no npm operation is needed", "open a draft PR before the owner checkpoint"],
  owner_checkpoint_steps: ["review and approve the exact implementation commit SHA", "accept the GitHub Marketplace Developer Agreement if GitHub requests it", "create immutable tag agentready-action-v0.1.0-alpha.0 on exactly the approved implementation commit", "draft a prerelease from that tag and select Publish this Action to the GitHub Marketplace", "resolve only factual metadata warnings or a name conflict through the reviewed PR", "choose the closest current Marketplace categories", "publish privately with owner 2FA", "return only the public Release URL Marketplace URL and confirmation without credentials or codes"],
  post_confirmation_steps: ["verify the Action tag target", "verify the GitHub prerelease and Marketplace listing", "verify final name description branding categories links inputs outputs and usage", "run the public Action by immutable tag from a controlled workflow", "record the full-SHA form", "replace documentation placeholders with verified references", "record release listing workflow and site-alignment evidence", "leave the PR open for final human review and merge"],
  notes: "The Action-specific tag namespace preserves the existing immutable npm and repository release. If GitHub Marketplace rejects the current repository composition, stop publication and return through change control for a dedicated Action repository decision.",
  scope_justification: "One atomic public-distribution boundary: root Action migration, Marketplace-compliant metadata, owner publication checkpoint, immutable release evidence, and narrowly scoped active-site alignment share one review and rollback boundary."
});`;

rebuild = replaceBetween(
  rebuild,
  'codex("AR-COM-EPIC", "AR-COM-007"',
  'codex("AR-COM-EPIC", "AR-COM-008"',
  arCom007,
  "AR-COM-007 block"
);

const arCom009 = String.raw`codex("AR-COM-EPIC", "AR-COM-009", "M3", "BEFORE_COMMUNITY_PUBLICATION", "COM", "Prepare GitHub Marketplace listing compliance", {
  decision_ids: [...decisionIds, validationDecisionId],
  depends_on: ["AR-COM-007"],
  source_documents: [doc.action, doc.actionUsage, doc.actionExecution, doc.validation],
  branch: "feat-distribution-agentready-marketplace-action",
  pr_title: "feat(distribution): publish AgentReady GitHub Marketplace action",
  allowed_paths: ["action.yml", ".github/actions/agentready/action.yml", ".github/workflows/**", "cli/tests/**", "scripts/**", "docs/agentready/**", "README.md", "AGENTREADY_PROJECT_CONTEXT.md", "CHANGELOG.md", "index.html", "pricing.html", "agentready-ci.html"],
  forbidden_paths: ["agentready-core/**", "bin/**", "package.json", "packaging/agentready-community/**", "LICENSE", "NOTICE", "server/**", "api/**"],
  deliverables: ["Marketplace-compliant root metadata", "factual listing copy", "unique-name owner verification", "branding and category review", "tag release and listing evidence checklist", "Marketplace removal and corrective-release procedure"],
  estimated_files_or_surfaces: ["/action.yml", "Marketplace GitHub Release", "Marketplace listing", "Action release evidence documentation"],
  acceptance_criteria: ["repository is public", "one action.yml exists at root", "metadata name is confirmed unique by the Marketplace interface", "author description inputs outputs runs and branding are valid", "listing copy states static scope privacy behavior and mandatory limitation", "listing does not imply GitHub validation certification or guaranteed safety", "immutable tag and full-SHA guidance are visible", "minimum contents-read permission is visible", "Marketplace Developer Agreement and owner 2FA remain private owner actions", "final public Release and Marketplace URLs are recorded", "a Marketplace validation rejection stops publication and is recorded honestly"],
  independent_test_plan: ["run the Marketplace readiness validator", "review metadata against current official GitHub requirements", "verify UI validation warnings at the owner checkpoint", "verify public listing after publication", "verify removal and corrective-release instructions"],
  required_commands: ["node cli/tests/run-agentready-action-smoke-test.mjs", "node scripts/validate-agentready-action-marketplace-readiness.mjs", "node scripts/validate-agentready-strategy-docs.mjs", "node scripts/validate-agentready-execution-system.mjs"],
  required_evidence: ["root metadata review", "unique-name UI result", "listing copy review", "branding and category review", "version pinning and permissions review", "GitHub Release URL", "Marketplace URL", "owner checkpoint attestation", "public listing verification"]
});`;

rebuild = replaceBetween(
  rebuild,
  'codex("AR-COM-EPIC", "AR-COM-009"',
  'epic("AR-ONB-EPIC"',
  arCom009,
  "AR-COM-009 block"
);

const oldBatchLine = '  ["ARB-COM-002", "Publish public GitHub Action distribution", ["AR-COM-007", "AR-COM-009"]],';
const newBatchLine = '  ["ARB-COM-002", "Publish public GitHub Action distribution", ["AR-COM-007", "AR-COM-009"], { status: "READY", spec_status: "EXECUTION_READY", owner: "CODEX_AND_JEASON", branch: "feat-distribution-agentready-marketplace-action", pr_title: "feat(distribution): publish AgentReady GitHub Marketplace action", allowed_paths: ["action.yml", ".github/actions/agentready/action.yml", ".github/workflows/**", "cli/tests/**", "scripts/**", "docs/agentready/**", "README.md", "AGENTREADY_PROJECT_CONTEXT.md", "CHANGELOG.md", "index.html", "pricing.html", "agentready-ci.html"], forbidden_paths: ["agentready-core/**", "bin/**", "package.json", "packaging/agentready-community/**", "LICENSE", "NOTICE", "server/**", "api/**"], deliverables: ["canonical root Marketplace Action", "migrated workflows and tests", "tag-pinned and SHA-pinned public workflows", "Marketplace prerelease and listing", "supply-chain and rollback documentation", "current public-site alignment", "immutable evidence record"], acceptance_criteria: ["all AR-COM-007 and AR-COM-009 criteria pass", "all automated validations pass before the owner checkpoint", "owner publishes only the approved immutable Action commit", "post-publication public Action run passes", "release listing and site evidence are recorded before merge", "existing npm package release and tag remain unchanged"], independent_test_plan: ["preflight existing Action behavior", "validate root migration and metadata", "run complete regression suite", "validate active site copy", "perform owner Marketplace checkpoint", "verify public tag listing and full-SHA references", "rerun deterministic governance generation"], required_commands: ["node agentready-core/tests/run-agentready-core-tests.mjs", "node cli/tests/run-agentready-cli-tests.mjs", "node cli/tests/run-agentready-action-smoke-test.mjs", "node cli/tests/run-agentready-package-smoke-test.mjs", "node cli/tests/run-agentready-community-release-workflow-test.mjs", "node scripts/validate-agentready-action-marketplace-readiness.mjs", "node scripts/rebuild-agentready-ledger-data.mjs", "node scripts/generate-agentready-ledger-views.mjs --write", "node scripts/generate-agentready-status.mjs --write", "node scripts/generate-agentready-next-action.mjs --write", "node scripts/generate-agentready-next-prompt.mjs --write", "node scripts/validate-agentready-strategy-docs.mjs", "node scripts/validate-agentready-execution-system.mjs", "git diff --check"], required_evidence: ["root metadata audit", "reference migration inventory", "test and workflow evidence", "approved implementation SHA", "immutable Action tag target", "GitHub prerelease URL", "Marketplace URL", "public tag workflow run", "full-SHA example", "permissions and supply-chain review", "site alignment report", "rollback procedure"], rollback_boundary: "Before tagging, revert or close the PR. After Marketplace publication, preserve the immutable tag and audit trail, remove the affected release from Marketplace if necessary, publish a notice, and issue a corrected immutable Action tag.", manual_actions: ["JEASON approves the exact implementation commit", "JEASON accepts any required Marketplace agreement and publishes the tagged prerelease privately with 2FA", "JEASON returns public URLs only", "JEASON reviews final evidence before merge"], authorized_actions: ["prepare and validate the root Action", "migrate internal Action references", "update approved docs tests workflows and public pages", "after owner confirmation verify and record the public Action release and Marketplace listing"], forbidden_actions: ["no npm operation", "no movement or reuse of v0.1.0-alpha.0", "no moving Action major tag", "no engine CLI package billing backend or runtime changes", "no credentials or 2FA material", "no merge before final owner review"], codex_preflight_steps: ["verify existing release immutability", "run existing Action tests", "inventory nested references and stale active-site wording", "confirm root action.yml is absent", "open a draft PR"], owner_checkpoint_steps: ["approve exact implementation SHA", "accept Marketplace agreement if required", "tag exact commit as agentready-action-v0.1.0-alpha.0", "publish Marketplace prerelease with private 2FA", "provide public Release and Marketplace URLs only"], post_confirmation_steps: ["verify tag target release and listing", "run public tag reference", "record full SHA and final metadata", "replace placeholders", "record all evidence", "request final human review"], external_verifications: ["current GitHub Marketplace root metadata and publication requirements", "public Marketplace listing availability"], notes: "If the Marketplace UI rejects repository composition or metadata, stop and return through change control rather than bypassing validation.", scope_justification: "Root Action distribution, Marketplace publication, evidence, and the approved site alignment form one coherent public-release boundary." }],';
rebuild = replaceOnce(rebuild, oldBatchLine, newBatchLine, "ARB-COM-002 execution batch");
write(rebuildPath, rebuild);

const executionLibPath = "scripts/agentready-execution-lib.mjs";
let executionLib = read(executionLibPath);
executionLib = replaceOnce(
  executionLib,
  "## Après confirmation npm",
  "## Après confirmation propriétaire",
  "generic post-owner confirmation heading"
);
write(executionLibPath, executionLib);

const workflowPath = ".github/workflows/agentready-community-release-candidate.yml";
let workflow = read(workflowPath);
workflow = replaceOnce(workflow, "assert.notEqual(nextBatch?.spec_status, 'EXECUTION_READY');", "assert.equal(nextBatch?.status, 'READY');\n          assert.equal(nextBatch?.spec_status, 'EXECUTION_READY');", "workflow batch readiness assertion");
workflow = replaceOnce(workflow, "assert.equal(next?.action_type, 'SPECIFICATION_REFINEMENT_REQUIRED');", "assert.equal(next?.action_type, 'READY');", "workflow next action assertion");
workflow = replaceOnce(workflow, "assert.match(nextPrompt, /No CODEX execution batch is currently authorized/);\n          assert.match(nextPrompt, /not EXECUTION_READY/);\n          assert.doesNotMatch(nextPrompt, /Repository: BACOUL\\/timeproofs/);", "assert.match(nextPrompt, /Repository: BACOUL\\/timeproofs/);\n          assert.match(nextPrompt, /Batch ID: ARB-COM-002/);\n          assert.match(nextPrompt, /Point de contrôle propriétaire obligatoire/);\n          assert.match(nextPrompt, /agentready-action-v0\\.1\\.0-alpha\\.0/);", "workflow generated prompt assertions");
write(workflowPath, workflow);

const releaseTestPath = "cli/tests/run-agentready-community-release-workflow-test.mjs";
let releaseTest = read(releaseTestPath);
releaseTest = replaceOnce(releaseTest, "assert.ok(workflow.includes(\"assert.equal(next?.action_type, 'SPECIFICATION_REFINEMENT_REQUIRED')\"));", "assert.ok(workflow.includes(\"assert.equal(next?.action_type, 'READY')\"));", "release test next action assertion");
releaseTest = replaceOnce(releaseTest, "assert.ok(workflow.includes(\"assert.notEqual(nextBatch?.spec_status, 'EXECUTION_READY')\"));", "assert.ok(workflow.includes(\"assert.equal(nextBatch?.status, 'READY')\"));\nassert.ok(workflow.includes(\"assert.equal(nextBatch?.spec_status, 'EXECUTION_READY')\"));", "release test batch readiness assertion");
releaseTest = replaceOnce(releaseTest, "assert.match(workflow, /No CODEX execution batch is currently authorized/);", "assert.match(workflow, /Repository: BACOUL\\/timeproofs/);\nassert.match(workflow, /Batch ID: ARB-COM-002/);\nassert.match(workflow, /Point de contrôle propriétaire obligatoire/);", "release test prompt content assertions");
releaseTest = replaceOnce(releaseTest, "assert.match(versioning, /v0\\.1\\.0-alpha\\.0: created/);", "assert.match(versioning, /Existing Immutable Repository Release/);", "versioning existing release heading assertion");
releaseTest = replaceOnce(releaseTest, "assert.match(versioning, /GitHub Release `v0\\.1\\.0-alpha\\.0` is created as a prerelease and is not marked\\s+latest/);", "assert.match(versioning, /GitHub prerelease `v0\\.1\\.0-alpha\\.0` exists and is not marked latest/);", "versioning prerelease assertion");
releaseTest = replaceOnce(releaseTest, "assert.match(versioning, /no Marketplace listing exists/);", "assert.match(versioning, /no Marketplace listing exists at the start of `ARB-COM-002`/);\nassert.match(versioning, /agentready-action-v0\\.1\\.0-alpha\\.0/);\nassert.match(versioning, /root `\\/action\\.yml` is not yet published/);", "versioning Marketplace state assertions");
write(releaseTestPath, releaseTest);

console.log("Refined ARB-COM-002 to EXECUTION_READY.");
