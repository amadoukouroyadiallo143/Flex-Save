<p align="center">
  <img src="https://img.shields.io/badge/FlexSave-💰_Épargne_Intelligente-10B981?style=for-the-badge" alt="FlexSave"/>
</p>

<h1 align="center">FlexSave</h1>

<p align="center">
  <strong>Épargnez avec discipline, gardez votre liberté</strong>
</p>

<p align="center">
  <a href="#-fonctionnalités">Fonctionnalités</a> •
  <a href="#-démo">Démo</a> •
  <a href="#-installation">Installation</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-api">API</a> •
  <a href="#-contribuer">Contribuer</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.11+-3776AB?style=flat-square&logo=python&logoColor=white" alt="Python"/>
  <img src="https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white" alt="FastAPI"/>
  <img src="https://img.shields.io/badge/Flutter-02569B?style=flat-square&logo=flutter&logoColor=white" alt="Flutter"/>
  <img src="https://img.shields.io/badge/Next.js_14-000000?style=flat-square&logo=next.js&logoColor=white" alt="Next.js"/>
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black" alt="Firebase"/>
  <img src="https://img.shields.io/badge/shadcn/ui-000000?style=flat-square&logo=shadcnui&logoColor=white" alt="shadcn/ui"/>
</p>

---

## 🎯 À propos

**FlexSave** est une application d'épargne moderne qui vous permet de bloquer votre argent jusqu'à une date définie tout en conservant une **flexibilité de 10%** pour les imprévus.

### Le concept

| Traditionnel | FlexSave |
|--------------|----------|
| ❌ Argent 100% bloqué | ✅ 10% accessible en urgence |
| ❌ Pas de suivi | ✅ Score de discipline |
| ❌ Un seul compte | ✅ Coffres multiples |
| ❌ Pas de transparence | ✅ Frais clairs (1%) |

---

## ✨ Fonctionnalités

### Pour les utilisateurs

| Fonctionnalité | Description |
|----------------|-------------|
| 🏦 **Coffres multiples** | Créez des coffres pour chaque objectif |
| 📅 **Date de déblocage** | Choisissez quand récupérer votre argent |
| 🔓 **10% de flexibilité** | Retirez jusqu'à 10% en cas d'urgence |
| 💸 **1% de frais** | Uniquement sur les retraits anticipés |
| 📈 **Score de discipline** | Suivez vos progrès (+1 dépôt, -2 retrait) |
| 🔔 **Notifications** | Rappels et encouragements |
| 📊 **Historique complet** | Toutes vos transactions |

### Pour les administrateurs

| Fonctionnalité | Description |
|----------------|-------------|
| 👥 **Gestion utilisateurs** | Liste, recherche, activation/désactivation |
| 📊 **Statistiques globales** | Utilisateurs, coffres, épargne totale |
| 🔍 **Monitoring coffres** | Voir tous les coffres de la plateforme |
| ⚙️ **Configuration** | Paramètres de la plateforme |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENTS                               │
├────────────────────────┬────────────────────────────────────┤
│   📱 Mobile (Flutter)   │          🌐 Web (Next.js 14)       │
│   • Riverpod           │          • shadcn/ui               │
│   • GoRouter           │          • TailwindCSS             │
│   • Firebase Auth      │          • App Router              │
└────────────────────────┴────────────────────────────────────┘
                              │
                              ▼ REST API (HTTPS)
┌─────────────────────────────────────────────────────────────┐
│                    🔧 BACKEND (FastAPI)                      │
├─────────────────────────────────────────────────────────────┤
│  /api/v1                                                     │
│  ├── /auth          → Inscription, vérification token       │
│  ├── /users         → Profil, stats, préférences            │
│  ├── /vaults        → CRUD coffres, dépôts                  │
│  ├── /withdrawals   → Retraits avec calcul frais            │
│  ├── /notifications → Système de notifications              │
│  ├── /transactions  → Historique unifié                     │
│  └── /admin         → Gestion plateforme (admin only)       │
└─────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┴───────────────┐
              ▼                               ▼
┌─────────────────────────┐   ┌─────────────────────────────┐
│   🔥 Firebase           │   │   💳 Stripe (futur)          │
│   • Authentication      │   │   • Stripe Treasury          │
│   • Firestore DB        │   │   • Paiements                │
│   • Cloud Messaging     │   │   • Connecté bancaire        │
└─────────────────────────┘   └─────────────────────────────┘
```

---

## 📁 Structure du Projet

```
flexsave/
├── 📂 backend/                 # API FastAPI
│   ├── app/
│   │   ├── api/v1/endpoints/   # 7 routers (auth, users, vaults...)
│   │   ├── core/               # Config, security, Firebase
│   │   ├── models/             # User, Vault, Withdrawal, Deposit
│   │   └── services/           # Business logic, notifications
│   └── tests/
│
├── 📂 mobile/                  # Application Flutter
│   └── lib/
│       ├── core/               # API client, router, models
│       ├── features/           # Auth, Home, Vaults (screens)
│       └── shared/             # Theme, widgets
│
├── 📂 web/                     # Application Next.js 14
│   └── src/
│       ├── app/
│       │   ├── (landing)/      # Page d'accueil
│       │   ├── login/          # Authentification
│       │   ├── register/
│       │   ├── dashboard/      # Espace utilisateur
│       │   │   ├── vaults/     # Gestion coffres
│       │   │   ├── history/    # Historique
│       │   │   └── settings/   # Paramètres
│       │   └── admin/          # Panel administrateur
│       │       ├── users/      # Gestion utilisateurs
│       │       ├── vaults/     # Monitoring coffres
│       │       ├── statistics/ # Analytics
│       │       └── settings/   # Config plateforme
│       ├── components/ui/      # 20+ composants shadcn/ui
│       └── lib/                # API client, auth context
│
└── 📂 docs/                    # Documentation
    ├── api/endpoints.md        # Référence API complète
    ├── architecture/overview.md
    └── FIREBASE_SETUP.md       # Guide configuration Firebase
```

---

## 🚀 Installation

### Prérequis

| Composant | Version |
|-----------|---------|
| Python | 3.11+ |
| Node.js | 18+ |
| Flutter | 3.16+ |
| Firebase | Projet configuré |

### 1. Cloner le projet

```bash
git clone https://github.com/amadoukouroyadiallo143/Flex-Save.git
cd Flex-Save
```

### 2. Backend

```bash
cd backend

# Environnement virtuel
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows

# Dépendances
pip install -r requirements.txt

# Configuration
cp .env.example .env
# Éditer .env avec vos valeurs Firebase

# Lancer
uvicorn app.main:app --reload
```

📍 API disponible sur `http://localhost:8000`  
📖 Documentation Swagger : `http://localhost:8000/docs`

### 3. Web

```bash
cd web

# Dépendances
npm install

# Configuration
cp .env.example .env.local
# Éditer .env.local

# Lancer
npm run dev
```

📍 Site disponible sur `http://localhost:3000`

### 4. Mobile

```bash
cd mobile

# Dépendances
flutter pub get

# Configuration Firebase (voir docs/FIREBASE_SETUP.md)
# - android/app/google-services.json
# - ios/Runner/GoogleService-Info.plist

# Lancer
flutter run
```

---

## 🔌 API Reference

**Base URL** : `http://localhost:8000/api/v1`

### Authentification

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/auth/register` | Inscription |
| POST | `/auth/verify-token` | Vérifier token |

### Utilisateurs 🔒

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/users/me` | Profil |
| PATCH | `/users/me` | Modifier profil |
| GET | `/users/me/stats` | Statistiques |

### Coffres 🔒

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/vaults/` | Liste coffres |
| POST | `/vaults/` | Créer coffre |
| GET | `/vaults/{id}` | Détails coffre |
| POST | `/vaults/{id}/deposit` | Déposer |
| DELETE | `/vaults/{id}` | Fermer coffre |

### Retraits 🔒

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/withdrawals/preview` | Prévisualiser (calcul frais) |
| POST | `/withdrawals/` | Effectuer retrait |
| GET | `/withdrawals/` | Historique |

### Notifications 🔒

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/notifications/` | Liste notifications |
| POST | `/notifications/{id}/read` | Marquer comme lu |
| POST | `/notifications/read-all` | Tout marquer lu |

### Admin 🔒👑

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/admin/stats` | Stats globales |
| GET | `/admin/users` | Liste utilisateurs |
| PATCH | `/admin/users/{id}` | Modifier utilisateur |
| POST | `/admin/users/{id}/disable` | Désactiver compte |

🔒 = Token requis • 👑 = Admin uniquement

---

## 🛠️ Technologies

### Backend
- **FastAPI** - Framework API moderne
- **Pydantic** - Validation des données
- **Firebase Admin SDK** - Auth & Firestore
- **Python 3.11+** - Typage moderne

### Web
- **Next.js 14** - App Router, RSC
- **shadcn/ui** - 20+ composants UI
- **TailwindCSS** - Styling
- **Lucide** - Icônes

### Mobile
- **Flutter 3.16+** - Cross-platform
- **Riverpod** - State management
- **GoRouter** - Navigation
- **Dio** - HTTP client

---

## 🧪 Tests

```bash
# Backend
cd backend
pytest

# Mobile
cd mobile
flutter test
```

---

## 🐳 Docker

```bash
# Backend
cd backend
docker-compose up -d

# Build production
docker build -t flexsave-api .
```

---

## 📊 Variables d'Environnement

### Backend (`.env`)

```env
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_SERVICE_ACCOUNT_PATH=./service-account.json
SECRET_KEY=your-secret-key
```

### Web (`.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
```

---

## 🤝 Contribuer

Les contributions sont bienvenues ! Voir [CONTRIBUTING.md](CONTRIBUTING.md)

```bash
# Fork → Clone → Branch → Commit → Push → PR
git checkout -b feature/amazing
git commit -m "feat: add amazing feature"
git push origin feature/amazing
```

---

## 📄 Licence

[MIT](LICENSE) © 2025 Diallo Amadou

---

<p align="center">
  <strong>Fait avec ❤️ par <a href="https://github.com/amadoukouroyadiallo143">Diallo Amadou</a></strong>
</p>
