# AgentReady Examples

Fixtures utilisées pour vérifier le moteur AgentReady V1a.

## Fichiers

```txt
valid-simple-openapi.json
dangerous-actions-openapi.json
```

## Usage attendu

`valid-simple-openapi.json` doit produire un score relativement élevé, car il contient :

- operationId explicites ;
- descriptions avec limites ;
- enums ;
- erreurs correctives ;
- sécurité déclarée.

`dangerous-actions-openapi.json` doit produire plusieurs risques forts ou critiques :

- remboursement sans confirmation humaine ;
- montant non borné ;
- status sans enum ;
- export de données sensibles ;
- suppression de fichier ;
- erreurs non correctives ;
- absence de sécurité déclarée.

## Limite V1a

Le moteur accepte OpenAPI JSON. YAML sera ajouté en V1b avant de déclarer la V1 complète.
