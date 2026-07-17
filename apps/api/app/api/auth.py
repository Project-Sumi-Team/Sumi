from fastapi import APIRouter, Depends, Header, HTTPException, status
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.auth import (
    UserRegister,
    UserLogin,
    AuthResponse,
    UserResponse
)
from app.services.auth_service import (
    register_user,
    login_user,
    get_user_by_id
)
from app.core.security import decode_access_token

router = APIRouter()


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED
)
def register(
    user_data: UserRegister,
    db: Session = Depends(get_db)
):
    user = register_user(db, user_data)
    return user


@router.post(
    "/login",
    response_model=AuthResponse
)
def login(
    login_data: UserLogin,
    db: Session = Depends(get_db)
):
    return login_user(db, login_data)


@router.get(
    "/me",
    response_model=UserResponse
)
def get_me(
    authorization: str = Header(...),
    db: Session = Depends(get_db)
):
    try:
        scheme, token = authorization.split()

        if scheme.lower() != "bearer":
            raise ValueError()

    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authorization header"
        )

    payload = decode_access_token(token)

    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token"
        )

    user_id = payload.get("sub")

    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token payload"
        )

    user = get_user_by_id(
        db,
        int(user_id)
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    return user