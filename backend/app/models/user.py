"""
User model for Firestore.
"""

from dataclasses import dataclass, field
from datetime import datetime
from enum import Enum
from typing import Optional


class UserRole(str, Enum):
    """User roles."""
    USER = "user"
    ADMIN = "admin"


@dataclass
class User:
    """Represents a user."""
    
    id: str = ""
    email: str = ""
    full_name: str = ""
    firebase_uid: str = ""
    role: UserRole = UserRole.USER
    discipline_score: float = 50.0  # Start at 50%
    is_premium: bool = False
    is_active: bool = True
    stripe_customer_id: Optional[str] = None
    notification_enabled: bool = True
    created_at: datetime = field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = None
    last_login: Optional[datetime] = None
    
    @property
    def is_admin(self) -> bool:
        """Check if user is admin."""
        return self.role == UserRole.ADMIN
    
    def to_dict(self) -> dict:
        """Convert to Firestore document."""
        return {
            "email": self.email,
            "full_name": self.full_name,
            "firebase_uid": self.firebase_uid,
            "role": self.role.value,
            "discipline_score": self.discipline_score,
            "is_premium": self.is_premium,
            "is_active": self.is_active,
            "stripe_customer_id": self.stripe_customer_id,
            "notification_enabled": self.notification_enabled,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
            "last_login": self.last_login.isoformat() if self.last_login else None,
        }
    
    @classmethod
    def from_dict(cls, doc_id: str, data: dict) -> "User":
        """Create from Firestore document."""
        return cls(
            id=doc_id,
            email=data.get("email", ""),
            full_name=data.get("full_name", ""),
            firebase_uid=data.get("firebase_uid", doc_id),
            role=UserRole(data.get("role", "user")),
            discipline_score=data.get("discipline_score", 50.0),
            is_premium=data.get("is_premium", False),
            is_active=data.get("is_active", True),
            stripe_customer_id=data.get("stripe_customer_id"),
            notification_enabled=data.get("notification_enabled", True),
            created_at=datetime.fromisoformat(data.get("created_at", datetime.utcnow().isoformat())),
            updated_at=datetime.fromisoformat(data["updated_at"]) if data.get("updated_at") else None,
            last_login=datetime.fromisoformat(data["last_login"]) if data.get("last_login") else None,
        )
