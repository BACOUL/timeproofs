import { parseMcpToolsText } from './parse-mcp-tools.js';
import { extractMcpTools } from './extract-mcp-tools.js';
import { classifyAction } from './classify-action.js';
import { detectRisks } from './detect-risks.js';
import { calculateAgentReadyScore } from './score.js';
import { generateAgentReadyJson } from './generate-agentready-json.js';
import { generateMarkdownReport } from './report.js';
import { HUMAN_CONFIRMATION_ACTIONS, maxRiskLevel } from './types.js';

export async function scanMcpToolsText(text, options = {}) {
  const parsed = parseMcpToolsText(text, options);
  return scanMcpToolsDocument(parsed.document, {
    source: parsed.source
  });
}

export function scanMcpToolsDocument(document, options = {}) {
  const source = options.source || {
    type: 'mcp',
    filename: options.filename || 'mcp-tools.json',
    mcp_version: String(document.mcp_version || ''),
    server_name: String(document.server?.name || '')
  };

  const extractedTools = extractMcpTools(document);
  const operations = extractedTools.map((operation) => {
    const classification = classifyAction(operation);
    const riskResult = detectRisks(operation, classification);
    const findingLevels = riskResult.findings.map((finding) => finding.severity);
    const risk_level = maxRiskLevel([classification.risk_level, ...findingLevels]);
    const requires_human_confirmation =
      HUMAN_CONFIRMATION_ACTIONS.includes(classification.action_type) ||
      riskResult.findings.some((finding) => ['missing_human_confirmation_flow', 'dangerous_action_without_confirmation'].includes(finding.code));

    return {
      ...operation,
      classification,
      findings: riskResult.findings,
      risk_level,
      requires_human_confirmation
    };
  });

  const summary = calculateAgentReadyScore(operations);

  const result = {
    source,
    summary,
    operations
  };

  return {
    ...result,
    agentready_json: generateAgentReadyJson(result),
    markdown_report: generateMarkdownReport(result)
  };
}
