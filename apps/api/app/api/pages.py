from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.core.dependencies import get_current_user_id

from app.schemas.page import (
    PageCreate,
    PageUpdate,
    PageResponse,
    PageListResponse
)

from app.services.page_service import (
    create_page,
    get_pages,
    get_page_by_id,
    update_page,
    delete_page
)

router = APIRouter()


@router.post(
    "/",
    response_model=PageResponse
)
def create_page_route(
    page_data: PageCreate,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id)
):
    return create_page(
        db,
        page_data,
        user_id
    )


@router.get(
    "/chapter/{chapter_id}",
    response_model=PageListResponse
)
def get_pages_route(
    chapter_id: int,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id)
):
    pages = get_pages(
        db,
        chapter_id,
        user_id
    )

    return {
        "pages": pages
    }


@router.get(
    "/{page_id}",
    response_model=PageResponse
)
def get_page_route(
    page_id: int,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id)
):
    return get_page_by_id(
        db,
        page_id,
        user_id
    )


@router.patch(
    "/{page_id}",
    response_model=PageResponse
)
def update_page_route(
    page_id: int,
    page_data: PageUpdate,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id)
):
    return update_page(
        db,
        page_id,
        user_id,
        page_data
    )


@router.delete(
    "/{page_id}"
)
def delete_page_route(
    page_id: int,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id)
):
    delete_page(
        db,
        page_id,
        user_id
    )

    return {
        "message": "Page deleted"
    }