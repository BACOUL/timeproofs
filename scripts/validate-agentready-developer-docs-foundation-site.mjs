import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();

const pages = [
  "agentready-docs.html",
  "agentready.html",
  "agentready-mcp.html",
  "agentready-ci.html",
  "agentready-json.html",
  "agentready-examples.html",
  "agentready-resources.html",
  "agentready-sample-report.html",
  "agentready-cli.html",
  "agentready-action.html",
  "agentready-adoption.html",
  "agentready-contributing.html",
  "agentready-troubleshooting.html"
];

const newPages = [
  "agentready-cli.html",
  "agentready-action.html",
  "agentready-adoption.html",
  "agentready-contributing.html",
  "agentready-troubleshooting.html"
];

const mandatoryLimitation =
  "TimeProofs AgentReady does not guarantee that an AI agent will never fail. It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.";

const evidenceRoot = "docs/agentready/evidence/site-global-developer-docs-foundation";
const requiredEvidence = [
  "docs/agentready/SITE_GLOBAL_DEVELOPER_DOCS_FOUNDATION_EVIDENCE.md",
  `${evidenceRoot}/source-inventory.json`,
  `${evidenceRoot}/example-provenance.json`,
  `${evidenceRoot}/cta-link-report.json`,
  `${evidenceRoot}/keyboard-focus-report.json`,
  `${evidenceRoot}/no-javascript-report.json`,
  `${evidenceRoot}/overflow-320-report.json`
];

function fail(message) {
  console.error(`AgentReady developer docs foundation site validation failed: ${message}`);
  process.exit(1);
}

function read(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8").replace(/\r\n/g, "\n");
}

function assertIncludes(file, text) {
  if (!read(file).includes(text)) fail(`${file} is missing required text: ${text}`);
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
  const fullPath = path.join(repoRoot, page);
  if (!existsSync(fullPath)) fail(`${page} is missing`);
  const html = read(page);
  if (!html.includes('href="/assets/site-nav.css"')) fail(`${page} does not load shared navigation CSS`);
  if (!html.includes('href="/assets/agentready-product.css"')) fail(`${page} does not load product CSS`);
  if (!/<main\b[^>]*\bid=["']main["']/i.test(html)) fail(`${page} does not expose main#main`);
  if (!/<link rel="canonical" href="https:\/\/timeproofs\.io\//.test(html)) fail(`${page} is missing canonical metadata`);
  if (!html.includes(mandatoryLimitation)) fail(`${page} is missing the mandatory limitation`);
  for (const href of [...html.matchAll(/\s(?:href|src)=["']([^"']+)["']/g)].map((match) => match[1])) {
    const local = localPathFromHref(href);
    if (local && !existsSync(path.join(repoRoot, local))) fail(`${page} references missing local destination ${href}`);
  }
}

for (const page of newPages) {
  assertIncludes(page, 'href="/assets/agentready-developer.css"');
  assertIncludes(page, 'src="/assets/site-nav.js"');
}

for (const [file, required] of [
  ["agentready-docs.html", "Developer documentation paths"],
  ["agentready-docs.html", "/agentready-cli.html"],
  ["agentready-docs.html", "/agentready-action.html"],
  ["agentready-docs.html", "/agentready-adoption.html"],
  ["agentready-docs.html", "/agentready-contributing.html"],
  ["agentready-docs.html", "/agentready-troubleshooting.html"],
  ["agentready-cli.html", "@timeproofs/agentready@alpha"],
  ["agentready-cli.html", "0.1.0-alpha.0"],
  ["agentready-cli.html", "Exit code"],
  ["agentready-action.html", "BACOUL/timeproofs@agentready-action-v0.1.0-alpha.0"],
  ["agentready-action.html", "BACOUL/timeproofs@d6634d0fbbe1fced510fc49d8871d52a3dc7f348"],
  ["agentready-action.html", "contents: read"],
  ["agentready-action.html", "score"],
  ["agentready-action.html", "report-path"],
  ["agentready-adoption.html", "No account or upload required for Community"],
  ["agentready-contributing.html", "No response time"],
  ["agentready-troubleshooting.html", "Exit code"],
  ["agentready-troubleshooting.html", "paths with spaces"],
  ["agentready-json.html", "agentready.json"],
  ["agentready-examples.html", "agentready-examples/commercial/openapi-refund-risk.bad.json"],
  ["agentready-examples.html", "Score: 54/100"],
  ["agentready-examples.html", "Score: 90/100"],
  ["agentready-sample-report.html", "Policy: FAIL"]
]) {
  assertIncludes(file, required);
}

const allHtml = pages.map(read).join("\n");
for (const required of [
  "Community is available for free",
  "Pro is planned",
  "not purchasable",
  "static analysis",
  "not a runtime firewall",
  "not a certification",
  "No account",
  "No hosted scanner",
  "OpenAPI",
  "MCP",
  "agentready.json",
  "AR002_MISSING_CONFIRMATION_BOUNDARY",
  "min-score",
  "fail-on",
  "PASS",
  "FAIL"
]) {
  if (!allHtml.includes(required)) fail(`developer docs pages are missing required concept: ${required}`);
}

for (const forbidden of [
  "Pro is available for purchase",
  "Start checkout",
  "guaranteed agent safety",
  "certified safe",
  "recognized international standard",
  "standards body",
  "service level agreement",
  "response time guarantee",
  "trusted by",
  "customer logo",
  "hosted scanner required",
  "upload is required",
  "NPM_TOKEN",
  "NODE_AUTH_TOKEN"
]) {
  if (allHtml.includes(forbidden)) fail(`developer docs pages contain forbidden claim: ${forbidden}`);
}

const sitemap = read("sitemap.xml");
for (const page of pages) {
  if (!sitemap.includes(`https://timeproofs.io/${page}`)) fail(`sitemap.xml is missing ${page}`);
}

const css = read("assets/agentready-developer.css");
for (const token of ["@media (max-width: 520px)", ":focus-visible", "overflow-x: auto", "letter-spacing"]) {
  if (!css.includes(token)) fail(`developer CSS is missing ${token}`);
}

for (const evidencePath of requiredEvidence) {
  const fullPath = path.join(repoRoot, evidencePath);
  if (!existsSync(fullPath)) fail(`expected evidence is missing: ${evidencePath}`);
  if (statSync(fullPath).size === 0) fail(`expected evidence is empty: ${evidencePath}`);
}

for (const prefix of ["desktop", "mobile", "nojs"]) {
  for (const page of pages) {
    const evidencePath = path.join(repoRoot, evidenceRoot, prefix, `${page}.png`);
    if (!existsSync(evidencePath)) fail(`expected ${prefix} screenshot is missing for ${page}`);
    if (statSync(evidencePath).size === 0) fail(`expected ${prefix} screenshot is empty for ${page}`);
  }
}

const provenance = JSON.parse(read(`${evidenceRoot}/example-provenance.json`));
if (provenance.status !== "PASS") fail("example provenance status is not PASS");
if (provenance.results.openapiBad.score !== 54) fail("OpenAPI bad score changed");
if (provenance.results.openapiBad.exitCode !== 1) fail("OpenAPI bad exit code changed");
if (provenance.results.openapiFixed.score !== 84) fail("OpenAPI fixed score changed");
if (provenance.results.openapiFixed.exitCode !== 0) fail("OpenAPI fixed exit code changed");
if (provenance.results.mcpBad.score !== 63) fail("MCP bad score changed");
if (provenance.results.mcpBad.exitCode !== 1) fail("MCP bad exit code changed");
if (provenance.results.mcpFixed.score !== 90) fail("MCP fixed score changed");
if (provenance.results.mcpFixed.exitCode !== 0) fail("MCP fixed exit code changed");

const ctaReport = JSON.parse(read(`${evidenceRoot}/cta-link-report.json`));
if (ctaReport.status !== "PASS") fail("CTA report is not PASS");
if (!ctaReport.routes.every((route) => route.brokenLinks.length === 0)) fail("CTA report contains broken links");

const overflowReport = JSON.parse(read(`${evidenceRoot}/overflow-320-report.json`));
if (overflowReport.status !== "PASS") fail("320px overflow report is not PASS");
if (!overflowReport.routes.every((route) => route.overflow === false)) fail("320px overflow report contains overflow");

const noJsReport = JSON.parse(read(`${evidenceRoot}/no-javascript-report.json`));
if (noJsReport.status !== "PASS") fail("no-JavaScript report is not PASS");

console.log("AgentReady developer docs foundation site validation: PASS");
