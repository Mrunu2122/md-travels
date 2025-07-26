#!/bin/bash

echo "🚗 Building MD Tours & Travels APK..."

# Navigate to frontend directory
cd frontend

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the React app
echo "🔨 Building React app..."
npm run build

# Install Capacitor if not already installed
if [ ! -d "node_modules/@capacitor" ]; then
    echo "📱 Installing Capacitor..."
    npm install @capacitor/core @capacitor/cli @capacitor/android
fi

# Initialize Capacitor if not already done
if [ ! -f "capacitor.config.ts" ]; then
    echo "⚙️ Initializing Capacitor..."
    npx cap init "MD Tours & Travels" "com.mdtours.travels" --web-dir=build
fi

# Add Android platform if not already added
if [ ! -d "android" ]; then
    echo "🤖 Adding Android platform..."
    npx cap add android
fi

# Sync web code to native
echo "🔄 Syncing web code to native..."
npx cap sync

# Build APK
echo "🏗️ Building APK..."
cd android
./gradlew assembleDebug

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ APK built successfully!"
    echo "📱 APK location: android/app/build/outputs/apk/debug/app-debug.apk"
    echo "📁 You can find the APK file in the android/app/build/outputs/apk/debug/ directory"
else
    echo "❌ APK build failed. Please check the error messages above."
fi

cd .. 