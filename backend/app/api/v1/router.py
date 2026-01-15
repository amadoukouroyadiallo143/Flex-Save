"""
API v1 router - aggregates all endpoint routers.
"""

from fastapi import APIRouter

from app.api.v1.endpoints import auth, users, vaults, withdrawals, admin

router = APIRouter()

# Include all endpoint routers
router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
router.include_router(users.router, prefix="/users", tags=["Users"])
router.include_router(vaults.router, prefix="/vaults", tags=["Vaults"])
router.include_router(withdrawals.router, prefix="/withdrawals", tags=["Withdrawals"])
router.include_router(admin.router, prefix="/admin", tags=["Admin"])
