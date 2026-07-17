from pydantic import BaseModel, Field, ConfigDict
from datetime import datetime
from typing import Any


class PageCreate(BaseModel):
    page_number: int = Field(
        gt=0
    )

    chapter_id: int

    editor_data: dict[str, Any] = Field(
        default_factory=dict
    )


class PageUpdate(BaseModel):
    page_number: int | None = Field(
        default=None,
        gt=0
    )

    editor_data: dict[str, Any] | None = None


class PageResponse(BaseModel):
    id: int
    page_number: int
    chapter_id: int
    editor_data: dict[str, Any]

    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )


class PageListResponse(BaseModel):
    pages: list[PageResponse]