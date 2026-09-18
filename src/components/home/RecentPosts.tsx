import Link from "next/link";
import type { ReactNode } from "react";
import type { Post } from "../../lib/Post";
import { PostRow } from "./PostRow";
import styles from "./RecentPosts.module.css";

/**
 * 홈 "최근 기록" 영역. 왼쪽에 글 목록, 오른쪽(aside)에 주제 카드가 들어간다.
 * aside 가 없으면 단일 컬럼으로 렌더링한다.
 */
export function RecentPosts({ posts, aside }: { posts: Post[]; aside?: ReactNode }) {
  return (
    <section id="recent-posts" className={styles.section} aria-labelledby="recent-title">
      <div className={styles.head}>
        <h2 id="recent-title" className={styles.heading}>최근 기록</h2>
        <Link href="/posts/1" className={styles.all}>
          전체 글 보기 <span className={styles.arrow} aria-hidden="true">→</span>
        </Link>
      </div>
      <div className={aside ? styles.content : styles.contentSingle}>
        <div className={styles.list}>
          {posts.map((post, index) => (
            <PostRow key={post.id} post={post} variant={index % 2 === 0 ? "orb" : "window"} />
          ))}
        </div>
        {aside}
      </div>
    </section>
  );
}
