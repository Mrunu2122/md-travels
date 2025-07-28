#!/bin/bash

echo "🚀 Building MD Tours & Travels APK..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the React app
echo "🔨 Building React app..."
npm run build

# Sync with Capacitor
echo "🔄 Syncing with Capacitor..."
npx cap sync

# Build Android APK
echo "📱 Building Android APK..."
npx cap build android

echo "✅ APK build completed!"
echo "📁 APK location: android/app/build/outputs/apk/debug/app-debug.apk"
echo ""
echo "📋 Next steps:"
echo "1. Install the APK on your Android device"
echo "2. Update the API URL in the app if needed"
echo "3. Test all features: Dashboard, Add Trip, Expenses, Profile"
echo ""
echo "🔧 To generate a release APK:"
echo "1. Open Android Studio: npx cap open android"
echo "2. Build > Generate Signed Bundle/APK"
echo "3. Choose APK and follow the signing process"
echo ""
echo "🔧 To customize the build:"
echo "- Edit capacitor.config.ts for app settings"
echo "- Update API_BASE_URL in src/services/api.ts"
echo "- Modify app icons in public/ folder" 