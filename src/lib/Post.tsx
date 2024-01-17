import fs from "fs";
import { sync } from "glob";
import matter from "gray-matter";
import { visit } from "unist-util-visit";
import path from "path";

const postsDirectory = path.resolve('./posts');

// TODO: Post 인터페이스 필드 수정
export interface Post {
  id: string;
  title: string;
  content: string;
  tags: string[];
  description: string;
  published: boolean;
  slug: string;
  date: string;
}

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

export function parseCodeSnippet() {
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

export async function findPost(year: string, slugs: string[]) {
  const slug = [year, ...(slugs as string[])].join("/");
  const posts = await getSortedPostsData();
  const post = posts.find((p: Post) => {
    return p?.slug === slug;
  });
  return post;
}


export async function getSortedPostsData(): Promise<Post[]> {
  const fileNames: string[] = sync(`${postsDirectory}/**/*.md*`);

  const allPostsData = fileNames.reduce((acc: Post[], curr: string) => {
    const fileContents = fs.readFileSync(curr, "utf8");
    const matterResult = matter(fileContents);
    const { published } = matterResult.data;
    if (!published) {
      return acc;
    }
    const result: Post = {
      id: curr,
      ...matterResult.data,
      content: matterResult.content,
    } as Post;
    return [...acc, result];
  }, [] as Post[]);

  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}
