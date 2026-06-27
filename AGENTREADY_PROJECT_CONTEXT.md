# TimeProofs AgentReady — Project Context & Execution Plan

## Purpose of this file

Read this file first before modifying the repository.

It explains:

- what TimeProofs AgentReady is;
- where the repo currently stands;
- what was removed from the old TimeProofs product;
- what remains to build;
- what must not be reintroduced;
- the A-to-Z roadmap for completing the product.

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

The repository previously contained an older **TimeProofs proof-of-existence** product surface:

```txt
hash locally
signed timestamp
.tproof.json
verify page
proofspec page
regulations/security/legal/use-cases pages
legacy OpenAPI timestamp/verify spec
release proof manifest
```

This legacy surface is no longer the direction of the project.

The repository is now focused on:

```txt
Agent Tool Readiness
Pre-deployment readiness for AI-agent tools
OpenAPI / MCP / tool schema analysis
AgentReady Score
AgentReady Report
agentready.json
```

Do not rebuild the old proof-of-existence product unless explicitly requested.

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

Current state after AgentReady reboot:

```txt
✅ Legacy proof-of-existence direction removed from active repo surface
✅ AgentReady product documentation merged
✅ Strict methodology merged
✅ Repo audit merged
✅ Static OpenAPI JSON core scanner merged
✅ Example OpenAPI fixtures merged
✅ Root README repositioned around AgentReady
✅ Root landing page repositioned around AgentReady
⬜ Browser upload page not built yet
⬜ YAML support not built yet
⬜ Human report UI not built yet
⬜ PDF/print export not built yet
⬜ MCP scanner not built yet
⬜ Agent simulation not built yet
```

---

## 5. Core product formula

The repository must continue toward this product formula:

```txt
OpenAPI / MCP / tool schema
→ AgentReady analysis
→ AgentReady Score
→ AgentReady Report
→ agentready.json
```

The V1 product must start with:

```txt
OpenAPI upload
→ AgentReady analysis
→ score /100
→ endpoint findings
→ recommendations
→ agentready.json
→ human report
```

---

## 6. Current technical core

The static V1a core lives in:

```txt
agentready-core/
```

Current files:

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

Current examples live in:

```txt
agentready-examples/
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

## 7. Current documentation

Important docs:

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
```

---

## 8. Non-negotiable rules

When working in this repo:

1. Do not turn AgentReady into a runtime firewall.
2. Do not position it as a broad AI security platform.
3. Do not rebuild the old timestamp/proof/verify product surface.
4. Do not introduce Next.js without a specific migration decision.
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

## 9. Next PRs to complete the product

### PR next — Static upload UI

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

Do not add PDF yet.
Do not add MCP yet.

---

### Then — YAML support

Goal:

```txt
Support openapi.yaml and openapi.yml
```

Requirement before V1 complete:

```txt
OpenAPI JSON works.
OpenAPI YAML works.
Invalid YAML is refused cleanly.
```

---

### Then — Report polish and PDF/print export

Goal:

```txt
Improve human report page.
Add printable report.
Add browser print-to-PDF support.
```

---

### Then — Public docs and examples

Goal:

```txt
Add stable docs/examples pages.
Update sitemap only when pages exist.
```

---

### Then — Test harness

Goal:

```txt
Verify good fixture scores higher than dangerous fixture.
Verify dangerous fixture detects critical risks.
Verify invalid specs fail cleanly.
```

---

## 10. Future roadmap after V1

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

## 11. Success definition for V1

V1 is complete only when a user can:

```txt
1. Open the AgentReady upload page.
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

> TimeProofs is now focused on AgentReady. The old proof-of-existence product surface has been removed from the active direction. The next step is a browser upload page using `agentready-core/index.js`.
