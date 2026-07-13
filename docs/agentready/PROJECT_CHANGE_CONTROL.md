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
