export class AgentReadyParseError extends Error {
  constructor(message, code = 'PARSE_ERROR', details = {}) {
    super(message);
    this.name = 'AgentReadyParseError';
    this.code = code;
    this.details = details;
  }
}

const MAX_SPEC_SIZE_BYTES = 2 * 1024 * 1024;

export function parseOpenApiText(text, options = {}) {
  const filename = options.filename || 'openapi.json';
  const maxBytes = options.maxBytes || MAX_SPEC_SIZE_BYTES;

  if (typeof text !== 'string') {
    throw new AgentReadyParseError('OpenAPI input must be a string.', 'INVALID_INPUT');
  }

  if (!text.trim()) {
    throw new AgentReadyParseError('OpenAPI input is empty.', 'EMPTY_FILE');
  }

  const size = new TextEncoder().encode(text).length;
  if (size > maxBytes) {
    throw new AgentReadyParseError('OpenAPI file is too large for local V1a analysis.', 'FILE_TOO_LARGE', {
      size,
      maxBytes
    });
  }

  const lower = filename.toLowerCase();
  const looksJson = lower.endsWith('.json') || text.trim().startsWith('{');
  const looksYaml = lower.endsWith('.yaml') || lower.endsWith('.yml') || /^openapi\s*:/m.test(text);

  if (!looksJson && looksYaml) {
    throw new AgentReadyParseError(
      'YAML parsing is planned for V1b. V1a accepts OpenAPI JSON only.',
      'YAML_NOT_SUPPORTED_YET',
      { filename }
    );
  }

  let document;
  try {
    document = JSON.parse(text);
  } catch (error) {
    throw new AgentReadyParseError('Invalid JSON OpenAPI document.', 'INVALID_JSON', {
      filename,
      error: error.message
    });
  }

  validateOpenApiDocument(document, { filename });

  return {
    document,
    source: {
      type: 'openapi',
      filename,
      openapi_version: String(document.openapi || '')
    }
  };
}

export function validateOpenApiDocument(document, options = {}) {
  const filename = options.filename || 'openapi.json';

  if (!document || typeof document !== 'object' || Array.isArray(document)) {
    throw new AgentReadyParseError('OpenAPI document must be a JSON object.', 'INVALID_DOCUMENT', { filename });
  }

  if (typeof document.openapi !== 'string') {
    throw new AgentReadyParseError('OpenAPI document must contain an openapi version string.', 'MISSING_OPENAPI_VERSION', {
      filename
    });
  }

  if (!/^3\.(0|1)(\.\d+)?/.test(document.openapi)) {
    throw new AgentReadyParseError('Only OpenAPI 3.0 and 3.1 are supported in V1a.', 'UNSUPPORTED_OPENAPI_VERSION', {
      filename,
      openapi: document.openapi
    });
  }

  if (!document.paths || typeof document.paths !== 'object' || Array.isArray(document.paths)) {
    throw new AgentReadyParseError('OpenAPI document must contain a paths object.', 'MISSING_PATHS', { filename });
  }

  const pathKeys = Object.keys(document.paths);
  if (pathKeys.length === 0) {
    throw new AgentReadyParseError('OpenAPI paths object is empty.', 'EMPTY_PATHS', { filename });
  }

  const hasOperation = pathKeys.some((path) => {
    const pathItem = document.paths[path];
    if (!pathItem || typeof pathItem !== 'object') return false;
    return ['get', 'post', 'put', 'patch', 'delete', 'options', 'head'].some((method) => Boolean(pathItem[method]));
  });

  if (!hasOperation) {
    throw new AgentReadyParseError('OpenAPI document does not contain analyzable operations.', 'NO_OPERATIONS', {
      filename
    });
  }

  return true;
}
