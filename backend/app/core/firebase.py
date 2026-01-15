"""
Firebase initialization and utilities.
"""

from typing import Any, Dict, Optional

import firebase_admin
from firebase_admin import auth, credentials, firestore

from app.core.config import settings

_app: firebase_admin.App | None = None
_db: firestore.Client | None = None


def get_firebase_app() -> firebase_admin.App:
    """Get or initialize Firebase app."""
    global _app
    
    if _app is None:
        try:
            if settings.FIREBASE_SERVICE_ACCOUNT_PATH:
                cred = credentials.Certificate(settings.FIREBASE_SERVICE_ACCOUNT_PATH)
                _app = firebase_admin.initialize_app(cred, {
                    'projectId': settings.FIREBASE_PROJECT_ID,
                })
            else:
                # Use default credentials (for GCP environments)
                _app = firebase_admin.initialize_app()
        except ValueError:
            # App already initialized
            _app = firebase_admin.get_app()
    
    return _app


def get_firestore_client() -> firestore.Client:
    """Get Firestore client."""
    global _db
    
    if _db is None:
        get_firebase_app()
        _db = firestore.client()
    
    return _db


async def verify_firebase_token(token: str) -> Optional[Dict[str, Any]]:
    """
    Verify a Firebase ID token.
    
    Args:
        token: The Firebase ID token to verify.
        
    Returns:
        Decoded token claims if valid, None otherwise.
    """
    try:
        get_firebase_app()
        decoded_token = auth.verify_id_token(token)
        return decoded_token
    except auth.InvalidIdTokenError:
        return None
    except auth.ExpiredIdTokenError:
        return None
    except auth.RevokedIdTokenError:
        return None
    except Exception:
        return None


async def get_user_by_email(email: str) -> Optional[auth.UserRecord]:
    """Get Firebase user by email."""
    try:
        get_firebase_app()
        return auth.get_user_by_email(email)
    except auth.UserNotFoundError:
        return None


async def create_firebase_user(email: str, password: str, display_name: str) -> auth.UserRecord:
    """Create a new Firebase user."""
    get_firebase_app()
    return auth.create_user(
        email=email,
        password=password,
        display_name=display_name,
    )


async def create_custom_token(uid: str) -> str:
    """Create a custom token for a user."""
    get_firebase_app()
    return auth.create_custom_token(uid).decode('utf-8')
