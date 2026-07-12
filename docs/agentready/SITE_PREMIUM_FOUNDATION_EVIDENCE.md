# AgentReady Premium Site Foundation Evidence

Status: PREFLIGHT RECORDED

Batch: ARB-SITE-PREMIUM-001

Branch: site-agentready-premium-foundation

## Scope Boundary

This batch builds the shared navigation, footer, typography, focus, button and code-surface foundation only.

It must not redesign homepage body sections, product page content, AgentReady engine behavior, CLI behavior, package metadata, npm tags, Git tags, GitHub Releases, Marketplace state, billing, accounts, backend, runtime behavior or `action.yml`.

## Active Indexable AgentReady Pages

The active indexable AgentReady root HTML pages inventoried before migration are:

| Page | Role |
| --- | --- |
| `index.html` | Homepage and primary AgentReady product entry |
| `agentready.html` | OpenAPI scanner |
| `agentready-mcp.html` | MCP scanner |
| `agentready-ci.html` | CI Gate adoption |
| `agentready-docs.html` | Documentation hub |
| `agentready-examples.html` | Examples |
| `agentready-json.html` | agentready.json standard |
| `agentready-resources.html` | Resource hub |
| `agentready-sample-report.html` | Sample report |
| `agentready-simulation.html` | Static simulation |
| `ai-agent-tool-risk-checklist.html` | AI agent tool risk checklist |
| `mcp-server-readiness.html` | MCP readiness education |
| `openapi-ai-agent-readiness.html` | OpenAPI readiness education |
| `pricing.html` | Community and Pro pricing state |
| `legal.html` | AgentReady legal notice |
| `privacy.html` | AgentReady privacy |
| `terms.html` | AgentReady terms |

Noindex or non-AgentReady pages are excluded from the shared public AgentReady shell migration:

| Page | Reason |
| --- | --- |
| `404.html` | noindex error page |
| `agentready-engine-gate.html` | noindex internal gate |
| `agentready-openapi-upload-test.html` | noindex upload test |
| `agentready-test.html` | noindex browser test harness |
| `dpa.html` | TimeProofs legal document outside AgentReady product shell |

## Preflight Navigation And Footer Inventory

Current state before migration:

- most active AgentReady pages load `/assets/site-nav.css` and `/assets/site-nav.js`;
- headers are duplicated inline across root HTML pages;
- footer text varies by page and footer link groups are injected by JavaScript;
- mobile navigation is currently generated progressively through `assets/site-nav.js`;
- desktop navigation uses simple inline link rows, not the canonical Product and Resources grouped menus;
- footer does not yet expose the required Product, Standard, Developers and Trust groups as static markup.

## Real Route Map

The canonical menu labels map only to existing routes:

| Label | Route |
| --- | --- |
| TimeProofs / AgentReady | `/` |
| OpenAPI Scanner | `/agentready.html` |
| MCP Scanner | `/agentready-mcp.html` |
| GitHub CI Gate | `/agentready-ci.html` |
| Reports and agentready.json | `/agentready-json.html` |
| Documentation | `/agentready-docs.html` |
| Examples | `/agentready-examples.html` |
| AgentReady rules | `/agentready-resources.html` |
| Methodology | `/agentready-resources.html` |
| Changelog | `/CHANGELOG.md` |
| Pricing | `/pricing.html` |
| Trust | `/privacy.html` |
| GitHub | `https://github.com/BACOUL/timeproofs` |
| Scan a contract | `/agentready.html` |
| Sample report | `/agentready-sample-report.html` |
| Limitations | `/terms.html` |
| Security model | `/privacy.html` |
| Terms | `/terms.html` |
| Contact | `mailto:hello@timeproofs.io` |

## Baseline Screenshots

Baseline screenshots captured before broad HTML migration:

| Evidence | File |
| --- | --- |
| Homepage desktop baseline | `docs/agentready/evidence/site-premium-foundation/baseline-index-desktop.png` |
| Homepage mobile baseline with menu open | `docs/agentready/evidence/site-premium-foundation/baseline-index-mobile-open.png` |
| CI Gate desktop baseline | `docs/agentready/evidence/site-premium-foundation/baseline-ci-desktop.png` |
| CI Gate mobile baseline with menu open | `docs/agentready/evidence/site-premium-foundation/baseline-ci-mobile-open.png` |

## Preflight Findings

- Broad HTML migration has not started at this preflight point.
- The draft PR must be opened before replacing active-page navigation and footer markup.
- Existing body content and product sections must be preserved during the migration.
- No npm operation, tag operation, GitHub Release operation or Marketplace operation is required for this batch.

