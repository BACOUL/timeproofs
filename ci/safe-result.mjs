const SAFE_UCP_CHECKOUT_FIELDS = new Set([
  'checkout_id','currency','grand_total_minor','checkout_status','expires_at','declared_checkout_capability'
]);
const SAFE_AP2_PAYMENT_FIELDS = new Set([
  'transaction_id','currency','amount_minor','execution_date','issued_at','expires_at'
]);

function pick(source, allowed) {
  const out = {};
  for (const [key, value] of Object.entries(source || {})) if (allowed.has(key)) out[key] = value;
  return out;
}

function safeCanonical(object) {
  if (object?.source?.namespace === 'ucp' && object?.source?.object_type === 'checkout') {
    return pick(object.canonical, SAFE_UCP_CHECKOUT_FIELDS);
  }
  if (object?.source?.namespace === 'ap2' && object?.source?.object_type === 'payment_mandate') {
    return pick(object.canonical, SAFE_AP2_PAYMENT_FIELDS);
  }
  return {};
}

function safeSnapshot(snapshot = {}) {
  return {
    digest: snapshot.digest,
    media_type: snapshot.media_type ?? null,
    byte_length: snapshot.byte_length ?? null,
    source_ref: null
  };
}

function safeObject(object) {
  return {
    object_id: object.object_id,
    source: object.source,
    external_id: object.external_id ?? null,
    observed_at: object.observed_at,
    snapshot: safeSnapshot(object.snapshot),
    canonical: safeCanonical(object),
    integrity: object.integrity || {},
    provenance: {
      adapter: object.provenance?.adapter || null,
      mappings: object.provenance?.mappings || {}
    }
  };
}

export function toSafeCiResult(evaluation) {
  return {
    result_contract_version: evaluation.result_contract_version,
    core_schema_version: evaluation.core_schema_version,
    evaluation_id: evaluation.evaluation_id,
    metadata: evaluation.metadata,
    invariants: evaluation.invariants,
    results: evaluation.results,
    decision: evaluation.decision,
    graph: {
      graph_id: evaluation.graph.graph_id,
      evaluation_time: evaluation.graph.evaluation_time,
      objects: (evaluation.graph.objects || []).map(safeObject),
      bindings: evaluation.graph.bindings || [],
      evidence: evaluation.graph.evidence || [],
      context: evaluation.graph.context || {}
    },
    redaction: {
      profile: 'timeproofs.ci.safe.v0.1',
      raw_protocol_objects_included: false,
      source_refs_included: false,
      credential_material_included: false
    }
  };
}
