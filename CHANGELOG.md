🕓 TimeProofs — Changelog

> The universal proof layer for AI, developers, and the internet.
Built openly, privacy-first, and edge-native.



🟢 v0.1 — Public Beta (2025-02)

Status: ✅ Live
The foundation release — a public, privacy-first timestamping API and verification UI, live at timeproofs.io.

Core Features

/timestamp → create proof of existence for any SHA-256 hash

/verify → public proof validation

Edge-native infra: Cloudflare Workers + KV

Frontend (Vercel) with Verify UI, Docs, Privacy & Legal

Sitemap + SEO structure

MIT License + Public GitHub repository

API base: https://timeproofs-api.jeason-bacoul.workers.dev/api


Principles

Privacy-first — only hashes, never raw data

Open & transparent — public verifiable proofs

Minimal & deterministic — no blockchain, no tokens

Predictable cost — no gas, no friction


🎯 Goal: Deliver a stable, public MVP anyone can test.

🟠 v0.2 — Developer Experience (planned)

Status: 🚧 In progress
Frictionless integration for developers and AI workflows.

Planned Features

JavaScript / TypeScript SDK (browser + Node)

createFromText, createFromFile, createFromHash, verify


PDF certificate — downloadable proof bundle

Verify UI improvements

“Copy as cURL” & “Copy JSON” buttons

Proof detail modal


Docs refresh

Limits / FAQ / examples

Live JSON snippets


Minor UX polish + mobile layout updates


🎯 Goal: Integration in minutes, proofs readable by humans and machines.

🟡 v1.0 — Productization (upcoming)

Status: 🔜 Planned
Reliability, access control, and monetization.

Planned Features

API keys & usage quotas (Free / Pro / Team)

Dashboard

Usage stats, CSV export, key rotation


Webhooks (success / failure callbacks)

Billing via Stripe — predictable micro-payments

Status page /api/status


🎯 Goal: Scalable, predictable operations for individuals & teams.

🔵 v2.0 — Validation Layer (research phase)

Status: 🧪 Research
Distributed proof validation and offline verification.

Planned Features

ProofChain — periodic aggregation + Merkle root publication

SDKs: Python & Go

Advanced verify

Offline bundles

Multi-proof attestation


Anchoring + attestations (RFC 3161 / TSA compatibility)

CLI tool for CI/CD timestamping


🎯 Goal: Extra assurance without sacrificing speed or privacy.

💡 Backlog / Ideas

Per-agent API keys & attestations

Cloud storage hooks (S3 / GCS hash on upload)

Organization features (roles, audit export, SIEM)

Proof feed / analytics export

RFC 3161 compatibility (research)


🧭 Version Principles

Version	Scope	Expected Stability

v0.1	Public MVP	✅ Stable
v0.2	Developer Experience	🟠 Beta
v1.0	Product Ready	🟡 Stable
v2.0	Distributed Validation	🔵 Experimental


🧱 Architecture Reference

Edge API : Cloudflare Workers + KV

Frontend : Vercel (Next / Static HTML)

Storage : KV { hash, timestamp, signature }

Security : HMAC-SHA256 over hash + timestamp

Docs : timeproofs.io/docs.html


🔒 Security & Privacy Highlights

Only hashes stored — never user files or personal data

HTTPS / TLS 1.3 for all transmissions

No cookies, no tracking

Proofs are verifiable independently without central trust


🧠 Governance

Open-source MIT license

Public roadmap and changelog on GitHub

Transparent version tags (v0.1, v0.2, …)

Coordinated releases via GitHub tags + site updates


🗓️ Release Timeline (estimated)

Version	ETA	Theme

v0.1	✅ Live	Public Beta
v0.2	Q4 2025	SDK + DX
v1.0	2026	API Keys + Stripe
v2.0	2026 – 2027	Validation Network


📬 Feedback & Contact

💬 hello@timeproofs.io

🌐 timeproofs.io

🐦 @TimeProofs

🤝 Community Contributions Welcome


📄 License

Released under the MIT License © 2025 TimeProofs.


