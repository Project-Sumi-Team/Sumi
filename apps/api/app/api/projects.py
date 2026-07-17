from fastapi import APIRouter, Depends, Header, HTTPException, status
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.core.security import decode_access_token
from app.schemas.project import (
    ProjectCreate,
    ProjectUpdate,
    ProjectResponse,
    ProjectListResponse
)
from app.services.project_service import (
    create_project,
    get_projects,
    get_project_by_id,
    update_project,
    delete_project
)

router = APIRouter()


def get_current_user_id(
    authorization: str = Header(...)
) -> int:
    """
    Extract user ID from JWT token.
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


@router.post(
    "/",
    response_model=ProjectResponse,
    status_code=status.HTTP_201_CREATED
)
def create_project_route(
    project_data: ProjectCreate,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id)
):
    return create_project(
        db,
        project_data,
        user_id
    )


@router.get(
    "/",
    response_model=ProjectListResponse
)
def get_projects_route(
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id)
):
    projects = get_projects(
        db,
        user_id
    )

    return {
        "projects": projects
    }


@router.get(
    "/{project_id}",
    response_model=ProjectResponse
)
def get_project_route(
    project_id: int,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id)
):
    return get_project_by_id(
        db,
        project_id,
        user_id
    )


@router.patch(
    "/{project_id}",
    response_model=ProjectResponse
)
def update_project_route(
    project_id: int,
    project_data: ProjectUpdate,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id)
):
    return update_project(
        db,
        project_id,
        user_id,
        project_data
    )


@router.delete(
    "/{project_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
def delete_project_route(
    project_id: int,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id)
):
    delete_project(
        db,
        project_id,
        user_id
    )