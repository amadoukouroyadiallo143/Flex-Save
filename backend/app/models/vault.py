"""
Vault model for Firestore.
"""

from dataclasses import dataclass, field
from datetime import date, datetime
from typing import Optional


@dataclass
class Vault:
    """Represents a savings vault."""
    
    id: str = ""
    user_id: str = ""
    name: str = ""
    current_amount: float = 0.0
    target_amount: float = 0.0
    unlock_date: date = field(default_factory=date.today)
    flexibility_percentage: float = 10.0
    flexibility_used: float = 0.0
    is_active: bool = True
    created_at: datetime = field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = None
    
    @property
    def is_locked(self) -> bool:
        """Check if vault is still locked."""
        return date.today() < self.unlock_date
    
    @property
    def flexibility_available(self) -> float:
        """Calculate remaining flexibility."""
        max_flex = self.current_amount * (self.flexibility_percentage / 100)
        return max(0, max_flex - self.flexibility_used)
    
    @property
    def progress_percentage(self) -> float:
        """Calculate progress towards target."""
        if self.target_amount <= 0:
            return 0
        return min(100, (self.current_amount / self.target_amount) * 100)
    
    def to_dict(self) -> dict:
        """Convert to Firestore document."""
        return {
            "user_id": self.user_id,
            "name": self.name,
            "current_amount": self.current_amount,
            "target_amount": self.target_amount,
            "unlock_date": self.unlock_date.isoformat(),
            "flexibility_percentage": self.flexibility_percentage,
            "flexibility_used": self.flexibility_used,
            "is_active": self.is_active,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }
    
    @classmethod
    def from_dict(cls, doc_id: str, data: dict) -> "Vault":
        """Create from Firestore document."""
        return cls(
            id=doc_id,
            user_id=data.get("user_id", ""),
            name=data.get("name", ""),
            current_amount=data.get("current_amount", 0),
            target_amount=data.get("target_amount", 0),
            unlock_date=date.fromisoformat(data.get("unlock_date", date.today().isoformat())),
            flexibility_percentage=data.get("flexibility_percentage", 10.0),
            flexibility_used=data.get("flexibility_used", 0),
            is_active=data.get("is_active", True),
            created_at=datetime.fromisoformat(data.get("created_at", datetime.utcnow().isoformat())),
            updated_at=datetime.fromisoformat(data["updated_at"]) if data.get("updated_at") else None,
        )
