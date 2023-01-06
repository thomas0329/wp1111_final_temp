import uuid
from typing import Optional
from pydantic import BaseModel, Field

class Image(BaseModel):
    name: str = Field(...)
    img: str = Field(...)
