from fastapi import Header, HTTPException, status

from app.core.security import decode_access_token


def get_current_user_id(
    authorization: str = Header(...)
) -> int:
    """
    Extract and validate user ID from JWT token.
    """

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
            detail="Invalid token"
        )

    return int(user_id)