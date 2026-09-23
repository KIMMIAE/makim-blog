import type { Metadata } from "next";

/**
 * 사이트 전역 상수. 절대 URL 이 필요한 모든 곳(metadataBase, canonical, sitemap, RSS, JSON-LD)이
 * 이 파일 하나를 참조한다. 주소가 바뀌면 SITE_URL 만 바꾸면 된다.
 *
 * 대표 호스트는 www 로 고정한다(2026-09-23 결정). apex → www 리다이렉트는 Vercel Domains 설정이 담당한다.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.stillmaking.blog").replace(/\/+$/, "");

export const SITE_NAME = "Still Making";

export const SITE_DESCRIPTION =
  "개발하며 마주한 문제와 선택, 책과 컨퍼런스에서 얻은 생각, 직접 만든 도구와 에이전트 이야기를 기록합니다.";

export const SITE_LOCALE = "ko_KR";
export const SITE_LANGUAGE = "ko";

export const AUTHOR = {
  name: "makim",
  /** 사이트 내 저자 페이지 */
  url: `${SITE_URL}/about`,
  /** 동일인임을 알리는 외부 프로필 (schema.org sameAs) */
  sameAs: ["https://github.com/KIMMIAE"],
} as const;

/** 경로를 대표 호스트 기준 절대 URL 로 만든다 */
export function absoluteUrl(pathname: string): string {
  return new URL(pathname, `${SITE_URL}/`).toString();
}

/**
 * 페이지 메타데이터용 alternates. canonical 은 페이지마다 자기 경로를 넣고,
 * RSS alternate 링크는 모든 페이지에 함께 실린다.
 * (Next 의 metadata 병합은 최상위 키 단위라 layout 의 alternates 는 페이지가 덮어쓴다 → 헬퍼로 통일)
 */
export function alternatesFor(pathname: string): NonNullable<Metadata["alternates"]> {
  return {
    canonical: absoluteUrl(pathname),
    types: {
      "application/rss+xml": [{ url: absoluteUrl("/rss.xml"), title: `${SITE_NAME} RSS` }],
    },
  };
}
