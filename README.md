<h1 align="center">⏱️ TimeProofs</h1>
<p align="center"><strong>Proof of Existence. For Everything.</strong></p>

<p align="center">
  <strong>The universal proof layer for AI, developers, and the internet.</strong><br>
  Timestamp, verify, and preserve truth — at the speed of light.
</p>

<p align="center">
  <a href="https://timeproofs-68lj-6txalli6h-jeason1.vercel.app">Website</a> •
  <a href="#-overview">Overview</a> •
  <a href="#-api-reference">API</a> •
  <a href="#-roadmap">Roadmap</a> •
  <a href="#-security--privacy">Security</a> •
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

**TimeProofs** is an **edge-native proof API** that timestamps and verifies digital existence — a **minimal, scalable alternative** to blockchain notarization.

Every hash you send is cryptographically signed with a verifiable timestamp.  
No tokens. No blockchain. No friction. Just *truth, verified.*

> “If data had a memory, TimeProofs would be it.”

Built for **AI agents**, **developers**, and **creators** who need to prove that something *existed* — right here, right now.

---

## ⚡ Key Features

✅ **Proof of Existence** — Create verifiable timestamps for any SHA-256 hash  
🔐 **Cryptographic Integrity** — Signed with HMAC-SHA256 over `hash + timestamp`  
🌐 **Edge-Native Architecture** — Runs globally on Cloudflare Workers + KV  
🧠 **AI-Ready** — Built for autonomous models and verifiable AI output  
💾 **Lightweight Storage** — Proofs stored in distributed KV, instantly queryable  
📜 **Human Verification Layer** — Public Verify UI + Docs  
💶 **Predictable Cost** — No gas, no blockchain, no tokens  

---

## 🧩 Architecture

**Client / SDK** — Computes SHA-256 hash and sends it to API  
**API Worker** — Cloudflare Worker timestamps, signs, and stores the hash  
**Storage** — Cloudflare KV `{ hash, timestamp, signature, type?, meta? }`  
**Frontend** — Vercel static site for verification & documentation  
**Security** — HMAC-SHA256 with a private secret key  

The system is **serverless, global, privacy-first, and deterministic.**

---

## 🧠 Why It Matters

In a world where information is infinite, **proof is rare.**  
AI systems, creators, and organizations all need **trust anchors** — immutable evidence that something existed before it changed.

TimeProofs provides that missing layer:  
a *universal cryptographic clock* for the digital world.

**Use cases include:**  
• AI output authenticity & provenance  
• Creative and IP timestamping  
• Legal or contractual digital evidence  
• Compliance and audit-proof event logs  
• Secure verifiable pipelines  

## 🧭 API Reference

**Base URL (Public Beta)**  
https://timeproofs-api.jeason-bacoul.workers.dev/api

### `POST /timestamp` — Create a Proof
Create a verifiable timestamp for any SHA-256 hash. Only hashes are sent — your original data never leaves your device.

**Example Request**
{
  "hash": "64-hex",
  "type": "event",
  "meta": { "model": "gpt-4o", "mime": "text/plain" }
}

**Example Response**
{
  "ok": true,
  "hash": "…",
  "timestamp": "2025-02-15T12:34:56.789Z",
  "signature": "hmac_sha256(hash|timestamp)",
  "verify_url": "https://timeproofs-api.jeason-bacoul.workers.dev/api/verify?hash=…"
}

### `GET /verify?hash=...` — Verify a Proof
Checks whether a proof exists and confirms its authenticity.

**Example Response**
{
  "ok": true,
  "found": true,
  "hash": "…",
  "timestamp": "2025-02-15T12:34:56.789Z",
  "signature": "server_signature",
  "first_seen": "2025-02-15T12:34:56.789Z",
  "type": "event",
  "meta": { "model": "gpt-4o" }
}

**Outcomes**
ok=true, found=true → Valid proof with timestamp & signature  
found=false → No proof recorded for this hash  
ok=false → Invalid hash or request format  

## 🧮 Example Integration

JavaScript SDK (coming in v0.2)
import { timeproof } from "@timeproofs/sdk"
const proof = await timeproof("your_hash")
console.log(proof.timestamp, proof.signature)

Output: verifiable signature + timestamp. Zero setup, zero infrastructure.

Planned SDK methods: createFromText(), createFromFile(), createFromHash(), verify()  
Each returns { hash, timestamp, signature, verify_url }

## 🔒 Security & Privacy

- Only SHA-256 hashes are stored — never your original content  
- All communication secured with TLS 1.3  
- Signatures generated using HMAC-SHA256 (private server key)  
- No cookies, no trackers, no analytics  
- Public /verify endpoint enables independent verification  
- Legal & privacy policies available at /privacy.html and /legal.html  

Privacy-first by design. Nothing personal ever leaves your device.

## 🧭 Roadmap

v0.1 — Public Beta (API, Verify UI, Docs, Privacy/Legal) ✅ Live  
v0.2 — JavaScript SDK, PDF proofs, Verify UX enhancements 🚧 In progress  
v1.0 — Dashboard, API Keys, Stripe billing, quotas 🟡 Planned  
v2.0 — ProofChain distributed validation, SDKs (Python/Go) 🧪 Research  

Details: https://timeproofs-68lj-6txalli6h-jeason1.vercel.app/roadmap.html

## 🕓 Changelog (Highlights)

v0.1 — Public Beta (Feb 2025)  
- Timestamp + Verify endpoints (Cloudflare Workers + KV)  
- Public Verify UI  
- Docs, Privacy & Legal pages  
- Open GitHub repo + MIT license  

v0.2 — Developer Experience (Q4 2025)  
- JavaScript SDK (Node + Browser)  
- PDF proof bundle generation  
- Verify UI copy buttons (cURL / JSON)  
- Updated Docs with FAQ + examples  

v1.0 — Productization (2026)  
- API keys & usage quotas (Free / Pro / Team)  
- Dashboard (usage, CSV export, key rotation)  
- Stripe billing + status endpoint  

v2.0 — Validation Layer (2026 – 2027)  
- ProofChain (distributed validation)  
- SDKs for Python + Go  
- Offline proof bundles  
- Merkle root publication  

## 💡 Vision

By 2030, AI-generated data will surpass all human content.  
TimeProofs aims to become the global timestamping backbone of the AI era — a universal proof protocol ensuring every model, agent and creator can anchor their outputs in time.

Truth moves fast. TimeProofs makes it verifiable.

## 🤝 Contribute

We welcome developers, researchers, and open-source contributors.

How to contribute:  
1. Fork this repository  
2. Create a feature branch  
3. Submit a Pull Request  

Security contact: security@timeproofs.io

## 🧾 License

MIT License — free for personal and commercial use.  
© 2025 TimeProofs — Proof of Existence. For Everything.

---

## 🕒 Proof of Release — v0.1 (Public Beta)

- **Version:** v0.1  
- **Date:** 2025-10-23  
- **Commit/Tag:** patch-v0.1  
- **Hash (SHA-256):** `ceb9c21de354037aadb522a68f680521646bdb46f1bbf9ca9ba9f2443ec606d`  
- **Timestamp:** Verified by [TimeProofs.io](https://timeproofs.io)  
- **Integrity:** Proof cryptographically sealed via `/api/verify`  
- **Scope:** Full site + API deployed on Cloudflare + Vercel  

> This release is officially timestamped and verifiable —  
> the first version of TimeProofs sealed by its own protocol.

---
