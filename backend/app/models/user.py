"""
User model for Firestore.
"""

from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional


@dataclass
class User:
    """Represents a user."""
    
    id: str = ""
    email: str = ""
    full_name: str = ""
    hashed_password: str = ""
    discipline_score: float = 0.0
    is_premium: bool = False
    is_active: bool = True
    stripe_customer_id: Optional[str] = None
    created_at: datetime = field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = None
    
    def to_dict(self) -> dict:
        """Convert to Firestore document."""
        return {
            "email": self.email,
            "full_name": self.full_name,
            "hashed_password": self.hashed_password,
            "discipline_score": self.discipline_score,
            "is_premium": self.is_premium,
            "is_active": self.is_active,
            "stripe_customer_id": self.stripe_customer_id,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }
    
    @classmethod
    def from_dict(cls, doc_id: str, data: dict) -> "User":
        """Create from Firestore document."""
        return cls(
            id=doc_id,
            email=data.get("email", ""),
            full_name=data.get("full_name", ""),
            hashed_password=data.get("hashed_password", ""),
            discipline_score=data.get("discipline_score", 0.0),
            is_premium=data.get("is_premium", False),
            is_active=data.get("is_active", True),
            stripe_customer_id=data.get("stripe_customer_id"),
            created_at=datetime.fromisoformat(data.get("created_at", datetime.utcnow().isoformat())),
            updated_at=datetime.fromisoformat(data["updated_at"]) if data.get("updated_at") else None,
        )
