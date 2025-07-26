import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "md_travels")

async def clear_database():
    """Clear all collections in the database"""
    client = AsyncIOMotorClient(MONGO_URI)
    db = client[DB_NAME]
    
    # List all collections
    collections = await db.list_collection_names()
    
    print(f"Found collections: {collections}")
    
    # Clear each collection
    for collection_name in collections:
        result = await db[collection_name].delete_many({})
        print(f"Cleared {collection_name}: {result.deleted_count} documents deleted")
    
    print("Database cleared successfully!")
    client.close()

if __name__ == "__main__":
    import asyncio
    asyncio.run(clear_database()) 