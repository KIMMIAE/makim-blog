import Link from "next/link";
import type { TagSummary } from "../../lib/Post";
import styles from "./TopicList.module.css";

/**
 * 홈 "주제별로 읽기" 카드. 실제 존재하는 태그만 보여주고 각 항목은 태그 페이지로 연결한다.
 */
export function TopicList({ tags }: { tags: TagSummary[] }) {
  if (tags.length === 0) return null;
  return (
    <aside className={styles.topics} aria-labelledby="topics-title">
      <h3 id="topics-title" className={styles.heading}>주제별로 읽기</h3>
      <ul className={styles.list}>
        {tags.map((tag) => (
          <li key={tag.name}>
            <Link href={`/tags/${encodeURIComponent(tag.name)}`} className={styles.topic}>
              <span className={styles.icon} aria-hidden="true">{tag.name.charAt(0).toUpperCase()}</span>
              <span className={styles.label}>{tag.name}</span>
              <span className={styles.count}>{tag.count}</span>
              <span className={styles.chev} aria-hidden="true">›</span>
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/tags" className={styles.all}>
        모든 태그 보기 <span className={styles.arrow} aria-hidden="true">→</span>
      </Link>
    </aside>
  );
}
