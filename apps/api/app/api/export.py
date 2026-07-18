from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.core.dependencies import get_current_user_id

from app.services.page_service import (
    get_page_by_id
)

router = APIRouter()


@router.get("/page/{page_id}")
def export_page_data(
    page_id: int,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id)
):
    """
    Export page editor data.
    """

    page = get_page_by_id(
        db,
        page_id,
        user_id
    )

    return {
        "page_id": page.id,
        "page_number": page.page_number,
        "chapter_id": page.chapter_id,
        "editor_data": page.editor_data
    }