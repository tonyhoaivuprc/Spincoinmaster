# Copilot Instructions for Spin Master Android App

## Project Overview
This is a **Capacitor-based hybrid Android app** (`com.spinmaster.app`) that wraps a web frontend (built with a JS framework) using Capacitor's bridge layer. The app name is "spin link" with a target SDK of 36 (Android 14) and minimum SDK 24 (Android 7).

**Key Architecture Pattern**: Capacitor handles Android native capabilities while the actual UI and business logic live in web code served from the `dist/` directory (see [capacitor.config.json](app/src/main/assets/capacitor.config.json)).

## Project Structure & Modules
- **`:app`** – Main Android application module containing `MainActivity` (a minimal `BridgeActivity` subclass) and all Android-specific resources
- **`:capacitor-cordova-android-plugins`** – Auto-generated module for native Cordova plugins (regenerated on `capacitor update`)
- **`:capacitor-android`** – Capacitor framework dependency (linked from `node_modules/@capacitor/android`)

The **Gradle dependency model** uses:
- [variables.gradle](variables.gradle) – Centralized version management for all dependencies
- [app/build.gradle](app/build.gradle) – Main app configuration and dependency declarations
- [build.gradle](build.gradle) – Root-level configuration with Gradle plugin classpath

## Build System & Configuration
- **Gradle 8.13.0** with AGP (Android Gradle Plugin) 8.13.0
- **Java compatibility**: Version 21 (set in [app/capacitor.build.gradle](app/capacitor.build.gradle))
- **Minified release builds** disabled (see `proguardFiles` config)
- **Firebase/Google Services**: Conditionally applied if `google-services.json` exists; logs a warning if missing

**Build Command Conventions**:
```bash
./gradlew build          # Full build
./gradlew installDebug   # Debug APK to connected device
./gradlew assembleRelease # Release APK (unsigned)
```

## Native Code Patterns
- **Minimal Java footprint**: Only one custom Java class ([MainActivity.java](app/src/main/java/com/spinmaster/app/MainActivity.java)) which simply extends `BridgeActivity` from Capacitor—do NOT add logic here; this is the entry point only
- **All feature implementation** should use Capacitor plugins or direct web-to-native bridges via Capacitor's JavaScript API
- **FileProvider setup**: Configured in [AndroidManifest.xml](app/src/main/assets/AndroidManifest.xml) for file access; paths defined in [xml/file_paths.xml](app/src/main/res/xml/file_paths.xml)
- **Permissions**: Internet permission is already set; add others to [AndroidManifest.xml](app/src/main/assets/AndroidManifest.xml) as needed

## Critical Developer Workflows

### Updating Dependencies
1. Modify versions in [variables.gradle](variables.gradle)
2. Run `./gradlew clean build` to validate
3. For Capacitor plugins, run `capacitor update` (regenerates `capacitor-cordova-android-plugins` and [capacitor.settings.gradle](capacitor.settings.gradle))

### Adding Native Functionality
- **Never add custom Java**; instead, use existing Capacitor plugins from `npm`
- If a plugin is needed, install via npm and run `capacitor update android`
- Debug plugin issues by checking generated code in `capacitor-cordova-android-plugins/`

### Testing
- Unit tests: `./gradlew test` (runs tests in [app/src/test/](app/src/test/))
- Instrumented tests: `./gradlew connectedAndroidTest` (runs tests in [app/src/androidTest/](app/src/androidTest/))

## Integration Points

### Web-to-Native Bridge
- **Capacitor JavaScript API** handles all communication between web code (in `dist/`) and native Android
- **No custom native code required** for standard functionality—Capacitor plugins cover storage, camera, notifications, etc.
- Docs: https://capacitorjs.com/docs

### External Dependencies
- **Google Play Services** (version 4.4.4) – Included if `google-services.json` is present; needed for FCM/push notifications
- **AndroidX libraries** – Fully androidx-based (no legacy support library)
- **Cordova plugins** – Pulled via Capacitor; see [capacitor-cordova-android-plugins/build.gradle](capacitor-cordova-android-plugins/build.gradle)

## Resource & Asset Configuration
- **App icons/resources**: [app/src/main/res/](app/src/main/res/) (organized by DPI and config)
- **Web assets**: [app/src/main/assets/public/](app/src/main/assets/public/) (index.html, JS bundles, etc.) – built from web project's `dist/` directory
- **String/color resources**: [app/src/main/res/values/](app/src/main/res/values/) – modify for localization or theming
- **APTA ignores** certain files (see [app/build.gradle](app/build.gradle) `aaptOptions`) to avoid bloating the APK

## Conventions & Best Practices
1. **Never modify auto-generated files**: `capacitor-cordova-android-plugins/`, [capacitor.settings.gradle](capacitor.settings.gradle), [app/capacitor.build.gradle](app/capacitor.build.gradle) are regenerated on `capacitor update`
2. **Version management**: Always update [variables.gradle](variables.gradle) for library version changes—don't hardcode versions in module build files
3. **Permissions**: Keep [AndroidManifest.xml](app/src/main/assets/AndroidManifest.xml) minimal; request runtime permissions from web code via Capacitor plugin APIs
4. **Debug builds**: Always test on emulator/device before release; use `./gradlew installDebug` for fast iteration
5. **ProGuard/R8**: Minification is disabled for release builds; enable if APK size becomes critical (see [proguard-rules.pro](app/proguard-rules.pro))

## Common Tasks
| Task | Command |
|------|---------|
| Build debug APK | `./gradlew installDebug` |
| Build release APK | `./gradlew assembleRelease` |
| Run unit tests | `./gradlew test` |
| Run device tests | `./gradlew connectedAndroidTest` |
| Update Capacitor | `capacitor update android` |
| Clean build cache | `./gradlew clean build` |
