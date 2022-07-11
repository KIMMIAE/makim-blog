import { GetStaticPaths, GetStaticProps } from "next";
import { getSortedPostsData, Post } from "../../lib/posts";

export default function PostPage({ post }: { post: Post }) {
  // TODO: 삭제한 포스트 레이아웃 관련 코드 추가
  return <div>
    <h1>{post.title}</h1>
    <span>{post.date}</span>
    {
      post.tags.forEach((tag: string) => {
        return <p>{tag}</p>;
      })
    }
    <p>{post.content}</p>
  </div>;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = getSortedPostsData();
  const paths: Array<{
    params: { year: string; slugs: string[] };
  }> = allPosts.reduce<Array<{ params: { year: string; slugs: string[] } }>>(
    (prev, post) => {
      const [year, ...slugs] = post.slug.split("/");
      prev.push({ params: { year, slugs } });
      return prev;
    },
    []
  );
  return {
    paths,
    fallback: "blocking",
  };
};

interface aa {
  year: string;
  slugs: string[];
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { year, slugs } = params as unknown as aa;

  const slug = [year, ...(slugs as string[])].join("/");
  const posts = getSortedPostsData();
  const post = posts.find((p: Post) => {
    return p?.slug === slug;
  });
  if (post) {
    return {
      props: {
        post,
      },
    };
  }
  return {
    notFound: true,
  };
};
