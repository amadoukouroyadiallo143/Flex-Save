# FlexSave Mobile

Application mobile Flutter pour FlexSave.

## Prérequis

- Flutter 3.16+
- Compte Firebase configuré

## Installation

```bash
# Cloner et installer
cd mobile
flutter pub get
```

## Configuration Firebase

### Android

1. Créer une app Android dans Firebase Console
2. Package name: `com.flexsave.flexsave_mobile`
3. Télécharger `google-services.json`
4. Placer dans `android/app/google-services.json`

### iOS

1. Créer une app iOS dans Firebase Console
2. Bundle ID: `com.flexsave.flexsaveMobile`
3. Télécharger `GoogleService-Info.plist`
4. Placer dans `ios/Runner/GoogleService-Info.plist`

## Lancer l'application

```bash
# Mode debug
flutter run

# Build Android
flutter build apk

# Build iOS
flutter build ios
```

## Structure

```
lib/
├── core/           # API client, router, models
├── features/       # Auth, Home, Vaults
├── shared/         # Theme, widgets communs
└── main.dart       # Point d'entrée
```

## Variables d'environnement

Modifier `lib/core/env.dart` :

```dart
static const String apiBaseUrl = 'http://YOUR_IP:8000/api/v1';
```

- **Android emulator** : `10.0.2.2`
- **iOS simulator** : `localhost`
- **Device physique** : IP de votre machine
