# AgentReady Legacy Boundary

The `relaunch/invariant-engine` branch contains substantial AgentReady-era code, website pages, package metadata and documentation because TimeProofs is reusing the existing repository.

## Important

AgentReady is **not** the active relaunch product.

The active TimeProofs product direction is defined by:

1. `TIMEPROOFS_PRODUCT_CONSTITUTION.md`
2. `docs/startup/CURRENT_STATE.md`
3. `docs/startup/EXECUTION_PLAN.md`
4. `docs/startup/DECISION_LOG.md`
5. `AI_PROJECT_ENTRYPOINT.md`

Do not infer the current product from legacy files such as:

- `AGENTREADY_PROJECT_CONTEXT.md`
- `docs/agentready/**`
- AgentReady-oriented root `README.md` / `ROADMAP.md` content
- `@timeproofs/agentready` package metadata
- legacy CLI/site assets

These remain temporarily to avoid destructive migration before the new TimeProofs core is executable.

## Migration rule

Legacy assets may be reused selectively, but no new TimeProofs architecture or product decision is constrained by AgentReady.

The repository root will be migrated toward the new TimeProofs product after the core fixture/engine path is real. Until then, canonical relaunch documents override legacy product metadata on this branch.
