from pydantic import BaseModel, Field, ConfigDict
from datetime import datetime


class ChapterCreate(BaseModel):
    title: str = Field(
        min_length=1,
        max_length=255
    )

    chapter_number: int = Field(
        gt=0
    )

    project_id: int


class ChapterUpdate(BaseModel):
    title: str | None = None
    chapter_number: int | None = None


class ChapterResponse(BaseModel):
    id: int
    title: str
    chapter_number: int
    project_id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )


class ChapterListResponse(BaseModel):
    chapters: list[ChapterResponse]