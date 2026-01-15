/// Withdrawal model
class WithdrawalModel {
  final String id;
  final String vaultId;
  final double amount;
  final double fee;
  final double netAmount;
  final bool isEarly;
  final String status;
  final DateTime createdAt;

  const WithdrawalModel({
    required this.id,
    required this.vaultId,
    required this.amount,
    this.fee = 0,
    required this.netAmount,
    this.isEarly = false,
    this.status = 'completed',
    required this.createdAt,
  });

  factory WithdrawalModel.fromJson(Map<String, dynamic> json) {
    return WithdrawalModel(
      id: json['id'] as String,
      vaultId: json['vault_id'] as String,
      amount: (json['amount'] as num).toDouble(),
      fee: (json['fee'] as num?)?.toDouble() ?? 0,
      netAmount: (json['net_amount'] as num).toDouble(),
      isEarly: json['is_early'] as bool? ?? false,
      status: json['status'] as String? ?? 'completed',
      createdAt: DateTime.parse(json['created_at'] as String),
    );
  }
}

/// Withdrawal preview
class WithdrawalPreview {
  final String vaultId;
  final double amount;
  final double fee;
  final double feePercentage;
  final double netAmount;
  final double flexibilityRemaining;
  final bool canWithdraw;
  final String message;

  const WithdrawalPreview({
    required this.vaultId,
    required this.amount,
    this.fee = 0,
    this.feePercentage = 0,
    required this.netAmount,
    this.flexibilityRemaining = 0,
    this.canWithdraw = true,
    this.message = '',
  });

  factory WithdrawalPreview.fromJson(Map<String, dynamic> json) {
    return WithdrawalPreview(
      vaultId: json['vault_id'] as String,
      amount: (json['amount'] as num).toDouble(),
      fee: (json['fee'] as num?)?.toDouble() ?? 0,
      feePercentage: (json['fee_percentage'] as num?)?.toDouble() ?? 0,
      netAmount: (json['net_amount'] as num).toDouble(),
      flexibilityRemaining: (json['flexibility_remaining'] as num?)?.toDouble() ?? 0,
      canWithdraw: json['can_withdraw'] as bool? ?? true,
      message: json['message'] as String? ?? '',
    );
  }
}
