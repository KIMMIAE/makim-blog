import Link from "next/link";
import type { Post } from "../../lib/Post";
import { formatDateDots } from "../../lib/format";
import { ReadMoreTrail } from "../home/ReadMoreTrail";
import { TagChip } from "./TagChip";
import styles from "./PostList.module.css";

/**
 * 목록 페이지(전체 글, 태그별 글) 공용 글 목록.
 * 왼쪽 날짜 열 + 오른쪽 태그 칩·제목·설명·Read more. 767px 이하에서는 단일 컬럼.
 */
export function PostList({ posts }: { posts: Post[] }) {
  return (
    <ol className={styles.list}>
      {posts.map((post) => (
        <PostListRow key={post.id} post={post} />
      ))}
    </ol>
  );
}

function PostListRow({ post }: { post: Post }) {
  const href = `/${post.slug}`;
  return (
    <li className={styles.post}>
      <time className={styles.date} dateTime={post.date}>{formatDateDots(post.date)}</time>
      <div className={styles.body}>
        {post.tags?.length ? (
          <div className={styles.tags}>
            {post.tags.map((tag) => <TagChip key={tag} name={tag} />)}
          </div>
        ) : null}
        <h2 className={styles.title}>
          <Link href={href}>{post.title}</Link>
        </h2>
        {post.description ? <p className={styles.desc}>{post.description}</p> : null}
        <Link href={href} className={styles.read}>
          Read more<span className="sr-only">: {post.title}</span>
          <ReadMoreTrail />
        </Link>
      </div>
    </li>
  );
}
