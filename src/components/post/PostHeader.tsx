import type { Post } from "../../lib/Post";
import { formatDateDots } from "../../lib/format";
import { TagChip } from "../list/TagChip";
import styles from "./PostHeader.module.css";

const AUTHOR = "makim";

export function PostHeader({ post }: { post: Post }) {
  return (
    <header className={styles.head}>
      {post.tags?.length ? (
        <div className={styles.tags}>
          {post.tags.map((tag) => <TagChip key={tag} name={tag} />)}
        </div>
      ) : null}
      <h1 className={styles.title}>{post.title}</h1>
      <p className={styles.meta}>
        <b>{AUTHOR}</b>
        <span className={styles.dot} aria-hidden="true">·</span>
        <time dateTime={post.date}>{formatDateDots(post.date)}</time>
      </p>
    </header>
  );
}
