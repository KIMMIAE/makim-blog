import Link from "next/link";
import type { Post } from "../../lib/Post";
import { ReadMoreTrail } from "../home/ReadMoreTrail";
import styles from "./PostNav.module.css";

/** 본문 아래: 이전(더 오래된)·다음(더 새로운) 글 카드 + 전체 글 보기 */
export function PostNav({ previous, next }: { previous: Post | null; next: Post | null }) {
  return (
    <footer className={styles.wrap}>
      {previous || next ? (
        <nav className={styles.cards} aria-label="이전·다음 글">
          {previous ? (
            <Link href={`/${previous.slug}`} className={`${styles.card} ${styles.prev}`}>
              <span className={styles.label}>← 이전 글</span>
              <span className={styles.title}>{previous.title}</span>
            </Link>
          ) : null}
          {next ? (
            <Link href={`/${next.slug}`} className={`${styles.card} ${styles.next}`}>
              <span className={styles.label}>다음 글 →</span>
              <span className={styles.title}>{next.title}</span>
            </Link>
          ) : null}
        </nav>
      ) : null}
      <p className={styles.back}>
        <Link href="/posts/1" className={styles.backLink}>
          전체 글 보기
          <ReadMoreTrail />
        </Link>
      </p>
    </footer>
  );
}
