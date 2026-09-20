import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./ListHeader.module.css";

type Props = {
  title: ReactNode;
  /** 제목 옆 배지에 표시할 글(또는 태그) 수 */
  count?: number;
  /** 제목 아래 줄: 태그 칩 바, 링크 등 */
  children?: ReactNode;
};

/** 목록 페이지 상단: 제목 + 수 배지 + (선택) 보조 줄. 하단에 구분선. */
export function ListHeader({ title, count, children }: Props) {
  return (
    <header className={styles.head}>
      <h1 className={styles.title}>
        {title}
        {typeof count === "number" ? <span className={styles.count}>{count}</span> : null}
      </h1>
      {children ? <div className={styles.bar}>{children}</div> : null}
    </header>
  );
}

/** 헤더 보조 줄에서 쓰는 강조색 텍스트 링크 (예: 모든 태그 →) */
export function ListHeaderLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className={styles.more}>
      {children} <span className={styles.arrow} aria-hidden="true">→</span>
    </Link>
  );
}
