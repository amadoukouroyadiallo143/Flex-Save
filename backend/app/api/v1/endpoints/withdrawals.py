"""
Withdrawal endpoints - handles early and regular withdrawals.
"""

from typing import List

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field

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
    status: str  # pending, completed, failed
    created_at: str


class WithdrawalPreview(BaseModel):
    """Preview of withdrawal with fees."""
    amount: float
    fee: float
    fee_percentage: float
    net_amount: float
    flexibility_remaining: float
    can_withdraw: bool
    message: str


@router.post("/preview", response_model=WithdrawalPreview)
async def preview_withdrawal(request: WithdrawalRequest) -> WithdrawalPreview:
    """Preview withdrawal with fee calculation."""
    # TODO: Calculate fees based on early/normal withdrawal
    return WithdrawalPreview(
        amount=request.amount,
        fee=0,
        fee_percentage=0,
        net_amount=request.amount,
        flexibility_remaining=10.0,
        can_withdraw=True,
        message="Preview not yet implemented"
    )


@router.post("/", response_model=WithdrawalResponse, status_code=status.HTTP_201_CREATED)
async def create_withdrawal(request: WithdrawalRequest) -> WithdrawalResponse:
    """Create a withdrawal request."""
    # TODO: Implement withdrawal via Stripe
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Not yet implemented"
    )


@router.get("/", response_model=List[WithdrawalResponse])
async def list_withdrawals(vault_id: str | None = None) -> List[WithdrawalResponse]:
    """List withdrawal history."""
    # TODO: Implement withdrawal listing
    return []


@router.get("/{withdrawal_id}", response_model=WithdrawalResponse)
async def get_withdrawal(withdrawal_id: str) -> WithdrawalResponse:
    """Get a specific withdrawal."""
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Withdrawal not found"
    )
