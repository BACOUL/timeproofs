# Verification record — 2 October 2026

**Current acceptance:** see [Alpha readiness](readiness.md). Earlier mobile and export/import gaps below are historical and superseded by the final acceptance appendix.

Runtime tested: Node 24.19.0. CI matrix configured for Node 22 and 24; external execution not yet confirmed.

- `npm run check`: PASS, 31 tests (30 core/conformance/adversarial checks plus SDK/HTTP/private-storage integration).
- Purchase reference: initial Authority / Identity / Offer SATISFIED, Execution / Outcome MISSING; registered collectors receive both missing signed artifacts; final 5/5 SATISFIED; independently recomputed verification valid.
- API integration: public profiles/demo/verify, authenticated resolve/case operations, atomic disk persistence, concurrent append serialization, malformed input, body limit, rate limit and all requested site routes.
- Clean SDK package install: PASS in a new temporary directory, npm offline install of generated package, SDK resolve/verify and installed CLI demo.
- Browser JavaScript syntax: `node --check public/app.js` PASS.
- Desktop browser QA: PASS for home, purchase 3/5 → 4/5 → 5/5, independent Verify SATISFIED, changed amount rejected INVALID, case inspection, reference profile and public navigation. Chrome cloud browser, deployed preview. Mobile browser QA is NOT COMPLETE: the available browser interface exposes no viewport or device emulation control. Export was clicked but the download event timed out; file round-trip is NOT VERIFIED.
- Public staging: READY and tested at https://timeproofs-20vp9ue04-jeason1.vercel.app/demo (deployment dpl_BEN7REjfmEhD1PWGAaaFtDaTjMLm, source f2deb3ca5d01712c53f967a90ecec4f7c855212f, target preview). Existing Git integration created this preview. No production promotion, DNS or custom domain change was performed. Deployed /healthz returned HTTP 200, version 2.0.0-alpha.1, sandbox-reference, privateApi false.
- npm registry: NOT PUBLISHED. Source branch and local package available; no registry availability claim.
- Outside developer G5: pending actual external reproduction. Local fresh-install smoke is useful but not equivalent to another developer validating the docs.

Local CPU measurement (200 warm sequential resolutions, fixture evidence, this transient container): p50 1.63 ms, p95 5.88 ms. This excludes acquisition, network, persistence, cold start and operational support. It is not a SaaS cost, SLA or capacity claim.

## Required next checks

Complete mobile browser acceptance and export/upload round-trip → outside-developer reproduction → actual external issuer integration → paid-use validation. No billing or broad production claim before these gates.

## Preview acceptance — 2 October 2026

The owner authorized separate Vercel previews and browser fallback. The deployment connector returned Tool deploy_to_vercel not found; later inspection found automatic Git previews already READY. The earlier statement that no preview existed is superseded by the deployed verification above.

Public integration labels remain PLANNED for MCP, A2A, AP2, x401, SCITT and Agent Action Receipts. JWT and VC-JWT are only tested subsets. The browser validates real signature verification over sandbox fixtures, not a real payment or connected merchant.

No P0 observed in the tested sandbox flow. Production blockers: durable multi-instance storage, tenant isolation, distributed abuse protection, operational monitoring/backup and actual external acquisition validation. Mobile and file round-trip acceptance are outstanding release checks. No managed production readiness claim.

Readiness: usable reference alpha for testing; production NO-GO. Current immutable preview remains the browser-tested source even if subsequent documentation-only commits generate additional previews.

## English canonical preview — 2 October 2026

Tested immutable preview: https://timeproofs-qh7hl5igq-jeason1.vercel.app/
Deployment: dpl_HPzgThqQNkW35pw8u72aYhs3pfb6; source 9d1fa2870e33551c457d1e3d7342b812b181f437; target preview, READY.

English content audit covered README, documentation, profiles, schemas/OpenAPI, examples, SDK/CLI, public tests, security/threat model, pricing, integrations and demo copy. LANGUAGE policy and root SECURITY.md are now included. The site uses lang=en and Content-Language: en; a French Accept-Language request still receives English. Technical identifiers and statuses are unchanged. No French translation or i18n dependency was added.

All 31 automated checks and CLI demo passed. Deployed HTTP checks passed for home, health, profiles, demo stages 0/1/2, public Verify, tampered-amount rejection and OpenAPI language metadata. On the final layout preview, browser navigation passed for all ten public pages, the case viewer and all five profile detail pages. Purchase stage progression and independent Verify were rerun; changing the amount returns INVALID. A Developers code block overflow was observed and corrected with minimum grid child widths; final desktop page and profile overflow checks passed.

Mobile acceptance remains NOT VERIFIED. The available browser has no viewport/device emulation API; DevTools shortcuts left the viewport at 1348 px. Responsive CSS was reviewed but is not a substitute for device testing. Download was clicked with a pre-registered listener, but the event timed out; export/import round-trip remains NOT VERIFIED.

The designated project is timeproofs, not timeproofsv1. Site titles and the visible badge explicitly identify TimeProofs V2 Preview. The Vercel console project name has NOT been changed to timeproofs-v2-preview: connector tools expose no rename operation and project settings redirect to login. This is an outstanding identification task, not a completed rename.

The production timeproofs-site deployment remains dpl_CPrPdmHeTyYZv6bXN2NvW5EkoVvx. No production promotion, custom domain or DNS write was performed. The timeproofs-v1 branch remains 696bbf21e987c226456636c2903a8de977aca845.

No P0/P1 defect was observed in the tested reference flow. This is not production acceptance: mobile, file round-trip, project console naming and the existing managed-service production gaps remain open.

## Final alpha acceptance — 2 October 2026

Current readiness: **ALPHA READY for the sandbox reference**, production NO-GO. See [the full report](readiness.md).

Final browser-tested release: https://timeproofs-amcadf7kc-jeason1.vercel.app/
Deployment: dpl_FG2WENH35PRwqHqZ8SSyuAhFCPLF; source 42fb5085068d6a3af38fc766962aa23ce04df92e; READY, preview target.
Matching isolated mobile QA deployment: dpl_EHwxVuR5PpyfvR6cDmJS299nFdCZ, source cd636a8ba674f0533cb1a967b60bd7f60f1f45a0, branch timeproofs-v2-mobile-qa. Product JS/CSS/core/API match the release; QA-only framing and harness remain separate.

All 33 automated checks pass. Final release checks: 12 desktop views without horizontal overflow; 24 mobile page/width combinations without horizontal overflow or undersized primary/navigation targets; menu navigation and the full 3/5 → 4/5 → 5/5 → Verify at 375/390/430 px. Real browser attachment download from this final release, exact downloaded-file import and independent SATISFIED verification pass. Draft 2020-12 schema validation passes. Edited-file imports reject amount changes, signed evidence changes and missing merchant as INVALID; malformed JSON is rejected cleanly. Error recovery back to SATISFIED passes.

Clean-installed SDK offline and deployed HTTP smoke pass; installed CLI profiles/demo/resolve/valid and tampered verification pass. Public HTTPS shallow clone → npm pack → empty-app install → installed demo also passes. Unverified direct npm Git shortcut was replaced with this verified installation path. Internal link check and API smoke evidence are recorded in the readiness report.

Remaining P2: Vercel console rename, physical-device/Safari testing, npm registry release, independent outside-developer/timed visitor/paid-use validation. No P0/P1 remains in the tested alpha scope. No production/DNS/domain write occurred. Read-only checks confirm production timeproofs-site still uses dpl_CPrPdmHeTyYZv6bXN2NvW5EkoVvx and legacy timeproofs-v1 still points to 696bbf21e987c226456636c2903a8de977aca845.

Documentation-only commits may generate newer previews; the immutable URL above remains the accepted application build.
