/// FlexSave configuration
class Env {
  // API Configuration
  static const String apiBaseUrl = String.fromEnvironment(
    'API_BASE_URL',
    defaultValue: 'http://10.0.2.2:8000/api/v1', // Android emulator
  );

  static const String apiBaseUrlIOS = String.fromEnvironment(
    'API_BASE_URL_IOS',
    defaultValue: 'http://localhost:8000/api/v1',
  );

  // Firebase Configuration
  static const String firebaseProjectId = String.fromEnvironment(
    'FIREBASE_PROJECT_ID',
    defaultValue: 'flexsave-app',
  );

  // Feature Flags
  static const bool enablePremium = bool.fromEnvironment(
    'ENABLE_PREMIUM',
    defaultValue: true,
  );

  static const bool enableNotifications = bool.fromEnvironment(
    'ENABLE_NOTIFICATIONS',
    defaultValue: true,
  );

  static const bool enableBiometrics = bool.fromEnvironment(
    'ENABLE_BIOMETRICS',
    defaultValue: true,
  );

  // Timeouts
  static const int connectionTimeout = int.fromEnvironment(
    'CONNECTION_TIMEOUT',
    defaultValue: 30000,
  );

  static const int receiveTimeout = int.fromEnvironment(
    'RECEIVE_TIMEOUT',
    defaultValue: 30000,
  );

  // Business Rules
  static const double defaultFlexibility = 10.0;
  static const double earlyWithdrawalFee = 1.0;
  static const double premiumWithdrawalFee = 0.5;
  static const double maxFlexibility = 10.0;

  // Debug
  static const bool isDebug = bool.fromEnvironment(
    'DEBUG',
    defaultValue: true,
  );

  /// Get the appropriate API URL based on platform
  static String get apiUrl {
    // In a real app, detect platform and return appropriate URL
    return apiBaseUrl;
  }
}
