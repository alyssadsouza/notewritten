from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from services.pages import create_page, get_page, get_all_pages
from models.schemas import PageIn, PageOut
from database import get_db

router = APIRouter(
	prefix="/pages",
)

@router.post("/create")
def create_page_obj(body: PageIn, session: Session = Depends(get_db)) -> PageOut:
	page = create_page(session, body.user_id, body.notebook_id, body.name)
	if page is not None:
		return page
	raise HTTPException(status_code=400, detail="Page already exists with same name")


@router.get("/{user_id}/{notebook_id}/{name}")
def get_page_obj(user_id: str, notebook_id: str, name: str, session: Session = Depends(get_db)) -> PageOut:
	page = get_page(session, user_id, notebook_id, name)
	if page is not None:
		return page
	raise HTTPException(status_code=404, detail="Page does not exist")


@router.get("/{user_id}/{notebook_id}")
def get_all_pages_obj(user_id: str, notebook_id: str, session: Session = Depends(get_db)) -> list[PageOut]:
	pages = get_all_pages(session, user_id, notebook_id)
	return pages

