# Contributing to TimeProofs

Thank you for your interest in contributing to **TimeProofs** — the open, privacy-first, edge-native standard for digital proof of existence. Every contribution helps strengthen the foundation of a global, verifiable and trustworthy internet.

This document explains how to report issues, request new features, and submit high-quality contributions aligned with the TimeProofs philosophy.

---

## Philosophy

TimeProofs follows five core principles:

- **Privacy-first** — only SHA-256 hashes are processed; original content never leaves the device.
- **Open verification** — every proof must be independently verifiable.
- **Edge-native** — global, deterministic, low-latency infrastructure.
- **Predictable cost** — no blockchain, no gas, no tokens, no hidden fees.
- **Minimalism** — clarity, transparency and auditability above complexity.

All contributions must respect these principles.

---

## Repository Structure

```
timeproofs/
├── api/           # Cloudflare Worker (timestamp + verify)
├── public/        # Static site (Verify UI, Docs, ProofSpec, Privacy, Legal)
├── assets/        # Logos, icons, images
├── releases/      # Version manifests and proof hashes
├── README.md
├── CHANGELOG.md
├── LICENSE
├── vercel.json
└── package.json
```

---

## Branching Model

- `main` — stable production
- `timeproofsv01` — archived v0.1
- `timeproofsv02` — development for v0.2
- `feature/*` — new features
- `fix/*` — bug fixes
- `docs/*` — documentation updates

Pull Requests must target the correct branch (usually `timeproofsv02`).

---

## Reporting a Bug

Before opening a bug report, ensure that:

- The issue persists after refresh
- No similar issue already exists
- The console has no unrelated errors
- The API responds consistently

Your report must include:

- Steps to reproduce  
- Expected result  
- Actual result  
- Browser, OS, environment  
- API request example (if applicable)  
- Screenshots or logs  

Create an issue:  
https://github.com/BACOUL/timeproofs/issues/new

---

## Requesting a Feature

A valid feature request must include:

- The problem you want to solve
- The proposed solution
- A real usage example
- Impact on ProofSpec or API behavior

---

## Improving Documentation

Documentation lives in:

- `/public/docs.html`
- `/public/proofspec.html`
- `/public/verify.html`
- `/README.md`
- `/CHANGELOG.md`

You may contribute by fixing typos, improving clarity, updating examples or correcting outdated sections.

---

## Code Contributions

### Steps

1. Fork the repository  
2. Create a branch  
3. Implement your changes  
4. Test locally  
5. Submit a clean Pull Request  

### Guidelines

- Use ES Modules or TypeScript
- Ensure Cloudflare Worker compatibility (no Node-only APIs)
- Prefer clear, readable logic
- Follow ProofSpec for all protocol-related logic
- Never handle raw content (hash-only architecture)

### Commit Style (Conventional Commits)

- `feat:` new feature  
- `fix:` bug fix  
- `docs:` documentation  
- `refactor:` non-breaking change  
- `chore:` maintenance  
- `perf:` performance improvement  

Examples:  
`feat: add tproof.json bundle support`  
`fix: correct HMAC timestamp normalization`  
`docs: update verification examples`

---

## Local Setup

Make sure you have environment variables configured for:

- `TP_SECRET_KEY` (HMAC key)
- `KV_NAMESPACE` (Cloudflare KV binding)

---

## Testing Checklist (Required Before PR)

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
- Hash behavior consistent with ProofSpec

---

## Security Disclosure

Do **not** open a public issue for vulnerabilities.  
Contact privately:

security@timeproofs.io  
PGP: https://timeproofs.io/pgp.txt  
Security policy: https://timeproofs.io/.well-known/security.txt

---

## Code of Conduct

TimeProofs follows the Contributor Covenant.  
Contributors must act respectfully, inclusively and professionally.

---

## License

All contributions are licensed under:

**MIT License © 2025 TimeProofs**

---

## Maintainers

**@BACOUL** — Founder & Lead Maintainer  
Community contributions are welcome from developers, researchers, institutions and creators worldwide.
