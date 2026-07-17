from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.chapter import Chapter
from app.models.project import Project
from app.schemas.chapter import (
    ChapterCreate,
    ChapterUpdate
)


def create_chapter(
    db: Session,
    chapter_data: ChapterCreate,
    owner_id: int
) -> Chapter:
    """
    Create a chapter inside a project owned by the user.
    """

    project = (
        db.query(Project)
        .filter(
            Project.id == chapter_data.project_id,
            Project.owner_id == owner_id
        )
        .first()
    )

    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )

    chapter = Chapter(
        title=chapter_data.title,
        chapter_number=chapter_data.chapter_number,
        project_id=chapter_data.project_id
    )

    db.add(chapter)
    db.commit()
    db.refresh(chapter)

    return chapter


def get_chapters(
    db: Session,
    project_id: int,
    owner_id: int
) -> list[Chapter]:
    """
    Get all chapters belonging to a project owned by the user.
    """

    project = (
        db.query(Project)
        .filter(
            Project.id == project_id,
            Project.owner_id == owner_id
        )
        .first()
    )

    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )

    return (
        db.query(Chapter)
        .filter(Chapter.project_id == project_id)
        .order_by(Chapter.chapter_number)
        .all()
    )


def get_chapter_by_id(
    db: Session,
    chapter_id: int,
    owner_id: int
) -> Chapter:
    """
    Get a chapter only if it belongs to a project
    owned by the current user.
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

    return chapter


def update_chapter(
    db: Session,
    chapter_id: int,
    owner_id: int,
    chapter_data: ChapterUpdate
) -> Chapter:
    """
    Update a chapter.
    """

    chapter = get_chapter_by_id(
        db,
        chapter_id,
        owner_id
    )

    if chapter_data.title is not None:
        chapter.title = chapter_data.title

    if chapter_data.chapter_number is not None:
        chapter.chapter_number = chapter_data.chapter_number

    db.commit()
    db.refresh(chapter)

    return chapter


def delete_chapter(
    db: Session,
    chapter_id: int,
    owner_id: int
) -> None:
    """
    Delete a chapter.
    """

    chapter = get_chapter_by_id(
        db,
        chapter_id,
        owner_id
    )

    db.delete(chapter)
    db.commit()