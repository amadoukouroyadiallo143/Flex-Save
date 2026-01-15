"""
Notification service for push notifications.
"""

from typing import Optional
from datetime import datetime

from app.core.firebase import get_firestore_client


class NotificationService:
    """Service for managing notifications."""
    
    COLLECTION = "notifications"
    
    async def create(
        self,
        user_id: str,
        title: str,
        body: str,
        notification_type: str = "info",  # info, success, warning, action
        action_url: Optional[str] = None,
    ) -> str:
        """Create a notification for a user."""
        db = get_firestore_client()
        
        notification = {
            "user_id": user_id,
            "title": title,
            "body": body,
            "type": notification_type,
            "action_url": action_url,
            "is_read": False,
            "created_at": datetime.utcnow().isoformat(),
        }
        
        doc_ref = db.collection(self.COLLECTION).document()
        doc_ref.set(notification)
        
        return doc_ref.id
    
    async def get_user_notifications(
        self,
        user_id: str,
        unread_only: bool = False,
        limit: int = 20,
    ) -> list:
        """Get notifications for a user."""
        db = get_firestore_client()
        
        query = db.collection(self.COLLECTION)\
            .where("user_id", "==", user_id)\
            .order_by("created_at", direction="DESCENDING")
        
        if unread_only:
            query = query.where("is_read", "==", False)
        
        query = query.limit(limit)
        
        notifications = []
        for doc in query.stream():
            data = doc.to_dict()
            data["id"] = doc.id
            notifications.append(data)
        
        return notifications
    
    async def mark_as_read(self, notification_id: str) -> None:
        """Mark a notification as read."""
        db = get_firestore_client()
        db.collection(self.COLLECTION).document(notification_id).update({
            "is_read": True,
            "read_at": datetime.utcnow().isoformat(),
        })
    
    async def mark_all_as_read(self, user_id: str) -> None:
        """Mark all notifications as read for a user."""
        db = get_firestore_client()
        notifications = db.collection(self.COLLECTION)\
            .where("user_id", "==", user_id)\
            .where("is_read", "==", False)\
            .stream()
        
        for doc in notifications:
            doc.reference.update({
                "is_read": True,
                "read_at": datetime.utcnow().isoformat(),
            })
    
    # Predefined notifications
    async def notify_deposit(self, user_id: str, vault_name: str, amount: float) -> str:
        """Notify user of a successful deposit."""
        return await self.create(
            user_id=user_id,
            title="Dépôt effectué 💰",
            body=f"{amount:.2f} € ajouté à votre coffre {vault_name}",
            notification_type="success",
            action_url="/dashboard/vaults",
        )
    
    async def notify_withdrawal(self, user_id: str, vault_name: str, amount: float, fee: float = 0) -> str:
        """Notify user of a withdrawal."""
        body = f"Retrait de {amount:.2f} € depuis {vault_name}"
        if fee > 0:
            body += f" (frais: {fee:.2f} €)"
        
        return await self.create(
            user_id=user_id,
            title="Retrait effectué",
            body=body,
            notification_type="info",
        )
    
    async def notify_vault_unlocked(self, user_id: str, vault_name: str) -> str:
        """Notify user when a vault is unlocked."""
        return await self.create(
            user_id=user_id,
            title="Coffre débloqué ! 🎉",
            body=f"Votre coffre {vault_name} est maintenant disponible",
            notification_type="success",
            action_url="/dashboard/vaults",
        )
    
    async def notify_goal_reached(self, user_id: str, vault_name: str) -> str:
        """Notify user when a savings goal is reached."""
        return await self.create(
            user_id=user_id,
            title="Objectif atteint ! 🏆",
            body=f"Félicitations ! Vous avez atteint votre objectif pour {vault_name}",
            notification_type="success",
            action_url="/dashboard/vaults",
        )
    
    async def notify_encouragement(self, user_id: str, days_since_deposit: int) -> str:
        """Send encouragement notification."""
        return await self.create(
            user_id=user_id,
            title="On continue ? 💪",
            body=f"Il y a {days_since_deposit} jours que vous n'avez pas épargné. Même un petit montant compte !",
            notification_type="action",
            action_url="/dashboard/vaults",
        )


notification_service = NotificationService()
