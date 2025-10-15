<h1 align="center">⏱️ TimeProofs</h1>
<p align="center"><strong>Proof of Existence. For Everything.</strong></p>
<p align="center">
  <strong>The universal proof layer for AI, developers, and the internet.</strong><br>
  Hash locally • Timestamp via API • Verify publicly — no blockchain, no friction.
</p>
<p align="center">
  <a href="https://timeproofs.vercel.app">Website</a> •
  <a href="#overview">Overview</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#why-timeproofs">Why TimeProofs?</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#api-reference">API</a> •
  <a href="#use-cases">Use Cases</a> •
  <a href="#security--privacy">Security</a> •
  <a href="#sdk-roadmap">SDK</a> •
  <a href="#community">Community</a> •
  <a href="#license">License</a>
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
## 🌍 Overview
TimeProofs is an edge-native API to timestamp and verify digital existence — a minimal, scalable, privacy-first alternative to blockchain notarization. Every SHA-256 hash you send is cryptographically signed with an immutable timestamp. No tokens. No blockchain. No upload. Just truth, verified.  
“If data had a memory, TimeProofs would be it.”
## 🚀 Quick Start
1. Compute a SHA-256 hash (client or server).  
2. Send it to /timestamp.  
3. Receive { timestamp, signature, verify_url }.  
4. Anyone can GET /verify?hash=...  
Flow: Generate → Send → Sign → Verify
Example (JavaScript)
const hash = await sha256("Hello World")
const res = await fetch("https://timeproofs-api.jeason-bacoul.workers.dev/api/timestamp", {
  method: "POST",
  body: JSON.stringify({ hash })
})
console.log(await res.json())
## 💡 Why TimeProofs?
Unlike blockchain notarization, TimeProofs provides:
• Instant, verifiable proofs without gas fees  
• 100% privacy (no uploads, only hashes)  
• Global latency under 100ms via edge network  
• Deterministic verification with cryptographic signatures  
• Works offline and integrates easily into any system  
## ⚡ Key Features
✅ Proof of Existence — verifiable timestamp for any SHA-256 hash  
🔐 Cryptographic Integrity — HMAC-SHA256 over hash + timestamp  
🌐 Edge-Native — Cloudflare Workers + KV, global low latency  
🧠 AI-Ready — ideal for agents, pipelines, and datasets  
📜 Human-Readable Proofs — (soon) downloadable certificate PDF  
💶 Predictable Cost — no gas, optional micro-payments (Stripe)  
🧩 Open Verify Layer — public, deterministic verification  
## 🧱 Tech Stack
• Backend: Cloudflare Workers (Edge)  
• Storage: Cloudflare KV  
• Frontend: Vercel + Tailwind  
• Crypto: HMAC-SHA256 (Web Crypto / Node Crypto)  
• Language: TypeScript / JavaScript  
## 🧩 Architecture
1. Client / SDK — computes SHA-256 locally (no upload).  
2. API Worker — timestamps, signs, stores {hash, ts, sig, type?, meta?}.  
3. KV Store — durable, globally replicated lookup.  
4. Frontend (Vercel) — public verify UI + docs.  
Flow Summary: [User/Agent] → [SHA256 Hash] → [TimeProofs API] → [Signed Timestamp] → [Public Verify]
## 🧭 API Reference
Base URL (beta): https://timeproofs-api.jeason-bacoul.workers.dev/api  
(planned GA: https://api.timeproofs.io)
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
## 📘 Use Cases
| Sector | Example | Value |
|--------|----------|-------|
| AI / Agents | Proof for prompts / outputs / datasets | Trust & reproducibility |
| Developers | Artifact / release integrity | Supply-chain confidence |
| Creators | IP snapshots (text, art, media) | Authorship & anti-plagiarism |
| Legal / Audit | Document & email existence | Lightweight evidence |
| Security | Log attestation, webhooks | Tamper detection |
## 🔒 Security & Privacy
• Only hashes are processed/stored, never raw content.  
• Proofs kept in Cloudflare KV with minimal metadata you provide.  
• Transport secured with TLS. No cookies, no tracking.  
• Verification is public and reproducible without revealing content.  
See also: SECURITY.md and the site’s Privacy Policy.
## 🧩 SDK Roadmap
| SDK | Status | Target |
|-----|--------|--------|
| JavaScript / TypeScript | 🚧 Alpha | v0.2 |
| Python | 🧪 Planned | v2.0 |
| Go | 🧪 Planned | v2.0 |
The SDK will automatically hash (if needed), call /timestamp, and return a structured { hash, timestamp, signature, verify_url }.
## 🧭 Roadmap
| Version | Description | Status |
|---------|-------------|--------|
| v0.1 | Public API + Verify UI (MVP) | ✅ Live |
| v0.2 | JS SDK + PDF Certificate | 🔄 In progress |
| v1.0 | API Keys + Dashboard + Stripe | 🔜 Planned |
| v2.0 | ProofChain (light validation) | 🔬 Research |
## 🤝 Community
🌐 Website → https://timeproofs.vercel.app  
📄 Docs → /docs.html • 🔎 Verify → /verify.html  
✉️ Email → hello@timeproofs.io  
💻 GitHub → https://github.com/BACOUL/timeproofs  
## 📜 License
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
## Reporting a Vulnerability
If you discover a vulnerability, please email **security@timeproofs.io**  
or open a **private issue** on GitHub.  
We commit to acknowledge and respond within **72 hours**.
## Data Handling & Privacy
- Only **SHA-256 hashes** and minimal metadata are stored.  
- No raw files or user content are processed.  
- Transport is secured with **HTTPS/TLS 1.3**.  
- No cookies, analytics, or third-party trackers.  
- Data is hosted on **Cloudflare Workers / KV**, within the EU.  
## Responsible Disclosure
We value coordinated disclosure.  
Do not publish vulnerabilities until we’ve confirmed a fix.  
Thank you for helping make TimeProofs safer for everyone.
<p align="center">
  <strong>TimeProofs</strong><br/>
  Proof of Existence. For Everything.<br/>
  <a href="https://timeproofs.vercel.app">https://timeproofs.vercel.app</a>
</p>
