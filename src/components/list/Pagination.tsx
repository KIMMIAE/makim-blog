import Link from "next/link";
import styles from "./Pagination.module.css";

type Props = {
  current: number;
  total: number;
  /** n페이지로 가는 경로. 전체 글: /posts/n, 태그: /tags/{tag}?page=n */
  hrefFor: (page: number) => string;
};

const STROKE = { fill: "none", stroke: "currentColor", strokeWidth: 2.4, strokeLinecap: "round", strokeLinejoin: "round" } as const;

/**
 * 번호 pill 페이지네이션. 현재 페이지는 강조색으로 채우고, 양쪽 화살표는 항상 같은 자리에
 * 두되 첫/마지막 페이지에서는 비활성으로 표시한다.
 */
export function Pagination({ current, total, hrefFor }: Props) {
  if (total < 1) return null;
  const pages = Array.from({ length: total }, (_, i) => i + 1);
  return (
    <nav className={styles.pager} aria-label="페이지 이동">
      <ArrowLink href={current > 1 ? hrefFor(current - 1) : null} label="이전 페이지" direction="prev" />
      {pages.map((n) =>
        n === current ? (
          <span key={n} className={styles.num} aria-current="page">{n}</span>
        ) : (
          <Link key={n} href={hrefFor(n)} className={styles.num} aria-label={`${n}페이지`}>{n}</Link>
        )
      )}
      <ArrowLink href={current < total ? hrefFor(current + 1) : null} label="다음 페이지" direction="next" />
    </nav>
  );
}

function ArrowLink({ href, label, direction }: { href: string | null; label: string; direction: "prev" | "next" }) {
  const icon = (
    <svg viewBox="3 5 16 14" width="1.1em" height="1em" aria-hidden="true">
      <path d={direction === "next" ? "M4 12h13M12 6.5l5.5 5.5-5.5 5.5" : "M18 12H5M10 6.5 4.5 12l5.5 5.5"} {...STROKE} />
    </svg>
  );
  if (!href) {
    return <span className={`${styles.num} ${styles.arrow} ${styles.disabled}`} aria-disabled="true" aria-label={label}>{icon}</span>;
  }
  return <Link href={href} className={`${styles.num} ${styles.arrow}`} aria-label={label}>{icon}</Link>;
}
