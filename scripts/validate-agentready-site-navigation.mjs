import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();

const activePages = [
  "index.html",
  "product.html",
  "community.html",
  "pro.html",
  "agentready.html",
  "agentready-mcp.html",
  "agentready-ci.html",
  "agentready-docs.html",
  "agentready-examples.html",
  "agentready-json.html",
  "agentready-rule-codes.html",
  "agentready-resources.html",
  "agentready-sample-report.html",
  "agentready-standard.html",
  "agentready-simulation.html",
  "ai-agent-tool-risk-checklist.html",
  "mcp-server-readiness.html",
  "openapi-ai-agent-readiness.html",
  "pricing.html",
  "legal.html",
  "privacy.html",
  "terms.html"
];

const excludedPages = [
  "404.html",
  "agentready-engine-gate.html",
  "agentready-openapi-upload-test.html",
  "agentready-test.html",
  "dpa.html"
];

const requiredLabels = [
  "Product",
  "Resources",
  "Pricing",
  "Trust",
  "GitHub",
  "Scan a contract",
  "OpenAPI Scanner",
  "MCP Scanner",
  "GitHub CI Gate",
  "Reports and agentready.json",
  "Documentation",
  "Examples",
  "AgentReady rules",
  "Methodology",
  "Changelog",
  "Product",
  "Standard",
  "Developers",
  "Trust"
];

const forbiddenSiteText = [
  "€149",
  "149 €",
  "€499",
  "499 €",
  "Fix Pack",
  "paid manual review",
  "Request review by email",
  "payment by email",
  "certified safe",
  "guaranteed agent safety",
  "guarantees agent safety"
];

const mandatoryLimitation =
  "TimeProofs AgentReady does not guarantee that an AI agent will never fail. It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.";

const expectedEvidence = [
  "baseline-index-desktop.png",
  "baseline-index-mobile-open.png",
  "baseline-ci-desktop.png",
  "baseline-ci-mobile-open.png",
  "after-index-desktop.png",
  "after-index-mobile-closed-320.png",
  "after-index-mobile-open-320.png",
  "after-ci-desktop.png",
  "after-ci-mobile-open-375.png"
];

function read(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8").replace(/\r\n/g, "\n");
}

function fail(message) {
  console.error(`AgentReady site navigation validation failed: ${message}`);
  process.exit(1);
}

function count(text, pattern) {
  return (text.match(pattern) || []).length;
}

function localPathFromHref(href) {
  if (!href || href.startsWith("#") || href.startsWith("mailto:")) return null;
  if (/^https?:\/\//.test(href)) return null;
  const clean = href.split("#")[0].split("?")[0];
  if (!clean || clean === "/") return "index.html";
  return clean.replace(/^\/+/, "");
}

function assertLocalLinks(page, html) {
  const hrefs = [...html.matchAll(/\s(?:href|src)=["']([^"']+)["']/g)].map((match) => match[1]);
  for (const href of hrefs) {
    const local = localPathFromHref(href);
    if (!local) continue;
    if (!existsSync(path.join(repoRoot, local))) fail(`${page} references missing local destination ${href}`);
  }
}

for (const page of activePages) {
  const html = read(page);
  if (!/<meta[^>]+name=["']robots["'][^>]+content=["']index,follow["']/i.test(html)) {
    fail(`${page} is not marked as index,follow`);
  }
  if (!html.includes('href="/assets/site-nav.css"')) fail(`${page} does not load the shared shell CSS`);
  if (!html.includes('src="/assets/site-nav.js"')) fail(`${page} does not load the shared shell JavaScript`);
  if (count(html, /class=["'][^"']*\bar-shell\b/gi) !== 1) fail(`${page} must have exactly one shared header shell`);
  if (count(html, /class=["'][^"']*\bar-footer\b/gi) !== 1) fail(`${page} must have exactly one shared footer shell`);
  if (!/<main\b[^>]*\bid=["']main["']/i.test(html)) fail(`${page} main element must expose id="main" for skip navigation`);
  if (/class=["'][^"']*\bnav-links\b/i.test(html)) fail(`${page} still contains legacy nav-links markup`);
  if (/class=["'][^"']*\bsite-menu-toggle\b/i.test(html)) fail(`${page} still contains legacy injected menu markup`);
  for (const label of requiredLabels) {
    if (!html.includes(label)) fail(`${page} is missing shared shell label: ${label}`);
  }
  for (const text of forbiddenSiteText) {
    if (html.includes(text)) fail(`${page} contains stale or forbidden copy: ${text}`);
  }
  if (["index.html", "product.html", "community.html", "pro.html", "agentready.html", "agentready-mcp.html", "agentready-ci.html", "agentready-docs.html", "agentready-json.html", "pricing.html", "terms.html"].includes(page) && !html.includes(mandatoryLimitation)) {
    fail(`${page} is missing the mandatory limitation text`);
  }
  assertLocalLinks(page, html);
}

for (const page of excludedPages) {
  if (!existsSync(path.join(repoRoot, page))) fail(`excluded page ${page} no longer exists`);
}

const shellSample = read("index.html").match(/<header[\s\S]*?<\/header>/i)?.[0]
  .replace(/\s+aria-current="page"/g, "")
  .replace(/\s+/g, " ")
  .trim();
for (const page of activePages.slice(1)) {
  const header = read(page).match(/<header[\s\S]*?<\/header>/i)?.[0]
    .replace(/\s+aria-current="page"/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (header !== shellSample) fail(`${page} header shell differs from index.html`);
}

const css = read("assets/site-nav.css");
for (const token of ["prefers-reduced-motion", ":focus-visible", ".ar-footer__groups", ".ar-mobile-panel", "overflow: hidden"]) {
  if (!css.includes(token)) fail(`shared CSS is missing ${token}`);
}

const js = read("assets/site-nav.js");
for (const token of ["Escape", "focus", "ar-nav-open", "aria-expanded", "closeOnOutsideClick"]) {
  if (!js.includes(token)) fail(`shared JS is missing ${token}`);
}

const evidenceDir = path.join(repoRoot, "docs", "agentready", "evidence", "site-premium-foundation");
for (const file of expectedEvidence) {
  const fullPath = path.join(evidenceDir, file);
  if (!existsSync(fullPath) || statSync(fullPath).size === 0) fail(`expected visual evidence is missing: ${file}`);
}

const evidence = read("docs/agentready/SITE_PREMIUM_FOUNDATION_EVIDENCE.md");
for (const marker of [
  "Status: OWNER VISUAL REVIEW REQUIRED",
  "Link validation: PASS",
  "320px no-overflow: PASS",
  "Keyboard and focus: PASS",
  "No-JS critical links: PASS",
  "Reduced-motion: PASS"
]) {
  if (!evidence.includes(marker)) fail(`evidence document is missing marker: ${marker}`);
}

console.log("AgentReady site navigation validation: PASS");
