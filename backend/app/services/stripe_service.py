"""
Stripe Treasury service for managing financial operations.
"""

import stripe
from typing import Optional

from app.core.config import settings

# Initialize Stripe
stripe.api_key = settings.STRIPE_API_KEY


class StripeService:
    """Service for Stripe Treasury operations."""
    
    @staticmethod
    async def create_customer(email: str, name: str) -> str:
        """Create a Stripe customer."""
        customer = stripe.Customer.create(
            email=email,
            name=name,
            metadata={"app": "flexsave"}
        )
        return customer.id
    
    @staticmethod
    async def create_financial_account(customer_id: str) -> dict:
        """Create a Treasury financial account for a customer."""
        # Note: Treasury requires Stripe Connect
        # This is a simplified example
        financial_account = stripe.treasury.FinancialAccount.create(
            supported_currencies=["eur", "usd"],
            features={
                "card_issuing": {"requested": False},
                "deposit_insurance": {"requested": True},
                "financial_addresses": {"aba": {"requested": True}},
                "inbound_transfers": {"ach": {"requested": True}},
                "intra_stripe_flows": {"requested": True},
                "outbound_payments": {
                    "ach": {"requested": True},
                    "us_domestic_wire": {"requested": True},
                },
                "outbound_transfers": {
                    "ach": {"requested": True},
                    "us_domestic_wire": {"requested": True},
                },
            },
        )
        return {
            "id": financial_account.id,
            "balance": financial_account.balance,
        }
    
    @staticmethod
    async def deposit(
        financial_account_id: str,
        amount: int,  # in cents
        currency: str = "eur"
    ) -> dict:
        """Process a deposit into a financial account."""
        # Create an inbound transfer
        transfer = stripe.treasury.InboundTransfer.create(
            financial_account=financial_account_id,
            amount=amount,
            currency=currency,
            origin_payment_method="pm_xxx",  # This would be the user's payment method
            description="FlexSave deposit",
        )
        return {
            "id": transfer.id,
            "amount": transfer.amount,
            "status": transfer.status,
        }
    
    @staticmethod
    async def withdraw(
        financial_account_id: str,
        amount: int,  # in cents
        destination: str,
        currency: str = "eur"
    ) -> dict:
        """Process a withdrawal from a financial account."""
        transfer = stripe.treasury.OutboundTransfer.create(
            financial_account=financial_account_id,
            amount=amount,
            currency=currency,
            destination_payment_method=destination,
            description="FlexSave withdrawal",
        )
        return {
            "id": transfer.id,
            "amount": transfer.amount,
            "status": transfer.status,
        }
    
    @staticmethod
    async def get_balance(financial_account_id: str) -> dict:
        """Get the balance of a financial account."""
        account = stripe.treasury.FinancialAccount.retrieve(financial_account_id)
        return {
            "cash": account.balance.cash,
            "inbound_pending": account.balance.inbound_pending,
            "outbound_pending": account.balance.outbound_pending,
        }


stripe_service = StripeService()
