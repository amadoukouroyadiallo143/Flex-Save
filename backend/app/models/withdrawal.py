"""
Withdrawal model for Firestore.
"""

from dataclasses import dataclass, field
from datetime import datetime
from enum import Enum
from typing import Optional


class WithdrawalStatus(str, Enum):
    """Withdrawal status enum."""
    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"


@dataclass
class Withdrawal:
    """Represents a withdrawal transaction."""
    
    id: str = ""
    user_id: str = ""
    vault_id: str = ""
    amount: float = 0.0
    fee: float = 0.0
    net_amount: float = 0.0
    is_early: bool = False
    status: WithdrawalStatus = WithdrawalStatus.PENDING
    stripe_transfer_id: Optional[str] = None
    created_at: datetime = field(default_factory=datetime.utcnow)
    completed_at: Optional[datetime] = None
    
    def to_dict(self) -> dict:
        """Convert to Firestore document."""
        return {
            "user_id": self.user_id,
            "vault_id": self.vault_id,
            "amount": self.amount,
            "fee": self.fee,
            "net_amount": self.net_amount,
            "is_early": self.is_early,
            "status": self.status.value,
            "stripe_transfer_id": self.stripe_transfer_id,
            "created_at": self.created_at.isoformat(),
            "completed_at": self.completed_at.isoformat() if self.completed_at else None,
        }
    
    @classmethod
    def from_dict(cls, doc_id: str, data: dict) -> "Withdrawal":
        """Create from Firestore document."""
        return cls(
            id=doc_id,
            user_id=data.get("user_id", ""),
            vault_id=data.get("vault_id", ""),
            amount=data.get("amount", 0),
            fee=data.get("fee", 0),
            net_amount=data.get("net_amount", 0),
            is_early=data.get("is_early", False),
            status=WithdrawalStatus(data.get("status", "pending")),
            stripe_transfer_id=data.get("stripe_transfer_id"),
            created_at=datetime.fromisoformat(data.get("created_at", datetime.utcnow().isoformat())),
            completed_at=datetime.fromisoformat(data["completed_at"]) if data.get("completed_at") else None,
        )
