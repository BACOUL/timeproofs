import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";

export const LEDGER_PATH = "docs/agentready/AGENTREADY_EXECUTION_LEDGER.json";
export const GENERATED_HEADER = `GENERATED FILE — DO NOT EDIT MANUALLY

Canonical source:
docs/agentready/AGENTREADY_EXECUTION_LEDGER.json
`;

export const generatedPaths = {
  ledger: "docs/agentready/AGENTREADY_EXECUTION_LEDGER.md",
  status: "docs/agentready/AGENTREADY_STATUS.md",
  nextAction: "docs/agentready/NEXT_ACTION.md",
  nextPrompt: "docs/agentready/NEXT_CODEX_PROMPT.md",
  ownerActions: "docs/agentready/OWNER_AND_EXTERNAL_ACTIONS.md",
  siteMatrix: "docs/agentready/GLOBAL_SITE_SEO_GEO_COMPETITIVE_MATRIX.md",
  promptCount: "docs/agentready/AGENTREADY_CODEX_PROMPT_COUNT.json"
};

const allowed = {
  task_type: ["CODEX_PR", "OWNER_ACTION", "LEGAL_REVIEW", "SECURITY_REVIEW", "DESIGN_REVIEW", "EXTERNAL_SPECIALIST_ACTION", "EXTERNAL_VERIFICATION", "DECISION_GATE", "RECURRING_OPERATION", "EPIC"],
  status: ["DONE", "READY", "IN_PROGRESS", "IN_REVIEW", "MERGED_PENDING_EVIDENCE", "PLANNED", "BLOCKED", "OWNER_ACTION_REQUIRED", "LEGAL_REVIEW_REQUIRED", "SECURITY_REVIEW_REQUIRED", "EXTERNAL_SPECIALIST_REQUIRED", "EXTERNAL_VERIFICATION_REQUIRED", "DECISION_REQUIRED", "RECURRING", "POST_LAUNCH", "POST_REVENUE", "REJECTED"],
  owner: ["CODEX", "JEASON", "CODEX_AND_JEASON", "LEGAL", "DESIGN", "SECURITY", "EXTERNAL_SPECIALIST"],
  delivery_horizon: ["BEFORE_COMMUNITY_PUBLICATION", "BEFORE_PRO_TECHNICAL_COMPLETION", "BEFORE_PRO_FIRST_SALE", "BEFORE_GLOBAL_LAUNCH", "POST_LAUNCH", "POST_REVENUE"],
  weight: [1, 2, 3, 5, 8]
};

const horizonRank = {
  BEFORE_COMMUNITY_PUBLICATION: 1,
  BEFORE_PRO_TECHNICAL_COMPLETION: 2,
  BEFORE_PRO_FIRST_SALE: 3,
  BEFORE_GLOBAL_LAUNCH: 4,
  POST_LAUNCH: 5,
  POST_REVENUE: 6
};

const generatedMarkdown = new Set(Object.values(generatedPaths).filter((filePath) => filePath.endsWith(".md")));
const rootActiveDocuments = ["README.md", "ROADMAP.md", "AGENTREADY_PROJECT_CONTEXT.md"];
const issuedStatuses = new Set(["IN_PROGRESS", "IN_REVIEW", "MERGED_PENDING_EVIDENCE"]);

export function readLedger(filePath = LEDGER_PATH) {
  return JSON.parse(readFileSync(filePath, "utf8"));
}

export function writeLedger(ledger, filePath = LEDGER_PATH) {
  writeFileSync(filePath, `${JSON.stringify(ledger, null, 2)}\n`);
}

export function taskMap(ledger) {
  return new Map(ledger.tasks.map((task) => [task.id, task]));
}

export function isDone(task) {
  return task.status === "DONE";
}

export function isCodexPrompt(task) {
  return task.task_type === "CODEX_PR";
}

export function progress(tasks) {
  const total = tasks.reduce((sum, task) => sum + task.weight, 0);
  const done = tasks.filter(isDone).reduce((sum, task) => sum + task.weight, 0);
  return { done, total, percent: total ? Number(((done / total) * 100).toFixed(1)) : 0 };
}

function milestoneNumber(task) {
  return Number(String(task.milestone || "").replace(/^M/, "")) || 99;
}

function countRemaining(codexTasks, predicate) {
  const remainingTasks = codexTasks.filter((task) => !isDone(task) && predicate(task));
  const promptsToIssue = remainingTasks.filter((task) => !issuedStatuses.has(task.status)).length;
  return { tasks: remainingTasks.length, prompts_to_issue: promptsToIssue };
}

export function promptCounts(ledger) {
  const codex = ledger.tasks.filter(isCodexPrompt).filter((task) => task.status !== "REJECTED");
  const remaining = codex.filter((task) => !isDone(task));
  const by_status = {};
  for (const task of codex) by_status[task.status] = (by_status[task.status] || 0) + 1;
  const issuedNotMerged = remaining.filter((task) => issuedStatuses.has(task.status)).length;
  const beforeCommunity = countRemaining(codex, (task) => task.delivery_horizon === "BEFORE_COMMUNITY_PUBLICATION" && milestoneNumber(task) <= 3);
  const beforeProTechnical = countRemaining(codex, (task) => milestoneNumber(task) <= 5 && !["POST_LAUNCH", "POST_REVENUE"].includes(task.delivery_horizon));
  const beforeProSale = countRemaining(codex, (task) => milestoneNumber(task) <= 6 && !["POST_LAUNCH", "POST_REVENUE"].includes(task.delivery_horizon));
  const beforeGlobalLaunch = countRemaining(codex, (task) => milestoneNumber(task) <= 7 && !["POST_LAUNCH", "POST_REVENUE"].includes(task.delivery_horizon));
  const category = countRemaining(codex, (task) => task.milestone === "M8" && task.delivery_horizon !== "POST_REVENUE");
  const postLaunch = countRemaining(codex, (task) => task.delivery_horizon === "POST_LAUNCH");
  const postRevenue = countRemaining(codex, (task) => task.delivery_horizon === "POST_REVENUE");
  return {
    generated_from: LEDGER_PATH,
    total_planned_codex_pr_tasks: codex.length,
    completed_codex_pr_tasks: codex.filter(isDone).length,
    prompts_already_issued_and_currently_in_review: issuedNotMerged,
    prompts_not_yet_issued: remaining.length - issuedNotMerged,
    remaining_planned_codex_prompts: remaining.length,
    by_status,
    remaining_tasks_before_community_publication: beforeCommunity.tasks,
    remaining_prompts_to_issue_before_community_publication: beforeCommunity.prompts_to_issue,
    remaining_tasks_before_pro_technical_completion: beforeProTechnical.tasks,
    remaining_prompts_to_issue_before_pro_technical_completion: beforeProTechnical.prompts_to_issue,
    remaining_tasks_before_pro_first_sale: beforeProSale.tasks,
    remaining_prompts_to_issue_before_pro_first_sale: beforeProSale.prompts_to_issue,
    remaining_tasks_before_global_launch: beforeGlobalLaunch.tasks,
    remaining_prompts_to_issue_before_global_launch: beforeGlobalLaunch.prompts_to_issue,
    global_category_building: category.prompts_to_issue,
    post_launch: postLaunch.prompts_to_issue,
    post_revenue: postRevenue.prompts_to_issue,
    unplanned_correction_prompts: "not knowable in advance"
  };
}

export function selectNextAction(ledger) {
  const inReview = ledger.tasks.find((task) => task.status === "IN_REVIEW");
  if (inReview) return { task: inReview, action_owner: "JEASON", action_type: "REVIEW_OR_MERGE", summary: `Human review and merge decision for ${inReview.pr_title}.` };
  const blocking = ["OWNER_ACTION_REQUIRED", "LEGAL_REVIEW_REQUIRED", "SECURITY_REVIEW_REQUIRED", "EXTERNAL_SPECIALIST_REQUIRED", "EXTERNAL_VERIFICATION_REQUIRED", "DECISION_REQUIRED"];
  for (const status of blocking) {
    const task = ledger.tasks.find((candidate) => candidate.status === status);
    if (task) return { task, action_owner: task.owner, action_type: status, summary: task.objective };
  }
  const ready = ledger.tasks.find((task) => task.status === "READY");
  if (ready) return { task: ready, action_owner: ready.owner, action_type: "READY", summary: ready.objective };
  return null;
}

function linesFor(values) {
  return values?.length ? values.map((item) => `  - ${item}`).join("\n") : "  - None";
}

function groupBy(tasks, key) {
  const out = new Map();
  for (const task of tasks) {
    const value = task[key] || "UNSET";
    if (!out.has(value)) out.set(value, []);
    out.get(value).push(task);
  }
  return out;
}

function walkMarkdownFiles(dir) {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const absolute = path.join(dir, entry.name);
    const relative = absolute.replaceAll(path.sep, "/");
    if (entry.isDirectory()) out.push(...walkMarkdownFiles(absolute));
    if (entry.isFile() && entry.name.endsWith(".md")) out.push(relative);
  }
  return out;
}

function readIfExists(filePath) {
  try {
    return readFileSync(filePath, "utf8");
  } catch {
    return "";
  }
}

export function documentCoverageStats(ledger) {
  const discovered = [
    ...rootActiveDocuments.filter((filePath) => existsSync(filePath)),
    ...walkMarkdownFiles("docs/agentready")
  ];
  const generated = [];
  const historical = [];
  const active = [];
  for (const filePath of discovered) {
    const normalized = filePath.replaceAll(path.sep, "/");
    const content = readIfExists(normalized);
    if (generatedMarkdown.has(normalized)) {
      generated.push(normalized);
    } else if (normalized.includes("/history/") || normalized.includes("/legacy/") || content.includes("Status: HISTORICAL") || content.includes("HISTORICAL") || content.includes("SUPERSEDED BY")) {
      historical.push(normalized);
    } else {
      active.push(normalized);
    }
  }
  const coverage = new Map((ledger.document_coverage || []).map((item) => [item.document, item]));
  const uncovered = active.filter((filePath) => !coverage.has(filePath));
  const coveredActive = active.filter((filePath) => coverage.has(filePath));
  return {
    active_documents_discovered: active.length,
    active_documents_covered: coveredActive.length,
    uncovered_active_documents: uncovered,
    historical_documents_excluded: historical.length,
    generated_documents_excluded: generated.length
  };
}

export function generatedContents(ledger) {
  const counts = promptCounts(ledger);
  const next = selectNextAction(ledger);
  const global = progress(ledger.tasks);
  const coverageStats = documentCoverageStats(ledger);
  const ledgerMd = [
    GENERATED_HEADER,
    "# AgentReady Execution Ledger",
    "",
    "## Milestones",
    ...ledger.milestones.flatMap((m) => [
      `### ${m.id} - ${m.name}`,
      `Status: ${m.status}`,
      `Horizon: ${m.delivery_horizon}`,
      "Exit criteria:",
      linesFor(m.exit_criteria),
      "Criteria links:",
      linesFor((m.criteria || []).map((criterion) => `${criterion.criterion_id}: ${criterion.description} -> ${(criterion.satisfied_by || []).join(", ")}`)),
      ""
    ]),
    "## Tasks",
    ...ledger.tasks.flatMap((t) => [
      `### ${t.id} - ${t.title}`,
      `- Type: ${t.task_type}`,
      `- Status: ${t.status}`,
      `- Owner: ${t.owner}`,
      `- Milestone: ${t.milestone}`,
      `- Horizon: ${t.delivery_horizon}`,
      `- Workstream: ${t.workstream}`,
      `- Weight: ${t.weight}`,
      `- Depends on: ${t.depends_on.length ? t.depends_on.join(", ") : "None"}`,
      `- Branch: ${t.branch || "None"}`,
      `- PR title: ${t.pr_title || "None"}`,
      t.pr_number ? `- PR: #${t.pr_number}` : "",
      "Deliverables:",
      linesFor(t.deliverables),
      "Acceptance criteria:",
      linesFor(t.acceptance_criteria),
      "Required evidence:",
      linesFor(t.required_evidence),
      ""
    ])
  ].join("\n");
  const status = [
    GENERATED_HEADER,
    "# AgentReady Status",
    "",
    "## Summary",
    `- Total tasks: ${ledger.tasks.length}`,
    `- Total weighted progress: ${global.done}/${global.total} (${global.percent}%)`,
    `- Next action: ${next ? `${next.task.id} - ${next.task.title}` : "None"}`,
    "",
    "## Progress By Horizon",
    ...[...groupBy(ledger.tasks, "delivery_horizon")].map(([h, tasks]) => {
      const p = progress(tasks);
      return `- ${h}: ${p.done}/${p.total} (${p.percent}%)`;
    }),
    "",
    "## Progress By Milestone",
    ...ledger.milestones.map((m) => {
      const p = progress(ledger.tasks.filter((task) => task.milestone === m.id));
      return `- ${m.id} ${m.name}: ${p.done}/${p.total} (${p.percent}%)`;
    }),
    "",
    "## Codex Prompt Count",
    `Total planned CODEX_PR tasks: ${counts.total_planned_codex_pr_tasks}`,
    `Completed CODEX_PR tasks: ${counts.completed_codex_pr_tasks}`,
    `Prompts already issued and currently in review: ${counts.prompts_already_issued_and_currently_in_review}`,
    `Prompts not yet issued: ${counts.prompts_not_yet_issued}`,
    `Remaining planned Codex prompts: ${counts.remaining_planned_codex_prompts}`,
    `Currently READY Codex prompts: ${counts.by_status.READY || 0}`,
    `Currently IN_PROGRESS Codex prompts: ${counts.by_status.IN_PROGRESS || 0}`,
    `Currently IN_REVIEW Codex prompts: ${counts.by_status.IN_REVIEW || 0}`,
    `Currently BLOCKED Codex prompts: ${counts.by_status.BLOCKED || 0}`,
    "",
    `Remaining tasks before Community publicly usable: ${counts.remaining_tasks_before_community_publication}`,
    `Remaining prompts to issue before Community publicly usable: ${counts.remaining_prompts_to_issue_before_community_publication}`,
    `Remaining tasks before Pro technically complete: ${counts.remaining_tasks_before_pro_technical_completion}`,
    `Remaining prompts to issue before Pro technically complete: ${counts.remaining_prompts_to_issue_before_pro_technical_completion}`,
    `Remaining tasks before Pro first sale: ${counts.remaining_tasks_before_pro_first_sale}`,
    `Remaining prompts to issue before Pro first sale: ${counts.remaining_prompts_to_issue_before_pro_first_sale}`,
    `Remaining tasks before global launch: ${counts.remaining_tasks_before_global_launch}`,
    `Remaining prompts to issue before global launch: ${counts.remaining_prompts_to_issue_before_global_launch}`,
    `Category-building prompts: ${counts.global_category_building}`,
    `Post-launch prompts: ${counts.post_launch}`,
    `Post-revenue prompts: ${counts.post_revenue}`,
    "",
    "Unplanned correction prompts: not knowable in advance",
    "",
    "The planned prompt count is exact for the current approved ledger.",
    "Additional correction prompts may be required after human or automated review, but they cannot be known before the corresponding pull request is inspected.",
    "",
    "## Document Coverage",
    `Active documents discovered: ${coverageStats.active_documents_discovered}`,
    `Active documents covered: ${coverageStats.active_documents_covered}`,
    `Uncovered active documents: ${coverageStats.uncovered_active_documents.length}`,
    `Historical documents excluded: ${coverageStats.historical_documents_excluded}`,
    `Generated documents excluded: ${coverageStats.generated_documents_excluded}`,
    ""
  ].join("\n");
  const nextAction = [
    GENERATED_HEADER,
    "# Next Action",
    "",
    next ? `Task ID: ${next.task.id}\nTitle: ${next.task.title}\nAction owner: ${next.action_owner}\nAction type: ${next.action_type}\nStatus: ${next.task.status}\nObjective:\n${next.task.objective}\n\nRequired evidence:\n${linesFor(next.task.required_evidence)}\n\nManual actions:\n${linesFor(next.task.manual_actions)}` : "No next action is available.",
    ""
  ].join("\n");
  const nextPrompt = [
    GENERATED_HEADER,
    "# Next Codex Prompt",
    "",
    next && next.task.task_type === "CODEX_PR" && next.task.owner === "CODEX" && next.task.status === "READY"
      ? `Repository: BACOUL/timeproofs\nBase: timeproofs\nTask ID: ${next.task.id}\nMilestone: ${next.task.milestone}\nHorizon: ${next.task.delivery_horizon}\nObjective: ${next.task.objective}\nBranch: ${next.task.branch}\nPR title: ${next.task.pr_title}\n\nAllowed paths:\n${linesFor(next.task.allowed_paths)}\n\nForbidden paths:\n${linesFor(next.task.forbidden_paths)}\n\nAcceptance criteria:\n${linesFor(next.task.acceptance_criteria)}\n\nRequired commands:\n${linesFor(next.task.required_commands)}\n\nRequired evidence:\n${linesFor(next.task.required_evidence)}\n\nStay strictly within scope and do not merge the PR.`
      : `No CODEX task is currently authorized.\n\nThe current next action belongs to:\n${next ? `${next.action_owner} - ${next.task.id} - ${next.task.title}` : "None"}\n\nCodex must not start another implementation prompt until the blocking owner, legal, security, design, or external action is complete and the ledger has been reconciled.`,
    ""
  ].join("\n");
  const ownerRows = ledger.tasks.filter((t) => t.owner !== "CODEX" || t.external_verification?.required).map((t) => `| ${t.id} | ${t.owner} | ${t.status} | ${t.title} | ${(t.required_evidence || []).join("<br>")} |`).join("\n");
  const ownerActions = `${GENERATED_HEADER}\n# Owner And External Actions\n\n| Task ID | Owner | Status | Title | Required evidence |\n|---|---|---|---|---|\n${ownerRows}\n`;
  const surfaceRows = (ledger.site_surfaces || []).map((surface) => {
    return `| ${surface.task_id} | ${surface.planned_route} | ${surface.topic} | ${surface.audience} | ${surface.search_intent} | ${surface.ai_question_entity} | ${surface.cta} | ${surface.primary_evidence_source} | ${surface.structured_data} | ${surface.competitor_category} | ${surface.status} | ${surface.publication_criteria.join("<br>")} |`;
  }).join("\n");
  const siteMatrix = `${GENERATED_HEADER}\n# Global Site SEO GEO Competitive Matrix\n\n| Task ID | Planned route | Page/topic | Audience | Search intent | AI question/entity | CTA | Primary evidence/source | Structured data | Competitor/category | Status | Publication criteria |\n|---|---|---|---|---|---|---|---|---|---|---|---|\n${surfaceRows}\n`;
  return {
    [generatedPaths.ledger]: `${ledgerMd}\n`,
    [generatedPaths.status]: `${status}\n`,
    [generatedPaths.nextAction]: `${nextAction}\n`,
    [generatedPaths.nextPrompt]: `${nextPrompt}\n`,
    [generatedPaths.ownerActions]: ownerActions,
    [generatedPaths.siteMatrix]: siteMatrix,
    [generatedPaths.promptCount]: `${JSON.stringify(counts, null, 2)}\n`
  };
}

export function writeGeneratedViews(ledger, paths = Object.keys(generatedContents(ledger))) {
  const contents = generatedContents(ledger);
  for (const filePath of paths) writeFileSync(filePath, contents[filePath]);
}

function validateActiveDocumentCoverage(ledger, add) {
  const stats = documentCoverageStats(ledger);
  const coverage = new Map((ledger.document_coverage || []).map((item) => [item.document, item]));
  const map = taskMap(ledger);
  add(stats.uncovered_active_documents.length === 0, `uncovered active documents: ${stats.uncovered_active_documents.join(", ")}`);
  for (const [document, item] of coverage) {
    if (item.status === "ACTIVE") {
      add(item.task_ids?.length, `${document} has no task ids`);
      for (const id of item.task_ids || []) add(map.has(id), `${document} references unknown task ${id}`);
    }
  }
}

function validateMilestoneCriteria(ledger, add) {
  const map = taskMap(ledger);
  for (const milestone of ledger.milestones) {
    add(milestone.criteria?.length, `${milestone.id} has no linked criteria`);
    for (const criterion of milestone.criteria || []) {
      add(criterion.criterion_id && criterion.description, `${milestone.id} has malformed criterion`);
      add(criterion.satisfied_by?.length, `${criterion.criterion_id} has no satisfying tasks`);
      for (const id of criterion.satisfied_by || []) {
        const task = map.get(id);
        add(task, `${criterion.criterion_id} references unknown task ${id}`);
        if (!task) continue;
        add(horizonRank[task.delivery_horizon] <= horizonRank[milestone.delivery_horizon], `${id} horizon ${task.delivery_horizon} is later than ${criterion.criterion_id}`);
      }
      if (criterion.requires_human) {
        add((criterion.satisfied_by || []).some((id) => map.get(id)?.task_type !== "CODEX_PR"), `${criterion.criterion_id} requires human evidence but has only CODEX_PR tasks`);
      }
    }
  }
}

export function validateLedger(ledger, compareGenerated = true) {
  const errors = [];
  const add = (condition, message) => { if (!condition) errors.push(message); };
  const map = taskMap(ledger);
  const ids = new Set();
  add(ledger.schema_version === "1.1", "schema_version must be 1.1");
  add(ledger.strategic_authority === "docs/agentready/AGENTREADY_MASTER_PLAN.md", "bad strategic authority");
  add(ledger.execution_authority === "docs/agentready/EXECUTION_SEQUENCE.md", "bad execution authority");
  add(ledger.decision_authority === "docs/agentready/DECISION_LOG.md", "bad decision authority");
  add((ledger.site_surfaces || []).length >= 50, "site surface inventory is too small");
  for (const requiredRoute of ["/", "/product", "/community", "/pro", "/pricing", "/openapi", "/mcp", "/agentready-ci", "/how-it-works", "/methodology", "/limitations", "/benchmark", "/examples/bad-fixed", "/rules", "/changelog", "/compatibility", "/trust", "/security", "/privacy", "/terms", "/refund", "/responsible-disclosure", "/status", "/support", "/docs/installation", "/docs/cli", "/docs/github-action", "/docs/configuration", "/docs/policies", "/docs/baseline", "/docs/sarif", "/docs/exceptions", "/docs/troubleshooting", "/docs/migration", "/docs/examples", "/docs/integrations", "/account", "/activation", "/billing", "/checkout-success", "/checkout-cancelled", "/customer-portal", "/cancellation", "/recovery"]) {
    add((ledger.site_surfaces || []).some((surface) => surface.planned_route === requiredRoute), `missing required site surface ${requiredRoute}`);
  }
  for (const rule of ["ar001", "ar002", "ar003", "ar004", "ar005", "ar006", "ar007", "ar008", "ar009", "ar010"]) {
    add((ledger.site_surfaces || []).some((surface) => surface.planned_route.includes(`/rules/${rule}`)), `missing rule page surface ${rule}`);
  }
  for (const surface of ledger.site_surfaces || []) {
    add(surface.planned_route, "site surface missing planned route");
    add(surface.task_id && map.has(surface.task_id), `site surface ${surface.planned_route} references unknown task`);
    for (const field of ["audience", "search_intent", "objective", "cta", "mandatory_content", "primary_evidence_source", "structured_data", "internal_links", "seo", "geo", "status", "qa", "publication_criteria"]) {
      add(surface[field]?.length || typeof surface[field] === "string", `site surface ${surface.planned_route} missing ${field}`);
    }
  }
  for (const task of ledger.tasks) {
    add(!ids.has(task.id), `duplicate task id ${task.id}`);
    ids.add(task.id);
    for (const key of ["task_type", "status", "owner", "delivery_horizon"]) add(allowed[key].includes(task[key]), `${task.id} invalid ${key}`);
    add(allowed.weight.includes(task.weight), `${task.id} invalid weight`);
    add(task.workstream, `${task.id} missing workstream`);
    add(task.milestone, `${task.id} missing milestone`);
    add(task.acceptance_criteria?.length, `${task.id} lacks acceptance criteria`);
    add(task.required_evidence?.length, `${task.id} lacks required evidence`);
    add(task.source_documents?.length, `${task.id} lacks source document`);
    if (task.status === "DONE") add(task.evidence?.length, `${task.id} DONE without evidence`);
    if (task.status === "READY") for (const dep of task.depends_on || []) add(map.get(dep)?.status === "DONE", `${task.id} READY but ${dep} is not DONE`);
    if (task.status === "IN_REVIEW") add(task.pr_number, `${task.id} IN_REVIEW without PR number`);
    if (task.task_type === "CODEX_PR") {
      add(task.branch, `${task.id} CODEX_PR missing branch`);
      add(task.pr_title, `${task.id} CODEX_PR missing PR title`);
      for (const key of ["deliverables", "estimated_files_or_surfaces", "independent_test_plan"]) add(Array.isArray(task[key]) && task[key].length, `${task.id} CODEX_PR missing ${key}`);
      add(task.rollback_boundary, `${task.id} CODEX_PR missing rollback boundary`);
      add(task.scope_justification, `${task.id} CODEX_PR missing scope justification`);
      if (task.weight === 5) add(task.scope_justification.includes("Weight 5"), `${task.id} weight 5 lacks explicit justification`);
      add((task.deliverables || []).length <= 4 || task.scope_justification.includes("strongly coupled"), `${task.id} combines too many deliverables without split justification`);
    } else {
      add(!task.branch, `${task.id} non-CODEX task must not have branch`);
    }
    if (task.task_type === "EPIC") add(ledger.tasks.some((candidate) => candidate.parent_id === task.id), `${task.id} EPIC has no child`);
    if (task.task_type === "RECURRING_OPERATION") add(task.recurrence?.frequency, `${task.id} recurring task lacks frequency`);
    if (task.task_type === "DECISION_GATE") add(task.decision_gate?.allowed_outcomes?.length, `${task.id} decision gate lacks outcomes`);
    if (task.external_verification?.required) add(task.external_verification.topic, `${task.id} external verification lacks topic`);
    if (task.title.includes("Team") || task.title.includes("Agency")) add(task.delivery_horizon === "POST_REVENUE" || task.status === "POST_REVENUE", `${task.id} Team/Agency active before post revenue`);
    if (task.weight === 8 && task.task_type !== "EPIC") add((task.notes || "").includes("weight 8 justified"), `${task.id} executable weight 8 not justified`);
    for (const item of task.allowed_paths || []) add(!(task.forbidden_paths || []).includes(item), `${task.id} path both allowed and forbidden`);
  }
  for (const task of ledger.tasks) for (const dep of task.depends_on || []) add(map.has(dep), `${task.id} depends on unknown ${dep}`);
  const visiting = new Set();
  const visited = new Set();
  function visit(id) {
    if (visiting.has(id)) {
      errors.push(`dependency cycle at ${id}`);
      return;
    }
    if (visited.has(id)) return;
    visiting.add(id);
    for (const dep of map.get(id)?.depends_on || []) visit(dep);
    visiting.delete(id);
    visited.add(id);
  }
  for (const id of map.keys()) visit(id);
  add(selectNextAction(ledger), "no next action");
  const publish = map.get("AR-COM-006");
  if (publish?.status === "READY") for (const blocker of ["AR-COM-001", "AR-COM-002", "AR-COM-003", "AR-COM-004", "AR-COM-005", "AR-COM-006A"]) add(map.get(blocker)?.status === "DONE", `publish READY while ${blocker} is not DONE`);
  for (const task of ledger.tasks.filter((t) => t.workstream === "PRO" && t.status === "READY")) add(map.get("AR-ENG-005")?.status === "DONE", `${task.id} Pro READY before final benchmark`);
  for (const required of ["AR-BILL-001", "AR-BILL-002", "AR-BILL-003", "AR-BILL-004", "AR-BILL-005", "AR-BILL-006", "AR-BILL-007", "AR-BILL-008", "AR-BILL-009", "AR-BILL-010", "AR-BILL-011", "AR-BILL-012", "AR-BILL-013", "AR-FIN-001", "AR-BILL-014"]) add(map.has(required), `missing explicit billing/customer lifecycle task ${required}`);
  for (const required of ["AR-LIC-001", "AR-LIC-002", "AR-LIC-003", "AR-LIC-004", "AR-LIC-005", "AR-LIC-006", "AR-LIC-007", "AR-LIC-008"]) add(map.has(required), `missing explicit licensing task ${required}`);
  for (const required of ["AR-ENG-001", "AR-ENG-001H", "AR-ENG-002", "AR-ENG-003", "AR-ENG-004", "AR-ENG-005"]) add(map.has(required), `missing benchmark task ${required}`);
  add(map.get("AR-ENG-001H")?.task_type !== "CODEX_PR" && map.get("AR-ENG-001H")?.owner !== "CODEX", "human annotation task must not be exclusively Codex");
  add(map.has("AR-SEC-001") && map.has("AR-SEC-002") && map.has("AR-SEC-003") && map.has("AR-SEC-004"), "security review remediation mechanism is incomplete");
  validateMilestoneCriteria(ledger, add);
  validateActiveDocumentCoverage(ledger, add);
  const counts = promptCounts(ledger);
  const codex = ledger.tasks.filter((t) => isCodexPrompt(t) && t.status !== "REJECTED");
  const actualRemaining = codex.filter((t) => !isDone(t)).length;
  const actualIssued = codex.filter((t) => !isDone(t) && issuedStatuses.has(t.status)).length;
  add(counts.remaining_planned_codex_prompts === actualRemaining, "prompt count mismatch");
  add(counts.prompts_already_issued_and_currently_in_review === actualIssued, "issued prompt count mismatch");
  add(counts.prompts_not_yet_issued === actualRemaining - actualIssued, "not-yet-issued prompt count mismatch");
  add(!ledger.tasks.some((t) => t.task_type === "EPIC" && isCodexPrompt(t)), "EPIC counted as prompt");
  add(counts.remaining_tasks_before_pro_first_sale === codex.filter((t) => !isDone(t) && !["POST_LAUNCH", "POST_REVENUE"].includes(t.delivery_horizon) && milestoneNumber(t) <= 6).length, "first sale task count includes wrong tasks");
  if (compareGenerated) {
    const generated = generatedContents(ledger);
    for (const [filePath, expected] of Object.entries(generated)) {
      let current = "";
      try { current = readFileSync(filePath, "utf8"); } catch { errors.push(`generated view missing: ${filePath}`); continue; }
      add(current === expected, `${filePath} is not synchronized`);
    }
  }
  if (errors.length) throw new Error(`AgentReady execution system validation failed:\n${errors.map((e) => `- ${e}`).join("\n")}`);
}

export function reconcileTask({ taskId, pr, mergeSha, write = false }) {
  const ledger = readLedger();
  const task = taskMap(ledger).get(taskId);
  if (!task) throw new Error(`Unknown task: ${taskId}`);
  if (!["IN_REVIEW", "MERGED_PENDING_EVIDENCE"].includes(task.status)) throw new Error(`${taskId} must be IN_REVIEW or MERGED_PENDING_EVIDENCE`);
  if (!mergeSha) throw new Error("merge SHA is required");
  task.pr_number = Number(pr);
  task.status = "DONE";
  task.evidence = [...(task.evidence || []), { type: "merge", pr: Number(pr), merge_sha: mergeSha }];
  if (write) {
    writeLedger(ledger);
    writeGeneratedViews(ledger);
  }
  return { ledger, next: selectNextAction(ledger) };
}
