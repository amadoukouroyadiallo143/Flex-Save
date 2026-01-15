<p align="center">
  <img src="https://img.shields.io/badge/FlexSave-Épargne_Intelligente-10B981?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyem0wIDE4Yy00LjQxIDAtOC0zLjU5LTgtOHMzLjU5LTggOC04IDggMy41OSA4IDgtMy41OSA4LTggOHptLjMxLTguODZjLTEuNzctLjQ1LTIuMzQtLjk0LTIuMzQtMS42NyAwLS44NC43OS0xLjQzIDIuMS0xLjQzIDEuMzggMCAxLjkuNjYgMS45NCAxLjY0aDEuNzFjLS4wNS0xLjM0LS44Ny0yLjU3LTIuNDktMi45N1Y1SDEwLjl2MS42OWMtMS41MS4zMi0yLjcyIDEuMy0yLjcyIDIuODEgMCAxLjc5IDEuNDkgMi42OSAzLjY2IDMuMjEgMS45NS40NiAyLjM0IDEuMTUgMi4zNCAxLjg3IDAgLjUzLS4zOSAxLjM5LTIuMSAxLjM5LTEuNiAwLTIuMjMtLjcyLTIuMzItMS42NEg4LjA0Yy4xIDEuNyAxLjM2IDIuNjYgMi44NiAyLjk3VjE5aDIuMzR2LTEuNjdjMS41Mi0uMjkgMi43Mi0xLjE2IDIuNzItMi43NCAwLTIuMi0xLjktMi45Ni0zLjY2LTMuNDV6Ii8+PC9zdmc+" alt="FlexSave Logo"/>
</p>

<h1 align="center">FlexSave 💰</h1>

<p align="center">
  <strong>Épargnez avec discipline, gardez votre liberté</strong>
</p>

<p align="center">
  <a href="#fonctionnalités">Fonctionnalités</a> •
  <a href="#démo">Démo</a> •
  <a href="#installation">Installation</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#api">API</a> •
  <a href="#contribuer">Contribuer</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/fastapi-009688?style=flat-square&logo=fastapi&logoColor=white" alt="FastAPI"/>
  <img src="https://img.shields.io/badge/flutter-02569B?style=flat-square&logo=flutter&logoColor=white" alt="Flutter"/>
  <img src="https://img.shields.io/badge/next.js-000000?style=flat-square&logo=next.js&logoColor=white" alt="Next.js"/>
  <img src="https://img.shields.io/badge/firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black" alt="Firebase"/>
  <img src="https://img.shields.io/badge/stripe-008CDD?style=flat-square&logo=stripe&logoColor=white" alt="Stripe"/>
</p>

---

## 🎯 À propos

**FlexSave** est une application d'épargne moderne qui vous permet de bloquer votre argent jusqu'à une date définie tout en conservant une **flexibilité de 10%** pour les imprévus.

### Pourquoi FlexSave ?

- 🔒 **Discipline** : Votre argent est bloqué jusqu'à la date choisie
- 🔓 **Flexibilité** : 10% accessible en cas d'urgence (1% de frais)
- 📊 **Score de discipline** : Suivez vos progrès d'épargne
- 🎯 **Multi-objectifs** : Créez plusieurs coffres pour différents projets

---

## ✨ Fonctionnalités

| Fonctionnalité | Description |
|----------------|-------------|
| 🏦 **Coffres multiples** | Vacances, voiture, urgences, projets... |
| 📅 **Date de déblocage** | Choisissez quand récupérer votre argent |
| 🔓 **10% de flexibilité** | Retirez jusqu'à 10% en cas de besoin |
| 💸 **1% de frais seulement** | Sur les retraits anticipés uniquement |
| 📈 **Score de discipline** | +1 par dépôt, -2 par retrait anticipé |
| 🔔 **Notifications** | Rappels et encouragements |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENTS                               │
├─────────────────────┬───────────────────────────────────────┤
│   📱 Mobile         │              🌐 Web                    │
│   Flutter           │              Next.js 14                │
│   Riverpod          │              TailwindCSS               │
└─────────────────────┴───────────────────────────────────────┘
                              │
                              ▼ REST API (HTTPS)
┌─────────────────────────────────────────────────────────────┐
│                      🔧 BACKEND                              │
│                      FastAPI (Python 3.11+)                  │
├─────────────────────────────────────────────────────────────┤
│  API v1  │  Services  │  Models  │  Core (Auth, Config)     │
└─────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┴───────────────┐
              ▼                               ▼
┌─────────────────────────┐   ┌─────────────────────────────┐
│   🔥 Firebase           │   │   💳 Stripe Treasury         │
│   • Firestore (DB)      │   │   • Comptes financiers       │
│   • Authentication      │   │   • Paiements                │
└─────────────────────────┘   └─────────────────────────────┘
```

---

## 📁 Structure du Projet

```
flexsave/
├── 📂 backend/              # API FastAPI
│   ├── app/
│   │   ├── api/v1/          # Endpoints REST
│   │   ├── core/            # Config, security, Firebase
│   │   ├── models/          # Modèles Firestore
│   │   └── services/        # Logique métier
│   ├── tests/               # Tests unitaires
│   ├── Dockerfile           # Container production
│   └── requirements.txt     # Dépendances Python
│
├── 📂 mobile/               # Application Flutter
│   ├── lib/
│   │   ├── core/            # Router, API client, models
│   │   ├── features/        # Auth, Home, Vaults
│   │   └── shared/          # Theme, Widgets communs
│   ├── android/             # Config Android
│   └── ios/                 # Config iOS
│
├── 📂 web/                  # Landing Page Next.js
│   └── src/app/             # App Router
│
├── 📂 docs/                 # Documentation
│   ├── api/                 # API reference
│   └── architecture/        # Schémas architecture
│
└── 📂 .github/              # CI/CD workflows
```

---

## 🚀 Installation

### Prérequis

- **Backend** : Python 3.11+
- **Mobile** : Flutter 3.16+
- **Web** : Node.js 18+
- Compte **Firebase** avec Firestore
- Compte **Stripe** (optionnel pour Stripe Treasury)

### 1. Configuration Firebase

```bash
# 1. Créer un projet Firebase : https://console.firebase.google.com

# 2. Activer Authentication (Email/Password)

# 3. Créer une base Firestore

# 4. Télécharger le service account JSON
#    Project Settings > Service Accounts > Generate new private key
#    Sauvegarder dans: backend/service-account.json
```

### 2. Backend

```bash
cd backend

# Créer l'environnement virtuel
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac

# Installer les dépendances
pip install -r requirements.txt

# Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos valeurs

# Lancer le serveur
uvicorn app.main:app --reload
```

Le backend sera disponible sur `http://localhost:8000`

### 3. Web

```bash
cd web

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local
# Éditer .env.local

# Lancer le serveur de développement
npm run dev
```

La landing page sera disponible sur `http://localhost:3000`

### 4. Mobile

```bash
cd mobile

# Installer les dépendances
flutter pub get

# Configuration Firebase (voir docs/FIREBASE_SETUP.md)
# - Ajouter google-services.json dans android/app/
# - Ajouter GoogleService-Info.plist dans ios/Runner/

# Lancer l'application
flutter run
```

---

## 🔌 API Reference

Base URL: `http://localhost:8000/api/v1`

### Authentication

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `POST` | `/auth/register` | Inscription |
| `POST` | `/auth/verify-token` | Vérifier token Firebase |

### Users

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `GET` | `/users/me` | Profil utilisateur 🔒 |
| `PATCH` | `/users/me` | Modifier profil 🔒 |
| `GET` | `/users/me/stats` | Statistiques 🔒 |

### Vaults

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `GET` | `/vaults/` | Liste des coffres 🔒 |
| `POST` | `/vaults/` | Créer un coffre 🔒 |
| `GET` | `/vaults/{id}` | Détails d'un coffre 🔒 |
| `POST` | `/vaults/{id}/deposit` | Déposer 🔒 |
| `DELETE` | `/vaults/{id}` | Fermer un coffre 🔒 |

### Withdrawals

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `POST` | `/withdrawals/preview` | Prévisualiser retrait 🔒 |
| `POST` | `/withdrawals/` | Effectuer retrait 🔒 |
| `GET` | `/withdrawals/` | Historique 🔒 |

🔒 = Nécessite token Firebase dans header `Authorization: Bearer <token>`

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
# Backend seulement
cd backend
docker-compose up -d

# Ou build production
docker build -t flexsave-api .
docker run -p 8000:8000 flexsave-api
```

---

## 📊 Variables d'Environnement

### Backend (.env)

```env
# API
API_V1_PREFIX=/api/v1
CORS_ORIGINS=["http://localhost:3000","http://localhost:8080"]

# Firebase
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_SERVICE_ACCOUNT_PATH=./service-account.json

# Stripe (optionnel)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Mobile

Configurer `lib/core/api_client.dart` :
```dart
const String _baseUrl = 'http://10.0.2.2:8000/api/v1'; // Android
// const String _baseUrl = 'http://localhost:8000/api/v1'; // iOS
```

---

## 🤝 Contribuer

Les contributions sont les bienvenues ! Voir [CONTRIBUTING.md](CONTRIBUTING.md) pour les guidelines.

```bash
# 1. Fork le projet
# 2. Créer une branche
git checkout -b feature/amazing-feature

# 3. Commit
git commit -m 'feat: add amazing feature'

# 4. Push
git push origin feature/amazing-feature

# 5. Ouvrir une Pull Request
```

---

## 📄 License

[MIT](LICENSE) © 2025 Diallo Amadou

---

<p align="center">
  Fait avec ❤️ par <a href="https://github.com/amadoukouroyadiallo143">Diallo Amadou</a>
</p>
