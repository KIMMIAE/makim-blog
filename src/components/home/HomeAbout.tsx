import Link from "next/link";
import styles from "./HomeAbout.module.css";

const ABOUT_URL = "https://substantial-celsius-cbb.notion.site/f6160283ae074dd698fe85873462701b?pvs=4";

export function HomeAbout() {
  return (
    <section id="about" className={styles.about} aria-labelledby="about-title">
      <h2 id="about-title" className={styles.heading}>계속, 만드는 사람.</h2>
      <p className={styles.body}>
        안녕하세요, 개발자 makim입니다. 문제를 풀고, 더 나은 선택을 고민하며 개발합니다.{" "}
        <br className={styles.desktopBreak} />
        새로운 도구를 직접 써보고 만들어보며, 그 과정에서 배운 것을 이곳에 남깁니다.
      </p>
      <Link href={ABOUT_URL} className={styles.link} target="_blank" rel="noopener noreferrer">
        소개 페이지 보기 <span className={styles.arrow} aria-hidden="true">→</span>
        <span className="sr-only"> (새 탭)</span>
      </Link>
    </section>
  );
}
