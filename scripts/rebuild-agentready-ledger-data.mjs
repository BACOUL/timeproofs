import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const decisionIds = ["DL-2026-07-10-CANONICAL-EXECUTION-SYSTEM"];
const validationDecisionId = "DL-2026-07-12-VALIDATION-GATES";
const commonForbidden = ["package.json", "LICENSE", "agentready-core/**", "bin/**", ".github/actions/**", "*.html"];
const siteForbidden = ["package.json", "LICENSE", "agentready-core/**", "bin/**", ".github/actions/**"];
const generatedFiles = [
  "docs/agentready/AGENTREADY_EXECUTION_LEDGER.md",
  "docs/agentready/AGENTREADY_STATUS.md",
  "docs/agentready/NEXT_ACTION.md",
  "docs/agentready/NEXT_CODEX_PROMPT.md",
  "docs/agentready/OWNER_AND_EXTERNAL_ACTIONS.md",
  "docs/agentready/GLOBAL_SITE_SEO_GEO_COMPETITIVE_MATRIX.md",
  "docs/agentready/AGENTREADY_CODEX_PROMPT_COUNT.json"
];

const doc = {
  master: "docs/agentready/AGENTREADY_MASTER_PLAN.md",
  sequence: "docs/agentready/EXECUTION_SEQUENCE.md",
  decision: "docs/agentready/DECISION_LOG.md",
  change: "docs/agentready/PROJECT_CHANGE_CONTROL.md",
  blockers: "docs/agentready/COMMUNITY_PUBLICATION_BLOCKERS.md",
  npm: "docs/agentready/COMMUNITY_NPM_SCOPE_AUDIT.md",
  license: "docs/agentready/COMMUNITY_LICENSE_DECISION.md",
  proofspec: "docs/agentready/COMMUNITY_PROOFSPEC_REFERENCE_AUDIT.md",
  policy: "docs/agentready/COMMUNITY_PUBLICATION_POLICY.md",
  tarball: "docs/agentready/COMMUNITY_TARBALL_PUBLIC_CONTENT_AUDIT.md",
  release: "docs/agentready/COMMUNITY_RELEASE_WORKFLOW.md",
  cli: "docs/agentready/CLI_PUBLIC_DISTRIBUTION.md",
  action: "docs/agentready/GITHUB_ACTION_VERSIONING.md",
  actionUsage: "docs/agentready/GITHUB_ACTION_USAGE.md",
  actionExecution: "docs/agentready/GITHUB_ACTION_MARKETPLACE_EXECUTION_SPEC.md",
  onboarding: "docs/agentready/THREE_MINUTE_ONBOARDING_SPEC.md",
  engine: "docs/agentready/ENGINE_QUALITY_AND_BENCHMARK_PLAN.md",
  commercial: "docs/agentready/COMMERCIAL_FIXTURE_CI_GATE_BEHAVIOR.md",
  rules: "docs/agentready/AGENTREADY_RULE_CODES.md",
  entitlements: "docs/agentready/COMMUNITY_PRO_ENTITLEMENTS.md",
  pricing: "docs/agentready/PRICING_AND_ENTITLEMENTS_V0_1.md",
  licensing: "docs/agentready/LICENSE_AND_ENTITLEMENT_ARCHITECTURE.md",
  billing: "docs/agentready/AUTOMATED_PURCHASE_AND_BILLING_FLOW.md",
  premium: "docs/agentready/PREMIUM_SITE_REQUIREMENTS.md",
  premiumRedesign: "docs/agentready/PREMIUM_SITE_REDESIGN_EXECUTION_SPEC.md",
  globalSite: "docs/agentready/GLOBAL_STANDARD_SITE_PROGRAM.md",
  ia: "docs/agentready/PUBLIC_SITE_INFORMATION_ARCHITECTURE.md",
  copy: "docs/agentready/SITE_COPY_GUIDE.md",
  seo: "docs/agentready/SEO_GEO_AI_FIRST_REQUIREMENTS.md",
  comp: "docs/agentready/COMPETITIVE_POSITIONING.md",
  readme: "docs/agentready/README.md",
  json: "docs/agentready/AGENTREADY_JSON_SPEC.md",
  adoption: "docs/agentready/DISTRIBUTION_ADOPTION_AND_STANDARDIZATION_STRATEGY.md",
  ruleFormat: "docs/agentready/RULE_FORMAT_AND_GOVERNANCE.md",
  legal: "docs/agentready/LEGAL_IP_AND_LIABILITY_STRATEGY.md",
  legalReq: "docs/agentready/LEGAL_PRIVACY_AND_COOKIE_REQUIREMENTS.md",
  privacy: "docs/agentready/PRIVACY_TELEMETRY_SUPPORT_AND_TRUST_MODEL.md",
  diligence: "docs/agentready/DUE_DILIGENCE_AND_TRANSFERABILITY.md",
  launch: "docs/agentready/GLOBAL_LAUNCH_READINESS_MATRIX.md",
  gtm: "docs/agentready/GO_TO_MARKET_PLAN.md",
  self: "docs/agentready/SELF_SERVICE_EXECUTION_PLAN.md",
  mcp: "docs/agentready/MCP_VERSION_COMPATIBILITY_POLICY.md",
  validation: "docs/agentready/VALIDATION_GATES_AND_EXTERNAL_PILOT.md"
};

const tasks = [];
const executionBatches = [];
const historicalPrTaskIds = new Set(["AR-GOV-001", "AR-GOV-002", "AR-GOV-003"]);
const slug = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 70);

function task(input) {
  const t = {
    id: input.id,
    parent_id: input.parent_id ?? null,
    decision_ids: input.decision_ids ?? decisionIds,
    task_type: input.task_type,
    milestone: input.milestone,
    delivery_horizon: input.delivery_horizon,
    workstream: input.workstream,
    title: input.title,
    objective: input.objective ?? `${input.title}.`,
    status: input.status ?? "PLANNED",
    owner: input.owner ?? "CODEX",
    weight: input.weight ?? 3,
    depends_on: input.depends_on ?? [],
    blocks: input.blocks ?? [],
    source_documents: input.source_documents ?? [doc.master],
    branch: input.branch ?? "",
    pr_title: input.pr_title ?? "",
    ...(input.pr_number ? { pr_number: input.pr_number } : {}),
    allowed_paths: input.allowed_paths ?? [],
    forbidden_paths: input.forbidden_paths ?? [],
    acceptance_criteria: input.acceptance_criteria ?? [`${input.title} complete`],
    required_commands: input.required_commands ?? [],
    required_evidence: input.required_evidence ?? [`${input.title} evidence`],
    evidence: input.evidence ?? [],
    execution_batch_id: input.execution_batch_id ?? null,
    manual_actions: input.manual_actions ?? [],
    authorized_actions: input.authorized_actions ?? [],
    forbidden_actions: input.forbidden_actions ?? [],
    codex_preflight_steps: input.codex_preflight_steps ?? [],
    owner_checkpoint_steps: input.owner_checkpoint_steps ?? [],
    post_confirmation_steps: input.post_confirmation_steps ?? [],
    external_verification: input.external_verification ?? null,
    decision_gate: input.decision_gate ?? null,
    validation_thresholds: input.validation_thresholds ?? null,
    recurrence: input.recurrence ?? null,
    notes: input.notes ?? ""
  };
  if (t.task_type === "CODEX_PR" || t.task_type === "CODEX_WORK_ITEM") {
    t.branch = t.branch || slug(t.pr_title || t.title);
    t.pr_title = t.pr_title || `${t.workstream.toLowerCase()}(agentready): ${t.title.toLowerCase()}`;
    t.allowed_paths = t.allowed_paths.length ? t.allowed_paths : ["docs/agentready/**"];
    t.forbidden_paths = t.forbidden_paths.length ? t.forbidden_paths : commonForbidden;
    t.deliverables = input.deliverables ?? [t.title];
    t.estimated_files_or_surfaces = input.estimated_files_or_surfaces ?? ["one coherent file or surface family"];
    t.independent_test_plan = input.independent_test_plan ?? ["run relevant existing tests", "run execution-system validator"];
    t.rollback_boundary = input.rollback_boundary ?? `Revert ${t.branch} without reverting unrelated work.`;
    t.scope_justification = input.scope_justification ?? (t.weight === 5 ? "Weight 5 justified: complex but single reviewable system with one rollback boundary." : "Single coherent deliverable with independent review and rollback.");
  }
  tasks.push(t);
  return t;
}
const epic = (id, milestone, horizon, workstream, title, depends_on = []) => task({ id, task_type: "EPIC", milestone, delivery_horizon: horizon, workstream, title, objective: `${title} workstream.`, status: milestone === "M1" ? "IN_PROGRESS" : "PLANNED", owner: "CODEX_AND_JEASON", weight: 8, depends_on, source_documents: [doc.master], acceptance_criteria: ["child tasks are tracked"], required_evidence: ["child tasks tracked in ledger"], notes: "EPIC is not executable directly." });
const codex = (parent_id, id, milestone, horizon, workstream, title, options = {}) => task({ parent_id, id, task_type: historicalPrTaskIds.has(id) ? "CODEX_PR" : "CODEX_WORK_ITEM", milestone, delivery_horizon: horizon, workstream, title, ...options });
const manual = (parent_id, id, type, milestone, horizon, workstream, title, owner, status, options = {}) => task({ parent_id, id, task_type: type, milestone, delivery_horizon: horizon, workstream, title, owner, status, ...options });
const ownerAction = (parent_id, id, milestone, horizon, workstream, title, options = {}) => manual(parent_id, id, "OWNER_ACTION", milestone, horizon, workstream, title, "JEASON", "OWNER_ACTION_REQUIRED", options);
const legalReview = (parent_id, id, milestone, horizon, title, options = {}) => manual(parent_id, id, "LEGAL_REVIEW", milestone, horizon, "LEG", title, "LEGAL", "LEGAL_REVIEW_REQUIRED", options);
const external = (parent_id, id, milestone, horizon, workstream, title, topic, options = {}) => manual(parent_id, id, "EXTERNAL_VERIFICATION", milestone, horizon, workstream, title, "EXTERNAL_SPECIALIST", options.status ?? "EXTERNAL_VERIFICATION_REQUIRED", { ...options, external_verification: { required: true, topic, verified_at: null, valid_until: null, sources: [], verified_by: "", result: "" } });
const decisionGate = (parent_id, id, milestone, horizon, workstream, title, options = {}) => manual(parent_id, id, "DECISION_GATE", milestone, horizon, workstream, title, options.owner ?? "JEASON", options.status ?? "DECISION_REQUIRED", { ...options, decision_gate: { metrics: options.metrics ?? [], review_date: options.review_date ?? null, allowed_outcomes: options.allowed_outcomes ?? ["CONTINUE", "CORRECT", "PAUSE", "PIVOT", "REJECT"], selected_outcome: options.selected_outcome ?? null, owner_approval: options.owner_approval ?? null } });
const recurring = (parent_id, id, milestone, horizon, workstream, title, options = {}) => task({ parent_id, id, task_type: "RECURRING_OPERATION", milestone, delivery_horizon: horizon, workstream, title, status: "RECURRING", owner: options.owner ?? "CODEX_AND_JEASON", weight: options.weight ?? 2, source_documents: options.source_documents ?? [doc.change], recurrence: { frequency: options.frequency ?? "MONTHLY", last_completed_at: null, next_due_at: null, completion_evidence: [] }, acceptance_criteria: ["recurring review completed"], required_commands: ["node scripts/validate-agentready-execution-system.mjs"], required_evidence: ["dated review evidence"], manual_actions: ["record recurring review evidence"] });

const communityPublicationManualActions = [
  "JEASON decision AR-COM-006B: ACCEPT_TEMPORARILY that npm latest points to 0.1.0-alpha.0 until the first stable release.",
  "No new npm operation is authorized after publication; immutable Git tag and GitHub Release evidence is now in review.",
  "All future prereleases must be published explicitly with npm dist-tag alpha.",
  "Codex must never request, receive, print or store an npm password, 2FA code, recovery code or token."
];
const communityPublicationAuthorizedActions = [
  "verify that @timeproofs/agentready@0.1.0-alpha.0 is published and that alpha points to 0.1.0-alpha.0",
  "record that latest also points to 0.1.0-alpha.0 and is temporarily accepted until the first stable release",
  "record immutable Git tag v0.1.0-alpha.0 pointing exactly to commit 150da23932c1fb9433cb3d546904f03c18c909e9",
  "record the corresponding GitHub prerelease at https://github.com/BACOUL/timeproofs/releases/tag/v0.1.0-alpha.0",
  "record the exact approved tarball, checksum and approved release notes"
];
const communityPublicationForbiddenActions = [
  "do not perform any new npm operation",
  "do not reconnect to npm",
  "do not retry removal of the npm latest dist-tag",
  "do not unpublish or deprecate the package",
  "do not publish from the PR head or the current governance merge commit",
  "do not rebuild, modify or replace the approved tarball",
  "do not publish another package version",
  "do not create, move or modify the npm latest dist-tag",
  "do not create manual npm tokens from the npm website",
  "do not configure NPM_TOKEN, NODE_AUTH_TOKEN, automation tokens or CI npm tokens",
  "do not request, receive, print, store or create npm authentication material",
  "do not request, receive, print or store a password, 2FA code or recovery code",
  "do not create the Git tag before npm publication is confirmed",
  "do not point v0.1.0-alpha.0 to any commit other than 150da23932c1fb9433cb3d546904f03c18c909e9",
  "do not create the GitHub Release before npm publication is confirmed",
  "do not merge the publication PR automatically"
];
const communityPublicationCodexPreflightSteps = [
  "verify the approved source commit 150da23932c1fb9433cb3d546904f03c18c909e9",
  "confirm the approved tarball SHA-256 remains 602799c5dd20ada03f2ee5e27048bacd865a71654e1c09f8119a484c837da6fe in the recorded evidence",
  "confirm package @timeproofs/agentready version 0.1.0-alpha.0 is published",
  "confirm alpha points to 0.1.0-alpha.0",
  "confirm latest also points to 0.1.0-alpha.0 and that this is temporarily accepted by JEASON until the first stable release",
  "confirm no new npm operation is performed"
];
const communityPublicationOwnerCheckpointSteps = [];
const communityPublicationPostConfirmationSteps = [
  "verify the public npm package page exists",
  "verify @timeproofs/agentready@0.1.0-alpha.0 exists under alpha",
  "verify latest remains documented as temporarily accepted and do not modify it",
  "record v0.1.0-alpha.0 pointing exactly to 150da23932c1fb9433cb3d546904f03c18c909e9",
  "record the corresponding GitHub prerelease",
  "record npm, tag and GitHub Release evidence in the publication PR"
];

const milestones = [
  ["M1", "Governance locked", "IN_PROGRESS", "BEFORE_COMMUNITY_PUBLICATION", ["sources of truth defined", "canonical ledger valid", "generated views synchronized", "change control defined", "next action identifiable"], [["M1-SOURCES", "sources of truth defined", ["AR-GOV-003"]], ["M1-LEDGER", "canonical ledger valid", ["AR-GOV-003"]], ["M1-VIEWS", "generated views synchronized", ["AR-GOV-003"]], ["M1-CHANGE", "change control defined", ["AR-GOV-003"]], ["M1-NEXT", "next action identifiable", ["AR-GOV-003"]]]],
  ["M2", "Community publication blockers resolved", "PLANNED", "BEFORE_COMMUNITY_PUBLICATION", ["npm scope controlled or alternative approved", "license approved", "ProofSpec references classified and treated", "npm security defined", "provenance defined", "publication explicitly approvable"], [["M2-NPM-SCOPE", "npm scope controlled or alternative approved", ["AR-COM-001"], true], ["M2-LICENSE", "license approved", ["AR-COM-003"], true], ["M2-PROOFSPEC", "ProofSpec references classified and treated", ["AR-COM-004"], true], ["M2-NPM-SECURITY", "npm security defined", ["AR-COM-002"], true], ["M2-PROVENANCE", "provenance defined", ["AR-COM-005"], true], ["M2-APPROVAL", "publication explicitly approvable", ["AR-COM-006A"], true]]],
  ["M3", "Community publicly usable", "PLANNED", "BEFORE_COMMUNITY_PUBLICATION", ["npm package published", "immutable tag", "GitHub Release", "public installation tested", "public Action usable", "global product standard trust documentation and discovery site validated", "onboarding documented", "no signup", "no payment"], [["M3-NPM-PUBLISH", "npm package published", ["AR-COM-006"]], ["M3-TAG-RELEASE", "immutable tag and GitHub Release", ["AR-COM-006"]], ["M3-PUBLIC-INSTALL", "public installation tested", ["AR-COM-008"]], ["M3-ACTION", "public Action usable", ["AR-COM-007", "AR-COM-009"]], ["M3-GLOBAL-SITE", "global product standard trust documentation and discovery site validated", ["AR-SITE-PREMIUM-001", "AR-SITE-GLOBAL-002", "AR-SITE-GLOBAL-003", "AR-SITE-GLOBAL-004", "AR-SITE-GLOBAL-005", "AR-SITE-GLOBAL-006", "AR-SITE-GLOBAL-007"]], ["M3-ONBOARDING", "onboarding documented without signup or payment", ["AR-ONB-001", "AR-ONB-002", "AR-ONB-003", "AR-ONB-004"]]]],
  ["M4", "External pilot and engine benchmark established", "PLANNED", "BEFORE_PRO_TECHNICAL_COMPLETION", ["external pilot kit", "five-user external pilot", "OpenAPI and MCP corpora", "human annotations", "benchmark acceptance thresholds frozen before final evaluation", "precision and recall", "false-positive and false-negative rates", "performance", "reproducibility", "differentiation evidence", "MCP static coverage matrix", "explicit pre-Pro decision", "AR001 AR003 AR008 AR010 treated or documented"], [["M4-PILOT-KIT", "external pilot kit and evidence registry", ["AR-MARKET-PILOT-001"]], ["M4-PILOT-EVIDENCE", "five-user external pilot evidence", ["AR-MARKET-PILOT-001H"], true], ["M4-CORPUS", "OpenAPI and MCP corpora and harness", ["AR-ENG-001"]], ["M4-HUMAN-LABELS", "human annotations validated", ["AR-ENG-001H"], true], ["M4-THRESHOLDS", "benchmark acceptance thresholds frozen before final evaluation", ["AR-ENG-001T"], true], ["M4-METRICS", "precision recall false positive and false negative rates", ["AR-ENG-002"]], ["M4-AR-FIXES", "AR001 AR003 AR008 AR010 treated or documented", ["AR-ENG-003"]], ["M4-PERFORMANCE", "performance and reproducibility", ["AR-ENG-004", "AR-ENG-005"]], ["M4-DIFFERENTIATION", "factual differentiation evidence and MCP static coverage matrix", ["AR-ENG-005"]], ["M4-PRO-DECISION", "explicit decision before Pro implementation", ["AR-MARKET-PILOT-002"], true]]],
  ["M5", "Pro technically complete", "PLANNED", "BEFORE_PRO_TECHNICAL_COMPLETION", ["versioned policy", "baseline", "new-risks-only", "SARIF", "pull request annotations", "local structured exceptions", "tests"], [["M5-POLICY", "versioned policy", ["AR-PRO-001"]], ["M5-BASELINE", "baseline comparison", ["AR-PRO-002"]], ["M5-NEW-RISKS", "new-risks-only mode", ["AR-PRO-003"]], ["M5-SARIF", "SARIF export", ["AR-PRO-004"]], ["M5-PR-ANNOTATIONS", "pull request annotations", ["AR-PRO-005"]], ["M5-EXCEPTIONS", "local structured exceptions", ["AR-PRO-006", "AR-PRO-007"]], ["M5-TESTS", "MVP Pro integration tests", ["AR-PRO-008"]]]],
  ["M6", "Pro commercially sellable", "PLANNED", "BEFORE_PRO_FIRST_SALE", ["commercial infrastructure approval", "license and entitlements", "activation", "five repositories", "offline behavior", "minimal account", "Checkout", "subscription lifecycle", "portal", "emails", "legal", "support", "refund", "controlled purchase"], [["M6-MARKET-GATE", "ten-user payment-signal and value-case gate approved", ["AR-MARKET-002"], true], ["M6-ENTITLEMENTS", "license and entitlements", ["AR-LIC-001", "AR-LIC-003"]], ["M6-ACTIVATION", "activation and recovery", ["AR-LIC-006", "AR-BILL-013"]], ["M6-FIVE-REPOS", "five repositories and pseudonymization", ["AR-LIC-005"]], ["M6-OFFLINE", "offline behavior", ["AR-LIC-004"]], ["M6-ACCOUNT", "minimal account", ["AR-BILL-004"]], ["M6-CHECKOUT", "Checkout monthly and annual", ["AR-BILL-002", "AR-BILL-003"]], ["M6-WEBHOOKS", "webhooks", ["AR-BILL-005"]], ["M6-PROVISIONING", "entitlement provisioning", ["AR-BILL-006"]], ["M6-PORTAL", "Customer Portal", ["AR-BILL-007"]], ["M6-RENEWAL", "renewal", ["AR-BILL-008"]], ["M6-FAILED-PAYMENT", "failed payment", ["AR-BILL-009", "AR-LIC-004"]], ["M6-CANCEL-DOWNGRADE", "cancellation and downgrade", ["AR-BILL-010", "AR-LIC-007"]], ["M6-REFUND", "refund", ["AR-BILL-011"]], ["M6-EMAILS", "transactional emails", ["AR-BILL-012"]], ["M6-DELETION", "account deletion and data", ["AR-BILL-014"]], ["M6-VAT-INVOICES", "VAT invoices reconciliation", ["AR-FIN-001"], true], ["M6-LEGAL", "legal privacy liability", ["AR-LEG-001"], true], ["M6-SUPPORT", "support", ["AR-SUPPORT-001", "AR-SUPPORT-002"]], ["M6-SECURITY", "security signoff", ["AR-SEC-001", "AR-SEC-002", "AR-SEC-003", "AR-SEC-004"], true], ["M6-CONTROLLED-PURCHASE", "controlled purchase", ["AR-BILL-015"]]]],
  ["M7", "Global launch ready", "PLANNED", "BEFORE_GLOBAL_LAUNCH", ["global product site", "documentation", "Trust Center", "SEO", "GEO", "accessibility", "performance", "competition", "support and incidents", "minimum external usage, payment and public-value evidence established"], [["M7-SITE", "global product site", ["AR-SITE-001", "AR-SITE-002", "AR-SITE-003", "AR-SITE-004", "AR-SITE-005", "AR-SITE-006", "AR-SITE-007", "AR-SITE-008", "AR-SITE-009", "AR-SITE-010", "AR-SITE-011", "AR-SITE-012", "AR-SITE-013", "AR-SITE-014", "AR-SITE-015", "AR-SITE-016", "AR-SITE-017", "AR-SITE-018", "AR-SITE-019", "AR-SITE-020", "AR-SITE-021", "AR-SITE-022", "AR-SITE-023", "AR-SITE-024", "AR-SITE-025"]], ["M7-DOCS", "documentation", ["AR-DOC-001", "AR-DOC-002", "AR-DOC-003", "AR-DOC-004", "AR-DOC-005", "AR-DOC-006", "AR-DOC-007", "AR-DOC-008", "AR-DOC-009", "AR-DOC-010", "AR-DOC-011", "AR-DOC-012", "AR-DOC-013"]], ["M7-SEO", "SEO", ["AR-SEO-001", "AR-SEO-002", "AR-SEO-003", "AR-SEO-004", "AR-SEO-005", "AR-SEO-006", "AR-SEO-007", "AR-SEO-008", "AR-SEO-009", "AR-SEO-010", "AR-SEO-011", "AR-SEO-012"]], ["M7-GEO", "GEO and AI-first architecture", ["AR-GEO-001", "AR-GEO-002", "AR-GEO-003", "AR-GEO-004", "AR-GEO-005", "AR-GEO-006", "AR-GEO-007"]], ["M7-COMPETITION", "competition and positioning", ["AR-COMP-001", "AR-COMP-002", "AR-COMP-003", "AR-COMP-004", "AR-COMP-005", "AR-COMP-006", "AR-COMP-007"], true], ["M7-INFRA-RELIABILITY", "infrastructure reliability support and incidents", ["AR-INFRA-001", "AR-INFRA-002", "AR-INFRA-003", "AR-INFRA-004", "AR-INFRA-005", "AR-INFRA-006", "AR-REL-001", "AR-REL-002", "AR-REL-003"]], ["M7-UX", "accessibility performance and conversion review", ["AR-UX-001"], true], ["M7-MARKET-VALIDATION", "Minimum external usage, payment and public-value evidence established", ["AR-MARKET-001A", "AR-MARKET-001B", "AR-MARKET-001C", "AR-MARKET-001D", "AR-MARKET-001"], true], ["M7-LAUNCH", "final launch audit", ["AR-LAUNCH-001", "AR-LAUNCH-001H"], true]]],
  ["M8", "Category-building active", "PLANNED", "POST_LAUNCH", ["public AR dictionary", "AR001-AR010 pages", "bad/fixed library", "integrations", "targeted contributions", "benchmark methodology", "observatory only when prerequisites are met"], [["M8-RULES", "public AR dictionary and AR001-AR010 pages", ["AR-CAT-001", "AR-CAT-002", "AR-CAT-003", "AR-CAT-004", "AR-CAT-005", "AR-CAT-006"]], ["M8-BAD-FIXED", "bad/fixed library", ["AR-CAT-007"]], ["M8-BADGES", "badges and freshness", ["AR-CAT-008"]], ["M8-GOVERNANCE", "namespace and public benchmark methodology", ["AR-CAT-009", "AR-CAT-010"]], ["M8-INTEGRATIONS", "integration guides", ["AR-INT-001", "AR-INT-002", "AR-INT-003", "AR-INT-004", "AR-INT-005"]], ["M8-OBSERVATORY", "observatory and state report only with prerequisites", ["AR-CAT-011", "AR-CAT-012"]]]]
].map(([id, name, status, delivery_horizon, exit_criteria, criteria]) => ({ id, name, status, delivery_horizon, exit_criteria, criteria: criteria.map(([criterion_id, description, satisfied_by, requires_human]) => ({ criterion_id, description, satisfied_by, ...(requires_human ? { requires_human: true } : {}) })) }));

epic("AR-GOV-EPIC", "M1", "BEFORE_COMMUNITY_PUBLICATION", "GOV", "Governance and anti-drift");
codex("AR-GOV-EPIC", "AR-GOV-001", "M1", "BEFORE_COMMUNITY_PUBLICATION", "GOV", "Rebaseline Community and Pro strategy", { status: "DONE", weight: 5, branch: "docs-agentready-community-pro-rebaseline", pr_title: "docs(product): rebaseline AgentReady Community and Pro strategy", pr_number: 113, allowed_paths: ["README.md", "ROADMAP.md", "AGENTREADY_PROJECT_CONTEXT.md", "docs/agentready/**", "scripts/validate-agentready-strategy-docs.mjs"], source_documents: [doc.master, doc.sequence, doc.decision], acceptance_criteria: ["strategy rebaseline merged", "Team and Agency post-revenue", "Community free CI blocking preserved"], required_commands: ["node scripts/validate-agentready-strategy-docs.mjs"], required_evidence: ["PR #113 merge SHA"], evidence: [{ type: "merge", pr: 113, merge_sha: "2db4ada5ce9ae59975bd47d3c26736444c01b983" }], scope_justification: "Weight 5 justified: single strategic rebaseline across authority docs." });
codex("AR-GOV-EPIC", "AR-GOV-002", "M1", "BEFORE_COMMUNITY_PUBLICATION", "GOV", "Resolve and record Community publication blockers", { status: "DONE", depends_on: ["AR-GOV-001"], blocks: ["AR-COM-001", "AR-COM-002", "AR-COM-003", "AR-COM-004", "AR-COM-005", "AR-COM-006A"], branch: "release-agentready-community-publication-blockers", pr_title: "release(agentready): resolve Community publication blockers", pr_number: 114, source_documents: [doc.blockers, doc.npm, doc.license], acceptance_criteria: ["blockers classified", "PUBLICATION APPROVED remains NO", "package remains private"], required_commands: ["node scripts/validate-agentready-publication-blockers.mjs"], required_evidence: ["PR #114 merge SHA"], evidence: [{ type: "merge", pr: 114, merge_sha: "92c728f5f8fe2756e697bcc75bce90786f2ed147" }] });
codex("AR-GOV-EPIC", "AR-GOV-003", "M1", "BEFORE_COMMUNITY_PUBLICATION", "GOV", "Add canonical AgentReady execution system", { status: "DONE", owner: "CODEX_AND_JEASON", weight: 5, depends_on: ["AR-GOV-002"], blocks: ["AR-COM-001", "AR-COM-002", "AR-COM-003", "AR-COM-004", "AR-COM-005", "AR-COM-006A"], branch: "docs-agentready-canonical-execution-system", pr_title: "docs(project): add canonical AgentReady execution system", pr_number: 115, allowed_paths: ["README.md", "ROADMAP.md", "AGENTREADY_PROJECT_CONTEXT.md", "docs/agentready/**", "scripts/*.mjs"], source_documents: [doc.master, doc.sequence, doc.decision, doc.blockers], acceptance_criteria: ["canonical ledger exists", "generated views synchronized", "next action and prompt generated", "prompt counts generated", "human ledger review required", "granularity controls enforced"], required_commands: ["node scripts/validate-agentready-strategy-docs.mjs", "node scripts/validate-agentready-execution-system.mjs"], required_evidence: ["draft PR #115", "workflow success", "human ledger review before merge"], evidence: [{ type: "merge", pr: 115, merge_sha: "f0cf872195b2493117badda6f9e174aed41fde4f" }], manual_actions: ["HUMAN LEDGER REVIEW REQUIRED BEFORE MERGE"], scope_justification: "Weight 5 justified: one governance system with ledger, generator and validator sharing one rollback boundary." });
recurring("AR-GOV-EPIC", "AR-GOV-004", "M1", "POST_LAUNCH", "OPS", "Monthly execution ledger review");

epic("AR-COM-EPIC", "M2", "BEFORE_COMMUNITY_PUBLICATION", "COM", "Community publication", ["AR-GOV-003"]);
ownerAction("AR-COM-EPIC", "AR-COM-001", "M2", "BEFORE_COMMUNITY_PUBLICATION", "OWNER", "Verify control of npm scope @timeproofs", { status: "DONE", depends_on: ["AR-GOV-003"], blocks: ["AR-COM-006"], source_documents: [doc.npm], acceptance_criteria: ["scope control verified with dated evidence", "package publish rights verified"], required_evidence: ["owner-provided npm scope evidence"], evidence: [{ type: "owner_attestation", date: "2026-07-11", owner: "JEASON", npm_account: "bacoul", npm_organization: "timeproofs", scope: "@timeproofs", result: "Owner confirmed control of npm organization timeproofs, scope @timeproofs, and rights needed for future public package publication. No package has been published." }], external_verification: { required: true, topic: "npm scope and package control", verified_at: "2026-07-11", valid_until: null, sources: ["owner attestation"], verified_by: "JEASON", result: "Jeason confirmed the npm organization timeproofs was created from account bacoul, public free package plan selected, scope @timeproofs controlled, and future public package publication rights available. No secrets recorded." } });
ownerAction("AR-COM-EPIC", "AR-COM-002", "M2", "BEFORE_COMMUNITY_PUBLICATION", "OWNER", "Define npm account security", { status: "DONE", depends_on: ["AR-GOV-003"], blocks: ["AR-COM-006"], source_documents: [doc.policy], acceptance_criteria: ["2FA or trusted publishing recorded", "no long-lived npm token stored"], required_evidence: ["owner-provided npm security evidence"], evidence: [{ type: "owner_attestation", date: "2026-07-11", owner: "JEASON", npm_account: "bacoul", result: "Owner confirmed npm 2FA is enabled and no long-lived npm token has been created or stored." }], external_verification: { required: true, topic: "npm 2FA or trusted publishing", verified_at: "2026-07-11", valid_until: null, sources: ["owner attestation"], verified_by: "JEASON", result: "Jeason confirmed npm 2FA is enabled for account bacoul and no long-lived npm token is stored. No password, 2FA code, recovery code, token, or secret recorded." } });
legalReview("AR-COM-EPIC", "AR-COM-003", "M2", "BEFORE_COMMUNITY_PUBLICATION", "Approve AgentReady Community license", { status: "DONE", depends_on: ["AR-GOV-003"], blocks: ["AR-COM-006"], source_documents: [doc.license, "packaging/agentready-community/LICENSE", "packaging/agentready-community/NOTICE", "packaging/agentready-community/README.md"], acceptance_criteria: ["final Community package license approved", "package license and dedicated LICENSE coherent", "root repository LICENSE unchanged and outside package boundary"], required_evidence: ["owner legal decision", "contributor audit", "package boundary documentation"], evidence: [{ type: "owner_legal_decision", date: "2026-07-11", decision_owner: "JEASON", license: "Apache-2.0", scope: "AgentReady Community npm package files only", trademarks_excluded: ["TimeProofs", "AgentReady"], pro_components_excluded: true, rights_audit: "Git history for bin/agentready.js, agentready-core/*.js, and agentready-core/simulation/*.js showed BACOUL and Codex author identities only; no third-party substantive contributor identified.", publication: false }] });
legalReview("AR-COM-EPIC", "AR-COM-004", "M2", "BEFORE_COMMUNITY_PUBLICATION", "Treat package-public ProofSpec references", { status: "DONE", depends_on: ["AR-GOV-003"], blocks: ["AR-COM-006"], source_documents: [doc.proofspec, "packaging/agentready-community/LICENSE", "packaging/agentready-community/README.md"], acceptance_criteria: ["legacy references removed, renamed or legally justified for package-public files", "root LICENSE excluded from Community tarball", "root README excluded from Community tarball", "ProofSpec references absent from Community tarball"], required_evidence: ["legal treatment decision", "updated package-public audit", "staged package validation"], evidence: [{ type: "package_public_reference_treatment", date: "2026-07-11", package_boundary: "Community package built from dedicated staging directory", root_license_excluded: true, root_readme_excluded: true, proofspec_absent_from_tarball: true, package_public_audit_updated: true, publication: false }] });
ownerAction("AR-COM-EPIC", "AR-COM-005", "M2", "BEFORE_COMMUNITY_PUBLICATION", "OWNER", "Approve final Community tarball content", { status: "DONE", depends_on: ["AR-COM-003", "AR-COM-004"], blocks: ["AR-COM-006"], source_documents: [doc.tarball], acceptance_criteria: ["corrected alpha-channel tarball file list reviewed", "corrected alpha-channel checksum approved", "npm dist-tag alpha verified", "publication remains unauthorized"], required_evidence: ["approved corrected tarball SHA-256", "approved corrected source commit", "owner approval confirming npm dist-tag alpha"], evidence: [{ type: "owner_tarball_approval", date: "2026-07-11", approver: "JEASON", package: "@timeproofs/agentready", version: "0.1.0-alpha.0", source_commit: "61a5dab90afe6363f7ea386712bb8cdc48e9f665", tarball_sha256: "f1381d16277707cfc5d1005ed5e865139aa5a1ed0fcc1fb7de35c2f1a5eab77d", zip_sha256: "9bd533ae306e2c511af6af2d7aad7031916d6f24eae3ed4b21cd5364e1dd12c1", workflow: "AgentReady Community Release Candidate", workflow_run: "13", file_count: 21, publication_authorized: false, superseded: true, superseded_date: "2026-07-11", superseded_reason: "release channel corrected to alpha, changing the tarball content", approval_text: "«J’approuve le contenu final du tarball AgentReady Community 0.1.0-alpha.0, lié au commit 61a5dab90afe6363f7ea386712bb8cdc48e9f665 et au SHA-256 f1381d16277707cfc5d1005ed5e865139aa5a1ed0fcc1fb7de35c2f1a5eab77d. Cette approbation n’autorise pas encore sa publication.»" }, { type: "owner_tarball_approval", date: "2026-07-11", approver: "JEASON", package: "@timeproofs/agentready", version: "0.1.0-alpha.0", source_commit: "150da23932c1fb9433cb3d546904f03c18c909e9", tarball_sha256: "602799c5dd20ada03f2ee5e27048bacd865a71654e1c09f8119a484c837da6fe", zip_sha256: "1a318eab6a7af3a313da820546b36c4392b58502a025e8bd0a8a06ba45a3c248", workflow: "AgentReady Community Release Candidate", source_branch: "timeproofs", npm_dist_tag: "alpha", file_count: 21, publication_authorized: false, superseded: false, technical_evidence: ["manifest references approved source commit", "tarball SHA-256 matches manifest and .sha256 file", "GitHub Actions ZIP SHA-256 matches controlled ZIP", "package_name = @timeproofs/agentready", "version = 0.1.0-alpha.0", "package_publish_access = public", "package_publish_registry = https://registry.npmjs.org/", "package_publish_tag = alpha", "publication_ready = false", "package contains exactly 21 files", "no private: true in Community package", "root repository package remains private", "license Apache-2.0", "NOTICE present", "dependencies empty", "README commands explicitly use @alpha", "no forbidden historical ProofSpec references", "no secret or token", "no Pro, Stripe, backend or dashboard component", "no dangerous path or symlink", "npm publish --dry-run --access public --tag alpha PASS", "no real publication performed"], approval_text: "«J’approuve le contenu final corrigé du tarball AgentReady Community 0.1.0-alpha.0, lié au commit 150da23932c1fb9433cb3d546904f03c18c909e9 et au SHA-256 602799c5dd20ada03f2ee5e27048bacd865a71654e1c09f8119a484c837da6fe, destiné au dist-tag npm alpha. Cette approbation n’autorise pas encore sa publication.»" }] });
decisionGate("AR-COM-EPIC", "AR-COM-006A", "M2", "BEFORE_COMMUNITY_PUBLICATION", "OWNER", "Explicit Community publication approval", { status: "DONE", depends_on: ["AR-COM-001", "AR-COM-002", "AR-COM-003", "AR-COM-004", "AR-COM-005"], blocks: ["AR-COM-006"], source_documents: ["docs/agentready/COMMUNITY_PUBLICATION_APPROVAL_CHECKLIST.md"], acceptance_criteria: ["PUBLICATION APPROVED explicitly set by owner"], required_evidence: ["approved commit", "approved version", "approved tarball SHA-256", "approval date"], evidence: [{ type: "owner_publication_approval", date: "2026-07-12", approver: "JEASON", package: "@timeproofs/agentready", version: "0.1.0-alpha.0", approved_source_commit: "150da23932c1fb9433cb3d546904f03c18c909e9", approved_tarball_sha256: "602799c5dd20ada03f2ee5e27048bacd865a71654e1c09f8119a484c837da6fe", approved_zip_sha256: "1a318eab6a7af3a313da820546b36c4392b58502a025e8bd0a8a06ba45a3c248", npm_dist_tag: "alpha", immutable_git_tag: "v0.1.0-alpha.0", github_release_authorized: true, latest_authorized: false, artifact_modification_authorized: false, other_version_authorized: false, first_publication_auth: "manual npm CLI with owner 2FA and temporary local npm login", npm_automation_token: "none", temporary_local_owner_login: "authorized for controlled first publication only", local_login_storage: "owner device ~/.npmrc only", credential_sharing: "forbidden", post_publication_action: "npm logout immediately after verification", selected_outcome: "CONTINUE", approval_text: "«J’autorise explicitement la publication publique de @timeproofs/agentready version 0.1.0-alpha.0, exclusivement sous le dist-tag npm alpha, à partir du commit source approuvé 150da23932c1fb9433cb3d546904f03c18c909e9 et du tarball dont le SHA-256 est 602799c5dd20ada03f2ee5e27048bacd865a71654e1c09f8119a484c837da6fe. J’autorise également la création du tag Git immuable v0.1.0-alpha.0 et de la GitHub Release correspondante. Cette autorisation ne permet pas de publier sous latest, de modifier l’artefact approuvé ou de publier une autre version. Approbation donnée par JEASON le 12 juillet 2026.»" }], metrics: ["all blockers RESOLVED", "tarball approved", "license approved"], review_date: "2026-07-12", selected_outcome: "CONTINUE", owner_approval: true });
decisionGate("AR-COM-EPIC", "AR-COM-006B", "M3", "BEFORE_COMMUNITY_PUBLICATION", "COM", "Decide handling of unexpected npm latest dist-tag", { status: "DECIDED", owner: "JEASON", depends_on: ["AR-COM-001", "AR-COM-002", "AR-COM-003", "AR-COM-004", "AR-COM-005", "AR-COM-006A"], blocks: ["AR-COM-006"], source_documents: [doc.policy, doc.release], acceptance_criteria: ["owner decision recorded for unexpected latest dist-tag", "alpha dist-tag documented as 0.1.0-alpha.0", "latest dist-tag documented as 0.1.0-alpha.0", "temporary acceptance remains limited until first stable release", "future prereleases must use npm dist-tag alpha explicitly"], required_evidence: ["owner decision ACCEPT_TEMPORARILY on latest deviation", "recorded alpha and latest dist-tags", "first-stable-release limit"], evidence: [{ type: "owner_latest_dist_tag_decision", date: "2026-07-12", owner: "JEASON", decision: "ACCEPT_TEMPORARILY", status: "DECIDED", package: "@timeproofs/agentready", version: "0.1.0-alpha.0", alpha_dist_tag: "0.1.0-alpha.0", latest_dist_tag: "0.1.0-alpha.0", temporary_until: "first stable release", new_npm_operation_authorized: false, future_prereleases_dist_tag: "alpha", notes: "JEASON temporarily accepts latest pointing to 0.1.0-alpha.0 until the first stable release. No new npm operation is authorized by this decision." }], metrics: ["npm publication success", "alpha dist-tag observed", "unexpected latest dist-tag observed", "latest removal failed with E400", "latest temporarily accepted"], allowed_outcomes: ["ACCEPT_TEMPORARILY", "CORRECT", "PAUSE"], review_date: "2026-07-12", selected_outcome: "ACCEPT_TEMPORARILY", owner_approval: true, notes: "Owner decision recorded: latest pointing to 0.1.0-alpha.0 is accepted temporarily until the first stable release. All future prereleases must be published explicitly with npm dist-tag alpha. No new npm operation is authorized." });
codex("AR-COM-EPIC", "AR-COM-006", "M3", "BEFORE_COMMUNITY_PUBLICATION", "COM", "Publish Community CLI and immutable release", { status: "PASS_WITH_DOCUMENTED_EXCEPTION", owner: "CODEX_AND_JEASON", weight: 5, depends_on: ["AR-COM-001", "AR-COM-002", "AR-COM-003", "AR-COM-004", "AR-COM-005", "AR-COM-006A", "AR-COM-006B"], blocks: ["AR-COM-008", "AR-COM-007"], source_documents: [doc.policy, doc.release], branch: "release-agentready-community-cli", pr_title: "release(agentready): publish Community CLI and immutable release", allowed_paths: ["CHANGELOG.md", "docs/agentready/**"], forbidden_paths: ["package.json", "packaging/agentready-community/**", "agentready-core/**", "bin/**", ".github/workflows/**", ".github/actions/**", "LICENSE", "NOTICE", "*.html"], acceptance_criteria: ["Codex verified the exact approved artifact before publication", "JEASON performed the manual npm publish checkpoint with private owner 2FA", "publication succeeded under npm dist-tag alpha", "latest unexpectedly points to 0.1.0-alpha.0 and is accepted temporarily by JEASON until the first stable release", "all future prereleases must be published explicitly with npm dist-tag alpha", "immutable tag and GitHub prerelease were created without performing any new npm operation"], required_commands: ["node cli/tests/run-agentready-package-smoke-test.mjs"], required_evidence: ["approved tarball SHA-256 verification", "JEASON npm publication confirmation without secrets", "npm package URL", "documented latest exception", "immutable tag", "GitHub Release URL"], evidence: [{ type: "npm_publication_result", date: "2026-07-12", package: "@timeproofs/agentready", version: "0.1.0-alpha.0", command: "npm publish ./timeproofs-agentready-0.1.0-alpha.0-approved.tgz --access public --tag alpha", result: "SUCCESS", confirmation: "+ @timeproofs/agentready@0.1.0-alpha.0", tarball_sha256: "602799c5dd20ada03f2ee5e27048bacd865a71654e1c09f8119a484c837da6fe", alpha_dist_tag: "0.1.0-alpha.0", latest_dist_tag: "0.1.0-alpha.0", latest_expected: false, latest_removal_attempted: true, latest_removal_command: "npm dist-tag rm @timeproofs/agentready latest", latest_removal_result: "E400 400 Bad Request DELETE /-/package/@timeproofs%2fagentready/dist-tags/latest", logout_executed: true, authentication_status: "LOGGED_OUT", continuation_authorized: false, git_tag_created: false, github_release_created: false, notes: "npm publication succeeded, but latest was unexpectedly created and could not be removed." }, { type: "documented_exception", date: "2026-07-12", owner: "JEASON", decision: "ACCEPT_TEMPORARILY", alpha_dist_tag: "0.1.0-alpha.0", latest_dist_tag: "0.1.0-alpha.0", temporary_until: "first stable release", future_prereleases_dist_tag: "alpha", new_npm_operation_authorized: false, notes: "JEASON accepts temporarily that npm latest points to 0.1.0-alpha.0 until the first stable release. No new npm operation is authorized." }, { type: "immutable_release_result", date: "2026-07-12", git_tag: "v0.1.0-alpha.0", tag_object_sha: "6e512802997d7cb5ab90dd2698e3b5731a4e48ee", tag_target_commit: "150da23932c1fb9433cb3d546904f03c18c909e9", remote_tag_verified: true, github_release_url: "https://github.com/BACOUL/timeproofs/releases/tag/v0.1.0-alpha.0", github_release_id: 352755662, github_release_prerelease: true, github_release_draft: false, github_release_latest: false, release_notes_match_validated_file: true, new_npm_operation_executed: false, notes: "Annotated immutable Git tag and GitHub prerelease were created after npm publication, with no new npm operation." }], manual_actions: communityPublicationManualActions, authorized_actions: communityPublicationAuthorizedActions, forbidden_actions: communityPublicationForbiddenActions, codex_preflight_steps: communityPublicationCodexPreflightSteps, owner_checkpoint_steps: communityPublicationOwnerCheckpointSteps, post_confirmation_steps: communityPublicationPostConfirmationSteps, scope_justification: "Weight 5 justified: release publication is a single atomic release boundary after owner approval and private owner 2FA checkpoint." });
codex("AR-COM-EPIC", "AR-COM-007", "M3", "BEFORE_COMMUNITY_PUBLICATION", "COM", "Publish public AgentReady GitHub Action distribution", {
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
});
codex("AR-COM-EPIC", "AR-COM-008", "M3", "BEFORE_COMMUNITY_PUBLICATION", "COM", "Validate public Community installation", {
  decision_ids: [...decisionIds, validationDecisionId],
  depends_on: ["AR-COM-006"],
  source_documents: [doc.cli, doc.actionUsage, doc.validation],
  branch: "qa-community-public-installation",
  pr_title: "qa(community): validate public AgentReady installation",
  allowed_paths: ["cli/**", ".github/**", "agentready-examples/**", "docs/agentready/**", "scripts/**"],
  forbidden_paths: ["package.json", "LICENSE", "*.html"],
  deliverables: ["clean-environment installation matrix", "external-repository Action validation", "PASS FAIL and error-behavior evidence", "documented unsupported cases"],
  acceptance_criteria: ["public npm installation succeeds from clean environments", "Linux macOS and Windows evidence is recorded", "all officially supported Node.js major versions are tested", "paths with spaces and monorepository behavior are tested", "single and multiple OpenAPI or MCP inputs are tested", "invalid input and large input within documented limits are tested", "PASS FAIL exit codes and report paths are verified", "Community operation does not require a TimeProofs backend", "Action installation is tested outside the TimeProofs repository", "failures and unsupported cases are documented honestly"],
  independent_test_plan: ["run CLI core Action and package tests", "execute clean-environment OS matrix", "exercise external-style public and private repository fixtures", "record every unsupported scenario"],
  required_commands: ["node agentready-core/tests/run-agentready-core-tests.mjs", "node cli/tests/run-agentready-cli-tests.mjs", "node cli/tests/run-agentready-action-smoke-test.mjs", "node cli/tests/run-agentready-package-smoke-test.mjs", "node scripts/validate-agentready-execution-system.mjs"],
  required_evidence: ["OS and Node.js matrix", "external-repository workflow runs", "PASS FAIL exit-code evidence", "report path evidence", "offline or backend-independent evidence", "unsupported-case register"]
});

codex("AR-COM-EPIC", "AR-COM-009", "M3", "BEFORE_COMMUNITY_PUBLICATION", "COM", "Prepare GitHub Marketplace listing compliance", {
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
});
epic("AR-SITE-PREMIUM-EPIC", "M3", "BEFORE_COMMUNITY_PUBLICATION", "SITE", "Global standard public site before external validation", ["AR-COM-006"]);
codex("AR-SITE-PREMIUM-EPIC", "AR-SITE-PREMIUM-001", "M3", "BEFORE_COMMUNITY_PUBLICATION", "SITE", "Build global site shell navigation and footer", {
  decision_ids: [...decisionIds, "DL-2026-07-12-PREMIUM-SITE-BEFORE-VALIDATION", "DL-2026-07-13-GLOBAL-STANDARD-SITE-BEFORE-VALIDATION"],
  status: "IN_REVIEW",
  owner: "CODEX_AND_JEASON",
  weight: 5,
  source_documents: [doc.premium, doc.ia, doc.premiumRedesign, doc.globalSite, doc.copy],
  branch: "site-agentready-premium-foundation",
  pr_title: "site(agentready): build premium design system and navigation",
  pr_number: 132,
  allowed_paths: ["assets/**", "*.html", "docs/agentready/**", "scripts/**"],
  forbidden_paths: ["agentready-core/**", "bin/**", "package.json", "action.yml", ".github/workflows/**", "packaging/**", "server/**", "api/**", "LICENSE", "NOTICE"],
  deliverables: ["shared premium design tokens and shell assets", "desktop Product and Resources navigation", "accessible full-height mobile navigation", "four-group premium footer", "active-page and focus states", "navigation link and shell validator", "desktop and mobile visual evidence"],
  estimated_files_or_surfaces: ["assets/site-nav.css", "new shared site CSS or JavaScript assets", "header navigation and footer on active indexable AgentReady HTML pages"],
  acceptance_criteria: ["one shared design system controls navigation footer typography focus states buttons and code surfaces", "desktop navigation exposes Product Resources Pricing Trust GitHub and Scan a contract with real destinations", "Product exposes OpenAPI MCP CI Gate and report or agentready.json destinations", "Resources exposes docs examples rules methodology and changelog destinations where real routes exist", "mobile navigation has large touch targets grouped links visible CTA Escape close focus containment focus restoration scroll lock and no 320px overflow", "critical links remain available through progressive enhancement", "footer exposes Product Standard Developers and Trust groups", "active indexable AgentReady pages use the shared shell without duplicated nav or footer implementations", "page body content and product sections are preserved in this foundation batch", "no broken route fake page fake product external font frontend framework tracker telemetry or backend dependency is added", "reduced-motion and visible keyboard focus are supported", "canonical metadata structured data and mandatory limitation text are preserved"],
  required_commands: ["node scripts/validate-agentready-site-navigation.mjs", "node scripts/validate-agentready-strategy-docs.mjs", "node scripts/validate-agentready-execution-system.mjs", "git diff --check"],
  independent_test_plan: ["inventory every active indexable AgentReady page and existing nav footer variant", "run static link and duplicate-shell validation", "test desktop menus by pointer and keyboard", "test mobile menu at 320 375 768 and 900 pixel widths", "test Escape outside click focus containment focus restoration and body scroll lock", "test with reduced motion and JavaScript disabled for critical links", "record before and after desktop and mobile evidence", "confirm no page-body redesign or product-code change entered the batch"],
  required_evidence: ["page and shell migration inventory", "desktop navigation screenshots", "mobile closed and open navigation screenshots", "keyboard and focus test matrix", "link validation report", "320px no-overflow evidence", "reduced-motion and no-JS evidence", "shared asset inventory and size summary", "owner visual review before merge"],
  manual_actions: ["JEASON reviews the complete stacked site before the stack is merged"],
  authorized_actions: ["create dependency-free shared CSS and minimal JavaScript assets", "replace duplicated active-page navigation and footer markup", "add static validators and documented visual evidence"],
  forbidden_actions: ["do not redesign homepage or page-body sections in this batch", "do not rewrite product claims beyond navigation and footer labels required for accuracy", "do not modify engine CLI Action package npm tags billing accounts backend or runtime behavior", "do not add external fonts frameworks analytics telemetry uploads or live calls", "do not create fake pages customer logos dashboards certifications or safety claims", "do not merge without owner visual review"],
  codex_preflight_steps: ["inventory all active indexable root HTML pages and current shared assets", "record every navigation and footer variant", "map every proposed menu label to an existing valid route", "identify inline shell styles that conflict with shared assets", "capture baseline desktop and mobile screenshots", "open a draft PR before broad HTML migration"],
  rollback_boundary: "Revert the shared shell assets and navigation or footer migrations without reverting Marketplace publication or product code.",
  notes: "Approved only as a stacked technical base. Do not merge as the finished site.",
  scope_justification: "Weight 5 justified: one coherent shared-shell system across active static pages with a single visual review and rollback boundary."
});
codex("AR-SITE-PREMIUM-EPIC", "AR-SITE-GLOBAL-002", "M3", "BEFORE_COMMUNITY_PUBLICATION", "SITE", "Publish global product scanners CI and planned pricing foundation", {
  decision_ids: [...decisionIds, "DL-2026-07-13-GLOBAL-STANDARD-SITE-BEFORE-VALIDATION"],
  status: "IN_REVIEW",
  owner: "CODEX_AND_JEASON",
  weight: 5,
  source_documents: [doc.globalSite, doc.premium, doc.ia, doc.copy, doc.pricing, doc.entitlements, doc.actionUsage, doc.json],
  branch: "site-agentready-global-product",
  pr_title: "site(agentready): publish global product and pricing foundation",
  pr_number: 134,
  allowed_paths: ["assets/**", "*.html", "docs/agentready/**", "scripts/**", "sitemap.xml", "robots.txt"],
  forbidden_paths: ["agentready-core/**", "bin/**", "package.json", "action.yml", ".github/workflows/**", "packaging/**", "server/**", "api/**", "LICENSE", "NOTICE"],
  deliverables: ["category-defining homepage", "product overview", "Community page", "planned Pro page", "truthful pricing page", "complete OpenAPI and MCP scanner presentation", "CI Gate and CLI adoption sections", "real report and agentready.json demonstrations", "complete combined preview based on PR #132"],
  estimated_files_or_surfaces: ["index.html", "agentready.html", "agentready-mcp.html", "agentready-ci.html", "agentready-docs.html", "pricing.html", "product.html", "community.html", "pro.html", "shared product assets"],
  acceptance_criteria: ["a new visitor understands the problem product and primary action within one viewport", "OpenAPI and MCP pages explain detection coverage and show realistic findings before file selection", "the real scanners remain functional", "browser CLI and GitHub Action paths are visible", "Community is shown as available and free", "planned Pro price is 24 EUR excluding tax monthly or 240 EUR excluding tax annually", "Pro is clearly not purchasable and unavailable features are labelled planned", "Team Agency and Enterprise are not presented as available", "real product outputs and immutable Action usage are used", "no fake proof customer benchmark certification or standard-status claim is added", "page bodies use varied premium composition rather than repetitive cards", "all pages remain usable on mobile and without JavaScript for core content"],
  required_commands: ["node scripts/validate-agentready-site-navigation.mjs", "node scripts/validate-agentready-global-product-site.mjs", "node scripts/validate-agentready-strategy-docs.mjs", "node scripts/validate-agentready-execution-system.mjs", "git diff --check"],
  independent_test_plan: ["test every product and commercial route", "run real OpenAPI and MCP examples", "verify price and availability copy against pricing authority", "validate all CTA destinations", "test desktop and 320 375 768 1024 pixel layouts", "test core content without JavaScript", "compare complete preview with the PR #132 shell baseline"],
  required_evidence: ["desktop and mobile screenshots for every primary page", "real output provenance", "pricing source mapping", "CTA and link report", "no-JavaScript evidence", "combined preview URL"],
  manual_actions: ["JEASON reviews the combined product and pricing preview"],
  authorized_actions: ["create real static product Community and planned Pro pages", "redesign the six existing core page bodies", "add shared static product assets and validators"],
  forbidden_actions: ["do not change engine CLI package Action workflows npm tags releases Marketplace billing accounts or runtime behavior", "do not present Pro as purchasable", "do not invent customers benchmarks legal identities or certifications", "do not merge any site PR"],
  codex_preflight_steps: ["synchronize to exact PR #132 head 8ea9b08e9c772f151c3966288f7e82f8efe0ff10", "create the child branch from site-agentready-premium-foundation", "open a draft PR targeting site-agentready-premium-foundation before broad edits", "inventory current product claims pricing sources and working scanner behavior"],
  rollback_boundary: "Revert the global product child PR while preserving PR #132 as the technical shell base.",
  scope_justification: "Weight 5 justified: product, pricing, scanner presentation, CI and evidence are one reviewable public product foundation stacked on the shared shell."
});
const standardFoundationSources = [
  doc.master,
  doc.sequence,
  doc.decision,
  doc.change,
  doc.globalSite,
  doc.ia,
  doc.premium,
  doc.copy,
  doc.rules,
  doc.json,
  doc.engine,
  doc.ruleFormat,
  doc.mcp,
  doc.actionUsage,
  doc.action,
  doc.commercial
];
const standardFoundationSurfaces = [
  "agentready-standard.html",
  "agentready-rule-codes.html",
  "agentready-json.html",
  "agentready-examples.html",
  "agentready-resources.html",
  "agentready-sample-report.html",
  "sitemap.xml",
  "shared standard assets and diagrams"
];
const standardFoundationDeliverables = [
  "public AgentReady standard overview with concise canonical definition and what-it-is-not boundary",
  "public specification index distinguishing normative sources from explanatory material",
  "complete AR001 through AR010 public rule coverage based only on current rule codes and implementation behavior",
  "public severity model with critical high medium and low meanings and limitations",
  "public scoring and result model covering score status PASS FAIL min-score fail-on and 100/100 limitations",
  "versioning and compatibility section for engine ruleset schema policy source version input hash commit and scan date",
  "governance change-control namespace and contribution principles without invented authority or certification",
  "reference implementation explanation linking method rules output schema CLI browser scanner and GitHub Action",
  "premium static no-JavaScript public presentation with mobile keyboard and 320px overflow evidence"
];
const standardFoundationAcceptance = [
  "the standard overview defines AgentReady as static pre-deployment readiness analysis for agent-facing OpenAPI and MCP contracts",
  "the overview states what AgentReady is not: not a runtime firewall gateway IAM system hosted scanner certification or guaranteed safety proof",
  "the specification index links stable public sources for rules schemas methodology versioning governance limitations and reference implementation",
  "normative and explanatory content are clearly distinguished",
  "AR001 through AR010 are all covered with stable identifier title risk detected affected source type trigger meaning severity remediation guidance and limitations",
  "bad and fixed examples are included only where current repository fixtures or documented outputs make them reproducible",
  "severity definitions cover critical high medium and low without implying universal security certification",
  "scoring explains AgentReady score status PASS FAIL min-score fail-on and the difference between score and CI blocking policy",
  "100 out of 100 and PASS are explicitly limited and do not imply complete safety",
  "versioning covers engine ruleset AgentReady schema policy source protocol or version and historical-result freshness",
  "governance names the current publisher and change-control process without inventing a standards body committee legal entity or independent certification authority",
  "namespace and contribution principles explain AR identifier stability ownership future reservations and real repository issue paths only",
  "reference implementation copy distinguishes the method rules output schema CLI browser scanner and GitHub Action",
  "OpenAPI and MCP coverage boundaries and non-detectable runtime or dynamically constructed capabilities are stated clearly",
  "all pages use varied premium composition code and specification surfaces rather than a repetitive card catalogue",
  "core content remains available without JavaScript and passes mobile keyboard link and 320px overflow checks",
  "no engine CLI scoring severity rule semantics package Action workflow npm tag Release Marketplace billing account backend or runtime behavior changes are introduced"
];
const standardFoundationCommands = [
  "node scripts/validate-agentready-site-navigation.mjs",
  "node scripts/validate-agentready-standard-foundation-site.mjs",
  "node scripts/validate-agentready-strategy-docs.mjs",
  "node scripts/validate-agentready-execution-system.mjs",
  "git diff --check"
];
const standardFoundationTests = [
  "inventory public standard routes and verify each selected route exists or is intentionally created by this batch",
  "verify every AR001 through AR010 public rule entry maps to docs/agentready/AGENTREADY_RULE_CODES.md and agentready-core/types.js",
  "verify severity and score copy against docs/agentready/AGENTREADY_SCORE_MODEL.md and current engine constants",
  "verify PASS FAIL min-score fail-on and exit-code copy against docs/agentready/AGENTREADY_JSON_SPEC.md and current CLI behavior",
  "verify versioning and compatibility copy against docs/agentready/MCP_VERSION_COMPATIBILITY_POLICY.md and agentready.json v0.1",
  "verify governance and namespace copy against PROJECT_CHANGE_CONTROL.md and RULE_FORMAT_AND_GOVERNANCE.md",
  "verify public examples use only reproducible fixtures or documented outputs and record source commands",
  "verify all CTA and internal links between product standard rules JSON examples limitations and developer docs",
  "test desktop and 320 375 768 and 1024 pixel layouts",
  "test keyboard focus order and visible focus on the new and modified routes",
  "test core content without JavaScript",
  "verify no horizontal overflow at 320 pixels",
  "compare the complete preview with PR #134 product foundation"
];
const standardFoundationEvidence = [
  "source inventory for AgentReady definition AR001-AR010 severity scoring status versioning governance and reference implementation behavior",
  "conflict and stale-source register with acceptance requirements rather than guessed resolutions",
  "route map and information architecture for standard rules JSON examples resources and sample-report surfaces",
  "AR001 through AR010 mapping table to finding codes severity categories and current implementation coverage",
  "example provenance with fixture path command output and reproduction notes for every displayed score finding or JSON excerpt",
  "normative versus explanatory content review",
  "limitation and no-certification claim audit",
  "CTA and internal-link report",
  "desktop and mobile screenshots for every primary standard surface",
  "keyboard accessibility report",
  "no-JavaScript evidence",
  "320px overflow evidence",
  "complete stacked preview URL",
  "validator and deterministic regeneration results"
];
const standardFoundationForbiddenPaths = [
  "agentready-core/**",
  "cli/** where behavior would change",
  "bin/**",
  "package.json",
  "action.yml",
  "packaging/**",
  "server/**",
  "api/**",
  "billing/**",
  "account/**",
  ".github/workflows/** unless a separately identified stale validation guard requires a separately authorized correction",
  "LICENSE",
  "NOTICE"
];
const standardFoundationForbiddenActions = [
  "do not change engine behavior",
  "do not change CLI behavior",
  "do not add new AR rule semantics",
  "do not change scoring",
  "do not change severity unless separately approved through canonical change control",
  "do not perform any npm operation",
  "do not change Action metadata tags Releases or Marketplace state",
  "do not add billing accounts licensing backend hosted scanning telemetry or upload dependency",
  "do not invent customers testimonials logos benchmark results legal identities foundations committees standards bodies or certifications",
  "do not claim AgentReady has formal standards-body recognition",
  "do not claim guaranteed safety",
  "do not use external fonts frontend frameworks analytics trackers or telemetry",
  "do not silently change Community or Pro scope",
  "do not merge any site PR"
];
const standardFoundationPreflight = [
  "synchronize to exact PR #134 head 1a71cb469e608d548b42c5884a4165563216733b",
  "create branch site-agentready-global-standard from site-agentready-global-product at that exact head",
  "open a draft PR targeting site-agentready-global-product before broad page edits",
  "inventory all public and internal sources for AgentReady definition AR001-AR010 severity score PASS FAIL versioning governance namespace and implementation behavior",
  "record duplicated stale incomplete or conflicting sources as blockers or explicit acceptance requirements",
  "verify PR #132 and PR #134 remain open draft and unmerged",
  "confirm no npm Action tag Release Marketplace engine CLI package billing account backend or runtime operation is required"
];
const standardFoundationResponseFormat = [
  "branch name",
  "draft PR number and URL",
  "base branch and exact approved base head",
  "exact head SHA",
  "files changed grouped by standard pages shared assets validators governance and evidence",
  "source inventory and conflicts recorded",
  "summary of each standard route or surface",
  "exact source of every displayed example score finding report excerpt or JSON excerpt",
  "AR001 through AR010 mapping evidence",
  "severity scoring PASS FAIL and versioning source mapping",
  "local validation results",
  "GitHub workflow results",
  "preview URL",
  "desktop and mobile evidence paths",
  "keyboard no-JavaScript and 320px overflow evidence",
  "remaining owner-review points",
  "confirmation that no implementation branch beyond the authorized batch branch was created",
  "confirmation that no npm tag Release Marketplace engine CLI billing account package or runtime operation occurred"
];

for (const [id, title, branch, prTitle] of [
  ["AR-SITE-GLOBAL-003", "Publish AgentReady standard rules and governance foundation", "site-agentready-global-standard", "site(standard): publish AgentReady standard foundation"],
  ["AR-SITE-GLOBAL-004", "Publish company trust security privacy and legal foundation", "site-agentready-global-trust", "site(trust): publish company and legal foundation"],
  ["AR-SITE-GLOBAL-005", "Publish developer documentation adoption examples and contribution foundation", "site-agentready-global-docs-adoption", "site(docs): publish developer documentation and adoption foundation"],
  ["AR-SITE-GLOBAL-006", "Publish SEO GEO AI-first and international foundation", "site-agentready-global-discovery", "site(discovery): publish SEO GEO and international foundation"],
  ["AR-SITE-GLOBAL-007", "Validate complete global standard site", "qa-agentready-global-standard-site", "qa(site): validate complete global standard site"]
]) {
  const isStandardFoundation = id === "AR-SITE-GLOBAL-003";
  codex("AR-SITE-PREMIUM-EPIC", id, "M3", "BEFORE_COMMUNITY_PUBLICATION", "SITE", title, {
  decision_ids: [...decisionIds, "DL-2026-07-13-GLOBAL-STANDARD-SITE-BEFORE-VALIDATION"],
  status: isStandardFoundation ? "READY" : "PLANNED",
  spec_status: isStandardFoundation ? "EXECUTION_READY" : "SKELETON",
  owner: isStandardFoundation ? "CODEX_AND_JEASON" : "CODEX",
  weight: 5,
  source_documents: isStandardFoundation ? standardFoundationSources : [doc.globalSite, doc.ia, doc.copy],
  branch,
  pr_title: prTitle,
  allowed_paths: isStandardFoundation ? ["assets/**", "*.html", "docs/agentready/**", "scripts/**", "sitemap.xml", "robots.txt"] : ["assets/**", "*.html", "docs/agentready/**", "scripts/**", "sitemap.xml"],
  forbidden_paths: isStandardFoundation ? standardFoundationForbiddenPaths : ["agentready-core/**", "bin/**", "package.json", "action.yml", ".github/workflows/**", "server/**", "api/**", "LICENSE", "NOTICE"],
  deliverables: isStandardFoundation ? standardFoundationDeliverables : [title],
  estimated_files_or_surfaces: isStandardFoundation ? standardFoundationSurfaces : undefined,
  acceptance_criteria: isStandardFoundation ? standardFoundationAcceptance : [`${title} complete after preceding stacked site batch is reviewed`],
  required_commands: isStandardFoundation ? standardFoundationCommands : undefined,
  independent_test_plan: isStandardFoundation ? standardFoundationTests : undefined,
  required_evidence: isStandardFoundation ? standardFoundationEvidence : undefined,
  manual_actions: isStandardFoundation ? ["JEASON reviews the AgentReady standard foundation preview and confirms no formal-standards or certification claim was introduced"] : undefined,
  authorized_actions: isStandardFoundation ? ["create real static public standard, rule, JSON, examples, resources and sample-report surfaces", "add factual local diagrams or static assets when they are derived from current authoritative documents", "add or update validators for the standard foundation pages", "update sitemap robots and internal links only for real routes created by this batch"] : undefined,
  forbidden_actions: isStandardFoundation ? standardFoundationForbiddenActions : undefined,
  codex_preflight_steps: isStandardFoundation ? standardFoundationPreflight : undefined,
  rollback_boundary: isStandardFoundation ? "Revert ARB-SITE-GLOBAL-003 without reverting PR #132 shell or PR #134 product foundation." : `Revert ${id} without reverting earlier stacked site batches.`,
  scope_justification: isStandardFoundation ? "Weight 5 justified: one reviewable public standard foundation spanning standard overview, rule dictionary, scoring, versioning, governance and reference implementation surfaces with one stacked preview and rollback boundary." : "Weight 5 justified: planned global-site batch retained as a non-executable skeleton until the preceding stacked batch is reviewed."
  });
}
codex("AR-SITE-PREMIUM-EPIC", "AR-SITE-PREMIUM-002", "M3", "BEFORE_COMMUNITY_PUBLICATION", "SITE", "Redesign homepage and core product pages", {
  decision_ids: [...decisionIds, "DL-2026-07-12-PREMIUM-SITE-BEFORE-VALIDATION"],
  weight: 5,
  source_documents: [doc.premium, doc.ia, doc.premiumRedesign, doc.copy],
  branch: "site-agentready-premium-core-pages",
  pr_title: "site(agentready): redesign homepage and core product pages",
  allowed_paths: ["assets/**", "index.html", "agentready-ci.html", "agentready.html", "agentready-mcp.html", "pricing.html", "agentready-docs.html", "docs/agentready/**", "scripts/**"],
  forbidden_paths: ["agentready-core/**", "bin/**", "package.json", "action.yml", ".github/workflows/**", "packaging/**", "server/**", "api/**", "LICENSE", "NOTICE"],
  deliverables: ["premium homepage", "premium CI Gate page", "premium OpenAPI and MCP pages", "truthful pricing page", "primary docs entry page", "realistic product demonstration and proof sections"],
  acceptance_criteria: ["hero defines the category and primary action within one viewport", "homepage follows problem demonstration OpenAPI and MCP CI differentiation proof trust limitation CTA order", "product demonstration uses real AgentReady findings outputs and policy behavior", "Community is available free and Pro remains in preparation", "no unavailable feature or fake customer proof is presented", "sections use varied composition rather than repeated card grids", "all commands tags rule codes and outputs match merged product behavior"],
  required_evidence: ["desktop and mobile page evidence", "content-source mapping", "CTA and link audit", "real product-output provenance"],
  rollback_boundary: "Revert the six core page redesigns while preserving the premium shared shell."
});
codex("AR-SITE-PREMIUM-EPIC", "AR-SITE-PREMIUM-003", "M3", "BEFORE_COMMUNITY_PUBLICATION", "SITE", "Validate premium mobile accessibility performance and SEO", {
  decision_ids: [...decisionIds, "DL-2026-07-12-PREMIUM-SITE-BEFORE-VALIDATION"],
  weight: 5,
  source_documents: [doc.premium, doc.ia, doc.premiumRedesign, doc.seo],
  branch: "qa-agentready-premium-site",
  pr_title: "qa(site): validate premium mobile accessibility performance and SEO",
  allowed_paths: ["assets/**", "*.html", "sitemap.xml", "robots.txt", "docs/agentready/**", "scripts/**"],
  forbidden_paths: ["agentready-core/**", "bin/**", "package.json", "action.yml", ".github/workflows/**", "packaging/**", "server/**", "api/**", "LICENSE", "NOTICE"],
  deliverables: ["cross-viewport QA report", "accessibility and keyboard report", "performance and Core Web Vitals evidence", "SEO metadata and structured-data audit", "visual consistency and stale-copy audit", "blocking corrections"],
  acceptance_criteria: ["Android iPhone-size tablet and desktop layouts pass", "keyboard focus semantics contrast touch targets and reduced motion pass", "no horizontal overflow broken link empty CTA or hidden critical content remains", "critical product content is available without JavaScript", "performance evidence meets documented static-site budgets", "titles descriptions canonicals structured data and internal links are valid", "stale manual offers and unsupported product claims are absent", "mandatory limitation remains on key pages"],
  required_evidence: ["viewport matrix", "accessibility audit", "performance report", "SEO and structured-data report", "broken-link report", "final visual consistency review"],
  rollback_boundary: "Revert only QA corrections that regress the approved premium design; preserve evidence and issue records."
});
epic("AR-ONB-EPIC", "M3", "BEFORE_COMMUNITY_PUBLICATION", "ONB", "Community onboarding", ["AR-COM-006"]);
codex("AR-ONB-EPIC", "AR-ONB-001", "M3", "BEFORE_COMMUNITY_PUBLICATION", "ONB", "Add local scan onboarding command", { decision_ids: [...decisionIds, validationDecisionId], depends_on: ["AR-COM-006"], source_documents: [doc.onboarding, doc.cli, doc.validation], branch: "add-local-scan-onboarding-command", pr_title: "feat(community): add local scan onboarding command", allowed_paths: ["cli/**", "agentready-examples/**", "docs/agentready/**"], forbidden_paths: ["agentready-core/**", "package.json", "LICENSE", "*.html"], acceptance_criteria: ["canonical local OpenAPI and MCP scan commands work without global installation", "errors are actionable", "no signup token upload or TimeProofs backend is required"], required_commands: ["node cli/tests/run-agentready-cli-tests.mjs"], required_evidence: ["clean local scan evidence", "OpenAPI and MCP command evidence", "error output evidence"] });
codex("AR-ONB-EPIC", "AR-ONB-002", "M3", "BEFORE_COMMUNITY_PUBLICATION", "ONB", "Add init workflow generator", { decision_ids: [...decisionIds, validationDecisionId], depends_on: ["AR-ONB-001"], source_documents: [doc.onboarding, doc.cli, doc.validation], branch: "add-init-workflow-generator", pr_title: "feat(community): add init workflow generator", allowed_paths: ["cli/**", "agentready-examples/**", "docs/agentready/**"], forbidden_paths: ["agentready-core/**", "package.json", "LICENSE", "*.html"], acceptance_criteria: ["init detects OpenAPI and MCP files", "files are shown before writing", "confirmation is required", "Community workflow is generated", "a local scan is run", "Pro policy is not generated", "rollback or cleanup is documented"], required_commands: ["node cli/tests/run-agentready-cli-tests.mjs"], required_evidence: ["detection evidence", "confirmation evidence", "generated workflow", "local scan evidence", "cleanup evidence"] });
codex("AR-ONB-EPIC", "AR-ONB-003", "M3", "BEFORE_COMMUNITY_PUBLICATION", "ONB", "Add demo command and fixtures", { decision_ids: [...decisionIds, validationDecisionId], depends_on: ["AR-ONB-001"], source_documents: [doc.onboarding, doc.cli, doc.validation], branch: "add-demo-command-and-fixtures", pr_title: "feat(community): add demo command and fixtures", allowed_paths: ["cli/**", "agentready-examples/**", "docs/agentready/**"], forbidden_paths: ["agentready-core/**", "package.json", "LICENSE", "*.html"], acceptance_criteria: ["demo works without network access to TimeProofs", "demo includes a useful PASS and FAIL path", "fixtures are deterministic and documented", "demo output points to the next CI step"], required_commands: ["node cli/tests/run-agentready-cli-tests.mjs"], required_evidence: ["deterministic demo evidence", "PASS and FAIL demo output", "fixture documentation"] });
codex("AR-ONB-EPIC", "AR-ONB-004", "M3", "BEFORE_COMMUNITY_PUBLICATION", "ONB", "Publish three-minute tutorial", { decision_ids: [...decisionIds, validationDecisionId], depends_on: ["AR-ONB-001"], source_documents: [doc.onboarding, doc.cli, doc.validation], branch: "publish-three-minute-tutorial", pr_title: "docs(community): publish three-minute tutorial", allowed_paths: ["docs/agentready/**", "README.md", "index.html", "agentready-ci.html"], forbidden_paths: ["agentready-core/**", "bin/**", "package.json", "LICENSE"], acceptance_criteria: ["one canonical discover run init commit first-run path is documented", "flow is timed from a clean environment", "target is under three minutes", "no signup card token upload or global install is required", "tutorial links from public discovery surfaces", "rollback or cleanup is documented"], required_commands: ["node cli/tests/run-agentready-cli-tests.mjs", "node scripts/validate-agentready-strategy-docs.mjs", "node scripts/validate-agentready-execution-system.mjs"], required_evidence: ["dated clean-environment timing", "first successful GitHub run", "public tutorial links", "cleanup instructions"] });

epic("AR-PILOT-EPIC", "M4", "BEFORE_PRO_TECHNICAL_COMPLETION", "MARKET", "External Community pilot and differentiation", ["AR-COM-008", "AR-ONB-004"]);
codex("AR-PILOT-EPIC", "AR-MARKET-PILOT-001", "M4", "BEFORE_PRO_TECHNICAL_COMPLETION", "MARKET", "Prepare external Community pilot kit and evidence registry", {
  decision_ids: [...decisionIds, validationDecisionId],
  depends_on: ["AR-COM-008", "AR-ONB-004"],
  source_documents: [doc.validation, doc.gtm, doc.adoption, doc.privacy],
  branch: "docs-agentready-external-community-pilot-kit",
  pr_title: "docs(validation): prepare AgentReady external Community pilot kit",
  allowed_paths: ["docs/agentready/**", "agentready-examples/**", "scripts/**"],
  forbidden_paths: ["agentready-core/**", "bin/**", ".github/actions/**", "package.json", "LICENSE", "*.html"],
  deliverables: ["tester guide", "pilot evidence registry", "false-positive and false-negative register", "abandonment and feature-request register", "before fix after case template", "consent and confidentiality checklist", "outreach candidate worksheet", "voluntary redacted feedback procedure"],
  acceptance_criteria: ["pilot kit can record five distinct external users and three real repositories", "OpenAPI and MCP usage are recorded separately", "first use and 30-day reuse fields exist", "real issue fix and after-result evidence can be recorded", "false positives false negatives abandonment and feature requests are captured", "payment-signal context and real price presentation can be recorded", "public quote and case publication require consent", "no automatic outreach invented evidence silent telemetry or default full-contract upload is introduced"],
  independent_test_plan: ["validate every required threshold has an evidence field", "test templates with synthetic labels clearly marked as examples", "verify consent redaction and confidentiality controls", "run execution-system validator"],
  required_commands: ["node scripts/validate-agentready-strategy-docs.mjs", "node scripts/validate-agentready-execution-system.mjs"],
  required_evidence: ["completed empty pilot templates", "threshold-to-evidence mapping", "consent and redaction review", "no-telemetry review"]
});
ownerAction("AR-PILOT-EPIC", "AR-MARKET-PILOT-001H", "M4", "BEFORE_PRO_TECHNICAL_COMPLETION", "MARKET", "Validate five-user external Community pilot", { decision_ids: [...decisionIds, validationDecisionId], depends_on: ["AR-MARKET-PILOT-001"], blocks: ["AR-MARKET-PILOT-002"], source_documents: [doc.validation, doc.gtm], acceptance_criteria: ["at least five distinct external Community users", "at least three real external repositories or contract surfaces", "at least one real OpenAPI use", "at least one real MCP use", "at least two measurable 30-day return or reuse signals where the observation window permits", "at least one useful real issue detected and corrected", "false positives false negatives abandonment reasons and feature requests recorded honestly", "at least one explicit signal identifies a function for which an external user may pay", "project accounts fixtures automated installs and TimeProofs repository runs are excluded"], required_evidence: ["pseudonymized pilot-user records", "repository or contract-surface records", "OpenAPI and MCP usage evidence", "reuse evidence or pending observation status", "real issue fix and after-result evidence", "feedback and abandonment register", "payment-function signal context"], validation_thresholds: { external_users_required: 5, real_repositories_or_surfaces_required: 3, openapi_uses_required: 1, mcp_uses_required: 1, reuse_signals_required: 2, useful_real_issue_and_fix_required: 1, explicit_payment_function_signals_required: 1, excludes_project_accounts: true, excludes_internal_fixtures: true, excludes_automated_installs: true } });
decisionGate("AR-PILOT-EPIC", "AR-MARKET-PILOT-002", "M4", "BEFORE_PRO_TECHNICAL_COMPLETION", "MARKET", "Decide whether AgentReady proceeds to Pro implementation", { decision_ids: [...decisionIds, validationDecisionId], owner: "CODEX_AND_JEASON", depends_on: ["AR-MARKET-PILOT-001H", "AR-ENG-005"], blocks: ["AR-PRO-001"], source_documents: [doc.validation, doc.engine, doc.gtm], acceptance_criteria: ["pilot threshold evidence reviewed", "benchmark thresholds and final results reviewed", "agent-specific differentiation evidence reviewed", "MCP static coverage and limitations reviewed", "false positives false negatives reuse abandonment and feature requests reviewed", "continue correct pause pivot or reject decision recorded"], required_evidence: ["pilot decision record", "benchmark review", "differentiation review", "selected outcome and owner approval"], metrics: ["external users", "real repositories", "OpenAPI and MCP usage", "30-day reuse", "useful real issues", "false positives", "false negatives", "abandonment reasons", "feature requests", "payment-function signals", "precision", "recall", "differentiation evidence"], allowed_outcomes: ["CONTINUE", "CORRECT", "PAUSE", "PIVOT", "REJECT"] });

epic("AR-ENG-EPIC", "M4", "BEFORE_PRO_TECHNICAL_COMPLETION", "ENG", "Engine benchmark and quality", ["AR-COM-008"]);
codex("AR-ENG-EPIC", "AR-ENG-001", "M4", "BEFORE_PRO_TECHNICAL_COMPLETION", "ENG", "Add benchmark corpus architecture and annotation schema", { decision_ids: [...decisionIds, validationDecisionId], depends_on: ["AR-COM-008"], source_documents: [doc.engine, doc.commercial, doc.validation], branch: "test-engine-benchmark-corpus-harness", pr_title: "test(engine): add AgentReady benchmark corpus foundation", allowed_paths: ["agentready-core/**", "agentready-examples/**", "docs/agentready/**"], forbidden_paths: ["package.json", "LICENSE", "*.html"], deliverables: ["safe and dangerous OpenAPI corpus schema", "safe and dangerous MCP corpus schema", "human annotation schema", "representative general-validator and linter baseline schema", "MCP static coverage classification schema"], acceptance_criteria: ["corpus supports safe dangerous ambiguous false-positive and false-negative cases", "OpenAPI and MCP cases are separated", "human labels and disagreements can be recorded", "baseline comparison fields are reproducible and tool versions are recorded", "MCP risks can be classified as detected partially detectable or statically non-detectable", "external pilot findings can be incorporated without confidential data"], required_commands: ["node agentready-core/tests/run-agentready-core-tests.mjs", "node scripts/validate-agentready-execution-system.mjs"], required_evidence: ["corpus and annotation schema", "baseline comparison schema", "MCP coverage schema", "sample reproducible fixtures"] });
ownerAction("AR-ENG-EPIC", "AR-ENG-001H", "M4", "BEFORE_PRO_TECHNICAL_COMPLETION", "ENG", "Validate human benchmark annotations", { owner: "CODEX_AND_JEASON", status: "OWNER_ACTION_REQUIRED", depends_on: ["AR-ENG-001"], blocks: ["AR-ENG-002", "AR-ENG-005"], source_documents: [doc.engine], acceptance_criteria: ["human label review completed", "ambiguous labels recorded"], required_evidence: ["dated human annotation approval"] });
decisionGate("AR-ENG-EPIC", "AR-ENG-001T", "M4", "BEFORE_PRO_TECHNICAL_COMPLETION", "ENG", "Freeze benchmark acceptance thresholds before final evaluation", { owner: "CODEX_AND_JEASON", depends_on: ["AR-ENG-001"], blocks: ["AR-ENG-002", "AR-ENG-005"], source_documents: [doc.engine], acceptance_criteria: ["benchmark acceptance thresholds are defined before final metric calculation", "thresholds are dated", "thresholds are approved before observing final results", "precision threshold recorded", "recall threshold recorded", "false-positive threshold recorded", "false-negative threshold recorded", "performance threshold recorded", "reproducibility threshold recorded", "ambiguous-case behavior threshold recorded"], required_evidence: ["dated approved benchmark threshold record before final evaluation"], validation_thresholds: { must_be_defined_before_final_results: true, required_metrics: ["precision", "recall", "false_positive_rate", "false_negative_rate", "performance", "reproducibility", "ambiguous_case_behavior"], no_numeric_values_in_this_pr: true }, metrics: ["precision", "recall", "false positive rate", "false negative rate", "performance", "reproducibility", "ambiguous case behavior"] });
for (const row of [["AR-ENG-002","Add benchmark metric calculation"],["AR-ENG-003","Correct AR001 AR003 AR008 and AR010 semantics"],["AR-ENG-004","Add performance and reproducibility benchmark"],["AR-ENG-005","Publish reproducible benchmark report and limitations"],["AR-ENG-006","Prepare voluntary false-positive reporting command"]]) codex("AR-ENG-EPIC", row[0], row[0] === "AR-ENG-006" ? "M5" : "M4", "BEFORE_PRO_TECHNICAL_COMPLETION", "ENG", row[1], { weight: row[0] === "AR-ENG-003" ? 5 : 3, depends_on: row[0] === "AR-ENG-002" ? ["AR-ENG-001H", "AR-ENG-001T"] : row[0] === "AR-ENG-005" ? ["AR-ENG-001H", "AR-ENG-001T", "AR-ENG-002", "AR-ENG-003", "AR-ENG-004"] : ["AR-ENG-002"], source_documents: [doc.engine, doc.rules, doc.validation], branch: slug(row[1]), pr_title: `${row[0] === "AR-ENG-003" ? "fix" : row[0] === "AR-ENG-006" ? "feat" : "test"}(engine): ${row[1].toLowerCase()}`, allowed_paths: ["agentready-core/**", "scripts/**", "docs/agentready/**"], forbidden_paths: ["package.json", "LICENSE", "*.html"], acceptance_criteria: row[0] === "AR-ENG-005" ? ["reproducible final report publishes precision recall false-positive false-negative performance and reproducibility results", "representative general validation or linting baselines are versioned and reproduced", "agent-specific differentiation is stated factually from measured cases", "MCP coverage matrix distinguishes detected partially detectable and statically non-detectable risks", "limitations and complementary runtime categories are explicit", "external pilot findings are included only with consent and without confidential data"] : [`${row[1]} complete`], required_commands: ["node agentready-core/tests/run-agentready-core-tests.mjs"], scope_justification: row[0] === "AR-ENG-003" ? "Weight 5 justified: strongly coupled rule semantics correction across four known rule gaps." : undefined });

epic("AR-PRO-EPIC", "M5", "BEFORE_PRO_TECHNICAL_COMPLETION", "PRO", "Pro MVP", ["AR-MARKET-PILOT-002"]);
[
  ["AR-PRO-001","Add versioned AgentReady policy configuration"],["AR-PRO-002","Add baseline comparison"],["AR-PRO-003","Add new-risks-only mode"],["AR-PRO-004","Add SARIF export"],["AR-PRO-005","Add pull request annotations"],["AR-PRO-006","Add local structured exceptions schema"],["AR-PRO-007","Enforce exception owner justification and expiry"],["AR-PRO-008","Add Pro MVP integration tests"]
].forEach(([id,title], i) => codex("AR-PRO-EPIC", id, "M5", "BEFORE_PRO_TECHNICAL_COMPLETION", "PRO", title, { depends_on: i === 0 ? ["AR-MARKET-PILOT-002"] : [`AR-PRO-${String(i).padStart(3,"0")}`], source_documents: [doc.entitlements, doc.validation], branch: slug(title), pr_title: `feat(pro): ${title.toLowerCase()}`, allowed_paths: ["cli/**", "docs/agentready/**"], required_commands: ["node cli/tests/run-agentready-cli-tests.mjs"] }));

epic("AR-LIC-EPIC", "M6", "BEFORE_PRO_FIRST_SALE", "LIC", "Licensing and entitlements", ["AR-PRO-008", "AR-MARKET-002"]);
["Implement entitlement data model","Generate random license key and server-side hash model","Add signed entitlement token","Add local signature verification cache grace and offline behavior","Add repository registration and pseudonymization","Add license activation and recovery flow","Add license lifecycle revocation renewal downgrade and cancellation","Add licensing security and privacy tests"].forEach((title, i) => codex("AR-LIC-EPIC", `AR-LIC-${String(i+1).padStart(3,"0")}`, "M6", "BEFORE_PRO_FIRST_SALE", "LIC", title, { depends_on: i === 0 ? ["AR-PRO-008", "AR-MARKET-002"] : [`AR-LIC-${String(i).padStart(3,"0")}`], source_documents: [doc.licensing, doc.entitlements, doc.validation], branch: slug(title), pr_title: `feat(licensing): ${title.toLowerCase()}`, allowed_paths: ["server/**", "cli/**", "docs/agentready/**"], forbidden_paths: ["agentready-core/**", "package.json", "LICENSE", "*.html"], required_commands: ["node cli/tests/run-agentready-cli-tests.mjs"] }));

epic("AR-BILL-EPIC", "M6", "BEFORE_PRO_FIRST_SALE", "BILL", "Stripe and customer lifecycle automation", ["AR-LIC-008"]);
ownerAction("AR-BILL-EPIC", "AR-BILL-001", "M6", "BEFORE_PRO_FIRST_SALE", "FIN", "Verify Stripe bank tax and payment readiness", { depends_on: ["AR-LIC-008"], source_documents: [doc.billing, doc.legalReq], required_evidence: ["owner Stripe readiness evidence"], external_verification: { required: true, topic: "Stripe account bank VAT and tax readiness", verified_at: null, valid_until: null, sources: [], verified_by: "", result: "" } });
["Configure Stripe test products and prices","Add monthly and annual Checkout test flow","Add minimal customer account identity","Add idempotent subscription webhooks","Provision entitlement after payment","Add Stripe Customer Portal access","Handle subscription renewal","Handle failed payment and grace period","Handle cancellation and downgrade","Document and handle refunds","Add transactional customer emails","Add account and license recovery","Add account deletion and data cleanup","Run controlled purchase activation cancellation test"].forEach((title, i) => codex("AR-BILL-EPIC", `AR-BILL-${String(i+2).padStart(3,"0")}`, "M6", "BEFORE_PRO_FIRST_SALE", "BILL", title, { depends_on: i === 0 ? ["AR-BILL-001", "AR-LIC-008"] : [`AR-BILL-${String(i+1).padStart(3,"0")}`], source_documents: [doc.billing], branch: slug(title), pr_title: `feat(billing): ${title.toLowerCase()}`, allowed_paths: ["server/**", "api/**", "docs/agentready/**"], forbidden_paths: ["agentready-core/**", "package.json", "LICENSE", "*.html"] }));
ownerAction("AR-BILL-EPIC", "AR-FIN-001", "M6", "BEFORE_PRO_FIRST_SALE", "FIN", "Define accounting VAT and Stripe reconciliation workflow", { depends_on: ["AR-BILL-001"], source_documents: [doc.billing], required_evidence: ["owner accounting workflow decision"], external_verification: { required: true, topic: "VAT and accounting obligations", verified_at: null, valid_until: null, sources: [], verified_by: "", result: "" } });

epic("AR-SITE-EPIC", "M7", "BEFORE_GLOBAL_LAUNCH", "SITE", "Global product website and launch surfaces", ["AR-BILL-015"]);
const siteRoutes = [["/","homepage"],["/product","product overview"],["/community","Community"],["/pro","Pro"],["/pricing","pricing"],["/openapi","OpenAPI"],["/mcp","MCP"],["/agentready-ci","CI Gate"],["/how-it-works","how it works"],["/methodology","methodology"],["/limitations","limitations"],["/benchmark","benchmark"],["/examples/bad-fixed","bad fixed examples"],["/rules","rule overview"],["/changelog","changelog"],["/compatibility","compatibility"],["/trust","Trust Center"],["/security","security"],["/privacy","privacy"],["/terms","terms"],["/refund","refund"],["/responsible-disclosure","responsible disclosure"],["/status","status"],["/support","support"],["/account","account and billing surface family"]];
siteRoutes.forEach(([route,name], i) => codex("AR-SITE-EPIC", `AR-SITE-${String(i+1).padStart(3,"0")}`, "M7", "BEFORE_GLOBAL_LAUNCH", "SITE", `Publish ${name} page`, { depends_on: i === 0 ? ["AR-BILL-015", "AR-LEG-001"] : [`AR-SITE-${String(i).padStart(3,"0")}`], source_documents: [doc.premium, doc.ia, doc.copy], branch: slug(`site ${name}`), pr_title: `site(agentready): publish ${name} page`, allowed_paths: ["*.html", "docs/agentready/**"], forbidden_paths: siteForbidden, estimated_files_or_surfaces: [route], deliverables: [route], rollback_boundary: `Revert ${route} page family only.` }));

epic("AR-SEO-EPIC", "M7", "BEFORE_GLOBAL_LAUNCH", "SEO", "Technical SEO and content system", ["AR-SITE-001"]);
["Add URL canonical sitemap robots redirects and 404 architecture","Add metadata Open Graph and structured data","Validate Core Web Vitals accessibility and no-JS rendering"].forEach((title,i)=>codex("AR-SEO-EPIC",`AR-SEO-${String(i+1).padStart(3,"0")}`,"M7","BEFORE_GLOBAL_LAUNCH","SEO",title,{depends_on:["AR-SITE-001"],source_documents:[doc.seo],branch:slug(title),pr_title:`seo(site): ${title.toLowerCase()}`,allowed_paths:["*.html","sitemap.xml","robots.txt","docs/agentready/**"],forbidden_paths:["agentready-core/**","bin/**","package.json","LICENSE"]}));
external("AR-SEO-EPIC","AR-SEO-004","M7","BEFORE_GLOBAL_LAUNCH","SEO","Verify search topics and intent externally","search topics and intent",{depends_on:["AR-SEO-003"],source_documents:[doc.seo]});
["Build topic clusters and internal linking","Publish OpenAPI SEO page set","Publish MCP SEO page set","Publish security CI and policy SEO pages","Optimize AR001-AR010 rule pages","Publish bad fixed example library for SEO","Publish comparisons and alternatives pages","Set Search Console indexing and monitoring"].forEach((title,i)=>codex("AR-SEO-EPIC",`AR-SEO-${String(i+5).padStart(3,"0")}`,"M7","BEFORE_GLOBAL_LAUNCH","SEO",title,{depends_on:["AR-SEO-004"],source_documents:[doc.seo],branch:slug(title),pr_title:`seo(site): ${title.toLowerCase()}`,allowed_paths:["*.html","docs/agentready/**"],forbidden_paths:siteForbidden}));
recurring("AR-SEO-EPIC","AR-SEO-013","M8","POST_LAUNCH","SEO","Run recurring content update review",{source_documents:[doc.seo]});

epic("AR-GEO-EPIC", "M7", "BEFORE_GLOBAL_LAUNCH", "GEO", "GEO and AI-first architecture", ["AR-SITE-001"]);
["Publish canonical what AgentReady is and is not","Add extractible answers and short definitions","Add authors dates and versioning metadata","Publish primary sources and machine-readable specifications","Ensure no-JS content and code examples","Normalize TimeProofs AgentReady entity naming","Test assistant comprehension and incorrect representations"].forEach((title,i)=>codex("AR-GEO-EPIC",`AR-GEO-${String(i+1).padStart(3,"0")}`,"M7","BEFORE_GLOBAL_LAUNCH","GEO",title,{depends_on:i===0?["AR-SITE-001"]:["AR-GEO-001"],source_documents:[doc.seo],branch:slug(title),pr_title:`ai(site): ${title.toLowerCase()}`,allowed_paths:["*.html","docs/agentready/**"],forbidden_paths:siteForbidden}));
codex("AR-GEO-EPIC","AR-GEO-008","M8","POST_LAUNCH","GEO","Monitor incorrect AI representations after launch",{status:"POST_LAUNCH",depends_on:["AR-LAUNCH-001"],source_documents:[doc.seo],branch:"ai-monitor-incorrect-representations",pr_title:"ai(site): monitor incorrect AgentReady representations"});
codex("AR-GEO-EPIC","AR-GEO-009","M8","POST_LAUNCH","GEO","Evaluate experimental llms.txt and AGENTS.md",{status:"POST_LAUNCH",depends_on:["AR-LAUNCH-001"],source_documents:[doc.seo],branch:"ai-evaluate-llms-agents-experimental",pr_title:"ai(site): evaluate experimental llms.txt and AGENTS.md"});

epic("AR-COMP-EPIC","M7","BEFORE_GLOBAL_LAUNCH","COMP","Competitive intelligence and positioning",["AR-GOV-003"]);
external("AR-COMP-EPIC","AR-COMP-001","M7","BEFORE_GLOBAL_LAUNCH","COMP","Verify competitors and pricing categories","competitors pricing and categories",{depends_on:["AR-BILL-015"],source_documents:[doc.comp]});
["Create internal competitive matrix","Finalize public positioning from verified evidence","Publish categories of solutions page","Publish factual alternatives pages","Create competitive update process"].forEach((title,i)=>codex("AR-COMP-EPIC",`AR-COMP-${String(i+2).padStart(3,"0")}`,"M7","BEFORE_GLOBAL_LAUNCH","COMP",title,{depends_on:i===0?["AR-COMP-001"]:[`AR-COMP-${String(i+1).padStart(3,"0")}`],source_documents:[doc.comp],branch:slug(title),pr_title:`docs(positioning): ${title.toLowerCase()}`,allowed_paths:["docs/agentready/**","*.html"],forbidden_paths:siteForbidden}));
legalReview("AR-COMP-EPIC","AR-COMP-007","M7","BEFORE_GLOBAL_LAUNCH","Review public comparison claims",{depends_on:["AR-COMP-005"],source_documents:[doc.comp,doc.legal],required_evidence:["legal comparison review"]});

epic("AR-DOC-EPIC","M7","BEFORE_GLOBAL_LAUNCH","DOC","Documentation and developer experience",["AR-COM-008"]);
["Publish documentation hub structure","Publish installation and CLI docs","Publish CLI reference","Publish GitHub Action docs","Publish configuration and policy docs","Publish baseline docs","Publish SARIF and annotation docs","Publish exception docs","Publish troubleshooting and error codes","Publish security and privacy developer docs","Publish migration and compatibility docs","Publish OpenAPI examples docs","Publish MCP examples docs"].forEach((title,i)=>codex("AR-DOC-EPIC",`AR-DOC-${String(i+1).padStart(3,"0")}`,"M7","BEFORE_GLOBAL_LAUNCH","DOC",title,{depends_on:i===0?["AR-COM-008"]:["AR-DOC-001"],source_documents:[doc.readme,doc.json,doc.actionUsage],branch:slug(title),pr_title:`docs(agentready): ${title.toLowerCase()}`}));

epic("AR-INT-EPIC","M8","POST_LAUNCH","INT","Framework integrations",["AR-LAUNCH-001"]);
["MCP TypeScript SDK","MCP Python SDK","FastMCP","LangChain MCP","OpenAPI Generator"].forEach((name,i)=>codex("AR-INT-EPIC",`AR-INT-${String(i+1).padStart(3,"0")}`,"M8","POST_LAUNCH","INT",`Publish ${name} integration guide`,{status:"POST_LAUNCH",depends_on:["AR-LAUNCH-001"],source_documents:[doc.adoption,doc.mcp],branch:slug(`integration ${name}`),pr_title:`docs(integrations): add ${name} AgentReady guide`,allowed_paths:["docs/agentready/**","agentready-examples/**"]}));

epic("AR-CAT-EPIC","M8","POST_LAUNCH","CAT","Standardization and category-building",["AR-ENG-005"]);
["Publish rule dictionary structure and page model","Publish AR001 and AR002 rule pages","Publish AR003 and AR004 rule pages","Publish AR005 and AR006 rule pages","Publish AR007 and AR008 rule pages","Publish AR009 and AR010 rule pages","Publish bad fixed public library","Publish badge model and freshness rules","Publish namespace governance","Publish public benchmark methodology","Prepare public observatory after prerequisites","Prepare State of Agent-Facing Contract Security report"].forEach((title,i)=>codex("AR-CAT-EPIC",`AR-CAT-${String(i+1).padStart(3,"0")}`,"M8","POST_LAUNCH","CAT",title,{status:"POST_LAUNCH",depends_on:i===0?["AR-ENG-005"]:[`AR-CAT-${String(i).padStart(3,"0")}`],source_documents:[doc.ruleFormat,doc.rules,doc.adoption],branch:slug(title),pr_title:`docs(standard): ${title.toLowerCase()}`,allowed_paths:["*.html","docs/agentready/**"],forbidden_paths:siteForbidden}));

legalReview("AR-SITE-EPIC","AR-LEG-001","M6","BEFORE_PRO_FIRST_SALE","Finalize legal B2B terms privacy and liability",{depends_on:["AR-BILL-001"],source_documents:[doc.legal,doc.legalReq],required_evidence:["legal approval"]});
codex("AR-SITE-EPIC","AR-SUPPORT-001","M6","BEFORE_PRO_FIRST_SALE","SUPPORT","Publish self-service support channels",{depends_on:["AR-LEG-001"],source_documents:[doc.privacy],branch:"site-support-channels",pr_title:"site(support): publish AgentReady support channels",allowed_paths:["*.html","docs/agentready/**"],forbidden_paths:siteForbidden});
codex("AR-SITE-EPIC","AR-SUPPORT-002","M6","BEFORE_PRO_FIRST_SALE","SUPPORT","Publish support lifecycle and recovery docs",{depends_on:["AR-SUPPORT-001"],source_documents:[doc.privacy],branch:"docs-support-lifecycle-recovery",pr_title:"docs(support): publish AgentReady lifecycle and recovery help"});

epic("AR-INFRA-EPIC","M7","BEFORE_GLOBAL_LAUNCH","INFRA","Infrastructure and cloud",["AR-BILL-015"]);
["Define production architecture","Separate staging and production environments","Add database schema migration plan","Define secrets and admin access controls","Add backup and restore procedure","Add infrastructure cost limits and monitoring"].forEach((title,i)=>codex("AR-INFRA-EPIC",`AR-INFRA-${String(i+1).padStart(3,"0")}`,"M7","BEFORE_GLOBAL_LAUNCH","INFRA",title,{depends_on:i===0?["AR-BILL-015"]:["AR-INFRA-001"],source_documents:[doc.diligence,doc.launch],branch:slug(title),pr_title:`infra(agentready): ${title.toLowerCase()}`,allowed_paths:["docs/agentready/**","infra/**"],forbidden_paths:["agentready-core/**","package.json","LICENSE","*.html"]}));
manual("AR-INFRA-EPIC","AR-SEC-001","SECURITY_REVIEW","M6","BEFORE_PRO_FIRST_SALE","SEC","Run security and supply-chain review","SECURITY","SECURITY_REVIEW_REQUIRED",{depends_on:["AR-INFRA-001","AR-BILL-015"],source_documents:["SECURITY.md",doc.launch],required_evidence:["security review report"]});
codex("AR-INFRA-EPIC","AR-SEC-002","M6","BEFORE_PRO_FIRST_SALE","SEC","Convert security review findings into remediation tasks",{depends_on:["AR-SEC-001"],source_documents:["SECURITY.md",doc.launch],branch:"docs-security-review-remediation-ledger",pr_title:"docs(security): record AgentReady security remediation tasks"});
codex("AR-INFRA-EPIC","AR-SEC-003","M6","BEFORE_PRO_FIRST_SALE","SEC","Fix blocking security review findings",{status:"BLOCKED",depends_on:["AR-SEC-002"],source_documents:["SECURITY.md",doc.launch],branch:"fix-security-blocking-findings",pr_title:"fix(security): address blocking AgentReady security findings",allowed_paths:["server/**","api/**","docs/agentready/**"],forbidden_paths:["package.json","LICENSE","*.html"],notes:"Blocked until security review produces concrete findings."});
manual("AR-INFRA-EPIC","AR-SEC-004","SECURITY_REVIEW","M6","BEFORE_PRO_FIRST_SALE","SEC","Security signoff before first Pro sale","SECURITY","SECURITY_REVIEW_REQUIRED",{depends_on:["AR-SEC-003"],source_documents:["SECURITY.md"],required_evidence:["security signoff"]});
["Add reliability runbooks","Publish status page behavior","Add incident response and rollback runbook"].forEach((title,i)=>codex("AR-INFRA-EPIC",`AR-REL-${String(i+1).padStart(3,"0")}`,"M7","BEFORE_GLOBAL_LAUNCH","REL",title,{depends_on:i===0?["AR-INFRA-001"]:[`AR-REL-${String(i).padStart(3,"0")}`],source_documents:[doc.launch],branch:slug(title),pr_title:`docs(ops): ${title.toLowerCase()}`}));
manual("AR-SITE-EPIC","AR-UX-001","DESIGN_REVIEW","M7","BEFORE_GLOBAL_LAUNCH","UX","Review premium UX conversion and accessibility","DESIGN","EXTERNAL_SPECIALIST_REQUIRED",{depends_on:["AR-SITE-001","AR-SITE-005"],source_documents:[doc.premium],required_evidence:["design review report"]});
codex("AR-SITE-EPIC","AR-LAUNCH-001","M7","BEFORE_GLOBAL_LAUNCH","LAUNCH","Run AgentReady Community and Pro launch audit",{owner:"CODEX_AND_JEASON",weight:5,depends_on:["AR-SITE-025","AR-SEC-004","AR-FIN-001","AR-REL-003","AR-MARKET-001"],source_documents:[doc.launch],branch:"qa-launch-agentready-community-pro",pr_title:"qa(launch): run AgentReady Community and Pro launch audit",required_evidence:["launch audit report","owner launch decision"],manual_actions:["Owner reviews final launch audit"],decision_gate:{metrics:["launch QA pass","legal pass","payment pass","support readiness","commercial validation evidence"],review_date:null,allowed_outcomes:["CONTINUE","CORRECT","PAUSE","PIVOT","REJECT"],selected_outcome:null,owner_approval:null},scope_justification:"Weight 5 justified: final audit is a single decision gate and does not implement multiple systems."});
ownerAction("AR-SITE-EPIC","AR-LAUNCH-001H","M7","BEFORE_GLOBAL_LAUNCH","LAUNCH","Approve global launch audit outcome",{depends_on:["AR-LAUNCH-001"],source_documents:[doc.launch],required_evidence:["owner launch approval or correction decision"],manual_actions:["Review final launch audit and approve continue correct pause pivot or reject"]});
epic("AR-MARKET-EPIC", "M5", "BEFORE_PRO_FIRST_SALE", "MARKET", "Commercial validation and evidence gates", ["AR-MARKET-PILOT-002"]);
decisionGate("AR-MARKET-EPIC","AR-MARKET-001A","M5","BEFORE_PRO_FIRST_SALE","MARKET","Validate ten external Community users",{decision_ids:[...decisionIds,validationDecisionId],depends_on:["AR-MARKET-PILOT-002"],source_documents:[doc.gtm,doc.adoption,doc.validation],acceptance_criteria:["at least ten distinct external users", "no user is Jeason or a project-owned test account", "each user ran AgentReady on a real OpenAPI contract, MCP server, or repository", "automated installs, internal fixtures, and AgentReady repository CI runs do not count", "first-use date recorded", "30-day reuse or return signal measured where possible", "positive feedback, negative feedback, and abandonment reasons recorded honestly"],required_evidence:["pseudonymized user identifiers", "date", "usage type", "general result", "30-day reuse signal when measurable", "consent record for any public quote"],validation_thresholds:{external_community_users_required:10, excludes_project_accounts:true, excludes_internal_fixtures:true, requires_real_contract_or_repository:true, requires_first_use_date:true, requires_30_day_reuse_review:true, requires_honest_feedback:true},metrics:["external Community users", "30-day reuse", "positive feedback", "negative feedback", "abandonment reasons"]});
decisionGate("AR-MARKET-EPIC","AR-MARKET-001B","M5","BEFORE_PRO_FIRST_SALE","MARKET","Validate three explicit Pro payment signals",{decision_ids:[...decisionIds,validationDecisionId],depends_on:["AR-MARKET-001A"],source_documents:[doc.gtm,doc.pricing,doc.validation],acceptance_criteria:["at least three external users or companies", "real Pro price presented clearly", "real Pro scope presented clearly", "explicit response indicates willingness to pay, intent to buy, commercial trial request, or willingness to continue toward purchase", "generic compliments or general interest do not count", "no false testimonial", "no response generated by the project team"],required_evidence:["date", "pseudonymized profile", "price presented", "response obtained", "exchange context", "publication authorization if needed"],validation_thresholds:{explicit_pro_payment_signals_required:3, requires_real_price:true, requires_real_scope:true, excludes_project_team_responses:true, excludes_generic_interest:true},metrics:["explicit Pro payment signals", "price presented", "purchase intent", "trial requests"]});
decisionGate("AR-MARKET-EPIC", "AR-MARKET-002", "M5", "BEFORE_PRO_FIRST_SALE", "MARKET", "Authorize licensing Stripe and account implementation", { decision_ids: [...decisionIds, validationDecisionId], owner: "CODEX_AND_JEASON", depends_on: ["AR-MARKET-001A", "AR-MARKET-001B", "AR-MARKET-001D"], blocks: ["AR-LIC-001"], source_documents: [doc.validation, doc.gtm, doc.pricing, doc.engine], acceptance_criteria: ["ten external Community users gate passed", "three explicit Pro payment signals gate passed at the real price and scope", "credible external value case gate passed", "benchmark and differentiation evidence accepted", "owner authorizes or refuses commercial infrastructure implementation", "continue correct pause pivot or reject decision recorded"], required_evidence: ["commercial infrastructure authorization decision", "ten-user evidence review", "payment-signal evidence review", "value-case evidence review", "benchmark and differentiation review"], metrics: ["external Community users", "30-day reuse", "explicit Pro payment signals", "credible public value cases", "precision", "recall", "false-positive rate", "differentiation evidence"], allowed_outcomes: ["CONTINUE", "CORRECT", "PAUSE", "PIVOT", "REJECT"] });
decisionGate("AR-MARKET-EPIC","AR-MARKET-001C","M7","BEFORE_GLOBAL_LAUNCH","MARKET","Complete first external Pro sale",{depends_on:["AR-BILL-015","AR-SEC-004","AR-FIN-001","AR-LEG-001","AR-SUPPORT-002"],source_documents:[doc.billing,doc.legal,doc.gtm],acceptance_criteria:["client is external and real", "payment is actually collected", "purchase is not made by Jeason, a close contact used as a test, an internal account, or a project-owned card", "Pro entitlement is actually delivered", "activation succeeds", "at least one real Pro usage occurs", "invoice or proof of payment is available", "refund or cancellation is handled correctly if requested"],required_evidence:["external customer pseudonymous record", "payment received proof", "delivered entitlement record", "activation evidence", "real Pro usage evidence", "invoice or payment proof", "refund or cancellation handling evidence if applicable"],validation_thresholds:{external_pro_sales_required:1, excludes_internal_test_purchase:true, requires_payment_collected:true, requires_entitlement_delivered:true, requires_activation:true, requires_real_pro_usage:true},metrics:["external Pro sales", "revenue collected", "activation success", "refund or cancellation handling"]});
decisionGate("AR-MARKET-EPIC","AR-MARKET-001D","M5","BEFORE_PRO_FIRST_SALE","MARKET","Publish one credible AgentReady value case",{decision_ids:[...decisionIds,validationDecisionId],owner:"CODEX_AND_JEASON",depends_on:["AR-MARKET-001A","AR-ENG-005"],source_documents:[doc.gtm,doc.engine,doc.commercial,doc.validation],acceptance_criteria:["real issue detected on a real contract or repository", "issue is useful and not purely cosmetic", "AgentReady rule identified", "bad state documented", "fix documented", "new AgentReady result after fix documented", "limitations explained", "no claim that AgentReady guarantees safety", "case owner authorized publication", "case anonymized if needed", "no confidential data exposed", "results published honestly"],required_evidence:["case owner authorization", "pseudonymized case record", "rule ID", "before result", "fix summary", "after result", "limitations", "confidentiality review"],validation_thresholds:{credible_public_value_cases_required:1, requires_real_issue:true, prohibits_invented_case:true, requires_owner_authorization:true, prohibits_confidential_data:true, prohibits_safety_guarantee:true},metrics:["credible public value cases", "rule involved", "before and after result", "limitations"]});
decisionGate("AR-SITE-EPIC","AR-MARKET-001","M7","BEFORE_GLOBAL_LAUNCH","MARKET","Evaluate AgentReady commercial validation evidence",{decision_ids:[...decisionIds,validationDecisionId],depends_on:["AR-MARKET-001A","AR-MARKET-001B","AR-MARKET-001C","AR-MARKET-001D"],source_documents:[doc.gtm],acceptance_criteria:["external usage evidence reviewed", "payment signal evidence reviewed", "external sale evidence reviewed", "public value case reviewed", "continue correct pause pivot or reject decision recorded"],required_evidence:["commercial validation decision record"],metrics:["number of external users", "30-day reuse", "explicit payment signals", "external sales", "revenue collected", "credible public value cases", "main false positives", "main false negatives", "abandonment reasons", "feature requests", "general satisfaction"],validation_thresholds:{requires_external_users_gate:true, requires_payment_signals_gate:true, requires_external_sale_gate:true, requires_value_case_gate:true},allowed_outcomes:["CONTINUE","CORRECT","PAUSE","PIVOT","REJECT"]});
["Prepare global launch acquisition plan","Prepare targeted open-source contribution plan","Prepare launch content and case study process"].forEach((title,i)=>codex("AR-SITE-EPIC",`AR-ACQ-${String(i+1).padStart(3,"0")}`,"M7","BEFORE_GLOBAL_LAUNCH","ACQ",title,{depends_on:i===0?["AR-COMP-001"]:[`AR-ACQ-${String(i).padStart(3,"0")}`],source_documents:[doc.gtm,doc.adoption],branch:slug(title),pr_title:`docs(acquisition): ${title.toLowerCase()}`}));
recurring("AR-SITE-EPIC","AR-OPS-001","M8","POST_LAUNCH","OPS","Run monthly post-launch operations review",{source_documents:[doc.launch],weight:3});
external("AR-SITE-EPIC","AR-I18N-001","M8","POST_LAUNCH","I18N","Verify internationalization obligations","international tax and localization requirements",{status:"POST_LAUNCH",source_documents:[doc.launch]});

epic("AR-TEAM-EPIC","M8","POST_REVENUE","PRO","Team and Agency post-revenue expansion",["AR-LAUNCH-001","AR-MARKET-001"]);
["Add Team organizations and members","Add hosted CI history and governance","Add Agency client workspaces and branding"].forEach((title,i)=>codex("AR-TEAM-EPIC",`AR-TEAM-${String(i+1).padStart(3,"0")}`,"M8","POST_REVENUE","PRO",title,{status:"POST_REVENUE",depends_on:["AR-LAUNCH-001","AR-MARKET-001"],source_documents:[doc.entitlements],branch:slug(title),pr_title:`feat(post-revenue): ${title.toLowerCase()}`,allowed_paths:["docs/agentready/**","server/**","api/**","*.html"],forbidden_paths:["agentready-core/**","package.json","LICENSE"],manual_actions:["Owner approves post-revenue expansion"]}));

const unique = (values) => [...new Set(values.filter(Boolean))];
const tasksById = () => new Map(tasks.map((item) => [item.id, item]));
const batchIds = new Set();

function batchStatus(items, override) {
  if (override) return override;
  if (items.some((item) => item.status === "IN_REVIEW")) return "IN_REVIEW";
  if (items.every((item) => item.status === "DONE")) return "DONE";
  if (items.some((item) => item.status === "BLOCKED")) return "BLOCKED";
  if (items.every((item) => item.status === "POST_REVENUE")) return "POST_REVENUE";
  if (items.every((item) => item.status === "POST_LAUNCH")) return "POST_LAUNCH";
  return "PLANNED";
}

function createExecutionBatch(input) {
  const map = tasksById();
  const items = input.work_item_ids.map((id) => {
    const item = map.get(id);
    if (!item) throw new Error(`Unknown work item for batch ${input.id}: ${id}`);
    return item;
  });
  if (batchIds.has(input.id)) throw new Error(`Duplicate batch id: ${input.id}`);
  batchIds.add(input.id);
  for (const item of items) item.execution_batch_id = input.id;
  const first = items[0];
  const status = batchStatus(items, input.status);
  const sourceDocs = unique(items.flatMap((item) => item.source_documents || []));
  const allowedPaths = unique(items.flatMap((item) => item.allowed_paths || []));
  const forbiddenPaths = unique(items.flatMap((item) => item.forbidden_paths || []));
  const commands = unique(items.flatMap((item) => item.required_commands || []));
  const multipleWorkstreams = new Set(items.map((item) => item.workstream)).size > 1;
  const batch = {
    id: input.id,
    title: input.title,
    objective: input.objective ?? `${input.title}.`,
    milestone: input.milestone ?? first.milestone,
    delivery_horizon: input.delivery_horizon ?? first.delivery_horizon,
    status,
    spec_status: input.spec_status ?? (status === "DONE" || status === "IN_REVIEW" ? "EXECUTION_READY" : "SKELETON"),
    owner: input.owner ?? "CODEX",
    work_item_ids: input.work_item_ids,
    depends_on_batches: input.depends_on_batches ?? [],
    depends_on_tasks: input.depends_on_tasks ?? [],
    branch: input.branch ?? first.branch ?? slug(input.title),
    pr_title: input.pr_title ?? first.pr_title ?? `${first.workstream.toLowerCase()}(agentready): ${input.title.toLowerCase()}`,
    ...(input.pr_number ? { pr_number: input.pr_number } : {}),
    allowed_paths: input.allowed_paths ?? allowedPaths,
    forbidden_paths: input.forbidden_paths ?? forbiddenPaths,
    deliverables: input.deliverables ?? items.map((item) => item.title),
    acceptance_criteria: input.acceptance_criteria ?? unique(items.flatMap((item) => item.acceptance_criteria || [])),
    independent_test_plan: input.independent_test_plan ?? unique(items.flatMap((item) => item.independent_test_plan || [])),
    required_commands: input.required_commands ?? (commands.length ? commands : ["node scripts/validate-agentready-execution-system.mjs"]),
    required_evidence: input.required_evidence ?? unique(items.flatMap((item) => item.required_evidence || [])),
    rollback_boundary: input.rollback_boundary ?? `Revert ${input.id} without reverting unrelated batches.`,
    scope_justification: input.scope_justification ?? (multipleWorkstreams ? "Batch groups compatible workstreams with one shared review and rollback boundary." : "Batch groups compatible work items with one shared review and rollback boundary."),
    manual_actions: input.manual_actions ?? unique(items.flatMap((item) => item.manual_actions || [])),
    authorized_actions: input.authorized_actions ?? unique(items.flatMap((item) => item.authorized_actions || [])),
    forbidden_actions: input.forbidden_actions ?? unique(items.flatMap((item) => item.forbidden_actions || [])),
    codex_preflight_steps: input.codex_preflight_steps ?? unique(items.flatMap((item) => item.codex_preflight_steps || [])),
    owner_checkpoint_steps: input.owner_checkpoint_steps ?? unique(items.flatMap((item) => item.owner_checkpoint_steps || [])),
    post_confirmation_steps: input.post_confirmation_steps ?? unique(items.flatMap((item) => item.post_confirmation_steps || [])),
    final_response_format: input.final_response_format ?? [],
    external_verifications: input.external_verifications ?? unique(items.filter((item) => item.external_verification?.required).map((item) => item.external_verification.topic)),
    evidence: input.evidence ?? [],
    notes: input.notes ?? "",
    source_documents: sourceDocs,
    ...(input.base_branch ? { base_branch: input.base_branch } : {}),
    ...(input.pr_base_branch ? { pr_base_branch: input.pr_base_branch } : {}),
    ...(input.stacked_execution_authorized !== undefined ? { stacked_execution_authorized: input.stacked_execution_authorized } : {}),
    ...(input.stacked_execution_can_continue !== undefined ? { stacked_execution_can_continue: input.stacked_execution_can_continue } : {}),
    ...(input.stacked_on_batch ? { stacked_on_batch: input.stacked_on_batch } : {}),
    ...(input.stacked_base_pr ? { stacked_base_pr: input.stacked_base_pr } : {}),
    ...(input.stacked_base_head_sha ? { stacked_base_head_sha: input.stacked_base_head_sha } : {}),
    ...(input.stacked_child_pr ? { stacked_child_pr: input.stacked_child_pr } : {}),
    ...(input.stacked_child_head_sha ? { stacked_child_head_sha: input.stacked_child_head_sha } : {})
  };
  executionBatches.push(batch);
  return batch;
}

function createBatch(id, title, work_item_ids, options = {}) {
  return createExecutionBatch({ id, title, work_item_ids, ...options });
}

createBatch("ARB-GOV-001", "Rebaseline Community and Pro strategy", ["AR-GOV-001"], {
  status: "DONE",
  owner: "CODEX",
  pr_number: 113,
  branch: "docs-agentready-community-pro-rebaseline",
  pr_title: "docs(product): rebaseline AgentReady Community and Pro strategy",
  required_evidence: ["PR #113 merge SHA"],
  evidence: [{ type: "merge", pr: 113, merge_sha: "2db4ada5ce9ae59975bd47d3c26736444c01b983" }]
});
createBatch("ARB-GOV-002", "Resolve and record Community publication blockers", ["AR-GOV-002"], {
  status: "DONE",
  owner: "CODEX",
  pr_number: 114,
  branch: "release-agentready-community-publication-blockers",
  pr_title: "release(agentready): resolve Community publication blockers",
  required_evidence: ["PR #114 merge SHA"],
  evidence: [{ type: "merge", pr: 114, merge_sha: "92c728f5f8fe2756e697bcc75bce90786f2ed147" }]
});
createBatch("ARB-GOV-003", "Add canonical AgentReady execution system", ["AR-GOV-003"], {
  status: "DONE",
  owner: "CODEX_AND_JEASON",
  pr_number: 115,
  branch: "docs-agentready-canonical-execution-system",
  pr_title: "docs(project): add canonical AgentReady execution system",
  required_commands: [
    "node scripts/rebuild-agentready-ledger-data.mjs",
    "node scripts/generate-agentready-ledger-views.mjs --write",
    "node scripts/generate-agentready-status.mjs --write",
    "node scripts/generate-agentready-next-action.mjs --write",
    "node scripts/generate-agentready-next-prompt.mjs --write",
    "node scripts/validate-agentready-strategy-docs.mjs",
    "node scripts/validate-agentready-execution-system.mjs"
  ],
  required_evidence: ["draft PR #115", "workflow success", "human ledger review before merge"],
  evidence: [{ type: "merge", pr: 115, merge_sha: "f0cf872195b2493117badda6f9e174aed41fde4f" }],
  manual_actions: ["HUMAN LEDGER REVIEW REQUIRED BEFORE MERGE"]
});

const batchDefinitions = [
  ["ARB-COM-001", "Publish Community CLI and immutable release", ["AR-COM-006"], { status: "DONE", owner: "CODEX_AND_JEASON", spec_status: "EXECUTION_READY", pr_number: 124, evidence: [{ type: "publication_release_execution", pr: 124, merge_sha: "1338f0568925829cfc6455ab8def57f650591574", npm_publication: "SUCCESS", package: "@timeproofs/agentready", version: "0.1.0-alpha.0", alpha_dist_tag: "0.1.0-alpha.0", unexpected_latest_dist_tag: "0.1.0-alpha.0", latest_removal_result: "E400", owner_decision: "ACCEPT_TEMPORARILY", latest_temporarily_accepted_until: "first stable release", future_prereleases_dist_tag: "alpha", git_tag_created: true, git_tag: "v0.1.0-alpha.0", git_tag_target: "150da23932c1fb9433cb3d546904f03c18c909e9", remote_tag_verified: true, github_release_created: true, github_release_url: "https://github.com/BACOUL/timeproofs/releases/tag/v0.1.0-alpha.0", github_release_prerelease: true, github_release_draft: false, github_release_latest: false, release_notes_match_validated_file: true, new_npm_operation_authorized: false, new_npm_operation_executed: false }], notes: "PR #124 merged the release evidence. npm publication succeeded with a documented latest exception accepted temporarily by JEASON. The immutable Git tag and GitHub prerelease exist and point to the approved source commit; no new npm operation is authorized.", scope_justification: "Atomic release boundary after owner, legal and private 2FA checkpoint approval." }],
  ["ARB-COM-002", "Publish public GitHub Action distribution", ["AR-COM-007", "AR-COM-009"], { status: "DONE", spec_status: "EXECUTION_READY", owner: "CODEX_AND_JEASON", branch: "feat-distribution-agentready-marketplace-action", pr_title: "feat(distribution): publish AgentReady GitHub Marketplace action", pr_number: 129, allowed_paths: ["action.yml", ".github/actions/agentready/action.yml", ".github/workflows/**", "cli/tests/**", "scripts/**", "docs/agentready/**", "README.md", "AGENTREADY_PROJECT_CONTEXT.md", "CHANGELOG.md", "index.html", "pricing.html", "agentready-ci.html"], forbidden_paths: ["agentready-core/**", "bin/**", "package.json", "packaging/agentready-community/**", "LICENSE", "NOTICE", "server/**", "api/**"], deliverables: ["canonical root Marketplace Action", "migrated workflows and tests", "tag-pinned and SHA-pinned public workflows", "Marketplace prerelease and listing", "supply-chain and rollback documentation", "current public-site alignment", "immutable evidence record"], acceptance_criteria: ["all AR-COM-007 and AR-COM-009 criteria pass", "all automated validations pass before the owner checkpoint", "owner publishes only the approved immutable Action commit", "post-publication public Action run passes", "release listing and site evidence are recorded, with the documented default-branch sequencing exception", "existing npm package release and tag remain unchanged"], independent_test_plan: ["preflight existing Action behavior", "validate root migration and metadata", "run complete regression suite", "validate active site copy", "perform owner Marketplace checkpoint", "verify public tag listing and full-SHA references", "rerun deterministic governance generation"], required_commands: ["node agentready-core/tests/run-agentready-core-tests.mjs", "node cli/tests/run-agentready-cli-tests.mjs", "node cli/tests/run-agentready-action-smoke-test.mjs", "node cli/tests/run-agentready-package-smoke-test.mjs", "node cli/tests/run-agentready-community-release-workflow-test.mjs", "node scripts/validate-agentready-action-marketplace-readiness.mjs", "node scripts/rebuild-agentready-ledger-data.mjs", "node scripts/generate-agentready-ledger-views.mjs --write", "node scripts/generate-agentready-status.mjs --write", "node scripts/generate-agentready-next-action.mjs --write", "node scripts/generate-agentready-next-prompt.mjs --write", "node scripts/validate-agentready-strategy-docs.mjs", "node scripts/validate-agentready-execution-system.mjs", "git diff --check"], required_evidence: ["root metadata audit", "reference migration inventory", "test and workflow evidence", "approved implementation SHA", "immutable Action tag target", "GitHub prerelease URL", "Marketplace URL", "public tag workflow run", "full-SHA example", "permissions and supply-chain review", "site alignment report", "rollback procedure"], rollback_boundary: "Before tagging, revert or close the PR. After Marketplace publication, preserve the immutable tag and audit trail, remove the affected release from Marketplace if necessary, publish a notice, and issue a corrected immutable Action tag.", manual_actions: ["JEASON approves the exact implementation commit", "JEASON accepts any required Marketplace agreement and publishes the tagged prerelease privately with 2FA", "JEASON returns public URLs only", "JEASON reviews final evidence before merge"], authorized_actions: ["prepare and validate the root Action", "migrate internal Action references", "update approved docs tests workflows and public pages", "after owner confirmation verify and record the public Action release and Marketplace listing"], forbidden_actions: ["no npm operation", "no movement or reuse of v0.1.0-alpha.0", "no moving Action major tag", "no engine CLI package billing backend or runtime changes", "no credentials or 2FA material", "no merge before final owner review"], codex_preflight_steps: ["verify existing release immutability", "run existing Action tests", "inventory nested references and stale active-site wording", "confirm root action.yml is absent", "open a draft PR"], owner_checkpoint_steps: ["approve exact implementation SHA", "accept Marketplace agreement if required", "tag exact commit as agentready-action-v0.1.0-alpha.0", "publish Marketplace prerelease with private 2FA", "provide public Release and Marketplace URLs only"], post_confirmation_steps: ["verify tag target release and listing", "run public tag reference", "record full SHA and final metadata", "replace placeholders", "record all evidence", "request final human review"], external_verifications: ["current GitHub Marketplace root metadata and publication requirements", "public Marketplace listing availability"], evidence: [{ type: "github_action_marketplace_publication", pr: 129, merge_sha: "3070e7827e8118ca62ad6cdb7c37deff9ef24b47", approved_implementation_sha: "d6634d0fbbe1fced510fc49d8871d52a3dc7f348", git_tag: "agentready-action-v0.1.0-alpha.0", git_tag_target: "d6634d0fbbe1fced510fc49d8871d52a3dc7f348", remote_tag_verified: true, github_release_url: "https://github.com/BACOUL/timeproofs/releases/tag/agentready-action-v0.1.0-alpha.0", github_release_prerelease: true, github_release_draft: false, marketplace_url: "https://github.com/marketplace/actions/agentready-ci-gate-by-timeproofs", marketplace_published: true, marketplace_categories: ["Continuous integration", "Security"], public_tag_workflow_run: "https://github.com/BACOUL/timeproofs/actions/runs/29207232357", openapi_public_tag_smoke: "PASS", mcp_public_tag_smoke: "PASS", full_sha_reference: "BACOUL/timeproofs@d6634d0fbbe1fced510fc49d8871d52a3dc7f348", owner_agreement_accepted_privately: true, owner_2fa_completed_privately: true, new_npm_operation_executed: false }], notes: "PR #129 merged the validated root Action. Marketplace publication succeeded after the documented default-branch sequencing exception. The immutable tag remains fixed, public OpenAPI and MCP tag smoke tests passed, and no npm operation occurred.", scope_justification: "Root Action distribution, Marketplace publication, evidence, and the approved site alignment form one coherent public-release boundary." }],
  ["ARB-SITE-PREMIUM-001", "Build global site shell navigation and footer", ["AR-SITE-PREMIUM-001"], {
    status: "IN_REVIEW",
    spec_status: "EXECUTION_READY",
    owner: "CODEX_AND_JEASON",
    pr_number: 132,
    base_branch: "timeproofs",
    depends_on_batches: ["ARB-COM-002"],
    stacked_execution_can_continue: true,
    evidence: [
      { type: "stack_base", pr: 132, head_sha: "8ea9b08e9c772f151c3966288f7e82f8efe0ff10", approved_for_stacked_execution: true, merge_authorized: false },
      { type: "owner_stacked_state_acceptance", date: "2026-07-13", approver: "JEASON", accepted_state: "PR #132 remains open draft and serves as the stacked site foundation.", pr: 132, head_sha: "8ea9b08e9c772f151c3966288f7e82f8efe0ff10", merge_authorized: false, batch_done: false, stacked_execution_can_continue: true }
    ],
    notes: "PR #132 remains open and draft as the stack foundation. JEASON accepted this state for stacked execution continuity only; the batch is not DONE and no merge is authorized."
  }],
  ["ARB-SITE-GLOBAL-002", "Publish global product scanners CI and planned pricing foundation", ["AR-SITE-GLOBAL-002"], {
    status: "IN_REVIEW",
    spec_status: "EXECUTION_READY",
    owner: "CODEX_AND_JEASON",
    pr_number: 134,
    base_branch: "site-agentready-premium-foundation",
    stacked_execution_authorized: true,
    stacked_execution_can_continue: true,
    stacked_on_batch: "ARB-SITE-PREMIUM-001",
    stacked_base_pr: 132,
    stacked_base_head_sha: "8ea9b08e9c772f151c3966288f7e82f8efe0ff10",
    stacked_child_pr: 134,
    stacked_child_head_sha: "5c211bd4b4795c379f85da5548f2c493e546cbbb",
    depends_on_batches: ["ARB-SITE-PREMIUM-001"],
    evidence: [
      { type: "draft_pr_implementation_review", pr: 134, head_sha: "5c211bd4b4795c379f85da5548f2c493e546cbbb", status: "IN_REVIEW", implemented: true, merge_authorized: false },
      { type: "owner_production_alignment_acceptance", date: "2026-07-13", approver: "JEASON", decision: "ACCEPT_TEMPORARY_PRODUCTION_ALIGNMENT_EXCEPTION", pr_132_state: "open draft", pr_134_state: "open draft", pr_134_head_sha: "5c211bd4b4795c379f85da5548f2c493e546cbbb", inspected_production_routes_match_pr_134_foundation: true, obsolete_review_offer_detected: false, obsolete_fix_pack_detected: false, temporary_exception_only: true, full_global_site_complete: false, strict_sequence_preserved: ["ARB-SITE-GLOBAL-003", "ARB-SITE-GLOBAL-004", "ARB-SITE-GLOBAL-005", "ARB-SITE-GLOBAL-006", "ARB-SITE-GLOBAL-007"], merge_authorized: false, batch_done: false, stacked_execution_can_continue: true }
    ],
    notes: "PR #134 is implemented and in review on the stacked child branch. JEASON accepted the production reconciliation as a temporary alignment exception only; the batch is not DONE and the full premium/global-standard site is not complete."
  }],
  ["ARB-SITE-GLOBAL-003", "Publish AgentReady standard rules and governance foundation", ["AR-SITE-GLOBAL-003"], {
    status: "READY",
    spec_status: "EXECUTION_READY",
    owner: "CODEX_AND_JEASON",
    objective: "Publish the public AgentReady standard, rule-code, severity, scoring, versioning, governance, namespace and reference-implementation foundation without changing engine, CLI, package, Action or runtime behavior.",
    base_branch: "site-agentready-global-product",
    pr_base_branch: "site-agentready-global-product",
    branch: "site-agentready-global-standard",
    pr_title: "site(standard): publish AgentReady standard foundation",
    deliverables: standardFoundationDeliverables,
    acceptance_criteria: standardFoundationAcceptance,
    independent_test_plan: standardFoundationTests,
    required_commands: standardFoundationCommands,
    required_evidence: standardFoundationEvidence,
    manual_actions: ["JEASON reviews the AgentReady standard foundation preview and confirms no formal-standards or certification claim was introduced"],
    authorized_actions: ["create real static public standard, rule, JSON, examples, resources and sample-report surfaces", "add factual local diagrams or static assets when they are derived from current authoritative documents", "add or update validators for the standard foundation pages", "update sitemap robots and internal links only for real routes created by this batch"],
    forbidden_actions: standardFoundationForbiddenActions,
    codex_preflight_steps: standardFoundationPreflight,
    external_verifications: ["None"],
    final_response_format: standardFoundationResponseFormat,
    rollback_boundary: "Revert ARB-SITE-GLOBAL-003 without reverting PR #132 shell or PR #134 product foundation.",
    scope_justification: "Weight 5 justified: one reviewable public standard foundation spanning standard overview, rule dictionary, scoring, versioning, governance and reference implementation surfaces with one stacked preview and rollback boundary.",
    stacked_execution_authorized: true,
    stacked_on_batch: "ARB-SITE-GLOBAL-002",
    stacked_base_pr: 134,
    stacked_base_head_sha: "1a71cb469e608d548b42c5884a4165563216733b",
    depends_on_batches: ["ARB-SITE-GLOBAL-002"],
    evidence: [{
      type: "stacked_base_synchronization",
      date: "2026-07-13",
      previous_product_implementation_head: "6a0beff94240c255e40915f14b8a916fa1e13ce7",
      actual_implementation_branch_base_head: "1a71cb469e608d548b42c5884a4165563216733b",
      reason: "The parent branch advanced by one canonical specification-refinement commit that is required before executing ARB-SITE-GLOBAL-003."
    }],
    notes: "Specification refined only. Previous product implementation head 6a0beff94240c255e40915f14b8a916fa1e13ce7 remains historical evidence; actual implementation branch base is 1a71cb469e608d548b42c5884a4165563216733b. Future implementation must create a draft PR targeting site-agentready-global-product and must not merge any site PR during the batch."
  }],
  ["ARB-SITE-GLOBAL-004", "Publish company trust security privacy and legal foundation", ["AR-SITE-GLOBAL-004"], { status: "PLANNED", spec_status: "SKELETON", base_branch: "site-agentready-global-standard", stacked_execution_authorized: true, stacked_on_batch: "ARB-SITE-GLOBAL-003", depends_on_batches: ["ARB-SITE-GLOBAL-003"] }],
  ["ARB-SITE-GLOBAL-005", "Publish developer documentation adoption examples and contribution foundation", ["AR-SITE-GLOBAL-005"], { status: "PLANNED", spec_status: "SKELETON", base_branch: "site-agentready-global-trust", stacked_execution_authorized: true, stacked_on_batch: "ARB-SITE-GLOBAL-004", depends_on_batches: ["ARB-SITE-GLOBAL-004"] }],
  ["ARB-SITE-GLOBAL-006", "Publish SEO GEO AI-first and international foundation", ["AR-SITE-GLOBAL-006"], { status: "PLANNED", spec_status: "SKELETON", base_branch: "site-agentready-global-docs-adoption", stacked_execution_authorized: true, stacked_on_batch: "ARB-SITE-GLOBAL-005", depends_on_batches: ["ARB-SITE-GLOBAL-005"] }],
  ["ARB-SITE-GLOBAL-007", "Validate complete global standard site", ["AR-SITE-GLOBAL-007"], { status: "PLANNED", spec_status: "SKELETON", owner: "CODEX_AND_JEASON", base_branch: "site-agentready-global-discovery", stacked_execution_authorized: true, stacked_on_batch: "ARB-SITE-GLOBAL-006", depends_on_batches: ["ARB-SITE-GLOBAL-006"] }],
  ["ARB-COM-003", "Validate public Community installation", ["AR-COM-008"], { depends_on_batches: ["ARB-SITE-GLOBAL-007"] }],
  ["ARB-ONB-001", "Ship Community onboarding commands and tutorial", ["AR-ONB-001", "AR-ONB-002", "AR-ONB-003", "AR-ONB-004"], { depends_on_batches: ["ARB-COM-003"] }],
  ["ARB-MARKET-PILOT-001", "Prepare external Community pilot kit", ["AR-MARKET-PILOT-001"], { deliverables: ["tester guide", "pilot evidence registry", "false-positive and false-negative register", "abandonment and feature-request register", "before fix after case template", "consent and confidentiality checklist", "outreach candidate worksheet", "voluntary feedback procedure"], acceptance_criteria: ["all five-user pilot thresholds map to evidence fields", "templates distinguish OpenAPI and MCP use", "reuse issue fix false-positive false-negative abandonment feature-request and payment-signal evidence can be recorded", "consent redaction and confidentiality controls are explicit", "no automatic outreach invented evidence or silent telemetry is introduced"], required_evidence: ["pilot kit review", "threshold-to-evidence mapping", "consent and privacy review"], scope_justification: "One coherent documentation and evidence-system boundary for the external Community pilot." }],
  ["ARB-ENG-001", "Add benchmark corpus and annotation harness", ["AR-ENG-001"]],
  ["ARB-ENG-002", "Add benchmark metric calculation", ["AR-ENG-002"]],
  ["ARB-ENG-003", "Correct known AR rule semantics", ["AR-ENG-003"], { scope_justification: "Weight 5 compatible rule-semantics correction across the documented AR001 AR003 AR008 and AR010 gaps." }],
  ["ARB-ENG-004", "Add performance benchmark and reproducible report", ["AR-ENG-004", "AR-ENG-005"]],
  ["ARB-ENG-005", "Prepare voluntary false-positive reporting command", ["AR-ENG-006"]],
  ["ARB-PRO-001", "Add versioned policy configuration", ["AR-PRO-001"]],
  ["ARB-PRO-002", "Add baseline and new-risk comparison", ["AR-PRO-002", "AR-PRO-003"]],
  ["ARB-PRO-003", "Add SARIF and pull request annotations", ["AR-PRO-004", "AR-PRO-005"]],
  ["ARB-PRO-004", "Add local structured expiring exceptions", ["AR-PRO-006", "AR-PRO-007"]],
  ["ARB-PRO-005", "Add Pro MVP integration tests", ["AR-PRO-008"]],
  ["ARB-LIC-001", "Implement entitlement format", ["AR-LIC-001", "AR-LIC-002", "AR-LIC-003"]],
  ["ARB-LIC-002", "Implement local license verification", ["AR-LIC-004"]],
  ["ARB-LIC-003", "Implement repository registration", ["AR-LIC-005"]],
  ["ARB-LIC-004", "Implement license lifecycle", ["AR-LIC-006", "AR-LIC-007"]],
  ["ARB-LIC-005", "Add license security and privacy QA", ["AR-LIC-008"]],
  ["ARB-BILL-001", "Add billing foundation", ["AR-BILL-002", "AR-BILL-003", "AR-BILL-004"]],
  ["ARB-BILL-002", "Add billing events and provisioning", ["AR-BILL-005", "AR-BILL-006"]],
  ["ARB-BILL-003", "Add billing lifecycle handling", ["AR-BILL-008", "AR-BILL-009", "AR-BILL-010"]],
  ["ARB-BILL-004", "Add billing customer operations", ["AR-BILL-007", "AR-BILL-011", "AR-BILL-013", "AR-BILL-014"]],
  ["ARB-BILL-005", "Add billing communications", ["AR-BILL-012"]],
  ["ARB-BILL-006", "Run end-to-end billing QA", ["AR-BILL-015"]],
  ["ARB-SUPPORT-001", "Publish support surfaces", ["AR-SUPPORT-001", "AR-SUPPORT-002"]],
  ["ARB-SITE-001", "Publish positioning pages", ["AR-SITE-001", "AR-SITE-002", "AR-SITE-003", "AR-SITE-004", "AR-SITE-005"]],
  ["ARB-SITE-002", "Publish protocol and CI pages", ["AR-SITE-006", "AR-SITE-007", "AR-SITE-008", "AR-SITE-009", "AR-SITE-016"]],
  ["ARB-SITE-003", "Publish proof and methodology pages", ["AR-SITE-010", "AR-SITE-011", "AR-SITE-012", "AR-SITE-013", "AR-SITE-014", "AR-SITE-015"]],
  ["ARB-SITE-004", "Publish trust and support pages", ["AR-SITE-017", "AR-SITE-018", "AR-SITE-019", "AR-SITE-022", "AR-SITE-023", "AR-SITE-024"]],
  ["ARB-SITE-005", "Publish legal pages after legal review", ["AR-SITE-020", "AR-SITE-021"]],
  ["ARB-SITE-006", "Publish commercial account journey pages", ["AR-SITE-025"]],
  ["ARB-SEO-001", "Add SEO foundation", ["AR-SEO-001"]],
  ["ARB-SEO-002", "Add SEO metadata and structured data", ["AR-SEO-002"]],
  ["ARB-SEO-003", "Add SEO quality and monitoring", ["AR-SEO-003", "AR-SEO-012"]],
  ["ARB-SEO-004", "Add SEO content architecture", ["AR-SEO-005", "AR-SEO-006", "AR-SEO-007", "AR-SEO-008"]],
  ["ARB-SEO-005", "Add SEO rule example and comparison pages", ["AR-SEO-009", "AR-SEO-010", "AR-SEO-011"]],
  ["ARB-GEO-001", "Add GEO canonical entity content", ["AR-GEO-001", "AR-GEO-002", "AR-GEO-006"]],
  ["ARB-GEO-002", "Add GEO extractibility content", ["AR-GEO-003", "AR-GEO-004", "AR-GEO-005"]],
  ["ARB-GEO-003", "Add GEO validation", ["AR-GEO-007"]],
  ["ARB-GEO-004", "Add post-launch GEO monitoring experiments", ["AR-GEO-008", "AR-GEO-009"], { status: "POST_LAUNCH" }],
  ["ARB-COMP-001", "Create competitive matrix and positioning", ["AR-COMP-002", "AR-COMP-003"]],
  ["ARB-COMP-002", "Publish competitive category pages", ["AR-COMP-004", "AR-COMP-005"]],
  ["ARB-COMP-003", "Create competitive update process", ["AR-COMP-006"]],
  ["ARB-DOC-001", "Publish documentation hub", ["AR-DOC-001"]],
  ["ARB-DOC-002", "Publish Community developer documentation", ["AR-DOC-002", "AR-DOC-003", "AR-DOC-004", "AR-DOC-005"]],
  ["ARB-DOC-003", "Publish Pro developer documentation", ["AR-DOC-006", "AR-DOC-007", "AR-DOC-008"]],
  ["ARB-DOC-004", "Publish support and compatibility documentation", ["AR-DOC-009", "AR-DOC-010", "AR-DOC-011"]],
  ["ARB-DOC-005", "Publish OpenAPI and MCP examples documentation", ["AR-DOC-012", "AR-DOC-013"]],
  ["ARB-INT-001", "Publish framework integration guides", ["AR-INT-001", "AR-INT-002", "AR-INT-003", "AR-INT-004", "AR-INT-005"], { status: "POST_LAUNCH" }],
  ["ARB-CAT-001", "Publish AR dictionary model", ["AR-CAT-001"], { status: "POST_LAUNCH" }],
  ["ARB-CAT-002", "Publish first AR rule pages", ["AR-CAT-002", "AR-CAT-003"], { status: "POST_LAUNCH" }],
  ["ARB-CAT-003", "Publish remaining AR rule pages", ["AR-CAT-004", "AR-CAT-005", "AR-CAT-006"], { status: "POST_LAUNCH" }],
  ["ARB-CAT-004", "Publish bad fixed library", ["AR-CAT-007"], { status: "POST_LAUNCH" }],
  ["ARB-CAT-005", "Publish badge model", ["AR-CAT-008"], { status: "POST_LAUNCH" }],
  ["ARB-CAT-006", "Publish namespace and benchmark governance", ["AR-CAT-009", "AR-CAT-010"], { status: "POST_LAUNCH" }],
  ["ARB-CAT-007", "Prepare observatory and state report", ["AR-CAT-011", "AR-CAT-012"], { status: "POST_LAUNCH" }],
  ["ARB-INFRA-001", "Define infrastructure architecture", ["AR-INFRA-001", "AR-INFRA-002"]],
  ["ARB-INFRA-002", "Define data and migrations", ["AR-INFRA-003"]],
  ["ARB-INFRA-003", "Define secrets and administration", ["AR-INFRA-004"]],
  ["ARB-INFRA-004", "Define backup and recovery", ["AR-INFRA-005"]],
  ["ARB-INFRA-005", "Define observability and costs", ["AR-INFRA-006"]],
  ["ARB-SEC-001", "Record security review remediation tasks", ["AR-SEC-002"]],
  ["ARB-SEC-002", "Fix blocking security review findings", ["AR-SEC-003"], { status: "BLOCKED" }],
  ["ARB-REL-001", "Add reliability and incident runbooks", ["AR-REL-001", "AR-REL-002", "AR-REL-003"]],
  ["ARB-LAUNCH-001", "Run launch audit", ["AR-LAUNCH-001"]],
  ["ARB-ACQ-001", "Prepare global acquisition system", ["AR-ACQ-001", "AR-ACQ-002", "AR-ACQ-003"]],
  ["ARB-TEAM-001", "Plan post-revenue Team and Agency expansion", ["AR-TEAM-001", "AR-TEAM-002", "AR-TEAM-003"], { status: "POST_REVENUE" }]
];
for (const [id, title, work_item_ids, options = {}] of batchDefinitions) createBatch(id, title, work_item_ids, options);

function createFallbackBatches() {
  const remaining = tasks.filter((item) => item.task_type === "CODEX_WORK_ITEM" && !item.execution_batch_id);
  const grouped = new Map();
  for (const item of remaining) {
    const key = `${item.parent_id}|${item.milestone}|${item.delivery_horizon}|${item.workstream}|${item.status}`;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(item);
  }
  let index = 1;
  for (const items of grouped.values()) {
    for (let i = 0; i < items.length; i += 5) {
      const chunk = items.slice(i, i + 5);
      const first = chunk[0];
      createBatch(`ARB-AUTO-${String(index++).padStart(3, "0")}`, `${first.workstream} execution batch`, chunk.map((item) => item.id), {
        status: batchStatus(chunk),
        branch: slug(`${first.workstream} ${chunk[0].title}`),
        pr_title: `${first.workstream.toLowerCase()}(agentready): complete ${first.workstream.toLowerCase()} batch`,
        scope_justification: "Fallback batch groups compatible remaining work items to avoid orphaned active tasks."
      });
    }
  }
}
createFallbackBatches();

function finalizeBatchDependencies() {
  const map = tasksById();
  const taskToBatch = new Map();
  for (const batch of executionBatches) for (const id of batch.work_item_ids) taskToBatch.set(id, batch.id);
  for (const batch of executionBatches) {
    const own = new Set(batch.work_item_ids);
    const taskDeps = [];
    const batchDeps = [];
    for (const id of batch.work_item_ids) {
      const item = map.get(id);
      for (const dep of item.depends_on || []) {
        if (own.has(dep)) continue;
        const depBatch = taskToBatch.get(dep);
        if (depBatch && depBatch !== batch.id) batchDeps.push(depBatch);
        else taskDeps.push(dep);
      }
    }
    batch.depends_on_batches = unique([...(batch.depends_on_batches || []), ...batchDeps]);
    batch.depends_on_tasks = unique([...(batch.depends_on_tasks || []), ...taskDeps]);
  }
}
finalizeBatchDependencies();

const surfaces = [
  ["/","Homepage","AR-SITE-001"],["/product","Product overview","AR-SITE-002"],["/community","Community","AR-SITE-003"],["/pro","Pro","AR-SITE-004"],["/pricing","Pricing","AR-SITE-005"],["/openapi","OpenAPI","AR-SITE-006"],["/mcp","MCP","AR-SITE-007"],["/agentready-ci","CI Gate","AR-SITE-008"],["/how-it-works","How it works","AR-SITE-009"],["/methodology","Methodology","AR-SITE-010"],["/limitations","Limitations","AR-SITE-011"],["/benchmark","Benchmark","AR-SITE-012"],["/examples/bad-fixed","Bad/fixed examples","AR-SITE-013"],["/rules","Rule overview","AR-SITE-014"],["/changelog","Changelog","AR-SITE-015"],["/compatibility","Compatibility","AR-SITE-016"],["/trust","Trust Center","AR-SITE-017"],["/security","Security","AR-SITE-018"],["/privacy","Privacy","AR-SITE-019"],["/terms","Terms","AR-SITE-020"],["/refund","Refund","AR-SITE-021"],["/responsible-disclosure","Responsible disclosure","AR-SITE-022"],["/status","Status","AR-SITE-023"],["/support","Support","AR-SITE-024"],["/account","Account","AR-SITE-025"],["/activation","Activation","AR-SITE-025"],["/billing","Billing","AR-SITE-025"],["/checkout-success","Checkout success","AR-SITE-025"],["/checkout-cancelled","Checkout cancelled","AR-SITE-025"],["/customer-portal","Customer Portal instructions","AR-SITE-025"],["/cancellation","Cancellation","AR-SITE-025"],["/recovery","Recovery","AR-SITE-025"],["/docs/installation","Installation docs","AR-DOC-002"],["/docs/cli","CLI reference","AR-DOC-003"],["/docs/github-action","GitHub Action docs","AR-DOC-004"],["/docs/configuration","Configuration docs","AR-DOC-005"],["/docs/policies","Policy docs","AR-DOC-005"],["/docs/baseline","Baseline docs","AR-DOC-006"],["/docs/sarif","SARIF docs","AR-DOC-007"],["/docs/exceptions","Exception docs","AR-DOC-008"],["/docs/troubleshooting","Troubleshooting","AR-DOC-009"],["/docs/migration","Migration docs","AR-DOC-011"],["/docs/examples","Examples docs","AR-DOC-012"],["/docs/integrations","Integrations index","AR-INT-001"]
];
const ruleNames = ["unbounded-write-action","missing-confirmation-boundary","destructive-operation-ambiguous","bulk-action-without-limit","sensitive-data-exposure","missing-dry-run-or-preview","overbroad-tool-scope","missing-idempotency-or-rollback","unclear-agent-instructions","missing-rate-or-scope-limit"];
for (let i = 1; i <= 10; i++) surfaces.push([`/rules/ar${String(i).padStart(3,"0")}-${ruleNames[i-1]}`, `AR${String(i).padStart(3,"0")} rule page`, `AR-CAT-${String(Math.ceil(i/2)+1).padStart(3,"0")}`]);
for (const row of [["/compare/api-security-scanners","API security scanner comparison","AR-COMP-005"],["/compare/runtime-guardrails","Runtime guardrail comparison","AR-COMP-005"],["/compare/mcp-security","MCP security comparison","AR-COMP-005"],["/integrations/mcp-typescript-sdk","MCP TypeScript SDK guide","AR-INT-001"],["/integrations/mcp-python-sdk","MCP Python SDK guide","AR-INT-002"],["/integrations/fastmcp","FastMCP guide","AR-INT-003"],["/integrations/langchain-mcp","LangChain MCP guide","AR-INT-004"],["/integrations/openapi-generator","OpenAPI Generator guide","AR-INT-005"],["/bad-fixed/refund-openapi","Refund OpenAPI bad fixed","AR-CAT-007"],["/bad-fixed/email-mcp","Email MCP bad fixed","AR-CAT-007"],["/bad-fixed/files-mcp","Files MCP bad fixed","AR-CAT-007"],["/badges","AgentReady badges","AR-CAT-008"]]) surfaces.push(row);
const site_surfaces = surfaces.map(([planned_route, topic, task_id]) => ({ planned_route, topic, audience: planned_route.startsWith('/docs') ? 'Developers' : 'Developers and B2B buyers', search_intent: topic, ai_question_entity: `AgentReady ${topic}`, cta: planned_route.includes('pricing') ? 'Choose a plan' : 'Read more', objective: `Publish ${topic} with precise AgentReady positioning.`, mandatory_content: ['definition','scope','limitations','evidence','CTA'], primary_evidence_source: doc.master, structured_data: planned_route.startsWith('/docs') || planned_route.includes('/rules/') ? 'TechArticle' : 'WebPage', internal_links: ['/agentready-ci','/docs/installation','/rules'], seo: 'unique title meta description canonical and internal links', geo: 'extractable answer canonical entity naming and no-JS content', status: 'PLANNED', dependencies: [task_id], qa: ['desktop','mobile','links','no horizontal overflow'], publication_criteria: ['content complete','metadata complete','QA passed'], competitor_category: planned_route.startsWith('/compare') ? 'Comparison' : 'AgentReady', task_id }));

const generatedSet = new Set(generatedFiles.filter((file) => file.endsWith('.md')));
function walk(dir) { const out = []; if (!existsSync(dir)) return out; for (const entry of readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) { const file = path.join(dir, entry.name).replaceAll(path.sep, '/'); if (entry.isDirectory()) out.push(...walk(file)); else if (entry.isFile() && entry.name.endsWith('.md')) out.push(file); } return out; }
function read(file) { try { return readFileSync(file, 'utf8'); } catch { return ''; } }
function taskForDoc(file) { const f = file.toLowerCase(); if (f.includes('global_standard_site') || f.includes('site_global_product')) return ['AR-SITE-GLOBAL-002']; if (f.includes('site_premium_foundation') || f.includes('premium_site')) return ['AR-SITE-PREMIUM-001']; if (f.includes('validation_gates') || f.includes('external_pilot')) return ['AR-MARKET-PILOT-001','AR-MARKET-PILOT-002']; if (f.includes('billing') || f.includes('purchase')) return ['AR-BILL-EPIC','AR-BILL-002']; if (f.includes('pricing') || f.includes('entitlement')) return ['AR-LIC-001','AR-SITE-005']; if (f.includes('license')) return ['AR-LIC-EPIC','AR-COM-003']; if (f.includes('seo') || f.includes('geo')) return ['AR-SEO-EPIC','AR-GEO-EPIC']; if (f.includes('competitive')) return ['AR-COMP-EPIC','AR-COMP-001']; if (f.includes('rule') || f.includes('risk') || f.includes('score')) return ['AR-CAT-EPIC','AR-ENG-003']; if (f.includes('github_action') || f.includes('github-action')) return ['AR-COM-007','AR-DOC-004']; if (f.includes('json')) return ['AR-DOC-001']; if (f.includes('cli')) return ['AR-COM-006','AR-DOC-003']; if (f.includes('privacy') || f.includes('legal')) return ['AR-LEG-001','AR-SITE-019']; if (f.includes('trust') || f.includes('security')) return ['AR-SITE-017','AR-SEC-001']; if (f.includes('benchmark') || f.includes('fixture')) return ['AR-ENG-EPIC','AR-ENG-005']; if (f.includes('site') || f.includes('browser')) return ['AR-SITE-EPIC','AR-UX-001']; if (f.includes('go_to_market')) return ['AR-ACQ-001','AR-MARKET-001']; if (f.includes('onboarding')) return ['AR-ONB-EPIC','AR-ONB-004']; if (f.includes('mcp')) return ['AR-SITE-007','AR-INT-002']; return ['AR-GOV-003']; }
const docs = [...new Set(['README.md','ROADMAP.md','AGENTREADY_PROJECT_CONTEXT.md',...walk('docs/agentready')])].sort((a, b) => a.localeCompare(b));
const document_coverage = docs.filter((file) => !generatedSet.has(file)).map((file) => { const text = read(file); const historical = file.includes('/history/') || file.includes('/legacy/') || text.includes('Status: HISTORICAL') || text.includes('HISTORICAL') || text.includes('SUPERSEDED BY'); return { document: file, status: historical ? 'HISTORICAL' : 'ACTIVE', task_ids: historical ? ['AR-GOV-001'] : taskForDoc(file) }; });

const ledger = {
  schema_version: '1.2',
  project: 'AgentReady',
  repository: 'BACOUL/timeproofs',
  strategic_authority: doc.master,
  execution_authority: doc.sequence,
  decision_authority: doc.decision,
  granularity_rule: 'One ledger work item = one independently verifiable unit of work. One Codex execution batch = one coherent pull request that may complete one or several compatible ledger work items. One execution-ready Codex batch = one generated Codex prompt.',
  batch_grouping_rule: 'Codex prompts are generated from coherent execution batches, not directly from detailed work items. Batching reduces execution overhead without removing deliverables, acceptance criteria, evidence requirements or auditability.',
  generated_files: generatedFiles,
  milestones,
  tasks,
  execution_batches: executionBatches,
  site_surfaces,
  document_coverage
};
writeFileSync('docs/agentready/AGENTREADY_EXECUTION_LEDGER.json', `${JSON.stringify(ledger, null, 2)}\
`);
console.log(`Wrote ${tasks.length} tasks, ${tasks.filter((t) => t.task_type === 'CODEX_WORK_ITEM').length} CODEX_WORK_ITEM tasks, ${executionBatches.length} execution batches, ${site_surfaces.length} site surfaces, ${document_coverage.filter((d) => d.status === 'ACTIVE').length} active docs.`);
