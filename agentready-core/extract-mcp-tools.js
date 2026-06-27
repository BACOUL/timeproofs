export function extractMcpTools(mcpDocument) {
  const tools = Array.isArray(mcpDocument.tools) ? mcpDocument.tools : [];
  const serverName = mcpDocument.server?.name || mcpDocument.name || 'MCP Server';

  return tools.map((tool) => normalizeMcpTool(tool, { serverName }));
}

function normalizeMcpTool(tool, context = {}) {
  const inputSchema = tool.inputSchema || tool.input_schema || {};
  const description = tool.description || '';
  const summary = firstSentence(description) || `MCP tool ${tool.name}`;

  return {
    source: 'mcp',
    method: 'MCP_TOOL',
    path: `mcp://tools/${tool.name}`,
    operationId: tool.name,
    hasExplicitOperationId: true,
    summary,
    description,
    tags: ['mcp', context.serverName].filter(Boolean),
    parameters: [],
    requestFields: flattenInputSchemaFields(inputSchema),
    responses: createSyntheticResponses(tool),
    responseStatusCodes: ['200'],
    hasSecurity: hasMcpSecurity(tool),
    raw: tool
  };
}

function flattenInputSchemaFields(schema, prefix = '', seen = new Set()) {
  if (!schema || typeof schema !== 'object') return [];
  if (seen.has(schema)) return [];
  seen.add(schema);

  const fields = [];
  const required = Array.isArray(schema.required) ? schema.required : [];

  if (schema.type === 'object' || schema.properties) {
    const properties = schema.properties || {};
    for (const [name, child] of Object.entries(properties)) {
      const fieldName = prefix ? `${prefix}.${name}` : name;
      fields.push({
        name: fieldName,
        location: 'inputSchema',
        mediaType: 'application/json',
        required: required.includes(name),
        description: child?.description || '',
        type: child?.type || inferTypeFromSchema(child),
        format: child?.format || '',
        enum: Array.isArray(child?.enum) ? child.enum : null,
        minimum: child?.minimum,
        maximum: child?.maximum,
        schema: child || {}
      });
      fields.push(...flattenInputSchemaFields(child, fieldName, seen));
    }
  }

  if (schema.type === 'array' && schema.items) {
    fields.push(...flattenInputSchemaFields(schema.items, `${prefix || 'items'}[]`, seen));
  }

  return dedupeFields(fields);
}

function createSyntheticResponses(tool) {
  const outputSchema = tool.outputSchema || tool.output_schema;
  const description = outputSchema
    ? 'Tool call completed successfully and returned the documented output schema.'
    : 'Tool call completed successfully.';

  return [
    {
      statusCode: '200',
      description,
      hasContent: Boolean(outputSchema),
      contentTypes: outputSchema ? ['application/json'] : [],
      schemaTypes: outputSchema?.type ? [outputSchema.type] : []
    }
  ];
}

function hasMcpSecurity(tool) {
  if (tool.security || tool.auth || tool.permissions || tool.scopes) return true;
  if (Array.isArray(tool.requiredScopes) && tool.requiredScopes.length > 0) return true;
  if (Array.isArray(tool.required_scopes) && tool.required_scopes.length > 0) return true;
  return false;
}

function firstSentence(value) {
  const text = String(value || '').trim();
  if (!text) return '';
  const match = text.match(/^(.+?[.!?])\s/);
  return match ? match[1] : text.slice(0, 120);
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
    const key = `${field.location}:${field.name}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
