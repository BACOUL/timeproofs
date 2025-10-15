*** Begin Patch
*** Update File: README.md
@@
-<h1 align="center">⏱️ TimeProofs</h1>
-<p align="center"><strong>Proof of Existence. For Everything.</strong></p>
-
-<p align="center">
-  <strong>The universal proof layer for AI, developers, and the internet.</strong><br>
-  Timestamp, verify, and preserve truth — at the speed of light.
-</p>
-
-<p align="center">
-  <a href="https://timeproofs.vercel.app">Website</a> •
-  <a href="#-overview">Overview</a> •
-  <a href="#-quick-start">Quick Start</a> •
-  <a href="#-architecture">Architecture</a> •
-  <a href="#-api-reference">API</a> •
-  <a href="#-use-cases">Use Cases</a> •
-  <a href="#-roadmap">Roadmap</a> •
-  <a href="#-contribute">Contribute</a> •
-  <a href="#-license">License</a>
-</p>
-
-<p align="center">
-  <img src="https://img.shields.io/badge/build-passing-brightgreen?style=flat-square" />
-  <img src="https://img.shields.io/badge/version-v0.1-blue?style=flat-square" />
-  <img src="https://img.shields.io/badge/powered%20by-Cloudflare%20Workers-orange?style=flat-square" />
-  <img src="https://img.shields.io/badge/verified-cryptographic%20HMAC256-8A2BE2?style=flat-square" />
-  <img src="https://img.shields.io/badge/license-MIT-lightgrey?style=flat-square" />
-</p>
-
----
-
-## 🌍 Overview
-
-**TimeProofs** is an edge-native API for **timestamping and verifying digital existence** — a minimal, scalable, and privacy-first alternative to blockchain notarization.
-
-Every hash you send is cryptographically signed with a verifiable timestamp.  
-No tokens. No blockchain. No friction. Just *truth, verified.*
-
-> “If data had a memory, TimeProofs would be it.”
-
-Built for AI agents, developers, and creators who need to prove that something *existed* — right here, right now.
-
----
-
-## 🚀 Quick Start
-
-To create your first proof:
-
-1. Compute the SHA-256 hash of your file, message, or output.  
-2. Send that hash to the `/proof` endpoint.  
-3. Receive a signed proof containing a timestamp and cryptographic signature.  
-4. Anyone can later verify the hash via `/verify`.
-
-Conceptual flow:
-
-- Generate → Send → Receive → Verify.  
-- No upload, no account, no blockchain — only cryptographic evidence.
-
-Once verified, your proof is permanent, public, and independently checkable.
-
----
-
-## ⚡ Key Features
-
-✅ **Proof of Existence** — Verifiable timestamps for any SHA-256 hash  
-🔐 **Cryptographic Integrity** — HMAC-SHA256 with private salt + public verifier  
-🌐 **Edge-Native Architecture** — Global scale via Cloudflare Workers  
-🧠 **AI-Ready** — Designed for LLMs & autonomous agents  
-💾 **Distributed Storage** — Cloudflare KV for near-zero latency proofs  
-📜 **Human-Readable Certificates** — Optional downloadable PDF  
-💶 **Predictable Micro-Payments** — Optional 0.001 € per proof (Stripe)  
-🧩 **Open Verify Layer** — Trust through transparency  
-
----
-
-## 🧩 Architecture
-
-**System overview**
-
-1. **Client / SDK** — Computes SHA-256 locally.  
-2. **API Worker** — Receives the hash, timestamps, signs, and stores proof.  
-3. **KV Store** — Persists `hash + timestamp + signature`.  
-4. **Frontend (Vercel)** — Provides public verification UI and documentation.
-
-[User / AI] → [SHA256 Hash] → [TimeProofs API] → [Signed Timestamp] → [Verify Publicly]
-
----
-
-## 🧠 Why It Matters
-
-In the age of infinite remix and AI-generated content, **proof is the new trust.**  
-TimeProofs provides a neutral, verifiable anchor in time — the missing layer between creation and verification.
-
-It brings cryptographic certainty to a world built on fluid data.
-
-**Typical uses:**
-- AI output authenticity and provenance  
-- Creative or intellectual property timestamping  
-- Legal and contractual digital evidence  
-- Compliance and audit-proof event logs  
-- Verifiable logs for agents or IoT devices  
-
----
-
-## 📘 Use Cases
-
-| Sector | Example | Value |
-|--------|----------|-------|
-| **AI / Agents** | Proof of model outputs and datasets | Trust & reproducibility |
-| **Developers** | Commit or artifact timestamping | Immutable build chains |
-| **Creators** | Digital art, text, or media proofs | Anti-plagiarism and traceability |
-| **Legal / Audit** | Timestamped document signatures | Compliance and evidence |
-| **Security** | Log attestation and monitoring | Tamper detection and trace logs |
-
-Each use case follows the same principle:  
-Generate → Sign → Verify → Trust.
-
----
-
-## 🧭 API Reference
-
-**Base URL:** `https://api.timeproofs.io`
-
-**Endpoints**
-
-**`/proof`** — Create a proof of existence  
-- Method: POST  
-- Body: `{ "hash": "sha256_of_your_data" }`  
-- Returns: `{ proof_id, timestamp, signature }`
-
-**`/verify`** — Verify authenticity  
-- Method: GET  
-- Query: `?hash=your_hash`  
-- Returns: `{ valid: true, timestamp, signature }`
-
-Each proof is signed with **HMAC-SHA256** and can be verified using the public key available in `/docs.html`.
-
----
-
-## 🧮 Example Integration
-
-**JavaScript SDK (coming soon)**  
-
-import { timeproof } from "@timeproofs/sdk"
-const proof = await timeproof(hash)
-
----
-
-The SDK automatically:
-
-- Computes the SHA-256 hash (if not already provided)  
-- Calls the TimeProofs API to create or verify proofs  
-- Returns a structured object containing the timestamp, signature, and verification status  
-
-This approach allows developers to integrate proof generation in seconds — no setup, no infrastructure, no external dependencies.
-
----
-
-## 🧭 Roadmap
-
-| Version | Description | Status |
-|----------|-------------|---------|
-| **v0.1** | Public API + Verify UI (MVP) | ✅ Live |
-| **v0.2** | JavaScript SDK + PDF Proof Export | 🔄 In progress |
-| **v1.0** | Dashboard + Stripe Micro-Payments | 🔜 Coming soon |
-| **v2.0** | ProofChain (Distributed Validation Network) | 🔬 Research phase |
-
-Each version expands reliability, interoperability, and ecosystem adoption.
-
----
-
-## 🧭 Design Principles
-
-- **Privacy-First** — Only hashes are processed, never raw content  
-- **Open Verification** — Proofs are publicly verifiable without central authority  
-- **Edge-Native** — Global performance powered by Cloudflare Workers  
-- **Predictable Cost** — No tokens, gas, or blockchain friction  
-- **Minimalism** — Simple, transparent, and lightweight by design  
-
-TimeProofs follows one rule: **if it isn’t verifiable, it doesn’t exist.**
-
----
-
-## 💡 Vision
-
-By 2030, AI-generated data will exceed all human-created information.  
-**TimeProofs** aims to become the *universal timestamping backbone* of this era —  
-an open protocol where every digital action can be cryptographically anchored in time.
-
-> “Truth moves fast. TimeProofs makes it verifiable.”
-
-Our goal: make verifiable existence a fundamental layer of the internet —  
-for humans, for AI, and for the systems that connect them.
-
----
-
-## 🤝 Contribute
-
-We welcome developers, researchers, and open-source contributors.  
-
-You can:
-- Fork the repository and enhance SDKs or integrations  
-- Suggest new features or report issues  
-- Write tutorials or documentation in your language  
-- Test integrations on Cloudflare Workers or serverless environments  
-
-Start with:
-- `README.md` — overview and API reference  
-- `CONTRIBUTING.md` — contribution rules (coming soon)  
-- `LICENSE` — MIT, free for commercial and personal use  
-
-### Contributor Values  
-✅ Transparency • 🧩 Simplicity • 🧠 Innovation • 🤝 Respect  
-
-If you build something with TimeProofs, share it —  
-we’ll feature community projects and experiments in the release notes.
-
----
-
-## 📜 License
-
-**MIT License** — Free for personal and commercial use.  
-You may use, modify, and distribute this software with attribution.
-
----
-
-<p align="center">
-  <strong>TimeProofs</strong><br>
-  Proof of Existence. For Everything.<br>
-  <a href="https://timeproofs.vercel.app">timeproofs.vercel.app</a>
-</p>
+<h1 align="center">⏱️ TimeProofs</h1>
+<p align="center"><strong>Proof of Existence. For Everything.</strong></p>
+
+<p align="center">
+  <strong>The universal proof layer for AI, developers, and the internet.</strong><br>
+  Hash locally • Timestamp via API • Verify publicly — no blockchain, no friction.
+</p>
+
+<p align="center">
+  <a href="https://timeproofs.vercel.app">Website</a> •
+  <a href="#-overview">Overview</a> •
+  <a href="#-quick-start">Quick Start</a> •
+  <a href="#-architecture">Architecture</a> •
+  <a href="#-api-reference">API</a> •
+  <a href="#-use-cases">Use Cases</a> •
+  <a href="#-security--privacy">Security</a> •
+  <a href="#-sdk-roadmap">SDK</a> •
+  <a href="#-community">Community</a> •
+  <a href="#-license">License</a>
+</p>
+
+<p align="center">
+  <img src="https://img.shields.io/badge/build-passing-brightgreen?style=flat-square" />
+  <img src="https://img.shields.io/badge/version-v0.1-blue?style=flat-square" />
+  <img src="https://img.shields.io/badge/powered%20by-Cloudflare%20Workers-orange?style=flat-square" />
+  <img src="https://img.shields.io/badge/verified-HMAC%20SHA256-8A2BE2?style=flat-square" />
+  <img src="https://img.shields.io/badge/license-MIT-lightgrey?style=flat-square" />
+  <img src="https://img.shields.io/badge/deploy-Vercel-black?logo=vercel&style=flat-square" />
+</p>
+
+---
+
+## 🌍 Overview
+
+**TimeProofs** is an edge-native API to **timestamp and verify digital existence** — a minimal, scalable, privacy-first alternative to blockchain notarization.
+
+Every SHA-256 hash you send is cryptographically signed with an immutable timestamp.  
+No tokens. No blockchain. No upload. Just **truth, verified.**
+
+> “If data had a memory, TimeProofs would be it.”
+
+---
+
+## 🚀 Quick Start
+
+1) Compute a SHA-256 hash (client or server).  
+2) `POST /timestamp` with that hash.  
+3) Receive `{ timestamp, signature, verify_url }`.  
+4) Anyone can `GET /verify?hash=...`.
+
+Flow: **Generate → Send → Sign → Verify**
+
+---
+
+## ⚡ Key Features
+
+✅ **Proof of Existence** — verifiable timestamp for any SHA-256 hash  
+🔐 **Cryptographic Integrity** — HMAC-SHA256 over `hash + timestamp`  
+🌐 **Edge-Native** — Cloudflare Workers + KV, global low latency  
+🧠 **AI-Ready** — ideal for agents, pipelines, and datasets  
+📜 **Human-Readable Proofs** — (soon) downloadable certificate PDF  
+💶 **Predictable Cost** — no gas, optional micro-payments (Stripe)  
+🧩 **Open Verify Layer** — public, deterministic verification  
+
+---
+
+## 🧩 Architecture
+
+1. **Client / SDK** — computes SHA-256 locally (no upload).  
+2. **API Worker** — timestamps, signs, stores `{hash, ts, sig, type?, meta?}`.  
+3. **KV Store** — durable, globally replicated lookup.  
+4. **Frontend (Vercel)** — public verify UI + docs.
+
+[User/Agent] → [SHA256 Hash] → [TimeProofs API] → [Signed Timestamp] → [Public Verify]
+
+---
+
+## 🧭 API Reference
+
+**Base URL (beta)**  
+`https://timeproofs-api.jeason-bacoul.workers.dev/api`  
+_(planned GA: `https://api.timeproofs.io`)_
+
+### `POST /timestamp` — Create a proof
+
+**Request**
+```json
+{
+  "hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
+  "type": "event",
+  "meta": { "model": "gpt-4o", "mime": "text/plain" }
+}
+```
+
+**Response**
+```json
+{
+  "ok": true,
+  "hash": "e3b0c4...",
+  "timestamp": "2025-01-15T12:34:56.789Z",
+  "signature": "hmac_sha256(hash|timestamp)",
+  "verify_url": "https://timeproofs-api.jeason-bacoul.workers.dev/api/verify?hash=e3b0..."
+}
+```
+
+### `GET /verify?hash={sha256}` — Verify a proof
+
+**Response**
+```json
+{
+  "ok": true,
+  "found": true,
+  "hash": "e3b0c4...",
+  "timestamp": "2025-01-15T12:34:56.789Z",
+  "signature": "server_signature",
+  "type": "event",
+  "meta": { "model": "gpt-4o" }
+}
+```
+
+---
+
+## 📘 Use Cases
+
+| Sector | Example | Value |
+|--------|--------|-------|
+| **AI / Agents** | Proof for prompts/outputs/datasets | Trust & reproducibility |
+| **Developers** | Artifact / release integrity | Supply-chain confidence |
+| **Creators** | IP snapshots (text, art, media) | Authorship & anti-plagiarism |
+| **Legal / Audit** | Document & email existence | Lightweight evidence |
+| **Security** | Log attestation, webhooks | Tamper detection |
+
+---
+
+## 🔒 Security & Privacy
+
+- Only **hashes** are processed/stored, never raw content.  
+- Proofs kept in **Cloudflare KV** with minimal metadata you provide.  
+- Transport secured with **TLS**. No cookies, no tracking.  
+- Verification is public and reproducible without revealing content.  
+
+See also: [`SECURITY.md`](./SECURITY.md) and the site’s Privacy Policy.
+
+---
+
+## 🧩 SDK Roadmap
+
+| SDK | Status | Target |
+|-----|--------|--------|
+| JavaScript / TypeScript | 🚧 Alpha | v0.2 |
+| Python | 🧪 Planned | v2.0 |
+| Go | 🧪 Planned | v2.0 |
+
+The SDK will automatically hash (if needed), call `/timestamp`, and return a structured `{ hash, timestamp, signature, verify_url }`.
+
+---
+
+## 🧭 Roadmap
+
+| Version | Description | Status |
+|---------|-------------|--------|
+| **v0.1** | Public API + Verify UI (MVP) | ✅ Live |
+| **v0.2** | JS SDK + PDF Certificate | 🔄 In progress |
+| **v1.0** | API Keys + Dashboard + Stripe | 🔜 Planned |
+| **v2.0** | ProofChain (light validation) | 🔬 Research |
+
+---
+
+## 🤝 Community
+
+- 🌐 Website → <https://timeproofs.vercel.app>  
+- 📄 Docs → `/docs.html` • 🔎 Verify → `/verify.html`  
+- ✉️ Email → hello@timeproofs.io
+
+---
+
+## Contribute
+
+Read [`CONTRIBUTING.md`](./CONTRIBUTING.md) and follow our [`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md).  
+Issues and PRs are welcome!
+
+---
+
+## 📜 License
+
+**MIT** — free for personal and commercial use. See [`LICENSE`](./LICENSE).
+
+<p align="center">
+  <strong>TimeProofs</strong> — Proof of Existence. For Everything.
+</p>
*** End Patch
*** Add File: CONTRIBUTING.md
+# Contributing to TimeProofs
+
+Thanks for your interest in contributing! We welcome issues, ideas, and pull requests.
+
+## How to contribute
+1. **Fork** the repo and create a feature branch: `git checkout -b feat/your-idea`.
+2. Keep changes **small and focused**. One concern per PR.
+3. Add/adjust docs if your change affects behavior or APIs.
+4. Ensure pages build locally (Vercel static) and Worker compiles (if applicable).
+5. Open a PR with a clear title and description (what/why/how).
+
+## Commit style
+- Use concise, present-tense messages: `feat: add verify copy buttons`, `fix: handle invalid hash`.
+- Reference issues when relevant: `fix: … (closes #123)`.
+
+## Coding guidelines
+- **Security & privacy first**: never handle raw user content server-side.
+- **Minimalism**: prefer simple, readable code over abstractions.
+- **Determinism**: avoid nondeterministic outputs for proof data.
+- **Accessibility**: keep UI keyboard-navigable, ARIA-labeled.
+
+## Reporting issues
+Include:
+- Steps to reproduce
+- Expected vs actual behavior
+- Browser/runtime + versions
+- Screenshots or logs if helpful
+
+## Feature proposals
+Explain the problem, not just the solution. Add a minimal example of the desired DX.
+
+## Contact
+hello@timeproofs.io
+
+By contributing, you agree to follow our [Code of Conduct](./CODE_OF_CONDUCT.md).
*** End Patch
*** Add File: SECURITY.md
+# Security Policy
+
+We take security and privacy seriously. If you believe you’ve found a vulnerability or any security issue, please **do not** open a public issue.
+
+## Reporting a vulnerability
+- Email: **security@timeproofs.io**
+- Include steps to reproduce, potential impact, and any mitigations you suggest.
+- We’ll acknowledge receipt within a reasonable timeframe and keep you updated as we investigate.
+
+## Scope & principles
+- Only **SHA-256 hashes** are processed/stored; raw content is never uploaded.
+- Proofs are `{ hash, timestamp, signature, type?, meta? }` stored in Cloudflare KV.
+- Signatures use HMAC-SHA256 over `hash + timestamp` using a private secret.
+- Transport is encrypted (HTTPS/TLS).
+
+## Non-goals
+- We don’t provide confidentiality for the **hash** itself — treat it as public metadata.
+- We don’t guarantee legal sufficiency in all jurisdictions (see Legal/Privacy on the site).
+
+## Responsible disclosure
+Please give us a reasonable window to remediate before public disclosure. We appreciate coordinated efforts that protect users.
*** End Patch
*** Add File: CODE_OF_CONDUCT.md
+# Code of Conduct
+
+## Our Pledge
+We are committed to providing a friendly, safe, and welcoming environment for all, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.
+
+## Our Standards
+Positive behaviors:
+- Using welcoming and inclusive language
+- Being respectful of differing viewpoints and experiences
+- Gracefully accepting constructive criticism
+- Focusing on what is best for the community
+- Showing empathy towards other community members
+
+Unacceptable behaviors:
+- Trolling, insulting/derogatory comments, and personal or political attacks
+- Public or private harassment
+- Publishing others’ private information without explicit permission
+- Any behavior that would be considered inappropriate in a professional setting
+
+## Our Responsibilities
+Project maintainers are responsible for clarifying standards of acceptable behavior and will take appropriate and fair corrective action in response to any instances of unacceptable behavior.
+
+## Scope
+This Code applies within project spaces and in public spaces when an individual is representing the project or its community.
+
+## Enforcement
+Instances of abusive, harassing, or otherwise unacceptable behavior may be reported to **conduct@timeproofs.io**. All complaints will be reviewed and investigated and will result in a response that is deemed necessary and appropriate to the circumstances.
+
+Project maintainers who do not follow or enforce the Code in good faith may face temporary or permanent repercussions.
+
+---
+
+By participating, you agree to abide by this Code of Conduct.
*** End Patch
