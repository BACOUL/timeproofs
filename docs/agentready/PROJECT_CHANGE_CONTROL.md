# AgentReady Project Change Control

Status: ACTIVE CHANGE CONTROL

No implementation task may change the product strategy, launch scope,
pricing model, Community/Pro boundary, execution sequence or approved
positioning without a new Decision Log entry.

Newly discovered work must first be recorded, evaluated, assigned,
linked to dependencies and inserted into the canonical execution ledger.

The ledger represents all known approved work, not unknowable future work.

Granularity is part of change control. A new or changed `CODEX_PR` task must
have one concrete result, coherent paths or surfaces, precise dependencies,
its own test plan, its own evidence, an independent rollback boundary and a
scope justification. If separate deliverables can reasonably be implemented,
tested, reviewed, reverted or released independently, they must be split.

The ledger distinguishes detailed work items from Codex execution batches:

```txt
One ledger work item = one independently verifiable unit of work.
One Codex execution batch = one coherent pull request that may complete one or several compatible ledger work items.
One execution-ready Codex batch = one generated Codex prompt.
```

Detailed `CODEX_WORK_ITEM` entries may remain numerous. They do not become
prompts by themselves. Future prompts are generated only from
`execution_batches`.

A batch may be refined without a new strategic decision when the refinement
does not change the product, scope, horizon, milestone, deliverable, or
Community/Pro boundary.

A change that removes, adds, materially changes, splits, merges or resequences
approved deliverables must be recorded through the Decision Log and the
canonical ledger before implementation.

The batch cycle is:

```txt
planned work item
-> batch refinement
-> execution-ready batch
-> dependencies completed
-> generated Codex prompt
-> implementation
-> review
-> merge
-> reconciliation
```

## Required Decision Fields

- identifier;
- date;
- context;
- decision;
- reason;
- consequences;
- tasks added;
- tasks removed;
- tasks moved;
- Jeason approval.

## Workflow

1. Record the proposed change outside an implementation PR.
2. Decide whether it affects strategy, launch scope, pricing, Community/Pro boundary, execution order, positioning, milestone definitions, legal posture, or public claims.
3. Add a Decision Log entry before implementation when required.
4. Update `AGENTREADY_EXECUTION_LEDGER.json`.
5. Regenerate the Markdown views.
6. Validate the execution system.
7. Only then create or update the implementation task.

No newly discovered task may be inserted directly into implementation.

No generated Markdown view may be edited manually.

## Temporary Production Alignment Exception - 2026-07-13

Status: RECORDED

Context:

The stacked AgentReady site program normally requires the complete site stack
to be reviewed and merged in dependency order before production promotion:

1. `ARB-SITE-PREMIUM-001`
2. `ARB-SITE-GLOBAL-002`
3. `ARB-SITE-GLOBAL-003`
4. `ARB-SITE-GLOBAL-004`
5. `ARB-SITE-GLOBAL-005`
6. `ARB-SITE-GLOBAL-006`
7. `ARB-SITE-GLOBAL-007`

On 2026-07-13, JEASON reported that the latest `ARB-SITE-GLOBAL-002` preview
had been promoted toward production before completion of the full global-site
stack, and that the public domain appeared to serve obsolete content.

Reconciliation result:

- Expected production content source: PR #134, branch
  `site-agentready-global-product`, commit
  `13abbcd4e85c0937550ecaded3cb5b253577b0c4`.
- Checked public domain: `https://timeproofs.io`.
- Checked preview deployment:
  `https://timeproofs-git-site-agentready-global-product-jeason1.vercel.app/`.
- Checked routes: `/`, `/product.html`, `/community.html`, `/pro.html`,
  `/pricing.html`, `/agentready.html`, `/agentready-mcp.html`,
  `/agentready-ci.html`.
- Public production and the PR #134 preview returned matching route ETags for
  the inspected routes.
- The inspected production HTML contained the expected Product, Community,
  planned Pro and pricing foundation copy.
- The inspected production HTML did not contain the obsolete manual
  AgentReady Review offer, `149 EUR`, Fix Pack, `499 EUR`, mandatory contact
  or email-payment offer on the inspected routes.

Decision:

This is recorded only as a temporary production alignment exception. It does
not mark PR #132, PR #134, `ARB-SITE-PREMIUM-001`, `ARB-SITE-GLOBAL-002` or
the global premium site as complete.

Sequence preserved:

`ARB-SITE-GLOBAL-003`, `ARB-SITE-GLOBAL-004`, `ARB-SITE-GLOBAL-005`,
`ARB-SITE-GLOBAL-006` and `ARB-SITE-GLOBAL-007` remain blocked until the
current stacked-site state is reviewed and reconciled according to the
canonical ledger.

Owner acceptance:

On 2026-07-13, JEASON reviewed and accepted the reconciliation report for PR
#132 and PR #134.

Accepted facts:

- PR #132 remains open and draft.
- PR #134 remains open and draft.
- No site PR has been merged.
- PR #134 current head is
  `5c211bd4b4795c379f85da5548f2c493e546cbbb`.
- The inspected production routes currently match the PR #134 product and
  pricing foundation.
- The obsolete `149 EUR` review offer and `499 EUR` Fix Pack were not detected
  on the inspected production routes.
- The early production promotion is accepted only as a temporary production
  alignment exception.
- This acceptance does not mean that the full premium/global-standard site is
  complete.
- The strict sequence `ARB-SITE-GLOBAL-003` through `ARB-SITE-GLOBAL-007`
  remains mandatory.

Canonical execution effect:

- `ARB-SITE-PREMIUM-001` remains `IN_REVIEW` as PR #132, the stack foundation.
- `ARB-SITE-GLOBAL-002` is recorded as implemented and `IN_REVIEW` as PR #134.
- Neither batch is `DONE` until its PR is merged and reconciled.
- The next site batch may only proceed through the canonical ledger and
  generated next-action process.

## ARB-SITE-GLOBAL-003 Owner Review Acceptance - 2026-07-13

Status: RECORDED

On 2026-07-13, JEASON accepted the visual and factual presentation of
`ARB-SITE-GLOBAL-003` for the current stacked public-standard foundation.

Recorded facts:

- Production URL reviewed: `https://timeproofs.io/`.
- Reviewed source branch: `site-agentready-global-standard`.
- Reviewed public-content commit:
  `25636982cd944d3e947081740d5226f692c83741`.
- The production deployment was manually promoted and verified.
- The homepage displays the new "Public method" presentation.
- `agentready-docs.html` displays `agentready_version: "0.1"`.
- `agentready-docs.html` displays `score: 72`.
- `agentready-docs.html` displays `status: "Minor fixes"`.
- No claim of formal standards-body recognition, independent certification or
  guaranteed safety was approved.
- No PR was merged.

Canonical execution effect:

- `ARB-SITE-GLOBAL-003` remains `IN_REVIEW` because PR #135 is still open and
  unmerged.
- The owner review is complete for stacked-continuation purposes.
- `ARB-SITE-GLOBAL-003` is not `DONE` until PR #135 is merged and reconciled.
- Stacked execution may continue to the next canonical batch,
  `ARB-SITE-GLOBAL-004`, if its specification is `EXECUTION_READY` and the
  generated next action authorizes it.
