"""
Withdrawal endpoints - handles early and regular withdrawals.
"""

from typing import List, Optional

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field

from app.api.deps import ActiveUser
from app.services.withdrawal_service import withdrawal_service
from app.services.vault_service import vault_service

router = APIRouter()


class WithdrawalRequest(BaseModel):
    """Withdrawal request schema."""
    vault_id: str
    amount: float = Field(..., gt=0)
    is_early_withdrawal: bool = False


class WithdrawalResponse(BaseModel):
    """Withdrawal response schema."""
    id: str
    vault_id: str
    amount: float
    fee: float
    net_amount: float
    is_early: bool
    status: str
    created_at: str


class WithdrawalPreview(BaseModel):
    """Preview of withdrawal with fees."""
    vault_id: str
    amount: float
    fee: float
    fee_percentage: float
    net_amount: float
    flexibility_remaining: float
    can_withdraw: bool
    message: str


def withdrawal_to_response(w) -> WithdrawalResponse:
    """Convert withdrawal model to response."""
    return WithdrawalResponse(
        id=w.id,
        vault_id=w.vault_id,
        amount=w.amount,
        fee=w.fee,
        net_amount=w.net_amount,
        is_early=w.is_early,
        status=w.status.value,
        created_at=w.created_at.isoformat(),
    )


@router.post("/preview", response_model=WithdrawalPreview)
async def preview_withdrawal(
    request: WithdrawalRequest,
    current_user: ActiveUser,
) -> WithdrawalPreview:
    """Preview withdrawal with fee calculation."""
    # Verify ownership
    vault = await vault_service.get_by_id(request.vault_id)
    if not vault:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Vault not found"
        )
    
    if vault.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized"
        )
    
    preview = await withdrawal_service.preview(
        vault_id=request.vault_id,
        amount=request.amount,
        is_early=request.is_early_withdrawal,
    )
    
    return WithdrawalPreview(**preview)


@router.post("/", response_model=WithdrawalResponse, status_code=status.HTTP_201_CREATED)
async def create_withdrawal(
    request: WithdrawalRequest,
    current_user: ActiveUser,
) -> WithdrawalResponse:
    """Create a withdrawal request."""
    # Verify ownership
    vault = await vault_service.get_by_id(request.vault_id)
    if not vault:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Vault not found"
        )
    
    if vault.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized"
        )
    
    try:
        withdrawal = await withdrawal_service.create(
            user_id=current_user.id,
            vault_id=request.vault_id,
            amount=request.amount,
            is_early=request.is_early_withdrawal,
        )
        return withdrawal_to_response(withdrawal)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.get("/", response_model=List[WithdrawalResponse])
async def list_withdrawals(
    current_user: ActiveUser,
    vault_id: Optional[str] = None,
) -> List[WithdrawalResponse]:
    """List withdrawal history."""
    # If vault_id provided, verify ownership
    if vault_id:
        vault = await vault_service.get_by_id(vault_id)
        if vault and vault.user_id != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized"
            )
    
    withdrawals = await withdrawal_service.get_user_withdrawals(
        current_user.id, 
        vault_id
    )
    return [withdrawal_to_response(w) for w in withdrawals]


@router.get("/{withdrawal_id}", response_model=WithdrawalResponse)
async def get_withdrawal(
    withdrawal_id: str,
    current_user: ActiveUser,
) -> WithdrawalResponse:
    """Get a specific withdrawal."""
    withdrawal = await withdrawal_service.get_by_id(withdrawal_id)
    
    if not withdrawal:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Withdrawal not found"
        )
    
    if withdrawal.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized"
        )
    
    return withdrawal_to_response(withdrawal)
