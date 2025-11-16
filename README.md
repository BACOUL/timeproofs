<p align="center">
  <img src="https://timeproofs.io/assets/logo.svg" width="86" height="86" alt="TimeProofs logo"/>
</p>

<h1 align="center">⏱️ TimeProofs</h1>
<p align="center"><strong>Proof of Existence. For Everything.</strong></p>

<p align="center">
  The open, privacy-first protocol that timestamps, signs, and verifies digital existence.<br>
  Hash locally. Timestamp instantly. Verify publicly — for AI, developers, creators, legal, and compliance.
</p>

<p align="center">
  <a href="https://timeproofs.io">Website</a> •
  <a href="#-quickstart">Quickstart</a> •
  <a href="#-api">API</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-lifecycle">Lifecycle</a> •
  <a href="#-best-practices">Best Practices</a> •
  <a href="#-error-codes">Errors</a> •
  <a href="#-security--privacy">Security</a> •
  <a href="#-roadmap">Roadmap</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-Public%20Beta%20v0.1-blue?style=flat-square"/>
  <img src="https://img.shields.io/badge/architecture-edge--native-orange?style=flat-square"/>
  <img src="https://img.shields.io/badge/privacy-hash--only-green?style=flat-square"/>
  <img src="https://img.shields.io/badge/verified-HMAC256-8A2BE2?style=flat-square"/>
  <img src="https://img.shields.io/badge/license-MIT-yellow?style=flat-square"/>
</p>

---

## 🌍 Overview

**TimeProofs** is a deterministic, edge-native protocol that proves *when* digital data first existed — without ever sending the data itself.

Only the **SHA-256 hash** is transmitted.  
Every proof is:

- ⏱ Instant (Cloudflare Edge)  
- 🔐 Signed (HMAC-SHA256: `hash + timestamp`)  
- 🌍 Publicly verifiable  
- 🕊 Privacy-first, GDPR-aligned  
- 🔏 Portable (`.tproof.json`)  
- ⚡ Stateless & globally replicated  

TimeProofs implements the open protocol **ProofSpec v0.1**, the future global standard for timestamping AI outputs, creative work, datasets, code releases, legal evidence, and compliance events.

---

# 🚀 Quickstart

### 1. Compute a SHA-256 hash (locally, no upload)

```bash
sha256sum myfile.png | cut -d " " -f1
```

### 2. Create a timestamped proof

```bash
curl -X POST https://api.timeproofs.io/api/timestamp \
  -H "Content-Type: application/json" \
  -d '{"hash":"<your_sha256_here>"}'
```

### 3. Verify the proof

```bash
curl "https://api.timeproofs.io/api/verify?hash=<your_sha256_here>"
```

### 4. Or verify visually  
https://timeproofs.io/verify.html

---

# 🔗 End-to-End Example (Full Proof Flow)

### 1. Hash local content

```
hello world
```

→ SHA-256:

```
b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9
```

### 2. Timestamp it

```bash
curl -X POST https://api.timeproofs.io/api/timestamp \
  -H "Content-Type: application/json" \
  -d '{"hash":"b94d27b9..."}'
```

Response:

```json
{
  "ok": true,
  "hash": "b94d27b9...",
  "timestamp": "2025-02-15T12:34:56.789Z",
  "signature": "hmac_sha256(hash|timestamp)",
  "verify_url": "https://api.timeproofs.io/api/verify?hash=b94d27b9..."
}
```

### 3. Optional: Bundle the proof (portable)

```json
{
  "version":"v0.1",
  "hash":"b94d27b9...",
  "timestamp":"2025-02-15T12:34:56.789Z",
  "signature":"...",
  "algorithm":"SHA-256",
  "signer":"TimeProofs"
}
```

### 4. Verify publicly

```
GET https://api.timeproofs.io/api/verify?hash=b94d27b9...
```

---

# 🧭 API

## Base URL

```
https://api.timeproofs.io/api
```

---

## POST `/timestamp` — Create a Proof

Request:

```json
{
  "hash": "64-hex",
  "type": "event",
  "meta": { "model": "gpt-4o" }
}
```

Response:

```json
{
  "ok": true,
  "hash": "...",
  "timestamp": "...",
  "signature": "hmac_sha256(hash|timestamp)",
  "verify_url": "https://api.timeproofs.io/api/verify?hash=..."
}
```

---

## GET `/verify?hash=...` — Verify a Proof

```json
{
  "ok": true,
  "found": true,
  "hash": "...",
  "timestamp": "...",
  "signature": "...",
  "first_seen": "..."
}
```

---

# 🧩 Architecture

```
                   ┌────────────────────────────┐
                   │         Your Client         │
                   │ (AI agent, backend, CLI)   │
                   │ computes SHA-256 locally   │
                   └──────────────┬─────────────┘
                                  │ hash only
                                  ▼
             ┌─────────────────────────────────────────┐
             │         TimeProofs API (Edge)           │
             │ Cloudflare Worker                       │
             │ • timestamps (ISO)                      │
             │ • signs HMAC-SHA256(hash|timestamp)     │
             │ • stores proof                          │
             └─────────────────┬───────────────────────┘
                               │
                               ▼
             ┌─────────────────────────────────────────┐
             │          Cloudflare KV Storage           │
             │ { hash, timestamp, signature, meta }     │
             └─────────────────────────────────────────┘
                               │
                               ▼
             ┌─────────────────────────────────────────┐
             │       Public Verify UI (Vercel)          │
             │ • Paste hash                             │
             │ • Drop .tproof.json                      │
             │ • Copy JSON / cURL                       │
             └─────────────────────────────────────────┘
```

---

# 🔄 Lifecycle of a Proof

```
[1] Local hashing
       ↓
[2] Send hash to API
       ↓
[3] Worker timestamps it (ISO-8601)
       ↓
[4] Worker signs (HMAC-SHA256)
       ↓
[5] Worker stores proof in KV
       ↓
[6] Public verification (API / UI)
       ↓
[7] Portable .tproof.json bundles (v0.2)
```

---

# 🧱 Best Practices

### ✔ Always hash locally  
Your content never leaves your device.

### ✔ Always store the verify URL  
Useful for legal or audit-trail workflows.

### ✔ Use bundles for offline verification  
`.tproof.json` = portable + archive-ready.

### ✔ Hash JSON inputs using canonical encoding  
Avoid inconsistencies between systems.

### ✔ Use SHA-256 consistently  
No mixed-hash pipelines.

---

# ❗ Error Codes

| Code | Meaning | Fix |
|------|---------|------|
| `ERR_INVALID_HASH` | Hash not 64-hex | Recompute hash |
| `ERR_NOT_FOUND` | No proof exists | Create a new proof |
| `ERR_RATE_LIMIT` | Too many requests | Slow down / retry |
| `ERR_BAD_REQUEST` | Wrong payload | Check body format |
| `ERR_SERVER` | Internal error | Retry later |

---

# ⚙ Implementation Notes

### KV Schema

```
key = sha256
value = {
  hash,
  timestamp,
  signature,
  type?,
  meta?
}
```

### Signing Rule

```
signature = HMAC_SHA256(SECRET, hash + timestamp)
```

### Limits

- Body size: 2 KB  
- Timeout: Worker default  
- Rate limits: soft per-IP  
- Hash: 64-hex SHA-256 only  

---

# 📊 Performance & SLA (v1.0 planned)

- Global latency < 100ms  
- Zero cold starts  
- Deterministic responses  
- Multi-region KV replication  
- 99.9% uptime target (v1.0)  
Status page: https://status.timeproofs.io  

---

# 🛡 Security & Privacy

- Hash-only workflow  
- TLS 1.3 enforced  
- No cookies, no trackers  
- HMAC-SHA256 signing  
- Stateless execution  
- Public verification endpoint  
- GDPR-aligned  

Full docs:  
https://timeproofs.io/security.html  
https://timeproofs.io/privacy.html  

---

# ⚖ Compliance & Regulations

TimeProofs aligns with:

- **EU AI Act** — traceability & provenance  
- **GDPR** — minimal data (hash-only)  
- **DSA / DMA** — transparency & auditability  
- **Digital Evidence norms** — timestamp + signature  

Full page:  
https://timeproofs.io/regulations.html

---

# 🧭 Roadmap

### v0.1 — Public Beta (Live)
- Timestamp + verify API  
- KV storage  
- ProofSpec v0.1  
- Static site  
- Release sealing  

### v0.2 — Developer Experience
- JavaScript SDK  
- PDF proofs  
- Offline verification  
- Enhanced Verify UI  
- Multi-backend anti lock-in  

### v1.0 — Productization
- Dashboard  
- API keys  
- Stripe billing  
- SLA & status checks  

### v2.0 — Validation Layer
- ProofChain  
- Merkle transparency logs  
- SDKs: Python, Go  
- Audit tooling  

---

# 🙋 FAQ

### “Is this a blockchain?”
No. Deterministic, stateless, no gas, no mining.

### “Is it legally admissible?”
Yes. Cryptographic timestamping + signature qualifies as digital evidence (jurisdiction-specific).

### “Can I self-host?”
Yes (v0.2 BYOI guide).

### “Can AI models use it?”
Yes — agents can timestamp outputs automatically.

### “Can I verify offline?”
Via `.tproof.json` bundles (v0.2).

---

# 👥 Who Uses TimeProofs

- AI agents & LLM apps  
- Developers  
- Legal & compliance teams  
- Researchers & auditors  
- Creators & designers  
- Enterprises needing audit trails  

---

# 📂 Repository Structure

```
/api          → worker.js (HMAC signer + KV)
/site         → static website (Vercel)
/releases     → release hashes
/docs         → ProofSpec + documentation
```

---

# 🏛 Governance & Maintainers

**Maintainer**  
Jeason Bacoul — TimeProofs Creator

**Future Governance (v2.0–v3.0)**  
- TimeProofs Foundation  
- Open ProofSpec Working Group  
- Transparency & audit committee  

---

# 🙏 Acknowledgements

Powered by:

- Cloudflare Workers  
- Cloudflare KV  
- Vercel  
- Web Crypto APIs  
- Open-source ecosystem  

---

# 🤝 Contribute

1. Fork the repo  
2. Create your branch  
3. Submit a PR  

Issues: https://github.com/BACOUL/timeproofs/issues  
Security: security@timeproofs.io

---

# 🧾 License

**MIT License**  
© 2025 TimeProofs — Proof of Existence. For Everything.

---

# 🔏 Proof of Worker — v0.1-final

```
File: worker.js
Version: v0.1-final
Date: 2025-10-24
SHA-256: 5b09abaf6ceec6830fffbdec5443fa2d0883a36574dac4b5dec555acdf0c0903
Timestamp: 2025-10-24T06:26:52.206Z
Signature: 8dd65eb7b9e225a8df5469d89558f2c46216d4db69a892d3ae9d15392ec8af9
Verify: https://timeproofs.io/verify.html?hash=5b09abaf6ceec6830fffbdec5443fa2d0883a36574dac4b5dec555acdf0c0903
Integrity: Cryptographically sealed by TimeProofs.io
Meta: { "src": "release", "env": "prod" }
```
