---
title: 'html css 강의 내용 정리3'
tags:
  - html
  - css
  - 시멘틱 마크업
description: 'html css 기초강의 내용 정리'
slug: 2022/04/chapter3
date: '2022-07-12'
---

# 3. 콘텐츠모델, 시멘틱마크업, 블록 & 인라인
**Goal**
* 콘텐츠 모델이 뭔지 알아두고 블록 & 인라인 내용을 이해한다. 시멘틱 마크업이 뭔지 이해하고 숙지한다.

## 3.1 콘텐츠 모델
* HTML5에는 요소들이 가지고 있는 성격에 따라 요소의 종류를 정의하는 규칙들이 있다
* 요소는 이 규칙들을 준수해야 하며, 반드시 HTML 권고안을 따라야 한다. 
* 이런 규칙에 대해 비슷한 성격의 요소들끼리 그룹화한 것이 콘텐츠 모델이며, 각각의 요소들은 하나 또는 여러 개의 콘텐츠 모델에 속하게 된다

**Content Models 의 7 분류**
1. Metadata Content
2. Flow Content
3. Sectioning Content
4. Heading Content
5. Phrasing Content
6. Embedded Content
7. Interacitve Content

**Metadata**
* base, link, meta, noscript, script, style, title 등이 해당
* 콘텐츠의 style(표현), script(동작)을 설정 하거나 다른 문서와의 관계 등의 정보를 포함하는 요소
* 대부분 ```<head>```내에 들어간다는 것이 특징

**Flow**
* a, abbr, address, map>area, article, aside, audio, b, bdo, blockquote, br, button, canvas, cite, code, datalist, del, details, dfn, div, dl, em, embed, fieldset, figure, footer, form, h1 ~ h6, header, hgroup, hr, i, iframe, img, input, ins, kbd, keygen, label, map, mark, math, menu, meter, nav, noscript, object, ol, output, p, pre, progress, q, ruby, samp, script, section, select, small, span, strong, style[scoped], sub, sup, svg, table, textarea, time, ul, var, video, wbr
* 문서에 사용되는 대부분의 요소, Flow에는 문서의 자연스러운 흐름에 의해 배치되는 요소들이 포함된다
* Metadata에 해당하는 일부 태그들만 Flow에서 제외되며 요소 대부분이 Flow에 포함된다.

**Sectioning**
* article, aside, nav, section
* Sectioning에는 문서의 구조와 관련된 요소들이 포함된다
* 헤딩과 푸터의 범위를 결정 하는 요소. 아웃라인이 있음
 * HTML5에서 새로 생긴 ```<article>```, ```<aside>```, ```<nav>```, ```<section>``` 등이 포함되며 이 태그들은 문서의 구조, 아웃라인에 영향을 주게 된다

**Heading**
* h1, h2, h3, h4, h5, h6
* 섹션의 헤더를 정의하는 요소

**Phrasing**
* a, abbr, map>area, audio, b, bdo, br, button, canvas, cite, code, datalist, del, dfn, em, embed, i, iframe, img, input, ins, kbd, keygen, label, map, mark, math, meter, noscript, object, output, progress, q, ruby, samp, script, select, small, span, strong, sub, sup, svg, textarea, time, var, video, wbr
* Phrasing에는 문서의 텍스트 또는 텍스트를 꾸며주는 문단 내부 레벨로 사용되는 요소들이 포함된다

**Embedded**
* audio, canvas, embed, iframe, img, math, object, svg, video
* 이미지, 비디오, 플래시 등 외부 콘텐츠를 문서내에 표현하는 요소
* 오디오, 비디오, 이미지 등 멀티미디어 요소가 주로 있다

**Interactive**
* a, audio[controls], button, details, embed, iframe, img[usemap], input, keygen, label, menu,
object[usemap], select, textarea, video[controls]
* 사용자와 상호작용을 하는 요소. 
* 대표적으로 form 요소들이 해당된다

### 읽어보기
* [Content categories](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories)

## 3.2 시멘틱 마크업
**시멘틱 마크업 이란?**
* 시멘틱(=의미론적인) 마크업은 종종 POSH(Plain Old Semantic HTML)라고도 불리는데, 단어 그대로 평범하고 오래된 의미론적인 HTML이라는 뜻이다.
* 시멘틱은 즉, 기계(컴퓨터, 브라우저)가 잘 이해할 수 있도록 하는 것을 뜻한다.
* 애초에 프로그래밍 언어는 사람과 기계와의 정해진 약속이며 HTML 역시 마찬가지이다.
 * ex. 헤딩 태그는 제목에 사용하자, 문단을 작성할 때는 p태그를 사용하자
* 시멘틱 마크업은 적절한 HTML 요소를 올바르게 사용하는 것에서 시작한다.

**시멘틱 마크업 하기**
*  어떻게 하면 브라우저가 코드를 잘 이해할 수 있을까? -> 정해진 약속을 잘 지키면 됨
* 구체적으로 설명하자면 마크업 할 때는 의미에 맞는 태그, 요소를 사용하는 것이고 문서를 표현할 때는 구조화를 잘 해주는 것이다.
* 정해진 약속대로 코드를 작성하게 되면 결국 기계뿐 아니라 사람도 이해하기 쉬운 코드가 된다.

```html
<!-- 아래 코드는 화면을 보면 각각의 요소가 같은 모습으로 표현되나 그 의미가 같지는 않음 -->
<!-- <b>는 의미 없이 단순히 텍스트를 굵게 표현하는 태그지만, <strong>은 중요하다는 의미를 지님 -->
<!-- <strong>은 중요하다는 의미에 맞춰 브라우저에 의해 굵은 스타일로 표현된 것 -->
<!-- 중요하다는 의미를 포함할 때는 <b>가 아닌 <strong>을 사용하는 것이 적절하고 시멘틱한 마크업 -->
<b>굵은</b> vs <strong>중요한</strong>
<i>기울어진</i> vs <em>강조하는</em>
<u>밑줄친</u> vs <ins>새롭게 추가된</ins>
<s>중간선이 있는</s> vs <del>삭제된</del>
```

## 3.3 HTML5 시멘틱 요소

**HTML5에서 새로 생긴 Semantic 요소들**
* ```<article>```: 문서, 페이지, 애플리케이션, 또는 사이트 안에서 완전히 독립적으로 구성할 수 있는 요소를 정의할 때 사용
 * ex.게시판과 블로그 글, 매거진이나 뉴스 기사 등
* ```<aside>```: 문서의 주요 내용과 간접적으로만 연관된 부분 정의할 때 사용
* ```<figcaption>```: 부모 요소인 ```<figure>```가 포함하는 다른 콘텐츠에 대한 설명 혹은 범례를 나타낸다. ```<figure>``` 요소의 캡션(caption)을 정의할 때 사용
* ```<figure>```: 삽화나 다이어그램, 사진 등과 같이 문서의 주요 흐름과는 독립적인 콘텐츠를 정의할 때 사용. ```<figcaption>``` 요소를 사용해 설명을 붙일 수 있다.
* ```<footer>```: 문서나 특정 섹션(section)의 푸터(footer)를 정의할 때 사용.
 * 푸터는 일반적으로 구획의 작성자, 저작권 정보, 관련 문서 등의 내용을 담는다.
* ```<header>```: 소개 및 탐색에 도움을 주는 콘텐츠를 나타낸다. 제목, 로고, 검색 폼, 작성자 이름 등의 요소도 포함할 수 있다.
* ```<main>```: 문서 ```<body>```의 주요 콘텐츠를 정의할 때 사용. 주요 콘텐츠 영역은 문서의 핵심 주제나 앱의 핵심 기능에 직접적으로 연결됐거나 확장하는 콘텐츠로 이루어짐.
* ```<mark>```: 현재 맥락에 관련이 깊거나 중요해 표시 또는 하이라이트한 부분을 나타냄
* ```<nav>```: 문서의 부분 중 현재 페이지 내, 또는 다른 페이지로의 링크를 보여주는 구획을 나타낸다.
 * ex.메뉴, 목차, 색인
* ```<section>```:  HTML 문서의 독립적인 구획을 나타내며, 더 적합한 의미를 가진 요소가 없을 때 사용.
 * 보통 ```<section>```은 제목 요소(h1~h6)를 포함하지만, 항상 그런 건 아니다.
* ```<time>```: 시간의 특정 지점 또는 구간을 나타냄.
 * datetime 특성의 값을 지정해 보다 적절한 검색 결과나, 알림 같은 특정 기능을 구현할 때 사용할 수 있다.

```html
<!-- <figure>, <figcaption> -->
<figure>
  <img src="/media/cc0-images/elephant-660-480.jpg" alt="Elephant at sunset">
  <figcaption>An elephant at sunset</figcaption>
</figure>
<!-- <time> -->
<p>The Cure will be celebrating their 40th anniversary on <time datetime="2018-07-07">July 7</time> in London's Hyde Park.</p>

<p>The concert starts at <time datetime="20:00">20:00</time> and you'll be able to enjoy the band for at least <time datetime="PT2H30M">2h 30m</time>.</p>
```

### 읽어보기
* [Semantics](https://developer.mozilla.org/en-US/docs/Glossary/Semantics)

## 3.4 블록&인라인
* 이전 강의에서 요소들을 총 7개의 콘텐츠 모델로 구분했는데, 콘텐츠 모델은 나중에 좀 더 복잡하게 분류된 것이고 그 이전에는 요소들을 크게 블록 레벨과 인라인 레벨로 구분했다.
* 블록 레벨 요소와 인라인 레벨 요소는 시각적으로 차이가 아주 명확하므로 지금도 두 가지로 많이 구분한다.

**블록 레벨 요소**
* 한 줄에 하나의 요소 표시
 * 양옆으로 다른 요소가 배치되지 않게 박스를 생성하므로 박스의 위아래로 줄 바꿈이 생기게 된다
* 일반적은 모든 요소를 포함할 수 있으며, div, h1~h6, p, ul, li, table 등

**인라인 레벨 요소**
* 한 줄에 여러개의 요소 표시
 * 라인의 흐름을 끊지 않고 요소 앞 뒤로도 줄 바꿈이 되지 않아 다른 인라인 요소들이 자리할 수 있다.
 * 인라인 레벨 요소는 블록 레벨 요소의 자식으로 분류되기 때문에 자손으로 블록 레벨 요소를 가질 수 없다 = 인라인 레벨 요소는 블록 레벨 요소를 감쌀(포함 할) 수 없다.
 * 다만, HTML5 버전에서 생겨난 한가지 예외 경우가 있는데 ```<a>```는 인라인 레벨 요소지만 자손으로 블록 레벨 요소를 가질 수 있다.
* block 레벨의 자식요소이며, span, i, img, em, strong, a 등
