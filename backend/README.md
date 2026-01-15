# FlexSave Backend

API REST FastAPI pour FlexSave.

## Prérequis

- Python 3.11+
- Compte Firebase avec Firestore

## Installation

```bash
cd backend

# Environnement virtuel
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac

# Dépendances
pip install -r requirements.txt
```

## Configuration

```bash
# Copier le template
cp .env.example .env

# Configurer les variables
# - FIREBASE_PROJECT_ID
# - FIREBASE_SERVICE_ACCOUNT_PATH
```

## Lancer le serveur

```bash
# Développement
uvicorn app.main:app --reload

# Production
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

API disponible sur `http://localhost:8000`

Documentation Swagger: `http://localhost:8000/docs`

## Structure

```
app/
├── api/v1/         # Endpoints REST
├── core/           # Config, security, Firebase
├── models/         # Modèles Firestore
├── services/       # Logique métier
└── main.py         # Point d'entrée
```

## Tests

```bash
pytest
```

## Docker

```bash
# Développement
docker-compose up -d

# Production
docker build -t flexsave-api .
docker run -p 8000:8000 flexsave-api
```
