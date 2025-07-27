from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .routes import router as api_router
from .db import test_connection
import asyncio

app = FastAPI(title="MD Tours & Travels API", version="1.0.0")

# Updated CORS configuration to allow all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development and production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)

@app.get("/")
async def read_root():
    """Health check endpoint"""
    return {
        "message": "MD Tours & Travels API is running",
        "status": "healthy",
        "version": "1.0.0"
    }

@app.get("/health")
async def health_check():
    """Database health check"""
    try:
        is_connected = await test_connection()
        if is_connected:
            return {
                "status": "healthy",
                "database": "connected",
                "message": "All systems operational"
            }
        else:
            raise HTTPException(status_code=503, detail="Database connection failed")
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Health check failed: {str(e)}")

@app.on_event("startup")
async def startup_event():
    """Test database connection on startup"""
    print("🚀 Starting MD Tours & Travels API...")
    try:
        is_connected = await test_connection()
        if is_connected:
            print("✅ API startup successful - database connected")
        else:
            print("⚠️  API startup with database connection issues")
    except Exception as e:
        print(f"❌ API startup failed: {e}") 