
<h1 align="center">⏱️ TimeProofs</h1>
<p align="center">Proof of Existence. For Everything.</p>

<h1 align="center">⏱️ TimeProofs</h1>

<p align="center">
  <strong>The universal proof layer for AI, developers, and the internet.</strong><br>
  Timestamp, verify, and preserve truth — at the speed of light.
</p>

<p align="center">
  <a href="https://timeproofs.vercel.app">Website</a> •
  <a href="#-overview">Overview</a> •
  <a href="#-api-reference">API</a> •
  <a href="#-roadmap">Roadmap</a> •
  <a href="#-contribute">Contribute</a> •
  <a href="#-license">License</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/build-passing-brightgreen?style=flat-square" />
  <img src="https://img.shields.io/badge/version-v0.1-blue?style=flat-square" />
  <img src="https://img.shields.io/badge/powered%20by-Cloudflare%20Workers-orange?style=flat-square" />
  <img src="https://img.shields.io/badge/verified-cryptographic%20HMAC256-8A2BE2?style=flat-square" />
</p>

---

## 🌍 Overview

**TimeProofs** is an edge-native API for **timestamping and verifying digital existence** — a minimal, scalable alternative to blockchain notarization.

Every hash you send is cryptographically signed with a verifiable timestamp.  
No tokens. No blockchain. No friction. Just *truth, verified.*

> “If data had a memory, TimeProofs would be it.”

Built for AI agents, developers, and creators who need to prove that something *existed* — right here, right now.

---

## ⚡ Key Features

✅ **Proof of Existence** — Create a verifiable timestamp for any SHA256 hash.  
🔐 **Cryptographic Integrity** — Signed with HMAC256 using a private salt and public verifier.  
🌐 **Edge-Native Architecture** — Runs globally on Cloudflare Workers with zero cold starts.  
🧠 **AI-Ready** — Built for LLMs and agents to self-verify outputs autonomously.  
💾 **Lightweight Storage** — Proofs stored in distributed KV, instantly queryable.  
📜 **Human Verification Layer** — Downloadable proof certificate with timestamp & hash.  
💶 **Future Micro-Payments** — Optional 0.001 € per proof via Stripe for sustainability.  

---

## 🧩 Architecture

**Client / SDK** — Compute SHA256 hash → send to API  
**API Worker** — Cloudflare Worker timestamps, signs, and stores the hash  
**KV Store** — Cloudflare KV maintains hash + timestamp + signature  
**Frontend** — Vercel static site for verification & documentation  

The system scales infinitely and costs virtually nothing to run.

---

## 🧠 Why It Matters

In a world where information is infinite, **proof is rare.**  
AI systems, creators, and organizations all need trust anchors — immutable evidence that something existed before it changed.

TimeProofs provides that missing layer: a *universal cryptographic clock* for the digital world.

Use cases include:  
• AI output authenticity and provenance  
• Creative or intellectual property timestamping  
• Legal and contractual digital evidence  
• Compliance and audit-proof event logs  
• Any integrity-critical data verification pipeline  

---

## 🧭 API Reference

**Base URL:** `https://api.timeproofs.io`

**Endpoints**

• `/proof` — Create a proof of existence  
  - Method: POST  
  - Body: `{ "hash": "sha256_of_your_data" }`  
  - Returns: `{ proof_id, timestamp, signature }`

• `/verify` — Verify a proof’s authenticity  
  - Method: GET  
  - Query: `?hash=your_hash`  
  - Returns: `{ valid: true, timestamp, signature }`

Each proof is signed with HMAC256 and can be verified using the public verifier key available in the docs.

---

## 🧮 Example Integration

**JavaScript SDK (coming soon)**  
Import and use in one line:

`import { timeproof } from "@timeproofs/sdk"`  
`const proof = await timeproof(hash)`

Output: a verifiable signature + timestamp.  
Zero setup, zero infrastructure.

---

## 🧭 Roadmap

| Version | Description | ETA |
|----------|-------------|------|
| v0.1 | Public API + Verify UI (MVP) | Week 1 |
| v0.2 | JS SDK + PDF proof export | Week 2–3 |
| v1.0 | Stripe micro-payments + Dashboard | Week 4 |
| v2.0 | ProofChain distributed validation | Later |

---

## 💡 Vision

By 2030, AI-generated data will surpass all human-created content.  
**TimeProofs** aims to become the *global timestamping backbone for the AI era* —  
a universal proof protocol ensuring that every model, every agent, and every creator can anchor their outputs in time.

Truth moves fast. TimeProofs makes it verifiable.

---

## 🤝 Contribute

We welcome contributors, open-source developers, and researchers.  
Fork the repo, build integrations, or extend SDKs for Python, Rust, Go, and more.

Join the mission to define the standard of *verifiable digital existence.*

---

## 🧾 License

**MIT License** — Free for personal and commercial use.  
Use, modify, and distribute with attribution.

---

<p align="center">
  <strong>TimeProofs</strong> — Proof of Existence. For Everything.
</p>

---
