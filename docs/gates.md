# Gate ledger — V2 reference alpha

No market gate is inferred from code working. No paid service or production SLA is launched.

| Gate | Current status | Evidence / acceptance boundary |
|---|---|---|
| G0 Distinct position | SCOPED TECHNICAL PASS; MARKET UNPROVEN | Corrected away from x401-style identity proof requests toward complete action lifecycle sufficiency. Standards audit documents overlap. No exclusivity claim. |
| G1 Coherent ProofProfile | REFERENCE PASS | Frozen versioned purchase checks, exact amount strings, role constraints, dependencies; drafts unsupported. Conformance tests. |
| G2 Resolver adds value | REFERENCE PASS | Execution receipt alone returns INCOMPLETE; typed gap requests; registered acquisition; prerequisite blocking; cross-artifact transaction conflict detection. No LLM sufficiency decisions. |
| G3 Purchase end-to-end | SANDBOX PASS | 3/5 → 4/5 → 5/5; original signatures; case export; independent recomputation. No real purchase, merchant or payment rail. |
| G4 Combine standards | LIMITED PASS / BROADER GATE OPEN | JWT and strict VC-JWT 1.1 subset combined. Shared JOSE crypto underneath. AP2/x401/SCITT/receipts not integrated; production cross-standard integration remains pending. |
| G5 Outside reproducibility | INTERNAL CLEAN-INSTALL CHECK; EXTERNAL PENDING | Repository quickstart and verified clean local package installation; no API key or paid dependency. Another person has not yet reproduced it. |
| G6 Independent product value | CONDITIONAL; EXTERNAL VALIDATION PENDING | [Current G6 assessment](g6.md): substantial standards/product overlap; narrow to cross-system purchase evidence retrieval and reconciliation. No customer integration, commitment or paid pilot. |
| G7 Pricing/economics | UNVALIDATED | Proposed €49/199/799 tiers; verification free; no assumed usage limits, margins or paid demand. Local engine timings do not establish SaaS economics. |
| G8 Infrastructure adoption | UNVALIDATED | Headless core, SDK, CLI, OpenAPI, declarative profiles and portable artifacts support the architecture. Adoption, distribution and defensibility remain unproven. |

## Stop conditions / next acceptance

Do not build billing, a management dashboard, enterprise workflows or more speculative integrations while G5/G6 remain open. Next: run the single external authorized_purchase adoption experiment in [G6](g6.md), comparing native verifiers plus a small script with TimeProofs. Require real sandbox integration, independent consumption, repeat use and a concrete paid-operation commitment. The experiment is prepared, not launched. If native tooling covers the workflow with no meaningful extra burden, stop or reposition before expanding.

All five proposed profiles exist in the library, but only authorized_purchase/v1 is executable. There are no empty profiles capable of returning SATISFIED.
