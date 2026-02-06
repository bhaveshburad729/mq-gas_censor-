from sqlalchemy import create_engine
from app.database import Base, SQLALCHEMY_DATABASE_URL
from app import models # Import models to register them with Base

def create_tables():
    print(f"Connecting to database at {SQLALCHEMY_DATABASE_URL}...")
    engine = create_engine(SQLALCHEMY_DATABASE_URL)
    
    print("Creating tables...")
    try:
        Base.metadata.create_all(bind=engine)
        print("Tables created successfully.")
    except Exception as e:
        print(f"Error creating tables: {e}")

if __name__ == "__main__":
    create_tables()
