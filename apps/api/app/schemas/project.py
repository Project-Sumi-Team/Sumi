from pydantic import BaseModel, Field, ConfigDict
from datetime import datetime


class ProjectCreate(BaseModel):
    name: str = Field(
        alias="title",
        min_length=1,
        max_length=255
    )

    description: str | None = Field(
        default=None,
        max_length=1000
    )


class ProjectUpdate(BaseModel):
    name: str | None = Field(
        default=None,
        min_length=1,
        max_length=255
    )

    description: str | None = Field(
        default=None,
        max_length=1000
    )


class ProjectResponse(BaseModel):
    id: int
    name: str
    description: str | None
    owner_id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )


class ProjectListResponse(BaseModel):
    projects: list[ProjectResponse]