from passlib.context import CryptContext
from sqlalchemy import create_engine
import os
from dotenv import load_dotenv

load_dotenv()

# Test 1: Bcrypt
print("Testing Bcrypt...")
try:
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    hash = pwd_context.hash("testpassword")
    print(f"Bcrypt Success: {hash[:10]}...")
except Exception as e:
    print(f"Bcrypt FAILED: {e}")

# Test 2: Database
print("\nTesting Database Connection...")
try:
    db_url = os.getenv("DATABASE_URL")  or "postgresql://postgres:Bhavesh729@localhost:5432/sensegrid"
    engine = create_engine(db_url)
    connection = engine.connect()
    print("Database Connection SUCCESS!")
    connection.close()
except Exception as e:
    print(f"Database FAILED: {e}")
