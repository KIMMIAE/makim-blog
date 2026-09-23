import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findPost, getAdjacentPosts, getSortedPostsData } from "../../../lib/Post";
import { buildMdxOptions, type TocItem } from "../../../lib/mdx";
import { compileMDX } from "next-mdx-remote/rsc";
import { PostHeader } from "../../../components/post/PostHeader";
import { PostSummary } from "../../../components/post/PostSummary";
import { PostImage } from "../../../components/post/PostImage";
import { CodeBlock } from "../../../components/post/CodeBlock";
import { TableOfContents } from "../../../components/post/TableOfContents";
import { PostNav } from "../../../components/post/PostNav";
import body from "../../../components/post/PostBody.module.css";
import layout from "../../../components/post/PostLayout.module.css";
import { AUTHOR, SITE_NAME, alternatesFor, ogImagePath } from "../../../lib/site";
import { JsonLd } from "../../../components/seo/JsonLd";
import { blogPostingJsonLd, breadcrumbJsonLd } from "../../../lib/jsonld";

export const dynamic = "error";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ year: string; slugs: string[] }>;
}): Promise<Metadata> {
  const { year, slugs } = await params;
  const post = await findPost(year, slugs);

  if (!post) {
    return {};
  }

  const pathname = `/${post.slug}`;
  const image = { url: ogImagePath(post.slug), width: 1200, height: 630, alt: post.title };
  return {
    title: post.title,
    description: post.description,
    alternates: alternatesFor(pathname),
    openGraph: {
      type: "article",
      title: `${post.title} · ${SITE_NAME}`,
      description: post.description,
      publishedTime: post.date,
      // 수정일은 프런트매터 updated 가 있을 때만. 없으면 발행일과 같다고 우기지 않는다
      ...(post.updated ? { modifiedTime: post.updated } : {}),
      authors: [AUTHOR.url],
      tags: post.tags,
      url: pathname,
      images: [image],
    },
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
  const { previous, next } = await getAdjacentPosts(post.slug);
  const { content } = await compileMDX({
    source: post.content,
    options: buildMdxOptions(toc),
    components: { img: PostImage, pre: CodeBlock },
  });

  return (
    <div className={layout.layout}>
      <JsonLd
        data={[
          blogPostingJsonLd(post),
          breadcrumbJsonLd([
            { name: "홈", pathname: "/" },
            { name: "전체 글", pathname: "/posts/1" },
            { name: post.title, pathname: `/${post.slug}` },
          ]),
        ]}
      />
      <div className={layout.main}>
        <PostHeader post={post} />
        <PostSummary text={post.description} />
        {toc.length > 0 ? (
          <>
            <div className={layout.tocTop}>
              <p className={layout.tocTopTitle}>목차</p>
              <TableOfContents items={toc} />
            </div>
            <details className={layout.tocMobile}>
              <summary>목차</summary>
              <TableOfContents items={toc} />
            </details>
          </>
        ) : null}
        <article className={`prose ${body.prose}`}>{content}</article>
        <PostNav previous={previous} next={next} />
      </div>
      {toc.length > 0 ? (
        <aside className={layout.aside}>
          <p className={layout.asideTitle}>목차</p>
          <TableOfContents items={toc} ariaLabel="목차 (우측)" />
        </aside>
      ) : null}
    </div>
  );
}
