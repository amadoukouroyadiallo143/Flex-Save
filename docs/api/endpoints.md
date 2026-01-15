# API Endpoints

Base URL: `http://localhost:8000/api/v1`

## Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/login` | Connexion |
| POST | `/auth/register` | Inscription |
| POST | `/auth/refresh` | Rafraîchir token |

## Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users/me` | Profil utilisateur |
| PATCH | `/users/me` | Modifier profil |
| GET | `/users/me/stats` | Statistiques |

## Vaults (Coffres)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/vaults/` | Liste des coffres |
| POST | `/vaults/` | Créer un coffre |
| GET | `/vaults/{id}` | Détails d'un coffre |
| POST | `/vaults/{id}/deposit` | Déposer |
| DELETE | `/vaults/{id}` | Fermer coffre |

## Withdrawals (Retraits)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/withdrawals/preview` | Prévisualiser retrait |
| POST | `/withdrawals/` | Effectuer retrait |
| GET | `/withdrawals/` | Historique |
| GET | `/withdrawals/{id}` | Détails retrait |

## Exemples

### Créer un coffre

```http
POST /api/v1/vaults/
Content-Type: application/json
Authorization: Bearer {token}

{
  "name": "Vacances",
  "target_amount": 2000,
  "unlock_date": "2026-06-15",
  "flexibility_percentage": 10
}
```

### Prévisualiser un retrait

```http
POST /api/v1/withdrawals/preview
Content-Type: application/json
Authorization: Bearer {token}

{
  "vault_id": "abc123",
  "amount": 100,
  "is_early_withdrawal": true
}
```
