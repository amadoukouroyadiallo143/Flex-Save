"""
Stripe checkout endpoint for premium subscriptions.
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import stripe

from app.api.deps import ActiveUser
from app.core.config import settings

router = APIRouter()


class CheckoutSessionRequest(BaseModel):
    """Request for checkout session."""
    price_id: str = "price_premium_monthly"  # Default to monthly
    success_url: str = "https://flexsave.com/dashboard/premium?success=true"
    cancel_url: str = "https://flexsave.com/dashboard/premium?canceled=true"


class CheckoutSessionResponse(BaseModel):
    """Response with checkout session URL."""
    url: str
    session_id: str


@router.post("/create-checkout-session", response_model=CheckoutSessionResponse)
async def create_checkout_session(
    request: CheckoutSessionRequest,
    current_user: ActiveUser,
):
    """Create a Stripe checkout session for premium subscription."""
    try:
        stripe.api_key = settings.STRIPE_SECRET_KEY
        
        # Get or create Stripe customer
        customer_id = current_user.stripe_customer_id if hasattr(current_user, 'stripe_customer_id') else None
        
        if not customer_id:
            # Create Stripe customer
            customer = stripe.Customer.create(
                email=current_user.email,
                name=current_user.full_name,
                metadata={
                    "user_id": current_user.id,
                }
            )
            customer_id = customer.id
            
            # Save customer ID to user (in a real app)
            # await user_service.update(current_user.id, {"stripe_customer_id": customer_id})
        
        # Create checkout session
        session = stripe.checkout.Session.create(
            customer=customer_id,
            payment_method_types=["card"],
            line_items=[
                {
                    "price": request.price_id,
                    "quantity": 1,
                }
            ],
            mode="subscription",
            success_url=request.success_url,
            cancel_url=request.cancel_url,
            metadata={
                "user_id": current_user.id,
            },
            subscription_data={
                "metadata": {
                    "user_id": current_user.id,
                }
            },
            allow_promotion_codes=True,
        )
        
        return CheckoutSessionResponse(
            url=session.url,
            session_id=session.id,
        )
    except stripe.error.StripeError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/create-portal-session")
async def create_portal_session(current_user: ActiveUser):
    """Create a Stripe billing portal session for subscription management."""
    try:
        stripe.api_key = settings.STRIPE_SECRET_KEY
        
        customer_id = current_user.stripe_customer_id if hasattr(current_user, 'stripe_customer_id') else None
        
        if not customer_id:
            raise HTTPException(status_code=400, detail="No subscription found")
        
        session = stripe.billing_portal.Session.create(
            customer=customer_id,
            return_url="https://flexsave.com/dashboard/settings",
        )
        
        return {"url": session.url}
    except stripe.error.StripeError as e:
        raise HTTPException(status_code=400, detail=str(e))
