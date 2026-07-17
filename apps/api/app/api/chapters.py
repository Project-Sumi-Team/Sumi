from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.core.dependencies import get_current_user_id

from app.schemas.chapter import (
    ChapterCreate,
    ChapterUpdate,
    ChapterResponse,
    ChapterListResponse
)

from app.services.chapter_service import (
    create_chapter,
    get_chapters,
    get_chapter_by_id,
    update_chapter,
    delete_chapter
)

router = APIRouter()


@router.post(
    "/",
    response_model=ChapterResponse
)
def create_chapter_route(
    chapter_data: ChapterCreate,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id)
):
    return create_chapter(
        db,
        chapter_data,
        user_id
    )


@router.get(
    "/project/{project_id}",
    response_model=ChapterListResponse
)
def get_chapters_route(
    project_id: int,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id)
):
    return {
        "chapters": get_chapters(
            db,
            project_id,
            user_id
        )
    }


@router.get(
    "/{chapter_id}",
    response_model=ChapterResponse
)
def get_chapter_route(
    chapter_id: int,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id)
):
    return get_chapter_by_id(
        db,
        chapter_id,
        user_id
    )


@router.patch(
    "/{chapter_id}",
    response_model=ChapterResponse
)
def update_chapter_route(
    chapter_id: int,
    chapter_data: ChapterUpdate,
    db: Session = Depends(get_db)
):
    return update_chapter(
        db,
        chapter_id,
        chapter_data,
        user_id
    )


@router.delete(
    "/{chapter_id}"
)
def delete_chapter_route(
    chapter_id: int,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id)
):
    delete_chapter(
        db,
        chapter_id,
        user_id
    )

    return {
        "message": "Chapter deleted"
    }