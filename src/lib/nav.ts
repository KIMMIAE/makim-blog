/**
 * 사이트 내비게이션 상수. 헤더·모바일 메뉴가 같은 목록을 쓴다.
 * 나중에 en/ko 를 제공할 때는 label 을 언어별로 나누면 된다.
 */
// 사이트 이름은 site.ts 가 원본. 기존 import 경로를 유지하기 위해 다시 내보낸다.
export { SITE_NAME } from "./site";

export interface NavItem {
  key: string;
  label: string;
  href: string;
  /** 외부 링크(새 탭). 라벨 옆에 ↗ 를 붙인다 */
  external?: boolean;
  /** 현재 경로가 이 메뉴에 속하는지 (헤더 강조용) */
  isActive: (pathname: string) => boolean;
}

export const NAV_ITEMS: NavItem[] = [
  {
    key: "posts",
    label: "글",
    href: "/posts/1",
    // 글 목록과 글 상세(/YYYY/…) 모두 "글" 로 본다
    isActive: (pathname) => pathname.startsWith("/posts") || /^\/\d{4}\//.test(pathname),
  },
  {
    key: "tags",
    label: "태그",
    href: "/tags",
    isActive: (pathname) => pathname.startsWith("/tags"),
  },
  {
    key: "about",
    label: "소개",
    href: "https://substantial-celsius-cbb.notion.site/f6160283ae074dd698fe85873462701b?pvs=4",
    external: true,
    isActive: () => false,
  },
];

/** 소개 페이지(Notion). 홈 히어로 등 메뉴 밖에서 참조할 때 사용 */
export const ABOUT_LINK = NAV_ITEMS.find((item) => item.key === "about")!;
