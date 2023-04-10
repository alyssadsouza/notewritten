from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from services.notebooks import create_notebook, get_notebook
from models.schemas import NotebookIn, NotebookOut
from database import get_db

router = APIRouter(
	prefix="/notebooks",
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@router.post("/create")
def create_notebook_obj(body: NotebookIn, token: Annotated[str, Depends(oauth2_scheme)], session: Session = Depends(get_db)) -> NotebookOut:
	notebook = create_notebook(session, body.name, body.user_id)
	if notebook is not None:
		return notebook
	raise HTTPException(status_code=400, detail="Notebook already exists with same name")


@router.get("/{user_id}/{name}")
def get_notebook_obj(user_id: str, name: str, session: Session = Depends(get_db)) -> NotebookOut:
	notebook = get_notebook(session, user_id, name)
	if notebook is not None:
		return notebook
	raise HTTPException(status_code=404, detail="Notebook does not exist")

