"""
API v1 Router - Aggregates all endpoint routers.
"""

from fastapi import APIRouter

from app.api.v1.endpoints import auth, users, vaults, withdrawals

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(users.router, prefix="/users", tags=["Users"])
api_router.include_router(vaults.router, prefix="/vaults", tags=["Vaults"])
api_router.include_router(withdrawals.router, prefix="/withdrawals", tags=["Withdrawals"])
