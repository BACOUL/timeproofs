# 🕓 TimeProofs — Changelog

> The open, privacy-first, edge-native proof-of-existence protocol.  
> Built to become the universal standard for verifiable integrity and existence proofs.

All notable changes to **TimeProofs** are documented here.  
This project follows **Semantic Versioning**.

---

## 🟢 v0.1 — Public Beta (Final) — 2025
**Status:** ✅ Live  
**Tag:** `v0.1-final`  
**Goal:** Deliver a stable, verifiable public MVP.

### ✨ Features
- **API**
  - `/api/timestamp` — create a proof for any SHA-256 hash
  - `/api/verify` — public verification endpoint
- **Infrastructure**
  - Edge API: **Cloudflare Workers**
  - Verification storage (v0.1): **KV mapping for public verify** (hash → proof material)
- **Frontend**
  - Static site: Verify UI, Docs, Privacy, Legal, Regulations, Security, humans.txt, RSS
- **SEO**
  - sitemap, robots, canonical links

### 🔐 Principles
- Privacy-first: only hashes (never raw content)
- Deterministic and transparent (no blockchain)
- Public verification available (v0.1 uses minimal storage to enable hash-only verify)

---

## 🔖 Cryptographic Release Proof — v0.1-final
All site pages and the API worker are sealed with TimeProofs.

- **Release:** v0.1-final  
- **Homepage SHA-256:**  
  `b67b94aef97040f0e56c73ec6e6c07e42807a55a390c26fe2fbefc8a0e6bcec3`  
- **Manifest:** `/releases/v0.1.json`  
- **Verify URL:**  
  `https://timeproofs.io/verify.html?hash=b67b94aef97040f0e56c73ec6e6c07e42807a55a390c26fe2fbefc8a0e6bcec3`

---

## ✅ v0.1 Completion Checklist (SST Gates)

### 1. Product
- API stable (`/api/timestamp`, `/api/verify`)
- Verify UI operational
- Docs consistent + OpenAPI exposed
- Hash-only inputs

### 2. Publication
- Domain active + HTTPS + DNSSEC
- Sitemap + robots + canonical
- Search Console validated
- Privacy analytics (no cookies)

### 3. Branding
- Logo, favicon, OG images
- Unified header/footer across all pages
- “Status: Public Beta v0.1” visible

### 4. Legal & Compliance
- `privacy.html`, `legal.html`, `/.well-known/security.txt`, `humans.txt`
- License published in repo
- No raw content stored

### 5. Communication
- Public website complete
- README professional
- Changelog + roadmap aligned
- Release proof published

### 6. Infrastructure
- Cloudflare Worker stable
- (v0.1) KV used for hash-only public verify
- Release manifest `/releases/v0.1.json`

### 7. Tests & Sign-off
- Lighthouse mobile/desktop ≥ 96
- Real tests (4G + desktop)
- API consistency checked
- GitHub release created

**→ v0.1 is DONE.**

---

## 🟠 v0.2 — Stateless Proof Bundles (In progress)
**Status:** 🚧 In progress  
**Goal:** Make TimeProofs frictionless for developers and AI systems — **without server-side storage**.

### ✅ Core changes vs v0.1
- **Stateless API**: the server stores nothing for verification.
- **Portable proofs**: `.tproof.json` self-contained bundles (offline-first).
- **Public verifiability**: Ed25519 signatures (issuer keys identified by `keyId`).

### Planned features
- ProofSpec v0.2 publication (normative protocol)
- `.tproof.json` bundle format + JSON Schema
- JavaScript / TypeScript SDK v0.2
  - `hashText`, `hashBytes`, `hashFile`
  - `timestamp(hash)`
  - `createBundle(...)`
  - `verifyBundle(bundle, fileOrBytes?)`
- Verify UI improvements (simplified)
  - Clear “Download proof” primary action
  - Optional “Copy verification link”
- Docs refresh + FAQ
- Mobile polish

### v0.2 verification rule (important)
- In stateless mode, **a hash alone cannot be verified**.
- Verification requires the **full `.tproof.json` bundle** (offline) or a stateless POST verification using the bundle.

---

## 🟡 v1.0 — Productization (Planned)
**Status:** 🔜 Planned  
**Goal:** Keys, billing, reliability.

### Planned features
- API keys (Free / Pro / Business / Enterprise)
- Dashboard (usage, exports, key rotation)
- Stripe billing
- Webhooks
- Status & transparency endpoints

---

## 🔵 v2.0 — Validation Layer (Research)
**Status:** 🧪 Research  
**Goal:** Distributed validation + advanced archival/audit workflows.

### Ideas
- Merkle-based aggregation (ProofChain)
- SDKs for Python & Go
- CLI for CI/CD timestamping
- Attestations / standard alignment explorations

---

## 🧱 Architecture Summary (current direction)

| Layer | Stack |
|------|------|
| Edge API | Cloudflare Workers (v0.2: stateless) |
| Frontend | Static HTML |
| Storage | v0.1: KV for hash-only verify · v0.2: **none** |
| Proof | v0.2: Ed25519-signed canonical payload + `.tproof.json` |
| Docs | `timeproofs.io/docs.html` |

---

## 🔒 Security & Privacy Highlights
- Never store or transmit raw content
- Hash-only inputs
- No cookies analytics
- v0.2: offline-first verification via portable proofs

---

## 📬 Contact
Email: **contact@timeproofs.io**  
Website: **https://timeproofs.io**  
Maintainer: **@BACOUL**

**TimeProofs — Proof of Existence. For Everything.**
