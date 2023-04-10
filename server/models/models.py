from sqlalchemy import Column, ForeignKey, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import declarative_base

Base = declarative_base()


class User(Base):
    __tablename__ = 'users'
    id = Column(UUID(as_uuid=True), primary_key=True)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, unique=True, nullable=False)
    
class Notebook(Base):
    __tablename__ = 'notebooks'
    id = Column(UUID(as_uuid=True), primary_key=True)
    name = Column(String, nullable=False)
    user_id = Column(ForeignKey('users.id', ondelete="CASCADE"), nullable=False)

class Page(Base):
    __tablename__ = 'pages'
    id = Column(UUID(as_uuid=True), primary_key=True)
    name = Column(String, nullable=False)
    user_id = Column(ForeignKey('users.id', ondelete="CASCADE"), nullable=False)
    notebook_id = Column(ForeignKey('notebooks.id', ondelete="CASCADE"), nullable=False)
    s3_upload_key = Column(String, unique=True, nullable=False) # in the format of user_id/notebook_id/name.md
