# 🚀 Pull Request — TimeProofs

Thank you for contributing to TimeProofs, the open and privacy-first proof-of-existence protocol.

This repository follows the v0.2 stateless architecture (Ed25519, canonical proofs, no storage).
Please ensure your changes comply with these rules.

## 🔍 Summary

Describe what this PR changes and why.

Focus on:
- correctness
- protocol consistency
- backward compatibility

## 🔄 Type of Change

Select all that apply:

- [ ] feat — New feature  
- [ ] fix — Bug fix  
- [ ] docs — Documentation update  
- [ ] refactor — Internal restructuring (no behavior change)  
- [ ] chore — Maintenance / cleanup  
- [ ] test — Tests only  

## 🧪 How to Test

Describe how reviewers can validate this change.

Example:

node sdk/test.js

Or:

curl -X POST https://api.timeproofs.io/api/timestamp \
  -H "Content-Type: application/json" \
  -d '{"hash":"<sha256>"}'

## 🔐 Security & Privacy Checklist

Confirm all applicable points:

- [ ] No personal data stored or transmitted  
- [ ] Hash-only model preserved (no raw content)  
- [ ] Stateless API preserved (no persistence added)  
- [ ] Ed25519 verification logic unchanged or strengthened  
- [ ] Canonical string format unchanged  
- [ ] No weakening of key-freeze guarantees  
- [ ] No sensitive data in logs or errors  

## 🧩 Protocol Compatibility

- [ ] Compatible with TimeProofs v0.2  
- [ ] Canonical format preserved (hash|issuedAt|issuer|nonce)  
- [ ] issuer remains https://api.timeproofs.io  
- [ ] Ed25519 key freeze respected  
- [ ] .tproof.json format unchanged  
- [ ] Existing clients remain compatible  

## 🧪 Verification

- [ ] sdk/verify.js passes  
- [ ] sdk/test.js passes  
- [ ] Bundle validates with verifyBundle()  
- [ ] Offline verification still works  

## 📦 Additional Notes

Add any context, rationale, or follow-up work here.

## 🛡️ Security Disclosure

Security issues must not be submitted via Pull Requests.

Please report responsibly via:
security@timeproofs.io  
https://timeproofs.io/.well-known/security.txt
