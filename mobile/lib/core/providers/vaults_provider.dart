import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../api_client.dart';
import '../models.dart';

/// Vaults state
class VaultsState {
  final List<Vault> vaults;
  final bool isLoading;
  final String? error;

  VaultsState({
    this.vaults = const [],
    this.isLoading = false,
    this.error,
  });

  VaultsState copyWith({
    List<Vault>? vaults,
    bool? isLoading,
    String? error,
  }) {
    return VaultsState(
      vaults: vaults ?? this.vaults,
      isLoading: isLoading ?? this.isLoading,
      error: error,
    );
  }

  double get totalSaved => vaults.fold(0, (sum, v) => sum + v.currentAmount);
  int get activeVaults => vaults.where((v) => v.isActive).length;
}

/// Vaults notifier
class VaultsNotifier extends StateNotifier<VaultsState> {
  final ApiClient _apiClient;

  VaultsNotifier(this._apiClient) : super(VaultsState());

  Future<void> loadVaults({bool activeOnly = true}) async {
    try {
      state = state.copyWith(isLoading: true, error: null);
      
      final data = await _apiClient.getVaults(activeOnly: activeOnly);
      final vaults = data.map((v) => Vault.fromJson(v)).toList();
      
      state = state.copyWith(
        vaults: vaults,
        isLoading: false,
      );
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        error: e.toString(),
      );
    }
  }

  Future<Vault?> getVault(String id) async {
    try {
      final data = await _apiClient.getVault(id);
      return Vault.fromJson(data);
    } catch (e) {
      return null;
    }
  }

  Future<Vault?> createVault({
    required String name,
    required double targetAmount,
    required String unlockDate,
    double flexibilityPercentage = 10.0,
  }) async {
    try {
      state = state.copyWith(isLoading: true, error: null);
      
      final data = await _apiClient.createVault(
        name: name,
        targetAmount: targetAmount,
        unlockDate: unlockDate,
        flexibilityPercentage: flexibilityPercentage,
      );
      
      final vault = Vault.fromJson(data);
      state = state.copyWith(
        vaults: [...state.vaults, vault],
        isLoading: false,
      );
      
      return vault;
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        error: e.toString(),
      );
      return null;
    }
  }

  Future<bool> deposit(String vaultId, double amount) async {
    try {
      state = state.copyWith(isLoading: true, error: null);
      
      await _apiClient.deposit(vaultId, amount);
      
      // Refresh vaults
      await loadVaults();
      return true;
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        error: e.toString(),
      );
      return false;
    }
  }

  Future<bool> closeVault(String id) async {
    try {
      await _apiClient.closeVault(id);
      state = state.copyWith(
        vaults: state.vaults.where((v) => v.id != id).toList(),
      );
      return true;
    } catch (e) {
      state = state.copyWith(error: e.toString());
      return false;
    }
  }
}

/// Provider
final vaultsProvider = StateNotifierProvider<VaultsNotifier, VaultsState>((ref) {
  final apiClient = ref.watch(apiClientProvider);
  return VaultsNotifier(apiClient);
});

/// Single vault provider
final vaultProvider = FutureProvider.family<Vault?, String>((ref, id) async {
  final apiClient = ref.watch(apiClientProvider);
  try {
    final data = await apiClient.getVault(id);
    return Vault.fromJson(data);
  } catch (e) {
    return null;
  }
});
