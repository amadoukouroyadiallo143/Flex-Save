import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../core/api_client.dart';
import '../../core/models/models.dart';

/// Vaults list provider
final vaultsProvider = FutureProvider<List<VaultModel>>((ref) async {
  final apiClient = ref.read(apiClientProvider);
  return await apiClient.getVaults();
});

/// Single vault detail provider
final vaultDetailProvider = FutureProvider.family<VaultModel?, String>((ref, vaultId) async {
  final apiClient = ref.read(apiClientProvider);
  try {
    return await apiClient.getVault(vaultId);
  } catch (e) {
    return null;
  }
});

/// Vault withdrawals history
final vaultWithdrawalsProvider = FutureProvider.family<List<WithdrawalModel>, String>((ref, vaultId) async {
  final apiClient = ref.read(apiClientProvider);
  return await apiClient.getWithdrawals(vaultId: vaultId);
});

/// Vault operations notifier
final vaultOperationsProvider = StateNotifierProvider<VaultOperationsNotifier, VaultOperationState>((ref) {
  return VaultOperationsNotifier(ref);
});

/// Vault operation state
class VaultOperationState {
  final bool isLoading;
  final String? error;
  final String? successMessage;

  const VaultOperationState({
    this.isLoading = false,
    this.error,
    this.successMessage,
  });

  VaultOperationState copyWith({
    bool? isLoading,
    String? error,
    String? successMessage,
  }) {
    return VaultOperationState(
      isLoading: isLoading ?? this.isLoading,
      error: error,
      successMessage: successMessage,
    );
  }
}

/// Vault operations notifier
class VaultOperationsNotifier extends StateNotifier<VaultOperationState> {
  final Ref _ref;
  
  VaultOperationsNotifier(this._ref) : super(const VaultOperationState());

  /// Create a new vault
  Future<VaultModel?> createVault({
    required String name,
    required double targetAmount,
    required DateTime unlockDate,
    double flexibilityPercentage = 10.0,
  }) async {
    state = state.copyWith(isLoading: true, error: null, successMessage: null);
    
    try {
      final apiClient = _ref.read(apiClientProvider);
      final vault = await apiClient.createVault(
        name: name,
        targetAmount: targetAmount,
        unlockDate: unlockDate,
        flexibilityPercentage: flexibilityPercentage,
      );
      
      // Invalidate vaults list to refresh
      _ref.invalidate(vaultsProvider);
      
      state = state.copyWith(
        isLoading: false,
        successMessage: 'Coffre créé avec succès !',
      );
      return vault;
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        error: 'Erreur lors de la création du coffre.',
      );
      return null;
    }
  }

  /// Deposit to vault
  Future<bool> deposit(String vaultId, double amount) async {
    state = state.copyWith(isLoading: true, error: null, successMessage: null);
    
    try {
      final apiClient = _ref.read(apiClientProvider);
      await apiClient.deposit(vaultId, amount);
      
      // Invalidate to refresh
      _ref.invalidate(vaultsProvider);
      _ref.invalidate(vaultDetailProvider(vaultId));
      
      state = state.copyWith(
        isLoading: false,
        successMessage: 'Dépôt effectué avec succès !',
      );
      return true;
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        error: 'Erreur lors du dépôt.',
      );
      return false;
    }
  }

  /// Preview withdrawal
  Future<WithdrawalPreview?> previewWithdrawal({
    required String vaultId,
    required double amount,
    bool isEarly = false,
  }) async {
    try {
      final apiClient = _ref.read(apiClientProvider);
      return await apiClient.previewWithdrawal(
        vaultId: vaultId,
        amount: amount,
        isEarly: isEarly,
      );
    } catch (e) {
      return null;
    }
  }

  /// Withdraw from vault
  Future<bool> withdraw({
    required String vaultId,
    required double amount,
    bool isEarly = false,
  }) async {
    state = state.copyWith(isLoading: true, error: null, successMessage: null);
    
    try {
      final apiClient = _ref.read(apiClientProvider);
      await apiClient.createWithdrawal(
        vaultId: vaultId,
        amount: amount,
        isEarly: isEarly,
      );
      
      // Invalidate to refresh
      _ref.invalidate(vaultsProvider);
      _ref.invalidate(vaultDetailProvider(vaultId));
      _ref.invalidate(vaultWithdrawalsProvider(vaultId));
      
      state = state.copyWith(
        isLoading: false,
        successMessage: 'Retrait effectué avec succès !',
      );
      return true;
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        error: 'Erreur lors du retrait.',
      );
      return false;
    }
  }

  /// Clear messages
  void clearMessages() {
    state = const VaultOperationState();
  }
}
