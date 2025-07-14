import { notFound } from "next/navigation";
import { getPostsByTag, getAllTagNames } from "../../../lib/Post";
import { Card } from "../../../components/Card";
import Link from "next/link";

export const dynamic = "error";

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
}: {
  params: { tag: string };
}) {
  const decodedTag = decodeURIComponent(params.tag);
  const posts = await getPostsByTag(decodedTag);

  if (posts.length === 0) {
    return notFound();
  }

  return (
    <div>
      <h1 className="text-3xl">
        #{decodedTag} <span className="text-gray-500">({posts.length})</span>
      </h1>
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
      <div className="mt-8">
        <Link href="/tags" className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400">
          ← 모든 태그 보기
        </Link>
      </div>
    </div>
  );
} 