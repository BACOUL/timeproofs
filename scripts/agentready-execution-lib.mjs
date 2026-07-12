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
  task_type: [
    "CODEX_WORK_ITEM",
    "CODEX_PR",
    "OWNER_ACTION",
    "LEGAL_REVIEW",
    "SECURITY_REVIEW",
    "DESIGN_REVIEW",
    "EXTERNAL_SPECIALIST_ACTION",
    "EXTERNAL_VERIFICATION",
    "DECISION_GATE",
    "RECURRING_OPERATION",
    "EPIC"
  ],
  status: [
    "DONE",
    "READY",
    "IN_PROGRESS",
    "IN_REVIEW",
    "MERGED_PENDING_EVIDENCE",
    "PLANNED",
    "BLOCKED",
    "PASS_WITH_DOCUMENTED_EXCEPTION",
    "OWNER_ACTION_REQUIRED",
    "LEGAL_REVIEW_REQUIRED",
    "SECURITY_REVIEW_REQUIRED",
    "EXTERNAL_SPECIALIST_REQUIRED",
    "EXTERNAL_VERIFICATION_REQUIRED",
    "DECISION_REQUIRED",
    "DECIDED",
    "RECURRING",
    "POST_LAUNCH",
    "POST_REVENUE",
    "REJECTED"
  ],
  batch_status: [
    "DONE",
    "READY",
    "IN_PROGRESS",
    "IN_REVIEW",
    "MERGED_PENDING_EVIDENCE",
    "PLANNED",
    "BLOCKED",
    "PASS_WITH_DOCUMENTED_EXCEPTION",
    "POST_LAUNCH",
    "POST_REVENUE",
    "REJECTED"
  ],
  spec_status: ["SKELETON", "SPECIFIED", "EXECUTION_READY"],
  owner: ["CODEX", "JEASON", "CODEX_AND_JEASON", "LEGAL", "DESIGN", "SECURITY", "EXTERNAL_SPECIALIST"],
  delivery_horizon: [
    "BEFORE_COMMUNITY_PUBLICATION",
    "BEFORE_PRO_TECHNICAL_COMPLETION",
    "BEFORE_PRO_FIRST_SALE",
    "BEFORE_GLOBAL_LAUNCH",
    "POST_LAUNCH",
    "POST_REVENUE"
  ],
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
const blockingStatuses = [
  "OWNER_ACTION_REQUIRED",
  "LEGAL_REVIEW_REQUIRED",
  "SECURITY_REVIEW_REQUIRED",
  "EXTERNAL_SPECIALIST_REQUIRED",
  "EXTERNAL_VERIFICATION_REQUIRED",
  "DECISION_REQUIRED"
];

export function readLedger(filePath = LEDGER_PATH) {
  return JSON.parse(readFileSync(filePath, "utf8"));
}

export function writeLedger(ledger, filePath = LEDGER_PATH) {
  writeFileSync(filePath, `${JSON.stringify(ledger, null, 2)}\n`);
}

export function taskMap(ledger) {
  return new Map(ledger.tasks.map((task) => [task.id, task]));
}

export function batchMap(ledger) {
  return new Map((ledger.execution_batches || []).map((batch) => [batch.id, batch]));
}

export function isDone(item) {
  return item.status === "DONE";
}

function isDependencySatisfied(item) {
  return ["DONE", "DECIDED", "PASS_WITH_DOCUMENTED_EXCEPTION"].includes(item?.status);
}

export function isCodexWorkItem(task) {
  return ["CODEX_WORK_ITEM", "CODEX_PR"].includes(task.task_type);
}

export function isCodexPrompt(task) {
  return task.task_type === "CODEX_PR";
}

export function progress(tasks) {
  const total = tasks.reduce((sum, task) => sum + task.weight, 0);
  const done = tasks.filter(isDone).reduce((sum, task) => sum + task.weight, 0);
  return { done, total, percent: total ? Number(((done / total) * 100).toFixed(1)) : 0 };
}

function milestoneNumber(item) {
  return Number(String(item.milestone || "").replace(/^M/, "")) || 99;
}

function isBatchIssued(batch) {
  return issuedStatuses.has(batch.status);
}

function dependencyTasksDone(batch, tasks) {
  return (batch.depends_on_tasks || []).every((id) => isDependencySatisfied(tasks.get(id)));
}

function taskDependenciesDone(task, tasks) {
  return (task.depends_on || []).every((id) => isDependencySatisfied(tasks.get(id)));
}

function dependencyBatchesDone(batch, batches) {
  return (batch.depends_on_batches || []).every((id) => batches.get(id)?.status === "DONE");
}

function isExecutionReadyBatch(batch, ledger) {
  return ["CODEX", "CODEX_AND_JEASON"].includes(batch.owner)
    && batch.status === "READY"
    && batch.spec_status === "EXECUTION_READY"
    && dependencyTasksDone(batch, taskMap(ledger))
    && dependencyBatchesDone(batch, batchMap(ledger));
}

function isSpecificationRefinementCandidate(batch, ledger) {
  return ["CODEX", "CODEX_AND_JEASON"].includes(batch.owner)
    && batch.status === "PLANNED"
    && batch.spec_status !== "EXECUTION_READY"
    && dependencyTasksDone(batch, taskMap(ledger))
    && dependencyBatchesDone(batch, batchMap(ledger));
}

function countRemainingBatches(batches, predicate) {
  const remaining = batches.filter((batch) => !isDone(batch) && predicate(batch));
  const notYetIssued = remaining.filter((batch) => !isBatchIssued(batch)).length;
  return { batches: remaining.length, not_yet_issued: notYetIssued };
}

function ceilDays(count, perDay) {
  return Math.ceil(count / perDay);
}

export function promptCounts(ledger) {
  const detailed = ledger.tasks.filter(isCodexWorkItem).filter((task) => task.status !== "REJECTED");
  const batches = (ledger.execution_batches || []).filter((batch) => batch.status !== "REJECTED");
  const remainingBatches = batches.filter((batch) => !isDone(batch));
  const batchStatus = {};
  for (const batch of batches) batchStatus[batch.status] = (batchStatus[batch.status] || 0) + 1;
  const beforeCommunity = countRemainingBatches(batches, (batch) => batch.delivery_horizon === "BEFORE_COMMUNITY_PUBLICATION" && milestoneNumber(batch) <= 3);
  const beforeProTechnical = countRemainingBatches(batches, (batch) => milestoneNumber(batch) <= 5 && !["POST_LAUNCH", "POST_REVENUE"].includes(batch.delivery_horizon));
  const beforeProSale = countRemainingBatches(batches, (batch) => milestoneNumber(batch) <= 6 && !["POST_LAUNCH", "POST_REVENUE"].includes(batch.delivery_horizon));
  const beforeGlobalLaunch = countRemainingBatches(batches, (batch) => milestoneNumber(batch) <= 7 && !["POST_LAUNCH", "POST_REVENUE"].includes(batch.delivery_horizon));
  const category = countRemainingBatches(batches, (batch) => batch.milestone === "M8" && batch.delivery_horizon !== "POST_REVENUE");
  const postLaunch = countRemainingBatches(batches, (batch) => batch.delivery_horizon === "POST_LAUNCH");
  const postRevenue = countRemainingBatches(batches, (batch) => batch.delivery_horizon === "POST_REVENUE");
  const workItemsPerBatch = batches.map((batch) => (batch.work_item_ids || []).length);
  const largestBatchSize = workItemsPerBatch.length ? Math.max(...workItemsPerBatch) : 0;
  const averageWorkItemsPerBatch = workItemsPerBatch.length
    ? Number((workItemsPerBatch.reduce((sum, value) => sum + value, 0) / workItemsPerBatch.length).toFixed(2))
    : 0;
  return {
    generated_from: LEDGER_PATH,
    detailed_work_items: {
      total: detailed.length,
      completed: detailed.filter(isDone).length,
      remaining: detailed.filter((task) => !isDone(task)).length
    },
    execution_batches: {
      total: batches.length,
      completed: batches.filter(isDone).length,
      in_review: batches.filter((batch) => batch.status === "IN_REVIEW").length,
      not_yet_issued: remainingBatches.filter((batch) => !isBatchIssued(batch)).length,
      immediately_executable: batches.filter((batch) => isExecutionReadyBatch(batch, ledger)).length,
      by_status: batchStatus,
      average_work_items_per_batch: averageWorkItemsPerBatch,
      largest_batch_size: largestBatchSize,
      batches_with_more_than_five_work_items: batches.filter((batch) => (batch.work_item_ids || []).length > 5).map((batch) => batch.id),
      batches_with_more_than_eight_work_items: batches.filter((batch) => (batch.work_item_ids || []).length > 8).map((batch) => batch.id)
    },
    remaining_batches: {
      before_community_publication: beforeCommunity.batches,
      before_pro_technical_completion: beforeProTechnical.batches,
      before_pro_first_sale: beforeProSale.batches,
      before_global_launch: beforeGlobalLaunch.batches,
      category_building: category.batches,
      post_launch: postLaunch.batches,
      post_revenue: postRevenue.batches
    },
    remaining_batches_not_yet_issued: {
      before_community_publication: beforeCommunity.not_yet_issued,
      before_pro_technical_completion: beforeProTechnical.not_yet_issued,
      before_pro_first_sale: beforeProSale.not_yet_issued,
      before_global_launch: beforeGlobalLaunch.not_yet_issued,
      category_building: category.not_yet_issued,
      post_launch: postLaunch.not_yet_issued,
      post_revenue: postRevenue.not_yet_issued
    },
    capacity: {
      community_days_at_5_per_day: ceilDays(beforeCommunity.not_yet_issued, 5),
      community_days_at_6_per_day: ceilDays(beforeCommunity.not_yet_issued, 6),
      pro_technical_days_at_5_per_day: ceilDays(beforeProTechnical.not_yet_issued, 5),
      pro_technical_days_at_6_per_day: ceilDays(beforeProTechnical.not_yet_issued, 6),
      first_sale_days_at_5_per_day: ceilDays(beforeProSale.not_yet_issued, 5),
      first_sale_days_at_6_per_day: ceilDays(beforeProSale.not_yet_issued, 6),
      global_launch_days_at_5_per_day: ceilDays(beforeGlobalLaunch.not_yet_issued, 5),
      global_launch_days_at_6_per_day: ceilDays(beforeGlobalLaunch.not_yet_issued, 6)
    },
    unplanned_correction_prompts: "not knowable in advance"
  };
}

export function selectNextAction(ledger) {
  const tasks = taskMap(ledger);
  const inReviewBatch = (ledger.execution_batches || []).find((batch) => batch.status === "IN_REVIEW");
  if (inReviewBatch) {
    return {
      kind: "batch",
      batch: inReviewBatch,
      action_owner: "JEASON",
      action_type: "REVIEW_OR_MERGE",
      summary: `Human review and merge decision for ${inReviewBatch.pr_title}.`
    };
  }
  for (const task of ledger.tasks) {
    if (blockingStatuses.includes(task.status) && taskDependenciesDone(task, tasks)) {
      return { kind: "task", task, action_owner: task.owner, action_type: task.status, summary: task.objective };
    }
  }
  const readyBatch = (ledger.execution_batches || []).find((batch) => isExecutionReadyBatch(batch, ledger));
  if (readyBatch) return { kind: "batch", batch: readyBatch, action_owner: readyBatch.owner, action_type: "READY", summary: readyBatch.objective };
  const specificationBatch = (ledger.execution_batches || []).find((batch) => isSpecificationRefinementCandidate(batch, ledger));
  if (specificationBatch) {
    return {
      kind: "batch",
      batch: specificationBatch,
      action_owner: specificationBatch.owner,
      action_type: "SPECIFICATION_REFINEMENT_REQUIRED",
      summary: `Refine ${specificationBatch.id} to EXECUTION_READY before generating a Codex prompt.`
    };
  }
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

function batchLabel(batch) {
  return `${batch.id} - ${batch.title}`;
}

function nextActionText(next) {
  if (!next) return "No next action is available.";
  if (next.kind === "batch") {
    return [
      `Batch ID: ${next.batch.id}`,
      `Title: ${next.batch.title}`,
      `Action owner: ${next.action_owner}`,
      `Action type: ${next.action_type}`,
      `Status: ${next.batch.status}`,
      `Specification: ${next.batch.spec_status}`,
      `Objective:\n${next.batch.objective}`,
      "",
      `Work items:\n${linesFor(next.batch.work_item_ids)}`,
      "",
      `Required evidence:\n${linesFor(next.batch.required_evidence)}`,
      "",
      `Manual actions:\n${linesFor(next.batch.manual_actions)}`,
      "",
      `Authorized external actions:\n${linesFor(next.batch.authorized_actions)}`,
      "",
      `Forbidden actions:\n${linesFor(next.batch.forbidden_actions)}`
    ].join("\n");
  }
  return [
    `Task ID: ${next.task.id}`,
    `Title: ${next.task.title}`,
    `Action owner: ${next.action_owner}`,
    `Action type: ${next.action_type}`,
    `Status: ${next.task.status}`,
    `Objective:\n${next.task.objective}`,
    "",
    `Required evidence:\n${linesFor(next.task.required_evidence)}`,
    "",
    `Manual actions:\n${linesFor(next.task.manual_actions)}`
  ].join("\n");
}

function promptForBatch(batch, ledger) {
  const tasks = taskMap(ledger);
  const items = (batch.work_item_ids || []).map((id) => tasks.get(id)).filter(Boolean);
  return [
    `Repository: BACOUL/timeproofs`,
    `Base: timeproofs`,
    `Batch ID: ${batch.id}`,
    `Work item IDs: ${batch.work_item_ids.join(", ")}`,
    `Owner: ${batch.owner}`,
    `Milestone: ${batch.milestone}`,
    `Horizon: ${batch.delivery_horizon}`,
    `Objective: ${batch.objective}`,
    `Branch: ${batch.branch}`,
    `PR title: ${batch.pr_title}`,
    "",
    `Documents sources:`,
    linesFor([...new Set(items.flatMap((item) => item.source_documents || []))]),
    "",
    `Dependencies:`,
    linesFor([...(batch.depends_on_batches || []), ...(batch.depends_on_tasks || [])]),
    "",
    `Deliverables:`,
    linesFor(batch.deliverables),
    "",
    `Routes or surfaces:`,
    linesFor([...new Set(items.flatMap((item) => item.estimated_files_or_surfaces || item.deliverables || []))]),
    "",
    `Allowed paths:`,
    linesFor(batch.allowed_paths),
    "",
    `Forbidden paths:`,
    linesFor(batch.forbidden_paths),
    "",
    `Acceptance criteria by work item:`,
    linesFor(items.map((item) => `${item.id}: ${(item.acceptance_criteria || []).join("; ")}`)),
    "",
    `Batch acceptance criteria:`,
    linesFor(batch.acceptance_criteria),
    "",
    `Commands:`,
    linesFor(batch.required_commands),
    "",
    `Independent test plan:`,
    linesFor(batch.independent_test_plan),
    "",
    `Required evidence:`,
    linesFor(batch.required_evidence),
    "",
    `Rollback: ${batch.rollback_boundary}`,
    "",
    `Manual actions:`,
    linesFor(batch.manual_actions),
    "",
    `Authorized external actions:`,
    linesFor(batch.authorized_actions),
    "",
    batch.codex_preflight_steps?.length ? [
      `## Étape Codex préalable`,
      "",
      linesFor(batch.codex_preflight_steps),
      ""
    ].join("\n") : "",
    batch.owner_checkpoint_steps?.length ? [
      `## Point de contrôle propriétaire obligatoire`,
      "",
      linesFor(batch.owner_checkpoint_steps),
      ""
    ].join("\n") : "",
    batch.post_confirmation_steps?.length ? [
      `## Après confirmation npm`,
      "",
      linesFor(batch.post_confirmation_steps),
      ""
    ].join("\n") : "",
    `External verifications:`,
    linesFor(batch.external_verifications),
    "",
    batch.forbidden_actions?.length
      ? [`Forbidden actions:`, linesFor(batch.forbidden_actions)].join("\n")
      : `Interdictions: stay strictly inside the batch scope, do not publish, do not create tags or releases, and do not merge the PR.`,
    "",
    `Response format: summarize files changed, validations, workflow status, draft status, and any remaining human review.`
  ].join("\n");
}

export function generatedContents(ledger) {
  const counts = promptCounts(ledger);
  const next = selectNextAction(ledger);
  const global = progress(ledger.tasks);
  const coverageStats = documentCoverageStats(ledger);
  const batches = ledger.execution_batches || [];
  const tasks = taskMap(ledger);
  const externalUsersRequired = tasks.get("AR-MARKET-001A")?.validation_thresholds?.external_community_users_required ?? 0;
  const paymentSignalsRequired = tasks.get("AR-MARKET-001B")?.validation_thresholds?.explicit_pro_payment_signals_required ?? 0;
  const externalSalesRequired = tasks.get("AR-MARKET-001C")?.validation_thresholds?.external_pro_sales_required ?? 0;
  const valueCasesRequired = tasks.get("AR-MARKET-001D")?.validation_thresholds?.credible_public_value_cases_required ?? 0;
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
    "## Execution Batches",
    ...batches.flatMap((batch) => [
      `### ${batchLabel(batch)}`,
      `- Status: ${batch.status}`,
      `- Spec status: ${batch.spec_status}`,
      `- Owner: ${batch.owner}`,
      `- Milestone: ${batch.milestone}`,
      `- Horizon: ${batch.delivery_horizon}`,
      `- Work items: ${batch.work_item_ids.join(", ")}`,
      `- Depends on batches: ${batch.depends_on_batches.length ? batch.depends_on_batches.join(", ") : "None"}`,
      `- Depends on tasks: ${batch.depends_on_tasks.length ? batch.depends_on_tasks.join(", ") : "None"}`,
      `- Branch: ${batch.branch || "None"}`,
      `- PR title: ${batch.pr_title || "None"}`,
      batch.pr_number ? `- PR: #${batch.pr_number}` : "",
      "Deliverables:",
      linesFor(batch.deliverables),
      "Acceptance criteria:",
      linesFor(batch.acceptance_criteria),
      "Required evidence:",
      linesFor(batch.required_evidence),
      ""
    ]),
    "## Detailed Tasks",
    ...ledger.tasks.flatMap((t) => [
      `### ${t.id} - ${t.title}`,
      `- Type: ${t.task_type}`,
      `- Status: ${t.status}`,
      `- Owner: ${t.owner}`,
      `- Milestone: ${t.milestone}`,
      `- Horizon: ${t.delivery_horizon}`,
      `- Workstream: ${t.workstream}`,
      `- Weight: ${t.weight}`,
      `- Execution batch: ${t.execution_batch_id || "None"}`,
      `- Depends on: ${t.depends_on.length ? t.depends_on.join(", ") : "None"}`,
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
    `- Next action: ${next ? (next.kind === "batch" ? `${next.batch.id} - ${next.batch.title}` : `${next.task.id} - ${next.task.title}`) : "None"}`,
    "",
    "## Detailed Work Items",
    `Total detailed Codex work items: ${counts.detailed_work_items.total}`,
    `Completed detailed Codex work items: ${counts.detailed_work_items.completed}`,
    `Remaining detailed Codex work items: ${counts.detailed_work_items.remaining}`,
    "",
    "## Execution Batches",
    `Total planned Codex execution batches: ${counts.execution_batches.total}`,
    `Completed Codex execution batches: ${counts.execution_batches.completed}`,
    `Execution batches currently in review: ${counts.execution_batches.in_review}`,
    `Execution batches not yet issued: ${counts.execution_batches.not_yet_issued}`,
    `Immediately executable Codex prompts: ${counts.execution_batches.immediately_executable}`,
    `Average work items per batch: ${counts.execution_batches.average_work_items_per_batch}`,
    `Largest batch size: ${counts.execution_batches.largest_batch_size}`,
    `Batches with more than five work items: ${counts.execution_batches.batches_with_more_than_five_work_items.length}`,
    `Batches with more than eight work items: ${counts.execution_batches.batches_with_more_than_eight_work_items.length}`,
    "",
    "## Execution Batches By Objective",
    `Execution batches remaining before Community publicly usable: ${counts.remaining_batches.before_community_publication}`,
    `Execution batches remaining before Pro technically complete: ${counts.remaining_batches.before_pro_technical_completion}`,
    `Execution batches remaining before first Pro sale: ${counts.remaining_batches.before_pro_first_sale}`,
    `Execution batches remaining before global launch: ${counts.remaining_batches.before_global_launch}`,
    `Execution batches for category-building: ${counts.remaining_batches.category_building}`,
    `Execution batches post-launch: ${counts.remaining_batches.post_launch}`,
    `Execution batches post-revenue: ${counts.remaining_batches.post_revenue}`,
    "",
    "## Prompt Day Capacity",
    `Community days at 5 prompts/day: ${counts.capacity.community_days_at_5_per_day}`,
    `Community days at 6 prompts/day: ${counts.capacity.community_days_at_6_per_day}`,
    `Pro technical days at 5 prompts/day: ${counts.capacity.pro_technical_days_at_5_per_day}`,
    `Pro technical days at 6 prompts/day: ${counts.capacity.pro_technical_days_at_6_per_day}`,
    `First-sale days at 5 prompts/day: ${counts.capacity.first_sale_days_at_5_per_day}`,
    `First-sale days at 6 prompts/day: ${counts.capacity.first_sale_days_at_6_per_day}`,
    `Global-launch days at 5 prompts/day: ${counts.capacity.global_launch_days_at_5_per_day}`,
    `Global-launch days at 6 prompts/day: ${counts.capacity.global_launch_days_at_6_per_day}`,
    "",
    "These figures count planned execution batches only.",
    "They do not include owner, legal, security or external actions, waiting time, human review or unplanned correction prompts.",
    "",
    "## Product Validation Thresholds",
    `External Community users required: ${externalUsersRequired}`,
    `Explicit Pro payment signals required: ${paymentSignalsRequired}`,
    `External Pro sales required: ${externalSalesRequired}`,
    `Credible public value cases required: ${valueCasesRequired}`,
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
    nextActionText(next),
    ""
  ].join("\n");
  const nextPrompt = [
    GENERATED_HEADER,
    "# Next Codex Prompt",
    "",
    next && next.kind === "batch" && isExecutionReadyBatch(next.batch, ledger)
      ? promptForBatch(next.batch, ledger)
      : `No CODEX execution batch is currently authorized.\n\nThe current next action belongs to:\n${next ? `${next.action_owner} - ${next.kind === "batch" ? `${next.batch.id} - ${next.batch.title}` : `${next.task.id} - ${next.task.title}`}` : "None"}\n\n${next?.action_type === "SPECIFICATION_REFINEMENT_REQUIRED" ? "The next batch has satisfied dependencies but is not EXECUTION_READY. Its specification must be refined before any executable Codex prompt can be generated." : "Codex prompts are generated from execution batches, not directly from detailed work items. Codex must not start another implementation prompt until the blocking owner, legal, security, design, or external action is complete and the ledger has been reconciled."}`,
    ""
  ].join("\n");
  const ownerTaskRows = ledger.tasks
    .filter((t) => t.owner !== "CODEX" || t.external_verification?.required)
    .map((t) => `| ${t.id} | task | ${t.owner} | ${t.status} | ${t.title} | ${(t.required_evidence || []).join("<br>")} |`)
    .join("\n");
  const ownerBatchRows = batches
    .filter((batch) => batch.owner !== "CODEX")
    .map((batch) => `| ${batch.id} | batch | ${batch.owner} | ${batch.status} | ${batch.title} | ${(batch.required_evidence || []).join("<br>")} |`)
    .join("\n");
  const ownerActions = `${GENERATED_HEADER}\n# Owner And External Actions\n\n| ID | Kind | Owner | Status | Title | Required evidence |\n|---|---|---|---|---|---|\n${[ownerTaskRows, ownerBatchRows].filter(Boolean).join("\n")}\n`;
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
        add((criterion.satisfied_by || []).some((id) => map.get(id)?.task_type !== "CODEX_WORK_ITEM" && map.get(id)?.task_type !== "CODEX_PR"), `${criterion.criterion_id} requires human evidence but has only Codex work items`);
      }
    }
  }
}

function validateCommercialAndBenchmarkGates(ledger, add) {
  const map = taskMap(ledger);
  const m7 = ledger.milestones.find((milestone) => milestone.id === "M7");
  const marketCriterion = (m7?.criteria || []).find((criterion) => criterion.criterion_id === "M7-MARKET-VALIDATION");
  add(marketCriterion, "M7 missing commercial validation criterion");
  const expectedMarketTasks = ["AR-MARKET-001A", "AR-MARKET-001B", "AR-MARKET-001C", "AR-MARKET-001D", "AR-MARKET-001"];
  for (const id of expectedMarketTasks) {
    add(map.has(id), `missing commercial validation gate ${id}`);
    add(marketCriterion?.satisfied_by?.includes(id), `M7-MARKET-VALIDATION does not include ${id}`);
    add(map.get(id)?.task_type === "DECISION_GATE", `${id} must be a DECISION_GATE`);
    add(!isCodexWorkItem(map.get(id) || {}), `${id} must not be counted as a Codex prompt`);
  }
  const users = map.get("AR-MARKET-001A");
  add((users?.validation_thresholds?.external_community_users_required || 0) >= 10, "external Community user threshold must be at least ten");
  add(users?.validation_thresholds?.excludes_project_accounts === true, "project accounts must not count as external users");
  add(users?.validation_thresholds?.excludes_internal_fixtures === true, "fixtures/internal CI must not count as external users");
  add(users?.validation_thresholds?.requires_real_contract_or_repository === true, "external users must use real contracts, MCP servers, or repositories");
  const payment = map.get("AR-MARKET-001B");
  add((payment?.validation_thresholds?.explicit_pro_payment_signals_required || 0) >= 3, "explicit Pro payment signal threshold must be at least three");
  add(payment?.validation_thresholds?.excludes_generic_interest === true, "generic interest must not count as a payment signal");
  add(payment?.validation_thresholds?.excludes_project_team_responses === true, "project team responses must not count as payment signals");
  const sale = map.get("AR-MARKET-001C");
  add((sale?.validation_thresholds?.external_pro_sales_required || 0) >= 1, "first external Pro sale must be required");
  add(sale?.validation_thresholds?.excludes_internal_test_purchase === true, "internal or test purchases must not count as external Pro sale");
  add(sale?.validation_thresholds?.requires_payment_collected === true, "first external Pro sale must require collected payment");
  add(sale?.validation_thresholds?.requires_entitlement_delivered === true, "first external Pro sale must require delivered entitlement");
  const valueCase = map.get("AR-MARKET-001D");
  add((valueCase?.validation_thresholds?.credible_public_value_cases_required || 0) >= 1, "credible public value case must be required");
  add(valueCase?.validation_thresholds?.prohibits_invented_case === true, "public value case must not be invented");
  add(valueCase?.validation_thresholds?.prohibits_safety_guarantee === true, "public value case must not imply guaranteed safety");
  const aggregate = map.get("AR-MARKET-001");
  for (const id of ["AR-MARKET-001A", "AR-MARKET-001B", "AR-MARKET-001C", "AR-MARKET-001D"]) {
    add((aggregate?.depends_on || []).includes(id), `commercial aggregate gate must depend on ${id}`);
  }
  add((map.get("AR-LAUNCH-001")?.depends_on || []).includes("AR-MARKET-001"), "global launch audit must depend on aggregate commercial validation");
  const thresholdGate = map.get("AR-ENG-001T");
  add(thresholdGate?.task_type === "DECISION_GATE", "benchmark threshold gate must be a DECISION_GATE");
  add(thresholdGate?.owner === "CODEX_AND_JEASON", "benchmark threshold gate must be owned by CODEX_AND_JEASON");
  add(thresholdGate?.validation_thresholds?.must_be_defined_before_final_results === true, "benchmark thresholds must be frozen before final results");
  const requiredMetrics = thresholdGate?.validation_thresholds?.required_metrics || [];
  for (const metric of ["precision", "recall", "false_positive_rate", "false_negative_rate", "performance", "reproducibility", "ambiguous_case_behavior"]) {
    add(requiredMetrics.includes(metric), `benchmark threshold gate missing ${metric}`);
  }
  add((map.get("AR-ENG-002")?.depends_on || []).includes("AR-ENG-001T"), "benchmark metric calculation must depend on frozen thresholds");
  add((map.get("AR-ENG-005")?.depends_on || []).includes("AR-ENG-001T"), "final benchmark report must depend on frozen thresholds");
}

function validateBatches(ledger, add) {
  const tasks = taskMap(ledger);
  const batches = batchMap(ledger);
  add(Array.isArray(ledger.execution_batches), "execution_batches is absent");
  const taskToBatches = new Map();
  for (const batch of ledger.execution_batches || []) {
    add(batch.id, "batch missing id");
    add(allowed.batch_status.includes(batch.status), `${batch.id} invalid status`);
    add(allowed.spec_status.includes(batch.spec_status), `${batch.id} invalid spec_status`);
    add(allowed.owner.includes(batch.owner), `${batch.id} invalid owner`);
    add(batch.work_item_ids?.length, `${batch.id} has no work items`);
    add(batch.branch, `${batch.id} missing branch`);
    add(batch.pr_title, `${batch.id} missing PR title`);
    add(batch.rollback_boundary, `${batch.id} missing rollback boundary`);
    add(batch.independent_test_plan?.length, `${batch.id} missing tests`);
    add(batch.required_evidence?.length, `${batch.id} missing required evidence`);
    add(batch.deliverables?.length, `${batch.id} missing deliverables`);
    add(batch.acceptance_criteria?.length, `${batch.id} missing acceptance criteria`);
    add(batch.required_commands?.length, `${batch.id} missing commands`);
    if (batch.status === "DONE") add(batch.evidence?.length, `${batch.id} DONE without evidence`);
    if (batch.status === "IN_REVIEW") add(batch.pr_number, `${batch.id} IN_REVIEW without PR number`);
    if (batch.status === "READY") {
      add(batch.spec_status === "EXECUTION_READY", `${batch.id} READY but not EXECUTION_READY`);
      for (const dep of batch.depends_on_tasks || []) add(isDependencySatisfied(tasks.get(dep)), `${batch.id} READY but task dependency ${dep} is not satisfied`);
      for (const dep of batch.depends_on_batches || []) add(batches.get(dep)?.status === "DONE", `${batch.id} READY but batch dependency ${dep} is not DONE`);
    }
    add((batch.work_item_ids || []).length <= 8 || (batch.scope_justification || "").includes("exceeds eight"), `${batch.id} exceeds eight work items without justification`);
    const batchTasks = (batch.work_item_ids || []).map((id) => tasks.get(id)).filter(Boolean);
    add(batchTasks.length === (batch.work_item_ids || []).length, `${batch.id} references an unknown work item`);
    const milestones = new Set(batchTasks.map((task) => task.milestone));
    const horizons = new Set(batchTasks.map((task) => task.delivery_horizon));
    const workstreams = new Set(batchTasks.map((task) => task.workstream));
    add(milestones.size <= 1, `${batch.id} combines multiple milestones`);
    add(horizons.size <= 1, `${batch.id} combines incompatible horizons`);
    add(workstreams.size <= 1 || (batch.scope_justification || "").includes("compatible workstreams"), `${batch.id} combines incompatible workstreams`);
    for (const task of batchTasks) {
      add(["CODEX_WORK_ITEM", "CODEX_PR"].includes(task.task_type), `${batch.id} contains non-Codex work item ${task.id}`);
      taskToBatches.set(task.id, [...(taskToBatches.get(task.id) || []), batch.id]);
      add(task.execution_batch_id === batch.id, `${task.id} does not reciprocally reference ${batch.id}`);
    }
  }
  for (const task of ledger.tasks.filter(isCodexWorkItem)) {
    add(task.execution_batch_id, `${task.id} is not linked to an execution batch`);
    add(batches.has(task.execution_batch_id), `${task.id} references unknown batch ${task.execution_batch_id}`);
    const refs = taskToBatches.get(task.id) || [];
    add(refs.length === 1, `${task.id} appears in ${refs.length} execution batches`);
  }
}

export function validateLedger(ledger, compareGenerated = true) {
  const errors = [];
  const add = (condition, message) => { if (!condition) errors.push(message); };
  const map = taskMap(ledger);
  const ids = new Set();
  add(ledger.schema_version === "1.2", "schema_version must be 1.2");
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
    if (task.status === "READY") for (const dep of task.depends_on || []) add(isDependencySatisfied(map.get(dep)), `${task.id} READY but ${dep} is not satisfied`);
    if (task.status === "IN_REVIEW") add(task.pr_number, `${task.id} IN_REVIEW without PR number`);
    if (isCodexWorkItem(task)) {
      for (const key of ["deliverables", "estimated_files_or_surfaces", "independent_test_plan"]) add(Array.isArray(task[key]) && task[key].length, `${task.id} Codex work item missing ${key}`);
      add(task.rollback_boundary, `${task.id} Codex work item missing rollback boundary`);
      add(task.scope_justification, `${task.id} Codex work item missing scope justification`);
      if (task.weight === 5) add(task.scope_justification.includes("Weight 5"), `${task.id} weight 5 lacks explicit justification`);
    } else {
      add(!task.branch, `${task.id} non-Codex task must not have branch`);
    }
    if (task.task_type === "CODEX_PR") {
      add(task.pr_number, `${task.id} CODEX_PR must be historical or in review and have a PR number`);
      add(task.branch, `${task.id} CODEX_PR missing branch`);
      add(task.pr_title, `${task.id} CODEX_PR missing PR title`);
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
  validateBatches(ledger, add);
  add(selectNextAction(ledger), "no next action");
  const next = selectNextAction(ledger);
  if (next?.kind === "task") {
    for (const dep of next.task.depends_on || []) add(map.get(dep)?.status === "DONE", `${next.task.id} selected before dependency ${dep} is DONE`);
  }
  const tarballApproval = map.get("AR-COM-005");
  if (next?.kind === "task" && next.task.id === "AR-COM-005") {
    for (const dep of ["AR-COM-003", "AR-COM-004"]) add(map.get(dep)?.status === "DONE", "AR-COM-005 selected before license and ProofSpec dependencies are DONE");
  }
  const publish = map.get("AR-COM-006");
  if (publish?.status === "READY") for (const blocker of ["AR-COM-001", "AR-COM-002", "AR-COM-003", "AR-COM-004", "AR-COM-005", "AR-COM-006A"]) add(map.get(blocker)?.status === "DONE", `publish READY while ${blocker} is not DONE`);
  const communityPublishBatch = (ledger.execution_batches || []).find((batch) => batch.id === "ARB-COM-001");
  if (communityPublishBatch?.status === "READY") {
    const manualActions = communityPublishBatch.manual_actions || [];
    const authorizedActions = communityPublishBatch.authorized_actions || [];
    const forbiddenActions = communityPublishBatch.forbidden_actions || [];
    const prompt = generatedContents(ledger)[generatedPaths.nextPrompt] || "";
    add(communityPublishBatch.owner === "CODEX_AND_JEASON", "ARB-COM-001 must be owned by CODEX_AND_JEASON");
    add(manualActions.length > 0, "ARB-COM-001 must contain manual action evidence");
    add(!manualActions.includes("None"), "ARB-COM-001 must not say Manual actions: None");
    add(manualActions.some((item) => item.includes("ACCEPT_TEMPORARILY") && item.includes("latest")), "ARB-COM-001 missing JEASON documented latest decision");
    add(!authorizedActions.some((item) => item.includes("npm publish")), "ARB-COM-001 must not authorize another npm publish");
    add(authorizedActions.some((item) => item.includes("v0.1.0-alpha.0") && item.includes("150da23932c1fb9433cb3d546904f03c18c909e9")), "ARB-COM-001 missing authorized immutable tag target");
    add(forbiddenActions.some((item) => item.includes("latest")), "ARB-COM-001 must forbid latest");
    add(forbiddenActions.some((item) => item.includes("another package version")), "ARB-COM-001 must forbid another version");
    add(forbiddenActions.some((item) => item.includes("rebuild, modify or replace the approved tarball")), "ARB-COM-001 must forbid tarball modification");
    add(forbiddenActions.some((item) => item.includes("new npm operation")), "ARB-COM-001 must forbid new npm operations");
    add(forbiddenActions.some((item) => item.includes("manual npm tokens")), "ARB-COM-001 must forbid manual npm token creation");
    add(forbiddenActions.some((item) => item.includes("NPM_TOKEN") && item.includes("NODE_AUTH_TOKEN")), "ARB-COM-001 must forbid automation and CI npm tokens");
    add(forbiddenActions.some((item) => item.includes("password") && item.includes("2FA code") && item.includes("recovery code")), "ARB-COM-001 must forbid receiving or storing npm secrets and 2FA codes");
    add(forbiddenActions.some((item) => item.includes("any commit other than 150da23932c1fb9433cb3d546904f03c18c909e9")), "ARB-COM-001 must forbid tagging any commit except approved source commit");
    add(!prompt.includes("do not publish, do not create tags or releases"), "ARB-COM-001 prompt contains contradictory generic publication ban");
    add(prompt.includes("CODEX_AND_JEASON"), "ARB-COM-001 prompt must contain CODEX_AND_JEASON");
    add(prompt.includes("ACCEPT_TEMPORARILY"), "ARB-COM-001 prompt must contain owner latest decision");
    add(prompt.includes("602799c5dd20ada03f2ee5e27048bacd865a71654e1c09f8119a484c837da6fe"), "ARB-COM-001 prompt missing approved tarball SHA-256");
    add(prompt.includes("150da23932c1fb9433cb3d546904f03c18c909e9"), "ARB-COM-001 prompt missing approved source commit");
    add(prompt.includes("alpha"), "ARB-COM-001 prompt missing alpha dist-tag");
    add(prompt.includes("v0.1.0-alpha.0"), "ARB-COM-001 prompt missing immutable tag");
    add(prompt.includes("latest") && prompt.includes("temporarily accepted"), "ARB-COM-001 prompt missing latest documented exception");
    add(prompt.includes("do not perform any new npm operation"), "ARB-COM-001 prompt missing new npm operation prohibition");
    add(!prompt.includes("npm login --auth-type=web"), "ARB-COM-001 prompt must not request npm login after publication");
    add(prompt.includes("NPM_TOKEN") && prompt.includes("NODE_AUTH_TOKEN"), "ARB-COM-001 prompt missing automation token prohibition");
    add(prompt.includes("never communicates the 2FA code") || prompt.includes("do not request, receive, print or store a password, 2FA code or recovery code"), "ARB-COM-001 prompt must forbid sharing 2FA");
  }
  for (const task of ledger.tasks.filter((t) => t.workstream === "PRO" && t.status === "READY")) add(map.get("AR-ENG-005")?.status === "DONE", `${task.id} Pro READY before final benchmark`);
  for (const required of ["AR-BILL-001", "AR-BILL-002", "AR-BILL-003", "AR-BILL-004", "AR-BILL-005", "AR-BILL-006", "AR-BILL-007", "AR-BILL-008", "AR-BILL-009", "AR-BILL-010", "AR-BILL-011", "AR-BILL-012", "AR-BILL-013", "AR-FIN-001", "AR-BILL-014"]) add(map.has(required), `missing explicit billing/customer lifecycle task ${required}`);
  for (const required of ["AR-LIC-001", "AR-LIC-002", "AR-LIC-003", "AR-LIC-004", "AR-LIC-005", "AR-LIC-006", "AR-LIC-007", "AR-LIC-008"]) add(map.has(required), `missing explicit licensing task ${required}`);
  for (const required of ["AR-ENG-001", "AR-ENG-001H", "AR-ENG-002", "AR-ENG-003", "AR-ENG-004", "AR-ENG-005"]) add(map.has(required), `missing benchmark task ${required}`);
  add(map.get("AR-ENG-001H")?.task_type !== "CODEX_WORK_ITEM" && map.get("AR-ENG-001H")?.task_type !== "CODEX_PR" && map.get("AR-ENG-001H")?.owner !== "CODEX", "human annotation task must not be exclusively Codex");
  add(map.has("AR-SEC-001") && map.has("AR-SEC-002") && map.has("AR-SEC-003") && map.has("AR-SEC-004"), "security review remediation mechanism is incomplete");
  validateMilestoneCriteria(ledger, add);
  validateCommercialAndBenchmarkGates(ledger, add);
  validateActiveDocumentCoverage(ledger, add);
  const counts = promptCounts(ledger);
  const detailed = ledger.tasks.filter((t) => isCodexWorkItem(t) && t.status !== "REJECTED");
  const batches = (ledger.execution_batches || []).filter((batch) => batch.status !== "REJECTED");
  add(counts.detailed_work_items.total === detailed.length, "detailed work item total mismatch");
  add(counts.execution_batches.total === batches.length, "execution batch total mismatch");
  add(counts.execution_batches.immediately_executable === batches.filter((batch) => isExecutionReadyBatch(batch, ledger)).length, "immediately executable prompt count mismatch");
  add(counts.remaining_batches.before_pro_first_sale === batches.filter((batch) => !isDone(batch) && !["POST_LAUNCH", "POST_REVENUE"].includes(batch.delivery_horizon) && milestoneNumber(batch) <= 6).length, "first sale batch count includes wrong batches");
  const governanceBatch = (ledger.execution_batches || []).find((batch) => batch.id === "ARB-GOV-003");
  add(Boolean(governanceBatch), "PR #115 governance batch must exist");
  if (governanceBatch) {
    const reconciled = governanceBatch.status === "DONE"
      && (governanceBatch.evidence || []).some((entry) => entry.type === "merge" && entry.pr === 115 && entry.merge_sha);
    add(governanceBatch.status === "IN_REVIEW" || reconciled, "PR #115 batch must be IN_REVIEW or DONE with merge evidence");
  }
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

export function reconcileBatch({ batchId, pr, mergeSha, write = false }) {
  const ledger = readLedger();
  const batches = batchMap(ledger);
  const tasks = taskMap(ledger);
  const batch = batches.get(batchId);
  if (!batch) throw new Error(`Unknown batch: ${batchId}`);
  if (!["IN_REVIEW", "MERGED_PENDING_EVIDENCE"].includes(batch.status)) throw new Error(`${batchId} must be IN_REVIEW or MERGED_PENDING_EVIDENCE`);
  if (!mergeSha) throw new Error("merge SHA is required");
  batch.pr_number = Number(pr);
  batch.status = "DONE";
  batch.evidence = [...(batch.evidence || []), { type: "merge", pr: Number(pr), merge_sha: mergeSha }];
  for (const id of batch.work_item_ids || []) {
    const task = tasks.get(id);
    if (!task) continue;
    const satisfied = (task.acceptance_criteria || []).length && (task.required_evidence || []).length;
    if (satisfied && ["IN_REVIEW", "MERGED_PENDING_EVIDENCE", "PLANNED", "BLOCKED"].includes(task.status)) {
      task.pr_number = Number(pr);
      task.status = "DONE";
      task.evidence = [...(task.evidence || []), { type: "merge", pr: Number(pr), merge_sha: mergeSha }];
    }
  }
  if (write) {
    writeLedger(ledger);
    writeGeneratedViews(ledger);
  }
  return { ledger, next: selectNextAction(ledger) };
}
