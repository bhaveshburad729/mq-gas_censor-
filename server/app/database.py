from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

load_dotenv()

# Default to local postgres if not set
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")
if not SQLALCHEMY_DATABASE_URL:
    # Fallback or error if you prefer
    SQLALCHEMY_DATABASE_URL = "postgresql://postgres:password@localhost/sensegrid"

print(f"Connecting to database: {SQLALCHEMY_DATABASE_URL.split('@')[-1]}") # Log DB host/name safely
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
