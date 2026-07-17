from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from app.models.project import Project
from app.models.user import User
from app.schemas.project import (
    ProjectCreate,
    ProjectUpdate
)


def create_project(
    db: Session,
    project_data: ProjectCreate,
    owner_id: int
) -> Project:
    """
    Create a new project.
    """

    user = db.query(User).filter(
        User.id == owner_id
    ).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    project = Project(
        title=project_data.title,
        description=project_data.description,
        owner_id=owner_id
    )

    db.add(project)
    db.commit()
    db.refresh(project)

    return project


def get_projects(
    db: Session,
    owner_id: int
) -> list[Project]:
    """
    Get all projects for a user.
    """

    return (
        db.query(Project)
        .filter(Project.owner_id == owner_id)
        .order_by(Project.created_at.desc())
        .all()
    )


def get_project_by_id(
    db: Session,
    project_id: int,
    owner_id: int
) -> Project:
    """
    Get a single project.
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

    return project


def update_project(
    db: Session,
    project_id: int,
    owner_id: int,
    project_data: ProjectUpdate
) -> Project:
    """
    Update a project.
    """

    project = get_project_by_id(
        db,
        project_id,
        owner_id
    )

    if project_data.title is not None:
        project.title = project_data.title

    if project_data.description is not None:
        project.description = project_data.description

    db.commit()
    db.refresh(project)

    return project


def delete_project(
    db: Session,
    project_id: int,
    owner_id: int
) -> None:
    """
    Delete a project.
    """

    project = get_project_by_id(
        db,
        project_id,
        owner_id
    )

    db.delete(project)
    db.commit()