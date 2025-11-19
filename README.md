# 🧩 TimeProofs — Proof of Existence for Everything

**TimeProofs** is a free, open, privacy-first timestamp API.  
Hash locally, get a signed timestamp, verify publicly — with **zero personal data**, **no blockchain**, and **full transparency**.

Website → https://timeproofs.io  
API → https://api.timeproofs.io  
Status → Public Beta v0.1

---

## ✨ Features (v0.1)

- Hash-only inputs (no upload)
- Signed timestamp events
- Public verification endpoint
- Stateless & privacy-first (no logs of content)
- Edge-native (Cloudflare Workers)
- Proof bundle format: `.tproof.json`
- Full site integrity: each page loads its hash from `/releases/v0.1.json`

---

## 🚀 Try in 30 Seconds

### 1. Hash any file
```sh
sha256sum myfile.png
```

### 2. Request a timestamp
```sh
curl -X POST https://api.timeproofs.io/api/timestamp \
  -H "Content-Type: application/json" \
  -d '{"hash":"<SHA256>"}'
```

### 3. Verify
```sh
curl "https://api.timeproofs.io/api/verify?hash=<SHA256>"
```

You will get:
```json
{
  "ok": true,
  "hash": "<SHA256>",
  "ts": 123456789,
  "timestamp_iso": "2025-11-16T16:54:05Z",
  "version": "v0.1",
  "type": "event",
  "verify_url": "https://api.timeproofs.io/api/verify?hash=<SHA256>"
}
```

---

## 🔌 API Reference (v0.1)

### `POST /api/timestamp`
Body:
```json
{ "hash": "..." }
```

Returns:
```json
{
  "ok": true,
  "hash": "...",
  "ts": 123456789,
  "timestamp_iso": "...",
  "version": "v0.1",
  "type": "event",
  "verify_url": "https://api.timeproofs.io/api/verify?hash=..."
}
```

---

### `GET /api/verify?hash=...`
Checks if a hash has been timestamped.

Returns:
```json
{
  "ok": true,
  "verified": true,
  "hash": "...",
  "timestamp_iso": "...",
  "version": "v0.1"
}
```

---

## 📦 Release Integrity (v0.1)

**Official site hash:**  
```
41746697c470098393486fb62de886a997875ebfca1b372b574ecf0bbd95b264
```

**Verify with TimeProofs:**  
https://api.timeproofs.io/api/verify?hash=41746697c470098393486fb62de886a997875ebfca1b372b574ecf0bbd95b264

**Release proof bundle:**  
`/release-v0.1.tproof.json` (included in this repository)

This repository and the deployed site are fully **self-verifiable**.

---

## 🔐 Privacy

TimeProofs never stores or receives:
- files  
- personal data  
- content  
- metadata about users  

The only input is a **SHA-256 hash**.

---

## 📚 Documentation

Protocol (ProofSpec):  
https://timeproofs.io/proofspec.html

API Docs:  
https://timeproofs.io/docs.html

Use Cases:  
https://timeproofs.io/use-cases.html

Security & CSP:  
https://timeproofs.io/security.html

---

## 🗂 Project Structure (v0.1)

```
/index.html
/verify.html
/proofspec.html
/use-cases.html
/docs.html
/security.html
/privacy.html
/legal.html
/about.html
/releases/v0.1.json
/release-v0.1.tproof.json
/sw.js
/assets/*
```

---

## 🧾 License

This project is licensed under the **MPL-2.0 License**.

---

## 🛠 Maintainer

TimeProofs is developed and maintained by Jeason Bacoul.  
Follow updates on: https://github.com/BACOUL/timeproofs
