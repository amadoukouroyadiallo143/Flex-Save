"""
User management endpoints.
"""

from typing import Optional

from fastapi import APIRouter
from pydantic import BaseModel, EmailStr

from app.api.deps import ActiveUser
from app.services.user_service import user_service

router = APIRouter()


class UserResponse(BaseModel):
    """User response schema."""
    id: str
    email: str
    full_name: str
    discipline_score: float
    is_premium: bool
    notification_enabled: bool


class UserUpdate(BaseModel):
    """User update schema."""
    full_name: Optional[str] = None
    notification_enabled: Optional[bool] = None


class UserStats(BaseModel):
    """User statistics."""
    total_saved: float
    total_vaults: int
    active_vaults: int
    discipline_score: float
    flexibility_used: float


@router.get("/me", response_model=UserResponse)
async def get_current_user(current_user: ActiveUser) -> UserResponse:
    """Get current authenticated user."""
    return UserResponse(
        id=current_user.id,
        email=current_user.email,
        full_name=current_user.full_name,
        discipline_score=current_user.discipline_score,
        is_premium=current_user.is_premium,
        notification_enabled=current_user.notification_enabled,
    )


@router.patch("/me", response_model=UserResponse)
async def update_current_user(
    update: UserUpdate,
    current_user: ActiveUser,
) -> UserResponse:
    """Update current user."""
    update_data = update.model_dump(exclude_unset=True)
    
    if update_data:
        updated_user = await user_service.update(current_user.id, **update_data)
        if updated_user:
            current_user = updated_user
    
    return UserResponse(
        id=current_user.id,
        email=current_user.email,
        full_name=current_user.full_name,
        discipline_score=current_user.discipline_score,
        is_premium=current_user.is_premium,
        notification_enabled=current_user.notification_enabled,
    )


@router.get("/me/stats", response_model=UserStats)
async def get_user_stats(current_user: ActiveUser) -> UserStats:
    """Get user savings statistics."""
    stats = await user_service.get_user_stats(current_user.id)
    return UserStats(**stats)
