"""
Vault (savings box) endpoints.
"""

from datetime import date
from typing import List

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field

from app.api.deps import ActiveUser
from app.services.vault_service import vault_service

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
    unlock_date: str
    flexibility_percentage: float
    flexibility_used: float
    flexibility_available: float
    is_locked: bool
    is_active: bool
    progress_percentage: float
    created_at: str


class DepositRequest(BaseModel):
    """Deposit request."""
    amount: float = Field(..., gt=0)


def vault_to_response(vault) -> VaultResponse:
    """Convert vault model to response."""
    return VaultResponse(
        id=vault.id,
        name=vault.name,
        current_amount=vault.current_amount,
        target_amount=vault.target_amount,
        unlock_date=vault.unlock_date.isoformat(),
        flexibility_percentage=vault.flexibility_percentage,
        flexibility_used=vault.flexibility_used,
        flexibility_available=vault.flexibility_available,
        is_locked=vault.is_locked,
        is_active=vault.is_active,
        progress_percentage=vault.progress_percentage,
        created_at=vault.created_at.isoformat(),
    )


@router.get("/", response_model=List[VaultResponse])
async def list_vaults(
    current_user: ActiveUser,
    active_only: bool = True,
) -> List[VaultResponse]:
    """List all vaults for current user."""
    vaults = await vault_service.get_user_vaults(current_user.id, active_only)
    return [vault_to_response(v) for v in vaults]


@router.post("/", response_model=VaultResponse, status_code=status.HTTP_201_CREATED)
async def create_vault(
    vault: VaultCreate,
    current_user: ActiveUser,
) -> VaultResponse:
    """Create a new savings vault."""
    # Validate unlock date
    if vault.unlock_date <= date.today():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Unlock date must be in the future"
        )
    
    new_vault = await vault_service.create(
        user_id=current_user.id,
        name=vault.name,
        target_amount=vault.target_amount,
        unlock_date=vault.unlock_date,
        flexibility_percentage=vault.flexibility_percentage,
    )
    
    return vault_to_response(new_vault)


@router.get("/{vault_id}", response_model=VaultResponse)
async def get_vault(
    vault_id: str,
    current_user: ActiveUser,
) -> VaultResponse:
    """Get a specific vault."""
    vault = await vault_service.get_by_id(vault_id)
    
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
    
    return vault_to_response(vault)


@router.post("/{vault_id}/deposit", response_model=VaultResponse)
async def deposit_to_vault(
    vault_id: str,
    deposit: DepositRequest,
    current_user: ActiveUser,
) -> VaultResponse:
    """Deposit money into a vault."""
    vault = await vault_service.get_by_id(vault_id)
    
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
    
    updated_vault = await vault_service.deposit(vault_id, deposit.amount)
    
    # Reward discipline
    from app.services.user_service import user_service
    await user_service.update_discipline_score(current_user.id, +1)
    
    return vault_to_response(updated_vault)


@router.delete("/{vault_id}", status_code=status.HTTP_204_NO_CONTENT)
async def close_vault(
    vault_id: str,
    current_user: ActiveUser,
) -> None:
    """Close a vault (only if unlocked and empty)."""
    vault = await vault_service.get_by_id(vault_id)
    
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
        await vault_service.close_vault(vault_id)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
