# AgentReady Maintenance Rules

- Always run `npm run test:agentready-core` before changing `agentready-core`.
- Do not change score thresholds without updating fixtures and tests.
- Do not introduce new action types without tests.
- Do not weaken risk detection to make tests pass.
- Keep the V1 browser-first and static unless explicitly asked otherwise.
