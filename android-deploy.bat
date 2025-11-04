@echo off
echo ========================================
echo   Optimove Android Deployment Script
echo ========================================
echo.

echo [1/5] Building web app...
call npm run build
if %errorlevel% neq 0 (
    echo ERROR: Build failed!
    pause
    exit /b %errorlevel%
)
echo ✓ Web app built successfully
echo.

echo [2/5] Syncing assets to Android...
call npx cap sync android
if %errorlevel% neq 0 (
    echo ERROR: Sync failed!
    pause
    exit /b %errorlevel%
)
echo ✓ Assets synced successfully
echo.

echo [3/5] Building Android APK...
cd android
set JAVA_HOME=C:\Program Files\Java\jdk-21
call gradlew.bat assembleDebug
if %errorlevel% neq 0 (
    echo ERROR: Android build failed!
    cd ..
    pause
    exit /b %errorlevel%
)
echo ✓ APK built successfully
echo.

echo [4/5] Installing APK on emulator...
call adb install -r app\build\outputs\apk\debug\app-debug.apk
if %errorlevel% neq 0 (
    echo ERROR: Installation failed! Is your emulator running?
    echo Run: adb devices
    cd ..
    pause
    exit /b %errorlevel%
)
echo ✓ APK installed successfully
echo.

echo [5/5] Launching app...
call adb shell am start -n com.optimove.app/.MainActivity
cd ..
echo.
echo ========================================
echo   ✓ Deployment Complete!
echo   Your app should now be running!
echo ========================================
echo.
pause
