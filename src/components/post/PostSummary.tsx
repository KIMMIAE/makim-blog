import styles from "./PostSummary.module.css";

/**
 * 글 상단 "한눈에 보기". 프런트매터 description 을 그대로 보여준다.
 * 검색 스니펫·공유 카드·RSS 와 같은 문장이라 일관되고, AI 가 인용하기 좋은 자기완결 문단이 된다.
 */
export function PostSummary({ text }: { text?: string }) {
  if (!text?.trim()) return null;
  return (
    <aside className={styles.box} aria-labelledby="post-summary-title">
      <p id="post-summary-title" className={styles.label}>한눈에 보기</p>
      <p className={styles.text}>{text}</p>
    </aside>
  );
}
