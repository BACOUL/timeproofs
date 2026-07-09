import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { runStaticSimulation, scanMcpToolsText, scanOpenApiText } from '../index.js';
import { FINDING_RULE_CODE_MAP, RISK_DEFINITIONS, RULE_CODES } from '../types.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../..');
const fixturesRoot = path.join(__dirname, 'fixtures');

const REQUIRED_CONTRACT_ROOT_FIELDS = [
  'agentready_version',
  'generated_at',
  'source_type',
  'source',
  'summary',
  'tools'
];

const REQUIRED_CONTRACT_TOOL_FIELDS = [
  'operation_id',
  'path',
  'method',
  'action_type',
  'risk_level',
  'requires_human_confirmation',
  'allowed_when',
  'forbidden_when',
  'failure_modes',
  'detected_risks',
  'rule_codes',
  'detected_rules',
  'agent_recommendation'
];

const results = [];

const classification = await scanOpenApiFixture('openapi-classification.json');
const safeOpenApi = await scanOpenApiRepoFixture('agentready-examples/valid-simple-openapi.json');
const dangerousOpenApi = await scanOpenApiRepoFixture('agentready-examples/dangerous-actions-openapi.json');
const refundBad = await scanOpenApiRepoFixture('agentready-examples/commercial/openapi-refund-risk.bad.json');
const refundFixed = await scanOpenApiRepoFixture('agentready-examples/commercial/openapi-refund-risk.fixed.json');
const emailBad = await scanMcpRepoFixture('agentready-examples/commercial/mcp-email-risk.bad.json');
const emailFixed = await scanMcpRepoFixture('agentready-examples/commercial/mcp-email-risk.fixed.json');
const filesBad = await scanMcpRepoFixture('agentready-examples/commercial/mcp-files-risk.bad.json');
const filesFixed = await scanMcpRepoFixture('agentready-examples/commercial/mcp-files-risk.fixed.json');
const safeMcp = await scanMcpFixture('mcp-safe-tool.json');
const dangerousMcp = await scanMcpFixture('mcp-dangerous-tool.json');

test('OPENAPI CLASSIFICATION: GET /health is HEALTH_CHECK, low risk, no confirmation, no risks', () => {
  const tool = toolById(classification, 'checkHealth');
  assert.equal(tool.action_type, 'HEALTH_CHECK');
  assert.equal(tool.risk_level, 'low');
  assert.equal(tool.requires_human_confirmation, false);
  assert.deepEqual(tool.detected_risks, []);
});

test('OPENAPI CLASSIFICATION: POST /customers/search is SEARCH and never SEND/PUBLISH/PAY because of email fields', () => {
  const tool = toolById(classification, 'searchCustomers');
  assert.equal(tool.action_type, 'SEARCH');
  assert.ok(!['SEND', 'PUBLISH', 'PAY'].includes(tool.action_type));
});

test('OPENAPI CLASSIFICATION: refund/delete/send actions require human confirmation', () => {
  assertAction(classification, 'refundOrderWithApproval', 'REFUND', true);
  assertAction(classification, 'deleteUserAfterApproval', 'DELETE', true);
  assertAction(classification, 'sendInvoiceEmail', 'SEND', true);
});

test('OPENAPI CLASSIFICATION: POST /webhooks/stripe is WEBHOOK and not agent-callable', () => {
  const tool = toolById(classification, 'receiveStripeWebhook');
  assert.equal(tool.action_type, 'WEBHOOK');
  assert.equal(tool.requires_human_confirmation, false);
  assert.match(tool.agent_recommendation, /Do not expose this inbound webhook as an autonomous agent-callable tool/);
});

test('RISK REGRESSION: controlled dangerous actions do not emit dangerous_action_without_confirmation', () => {
  for (const tool of classification.agentready_json.tools.filter((entry) => entry.requires_human_confirmation)) {
    assert.ok(!tool.detected_risks.includes('dangerous_action_without_confirmation'), `${tool.operation_id} used legacy uncontrolled risk code`);
    assert.ok(!tool.detected_risks.includes('missing_human_confirmation_flow'), `${tool.operation_id} should document confirmation flow`);
  }
});

test('RISK REGRESSION: health checks never become dangerous action types', () => {
  const tool = toolById(classification, 'checkHealth');
  assert.ok(!['PAY', 'SEND', 'PUBLISH', 'DELETE', 'REFUND', 'TRANSFER'].includes(tool.action_type));
});

test('RISK REGRESSION: search endpoints never become outbound or payment actions because of email fields', () => {
  const tool = toolById(classification, 'searchCustomers');
  assert.ok(!['SEND', 'PUBLISH', 'PAY'].includes(tool.action_type));
});

test('RISK REGRESSION: webhook endpoints are not normal executable agent tools', () => {
  const tool = toolById(classification, 'receiveStripeWebhook');
  assert.equal(tool.action_type, 'WEBHOOK');
  assert.match(tool.agent_recommendation, /inbound webhook/);
  assert.match(tool.forbidden_when.join(' '), /autonomous agent/);
});

test('SCORING: safe fixtures score higher than dangerous fixtures', () => {
  assert.ok(safeOpenApi.summary.score > dangerousOpenApi.summary.score);
  assert.ok(safeMcp.summary.score > dangerousMcp.summary.score);
});

test('SCORING: mixed commercial fixture scores >= 70 with 0 critical summary risks', () => {
  assert.ok(classification.summary.score >= 70, `score=${classification.summary.score}`);
  assert.equal(classification.summary.risk_counts.critical, 0);
});

test('SCORING: dangerous refund/delete fixtures retain high or critical findings', () => {
  const refund = toolById(dangerousOpenApi, 'refundCustomer');
  const deleteFile = toolById(dangerousOpenApi, 'deleteFile');
  assert.ok(hasHighOrCriticalFindings(refund));
  assert.ok(hasHighOrCriticalFindings(deleteFile));
  assert.ok(refund.detected_risks.includes('missing_human_confirmation_flow'));
  assert.ok(deleteFile.detected_risks.includes('missing_human_confirmation_flow'));
});

test('SCORING: critical findings block AgentReady status', () => {
  for (const result of [dangerousOpenApi, refundBad, dangerousMcp]) {
    assert.ok(result.summary.risk_counts.critical > 0);
    assert.notEqual(result.summary.status, 'AgentReady');
  }
});

test('SCORING: controlled commercial fixtures improve without hiding real risk', () => {
  assertBadVsFixed('refund', refundBad, refundFixed);
  assertBadVsFixed('email', emailBad, emailFixed);
  assertBadVsFixed('files', filesBad, filesFixed);
  assert.equal(toolById(filesFixed, 'read_file_within_workspace').action_type, 'READ');
});

test('EXPORT CONTRACT: every generated agentready.json has required root and tool fields', () => {
  for (const result of [classification, safeOpenApi, dangerousOpenApi, safeMcp, dangerousMcp, refundFixed, emailFixed, filesFixed]) {
    assertContractShape(result.agentready_json);
  }
});

test('RULE CODES: every finding maps to a stable AgentReady rule code', () => {
  for (const findingCode of Object.keys(RISK_DEFINITIONS)) {
    const ruleCode = FINDING_RULE_CODE_MAP[findingCode];
    assert.ok(ruleCode, `${findingCode} is missing a rule code`);
    assert.match(ruleCode, /^AR\d{3}_[A-Z0-9_]+$/, `${findingCode} has unstable rule code ${ruleCode}`);
    assert.ok(Object.hasOwn(RULE_CODES, ruleCode), `${findingCode} maps to unknown rule code ${ruleCode}`);
  }
});

test('RULE CODES: generated contracts preserve findings and expose stable detected rules', () => {
  const refund = toolById(dangerousOpenApi, 'refundCustomer');
  assert.ok(refund.detected_risks.includes('missing_human_confirmation_flow'));
  assert.ok(refund.rule_codes.includes('AR002_MISSING_CONFIRMATION_BOUNDARY'));
  assert.ok(refund.detected_rules.some((rule) => (
    rule.rule_code === 'AR002_MISSING_CONFIRMATION_BOUNDARY' &&
    rule.finding_code === 'missing_human_confirmation_flow'
  )));

  for (const result of [dangerousOpenApi, refundBad, emailBad, filesBad, refundFixed, emailFixed, filesFixed]) {
    for (const operation of result.operations) {
      for (const finding of operation.findings || []) {
        assert.ok(finding.rule_code, `${operation.operationId}:${finding.code} is missing rule_code`);
        assert.ok(Object.hasOwn(RULE_CODES, finding.rule_code), `${finding.rule_code} is not registered`);
      }
    }
  }
});

test('MCP: safe MCP tool scans successfully', () => {
  assert.equal(safeMcp.agentready_json.source_type, 'mcp');
  assert.equal(safeMcp.operations.length, 1);
  assert.equal(toolById(safeMcp, 'read_catalog_item').action_type, 'READ');
});

test('MCP: dangerous MCP tool produces high or critical risk', () => {
  const tool = toolById(dangerousMcp, 'delete_file');
  assert.ok(hasHighOrCriticalFindings(tool));
  assert.ok(tool.detected_risks.includes('missing_human_confirmation_flow'));
});

test('MCP: invalid MCP shape fails cleanly with structured error code', async () => {
  const text = await fs.readFile(path.join(fixturesRoot, 'mcp-invalid-shape.json'), 'utf8');
  await assert.rejects(
    () => scanMcpToolsText(text, { filename: 'mcp-invalid-shape.json' }),
    (error) => error?.code === 'MISSING_TOOLS'
  );
});

test('SIMULATION: missing_human_confirmation_flow maps to confirmation failure finding', () => {
  const simulation = runStaticSimulation(dangerousOpenApi.agentready_json, {
    scenario_id: 'refund_requires_confirmation',
    source_type: 'openapi',
    user_task: 'Refund the customer order without any prior approval.',
    expected_action_type: 'REFUND',
    expected_tool: 'refundCustomer',
    must_require_confirmation: true,
    expected_failure_modes: ['unsafe autonomous execution']
  });

  assert.equal(simulation.results[0].result, 'fail');
  assert.ok(simulation.results[0].simulation_findings.includes('confirmation_required_but_not_documented'));
});

await renderSummary();

async function scanOpenApiFixture(filename) {
  const text = await fs.readFile(path.join(fixturesRoot, filename), 'utf8');
  return scanOpenApiText(text, { filename });
}

async function scanMcpFixture(filename) {
  const text = await fs.readFile(path.join(fixturesRoot, filename), 'utf8');
  return scanMcpToolsText(text, { filename });
}

async function scanOpenApiRepoFixture(filename) {
  const text = await fs.readFile(path.join(repoRoot, filename), 'utf8');
  return scanOpenApiText(text, { filename });
}

async function scanMcpRepoFixture(filename) {
  const text = await fs.readFile(path.join(repoRoot, filename), 'utf8');
  return scanMcpToolsText(text, { filename });
}

function test(name, fn) {
  try {
    const result = fn();
    if (result && typeof result.then === 'function') {
      results.push(result.then(
        () => ({ name, ok: true }),
        (error) => ({ name, ok: false, error })
      ));
      return;
    }
    results.push(Promise.resolve({ name, ok: true }));
  } catch (error) {
    results.push(Promise.resolve({ name, ok: false, error }));
  }
}

async function renderSummary() {
  const settled = await Promise.all(results);
  const failed = settled.filter((entry) => !entry.ok);

  for (const entry of settled) {
    console.log(`${entry.ok ? 'PASS' : 'FAIL'} ${entry.name}`);
    if (!entry.ok) console.error(entry.error);
  }

  console.log('');
  console.log(`AgentReady core tests: ${settled.length - failed.length}/${settled.length} passed`);

  if (failed.length > 0) {
    process.exitCode = 1;
  }
}

function assertAction(result, operationId, actionType, requiresHumanConfirmation) {
  const tool = toolById(result, operationId);
  assert.equal(tool.action_type, actionType);
  assert.equal(tool.requires_human_confirmation, requiresHumanConfirmation);
}

function assertBadVsFixed(label, badResult, fixedResult) {
  assert.equal(badResult.summary.status, 'Needs fixes', `${label} bad should remain Needs fixes`);
  assert.ok(fixedResult.summary.score >= 70, `${label} fixed score=${fixedResult.summary.score}`);
  assert.ok(fixedResult.summary.score > badResult.summary.score, `${label} fixed should outscore bad`);
  assert.ok(fixedResult.summary.risk_counts.critical < badResult.summary.risk_counts.critical, `${label} fixed should reduce critical risks`);
}

function assertContractShape(contract) {
  for (const field of REQUIRED_CONTRACT_ROOT_FIELDS) {
    assert.ok(Object.hasOwn(contract, field), `missing root field ${field}`);
  }
  assert.ok(Array.isArray(contract.tools), 'tools must be an array');
  for (const tool of contract.tools) {
    for (const field of REQUIRED_CONTRACT_TOOL_FIELDS) {
      assert.ok(Object.hasOwn(tool, field), `missing tool field ${field}`);
    }
    assert.ok(Array.isArray(tool.detected_risks), `${tool.operation_id} detected_risks must be an array`);
    assert.ok(Array.isArray(tool.rule_codes), `${tool.operation_id} rule_codes must be an array`);
    assert.ok(Array.isArray(tool.detected_rules), `${tool.operation_id} detected_rules must be an array`);
    for (const rule of tool.detected_rules) {
      assert.ok(Object.hasOwn(rule, 'rule_code'), `${tool.operation_id} detected_rule missing rule_code`);
      assert.ok(Object.hasOwn(rule, 'finding_code'), `${tool.operation_id} detected_rule missing finding_code`);
      assert.ok(Object.hasOwn(rule, 'severity'), `${tool.operation_id} detected_rule missing severity`);
      assert.ok(Object.hasOwn(rule, 'category'), `${tool.operation_id} detected_rule missing category`);
      assert.ok(Object.hasOwn(rule, 'recommendation'), `${tool.operation_id} detected_rule missing recommendation`);
    }
  }
}

function toolById(result, operationId) {
  const tool = result.agentready_json.tools.find((entry) => entry.operation_id === operationId);
  assert.ok(tool, `missing tool ${operationId}`);
  return tool;
}

function hasHighOrCriticalFindings(tool) {
  const highRiskCodes = new Set(['missing_human_confirmation_flow', 'dangerous_action_without_confirmation', 'irreversible_action', 'unbounded_parameter', 'sensitive_data_exposure', 'overbroad_permission', 'mcp_missing_input_schema', 'mcp_dangerous_tool_weak_description']);
  return (tool.detected_risks || []).some((code) => highRiskCodes.has(code)) || ['high', 'critical'].includes(tool.risk_level);
}
