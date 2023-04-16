import boto3, uuid
from models.models import Page

# Let's use Amazon S3
s3 = boto3.resource('s3')

BUCKET = 'notewritten-pages'

def get_upload_key(name: str, user_id: str, notebook_id: str):
	"""Generates upload key to upload page to user_id/notebook_id/name.md
	"""
	return f"{user_id}/{notebook_id}/{name}.md"

def upload_page_content(body: str, key: str):
	"""Writes string content to a markdown file and uploads to s3 bucket

	Args:
		body (str): String containing body of file to write
		key (str): Key used to upload file
	"""
	# Upload a new file
	data = body.encode()
	s3.Bucket(BUCKET).put_object(Key=key, Body=data)

def get_page_content(key: str):
	"""Retrieves stringified body of file contents

	Args:
		key (str): s3_upload_key of page to retrieve

	Returns:
		str: File contents
	"""
	obj = s3.Object(BUCKET, key)
	data=obj.get()['Body'].read().decode()
	return data

def create_page(session, user_id: str, notebook_id: str, name: str):
	"""Creates new Page object in db
	"""

	upload_key = get_upload_key(name, user_id, notebook_id)
	page = Page(id=uuid.uuid4(), name=name, user_id=user_id, notebook_id=notebook_id, s3_upload_key=upload_key)
	session.add(page)
	session.commit()
	upload_page_content("", upload_key)
	session.refresh(page)

	print(f"Created new page in {upload_key}.")
	return page

def update_page_content(page: Page, content: str):
	upload_page_content(content, page.s3_upload_key)

	print(f"Updated {page.s3_upload_key}.")
	return page

def delete_page(session, page: Page):
	session.delete(page)
	session.commit()
	session.refresh(page)

	print(f"Deleted page.")

	return True

def get_all_pages(session, notebook_id: str):
	"""Queries all pages from a user notebook
	"""
	return session.query(Page).filter_by(notebook_id=notebook_id).all()


def get_page(session, notebook_id: str, name: str):
	return session.query(Page).filter_by(notebook_id=notebook_id,name=name).first()


def get_page_by_id(session, page_id: str):
	return session.query(Page).filter_by(id=page_id).first()