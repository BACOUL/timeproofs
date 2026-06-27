import { AGENTREADY_VERSION, HUMAN_CONFIRMATION_ACTIONS } from './types.js';

export function generateAgentReadyJson(scanResult) {
  const summary = scanResult.summary || {};

  return {
    agentready_version: AGENTREADY_VERSION,
    generated_at: new Date().toISOString(),
    source_type: scanResult.source?.type || 'openapi',
    source: scanResult.source,
    summary: {
      score: summary.score,
      status: summary.status,
      score_interpretation: getScoreInterpretation(summary.score),
      total_operations: scanResult.operations.length,
      critical_risks: summary.risk_counts?.critical || 0,
      high_risks: summary.risk_counts?.high || 0,
      medium_risks: summary.risk_counts?.medium || 0,
      low_risks: summary.risk_counts?.low || 0
    },
    tools: scanResult.operations.map(toAgentReadyTool)
  };
}

function toAgentReadyTool(operation) {
  const findingCodes = (operation.findings || []).map((finding) => finding.code);
  const requiresHumanConfirmation = requiresConfirmation(operation, findingCodes);

  return {
    operation_id: operation.operationId,
    path: operation.path,
    method: operation.method,
    action_type: operation.classification.action_type,
    risk_level: operation.risk_level,
    requires_human_confirmation: requiresHumanConfirmation,
    allowed_when: buildAllowedWhen(operation),
    forbidden_when: buildForbiddenWhen(operation, findingCodes),
    failure_modes: buildFailureModes(operation, findingCodes),
    detected_risks: findingCodes,
    agent_recommendation: buildAgentRecommendation(operation, findingCodes, requiresHumanConfirmation)
  };
}

function requiresConfirmation(operation, findingCodes) {
  return (
    HUMAN_CONFIRMATION_ACTIONS.includes(operation.classification.action_type) ||
    findingCodes.includes('dangerous_action_without_confirmation') ||
    findingCodes.includes('irreversible_action')
  );
}

function buildAllowedWhen(operation) {
  const action = operation.classification.action_type;

  if (['READ', 'SEARCH', 'LIST'].includes(action)) {
    return ['the agent has a clear user request for this data', 'the requested data is within the user authorization scope'];
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

  if (findingCodes.includes('dangerous_action_without_confirmation')) {
    forbidden.push('human confirmation is missing');
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

  if (findingCodes.includes('unclear_operation_name') || findingCodes.includes('ambiguous_tool_description')) {
    modes.push('wrong tool selection');
  }

  if (findingCodes.includes('unbounded_parameter') || findingCodes.includes('missing_enum')) {
    modes.push('wrong or unsafe parameter value');
  }

  if (findingCodes.includes('dangerous_action_without_confirmation') || findingCodes.includes('irreversible_action')) {
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
  if (operation.risk_level === 'critical') {
    return 'Do not allow autonomous execution before fixing critical risks.';
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
