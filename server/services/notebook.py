import uuid
from models.db import Notebook

def create_notebook(session, user_id: str, name: str):
    notebook = get_notebook(session, user_id, name)

    if notebook is not None:
        print("Notebook already exists with the same name.")
        return None
    
    notebook = Notebook(id=uuid.uuid4(), user_id=user_id, name=name)

    session.add(notebook)
    print(f"Created new notebook {name}.")
    return notebook

def get_notebook(session, user_id: str, name: str):
    return session.query(Notebook).filter_by(user_id=user_id, name=name).first()

def get_all_notebooks(session, user_id: str):
	"""Queries all pages from a user notebook
	"""
	return session.query(Notebook).filter(Notebook.user_id.match(user_id)).all()