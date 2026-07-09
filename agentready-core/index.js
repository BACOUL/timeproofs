import { parseOpenApiText } from './parse-openapi.js';
import { extractOperations } from './extract-operations.js';
import { classifyAction } from './classify-action.js';
import { detectRisks } from './detect-risks.js';
import { calculateAgentReadyScore } from './score.js';
import { generateAgentReadyJson } from './generate-agentready-json.js';
import { generateMarkdownReport } from './report.js';
import { HUMAN_CONFIRMATION_ACTIONS, maxRiskLevel } from './types.js';

export async function scanOpenApiText(text, options = {}) {
  const parsed = parseOpenApiText(text, options);
  return scanOpenApiDocument(parsed.document, {
    source: parsed.source
  });
}

export function scanOpenApiDocument(document, options = {}) {
  const source = options.source || {
    type: 'openapi',
    filename: options.filename || 'openapi.json',
    openapi_version: String(document.openapi || '')
  };

  const extractedOperations = extractOperations(document);
  const operations = extractedOperations.map((operation) => {
    const classification = classifyAction(operation);
    const riskResult = detectRisks(operation, classification);
    const findingLevels = riskResult.findings.map((finding) => finding.severity);
    const actionRiskLevel = riskResult.action_risk_level || classification.risk_level;
    const risk_level = maxRiskLevel([actionRiskLevel, ...findingLevels]);
    const requires_human_confirmation =
      HUMAN_CONFIRMATION_ACTIONS.includes(classification.action_type) ||
      riskResult.findings.some((finding) => ['missing_human_confirmation_flow', 'dangerous_action_without_confirmation'].includes(finding.code));

    return {
      ...operation,
      classification,
      findings: riskResult.findings,
      risk_level,
      action_risk_level: actionRiskLevel,
      controlled_risk: riskResult.controlled_risk,
      risk_controls: riskResult.risk_controls,
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

export { parseOpenApiText } from './parse-openapi.js';
export { extractOperations } from './extract-operations.js';
export { parseMcpToolsText } from './parse-mcp-tools.js';
export { extractMcpTools } from './extract-mcp-tools.js';
export { scanMcpToolsText, scanMcpToolsDocument } from './scan-mcp-tools.js';
export { classifyAction } from './classify-action.js';
export { detectRisks } from './detect-risks.js';
export { calculateAgentReadyScore } from './score.js';
export { generateAgentReadyJson } from './generate-agentready-json.js';
export { generateMarkdownReport } from './report.js';
export {
  parseSimulationScenarioText,
  parseSimulationScenarioDocument,
  AgentReadySimulationScenarioError
} from './simulation/parse-simulation-scenario.js';
export { runStaticSimulation, AgentReadyStaticSimulationError } from './simulation/run-static-simulation.js';
export { SIMULATION_VERSION, SIMULATION_STATUSES } from './simulation/simulation-result.js';
