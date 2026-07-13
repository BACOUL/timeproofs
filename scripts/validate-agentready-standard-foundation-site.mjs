import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();

const pages = [
  "agentready-standard.html",
  "agentready-rule-codes.html",
  "agentready-json.html",
  "agentready-examples.html",
  "agentready-resources.html",
  "agentready-sample-report.html"
];

const ruleCodes = [
  "AR001_UNBOUNDED_WRITE_ACTION",
  "AR002_MISSING_CONFIRMATION_BOUNDARY",
  "AR003_DESTRUCTIVE_OPERATION_AMBIGUOUS",
  "AR004_BULK_ACTION_WITHOUT_LIMIT",
  "AR005_SENSITIVE_DATA_EXPOSURE",
  "AR006_MISSING_DRY_RUN_OR_PREVIEW",
  "AR007_OVERBROAD_TOOL_SCOPE",
  "AR008_MISSING_IDEMPOTENCY_OR_ROLLBACK",
  "AR009_UNCLEAR_AGENT_INSTRUCTIONS",
  "AR010_MISSING_RATE_OR_SCOPE_LIMIT"
];

const requiredEvidence = [
  "SITE_GLOBAL_STANDARD_FOUNDATION_EVIDENCE.md",
  "evidence/site-global-standard-foundation/example-provenance.json",
  "evidence/site-global-standard-foundation/cta-link-report.json",
  "evidence/site-global-standard-foundation/keyboard-focus-report.json",
  "evidence/site-global-standard-foundation/no-javascript-report.json",
  "evidence/site-global-standard-foundation/overflow-320-report.json"
];

const requiredScreenshots = [
  "evidence/site-global-standard-foundation/desktop/agentready-standard.html.png",
  "evidence/site-global-standard-foundation/desktop/agentready-rule-codes.html.png",
  "evidence/site-global-standard-foundation/desktop/agentready-json.html.png",
  "evidence/site-global-standard-foundation/desktop/agentready-examples.html.png",
  "evidence/site-global-standard-foundation/desktop/agentready-resources.html.png",
  "evidence/site-global-standard-foundation/desktop/agentready-sample-report.html.png",
  "evidence/site-global-standard-foundation/mobile/agentready-standard.html.png",
  "evidence/site-global-standard-foundation/mobile/agentready-rule-codes.html.png",
  "evidence/site-global-standard-foundation/mobile/agentready-json.html.png",
  "evidence/site-global-standard-foundation/mobile/agentready-examples.html.png",
  "evidence/site-global-standard-foundation/mobile/agentready-resources.html.png",
  "evidence/site-global-standard-foundation/mobile/agentready-sample-report.html.png",
  "evidence/site-global-standard-foundation/nojs/agentready-standard.html.png",
  "evidence/site-global-standard-foundation/nojs/agentready-rule-codes.html.png"
];

const limitation =
  "TimeProofs AgentReady does not guarantee that an AI agent will never fail. It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.";

function fail(message) {
  console.error(`AgentReady standard foundation site validation failed: ${message}`);
  process.exit(1);
}

function read(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8").replace(/\r\n/g, "\n");
}

function assertIncludes(file, text) {
  if (!read(file).includes(text)) fail(`${file} is missing expected text: ${text}`);
}

function assertNotIncludes(file, text) {
  if (read(file).includes(text)) fail(`${file} contains forbidden text: ${text}`);
}

function localPathFromHref(href) {
  if (!href || href.startsWith("#") || href.startsWith("mailto:")) return null;
  if (/^https?:\/\//.test(href)) return null;
  const clean = href.split("#")[0].split("?")[0];
  if (!clean || clean === "/") return "index.html";
  return clean.replace(/^\/+/, "");
}

for (const page of pages) {
  if (!existsSync(path.join(repoRoot, page))) fail(`${page} is missing`);
  const html = read(page);
  if (!html.includes('href="/assets/site-nav.css"')) fail(`${page} does not load shared navigation CSS`);
  if (!html.includes('href="/assets/agentready-product.css"')) fail(`${page} does not load product CSS`);
  if (!html.includes('href="/assets/agentready-standard.css"')) fail(`${page} does not load standard CSS`);
  if (!html.includes('src="/assets/site-nav.js"')) fail(`${page} does not load shared navigation JS`);
  if (!/<main\b[^>]*\bid=["']main["']/i.test(html)) fail(`${page} does not expose main#main`);
  if (!/<meta[^>]+name=["']robots["'][^>]+content=["']index,follow["']/i.test(html)) fail(`${page} is not indexable`);
  if (!/<link rel="canonical" href="https:\/\/timeproofs\.io\//.test(html)) fail(`${page} is missing canonical metadata`);
  if (!html.includes(limitation)) fail(`${page} is missing the mandatory limitation`);
  for (const href of [...html.matchAll(/\s(?:href|src)=["']([^"']+)["']/g)].map((match) => match[1])) {
    const local = localPathFromHref(href);
    if (local && !existsSync(path.join(repoRoot, local))) fail(`${page} references missing local destination ${href}`);
  }
}

const allHtml = pages.map(read).join("\n");
for (const code of ruleCodes) {
  if (!read("agentready-rule-codes.html").includes(code)) fail(`rule catalogue is missing ${code}`);
  if (!read("docs/agentready/SITE_GLOBAL_STANDARD_FOUNDATION_EVIDENCE.md").includes(code)) fail(`evidence is missing ${code}`);
}

for (const text of [
  "static readiness gate",
  "pre-deployment static analysis",
  "Not a runtime firewall",
  "Not a security certification",
  "No live execution",
  "agentready.json v0.1",
  '"agentready_version": "0.1"',
  "min-score",
  "fail-on",
  "Exit code",
  "PASS",
  "FAIL",
  "100/100 score or PASS result is not a proof of complete safety",
  "engine version",
  "ruleset version",
  "AgentReady schema version",
  "policy version",
  "source protocol",
  "input hash",
  "scan date",
  "Reference implementation",
  "Governance and namespace",
  "OpenAPI and MCP"
]) {
  if (!allHtml.includes(text)) fail(`standard pages are missing required concept: ${text}`);
}

for (const text of [
  "AgentReady Certified",
  "Certificate of Compliance",
  "Guaranteed AI Safe",
  "recognized international standard",
  "formal standards-body recognition",
  "scientifically validated",
  "customer case study",
  "benchmark result",
  "hosted scanner required"
]) {
  for (const page of pages) assertNotIncludes(page, text);
}

for (const [file, required] of [
  ["agentready-examples.html", "agentready-examples/commercial/openapi-refund-risk.bad.json"],
  ["agentready-examples.html", "Score: 54/100"],
  ["agentready-examples.html", "Score: 84/100"],
  ["agentready-examples.html", "Score: 63/100"],
  ["agentready-examples.html", "Score: 90/100"],
  ["agentready-sample-report.html", "AR002_MISSING_CONFIRMATION_BOUNDARY"],
  ["agentready-sample-report.html", "Policy: FAIL"]
]) {
  assertIncludes(file, required);
}

const sitemap = read("sitemap.xml");
for (const page of pages) {
  if (!sitemap.includes(`https://timeproofs.io/${page}`)) fail(`sitemap.xml is missing ${page}`);
}

for (const evidencePath of [...requiredEvidence, ...requiredScreenshots]) {
  const fullPath = path.join(repoRoot, "docs", "agentready", evidencePath);
  if (!existsSync(fullPath)) fail(`expected evidence is missing: ${evidencePath}`);
  if (statSync(fullPath).size === 0) fail(`expected evidence is empty: ${evidencePath}`);
}

const provenance = JSON.parse(read("docs/agentready/evidence/site-global-standard-foundation/example-provenance.json"));
if (provenance.status !== "PASS") fail("example provenance status is not PASS");
if (provenance.results.openapiBad.exitCode !== 1) fail("OpenAPI bad fixture should fail policy");
if (provenance.results.openapiFixed.exitCode !== 0) fail("OpenAPI fixed fixture should pass policy");
if (provenance.results.mcpBad.exitCode !== 1) fail("MCP bad fixture should fail policy");
if (provenance.results.mcpFixed.exitCode !== 0) fail("MCP fixed fixture should pass policy");

console.log("AgentReady standard foundation site validation: PASS");
