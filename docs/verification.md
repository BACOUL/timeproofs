# Verification record — 2 October 2026

Runtime tested: Node 24.19.0. CI matrix configured for Node 22 and 24; external execution not yet confirmed.

- `npm run check`: PASS, 31 tests (30 core/conformance/adversarial checks plus SDK/HTTP/private-storage integration).
- Purchase reference: initial Authority / Identity / Offer SATISFIED, Execution / Outcome MISSING; registered collectors receive both missing signed artifacts; final 5/5 SATISFIED; independently recomputed verification valid.
- API integration: public profiles/demo/verify, authenticated resolve/case operations, atomic disk persistence, concurrent append serialization, malformed input, body limit, rate limit and all requested site routes.
- Clean SDK package install: PASS in a new temporary directory, npm offline install of generated package, SDK resolve/verify and installed CLI demo.
- Browser JavaScript syntax: `node --check public/app.js` PASS.
- Browser visual and interaction QA: NOT RUN. agent-browser CLI and a Chromium executable are unavailable. Playwright browser download failed (invalid/truncated archive). Route HTTP checks do not substitute for visual QA.
- Public staging/production: NOT DEPLOYED. Automated approval rejected Vercel source upload/deployment; no workaround performed. Hosting approval required for the next step.
- npm registry: NOT PUBLISHED. Source branch and local package available; no registry availability claim.
- Outside developer G5: pending actual external reproduction. Local fresh-install smoke is useful but not equivalent to another developer validating the docs.

Local CPU measurement (200 warm sequential resolutions, fixture evidence, this transient container): p50 1.63 ms, p95 5.88 ms. This excludes acquisition, network, persistence, cold start and operational support. It is not a SaaS cost, SLA or capacity claim.

## Required next checks

Hosting approval → sandbox staging → browser desktop/mobile flow (resolve, collect twice, inspect/export, verify) → deployed health and bundled fixture checks → outside-developer reproduction → actual external issuer integration → paid-use validation. No billing or broad production claim before these gates.
