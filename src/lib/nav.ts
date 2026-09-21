/**
 * 사이트 내비게이션 상수. 헤더·모바일 메뉴·푸터가 같은 목록을 쓴다.
 * 나중에 en/ko 를 제공할 때는 label 을 언어별로 나누면 된다.
 */
export const SITE_NAME = "Still Making";

export interface NavItem {
  key: string;
  label: string;
  href: string;
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
];

/** 소개 페이지(Notion). 헤더 대신 푸터·모바일 메뉴·홈에서 연결한다. */
export const ABOUT_LINK = {
  label: "소개",
  href: "https://substantial-celsius-cbb.notion.site/f6160283ae074dd698fe85873462701b?pvs=4",
} as const;
