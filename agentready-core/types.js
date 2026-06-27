export const AGENTREADY_VERSION = '1.0';

export const SUPPORTED_SOURCE_TYPES = Object.freeze({
  OPENAPI: 'openapi'
});

export const ACTION_TYPES = Object.freeze([
  'READ',
  'SEARCH',
  'LIST',
  'CREATE',
  'UPDATE',
  'DELETE',
  'SEND',
  'PUBLISH',
  'PAY',
  'REFUND',
  'TRANSFER',
  'EXPORT',
  'IMPORT',
  'AUTH',
  'INVITE',
  'SCHEDULE',
  'CANCEL',
  'SENSITIVE_DATA',
  'UNKNOWN'
]);

export const RISK_LEVELS = Object.freeze(['low', 'medium', 'high', 'critical']);

export const ACTION_RISK_LEVEL = Object.freeze({
  READ: 'low',
  SEARCH: 'low',
  LIST: 'low',
  CREATE: 'medium',
  UPDATE: 'medium',
  DELETE: 'high',
  SEND: 'high',
  PUBLISH: 'high',
  PAY: 'critical',
  REFUND: 'critical',
  TRANSFER: 'critical',
  EXPORT: 'high',
  IMPORT: 'medium',
  AUTH: 'high',
  INVITE: 'medium',
  SCHEDULE: 'medium',
  CANCEL: 'high',
  SENSITIVE_DATA: 'high',
  UNKNOWN: 'medium'
});

export const HUMAN_CONFIRMATION_ACTIONS = Object.freeze([
  'DELETE',
  'SEND',
  'PUBLISH',
  'PAY',
  'REFUND',
  'TRANSFER',
  'EXPORT',
  'CANCEL',
  'SENSITIVE_DATA'
]);

export const SCORE_WEIGHTS = Object.freeze({
  clear_names: 10,
  agent_descriptions: 15,
  usage_boundaries: 15,
  strict_parameters: 15,
  corrective_errors: 10,
  dangerous_actions: 15,
  sensitive_permissions: 10,
  agent_readable_responses: 5,
  version_traceability: 5
});

export const SCORE_STATUSES = Object.freeze([
  { min: 85, status: 'AgentReady' },
  { min: 70, status: 'Minor fixes' },
  { min: 50, status: 'Needs fixes' },
  { min: 0, status: 'Not AgentReady' }
]);

export const RISK_DEFINITIONS = Object.freeze({
  unclear_operation_name: {
    severity: 'medium',
    category: 'clear_names',
    explanation: 'The operation name is too vague for an AI agent to choose the tool confidently.',
    recommendation: 'Use a stable and specific operationId that describes the business action.'
  },
  ambiguous_tool_description: {
    severity: 'medium',
    category: 'agent_descriptions',
    explanation: 'The operation description is missing, too short, or too generic for agentic use.',
    recommendation: 'Add a description that explains the purpose, business context, and expected outcome.'
  },
  missing_when_to_use: {
    severity: 'medium',
    category: 'usage_boundaries',
    explanation: 'The operation does not state when an agent should use it.',
    recommendation: 'Add explicit “Use this when…” guidance in the operation description.'
  },
  missing_when_not_to_use: {
    severity: 'medium',
    category: 'usage_boundaries',
    explanation: 'The operation does not state limits or forbidden usage conditions.',
    recommendation: 'Add explicit “Do not use this when…” guidance or forbidden conditions.'
  },
  unbounded_parameter: {
    severity: 'high',
    category: 'strict_parameters',
    explanation: 'A sensitive numeric parameter has no minimum, maximum, or clear bound.',
    recommendation: 'Add minimum and maximum values for amount, quantity, limit, price, discount, or duration fields.'
  },
  missing_enum: {
    severity: 'medium',
    category: 'strict_parameters',
    explanation: 'A parameter appears to represent a closed set but is defined as a free string.',
    recommendation: 'Add an enum for status, type, category, role, currency, language, or country fields.'
  },
  dangerous_action_without_confirmation: {
    severity: 'critical',
    category: 'dangerous_actions',
    explanation: 'A dangerous action can be executed without explicit human confirmation guidance.',
    recommendation: 'Require human confirmation before autonomous execution.'
  },
  irreversible_action: {
    severity: 'high',
    category: 'dangerous_actions',
    explanation: 'The operation may produce an irreversible or hard-to-reverse effect.',
    recommendation: 'Add preview, confirmation, limits, and post-action verification.'
  },
  non_corrective_error: {
    severity: 'medium',
    category: 'corrective_errors',
    explanation: 'Error responses do not help an AI agent correct its call.',
    recommendation: 'Document 400/401/403/404/409/422 errors with corrective guidance.'
  },
  sensitive_data_exposure: {
    severity: 'high',
    category: 'sensitive_permissions',
    explanation: 'The operation may expose sensitive, personal, financial, authentication, or customer data.',
    recommendation: 'Document permission boundaries, redaction, pagination, and least-privilege access.'
  },
  overbroad_permission: {
    severity: 'high',
    category: 'sensitive_permissions',
    explanation: 'The security model appears absent or too broad for agentic execution.',
    recommendation: 'Define narrow scopes or permissions for this operation.'
  },
  large_unstructured_response: {
    severity: 'medium',
    category: 'agent_readable_responses',
    explanation: 'The response may be too large or too unstructured for reliable agent use.',
    recommendation: 'Add structured response schemas, pagination, limits, and clear field descriptions.'
  },
  missing_success_verification: {
    severity: 'medium',
    category: 'dangerous_actions',
    explanation: 'The operation changes state but does not provide a clear way to verify success.',
    recommendation: 'Return a clear success object or document a verification endpoint.'
  },
  missing_error_recovery: {
    severity: 'medium',
    category: 'corrective_errors',
    explanation: 'The operation does not explain how an agent can recover after failure.',
    recommendation: 'Add recovery guidance, retry rules, and conflict-resolution behavior.'
  },
  agent_context_confusion: {
    severity: 'medium',
    category: 'agent_descriptions',
    explanation: 'The operation appears to depend on implicit context such as current user, tenant, account, or environment.',
    recommendation: 'Make required context explicit in parameters and descriptions.'
  },
  unknown_action_type: {
    severity: 'medium',
    category: 'clear_names',
    explanation: 'The action type cannot be determined confidently.',
    recommendation: 'Rename the operation and improve its summary/description.'
  }
});

export function getStatusForScore(score) {
  const normalized = Number.isFinite(score) ? Math.max(0, Math.min(100, Math.round(score))) : 0;
  return SCORE_STATUSES.find((entry) => normalized >= entry.min)?.status || 'Not AgentReady';
}

export function maxRiskLevel(levels) {
  const order = { low: 1, medium: 2, high: 3, critical: 4 };
  let max = 'low';
  for (const level of levels || []) {
    if ((order[level] || 0) > order[max]) max = level;
  }
  return max;
}
