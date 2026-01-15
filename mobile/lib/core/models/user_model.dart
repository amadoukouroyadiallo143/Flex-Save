/// User model
class UserModel {
  final String id;
  final String email;
  final String fullName;
  final double disciplineScore;
  final bool isPremium;
  final bool notificationEnabled;

  const UserModel({
    required this.id,
    required this.email,
    required this.fullName,
    this.disciplineScore = 50.0,
    this.isPremium = false,
    this.notificationEnabled = true,
  });

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json['id'] as String,
      email: json['email'] as String,
      fullName: json['full_name'] as String,
      disciplineScore: (json['discipline_score'] as num?)?.toDouble() ?? 50.0,
      isPremium: json['is_premium'] as bool? ?? false,
      notificationEnabled: json['notification_enabled'] as bool? ?? true,
    );
  }

  Map<String, dynamic> toJson() => {
    'id': id,
    'email': email,
    'full_name': fullName,
    'discipline_score': disciplineScore,
    'is_premium': isPremium,
    'notification_enabled': notificationEnabled,
  };

  UserModel copyWith({
    String? id,
    String? email,
    String? fullName,
    double? disciplineScore,
    bool? isPremium,
    bool? notificationEnabled,
  }) {
    return UserModel(
      id: id ?? this.id,
      email: email ?? this.email,
      fullName: fullName ?? this.fullName,
      disciplineScore: disciplineScore ?? this.disciplineScore,
      isPremium: isPremium ?? this.isPremium,
      notificationEnabled: notificationEnabled ?? this.notificationEnabled,
    );
  }
}

/// User statistics
class UserStats {
  final double totalSaved;
  final int totalVaults;
  final int activeVaults;
  final double disciplineScore;
  final double flexibilityUsed;

  const UserStats({
    this.totalSaved = 0,
    this.totalVaults = 0,
    this.activeVaults = 0,
    this.disciplineScore = 0,
    this.flexibilityUsed = 0,
  });

  factory UserStats.fromJson(Map<String, dynamic> json) {
    return UserStats(
      totalSaved: (json['total_saved'] as num?)?.toDouble() ?? 0,
      totalVaults: json['total_vaults'] as int? ?? 0,
      activeVaults: json['active_vaults'] as int? ?? 0,
      disciplineScore: (json['discipline_score'] as num?)?.toDouble() ?? 0,
      flexibilityUsed: (json['flexibility_used'] as num?)?.toDouble() ?? 0,
    );
  }
}
