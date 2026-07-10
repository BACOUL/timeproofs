import { AGENTREADY_VERSION, HUMAN_CONFIRMATION_ACTIONS } from './types.js';

export function generateAgentReadyJson(scanResult) {
  const summary = scanResult.summary || {};
  const riskCounts = normalizeRiskCounts(summary.risk_counts || {});
  const sourceName = getSourceName(scanResult.source);

  return {
    agentready_version: AGENTREADY_VERSION,
    source_type: scanResult.source?.type || 'openapi',
    source_name: sourceName,
    generated_at: new Date().toISOString(),
    score: summary.score,
    status: summary.status,
    risk_counts: riskCounts,
    source: scanResult.source,
    summary: {
      score: summary.score,
      status: summary.status,
      score_interpretation: getScoreInterpretation(summary.score),
      total_operations: scanResult.operations.length,
      critical_risks: riskCounts.critical,
      high_risks: riskCounts.high,
      medium_risks: riskCounts.medium,
      low_risks: riskCounts.low
    },
    tools: scanResult.operations.map(toAgentReadyTool)
  };
}

function toAgentReadyTool(operation) {
  const findingCodes = (operation.findings || []).map((finding) => finding.code);
  const ruleCodes = unique((operation.findings || []).map((finding) => finding.rule_code).filter(Boolean));
  const requiresHumanConfirmation = requiresConfirmation(operation, findingCodes);
  const agentRecommendation = buildAgentRecommendation(operation, findingCodes, requiresHumanConfirmation);
  const recommendations = buildRecommendations(operation.findings || [], agentRecommendation);

  return {
    id: operation.operationId,
    name: operation.operationId,
    operation_id: operation.operationId,
    path: operation.path,
    method: operation.method,
    action_type: operation.classification.action_type,
    severity: operation.risk_level,
    risk_level: operation.risk_level,
    controlled_risk: Boolean(operation.controlled_risk),
    risk_controls: operation.risk_controls || {},
    requires_human_confirmation: requiresHumanConfirmation,
    allowed_when: buildAllowedWhen(operation),
    forbidden_when: buildForbiddenWhen(operation, findingCodes),
    failure_modes: buildFailureModes(operation, findingCodes),
    detected_risks: findingCodes,
    rule_codes: ruleCodes,
    detected_rules: (operation.findings || []).map(toDetectedRule),
    recommendations,
    agent_recommendation: agentRecommendation
  };
}

function toDetectedRule(finding) {
  return {
    rule_code: finding.rule_code,
    finding_code: finding.code,
    severity: finding.severity,
    category: finding.category,
    recommendation: finding.recommendation
  };
}

function requiresConfirmation(operation, findingCodes) {
  return (
    HUMAN_CONFIRMATION_ACTIONS.includes(operation.classification.action_type) ||
    findingCodes.includes('missing_human_confirmation_flow') ||
    findingCodes.includes('dangerous_action_without_confirmation') ||
    findingCodes.includes('irreversible_action')
  );
}

function buildAllowedWhen(operation) {
  const action = operation.classification.action_type;

  if (['READ', 'SEARCH', 'LIST'].includes(action)) {
    return ['the agent has a clear user request for this data', 'the requested data is within the user authorization scope'];
  }

  if (action === 'HEALTH_CHECK') {
    return ['the agent or monitoring workflow needs to verify basic API availability'];
  }

  if (action === 'WEBHOOK') {
    return ['the endpoint is used by the external event provider, not called autonomously by the agent'];
  }

  if (['CREATE', 'UPDATE'].includes(action)) {
    return ['the target resource is clearly identified', 'all required parameters are validated'];
  }

  if (['DELETE', 'CANCEL'].includes(action)) {
    return ['the target resource is clearly identified', 'the user has explicitly requested this action', 'human confirmation has been collected'];
  }

  if (['PAY', 'REFUND', 'TRANSFER'].includes(action)) {
    return ['customer identity is verified', 'amount and target are validated', 'human confirmation has been collected'];
  }

  if (['SEND', 'PUBLISH', 'EXPORT'].includes(action)) {
    return ['content and recipient or destination are validated', 'human confirmation has been collected if external exposure is possible'];
  }

  return ['the agent has enough validated context to use this tool safely'];
}

function buildForbiddenWhen(operation, findingCodes) {
  const forbidden = [];
  const action = operation.classification.action_type;

  if (action === 'WEBHOOK') {
    forbidden.push('an autonomous agent attempts to call this inbound provider endpoint as a normal tool');
  }

  if (findingCodes.includes('missing_human_confirmation_flow') || findingCodes.includes('dangerous_action_without_confirmation')) {
    forbidden.push('the required confirmation flow is missing or unclear');
  }

  if (findingCodes.includes('unbounded_parameter')) {
    forbidden.push('numeric limits such as amount, quantity, price, discount or duration are not bounded');
  }

  if (findingCodes.includes('missing_enum')) {
    forbidden.push('closed-set parameters such as status, type, category, role, language or currency are ambiguous');
  }

  if (findingCodes.includes('sensitive_data_exposure')) {
    forbidden.push('permission boundaries for sensitive data are unclear');
  }

  if (findingCodes.includes('unknown_action_type')) {
    forbidden.push('the intended action type is unclear');
  }

  if (forbidden.length === 0) {
    forbidden.push('required parameters or authorization context are missing');
  }

  return forbidden;
}

function buildFailureModes(operation, findingCodes) {
  const modes = [];
  const action = operation.classification.action_type;

  if (action === 'WEBHOOK') {
    modes.push('inbound provider endpoint exposed as an agent-callable tool');
  }

  if (findingCodes.includes('unclear_operation_name') || findingCodes.includes('ambiguous_tool_description')) {
    modes.push('wrong tool selection');
  }

  if (findingCodes.includes('unbounded_parameter') || findingCodes.includes('missing_enum')) {
    modes.push('wrong or unsafe parameter value');
  }

  if (findingCodes.includes('missing_human_confirmation_flow') || findingCodes.includes('dangerous_action_without_confirmation') || findingCodes.includes('irreversible_action')) {
    modes.push('unsafe autonomous execution');
  }

  if (findingCodes.includes('non_corrective_error') || findingCodes.includes('missing_error_recovery')) {
    modes.push('agent cannot recover from error');
  }

  if (findingCodes.includes('sensitive_data_exposure') || findingCodes.includes('overbroad_permission')) {
    modes.push('sensitive data exposure');
  }

  if (findingCodes.includes('missing_success_verification')) {
    modes.push('agent cannot verify action success');
  }

  return modes.length > 0 ? modes : ['no major failure mode detected by V1 static analysis'];
}

function buildAgentRecommendation(operation, findingCodes, requiresHumanConfirmation) {
  const action = operation.classification.action_type;

  if (action === 'WEBHOOK') {
    return 'Do not expose this inbound webhook as an autonomous agent-callable tool. Validate provider signatures and idempotency server-side.';
  }

  if (operation.risk_level === 'critical') {
    return 'Do not allow autonomous execution before fixing critical risks.';
  }

  if (findingCodes.includes('missing_human_confirmation_flow')) {
    return 'Document the confirmation flow before allowing this action through agents.';
  }

  if (requiresHumanConfirmation) {
    return 'Require human confirmation before execution.';
  }

  if (operation.risk_level === 'high') {
    return 'Allow only with strict parameter validation and permission boundaries.';
  }

  if (findingCodes.length > 0) {
    return 'Allow only after reviewing and applying the recommended fixes.';
  }

  return 'Allow autonomous execution under normal authorization and validation controls.';
}

function getScoreInterpretation(score) {
  if (score >= 85) return 'Structurally ready for agent use under normal authorization and validation controls.';
  if (score >= 70) return 'Close to AgentReady, but minor fixes should be completed before broad agent exposure.';
  if (score >= 50) return 'Needs fixes before being exposed to autonomous or semi-autonomous agents.';
  return 'Not AgentReady. Do not expose to autonomous agents before structural fixes are applied.';
}

function normalizeRiskCounts(riskCounts) {
  return {
    critical: riskCounts.critical || 0,
    high: riskCounts.high || 0,
    medium: riskCounts.medium || 0,
    low: riskCounts.low || 0
  };
}

function getSourceName(source = {}) {
  return source.filename || source.server_name || source.name || 'unknown';
}

function buildRecommendations(findings, agentRecommendation) {
  return unique([
    agentRecommendation,
    ...findings.map((finding) => finding.recommendation).filter(Boolean)
  ]);
}

function unique(values) {
  return [...new Set(values)];
}
