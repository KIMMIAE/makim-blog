import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostsByTag, getAllTagNames } from "../../../lib/Post";
import { ListHeader, ListHeaderLink } from "../../../components/list/ListHeader";
import { PostList } from "../../../components/list/PostList";
import { Pagination } from "../../../components/list/Pagination";
import { SITE_NAME, SITE_OG_IMAGE, alternatesFor } from "../../../lib/site";

export const dynamic = "force-dynamic";

const POSTS_PER_PAGE = 8;

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = await getPostsByTag(decodedTag);
  const title = `#${decodedTag}`;
  const description = `${decodedTag} 태그가 붙은 글 ${posts.length}편을 모았습니다.`;
  // ?page=N 은 같은 목록의 일부이므로 canonical 은 항상 1페이지
  const pathname = `/tags/${encodeURIComponent(decodedTag)}`;
  return {
    title,
    description,
    alternates: alternatesFor(pathname),
    openGraph: { type: "website", title: `${title} · ${SITE_NAME}`, description, url: pathname, images: [SITE_OG_IMAGE] },
  };
}

export async function generateStaticParams() {
  const tagNames = await getAllTagNames();
  return tagNames.map((tag) => ({ tag: encodeURIComponent(tag) }));
}

export default async function TagPage({
  params,
  searchParams,
}: {
  params: Promise<{ tag: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { tag } = await params;
  const { page } = await searchParams;
  const decodedTag = decodeURIComponent(tag);
  const allPosts = await getPostsByTag(decodedTag);
  if (allPosts.length === 0) {
    return notFound();
  }

  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const currentPage = page === undefined ? 1 : Number(page);
  if (!Number.isInteger(currentPage) || currentPage < 1 || currentPage > totalPages) {
    return notFound();
  }

  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const posts = allPosts.slice(start, start + POSTS_PER_PAGE);
  const hrefFor = (n: number) => `/tags/${encodeURIComponent(decodedTag)}${n > 1 ? `?page=${n}` : ""}`;

  return (
    <div>
      <ListHeader title={`#${decodedTag}`} count={allPosts.length}>
        <ListHeaderLink href="/tags">모든 태그</ListHeaderLink>
      </ListHeader>
      <PostList posts={posts} />
      {totalPages > 1 ? <Pagination current={currentPage} total={totalPages} hrefFor={hrefFor} /> : null}
    </div>
  );
}
