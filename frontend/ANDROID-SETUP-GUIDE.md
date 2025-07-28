# Android SDK Setup Guide for MD Tours & Travels

## 🚨 Current Issue
The build is failing because Android SDK is not configured. Follow this guide to fix it.

## 📱 Step 1: Install Android Studio

### Download Android Studio:
1. Go to [Android Studio Download Page](https://developer.android.com/studio)
2. Download the latest version for Windows
3. Run the installer and follow the setup wizard

### During Installation:
- ✅ Choose "Standard" installation
- ✅ Let it install Android SDK automatically
- ✅ Install Android Virtual Device (AVD) if you want to test

## 🔧 Step 2: Set Environment Variables

### Option 1: Automatic (Recommended)
Android Studio usually sets this automatically. If not, follow Option 2.

### Option 2: Manual Setup
1. **Find your Android SDK path:**
   - Open Android Studio
   - Go to `File` → `Settings` → `Appearance & Behavior` → `System Settings` → `Android SDK`
   - Copy the "Android SDK Location" path (usually `C:\Users\[YourUsername]\AppData\Local\Android\Sdk`)

2. **Set ANDROID_HOME environment variable:**
   - Press `Win + R`, type `sysdm.cpl`, press Enter
   - Click "Environment Variables"
   - Under "System Variables", click "New"
   - Variable name: `ANDROID_HOME`
   - Variable value: Your SDK path (e.g., `C:\Users\mrunal\AppData\Local\Android\Sdk`)
   - Click OK

3. **Add to PATH:**
   - In the same Environment Variables window
   - Find "Path" in System Variables, click "Edit"
   - Click "New" and add: `%ANDROID_HOME%\platform-tools`
   - Click "New" and add: `%ANDROID_HOME%\tools`
   - Click OK on all windows

## 🔄 Step 3: Restart and Verify

### Restart Command Prompt/PowerShell:
```powershell
# Close and reopen your terminal
# Then verify the setup:
echo $env:ANDROID_HOME
```

### Expected output:
```
C:\Users\mrunal\AppData\Local\Android\Sdk
```

## 📋 Step 4: Accept SDK Licenses

```powershell
# Navigate to your project
cd C:\Users\mrunal\Downloads\md-travels\frontend

# Accept all licenses
%ANDROID_HOME%\tools\bin\sdkmanager --licenses
```

**Note:** Press `y` and Enter for each license agreement.

## 🛠️ Step 5: Alternative - Use Android Studio

If you prefer to use Android Studio directly:

```powershell
# Open the project in Android Studio
npx cap open android
```

Then in Android Studio:
1. Let it sync and download dependencies
2. Go to `Build` → `Build Bundle(s) / APK(s)` → `Build APK(s)`
3. Find the APK in `android/app/build/outputs/apk/debug/`

## 🚀 Step 6: Build APK

### After setting up Android SDK:

```powershell
# Clean and rebuild
npx cap sync
npx cap build android
```

### Or use the full script:
```powershell
.\clear-and-build.ps1
```

## 📁 Expected APK Location
After successful build:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

## 🐛 Troubleshooting

### Issue 1: "SDK location not found"
**Solution:** Follow Step 2 above to set ANDROID_HOME

### Issue 2: "License not accepted"
**Solution:** Run the license acceptance command in Step 4

### Issue 3: "Gradle build failed"
**Solution:** 
1. Open in Android Studio: `npx cap open android`
2. Let it sync and download dependencies
3. Build from Android Studio

### Issue 4: "Command not found"
**Solution:** Restart your terminal after setting environment variables

## ✅ Verification Checklist

- [ ] Android Studio installed
- [ ] ANDROID_HOME environment variable set
- [ ] SDK licenses accepted
- [ ] Terminal restarted
- [ ] `npx cap build android` works
- [ ] APK file generated

## 📞 Quick Commands

```powershell
# Check if Android SDK is found
echo $env:ANDROID_HOME

# Accept licenses
%ANDROID_HOME%\tools\bin\sdkmanager --licenses

# Build APK
npx cap build android

# Open in Android Studio
npx cap open android
```

---

**After completing these steps, your APK build should work! 🎉** 