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
	page = get_page(session, user_id, notebook_id, name)
	if page is not None:
		print("Page already exists with the same name.")
		return None

	upload_key = get_upload_key(name, user_id, notebook_id)
	page = Page(id=uuid.uuid4(), name=name, user_id=user_id, notebook_id=notebook_id, s3_upload_key=upload_key)
	session.add(page)
	upload_page_content("", upload_key)

	print(f"Created new page in {upload_key}.")
	return page

def get_all_pages(session, user_id: str, notebook_id: str):
	"""Queries all pages from a user notebook
	"""
	return session.query(Page).filter_by(user_id=user_id,notebook_id=notebook_id).all()


def get_page(session, user_id: str, notebook_id: str, name: str):
	return session.query(Page).filter_by(user_id=user_id,notebook_id=notebook_id,name=name).first()