import json, sys, os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy_cockroachdb import run_transaction
from services.page import create_page, get_all_pages, get_page
from services.user import  create_user, get_user
from services.notebook import  create_notebook, get_notebook
from models.routes import User, Notebook, Page, Pages

sys.path.append( '.' )
load_dotenv()

app = FastAPI()

origins = [
    os.getenv("FRONTEND_URL"),
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

db_uri = os.environ['DATABASE_URL'].replace("postgresql://", "cockroachdb://")

try:
	engine = create_engine(db_uri, connect_args={"application_name":"docs_simplecrud_sqlalchemy"})
except Exception as e:
	print("Failed to connect to database.")
	print(f"{e}")

create_session = sessionmaker(bind=engine)

@app.post("/create-user")
def register(body: User):
	user = create_user(create_session(), body.email, body.password)
	if user is not None:
		return {"message": "Success"}
	raise HTTPException(status_code=400, detail="User already exists")

@app.post("/login")
def login(body: User):
	user = get_user(create_session(), body.email)
	if user is not None:
		if user.password == body.password:
			return {"message": "Success", "user": user}
		raise HTTPException(status_code=401, detail="Invalid credentials")
	raise HTTPException(status_code=404, detail="User does not exist")

@app.post("/create-notebook")
def create_notebook_obj(body: Notebook):
	notebook = create_notebook(create_session(), body.name, body.user_id)
	if notebook is not None:
		return {"message": "Success", "notebook": notebook}
	raise HTTPException(status_code=400, detail="Notebook already exists with same name")

@app.get("/get-notebook/{user_id}/{name}")
def get_notebook_obj(user_id: str, name: str):
	notebook = get_notebook(create_session(), user_id, name)
	if notebook is not None:
		return {"message": "Success", "notebook": notebook}
	raise HTTPException(status_code=404, detail="Notebook does not exist")

@app.post("/create-page")
def create_page_obj(body: Page):
	page = create_page(create_session(), body.user_id, body.notebook_id, body.name)
	if page is not None:
		return {"message": "Success", "page": page}
	raise HTTPException(status_code=400, detail="Page already exists with same name")

@app.get("/get-page/{user_id}/{notebook_id}/{name}")
def get_page_obj(user_id: str, notebook_id: str, name: str):
	page = get_page(create_session(), user_id, notebook_id, name)
	if page is not None:
		return {"message": "Success", "page": page}
	raise HTTPException(status_code=404, detail="Page does not exist")

@app.get("/get-all-pages/{user_id}/{notebook_id}")
def get_all_pages_obj(user_id: str, notebook_id: str):
	pages = get_all_pages(create_session(), user_id, notebook_id)
	if pages is not None:
		return {"message": "Success", "pages": pages}
	raise HTTPException(status_code=404, detail="Pages do not exist")


@app.get("/{user}/{notebook}/{id}")
def get_file(user, notebook, id):
    helloworld = '''
	# Hello World

	This is a test file to simulate what files will look like in the text editor.

	## Header 2

	Here is a list for brevity:

	- Item 1
	- Item 2
		- Sub-item 2
	- Item 3

	### Header 3

	And this is some more detail about Header 2.

	Here's inline code: `cool`

	Here's a code block:

	```
	console.log("Hello!");
	```
    '''
    response = {"user": user, "id": id, "notebook": notebook, "content": helloworld}

    return {
      "message": json.dumps(response)
    }

@app.get("/notebooks/{user}")
def get_notebooks(user):
    response = [
		{
		"id": "0",
		"name": "2A",
		"files": ["note1.md", "note2.md", "note3.md"],
		},
		{
		"id": "1",
		"name": "1B",
		"files": ["note4.md", "note5.md", "note6.md"],
		},
		{
		"id": "2",
		"name": "1A",
		"files": ["note7.md", "note7.md", "note9.md"],
		},
  	]
    return {
      "message": json.dumps(response)
    }
