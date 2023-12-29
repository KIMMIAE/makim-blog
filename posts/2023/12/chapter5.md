---
title: 'html css 강의 내용 정리'
tags:
  - html
  - css
  - 시멘틱 마크업
description: 'html css 기초강의 내용 정리'
slug: 2023/12/chapter3
date: '2023-12-23'
---
# 5. 단위, 배경, 박스모델
**Goal**
* CSS 기본 속성을 복습한다
* 빠르게 변화하는 CSS 속성들에 어떤 방식으로 대응하고 학습하면 좋을지 알아본다

## 5.1 속성-정의와 구문
**CSS Reference를 통해 확인 가능한 사항**
* 정의
 * 해당 속성이 어떤 변화를 일으키고 어떻게 동작하는지 파악할 수 있다.
  * 기본 값: 모든 속성에는 기본값이 정의되어 있음.
  * 상속 여부: 부모의 값을 상속 받을 수 있는지 여부
  * 애니메이션 가능 여부
  * 사용 가능한 CSS버전: CSS 버전에 따라 브라우저 지원범위가 달라지기 때문에 CSS 버전 파악이 중요함.
* 문법
 * 해당 속성값을 어떤 식으로 나열하여 사용하는지를 파악할 수 있다.
* 속성 값
 * 해당 속성이 인식하여 적용할 수 있는 값의 형태나, 키워드 등을 파악할 수 있다.
  * Initial : 초기값, 즉 속성의 기본값으로 정의 (ie에서 지원하지 않음)
  * Inherit : 부모 요소의 해당 속성 값을 적용 (상속 가능할 요소일 경우)
  * 즉, 상속이 불가능한 속성일 경우에는 적용 되지 않는다.
* 지원 범위
 * 해당 속성이 정의에 맞게 동작 가능한 CSS 버전, 브라우저별 버전을 확인할 수 있다.
  * 어떤 브라우저의 어떤 버전이냐에 따라 같은 값이어도 다르게 렌더링 될 수 있으므로, 현재 프로젝트의 사용자 제공 지원 범위를 잘 확인하고 적용해야 한다.
* 예제
 * 문법과 속성값을 바탕으로 실제로 속성을 동작하는 예제 코드를 확인할 수 있다.
* 참고 사항
 * 해당 속성에 대해 특이사항이나 버그에 대해서 확인할 수 있다.

## 5.2 속성-단위
* 단위는 크게 절대 길이 단위와 상대 길이 단위로 구분되어 진다.

**절대 길이**
* 절대 길이는 고정된 크기 단위로, 다른 요소의 크기에 의해 영향을 받지 않는다.
* px ( 1px = 1/96th of 1 inch )
 * 절대 길이이므로 다른 요소의 영향을 받지 않아 화면에서 고정된 크기를 가지지만, 장치의 해상도에 따라 상대적이다.
 * 여러 환경에서 디자인을 같게 표현하고 브라우저 호환성에 유리한 구조로 되어 있어서, 디자인 의도가 많이 반영된 웹사이트의 경우 픽셀 단위를 사용하는 것을 권장하고 있다.
* pt ( 1pt - 1/72 of 1 inch )
 * 컴퓨터가 없던 시절부터 있던 단위이다. 
 * 인쇄물이나 워드프로세서 프로그램에서 사용된 가장 작은 표준 인쇄단위이다. 
 * 웹 화면에 인쇄용 문서를 위한 스타일을 적용할 때 유용하게 사용할 수 있다.
 * 그러나 사용하는 기기의 해상도에 따라 차이가 있어 W3C에서도 pt는 웹개발 시 권장하는 단위가 아니다.
 * 예를 들면 Windows에서는 9pt = 12px, Mac에서는 9pt = 9px 로 보이게 된다.


**상대 길이**
* 상대 길이는 다른 요소의 크기나 폰트 크기, 브라우저(viewport) 등의 크기에 따라 상대적으로 값이 변한다.
* %
 * 부모의 값에 대해서 백분율로 환산한 크기를 갖게 된다.
* em
 * font-size를 기준으로 값을 환산합니다. 소수점 3자리까지 표현 가능하다.
* rem
 * root의 font-size를 기준으로 값을 환산한다.
* vw
 * viewport의 width값을 기준으로 1%의 값으로 계산된다.

## 5.3 속성-색상
**Color 속성**
* 폰트의 색상 값을 적용할 때 사용하는 속성이다.
```css
/* ex.h1 {color: 색상 값;} */
h1 {color: black;}
```

**색상 값 지정 방식**
* 컬러 키워드 
 * CSS 자체에서 사용 가능한 문자 식별자이다.
 * red, blue, black 등과 같이 미리 정의되어있는 키워드를 이용해 색상을 표현할 수 있다.
 * 참고 : transparent는 투명을 나타내는 키워드 *
* 16 진법(ex.#RRGGBB)
 * 6자리의 16진수(0-9, A-F)는 각각 두 자리씩 세 가지 색상을 나타낸다.
 * 첫 번째 두 자리는 적색(RR), 가운데 두 자리는 녹색(GG), 마지막 두 자리는 청색(BB)을 의미한다.
 * 각 자리의 알파벳은 대소문자를 구분하지 않는다.
* 16 진법(ex.#RGB)
 * 6자리의 16진수에서 각각의 두 자리가 같은 값을 가지면 3자리로 축약하여 사용할 수 있다.
 * 예를 들어, #aa11cc 는 #a1c로 축약하여 사용할 수 있다.
* RGB( )
 * RGB 값은 rgb(R, G, B)의 형태로 각 변수 값(R 적색, G 녹색, B 청색)의 강도를 정의한다.
 * 0~255의 정수로 된 값을 지정할 수 있으며, 0 → 255는 검정 → 흰색으로 값의 변화를 나타낸다.
* RGBA( )
 * RGBA 값은 기존 RGB에서 A값이 추가된 형태이다.
 * rgb(R, G, B, A)의 형태로 각 변수는(R 적색, G 녹색, B 청색, A 투명도)의 강도를 정의한다.
 * A 값은 0 ~ 1 사이의 값을 지정할 수 있으며, 0.5와 같이 소수점으로 표기합니다.
 * 0 → 1은 투명 → 불투명으로 값의 변화를 나타낸다.
 * 예를 들어, rgba( 0, 0, 0, 0)는 투명한 색상을 가지게 된다.
```css
body{color: black} /* By color names */
body{color: #000000} /* Hexadecimal colors */
body{color: #000} /* Hexadecimal colors */
body{color: rgb(0,0,0)} /* As RGB values (red, green, blue / 0~255) */
body{color: rgba(0,0,0,1)} /* (red, green, blue, alpha / 0~255, 0 or 1) */
/* 색상 값을 지정하는 방식에는 강의에서 다룬 종류 외에도 HSL, HWB 등 다양한 방식이 존재함 */
/* As HSL values (CSS3) */
/* As HWB values (CSS4) */
```
```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>color</title>
</head>
<body>
    <h1 style="color: red"> heading </h1>
    <h1 style="color: #ff0000"> heading </h1>
    <h1 style="color: #f00"> heading </h1>
    <h1 style="color: rgb(255,0,0)"> heading </h1>    
    <h1 style="color: rgba(255,0,0, 0.5)"> heading </h1>
</body>
</html>
```

### 읽어보기
* [CSS color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value)


## 5.4 속성-background
**background 관련 속성**
```css
/* 속성 */
background-color: green;
background-image: url("img_tree.gif");
background-repeat: no-repeat;
background-position: top center;
background-attachment: scroll;

/* 축약형 */
background: green url("img_tree.gif") no-repeat fixed center;
```
* background-color
 * 기본 값 : transparent
 * 배경의 색상을 지정하는 속성이다.
 * 앞선 색상 강의에서 배운 색상 값 적용 방식과 같다.
* background-image
 * 기본 값 :  none
 * 배경으로 사용할 이미지의 경로를 지정하는 속성이다.
 * url의 경로는 절대 경로, 상대 경로 모두 사용 가능하다.
 * 만약 background-color에 색상이 적용된 상태에서 background-image로 사용된 이미지에 투명한 부분이 있다면, 그 부분에 background-color 색상이 노출된다.
* background- repeat
 * 기본 값 : repeat
 * 이미지의 반복 여부와 방향을 지정하는 속성이다.
 * 기본값이 repeat이기 때문에 따로 설정하지 않으면 x, y축으로 반복되어서 표시된다.
 * background-repeat의 값으로 사용할 수 있는 것들은 다음과 같다.
 * 속성 값
  * repeat: x, y축 으로 모두 반복한다.
  * repeat-x: x 축 방향으로만 반복한다.
  * repeat-y: y 축 방향으로만 반복한다.
  * no-repeat: 이미지를 반복하지 않는다.
* background-position
 * 기본 값 : 0%  0% 요소에서 배경 이미지의 위치를 지정하는 속성이다.
 * x축, y축으로부터의 위치를 지정할 수 있으며, 값의 선언 순서는 x축, y축으로부터의 간격이다.
 * 만일 한쪽만 지정된다면 나머지는 중앙 값(center)으로 적용된다.
 * 속성 값
  * %: 기준으로부터 % 만큼 떨어진 지점과 이미지의 % 지점이 일치하는 곳에 위치시킨다.
  * px: 기준으로부터 px 만큼 떨어진 지점과 이미지의 (0,0) 지점이 일치하는 곳에 위치시킨다.
  * 키워드: top, left, right, bottom, center 키워드를 사용할 수 있다. 키워드는 선언 순서와 관계없이 top, bottom은 y축 기준으로 하며 left, right는 x축을 기준으로 한다.
* background-attachment
 * 기본 값 : scroll 화면 스크롤에 따른 배경 이미지의 움직임 여부를 지정하는 속성이다.
 * 속성 값
  * scroll: 배경 이미지는 요소 자체를 기준으로 고정되어 있으며 내용과 함께 스크롤 되지 않는다.
  * local: 배경 이미지는 요소의 내용을 기준으로 고정되어 있으며 내용과 함께 스크롤 된다.
  * fixed: 배경 이미지는 뷰포트를 기준으로 고정되어 있으며 스크롤에 영향을 받지 않는다.
   * 뷰포트 : 사용자가 시각적으로 볼 수 있는 웹페이지 영역을 의미한다. 컴퓨터나 휴대폰과 같은 장치에 Display 요소가 표현되는 영역을 말한다.
```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>background</title>
  <style>
    div {
      height: 500px;
      background-color: yellow;
      background-image: url(https://www.w3schools.com/CSSref/img_tree.gif);
      background-repeat: no-repeat;
      background-position: center top;
      /* 축약형 */
      background: yellow url(https://www.w3schools.com/CSSref/img_tree.gif) no-repeat center top;
    }
  </style>
</head>
<body>
    <div> css background 속성 실습 </div>
</body>
</html>
```
* background-size, background-origin, background-clip, background-blend-mode 등 다른 다양한 속성들도 확인해보자!

### 읽어보기
* [CSS Backgrounds](https://www.w3schools.com/css/css_background.asp)
## 5.5 속성-boxmodel
* 문서를 배치할 때 브라우저의 렌더링 엔진은 표준 CSS 기본 박스 모델에 따라 각 요소를 사각형 상자로 나타낸다. 
* CSS를 이용해 이 상자의 크기, 위치 및 속성(색상, 배경, 테두리 크기 등)을 변경할 수 있다.

**boxmodel 구성**

![boxmodel](./images/boxmodel.png)

* Content 영역
 * 요소의 실제 내용을 포함하는 영역이다. 따라서 크기는 내용의 너비 및 높이를 나타낸다.
* Border 영역
 * content 영역을 감싸는 테두리 선을 border라고 한다.
* Padding 영역
 * content 영역과 테두리 사이의 여백을 padding이라고 한다.
 * content 영역이 배경, 색 또는 이미지가 있을 때 패딩 영역까지 영향을 미친다.
 * 이에 따라 padding을 content의 연장으로 볼 수도 있다.
* Margin 영역
 * border 바깥쪽의 영역을 margin이라고 한다.
 * border 영역을 다른 요소와 구별하기 위해 쓰이는 빈 영역이다.
 * 즉, 주변 요소와의 여백(간격)을 margin을 이용해 지정할 수 있다.
```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>box model</title>
  <style>
    div {
      margin: 50px;
      padding: 50px;
      border: 10px solid #000;
    }
  </style>
</head>
<body>
  <div> 박스 모델에 대하여 알아봅시다 </div>	
</body>
</html>
```

## 5.6 속성-border
**border 관련 속성**
```css
/* 속성 */
border-width: 1px;
border-style: solid;
border-color: #000;

/* 축약형 */
border: 1px solid #000; /* 단축 속성 */
border-left: 6px solid red; /* 보더 왼쪽 */
border-width: 6px; /* 보더 두께 */
border-width: 6px 3px; /* 보더 상하, 좌우 두께 */
border-width: 6px 3px 4px; /* 보더 상, 우(좌), 하 두께 */
border-width: 6px 3px 4px 1px; /* 보더 상, 우, 하, 좌 두께 */
```
* border-width
  * 기본 값 : medium 선의 굵기를 지정하는 속성이다. border-top-width, border-bottom-width border-right-width, border-left-width를 이용하여 상하좌우 선의 굵기를 다르게 표현할 수 있다.
  * 속성 값
   * 키워드: thin, medium, thick
   * 단위: px, em, rem ... (%, 정수 단위 사용불가)
```css
/* border-width: [top] [right] [bottom] [left]; */
border-width: 6px 3px 4px 1px;
```
* border-style
  * 기본 값 :  none 선의 모양을 지정하는 속성이다. border-top-style, border-bottom-style border-right-style, border-left-style을 이용하여 상하좌우 선의 모양을 다르게 표현할 수 있다.
  * 속성 값
   * none: border를 표시 하지 않는다.
   * solid: border를 실선 모양으로 나타낸다.
   * double: border를 이중 실선 모양으로 나타낸다.
   * dotted: border를 점선 모양으로 나타낸다.
   * 그 밖에도 dashed, double, groove, ridge, inset, outset 등의 다양한 스타일이 있다.
  * 축약하여 공백을 이용해 각 방향에 대한 스타일을 지정할 수도 있다.
```css
/* 축약형 border-style: [top] [right] [bottom] [left]; */
border-style: dotted dashed solid double;
```
* border- color
 * 기본 값 : currentColor 선의 색상을 지정하는 속성입니다. border-top-color, border-bottom-color, border-right-color, border-left-color를 이용하여 상하좌우 선의 색상을 다르게 표현할 수 있다.
 * 축약하여 공백을 이용해 각 방향의 색상을 지정할 수도 있다. 색상은 일반적인 CSS 색상 값 사용 방식과 같다. 
```css
/* 축약형 border-color: [top] [right] [bottom] [left]; */
border-color: black red yellow blue;
```
* border 축약
 * 공백으로 구분해 축약하여 사용할 수 있고, 정의되지 않은 속성값에 대해서는 기본값이 적용된다.
```css
/* 축약형 border: [-width] [-style] [-color]; */
border: 1px solid #000;
```

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>border</title>
  <style>
    div {
      border-width: 10px;
      border-style: solid;
      border-color: #000;


      /* 축약형 */
      border: 10px solid #000;
    }
  </style>
</head>
<body>
    <div> css border 속성 실습 </div>
</body>
</html>
```

### 읽어보기
* [currentColor](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#currentcolor_keyword)

## 5.7 속성-padding

## 5.8 속성-margin

## 5.9 속성-margin&padding

## 5.10 속성-width

## 5.11 속성-height

## 5.12 속성-boxmodel정리










