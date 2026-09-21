import Link from "next/link";
import styles from "./TagChip.module.css";

type Props = {
  name: string;
  /** sm: 글 행 안의 태그 / md: 페이지 헤더의 태그 칩 바 */
  size?: "sm" | "md";
};

/** 태그 페이지로 연결되는 연한 칩. 홈·목록 페이지 공용. */
export function TagChip({ name, size = "sm" }: Props) {
  return (
    <Link href={`/tags/${encodeURIComponent(name)}`} className={`${styles.chip} ${styles[size]}`}>
      {name}
    </Link>
  );
}
