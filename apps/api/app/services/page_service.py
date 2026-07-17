from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.page import Page
from app.models.chapter import Chapter
from app.models.project import Project

from app.schemas.page import (
    PageCreate,
    PageUpdate
)


def create_page(
    db: Session,
    page_data: PageCreate,
    owner_id: int
) -> Page:
    """
    Create a page inside a chapter owned by the user.
    """

    chapter = (
        db.query(Chapter)
        .join(Project)
        .filter(
            Chapter.id == page_data.chapter_id,
            Project.owner_id == owner_id
        )
        .first()
    )

    if not chapter:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Chapter not found"
        )

    page = Page(
        page_number=page_data.page_number,
        chapter_id=page_data.chapter_id,
        editor_data=page_data.editor_data
    )

    db.add(page)
    db.commit()
    db.refresh(page)

    return page


def get_pages(
    db: Session,
    chapter_id: int,
    owner_id: int
) -> list[Page]:
    """
    Get all pages for a chapter owned by the user.
    """

    chapter = (
        db.query(Chapter)
        .join(Project)
        .filter(
            Chapter.id == chapter_id,
            Project.owner_id == owner_id
        )
        .first()
    )

    if not chapter:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Chapter not found"
        )

    return (
        db.query(Page)
        .filter(Page.chapter_id == chapter_id)
        .order_by(Page.page_number)
        .all()
    )


def get_page_by_id(
    db: Session,
    page_id: int,
    owner_id: int
) -> Page:
    """
    Get a page owned by the current user.
    """

    page = (
        db.query(Page)
        .join(Chapter)
        .join(Project)
        .filter(
            Page.id == page_id,
            Project.owner_id == owner_id
        )
        .first()
    )

    if not page:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Page not found"
        )

    return page


def update_page(
    db: Session,
    page_id: int,
    owner_id: int,
    page_data: PageUpdate
) -> Page:
    """
    Update page metadata and editor data.
    """

    page = get_page_by_id(
        db,
        page_id,
        owner_id
    )

    if page_data.page_number is not None:
        page.page_number = page_data.page_number

    if page_data.editor_data is not None:
        page.editor_data = page_data.editor_data

    db.commit()
    db.refresh(page)

    return page


def delete_page(
    db: Session,
    page_id: int,
    owner_id: int
) -> None:
    """
    Delete a page.
    """

    page = get_page_by_id(
        db,
        page_id,
        owner_id
    )

    db.delete(page)
    db.commit()