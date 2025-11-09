<<<<<<< HEAD
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
=======
# Security Policy — TimeProofs

TimeProofs is an open, privacy-first protocol for digital proof of existence.  
This document defines how to responsibly report and coordinate security vulnerabilities.

---

## Supported Versions

| Version | Status        | Security Fixes |
|----------|----------------|----------------|
| v0.1     | Public Beta    | ✅ Active (monitored) |
| < v0.1   | Experimental   | ❌ Not supported |

---

## Reporting a Vulnerability

If you believe you’ve discovered a security or privacy vulnerability, please report it privately and responsibly.

**Contact:**
- 📧 Email: [security@timeproofs.io](mailto:security@timeproofs.io)
- 🔑 PGP Key: [https://timeproofs.io/pgp.txt](https://timeproofs.io/pgp.txt)

**Do not** publicly disclose issues before coordinated remediation and acknowledgment.

We commit to:
1. Acknowledge your report within **72 hours**.
2. Provide an initial assessment within **7 days**.
3. Publish a security advisory once mitigations are live.

---

## Scope

This policy covers:
- API endpoints (`/api/timestamp`, `/api/verify`)
- Frontend site (https://timeproofs.io)
- Cloudflare Workers backend & KV storage
- Open-source repositories under `github.com/timeproofs`

Out of scope:
- Third-party dependencies (handled via Dependabot)
- Local integrations or forks not maintained by TimeProofs

---

## Disclosure Process

1. Submit your report to [security@timeproofs.io](mailto:security@timeproofs.io)
2. Include:
   - Description and steps to reproduce
   - Affected endpoint or component
   - Potential impact and severity
3. Optionally encrypt with our [PGP key](https://timeproofs.io/pgp.txt)

---

## Hall of Thanks

Researchers who help secure TimeProofs will be acknowledged on:
🔗 [https://timeproofs.io/security](https://timeproofs.io/security)

---

## Policy References

- Canonical: [https://timeproofs.io/.well-known/security.txt](https://timeproofs.io/.well-known/security.txt)  
- Legal terms: [https://timeproofs.io/legal.html](https://timeproofs.io/legal.html)  
- Privacy policy: [https://timeproofs.io/privacy.html](https://timeproofs.io/privacy.html)

---

© 2025 TimeProofs — Proof of Existence. For Everything.
>>>>>>> timeproofsv01
