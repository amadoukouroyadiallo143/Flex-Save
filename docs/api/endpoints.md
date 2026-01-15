# API Reference FlexSave

**Base URL** : `http://localhost:8000/api/v1`  
**Documentation Swagger** : `http://localhost:8000/docs`

---

## Authentification

Toutes les routes marquées 🔒 nécessitent un token Firebase dans le header :

```
Authorization: Bearer <firebase_id_token>
```

Les routes marquées 👑 nécessitent également le rôle `admin`.

---

## Auth

### POST /auth/register

Créer un nouvel utilisateur dans Firebase et Firestore.

**Request**
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
| Code | Description |
|------|-------------|
| 400 | Données invalides |
| 409 | Email déjà utilisé |

---

### POST /auth/verify-token

Vérifier un token Firebase et récupérer l'utilisateur.

**Query** : `?token=<firebase_id_token>`

**Response** `200 OK`
```json
{
  "id": "abc123",
  "email": "user@example.com",
  "full_name": "Jean Dupont",
  "role": "user",
  "discipline_score": 50.0,
  "is_premium": false,
  "is_active": true
}
```

---

## Users 🔒

### GET /users/me

Profil de l'utilisateur connecté.

**Response** `200 OK`
```json
{
  "id": "abc123",
  "email": "user@example.com",
  "full_name": "Jean Dupont",
  "role": "user",
  "discipline_score": 65.0,
  "is_premium": false,
  "is_active": true,
  "notification_enabled": true
}
```

---

### PATCH /users/me

Modifier le profil.

**Request**
```json
{
  "full_name": "Jean-Pierre Dupont",
  "notification_enabled": false
}
```

---

### GET /users/me/stats

Statistiques d'épargne.

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

## Vaults 🔒

### GET /vaults/

Liste des coffres de l'utilisateur.

**Query** : `?active_only=true` (default)

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

### POST /vaults/

Créer un coffre.

**Request**
```json
{
  "name": "Vacances 2025",
  "target_amount": 3000.00,
  "unlock_date": "2025-07-01",
  "flexibility_percentage": 10.0
}
```

**Contraintes**
| Champ | Règle |
|-------|-------|
| name | 1-100 caractères |
| target_amount | > 0 |
| unlock_date | Date future |
| flexibility_percentage | 0-10 |

---

### GET /vaults/{vault_id}

Détails d'un coffre.

---

### POST /vaults/{vault_id}/deposit

Déposer de l'argent.

**Request**
```json
{
  "amount": 100.00
}
```

**Effects**
- `current_amount` augmenté
- `discipline_score` +1
- Notification créée

---

### DELETE /vaults/{vault_id}

Fermer un coffre (doit être débloqué et vide).

---

## Withdrawals 🔒

### POST /withdrawals/preview

Prévisualiser un retrait avec calcul des frais.

**Request**
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

**Messages**
| Message | Signification |
|---------|---------------|
| `"Withdrawal available"` | OK |
| `"Insufficient funds"` | Solde insuffisant |
| `"Exceeds flexibility limit"` | Dépasse la flexibilité |

---

### POST /withdrawals/

Effectuer un retrait.

**Request**
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

**Effects**
- `vault.current_amount` diminué
- `vault.flexibility_used` augmenté (si anticipé)
- `user.discipline_score` -2 (si anticipé)
- Notification créée

---

### GET /withdrawals/

Historique des retraits.

**Query** : `?vault_id=vault123` (optionnel)

---

## Notifications 🔒

### GET /notifications/

Liste des notifications.

**Query**
- `unread_only=true` : Seulement non lues
- `limit=20` : Nombre max

**Response** `200 OK`
```json
[
  {
    "id": "notif123",
    "title": "Dépôt effectué 💰",
    "body": "100.00 € ajouté à votre coffre Vacances",
    "type": "success",
    "action_url": "/dashboard/vaults",
    "is_read": false,
    "created_at": "2025-01-15T18:45:00"
  }
]
```

---

### POST /notifications/{notification_id}/read

Marquer comme lu.

---

### POST /notifications/read-all

Marquer toutes comme lues.

---

## Transactions 🔒

### GET /transactions/

Historique unifié des transactions.

**Query** : `?limit=50`

---

## Admin 🔒👑

### GET /admin/stats

Statistiques globales de la plateforme.

**Response** `200 OK`
```json
{
  "total_users": 1234,
  "active_users": 987,
  "premium_users": 156,
  "total_vaults": 3456,
  "active_vaults": 2890,
  "total_saved": 1234567.89,
  "total_withdrawals": 456,
  "total_withdrawn": 45678.90,
  "avg_discipline_score": 68.5
}
```

---

### GET /admin/users

Liste des utilisateurs.

**Query**
- `skip=0` : Offset
- `limit=50` : Limite (max 100)
- `role=admin` : Filtrer par rôle
- `is_active=true` : Filtrer par statut

---

### GET /admin/users/{user_id}

Détails d'un utilisateur.

---

### PATCH /admin/users/{user_id}

Modifier un utilisateur.

**Request**
```json
{
  "is_active": true,
  "is_premium": true,
  "role": "admin"
}
```

---

### POST /admin/users/{user_id}/disable

Désactiver un compte.

---

### POST /admin/users/{user_id}/enable

Réactiver un compte.

---

## Codes d'Erreur

| Code | Signification |
|------|---------------|
| 400 | Requête invalide |
| 401 | Non authentifié |
| 403 | Non autorisé |
| 404 | Non trouvé |
| 409 | Conflit |
| 500 | Erreur serveur |

---

## Exemples cURL

```bash
# Inscription
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","full_name":"Test User"}'

# Créer un coffre
curl -X POST http://localhost:8000/api/v1/vaults/ \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"name":"Vacances","target_amount":2000,"unlock_date":"2025-12-01","flexibility_percentage":10}'

# Déposer
curl -X POST http://localhost:8000/api/v1/vaults/vault123/deposit \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"amount":100}'

# Stats admin
curl -X GET http://localhost:8000/api/v1/admin/stats \
  -H "Authorization: Bearer <admin_token>"
```
