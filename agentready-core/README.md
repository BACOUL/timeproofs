# AgentReady Core V1a

Moteur statique local pour analyser une spec OpenAPI avant exposition à des agents IA.

## Objectif V1a

```txt
OpenAPI JSON
→ extraction des opérations
→ classification des actions
→ détection des risques
→ score AgentReady
→ agentready.json
→ rapport Markdown
```

## Important

Cette V1a :

- n'appelle aucun endpoint externe ;
- n'exécute aucun code fourni par l'utilisateur ;
- ne stocke aucune spec ;
- accepte OpenAPI JSON ;
- prépare YAML pour V1b, mais ne parse pas encore YAML.

## Usage navigateur / module ES

```js
import { scanOpenApiText } from './agentready-core/index.js';

const text = await file.text();
const result = await scanOpenApiText(text, { filename: file.name });

console.log(result.summary.score);
console.log(result.agentready_json);
console.log(result.markdown_report);
```

## Sortie principale

```js
{
  source,
  summary,
  operations,
  agentready_json,
  markdown_report
}
```

## Statuts

```txt
85-100 : AgentReady
70-84  : Minor fixes
50-69  : Needs fixes
0-49   : Not AgentReady
```

## Risques détectés V1a

```txt
unclear_operation_name
ambiguous_tool_description
missing_when_to_use
missing_when_not_to_use
unbounded_parameter
missing_enum
dangerous_action_without_confirmation
irreversible_action
non_corrective_error
sensitive_data_exposure
overbroad_permission
large_unstructured_response
missing_success_verification
missing_error_recovery
agent_context_confusion
unknown_action_type
```

## Limite V1a

La V1a est volontairement statique et déterministe.

Elle ne garantit pas qu'un agent IA ne se trompera jamais. Elle identifie les risques structurels d'une spec OpenAPI qui peuvent provoquer une mauvaise utilisation par un agent.
