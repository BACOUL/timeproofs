export function generateMarkdownReport(scanResult) {
  const summary = scanResult.summary;
  const sourceType = scanResult.source?.type || 'openapi';
  const isMcp = sourceType === 'mcp';
  const topFindings = getTopFindings(scanResult.operations);

  return [
    isMcp ? '# TimeProofs AgentReady MCP Report' : '# TimeProofs AgentReady Report',
    '',
    '## Executive Summary',
    '',
    ...renderSourceSummary(scanResult, isMcp),
    `Score: ${summary.score}/100`,
    `Status: ${summary.status}`,
    '',
    buildConclusion(summary, isMcp),
    '',
    ...(isMcp ? renderMcpExecutiveSummary(scanResult) : []),
    '## Top Risks',
    '',
    ...renderTopFindings(topFindings, isMcp),
    '',
    '## Recommended Fixes',
    '',
    ...renderRecommendedFixes(topFindings),
    '',
    isMcp ? '## Tool Details' : '## Endpoint Details',
    '',
    ...scanResult.operations.flatMap((operation) => renderOperation(operation, isMcp)),
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

function renderSourceSummary(scanResult, isMcp) {
  if (isMcp) {
    return [
      `Source type: MCP tools JSON`,
      `Source file: ${scanResult.source?.filename || 'mcp-tools.json'}`,
      `MCP server: ${scanResult.source?.server_name || 'unknown'}`,
      `MCP version: ${scanResult.source?.mcp_version || 'unknown'}`,
      `Total tools: ${scanResult.operations.length}`
    ];
  }

  return [
    `Source: ${scanResult.source?.filename || 'OpenAPI document'}`,
    `OpenAPI version: ${scanResult.source?.openapi_version || 'unknown'}`,
    `Total operations: ${scanResult.operations.length}`
  ];
}

function renderMcpExecutiveSummary(scanResult) {
  const operations = scanResult.operations || [];
  const confirmationCount = operations.filter((operation) => operation.requires_human_confirmation).length;
  const missingInputSchemaCount = operations.filter((operation) => operation.mcp?.has_input_schema === false).length;
  const missingOutputSchemaCount = operations.filter((operation) => operation.mcp?.has_output_schema === false).length;
  const highestRisk = getHighestRiskLevel(operations);

  return [
    '## MCP Executive Summary',
    '',
    `- Highest MCP tool risk level: ${highestRisk}`,
    `- Tools requiring human confirmation: ${confirmationCount}`,
    `- Tools missing inputSchema: ${missingInputSchemaCount}`,
    `- Tools missing outputSchema: ${missingOutputSchemaCount}`,
    '',
    'This is a static readiness scan. It does not connect to a live MCP server and does not execute any tool.',
    ''
  ];
}

function buildConclusion(summary, isMcp = false) {
  const target = isMcp ? 'MCP tools' : 'API';
  const exposure = isMcp ? 'before agent exposure through MCP' : 'before broad agent exposure';

  if (summary.score >= 85) {
    return `Conclusion: These ${target} appear structurally ready for AI-agent use under normal authorization and validation controls.`;
  }

  if (summary.score >= 70) {
    return `Conclusion: These ${target} are close to AgentReady but should receive minor fixes ${exposure}.`;
  }

  if (summary.score >= 50) {
    return `Conclusion: These ${target} can be used by AI agents only after fixing high-risk actions, ambiguous descriptions, and unsafe parameters.`;
  }

  return `Conclusion: These ${target} are not AgentReady. They should not be exposed to autonomous agents before structural fixes are applied.`;
}

function getTopFindings(operations) {
  const severityRank = { critical: 4, high: 3, medium: 2, low: 1 };
  return operations
    .flatMap((operation) => operation.findings || [])
    .sort((a, b) => (severityRank[b.severity] || 0) - (severityRank[a.severity] || 0))
    .slice(0, 5);
}

function renderTopFindings(findings, isMcp = false) {
  if (findings.length === 0) return [isMcp ? 'No major MCP AgentReady risks detected by V1 static analysis.' : 'No major AgentReady risks detected by V1 static analysis.'];

  return findings.map((finding, index) => {
    const label = isMcp ? 'tool' : 'operation';
    return `${index + 1}. **${finding.severity.toUpperCase()}** — ${finding.code} on ${finding.method} ${finding.path}: ${finding.explanation} Fix the ${label} contract before exposing it to agents.`;
  });
}

function renderRecommendedFixes(findings) {
  if (findings.length === 0) return ['No immediate fixes required by V1 static analysis.'];

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

function renderOperation(operation, isMcp = false) {
  const findings = operation.findings || [];

  if (isMcp) return renderMcpTool(operation, findings);

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

function renderMcpTool(operation, findings) {
  const required = operation.mcp?.input_required || [];

  return [
    `### ${operation.operationId}`,
    '',
    `Tool path: ${operation.path}`,
    `Server: ${operation.mcp?.server_name || 'unknown'}`,
    `Action type: ${operation.classification.action_type}`,
    `Risk level: ${operation.risk_level}`,
    `Requires human confirmation: ${operation.requires_human_confirmation ? 'yes' : 'no'}`,
    `Input schema: ${operation.mcp?.has_input_schema ? 'present' : 'missing'}`,
    `Input properties: ${operation.mcp?.input_properties_count ?? 0}`,
    `Required fields: ${required.length ? required.join(', ') : 'none declared'}`,
    `Output schema: ${operation.mcp?.has_output_schema ? `present (${operation.mcp?.output_type || 'object'})` : 'missing'}`,
    '',
    findings.length ? 'Detected MCP risks:' : 'Detected MCP risks: none',
    ...findings.map((finding) => `- ${finding.code}: ${finding.recommendation}`),
    ''
  ];
}

function getHighestRiskLevel(operations) {
  const severityRank = { critical: 4, high: 3, medium: 2, low: 1 };
  return operations.reduce((highest, operation) => {
    return (severityRank[operation.risk_level] || 0) > (severityRank[highest] || 0) ? operation.risk_level : highest;
  }, 'low');
}
