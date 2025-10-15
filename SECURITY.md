# Security Policy

TimeProofs is designed with privacy and integrity at its core.  
We take all security concerns seriously and appreciate responsible disclosure.

---

## 🔒 Reporting a Vulnerability

If you discover a security issue, **please do not open a public issue**.

Instead, contact us directly at:

📧 **security@timeproofs.io**

Include:
- A detailed description of the vulnerability  
- Steps to reproduce it  
- Its potential impact  
- Optional: a proof-of-concept (PoC) if relevant  

We will acknowledge receipt **within 72 hours** and work with you to resolve the issue promptly.

---

## 🧠 Scope

This policy covers:
- Cloudflare Worker APIs (`/api/proof`, `/api/verify`)
- HMAC-SHA256 signing logic
- Data stored in KV (hash + timestamp + signature)
- The SDK and demo frontend (Vercel deployment)

---

## 🧱 Security Design

- Only **SHA-256 hashes** are ever stored — never raw data.
- Each proof is **cryptographically signed**:  
  `signature = HMAC_SHA256(secret, hash + timestamp)`
- The timestamp is **immutable** and verifiable offline.
- All endpoints are served via **HTTPS (TLS 1.3)**.
- CORS is restricted to trusted origins.
- Secrets are managed via **Cloudflare Environment Variables**.

---

## 🧩 Responsible Disclosure

We strongly support **coordinated disclosure**:
- Do not share or post details publicly before we fix the issue.
- We’ll credit valid findings unless you prefer anonymity.
- Critical issues may qualify for recognition or rewards.

---

## ⚙️ Versioning

This security policy applies from **TimeProofs v0.1.0** onward  
and will evolve as the system architecture grows.

---

Thank you for helping make **TimeProofs** safer for everyone.
