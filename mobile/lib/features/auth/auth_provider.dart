import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../core/api_client.dart';
import '../core/models/models.dart';

/// Firebase Auth instance provider
final firebaseAuthProvider = Provider<FirebaseAuth>((ref) {
  return FirebaseAuth.instance;
});

/// Current Firebase User stream
final authStateProvider = StreamProvider<User?>((ref) {
  return ref.watch(firebaseAuthProvider).authStateChanges();
});

/// Current user data from API
final currentUserProvider = FutureProvider<UserModel?>((ref) async {
  final authState = ref.watch(authStateProvider);
  
  return authState.when(
    data: (user) async {
      if (user == null) return null;
      
      // Get token and set it in API client
      final token = await user.getIdToken();
      if (token == null) return null;
      
      final apiClient = ref.read(apiClientProvider);
      apiClient.setAuthToken(token);
      
      try {
        return await apiClient.getCurrentUser();
      } catch (e) {
        return null;
      }
    },
    loading: () => null,
    error: (_, __) => null,
  );
});

/// User stats provider
final userStatsProvider = FutureProvider<UserStats>((ref) async {
  final user = ref.watch(currentUserProvider);
  
  if (user.value == null) {
    return const UserStats();
  }
  
  final apiClient = ref.read(apiClientProvider);
  return await apiClient.getUserStats();
});

/// Auth state notifier for login/register actions
final authNotifierProvider = StateNotifierProvider<AuthNotifier, AuthState>((ref) {
  return AuthNotifier(ref);
});

/// Auth state
class AuthState {
  final bool isLoading;
  final String? error;
  final bool isAuthenticated;

  const AuthState({
    this.isLoading = false,
    this.error,
    this.isAuthenticated = false,
  });

  AuthState copyWith({
    bool? isLoading,
    String? error,
    bool? isAuthenticated,
  }) {
    return AuthState(
      isLoading: isLoading ?? this.isLoading,
      error: error,
      isAuthenticated: isAuthenticated ?? this.isAuthenticated,
    );
  }
}

/// Auth state notifier
class AuthNotifier extends StateNotifier<AuthState> {
  final Ref _ref;
  
  AuthNotifier(this._ref) : super(const AuthState());

  /// Sign in with email and password
  Future<bool> signIn(String email, String password) async {
    state = state.copyWith(isLoading: true, error: null);
    
    try {
      final auth = _ref.read(firebaseAuthProvider);
      await auth.signInWithEmailAndPassword(
        email: email,
        password: password,
      );
      
      state = state.copyWith(isLoading: false, isAuthenticated: true);
      return true;
    } on FirebaseAuthException catch (e) {
      state = state.copyWith(
        isLoading: false,
        error: _getErrorMessage(e.code),
      );
      return false;
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        error: 'An error occurred. Please try again.',
      );
      return false;
    }
  }

  /// Register with email and password
  Future<bool> register(String email, String password, String fullName) async {
    state = state.copyWith(isLoading: true, error: null);
    
    try {
      // First register on backend
      final apiClient = _ref.read(apiClientProvider);
      await apiClient.register(
        email: email,
        password: password,
        fullName: fullName,
      );
      
      // Then sign in with Firebase
      final auth = _ref.read(firebaseAuthProvider);
      await auth.signInWithEmailAndPassword(
        email: email,
        password: password,
      );
      
      state = state.copyWith(isLoading: false, isAuthenticated: true);
      return true;
    } on FirebaseAuthException catch (e) {
      state = state.copyWith(
        isLoading: false,
        error: _getErrorMessage(e.code),
      );
      return false;
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        error: 'Registration failed. Please try again.',
      );
      return false;
    }
  }

  /// Sign out
  Future<void> signOut() async {
    final auth = _ref.read(firebaseAuthProvider);
    await auth.signOut();
    
    final apiClient = _ref.read(apiClientProvider);
    apiClient.clearAuthToken();
    
    state = const AuthState();
  }

  String _getErrorMessage(String code) {
    switch (code) {
      case 'user-not-found':
        return 'No user found with this email.';
      case 'wrong-password':
        return 'Wrong password.';
      case 'email-already-in-use':
        return 'This email is already registered.';
      case 'weak-password':
        return 'Password is too weak.';
      case 'invalid-email':
        return 'Invalid email address.';
      default:
        return 'Authentication failed.';
    }
  }
}
