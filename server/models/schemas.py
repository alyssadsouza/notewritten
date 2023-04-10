from pydantic import BaseModel

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: str | None = None

    
class UserBase(BaseModel):
	email: str

class UserCreate(UserBase):
	password: str


class NotebookIn(BaseModel):
	name: str
	user_id: str

class NotebookOut(NotebookIn):
	id: str


class PageIn(BaseModel):
	name: str
	user_id: str
	notebook_id: str

class PageOut(PageIn):
	id: str
	s3_upload_key: str