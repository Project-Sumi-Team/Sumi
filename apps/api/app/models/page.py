from sqlalchemy import Column, Integer, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.db.database import Base


class Page(Base):
    __tablename__ = "pages"

    id = Column(Integer, primary_key=True, index=True)

    page_number = Column(
        Integer,
        nullable=False
    )

    chapter_id = Column(
        Integer,
        ForeignKey("chapters.id", ondelete="CASCADE"),
        nullable=False
    )

    editor_data = Column(
        JSONB,
        nullable=False,
        default=dict
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
    chapter = relationship(
        "Chapter",
        back_populates="pages"
    )

    def __repr__(self):
        return (
            f"<Page(id={self.id}, "
            f"page_number={self.page_number})>"
        )