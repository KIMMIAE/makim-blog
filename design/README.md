# Still Making 디자인 기준

작업 브랜치: `codex/still-making-redesign`

## 기준 파일

- `styles/tokens.css`: 색상, 서체, 크기, 간격, 모서리, 그림자, 움직임의 원본.
- `styles/theme.css`: 동일 토큰을 Tailwind 유틸리티로 연결.
- `design/pixel-cat/home/index.html`: 합의한 홈 배치의 HTML 시안. 실제 Next.js 홈에는 히어로만 적용했으며 시안의 CSS는 토큰과 자동 동기화되지 않는다.
- `design/pixel-cat/selection.json`: 고양이 선택 기록.
- `design/pixel-cat/poses/c-*.svg`: 선택한 고양이의 자세별 원본 SVG.

## 확정한 방향

흰 바탕, 짙은 남색 글자, 파란 버튼과 링크, 연보라색 보조 영역. 로고는 보라 `#8B5CF6`와 주황 `#FB923C`를 겹치고 주황 불투명도는 75%로 한다. 로고 색은 액션 색과 별개로 유지한다.

고양이는 C안: 작고 둥근 얼굴, 반짝이는 눈, 흰 가슴으로 이어지는 옅은 목선. 기본 앉기, 갸웃, 식빵, 잠들기, 들어 올리기 자세를 사용한다. 픽셀 확대에는 `image-rendering: pixelated`를 적용한다. `poses/build.py`의 갸웃은 SVG 그룹 회전이므로 픽셀 JSON만으로 재현하지 않는다.

홈 제목은 “Where there’s a will, there’s a way.”. 9년차 표기는 생략한다. 최근 기록, 주제별로 읽기, 개발자 소개를 배치한다. Read more는 테두리 없는 텍스트 링크이며 hover와 focus에 화살표가 나타난다.

## 사용 예

```tsx
<section className="bg-canvas text-ink font-body rounded-card">
  <h1 className="font-heading text-hero">Still Making</h1>
  <p className="text-muted text-body">계속, 만드는 사람.</p>
  <button className="bg-action text-on-action hover:bg-action-hover rounded-pill shadow-action focus-visible:outline-2 focus-visible:outline-focus">
    글 둘러보기
  </button>
</section>
```

컴포넌트는 원색 대신 `--sm-action`, `--sm-text-muted` 같은 용도별 토큰을 사용한다. CSS에서도 `var(--sm-space-6)`처럼 참조할 수 있다. 기존 Tailwind 색상과 코드 하이라이트 토큰은 유지한다.

본문 보조색은 시안의 옅은 회색보다 진한 `#656D86`으로 조정했다. 다크 토큰은 구현을 위한 초안이며 화면 디자인 확정은 별도로 진행한다.

## 서체와 다음 구현

현재 토큰은 운영체제 서체만 참조하며 폰트 파일을 배포하지 않는다. 제목 LINE Seed KR, 본문 Pretendard는 후보이며 아직 설치하지 않았다. 실제 웹폰트를 추가할 때 배포본의 라이선스와 저작권 고지를 함께 보관하고, 토큰의 폰트 스택을 변경한다. 시안에 보이는 시스템 서체를 최종 웹폰트로 확정한 것은 아니다.

다음 순서는 웹폰트 확정 및 파일·라이선스 추가 → 로고·버튼·고양이 컴포넌트 → 실제 글 데이터를 사용하는 홈 → 모바일·다크·키보드 동작 확인이다. Storybook은 공통 컴포넌트의 상태 확인이 필요해지는 시점에 추가한다.
