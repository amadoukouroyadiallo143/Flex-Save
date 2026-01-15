"""
Transactions endpoint for all transaction history.
"""

from typing import List, Optional
from datetime import datetime

from fastapi import APIRouter, Query
from pydantic import BaseModel

from app.api.deps import ActiveUser
from app.core.firebase import get_firestore_client

router = APIRouter()


class TransactionResponse(BaseModel):
    """Transaction response."""
    id: str
    type: str  # 'deposit', 'withdrawal', 'vault_created'
    vault_id: Optional[str] = None
    vault_name: Optional[str] = None
    amount: Optional[float] = None
    fee: Optional[float] = None
    created_at: str


@router.get("/", response_model=List[TransactionResponse])
async def get_transactions(
    current_user: ActiveUser,
    limit: int = Query(50, ge=1, le=100),
) -> List[TransactionResponse]:
    """Get user's transaction history."""
    db = get_firestore_client()
    transactions = []
    
    # Get withdrawals
    withdrawals = db.collection("withdrawals")\
        .where("user_id", "==", current_user.id)\
        .order_by("created_at", direction="DESCENDING")\
        .limit(limit)\
        .stream()
    
    for w in withdrawals:
        data = w.to_dict()
        # Get vault name
        vault_name = None
        vault_id = data.get("vault_id")
        if vault_id:
            vault_doc = db.collection("vaults").document(vault_id).get()
            if vault_doc.exists:
                vault_name = vault_doc.to_dict().get("name")
        
        transactions.append(TransactionResponse(
            id=w.id,
            type="withdrawal",
            vault_id=vault_id,
            vault_name=vault_name,
            amount=data.get("amount"),
            fee=data.get("fee"),
            created_at=data.get("created_at", ""),
        ))
    
    # We could also track deposits in a separate collection
    # For now, return withdrawals
    
    # Sort by date
    transactions.sort(key=lambda x: x.created_at, reverse=True)
    
    return transactions[:limit]
