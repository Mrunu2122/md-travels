#!/bin/bash

echo "🧹 Clearing Database and Building Fresh APK..."

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

# Check if Python is installed
if ! command -v python &> /dev/null; then
    echo "❌ Python is not installed. Please install Python first."
    exit 1
fi

echo "🗑️  Step 1: Clearing Database..."
cd ../backend

# Check if virtual environment exists
if [ -d "venv" ]; then
    echo "📦 Activating virtual environment..."
    source venv/Scripts/activate  # Windows
    # source venv/bin/activate  # Linux/Mac
fi

# Clear the database
echo "🗄️  Running database clear script..."
python clear_database.py

if [ $? -eq 0 ]; then
    echo "✅ Database cleared successfully!"
else
    echo "❌ Failed to clear database. Please check your backend setup."
    exit 1
fi

echo ""
echo "🔨 Step 2: Building Fresh APK..."
cd ../frontend

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf build/
rm -rf node_modules/
rm -rf android/

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the React app
echo "🔨 Building React app..."
npm run build

# Sync with Capacitor
echo "🔄 Syncing with Capacitor..."
npx cap sync

# Add Android platform if not exists
if [ ! -d "android" ]; then
    echo "📱 Adding Android platform..."
    npx cap add android
fi

# Build Android APK
echo "📱 Building Android APK..."
npx cap build android

echo ""
echo "✅ Fresh build completed!"
echo "📁 APK location: android/app/build/outputs/apk/debug/app-debug.apk"
echo ""
echo "📋 What was cleared:"
echo "- All trips data"
echo "- All expenses data"
echo "- All profile data"
echo "- Previous build files"
echo ""
echo "📋 Next steps:"
echo "1. Install the fresh APK on your Android device"
echo "2. Test the app with clean data"
echo "3. Add your first trip and expense to verify everything works"
echo ""
echo "🔧 To customize:"
echo "- Edit capacitor.config.ts for app settings"
echo "- Update API_BASE_URL in src/services/api.ts"
echo "- Modify app icons in public/ folder" 