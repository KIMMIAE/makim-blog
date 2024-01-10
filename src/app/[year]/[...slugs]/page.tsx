import { notFound } from "next/navigation";
import { Post, getSortedPostsData } from "../../../lib/api";
import { serialize } from "next-mdx-remote/serialize";
import prism from "@mapbox/rehype-prism";
import { visit } from "unist-util-visit";
import { MDXRemote } from "next-mdx-remote";

type TokenType =
  | "tag"
  | "attr-name"
  | "attr-value"
  | "deleted"
  | "inserted"
  | "punctuation"
  | "keyword"
  | "string"
  | "function"
  | "boolean"
  | "comment";

const tokenClassNames: { [key in TokenType]: string } = {
  tag: "text-code-blue",
  "attr-name": "text-code-sky",
  "attr-value": "text-code-orange",
  deleted: "text-code-orange",
  inserted: "text-code-lime",
  punctuation: "text-code-stone",
  keyword: "text-code-blue",
  string: "text-code-orange",
  function: "text-code-yellow",
  boolean: "text-code-lime",
  comment: "text-code-green",
};

function parseCodeSnippet() {
  return (tree: Node) => {
    visit(tree, "element", (node: any) => {
      const [token, type]: [string, TokenType] =
        node.properties.className || [];
      if (token === "token") {
        node.properties.className = [tokenClassNames[type]];
      }
    });
  };
}

export async function generateStaticParams() {
  const allPosts = await getSortedPostsData();

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
  return paths;
}

export default async function Page({
  params: { year, slugs },
}: {
  params: { year: string; slugs: string[] };
}) {
  const slug = [year, ...(slugs as string[])].join("/");
  const posts = getSortedPostsData();
  const post = posts.find((p: Post) => {
    return p?.slug === slug;
  });

  if (!post) {
    return notFound();
  }

  const source = post.content;
  const mdxSource = await serialize(source, {
    mdxOptions: {
      rehypePlugins: [prism, parseCodeSnippet],
    },
  });

  return (
    <div>
      <header className="py-6 border-b">
        <h1 className="text-3xl font-extrabold md:text-4xl">{post.title}</h1>
        <p className="mt-2 font-semibold text-gray-400">
          posted by <span className="text-black">mia</span> · {post.date}
        </p>
      </header>
      {post.tags.map((tag: string) => {
        return <p key={tag}>{tag}</p>;
      })}
      <article className="pt-8 pb-10 prose border-b prose-slate dark:prose-invert max-w-none">
        <MDXRemote {...mdxSource} />
      </article>
    </div>
  );
}
