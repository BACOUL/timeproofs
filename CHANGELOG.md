# 🕓 TimeProofs — Changelog

> The open, privacy-first, edge-native proof-of-existence protocol.  
> Built to become the universal standard for digital truth and authenticity.

All notable changes to **TimeProofs** are documented here.  
This project follows **Semantic Versioning**.

---

## 🟢 v0.1 — Public Beta (Final) — 2025  
**Status:** ✅ Live  
**Tag:** `v0.1-final`  
**Goal:** Deliver a stable, verifiable, public MVP available to everyone.

### ✨ Features
- `/timestamp` — create proof of existence for any SHA-256 hash  
- `/verify` — independent public verification endpoint  
- Edge-native global infrastructure: **Cloudflare Workers + KV**  
- Frontend static site (Vercel): **Verify UI**, **Docs**, **Privacy**, **Legal**, **Regulations**, **Security**, **Human.txt**, **RSS**  
- SEO setup: sitemap, robots, canonical links  
- MIT License + public open-source repository  
- API base URL: `https://api.timeproofs.io/api`

### 🔐 Principles
- Privacy-first — only hashes, never raw content  
- Open verification — proofs readable & independently checkable  
- Minimalism — deterministic, transparent, no blockchain  
- Predictable cost — no gas, no tokens, no friction  

---

## 🔖 Cryptographic Release Proof — v0.1-final

All pages of the site and the API worker are sealed with TimeProofs.

- **Release:** v0.1-final  
- **Homepage SHA-256:**  
  `b67b94aef97040f0e56c73ec6e6c07e42807a55a390c26fe2fbefc8a0e6bcec3`  
- **Manifest:** `/releases/v0.1.json`  
- **Verify URL:**  
  `https://timeproofs.io/verify.html?hash=b67b94aef97040f0e56c73ec6e6c07e42807a55a390c26fe2fbefc8a0e6bcec3`

Every hash can be verified via the public Verify tool or `/api/verify`.

---

## ✅ v0.1 Completion Checklist (SST Gates)

### 1. Product
- API stable (`/timestamp`, `/verify`)  
- Verify UI operational  
- Docs updated and consistent  
- OpenAPI exposed  
- 100% hash-only, privacy-first  

### 2. Publication
- Domain active + HTTPS + DNSSEC  
- Sitemap + robots + canonical  
- Search Console validated  
- Plausible analytics (no cookies)  

### 3. Branding
- Logo, favicon, OG images, social previews  
- Unified header/footer across all pages  
- “Status: Public Beta v0.1” visible  
- Cohesive typography & tokens  

### 4. Legal & Compliance
- `privacy.html`, `legal.html`, `security.txt`, `humans.txt`  
- MIT License in repo  
- No personal data stored  

### 5. Communication
- Public website complete  
- README professional  
- Changelog + roadmap aligned  
- Cryptographic release proof added  

### 6. Infrastructure
- Cloudflare Workers + KV stable  
- Static site on Vercel  
- Anti-lock-in minimal (API contract stable)  
- Release manifest `/releases/v0.1.json`  

### 7. Tests & Sign-off
- Lighthouse mobile/desktop ≥ 96  
- Real tests on 4G + desktop  
- API consistency checked  
- All hashes verified  
- GitHub release created  

**→ v0.1 is officially DONE.**

---

## 🟠 v0.2 — Developer Experience (Planned Q4 2025)  
**Status:** 🚧 In progress  
**Goal:** Make TimeProofs frictionless for developers and AI systems.

### Planned Features
- JavaScript / TypeScript SDK  
  - `createFromText`  
  - `createFromFile`  
  - `createFromHash`  
  - `verify`  
- PDF certificate generation  
- `.tproof.json` bundle format  
- Verify UI improvements:  
  - “Copy as cURL”  
  - “Copy JSON”  
  - Proof modal  
- Docs refresh + FAQ  
- Mobile layout polish  

---

## 🟡 v1.0 — Productization (2026)  
**Status:** 🔜 Planned  
**Goal:** Professional infrastructure, billing, and reliability.

### Planned Features
- API keys (Free / Pro / Team)  
- Dashboard (usage, CSV export, key rotation)  
- Stripe billing  
- Webhooks  
- `/api/status` endpoint  

---

## 🔵 v2.0 — Validation Layer (2026–2027)  
**Status:** 🧪 Research  
**Goal:** Distributed validation + offline proofs.

### Planned Features
- ProofChain (Merkle-based verification)  
- SDKs for Python & Go  
- Offline verification mode  
- CLI for CI/CD timestamping  
- Attestations (RFC 3161 exploration)  

---

## 💡 Backlog / Ideas
- Role-based API keys  
- Hash-on-upload for S3 / GCS  
- Global SIEM / audit exports  
- Proof feeds  
- Advanced trust scores  

---

## 🧭 Version Principles

| Version | Scope | Stability |
|--------|--------|-----------|
| v0.1 | Public MVP | Stable |
| v0.2 | Developer Experience | Beta |
| v1.0 | Product Ready | Stable |
| v2.0 | Validation Layer | Experimental |

---

## 🧱 Architecture Summary

| Layer | Stack |
|-------|--------|
| Edge API | Cloudflare Workers + KV |
| Frontend | Vercel (static HTML) |
| Storage | KV `{ hash, timestamp, signature }` |
| Security | HMAC-SHA256 over `hash + timestamp` |
| Docs | `timeproofs.io/docs.html` |

---

## 🔒 Security & Privacy Highlights
- Only SHA-256 hashes stored  
- HTTPS/TLS 1.3 enforced  
- No cookies, no tracking  
- Independent verification possible  

---

## 🧠 Governance & Transparency
- Open-source under MIT  
- Public roadmap  
- Public changelog  
- Cryptographically verified releases  
- Canonical spec hosted on the site  

---

## 🗓️ Release Timeline

| Version | ETA | Theme |
|---------|------|-----------|
| v0.1 | ✔ Live | Public Beta |
| v0.2 | Q4 2025 | SDK + DX |
| v1.0 | 2026 | API Keys + Billing |
| v2.0 | 2026–2027 | Validation Network |

---

## 📬 Contact
Email: **hello@timeproofs.io**  
Security: **security@timeproofs.io**  
Website: **https://timeproofs.io**  
Maintainer: **@BACOUL**

---

**TimeProofs — Proof of Existence. For Everything.**
