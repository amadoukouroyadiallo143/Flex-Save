# Configuration Firebase

Ce guide explique comment configurer Firebase pour FlexSave.

## 1. Créer un Projet Firebase

1. Aller sur [Firebase Console](https://console.firebase.google.com)
2. Cliquer sur **Ajouter un projet**
3. Nommer le projet `flexsave` (ou autre)
4. Désactiver Google Analytics (optionnel)
5. Cliquer **Créer le projet**

## 2. Activer Authentication

1. Dans le menu latéral : **Build > Authentication**
2. Cliquer **Commencer**
3. Onglet **Sign-in method**
4. Activer **Adresse e-mail/Mot de passe**
5. Sauvegarder

## 3. Créer la Base Firestore

1. Dans le menu : **Build > Firestore Database**
2. Cliquer **Créer une base de données**
3. Choisir **Mode production**
4. Sélectionner la région (europe-west1 recommandé)
5. Créer

### Règles Firestore

Dans l'onglet **Règles**, ajouter :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users : lecture/écriture par propriétaire
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Vaults : lecture/écriture par propriétaire
    match /vaults/{vaultId} {
      allow read, write: if request.auth != null 
        && resource.data.user_id == request.auth.uid;
      allow create: if request.auth != null;
    }
    
    // Withdrawals : lecture/écriture par propriétaire
    match /withdrawals/{withdrawalId} {
      allow read, write: if request.auth != null 
        && resource.data.user_id == request.auth.uid;
      allow create: if request.auth != null;
    }
  }
}
```

## 4. Configuration Backend

### Télécharger le Service Account

1. **Project Settings** (icône engrenage) > **Service accounts**
2. Cliquer **Generate new private key**
3. Sauvegarder le fichier JSON dans `backend/service-account.json`

### Configurer .env

```env
FIREBASE_PROJECT_ID=flexsave-xxxxx
FIREBASE_SERVICE_ACCOUNT_PATH=./service-account.json
```

## 5. Configuration Mobile (Flutter)

### Android

1. **Project Settings** > **Add app** > **Android**
2. Package name : `com.flexsave.flexsave_mobile`
3. Télécharger `google-services.json`
4. Placer dans `mobile/android/app/google-services.json`

### iOS

1. **Project Settings** > **Add app** > **iOS**
2. Bundle ID : `com.flexsave.flexsaveMobile`
3. Télécharger `GoogleService-Info.plist`
4. Placer dans `mobile/ios/Runner/GoogleService-Info.plist`

### Modifier pubspec.yaml

Les dépendances Firebase sont déjà configurées dans `pubspec.yaml`.

### Initializer Firebase dans main.dart

```dart
import 'package:firebase_core/firebase_core.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  runApp(const ProviderScope(child: FlexSaveApp()));
}
```

## 6. Configuration Web (Next.js)

### Récupérer la Config Web

1. **Project Settings** > **Add app** > **Web**
2. Copier la configuration Firebase

### Configurer .env.local

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=flexsave-xxxxx.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=flexsave-xxxxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=flexsave-xxxxx.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

## 7. Test de la Configuration

### Backend

```bash
cd backend
python -c "from app.core.firebase import get_firebase_app; print('Firebase OK:', get_firebase_app())"
```

### Mobile

```bash
cd mobile
flutter run
# L'app doit démarrer sans erreur Firebase
```

## Dépannage

### Erreur "No Firebase App"

- Vérifier que `service-account.json` existe
- Vérifier le chemin dans `.env`

### Erreur "Permission denied"

- Vérifier les règles Firestore
- Vérifier que l'utilisateur est authentifié

### Erreur "google-services.json not found"

- Vérifier le placement du fichier
- Rebuild : `flutter clean && flutter pub get`
