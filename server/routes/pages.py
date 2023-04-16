from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, Response
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from services.pages import create_page, get_page, update_page_content, get_page_content, delete_page, get_page_by_id
from models.models import User
from models.schemas import PageIn, PageOut, PageInContent, PageInCreate
from routes.users import get_current_user
from database import get_db

router = APIRouter(
	prefix="/pages",
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@router.post("/create")
async def create_page_obj(body: PageInCreate, token: Annotated[str, Depends(oauth2_scheme)], session: Session = Depends(get_db)) -> PageOut:
	user: User = await get_current_user(token, session)
	page = get_page(session, body.notebook_id, body.name)
	if page is not None:
		raise HTTPException(status_code=400, detail="Page already exists with same name")

	page = create_page(session, user.id, body.notebook_id, body.name)
	if page is not None:
		return page
	
	raise HTTPException(status_code=400, detail="Page could not be created")

@router.post("/update-content")
async def update_page_content_obj(body: PageInContent, token: Annotated[str, Depends(oauth2_scheme)], session: Session = Depends(get_db)) -> PageOut:
	page = get_page_by_id(session, body.id)
	if page is not None:
		page = update_page_content(page, body.content)
		return page
	raise HTTPException(status_code=400, detail="Page does not exist")

@router.post("/delete")
async def delete_page_obj(body: PageIn, token: Annotated[str, Depends(oauth2_scheme)], session: Session = Depends(get_db)):
	page = get_page_by_id(session, body.id)
	if page is not None:
		delete_page(session, page)
		return Response("success", status_code=200)
	raise HTTPException(status_code=400, detail="Page does not exist")

@router.get("content/{page_id}")
async def get_page_obj(page_id: str, token: Annotated[str, Depends(oauth2_scheme)], session: Session = Depends(get_db)) -> str:
	page = get_page_by_id(session, page_id)
	if page is not None:
		return get_page_content(page.s3_upload_key)
	raise HTTPException(status_code=404, detail="Page does not exist")
