import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../core/providers/vaults_provider.dart';

class NewVaultScreen extends ConsumerStatefulWidget {
  const NewVaultScreen({super.key});

  @override
  ConsumerState<NewVaultScreen> createState() => _NewVaultScreenState();
}

class _NewVaultScreenState extends ConsumerState<NewVaultScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _targetController = TextEditingController();
  DateTime _unlockDate = DateTime.now().add(const Duration(days: 30));
  double _flexibility = 10.0;
  bool _isLoading = false;

  @override
  void dispose() {
    _nameController.dispose();
    _targetController.dispose();
    super.dispose();
  }

  Future<void> _selectDate() async {
    final picked = await showDatePicker(
      context: context,
      initialDate: _unlockDate,
      firstDate: DateTime.now().add(const Duration(days: 7)),
      lastDate: DateTime.now().add(const Duration(days: 365 * 10)),
    );
    if (picked != null) {
      setState(() => _unlockDate = picked);
    }
  }

  Future<void> _handleCreate() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() => _isLoading = true);

    try {
      final vault = await ref.read(vaultsProvider.notifier).createVault(
        name: _nameController.text.trim(),
        targetAmount: double.parse(_targetController.text),
        unlockDate: _unlockDate.toIso8601String().split('T')[0],
        flexibilityPercentage: _flexibility,
      );

      if (vault != null && mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Coffre créé avec succès ! 🎉'),
            backgroundColor: Color(0xFF10B981),
          ),
        );
        context.pop();
      }
    } finally {
      if (mounted) {
        setState(() => _isLoading = false);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Nouveau coffre'),
      ),
      body: Form(
        key: _formKey,
        child: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            // Icon selection (simplified)
            Center(
              child: Container(
                width: 100,
                height: 100,
                decoration: BoxDecoration(
                  color: const Color(0xFF10B981).withOpacity(0.1),
                  borderRadius: BorderRadius.circular(24),
                ),
                child: const Center(
                  child: Text('🎯', style: TextStyle(fontSize: 48)),
                ),
              ),
            ),
            
            const SizedBox(height: 32),
            
            // Name
            TextFormField(
              controller: _nameController,
              decoration: InputDecoration(
                labelText: 'Nom du coffre',
                hintText: 'Ex: Vacances 2025',
                prefixIcon: const Icon(Icons.edit),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
              ),
              validator: (value) {
                if (value?.isEmpty ?? true) return 'Nom requis';
                return null;
              },
            ),
            
            const SizedBox(height: 16),
            
            // Target amount
            TextFormField(
              controller: _targetController,
              keyboardType: const TextInputType.numberWithOptions(decimal: true),
              decoration: InputDecoration(
                labelText: 'Objectif (€)',
                hintText: 'Ex: 1000',
                prefixIcon: const Icon(Icons.euro),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
              ),
              validator: (value) {
                if (value?.isEmpty ?? true) return 'Montant requis';
                final amount = double.tryParse(value!);
                if (amount == null || amount <= 0) return 'Montant invalide';
                return null;
              },
            ),
            
            const SizedBox(height: 16),
            
            // Unlock date
            InkWell(
              onTap: _selectDate,
              child: InputDecorator(
                decoration: InputDecoration(
                  labelText: 'Date de déblocage',
                  prefixIcon: const Icon(Icons.calendar_today),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
                child: Text(
                  '${_unlockDate.day}/${_unlockDate.month}/${_unlockDate.year}',
                ),
              ),
            ),
            
            const SizedBox(height: 24),
            
            // Flexibility slider
            Text(
              'Flexibilité: ${_flexibility.toStringAsFixed(0)}%',
              style: const TextStyle(fontWeight: FontWeight.w500),
            ),
            const SizedBox(height: 8),
            Slider(
              value: _flexibility,
              min: 0,
              max: 20,
              divisions: 20,
              label: '${_flexibility.toStringAsFixed(0)}%',
              activeColor: const Color(0xFF10B981),
              onChanged: (value) {
                setState(() => _flexibility = value);
              },
            ),
            Text(
              'Pourcentage que vous pouvez retirer avant la date de déblocage',
              style: TextStyle(color: Colors.grey[600], fontSize: 12),
            ),
            
            const SizedBox(height: 32),
            
            // Info card
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.blue.shade50,
                borderRadius: BorderRadius.circular(12),
              ),
              child: Row(
                children: [
                  Icon(Icons.info_outline, color: Colors.blue[700]),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Text(
                      'Les retraits anticipés seront soumis à des frais de 1% (0.5% pour Premium)',
                      style: TextStyle(color: Colors.blue[900], fontSize: 13),
                    ),
                  ),
                ],
              ),
            ),
            
            const SizedBox(height: 32),
            
            // Create button
            ElevatedButton(
              onPressed: _isLoading ? null : _handleCreate,
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF10B981),
                foregroundColor: Colors.white,
                padding: const EdgeInsets.symmetric(vertical: 16),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
              ),
              child: _isLoading
                  ? const SizedBox(
                      height: 20,
                      width: 20,
                      child: CircularProgressIndicator(
                        strokeWidth: 2,
                        color: Colors.white,
                      ),
                    )
                  : const Text(
                      'Créer le coffre',
                      style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
                    ),
            ),
          ],
        ),
      ),
    );
  }
}
