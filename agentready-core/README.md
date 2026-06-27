# AgentReady Core V1/V2

Moteur statique local pour analyser une spec OpenAPI ou une liste d'outils MCP avant exposition à des agents IA.

## Objectif V1 OpenAPI

```txt
OpenAPI JSON / YAML
→ extraction des opérations
→ classification des actions
→ détection des risques
→ score AgentReady
→ agentready.json
→ rapport Markdown
```

## Objectif V2a MCP

```txt
MCP tools JSON
→ parsing tools[]
→ mapping vers opérations AgentReady
→ classification des actions
→ détection des risques
→ score AgentReady
→ agentready.json
→ rapport Markdown
```

## Important

Cette base :

- n'appelle aucun endpoint externe ;
- n'exécute aucun outil MCP ;
- ne se connecte à aucun serveur MCP live ;
- n'exécute aucun code fourni par l'utilisateur ;
- ne stocke aucune spec ;
- accepte OpenAPI JSON ;
- accepte OpenAPI YAML courant ;
- accepte MCP tools JSON ;
- reste statique et déterministe.

## Formats supportés

```txt
openapi.json
openapi.yaml
openapi.yml
mcp-tools.json
```

Le parseur YAML est volontairement léger et interne au repo. Il couvre les structures OpenAPI courantes : objets indentés, listes, scalaires, enums inline, objets inline et blocs texte `|` / `>`.

## Usage OpenAPI

```js
import { scanOpenApiText } from './agentready-core/index.js';

const text = await file.text();
const result = await scanOpenApiText(text, { filename: file.name });

console.log(result.summary.score);
console.log(result.agentready_json);
console.log(result.markdown_report);
```

## Usage MCP

```js
import { scanMcpToolsText } from './agentready-core/index.js';

const text = await file.text();
const result = await scanMcpToolsText(text, { filename: file.name });

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

## Mapping MCP V2a

```txt
tool.name        → operationId
tool.description → summary + description
inputSchema      → requestFields
method           → MCP_TOOL
path             → mcp://tools/{tool.name}
```

## Statuts

```txt
85-100 : AgentReady
70-84  : Minor fixes
50-69  : Needs fixes
0-49   : Not AgentReady
```

## Risques détectés

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

## Limite

TimeProofs AgentReady ne garantit pas qu'un agent IA ne se trompera jamais.

Il identifie les risques structurels d'une spec OpenAPI ou d'un ensemble d'outils MCP qui peuvent provoquer une mauvaise utilisation par un agent.
