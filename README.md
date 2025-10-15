<h1 align="center">⏱️ TimeProofs</h1>
<p align="center"><strong>Proof of Existence. For Everything.</strong></p>

<p align="center">
  <strong>The universal proof layer for AI, developers, and the internet.</strong><br>
  Timestamp, verify, and preserve truth — at the speed of light.
</p>

<p align="center">
  <a href="https://timeproofs.vercel.app">Website</a> •
  <a href="#-overview">Overview</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-api-reference">API</a> •
  <a href="#-use-cases">Use Cases</a> •
  <a href="#-roadmap">Roadmap</a> •
  <a href="#-contribute">Contribute</a> •
  <a href="#-license">License</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/build-passing-brightgreen?style=flat-square" />
  <img src="https://img.shields.io/badge/version-v0.1-blue?style=flat-square" />
  <img src="https://img.shields.io/badge/powered%20by-Cloudflare%20Workers-orange?style=flat-square" />
  <img src="https://img.shields.io/badge/verified-cryptographic%20HMAC256-8A2BE2?style=flat-square" />
  <img src="https://img.shields.io/badge/license-MIT-lightgrey?style=flat-square" />
</p>

---

## 🌍 Overview

**TimeProofs** is an edge-native API for **timestamping and verifying digital existence** — a minimal, scalable, and privacy-first alternative to blockchain notarization.

Every hash you send is cryptographically signed with a verifiable timestamp.  
No tokens. No blockchain. No friction. Just *truth, verified.*

> “If data had a memory, TimeProofs would be it.”

Built for AI agents, developers, and creators who need to prove that something *existed* — right here, right now.

---

## 🚀 Quick Start

To create your first proof:

1. Compute the SHA-256 hash of your file, message, or output.  
2. Send that hash to the `/proof` endpoint.  
3. Receive a signed proof containing a timestamp and cryptographic signature.  
4. Anyone can later verify the hash via `/verify`.

Conceptual flow:

- Generate → Send → Receive → Verify.  
- No upload, no account, no blockchain — only cryptographic evidence.

Once verified, your proof is permanent, public, and independently checkable.

---

## ⚡ Key Features

✅ **Proof of Existence** — Verifiable timestamps for any SHA-256 hash  
🔐 **Cryptographic Integrity** — HMAC-SHA256 with private salt + public verifier  
🌐 **Edge-Native Architecture** — Global scale via Cloudflare Workers  
🧠 **AI-Ready** — Designed for LLMs & autonomous agents  
💾 **Distributed Storage** — Cloudflare KV for near-zero latency proofs  
📜 **Human-Readable Certificates** — Optional downloadable PDF  
💶 **Predictable Micro-Payments** — Optional 0.001 € per proof (Stripe)  
🧩 **Open Verify Layer** — Trust through transparency  

---

## 🧩 Architecture

**System overview**

1. **Client / SDK** — Computes SHA-256 locally.  
2. **API Worker** — Receives the hash, timestamps, signs, and stores proof.  
3. **KV Store** — Persists `hash + timestamp + signature`.  
4. **Frontend (Vercel)** — Provides public verification UI and documentation.

```text
[User / AI] → [SHA256 Hash] → [TimeProofs API] → [Signed Timestamp] → [Verify Publicly]

## 🧠 Why It Matters

In the age of infinite remix and AI-generated content, **proof is the new trust.**  
TimeProofs provides a neutral, verifiable anchor in time — the missing layer between creation and verification.

It brings cryptographic certainty to a world built on fluid data.

**Typical uses:**
- AI output authenticity and provenance  
- Creative or intellectual property timestamping  
- Legal and contractual digital evidence  
- Compliance and audit-proof event logs  
- Verifiable logs for agents or IoT devices  

---

## 📘 Use Cases

| Sector | Example | Value |
|--------|----------|-------|
| **AI / Agents** | Proof of model outputs and datasets | Trust & reproducibility |
| **Developers** | Commit or artifact timestamping | Immutable build chains |
| **Creators** | Digital art, text, or media proofs | Anti-plagiarism and traceability |
| **Legal / Audit** | Timestamped document signatures | Compliance and evidence |
| **Security** | Log attestation and monitoring | Tamper detection and trace logs |

Each use case follows the same principle:  
Generate → Sign → Verify → Trust.

---

## 🧭 API Reference

**Base URL:** `https://api.timeproofs.io`

**Endpoints**

**`/proof`** — Create a proof of existence  
- Method: POST  
- Body: `{ "hash": "sha256_of_your_data" }`  
- Returns: `{ proof_id, timestamp, signature }`

**`/verify`** — Verify authenticity  
- Method: GET  
- Query: `?hash=your_hash`  
- Returns: `{ valid: true, timestamp, signature }`

Each proof is signed with **HMAC-SHA256** and can be verified using the public key available in `/docs.html`.

## 🧮 Example Integration

**JavaScript SDK (coming soon)**  

```text
import { timeproof } from "@timeproofs/sdk"
const proof = await timeproof(hash)

The SDK automatically:

- Computes the SHA-256 hash (if not already provided)  
- Calls the TimeProofs API to create or verify proofs  
- Returns a structured object containing the timestamp, signature, and verification status  

This approach allows developers to integrate proof generation in seconds — no setup, no infrastructure, no external dependencies.

---

## 🧭 Roadmap

| Version | Description | Status |
|----------|-------------|---------|
| **v0.1** | Public API + Verify UI (MVP) | ✅ Live |
| **v0.2** | JavaScript SDK + PDF Proof Export | 🔄 In progress |
| **v1.0** | Dashboard + Stripe Micro-Payments | 🔜 Coming soon |
| **v2.0** | ProofChain (Distributed Validation Network) | 🔬 Research phase |

Each version expands reliability, interoperability, and ecosystem adoption.

---

## 🧭 Design Principles

- **Privacy-First** — Only hashes are processed, never raw content  
- **Open Verification** — Proofs are publicly verifiable without central authority  
- **Edge-Native** — Global performance powered by Cloudflare Workers  
- **Predictable Cost** — No tokens, gas, or blockchain friction  
- **Minimalism** — Simple, transparent, and lightweight by design  

TimeProofs follows one rule: **if it isn’t verifiable, it doesn’t exist.**

---

## 💡 Vision

By 2030, AI-generated data will exceed all human-created information.  
**TimeProofs** aims to become the *universal timestamping backbone* of this era —  
an open protocol where every digital action can be cryptographically anchored in time.

> “Truth moves fast. TimeProofs makes it verifiable.”

Our goal: make verifiable existence a fundamental layer of the internet —  
for humans, for AI, and for the systems that connect them.

---

## 🤝 Contribute

We welcome developers, researchers, and open-source contributors.  

You can:
- Fork the repository and enhance SDKs or integrations  
- Suggest new features or report issues  
- Write tutorials or documentation in your language  
- Test integrations on Cloudflare Workers or serverless environments  

Start with:
- `README.md` — overview and API reference  
- `CONTRIBUTING.md` — contribution rules (coming soon)  
- `LICENSE` — MIT, free for commercial and personal use  

### Contributor Values  
✅ Transparency • 🧩 Simplicity • 🧠 Innovation • 🤝 Respect  

If you build something with TimeProofs, share it —  
we’ll feature community projects and experiments in the release notes.

---

## 📜 License

**MIT License** — Free for personal and commercial use.  
You may use, modify, and distribute this software with attribution.

---

<p align="center">
  <strong>TimeProofs</strong><br>
  Proof of Existence. For Everything.<br>
  <a href="https://timeproofs.vercel.app">timeproofs.vercel.app</a>
</p>
