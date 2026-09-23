import { notFound } from "next/navigation";
import { findPost, getSortedPostsData } from "../../../lib/Post";
import { postOgImage } from "../../../lib/og";

/**
 * 글별 공유 카드: /og/{year}/{...slug}.png
 * opengraph-image.tsx 파일 규약은 catch-all 세그먼트 아래에 둘 수 없어(Next 제한) Route Handler 로 만든다.
 * 글 목록은 빌드 시 확정되므로 정적으로 생성한다.
 */
export const dynamic = "force-static";
export const dynamicParams = false;


export async function generateStaticParams() {
  const posts = await getSortedPostsData();
  return posts.map((post) => {
    const parts = post.slug.split("/");
    parts[parts.length - 1] += ".png";
    return { slug: parts };
  });
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const [year, ...rest] = slug;
  if (rest.length === 0) notFound();
  rest[rest.length - 1] = rest[rest.length - 1].replace(/\.png$/, "");
  const post = await findPost(year, rest);
  if (!post) notFound();
  return postOgImage(post);
}
