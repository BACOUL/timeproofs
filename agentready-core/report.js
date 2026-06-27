export function generateMarkdownReport(scanResult) {
  const summary = scanResult.summary;
  const topFindings = getTopFindings(scanResult.operations);

  return [
    '# TimeProofs AgentReady Report',
    '',
    '## Executive Summary',
    '',
    `Source: ${scanResult.source?.filename || 'OpenAPI document'}`,
    `OpenAPI version: ${scanResult.source?.openapi_version || 'unknown'}`,
    `Total operations: ${scanResult.operations.length}`,
    `Score: ${summary.score}/100`,
    `Status: ${summary.status}`,
    '',
    buildConclusion(summary),
    '',
    '## Top Risks',
    '',
    ...renderTopFindings(topFindings),
    '',
    '## Recommended Fixes',
    '',
    ...renderRecommendedFixes(topFindings),
    '',
    '## Endpoint Details',
    '',
    ...scanResult.operations.flatMap(renderOperation),
    '',
    '## Generated AgentReady Contract',
    '',
    'A machine-readable `agentready.json` contract can be generated from this scan result.',
    '',
    '## Limitations',
    '',
    'TimeProofs AgentReady does not guarantee that an AI agent will never fail.',
    'It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.',
    ''
  ].join('\n');
}

function buildConclusion(summary) {
  if (summary.score >= 85) {
    return 'Conclusion: This API appears structurally ready for AI-agent use under normal authorization and validation controls.';
  }

  if (summary.score >= 70) {
    return 'Conclusion: This API is close to AgentReady but should receive minor fixes before broad agent exposure.';
  }

  if (summary.score >= 50) {
    return 'Conclusion: This API can be used by AI agents only after fixing high-risk actions, ambiguous descriptions, and unsafe parameters.';
  }

  return 'Conclusion: This API is not AgentReady. It should not be exposed to autonomous agents before structural fixes are applied.';
}

function getTopFindings(operations) {
  const severityRank = { critical: 4, high: 3, medium: 2, low: 1 };
  return operations
    .flatMap((operation) => operation.findings || [])
    .sort((a, b) => (severityRank[b.severity] || 0) - (severityRank[a.severity] || 0))
    .slice(0, 5);
}

function renderTopFindings(findings) {
  if (findings.length === 0) return ['No major AgentReady risks detected by V1a static analysis.'];

  return findings.map((finding, index) => {
    return `${index + 1}. **${finding.severity.toUpperCase()}** — ${finding.code} on ${finding.method} ${finding.path}: ${finding.explanation}`;
  });
}

function renderRecommendedFixes(findings) {
  if (findings.length === 0) return ['No immediate fixes required by V1a static analysis.'];

  const seen = new Set();
  return findings
    .map((finding) => finding.recommendation)
    .filter((recommendation) => {
      if (seen.has(recommendation)) return false;
      seen.add(recommendation);
      return true;
    })
    .map((recommendation, index) => `${index + 1}. ${recommendation}`);
}

function renderOperation(operation) {
  const findings = operation.findings || [];

  return [
    `### ${operation.method} ${operation.path}`,
    '',
    `Operation ID: ${operation.operationId}`,
    `Action type: ${operation.classification.action_type}`,
    `Risk level: ${operation.risk_level}`,
    `Requires human confirmation: ${operation.requires_human_confirmation ? 'yes' : 'no'}`,
    '',
    findings.length ? 'Detected risks:' : 'Detected risks: none',
    ...findings.map((finding) => `- ${finding.code}: ${finding.recommendation}`),
    ''
  ];
}
