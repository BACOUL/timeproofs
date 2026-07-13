import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();

const pages = [
  "index.html",
  "product.html",
  "agentready.html",
  "agentready-mcp.html",
  "agentready-ci.html",
  "agentready-docs.html",
  "community.html",
  "pro.html",
  "pricing.html"
];

const requiredRoutes = [
  "product.html",
  "community.html",
  "pro.html",
  "agentready.html",
  "agentready-mcp.html",
  "agentready-ci.html",
  "agentready-docs.html",
  "pricing.html"
];

const limitation =
  "TimeProofs AgentReady does not guarantee that an AI agent will never fail. It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.";

function fail(message) {
  console.error(`AgentReady global product site validation failed: ${message}`);
  process.exit(1);
}

function read(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8").replace(/\r\n/g, "\n");
}

function assertIncludes(file, text) {
  const html = read(file);
  if (!html.includes(text)) fail(`${file} is missing expected text: ${text}`);
}

function assertNotIncludes(file, text) {
  const html = read(file);
  if (html.includes(text)) fail(`${file} contains forbidden text: ${text}`);
}

for (const page of pages) {
  if (!existsSync(path.join(repoRoot, page))) fail(`${page} is missing`);
  const html = read(page);
  if (!html.includes('href="/assets/agentready-product.css"')) fail(`${page} does not load product CSS`);
  if (!/<h1\b/i.test(html)) fail(`${page} is missing an h1`);
  if (!/<link rel="canonical" href="https:\/\/timeproofs\.io\//.test(html)) fail(`${page} is missing canonical metadata`);
}

for (const route of requiredRoutes) {
  const expected = `href="/${route}"`;
  if (!read("index.html").includes(expected) && !read("product.html").includes(expected)) {
    fail(`global routes do not expose ${route}`);
  }
}

for (const file of ["index.html", "product.html", "agentready.html", "agentready-mcp.html", "agentready-ci.html", "agentready-docs.html", "community.html", "pro.html", "pricing.html"]) {
  assertIncludes(file, limitation);
}

for (const file of ["pricing.html", "pro.html"]) {
  assertIncludes(file, "24 EUR");
  assertIncludes(file, "240 EUR");
  assertIncludes(file, "excluding tax");
  assertIncludes(file, "not purchasable");
  assertNotIncludes(file, "Buy now");
  assertNotIncludes(file, "Checkout");
  assertNotIncludes(file, "Start checkout");
}

assertIncludes("community.html", "Community is available now");
assertIncludes("community.html", "npx @timeproofs/agentready@alpha --help");
assertIncludes("pricing.html", "0 EUR");
assertIncludes("pricing.html", "No signup required");

for (const [file, fixture, score] of [
  ["index.html", "agentready-examples/commercial/openapi-refund-risk.bad.json", "54"],
  ["product.html", "agentready-examples/commercial/openapi-refund-risk.bad.json", "54"],
  ["product.html", "agentready-examples/commercial/mcp-email-risk.bad.json", "63"],
  ["agentready.html", "agentready-examples/commercial/openapi-refund-risk.bad.json", "54"],
  ["agentready-mcp.html", "agentready-examples/commercial/mcp-email-risk.bad.json", "63"]
]) {
  assertIncludes(file, fixture);
  assertIncludes(file, score);
}

for (const [file, id] of [
  ["agentready.html", 'id="fileInput"'],
  ["agentready.html", 'id="scanButton"'],
  ["agentready.html", 'id="downloadJsonButton"'],
  ["agentready-mcp.html", 'id="fileInput"'],
  ["agentready-mcp.html", 'id="scanButton"'],
  ["agentready-mcp.html", 'id="downloadJsonButton"']
]) {
  assertIncludes(file, id);
}

assertIncludes("agentready-ci.html", "BACOUL/timeproofs@agentready-action-v0.1.0-alpha.0");
assertIncludes("agentready-ci.html", "BACOUL/timeproofs@d6634d0fbbe1fced510fc49d8871d52a3dc7f348");
assertIncludes("agentready-ci.html", "contents: read");
assertIncludes("agentready-ci.html", "score");
assertIncludes("agentready-ci.html", "report-path");
assertIncludes("agentready-ci.html", "agentready.json");

for (const file of pages) {
  for (const forbidden of [
    "certified safe",
    "guaranteed agent safety",
    "guarantees agent safety",
    "scientifically validated",
    "recognized international standard",
    "is a runtime firewall",
    "runtime firewall for",
    "hosted scanner required"
  ]) {
    assertNotIncludes(file, forbidden);
  }
}

const sitemap = read("sitemap.xml");
for (const route of ["product.html", "community.html", "pro.html"]) {
  if (!sitemap.includes(`https://timeproofs.io/${route}`)) fail(`sitemap.xml is missing ${route}`);
}

console.log("AgentReady global product site validation: PASS");
