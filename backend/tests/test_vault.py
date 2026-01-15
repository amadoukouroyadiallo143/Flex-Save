"""
Tests for vault model.
"""

from datetime import date, timedelta

import pytest

from app.models.vault import Vault


class TestVault:
    """Test cases for Vault model."""
    
    def test_is_locked_future_date(self):
        """Vault with future unlock date should be locked."""
        vault = Vault(
            unlock_date=date.today() + timedelta(days=30)
        )
        assert vault.is_locked is True
    
    def test_is_locked_past_date(self):
        """Vault with past unlock date should be unlocked."""
        vault = Vault(
            unlock_date=date.today() - timedelta(days=1)
        )
        assert vault.is_locked is False
    
    def test_flexibility_available(self):
        """Test flexibility calculation."""
        vault = Vault(
            current_amount=1000,
            flexibility_percentage=10,
            flexibility_used=50,
        )
        assert vault.flexibility_available == 50  # 100 max - 50 used
    
    def test_progress_percentage(self):
        """Test progress calculation."""
        vault = Vault(
            current_amount=500,
            target_amount=1000,
        )
        assert vault.progress_percentage == 50.0
    
    def test_progress_percentage_zero_target(self):
        """Test progress with zero target."""
        vault = Vault(
            current_amount=500,
            target_amount=0,
        )
        assert vault.progress_percentage == 0
    
    def test_to_dict(self):
        """Test serialization to dict."""
        vault = Vault(
            user_id="user123",
            name="Vacation",
            current_amount=500,
            target_amount=2000,
        )
        data = vault.to_dict()
        
        assert data["user_id"] == "user123"
        assert data["name"] == "Vacation"
        assert data["current_amount"] == 500
        assert data["target_amount"] == 2000
