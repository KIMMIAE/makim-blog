---
title: "빅오 표기법(Big O Notation)"
tags:
  - Algorithm
  - Big O Notation
description: "빅오 표기법? 시간 복잡도?"
published: true
slug: 2023/12/big-o-notation
date: "2023-12-03"
---

## Big O Notation
알고리즘의 복잡도를 나타내는데 사용되는 표기법이다. O(f(n))으로 나타낸다. 공간 복잡도를 나타낼 때도 사용하지만, 이 글에선 시간 복잡도에 대한 내용만 다루겠다.

### 코드 시간을 측정하는 방법
1. performance.now()를 사용한다
    * 기계마다 기록되는 시간이 다를 수 있고 측정할 때 마다 시간이 다르게 기록될 수 있는 등, 정확하지 않다는 문제점이 있다.
2. 연산의 개수 세어보기(Big O Notation 사용)
    * 어떤 컴퓨터를 사용하든 그 갯수는 변하지 않기 때문에 명확하다.

### 빅오 공식
* O(1) – 입력 크기에 상관없이 실행 시간이 일정하다.(상수 시간)
  * ex. 배열, 해시 테이블 등
* O(log n) – 입력의 크기가 증가함에 따라 알고리즘의 실행 시간이 로그의 성장 속도로 증가한다.(로그 시간)
  * ex. binary search 알고리즘
* O(n) – 입력 크기에 비례하여 선형으로 증가한다.(선형 시간)
  * ex. 1중 반복문, Linear Search 알고리즘
* O(n log n): 입력의 크기 n에 대해 선형과 로그의 곱(N*(log2N))으로 실행 시간이 증가한다는 것을 의미한다.(선형 로그 시간)
  * ex. 퀵 정렬, 병합 정렬
* O(n^2) – 문제를 해결하기 위한 단계의 수는 입력값 n의 제곱이다.(이차 시간)
  * ex. 중첩 반복문, 버블 정렬, 선택 정렬
* O(C^n) – 문제를 해결하기 위한 단계의 수는 주어진 상수값 C 의 n 제곱이다.(지수 시간)
  * fibonacci 수열

### 빅오의 그래프 형태
![Big O Notation Graph](./images/big-o-notation-graph.jpg "출처: Udemy JavaScript 알고리즘 & 자료구조 마스터클래스 강의")

O(1) < O(logn) < O(n) < O(nlogn) < O(n^2) < O(2^n)

## 마무리
빅오 표기법은 알고리즘 간 상대적인 효율성을 비교하는 데 도움이 되며, 알고리즘의 성능을 예측하고 개선하는 데 도움이 된다. 알고리즘을 선택할 때 입력 크기에 따라 어떻게 성능이 증가하는지 고려하여 적절한 빅오 표기법의 알고리즘을 선택하는 것이 중요하다.

## 참고
- [Udemy JavaScript 알고리즘 & 자료구조 마스터클래스 강의](https://www.udemy.com/course/best-javascript-data-structures/)