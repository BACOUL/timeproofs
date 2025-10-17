# ✅ TimeProofs — v0.1 Public Beta Checklist

> **Objective:** Deliver a stable, public MVP (Minimum Viable Proof) — fully verifiable, open, and privacy-first.  
> Once this checklist is fully green ✅, version `v0.1.0` can be officially tagged and released.

---

## 🧩 1. Core API & Infrastructure

| Task | Status | Notes |
|------|--------|-------|
| `/timestamp` endpoint operational | ✅ | Working on Cloudflare Workers |
| `/verify` endpoint operational | ✅ | Returns correct timestamp & signature |
| HMAC-SHA256 signature validated | ✅ | Secure, deterministic |
| Cloudflare KV storage active | ✅ | `{ hash, timestamp, signature }` verified |
| Worker secret key in `.env` (local only) | ⚠️ | Hide real key on Cloudflare dashboard |
| API Base URL documented | ✅ | `https://timeproofs-api.jeason-bacoul.workers.dev/api` |

---

## 💻 2. Frontend (Vercel Static Site)

| Page | Status | Notes |
|-------|--------|-------|
| `/index.html` | ⚠️ | Finalize hero text + “Create / Verify” CTA |
| `/verify.html` | ✅ | Fully functional verification interface |
| `/docs.html` | ✅ | API documentation aligned with endpoints |
| `/privacy.html` | ✅ | Privacy policy included |
| `/legal.html` | ✅ | Legal notice (mentions légales) complete |
| `/roadmap.html` | ✅ | Public product roadmap displayed |
| `/404.html` | ✅ | Custom 404 page ready |
| Navigation + mobile burger | ✅ | Functional; verify responsive layout |
| Accessibility (ARIA roles, contrast) | ⚠️ | Add ARIA attributes + run Lighthouse audit |
| SEO meta tags | ⚠️ | Review titles + canonical after domain setup |

---

## ⚙️ 3. Repository & Governance Files

| File | Status | Notes |
|------|--------|-------|
| `README.md` | ✅ | Complete and descriptive |
| `LICENSE` | ✅ | MIT License (© 2025 TimeProofs) |
| `CHANGELOG.md` | ✅ | Includes v0.1 → v0.2 timeline |
| `CONTRIBUTING.md` | ✅ | Open-source contribution guide |
| `CODE_OF_CONDUCT.md` | ✅ | Community behavior rules |
| `SECURITY.md` | ✅ | Reporting procedure for vulnerabilities |
| `SUPPORT.md` | ✅ | Help & contact info |
| `.github/ISSUE_TEMPLATE/` | ✅ | Templates for bug & feature requests |
| `PULL_REQUEST_TEMPLATE.md` | ✅ | Pull request format ready |

---

## 🔒 4. Security & Privacy

| Task | Status | Notes |
|------|--------|-------|
| HTTPS enforced (Vercel + Cloudflare) | ✅ | SSL/TLS 1.3 enabled |
| No cookies / trackers | ✅ | Privacy-first architecture |
| Only SHA-256 hashes stored | ✅ | No personal data retained |
| Rate limit / abuse protection | ⚠️ | To confirm Worker limits and logs |
| `SECURITY.md` published | ✅ | Publicly accessible in repo |

---

## 📈 5. SEO & Discoverability

| Task | Status | Notes |
|------|--------|-------|
| `robots.txt` created | ✅ | Clean and compliant |
| `sitemap.xml` created | ✅ | Lists all pages |
| Favicon / OG images | ⚠️ | To add at end of v0.1 |
| Canonical URLs | ⚠️ | To update after domain purchase |
| Open Graph / Twitter cards | ⚠️ | To review before release |
| Meta title + description audit | ⚠️ | Lighthouse SEO ≥95 target |

---

## 🧠 6. QA & Validation

| Task | Status | Notes |
|------|--------|-------|
| Manual test of `/timestamp` + `/verify` | ✅ | Works from desktop + mobile |
| Verify UI test with multiple hashes | ✅ | Valid results |
| Mobile UX test | ⚠️ | To finalize burger + layout check |
| Accessibility (Lighthouse ≥90) | ⚠️ | Run before tag |
| SEO audit (Lighthouse ≥95) | ⚠️ | Run before tag |
| Performance audit (Core Web Vitals) | ⚠️ | Test build on Vercel |

---

## 🧭 7. GitHub Release

| Step | Status | Notes |
|------|--------|-------|
| Create tag `v0.1.0` | ⏳ | To do once checklist fully ✅ |
| Add Release Notes on GitHub | ⏳ | Copy from `CHANGELOG.md` |
| Add build badge to README | ✅ | Already included |
| Announce Public Beta (GitHub + X) | ⏳ | Scheduled post after release |

---

## 🌐 8. Domain & Deployment (Final Step)

| Step | Status | Notes |
|------|--------|-------|
| Buy `timeproofs.io` | ⏳ | To do after v0.1 validation |
| Point DNS to Vercel | ⏳ | Setup A / AAAA records |
| Add favicon + canonical URLs | ⏳ | Final polish |
| Redeploy with custom domain | ⏳ | Final test: `https://timeproofs.io` |
| Confirm public indexing | ⏳ | Submit sitemap to Google |

---

## 🏁 Completion Criteria (Definition of Done)

✅ All core endpoints and pages functional  
✅ All governance files present and public  
✅ SEO / A11Y audits ≥90  
✅ GitHub release `v0.1.0` published  
✅ Domain live and sitemap submitted  
✅ Communication plan ready  

---

### 📬 Contact
**hello@timeproofs.io**  
**https://timeproofs.vercel.app**

---

**→ When all boxes are green, tag `v0.1.0` and mark it “Public Beta (stable)”.**
