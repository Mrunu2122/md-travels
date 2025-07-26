# Backend Deployment Guide

## Deploy to Render (Recommended)

### 1. Create Render Account
- Go to [render.com](https://render.com)
- Sign up for a free account

### 2. Create New Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Select the backend directory

### 3. Configure Service
- **Name**: `md-tours-backend`
- **Environment**: `Python 3`
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

### 4. Environment Variables
Add these in Render dashboard:
```
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/md_travels?retryWrites=true&w=majority
DB_NAME=md_travels
```

### 5. Deploy
- Click "Create Web Service"
- Wait for deployment (usually 2-3 minutes)
- Copy the service URL (e.g., `https://md-tours-backend.onrender.com`)

### 6. Update Frontend
Update `frontend/src/api/config.ts`:
```typescript
const API_BASE_URL = "https://your-render-service-url.onrender.com";
```

## Alternative: Deploy to Railway

### 1. Create Railway Account
- Go to [railway.app](https://railway.app)
- Sign up with GitHub

### 2. Deploy
1. Click "New Project" → "Deploy from GitHub repo"
2. Select your repository
3. Set root directory to `backend`
4. Add environment variables
5. Deploy

## Alternative: Deploy to Heroku

### 1. Install Heroku CLI
```bash
# macOS
brew install heroku/brew/heroku

# Windows
# Download from https://devcenter.heroku.com/articles/heroku-cli
```

### 2. Create Heroku App
```bash
heroku create md-tours-backend
```

### 3. Add Buildpacks
```bash
heroku buildpacks:set heroku/python
```

### 4. Set Environment Variables
```bash
heroku config:set MONGO_URI="your-mongodb-connection-string"
heroku config:set DB_NAME="md_travels"
```

### 5. Deploy
```bash
git add .
git commit -m "Deploy backend"
git push heroku main
```

## MongoDB Atlas Setup

### 1. Create Cluster
1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create free cluster
3. Choose cloud provider (AWS, Google Cloud, Azure)
4. Select region close to your users

### 2. Create Database User
1. Go to "Database Access"
2. Click "Add New Database User"
3. Username: `md_tours_user`
4. Password: Generate secure password
5. Role: "Read and write to any database"

### 3. Get Connection String
1. Go to "Database" → "Connect"
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password

### 4. Update Environment Variables
Use this format in your deployment platform:
```
MONGO_URI=mongodb+srv://md_tours_user:<password>@cluster0.xxxxx.mongodb.net/md_travels?retryWrites=true&w=majority
DB_NAME=md_travels
```

## Test Deployment

After deployment, test your backend:

```bash
curl https://your-backend-url.com/
```

Should return:
```json
{"message": "MD Tours & Travels API is running"}
```

## Update Frontend API URL

Once backend is deployed, update the frontend:

1. Open `frontend/src/api/config.ts`
2. Replace the URL with your deployed backend URL
3. Rebuild the APK

```typescript
const API_BASE_URL = "https://your-deployed-backend-url.com";
``` 