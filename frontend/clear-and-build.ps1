# Clear Database and Build Fresh APK Script for Windows

Write-Host "🧹 Clearing Database and Building Fresh APK..." -ForegroundColor Green

# Check if Node.js is installed
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js is not installed. Please install Node.js first." -ForegroundColor Red
    exit 1
}

# Check if npm is installed
if (!(Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "❌ npm is not installed. Please install npm first." -ForegroundColor Red
    exit 1
}

# Check if Python is installed
if (!(Get-Command python -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Python is not installed. Please install Python first." -ForegroundColor Red
    exit 1
}

Write-Host "🗑️  Step 1: Clearing Database..." -ForegroundColor Yellow
Set-Location ../backend

# Check if virtual environment exists
if (Test-Path "venv") {
    Write-Host "📦 Activating virtual environment..." -ForegroundColor Blue
    & "venv\Scripts\Activate.ps1"
}

# Clear the database
Write-Host "🗄️  Running database clear script..." -ForegroundColor Blue
python clear_database.py

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Database cleared successfully!" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to clear database. Please check your backend setup." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🔨 Step 2: Building Fresh APK..." -ForegroundColor Yellow
Set-Location ../frontend

# Clean previous builds
Write-Host "🧹 Cleaning previous builds..." -ForegroundColor Blue
if (Test-Path "build") { Remove-Item -Recurse -Force "build" }
if (Test-Path "node_modules") { Remove-Item -Recurse -Force "node_modules" }
if (Test-Path "android") { Remove-Item -Recurse -Force "android" }

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Blue
npm install

# Build the React app
Write-Host "🔨 Building React app..." -ForegroundColor Blue
npm run build

# Sync with Capacitor
Write-Host "🔄 Syncing with Capacitor..." -ForegroundColor Blue
npx cap sync

# Add Android platform if not exists
if (!(Test-Path "android")) {
    Write-Host "📱 Adding Android platform..." -ForegroundColor Blue
    npx cap add android
}

# Build Android APK
Write-Host "📱 Building Android APK..." -ForegroundColor Blue
npx cap build android

Write-Host ""
Write-Host "✅ Fresh build completed!" -ForegroundColor Green
Write-Host "📁 APK location: android/app/build/outputs/apk/debug/app-debug.apk" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 What was cleared:" -ForegroundColor Yellow
Write-Host "- All trips data" -ForegroundColor White
Write-Host "- All expenses data" -ForegroundColor White
Write-Host "- All profile data" -ForegroundColor White
Write-Host "- Previous build files" -ForegroundColor White
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Yellow
Write-Host "1. Install the fresh APK on your Android device" -ForegroundColor White
Write-Host "2. Test the app with clean data" -ForegroundColor White
Write-Host "3. Add your first trip and expense to verify everything works" -ForegroundColor White
Write-Host ""
Write-Host "🔧 To customize:" -ForegroundColor Yellow
Write-Host "- Edit capacitor.config.ts for app settings" -ForegroundColor White
Write-Host "- Update API_BASE_URL in src/services/api.ts" -ForegroundColor White
Write-Host "- Modify app icons in public/ folder" -ForegroundColor White 