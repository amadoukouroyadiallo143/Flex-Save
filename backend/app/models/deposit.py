"""
Deposits model and tracking.
"""

from dataclasses import dataclass, field
from datetime import datetime


@dataclass
class Deposit:
    """Represents a deposit transaction."""
    
    id: str = ""
    user_id: str = ""
    vault_id: str = ""
    amount: float = 0.0
    status: str = "completed"  # pending, completed, failed
    created_at: datetime = field(default_factory=datetime.utcnow)
    
    def to_dict(self) -> dict:
        """Convert to Firestore document."""
        return {
            "user_id": self.user_id,
            "vault_id": self.vault_id,
            "amount": self.amount,
            "status": self.status,
            "created_at": self.created_at.isoformat(),
        }
    
    @classmethod
    def from_dict(cls, doc_id: str, data: dict) -> "Deposit":
        """Create from Firestore document."""
        return cls(
            id=doc_id,
            user_id=data.get("user_id", ""),
            vault_id=data.get("vault_id", ""),
            amount=data.get("amount", 0.0),
            status=data.get("status", "completed"),
            created_at=datetime.fromisoformat(data.get("created_at", datetime.utcnow().isoformat())),
        )
