# Standards and position audit — 2 October 2026

This audit distinguishes transport, authorization, identity, integrity and cross-artifact sufficiency. It is not an exhaustive market survey or an exclusive-novelty claim.

| Standard/source | Provided capability | TimeProofs contribution / alpha state |
|---|---|---|
| [MCP 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25) | Expose tools, resources and context | Possible transport for resolve/collect/verify. Studied; no server shipped. |
| [A2A](https://a2a-protocol.org/latest/specification/) | Task/message/artifact exchange | Possible transport for acquisition. Task success is not authenticity or sufficiency. Studied only. |
| [AP2](https://ap2-protocol.org/ap2/specification/) | Payment/checkout mandates and agent authorization | Reuse mandate semantics and verifier implementations rather than reconstructing payment authorization. Not integrated. |
| [SCITT RFC 9943](https://www.ietf.org/ietf-ftp/rfc/rfc9943.html) | Authenticity/transparency of signed statements | Possible integrity/provenance evidence. Transparency alone does not satisfy purchase outcome. Not integrated. |
| [x401 draft 0.2.0](https://x401.proof.com/spec/latest/) | Route-scoped credential requirements, acquisition hints and proof responses | Significant overlap with requirement acquisition. TimeProofs scope must be the complete versioned action dossier across authority, offer, execution and outcome. No x401 implementation claim. |
| [Agent Receipts](https://agentreceipts.ai/specification/receipt-chain-verification/) | Signed/hash-linked receipts | Potential execution source. Not integrated; do not create a competing receipt. |
| [JWT RFC 7519](https://www.rfc-editor.org/rfc/rfc7519) / JWS / EdDSA | Signed claims using JOSE | Tested strict Ed25519 compact JWT subset. Application mapping is explicit. |
| [VC Data Model 1.1](https://www.w3.org/TR/vc-data-model-1.1/) | Credential issuer / subject / claims | Tested single-subject VC-JWT subset only. No general credential verification claim. |

## G0 decision

The technically distinct boundary is **cross-source lifecycle sufficiency**, including pre-action authority and agreed offer plus post-action execution and outcome linked to one action. It complements the above primitives. x401 already asks for credential proof; a product positioned simply as "ask an agent for proof" would fail the distinction gate.

The reference is deliberately corrected toward a profile resolver with deterministic missing-evidence requests and independent case recomputation. This scoped technical distinction is acceptable for G1–G3 prototyping. Market whitespace, defensibility and customer adoption remain unproven. New standards versions may absorb this capability; track that risk explicitly.

## Legacy primitive audit

Audited source: timeproofs-v1 @ 696bbf21e987c226456636c2903a8de977aca845.

- `sdk/seal-v1.js`: local Ed25519 and validation concepts are sound starting principles, but proprietary Seal envelope and proof-level model are not the V2 design.
- `sdk/verify-offline.js`: separately supplied trusted key is retained as a security principle. Hard-coded issuer/timestamp-seal framing is discarded.
- `docs/canonicalization-profile.md`: explicitly does not claim RFC 8785 compliance; custom Action File exclusions and proof levels are not reused.
- SHA-256/Ed25519 use standard Node crypto implementations. No copied legacy crypto helper is required.
- Privacy-first local operation and portable verification are retained. Hosted resolution necessarily needs relevant claims or trusted attestations; hash-only evidence cannot establish claim semantics.
- Action types inform draft library scope; old Action File and Proof Bundle schemas are not imported into the core.

All legacy branches and commit ancestry remain intact. The V2 branch replaces only its own active product tree.
