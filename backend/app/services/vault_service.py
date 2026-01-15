"""
Vault service for business logic.
"""

from datetime import date
from typing import List, Optional

from app.core.firebase import get_firestore_client
from app.models.vault import Vault


class VaultService:
    """Service for vault operations."""
    
    COLLECTION = "vaults"
    
    @classmethod
    async def create(
        cls,
        user_id: str,
        name: str,
        target_amount: float,
        unlock_date: date,
        flexibility_percentage: float = 10.0,
    ) -> Vault:
        """Create a new vault."""
        db = get_firestore_client()
        
        vault = Vault(
            user_id=user_id,
            name=name,
            target_amount=target_amount,
            unlock_date=unlock_date,
            flexibility_percentage=flexibility_percentage,
        )
        
        _, doc_ref = db.collection(cls.COLLECTION).add(vault.to_dict())
        vault.id = doc_ref.id
        
        return vault
    
    @classmethod
    async def get_by_id(cls, vault_id: str) -> Optional[Vault]:
        """Get a vault by ID."""
        db = get_firestore_client()
        doc = db.collection(cls.COLLECTION).document(vault_id).get()
        
        if doc.exists:
            return Vault.from_dict(doc.id, doc.to_dict())
        return None
    
    @classmethod
    async def get_user_vaults(cls, user_id: str) -> List[Vault]:
        """Get all vaults for a user."""
        db = get_firestore_client()
        docs = db.collection(cls.COLLECTION).where("user_id", "==", user_id).stream()
        
        return [Vault.from_dict(doc.id, doc.to_dict()) for doc in docs]
    
    @classmethod
    async def deposit(cls, vault_id: str, amount: float) -> Vault:
        """Add money to a vault."""
        db = get_firestore_client()
        doc_ref = db.collection(cls.COLLECTION).document(vault_id)
        
        doc = doc_ref.get()
        if not doc.exists:
            raise ValueError(f"Vault {vault_id} not found")
        
        vault = Vault.from_dict(doc.id, doc.to_dict())
        vault.current_amount += amount
        
        doc_ref.update({
            "current_amount": vault.current_amount,
        })
        
        return vault
    
    @classmethod
    async def calculate_early_withdrawal_fee(
        cls,
        vault: Vault,
        amount: float
    ) -> tuple[float, float]:
        """
        Calculate fee for early withdrawal.
        
        Returns:
            Tuple of (fee, net_amount)
        """
        if not vault.is_locked:
            # No fee if vault is unlocked
            return 0.0, amount
        
        # Check flexibility limit
        if amount > vault.flexibility_available:
            raise ValueError(
                f"Amount exceeds flexibility limit. "
                f"Available: {vault.flexibility_available}"
            )
        
        # Fee: 1% for early withdrawal within flexibility
        fee_rate = 0.01
        fee = amount * fee_rate
        net_amount = amount - fee
        
        return fee, net_amount


vault_service = VaultService()
