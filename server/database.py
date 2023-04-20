import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy_cockroachdb import run_transaction

db_uri = os.environ['DATABASE_URL'].replace("postgresql://", "cockroachdb://")

try:
	engine = create_engine(db_uri, connect_args={"application_name":"docs_simplecrud_sqlalchemy"}, pool_pre_ping=True)
except Exception as e:
	print("Failed to connect to database.")
	print(f"{e}")

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()