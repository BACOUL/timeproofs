# TimeProofs AgentReady — Project Context & Execution Plan

## Purpose of this file

Read this file first before modifying the repository.

It explains what TimeProofs AgentReady is, where the repo currently stands, what must not be reintroduced, and what remains to build.

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

## 2. Strategic decision: legacy proof layer removed from active product

The old TimeProofs proof-of-existence surface is no longer the direction of the repository.

Do not rebuild the old timestamp/proof/verify product unless explicitly requested.

The repository is now focused on:

```txt
Agent Tool Readiness
Pre-deployment readiness for AI-agent tools
OpenAPI / MCP / tool schema analysis
AgentReady Score
AgentReady Report
agentready.json
```

---

## 3. What AgentReady is not

AgentReady is not:

- an AI runtime firewall;
- a broad AI security platform;
- an agent observability product;
- an MCP marketplace;
- a generic OpenAPI linter;
- only a PDF audit generator;
- a compliance certification product;
- a replacement for runtime guardrails;
- a proof-of-existence product as the main promise.

---

## 4. Current repo status

Repository:

```txt
BACOUL/timeproofs
```

Main branch:

```txt
timeproofs
```

Current state:

```txt
✅ Legacy proof-of-existence direction removed from active repo surface
✅ AgentReady product documentation merged
✅ Strict methodology merged
✅ Repo audit merged
✅ Static OpenAPI JSON/YAML core scanner
✅ Example OpenAPI JSON/YAML fixtures
✅ Root README repositioned around AgentReady
✅ Root landing page repositioned around AgentReady
✅ Browser upload page for OpenAPI JSON/YAML
✅ Executive report section
✅ Recommended action plan
✅ Browser print / Save as PDF export
✅ Static browser test harness
✅ Public docs page
✅ Public examples page
✅ MCP scanner exploration docs and fixtures
⬜ MCP static core parser not built yet
⬜ Agent simulation not built yet
```

---

## 5. Core product formula

```txt
OpenAPI / MCP / tool schema
→ AgentReady analysis
→ AgentReady Score
→ AgentReady Report
→ agentready.json
```

Current V1 product flow:

```txt
OpenAPI JSON/YAML upload
→ AgentReady analysis
→ score /100
→ endpoint findings
→ recommendations
→ agentready.json
→ Markdown report
→ printable executive report
→ static fixture checks
→ public docs/examples
```

Planned V2 MCP flow:

```txt
MCP tools JSON
→ map MCP tools to AgentReady operations
→ reuse action classification
→ reuse risk detection
→ reuse score/report/json generation
→ MCP AgentReady Report
```

---

## 6. Current technical core

Core files:

```txt
agentready-core/README.md
agentready-core/types.js
agentready-core/parse-yaml.js
agentready-core/parse-openapi.js
agentready-core/extract-operations.js
agentready-core/classify-action.js
agentready-core/detect-risks.js
agentready-core/score.js
agentready-core/generate-agentready-json.js
agentready-core/report.js
agentready-core/index.js
```

Example files:

```txt
agentready-examples/valid-simple-openapi.json
agentready-examples/valid-simple-openapi.yaml
agentready-examples/dangerous-actions-openapi.json
agentready-examples/mcp-tools-simple.json
agentready-examples/mcp-tools-dangerous.json
```

Supported current input:

```txt
OpenAPI JSON 3.0 / 3.1
OpenAPI YAML 3.0 / 3.1
```

Exploratory MCP input:

```txt
MCP tools JSON with server + tools[]
```

Current output:

```txt
summary score/status
operation analysis
risk findings
agentready_json
markdown_report
printable executive report
```

---

## 7. Current public/internal pages

```txt
index.html
agentready.html
agentready-docs.html
agentready-examples.html
agentready-test.html
```

`agentready.html` provides:

```txt
local OpenAPI JSON/YAML upload
drag and drop
example loading
score/status display
risk counts
top risks
endpoint findings
executive summary
recommended action plan
agentready.json export
Markdown report export
browser print / Save as PDF export
```

`agentready-docs.html` provides public product documentation.

`agentready-examples.html` provides public examples and expected scanner behavior.

`agentready-test.html` provides static browser checks:

```txt
valid JSON fixture scans successfully
valid YAML fixture scans successfully
dangerous fixture detects critical risks
invalid JSON fails cleanly
invalid YAML fails cleanly
good fixture scores higher than dangerous fixture
agentready.json is generated
Markdown report is generated
```

---

## 8. Important documentation

```txt
docs/agentready/README.md
docs/agentready/TIMEPROOFS_AGENTREADY_MASTER_PLAN.md
docs/agentready/AGENTREADY_ROADMAP.md
docs/agentready/AGENTREADY_SCORE_MODEL.md
docs/agentready/AGENTREADY_RISK_TAXONOMY.md
docs/agentready/AGENTREADY_JSON_SPEC.md
docs/agentready/AGENTREADY_REPORT_TEMPLATE.md
docs/agentready/AGENTREADY_IMPLEMENTATION_CHECKLIST.md
docs/agentready/REPO_AUDIT_INITIAL.md
docs/agentready/LEGACY_REMOVAL_DECISION.md
docs/agentready/MCP_SCANNER_EXPLORATION.md
```

---

## 9. Non-negotiable rules

1. Do not turn AgentReady into a runtime firewall.
2. Do not position it as a broad AI security platform.
3. Do not rebuild the old timestamp/proof/verify product surface.
4. Do not introduce Next.js without a specific migration decision.
5. Do not add payments before the scan/report is useful.
6. Do not break OpenAPI V1 while adding MCP.
7. Do not call external API endpoints from a submitted OpenAPI or MCP spec.
8. Do not store user specs by default.
9. Do not expose secrets/tokens from uploaded specs.
10. Do not present AgentReady as a guarantee that agents will never fail.

Mandatory limitation text:

```txt
TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
```

---

## 10. Next PRs to complete the product

### Next — MCP static core parser

```txt
Add agentready-core/parse-mcp-tools.js.
Add agentready-core/extract-mcp-tools.js.
Add agentready-core/scan-mcp-tools.js.
Map MCP tools to AgentReady operation objects.
Reuse classify-action/detect-risks/score/report/json generation.
Keep OpenAPI V1 behavior unchanged.
```

### Then — MCP scanner UI

```txt
Add agentready-mcp.html or extend agentready.html after core is stable.
Support local MCP tools JSON upload.
Generate MCP AgentReady Score and agentready.json.
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

## 12. Strategic moat to build

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

## 13. One-line repo state

> TimeProofs is now focused on AgentReady. The repo has a static OpenAPI JSON/YAML scanner page, agentready.json export, Markdown report export, browser print / Save as PDF report, a static browser test harness, public docs/examples pages, and MCP exploration docs/fixtures. The next step is the MCP static core parser.
