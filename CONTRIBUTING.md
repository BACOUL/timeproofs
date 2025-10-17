# 🤝 Contributing to TimeProofs

> Thank you for contributing to **TimeProofs** — the open, privacy-first, and edge-native proof-of-existence layer.  
> Every contribution helps make TimeProofs the global standard for digital proofs.

---

## 🧭 Philosophy

- **Privacy-first** — only hashes, never raw content.  
- **Open verification** — anyone can independently verify proofs.  
- **Edge-native** — fast, global, serverless infrastructure.  
- **Predictable cost** — no blockchain, no gas, no hidden fees.  
- **Minimalism** — clarity, transparency, and simplicity first.

---

## 🧱 Repository Structure

timeproofs/ ├── api/ → Cloudflare Worker code (/timestamp, /verify) ├── public/ → Static frontend (Verify UI, Docs, Legal, Privacy) ├── assets/ → Icons, images, PDF templates ├── ROADMAP.md → Product plan and milestones ├── CHANGELOG.md → Version history ├── LICENSE → MIT License ├── vercel.json → Build configuration └── package.json → Dependencies and scripts

---

## 🧩 How to Contribute

### 🐛 Report a Bug  
Open an **issue** titled “Bug Report” and include:  
- Steps to reproduce  
- Expected vs actual result  
- Browser or environment details  
- Example API request (if relevant)

👉 [Create a new issue](https://github.com/BACOUL/timeproofs/issues/new)

---

### 💡 Suggest a Feature  
Open a **Feature Request** and describe:  
- The problem you’re solving  
- Your proposed solution  
- A concrete usage example  

👉 [Propose a new feature](https://github.com/BACOUL/timeproofs/issues/new)

---

### 🧰 Improve the Documentation  
Docs live in:  
- `/public/docs.html` — API reference  
- `/ROADMAP.md` — roadmap and milestones  
- `/README.md` — project overview  

You can:  
- Fix typos or improve clarity  
- Add examples  
- Update outdated sections  

---

### 🧑‍💻 Code Contributions

1. Fork this repository  
2. Create a new branch (`fix/bug` or `feat/feature-name`)  
3. Make your changes  
4. Test locally (Vercel build or Cloudflare Worker)  
5. Submit a clean Pull Request  

**Code Guidelines:**  
- Use modern TypeScript or ES Modules  
- Keep it Edge-compatible (no Node-only libs)  
- Use clear comments and concise logic  
- Prefer readability over cleverness  

**PR naming conventions:**  
- `fix:` — for bug fixes  
- `feat:` — for new features  
- `docs:` — for documentation updates  
- `chore:` — for minor maintenance  

---

## 🧪 Pre-Submission Checklist

- `/timestamp` and `/verify` endpoints fully functional  
- Tested on desktop and mobile  
- No console errors or warnings  
- Lighthouse score ≥ 95  
- No personal data stored  
- HTTPS, ARIA, and SEO validated  

---

## 🛡️ Security Policy

If you discover a vulnerability, **do not open a public issue**.  
Instead, contact:

📧 **security@timeproofs.io** or **hello@timeproofs.io**  
Subject: `Security Disclosure`

You’ll receive a prompt and confidential response.

---

## 🧠 Code of Conduct

TimeProofs follows the [Contributor Covenant](https://www.contributor-covenant.org/).  
All contributors agree to act respectfully and inclusively.

---

## 📄 License

All contributions are published under the same license as the project:  
**MIT License © 2025 TimeProofs**

---

## 👥 Maintainers

**@BACOUL** — Founder & Lead Maintainer  
Contributions welcome from developers, researchers, and creators worldwide.
