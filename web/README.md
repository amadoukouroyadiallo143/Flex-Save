# FlexSave Web

Landing page Next.js pour FlexSave.

## Prérequis

- Node.js 18+

## Installation

```bash
cd web
npm install
```

## Configuration

```bash
# Copier le template
cp .env.example .env.local

# Configurer (optionnel pour la landing)
# - NEXT_PUBLIC_API_URL
# - Firebase config
```

## Lancer

```bash
# Développement
npm run dev

# Build production
npm run build
npm start
```

Site disponible sur `http://localhost:3000`

## Structure

```
src/app/
├── globals.css    # Styles globaux
├── layout.tsx     # Layout racine
└── page.tsx       # Landing page
```

## Déploiement

### Vercel (recommandé)

```bash
npm i -g vercel
vercel
```

### Docker

```bash
docker build -t flexsave-web .
docker run -p 3000:3000 flexsave-web
```
