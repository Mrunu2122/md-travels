# MD Tours & Travels - Troubleshooting Guide

## 🔍 Database Connection Issues

### 1. MongoDB Atlas Connection Problems

**Symptoms:**
- Backend fails to start
- "Database connection failed" errors
- 500 Internal Server Error

**Solutions:**

#### A. Check Environment Variables
```bash
# Create .env file in backend directory
cd backend
touch .env
```

Add to `backend/.env`:
```
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/md_travels?retryWrites=true&w=majority
DB_NAME=md_travels
```

#### B. Verify MongoDB Atlas Setup
1. **Create MongoDB Atlas Account:**
   - Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
   - Sign up for free account

2. **Create Cluster:**
   - Click "Build a Database"
   - Choose "FREE" tier
   - Select cloud provider (AWS, Google Cloud, Azure)
   - Choose region close to you
   - Click "Create"

3. **Create Database User:**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `md_tours_user`
   - Password: Generate secure password
   - Role: "Read and write to any database"
   - Click "Add User"

4. **Get Connection String:**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

#### C. Test Database Connection
```bash
# Run the database test script
node test-backend.js
```

### 2. Backend Server Issues

**Symptoms:**
- "Cannot connect to server" errors
- Frontend shows loading indefinitely
- Network errors in console

**Solutions:**

#### A. Start Backend Server
```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Start server
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

#### B. Check Backend Health
```bash
# Test basic connectivity
curl http://localhost:8000/

# Test database health
curl http://localhost:8000/health
```

#### C. Check CORS Configuration
The backend is configured to allow requests from:
- `http://localhost:3000`
- `http://localhost:3001`
- `http://127.0.0.1:3000`
- `http://127.0.0.1:3001`

### 3. Frontend Connection Issues

**Symptoms:**
- "Failed to fetch" errors
- Loading states that never resolve
- Console errors about network requests

**Solutions:**

#### A. Check API URL Configuration
Verify `frontend/src/api/config.ts`:
```typescript
const API_BASE_URL = "http://localhost:8000"; // For local development
// or
const API_BASE_URL = "https://your-deployed-backend.com"; // For production
```

#### B. Test API Endpoints
```bash
# Test from frontend directory
cd frontend
npm install axios
node test-backend.js
```

#### C. Check Browser Console
1. Open browser developer tools (F12)
2. Go to Console tab
3. Look for detailed error messages
4. Check Network tab for failed requests

### 4. Data Persistence Issues

**Symptoms:**
- Data not saving to database
- Values showing as 0 or null
- Integer values showing as floats

**Solutions:**

#### A. Verify Data Types
All numeric values should be integers:
- Trip counts: `5` (not `5.0`)
- Earnings: `1200` (not `1200.00`)
- Expenses: `500` (not `500.0`)

#### B. Check Backend Rounding
The backend automatically rounds all numeric values to integers:
```python
def round_to_integer(value):
    return round(float(value)) if value is not None else 0
```

#### C. Test Data Creation
```bash
# Use the test script to verify data creation
node test-backend.js
```

### 5. Common Error Messages

#### "Network Error"
- Backend server not running
- Wrong API URL
- Firewall blocking connection

#### "Request timeout"
- Slow internet connection
- Backend server overloaded
- MongoDB Atlas slow response

#### "500 Internal Server Error"
- Database connection failed
- Invalid data format
- Missing environment variables

#### "404 Not Found"
- Wrong API endpoint
- Backend routes not configured
- URL typo

### 6. Development Environment Setup

#### A. Required Software
```bash
# Node.js (v16+)
node --version

# Python (3.8+)
python --version

# MongoDB Atlas account
# Android Studio (for APK generation)
```

#### B. Environment Setup
```bash
# Backend
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Frontend
cd frontend
npm install
```

#### C. Start Development Servers
```bash
# Terminal 1: Backend
cd backend
python -m uvicorn app.main:app --reload

# Terminal 2: Frontend
cd frontend
npm start
```

### 7. Production Deployment Issues

#### A. Backend Deployment
1. **Render.com:**
   - Connect GitHub repository
   - Set root directory to `backend`
   - Add environment variables
   - Deploy

2. **Railway.app:**
   - Create new project
   - Connect repository
   - Set root directory to `backend`
   - Add environment variables

#### B. Update Frontend API URL
After backend deployment:
1. Get the deployment URL
2. Update `frontend/src/api/config.ts`
3. Rebuild the app

### 8. APK Generation Issues

#### A. Android Studio Setup
1. Install Android Studio
2. Install Android SDK
3. Set ANDROID_HOME environment variable

#### B. Build Issues
```bash
# Clean and rebuild
cd frontend/android
./gradlew clean
./gradlew assembleDebug
```

### 9. Debugging Tools

#### A. Backend Logs
```bash
# Start with verbose logging
python -m uvicorn app.main:app --reload --log-level debug
```

#### B. Frontend Console
- Open browser developer tools
- Check Console for detailed error messages
- Check Network tab for API requests

#### C. Database Testing
```bash
# Test database connection
cd backend
python -c "from app.db import test_connection; import asyncio; asyncio.run(test_connection())"
```

### 10. Quick Fixes

#### A. Reset Everything
```bash
# Clear database
cd backend
python clear_database.py

# Restart servers
# Backend: python -m uvicorn app.main:app --reload
# Frontend: npm start
```

#### B. Check All Services
```bash
# Test backend
curl http://localhost:8000/health

# Test frontend
curl http://localhost:3000

# Test database
node test-backend.js
```

## 🆘 Still Having Issues?

1. **Check the console logs** for detailed error messages
2. **Verify all prerequisites** are installed
3. **Test each component** individually
4. **Use the test scripts** to isolate issues
5. **Check network connectivity** and firewall settings

The enhanced error logging will help identify the specific issue. Check the browser console and backend logs for detailed error information. 