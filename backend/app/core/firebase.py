"""
Firebase initialization and utilities.
"""

import firebase_admin
from firebase_admin import credentials, firestore

from app.core.config import settings

_app: firebase_admin.App | None = None
_db: firestore.Client | None = None


def get_firebase_app() -> firebase_admin.App:
    """Get or initialize Firebase app."""
    global _app
    
    if _app is None:
        if settings.FIREBASE_SERVICE_ACCOUNT_PATH:
            cred = credentials.Certificate(settings.FIREBASE_SERVICE_ACCOUNT_PATH)
            _app = firebase_admin.initialize_app(cred)
        else:
            # Use default credentials (for GCP environments)
            _app = firebase_admin.initialize_app()
    
    return _app


def get_firestore_client() -> firestore.Client:
    """Get Firestore client."""
    global _db
    
    if _db is None:
        get_firebase_app()
        _db = firestore.client()
    
    return _db
