# Architecture FlexSave

## Vue d'ensemble

FlexSave est construit sur une architecture moderne, scalable et maintenable.

## Diagramme Global

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENTS                               │
├─────────────────────┬───────────────────────────────────────┤
│   📱 Mobile         │              🌐 Web                    │
│   Flutter 3.16+     │              Next.js 14                │
│   Riverpod          │              TailwindCSS               │
│   GoRouter          │              App Router                │
└─────────────────────┴───────────────────────────────────────┘
                              │
                              │ HTTPS / REST API
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      🔧 BACKEND API                          │
│                      FastAPI (Python 3.11+)                  │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐             │
│  │  API v1    │  │  Services  │  │   Models   │             │
│  │  Endpoints │──│  Business  │──│  Firestore │             │
│  │            │  │  Logic     │  │            │             │
│  └────────────┘  └────────────┘  └────────────┘             │
│                                                              │
│  ┌────────────────────────────────────────────┐             │
│  │                 CORE                        │             │
│  │  Config │ Security │ Firebase │ Middleware  │             │
│  └────────────────────────────────────────────┘             │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┴───────────────┐
              ▼                               ▼
┌─────────────────────────┐   ┌─────────────────────────────┐
│   🔥 Firebase           │   │   💳 Stripe Treasury         │
│                         │   │                              │
│   ├─ Authentication     │   │   ├─ Financial Accounts      │
│   │  └─ Email/Password  │   │   ├─ Transactions            │
│   │                     │   │   ├─ Deposits                │
│   ├─ Firestore          │   │   └─ Withdrawals             │
│   │  ├─ users           │   │                              │
│   │  ├─ vaults          │   └─────────────────────────────┘
│   │  └─ withdrawals     │
│   │                     │
│   └─ Cloud Messaging    │
│      └─ Notifications   │
│                         │
└─────────────────────────┘
```

## Stack Technique

| Composant | Technologie | Version |
|-----------|-------------|---------|
| **Mobile** | Flutter | 3.16+ |
| **State Management** | Riverpod | 2.x |
| **Navigation Mobile** | GoRouter | 13.x |
| **Web Frontend** | Next.js | 14 |
| **Styling Web** | TailwindCSS | 3.x |
| **Backend** | FastAPI | 0.109+ |
| **Runtime** | Python | 3.11+ |
| **Database** | Firestore | - |
| **Auth** | Firebase Auth | - |
| **Payments** | Stripe Treasury | - |

## Architecture Backend

### Couches

```
app/
├── api/                 # Couche Présentation
│   ├── deps.py          # Dépendances (auth guard)
│   └── v1/
│       ├── router.py    # Agrégation routes
│       └── endpoints/   # Contrôleurs REST
│           ├── auth.py
│           ├── users.py
│           ├── vaults.py
│           └── withdrawals.py
│
├── core/                # Configuration
│   ├── config.py        # Pydantic Settings
│   ├── security.py      # JWT, hashing
│   └── firebase.py      # Firebase Admin SDK
│
├── models/              # Couche Données
│   ├── user.py          # @dataclass User
│   ├── vault.py         # @dataclass Vault
│   └── withdrawal.py    # @dataclass Withdrawal
│
├── services/            # Couche Métier
│   ├── user_service.py      # CRUD users + stats
│   ├── vault_service.py     # CRUD vaults + deposit/withdraw
│   ├── withdrawal_service.py # Transactions + preview
│   └── stripe_service.py    # Stripe Treasury ops
│
└── main.py              # Point d'entrée FastAPI
```

### Patterns Utilisés

- **Repository Pattern** : Les services encapsulent l'accès Firestore
- **Dependency Injection** : FastAPI Depends pour l'auth
- **Dataclasses** : Modèles typés avec sérialisation
- **Layered Architecture** : Séparation claire des responsabilités

## Architecture Mobile (Flutter)

### Structure Feature-First

```
lib/
├── core/                    # Utilitaires partagés
│   ├── api_client.dart      # Client HTTP Dio
│   ├── router.dart          # Configuration GoRouter
│   └── models/              # Modèles de données
│       ├── user_model.dart
│       ├── vault_model.dart
│       └── withdrawal_model.dart
│
├── features/                # Modules fonctionnels
│   ├── auth/
│   │   ├── auth_provider.dart    # État auth Riverpod
│   │   ├── login_screen.dart
│   │   └── register_screen.dart
│   │
│   ├── home/
│   │   └── home_screen.dart      # Dashboard principal
│   │
│   └── vaults/
│       ├── vault_provider.dart       # État vaults Riverpod
│       ├── create_vault_screen.dart
│       └── vault_detail_screen.dart
│
├── shared/                  # UI partagé
│   ├── theme/
│   │   └── app_theme.dart   # Material 3 theme
│   └── widgets/             # Composants réutilisables
│
└── main.dart                # Point d'entrée
```

### State Management (Riverpod)

```dart
// Providers principaux
authStateProvider      → Stream<User?>     // État Firebase Auth
currentUserProvider    → Future<UserModel> // User depuis API
userStatsProvider      → Future<UserStats> // Statistiques

vaultsProvider         → Future<List<Vault>> // Liste coffres
vaultDetailProvider    → Future<Vault>       // Détail coffre
vaultOperationsProvider → StateNotifier      // CRUD operations
```

## Modèle de Données

### Collections Firestore

```
firestore/
├── users/
│   └── {userId}/
│       ├── email: string
│       ├── full_name: string
│       ├── discipline_score: float (0-100)
│       ├── is_premium: boolean
│       └── created_at: timestamp
│
├── vaults/
│   └── {vaultId}/
│       ├── user_id: string (ref users)
│       ├── name: string
│       ├── target_amount: float
│       ├── current_amount: float
│       ├── unlock_date: date
│       ├── flexibility_percentage: float (0-10)
│       ├── flexibility_used: float
│       ├── is_active: boolean
│       └── created_at: timestamp
│
└── withdrawals/
    └── {withdrawalId}/
        ├── user_id: string
        ├── vault_id: string (ref vaults)
        ├── amount: float
        ├── fee: float
        ├── net_amount: float
        ├── is_early: boolean
        ├── status: enum (pending|completed|failed)
        └── created_at: timestamp
```

## Flux de Données

### Dépôt dans un Coffre

```
Mobile                    Backend                   Firestore
   │                         │                          │
   │ POST /vaults/{id}/deposit                          │
   │ ─────────────────────►  │                          │
   │                         │ update vault.current_amount
   │                         │ ─────────────────────────►│
   │                         │                          │
   │                         │ update user.discipline_score (+1)
   │                         │ ─────────────────────────►│
   │                         │                          │
   │     200 OK             │                          │
   │ ◄─────────────────────  │                          │
```

### Retrait Anticipé

```
Mobile                    Backend                   Firestore
   │                         │                          │
   │ POST /withdrawals/preview                          │
   │ ─────────────────────►  │                          │
   │                         │ calculate fee (1%)       │
   │                         │ check flexibility_available
   │     preview response    │                          │
   │ ◄─────────────────────  │                          │
   │                         │                          │
   │ POST /withdrawals/      │                          │
   │ ─────────────────────►  │                          │
   │                         │ update vault amounts     │
   │                         │ ─────────────────────────►│
   │                         │                          │
   │                         │ create withdrawal record │
   │                         │ ─────────────────────────►│
   │                         │                          │
   │                         │ update discipline_score (-2)
   │                         │ ─────────────────────────►│
   │     201 Created        │                          │
   │ ◄─────────────────────  │                          │
```

## Sécurité

### Authentification

1. L'utilisateur se connecte via Firebase Auth (email/password)
2. Firebase retourne un ID Token JWT
3. Le mobile envoie le token dans le header `Authorization: Bearer <token>`
4. Le backend vérifie le token avec Firebase Admin SDK
5. Le backend extrait l'UID et charge l'utilisateur depuis Firestore

### Autorisation

Chaque endpoint protégé utilise `get_current_active_user` :

```python
@router.get("/vaults/")
async def list_vaults(current_user: ActiveUser):
    # current_user est automatiquement injecté
    vaults = await vault_service.get_user_vaults(current_user.id)
    return vaults
```

Les règles Firestore ajoutent une couche de sécurité supplémentaire.
