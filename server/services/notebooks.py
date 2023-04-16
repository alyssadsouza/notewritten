import uuid
from models.models import Notebook

def create_notebook(session, user_id: str, name: str):
    notebook = get_notebook(session, user_id, name)

    if notebook is not None:
        print("Notebook already exists with the same name.")
        return None
    
    notebook = Notebook(id=uuid.uuid4(), user_id=user_id, name=name)

    session.add(notebook)
    session.commit()
    print(f"Created new notebook {name}.")
    session.refresh(notebook)
    return notebook

def get_notebook(session, user_id: str, name: str):
    return session.query(Notebook).filter_by(user_id=user_id, name=name).first()

def get_all_notebooks(session, user_id: str):
	return session.query(Notebook).filter_by(user_id=user_id).all()