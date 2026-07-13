import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();

const pages = [
  "about.html",
  "trust.html",
  "security.html",
  "responsible-disclosure.html",
  "privacy.html",
  "terms.html",
  "legal.html",
  "limitations.html",
  "agentready-data-flow.html",
  "support.html"
];

const mandatoryLimitation =
  "TimeProofs AgentReady does not guarantee that an AI agent will never fail. It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.";

const requiredEvidence = [
  "SITE_GLOBAL_TRUST_LEGAL_FOUNDATION_EVIDENCE.md",
  "evidence/site-global-trust-legal-foundation/cta-link-report.json",
  "evidence/site-global-trust-legal-foundation/keyboard-focus-report.json",
  "evidence/site-global-trust-legal-foundation/no-javascript-report.json",
  "evidence/site-global-trust-legal-foundation/overflow-320-report.json",
  "evidence/site-global-trust-legal-foundation/source-inventory.json",
  "evidence/site-global-trust-legal-foundation/data-flow-matrix.json"
];

const screenshotPrefixes = ["desktop", "mobile", "nojs"];

function fail(message) {
  console.error(`AgentReady trust/legal foundation site validation failed: ${message}`);
  process.exit(1);
}

function read(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8").replace(/\r\n/g, "\n");
}

function localPathFromHref(href) {
  if (!href || href.startsWith("#") || href.startsWith("mailto:")) return null;
  if (/^https?:\/\//.test(href)) return null;
  const clean = href.split("#")[0].split("?")[0];
  if (!clean || clean === "/") return "index.html";
  return clean.replace(/^\/+/, "");
}

function assertIncludes(file, text) {
  if (!read(file).includes(text)) fail(`${file} is missing required text: ${text}`);
}

function assertNotIncludes(file, text) {
  if (read(file).includes(text)) fail(`${file} contains forbidden text: ${text}`);
}

for (const page of pages) {
  const fullPath = path.join(repoRoot, page);
  if (!existsSync(fullPath)) fail(`${page} is missing`);
  const html = read(page);
  if (!html.includes('href="/assets/site-nav.css"')) fail(`${page} does not load shared navigation CSS`);
  if (!html.includes('href="/assets/agentready-product.css"')) fail(`${page} does not load product CSS`);
  if (!html.includes('href="/assets/agentready-standard.css"')) fail(`${page} does not load standard CSS`);
  if (!html.includes('href="/assets/agentready-trust.css"')) fail(`${page} does not load trust CSS`);
  if (!html.includes('src="/assets/site-nav.js"')) fail(`${page} does not load shared navigation JS`);
  if (!/<main\b[^>]*\bid=["']main["']/i.test(html)) fail(`${page} does not expose main#main`);
  if (!/<meta[^>]+name=["']robots["'][^>]+content=["']index,follow["']/i.test(html)) fail(`${page} is not indexable`);
  if (!/<link rel="canonical" href="https:\/\/timeproofs\.io\//.test(html)) fail(`${page} is missing canonical metadata`);
  if (!html.includes(mandatoryLimitation)) fail(`${page} is missing the mandatory limitation`);
  if (!html.includes('href="/trust.html"')) fail(`${page} does not link the Trust Center`);
  if (!html.includes('href="/security.html"')) fail(`${page} does not link Security`);
  if (!html.includes('href="/privacy.html"')) fail(`${page} does not link Privacy`);
  if (!html.includes('href="/legal.html"')) fail(`${page} does not link Legal notice`);
  for (const href of [...html.matchAll(/\s(?:href|src)=["']([^"']+)["']/g)].map((match) => match[1])) {
    const local = localPathFromHref(href);
    if (local && !existsSync(path.join(repoRoot, local))) fail(`${page} references missing local destination ${href}`);
  }
}

const allHtml = pages.map(read).join("\n");
for (const required of [
  "TO_BE_COMPLETED",
  "OWNER_VERIFICATION_REQUIRED",
  "Jeason Alexandre Bacoul",
  "Entrepreneur individuel, France",
  "999356439",
  "3 rue de l'Église de Louppy, 55000 Les Hauts-de-Chée, France",
  "Franchise en base de TVA",
  "contact@certif-scope.com",
  "Vercel Inc.",
  "440 N Barranca Ave #4133, Covina, CA 91723, United States",
  "public business telephone",
  "No response time",
  "Community is available for free",
  "Pro is planned",
  "not purchasable",
  "static analysis",
  "not a runtime firewall",
  "not legal advice",
  "not a security certification",
  "No account",
  "No hosted scanner",
  "No response time",
  "Vercel",
  "GitHub",
  "npm",
  "@timeproofs/agentready"
]) {
  if (!allHtml.includes(required)) fail(`trust/legal pages are missing required concept: ${required}`);
}

for (const forbidden of [
  "hello@timeproofs.io",
  "contact@timeproofs.io",
  "mailto:",
  "our registered office is",
  "we employ",
  "trusted by",
  "customer logo",
  "covered by insurance",
  "independently audited",
  "certified safe",
  "guaranteed agent safety",
  "has formal standards-body recognition",
  "zero data collection",
  "24/7 support",
  "response time guarantee",
  "service level agreement",
  "commercial support is available",
  "Pro is available for purchase"
]) {
  if (allHtml.includes(forbidden)) fail(`trust/legal pages contain forbidden claim: ${forbidden}`);
}

assertIncludes("responsible-disclosure.html", "contact@certif-scope.com");
assertIncludes("responsible-disclosure.html", "No response time, bounty, SLA, guaranteed fix or certification is promised");
assertIncludes("privacy.html", "do not require uploading");
assertIncludes("privacy.html", "Jeason Alexandre Bacoul, TimeProofs, entrepreneur individuel");
assertIncludes("privacy.html", "contact@certif-scope.com");
assertIncludes("legal.html", "Jeason Alexandre Bacoul");
assertIncludes("legal.html", "SIREN");
assertIncludes("legal.html", "999356439");
assertIncludes("legal.html", "Public business telephone");
assertIncludes("agentready-data-flow.html", "Data-flow matrix");
assertIncludes("support.html", "No SLA promised");

const sitemap = read("sitemap.xml");
for (const page of pages) {
  if (!sitemap.includes(`https://timeproofs.io/${page}`)) fail(`sitemap.xml is missing ${page}`);
}

const css = read("assets/agentready-trust.css");
for (const token of ["@media (max-width: 520px)", ":focus-visible", "overflow-x: auto", "letter-spacing: 0"]) {
  if (!css.includes(token)) fail(`trust CSS is missing ${token}`);
}

for (const evidencePath of requiredEvidence) {
  const fullPath = path.join(repoRoot, "docs", "agentready", evidencePath);
  if (!existsSync(fullPath)) fail(`expected evidence is missing: ${evidencePath}`);
  if (statSync(fullPath).size === 0) fail(`expected evidence is empty: ${evidencePath}`);
}

for (const prefix of screenshotPrefixes) {
  for (const page of pages) {
    const evidencePath = path.join(
      repoRoot,
      "docs",
      "agentready",
      "evidence",
      "site-global-trust-legal-foundation",
      prefix,
      `${page}.png`
    );
    if (!existsSync(evidencePath)) fail(`expected ${prefix} screenshot is missing for ${page}`);
    if (statSync(evidencePath).size === 0) fail(`expected ${prefix} screenshot is empty for ${page}`);
  }
}

const ctaReport = JSON.parse(read("docs/agentready/evidence/site-global-trust-legal-foundation/cta-link-report.json"));
if (ctaReport.status !== "PASS") fail("CTA report is not PASS");
if (!ctaReport.routes.every((route) => route.brokenLinks.length === 0)) fail("CTA report contains broken links");

const overflowReport = JSON.parse(read("docs/agentready/evidence/site-global-trust-legal-foundation/overflow-320-report.json"));
if (overflowReport.status !== "PASS") fail("320px overflow report is not PASS");
if (!overflowReport.routes.every((route) => route.overflow === false)) fail("320px overflow report contains an overflowing route");

const noJsReport = JSON.parse(read("docs/agentready/evidence/site-global-trust-legal-foundation/no-javascript-report.json"));
if (noJsReport.status !== "PASS") fail("no-JavaScript report is not PASS");

const sourceInventory = JSON.parse(read("docs/agentready/evidence/site-global-trust-legal-foundation/source-inventory.json"));
if (sourceInventory.status !== "PASS_WITH_BLOCKERS") fail("source inventory must preserve missing-fact blockers");
if (sourceInventory.ownerSuppliedPublisherFacts?.operator !== "Jeason Alexandre Bacoul") fail("owner-supplied operator fact is missing");
if (sourceInventory.ownerSuppliedPublisherFacts?.publicContact !== "contact@certif-scope.com") fail("owner-supplied public contact is missing");
if (sourceInventory.verifiedHostingFacts?.provider !== "Vercel Inc.") fail("verified hosting provider is missing");
if (!sourceInventory.missingLegalFacts.includes("public business telephone number")) fail("missing public business telephone blocker is absent");
if (!sourceInventory.missingLegalFacts.includes("hosting telephone number")) fail("missing hosting telephone blocker is absent");
if (sourceInventory.missingLegalFacts.includes("publisher legal identity")) fail("publisher legal identity must no longer be listed as missing");
if (sourceInventory.missingLegalFacts.includes("public contact address")) fail("public contact address must no longer be listed as missing");

console.log("AgentReady trust/legal foundation site validation: PASS");
