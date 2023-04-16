from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from services.pages import get_all_pages
from services.notebooks import create_notebook, get_notebook, get_all_notebooks
from routes.users import get_current_user
from models.models import User
from models.schemas import NotebookIn, NotebookOut, NotebookPages
from database import get_db

router = APIRouter(
	prefix="/notebooks",
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@router.post("/create")
def create_notebook_obj(body: NotebookIn, token: Annotated[str, Depends(oauth2_scheme)], session: Session = Depends(get_db)) -> NotebookOut:
	notebook = create_notebook(session, body.user_id, body.name)
	if notebook is not None:
		return notebook
	raise HTTPException(status_code=400, detail="Notebook already exists with same name")

@router.get("/all")
async def get_all_notebooks_obj(token: Annotated[str, Depends(oauth2_scheme)], session: Session = Depends(get_db)) -> list[NotebookPages]:
	user: User = await get_current_user(token, session)
	notebooks = get_all_notebooks(session, user.id)
	if notebooks is not None:
		return [{"notebook": notebook, "pages": get_all_pages(session, notebook.id)} for notebook in notebooks]
	raise HTTPException(status_code=404, detail="Notebooks do not exist")

@router.get("/{user_id}/{name}")
def get_notebook_obj(user_id: str, name: str, session: Session = Depends(get_db)) -> NotebookOut:
	notebook = get_notebook(session, user_id, name)
	if notebook is not None:
		return notebook
	raise HTTPException(status_code=404, detail="Notebook does not exist")

