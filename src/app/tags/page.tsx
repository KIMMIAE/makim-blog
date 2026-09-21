import Link from "next/link";
import { getTagSummaries } from "../../lib/Post";
import { ListHeader } from "../../components/list/ListHeader";
import styles from "./TagIndex.module.css";

export const metadata = {
  title: "태그",
  description: "블로그의 모든 태그 목록",
};

export default async function TagsPage() {
  const tags = await getTagSummaries();

  return (
    <div>
      <ListHeader title="태그" count={tags.length} />
      <ul className={styles.grid}>
        {tags.map((tag) => (
          <li key={tag.name}>
            <Link href={`/tags/${encodeURIComponent(tag.name)}`} className={styles.card}>
              <span className={styles.name}>#{tag.name}</span>
              <span className={styles.count} aria-label={`${tag.count}개의 글`}>{tag.count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
