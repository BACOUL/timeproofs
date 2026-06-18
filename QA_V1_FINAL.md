# TimeProofs V1 Final QA

Date: 2026-06-18
Branch: `p033-final-v1-qa`

## Purpose

This QA pass checks the V1 after the AI Action File repositioning and before broader pilot outreach.

The goal is not to add features. The goal is to catch inconsistent wording, broken sales-path links, excessive claims, and obvious V1 readiness issues.

## V1 product truth checked

- TimeProofs is the black box for observable AI actions.
- One AI action can produce one AI Action File.
- The company stores the Action File where it wants.
- TimeProofs seals fingerprints / canonical payload hashes by default.
- Sensitive action content should not be uploaded by default.
- TimeProofs does not prove the AI was correct.
- TimeProofs does not guarantee legal validity or court-ready proof.
- TimeProofs does not provide full AI Act or GDPR compliance by itself.
- Proof levels are evidence labels, not legal conclusions.

## QA checks performed

### 1. Broken-link surface

The sitemap was outdated and still reflected the earlier proof-of-existence structure.

Fixed in this PR:

- Added `contact.html`.
- Added V1 sales pages such as `pricing.html`, `use-cases-pilots.html`, `for-companies.html`, `how-it-works.html`, `demo-simulated-ai-action.html`, and `logs-vs-timeproofs.html`.
- Kept legacy/still-useful pages such as `use-cases.html`, `verify.html`, `docs.html`, `proofspec.html`, `security.html`, `privacy.html`, `legal.html`, and `keys.html`.
- Updated `lastmod` dates to the V1 QA date.

### 2. Navigation / footer consistency

Current status:

- `contact.html` exists and provides the pilot request path.
- Several pages already use mailto pilot CTAs.
- The sitemap now exposes the Contact page and current V1 pilot/sales pages.

Next safe follow-up if needed:

- Standardize the visible header/footer across older legacy pages in a separate short PR if visual consistency becomes a blocker.
- Avoid rewriting every older static page in this QA PR to reduce regression risk.

### 3. Old proof-of-existence wording

Current status:

- The core strategy, homepage, privacy, security, legal, pricing, and contact pages are aligned with the AI Action File model.
- Legacy pages can still mention `.tproof.json` or ProofSpec where backward compatibility is intended.

### 4. Excessive legal or compliance claims

Checked risk areas:

- AI correctness.
- Legal proof / court-ready proof.
- Notarization / legal certification.
- Full AI Act compliance.
- Full GDPR compliance.
- Replacement for regulated audit or legal review.

Current status:

- The latest privacy, security, legal, pricing, and contact pages avoid these unsupported guarantees.
- A static QA test now checks key files for these forbidden claims.

### 5. Dashboard / SaaS promises

Current V1 must avoid implying that a full SaaS dashboard, billing, account system, database, CRM, or storage layer already exists.

Current status:

- Contact and pricing pages explicitly avoid account, dashboard, payment, and CRM implementation promises for the first pilot discussion.
- Future SaaS and subscription wording remains framed as later / future where present.

### 6. Hash and signature consistency

Checked documentation alignment:

- Action File object model.
- Hash model and anti-circular hashing.
- Canonicalization profile.
- Signature model.
- Public key registry.
- Seal API design.

Current status:

- The current docs separate Action File, hashable core, payload hash, Seal, and verification result.
- The security and legal pages avoid overclaiming what signature verification means.

## Files changed in this QA PR

- `sitemap.xml`
- `QA_V1_FINAL.md`
- `tests/v1-final-qa.test.js`

## Explicit non-goals

This PR does not implement:

- SaaS dashboard.
- Account system.
- CRM integration.
- Billing or Stripe.
- Database storage.
- Backend form.
- New API endpoint.
- New cryptography.
- Legal certification.
- Compliance certification.

## Recommended next step after merge

Move to validation-market prompts and use the current V1 pages to contact pilot prospects before building the full SaaS stack.
