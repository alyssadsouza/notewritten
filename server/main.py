import json
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
