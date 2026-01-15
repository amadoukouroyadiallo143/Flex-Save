"""
User service for Firestore operations.
"""

from datetime import datetime
from typing import Any, Dict, List, Optional

from app.core.firebase import get_firestore_client
from app.models.user import User, UserRole


class UserService:
    """Service for user operations."""
    
    COLLECTION = "users"
    
    async def create(
        self,
        email: str,
        full_name: str,
        firebase_uid: str,
        role: UserRole = UserRole.USER,
        stripe_customer_id: Optional[str] = None,
    ) -> User:
        """Create a new user in Firestore."""
        db = get_firestore_client()
        
        user = User(
            email=email,
            full_name=full_name,
            firebase_uid=firebase_uid,
            role=role,
            stripe_customer_id=stripe_customer_id,
        )
        
        # Use firebase_uid as document ID for easy lookup
        doc_ref = db.collection(self.COLLECTION).document(firebase_uid)
        doc_ref.set(user.to_dict())
        user.id = firebase_uid
        
        return user
    
    async def create_from_firebase(self, decoded_token: Dict[str, Any]) -> User:
        """Create user from Firebase token claims."""
        return await self.create(
            email=decoded_token.get("email", ""),
            full_name=decoded_token.get("name", decoded_token.get("email", "").split("@")[0]),
            firebase_uid=decoded_token.get("uid"),
        )
    
    async def get_by_id(self, user_id: str) -> Optional[User]:
        """Get a user by ID."""
        db = get_firestore_client()
        doc = db.collection(self.COLLECTION).document(user_id).get()
        
        if doc.exists:
            return User.from_dict(doc.id, doc.to_dict())
        return None
    
    async def get_by_firebase_uid(self, firebase_uid: str) -> Optional[User]:
        """Get a user by Firebase UID."""
        return await self.get_by_id(firebase_uid)
    
    async def get_by_email(self, email: str) -> Optional[User]:
        """Get a user by email."""
        db = get_firestore_client()
        docs = db.collection(self.COLLECTION).where("email", "==", email).limit(1).stream()
        
        for doc in docs:
            return User.from_dict(doc.id, doc.to_dict())
        return None
    
    async def update(self, user_id: str, **kwargs) -> Optional[User]:
        """Update user fields."""
        db = get_firestore_client()
        doc_ref = db.collection(self.COLLECTION).document(user_id)
        
        # Add updated_at
        kwargs["updated_at"] = datetime.utcnow().isoformat()
        
        # Convert role enum to string if present
        if "role" in kwargs and isinstance(kwargs["role"], UserRole):
            kwargs["role"] = kwargs["role"].value
        
        doc_ref.update(kwargs)
        return await self.get_by_id(user_id)
    
    async def update_last_login(self, user_id: str) -> None:
        """Update user's last login time."""
        db = get_firestore_client()
        db.collection(self.COLLECTION).document(user_id).update({
            "last_login": datetime.utcnow().isoformat()
        })
    
    async def update_discipline_score(self, user_id: str, delta: float) -> Optional[User]:
        """Update user's discipline score."""
        user = await self.get_by_id(user_id)
        if user:
            new_score = max(0, min(100, user.discipline_score + delta))
            return await self.update(user_id, discipline_score=new_score)
        return None
    
    async def get_user_stats(self, user_id: str) -> Dict[str, Any]:
        """Get user savings statistics."""
        from app.services.vault_service import vault_service
        
        vaults = await vault_service.get_user_vaults(user_id)
        user = await self.get_by_id(user_id)
        
        total_saved = sum(v.current_amount for v in vaults)
        total_flexibility_used = sum(v.flexibility_used for v in vaults)
        
        return {
            "total_saved": total_saved,
            "total_vaults": len(vaults),
            "active_vaults": len([v for v in vaults if v.is_active]),
            "discipline_score": user.discipline_score if user else 0,
            "flexibility_used": total_flexibility_used,
        }
    
    async def get_all_users_count(self) -> int:
        """Get total number of users."""
        db = get_firestore_client()
        docs = list(db.collection(self.COLLECTION).stream())
        return len(docs)


user_service = UserService()
