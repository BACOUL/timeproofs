<h1 align="center">⏱️ TimeProofs</h1>
<p align="center"><strong>Proof of Existence. For Everything.</strong></p>

<p align="center">
  <strong>The universal proof layer for AI, developers, and the internet.</strong><br>
  Timestamp, verify, and preserve truth — at the speed of light.
</p>

<p align="center">
  <a href="https://timeproofs.io">Website</a> •
  <a href="#-overview">Overview</a> •
  <a href="#-api-reference">API</a> •
  <a href="#-roadmap">Roadmap</a> •
  <a href="#-security--privacy">Security</a> •
  <a href="#-license">License</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-Public%20Beta%20v0.1-blue?style=flat-square" />
  <img src="https://img.shields.io/badge/build-passing-brightgreen?style=flat-square" />
  <img src="https://img.shields.io/badge/architecture-edge--native-orange?style=flat-square" />
  <img src="https://img.shields.io/badge/privacy-hash--only-green?style=flat-square" />
  <img src="https://img.shields.io/badge/verified-HMAC256-8A2BE2?style=flat-square" />
</p>

> 🔖 [View cryptographic release proof — v0.1-final](https://github.com/BACOUL/timeproofs/releases/tag/v0.1-final)

## 🌍 Overview

**TimeProofs** is an **edge-native proof API** that timestamps and verifies digital existence — a **minimal, scalable alternative** to blockchain notarization.

Every hash you send is cryptographically signed with a verifiable timestamp.  
No tokens. No blockchain. No friction. Just truth, verified.

> “If data had a memory, TimeProofs would be it.”

Built for **AI agents**, **developers**, and **creators** who need to prove that something existed — right here, right now.

TimeProofs is also the **reference implementation** of an upcoming open protocol (**ProofSpec**) that aims to become the **global standard** for digital proof of existence.

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

**Client / SDK**  
Computes the SHA-256 hash of your content locally. The original data never leaves your device.

**API Worker**  
Cloudflare Worker receives the hash, timestamps it, signs it with HMAC-SHA256, and stores the proof.

**Storage (Cloudflare KV)**  
Key-value store holding `{ hash, timestamp, signature, type?, meta? }` entries.

**Frontend**  
Static site (Vercel / CDN) exposing the Verify UI, documentation, ProofSpec, and compliance pages.

**Security**  
HMAC-SHA256 over `hash + timestamp` with a private secret key, served over TLS.

The system is **serverless**, **global**, **privacy-first**, and **deterministic**.

---

## 🧠 Why It Matters

In a world where information is infinite, **proof is rare**.  
AI systems, creators, and organizations all need **trust anchors** — immutable evidence that something existed before it changed.

TimeProofs provides that missing layer:  
a **universal cryptographic clock** for the digital world.

**Use cases include**  
• AI output authenticity & provenance  
• Creative and IP timestamping  
• Legal or contractual digital evidence  
• Compliance and audit-proof event logs  
• Secure verifiable pipelines and releases  

---

## 🧭 API Reference

### Base URL (Public Beta)

TimeProofs is available as a public HTTP API.

Base URL  
https://api.timeproofs.io/api

Only SHA-256 hashes are sent to the API. Your raw content is never transmitted.

---

### POST /timestamp — Create a Proof

Create a verifiable timestamp for any SHA-256 hash.

Endpoint  
POST https://api.timeproofs.io/api/timestamp

Request body
{
  "hash": "64-hex",
  "type": "event",
  "meta": { "model": "gpt-4o", "mime": "text/plain" }
}

Fields  
• `hash` (string, required) — SHA-256 hash of the content (64 hex chars)  
• `type` (string, optional) — classification for the proof (e.g. `event`, `prompt`, `output`)  
• `meta` (object, optional) — arbitrary JSON metadata, such as model, MIME type, source, etc.

Example Request
{
  "hash": "5b09abaf6ceec6830fffbdec5443fa2d0883a36574dac4b5dec555acdf0c0903",
  "type": "event",
  "meta": {
    "model": "gpt-4o",
    "mime": "text/plain",
    "source": "readme-example"
  }
}

Example Response
{
  "ok": true,
  "hash": "5b09abaf6ceec6830fffbdec5443fa2d0883a36574dac4b5dec555acdf0c0903",
  "timestamp": "2025-02-15T12:34:56.789Z",
  "signature": "hmac_sha256(hash|timestamp)",
  "verify_url": "https://api.timeproofs.io/api/verify?hash=5b09abaf6ceec6830fffbdec5443fa2d0883a36574dac4b5dec555acdf0c0903",
  "type": "event",
  "meta": {
    "model": "gpt-4o",
    "mime": "text/plain",
    "source": "readme-example"
  }
}

The `signature` is an HMAC-SHA256 over `hash + timestamp`, with a private server secret.  
This allows future verification that the timestamp came from a trusted TimeProofs signer.

---

### GET /verify?hash=... — Verify a Proof

Check whether a proof exists for a given hash and confirm its authenticity.

Endpoint  
GET https://api.timeproofs.io/api/verify?hash=<sha256-hex>

Example Response
{
  "ok": true,
  "found": true,
  "hash": "5b09abaf6ceec6830fffbdec5443fa2d0883a36574dac4b5dec555acdf0c0903",
  "timestamp": "2025-02-15T12:34:56.789Z",
  "signature": "hmac_sha256(hash|timestamp)",
  "first_seen": "2025-02-15T12:34:56.789Z",
  "type": "event",
  "meta": {
    "model": "gpt-4o",
    "mime": "text/plain",
    "source": "readme-example"
  }
}

Outcomes  
• `ok = true, found = true` → Valid proof with timestamp & signature  
• `found = false` → No proof recorded for this hash  
• `ok = false` → Invalid hash or request format  

---

## 📦 Proof Bundles (.tproof.json)

TimeProofs can represent proofs as portable JSON bundles for archiving, sharing, or offline verification (planned in v0.2+).

Example `.tproof.json` bundle
{
  "version": "v0.1",
  "hash": "5b09abaf6ceec6830fffbdec5443fa2d0883a36574dac4b5dec555acdf0c0903",
  "algorithm": "SHA-256",
  "timestamp": "2025-11-04T10:22:33.123Z",
  "signature": "hmac_sha256(hash|timestamp)",
  "signer": "TimeProofs",
  "meta": {
    "source": "web:verify",
    "env": "prod"
  }
}

The web UI (Create / Verify) can generate such bundles client-side in v0.2, making proofs portable and self-contained.

---

## 🔍 Verify UI

A human-friendly verification interface is available at:

https://timeproofs.io/verify.html

Capabilities  
• Paste a SHA-256 hash and verify its existence  
• Drag-and-drop `.tproof.json` bundles  
• Inspect hash, timestamp, signature, and meta  
• Copy JSON responses and example API calls  
• Share public verification URLs with non-technical users  

---

## 🧮 Example Integration

A JavaScript SDK is planned for v0.2, but integration is already straightforward using any HTTP client.

Conceptual example (future SDK)
import { timeproof } from "@timeproofs/sdk"

const proof = await timeproof("your_sha256_hash_here")
console.log(proof.timestamp, proof.signature)

Expected SDK methods (v0.2)  
• `createFromText(text)`  
• `createFromFile(file)`  
• `createFromHash(hash)`  
• `verify(hashOrBundle)`  

Each method will return a normalized object similar to:
{
  "hash": "…",
  "timestamp": "…",
  "signature": "…",
  "verify_url": "https://api.timeproofs.io/api/verify?hash=…",
  "type": "event",
  "meta": { "source": "sdk" }
}

---

## 🔒 Security & Privacy

TimeProofs is designed to be **privacy-first** and **minimal by default**.

• Only SHA-256 hashes are stored — never your original content  
• All communication is secured with **TLS 1.3**  
• Signatures use **HMAC-SHA256** with a private server key  
• Static frontend, no sensitive cookies or tracking pixels  
• Public `/verify` endpoint enables independent verification  
• Legal & privacy policies documented on the site (`/privacy.html`, `/legal.html`)  
• Suitable as a building block for GDPR-aligned systems (hash-only, no direct personal data)

Privacy-first by design. Nothing personal ever leaves your device.

---

## 📚 Documentation

Official site  
https://timeproofs.io

Key pages  
• Protocol / ProofSpec — https://timeproofs.io/proofspec.html  
• Use Cases — https://timeproofs.io/use-cases.html  
• Create / Verify — https://timeproofs.io/verify.html  
• API Docs — https://timeproofs.io/docs.html  
• Regulations & Compliance — https://timeproofs.io/regulations.html  
• Security — https://timeproofs.io/security.html  
• Privacy — https://timeproofs.io/privacy.html  
• Legal — https://timeproofs.io/legal.html  

Release manifest (site proofs)  
https://timeproofs.io/releases/v0.1.json

---

## 🧭 Roadmap

### v0.1 — Public Beta (Live)

• Timestamp + Verify endpoints (Cloudflare Workers + KV)  
• Public Verify UI (web tool)  
• Protocol page (ProofSpec v0.1)  
• Documentation, Privacy & Legal pages  
• Security page and basic threat model  
• Static site with cryptographic release proof

### v0.2 — Developer Experience

• JavaScript SDK (Node + Browser)  
• PDF proof bundle generation  
• Enhanced Verify UI (copy buttons, FAQ, examples)  
• Offline verification modes using `.tproof.json`  
• Multi-backend anti-lock-in (Workers KV, Redis, others)  

### v1.0 — Productization

• Dashboard (usage metrics, CSV export)  
• API keys and usage quotas (Free / Pro / Team)  
• Stripe billing and invoicing  
• Status endpoint and basic SLA parameters  

### v2.0 — Validation Layer

• ProofChain: distributed validation layer  
• Merkle root publication / transparency logs  
• SDKs for Python and Go (and more over time)  
• Offline proof bundles and advanced audit features  

---

## 🕓 Changelog (Highlights)

### v0.1 — Public Beta (Feb 2025)

• Core timestamp + verify API (Cloudflare Workers + KV)  
• Hash-only storage, HMAC-SHA256 signatures  
• Public Verify UI + docs  
• Security, Privacy, and Legal pages  
• Open GitHub repository and initial license  
• Release sealing with cryptographic proofs  

### v0.2 — Developer Experience (Planned)

• JavaScript SDK for browser and Node  
• PDF proof bundle generation  
• Verify UI enhancements (copy cURL / JSON, richer FAQ)  
• Offline verification mode based on `.tproof.json` bundles  

### v1.0 — Productization (Planned)

• Full dashboard with usage, history, and exports  
• API keys, quotas, and plans (Free / Pro / Enterprise)  
• Stripe-based billing and receipts  
• Hardened operations and status reporting  

### v2.0 — Validation Layer (Planned)

• ProofChain for distributed validation  
• Public transparency logs and Merkle roots  
• Official SDKs for Python and Go  
• Advanced compliance and audit tooling  

---

## 💡 Vision

By 2030, AI-generated data will surpass all human content.  
Every model, agent, and creator will need a way to **anchor their outputs in time**.

TimeProofs aims to become the **global timestamping backbone** of the AI era —  
a neutral, open, privacy-first protocol that any system can rely on to prove that  
“this exact data existed, at this exact moment, and has not been altered since.”

Truth moves fast. TimeProofs makes it verifiable.

---

## 🤝 Contribute

We welcome **developers, researchers, and open-source contributors**.

How to contribute  
1. Fork this repository  
2. Create a feature branch  
3. Submit a Pull Request  

Useful areas  
• SDKs and integrations  
• ProofSpec discussion and improvements  
• Security review and threat modeling  
• Documentation, examples, and tutorials  

Security contact  
security@timeproofs.io

Issues  
https://github.com/BACOUL/timeproofs/issues

---

## 🧾 License

MIT License — free for personal and commercial use.  
© 2025 TimeProofs — Proof of Existence. For Everything.

---

## 🧾 Proof of Worker — v0.1-final (Public Beta)

File  
worker.js

Version  
v0.1-final

Date  
2025-10-24

SHA-256  
5b09abaf6ceec6830fffbdec5443fa2d0883a36574dac4b5dec555acdf0c0903

Timestamp  
2025-10-24T06:26:52.206Z

Signature (HMAC)  
8dd65eb7b9e225a8df5469d89558f2c46216d4db69a892d3ae9d15392ec8af9

Verify URL  
https://timeproofs.io/verify.html?hash=5b09abaf6ceec6830fffbdec5443fa2d0883a36574dac4b5dec555acdf0c0903

Integrity  
✅ Cryptographically sealed by TimeProofs.io

Meta  
{ "src": "release", "env": "prod" }
