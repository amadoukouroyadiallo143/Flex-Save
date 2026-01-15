"""
User management endpoints.
"""

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr

router = APIRouter()


class UserResponse(BaseModel):
    """User response schema."""
    id: str
    email: EmailStr
    full_name: str
    discipline_score: float = 0.0
    is_premium: bool = False


class UserUpdate(BaseModel):
    """User update schema."""
    full_name: str | None = None
    notification_enabled: bool | None = None


@router.get("/me", response_model=UserResponse)
async def get_current_user() -> UserResponse:
    """Get current authenticated user."""
    # TODO: Implement with authentication
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Not yet implemented"
    )


@router.patch("/me", response_model=UserResponse)
async def update_current_user(update: UserUpdate) -> UserResponse:
    """Update current user."""
    # TODO: Implement user update
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Not yet implemented"
    )


@router.get("/me/stats")
async def get_user_stats() -> dict:
    """Get user savings statistics."""
    # TODO: Implement stats calculation
    return {
        "total_saved": 0,
        "total_vaults": 0,
        "discipline_score": 0,
        "flexibility_used": 0,
    }
