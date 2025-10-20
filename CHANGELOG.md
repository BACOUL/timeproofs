# 🕓 TimeProofs — Changelog

> The open, privacy-first, edge-native proof-of-existence protocol.  
> Built to become the universal layer for AI, developers, and digital authenticity.

All notable changes to **TimeProofs** are documented in this file.  
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## 🟢 v0.1 — Public Beta _(October 2025)_

**Status:** ✅ Live  
**Tag:** `v0.1.0`  
**Goal:** Deliver a stable, public MVP anyone can test.

### ✨ Features
- `/timestamp` → create proof of existence for any SHA-256 hash  
- `/verify` → public proof validation endpoint  
- Edge-native infra : **Cloudflare Workers + KV**  
- Frontend (Vercel) : **Verify UI**, **Docs**, **Privacy**, **Legal**  
- SEO / sitemap / robots setup  
- MIT License + public GitHub repository  
- API base : [`https://timeproofs-api.jeason-bacoul.workers.dev/api`](https://timeproofs-api.jeason-bacoul.workers.dev/api)

### 🔐 Principles
- Privacy-first — only hashes, never raw data  
- Open & transparent — public verifiable proofs  
- Minimal & deterministic — no blockchain, no tokens  
- Predictable cost — no gas, no friction  

---

## 🟠 v0.2 — Developer Experience _(Planned Q4 2025)_

**Status:** 🚧 In progress  
**Goal:** Frictionless integration for developers and AI workflows.

### 🚀 Planned Features
- JavaScript / TypeScript SDK (browser + Node)  
  - `createFromText`, `createFromFile`, `createFromHash`, `verify`  
- PDF certificate (downloadable proof bundle)  
- Verify UI improvements (“Copy as cURL”, “Copy JSON”, Proof modal)  
- Docs refresh — limits, FAQ, live examples  
- Minor UX polish + mobile layout updates  

**Objective:** Integration in minutes, proofs readable by humans and machines.  

---

## 🟡 v1.0 — Productization _(Target 2026)_

**Status:** 🔜 Planned  
**Goal:** Reliability, access control, and monetization.

### 📦 Planned Features
- API keys & usage quotas (Free / Pro / Team)  
- Dashboard (usage stats, CSV export, key rotation)  
- Webhooks (success / failure callbacks)  
- Billing via **Stripe** (micro-payments)  
- `/api/status` endpoint  

**Objective:** Scalable, predictable operations for individuals and teams.  

---

## 🔵 v2.0 — Validation Layer _(Research 2026 – 2027)_

**Status:** 🧪 Research  
**Goal:** Distributed proof validation and offline verification.

### 🔬 Planned Features
- **ProofChain** — periodic aggregation + Merkle root publication  
- SDKs for **Python** & **Go**  
- Advanced verify — offline proof bundles  
- CLI tool for CI/CD timestamping  
- Anchoring + attestations (RFC 3161 / TSA compatibility)  

**Objective:** Extra assurance without sacrificing speed or privacy.  

---

## 💡 Backlog / Ideas
- Per-agent API keys and attestations  
- Cloud storage hooks (S3 / GCS hash-on-upload)  
- Organization features (roles, audit export, SIEM)  
- Proof feed / analytics export  
- RFC 3161 compatibility (research)  

---

## 🧭 Version Principles

| Version | Scope | Expected Stability |
|----------|--------|--------------------|
| v0.1 | Public MVP | ✅ Stable |
| v0.2 | Developer Experience | 🟠 Beta |
| v1.0 | Product Ready | 🟡 Stable |
| v2.0 | Distributed Validation | 🔵 Experimental |

---

## 🧱 Architecture Reference

| Layer | Stack |
|--------|--------|
| Edge API | Cloudflare Workers + KV |
| Frontend | Vercel (Static HTML / Next.js) |
| Storage | KV `{ hash, timestamp, signature }` |
| Security | HMAC-SHA256 over `hash + timestamp` |
| Docs | [`timeproofs.io/docs.html`](https://timeproofs.io/docs.html) |

---

## 🔒 Security & Privacy Highlights
- Only hashes stored — never user files or personal data  
- HTTPS / TLS 1.3 enforced  
- No cookies, no tracking  
- Proofs verifiable independently, no central trust  

---

## 🧠 Governance & Transparency
- Open-source under [MIT](./LICENSE) License  
- Public roadmap and changelog on GitHub  
- Transparent version tags (`v0.1`, `v0.2`, …)  
- Coordinated releases via GitHub tags + site updates  

---

## 🗓️ Release Timeline (estimated)

| Version | ETA | Theme |
|----------|-----|-------|
| v0.1 | ✅ Live | Public Beta |
| v0.2 | Q4 2025 | SDK + DX |
| v1.0 | 2026 | API Keys + Stripe |
| v2.0 | 2026 – 2027 | Validation Network |

---

## 📬 Feedback & Contact
💬 **hello@timeproofs.io**  
🌐 [https://timeproofs.io](https://timeproofs.io)  
🐦 @TimeProofs (coming soon)  
👤 Maintainer — [BACOUL](https://github.com/BACOUL)

---

**TimeProofs — Proof of Existence. For Everything.**
