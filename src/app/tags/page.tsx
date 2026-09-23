import type { Metadata } from "next";
import Link from "next/link";
import { getTagSummaries } from "../../lib/Post";
import { ListHeader } from "../../components/list/ListHeader";
import { SITE_NAME, SITE_OG_IMAGE, alternatesFor } from "../../lib/site";
import styles from "./TagIndex.module.css";

const TITLE = "태그";
const DESCRIPTION = `${SITE_NAME} 의 글을 주제별로 모은 태그 목록입니다.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: alternatesFor("/tags"),
  openGraph: { type: "website", title: `${TITLE} · ${SITE_NAME}`, description: DESCRIPTION, url: "/tags", images: [SITE_OG_IMAGE] },
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
