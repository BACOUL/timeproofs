const HTTP_METHODS = Object.freeze(['get', 'post', 'put', 'patch', 'delete', 'options', 'head']);

export function extractOperations(openapiDocument) {
  const operations = [];
  const paths = openapiDocument.paths || {};

  for (const [path, pathItem] of Object.entries(paths)) {
    if (!pathItem || typeof pathItem !== 'object') continue;

    const pathLevelParameters = Array.isArray(pathItem.parameters) ? pathItem.parameters : [];

    for (const method of HTTP_METHODS) {
      const operation = pathItem[method];
      if (!operation || typeof operation !== 'object') continue;

      const parameters = [
        ...pathLevelParameters,
        ...(Array.isArray(operation.parameters) ? operation.parameters : [])
      ].map(normalizeParameter);

      const requestFields = extractRequestFields(operation.requestBody);
      const responseInfo = extractResponses(operation.responses || {});

      operations.push({
        source: 'openapi',
        method: method.toUpperCase(),
        path,
        operationId: operation.operationId || createFallbackOperationId(method, path),
        hasExplicitOperationId: Boolean(operation.operationId),
        summary: operation.summary || '',
        description: operation.description || '',
        tags: Array.isArray(operation.tags) ? operation.tags : [],
        parameters,
        requestFields,
        responses: responseInfo.responses,
        responseStatusCodes: responseInfo.statusCodes,
        hasSecurity: hasOperationSecurity(openapiDocument, operation),
        raw: operation
      });
    }
  }

  return operations;
}

function normalizeParameter(parameter) {
  const schema = parameter?.schema || {};
  return {
    name: parameter?.name || '',
    in: parameter?.in || '',
    required: Boolean(parameter?.required),
    description: parameter?.description || '',
    type: schema.type || inferTypeFromSchema(schema),
    format: schema.format || '',
    enum: Array.isArray(schema.enum) ? schema.enum : null,
    minimum: schema.minimum,
    maximum: schema.maximum,
    schema
  };
}

function extractRequestFields(requestBody) {
  if (!requestBody || typeof requestBody !== 'object') return [];

  const content = requestBody.content || {};
  const fields = [];

  for (const mediaType of Object.keys(content)) {
    const schema = content[mediaType]?.schema;
    if (!schema) continue;
    fields.push(...flattenSchemaFields(schema, '', mediaType, new Set()));
  }

  return fields;
}

function flattenSchemaFields(schema, prefix = '', mediaType = 'application/json', seen = new Set()) {
  if (!schema || typeof schema !== 'object') return [];

  if (seen.has(schema)) return [];
  seen.add(schema);

  const fields = [];

  if (schema.$ref) {
    fields.push({
      name: prefix || schema.$ref.split('/').pop() || '$ref',
      location: 'requestBody',
      mediaType,
      required: false,
      description: schema.description || '',
      type: '$ref',
      format: '',
      enum: null,
      minimum: undefined,
      maximum: undefined,
      schema
    });
    return fields;
  }

  const required = Array.isArray(schema.required) ? schema.required : [];

  if (schema.type === 'object' && schema.properties && typeof schema.properties === 'object') {
    for (const [name, child] of Object.entries(schema.properties)) {
      const fieldName = prefix ? `${prefix}.${name}` : name;
      fields.push({
        name: fieldName,
        location: 'requestBody',
        mediaType,
        required: required.includes(name),
        description: child?.description || '',
        type: child?.type || inferTypeFromSchema(child),
        format: child?.format || '',
        enum: Array.isArray(child?.enum) ? child.enum : null,
        minimum: child?.minimum,
        maximum: child?.maximum,
        schema: child || {}
      });

      fields.push(...flattenSchemaFields(child, fieldName, mediaType, seen));
    }
  }

  if (schema.type === 'array' && schema.items) {
    fields.push(...flattenSchemaFields(schema.items, `${prefix || 'items'}[]`, mediaType, seen));
  }

  return dedupeFields(fields);
}

function extractResponses(responses) {
  const normalized = [];
  const statusCodes = Object.keys(responses || {});

  for (const [statusCode, response] of Object.entries(responses || {})) {
    const content = response?.content || {};
    normalized.push({
      statusCode,
      description: response?.description || '',
      hasContent: Object.keys(content).length > 0,
      contentTypes: Object.keys(content),
      schemaTypes: Object.values(content).map((entry) => entry?.schema?.type || entry?.schema?.$ref || '').filter(Boolean)
    });
  }

  return { responses: normalized, statusCodes };
}

function hasOperationSecurity(document, operation) {
  if (Array.isArray(operation.security) && operation.security.length > 0) return true;
  if (Array.isArray(document.security) && document.security.length > 0) return true;
  return Boolean(document.components?.securitySchemes && Object.keys(document.components.securitySchemes).length > 0);
}

function inferTypeFromSchema(schema) {
  if (!schema || typeof schema !== 'object') return '';
  if (schema.$ref) return '$ref';
  if (schema.properties) return 'object';
  if (schema.items) return 'array';
  if (Array.isArray(schema.oneOf)) return 'oneOf';
  if (Array.isArray(schema.anyOf)) return 'anyOf';
  return '';
}

function createFallbackOperationId(method, path) {
  return `${method.toLowerCase()}_${path.replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_+|_+$/g, '') || 'root'}`;
}

function dedupeFields(fields) {
  const seen = new Set();
  return fields.filter((field) => {
    const key = `${field.location}:${field.mediaType}:${field.name}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
