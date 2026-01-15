import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'env.dart';

/// API Client for FlexSave backend
class ApiClient {
  late final Dio _dio;
  String? _token;

  ApiClient() {
    _dio = Dio(BaseOptions(
      baseUrl: Env.apiUrl,
      connectTimeout: Duration(milliseconds: Env.connectionTimeout),
      receiveTimeout: Duration(milliseconds: Env.receiveTimeout),
      headers: {
        'Content-Type': 'application/json',
      },
    ));

    _dio.interceptors.add(InterceptorsWrapper(
      onRequest: (options, handler) {
        if (_token != null) {
          options.headers['Authorization'] = 'Bearer $_token';
        }
        return handler.next(options);
      },
      onError: (error, handler) {
        if (Env.isDebug) {
          print('API Error: ${error.message}');
        }
        return handler.next(error);
      },
    ));
  }

  void setToken(String? token) {
    _token = token;
  }

  // Auth
  Future<Map<String, dynamic>> verifyToken(String token) async {
    final response = await _dio.post('/auth/verify-token', queryParameters: {'token': token});
    return response.data;
  }

  // Users
  Future<Map<String, dynamic>> getCurrentUser() async {
    final response = await _dio.get('/users/me');
    return response.data;
  }

  Future<Map<String, dynamic>> getUserStats() async {
    final response = await _dio.get('/users/me/stats');
    return response.data;
  }

  Future<void> updateUser(Map<String, dynamic> data) async {
    await _dio.patch('/users/me', data: data);
  }

  // Vaults
  Future<List<dynamic>> getVaults({bool activeOnly = true}) async {
    final response = await _dio.get('/vaults/', queryParameters: {
      'active_only': activeOnly,
    });
    return response.data;
  }

  Future<Map<String, dynamic>> getVault(String id) async {
    final response = await _dio.get('/vaults/$id');
    return response.data;
  }

  Future<Map<String, dynamic>> createVault({
    required String name,
    required double targetAmount,
    required String unlockDate,
    required double flexibilityPercentage,
  }) async {
    final response = await _dio.post('/vaults/', data: {
      'name': name,
      'target_amount': targetAmount,
      'unlock_date': unlockDate,
      'flexibility_percentage': flexibilityPercentage,
    });
    return response.data;
  }

  Future<Map<String, dynamic>> deposit(String vaultId, double amount) async {
    final response = await _dio.post('/vaults/$vaultId/deposit', data: {
      'amount': amount,
    });
    return response.data;
  }

  Future<void> closeVault(String id) async {
    await _dio.delete('/vaults/$id');
  }

  // Withdrawals
  Future<Map<String, dynamic>> previewWithdrawal({
    required String vaultId,
    required double amount,
    required bool isEarlyWithdrawal,
  }) async {
    final response = await _dio.post('/withdrawals/preview', data: {
      'vault_id': vaultId,
      'amount': amount,
      'is_early_withdrawal': isEarlyWithdrawal,
    });
    return response.data;
  }

  Future<Map<String, dynamic>> createWithdrawal({
    required String vaultId,
    required double amount,
    required bool isEarlyWithdrawal,
  }) async {
    final response = await _dio.post('/withdrawals/', data: {
      'vault_id': vaultId,
      'amount': amount,
      'is_early_withdrawal': isEarlyWithdrawal,
    });
    return response.data;
  }

  Future<List<dynamic>> getWithdrawals({String? vaultId}) async {
    final response = await _dio.get('/withdrawals/', queryParameters: {
      if (vaultId != null) 'vault_id': vaultId,
    });
    return response.data;
  }

  // Notifications
  Future<List<dynamic>> getNotifications({bool unreadOnly = false}) async {
    final response = await _dio.get('/notifications/', queryParameters: {
      'unread_only': unreadOnly,
    });
    return response.data;
  }

  Future<void> markNotificationAsRead(String id) async {
    await _dio.post('/notifications/$id/read');
  }

  Future<void> markAllNotificationsAsRead() async {
    await _dio.post('/notifications/read-all');
  }
}

/// Provider for API client
final apiClientProvider = Provider<ApiClient>((ref) {
  return ApiClient();
});
