# TimeProofs AgentReady — agentready.json Specification V1

## Objectif

`agentready.json` est la sortie stratégique de TimeProofs AgentReady.

Le PDF parle aux humains.  
`agentready.json` parle aux plateformes, agents, runtimes, CI/CD et futurs systèmes de contrôle.

Objectif :

> Décrire comment un outil peut être utilisé par un agent IA, avec quels risques, quelles limites et quelles validations.

## Rôle dans le produit

```txt
OpenAPI / MCP / tool schema
→ AgentReady analysis
→ AgentReady Score
→ AgentReady Report
→ agentready.json
```

## Version V1

```json
{
  "agentready_version": "1.0"
}
```

## Structure minimale

```json
{
  "agentready_version": "1.0",
  "source": {
    "type": "openapi",
    "filename": "openapi.yaml",
    "openapi_version": "3.1.0"
  },
  "summary": {
    "score": 72,
    "status": "Needs fixes",
    "total_operations": 24,
    "critical_risks": 3,
    "high_risks": 7,
    "medium_risks": 12,
    "low_risks": 5
  },
  "tools": []
}
```

## Champ `source`

Décrit le document analysé.

```json
{
  "type": "openapi",
  "filename": "openapi.yaml",
  "openapi_version": "3.1.0"
}
```

### `source.type`

Valeurs V1 :

```txt
openapi
```

Valeurs futures :

```txt
mcp
tool_schema
function_calling
```

## Champ `summary`

Résumé global.

```json
{
  "score": 72,
  "status": "Needs fixes",
  "total_operations": 24,
  "critical_risks": 3,
  "high_risks": 7,
  "medium_risks": 12,
  "low_risks": 5
}
```

### Statuts autorisés

```txt
AgentReady
Minor fixes
Needs fixes
Not AgentReady
```

## Champ `tools`

Chaque opération OpenAPI est représentée comme un outil potentiel.

Structure :

```json
{
  "operation_id": "refundCustomer",
  "path": "/refunds",
  "method": "POST",
  "action_type": "REFUND",
  "risk_level": "critical",
  "requires_human_confirmation": true,
  "allowed_when": [],
  "forbidden_when": [],
  "failure_modes": [],
  "detected_risks": [],
  "agent_recommendation": "Do not allow autonomous execution without human confirmation."
}
```

## Champs d'un tool

### `operation_id`

Identifiant de l'opération.

Si absent dans OpenAPI, TimeProofs peut générer un identifiant stable à partir de :

```txt
method + path
```

### `path`

Chemin OpenAPI.

Exemple :

```txt
/refunds
```

### `method`

Méthode HTTP.

Valeurs attendues :

```txt
GET
POST
PUT
PATCH
DELETE
```

### `action_type`

Type d'action selon la taxonomie TimeProofs.

Valeurs V1 :

```txt
READ
SEARCH
LIST
CREATE
UPDATE
DELETE
SEND
PUBLISH
PAY
REFUND
TRANSFER
EXPORT
IMPORT
AUTH
INVITE
SCHEDULE
CANCEL
SENSITIVE_DATA
UNKNOWN
```

### `risk_level`

Niveau de risque.

Valeurs :

```txt
low
medium
high
critical
```

### `requires_human_confirmation`

Booléen.

`true` si l'opération ne doit pas être exécutée de manière autonome sans validation humaine.

### `allowed_when`

Conditions dans lesquelles l'agent peut utiliser l'outil.

Exemple :

```json
[
  "customer identity is verified",
  "order is paid",
  "refund amount is below original payment"
]
```

### `forbidden_when`

Conditions dans lesquelles l'agent ne doit pas utiliser l'outil.

Exemple :

```json
[
  "customer identity is uncertain",
  "refund amount exceeds original payment",
  "order is already refunded"
]
```

### `failure_modes`

Modes d'échec possibles.

Exemple :

```json
[
  "wrong customer",
  "wrong amount",
  "duplicate refund"
]
```

### `detected_risks`

Risques détectés par TimeProofs.

Exemple :

```json
[
  "dangerous_action_without_confirmation",
  "unbounded_parameter"
]
```

### `agent_recommendation`

Recommandation lisible par agent ou runtime.

Exemples :

```txt
Allow autonomous execution.
Allow only with strict parameter validation.
Require human confirmation before execution.
Do not allow autonomous execution.
Do not expose this tool to agents before fixing critical risks.
```

## Exemple complet

```json
{
  "agentready_version": "1.0",
  "source": {
    "type": "openapi",
    "filename": "openapi.yaml",
    "openapi_version": "3.1.0"
  },
  "summary": {
    "score": 72,
    "status": "Needs fixes",
    "total_operations": 24,
    "critical_risks": 3,
    "high_risks": 7,
    "medium_risks": 12,
    "low_risks": 5
  },
  "tools": [
    {
      "operation_id": "refundCustomer",
      "path": "/refunds",
      "method": "POST",
      "action_type": "REFUND",
      "risk_level": "critical",
      "requires_human_confirmation": true,
      "allowed_when": [
        "customer identity is verified",
        "order is paid",
        "refund amount is below original payment"
      ],
      "forbidden_when": [
        "customer identity is uncertain",
        "refund amount exceeds original payment",
        "order is already refunded"
      ],
      "failure_modes": [
        "wrong customer",
        "wrong amount",
        "duplicate refund"
      ],
      "detected_risks": [
        "dangerous_action_without_confirmation",
        "unbounded_parameter"
      ],
      "agent_recommendation": "Do not allow autonomous execution without human confirmation."
    }
  ]
}
```

## Règles V1 de génération

1. Le JSON doit être valide.
2. Le JSON doit être déterministe pour une même spec.
3. Chaque opération analysable doit créer une entrée `tools`.
4. Les actions dangereuses doivent avoir `requires_human_confirmation: true` si aucune limite claire n'est détectée.
5. Si le type d'action est incertain, utiliser `UNKNOWN` et `risk_level: medium`.
6. Si un risque critique existe, le statut global ne peut pas être `AgentReady`.
7. Si `detected_risks` contient `dangerous_action_without_confirmation`, la recommandation doit interdire l'exécution autonome.

## Rôle futur

À long terme, `agentready.json` doit pouvoir être utilisé par :

- plateformes agents ;
- runtimes ;
- marketplaces MCP ;
- CI/CD ;
- GitHub Actions ;
- outils de sécurité ;
- audits internes ;
- systèmes de validation humaine.

## Principe stratégique

Le rapport humain est utile au départ.

Mais `agentready.json` est l'actif qui peut rendre TimeProofs plus difficile à copier.
