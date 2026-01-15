"""
Authentication endpoints.
"""

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr

from app.core.firebase import create_firebase_user, get_user_by_email, create_custom_token
from app.services.user_service import user_service

router = APIRouter()


class RegisterRequest(BaseModel):
    """Register request schema."""
    email: EmailStr
    password: str
    full_name: str


class RegisterResponse(BaseModel):
    """Register response schema."""
    message: str
    user_id: str


class UserResponse(BaseModel):
    """User response for auth endpoints."""
    id: str
    email: str
    full_name: str
    discipline_score: float
    is_premium: bool


@router.post("/register", response_model=RegisterResponse, status_code=status.HTTP_201_CREATED)
async def register(request: RegisterRequest) -> RegisterResponse:
    """
    Register a new user.
    
    Creates a Firebase Auth user and a Firestore user document.
    Client should then sign in with Firebase to get the ID token.
    """
    # Check if user exists
    existing = await get_user_by_email(request.email)
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered"
        )
    
    try:
        # Create Firebase Auth user
        firebase_user = await create_firebase_user(
            email=request.email,
            password=request.password,
            display_name=request.full_name,
        )
        
        # Create Firestore user document
        user = await user_service.create(
            email=request.email,
            full_name=request.full_name,
            firebase_uid=firebase_user.uid,
        )
        
        return RegisterResponse(
            message="User registered successfully. Please sign in.",
            user_id=user.id,
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.post("/verify-token", response_model=UserResponse)
async def verify_token(token: str) -> UserResponse:
    """
    Verify a Firebase ID token and return user info.
    
    This is used to validate tokens and get user data.
    """
    from app.core.firebase import verify_firebase_token
    
    decoded = await verify_firebase_token(token)
    if not decoded:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )
    
    user = await user_service.get_by_firebase_uid(decoded["uid"])
    if not user:
        user = await user_service.create_from_firebase(decoded)
    
    return UserResponse(
        id=user.id,
        email=user.email,
        full_name=user.full_name,
        discipline_score=user.discipline_score,
        is_premium=user.is_premium,
    )


@router.get("/me", response_model=UserResponse)
async def get_me(token: str) -> UserResponse:
    """Get current user from token."""
    return await verify_token(token)
