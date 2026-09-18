import styles from "./ReadMoreTrail.module.css";

const STROKE = { fill: "none", stroke: "currentColor", strokeWidth: 2.4, strokeLinecap: "round", strokeLinejoin: "round" } as const;

/**
 * "Read more" 뒤에 붙는 장식 꼬리. hover/focus-visible 시 화살표(→)가 먼저 켜지고
 * 화살촉 모양 셰브론 세 개가 순서대로 이어지며 뒤로 갈수록 연해진다. 떠날 때도 순서대로 꺼진다.
 * (joshwcomeau.com 의 Read more 동작을 참고)
 */
export function ReadMoreTrail() {
  return (
    <span className={styles.trail} aria-hidden="true">
      <svg className={styles.arrow} viewBox="3 5 16 14" width="1.1em" height="1em">
        <path d="M4 12h13M12 6.5l5.5 5.5-5.5 5.5" {...STROKE} />
      </svg>
      {[0, 1, 2].map((i) => (
        <svg key={i} className={styles.chev} viewBox="7 5 10 14" width="0.72em" height="1em">
          <path d="M9 6.5l5.5 5.5L9 17.5" {...STROKE} />
        </svg>
      ))}
    </span>
  );
}
