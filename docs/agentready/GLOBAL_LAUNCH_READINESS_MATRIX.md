# Global Launch Readiness Matrix

## Purpose

This matrix tracks what must be true before AgentReady can launch as a global, premium, self-service B2B software product.

If this matrix conflicts with `AGENTREADY_MASTER_PLAN.md`, the master plan prevails.

The launch tracked here is Community + Pro. Team and Agency are `POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT`.

Statuses:

- `NOT_STARTED`
- `PLANNED`
- `IN_PROGRESS`
- `READY`
- `BLOCKED`

## Matrix

| Category | Requirement | Current state | Target state | Blocking launch | Owner | Evidence | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Engine | Stable OpenAPI and MCP risk analysis | Core exists and tests pass | Stable Community-grade scanner | yes | Product/Engineering | `agentready-core/`, tests | READY |
| CLI | CI-capable CLI | CLI alpha exists | Stable Community CLI with docs | yes | Engineering | `bin/agentready.js`, CLI tests | READY |
| GitHub Action | Wrapper around CLI | Root Marketplace metadata exists | Documented and copyable workflow | yes | Engineering | `/action.yml` | READY |
| Licenses | Automatic Pro license after payment | Not implemented | Pro license generated after checkout | yes | Engineering | `LICENSE_AND_ENTITLEMENT_ARCHITECTURE.md` | PLANNED |
| Entitlements | Community + Pro feature gates | Not implemented | Pro entitlement object enforced; Community remains accountless | yes | Engineering | `PRICING_AND_ENTITLEMENTS_V0_1.md` | PLANNED |
| Billing | Stripe Checkout and subscriptions | Not implemented | Test-mode Pro checkout, portal, invoices | yes | Engineering/Ops | `AUTOMATED_PURCHASE_AND_BILLING_FLOW.md` | PLANNED |
| Account | Minimal Pro customer account | Not implemented | Automatic account creation for Pro only | yes | Engineering | Future account docs/code | NOT_STARTED |
| Emails | Transactional emails | Not implemented | Purchase, renewal, failure, cancellation emails | yes | Product/Ops | Future email templates | NOT_STARTED |
| Support | Self-service support | Basic docs | Help page, troubleshooting, status | yes | Product/Ops | Future `/help/`, `/status.html` | PLANNED |
| Legal | Legal notice and terms | Draft public pages exist | Complete B2B legal set | yes | Owner/Legal | `LEGAL_PRIVACY_AND_COOKIE_REQUIREMENTS.md` | BLOCKED |
| Privacy | Privacy policy | Draft exists | Complete privacy policy and data map | yes | Owner/Legal | `LEGAL_PRIVACY_AND_COOKIE_REQUIREMENTS.md` | BLOCKED |
| Cookies | Cookie strategy | No paid launch cookie policy | No non-essential cookies by default or consent UI | yes | Owner/Legal/Engineering | Cookie requirements doc | PLANNED |
| Security | Disclosure and incident process | Basic security docs | Responsible disclosure and incident procedure | yes | Engineering/Ops | `SECURITY.md`, future policy | PLANNED |
| Company information | Publisher identity | Missing verified details | Completed legal identity fields | yes | Owner | `TO_BE_COMPLETED` fields | BLOCKED |
| Pricing | Community + Pro launch model | Rebaselined in master plan | Display only implemented Community + Pro plans; Team/Agency `POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT` | yes | Product | `AGENTREADY_MASTER_PLAN.md`, entitlements docs | IN_PROGRESS |
| Documentation | Product and standard docs | Strong CI docs exist | Public self-service docs complete | no | Product | `docs/agentready/` | IN_PROGRESS |
| SEO | Technical SEO | Sitemap and pages exist | Complete metadata, schema, Search Console | no | Product/Engineering | `SEO_GEO_AI_FIRST_REQUIREMENTS.md` | PLANNED |
| GEO / AI discovery | LLM-readable docs | Some docs exist | HTML docs, glossary, examples, versioning | no | Product | SEO/GEO requirements doc | PLANNED |
| Accessibility | Accessible public pages | Basic responsive pages | Keyboard, semantic, contrast, no overlap QA | yes | Product/Engineering | Future QA report | PLANNED |
| Mobile | Mobile public flows | Mobile nav exists | Pricing/account/checkout mobile QA | yes | Product/Engineering | Future QA report | PLANNED |
| Performance | Static fast pages | Static pages exist | Core Web Vitals acceptable | no | Engineering | Future performance QA | PLANNED |
| Observability | Production monitoring | Not implemented for paid backend | Error monitoring and billing webhook alerts | yes | Engineering/Ops | Future monitoring docs | NOT_STARTED |
| Backups | Data backup/restore | Not applicable yet | Account/license/billing data backup plan | yes | Engineering/Ops | Future ops docs | NOT_STARTED |
| Incident response | Incident playbook | Not complete | Documented incident process | yes | Engineering/Ops | Legal/security requirements | PLANNED |
| Taxes | VAT/tax handling | Not implemented | Stripe tax/VAT behavior validated | yes | Owner/Accounting | Billing flow and legal review | BLOCKED |
| Refunds | Refund policy | Not complete | Published B2B refund policy | yes | Owner/Legal | Legal requirements doc | BLOCKED |
| Launch QA | End-to-end launch audit | Not done | Full purchase, license, cancel, failure QA | yes | Product/Engineering | Future QA report | NOT_STARTED |

## Launch Rule

Real paid checkout must remain disabled until every Community + Pro `Blocking launch = yes` item is `READY`.

## Non-Guarantee

TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
