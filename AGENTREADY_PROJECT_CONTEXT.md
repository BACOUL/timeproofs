# TimeProofs AgentReady — Project Context & Execution Plan

## Purpose of this file

This file is the durable repo-level context for anyone opening this repository later.

Before modifying the repo, read this file first.

It explains:

- what TimeProofs AgentReady is;
- where the repo currently stands;
- what has already been merged;
- what must not be changed;
- what remains to build;
- the exact A-to-Z roadmap for completing the product.

---

## 1. Product vision

**TimeProofs AgentReady** is a pre-deployment readiness layer for AI-agent tools.

It checks whether an API, MCP server, or tool schema is ready to be safely and clearly exposed to AI agents.

Official product sentence:

> See where AI agents will fail before they use your API or MCP tools.

Internal compass:

> Other companies secure the agent while it acts. TimeProofs prepares the tool before the agent can use it.

The product must answer one clear question:

> Is this tool ready to be used by an AI agent without obvious structural risks?

---

## 2. What TimeProofs AgentReady is not

AgentReady is not:

- an AI runtime firewall;
- an AI security platform in the broad sense;
- an agent observability product;
- an MCP marketplace;
- a generic OpenAPI linter;
- a PDF audit generator only;
- a compliance certification product;
- a replacement for runtime guardrails;
- a proof-of-existence product as the primary promise.

The proof layer remains useful later, but the core product is:

```txt
OpenAPI / MCP / tool schema
→ AgentReady analysis
→ AgentReady Score
→ AgentReady Report
→ agentready.json
```

---

## 3. Current repo status

Repository:

```txt
BACOUL/timeproofs
```

Main working branch:

```txt
timeproofs
```

Current product state:

```txt
TimeProofs legacy proof layer exists.
AgentReady documentation foundation exists.
Initial repo audit exists.
AgentReady static core V1a exists.
AgentReady UI does not exist yet.
YAML support does not exist yet.
PDF export does not exist yet.
MCP scanning does not exist yet.
```

---

## 4. Important merged work

### PR #42 — Product foundation

Merged.

Added the AgentReady V1 product documentation under:

```txt
docs/agentready/
```

Key files:

```txt
docs/agentready/README.md
docs/agentready/TIMEPROOFS_AGENTREADY_MASTER_PLAN.md
docs/agentready/AGENTREADY_ROADMAP.md
docs/agentready/AGENTREADY_SCORE_MODEL.md
docs/agentready/AGENTREADY_RISK_TAXONOMY.md
docs/agentready/AGENTREADY_JSON_SPEC.md
docs/agentready/AGENTREADY_REPORT_TEMPLATE.md
docs/agentready/AGENTREADY_IMPLEMENTATION_CHECKLIST.md
```

### PR #43 — Repo audit

Merged.

Added:

```txt
docs/agentready/REPO_AUDIT_INITIAL.md
```

Main audit conclusion:

> The current repo is a static TimeProofs legacy website, not a Next.js app. AgentReady must be integrated as an isolated static module first.

### PR #44 — Static OpenAPI core scanner

Merged.

Added:

```txt
agentready-core/
agentready-examples/
```

This is the first technical AgentReady core.

It supports OpenAPI JSON V1a and can generate:

```txt
operations
risk findings
AgentReady Score
agentready.json
Markdown report
```

---

## 5. Existing legacy TimeProofs layer

The original TimeProofs product is a proof-of-existence layer.

It includes:

```txt
index.html
verify.html
docs.html
proofspec.html
use-cases.html
regulations.html
security.html
privacy.html
legal.html
about.html
openapi.yaml
sitemap.xml
robots.txt
rss.xml
site.webmanifest
sw.js
humans.txt
pgp.txt
release-v0.1.tproof.json
releases/v0.1.json
assets/
.well-known/security.txt
```

Do not delete or refactor this legacy layer while building AgentReady V1.

---

## 6. Current AgentReady technical core

The V1a core is static JavaScript and lives in:

```txt
agentready-core/
```

Files:

```txt
agentready-core/README.md
agentready-core/types.js
agentready-core/parse-openapi.js
agentready-core/extract-operations.js
agentready-core/classify-action.js
agentready-core/detect-risks.js
agentready-core/score.js
agentready-core/generate-agentready-json.js
agentready-core/report.js
agentready-core/index.js
```

Examples live in:

```txt
agentready-examples/
```

Files:

```txt
agentready-examples/README.md
agentready-examples/valid-simple-openapi.json
agentready-examples/dangerous-actions-openapi.json
```

Current V1a input:

```txt
OpenAPI JSON 3.0 / 3.1
```

Current V1a output:

```txt
summary score/status
operation analysis
risk findings
agentready_json
markdown_report
```

---

## 7. Current limitations

The core currently does not support:

```txt
YAML parsing
browser upload page
PDF export
MCP scanning
agent simulation
CLI
GitHub Action
public benchmark
certification
payments
accounts
dashboard
```

The current YAML behavior is intentional:

```txt
V1a accepts OpenAPI JSON only.
YAML is planned for V1b before declaring V1 complete.
```

---

## 8. Non-negotiable rules

When working in this repo:

1. Do not turn AgentReady into a runtime firewall.
2. Do not position it as a broad AI security platform.
3. Do not rewrite the legacy TimeProofs site unless the task explicitly requires it.
4. Do not introduce Next.js without a specific decision and migration plan.
5. Do not add payments before the scan/report is useful.
6. Do not add MCP before OpenAPI V1 is stable.
7. Do not call external API endpoints from a submitted OpenAPI spec.
8. Do not store user specs by default.
9. Do not expose secrets/tokens from uploaded specs.
10. Do not present AgentReady as a guarantee that agents will never fail.

Mandatory limitation text:

```txt
TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
```

---

## 9. Product architecture target

Short-term architecture must remain static and isolated:

```txt
agentready-core/
agentready-examples/
agentready.html
```

Target V1 static flow:

```txt
User opens /agentready.html
→ uploads OpenAPI JSON/YAML
→ scan runs locally in browser
→ score is displayed
→ risks are displayed
→ report is displayed
→ user downloads agentready.json
→ user downloads Markdown/PDF report later
```

Long-term architecture may become a proper app only when needed:

```txt
accounts
history
team dashboard
API
CLI
GitHub Action
MCP scanner
agent simulation
benchmark
certification
```

---

## 10. Next PRs to build the product from here

### PR #45 — Static upload UI

Goal:

```txt
Create agentready.html
Use agentready-core/index.js
Allow local OpenAPI JSON upload
Show score/status
Show top risks
Show endpoint findings
Export agentready.json
Show markdown report
```

Files likely added:

```txt
agentready.html
```

Possible updates:

```txt
sitemap.xml later only when stable
index.html later only when stable
```

Do not add PDF yet.
Do not add YAML yet unless simple and safe.

---

### PR #46 — YAML support

Goal:

```txt
Support openapi.yaml and openapi.yml
```

Options:

1. Add a small vendored YAML parser file.
2. Add a minimal no-build parser only if sufficient.
3. Introduce a build system only if explicitly approved.

Requirement before V1 complete:

```txt
OpenAPI JSON works.
OpenAPI YAML works.
Invalid YAML is refused cleanly.
```

---

### PR #47 — Report polish and PDF export

Goal:

```txt
Improve human report page.
Add printable report.
Add browser-based PDF export if possible.
```

Acceptable first version:

```txt
Print to PDF via browser
```

Do not add server PDF generation unless a backend/app migration is approved.

---

### PR #48 — Public docs and examples

Goal:

```txt
Add docs page or static documentation section for AgentReady.
Add examples page.
Add sitemap entry only when public page is ready.
```

Possible files:

```txt
agentready-docs.html
agentready-examples.html
```

---

### PR #49 — Test runner / validation harness

Goal:

```txt
Add a simple test harness for examples.
Verify the good fixture scores higher than the dangerous fixture.
Verify dangerous fixture detects critical risks.
```

Because there is currently no package.json, first choice should be a static/manual test page or a no-dependency script if possible.

---

### PR #50 — V1 completeness pass

Goal:

Confirm all V1 acceptance criteria in:

```txt
docs/agentready/AGENTREADY_IMPLEMENTATION_CHECKLIST.md
```

Must validate:

```txt
OpenAPI JSON works
OpenAPI YAML works
invalid specs fail cleanly
score displays
report displays
agentready.json downloads
no external endpoint is called
clear limitations are shown
```

---

## 11. Future roadmap after V1

### V2 — MCP scanner

```txt
MCP tools schema
→ tool name/description/input schema analysis
→ MCP AgentReady Score
→ MCP agentready.json
```

### V3 — Agent simulation

```txt
Generate scenarios
Ask an agent to choose tools
Measure wrong tool / wrong params / unsafe execution
Compare before-after corrections
```

### V4 — CLI and GitHub Action

```txt
timeproofs scan openapi.yaml
timeproofs scan-mcp tools.json
timeproofs generate-contract openapi.yaml
```

### V5 — Benchmark

```txt
State of AgentReady APIs
Top mistakes that make AI agents fail
MCP Tool Readiness Benchmark
Agent Tool Risk Index
```

### V6 — Certification

```txt
TimeProofs AgentReady Checked
Score
validity date
verified report
badge
```

---

## 12. Success definition for V1

V1 is complete only when a user can:

```txt
1. Open /agentready.html.
2. Upload OpenAPI JSON or YAML.
3. Get an AgentReady Score.
4. Read clear risks and recommendations.
5. Download agentready.json.
6. Export or print a human report.
7. Understand the product limitations.
```

The system must:

```txt
1. Reject invalid files cleanly.
2. Never call submitted API endpoints.
3. Avoid storing uploaded specs by default.
4. Avoid exposing secrets unnecessarily.
5. Produce deterministic results for the same spec.
```

---

## 13. Strategic moat to build

The first scanner is copyable. The long-term asset is not just the UI.

Build toward:

```txt
AgentReady Score
agentready.json
risk taxonomy
agent simulation
error/failure database
benchmark
certification
```

The most important output is:

```txt
agentready.json
```

Because it can become the machine-readable contract between tools and agents.

---

## 14. One-line repo state

As of this file:

> TimeProofs legacy is intact. AgentReady product docs, repo audit, and static OpenAPI JSON core scanner are merged. The next step is `agentready.html`, a local browser upload page using `agentready-core/index.js`.
