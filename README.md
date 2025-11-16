# ⏱️ TimeProofs  

**Proof of Existence. For Everything.**  
The universal proof layer for AI, developers, and the internet.  
Timestamp, verify, and preserve truth — at the speed of light.

**Website:** https://timeproofs.io  
**Status:** Public Beta v0.1  
**Release Proof:** https://github.com/BACOUL/timeproofs/releases/tag/v0.1-final  
**Stable Branch:** `timeproofsv01`  

[TimeProofs.io](https://timeproofs.io) is the reference implementation of the upcoming open protocol **ProofSpec**, aiming to become the global standard for digital proof of existence.

## 🌍 Overview  

TimeProofs is an edge-native proof service that timestamps and verifies digital existence — a minimal, scalable alternative to blockchain notarization.

Every request produces a signed timestamp:

- You hash locally  
- You send only the SHA-256 hash  
- TimeProofs signs it with HMAC-SHA256 and stores the proof  
- Anyone can verify existence and integrity later  

No blockchain, no tokens, no uploads. Just cryptographic proof.

## ⚡ Key Features  

- Proof of Existence for any SHA-256 hash  
- HMAC-SHA256 integrity over `hash + timestamp`  
- Edge-native Cloudflare Workers + KV  
- Hash-only, privacy-first design  
- Public verify endpoint + human Verify UI  
- Predictable cost, no gas, no tokens  
- AI-ready for agents, models, datasets, and pipelines  

## 🧩 Architecture  

Client / SDK  
- Computes SHA-256 of your content locally  
- Original data never leaves your device  

API Worker  
- Receives the hash  
- Attaches an ISO 8601 timestamp  
- Signs `hash + timestamp` with HMAC-SHA256  
- Stores `{ hash, timestamp, signature, type?, meta? }` in KV  

Storage (Cloudflare KV)  
- Key-value entries for proofs  
- Low latency, globally replicated  

Frontend  
- Static site on Vercel / CDN  
- Verify UI, ProofSpec, Docs, Regulations, Security, Privacy, Legal  

Security  
- TLS 1.3 transport  
- HMAC-SHA256 signatures  
- Hash-only design, minimal logs, no cookies for proofs  

## 🧭 API Reference  

Base URL (Public Beta)  
`https://api.timeproofs.io/api`  

Only SHA-256 hashes are sent to the API. Your raw content is never transmitted.

### POST /timestamp — Create a Proof  

Create a verifiable timestamp for any SHA-256 hash.

Endpoint  
`POST https://api.timeproofs.io/api/timestamp`  

Request body  
`{  
  "hash": "64-hex",  
  "type": "event",  
  "meta": { "model": "gpt-4o", "mime": "text/plain" }  
}`  

Fields  
- `hash` (string, required) — SHA-256 hash (64 hex chars)  
- `type` (string, optional) — classification for the proof (`event`, `prompt`, `output`, etc.)  
- `meta` (object, optional) — small JSON metadata (model, MIME type, source, environment, etc.)  

Example request  
`{  
  "hash": "5b09abaf6ceec6830fffbdec5443fa2d0883a36574dac4b5dec555acdf0c0903",  
  "type": "event",  
  "meta": {  
    "model": "gpt-4o",  
    "mime": "text/plain",  
    "source": "readme-example"  
  }  
}`  

Example response  
`{  
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
}`  

The `signature` is an HMAC-SHA256 over `hash + timestamp`, with a private server secret. This allows future verification that the timestamp came from a trusted TimeProofs signer.

### GET /verify?hash=… — Verify a Proof  

Check whether a proof exists for a given hash and confirm its authenticity.

Endpoint  
`GET https://api.timeproofs.io/api/verify?hash=<sha256-hex>`  

Example response  
`{  
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
}`  

Outcomes  
- `ok = true, found = true` → Valid proof with timestamp & signature  
- `found = false` → No proof recorded for this hash  
- `ok = false` → Invalid hash or request format  

## 📦 Proof Bundles (.tproof.json)  

TimeProofs can represent proofs as portable JSON bundles for archiving, sharing, or offline verification (planned for v0.2+).

Example `.tproof.json` bundle  
`{  
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
}`  

The Verify UI will be able to import and verify these bundles client-side in v0.2.

## 🔍 Verify UI  

A human-friendly verification interface is available at:  
https://timeproofs.io/verify.html  

Capabilities  
- Paste a SHA-256 hash and verify its existence  
- Drag-and-drop `.tproof.json` bundles (v0.2+)  
- Inspect hash, timestamp, signature, and meta  
- Copy JSON responses and example API calls  
- Share public verification URLs with non-technical users  

## 🧮 Example Integration  

A JavaScript SDK is planned for v0.2, but integration is already straightforward.

Conceptual example (future SDK)  

`import { timeproof } from "@timeproofs/sdk"  

const proof = await timeproof("your_sha256_hash_here")  
console.log(proof.timestamp, proof.signature)`  

Expected SDK methods (v0.2)  
- `createFromText(text)`  
- `createFromFile(file)`  
- `createFromHash(hash)`  
- `verify(hashOrBundle)`  

Each method will return a normalized object similar to:  

`{  
  "hash": "…",  
  "timestamp": "…",  
  "signature": "…",  
  "verify_url": "https://api.timeproofs.io/api/verify?hash=…",  
  "type": "event",  
  "meta": { "source": "sdk" }  
}`  

## 🧠 Why It Matters  

In a world where information is infinite, proof is rare.  
AI systems, creators, and organizations all need trust anchors — immutable evidence that something existed before it changed.

TimeProofs provides that missing layer: a universal cryptographic clock for the digital world.

Use cases include  
- AI output authenticity & provenance  
- Creator and IP timestamping  
- Legal or contractual digital evidence  
- Compliance and audit-proof event logs  
- Secure verifiable pipelines and releases  

## 📚 Documentation  

Official site  
- https://timeproofs.io  

Key pages  
- Protocol / ProofSpec — https://timeproofs.io/proofspec.html  
- Use Cases — https://timeproofs.io/use-cases.html  
- Create / Verify — https://timeproofs.io/verify.html  
- API Docs — https://timeproofs.io/docs.html  
- Regulations & Compliance — https://timeproofs.io/regulations.html  
- Security — https://timeproofs.io/security.html  
- Privacy — https://timeproofs.io/privacy.html  
- Legal — https://timeproofs.io/legal.html  

Release manifest (site proofs)  
- https://timeproofs.io/releases/v0.1.json  

## 🧭 Roadmap  

### v0.1 — Public Beta (Live)  

- Timestamp + Verify endpoints (Cloudflare Workers + KV)  
- Public Verify UI (web tool)  
- Protocol page (ProofSpec v0.1)  
- Documentation, Privacy & Legal pages  
- Security page and basic threat model  
- Static site with cryptographic release proof  

### v0.2 — Developer Experience (Planned)  

- JavaScript SDK (Node + Browser)  
- PDF proof bundle generation  
- Enhanced Verify UI (copy buttons, FAQ, examples)  
- Offline verification modes using `.tproof.json`  
- Multi-backend anti-lock-in (Workers KV, Redis, others)  

### v1.0 — Productization (Planned)  

- Dashboard (usage metrics, CSV export)  
- API keys and usage quotas (Free / Pro / Team)  
- Stripe billing and invoicing  
- Status endpoint and basic SLA parameters  

### v2.0 — Validation Layer (Planned)  

- ProofChain: distributed validation layer  
- Merkle root publication / transparency logs  
- SDKs for Python and Go (and more over time)  
- Offline proof bundles and advanced audit features  

## 🕓 Changelog (Highlights)  

### v0.1 — Public Beta (Feb 2025)  

- Core timestamp + verify API (Cloudflare Workers + KV)  
- Hash-only storage, HMAC-SHA256 signatures  
- Public Verify UI + docs  
- Security, Privacy, and Legal pages  
- Open GitHub repository and initial license  
- Release sealing with cryptographic proofs  

### v0.2 — Developer Experience (Planned)  

- JavaScript SDK for browser and Node  
- PDF proof bundle generation  
- Verify UI enhancements (copy cURL / JSON, richer FAQ)  
- Offline verification mode based on `.tproof.json` bundles  

### v1.0 — Productization (Planned)  

- Full dashboard with usage, history, and exports  
- API keys, quotas, and plans (Free / Pro / Enterprise)  
- Stripe-based billing and receipts  
- Hardened operations and status reporting  

### v2.0 — Validation Layer (Planned)  

- ProofChain for distributed validation  
- Public transparency logs and Merkle roots  
- Official SDKs for Python and Go  
- Advanced compliance and audit tooling  

## 💡 Vision  

By 2030, AI-generated data will surpass all human content.  
Every model, agent, and creator will need a way to anchor their outputs in time.

TimeProofs aims to become the global timestamping backbone of the AI era —  
a neutral, open, privacy-first protocol that any system can rely on to prove that  
“this exact data existed, at this exact moment, and has not been altered since.”

Truth moves fast. TimeProofs makes it verifiable.

## 🤝 Contribute  

We welcome developers, researchers, and open-source contributors.

How to contribute  
1. Fork this repository  
2. Create a feature branch  
3. Submit a Pull Request  

Useful areas  
- SDKs and integrations  
- ProofSpec discussion and improvements  
- Security review and threat modeling  
- Documentation, examples, and tutorials  

Security contact  
- security@timeproofs.io  

Issues  
- https://github.com/BACOUL/timeproofs/issues  

## 🧪 Testing Checklist (Required Before PR)  

Make sure you have environment variables configured for:  

- `TP_SECRET_KEY` (HMAC key)  
- `KV_NAMESPACE` (Cloudflare KV binding)  

Every contribution must pass the following:

### Functional  

- `/api/timestamp` returns a valid timestamp + signature  
- `/api/verify` returns correct verification states  
- Verify UI works with text, file, and `.tproof.json`  

### Frontend  

- Header + footer identical to site  
- No overflow on mobile  
- TOC links functional  
- Lighthouse score ≥ 95 (mobile + desktop)  

### Security  

- No console errors  
- No personal data logged  
- CSP respected  
- HTTPS enforced  

### Release Integrity  

- No change to release manifest without justification  
- Hashes match `releases/v0.1.json` unless protocol changes  
- Release proof verified via TimeProofs before tagging  

### Documentation  

- README updated when API or flows change  
- Examples tested against the live API  
- Links to docs pages verified  

### Self-Hosting  

- `worker.js` runs locally with Wrangler or Miniflare  
- KV namespace binding works in local and prod  
- No hard-coded environment assumptions  

### UX  

- Forms usable with keyboard only  
- Focus states visible for all interactive elements  
- No layout shift on first load on mobile  

### Regulatory & Privacy  

- No personal data required or logged by default  
- Hash-only design preserved  
- Public verification remains stateless and open  

## 🧾 License  

MIT License — free for personal and commercial use.  
© 2025 TimeProofs — Proof of Existence. For Everything.

## 🧾 Proof of Worker — v0.1-final (Public Beta)  

File  
- `worker.js`  

Version  
- `v0.1-final`  

Date  
- `2025-10-24`  

SHA-256  
- `5b09abaf6ceec6830fffbdec5443fa2d0883a36574dac4b5dec555acdf0c0903`  

Timestamp  
- `2025-10-24T06:26:52.206Z`  

Signature (HMAC)  
- `8dd65eb7b9e225a8df5469d89558f2c46216d4db69a892d3ae9d15392ec8af9`  

Verify URL  
- https://timeproofs.io/verify.html?hash=5b09abaf6ceec6830fffbdec5443fa2d0883a36574dac4b5dec555acdf0c0903  

Integrity  
- ✅ Cryptographically sealed by TimeProofs.io  

Meta  
- `{ "src": "release", "env": "prod" }`
