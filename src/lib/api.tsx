import fs from "fs";
import { sync } from "glob";
import matter from "gray-matter";

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
const postsDirectory = `${process.cwd()}/posts`;

export async function getSortedPostsData() {
  const fileNames: string[] = sync(`${postsDirectory}/**/*.md`);
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
