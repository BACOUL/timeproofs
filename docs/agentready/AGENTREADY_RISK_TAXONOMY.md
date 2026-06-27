# TimeProofs AgentReady — Risk Taxonomy V1

## Objectif

La taxonomie TimeProofs AgentReady définit le langage officiel des actions, risques et niveaux de danger liés aux outils utilisés par des agents IA.

Elle doit permettre de répondre à 4 questions :

1. Quel type d'action l'outil réalise-t-il ?
2. Quel risque l'agent prend-il en utilisant cet outil ?
3. Une confirmation humaine est-elle nécessaire ?
4. Comment décrire ce risque dans `agentready.json` et dans le rapport humain ?

## Types d'action V1

Chaque opération doit être classée dans un ou plusieurs types.

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

## Niveaux de risque par défaut

```txt
READ           = low
SEARCH         = low
LIST           = low
CREATE         = medium
UPDATE         = medium
DELETE         = high
SEND           = high
PUBLISH        = high
PAY            = critical
REFUND         = critical
TRANSFER       = critical
EXPORT         = high
IMPORT         = medium
AUTH           = high
INVITE         = medium
SCHEDULE       = medium
CANCEL         = high
SENSITIVE_DATA = high
UNKNOWN        = medium
```

## Types d'action — définitions

### READ

Lire une ressource unique sans la modifier.

Exemples :

```txt
getCustomer
getInvoice
readFile
```

### SEARCH

Chercher une ressource à partir d'une requête.

Exemples :

```txt
searchCustomers
findOrders
lookupProduct
```

### LIST

Lister plusieurs ressources.

Risque particulier : réponse trop large ou fuite de données.

### CREATE

Créer une nouvelle ressource.

Exemples :

```txt
createTicket
createCustomer
createDraft
```

### UPDATE

Modifier une ressource existante.

Risque : mauvaise cible, mauvaise valeur, modification non voulue.

### DELETE

Supprimer une ressource.

Risque : action irréversible. Confirmation humaine recommandée.

### SEND

Envoyer une communication.

Exemples :

```txt
sendEmail
sendMessage
sendNotification
```

Risque : message envoyé à la mauvaise personne ou contenu non validé.

### PUBLISH

Publier du contenu à l'extérieur.

Risque : exposition publique non souhaitée.

### PAY / REFUND / TRANSFER

Actions financières.

Risque critique. Confirmation humaine obligatoire en autonomie.

### EXPORT

Exporter des données.

Risque : fuite ou exfiltration de données.

### AUTH

Créer, modifier ou utiliser des droits d'accès.

Risque : escalade de privilèges.

### SENSITIVE_DATA

Accès à des données personnelles, financières, médicales, secrets ou informations confidentielles.

## Risques AgentReady V1

La V1 doit détecter au minimum :

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

## Définitions des risques

### unclear_operation_name

Le nom de l'opération est trop vague pour qu'un agent choisisse l'outil avec confiance.

Détection V1 :

```txt
getData
process
handle
manage
update
doAction
execute
run
submit
```

### ambiguous_tool_description

La description est absente, trop courte ou trop générale.

Impact : l'agent peut choisir le mauvais outil ou l'utiliser dans le mauvais contexte.

### missing_when_to_use

La description n'explique pas quand l'outil doit être utilisé.

Impact : l'agent doit deviner.

### missing_when_not_to_use

La description n'explique pas les conditions d'interdiction ou les limites d'usage.

Impact : l'agent peut utiliser l'outil dans un cas dangereux.

### unbounded_parameter

Un paramètre numérique sensible n'a pas de limite.

Champs typiques :

```txt
amount
quantity
limit
price
discount
duration
```

### missing_enum

Un paramètre string devrait être contraint mais ne possède pas d'enum.

Champs typiques :

```txt
status
type
category
country
currency
language
role
```

### dangerous_action_without_confirmation

Une action dangereuse ne mentionne pas de confirmation humaine.

Actions concernées :

```txt
DELETE
SEND
PUBLISH
PAY
REFUND
TRANSFER
EXPORT
CANCEL
SENSITIVE_DATA
```

### irreversible_action

L'action peut produire un effet difficile ou impossible à annuler.

Exemples : suppression, paiement, transfert, publication externe.

### non_corrective_error

Les réponses d'erreur n'aident pas l'agent à corriger son appel.

Mauvais exemple :

```txt
400 Bad Request
```

Bon exemple :

```txt
Missing required field: order_id. Provide a valid order_id before retrying.
```

### sensitive_data_exposure

L'outil peut exposer des données sensibles sans limites claires.

Champs typiques :

```txt
email
phone
address
password
token
secret
api_key
payment
iban
credit_card
ssn
health
customer_data
personal_data
```

### overbroad_permission

L'outil nécessite ou expose des permissions trop larges.

### large_unstructured_response

La réponse peut être trop large, non structurée ou difficile à résumer correctement par un agent.

### missing_success_verification

Après une action critique, il n'existe pas de réponse ou endpoint clair permettant de vérifier que l'action a réellement réussi.

### missing_error_recovery

L'outil n'explique pas comment récupérer après une erreur.

### agent_context_confusion

L'outil dépend d'un contexte implicite non présent dans la spec.

Exemples : utilisateur courant, tenant actif, compte sélectionné, environnement, région.

### unknown_action_type

TimeProofs ne peut pas déterminer clairement le type d'action.

Risque par défaut : medium.

## Règle de classification

Quand plusieurs risques s'appliquent, garder le niveau le plus élevé.

Ordre :

```txt
critical > high > medium > low
```

## Règle confirmation humaine

La V1 doit recommander une confirmation humaine pour :

```txt
DELETE
SEND
PUBLISH
PAY
REFUND
TRANSFER
EXPORT
CANCEL
SENSITIVE_DATA
```

La confirmation humaine doit être considérée obligatoire pour :

```txt
PAY
REFUND
TRANSFER
DELETE irréversible
EXPORT données sensibles
PUBLISH public
```
