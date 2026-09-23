import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSortedPostsData, getTagSummaries } from "../../../lib/Post";
import { ListHeader, ListHeaderLink } from "../../../components/list/ListHeader";
import { PostList } from "../../../components/list/PostList";
import { Pagination } from "../../../components/list/Pagination";
import { TagChip } from "../../../components/list/TagChip";
import { SITE_NAME, alternatesFor } from "../../../lib/site";

export const dynamic = "error";

const POSTS_PER_PAGE = 8;
const HEADER_TAG_COUNT = 6;

const pageCount = (total: number) => Math.max(1, Math.ceil(total / POSTS_PER_PAGE));

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const pageNo = Number(id);
  const title = pageNo > 1 ? `전체 글 · ${pageNo}페이지` : "전체 글";
  const description = `${SITE_NAME} 의 모든 글을 시간순으로 모았습니다.`;
  return {
    title,
    description,
    alternates: alternatesFor(`/posts/${pageNo}`),
    openGraph: { type: "website", title: `${title} · ${SITE_NAME}`, description, url: `/posts/${pageNo}` },
  };
}

export async function generateStaticParams() {
  const posts = await getSortedPostsData();
  return Array.from({ length: pageCount(posts.length) }, (_, i) => ({ id: `${i + 1}` }));
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [allPosts, tagSummaries] = await Promise.all([getSortedPostsData(), getTagSummaries()]);
  const totalPages = pageCount(allPosts.length);
  const pageNo = Number(id);
  if (!Number.isInteger(pageNo) || pageNo < 1 || pageNo > totalPages) {
    return notFound();
  }

  const start = (pageNo - 1) * POSTS_PER_PAGE;
  const posts = allPosts.slice(start, start + POSTS_PER_PAGE);
  const headerTags = tagSummaries.slice(0, HEADER_TAG_COUNT);

  return (
    <div>
      <ListHeader title="전체 글" count={allPosts.length}>
        {headerTags.map((tag) => <TagChip key={tag.name} name={tag.name} size="md" />)}
        <ListHeaderLink href="/tags">모든 태그</ListHeaderLink>
      </ListHeader>
      <PostList posts={posts} />
      <Pagination current={pageNo} total={totalPages} hrefFor={(n) => `/posts/${n}`} />
    </div>
  );
}
