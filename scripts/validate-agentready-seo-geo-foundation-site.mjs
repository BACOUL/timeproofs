import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();

const pages = [
  "index.html",
  "product.html",
  "community.html",
  "pro.html",
  "pricing.html",
  "agentready.html",
  "agentready-mcp.html",
  "agentready-ci.html",
  "agentready-docs.html",
  "agentready-cli.html",
  "agentready-action.html",
  "agentready-adoption.html",
  "agentready-contributing.html",
  "agentready-troubleshooting.html",
  "agentready-standard.html",
  "agentready-rule-codes.html",
  "agentready-json.html",
  "agentready-examples.html",
  "agentready-resources.html",
  "agentready-sample-report.html",
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

const evidenceRoot = "docs/agentready/evidence/site-global-discovery-foundation";
const evidenceFiles = [
  "docs/agentready/SITE_GLOBAL_DISCOVERY_FOUNDATION_EVIDENCE.md",
  `${evidenceRoot}/source-inventory.json`,
  `${evidenceRoot}/route-metadata-matrix.json`,
  `${evidenceRoot}/sitemap-robots-audit.json`,
  `${evidenceRoot}/json-ld-audit.json`,
  `${evidenceRoot}/ai-answer-inventory.json`,
  `${evidenceRoot}/primary-source-map.json`,
  `${evidenceRoot}/author-version-date-audit.json`,
  `${evidenceRoot}/entity-naming-audit.json`,
  `${evidenceRoot}/international-route-policy.json`,
  `${evidenceRoot}/hreflang-audit.json`,
  `${evidenceRoot}/doorway-thin-fake-localization-audit.json`,
  `${evidenceRoot}/unsupported-claims-audit.json`,
  `${evidenceRoot}/cta-link-report.json`,
  `${evidenceRoot}/keyboard-focus-report.json`,
  `${evidenceRoot}/no-javascript-report.json`,
  `${evidenceRoot}/overflow-320-report.json`
];

const requiredAnswerSnippets = [
  "AgentReady is a product and candidate open standard",
  "static pre-deployment analysis",
  "It is not a runtime firewall",
  "independent certification",
  "official standards-body standard",
  "guaranteed-safety system",
  "AgentReady Community is free and available",
  "AgentReady Pro is planned and not purchasable",
  "English is the current canonical language"
];

const forbiddenClaimFragments = [
  "trusted by",
  "customer logo",
  "benchmark validated",
  "certified safe",
  "guaranteed agent safety",
  "official global standard",
  "independently certified"
];

function fail(message) {
  console.error(`AgentReady SEO/GEO foundation site validation failed: ${message}`);
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

function canonicalFor(page) {
  return page === "index.html" ? "https://timeproofs.io/" : `https://timeproofs.io/${page}`;
}

function jsonLdFrom(html, page) {
  const match = html.match(/<script type="application\/ld\+json" data-agentready-structured-data>([\s\S]*?)<\/script>/);
  if (!match) fail(`${page} is missing canonical AgentReady JSON-LD`);
  try {
    return JSON.parse(match[1]);
  } catch (error) {
    fail(`${page} has invalid JSON-LD: ${error.message}`);
  }
}

function assertStatusPass(relativePath) {
  const data = JSON.parse(read(relativePath));
  if (data.status !== "PASS") fail(`${relativePath} status is not PASS`);
  return data;
}

const titles = new Set();
const descriptions = new Set();

for (const page of pages) {
  const fullPath = path.join(repoRoot, page);
  if (!existsSync(fullPath)) fail(`${page} is missing`);
  const html = read(page);

  if (!/<html[^>]+lang="en"/i.test(html)) fail(`${page} is not marked lang="en"`);
  if (!/<meta[^>]+name="robots"[^>]+content="index,follow"/i.test(html)) fail(`${page} is not index,follow`);
  if (!html.includes('href="/assets/agentready-discovery.css"')) fail(`${page} does not load discovery CSS`);
  if (!html.includes('name="agentready:reviewed-date" content="2026-07-14"')) fail(`${page} is missing reviewed-date metadata`);
  if (!html.includes('name="agentready:canonical-language" content="en"')) fail(`${page} is missing canonical-language metadata`);
  if (!html.includes("English canonical; no translated alternate route is currently published.")) {
    fail(`${page} is missing translation-status metadata`);
  }
  if (!html.includes('name="agentready:primary-source"')) fail(`${page} is missing primary-source metadata`);
  if (!html.includes('property="og:title"')) fail(`${page} is missing Open Graph title`);
  if (!html.includes('name="twitter:card" content="summary"')) fail(`${page} is missing Twitter card metadata`);

  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim();
  if (!title) fail(`${page} is missing title`);
  if (titles.has(title)) fail(`duplicate title found: ${title}`);
  titles.add(title);

  const description = html.match(/<meta name="description" content="([^"]+)"/i)?.[1]?.trim();
  if (!description) fail(`${page} is missing description`);
  if (description.length < 70 || description.length > 220) fail(`${page} description length is outside expected range`);
  if (descriptions.has(description)) fail(`duplicate description found: ${description}`);
  descriptions.add(description);

  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];
  if (canonical !== canonicalFor(page)) fail(`${page} has incorrect canonical URL: ${canonical}`);
  if ((html.match(/<h1\b/gi) || []).length !== 1) fail(`${page} must have exactly one h1`);
  if (!/<main\b[^>]*\bid=["']main["']/i.test(html)) fail(`${page} does not expose main#main`);

  const answer = html.match(/<section class="ar-discovery-answer"[\s\S]*?<\/section>/i)?.[0] || "";
  if (!answer) fail(`${page} is missing extractible discovery answer`);
  for (const snippet of requiredAnswerSnippets) {
    if (!answer.includes(snippet)) fail(`${page} discovery answer is missing: ${snippet}`);
  }
  if (!answer.includes("ar-discovery-sources") || (answer.match(/<a\b/g) || []).length < 2) {
    fail(`${page} discovery answer has too few source links`);
  }

  const ld = jsonLdFrom(html, page);
  if (ld["@context"] !== "https://schema.org") fail(`${page} JSON-LD has wrong context`);
  const types = Array.isArray(ld["@type"]) ? ld["@type"] : [ld["@type"]];
  if (!types.includes("WebPage")) fail(`${page} JSON-LD must include WebPage`);
  if (ld.url !== canonicalFor(page)) fail(`${page} JSON-LD URL does not match canonical`);
  if (ld.inLanguage !== "en") fail(`${page} JSON-LD language is not en`);
  if (ld.dateModified !== "2026-07-14") fail(`${page} JSON-LD dateModified is incorrect`);
  if (!Array.isArray(ld.citation) || ld.citation.length < 2) fail(`${page} JSON-LD needs citations`);
  if (JSON.stringify(ld).match(/"aggregateRating"|"reviewRating"|"ratingValue"|"bestRating"|"review"/i)) {
    fail(`${page} JSON-LD contains unsupported rating or review data`);
  }

  if (/rel=["']alternate["'][^>]+hreflang=/i.test(html)) fail(`${page} emits hreflang without a real translated route`);
  if (/href=["']\/fr\//i.test(html)) fail(`${page} links to a fake French route`);

  const lower = html.toLowerCase();
  for (const forbidden of forbiddenClaimFragments) {
    if (lower.includes(forbidden)) fail(`${page} contains unsupported claim fragment: ${forbidden}`);
  }

  for (const href of [...html.matchAll(/\s(?:href|src)=["']([^"']+)["']/g)].map((match) => match[1])) {
    const local = localPathFromHref(href);
    if (local && !existsSync(path.join(repoRoot, local))) fail(`${page} references missing local destination ${href}`);
  }
}

const sitemap = read("sitemap.xml");
for (const page of pages) {
  if (!sitemap.includes(canonicalFor(page))) fail(`sitemap.xml is missing ${page}`);
}
if (sitemap.includes("timeproofs.io/fr/")) fail("sitemap.xml contains fake French route");
if (sitemap.includes("vercel.app")) fail("sitemap.xml contains preview URL");
if (!sitemap.includes("<lastmod>2026-07-14</lastmod>")) fail("sitemap.xml is missing discovery lastmod");

const robots = read("robots.txt");
if (!robots.includes("Sitemap: https://timeproofs.io/sitemap.xml")) fail("robots.txt is missing sitemap");
if (!robots.includes("English is canonical")) fail("robots.txt is missing internationalization note");
if (!robots.includes("fake-localized")) fail("robots.txt is missing fake-localized route guard");

const css = read("assets/agentready-discovery.css");
for (const token of [
  ".ar-discovery-answer",
  "overflow-wrap: anywhere",
  "@media (max-width: 680px)",
  ":focus-visible",
  "letter-spacing: 0"
]) {
  if (!css.includes(token)) fail(`discovery CSS is missing ${token}`);
}

for (const evidencePath of evidenceFiles) {
  const fullPath = path.join(repoRoot, evidencePath);
  if (!existsSync(fullPath)) fail(`expected evidence is missing: ${evidencePath}`);
  if (statSync(fullPath).size === 0) fail(`expected evidence is empty: ${evidencePath}`);
}

for (const evidencePath of [
  `${evidenceRoot}/source-inventory.json`,
  `${evidenceRoot}/route-metadata-matrix.json`,
  `${evidenceRoot}/sitemap-robots-audit.json`,
  `${evidenceRoot}/json-ld-audit.json`,
  `${evidenceRoot}/ai-answer-inventory.json`,
  `${evidenceRoot}/primary-source-map.json`,
  `${evidenceRoot}/author-version-date-audit.json`,
  `${evidenceRoot}/entity-naming-audit.json`,
  `${evidenceRoot}/international-route-policy.json`,
  `${evidenceRoot}/hreflang-audit.json`,
  `${evidenceRoot}/doorway-thin-fake-localization-audit.json`,
  `${evidenceRoot}/unsupported-claims-audit.json`,
  `${evidenceRoot}/cta-link-report.json`,
  `${evidenceRoot}/keyboard-focus-report.json`,
  `${evidenceRoot}/no-javascript-report.json`,
  `${evidenceRoot}/overflow-320-report.json`
]) {
  assertStatusPass(evidencePath);
}

const routeMatrix = assertStatusPass(`${evidenceRoot}/route-metadata-matrix.json`);
if (routeMatrix.routes.length !== pages.length) fail("route metadata matrix has wrong route count");
if (!routeMatrix.routes.every((route) => route.indexable && route.h1_count === 1 && route.language === "en")) {
  fail("route metadata matrix contains non-indexable, non-English or invalid h1 route");
}

const jsonLdAudit = assertStatusPass(`${evidenceRoot}/json-ld-audit.json`);
if (!jsonLdAudit.routes.every((route) => route.citation_count >= 2 && route.forbidden_claims_present === false)) {
  fail("JSON-LD audit contains missing citations or forbidden claims");
}

const aiAnswerAudit = assertStatusPass(`${evidenceRoot}/ai-answer-inventory.json`);
if (!aiAnswerAudit.routes.every((route) => route.contains_static_analysis && route.contains_candidate_open_standard && route.contains_no_runtime_firewall && route.contains_community_free && route.contains_pro_planned)) {
  fail("AI-answer inventory is missing required extractible concepts");
}

const hreflangAudit = assertStatusPass(`${evidenceRoot}/hreflang-audit.json`);
if (!hreflangAudit.routes.every((route) => route.hreflang_links === 0)) fail("hreflang audit found alternates without translations");

const unsupportedClaims = assertStatusPass(`${evidenceRoot}/unsupported-claims-audit.json`);
if (unsupportedClaims.findings.length !== 0) fail("unsupported-claims audit has findings");

const ctaReport = assertStatusPass(`${evidenceRoot}/cta-link-report.json`);
if (!ctaReport.routes.every((route) => route.brokenLinks.length === 0)) fail("CTA report contains broken links");

const overflowReport = assertStatusPass(`${evidenceRoot}/overflow-320-report.json`);
if (!overflowReport.routes.every((route) => route.overflow === false)) fail("320px overflow report contains overflow");

const noJsReport = assertStatusPass(`${evidenceRoot}/no-javascript-report.json`);
if (!noJsReport.routes.every((route) => route.has_static_main_content && route.has_discovery_answer_in_html)) {
  fail("no-JavaScript report has missing static route content");
}

for (const prefix of ["desktop", "mobile", "nojs"]) {
  for (const page of pages) {
    const evidencePath = path.join(repoRoot, evidenceRoot, prefix, `${page}.png`);
    if (!existsSync(evidencePath)) fail(`expected ${prefix} screenshot is missing for ${page}`);
    if (statSync(evidencePath).size === 0) fail(`expected ${prefix} screenshot is empty for ${page}`);
  }
}

console.log("AgentReady SEO/GEO foundation site validation: PASS");
