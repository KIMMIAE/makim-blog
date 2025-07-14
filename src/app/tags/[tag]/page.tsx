import { notFound } from "next/navigation";
import { getPostsByTag, getAllTagNames } from "../../../lib/Post";
import { Card } from "../../../components/Card";
import Link from "next/link";

export const dynamic = "force-dynamic";

const POSTS_PER_PAGE = 4;

export async function generateMetadata({
  params: { tag },
}: {
  params: { tag: string };
}) {
  const decodedTag = decodeURIComponent(tag);
  return {
    title: `#${decodedTag} - 개발이 재밌는 날`,
    description: `${decodedTag} 태그가 포함된 글 목록`,
  };
}

export async function generateStaticParams() {
  const tagNames = await getAllTagNames();
  return tagNames.map((tag) => ({
    tag: encodeURIComponent(tag),
  }));
}

export default async function TagPage({
  params,
  searchParams,
}: {
  params: { tag: string };
  searchParams: { page?: string };
}) {
  const decodedTag = decodeURIComponent(params.tag);
  const allPosts = await getPostsByTag(decodedTag);

  if (allPosts.length === 0) {
    return notFound();
  }

  const currentPage = parseInt(searchParams.page || "1");
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const posts = allPosts.slice(startIndex, endIndex);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl">
          #{decodedTag} <span className="text-gray-500">({allPosts.length})</span>
        </h1>
        <Link
          href="/tags"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          모든 태그
        </Link>
      </div>
      <div className="my-6 border-b-2"></div>
      {posts.map((post) => {
        return (
          <div
            key={post.id}
            className="md:grid md:grid-cols-5 md:items-baseline md:border-l md:border-gray-100 md:dark:border-gray-700/40"
          >
            <Card.Time
              dateTime={post.date}
              className="hidden md:block"
              horizontal
            ></Card.Time>
            <Card href={post.slug} className="md:col-span-4">
              <Card.Time
                dateTime={post.date}
                className="md:hidden"
                decorate
              ></Card.Time>
              <Card.Title title={post.title} className="text-2xl" />
              <Card.Tags tags={post.tags} />
              <Card.Description desc={post.description} className="mb-2" />
              <Card.Cta name="Read More &rarr;" ariaLabel="Read More" />
            </Card>
          </div>
        );
      })}

      {totalPages > 1 && (
        <div className="flex mt-2">
          <div className="flex justify-start w-1/2 text-base font-medium leading-6">
            {currentPage !== 1 && (
              <Link
                href={`/tags/${encodeURIComponent(decodedTag)}?page=${currentPage - 1}`}
                aria-label="previous page"
                passHref
              >
                <span className="text-blue-500 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400">
                  &larr; Page {currentPage - 1}
                </span>
              </Link>
            )}
          </div>

          <div className="flex justify-end w-1/2 text-base font-medium leading-6">
            {currentPage < totalPages && (
              <Link
                href={`/tags/${encodeURIComponent(decodedTag)}?page=${currentPage + 1}`}
                aria-label="next page"
                passHref
              >
                <span className="text-blue-500 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400">
                  Page {currentPage + 1} &rarr;
                </span>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 