import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../features/auth/login_screen.dart';
import '../features/auth/register_screen.dart';
import '../features/home/home_screen.dart';
import '../features/vaults/vault_detail_screen.dart';
import '../features/vaults/create_vault_screen.dart';

final routerProvider = Provider<GoRouter>((ref) {
  return GoRouter(
    initialLocation: '/',
    routes: [
      GoRoute(
        path: '/',
        name: 'home',
        builder: (context, state) => const HomeScreen(),
      ),
      GoRoute(
        path: '/login',
        name: 'login',
        builder: (context, state) => const LoginScreen(),
      ),
      GoRoute(
        path: '/register',
        name: 'register',
        builder: (context, state) => const RegisterScreen(),
      ),
      GoRoute(
        path: '/vaults/create',
        name: 'create-vault',
        builder: (context, state) => const CreateVaultScreen(),
      ),
      GoRoute(
        path: '/vaults/:id',
        name: 'vault-detail',
        builder: (context, state) {
          final vaultId = state.pathParameters['id']!;
          return VaultDetailScreen(vaultId: vaultId);
        },
      ),
    ],
  );
});
