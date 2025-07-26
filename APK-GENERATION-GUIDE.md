# MD Tours & Travels - APK Generation Guide

## Prerequisites

Before generating the APK, ensure you have:

1. **Node.js** (v16 or higher)
2. **Android Studio** with Android SDK
3. **Java Development Kit (JDK)** 11 or higher
4. **MongoDB Atlas** account and cluster
5. **Backend deployed** to a hosting service

## Step 1: Deploy Backend

### Option A: Deploy to Render (Recommended)
1. Go to [render.com](https://render.com) and create account
2. Create new Web Service
3. Connect your GitHub repository
4. Set root directory to `backend`
5. Configure environment variables:
   ```
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/md_travels?retryWrites=true&w=majority
   DB_NAME=md_travels
   ```
6. Deploy and copy the service URL

### Option B: Deploy to Railway
1. Go to [railway.app](https://railway.app)
2. Create new project from GitHub
3. Set root directory to `backend`
4. Add environment variables
5. Deploy

## Step 2: Update API URL

Once backend is deployed, update the frontend API URL:

1. Open `frontend/src/api/config.ts`
2. Replace the URL with your deployed backend URL:

```typescript
const API_BASE_URL = "https://your-deployed-backend-url.com";
```

## Step 3: Generate APK

### Method 1: Automated Script (Recommended)

```bash
# Make the script executable
chmod +x generate-apk.sh

# Run the APK generation
./generate-apk.sh
```

### Method 2: Manual Steps

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Build React app
npm run build

# Install Capacitor
npm install @capacitor/core @capacitor/cli @capacitor/android

# Initialize Capacitor
npx cap init "MD Tours & Travels" "com.mdtours.travels" --web-dir=build

# Add Android platform
npx cap add android

# Sync web code to native
npx cap sync

# Build APK
cd android
./gradlew assembleDebug
```

## Step 4: Locate APK File

The generated APK will be located at:
```
frontend/android/app/build/outputs/apk/debug/app-debug.apk
```

The script will also copy it to the project root as:
```
MD-Tours-Travels.apk
```

## Step 5: Install on Android Device

1. **Enable Unknown Sources**:
   - Go to Settings → Security
   - Enable "Unknown Sources" or "Install unknown apps"

2. **Transfer APK**:
   - Copy the APK file to your Android device
   - Use USB, email, or cloud storage

3. **Install**:
   - Open the APK file on your device
   - Tap "Install"
   - Grant necessary permissions

## App Features

The generated APK includes:

✅ **Real-time Data Sync**: All data saved to MongoDB Atlas
✅ **Trip Tracking**: Add trips with earnings from Ola, Uber, Rapido
✅ **Expense Management**: Track fuel and other expenses
✅ **Profile Management**: Update driver information
✅ **WhatsApp Sharing**: Share daily summaries
✅ **Integer-only Values**: No floating-point precision issues
✅ **Loading Indicators**: Professional UX with loading states
✅ **Error Handling**: Robust error management
✅ **Offline Capability**: Works without internet (with cached data)

## Troubleshooting

### Build Fails
- Ensure Android Studio is properly installed
- Check that ANDROID_HOME environment variable is set
- Verify JDK 11+ is installed

### App Crashes on Launch
- Check backend URL is correct and accessible
- Verify MongoDB Atlas connection
- Test backend API endpoints manually

### Data Not Syncing
- Check internet connection
- Verify backend is running and accessible
- Check MongoDB Atlas connection string

### APK Too Large
- The APK includes all necessary dependencies
- Size is typically 15-25MB
- Can be optimized further if needed

## Support

If you encounter issues:

1. Check the console output for error messages
2. Verify all prerequisites are installed
3. Test backend connectivity manually
4. Ensure MongoDB Atlas is properly configured

## Final Notes

- The APK is ready for production use
- All data is securely stored in MongoDB Atlas
- The app works offline with cached data
- Updates can be pushed by rebuilding and redistributing the APK

Your dad can now install the APK and start tracking his daily trips and earnings! 🚗✨ 