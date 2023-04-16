import uuid
from models.models import Notebook

def create_notebook(session, user_id: str, name: str):    
    notebook = Notebook(id=uuid.uuid4(), user_id=user_id, name=name)

    session.add(notebook)
    session.commit()
    print(f"Created new notebook {name}.")
    session.refresh(notebook)
    return notebook

def delete_notebook(session, notebook: Notebook):
	session.delete(notebook)
	session.commit()

	print(f"Deleted notebook.")

	return True

def get_notebook(session, user_id: str, name: str):
    return session.query(Notebook).filter_by(user_id=user_id, name=name).first()

def get_all_notebooks(session, user_id: str):
	return session.query(Notebook).filter_by(user_id=user_id).all()

def get_notebook_by_id(session, id: str):
	return session.query(Notebook).filter_by(id=id).first()