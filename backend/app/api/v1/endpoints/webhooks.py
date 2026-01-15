"""
Stripe webhook handlers.
"""

from fastapi import APIRouter, Request, HTTPException, Header
from typing import Optional
import stripe

from app.core.config import settings
from app.services.notification_service import notification_service

router = APIRouter()


@router.post("/stripe")
async def stripe_webhook(
    request: Request,
    stripe_signature: Optional[str] = Header(None, alias="Stripe-Signature"),
):
    """Handle Stripe webhook events."""
    if not stripe_signature:
        raise HTTPException(status_code=400, detail="Missing Stripe signature")
    
    payload = await request.body()
    
    try:
        # Verify webhook signature
        event = stripe.Webhook.construct_event(
            payload,
            stripe_signature,
            settings.STRIPE_WEBHOOK_SECRET,
        )
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid payload")
    except stripe.error.SignatureVerificationError:
        raise HTTPException(status_code=400, detail="Invalid signature")
    
    # Handle the event
    event_type = event["type"]
    data = event["data"]["object"]
    
    if event_type == "payment_intent.succeeded":
        await handle_payment_succeeded(data)
    elif event_type == "payment_intent.payment_failed":
        await handle_payment_failed(data)
    elif event_type == "customer.subscription.created":
        await handle_subscription_created(data)
    elif event_type == "customer.subscription.deleted":
        await handle_subscription_deleted(data)
    elif event_type == "customer.subscription.updated":
        await handle_subscription_updated(data)
    
    return {"received": True}


async def handle_payment_succeeded(data: dict):
    """Handle successful payment."""
    user_id = data.get("metadata", {}).get("user_id")
    if not user_id:
        return
    
    amount = data.get("amount", 0) / 100  # Convert from cents
    
    await notification_service.create(
        user_id=user_id,
        title="Paiement réussi ✅",
        body=f"Votre paiement de {amount:.2f} € a été accepté",
        notification_type="success",
    )


async def handle_payment_failed(data: dict):
    """Handle failed payment."""
    user_id = data.get("metadata", {}).get("user_id")
    if not user_id:
        return
    
    await notification_service.create(
        user_id=user_id,
        title="Paiement échoué ❌",
        body="Votre paiement n'a pas abouti. Veuillez réessayer.",
        notification_type="warning",
    )


async def handle_subscription_created(data: dict):
    """Handle new subscription."""
    # Update user to premium
    from app.services.user_service import UserService
    from app.core.firebase import get_firestore_client
    
    customer_id = data.get("customer")
    if not customer_id:
        return
    
    # Find user by Stripe customer ID
    db = get_firestore_client()
    users = db.collection("users").where("stripe_customer_id", "==", customer_id).limit(1).stream()
    
    for user_doc in users:
        user_id = user_doc.id
        user_service = UserService()
        await user_service.update(user_id, {"is_premium": True})
        
        await notification_service.create(
            user_id=user_id,
            title="Bienvenue Premium ! 🌟",
            body="Profitez de frais réduits et de fonctionnalités exclusives",
            notification_type="success",
        )


async def handle_subscription_deleted(data: dict):
    """Handle cancelled subscription."""
    from app.services.user_service import UserService
    from app.core.firebase import get_firestore_client
    
    customer_id = data.get("customer")
    if not customer_id:
        return
    
    db = get_firestore_client()
    users = db.collection("users").where("stripe_customer_id", "==", customer_id).limit(1).stream()
    
    for user_doc in users:
        user_id = user_doc.id
        user_service = UserService()
        await user_service.update(user_id, {"is_premium": False})
        
        await notification_service.create(
            user_id=user_id,
            title="Abonnement terminé",
            body="Votre abonnement Premium a pris fin",
            notification_type="info",
        )


async def handle_subscription_updated(data: dict):
    """Handle subscription update."""
    # Could handle plan changes, etc.
    pass
