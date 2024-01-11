import { notFound } from "next/navigation";
import { Post, getSortedPostsData } from "../../../lib/Post";
import prism from "@mapbox/rehype-prism";
import { visit } from "unist-util-visit";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Card } from "../../../components/Card";

export const dynamic = "error";

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

async function findPost(year: string, slugs: string[]) {
  const slug = [year, ...(slugs as string[])].join("/");
  const posts = await getSortedPostsData();
  const post = posts.find((p: Post) => {
    return p?.slug === slug;
  });
  return post;
}

export async function generateMetadata({
  params: { year, slug },
}: {
  params: { year: string; slug: string[] }
}) {
  const post = await findPost(year, slug)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
  }
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
  const post = await findPost(year, slugs);
  if (!post) {
    return notFound();
  }

  const source = post.content;

  return (
    <div>
      <header className="py-6 border-b">
        <Card.Tags tags={post.tags} />
        <h1 className="text-3xl font-extrabold md:text-4xl">{post.title}</h1>
        <p className="mt-2 font-semibold text-gray-400">
          posted by <span className="text-black">mia</span> · {post.date}
        </p>
      </header>
      <article className="pt-8 pb-10 prose border-b prose-slate dark:prose-invert max-w-none">
        <MDXRemote
          source={source}
          options={{ mdxOptions: { rehypePlugins: [prism, parseCodeSnippet] } }}
        />
      </article>
    </div>
  );
}
