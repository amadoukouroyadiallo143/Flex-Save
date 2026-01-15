/// User model
class User {
  final String id;
  final String email;
  final String fullName;
  final String role;
  final double disciplineScore;
  final bool isPremium;
  final bool isActive;
  final bool notificationEnabled;
  final DateTime createdAt;
  final DateTime? lastLogin;

  User({
    required this.id,
    required this.email,
    required this.fullName,
    required this.role,
    required this.disciplineScore,
    required this.isPremium,
    required this.isActive,
    required this.notificationEnabled,
    required this.createdAt,
    this.lastLogin,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'] ?? '',
      email: json['email'] ?? '',
      fullName: json['full_name'] ?? '',
      role: json['role'] ?? 'user',
      disciplineScore: (json['discipline_score'] ?? 50.0).toDouble(),
      isPremium: json['is_premium'] ?? false,
      isActive: json['is_active'] ?? true,
      notificationEnabled: json['notification_enabled'] ?? true,
      createdAt: DateTime.tryParse(json['created_at'] ?? '') ?? DateTime.now(),
      lastLogin: json['last_login'] != null ? DateTime.tryParse(json['last_login']) : null,
    );
  }

  bool get isAdmin => role == 'admin';

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'email': email,
      'full_name': fullName,
      'role': role,
      'discipline_score': disciplineScore,
      'is_premium': isPremium,
      'is_active': isActive,
      'notification_enabled': notificationEnabled,
    };
  }
}

/// Vault model
class Vault {
  final String id;
  final String userId;
  final String name;
  final double currentAmount;
  final double targetAmount;
  final DateTime unlockDate;
  final double flexibilityPercentage;
  final double flexibilityUsed;
  final bool isActive;
  final DateTime createdAt;

  Vault({
    required this.id,
    required this.userId,
    required this.name,
    required this.currentAmount,
    required this.targetAmount,
    required this.unlockDate,
    required this.flexibilityPercentage,
    required this.flexibilityUsed,
    required this.isActive,
    required this.createdAt,
  });

  factory Vault.fromJson(Map<String, dynamic> json) {
    return Vault(
      id: json['id'] ?? '',
      userId: json['user_id'] ?? '',
      name: json['name'] ?? '',
      currentAmount: (json['current_amount'] ?? 0.0).toDouble(),
      targetAmount: (json['target_amount'] ?? 0.0).toDouble(),
      unlockDate: DateTime.tryParse(json['unlock_date'] ?? '') ?? DateTime.now(),
      flexibilityPercentage: (json['flexibility_percentage'] ?? 10.0).toDouble(),
      flexibilityUsed: (json['flexibility_used'] ?? 0.0).toDouble(),
      isActive: json['is_active'] ?? true,
      createdAt: DateTime.tryParse(json['created_at'] ?? '') ?? DateTime.now(),
    );
  }

  bool get isLocked => unlockDate.isAfter(DateTime.now());
  
  double get progress => targetAmount > 0 ? (currentAmount / targetAmount * 100).clamp(0, 100) : 0;
  
  double get flexibilityAvailable => (currentAmount * flexibilityPercentage / 100) - flexibilityUsed;

  int get daysUntilUnlock {
    final diff = unlockDate.difference(DateTime.now());
    return diff.inDays > 0 ? diff.inDays : 0;
  }
}

/// Withdrawal model
class Withdrawal {
  final String id;
  final String vaultId;
  final double amount;
  final double fee;
  final bool isEarly;
  final String status;
  final DateTime createdAt;

  Withdrawal({
    required this.id,
    required this.vaultId,
    required this.amount,
    required this.fee,
    required this.isEarly,
    required this.status,
    required this.createdAt,
  });

  factory Withdrawal.fromJson(Map<String, dynamic> json) {
    return Withdrawal(
      id: json['id'] ?? '',
      vaultId: json['vault_id'] ?? '',
      amount: (json['amount'] ?? 0.0).toDouble(),
      fee: (json['fee'] ?? 0.0).toDouble(),
      isEarly: json['is_early'] ?? false,
      status: json['status'] ?? 'pending',
      createdAt: DateTime.tryParse(json['created_at'] ?? '') ?? DateTime.now(),
    );
  }

  double get netAmount => amount - fee;
}

/// User stats model
class UserStats {
  final double totalSaved;
  final int totalVaults;
  final int activeVaults;
  final double disciplineScore;
  final double flexibilityUsed;

  UserStats({
    required this.totalSaved,
    required this.totalVaults,
    required this.activeVaults,
    required this.disciplineScore,
    required this.flexibilityUsed,
  });

  factory UserStats.fromJson(Map<String, dynamic> json) {
    return UserStats(
      totalSaved: (json['total_saved'] ?? 0.0).toDouble(),
      totalVaults: json['total_vaults'] ?? 0,
      activeVaults: json['active_vaults'] ?? 0,
      disciplineScore: (json['discipline_score'] ?? 50.0).toDouble(),
      flexibilityUsed: (json['flexibility_used'] ?? 0.0).toDouble(),
    );
  }
}

/// Notification model
class AppNotification {
  final String id;
  final String title;
  final String body;
  final String type;
  final String? actionUrl;
  final bool isRead;
  final DateTime createdAt;

  AppNotification({
    required this.id,
    required this.title,
    required this.body,
    required this.type,
    this.actionUrl,
    required this.isRead,
    required this.createdAt,
  });

  factory AppNotification.fromJson(Map<String, dynamic> json) {
    return AppNotification(
      id: json['id'] ?? '',
      title: json['title'] ?? '',
      body: json['body'] ?? '',
      type: json['type'] ?? 'info',
      actionUrl: json['action_url'],
      isRead: json['is_read'] ?? false,
      createdAt: DateTime.tryParse(json['created_at'] ?? '') ?? DateTime.now(),
    );
  }
}
