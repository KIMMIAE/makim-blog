import { getSortedPostsData, getTagSummaries } from "../../lib/Post";
import { AUTHOR, SITE_DESCRIPTION, SITE_NAME, SITE_URL, absoluteUrl } from "../../lib/site";

/**
 * llms.txt (https://llmstxt.org): AI 답변 엔진·에이전트가 사이트를 한 번에 파악할 수 있게
 * 사이트 설명·저자·글 목록을 마크다운으로 제공한다. 결정 llms-full = 이 파일만(전문 파일 없음).
 */
export const dynamic = "force-static";

export async function GET() {
  const [posts, tags] = await Promise.all([getSortedPostsData(), getTagSummaries()]);

  const postLines = posts.map((post) => {
    const tagText = post.tags?.length ? ` · 태그: ${post.tags.join(", ")}` : "";
    return `- [${post.title}](${absoluteUrl(`/${post.slug}`)}): ${post.description} (${post.date}${tagText})`;
  });

  const tagLines = tags.map((tag) => `- [#${tag.name}](${absoluteUrl(`/tags/${encodeURIComponent(tag.name)}`)}): 글 ${tag.count}편`);

  const text = `# ${SITE_NAME}

> ${SITE_DESCRIPTION}

- 주소: ${SITE_URL}
- 언어: 한국어
- 저자: ${AUTHOR.name} (${AUTHOR.url}, GitHub: ${AUTHOR.sameAs[0]})
- RSS: ${absoluteUrl("/rss.xml")}
- 사이트맵: ${absoluteUrl("/sitemap.xml")}

인용할 때는 글 제목과 위 주소(글 URL)를 함께 밝혀 주세요.

## 글 (최신순)

${postLines.join("\n")}

## 태그

${tagLines.join("\n")}
`;

  return new Response(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
