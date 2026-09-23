import type { MetadataRoute } from "next";
import { getSortedPostsData, getTagSummaries } from "../lib/Post";
import { SITE_URL, absoluteUrl } from "../lib/site";

/** posts/[id] 와 같은 값. 목록 페이지 수를 계산할 때 쓴다 */
const POSTS_PER_PAGE = 8;

/** "YYYY-MM-DD" 를 KST 자정 기준 Date 로. 시간대를 안 붙이면 UTC 로 해석돼 하루가 밀릴 수 있다 */
const toDate = (yyyyMmDd: string) => new Date(`${yyyyMmDd}T00:00:00+09:00`);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, tags] = await Promise.all([getSortedPostsData(), getTagSummaries()]);
  const latest = posts[0] ? toDate(posts[0].updated ?? posts[0].date) : new Date();
  const listPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));

  return [
    // 홈은 canonical(<link>) 과 같은 표기(끝 슬래시 없음)로 맞춘다
    { url: SITE_URL, lastModified: latest, changeFrequency: "weekly", priority: 1 },
    ...posts.map((post) => ({
      url: absoluteUrl(`/${post.slug}`),
      lastModified: toDate(post.updated ?? post.date),
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
    ...Array.from({ length: listPages }, (_, i) => ({
      url: absoluteUrl(`/posts/${i + 1}`),
      lastModified: latest,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
    { url: absoluteUrl("/tags"), lastModified: latest, changeFrequency: "monthly", priority: 0.5 },
    ...tags.map((tag) => ({
      url: absoluteUrl(`/tags/${encodeURIComponent(tag.name)}`),
      lastModified: toDate(tag.latest),
      changeFrequency: "monthly" as const,
      priority: 0.4,
    })),
  ];
}
