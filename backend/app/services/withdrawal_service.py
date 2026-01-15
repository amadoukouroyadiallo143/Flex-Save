"""
Withdrawal service for transaction management.
"""

from datetime import datetime
from typing import List, Optional
from google.cloud.firestore_v1 import FieldFilter

from app.core.firebase import get_firestore_client
from app.models.withdrawal import Withdrawal, WithdrawalStatus
from app.services.vault_service import vault_service


class WithdrawalService:
    """Service for withdrawal operations."""
    
    COLLECTION = "withdrawals"
    
    async def preview(
        self,
        vault_id: str,
        amount: float,
        is_early: bool = False,
    ) -> dict:
        """Preview a withdrawal with fee calculation."""
        vault = await vault_service.get_by_id(vault_id)
        if not vault:
            raise ValueError("Vault not found")
        
        fee, net_amount = vault_service.calculate_withdrawal_fee(vault, amount, is_early)
        
        can_withdraw = True
        message = "Withdrawal available"
        
        if amount > vault.current_amount:
            can_withdraw = False
            message = "Insufficient funds"
        elif is_early and vault.is_locked and amount > vault.flexibility_available:
            can_withdraw = False
            message = f"Exceeds flexibility limit ({vault.flexibility_available:.2f}€ available)"
        
        return {
            "vault_id": vault_id,
            "amount": amount,
            "fee": fee,
            "fee_percentage": 1.0 if (is_early and vault.is_locked) else 0.0,
            "net_amount": net_amount,
            "flexibility_remaining": max(0, vault.flexibility_available - amount) if is_early else vault.flexibility_available,
            "can_withdraw": can_withdraw,
            "message": message,
        }
    
    async def create(
        self,
        user_id: str,
        vault_id: str,
        amount: float,
        is_early: bool = False,
    ) -> Withdrawal:
        """Create a withdrawal transaction."""
        db = get_firestore_client()
        
        # Perform withdrawal
        vault, fee, net_amount = await vault_service.withdraw(vault_id, amount, is_early)
        
        # Verify ownership
        if vault.user_id != user_id:
            raise ValueError("Not authorized")
        
        # Create withdrawal record
        withdrawal = Withdrawal(
            user_id=user_id,
            vault_id=vault_id,
            amount=amount,
            fee=fee,
            net_amount=net_amount,
            is_early=is_early,
            status=WithdrawalStatus.COMPLETED,
            completed_at=datetime.utcnow(),
        )
        
        doc_ref = db.collection(self.COLLECTION).document()
        withdrawal.id = doc_ref.id
        doc_ref.set(withdrawal.to_dict())
        
        # Update user discipline score
        if is_early and vault.is_locked:
            # Penalize early withdrawal
            from app.services.user_service import user_service
            await user_service.update_discipline_score(user_id, -2)
        
        return withdrawal
    
    async def get_by_id(self, withdrawal_id: str) -> Optional[Withdrawal]:
        """Get withdrawal by ID."""
        db = get_firestore_client()
        doc = db.collection(self.COLLECTION).document(withdrawal_id).get()
        
        if doc.exists:
            return Withdrawal.from_dict(doc.id, doc.to_dict())
        return None
    
    async def get_user_withdrawals(
        self, 
        user_id: str, 
        vault_id: Optional[str] = None,
        limit: int = 50,
    ) -> List[Withdrawal]:
        """Get withdrawal history for a user."""
        db = get_firestore_client()
        query = db.collection(self.COLLECTION).where(
            filter=FieldFilter("user_id", "==", user_id)
        )
        
        if vault_id:
            query = query.where(filter=FieldFilter("vault_id", "==", vault_id))
        
        docs = query.order_by("created_at", direction="DESCENDING").limit(limit).stream()
        
        return [Withdrawal.from_dict(doc.id, doc.to_dict()) for doc in docs]
    
    async def get_vault_withdrawals(self, vault_id: str, limit: int = 20) -> List[Withdrawal]:
        """Get withdrawal history for a vault."""
        db = get_firestore_client()
        query = db.collection(self.COLLECTION).where(
            filter=FieldFilter("vault_id", "==", vault_id)
        ).order_by("created_at", direction="DESCENDING").limit(limit)
        
        docs = query.stream()
        return [Withdrawal.from_dict(doc.id, doc.to_dict()) for doc in docs]


withdrawal_service = WithdrawalService()
