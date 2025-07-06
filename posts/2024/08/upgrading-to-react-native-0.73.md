---
title: "React Native 0.73 업그레이드 후기"
tags:
  - React Native
  - Upgrade
  - Troubleshooting
description: "아마 내년에도 또 해야겠지?..."
published: true
slug: 2024/08/upgrading-to-react-native-0.73
date: "2024-08-30"
---

# 들어가며

구글의 새 정책이 우리 팀의 발등에 떨어진 불이 됐다. 모든 앱이 **Android 14 (API 수준 34)**를 타겟으로 맞춰야만 업데이트를 할 수 있다는데, 확인해보니 우리 프로젝트는 아직 기준 미달이었다. 그렇게 갑작스럽게, 대규모 버전 업그레이드라는 시급한 과제가 눈앞에 닥쳤다.

처음에는 무작정 android/build.gradle의 버전을 올려버리고

```java
(...)
compileSdkVersion = 34
targetSdkVersion 34
```

버전을 올린 후에 에러가 난 라이브러리들을 업그레이드 시켜줬는데 정작 앱은 실행이 되지 않는 문제가 발생했다.

앱 내의 SDK 버전을 올리기 위해서는, React Native 버전을 올려야 되는 경우가 있는데 앱이 충돌나고 있는 이유가 해당 문제로 판단, [RN 공식문서의 ChangeLog](https://github.com/facebook/react-native/blob/main/CHANGELOG.md)를 확인해보았다. 

(여기서도 볼 수 있음 [Android 14 Support](https://reactnative.dev/blog/2023/12/06/0.73-debugging-improvements-stable-symlinks#android-14-support))

![0.73 버전은 SDK34까지 지원한다는 변경 로그](./images/change-log.png)
*0.73 버전은 SDK34까지 지원한다는 변경 로그*

원인을 파악했으니 이제 해결을 해보자.

# 0.73 업그레이드 방법
## 사전 작업

1. 리액트 네이티브 공식 문서 [Upgrading to new versions](https://reactnative.dev/docs/0.73/upgrading)
2. React Native 코드 변경점을 보여주는 사이트 [React Native Upgrade Helper](https://react-native-community.github.io/upgrade-helper/?from=0.70.0&to=0.73.6)
3. @rnx-kit/align-deps https://github.com/microsoft/rnx-kit
    1. https://microsoft.github.io/rnx-kit/docs/introduction
    2. ex.`npx @rnx-kit/align-deps -requirements react-native@0.73 -write`

## 작업 과정 요약

1. Upgrade dependencies
```bash
# {{VERSION}} and {{REACT_VERSION}} are the release versions showing in the diff
// 선택한 버전으로 react-native 버전을 업그레이드 한다 
yarn add react-native@{{VERSION}}
// 선택한 react-native 버전에 추가되어 있는 동일한 버전으로 react를 업그레이드 한다
yarn add react@{{REACT_VERSION}}
```
2. [React Native Upgrade Helper](https://react-native-community.github.io/upgrade-helper/?from=0.70.0&to=0.73.6) 변경점 확인
3. Android 변경점 반영
4. Android 빌드 테스트&문제 해결
5. iOS 빌드 테스트&문제 해결
6. 전체 빌드 테스트 

# TroubleShooting

## Android

### **Android Gradle plugin requires Java 17 to run. You are currently using Java 11**

```bash
FAILURE: Build failed with an exception.

* Where:
Build file '/Users/project/pvm-react-native/android/app/build.gradle' line: 1

* What went wrong:
A problem occurred evaluating project ':app'.
> Failed to apply plugin 'com.android.internal.application'.
   > Android Gradle plugin requires Java 17 to run. You are currently using Java 11.
      Your current JDK is located in /Library/Java/JavaVirtualMachines/zulu-11.jdk/Contents/Home
      You can try some of the following options:
       - changing the IDE settings.
       - changing the JAVA_HOME environment variable.
       - changing org.gradle.java.home in gradle.properties.
```
- Android Gradle Plugin이 Java 17을 요구하지만, 현재 Java 11을 사용하고 있기 때문에 발생한다.
- Android Studio -> Settings -> Build, Execution, Deployment -> Build Tools -> Gradle 에서 버전을 변경해주면 된다.(없으면 다운로드 후 변경)

![Android Studio Settings](./images/android-settings.png)
*Android Studio -> Settings -> Build, Execution, Deployment -> Build Tools -> Gradle*

```bash
# 또는, macOS의 경우 
$brew install openjdk@17
# zshrc 사용시 .zshrc을 열어준다.
$code  ~/.zshrc
# 파일 맨 아래에 다음 코드 추가
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
export PATH=$JAVA_HOME/bin:$PATH
# 변경 사항 적용
source ~/.zshrc  # zsh 사용 시
```

### Could not determine the dependencies of task ':app:generateBundledResourcesHashDebug'.

```bash
FAILURE: Build failed with an exception.

* What went wrong:
Could not determine the dependencies of task ':app:generateBundledResourcesHashDebug'.
> Task with path 'bundleDebugJsAndAssets' not found in project ':app'.

* Try:
> Run with --stacktrace option to get the stack trace.
> Run with --info or --debug option to get more log output.
> Run with --scan to get full insights.
> Get more help at https://help.gradle.org.

BUILD FAILED in 2m 31s
error Failed to install the app. Command failed with exit code 1: ./gradlew app:installDebug -PreactNativeDevServerPort=8081 FAILURE: Build failed with an exception. * What went wrong:
Could not determine the dependencies of task ':app:generateBundledResourcesHashDebug'.
> Task with path 'bundleDebugJsAndAssets' not found in project ':app'. * Try:
> Run with --stacktrace option to get the stack trace.
> Run with --info or --debug option to get more log output.
> Run with --scan to get full insights.
> Get more help at https://help.gradle.org. BUILD FAILED in 2m 31s.
```

- code-push 버전업 해주면 된다 [Code Push Issue #2293](https://github.com/microsoft/react-native-code-push/issues/2293)

### Could not determine the dependencies of task ':flarelane_react-native-sdk:bundleLibCompileToJarDebug'.

```bash
FAILURE: Build failed with an exception.

* What went wrong:
Could not determine the dependencies of task ':flarelane_react-native-sdk:bundleLibCompileToJarDebug'.
> Could not create task ':flarelane_react-native-sdk:compileDebugJavaWithJavac'.
   > In order to compile Java 9+ source, please set compileSdkVersion to 30 or above

* Try:
> Run with --stacktrace option to get the stack trace.
> Run with --info or --debug option to get more log output.
> Run with --scan to get full insights.
> Get more help at https://help.gradle.org.

BUILD FAILED in 15s
error Failed to install the app. Command failed with exit code 1: ./gradlew app:installDebug -PreactNativeDevServerPort=8081 FAILURE: Build failed with an exception. * What went wrong:
Could not determine the dependencies of task ':flarelane_react-native-sdk:bundleLibCompileToJarDebug'.
> Could not create task ':flarelane_react-native-sdk:compileDebugJavaWithJavac'. > In order to compile Java 9+ source, please set compileSdkVersion to 30 or above * Try:
> Run with --stacktrace option to get the stack trace.
> Run with --info or --debug option to get more log output.
> Run with --scan to get full insights.
> Get more help at https://help.gradle.org. BUILD FAILED in 15s.
```

- [@flarelane/react-native-sdk](https://www.npmjs.com/package/@flarelane/react-native-sdk?activeTab=readme) 업데이트 해줌

### Deprecated Gradle features were used in this build, making it incompatible with Gradle 9.0.

```bash
> Task :react-native-screens:configureCMakeDebug[arm64-v8a]
Checking the license for package CMake 3.22.1 in /Users/Library/Android/sdk/licenses
License for package CMake 3.22.1 accepted.
Preparing "Install CMake 3.22.1 v.3.22.1".
"Install CMake 3.22.1 v.3.22.1" ready.
Installing CMake 3.22.1 in /Users/Library/Android/sdk/cmake/3.22.1
"Install CMake 3.22.1 v.3.22.1" complete.
"Install CMake 3.22.1 v.3.22.1" finished.

> Task :app:compileDebugJavaWithJavac FAILED

Deprecated Gradle features were used in this build, making it incompatible with Gradle 9.0.

You can use '--warning-mode all' to show the individual deprecation warnings and determine if they come from your own scripts or plugins.

For more on this, please refer to https://docs.gradle.org/8.3/userguide/command_line_interface.html#sec:command_line_warnings in the Gradle documentation.
351 actionable tasks: 351 executed

info 💡 Tip: Make sure that you have set up your development environment correctly, by running npx react-native doctor. To read more about doctor command visit: https://github.com/react-native-community/cli/blob/main/packages/cli-doctor/README.md#doctor 

Note: /Users/project/pvm-react-native/node_modules/appcenter-crashes/android/src/main/java/com/microsoft/appcenter/reactnative/crashes/AppCenterReactNativeCrashesListener.java uses or overrides a deprecated API.
Note: Recompile with -Xlint:deprecation for details.
Note: /Users/project/pvm-react-native/node_modules/@flarelane/react-native-sdk/android/src/main/java/com/reactnativeflarelane/FlareLaneModule.java uses or overrides a deprecated API.
Note: Recompile with -Xlint:deprecation for details.
Note: /Users/project/pvm-react-native/node_modules/react-native-code-push/android/app/src/main/java/com/microsoft/codepush/react/CodePushNativeModule.java uses or overrides a deprecated API.
Note: Recompile with -Xlint:deprecation for details.
Note: /Users/project/pvm-react-native/node_modules/react-native-code-push/android/app/src/main/java/com/microsoft/codepush/react/CodePushNativeModule.java uses unchecked or unsafe operations.
Note: Recompile with -Xlint:unchecked for details.
Note: Some input files use or override a deprecated API.
Note: Recompile with -Xlint:deprecation for details.
Note: Some input files use or override a deprecated API.
Note: Recompile with -Xlint:deprecation for details.
Note: Some input files use or override a deprecated API.
Note: Recompile with -Xlint:deprecation for details.
Note: Some input files use or override a deprecated API.
Note: Recompile with -Xlint:deprecation for details.
Note: Some input files use or override a deprecated API.
Note: Recompile with -Xlint:deprecation for details.
Note: /Users/project/pvm-react-native/node_modules/react-native-permissions/android/src/main/java/com/zoontek/rnpermissions/RNPermissionsModule.java uses or overrides a deprecated API.
Note: Recompile with -Xlint:deprecation for details.
Note: Some input files use or override a deprecated API.
Note: Recompile with -Xlint:deprecation for details.
Note: /Users/project/pvm-react-native/node_modules/react-native-push-notification/android/src/main/java/com/dieam/reactnativepushnotification/modules/RNPushNotification.java uses unchecked or unsafe operations.
Note: Recompile with -Xlint:unchecked for details.
Note: /Users/project/pvm-react-native/node_modules/react-native-send-intent/android/src/main/java/com/burnweb/rnsendintent/RNSendIntentModule.java uses or overrides a deprecated API.
Note: Recompile with -Xlint:deprecation for details.
Note: Some input files use or override a deprecated API.
Note: Recompile with -Xlint:deprecation for details.
Note: /Users/project/pvm-react-native/node_modules/react-native-safe-area-context/android/src/paper/java/com/th3rdwave/safeareacontext/NativeSafeAreaContextSpec.java uses or overrides a deprecated API.
Note: Recompile with -Xlint:deprecation for details.
Note: Some input files use or override a deprecated API.
Note: Recompile with -Xlint:deprecation for details.
Note: /Users/project/pvm-react-native/node_modules/react-native-screens/android/src/paper/java/com/swmansion/rnscreens/NativeScreensModuleSpec.java uses or overrides a deprecated API.
Note: Recompile with -Xlint:deprecation for details.
/Users/project/pvm-react-native/android/app/src/main/java/com/caihong/MainApplication.java:12: error: package com.yourappname.newarchitecture does not exist
import com.yourappname.newarchitecture.MainApplicationReactNativeHost;
                                              ^
/Users/project/pvm-react-native/android/app/src/main/java/com/caihong/MainApplication.java:48: error: cannot find symbol
      new MainApplicationReactNativeHost(this);
          ^
  symbol:   class MainApplicationReactNativeHost
  location: class MainApplication
2 errors

FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':app:compileDebugJavaWithJavac'.
> Compilation failed; see the compiler error output for details.

* Try:
> Run with --info option to get more log output.
> Run with --scan to get full insights.
```

- You can use '--warning-mode all' to show the individual deprecation warnings and determine if they come from your own scripts or plugins. 이 부분이 핵심임.
    - Android Studio > Settings > Build, Execution, Deployment > Gradle-Android Compiler로 들어가서 Command-line Options에 `--warning-mode all --stacktrace` 을 추가해준다.
        - `--warning-mode all` > Gradle 빌드 도중 발생하는 모든 경고를 출력한다.
        - `--stacktrace` > 빌드 과정에서 오류가 발생할 경우, 오류가 발생한 위치와 원인을 추적할 수 있는 자세한 스택 트레이스를 출력한다.
        - 그 후, file -> Invalidate Caches / Restart를 눌러 캐시 초기화&리스타트를 해준다
    - 참고: https://android-developer.tistory.com/14

### import com.yourappname.newarchitecture.MainApplicationReactNativeHost;

```bash
> Task :app:compileDebugJavaWithJavac FAILED

Deprecated Gradle features were used in this build, making it incompatible with Gradle 9.0.

You can use '--warning-mode all' to show the individual deprecation warnings and determine if they come from your own scripts or plugins.

For more on this, please refer to https://docs.gradle.org/8.3/userguide/command_line_interface.html#sec:command_line_warnings in the Gradle documentation.
310 actionable tasks: 7 executed, 303 up-to-date

info 💡 Tip: Make sure that you have set up your development environment correctly, by running npx react-native doctor. To read more about doctor command visit: https://github.com/react-native-community/cli/blob/main/packages/cli-doctor/README.md#doctor 

/Users/project/pvm-react-native/android/app/src/main/java/com/caihong/MainApplication.java:12: error: package com.yourappname.newarchitecture does not exist
import com.yourappname.newarchitecture.MainApplicationReactNativeHost;
                                              ^
/Users/project/pvm-react-native/android/app/src/main/java/com/caihong/MainApplication.java:48: error: cannot find symbol
      new MainApplicationReactNativeHost(this);
          ^
  symbol:   class MainApplicationReactNativeHost
  location: class MainApplication
2 errors

FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':app:compileDebugJavaWithJavac'.
> Compilation failed; see the compiler error output for details.

* Try:
> Run with --info option to get more log output.
> Run with --scan to get full insights.
```

- 삭제해야 되는 코드가 남아있어서 그런 것. 로그 잘 보면 해결 가능함.
    - [MainApplication.java](http://MainApplication.java) 파일 삭제

### ERROR  TypeError: _reactNativeSdk.default.setNotificationConvertedHandler is not a function (it is undefined)

```bash
 LOG  FlareLane - Initiallize with project id. [a441f765-13ff-4f77-a0e7-2a1788b4c902]
 ERROR  TypeError: _reactNativeSdk.default.setNotificationConvertedHandler is not a function (it is undefined)

This error is located at:
    in Setup (created by CodePushComponent)
    in CodePushComponent (created by App)
    in RecoilRoot_INTERNAL (created by RecoilRoot)
    in RecoilRoot (created by App)
    in App (created by HeadlessCheck)
    in HeadlessCheck
    in RCTView (created by View)
    in View (created by AppContainer)
    in RCTView (created by View)
    in View (created by AppContainer)
    in AppContainer
    in caihong(RootComponent), js engine: hermes
 ERROR  TypeError: _reactNativeSdk.default.setNotificationConvertedHandler is not a function (it is undefined)

This error is located at:
    in Setup (created by CodePushComponent)
    in CodePushComponent (created by App)
    in RecoilRoot_INTERNAL (created by RecoilRoot)
    in RecoilRoot (created by App)
    in App (created by HeadlessCheck)
    in HeadlessCheck
    in RCTView (created by View)
    in View (created by AppContainer)
    in RCTView (created by View)
    in View (created by AppContainer)
    in AppContainer
    in caihong(RootComponent), js engine: hermes
 LOG  ua Mozilla/5.0 (Linux; Android 14; sdk_gphone64_arm64 Build/UE1A.230829.036.A4; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/128.0.6613.88 Mobile Safari/537.36
 LOG  [CodePush] Checking for update.
 ERROR  TypeError: Cannot read property 'injectJavaScript' of null, js engine: hermes
```

- Flarelane 버전업하면서 생긴 문제. 1.5.0에서 기존에 쓰던 함수명이 변경됨. 함수명 변경해서 처리함.
    - [Flarelane React Native SDK Release Notes](https://docs.flarelane.co.kr/react-native-release-notes)

## iOS

### `project.pbxproj` 파일 변경점 반영 필요한가?

- `project.pbxproj` 파일은 Xcode 프로젝트의 설정과 구성을 관리하는 중요한 파일입니다. 이 파일을 직접 편집하는 경우는 거의 없으며, Xcode IDE에서 프로젝트를 수정하면 이 파일이 자동으로 업데이트됩니다. 직접 수정할 경우에는 실수가 발생할 수 있으므로 주의가 필요합니다.
- 참고: https://ios-development.tistory.com/406

### `PrivacyInfo.xcprivacy` 파일 반영

- [2024년 5월 1일부터 B2C앱 앱스토어 심사 시 애플의 개인정보방침에 따라, PrivacyInfo.xcprivacy 파일을 필수로 추가해야한다고 함.](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api)

### CompileC /Users/Library/Developer/Xcode/DerivedData/caihong-atbkbsyvdtwfnmeaudcmhksqstku/Build/Intermediates.noindex/Pods.build/Debug-iphonesimulator/rn-fetch-blob.build/Objects-normal/arm64/RNFetchBlob.o /Users/project/pvm-react-native/node_modules/rn-fetch-blob/ios/RNFetchBlob/RNFetchBlob.m normal arm64 objective-c com.apple.compilers.llvm.clang.1_0.compiler (in target 'rn-fetch-blob' from project 'Pods')

```bash
The following build commands failed:
        CompileC /Users/Library/Developer/Xcode/DerivedData/caihong-atbkbsyvdtwfnmeaudcmhksqstku/Build/Intermediates.noindex/Pods.build/Debug-iphonesimulator/rn-fetch-blob.build/Objects-normal/arm64/RNFetchBlob.o /Users/project/pvm-react-native/node_modules/rn-fetch-blob/ios/RNFetchBlob/RNFetchBlob.m normal arm64 objective-c com.apple.compilers.llvm.clang.1_0.compiler (in target 'rn-fetch-blob' from project 'Pods')
        CompileC /Users/Library/Developer/Xcode/DerivedData/caihong-atbkbsyvdtwfnmeaudcmhksqstku/Build/Intermediates.noindex/Pods.build/Debug-iphonesimulator/react-native-splash-screen.build/Objects-normal/arm64/RNSplashScreen.o /Users/project/pvm-react-native/node_modules/react-native-splash-screen/ios/RNSplashScreen.m normal arm64 objective-c com.apple.compilers.llvm.clang.1_0.compiler (in target 'react-native-splash-screen' from project 'Pods')
(2 failures)
```

- 두가지 라이브러리랑 충돌이 나는데 rn-fetch-blob, react-native-splash-screen 임
- rn-fetch-blob
    - 동일한 이슈 [rn-fetch-blob Issue #871](https://github.com/joltup/rn-fetch-blob/issues/871)
    - rn-fetch-blob는 스펙상 더이상 필요없는 기능을 위해 남아있는 코드였음. 해당 라이브러리 삭제 처리함

### CompileC /Users/Library/Developer/Xcode/DerivedData/caihong-atbkbsyvdtwfnmeaudcmhksqstku/Build/Intermediates.noindex/Pods.build/Debug-iphonesimulator/React-Fabric.build/Objects-normal/arm64/SafeAreaViewShadowNode.o /Users/project/pvm-react-native/node_modules/react-native/ReactCommon/react/renderer/components/safeareaview/SafeAreaViewShadowNode.cpp normal arm64 c++ com.apple.compilers.llvm.clang.1_0.compiler (in target 'React-Fabric' from project 'Pods')

```bash
** BUILD FAILED **

The following build commands failed:
        CompileC /Users/Library/Developer/Xcode/DerivedData/caihong-atbkbsyvdtwfnmeaudcmhksqstku/Build/Intermediates.noindex/Pods.build/Debug-iphonesimulator/React-Fabric.build/Objects-normal/arm64/SafeAreaViewShadowNode.o /Users/project/pvm-react-native/node_modules/react-native/ReactCommon/react/renderer/components/safeareaview/SafeAreaViewShadowNode.cpp normal arm64 c++ com.apple.compilers.llvm.clang.1_0.compiler (in target 'React-Fabric' from project 'Pods')
(1 failure)

error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```

- rn-fetch-blob 삭제처리 후
    - `$cd ios` > `$pod deintegrate` > `$pod install` > `$yarn ios` 를 진행해주니 에러 내용이 바뀜

### error: 'React/RCTThirdPartyFabricComponentsProvider.h' file not found `#import <React/RCTThirdPartyFabricComponentsProvider.h>`

```bash
/Applications/Xcode.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator17.4.sdk/usr/include/c++/v1/__config:1011:53: note: expanded from macro '_LIBCPP_DEPRECATED_'
#      define _LIBCPP_DEPRECATED_(m) __attribute__((__deprecated__(m)))
                                                    ^
In file included from /Users/project/pvm-react-native/node_modules/react-native/React/Fabric/Mounting/ComponentViews/ActivityIndicator/RCTActivityIndicatorViewComponentView.mm:16:
/Users/project/pvm-react-native/node_modules/react-native/React/Fabric/Mounting/ComponentViews/RCTFabricComponentsPlugins.h:20:9: fatal error: 'React/RCTThirdPartyFabricComponentsProvider.h' file not found
#import <React/RCTThirdPartyFabricComponentsProvider.h>
```

- [react-native Issue #34625](https://github.com/facebook/react-native/issues/34625) 참고

```bash
$git clean -fxd
$yarn install
$cd ios
$pod install
```

- 아래 에러로 로그 변경됨

### error: 'folly/lang/Hint.h' file not found

```bash
/Users/project/pvm-react-native/ios/Pods/Headers/Private/RCT-Folly/folly/lang/Assume.h:20:10: fatal error: 'folly/lang/Hint.h' file not found
#include <folly/lang/Hint.h>
```

- 다른 이슈긴 한데, 캐쉬 남아있어서 그럴 수도 있다해서 캐쉬 삭제해봄
    - `cd ios && rm -rf ~/Library/Caches/CocoaPods Pods ~/Library/Developer/Xcode/DerivedData/*; pod deintegrate; pod setup; pod install --repo-update;`
    - [[React-native] folly/gen/String.h file not found 오류 해결](https://developia.tistory.com/entry/React-native-follygenStringh-file-not-found-오류-해결)

### error: assigning to `'id<UNUserNotificationCenterDelegate> _Nullable' from incompatible type 'AppDelegate *const __strong'`

```bash
/Applications/Xcode.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator17.4.sdk/System/Library/Frameworks/UIKit.framework/Headers/UILocalNotification.h:18:12: note: 'UILocalNotification' has been explicitly marked deprecated here
@interface UILocalNotification : NSObject<NSCopying, NSCoding>
           ^
/Users/project/pvm-react-native/ios/caihong/AppDelegate.mm:28:25: error: assigning to 'id<UNUserNotificationCenterDelegate> _Nullable' from incompatible type 'AppDelegate *const __strong'
      center.delegate = self;
                        ^~~~
```

- 에러 메시지 해석해보면 `AppDelegate` 클래스가 `UNUserNotificationCenterDelegate` 프로토콜을 준수하지 않아서 발생하는 문제이다
- 이 문제를 해결하려면 `AppDelegate` 클래스가 `UNUserNotificationCenterDelegate` 프로토콜을 구현하도록 해야 한다.

```objectivec
// 변경전 에러 발생하던 코드 0.73 변경점 반영한 내용 pvm 주석 바로 아래 코드만 추가됨
#import <RCTAppDelegate.h>
#import <UIKit/UIKit.h>
// pvm
#import <UserNotifications/UNUserNotificationCenter.h>

@interface AppDelegate : RCTAppDelegate

@end

// 변경된 코드
#import <RCTAppDelegate.h>
#import <UIKit/UIKit.h>
// pvm
#import <UserNotifications/UNUserNotificationCenter.h>

@interface AppDelegate : RCTAppDelegate <UNUserNotificationCenterDelegate>

@end

// 0.70 업그레이드 전 코드

#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>
#import <UserNotifications/UNUserNotificationCenter.h>

@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate, UNUserNotificationCenterDelegate>

@property (nonatomic, strong) UIWindow *window;
```

- 내가 ios 네이티브 코드를 몰라서 발생시킨 문제이다. 이전 코드에서 어디까지 반영 시켜야되는 지 몰라 빠트렸다.


# 후기
이번이 벌써 두 번째 React Native 업그레이드 작업이었지만, 이 작업은 할 때마다 새로운 산을 넘는 기분이다.

에러 로그는 수십 줄씩 쏟아지지만 정작 핵심 원인은 안개 속에 숨어있기 일쑤고, 어디서부터 실마리를 찾아야 할지 막막한 순간이 여러 번 찾아왔다. 이럴 때일수록 모든 트러블슈팅 과정을 꼼꼼히 기록하는 습관이 얼마나 중요한지 다시 한번 깨닫게 된다.

실제로 이번에도 과거 다른 프로젝트에서 남겼던 업그레이드 기록을 등대 삼아, 한 걸음씩 나아갈 수 있었다. 새삼 기록은 정말 중요하다는 사실을 다시 한번 느낀다.

물론 과정은 고통스럽다. 하지만 작은 단서로 문제를 하나 해결하고, 조심스럽게 빌드를 돌렸을 때 마주하는 새로운 로그에 안도하며 다음 단계로 나아가는 과정, 그리고 마침내 모든 것이 정상으로 돌아왔을 때의 희열은 이 모든 어려움을 보상받기에 충분했다.

이 글이 저처럼 React Native 업그레이드의 망망대해에서 길을 잃은 분들께, 막막한 어둠을 밝혀주는 작은 등대가 되기를 바란다.