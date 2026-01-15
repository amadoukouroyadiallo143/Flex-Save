# FlexSave 💰

[![Backend CI](https://github.com/your-org/flexsave/workflows/Backend%20CI/badge.svg)](https://github.com/your-org/flexsave/actions)
[![Web CI](https://github.com/your-org/flexsave/workflows/Web%20CI/badge.svg)](https://github.com/your-org/flexsave/actions)
[![Mobile CI](https://github.com/your-org/flexsave/workflows/Mobile%20CI/badge.svg)](https://github.com/your-org/flexsave/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **Épargne intelligente avec liberté contrôlée** – Bloquez votre argent, gardez jusqu'à 10% de flexibilité.

---

## 🎯 Vision

FlexSave est une application d'épargne intelligente qui permet de bloquer son argent jusqu'à une date tout en conservant une liberté de retrait limitée (jusqu'à 10%).

**Objectif** : Aider les utilisateurs à épargner avec discipline sans les enfermer.

---

## ✨ Fonctionnalités

| Fonctionnalité | Description |
|----------------|-------------|
| 🏦 **Coffres multiples** | Créez plusieurs coffres avec différents objectifs |
| 📅 **Date de déblocage** | Définissez quand votre argent sera disponible |
| 🔓 **Flexibilité 10%** | Retirez jusqu'à 10% avant échéance |
| 🎯 **Objectifs** | Suivez vos progrès d'épargne |
| 👥 **Group Save** | Épargnez en groupe (tontine moderne) |
| 📊 **Score discipline** | Mesurez votre constance |
| 🔔 **Notifications** | Alertes intelligentes |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENTS                               │
├─────────────────────┬───────────────────────────────────────┤
│   📱 Mobile         │              🌐 Web                    │
│   Flutter           │              Next.js                   │
└─────────────────────┴───────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      🔧 BACKEND                              │
│                      FastAPI (Python)                        │
├─────────────────────────────────────────────────────────────┤
│  Auth  │  Vaults  │  Withdrawals  │  Users  │  Webhooks     │
└─────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┴───────────────┐
              ▼                               ▼
┌─────────────────────────┐   ┌─────────────────────────────┐
│   🔥 Firebase           │   │   💳 Stripe Treasury         │
│   Firestore             │   │   Paiements & Comptes        │
└─────────────────────────┘   └─────────────────────────────┘
```

---

## 📁 Structure du Projet

```
flexsave/
├── backend/          # API FastAPI (Python)
├── web/              # Application Next.js
├── mobile/           # Application Flutter
├── docs/             # Documentation
└── .github/          # CI/CD & Templates
```

---

## 🚀 Démarrage Rapide

### Prérequis

- Python 3.11+
- Node.js 18+
- Flutter 3.16+
- Docker (optionnel)

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

### Web

```bash
cd web
npm install
cp .env.example .env.local
npm run dev
```

### Mobile

```bash
cd mobile
flutter pub get
flutter run
```

---

## 🔧 Configuration

Voir les fichiers `.env.example` dans chaque sous-projet pour les variables d'environnement requises.

---

## 📖 Documentation

- [Architecture](docs/architecture/overview.md)
- [API Endpoints](docs/api/endpoints.md)
- [Guide de Contribution](CONTRIBUTING.md)

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Voir [CONTRIBUTING.md](CONTRIBUTING.md) pour commencer.

---

## 📄 Licence

Ce projet est sous licence MIT. Voir [LICENSE](LICENSE) pour plus de détails.

---

## 👤 Auteur

**Diallo Amadou** – Fondateur, 2025

---

<p align="center">
  <strong>FlexSave</strong> – L'épargne intelligente pour tous 🚀
</p>
