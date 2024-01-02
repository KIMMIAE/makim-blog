import { GetStaticPaths, GetStaticProps } from "next";
import { Post, getSortedPostsData } from "../../lib/api";
import Link from "next/link";
import { Card } from "../../components/Card";

const DEFAULT_NUMBER_OF_POSTS = 4;

export default function Posts({
  posts,
  pageNo,
  hasNextPage,
}: {
  posts: Array<Post>;
  pageNo: number;
  hasNextPage: boolean;
}) {
  return (
    <div>
      <h1 className="text-3xl">Page {pageNo}</h1>
      <div className="my-6 border-b-2"></div>
      {posts.map((post: Post) => {
        return (
          <div key={post.id} className="flex md:grid md:grid-cols-5 md:items-baseline md:border-l md:border-gray-100 md:dark:border-gray-700/40">
            <Card.Time dateTime={post.date} className="hidden md:block" horizontal></Card.Time>
            <Card href={post.slug} className="md:col-span-4">
              <a>
                <Card.Time dateTime={post.date} className="md:hidden" decorate></Card.Time>
                <Card.Title title={post.title} className="text-2xl" />
                <Card.Tags tags={post.tags} />
                <Card.Description desc={post.description} className="mb-2" />
                <Card.Cta name="Read More &rarr;" ariaLabel="Read More" />
              </a>
            </Card>
          </div>
        );
      })}
      <div className="flex mt-2">
        <div className="flex justify-start w-1/2 text-base font-medium leading-6">
          {pageNo !== 1 && (
            <Link href={`/posts/${pageNo - 1}`} aria-label="all posts" passHref>
              <span className="text-blue-500 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400">
                &larr; Page {pageNo - 1}
              </span>
            </Link>
          )}
        </div>

        <div className="flex justify-end w-1/2 text-base font-medium leading-6">
          {hasNextPage && (
            <Link href={`/posts/${pageNo + 1}`} aria-label="all posts" passHref>
              <span className="text-blue-500 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400">
                Page {pageNo + 1} &rarr;
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getSortedPostsData();

  const paths = [
    ...new Array(Math.round(posts.length / DEFAULT_NUMBER_OF_POSTS)).keys(),
  ].map((i) => ({ params: { id: `${i + 1}` } }));

  return {
    paths,
    fallback: "blocking",
  };
};

interface IPosts {
  [key: string]: string | undefined;
  id: string;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as IPosts;
  const allPosts = await getSortedPostsData();
  const pageNo = parseInt(id);

  if (
    isNaN(pageNo) ||
    pageNo > Math.ceil(allPosts.length / DEFAULT_NUMBER_OF_POSTS) ||
    pageNo < 1
  ) {
    return {
      notFound: true,
    };
  }

  const startIndex = (pageNo - 1) * DEFAULT_NUMBER_OF_POSTS;
  const endIndex = startIndex + DEFAULT_NUMBER_OF_POSTS;

  const posts = allPosts.slice(startIndex, endIndex);

  const hasNextPage =
    Math.floor(allPosts.length / DEFAULT_NUMBER_OF_POSTS) >= pageNo;

  return {
    props: {
      posts: posts.map((post) => ({ ...post, path: "" })),
      pageNo,
      hasNextPage,
    },
  };
};
