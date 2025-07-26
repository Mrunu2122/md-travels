import os
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "md_travels")

print(f"🔍 Database Configuration:")
print(f"   URI: {MONGO_URI[:50]}..." if len(MONGO_URI) > 50 else f"   URI: {MONGO_URI}")
print(f"   Database: {DB_NAME}")

try:
    client = AsyncIOMotorClient(MONGO_URI)
    db = client[DB_NAME]
    print("✅ MongoDB client initialized successfully")
except Exception as e:
    print(f"❌ Failed to initialize MongoDB client: {e}")
    raise

async def test_connection():
    """Test the database connection"""
    try:
        # Test the connection by listing collections
        collections = await db.list_collection_names()
        print(f"✅ Database connection successful. Collections: {collections}")
        return True
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        return False

# Test connection on startup
if __name__ == "__main__":
    asyncio.run(test_connection()) 