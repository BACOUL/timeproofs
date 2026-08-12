import crypto from 'node:crypto';

const DEFAULT_MAX_DEPTH = 100;
const DEFAULT_MAX_NODES = 100000;

export function canonicalJson(value, { maxDepth = DEFAULT_MAX_DEPTH, maxNodes = DEFAULT_MAX_NODES } = {}) {
  let nodes = 0;
  const ancestors = new WeakSet();

  function walk(current, depth) {
    nodes += 1;
    if (nodes > maxNodes) throw new RangeError(`Canonical JSON node limit exceeded (${maxNodes}).`);
    if (depth > maxDepth) throw new RangeError(`Canonical JSON depth limit exceeded (${maxDepth}).`);

    if (current === null) return 'null';
    const type = typeof current;
    if (type === 'string' || type === 'boolean') return JSON.stringify(current);
    if (type === 'number') {
      if (!Number.isFinite(current)) throw new TypeError('Canonical JSON does not accept non-finite numbers.');
      return JSON.stringify(current);
    }
    if (type !== 'object') throw new TypeError(`Canonical JSON does not accept ${type} values.`);
    if (ancestors.has(current)) throw new TypeError('Canonical JSON does not accept cyclic objects.');

    ancestors.add(current);
    try {
      if (Array.isArray(current)) return `[${current.map(v => walk(v, depth + 1)).join(',')}]`;
      if (Object.getOwnPropertySymbols(current).length) throw new TypeError('Canonical JSON does not accept symbol-keyed properties.');
      const entries = Object.keys(current).sort().map(key => {
        const v = current[key];
        if (v === undefined || typeof v === 'function' || typeof v === 'symbol' || typeof v === 'bigint') {
          throw new TypeError(`Canonical JSON does not accept non-JSON value at property ${key}.`);
        }
        return `${JSON.stringify(key)}:${walk(v, depth + 1)}`;
      });
      return `{${entries.join(',')}}`;
    } finally {
      ancestors.delete(current);
    }
  }

  return walk(value, 0);
}

export function sha256Base64UrlString(value) {
  if (typeof value !== 'string') throw new TypeError('sha256Base64UrlString requires a string.');
  return crypto.createHash('sha256').update(value, 'utf8').digest('base64url');
}

export function sha256HexCanonical(value) {
  return crypto.createHash('sha256').update(canonicalJson(value), 'utf8').digest('hex');
}
