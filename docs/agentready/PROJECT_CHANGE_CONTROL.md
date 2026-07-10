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
