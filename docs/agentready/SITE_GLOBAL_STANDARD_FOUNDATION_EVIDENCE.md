# AgentReady Standard Foundation Evidence

Status: OWNER REVIEW REQUIRED
Batch: ARB-SITE-GLOBAL-003
PR: #135
Base branch: site-agentready-global-product
Actual stacked base head: 1a71cb469e608d548b42c5884a4165563216733b

## Source Inventory

- Definition and scope: docs/agentready/AGENTREADY_RULE_CODES.md, GLOBAL_STANDARD_SITE_PROGRAM.md, PUBLIC_SITE_INFORMATION_ARCHITECTURE.md, SITE_COPY_GUIDE.md.
- Rule codes AR001-AR010: docs/agentready/AGENTREADY_RULE_CODES.md and agentready-core/types.js.
- Severity and score: docs/agentready/AGENTREADY_SCORE_MODEL.md and agentready-core/types.js.
- PASS, FAIL, min-score, fail-on and exit codes: docs/agentready/AGENTREADY_JSON_SPEC.md.
- Versioning and compatibility: docs/agentready/MCP_VERSION_COMPATIBILITY_POLICY.md and docs/agentready/AGENTREADY_JSON_SPEC.md.
- Governance and namespace: docs/agentready/PROJECT_CHANGE_CONTROL.md and docs/agentready/RULE_FORMAT_AND_GOVERNANCE.md.
- Reference implementation behavior: docs/agentready/GITHUB_ACTION_USAGE.md, GITHUB_ACTION_VERSIONING.md, AGENTREADY_JSON_SPEC.md and current CLI scans.

## Conflicts And Acceptance Requirements

- Benchmark quality remains not fully measured; pages avoid scientific-validation claims.
- AgentReady is not a formal standards-body standard; pages use method, public specification and rule vocabulary language.
- AR008 and some rule descriptions are broader than some implemented heuristics; rule pages label current coverage as contract-level and implementation-bound.
- MCP protocol version coverage must not invent unknown future protocol support.

## Route Map

- agentready-standard.html: standard overview, boundaries, reference implementation relationship.
- agentready-rule-codes.html: AR001 through AR010 catalogue, severity and remediation.
- agentready-json.html: v0.1 machine-readable contract, PASS/FAIL and versioning model.
- agentready-examples.html: reproducible OpenAPI and MCP fixtures.
- agentready-sample-report.html: report reading and policy interpretation.
- agentready-resources.html: normative and explanatory resource index.

## AR001-AR010 Mapping

- AR001_UNBOUNDED_WRITE_ACTION: Unbounded write action; source=OpenAPI and MCP where current findings apply; findings=unbounded_parameter; severity=high.
- AR002_MISSING_CONFIRMATION_BOUNDARY: Missing confirmation boundary; source=OpenAPI and MCP; findings=missing_human_confirmation_flow, dangerous_action_without_confirmation; severity=critical.
- AR003_DESTRUCTIVE_OPERATION_AMBIGUOUS: Destructive operation ambiguous; source=MCP in current implementation; findings=mcp_dangerous_tool_weak_description; severity=high.
- AR004_BULK_ACTION_WITHOUT_LIMIT: Bulk action without limit; source=OpenAPI and MCP where response structure is analyzable; findings=large_unstructured_response; severity=medium.
- AR005_SENSITIVE_DATA_EXPOSURE: Sensitive data exposure; source=OpenAPI and MCP; findings=sensitive_data_exposure; severity=high.
- AR006_MISSING_DRY_RUN_OR_PREVIEW: Missing dry run or preview; source=OpenAPI and MCP; findings=irreversible_action, missing_success_verification; severity=high or medium by finding.
- AR007_OVERBROAD_TOOL_SCOPE: Overbroad tool scope; source=OpenAPI and MCP; findings=overbroad_permission, agent_context_confusion; severity=high or medium by finding.
- AR008_MISSING_IDEMPOTENCY_OR_ROLLBACK: Missing idempotency or rollback; source=OpenAPI and MCP where current findings apply; findings=non_corrective_error, missing_error_recovery; severity=medium.
- AR009_UNCLEAR_AGENT_INSTRUCTIONS: Unclear agent instructions; source=OpenAPI and MCP; findings=unclear_operation_name, ambiguous_tool_description, missing_when_to_use, missing_when_not_to_use, unknown_action_type, mcp_vague_tool_name, mcp_missing_output_schema; severity=medium.
- AR010_MISSING_RATE_OR_SCOPE_LIMIT: Missing rate or scope limit; source=OpenAPI and MCP; findings=missing_enum, mcp_missing_input_schema, mcp_empty_input_schema, mcp_missing_required_fields; severity=medium or high by finding.

## Example Provenance

Evidence file: docs/agentready/evidence/site-global-standard-foundation/example-provenance.json

- OpenAPI bad fixture command: node bin/agentready.js scan openapi agentready-examples/commercial/openapi-refund-risk.bad.json --min-score 75 --fail-on critical
- OpenAPI fixed fixture command: node bin/agentready.js scan openapi agentready-examples/commercial/openapi-refund-risk.fixed.json --min-score 75 --fail-on critical
- MCP bad fixture command: node bin/agentready.js scan mcp agentready-examples/commercial/mcp-email-risk.bad.json --min-score 75 --fail-on critical
- MCP fixed fixture command: node bin/agentready.js scan mcp agentready-examples/commercial/mcp-email-risk.fixed.json --min-score 75 --fail-on critical

## Claims Audit

- Certification claim audit: PASS
- Guaranteed-safety claim audit: PASS
- Formal standards-body recognition claim audit: PASS
- Runtime-firewall or hosted-scanner claim audit: PASS

## CTA And Internal Links

Primary standard routes link between overview, rule codes, agentready.json, examples, sample report and resources. Product paths remain linked to OpenAPI scanner, MCP scanner, CI gate and documentation.

## Visual And Accessibility Evidence

Desktop screenshots: docs/agentready/evidence/site-global-standard-foundation/desktop/*.png
Mobile screenshots: docs/agentready/evidence/site-global-standard-foundation/mobile/*.png
No-JavaScript screenshots: docs/agentready/evidence/site-global-standard-foundation/nojs/*.png
Keyboard report: docs/agentready/evidence/site-global-standard-foundation/keyboard-focus-report.json
No-JavaScript report: docs/agentready/evidence/site-global-standard-foundation/no-javascript-report.json
320px overflow report: docs/agentready/evidence/site-global-standard-foundation/overflow-320-report.json
CTA report: docs/agentready/evidence/site-global-standard-foundation/cta-link-report.json

## Preview

Combined stacked preview URL: pending Vercel deployment for PR #135.
