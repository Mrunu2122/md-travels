# MD Tours & Travels - Android APK Generation Guide

## 📱 Overview
This guide will help you build an Android APK for the MD Tours & Travels driver earnings tracker app.

## 🛠️ Prerequisites

### Required Software:
1. **Node.js** (v16 or higher)
2. **npm** (comes with Node.js)
3. **Android Studio** (for Android SDK)
4. **Java Development Kit (JDK)** (v11 or higher)

### Android Studio Setup:
1. Download and install [Android Studio](https://developer.android.com/studio)
2. Open Android Studio and install Android SDK
3. Set up ANDROID_HOME environment variable
4. Accept Android SDK licenses

## 🚀 Quick Build (Recommended)

### Option 1: Using the build script
```bash
# Make the script executable (Linux/Mac)
chmod +x build-apk.sh

# Run the build script
./build-apk.sh
```

### Option 2: Manual build
```bash
# Install dependencies
npm install

# Build React app
npm run build

# Sync with Capacitor
npx cap sync

# Build Android APK
npx cap build android --release
```

## 📁 APK Location
After successful build, find your APK at:
```
android/app/build/outputs/apk/release/app-release.apk
```

## ⚙️ Configuration

### 1. API Configuration
Update the API base URL in `src/services/api.ts`:
```typescript
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://your-backend-url.vercel.app';
```

### 2. Environment Variables
Create a `.env` file in the frontend directory:
```env
REACT_APP_API_BASE_URL=https://your-backend-url.vercel.app
```

### 3. App Configuration
Edit `capacitor.config.ts` for app settings:
```typescript
const config: CapacitorConfig = {
  appId: 'com.mdtravels.app',
  appName: 'MD Tours & Travels',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};
```

## 🔧 Customization

### App Icons
Replace icons in the `public/` folder:
- `favicon.ico` (16x16, 32x32, 48x48)
- `logo192.png` (192x192)
- `logo512.png` (512x512)

### App Name & Package ID
Update in `capacitor.config.ts`:
```typescript
appId: 'com.mdtravels.app',  // Package ID
appName: 'MD Tours & Travels', // App name
```

### Theme Colors
Update in `public/manifest.json`:
```json
{
  "theme_color": "#3B82F6",
  "background_color": "#ffffff"
}
```

## 📱 Installation & Testing

### 1. Install APK on Android Device
- Enable "Unknown Sources" in Android settings
- Transfer APK to device and install
- Grant necessary permissions

### 2. Test All Features
- ✅ Dashboard with real-time metrics
- ✅ Add Trip with platform earnings
- ✅ Expenses tracking
- ✅ Profile management
- ✅ WhatsApp sharing
- ✅ Charts and graphs
- ✅ Data persistence

### 3. Backend Integration
Ensure your backend is deployed and accessible:
- Deploy to Vercel, Railway, or similar
- Update API_BASE_URL in the app
- Test all API endpoints

## 🐛 Troubleshooting

### Common Issues:

1. **Build fails with Android SDK error**
   - Install Android Studio and SDK
   - Set ANDROID_HOME environment variable
   - Accept SDK licenses: `sdkmanager --licenses`

2. **APK not installing on device**
   - Enable "Unknown Sources" in Android settings
   - Check device compatibility (Android 5.0+)

3. **App crashes on startup**
   - Check API_BASE_URL configuration
   - Ensure backend is accessible
   - Check network permissions

4. **Charts not displaying**
   - Ensure Recharts is properly installed
   - Check for JavaScript errors in browser console

### Debug Commands:
```bash
# Check Capacitor status
npx cap doctor

# Sync project
npx cap sync

# Open in Android Studio
npx cap open android

# Run on device (requires Android Studio)
npx cap run android
```

## 📊 Features Included

### ✅ Core Features:
- Real-time dashboard with metrics
- Trip tracking with platform earnings
- Expense management
- Profile management
- WhatsApp integration
- Interactive charts and graphs

### ✅ Mobile Optimizations:
- Responsive design
- Touch-friendly interface
- Offline capability (with cached data)
- Native app performance
- PWA support

### ✅ Data Persistence:
- All data saved to MongoDB
- Permanent storage until manually cleared
- Real-time synchronization
- Error handling and recovery

## 🎯 Production Deployment

### Backend Deployment:
1. Deploy FastAPI backend to Vercel/Railway
2. Update API_BASE_URL in the app
3. Test all endpoints

### App Distribution:
1. Generate signed APK for production
2. Test on multiple devices
3. Share APK file with users

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review Capacitor documentation
3. Test API endpoints separately
4. Check browser console for errors

---

**Happy Building! 🚀** 