export class AgentReadyMcpParseError extends Error {
  constructor(message, code = 'MCP_PARSE_ERROR', details = {}) {
    super(message);
    this.name = 'AgentReadyMcpParseError';
    this.code = code;
    this.details = details;
  }
}

const MAX_MCP_SPEC_SIZE_BYTES = 1024 * 1024;

export function parseMcpToolsText(text, options = {}) {
  const filename = options.filename || 'mcp-tools.json';
  const maxBytes = options.maxBytes || MAX_MCP_SPEC_SIZE_BYTES;

  if (typeof text !== 'string') {
    throw new AgentReadyMcpParseError('MCP input must be a string.', 'INVALID_INPUT', { filename });
  }

  if (!text.trim()) {
    throw new AgentReadyMcpParseError('MCP input is empty.', 'EMPTY_FILE', { filename });
  }

  const size = new TextEncoder().encode(text).length;
  if (size > maxBytes) {
    throw new AgentReadyMcpParseError('MCP tools file is too large for local analysis.', 'FILE_TOO_LARGE', {
      filename,
      size,
      maxBytes
    });
  }

  let document;
  try {
    document = JSON.parse(text);
  } catch (error) {
    throw new AgentReadyMcpParseError('Invalid MCP tools JSON document.', 'INVALID_JSON', {
      filename,
      error: error.message
    });
  }

  validateMcpToolsDocument(document, { filename });

  return {
    document,
    source: {
      type: 'mcp',
      filename,
      mcp_version: String(document.mcp_version || ''),
      server_name: String(document.server?.name || '')
    }
  };
}

export function validateMcpToolsDocument(document, options = {}) {
  const filename = options.filename || 'mcp-tools.json';

  if (!document || typeof document !== 'object' || Array.isArray(document)) {
    throw new AgentReadyMcpParseError('MCP document must be a JSON object.', 'INVALID_DOCUMENT', { filename });
  }

  if (!Array.isArray(document.tools)) {
    throw new AgentReadyMcpParseError('MCP document must contain a tools array.', 'MISSING_TOOLS', { filename });
  }

  if (document.tools.length === 0) {
    throw new AgentReadyMcpParseError('MCP tools array is empty.', 'EMPTY_TOOLS', { filename });
  }

  document.tools.forEach((tool, index) => validateTool(tool, index, filename));

  return true;
}

function validateTool(tool, index, filename) {
  if (!tool || typeof tool !== 'object' || Array.isArray(tool)) {
    throw new AgentReadyMcpParseError('Each MCP tool must be an object.', 'INVALID_TOOL', { filename, index });
  }

  if (typeof tool.name !== 'string' || !tool.name.trim()) {
    throw new AgentReadyMcpParseError('Each MCP tool must contain a non-empty name.', 'MISSING_TOOL_NAME', {
      filename,
      index
    });
  }

  if (tool.inputSchema !== undefined && (typeof tool.inputSchema !== 'object' || Array.isArray(tool.inputSchema) || tool.inputSchema === null)) {
    throw new AgentReadyMcpParseError('MCP tool inputSchema must be an object when provided.', 'INVALID_INPUT_SCHEMA', {
      filename,
      index,
      name: tool.name
    });
  }
}
