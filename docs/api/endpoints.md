# API Reference FlexSave

**Base URL** : `http://localhost:8000/api/v1`

## Authentification

Toutes les routes marquées 🔒 nécessitent un token Firebase dans le header :

```
Authorization: Bearer <firebase_id_token>
```

---

## Auth

### POST /auth/register

Créer un nouvel utilisateur.

**Request Body**
```json
{
  "email": "user@example.com",
  "password": "motdepasse123",
  "full_name": "Jean Dupont"
}
```

**Response** `201 Created`
```json
{
  "message": "User registered successfully. Please sign in.",
  "user_id": "abc123def456"
}
```

**Errors**
- `409` : Email déjà enregistré
- `400` : Données invalides

---

### POST /auth/verify-token

Vérifier un token Firebase et récupérer l'utilisateur.

**Query Parameters**
- `token` (string) : Token Firebase ID

**Response** `200 OK`
```json
{
  "id": "abc123",
  "email": "user@example.com",
  "full_name": "Jean Dupont",
  "discipline_score": 50.0,
  "is_premium": false
}
```

---

## Users

### GET /users/me 🔒

Récupérer le profil de l'utilisateur connecté.

**Response** `200 OK`
```json
{
  "id": "abc123",
  "email": "user@example.com",
  "full_name": "Jean Dupont",
  "discipline_score": 65.0,
  "is_premium": false,
  "notification_enabled": true
}
```

---

### PATCH /users/me 🔒

Modifier le profil utilisateur.

**Request Body**
```json
{
  "full_name": "Jean-Pierre Dupont",
  "notification_enabled": false
}
```

**Response** `200 OK`
```json
{
  "id": "abc123",
  "email": "user@example.com",
  "full_name": "Jean-Pierre Dupont",
  "discipline_score": 65.0,
  "is_premium": false,
  "notification_enabled": false
}
```

---

### GET /users/me/stats 🔒

Récupérer les statistiques d'épargne.

**Response** `200 OK`
```json
{
  "total_saved": 2500.00,
  "total_vaults": 3,
  "active_vaults": 2,
  "discipline_score": 65.0,
  "flexibility_used": 150.00
}
```

---

## Vaults

### GET /vaults/ 🔒

Lister tous les coffres de l'utilisateur.

**Query Parameters**
- `active_only` (bool, default: true) : Filtrer les coffres actifs uniquement

**Response** `200 OK`
```json
[
  {
    "id": "vault123",
    "name": "Vacances 2025",
    "current_amount": 1500.00,
    "target_amount": 3000.00,
    "unlock_date": "2025-07-01",
    "flexibility_percentage": 10.0,
    "flexibility_used": 0.0,
    "flexibility_available": 150.00,
    "is_locked": true,
    "is_active": true,
    "progress_percentage": 50.0,
    "created_at": "2025-01-15T10:30:00"
  }
]
```

---

### POST /vaults/ 🔒

Créer un nouveau coffre.

**Request Body**
```json
{
  "name": "Vacances 2025",
  "target_amount": 3000.00,
  "unlock_date": "2025-07-01",
  "flexibility_percentage": 10.0
}
```

**Contraintes**
- `name` : 1-100 caractères
- `target_amount` : > 0
- `unlock_date` : Date future
- `flexibility_percentage` : 0-10

**Response** `201 Created`
```json
{
  "id": "vault456",
  "name": "Vacances 2025",
  "current_amount": 0.0,
  "target_amount": 3000.00,
  "unlock_date": "2025-07-01",
  "flexibility_percentage": 10.0,
  "flexibility_used": 0.0,
  "flexibility_available": 0.0,
  "is_locked": true,
  "is_active": true,
  "progress_percentage": 0.0,
  "created_at": "2025-01-15T18:45:00"
}
```

---

### GET /vaults/{vault_id} 🔒

Récupérer un coffre spécifique.

**Path Parameters**
- `vault_id` (string) : ID du coffre

**Response** `200 OK`

Même format que la création.

**Errors**
- `404` : Coffre non trouvé
- `403` : Non autorisé

---

### POST /vaults/{vault_id}/deposit 🔒

Déposer de l'argent dans un coffre.

**Path Parameters**
- `vault_id` (string) : ID du coffre

**Request Body**
```json
{
  "amount": 100.00
}
```

**Response** `200 OK`

Coffre mis à jour avec le nouveau solde.

**Side Effects**
- `current_amount` augmenté
- `discipline_score` +1

---

### DELETE /vaults/{vault_id} 🔒

Fermer un coffre (uniquement si débloqué et vide).

**Response** `204 No Content`

**Errors**
- `400` : Coffre verrouillé ou non vide

---

## Withdrawals

### POST /withdrawals/preview 🔒

Prévisualiser un retrait avec calcul des frais.

**Request Body**
```json
{
  "vault_id": "vault123",
  "amount": 100.00,
  "is_early_withdrawal": true
}
```

**Response** `200 OK`
```json
{
  "vault_id": "vault123",
  "amount": 100.00,
  "fee": 1.00,
  "fee_percentage": 1.0,
  "net_amount": 99.00,
  "flexibility_remaining": 50.00,
  "can_withdraw": true,
  "message": "Withdrawal available"
}
```

**Messages possibles**
- `"Withdrawal available"` : Retrait possible
- `"Insufficient funds"` : Solde insuffisant
- `"Exceeds flexibility limit (X€ available)"` : Dépasse la flexibilité

---

### POST /withdrawals/ 🔒

Effectuer un retrait.

**Request Body**
```json
{
  "vault_id": "vault123",
  "amount": 100.00,
  "is_early_withdrawal": true
}
```

**Response** `201 Created`
```json
{
  "id": "withdrawal789",
  "vault_id": "vault123",
  "amount": 100.00,
  "fee": 1.00,
  "net_amount": 99.00,
  "is_early": true,
  "status": "completed",
  "created_at": "2025-01-15T18:50:00"
}
```

**Side Effects**
- `vault.current_amount` diminué
- `vault.flexibility_used` augmenté (si anticipé)
- `user.discipline_score` -2 (si anticipé)

---

### GET /withdrawals/ 🔒

Historique des retraits.

**Query Parameters**
- `vault_id` (string, optional) : Filtrer par coffre

**Response** `200 OK`
```json
[
  {
    "id": "withdrawal789",
    "vault_id": "vault123",
    "amount": 100.00,
    "fee": 1.00,
    "net_amount": 99.00,
    "is_early": true,
    "status": "completed",
    "created_at": "2025-01-15T18:50:00"
  }
]
```

---

### GET /withdrawals/{withdrawal_id} 🔒

Récupérer un retrait spécifique.

**Response** `200 OK`

Même format que la création.

---

## Codes d'Erreur

| Code | Signification |
|------|---------------|
| `400` | Requête invalide (données manquantes/incorrectes) |
| `401` | Non authentifié (token manquant/invalide) |
| `403` | Non autorisé (ressource appartient à un autre user) |
| `404` | Ressource non trouvée |
| `409` | Conflit (email déjà utilisé) |
| `500` | Erreur serveur |

---

## Exemples avec cURL

```bash
# Inscription
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","full_name":"Test User"}'

# Créer un coffre (avec token)
curl -X POST http://localhost:8000/api/v1/vaults/ \
  -H "Authorization: Bearer eyJhbGc..." \
  -H "Content-Type: application/json" \
  -d '{"name":"Vacances","target_amount":2000,"unlock_date":"2025-12-01","flexibility_percentage":10}'

# Déposer
curl -X POST http://localhost:8000/api/v1/vaults/vault123/deposit \
  -H "Authorization: Bearer eyJhbGc..." \
  -H "Content-Type: application/json" \
  -d '{"amount":100}'
```
