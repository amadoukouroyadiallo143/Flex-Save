import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:firebase_auth/firebase_auth.dart' as fb;
import '../api_client.dart';
import '../models.dart';

/// Auth state
class AuthState {
  final User? user;
  final bool isLoading;
  final String? error;
  final bool isAuthenticated;

  AuthState({
    this.user,
    this.isLoading = false,
    this.error,
    this.isAuthenticated = false,
  });

  AuthState copyWith({
    User? user,
    bool? isLoading,
    String? error,
    bool? isAuthenticated,
  }) {
    return AuthState(
      user: user ?? this.user,
      isLoading: isLoading ?? this.isLoading,
      error: error,
      isAuthenticated: isAuthenticated ?? this.isAuthenticated,
    );
  }
}

/// Auth notifier
class AuthNotifier extends StateNotifier<AuthState> {
  final ApiClient _apiClient;
  final fb.FirebaseAuth _firebaseAuth;

  AuthNotifier(this._apiClient, this._firebaseAuth) : super(AuthState()) {
    _init();
  }

  void _init() {
    _firebaseAuth.authStateChanges().listen((fbUser) async {
      if (fbUser != null) {
        await _loadUser(fbUser);
      } else {
        state = AuthState();
      }
    });
  }

  Future<void> _loadUser(fb.User fbUser) async {
    try {
      state = state.copyWith(isLoading: true);
      
      final token = await fbUser.getIdToken();
      _apiClient.setToken(token);
      
      final userData = await _apiClient.getCurrentUser();
      final user = User.fromJson(userData);
      
      state = AuthState(
        user: user,
        isAuthenticated: true,
        isLoading: false,
      );
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        error: e.toString(),
      );
    }
  }

  Future<void> signIn(String email, String password) async {
    try {
      state = state.copyWith(isLoading: true, error: null);
      
      await _firebaseAuth.signInWithEmailAndPassword(
        email: email,
        password: password,
      );
      
      // Auth state listener will handle the rest
    } on fb.FirebaseAuthException catch (e) {
      state = state.copyWith(
        isLoading: false,
        error: _getErrorMessage(e.code),
      );
      rethrow;
    }
  }

  Future<void> signUp(String email, String password, String fullName) async {
    try {
      state = state.copyWith(isLoading: true, error: null);
      
      final credential = await _firebaseAuth.createUserWithEmailAndPassword(
        email: email,
        password: password,
      );
      
      if (credential.user != null) {
        await credential.user!.updateDisplayName(fullName);
      }
      
      // Auth state listener will handle the rest
    } on fb.FirebaseAuthException catch (e) {
      state = state.copyWith(
        isLoading: false,
        error: _getErrorMessage(e.code),
      );
      rethrow;
    }
  }

  Future<void> signOut() async {
    await _firebaseAuth.signOut();
    _apiClient.setToken(null);
    state = AuthState();
  }

  Future<void> resetPassword(String email) async {
    try {
      state = state.copyWith(isLoading: true, error: null);
      await _firebaseAuth.sendPasswordResetEmail(email: email);
      state = state.copyWith(isLoading: false);
    } on fb.FirebaseAuthException catch (e) {
      state = state.copyWith(
        isLoading: false,
        error: _getErrorMessage(e.code),
      );
      rethrow;
    }
  }

  String _getErrorMessage(String code) {
    switch (code) {
      case 'user-not-found':
        return 'Aucun compte trouvé avec cet email';
      case 'wrong-password':
        return 'Mot de passe incorrect';
      case 'email-already-in-use':
        return 'Cet email est déjà utilisé';
      case 'weak-password':
        return 'Le mot de passe doit contenir au moins 6 caractères';
      case 'invalid-email':
        return 'Email invalide';
      case 'too-many-requests':
        return 'Trop de tentatives, réessayez plus tard';
      default:
        return 'Une erreur est survenue';
    }
  }
}

/// Providers
final firebaseAuthProvider = Provider<fb.FirebaseAuth>((ref) {
  return fb.FirebaseAuth.instance;
});

final authProvider = StateNotifierProvider<AuthNotifier, AuthState>((ref) {
  final apiClient = ref.watch(apiClientProvider);
  final firebaseAuth = ref.watch(firebaseAuthProvider);
  return AuthNotifier(apiClient, firebaseAuth);
});

/// Current user provider
final currentUserProvider = Provider<User?>((ref) {
  return ref.watch(authProvider).user;
});

/// Is authenticated provider
final isAuthenticatedProvider = Provider<bool>((ref) {
  return ref.watch(authProvider).isAuthenticated;
});
