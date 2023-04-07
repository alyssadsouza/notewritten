from pydantic import BaseModel

class User(BaseModel):
	email: str
	password: str

class Notebook(BaseModel):
	name: str
	user_id: str

class Page(BaseModel):
	name: str
	user_id: str
	notebook_id: str

class Pages(BaseModel):
	user_id: str
	notebook_id: str