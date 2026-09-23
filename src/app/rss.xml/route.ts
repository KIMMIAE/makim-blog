import { getSortedPostsData } from "../../lib/Post";
import { AUTHOR, SITE_DESCRIPTION, SITE_LANGUAGE, SITE_NAME, absoluteUrl } from "../../lib/site";

// 글은 빌드 시점에 확정되므로 정적으로 생성한다
export const dynamic = "force-static";

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

/** "YYYY-MM-DD" → RFC 822 (KST 자정 기준) */
const toRfc822 = (yyyyMmDd: string) => new Date(`${yyyyMmDd}T00:00:00+09:00`).toUTCString();

export async function GET() {
  const posts = await getSortedPostsData();
  const feedUrl = absoluteUrl("/rss.xml");
  const lastBuild = posts[0] ? toRfc822(posts[0].updated ?? posts[0].date) : new Date().toUTCString();

  // 결정 rss-fulltext = 요약만: description 에 프런트매터 요약을 넣고 본문은 링크로 유도한다
  const items = posts
    .map((post) => {
      const url = absoluteUrl(`/${post.slug}`);
      const categories = (post.tags ?? []).map((tag) => `      <category>${escapeXml(tag)}</category>`).join("\n");
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${toRfc822(post.date)}</pubDate>
      <dc:creator>${escapeXml(AUTHOR.name)}</dc:creator>
      <description>${escapeXml(post.description ?? "")}</description>
${categories}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${absoluteUrl("/")}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>${SITE_LANGUAGE}</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
