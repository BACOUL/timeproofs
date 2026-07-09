import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { scanMcpToolsText, scanOpenApiText } from './index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

const FIXTURES = {
  refundBad: {
    kind: 'openapi',
    file: 'agentready-examples/commercial/openapi-refund-risk.bad.json'
  },
  refundFixed: {
    kind: 'openapi',
    file: 'agentready-examples/commercial/openapi-refund-risk.fixed.json'
  },
  emailBad: {
    kind: 'mcp',
    file: 'agentready-examples/commercial/mcp-email-risk.bad.json'
  },
  emailFixed: {
    kind: 'mcp',
    file: 'agentready-examples/commercial/mcp-email-risk.fixed.json'
  },
  filesBad: {
    kind: 'mcp',
    file: 'agentready-examples/commercial/mcp-files-risk.bad.json'
  },
  filesFixed: {
    kind: 'mcp',
    file: 'agentready-examples/commercial/mcp-files-risk.fixed.json'
  }
};

const results = {};

for (const [key, fixture] of Object.entries(FIXTURES)) {
  const text = await fs.readFile(path.join(repoRoot, fixture.file), 'utf8');
  results[key] = fixture.kind === 'openapi'
    ? await scanOpenApiText(text, { filename: fixture.file })
    : await scanMcpToolsText(text, { filename: fixture.file });
}

assertBadVsFixed('refund', results.refundBad, results.refundFixed, 10);
assertBadVsFixed('email', results.emailBad, results.emailFixed, 10);
assertBadVsFixed('files', results.filesBad, results.filesFixed, 10);

const readFileTool = results.filesFixed.operations.find((operation) => operation.operationId === 'read_file_within_workspace');
assert.ok(readFileTool, 'files fixed should include read_file_within_workspace');
assert.equal(readFileTool.classification.action_type, 'READ');
assert.notEqual(readFileTool.classification.action_type, 'EXPORT');

const controlledDangerousOperations = [
  results.refundFixed.operations[0],
  results.emailFixed.operations[0],
  results.filesFixed.operations.find((operation) => operation.operationId === 'delete_file_after_confirmation')
];

for (const operation of controlledDangerousOperations) {
  assert.ok(operation, 'expected controlled dangerous operation');
  assert.equal(operation.controlled_risk, true, `${operation.operationId} should be marked as controlled risk`);
  assert.notEqual(operation.risk_level, 'critical', `${operation.operationId} should not remain critical when controlled`);
}

console.table(
  Object.entries(results).map(([fixture, result]) => ({
    fixture,
    score: result.summary.score,
    status: result.summary.status,
    findings: result.summary.total_findings,
    critical: result.summary.risk_counts.critical,
    high: result.summary.risk_counts.high
  }))
);

function assertBadVsFixed(label, badResult, fixedResult, minimumScoreDelta) {
  const badCodes = getFindingCodes(badResult);
  const fixedCodes = getFindingCodes(fixedResult);

  assert.equal(badResult.summary.status, 'Needs fixes', `${label} bad should remain Needs fixes`);
  assert.ok(fixedResult.summary.score >= 70, `${label} fixed should score at least Minor fixes`);
  assert.ok(
    fixedResult.summary.score - badResult.summary.score >= minimumScoreDelta,
    `${label} fixed should score clearly above bad`
  );
  assert.ok(
    badCodes.includes('dangerous_action_without_confirmation'),
    `${label} bad should contain uncontrolled dangerous action risk`
  );
  assert.ok(
    !fixedCodes.includes('dangerous_action_without_confirmation'),
    `${label} fixed should not be treated as uncontrolled when confirmation controls are present`
  );
  assert.ok(
    fixedResult.summary.risk_counts.critical < badResult.summary.risk_counts.critical,
    `${label} fixed should have fewer critical risks`
  );
}

function getFindingCodes(result) {
  return result.operations.flatMap((operation) => operation.findings || []).map((finding) => finding.code);
}
