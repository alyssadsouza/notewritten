import uuid
from models.models import User

def create_user(session, email: str, password: str):
    user = get_user(session, email)

    if user is not None:
        print("Could not create user as user already exists with the same email.")
        return None
    
    user = User(id=uuid.uuid4(), email=email, password=password)
    session.add(user)
    session.commit()
    print(f"Created new user {email}.")
    session.refresh(user)
    return user

def get_user(session, email: str):
    return session.query(User).filter_by(email=email).first()