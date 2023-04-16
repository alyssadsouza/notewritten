from pydantic import BaseModel
import uuid
from sqlalchemy.dialects.postgresql import UUID

class ORMBaseModel(BaseModel):
    class Config:
        orm_mode = True
class Token(ORMBaseModel):
    access_token: str
    token_type: str

class TokenData(ORMBaseModel):
    username: str | None = None

    
class UserBase(ORMBaseModel):
	email: str

class UserCreate(UserBase):
	password: str

class NotebookIn(ORMBaseModel):
	id: uuid.UUID

class NotebookInCreate(ORMBaseModel):
	name: str

class NotebookOut(NotebookIn):
	name: str
	user_id: uuid.UUID

class PageIn(ORMBaseModel):
	id: uuid.UUID

class PageInCreate(ORMBaseModel):
	name: str
	notebook_id: uuid.UUID

class PageInContent(PageIn):
	content: str

class PageOut(PageInCreate):
	id: uuid.UUID
	user_id: uuid.UUID
	s3_upload_key: str

class NotebookPages(ORMBaseModel):
	notebook: NotebookOut
	pages: list[PageOut]
