import { readFileSync, writeFileSync } from "node:fs";

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

const remainingPromptStatuses = new Set(["READY", "IN_PROGRESS", "IN_REVIEW", "MERGED_PENDING_EVIDENCE", "PLANNED", "BLOCKED", "POST_LAUNCH", "POST_REVENUE"]);

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

export function promptCounts(ledger) {
  const milestoneIndex = new Map(ledger.milestones.map((milestone, index) => [milestone.id, index + 1]));
  const codex = ledger.tasks.filter(isCodexPrompt).filter((task) => task.status !== "REJECTED");
  const remaining = codex.filter((task) => !isDone(task));
  const by_status = {};
  for (const task of codex) by_status[task.status] = (by_status[task.status] || 0) + 1;
  const remainingThrough = (max) => remaining.filter((task) => (milestoneIndex.get(task.milestone) || 99) <= max && !["POST_LAUNCH", "POST_REVENUE"].includes(task.delivery_horizon)).length;
  return {
    generated_from: LEDGER_PATH,
    total_planned_codex_pr_tasks: codex.length,
    completed_codex_pr_tasks: codex.filter(isDone).length,
    remaining_planned_codex_prompts: remaining.length,
    by_status,
    before_community_publication: remaining.filter((task) => task.delivery_horizon === "BEFORE_COMMUNITY_PUBLICATION" && (milestoneIndex.get(task.milestone) || 99) <= 3).length,
    before_pro_technical_completion: remainingThrough(5),
    before_pro_first_sale: remainingThrough(6),
    before_global_launch: remainingThrough(7),
    global_category_building: remaining.filter((task) => task.milestone === "M8").length,
    post_launch: remaining.filter((task) => task.delivery_horizon === "POST_LAUNCH").length,
    post_revenue: remaining.filter((task) => task.delivery_horizon === "POST_REVENUE").length,
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

export function generatedContents(ledger) {
  const counts = promptCounts(ledger);
  const next = selectNextAction(ledger);
  const global = progress(ledger.tasks);
  const ledgerMd = [
    GENERATED_HEADER,
    "# AgentReady Execution Ledger",
    "",
    "## Milestones",
    ...ledger.milestones.flatMap((m) => [`### ${m.id} - ${m.name}`, `Status: ${m.status}`, `Horizon: ${m.delivery_horizon}`, "Exit criteria:", linesFor(m.exit_criteria), ""]),
    "## Tasks",
    ...ledger.tasks.flatMap((t) => [`### ${t.id} - ${t.title}`, `- Type: ${t.task_type}`, `- Status: ${t.status}`, `- Owner: ${t.owner}`, `- Milestone: ${t.milestone}`, `- Horizon: ${t.delivery_horizon}`, `- Workstream: ${t.workstream}`, `- Weight: ${t.weight}`, `- Depends on: ${t.depends_on.length ? t.depends_on.join(", ") : "None"}`, `- Branch: ${t.branch || "None"}`, `- PR title: ${t.pr_title || "None"}`, t.pr_number ? `- PR: #${t.pr_number}` : "", "Acceptance criteria:", linesFor(t.acceptance_criteria), "Required evidence:", linesFor(t.required_evidence), ""])
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
    `Remaining planned Codex prompts: ${counts.remaining_planned_codex_prompts}`,
    `Currently READY Codex prompts: ${counts.by_status.READY || 0}`,
    `Currently IN_PROGRESS Codex prompts: ${counts.by_status.IN_PROGRESS || 0}`,
    `Currently IN_REVIEW Codex prompts: ${counts.by_status.IN_REVIEW || 0}`,
    `Currently BLOCKED Codex prompts: ${counts.by_status.BLOCKED || 0}`,
    "",
    `Remaining Codex prompts before Community publicly usable: ${counts.before_community_publication}`,
    `Remaining Codex prompts before Pro technically complete: ${counts.before_pro_technical_completion}`,
    `Remaining Codex prompts before Pro first sale: ${counts.before_pro_first_sale}`,
    `Remaining Codex prompts before global launch: ${counts.before_global_launch}`,
    `Remaining Codex prompts for global category-building: ${counts.global_category_building}`,
    `Remaining Codex prompts post-launch: ${counts.post_launch}`,
    `Remaining Codex prompts post-revenue: ${counts.post_revenue}`,
    "",
    "Unplanned correction prompts: not knowable in advance",
    "",
    "The planned prompt count is exact for the current approved ledger.",
    "Additional correction prompts may be required after human or automated review, but they cannot be known before the corresponding pull request is inspected.",
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
      ? `Repository: BACOUL/timeproofs\nBase: timeproofs\nTask ID: ${next.task.id}\nObjective: ${next.task.objective}\nBranch: ${next.task.branch}\nPR title: ${next.task.pr_title}\n\nAllowed paths:\n${linesFor(next.task.allowed_paths)}\n\nForbidden paths:\n${linesFor(next.task.forbidden_paths)}\n\nAcceptance criteria:\n${linesFor(next.task.acceptance_criteria)}`
      : `No CODEX task is currently authorized.\n\nThe current next action belongs to:\n${next ? `${next.action_owner} - ${next.task.id} - ${next.task.title}` : "None"}\n\nCodex must not start another implementation prompt until the blocking owner, legal, security, design, or external action is complete and the ledger has been reconciled.`,
    ""
  ].join("\n");
  const ownerRows = ledger.tasks.filter((t) => t.owner !== "CODEX" || t.external_verification?.required).map((t) => `| ${t.id} | ${t.owner} | ${t.status} | ${t.title} | ${(t.required_evidence || []).join("<br>")} |`).join("\n");
  const ownerActions = `${GENERATED_HEADER}\n# Owner And External Actions\n\n| Task ID | Owner | Status | Title | Required evidence |\n|---|---|---|---|---|\n${ownerRows}\n`;
  const siteRows = ledger.tasks.filter((t) => ["SITE", "SEO", "GEO", "COMP", "INT", "CAT", "ACQ"].includes(t.workstream)).map((t) => {
    const m = t.site_matrix || {};
    return `| ${t.id} | ${m.topic || t.title} | ${m.audience || "Developers and buyers"} | ${m.search_intent || "Informational"} | ${m.ai_question_entity || "AgentReady"} | ${m.cta || "Read docs"} | ${(t.source_documents || []).join("<br>")} | ${m.structured_data || "TechArticle"} | ${m.competitor_category || t.workstream} | ${t.status} | ${(t.acceptance_criteria || []).join("<br>")} |`;
  }).join("\n");
  const siteMatrix = `${GENERATED_HEADER}\n# Global Site SEO GEO Competitive Matrix\n\n| Task ID | Page/topic | Audience | Search intent | AI question/entity | CTA | Primary evidence/source | Structured data | Competitor/category | Status | Publication criteria |\n|---|---|---|---|---|---|---|---|---|---|---|\n${siteRows}\n`;
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

export function validateLedger(ledger, compareGenerated = true) {
  const errors = [];
  const add = (condition, message) => { if (!condition) errors.push(message); };
  const map = taskMap(ledger);
  const ids = new Set();
  add(ledger.schema_version === "1.0", "schema_version must be 1.0");
  add(ledger.strategic_authority === "docs/agentready/AGENTREADY_MASTER_PLAN.md", "bad strategic authority");
  add(ledger.execution_authority === "docs/agentready/EXECUTION_SEQUENCE.md", "bad execution authority");
  add(ledger.decision_authority === "docs/agentready/DECISION_LOG.md", "bad decision authority");
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
  const benchmark = map.get("AR-ENG-001");
  for (const task of ledger.tasks.filter((t) => t.workstream === "PRO" && t.status === "READY")) add(benchmark?.status === "DONE", `${task.id} Pro READY before benchmark`);
  for (const coverage of ledger.document_coverage || []) {
    try { readFileSync(coverage.document, "utf8"); } catch { errors.push(`covered document does not exist: ${coverage.document}`); }
    add(coverage.task_ids?.length, `${coverage.document} has no task ids`);
    for (const id of coverage.task_ids || []) add(map.has(id), `${coverage.document} references unknown task ${id}`);
  }
  const covered = new Set((ledger.document_coverage || []).map((item) => item.document));
  for (const doc of ["README.md", "ROADMAP.md", "AGENTREADY_PROJECT_CONTEXT.md", "docs/agentready/AGENTREADY_MASTER_PLAN.md", "docs/agentready/EXECUTION_SEQUENCE.md", "docs/agentready/DECISION_LOG.md"]) add(covered.has(doc), `${doc} not covered`);
  const counts = promptCounts(ledger);
  const actualRemaining = ledger.tasks.filter((t) => isCodexPrompt(t) && !isDone(t) && t.status !== "REJECTED").length;
  add(counts.remaining_planned_codex_prompts === actualRemaining, "prompt count mismatch");
  add(!ledger.tasks.some((t) => t.task_type === "EPIC" && isCodexPrompt(t)), "EPIC counted as prompt");
  add(counts.before_pro_first_sale === ledger.tasks.filter((t) => isCodexPrompt(t) && !isDone(t) && t.status !== "REJECTED" && !["POST_LAUNCH", "POST_REVENUE"].includes(t.delivery_horizon) && ["M1", "M2", "M3", "M4", "M5", "M6"].includes(t.milestone)).length, "first sale prompt count includes wrong tasks");
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
