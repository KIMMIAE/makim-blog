import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { GetStaticPaths, GetStaticProps } from "next";
import { getSortedPostsData, Post } from "../../lib/posts";

export default function PostPage({
  post,
  mdx,
}: {
  post: Post;
  mdx: MDXRemoteSerializeResult;
}) {
  // TODO: 삭제한 포스트 레이아웃 관련 코드 추가
  return (
    <div>
      <header className="py-6">
        <h1 className="text-5xl text-center font-extrabold">{post.title}</h1>
        <p className="text-center">{post.date}</p>
      </header>
      {post.tags.forEach((tag: string) => {
        return <p>{tag}</p>;
      })}
      <article className="pt-8 pb-10 prose prose-slate max-w-none">
        <MDXRemote {...mdx} />
      </article>
    </div>
  );
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
    const source = post.content;
    const mdxSource = await serialize(source);
    return {
      props: {
        post,
        mdx: mdxSource,
      },
    };
  }
  return {
    notFound: true,
  };
};
