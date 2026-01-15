"""
Admin service for platform management.
"""

from typing import Any, Dict, List, Optional
from google.cloud.firestore_v1 import FieldFilter

from app.core.firebase import get_firestore_client
from app.models.user import User, UserRole
from app.models.vault import Vault


class AdminService:
    """Service for admin operations."""
    
    async def get_global_stats(self) -> Dict[str, Any]:
        """Get global platform statistics."""
        db = get_firestore_client()
        
        # Get users stats
        users_ref = db.collection("users")
        all_users = list(users_ref.stream())
        
        total_users = len(all_users)
        active_users = sum(1 for u in all_users if u.to_dict().get("is_active", True))
        premium_users = sum(1 for u in all_users if u.to_dict().get("is_premium", False))
        
        # Calculate average discipline score
        discipline_scores = [u.to_dict().get("discipline_score", 50) for u in all_users]
        avg_discipline = sum(discipline_scores) / len(discipline_scores) if discipline_scores else 0
        
        # Get vaults stats
        vaults_ref = db.collection("vaults")
        all_vaults = list(vaults_ref.stream())
        
        total_vaults = len(all_vaults)
        active_vaults = sum(1 for v in all_vaults if v.to_dict().get("is_active", True))
        total_saved = sum(v.to_dict().get("current_amount", 0) for v in all_vaults)
        
        # Get withdrawals stats
        withdrawals_ref = db.collection("withdrawals")
        all_withdrawals = list(withdrawals_ref.stream())
        
        total_withdrawals = len(all_withdrawals)
        total_withdrawn = sum(w.to_dict().get("amount", 0) for w in all_withdrawals)
        
        return {
            "total_users": total_users,
            "active_users": active_users,
            "premium_users": premium_users,
            "total_vaults": total_vaults,
            "active_vaults": active_vaults,
            "total_saved": round(total_saved, 2),
            "total_withdrawals": total_withdrawals,
            "total_withdrawn": round(total_withdrawn, 2),
            "avg_discipline_score": round(avg_discipline, 1),
        }
    
    async def list_users(
        self,
        skip: int = 0,
        limit: int = 50,
        role: Optional[str] = None,
        is_active: Optional[bool] = None,
    ) -> List[User]:
        """List users with pagination and filters."""
        db = get_firestore_client()
        query = db.collection("users")
        
        if role:
            query = query.where(filter=FieldFilter("role", "==", role))
        
        if is_active is not None:
            query = query.where(filter=FieldFilter("is_active", "==", is_active))
        
        # Order by created_at descending
        query = query.order_by("created_at", direction="DESCENDING")
        query = query.offset(skip).limit(limit)
        
        docs = query.stream()
        return [User.from_dict(doc.id, doc.to_dict()) for doc in docs]
    
    async def get_recent_activity(self, limit: int = 20) -> List[Dict[str, Any]]:
        """Get recent platform activity."""
        db = get_firestore_client()
        
        # Get recent withdrawals
        withdrawals = db.collection("withdrawals")\
            .order_by("created_at", direction="DESCENDING")\
            .limit(limit)\
            .stream()
        
        activities = []
        for w in withdrawals:
            data = w.to_dict()
            activities.append({
                "type": "withdrawal",
                "id": w.id,
                "user_id": data.get("user_id"),
                "amount": data.get("amount"),
                "created_at": data.get("created_at"),
            })
        
        return activities
    
    async def get_top_savers(self, limit: int = 10) -> List[Dict[str, Any]]:
        """Get top savers by total amount."""
        db = get_firestore_client()
        
        # Get all vaults grouped by user
        vaults = list(db.collection("vaults").stream())
        
        user_totals: Dict[str, float] = {}
        for v in vaults:
            data = v.to_dict()
            user_id = data.get("user_id")
            amount = data.get("current_amount", 0)
            user_totals[user_id] = user_totals.get(user_id, 0) + amount
        
        # Sort and get top
        sorted_users = sorted(user_totals.items(), key=lambda x: x[1], reverse=True)[:limit]
        
        # Get user details
        result = []
        for user_id, total in sorted_users:
            user_doc = db.collection("users").document(user_id).get()
            if user_doc.exists:
                user_data = user_doc.to_dict()
                result.append({
                    "user_id": user_id,
                    "email": user_data.get("email"),
                    "full_name": user_data.get("full_name"),
                    "total_saved": round(total, 2),
                })
        
        return result


admin_service = AdminService()
