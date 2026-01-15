"""
Vault (savings box) endpoints.
"""

from datetime import date
from typing import List

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field

router = APIRouter()


class VaultCreate(BaseModel):
    """Create vault request."""
    name: str = Field(..., min_length=1, max_length=100)
    target_amount: float = Field(..., gt=0)
    unlock_date: date
    flexibility_percentage: float = Field(default=10.0, ge=0, le=10)


class VaultResponse(BaseModel):
    """Vault response schema."""
    id: str
    name: str
    current_amount: float
    target_amount: float
    unlock_date: date
    flexibility_percentage: float
    flexibility_used: float
    is_locked: bool
    created_at: str


class DepositRequest(BaseModel):
    """Deposit request."""
    amount: float = Field(..., gt=0)


@router.get("/", response_model=List[VaultResponse])
async def list_vaults() -> List[VaultResponse]:
    """List all vaults for current user."""
    # TODO: Implement vault listing
    return []


@router.post("/", response_model=VaultResponse, status_code=status.HTTP_201_CREATED)
async def create_vault(vault: VaultCreate) -> VaultResponse:
    """Create a new savings vault."""
    # TODO: Implement vault creation
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Not yet implemented"
    )


@router.get("/{vault_id}", response_model=VaultResponse)
async def get_vault(vault_id: str) -> VaultResponse:
    """Get a specific vault."""
    # TODO: Implement vault retrieval
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Vault not found"
    )


@router.post("/{vault_id}/deposit", response_model=VaultResponse)
async def deposit_to_vault(vault_id: str, deposit: DepositRequest) -> VaultResponse:
    """Deposit money into a vault."""
    # TODO: Implement deposit via Stripe
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Not yet implemented"
    )


@router.delete("/{vault_id}", status_code=status.HTTP_204_NO_CONTENT)
async def close_vault(vault_id: str) -> None:
    """Close a vault (only if unlocked)."""
    # TODO: Implement vault closure
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Not yet implemented"
    )
