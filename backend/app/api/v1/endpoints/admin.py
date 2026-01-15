"""
Admin endpoints - User management and global statistics.
"""

from typing import List, Optional

from fastapi import APIRouter, HTTPException, Query, status
from pydantic import BaseModel

from app.api.deps import AdminUser
from app.models.user import UserRole
from app.services.user_service import user_service
from app.services.admin_service import admin_service

router = APIRouter()


class AdminUserResponse(BaseModel):
    """User response for admin."""
    id: str
    email: str
    full_name: str
    role: str
    discipline_score: float
    is_premium: bool
    is_active: bool
    created_at: str
    last_login: Optional[str] = None


class AdminUserUpdate(BaseModel):
    """Update user by admin."""
    is_active: Optional[bool] = None
    is_premium: Optional[bool] = None
    role: Optional[str] = None


class GlobalStats(BaseModel):
    """Global platform statistics."""
    total_users: int
    active_users: int
    premium_users: int
    total_vaults: int
    active_vaults: int
    total_saved: float
    total_withdrawals: int
    total_withdrawn: float
    avg_discipline_score: float


class UserStatsDetail(BaseModel):
    """Detailed user stats for admin."""
    user_id: str
    email: str
    full_name: str
    total_vaults: int
    total_saved: float
    discipline_score: float
    last_activity: Optional[str] = None


@router.get("/stats", response_model=GlobalStats)
async def get_global_stats(admin: AdminUser) -> GlobalStats:
    """Get global platform statistics."""
    stats = await admin_service.get_global_stats()
    return GlobalStats(**stats)


@router.get("/users", response_model=List[AdminUserResponse])
async def list_users(
    admin: AdminUser,
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    role: Optional[str] = None,
    is_active: Optional[bool] = None,
) -> List[AdminUserResponse]:
    """List all users with filters."""
    users = await admin_service.list_users(
        skip=skip,
        limit=limit,
        role=role,
        is_active=is_active,
    )
    
    return [
        AdminUserResponse(
            id=u.id,
            email=u.email,
            full_name=u.full_name,
            role=u.role.value,
            discipline_score=u.discipline_score,
            is_premium=u.is_premium,
            is_active=u.is_active,
            created_at=u.created_at.isoformat(),
            last_login=u.last_login.isoformat() if u.last_login else None,
        )
        for u in users
    ]


@router.get("/users/{user_id}", response_model=AdminUserResponse)
async def get_user(user_id: str, admin: AdminUser) -> AdminUserResponse:
    """Get a specific user."""
    user = await user_service.get_by_id(user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    return AdminUserResponse(
        id=user.id,
        email=user.email,
        full_name=user.full_name,
        role=user.role.value,
        discipline_score=user.discipline_score,
        is_premium=user.is_premium,
        is_active=user.is_active,
        created_at=user.created_at.isoformat(),
        last_login=user.last_login.isoformat() if user.last_login else None,
    )


@router.patch("/users/{user_id}", response_model=AdminUserResponse)
async def update_user(
    user_id: str,
    update: AdminUserUpdate,
    admin: AdminUser,
) -> AdminUserResponse:
    """Update a user (admin only)."""
    user = await user_service.get_by_id(user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    update_data = update.model_dump(exclude_unset=True)
    
    # Convert role string to enum
    if "role" in update_data:
        update_data["role"] = UserRole(update_data["role"])
    
    updated_user = await user_service.update(user_id, **update_data)
    
    return AdminUserResponse(
        id=updated_user.id,
        email=updated_user.email,
        full_name=updated_user.full_name,
        role=updated_user.role.value,
        discipline_score=updated_user.discipline_score,
        is_premium=updated_user.is_premium,
        is_active=updated_user.is_active,
        created_at=updated_user.created_at.isoformat(),
        last_login=updated_user.last_login.isoformat() if updated_user.last_login else None,
    )


@router.get("/users/{user_id}/stats", response_model=UserStatsDetail)
async def get_user_detailed_stats(
    user_id: str,
    admin: AdminUser,
) -> UserStatsDetail:
    """Get detailed stats for a specific user."""
    user = await user_service.get_by_id(user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    stats = await user_service.get_user_stats(user_id)
    
    return UserStatsDetail(
        user_id=user.id,
        email=user.email,
        full_name=user.full_name,
        total_vaults=stats["total_vaults"],
        total_saved=stats["total_saved"],
        discipline_score=user.discipline_score,
        last_activity=user.last_login.isoformat() if user.last_login else None,
    )


@router.post("/users/{user_id}/disable", status_code=status.HTTP_204_NO_CONTENT)
async def disable_user(user_id: str, admin: AdminUser) -> None:
    """Disable a user account."""
    user = await user_service.get_by_id(user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Don't allow disabling yourself
    if user.id == admin.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot disable your own account"
        )
    
    await user_service.update(user_id, is_active=False)


@router.post("/users/{user_id}/enable", status_code=status.HTTP_204_NO_CONTENT)
async def enable_user(user_id: str, admin: AdminUser) -> None:
    """Enable a user account."""
    user = await user_service.get_by_id(user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    await user_service.update(user_id, is_active=True)
