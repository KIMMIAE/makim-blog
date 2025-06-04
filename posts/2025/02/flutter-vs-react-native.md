---
title: "Flutter vs React Native"
tags:
  - Flutter
  - React Native
description: "나름대로 치열하게 고민했다.."
published: false
slug: 2025/01/flutter-vs-react-native
date: "2025-02-05"
---

# 프레임워크 선정 기준

1. 구현할 서비스의 목적과 특징에 부합하는지
2. 커뮤니티 크기 (참고할 자료가 풍부한지)
3. 러닝커브
4. 개발 편의성 (기본 제공, 라이브러리 규모)
5. 현재 (프로젝트) 상황

## 구현할 서비스의 목적과 특징에 부합하는지

### 딥링크

- RN의 경우 외부 라이브러리 등을 사용해야 되지만 Flutter은 내장 패키지(`go_router`, `app_links`)등을 활용해 더욱 쉽게 구현이 가능하다는 장점이 있음
- 그 외에는 유사하고 결국 카카오톡 인앱 브라우저 같은 문제는 별개의 문제이기때문에 양쪽 프레임워크 모두 대응이 필요함.
- (부록)카카오톡 인앱 브라우저 해결
    - [직접 겪은 카카오 인앱 브라우저 이슈/해결 방법](https://guiyomi.tistory.com/159)

### 웹뷰 캐싱

- `flutter_inappwebview`는 **캐싱을 세부적으로 컨트롤 가능** (`cacheEnabled`, `clearCache()`, `loadUrlWithHeaders()`)
- `react-native-webview`는 **기본적인 캐싱만 제공** (`cacheEnabled`)
    - [Issue #880](https://github.com/react-native-webview/react-native-webview/issues/880)
    - [Isuee #737](https://github.com/react-native-webview/react-native-webview/issues/737)
- 웹에서 처리하는 방안이 있음
    - 카카오 브라우저에서도 해결해야 되는 문제라 캐시 부스팅을 통해 해결하는 게 더 나아보임
    - [[React] 캐시 무효화(Cache Busting) 이해하고 적용하기](https://adjh54.tistory.com/70)

### 카메라, 알림 권한

- 카메라, 알림 권한 얻는 방법은 둘 다 비슷하나 플러터의 경우 기본 내장 패키지가 있고 코드가 더 단순하다는 특징이 있음
- 리액트 네이티브의 경우 react-native-permissions를 사용해야 되지만, 이미 구현한 코드가 있고 마켓 웹쪽에도 브릿지 코드가 이미 구현되어 있어 더 간단함.

### 성능

- 테스트 기기 및 환경 - M1 Mac, 안드로이드 Oneplus7 디바이스, iOS iPhone8/15
- 프레임워크 버전 - React Native : **0.74.1** | Flutter: **3.19.5** | Dart: **3.3.3**
![image](https://github.com/user-attachments/assets/0ccbc453-090c-4b81-b0f3-a588f567fc41)
*Android list items benchmark, Flutter Vs React Native 2024.08.13*
- 플러터는 멈춤현상이 없는데 비해 리액트 네이티브는 눈에 띄는 끊김 현상이 발생함
- APK 사이즈가 플러터가 더 작고 플러터는 빌드하는데 약 7.6초 걸린데 비해 리액트 네이티브는 23초 걸림
- 플러터는 빠른 스크롤시 멈춤, 프레임 드롭이 발생하지 않는데 리액트 네이티브는 발생할 확률이 높다.


