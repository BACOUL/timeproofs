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
