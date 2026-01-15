import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../core/providers/vaults_provider.dart';
import '../../core/models.dart';

class VaultsListScreen extends ConsumerStatefulWidget {
  const VaultsListScreen({super.key});

  @override
  ConsumerState<VaultsListScreen> createState() => _VaultsListScreenState();
}

class _VaultsListScreenState extends ConsumerState<VaultsListScreen> {
  @override
  void initState() {
    super.initState();
    Future.microtask(() => ref.read(vaultsProvider.notifier).loadVaults());
  }

  @override
  Widget build(BuildContext context) {
    final vaultsState = ref.watch(vaultsProvider);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Mes Coffres'),
        actions: [
          IconButton(
            icon: const Icon(Icons.add),
            onPressed: () => context.push('/vaults/new'),
          ),
        ],
      ),
      body: RefreshIndicator(
        onRefresh: () => ref.read(vaultsProvider.notifier).loadVaults(),
        child: vaultsState.isLoading && vaultsState.vaults.isEmpty
            ? const Center(child: CircularProgressIndicator())
            : vaultsState.vaults.isEmpty
                ? _EmptyState()
                : ListView.builder(
                    padding: const EdgeInsets.all(16),
                    itemCount: vaultsState.vaults.length,
                    itemBuilder: (context, index) {
                      final vault = vaultsState.vaults[index];
                      return _VaultCard(vault: vault);
                    },
                  ),
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () => context.push('/vaults/new'),
        backgroundColor: const Color(0xFF10B981),
        icon: const Icon(Icons.add, color: Colors.white),
        label: const Text('Nouveau coffre', style: TextStyle(color: Colors.white)),
      ),
    );
  }
}

class _VaultCard extends StatelessWidget {
  final Vault vault;

  const _VaultCard({required this.vault});

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: InkWell(
        onTap: () => context.push('/vaults/${vault.id}'),
        borderRadius: BorderRadius.circular(16),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Container(
                    width: 48,
                    height: 48,
                    decoration: BoxDecoration(
                      color: const Color(0xFF10B981).withOpacity(0.1),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: const Center(
                      child: Text('🎯', style: TextStyle(fontSize: 24)),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          vault.name,
                          style: const TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 16,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          vault.isLocked 
                              ? '${vault.daysUntilUnlock} jours restants'
                              : 'Débloqué ✓',
                          style: TextStyle(
                            color: vault.isLocked ? Colors.grey[600] : Colors.green,
                            fontSize: 13,
                          ),
                        ),
                      ],
                    ),
                  ),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      Text(
                        '${vault.currentAmount.toStringAsFixed(2)} €',
                        style: const TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 18,
                          color: Color(0xFF10B981),
                        ),
                      ),
                      Text(
                        'sur ${vault.targetAmount.toStringAsFixed(0)} €',
                        style: TextStyle(
                          color: Colors.grey[500],
                          fontSize: 12,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
              const SizedBox(height: 16),
              ClipRRect(
                borderRadius: BorderRadius.circular(4),
                child: LinearProgressIndicator(
                  value: vault.progress / 100,
                  backgroundColor: Colors.grey[200],
                  valueColor: const AlwaysStoppedAnimation<Color>(Color(0xFF10B981)),
                  minHeight: 8,
                ),
              ),
              const SizedBox(height: 8),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    '${vault.progress.toStringAsFixed(1)}%',
                    style: const TextStyle(
                      fontWeight: FontWeight.w600,
                      fontSize: 13,
                    ),
                  ),
                  Row(
                    children: [
                      Icon(
                        vault.isLocked ? Icons.lock : Icons.lock_open,
                        size: 14,
                        color: vault.isLocked ? Colors.orange : Colors.green,
                      ),
                      const SizedBox(width: 4),
                      Text(
                        vault.isLocked ? 'Verrouillé' : 'Disponible',
                        style: TextStyle(
                          color: vault.isLocked ? Colors.orange : Colors.green,
                          fontSize: 12,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _EmptyState extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            width: 100,
            height: 100,
            decoration: BoxDecoration(
              color: Colors.grey[100],
              borderRadius: BorderRadius.circular(24),
            ),
            child: const Center(
              child: Text('📦', style: TextStyle(fontSize: 48)),
            ),
          ),
          const SizedBox(height: 24),
          const Text(
            'Aucun coffre',
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'Créez votre premier coffre d\'épargne',
            style: TextStyle(color: Colors.grey[600]),
          ),
          const SizedBox(height: 24),
          ElevatedButton.icon(
            onPressed: () => context.push('/vaults/new'),
            icon: const Icon(Icons.add),
            label: const Text('Créer un coffre'),
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFF10B981),
              foregroundColor: Colors.white,
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
