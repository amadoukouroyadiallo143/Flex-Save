/// Vault model
class VaultModel {
  final String id;
  final String name;
  final double currentAmount;
  final double targetAmount;
  final DateTime unlockDate;
  final double flexibilityPercentage;
  final double flexibilityUsed;
  final double flexibilityAvailable;
  final bool isLocked;
  final bool isActive;
  final double progressPercentage;
  final DateTime createdAt;

  const VaultModel({
    required this.id,
    required this.name,
    required this.currentAmount,
    required this.targetAmount,
    required this.unlockDate,
    this.flexibilityPercentage = 10.0,
    this.flexibilityUsed = 0,
    this.flexibilityAvailable = 0,
    this.isLocked = true,
    this.isActive = true,
    this.progressPercentage = 0,
    required this.createdAt,
  });

  factory VaultModel.fromJson(Map<String, dynamic> json) {
    return VaultModel(
      id: json['id'] as String,
      name: json['name'] as String,
      currentAmount: (json['current_amount'] as num).toDouble(),
      targetAmount: (json['target_amount'] as num).toDouble(),
      unlockDate: DateTime.parse(json['unlock_date'] as String),
      flexibilityPercentage: (json['flexibility_percentage'] as num?)?.toDouble() ?? 10.0,
      flexibilityUsed: (json['flexibility_used'] as num?)?.toDouble() ?? 0,
      flexibilityAvailable: (json['flexibility_available'] as num?)?.toDouble() ?? 0,
      isLocked: json['is_locked'] as bool? ?? true,
      isActive: json['is_active'] as bool? ?? true,
      progressPercentage: (json['progress_percentage'] as num?)?.toDouble() ?? 0,
      createdAt: DateTime.parse(json['created_at'] as String),
    );
  }

  Map<String, dynamic> toCreateJson() => {
    'name': name,
    'target_amount': targetAmount,
    'unlock_date': unlockDate.toIso8601String().split('T')[0],
    'flexibility_percentage': flexibilityPercentage,
  };

  /// Days remaining until unlock
  int get daysUntilUnlock {
    final now = DateTime.now();
    if (unlockDate.isBefore(now)) return 0;
    return unlockDate.difference(now).inDays;
  }

  /// Formatted unlock date
  String get formattedUnlockDate {
    return '${unlockDate.day.toString().padLeft(2, '0')}/${unlockDate.month.toString().padLeft(2, '0')}/${unlockDate.year}';
  }
}
