# makim-blog
- author: makim [email](miae.dev@gmail.com)
- https://www.applejam.monster/

## Dependencies

- nodejs@22 (`.nvmrc`, 최소 20.9)
- React@19
- TypeScript@6
- Next.js@16 (App Router, Turbopack)
- Tailwind CSS@4 (`styles/globals.css` 에서 CSS-first 설정)
- next-mdx-remote@6
- gray-matter

## Gray Matter 형식

```yaml
---
title: "<UX 원칙: 사용자를 행복하게 만드는 101가지 솔루션>을 읽고" # 글 제목
tags: # 태그
  - book
  - UX
description: "사용성 개선은 늘 어렵다..." # 글 설명
published: true # 게시물 게재 유무
slug: 2023/11/book-101-ux-principles # path
date: "2023-11-29" # 작성일
---
```

## 이미지 경로

- 이미지는 `public/YYYY/MM/images/` 에 두고, 본문에서는 절대 경로로 참조한다.

```markdown
![설명](/2024/08/images/change-log.png)
```

- 상대 경로(`./images/…`)는 글 페이지 URL 구조에 우연히 의존하고 RSS·미리보기 등 다른 컨텍스트에서 깨지므로 쓰지 않는다.

## Getting Started

First, run the development server:

```bash
npm run dev
```

## Deploy

- vercel
- [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
- [Next.js deployment documentation](https://nextjs.org/docs/deployment)
