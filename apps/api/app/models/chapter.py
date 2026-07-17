from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.db.database import Base


class Chapter(Base):
    __tablename__ = "chapters"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(
        String(255),
        nullable=False
    )

    chapter_number = Column(
        Integer,
        nullable=False
    )

    project_id = Column(
        Integer,
        ForeignKey("projects.id", ondelete="CASCADE"),
        nullable=False
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False
    )

    # Relationships
    project = relationship(
        "Project",
        back_populates="chapters"
    )

    pages = relationship(
        "Page",
        back_populates="chapter",
        cascade="all, delete-orphan"
    )

    def __repr__(self):
        return (
            f"<Chapter(id={self.id}, "
            f"title='{self.title}', "
            f"chapter_number={self.chapter_number})>"
        )