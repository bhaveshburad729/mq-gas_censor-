from sqlalchemy import create_engine, text
from app.database import SQLALCHEMY_DATABASE_URL

def migrate():
    print(f"Connecting to database...")
    engine = create_engine(SQLALCHEMY_DATABASE_URL)
    with engine.connect() as connection:
        print("Adding 'preferences' column to users table...")
        try:
            # We use JSON since we are on Postgres mostly, but basic JSON type
            conn = connection.execution_options(isolation_level="AUTOCOMMIT")
            conn.execute(text("ALTER TABLE users ADD COLUMN IF NOT EXISTS preferences JSON DEFAULT '{}'"))
            print("Successfully added 'preferences'.")
        except Exception as e:
            print(f"Error adding 'preferences': {e}")
            
    print("Migration complete.")

if __name__ == "__main__":
    migrate()
