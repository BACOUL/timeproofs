export class AgentReadyYamlError extends Error {
  constructor(message, details = {}) {
    super(message);
    this.name = 'AgentReadyYamlError';
    this.code = 'INVALID_YAML';
    this.details = details;
  }
}

export function parseYamlDocument(text) {
  if (typeof text !== 'string' || !text.trim()) {
    throw new AgentReadyYamlError('YAML input is empty.');
  }

  const lines = normalizeYamlLines(text);
  if (lines.length === 0) {
    throw new AgentReadyYamlError('YAML document has no parseable content.');
  }

  const { value, index } = parseBlock(lines, 0, lines[0].indent);

  if (index < lines.length) {
    throw new AgentReadyYamlError('Unexpected YAML content after document end.', { line: lines[index].number });
  }

  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new AgentReadyYamlError('YAML root must be an object.');
  }

  return value;
}

function normalizeYamlLines(text) {
  const rawLines = text.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n').split('\n');
  const lines = [];

  for (let i = 0; i < rawLines.length; i += 1) {
    const raw = rawLines[i];
    if (!raw.trim() || raw.trimStart().startsWith('#')) continue;
    if (/\t/.test(raw.match(/^\s*/)?.[0] || '')) {
      throw new AgentReadyYamlError('Tabs are not supported for YAML indentation.', { line: i + 1 });
    }

    const indent = raw.match(/^ */)?.[0].length || 0;
    const content = stripInlineComment(raw.slice(indent)).trimEnd();
    if (!content.trim()) continue;

    const blockMatch = content.match(/^([^:]+):\s*([|>])\s*$/);
    if (blockMatch) {
      const key = blockMatch[1].trim();
      const mode = blockMatch[2];
      const block = [];
      let j = i + 1;
      while (j < rawLines.length) {
        const nextRaw = rawLines[j];
        if (!nextRaw.trim()) {
          block.push('');
          j += 1;
          continue;
        }
        const nextIndent = nextRaw.match(/^ */)?.[0].length || 0;
        if (nextIndent <= indent) break;
        block.push(nextRaw.slice(Math.min(nextIndent, indent + 2)));
        j += 1;
      }
      const value = mode === '>' ? block.join(' ').replace(/\s+/g, ' ').trim() : block.join('\n').trim();
      lines.push({ indent, content: `${key}: ${JSON.stringify(value)}`, number: i + 1 });
      i = j - 1;
      continue;
    }

    lines.push({ indent, content, number: i + 1 });
  }

  return lines;
}

function parseBlock(lines, index, indent) {
  if (index >= lines.length) return { value: {}, index };

  const current = lines[index];
  if (current.indent < indent) return { value: {}, index };

  if (current.content.startsWith('- ')) {
    return parseArray(lines, index, indent);
  }

  return parseObject(lines, index, indent);
}

function parseObject(lines, index, indent) {
  const object = {};
  let cursor = index;

  while (cursor < lines.length) {
    const line = lines[cursor];
    if (line.indent < indent) break;
    if (line.indent > indent) {
      throw new AgentReadyYamlError('Unexpected nested YAML line.', { line: line.number });
    }
    if (line.content.startsWith('- ')) break;

    const pair = splitKeyValue(line.content, line.number);
    const key = unquote(pair.key.trim());

    if (!key) {
      throw new AgentReadyYamlError('Empty YAML key.', { line: line.number });
    }

    if (pair.value === '') {
      const next = lines[cursor + 1];
      if (!next || next.indent <= indent) {
        object[key] = {};
        cursor += 1;
        continue;
      }
      const parsed = parseBlock(lines, cursor + 1, next.indent);
      object[key] = parsed.value;
      cursor = parsed.index;
    } else {
      object[key] = parseScalar(pair.value);
      cursor += 1;
    }
  }

  return { value: object, index: cursor };
}

function parseArray(lines, index, indent) {
  const array = [];
  let cursor = index;

  while (cursor < lines.length) {
    const line = lines[cursor];
    if (line.indent < indent) break;
    if (line.indent > indent) {
      throw new AgentReadyYamlError('Unexpected array indentation.', { line: line.number });
    }
    if (!line.content.startsWith('- ')) break;

    const rest = line.content.slice(2).trim();

    if (!rest) {
      const next = lines[cursor + 1];
      if (!next || next.indent <= indent) {
        array.push(null);
        cursor += 1;
        continue;
      }
      const parsed = parseBlock(lines, cursor + 1, next.indent);
      array.push(parsed.value);
      cursor = parsed.index;
      continue;
    }

    if (looksLikeKeyValue(rest)) {
      const pair = splitKeyValue(rest, line.number);
      const item = { [unquote(pair.key.trim())]: pair.value === '' ? {} : parseScalar(pair.value) };
      cursor += 1;

      while (cursor < lines.length && lines[cursor].indent > indent) {
        const child = lines[cursor];
        if (child.content.startsWith('- ')) {
          const parsed = parseBlock(lines, cursor, child.indent);
          const lastKey = Object.keys(item).at(-1);
          if (lastKey && isEmptyObject(item[lastKey])) item[lastKey] = parsed.value;
          else item.items = parsed.value;
          cursor = parsed.index;
          continue;
        }

        const childPair = splitKeyValue(child.content, child.number);
        const childKey = unquote(childPair.key.trim());
        if (childPair.value === '') {
          const next = lines[cursor + 1];
          if (next && next.indent > child.indent) {
            const parsed = parseBlock(lines, cursor + 1, next.indent);
            item[childKey] = parsed.value;
            cursor = parsed.index;
          } else {
            item[childKey] = {};
            cursor += 1;
          }
        } else {
          item[childKey] = parseScalar(childPair.value);
          cursor += 1;
        }
      }

      array.push(item);
      continue;
    }

    array.push(parseScalar(rest));
    cursor += 1;
  }

  return { value: array, index: cursor };
}

function splitKeyValue(content, lineNumber) {
  let quote = null;
  let bracketDepth = 0;
  let braceDepth = 0;

  for (let i = 0; i < content.length; i += 1) {
    const char = content[i];
    const prev = content[i - 1];

    if ((char === '"' || char === "'") && prev !== '\\') {
      quote = quote === char ? null : quote || char;
      continue;
    }
    if (quote) continue;
    if (char === '[') bracketDepth += 1;
    if (char === ']') bracketDepth -= 1;
    if (char === '{') braceDepth += 1;
    if (char === '}') braceDepth -= 1;
    if (char === ':' && bracketDepth === 0 && braceDepth === 0) {
      return { key: content.slice(0, i), value: content.slice(i + 1).trim() };
    }
  }

  throw new AgentReadyYamlError('Expected YAML key/value pair.', { line: lineNumber, content });
}

function parseScalar(value) {
  const trimmed = value.trim();
  if (trimmed === '') return '';
  if (trimmed === 'null' || trimmed === '~') return null;
  if (trimmed === 'true') return true;
  if (trimmed === 'false') return false;
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) return Number(trimmed);

  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return unquote(trimmed);
  }

  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    return parseInlineArray(trimmed);
  }

  if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
    return parseInlineObject(trimmed);
  }

  return trimmed;
}

function parseInlineArray(value) {
  const inner = value.slice(1, -1).trim();
  if (!inner) return [];
  return splitInline(inner).map(parseScalar);
}

function parseInlineObject(value) {
  const inner = value.slice(1, -1).trim();
  if (!inner) return {};
  const object = {};
  for (const part of splitInline(inner)) {
    const pair = splitKeyValue(part, 0);
    object[unquote(pair.key.trim())] = parseScalar(pair.value);
  }
  return object;
}

function splitInline(value) {
  const parts = [];
  let quote = null;
  let depth = 0;
  let start = 0;

  for (let i = 0; i < value.length; i += 1) {
    const char = value[i];
    const prev = value[i - 1];
    if ((char === '"' || char === "'") && prev !== '\\') {
      quote = quote === char ? null : quote || char;
      continue;
    }
    if (quote) continue;
    if (char === '[' || char === '{') depth += 1;
    if (char === ']' || char === '}') depth -= 1;
    if (char === ',' && depth === 0) {
      parts.push(value.slice(start, i).trim());
      start = i + 1;
    }
  }
  parts.push(value.slice(start).trim());
  return parts.filter(Boolean);
}

function stripInlineComment(value) {
  let quote = null;
  for (let i = 0; i < value.length; i += 1) {
    const char = value[i];
    const prev = value[i - 1];
    if ((char === '"' || char === "'") && prev !== '\\') {
      quote = quote === char ? null : quote || char;
      continue;
    }
    if (!quote && char === '#' && (i === 0 || /\s/.test(value[i - 1]))) {
      return value.slice(0, i).trimEnd();
    }
  }
  return value;
}

function looksLikeKeyValue(value) {
  return /^[^:]+:\s*/.test(value);
}

function unquote(value) {
  const trimmed = String(value).trim();
  if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
    try {
      return JSON.parse(trimmed);
    } catch {
      return trimmed.slice(1, -1);
    }
  }
  if (trimmed.startsWith("'") && trimmed.endsWith("'")) {
    return trimmed.slice(1, -1).replace(/''/g, "'");
  }
  return trimmed;
}

function isEmptyObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0;
}
