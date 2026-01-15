/// FlexSave Environment Configuration
/// 
/// Ce fichier contient les variables d'environnement pour l'app mobile.
/// Modifier les valeurs selon votre environnement.
library;

class Env {
  // API Backend
  static const String apiBaseUrl = String.fromEnvironment(
    'API_BASE_URL',
    defaultValue: 'http://10.0.2.2:8000/api/v1', // Android emulator
  );

  // Pour iOS simulator, utiliser: 'http://localhost:8000/api/v1'
  // Pour device physique, utiliser l'IP de votre machine

  // Timeouts
  static const int connectTimeout = 10000; // 10 seconds
  static const int receiveTimeout = 10000;

  // Feature Flags
  static const bool enableAnalytics = false;
  static const bool enableCrashlytics = false;

  // Debug
  static const bool isDebug = true;
}
