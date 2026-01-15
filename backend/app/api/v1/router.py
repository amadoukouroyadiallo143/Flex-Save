"""
API v1 router - aggregates all endpoint routers.
"""

from fastapi import APIRouter

from app.api.v1.endpoints import auth, users, vaults, withdrawals, admin, transactions, notifications, webhooks

router = APIRouter()

# Include all endpoint routers
router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
router.include_router(users.router, prefix="/users", tags=["Users"])
router.include_router(vaults.router, prefix="/vaults", tags=["Vaults"])
router.include_router(withdrawals.router, prefix="/withdrawals", tags=["Withdrawals"])
router.include_router(transactions.router, prefix="/transactions", tags=["Transactions"])
router.include_router(notifications.router, prefix="/notifications", tags=["Notifications"])
router.include_router(admin.router, prefix="/admin", tags=["Admin"])
router.include_router(webhooks.router, prefix="/webhooks", tags=["Webhooks"])

