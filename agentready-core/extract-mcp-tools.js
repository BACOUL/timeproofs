export function extractMcpTools(mcpDocument) {
  const server = mcpDocument.server || {};
  const tools = Array.isArray(mcpDocument.tools) ? mcpDocument.tools : [];

  return tools.map((tool) => {
    const inputSchema = tool.inputSchema || {};
    const required = Array.isArray(inputSchema.required) ? inputSchema.required : [];
    const requestFields = flattenInputSchema(inputSchema);
    const description = String(tool.description || '');

    return {
      source: 'mcp',
      method: 'MCP_TOOL',
      path: `mcp://tools/${tool.name}`,
      operationId: tool.name,
      hasExplicitOperationId: Boolean(tool.name),
      summary: firstSentence(description),
      description,
      tags: ['mcp', server.name || 'mcp-server'].filter(Boolean),
      parameters: [],
      requestFields,
      responses: createSyntheticResponses(tool),
      responseStatusCodes: ['200', '400'],
      hasSecurity: hasToolSecurity(tool, mcpDocument),
      raw: tool,
      mcp: {
        server_name: server.name || '',
        server_description: server.description || '',
        tool_name: tool.name,
        input_required: required
      }
    };
  });
}

function flattenInputSchema(schema, prefix = '', mediaType = 'application/json', seen = new Set()) {
  if (!schema || typeof schema !== 'object') return [];
  if (seen.has(schema)) return [];
  seen.add(schema);

  const fields = [];
  const required = Array.isArray(schema.required) ? schema.required : [];

  if (schema.type === 'object' && schema.properties && typeof schema.properties === 'object') {
    for (const [name, child] of Object.entries(schema.properties)) {
      const fieldName = prefix ? `${prefix}.${name}` : name;
      fields.push(normalizeField(fieldName, child, required.includes(name), mediaType));
      fields.push(...flattenInputSchema(child, fieldName, mediaType, seen));
    }
  }

  if (schema.type === 'array' && schema.items) {
    fields.push(...flattenInputSchema(schema.items, `${prefix || 'items'}[]`, mediaType, seen));
  }

  return dedupeFields(fields);
}

function normalizeField(name, schema = {}, required = false, mediaType = 'application/json') {
  return {
    name,
    location: 'inputSchema',
    mediaType,
    required,
    description: schema?.description || '',
    type: schema?.type || inferTypeFromSchema(schema),
    format: schema?.format || '',
    enum: Array.isArray(schema?.enum) ? schema.enum : null,
    minimum: schema?.minimum,
    maximum: schema?.maximum,
    schema: schema || {}
  };
}

function createSyntheticResponses(tool) {
  const hasOutputSchema = Boolean(tool.outputSchema && typeof tool.outputSchema === 'object');
  return [
    {
      statusCode: '200',
      description: hasOutputSchema
        ? 'Tool call completed successfully and returned a structured output schema.'
        : 'Tool call completed successfully.',
      hasContent: hasOutputSchema,
      contentTypes: hasOutputSchema ? ['application/json'] : [],
      schemaTypes: hasOutputSchema ? [tool.outputSchema.type || 'object'] : []
    },
    {
      statusCode: '400',
      description: 'Invalid tool input. Provide required fields and valid schema values before retrying.',
      hasContent: false,
      contentTypes: [],
      schemaTypes: []
    }
  ];
}

function hasToolSecurity(tool, document) {
  if (tool.security || tool.permissions || tool.scopes || tool.requiresAuth) return true;
  if (document.security || document.permissions || document.scopes || document.requiresAuth) return true;
  return false;
}

function firstSentence(value) {
  const text = String(value || '').trim();
  if (!text) return '';
  const match = text.match(/^(.+?[.!?])\s/);
  return match ? match[1] : text.slice(0, 140);
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

function dedupeFields(fields) {
  const seen = new Set();
  return fields.filter((field) => {
    const key = `${field.location}:${field.mediaType}:${field.name}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
