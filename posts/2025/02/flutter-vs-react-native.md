---
title: "Flutter vs React Native"
tags:
  - Flutter
  - React Native
description: "나름대로 치열하게 고민했다.."
published: true
slug: 2025/01/flutter-vs-react-native
date: "2025-02-05"
---

# 개요
최근 우리 팀에 큰 변화의 바람이 불었다. 더 이상 손보기 어려운 낡은 레거시 프로젝트를 떠나보내고, 새로운 앱을 만들어야 하는 시점이 온 것이다.

처음엔 다들 익숙한 리액트 네이티브(React Native)를 생각했다. 그런데 새로 오신 팀장님이 '플러터(Flutter)는 어때요?'라는 질문을 던지셨고, 그때부터 나의 깊은 고민이 시작됐다.

이 고민을 명확하게 매듭짓고 싶었다. 그래서 내가 직접 두 프레임워크를 비교 분석하는 기술 세미나를 열자고 팀에 제안했다. 어떤 프레임워크가 우리 팀의 미래를 위한 최선의 선택일까? 이 글은 그때의 고민과 우리가 내린 결정을 담은 기록이다. 비슷한 고민을 하는 누군가에게 이 경험이 작은 힌트가 되었으면 좋겠다.

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
- 리액트 네이티브의 경우 react-native-permissions를 사용해야 되지만, 이미 구현한 코드가 있고 우리 웹쪽에도 브릿지 코드가 이미 구현되어 있어 더 간단함.

### 성능

- 테스트 기기 및 환경 - M1 Mac, 안드로이드 Oneplus7 디바이스, iOS iPhone8/15
- 프레임워크 버전 - React Native : **0.74.1** | Flutter: **3.19.5** | Dart: **3.3.3**
![image](https://github.com/user-attachments/assets/0ccbc453-090c-4b81-b0f3-a588f567fc41)
*Android list items benchmark, Flutter Vs React Native 2024.08.13*
- 플러터는 멈춤현상이 없는데 비해 리액트 네이티브는 눈에 띄는 끊김 현상이 발생함
- APK 사이즈가 플러터가 더 작고 플러터는 빌드하는데 약 7.6초 걸린데 비해 리액트 네이티브는 23초 걸림
- 플러터는 빠른 스크롤시 멈춤, 프레임 드롭이 발생하지 않는데 리액트 네이티브는 발생할 확률이 높다.
![image](https://github.com/user-attachments/assets/f799c999-8981-4148-b54e-8131529a763c)
*IOS list items benchmark, Flutter Vs React Native 2024.08.13*
- 아이폰도 비슷한 결과
![image](https://github.com/user-attachments/assets/c50e9488-8e02-4d0f-b236-01aaf04457e1)
*대량 이미지 애니메이션 안드로이드 테스트, Flutter Vs React Native 2024.08.13*
- APK 크기 차이가 약 10mb, 하지만 빌드에는 플러터 19.6초, 리액트 네이티브 20초 거렸다고 함.
- 메모리와 CPU 차이가 크다.
![image](https://github.com/user-attachments/assets/995a4ac5-f2f9-45ff-84bf-ba4f6b689e39)
*대량 이미지 애니메이션 iOS 테스트, Flutter Vs React Native 2024.08.13*
- 좀 더 심각한 차이. 아이폰9에서 리액트 네이티브는 심각한 멈춤, 프레임 드롭 및 충돌이 발생했다고 함.
![image](https://github.com/user-attachments/assets/4c4b0491-1321-40f5-82b9-b34f60d5d9a4)
*대량 Lottie 애니메이션 안드로이드 테스트, Flutter Vs React Native 2024.08.13*
- 프레임과 APK크기, CPU에서 큰 차이가 보임.
![image](https://github.com/user-attachments/assets/251929a0-4ba4-4590-b6d7-828814e4cbaa)
*대량 Lottie 애니메이션 iOS 테스트, Flutter Vs React Native 2024.08.13*
- 의외로 플러터보다 리액트 네이티브가 더 나은 성능을 보여줌. 하지만 빌드 타임이 끔찍한…

**결론**

- Android: 모든 벤치마크에서 Flutter의 APK 크기가 일관되게 더 작고, CPU 및 메모리 사용량이 React Native보다 약간 더 나은 것으로 나타났다.
- IOS: React Native는 Flutter에 비해 리소스 소모가 매우 높다. 단, Bulk Lottie 애니메이션 앱에서는 Flutter가 더 많은 리소스를 사용한다.
    - 하지만, [3.22에서 로티 애니메이션 관련 성능 개선을 했다는 발표](https://medium.com/flutter/whats-new-in-flutter-3-22-fbde6c164fe3)가 있었음.

## 커뮤니티 / 관심도 크기

![image](https://github.com/user-attachments/assets/0abc7b01-332b-4921-87b9-b59fc4a0a036)
*[Stack Overflow, Flutter vs React Native 질문 수 추이](https://trends.stackoverflow.co/?tags=react-native,flutter)*

![image](https://github.com/user-attachments/assets/4b5fa458-7d47-4d1c-8f98-fc19cff75f77)
*Google Trends, Flutter vs React Native*
- 플러터 승리. 플러터에 대한 관심도는 계속해서 높아지고 있습니다.
    - 하지만 리액트 네이티브는 오래 된 만큼 찾아볼 정보가 더 많음. 더이상 사용되지 않는 문법들로 혼란스러울 수도 있지만…

## 학습 비용(러닝 커브)

- Javascript/React를 사용하고 있고 기존에 React Native를 사용해온 현재 내가 속한 팀에게는 RN이 훨씬 쉬움.
- Dart 사용, Flutter 프레임워크 구조 학습이 필요하기때문에 러닝커브가 높은 편.
- 리액트 네이티브 압승

## 개발 편의성

- 플러터
    - Dart 생태계가 작지만 빠르게 성장 중
    - UI 개발 속도의 편리함 - 모든 UI를 자체 렌더링(Material, Cupertino)
    - 플러터의 DevTools는 네이티브 성능 분석까지 지원하여 더 강력하다고 함
    - `camera`, `firebase_core` 등 기본(내장) 패키지 제공
- 리액트 네이티브
    - JS 개발 생태계라 매우 큼
    - Chrome DevTools 사용이 가능해서 웹개발자에게 친숙함
    - 네이티브 기능 접근시 `react-native-camera`, `react-native-firebase` 등 활용

## 현재 (프로젝트) 상황

- 성능적으로 대단한 개선이 필요한 상황은 아님(기획팀 의견)
- 하지만 우리 제품과 맞지 않는 프로젝트를 버리고 새로운 프로젝트를 구축할 필요는 있는 상황
- 신기능 구현과 앱 V2 개발을 동시 진행해야 함
- 기존 React Native 브릿지 코드가 우리 웹에 존재하는 상황
- 기존 React Native 우리의 앱이 있는 상황
- 몇가지 해결해야 되는 문제가 존재하지만 플러터로 건너가도 해결이 되는 건 아님.
    - 동일하게 구현해야 함. 난이도에선 플러터가 더 쉬울 수도 있다. 아마.
 
# 결론

- 성능적으로 우세하고, 여러 편한 기능을 내장하고 있어 플러터가 더 좋아보이지만 현재 프로젝트 상황을 고려했을 때 React Native로 만드는 게 나을 것 같다.
- 추후 팀이 관리하는 모든 프로젝트를 플러터에 붙인다고 해도 핵심 기능은 모두 웹에 있기때문에 그때 자바스크립트 채널 코드를 작성해서 붙이면 된다.

# 참고

- [토스 | SLASH22 - 미친 생산성을 위한 React Native](https://youtu.be/b_6CjuvVg8o?si=VnbYkKHZPT9YoF1f)
- [깨진 링크는 이제 그만: Flutter의 딥 링크 성공](https://io.google/2024/explore/91d19c5a-ebb9-43e9-bf31-0366af7d2ba5/intl/ko/)
- [React Native vs Flutter](https://velog.io/@minwoo129/React-Native-vs-Flutter)
- [Flutter Vs React Native : Performance Benchmarks you can’t miss ! 🔥⚡️](https://nateshmbhat.medium.com/flutter-vs-react-native-performance-benchmarks-you-cant-miss-%EF%B8%8F-2e31905df9b4)
