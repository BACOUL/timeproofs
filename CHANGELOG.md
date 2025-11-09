# 🕓 TimeProofs — Changelog

<<<<<<< HEAD
> The universal proof layer for AI, developers, and the internet.  
> Built openly, privacy-first, and edge-native.

All notable changes to **TimeProofs** will be documented in this file.  
=======
> The open, privacy-first, edge-native proof-of-existence protocol.  
> Built to become the universal layer for AI, developers, and digital authenticity.

All notable changes to **TimeProofs** are documented in this file.  
>>>>>>> timeproofsv01
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

<<<<<<< HEAD
## 🟢 v0.1 — Public Beta _(February 2025)_
=======
## 🟢 v0.1 — Public Beta _(October 2025)_
>>>>>>> timeproofsv01

**Status:** ✅ Live  
**Tag:** `v0.1.0`  
**Goal:** Deliver a stable, public MVP anyone can test.

### ✨ Features
- `/timestamp` → create proof of existence for any SHA-256 hash  
<<<<<<< HEAD
- `/verify` → public proof validation  
- Edge-native infra: **Cloudflare Workers + KV**
- Frontend (Vercel) with **Verify UI**, **Docs**, **Privacy**, **Legal**
- Sitemap + SEO structure  
- MIT License + Public GitHub repository  
- API base: `https://timeproofs-api.jeason-bacoul.workers.dev/api`
=======
- `/verify` → public proof validation endpoint  
- Edge-native infra : **Cloudflare Workers + KV**  
- Frontend (Vercel) : **Verify UI**, **Docs**, **Privacy**, **Legal**  
- SEO / sitemap / robots setup  
- MIT License + public GitHub repository  
- API base : [`https://timeproofs-api.jeason-bacoul.workers.dev/api`](https://timeproofs-api.jeason-bacoul.workers.dev/api)
>>>>>>> timeproofsv01

### 🔐 Principles
- Privacy-first — only hashes, never raw data  
- Open & transparent — public verifiable proofs  
- Minimal & deterministic — no blockchain, no tokens  
<<<<<<< HEAD
- Predictable cost — no gas, no friction
=======
- Predictable cost — no gas, no friction  
>>>>>>> timeproofsv01

---

## 🟠 v0.2 — Developer Experience _(Planned Q4 2025)_

**Status:** 🚧 In progress  
**Goal:** Frictionless integration for developers and AI workflows.

### 🚀 Planned Features
- JavaScript / TypeScript SDK (browser + Node)  
<<<<<<< HEAD
  - `createFromText`, `createFromFile`, `createFromHash`, `verify`
- PDF certificate — downloadable proof bundle  
- Verify UI improvements  
  - “Copy as cURL” & “Copy JSON” buttons  
  - Proof detail modal  
- Docs refresh — limits, FAQ, live examples  
- Minor UX polish + mobile layout updates

**Objective:** Integration in minutes, proofs readable by humans and machines.

---

## 🟡 v1.0 — Productization _(Target: 2026)_
=======
  - `createFromText`, `createFromFile`, `createFromHash`, `verify`  
- PDF certificate (downloadable proof bundle)  
- Verify UI improvements (“Copy as cURL”, “Copy JSON”, Proof modal)  
- Docs refresh — limits, FAQ, live examples  
- Minor UX polish + mobile layout updates  

**Objective:** Integration in minutes, proofs readable by humans and machines.  

---

## 🟡 v1.0 — Productization _(Target 2026)_
>>>>>>> timeproofsv01

**Status:** 🔜 Planned  
**Goal:** Reliability, access control, and monetization.

### 📦 Planned Features
- API keys & usage quotas (Free / Pro / Team)  
- Dashboard (usage stats, CSV export, key rotation)  
- Webhooks (success / failure callbacks)  
<<<<<<< HEAD
- Billing via **Stripe** — predictable micro-payments  
- `/api/status` endpoint  

**Objective:** Scalable, predictable operations for individuals & teams.

---

## 🔵 v2.0 — Validation Layer _(Research Phase: 2026–2027)_
=======
- Billing via **Stripe** (micro-payments)  
- `/api/status` endpoint  

**Objective:** Scalable, predictable operations for individuals and teams.  

---

## 🔵 v2.0 — Validation Layer _(Research 2026 – 2027)_
>>>>>>> timeproofsv01

**Status:** 🧪 Research  
**Goal:** Distributed proof validation and offline verification.

### 🔬 Planned Features
- **ProofChain** — periodic aggregation + Merkle root publication  
<<<<<<< HEAD
- SDKs: **Python** & **Go**  
- Advanced verify — offline proof bundles  
- CLI tool for CI/CD timestamping  
- Anchoring + attestations (RFC 3161 / TSA compatibility)

**Objective:** Extra assurance without sacrificing speed or privacy.
=======
- SDKs for **Python** & **Go**  
- Advanced verify — offline proof bundles  
- CLI tool for CI/CD timestamping  
- Anchoring + attestations (RFC 3161 / TSA compatibility)  

**Objective:** Extra assurance without sacrificing speed or privacy.  
>>>>>>> timeproofsv01

---

## 💡 Backlog / Ideas
<<<<<<< HEAD
- Per-agent API keys & attestations  
- Cloud storage hooks (S3 / GCS hash-on-upload)  
- Organization features (roles, audit export, SIEM)  
- Proof feed / analytics export  
- RFC 3161 compatibility (research)
=======
- Per-agent API keys and attestations  
- Cloud storage hooks (S3 / GCS hash-on-upload)  
- Organization features (roles, audit export, SIEM)  
- Proof feed / analytics export  
- RFC 3161 compatibility (research)  
>>>>>>> timeproofsv01

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
<<<<<<< HEAD
| Docs | `timeproofs.io/docs.html` |
=======
| Docs | [`timeproofs.io/docs.html`](https://timeproofs.io/docs.html) |
>>>>>>> timeproofsv01

---

## 🔒 Security & Privacy Highlights
- Only hashes stored — never user files or personal data  
- HTTPS / TLS 1.3 enforced  
- No cookies, no tracking  
<<<<<<< HEAD
- Proofs are verifiable independently without central trust  
=======
- Proofs verifiable independently, no central trust  
>>>>>>> timeproofsv01

---

## 🧠 Governance & Transparency
<<<<<<< HEAD
- Open-source under MIT License  
=======
- Open-source under [MIT](./LICENSE) License  
>>>>>>> timeproofsv01
- Public roadmap and changelog on GitHub  
- Transparent version tags (`v0.1`, `v0.2`, …)  
- Coordinated releases via GitHub tags + site updates  

---

<<<<<<< HEAD
## 🗓️ Release Timeline (est.)
=======
## 🗓️ Release Timeline (estimated)
>>>>>>> timeproofsv01

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
<<<<<<< HEAD
🐦 [@TimeProofs](https://twitter.com/TimeProofs)  
🤝 Community contributions welcome!

---

## 📄 License
Released under the **MIT License © 2025 TimeProofs**  
Maintained by **@BACOUL**
=======
🐦 @TimeProofs (coming soon)  
👤 Maintainer — [BACOUL](https://github.com/BACOUL)

---

**TimeProofs — Proof of Existence. For Everything.**
>>>>>>> timeproofsv01
