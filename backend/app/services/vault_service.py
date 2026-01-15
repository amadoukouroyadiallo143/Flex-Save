"""
Vault service for business logic.
"""

from datetime import date, datetime
from typing import List, Optional
from google.cloud.firestore_v1 import FieldFilter

from app.core.firebase import get_firestore_client
from app.models.vault import Vault


class VaultService:
    """Service for vault operations."""
    
    COLLECTION = "vaults"
    
    async def create(
        self,
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
        
        doc_ref = db.collection(self.COLLECTION).document()
        vault.id = doc_ref.id
        doc_ref.set(vault.to_dict())
        
        return vault
    
    async def get_by_id(self, vault_id: str) -> Optional[Vault]:
        """Get a vault by ID."""
        db = get_firestore_client()
        doc = db.collection(self.COLLECTION).document(vault_id).get()
        
        if doc.exists:
            return Vault.from_dict(doc.id, doc.to_dict())
        return None
    
    async def get_user_vaults(self, user_id: str, active_only: bool = False) -> List[Vault]:
        """Get all vaults for a user."""
        db = get_firestore_client()
        query = db.collection(self.COLLECTION).where(
            filter=FieldFilter("user_id", "==", user_id)
        )
        
        if active_only:
            query = query.where(filter=FieldFilter("is_active", "==", True))
        
        docs = query.order_by("created_at", direction="DESCENDING").stream()
        
        return [Vault.from_dict(doc.id, doc.to_dict()) for doc in docs]
    
    async def deposit(self, vault_id: str, amount: float) -> Vault:
        """Add money to a vault."""
        db = get_firestore_client()
        doc_ref = db.collection(self.COLLECTION).document(vault_id)
        
        doc = doc_ref.get()
        if not doc.exists:
            raise ValueError(f"Vault {vault_id} not found")
        
        vault = Vault.from_dict(doc.id, doc.to_dict())
        vault.current_amount += amount
        
        doc_ref.update({
            "current_amount": vault.current_amount,
            "updated_at": datetime.utcnow().isoformat(),
        })
        
        return vault
    
    async def withdraw(
        self, 
        vault_id: str, 
        amount: float, 
        is_early: bool = False
    ) -> tuple[Vault, float, float]:
        """
        Withdraw from a vault.
        
        Returns:
            Tuple of (updated_vault, fee, net_amount)
        """
        db = get_firestore_client()
        doc_ref = db.collection(self.COLLECTION).document(vault_id)
        
        doc = doc_ref.get()
        if not doc.exists:
            raise ValueError(f"Vault {vault_id} not found")
        
        vault = Vault.from_dict(doc.id, doc.to_dict())
        
        # Calculate fee
        fee, net_amount = self.calculate_withdrawal_fee(vault, amount, is_early)
        
        # Validate
        if amount > vault.current_amount:
            raise ValueError("Insufficient funds")
        
        if is_early and vault.is_locked:
            if amount > vault.flexibility_available:
                raise ValueError(
                    f"Amount exceeds flexibility. Available: {vault.flexibility_available:.2f}"
                )
            vault.flexibility_used += amount
        
        vault.current_amount -= amount
        
        doc_ref.update({
            "current_amount": vault.current_amount,
            "flexibility_used": vault.flexibility_used,
            "updated_at": datetime.utcnow().isoformat(),
        })
        
        return vault, fee, net_amount
    
    def calculate_withdrawal_fee(
        self,
        vault: Vault,
        amount: float,
        is_early: bool = False,
    ) -> tuple[float, float]:
        """
        Calculate fee for withdrawal.
        
        Returns:
            Tuple of (fee, net_amount)
        """
        if not vault.is_locked or not is_early:
            # No fee if vault is unlocked or normal withdrawal
            return 0.0, amount
        
        # Early withdrawal fee: 1%
        fee_rate = 0.01
        fee = amount * fee_rate
        net_amount = amount - fee
        
        return round(fee, 2), round(net_amount, 2)
    
    async def close_vault(self, vault_id: str) -> bool:
        """Close a vault (mark as inactive)."""
        db = get_firestore_client()
        doc_ref = db.collection(self.COLLECTION).document(vault_id)
        
        doc = doc_ref.get()
        if not doc.exists:
            return False
        
        vault = Vault.from_dict(doc.id, doc.to_dict())
        
        if vault.is_locked:
            raise ValueError("Cannot close a locked vault")
        
        if vault.current_amount > 0:
            raise ValueError("Withdraw all funds before closing")
        
        doc_ref.update({
            "is_active": False,
            "updated_at": datetime.utcnow().isoformat(),
        })
        
        return True


vault_service = VaultService()
