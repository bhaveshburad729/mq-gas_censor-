from sqlalchemy import create_engine, inspect
from app.database import SQLALCHEMY_DATABASE_URL

def verify_tables():
    print(f"Connecting to database at {SQLALCHEMY_DATABASE_URL}...")
    engine = create_engine(SQLALCHEMY_DATABASE_URL)
    inspector = inspect(engine)
    tables = inspector.get_table_names()
    print(f"Tables found: {tables}")
    
    if not tables:
        print("No tables found. Something went wrong.")
    else:
        for table in tables:
            columns = [col['name'] for col in inspector.get_columns(table)]
            print(f"Table '{table}' columns: {columns}")

if __name__ == "__main__":
    verify_tables()
