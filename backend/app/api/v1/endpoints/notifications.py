"""
Notifications endpoint.
"""

from typing import List

from fastapi import APIRouter, status
from pydantic import BaseModel

from app.api.deps import ActiveUser
from app.services.notification_service import notification_service

router = APIRouter()


class NotificationResponse(BaseModel):
    """Notification response."""
    id: str
    title: str
    body: str
    type: str
    action_url: str | None = None
    is_read: bool
    created_at: str


@router.get("/", response_model=List[NotificationResponse])
async def get_notifications(
    current_user: ActiveUser,
    unread_only: bool = False,
    limit: int = 20,
) -> List[NotificationResponse]:
    """Get user's notifications."""
    notifications = await notification_service.get_user_notifications(
        user_id=current_user.id,
        unread_only=unread_only,
        limit=limit,
    )
    
    return [
        NotificationResponse(
            id=n["id"],
            title=n["title"],
            body=n["body"],
            type=n["type"],
            action_url=n.get("action_url"),
            is_read=n["is_read"],
            created_at=n["created_at"],
        )
        for n in notifications
    ]


@router.post("/{notification_id}/read", status_code=status.HTTP_204_NO_CONTENT)
async def mark_as_read(notification_id: str, current_user: ActiveUser) -> None:
    """Mark a notification as read."""
    await notification_service.mark_as_read(notification_id)


@router.post("/read-all", status_code=status.HTTP_204_NO_CONTENT)
async def mark_all_as_read(current_user: ActiveUser) -> None:
    """Mark all notifications as read."""
    await notification_service.mark_all_as_read(current_user.id)
