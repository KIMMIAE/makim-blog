---
title: 'Two Forms of Pre-rendering'
tags:
  - 리액트
  - next.js
  - test
description: 'Next.js has two forms of pre-rendering: 길지 않은 내용 설명..'
slug: 2022/04/pre-rendering
date: '2020-04-01'
---
next.js tutorial 내용 가져왔음

Next.js has two forms of pre-rendering: **Static Generation** and **Server-side Rendering**. The difference is in **when** it generates the HTML for a page.

- **Static Generation** is the pre-rendering method that generates the HTML at **build time**. The pre-rendered HTML is then _reused_ on each request.
- **Server-side Rendering** is the pre-rendering method that generates the HTML on **each request**.

Importantly, Next.js lets you **choose** which pre-rendering form to use for each page. You can create a "hybrid" Next.js app by using Static Generation for most pages and using Server-side Rendering for others.