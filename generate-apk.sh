#!/bin/bash

echo "🚗 Generating MD Tours & Travels APK..."
echo "=========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if we're in the right directory
if [ ! -d "frontend" ]; then
    print_error "Please run this script from the project root directory"
    exit 1
fi

# Navigate to frontend directory
cd frontend

print_status "Starting APK generation process..."

# Step 1: Install dependencies
print_status "Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    print_error "Failed to install dependencies"
    exit 1
fi

# Step 2: Build the React app
print_status "Building React app..."
npm run build

if [ $? -ne 0 ]; then
    print_error "Failed to build React app"
    exit 1
fi

# Step 3: Install Capacitor if not already installed
if [ ! -d "node_modules/@capacitor" ]; then
    print_status "Installing Capacitor..."
    npm install @capacitor/core @capacitor/cli @capacitor/android
fi

# Step 4: Initialize Capacitor if not already done
if [ ! -f "capacitor.config.ts" ]; then
    print_status "Initializing Capacitor..."
    npx cap init "MD Tours & Travels" "com.mdtours.travels" --web-dir=build
fi

# Step 5: Add Android platform if not already added
if [ ! -d "android" ]; then
    print_status "Adding Android platform..."
    npx cap add android
fi

# Step 6: Sync web code to native
print_status "Syncing web code to native..."
npx cap sync

# Step 7: Create Android resources if they don't exist
if [ ! -d "android/app/src/main/res/values" ]; then
    print_status "Creating Android resources..."
    mkdir -p android/app/src/main/res/values
    mkdir -p android/app/src/main/res/xml
fi

# Step 8: Create file_paths.xml
cat > android/app/src/main/res/xml/file_paths.xml << 'EOF'
<?xml version="1.0" encoding="utf-8"?>
<paths xmlns:android="http://schemas.android.com/apk/res/android">
    <external-path name="my_images" path="Android/data/com.mdtours.travels/files/Pictures" />
    <external-path name="my_docs" path="Android/data/com.mdtours.travels/files/Documents" />
    <external-files-path name="my_files" path="." />
    <cache-path name="my_cache" path="." />
</paths>
EOF

# Step 9: Create styles.xml
mkdir -p android/app/src/main/res/values
cat > android/app/src/main/res/values/styles.xml << 'EOF'
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar">
        <item name="colorPrimary">@color/colorPrimary</item>
        <item name="colorPrimaryDark">@color/colorPrimaryDark</item>
        <item name="colorAccent">@color/colorAccent</item>
    </style>
    <style name="AppTheme.NoActionBarLaunch" parent="Theme.SplashScreen">
        <item name="windowSplashScreenBackground">@color/colorPrimary</item>
        <item name="windowSplashScreenAnimatedIcon">@drawable/ic_launcher_foreground</item>
        <item name="postSplashScreenTheme">@style/AppTheme</item>
    </style>
</resources>
EOF

# Step 10: Create colors.xml
cat > android/app/src/main/res/values/colors.xml << 'EOF'
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="colorPrimary">#2563eb</color>
    <color name="colorPrimaryDark">#1d4ed8</color>
    <color name="colorAccent">#14b8a6</color>
</resources>
EOF

# Step 11: Build APK
print_status "Building APK..."
cd android

# Clean previous builds
./gradlew clean

# Build debug APK
./gradlew assembleDebug

if [ $? -eq 0 ]; then
    print_status "APK built successfully!"
    
    # Find the APK file
    APK_PATH="app/build/outputs/apk/debug/app-debug.apk"
    
    if [ -f "$APK_PATH" ]; then
        print_status "APK location: $APK_PATH"
        print_status "APK size: $(du -h "$APK_PATH" | cut -f1)"
        
        # Copy APK to project root for easy access
        cp "$APK_PATH" ../../MD-Tours-Travels.apk
        print_status "APK copied to project root as 'MD-Tours-Travels.apk'"
        
        echo ""
        echo "🎉 APK Generation Complete!"
        echo "📱 File: MD-Tours-Travels.apk"
        echo "📏 Size: $(du -h "$APK_PATH" | cut -f1)"
        echo "📋 Ready to install on Android devices"
        echo ""
        echo "📤 You can now share this APK file with your dad!"
        
    else
        print_error "APK file not found at expected location"
        exit 1
    fi
else
    print_error "APK build failed. Please check the error messages above."
    exit 1
fi

cd .. 