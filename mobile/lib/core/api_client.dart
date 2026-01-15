import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'models/models.dart';

/// Base URL for the API
const String _baseUrl = 'http://10.0.2.2:8000/api/v1'; // Android emulator
// const String _baseUrl = 'http://localhost:8000/api/v1'; // iOS simulator

/// API Client provider
final apiClientProvider = Provider<ApiClient>((ref) => ApiClient());

/// Auth token provider - will be set after login
final authTokenProvider = StateProvider<String?>((ref) => null);

/// API Client for FlexSave backend
class ApiClient {
  late final Dio _dio;

  ApiClient() {
    _dio = Dio(BaseOptions(
      baseUrl: _baseUrl,
      connectTimeout: const Duration(seconds: 10),
      receiveTimeout: const Duration(seconds: 10),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    ));

    // Add logging interceptor in debug mode
    _dio.interceptors.add(LogInterceptor(
      requestBody: true,
      responseBody: true,
    ));
  }

  /// Set auth token for authenticated requests
  void setAuthToken(String token) {
    _dio.options.headers['Authorization'] = 'Bearer $token';
  }

  /// Clear auth token
  void clearAuthToken() {
    _dio.options.headers.remove('Authorization');
  }

  // ============ Auth ============

  /// Register a new user
  Future<Map<String, dynamic>> register({
    required String email,
    required String password,
    required String fullName,
  }) async {
    final response = await _dio.post('/auth/register', data: {
      'email': email,
      'password': password,
      'full_name': fullName,
    });
    return response.data;
  }

  /// Verify token and get user
  Future<UserModel> verifyToken(String token) async {
    final response = await _dio.post('/auth/verify-token', queryParameters: {
      'token': token,
    });
    return UserModel.fromJson(response.data);
  }

  // ============ Users ============

  /// Get current user
  Future<UserModel> getCurrentUser() async {
    final response = await _dio.get('/users/me');
    return UserModel.fromJson(response.data);
  }

  /// Get user stats
  Future<UserStats> getUserStats() async {
    final response = await _dio.get('/users/me/stats');
    return UserStats.fromJson(response.data);
  }

  /// Update user
  Future<UserModel> updateUser({String? fullName, bool? notificationEnabled}) async {
    final data = <String, dynamic>{};
    if (fullName != null) data['full_name'] = fullName;
    if (notificationEnabled != null) data['notification_enabled'] = notificationEnabled;

    final response = await _dio.patch('/users/me', data: data);
    return UserModel.fromJson(response.data);
  }

  // ============ Vaults ============

  /// Get all vaults
  Future<List<VaultModel>> getVaults({bool activeOnly = true}) async {
    final response = await _dio.get('/vaults/', queryParameters: {
      'active_only': activeOnly,
    });
    return (response.data as List)
        .map((json) => VaultModel.fromJson(json))
        .toList();
  }

  /// Get single vault
  Future<VaultModel> getVault(String vaultId) async {
    final response = await _dio.get('/vaults/$vaultId');
    return VaultModel.fromJson(response.data);
  }

  /// Create vault
  Future<VaultModel> createVault({
    required String name,
    required double targetAmount,
    required DateTime unlockDate,
    double flexibilityPercentage = 10.0,
  }) async {
    final response = await _dio.post('/vaults/', data: {
      'name': name,
      'target_amount': targetAmount,
      'unlock_date': unlockDate.toIso8601String().split('T')[0],
      'flexibility_percentage': flexibilityPercentage,
    });
    return VaultModel.fromJson(response.data);
  }

  /// Deposit to vault
  Future<VaultModel> deposit(String vaultId, double amount) async {
    final response = await _dio.post('/vaults/$vaultId/deposit', data: {
      'amount': amount,
    });
    return VaultModel.fromJson(response.data);
  }

  /// Close vault
  Future<void> closeVault(String vaultId) async {
    await _dio.delete('/vaults/$vaultId');
  }

  // ============ Withdrawals ============

  /// Preview withdrawal
  Future<WithdrawalPreview> previewWithdrawal({
    required String vaultId,
    required double amount,
    bool isEarly = false,
  }) async {
    final response = await _dio.post('/withdrawals/preview', data: {
      'vault_id': vaultId,
      'amount': amount,
      'is_early_withdrawal': isEarly,
    });
    return WithdrawalPreview.fromJson(response.data);
  }

  /// Create withdrawal
  Future<WithdrawalModel> createWithdrawal({
    required String vaultId,
    required double amount,
    bool isEarly = false,
  }) async {
    final response = await _dio.post('/withdrawals/', data: {
      'vault_id': vaultId,
      'amount': amount,
      'is_early_withdrawal': isEarly,
    });
    return WithdrawalModel.fromJson(response.data);
  }

  /// Get withdrawals
  Future<List<WithdrawalModel>> getWithdrawals({String? vaultId}) async {
    final response = await _dio.get('/withdrawals/', queryParameters: {
      if (vaultId != null) 'vault_id': vaultId,
    });
    return (response.data as List)
        .map((json) => WithdrawalModel.fromJson(json))
        .toList();
  }
}
