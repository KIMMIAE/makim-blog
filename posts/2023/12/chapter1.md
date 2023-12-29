---
title: '시멘틱 마크업에 대해서'
tags:
  - html
  - css
  - 시멘틱 마크업
description: '요즘 자주 듣는 노래는 비비의 파도...'
slug: 2023/12/chapter1
date: '2023-12-12'
---
# 1. HTML 이해하기
**Goal**
* 다양한 HTMl 태그, CSS 속성의 문법과 주요 특징을 숙지한다
* 실습을 통해 해당 코드가 브라우저에서 어떻게 표현되는지 확인한다

## 1.1 HTML 소개
* HTML(Hyper Text Markup Language)
* Hyper Text는 단순한 텍스트를 넘어서 웹 페이지의 특정 부분과 연결할 수 있는 기능을 가진 텍스트, 즉 링크를 의미한다.
* Markup Language는 프로그래밍 언어의 한 종류로 정보를 구조적, 계층적으로 표현 가능하다.
* HTML은 1990년대 영국의 물리학자 **팀 버너스리**가 제안하여 개발되었는데, 초기 개발 목적은 연구소의 연구원들이 신속하게 정보와 문서를 공유하는 것이었다.

### 읽어보기
* [HTML(MDN)](https://developer.mozilla.org/ko/docs/Web/HTML)

## 1.2 HTML 문법 - 태그

**태그란?**
* HTML은 태그들의 집합이며, 태그는 HTML에서 가장 중요하고 기본이 되는 규칙이다.
* 다양한 태그들을 이용해 코드를 작성하면, 브라우저가 이를 인식해 내용을 표현한다.

**태그 사용법**
```html
<!-- 시작 태그  -->
<h1>
    content
<!-- 종료 태그, 종료 태그는 태그 이름 앞에 '/' 기호가 붙는다  -->
</h1>
```

**요소란?**
* 내용을 포함한 태그 전체를 요소(Element)라고 한다.
* 태그와 요소는 의미가 다르지만 많은 사람이 태그와 요소를 같은 의미로 사용하니 혼동하지 않도록 주의할 것!

### 읽어보기
* [HTML elements reference(MDN)](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)
* [HTML Element Reference(W3C)](https://www.w3schools.com/tags/ref_byfunc.asp)

## 1.3 HTML 문법 - 속성

**속성(ATTRIBUTE)이란?**
* 속성은 태그에 추가로 정보를 제공하거나 태그의 동작이나 표현을 제어할 수 있는 설정값을 의미한다

**속성을 사용하는 방법**
* 속성은 이름과 값으로 이루어져 있음
* 시작 태그에서 태그 이름 뒤에 공백으로 구분하여 이름="속성값"으로 표현
 * 속성값은 더블쿼테이션("")이나 싱글퀘테이션('')으로 감싸 표현

```html
<!-- <h1> 태그에 id 속성을 추가해 title 값을 선언한 코드 -->
<h1 id="title">Hello, HTML</h1>
```

**여러 속성을 사용하는 방법**
* 의미와 용도에 따라 여러 속성이 존재하며 하나의 태그에 여러 속성을 선언할 수 있음
* 여러 속성을 선언할 때는 공백으로 구분해서 사용

```html
<!-- id와 class 2개의 속성을 선언한 코드 -->
<h1 id="title" class="home">Hello, HTML</h1>
<!-- 속성의 선언 순서는 태그에 영향을 미치지 않으며 class를 id보다 먼저 선언해도 결과는 같다 -->
```

**속성의 종류**
* 속성은 종류에 따라 모든 태그에 사용할 수 있는 글로벌 속성과 특정 태그에서만 사용할 수 있는 속성으로 구분됨
 * id와 class 속성은 글로벌 속성이다
* 또한, 선택적으로 쓸 수 있는 속성과 특정 태그에서 필요한 필수 속성으로 구분된다

## 1.4 HTML 문법 - 태그 중첩

**태그의 중첩**
* 태그는 중첩이 가능하다
 * = 태그 안에 다른 태그를 선언할 수 있다
* 태그를 중첩해서 사용 시 중첩되는 태그는 부모 태그를 벗어나서는 안 된다

```html
<!-- 잘못된 태그 선언 -->
<h1>Hello, <i>HTML</h1></i>

<!-- 올바른 태그 선언 -->
<h1>Hello, <i>HTML</i></h1>
```

### 참고
* [The W3C Markup Validation Service](http://validator.kldp.org/)
 * STML 파서 기반의 쉽게 사용할 수 있는 W3C 의 HTML 검사 서비스. W3C에서 제공하는 validator로 HTML의 문법적 오류를 찾아준다.

## 1.5 HTML 문법 - 빈 태그

**빈 태그란?**
* 태그는 기본적으로 시작 태그와 종료 태그 2개가 1쌍으로 이루어져 있으며,그 사이에 내용이 들어가는데 그렇지 않은 태그도 존재한다. 이러한 태그를 내용이 없는 빈 태그라고 한다.

```html
<!-- 빈 태그 예시 -->
<br>
<img src="">
<input type="">
<!-- 빈 태그는 내용이 없어서 종료 태그가 필요하지 않다 -->
```

**빈 태그의 특징**
* 빈 태그는 내용만 비어있을 뿐 속성을 통해서 화면에 나타내거나 화면에 표시되지 않더라도 다른 용도로 사용되는 태그이다.
* 빈 태그의 대표적인 경우는 브라우저가 직접 화면에 내용을 그려줘야 하는 경우인데 이런 태그는 브라우저가 내용을 대체한다고 하여 replacement 태그, 대체되는 태그라고 한다.

```html
<!-- replacement 태그 예시 -->
<img src="">
```

* 빈 태그에 대체되는 태그만 있는 것은 아니며 실제로 화면에 출력될 내용이 없어 다른 용도로 쓰이는 태그도 존재한다.
 * 이러한 태그는 용도 자체가 화면에 보여지는 게 아니라 문서 내부적으로 부가적인 정보를 제공하는데 쓰인다.

```html
<!-- 다른 용도로 쓰이는 태그 예시 -->
<br>
```

### 읽어보기
* [Empty element](https://developer.mozilla.org/en-US/docs/Glossary/Empty_element)

## 1.6 HTML 문법 - 공백

**HTML에서의 공백**
* 기본적으로 HTML은 두 칸 이상의 공백을 모두 무시한다

```html
<!-- HTML은 두 칸 이상의 공백과 개행을 모두 무시하기 때문에 위 세가지 모두 같은 형태로 텍스트가 화면에 나타나게 된다-->
<h1>Hello, HTML</h1>
<h1>Hello,     HTML</h1>
<h1>
    Hello,
    HTML
</h1>
<!-- 
    예제 코드 브라우저에서 확인한 결과:
    Hello, HTML
    Hello, HTML
    Hello, HTML
-->
```

### 읽어보기
* [How to Change Default Text Wrapping with HTML and CSS - Hongkiat](https://www.hongkiat.com/blog/change-default-text-wrapping-html-css/)

## 1.7 HTML 문법 - 주석

**HTML에서의 주석**
* 주석은 화면에 노출되지 않고 메모의 목적으로만 사용하는 것을 의미합니다.
 * 화면에 노출되지 않기 때문에 실제 서비스를 이용하는 사용자를 위한 것은 아니고 그것을 개발하는 개발자들을 위한 기능이다.
* HTML 파일 내에 주석으로 표시를 해주면 브라우저는 해당 부분을 인식하여 해석하지 않는다.

```html
<!-- 주석 -->
```

## 1.8 문서의 기본 구조

**HTML의 기본 구조**
* HTML의 기본 구조는 웹 문서를 작성할 때 반드시 들어가야 하는 기본적인 내용으로 크게는 문서 타입 정의와 ```<html>```요소로 구분한다.
```html
<!DOCTYPE html>
<html>
    ...
</html>
```

**문서 타입 정의**
* 문서 타입 정의는 보통 DTD(doctype)라고 부르는데, 이 문서가 어떤 버전으로 작성되었는지 브라우저에 알려주는 선언문이며 반드시 문서 내 최상단에 선언되어야 한다.
* DTD는 대소문자를 구분하지 않음.

```html
<!DOCTYPE html>
<!-- 이 문서는 html5로 작성되었다고 브라우저에게 알려주고 있다 -->
```

* HTML 4.01에서는 DOCTYPE을 세 가지 방법으로 선언할 수 있다


```html
<!DOCTYPE html>
<html lang="ko">
    <head>
        <meta charset="UTF-8">
        <title>HTML 문서의 기본 구조</title>
    </head>
    <body>
        <h1>Hello, HTML</h1>
    </body>
</html>
```
