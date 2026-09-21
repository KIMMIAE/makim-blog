import { notFound } from "next/navigation";
import { findPost, getSortedPostsData } from "../../../lib/Post";
import { buildMdxOptions, type TocItem } from "../../../lib/mdx";
import { compileMDX } from "next-mdx-remote/rsc";
import { PostHeader } from "../../../components/post/PostHeader";
import { PostImage } from "../../../components/post/PostImage";
import { CodeBlock } from "../../../components/post/CodeBlock";
import body from "../../../components/post/PostBody.module.css";
import layout from "../../../components/post/PostLayout.module.css";

export const dynamic = "error";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ year: string; slugs: string[] }>;
}) {
  const { year, slugs } = await params;
  const post = await findPost(year, slugs);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
  };
}

export async function generateStaticParams() {
  const allPosts = await getSortedPostsData();

  const paths = allPosts.reduce<Array<{ year: string; slugs: string[] }>>(
    (prev, post) => {
      const [year, ...slugs] = post.slug.split("/");
      prev.push({ year, slugs });
      return prev;
    },
    []
  );
  return paths;
}

export default async function Page({
  params,
}: {
  params: Promise<{ year: string; slugs: string[] }>;
}) {
  const { year, slugs } = await params;
  const post = await findPost(year, slugs);
  if (!post) {
    return notFound();
  }

  const toc: TocItem[] = [];
  const { content } = await compileMDX({
    source: post.content,
    options: buildMdxOptions(toc),
    components: { img: PostImage, pre: CodeBlock },
  });

  return (
    <div className={layout.layout}>
      <div className={layout.main}>
        <PostHeader post={post} />
        <article className={`prose ${body.prose}`}>{content}</article>
      </div>
    </div>
  );
}
