import prism from "@mapbox/rehype-prism";
import rehypeSlug from "rehype-slug";
import remarkCjkFriendly from "remark-cjk-friendly";
import { rehypeCodeTokens } from "./rehypeCodeTokens";
import { rehypeCollectToc, type TocItem } from "./rehypeCollectToc";
import { rehypeNormalizeHeadings } from "./rehypeNormalizeHeadings";

export type { TocItem };

/**
 * 글 본문 MDX 컴파일 옵션. `toc` 배열은 컴파일 중 h2·h3 로 채워진다.
 * - remark-cjk-friendly: 한글 옆 `**강조**` 인식
 * - 제목 정규화 → rehype-slug(id) → 목차 수집 순서를 지킨다
 * - prism 하이라이트 → 의미 단위 토큰 클래스
 */
export function buildMdxOptions(toc: TocItem[]) {
  return {
    mdxOptions: {
      remarkPlugins: [remarkCjkFriendly],
      rehypePlugins: [rehypeNormalizeHeadings, rehypeSlug, rehypeCollectToc(toc), prism, rehypeCodeTokens],
    },
  };
}
