@echo off
echo ========================================
echo   Quick Android Update (Build + Install)
echo ========================================
echo.

echo [1/3] Building Android APK...
cd android
set JAVA_HOME=C:\Program Files\Java\jdk-21
call gradlew.bat assembleDebug
if %errorlevel% neq 0 (
    echo ERROR: Build failed!
    cd ..
    pause
    exit /b %errorlevel%
)
echo ✓ APK built
echo.

echo [2/3] Installing APK...
call adb install -r app\build\outputs\apk\debug\app-debug.apk
if %errorlevel% neq 0 (
    echo ERROR: Installation failed!
    cd ..
    pause
    exit /b %errorlevel%
)
echo ✓ Installed
echo.

echo [3/3] Launching app...
call adb shell am start -n com.optimove.app/.MainActivity
cd ..
echo.
echo ✓ Done! App is running.
pause
