import fs from "fs";
import { globSync } from "glob";
import matter from "gray-matter";
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

export async function findPost(year: string, slugs: string[]) {
  const slug = [year, ...(slugs as string[])].join("/");
  const posts = await getSortedPostsData();
  const post = posts.find((p: Post) => {
    return p?.slug === slug;
  });
  return post;
}


export async function getSortedPostsData(): Promise<Post[]> {
  const pattern = path.join(postsDirectory, '**', '*.md*');
  const normalizedPattern = pattern.replace(/\\/g, '/');

  const fileNames: string[] = globSync(normalizedPattern);

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

export async function getAllTags(): Promise<{ [key: string]: number }> {
  const posts = await getSortedPostsData();
  const tagCount: { [key: string]: number } = {};
  
  posts.forEach((post) => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach((tag) => {
        tagCount[tag] = (tagCount[tag] || 0) + 1;
      });
    }
  });
  
  return tagCount;
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  const posts = await getSortedPostsData();
  return posts.filter((post) => 
    post.tags && Array.isArray(post.tags) && post.tags.includes(tag)
  );
}

export async function getAllTagNames(): Promise<string[]> {
  const tagCount = await getAllTags();
  return Object.keys(tagCount).sort();
}

export interface TagSummary {
  name: string;
  count: number;
  /** 해당 태그가 붙은 가장 최근 글의 날짜 */
  latest: string;
}

/**
 * 홈 "주제별로 읽기"용 태그 요약. 글 수 내림차순, 동률이면 최신 글 순, 그다음 이름순.
 */
export async function getTagSummaries(): Promise<TagSummary[]> {
  const posts = await getSortedPostsData();
  const map = new Map<string, TagSummary>();
  for (const post of posts) {
    for (const tag of post.tags ?? []) {
      const entry = map.get(tag);
      if (entry) {
        entry.count += 1;
        if (post.date > entry.latest) entry.latest = post.date;
      } else {
        map.set(tag, { name: tag, count: 1, latest: post.date });
      }
    }
  }
  return [...map.values()].sort(
    (a, b) => b.count - a.count || b.latest.localeCompare(a.latest) || a.name.localeCompare(b.name)
  );
}
