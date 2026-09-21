import Link from "next/link";
import type { Post } from "../../lib/Post";
import { formatYearMonth } from "../../lib/format";
import { DecorThumb, type ThumbVariant } from "./DecorThumb";
import { ReadMoreTrail } from "./ReadMoreTrail";
import styles from "./RecentPosts.module.css";

export function PostRow({ post, variant }: { post: Post; variant: ThumbVariant }) {
  const href = `/${post.slug}`;
  const category = post.tags?.[0];
  return (
    <article className={styles.post}>
      <div className={styles.body}>
        <span className={styles.meta}>
          {category ? <>{category} · </> : null}
          <time dateTime={post.date}>{formatYearMonth(post.date)}</time>
        </span>
        <h3 className={styles.postTitle}>
          <Link href={href}>{post.title}</Link>
        </h3>
        {post.description ? <p className={styles.description}>{post.description}</p> : null}
        <Link href={href} className={styles.read} aria-label={`${post.title} 읽기`}>
          Read more
          <ReadMoreTrail />
        </Link>
      </div>
      <DecorThumb variant={variant} label={category} />
    </article>
  );
}
