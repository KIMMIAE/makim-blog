import styles from "./DecorThumb.module.css";

export type ThumbVariant = "orb" | "window";

/**
 * 글 목록의 장식 썸네일. 시안의 두 가지 모티프(보라 원 / 파란 미니 창)를 교대로 쓰고,
 * 텍스트는 글의 첫 태그만 사용한다. 장식이므로 접근성 트리에서는 숨긴다.
 */
export function DecorThumb({ variant, label }: { variant: ThumbVariant; label?: string }) {
  if (variant === "window") {
    return (
      <div className={`${styles.thumb} ${styles.blue}`} aria-hidden="true">
        <div className={styles.miniWindow}>
          <span className={styles.dots}>● ● ●</span>
          <b>{label ?? "—"}</b>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.thumb} aria-hidden="true">
      <div className={styles.orb} />
      <span className={styles.caption}>{label ? label.toUpperCase() : "—"}</span>
    </div>
  );
}
