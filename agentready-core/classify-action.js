import { ACTION_RISK_LEVEL } from './types.js';

const KEYWORD_RULES = Object.freeze([
  { action_type: 'REFUND', keywords: ['refund', 'reimburse', 'repay'] },
  { action_type: 'TRANSFER', keywords: ['transfer', 'wire', 'payout'] },
  { action_type: 'PAY', keywords: ['pay', 'payment', 'charge', 'checkout', 'invoice', 'billing'] },
  { action_type: 'DELETE', keywords: ['delete', 'remove', 'erase', 'destroy', 'purge'] },
  { action_type: 'CANCEL', keywords: ['cancel', 'terminate', 'disable', 'deactivate', 'revoke'] },
  { action_type: 'SEND', keywords: ['send', 'email', 'message', 'notify', 'sms'] },
  { action_type: 'PUBLISH', keywords: ['publish', 'post', 'share', 'release', 'deploy'] },
  { action_type: 'EXPORT', keywords: ['export', 'download', 'dump', 'extract'] },
  { action_type: 'IMPORT', keywords: ['import', 'upload', 'ingest'] },
  { action_type: 'AUTH', keywords: ['auth', 'token', 'secret', 'api key', 'apikey', 'login', 'permission', 'role', 'scope'] },
  { action_type: 'INVITE', keywords: ['invite', 'member', 'user invite'] },
  { action_type: 'SCHEDULE', keywords: ['schedule', 'calendar', 'meeting', 'appointment', 'book'] },
  { action_type: 'SEARCH', keywords: ['search', 'find', 'lookup', 'query'] },
  { action_type: 'LIST', keywords: ['list', 'all', 'collection'] },
  { action_type: 'CREATE', keywords: ['create', 'add', 'new'] },
  { action_type: 'UPDATE', keywords: ['update', 'edit', 'modify', 'patch', 'set'] },
  { action_type: 'READ', keywords: ['get', 'read', 'fetch', 'retrieve'] }
]);

const SENSITIVE_KEYWORDS = Object.freeze([
  'customer',
  'user',
  'email',
  'phone',
  'address',
  'password',
  'token',
  'secret',
  'api_key',
  'apikey',
  'payment',
  'iban',
  'card',
  'ssn',
  'health',
  'personal',
  'private'
]);

export function classifyAction(operation) {
  const haystack = buildHaystack(operation);
  const signals = [];

  for (const rule of KEYWORD_RULES) {
    const matched = rule.keywords.filter((keyword) => haystack.includes(keyword));
    if (matched.length > 0) {
      signals.push(...matched.map((keyword) => `keyword:${keyword}`));
      return withRisk(rule.action_type, signals, haystack);
    }
  }

  const byMethod = classifyByMethod(operation.method, operation.path);
  if (byMethod !== 'UNKNOWN') {
    signals.push(`method:${operation.method}`);
    return withRisk(byMethod, signals, haystack);
  }

  return withRisk('UNKNOWN', ['fallback:unknown'], haystack);
}

export function containsSensitiveTerms(operation) {
  const haystack = buildHaystack(operation);
  return SENSITIVE_KEYWORDS.some((keyword) => haystack.includes(keyword));
}

function withRisk(action_type, signals, haystack) {
  const sensitive = SENSITIVE_KEYWORDS.some((keyword) => haystack.includes(keyword));
  let risk_level = ACTION_RISK_LEVEL[action_type] || 'medium';

  if (sensitive && ['READ', 'SEARCH', 'LIST'].includes(action_type)) {
    risk_level = 'high';
    signals.push('sensitive-data-keyword');
  }

  return { action_type, risk_level, signals };
}

function classifyByMethod(method, path = '') {
  const normalizedPath = String(path).toLowerCase();

  if (method === 'GET') {
    if (normalizedPath.includes('search') || normalizedPath.includes('query')) return 'SEARCH';
    if (/\{[^}]+\}/.test(normalizedPath)) return 'READ';
    return 'LIST';
  }

  if (method === 'POST') return 'CREATE';
  if (method === 'PUT' || method === 'PATCH') return 'UPDATE';
  if (method === 'DELETE') return 'DELETE';

  return 'UNKNOWN';
}

function buildHaystack(operation) {
  return [
    operation.method,
    operation.path,
    operation.operationId,
    operation.summary,
    operation.description,
    ...(operation.tags || []),
    ...(operation.parameters || []).map((field) => `${field.name} ${field.description}`),
    ...(operation.requestFields || []).map((field) => `${field.name} ${field.description}`)
  ]
    .join(' ')
    .replace(/[_-]+/g, ' ')
    .toLowerCase();
}
