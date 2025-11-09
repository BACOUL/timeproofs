<h1 align="center">⏱️ TimeProofs</h1>
<p align="center"><strong>Proof of Existence. For Everything.</strong></p>
<<<<<<< HEAD
<p align="center">TimeProofs — a universal, privacy-first timestamping API for AI, developers, and creators. Verify digital existence in milliseconds.</p>
<p align="center">
  <a href="https://timeproofs.vercel.app">Website</a> •
  <a href="#overview">Overview</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#local-development">Local Development</a> •
  <a href="#why-timeproofs">Why TimeProofs?</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#api-reference">API</a> •
  <a href="#use-cases">Use Cases</a> •
  <a href="#security">Security</a> •
  <a href="#sdk-roadmap">SDK</a> •
  <a href="#community">Community</a> •
  <a href="#license">License</a> •
  <a href="#contributing">Contributing</a>
=======

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
>>>>>>> timeproofsv01
</p>
<p align="center">
  <img src="https://img.shields.io/badge/build-passing-brightgreen?style=flat-square" />
  <img src="https://img.shields.io/badge/version-v0.1-blue?style=flat-square" />
  <img src="https://img.shields.io/badge/powered%20by-Cloudflare%20Workers-orange?style=flat-square" />
  <img src="https://img.shields.io/badge/verified-HMAC%20SHA256-8A2BE2?style=flat-square" />
  <img src="https://img.shields.io/badge/license-MIT-lightgrey?style=flat-square" />
  <img src="https://img.shields.io/badge/deploy-Vercel-black?logo=vercel&style=flat-square" />
</p>
<p align="center">
  <img src="https://timeproofs.vercel.app/demo.png" width="700" alt="TimeProofs Demo Screenshot" />
</p>

<<<<<<< HEAD
## Overview
TimeProofs is an edge-native API to timestamp and verify digital existence — a minimal, scalable, privacy-first alternative to blockchain notarization. Every SHA-256 hash you send is cryptographically signed with an immutable timestamp. No tokens. No blockchain. No upload. Just truth, verified.  
“If data had a memory, TimeProofs would be it.”
=======
> 🔖 [View cryptographic release proof — patch-v0.1](https://github.com/BACOUL/timeproofs/releases/tag/v0.1-final)

---
>>>>>>> timeproofsv01

## Quick Start
1. Compute a SHA-256 hash (client or server).  
2. Send it to /timestamp.  
3. Receive { timestamp, signature, verify_url }.  
4. Anyone can GET /verify?hash=...  
Flow: Generate → Send → Sign → Verify  

<<<<<<< HEAD
Example (JavaScript)
const hash = await sha256("Hello World")
const res = await fetch("https://timeproofs-api.jeason-bacoul.workers.dev/api/timestamp", {
  method: "POST",
  body: JSON.stringify({ hash })
})
console.log(await res.json())
=======
**TimeProofs** is an **edge-native proof API** that timestamps and verifies digital existence — a **minimal, scalable alternative** to blockchain notarization.
>>>>>>> timeproofsv01

## Local Development
git clone https://github.com/BACOUL/timeproofs.git  
cd timeproofs  
npm install  
npm run dev  
Visit http://localhost:8787 to test locally (Cloudflare Worker).

## Why TimeProofs?
Unlike blockchain notarization, TimeProofs provides:
• Instant, verifiable proofs without gas fees  
• 100% privacy (no uploads, only hashes)  
• Global latency under 100ms via edge network  
• Deterministic verification with cryptographic signatures  
• Works offline and integrates easily into any system  

<<<<<<< HEAD
## Key Features
✅ Proof of Existence — verifiable timestamp for any SHA-256 hash  
🔐 Cryptographic Integrity — HMAC-SHA256 over hash + timestamp  
🌐 Edge-Native — Cloudflare Workers + KV, global low latency  
🧠 AI-Ready — ideal for agents, pipelines, and datasets  
📜 Human-Readable Proofs — (soon) downloadable certificate PDF  
💶 Predictable Cost — no gas, optional micro-payments (Stripe)  
🧩 Open Verify Layer — public, deterministic verification  
=======
Built for **AI agents**, **developers**, and **creators** who need to prove that something *existed* — right here, right now.
>>>>>>> timeproofsv01

## Tech Stack
• Backend: Cloudflare Workers (Edge)  
• Storage: Cloudflare KV  
• Frontend: Vercel + Tailwind  
• Crypto: HMAC-SHA256 (Web Crypto / Node Crypto)  
• Language: TypeScript / JavaScript  

## Architecture
1. Client / SDK — computes SHA-256 locally (no upload).  
2. API Worker — timestamps, signs, stores {hash, ts, sig, type?, meta?}.  
3. KV Store — durable, globally replicated lookup.  
4. Frontend (Vercel) — public verify UI + docs.  
Flow Summary: [User/Agent] → [SHA256 Hash] → [TimeProofs API] → [Signed Timestamp] → [Public Verify]

<<<<<<< HEAD
## API Reference
Base URL (beta): https://timeproofs-api.jeason-bacoul.workers.dev/api  
(planned GA: https://api.timeproofs.io)
=======
✅ **Proof of Existence** — Create verifiable timestamps for any SHA-256 hash  
🔐 **Cryptographic Integrity** — Signed with HMAC-SHA256 over `hash + timestamp`  
🌐 **Edge-Native Architecture** — Runs globally on Cloudflare Workers + KV  
🧠 **AI-Ready** — Built for autonomous models and verifiable AI output  
💾 **Lightweight Storage** — Proofs stored in distributed KV, instantly queryable  
📜 **Human Verification Layer** — Public Verify UI + Docs  
💶 **Predictable Cost** — No gas, no blockchain, no tokens  
>>>>>>> timeproofsv01

POST /timestamp — Create a proof  
Request:
{
  "hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "type": "event",
  "meta": { "model": "gpt-4o", "mime": "text/plain" }
}
Response:
{
  "ok": true,
  "hash": "e3b0c4...",
  "timestamp": "2025-01-15T12:34:56.789Z",
  "signature": "hmac_sha256(hash|timestamp)",
  "verify_url": "https://timeproofs-api.jeason-bacoul.workers.dev/api/verify?hash=e3b0..."
}

GET /verify?hash={sha256} — Verify a proof  
Response:
{
  "ok": true,
  "found": true,
  "hash": "e3b0c4...",
  "timestamp": "2025-01-15T12:34:56.789Z",
  "signature": "server_signature",
  "type": "event",
  "meta": { "model": "gpt-4o" }
}
Notes:  
• signature = HMAC_SHA256(secret, hash + timestamp)  
• Verification can be done offline using any HMAC-SHA256 library.  
• The timestamp is immutable and cryptographically bound to the hash.

<<<<<<< HEAD
## Use Cases
| Sector | Example | Value |
|--------|----------|-------|
| AI / Agents | Proof for prompts / outputs / datasets | Trust & reproducibility |
| Developers | Artifact / release integrity | Supply-chain confidence |
| Creators | IP snapshots (text, art, media) | Authorship & anti-plagiarism |
| Legal / Audit | Document & email existence | Lightweight evidence |
| Security | Log attestation, webhooks | Tamper detection |

## Security
• Only hashes are processed/stored, never raw content.  
• Proofs kept in Cloudflare KV with minimal metadata you provide.  
• Transport secured with TLS. No cookies, no tracking.  
• Verification is public and reproducible without revealing content.  
See also: SECURITY.md and the site’s Privacy Policy.
=======
**Client / SDK** — Computes SHA-256 hash and sends it to API  
**API Worker** — Cloudflare Worker timestamps, signs, and stores the hash  
**Storage** — Cloudflare KV `{ hash, timestamp, signature, type?, meta? }`  
**Frontend** — Vercel static site for verification & documentation  
**Security** — HMAC-SHA256 with a private secret key  

The system is **serverless, global, privacy-first, and deterministic.**
>>>>>>> timeproofsv01

## SDK Roadmap
| SDK | Status | Target |
|-----|--------|--------|
| JavaScript / TypeScript | 🚧 Alpha | v0.2 |
| Python | 🧪 Planned | v2.0 |
| Go | 🧪 Planned | v2.0 |
The SDK will automatically hash (if needed), call /timestamp, and return a structured { hash, timestamp, signature, verify_url }.

## Roadmap
| Version | Description | Status |
|---------|-------------|--------|
| v0.1 | Public API + Verify UI (MVP) | ✅ Live |
| v0.2 | JS SDK + PDF Certificate | 🔄 In progress |
| v1.0 | API Keys + Dashboard + Stripe | 🔜 Planned |
| v2.0 | ProofChain (light validation) | 🔬 Research |

<<<<<<< HEAD
## Community
🌐 Website → https://timeproofs.vercel.app  
📄 Docs → https://timeproofs.vercel.app/docs.html  
🔎 Verify → https://timeproofs.vercel.app/verify.html  
📜 Privacy → https://timeproofs.vercel.app/privacy.html  
⚖️ Legal → https://timeproofs.vercel.app/legal.html  
✉️ Email → hello@timeproofs.io  
💻 GitHub → https://github.com/BACOUL/timeproofs  

## License
MIT License — free for personal and commercial use.  
See LICENSE for details.  

MIT License  
Copyright (c) 2025 Jeason Bacoul  
Permission is hereby granted, free of charge, to any person obtaining a copy  
of this software and associated documentation files (the “Software”), to deal  
in the Software without restriction, including without limitation the rights  
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell  
copies of the Software, and to permit persons to whom the Software is  
furnished to do so, subject to the following conditions:  
The above copyright notice and this permission notice shall be included in all  
copies or substantial portions of the Software.  
THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR  
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,  
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE  
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER  
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,  
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE  
SOFTWARE.

# Security Policy
## Supported Versions
We maintain security updates for the latest public version of TimeProofs (v0.x).  
Future major releases (v1+) will include built-in key management and audit logs.
=======
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
>>>>>>> timeproofsv01

## Reporting a Vulnerability
If you discover a vulnerability, please email security@timeproofs.io  
or open a private issue on GitHub.  
We commit to acknowledge and respond within 72 hours.

<<<<<<< HEAD
## Data Handling & Privacy
- Only SHA-256 hashes and minimal metadata are stored.  
- No raw files or user content are processed.  
- Transport is secured with HTTPS/TLS 1.3.  
- No cookies, analytics, or third-party trackers.  
- Data is hosted on Cloudflare Workers / KV, within the EU.  

## Responsible Disclosure
We value coordinated disclosure.  
Do not publish vulnerabilities until we’ve confirmed a fix.  
Thank you for helping make TimeProofs safer for everyone.

## Contributing
We welcome contributions and ideas!  
To contribute: fork the repo, make your changes, and open a pull request.  
Please ensure commits are clean and documented.  
Email us for partnership discussions: hello@timeproofs.io  

<p align="center">
  <strong>TimeProofs</strong><br/>
  Proof of Existence. For Everything.<br/>
  <a href="https://timeproofs.vercel.app">https://timeproofs.vercel.app</a>
</p>
=======
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

🧾 Proof of Worker — v0.1-final (Public Beta) — File: worker.js | Version: v0.1-final | Date: 2025-10-24 | SHA-256: 5b09abaf6ceec6830fffbdec5443fa2d0883a36574dac4b5dec555acdf0c0903 | Timestamp: 2025-10-24T06:26:52.206Z | Signature (HMAC): 8dd65eb7b9e225a8df5469d89558f2c46216d4db69a892d3ae9d15392ec8af9 | Verify URL: https://timeproofs.io/verify.html?hash=5b09abaf6ceec6830fffbdec5443fa2d0883a36574dac4b5dec555acdf0c0903 | Integrity: ✅ cryptographically sealed by TimeProofs.io | Meta: {"src":"release","env":"prod"}

---
>>>>>>> timeproofsv01
