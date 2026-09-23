import type { MetadataRoute } from "next";
import { SITE_URL, absoluteUrl } from "../lib/site";

/**
 * 생성형 검색·AI 답변 엔진 크롤러. 글이 AI 답변에 인용되길 원하므로(GEO) 명시적으로 허용한다.
 * `*` 규칙만으로도 허용이지만, 이름을 적어 두면 의도가 분명하고 개별 차단으로 바꾸기도 쉽다.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Google-Extended",
  "CCBot",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_CRAWLERS, allow: "/" },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: SITE_URL,
  };
}
