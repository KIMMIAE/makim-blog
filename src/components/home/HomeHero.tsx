import Link from "next/link";
import { InteractiveCat } from "./InteractiveCat";
import styles from "./HomeHero.module.css";

export function HomeHero() {
  return (
    <section className={styles.hero} aria-labelledby="home-title">
      <div>
        <h1 id="home-title" className={styles.title} lang="en">
          Where there’s a will,<br />there’s a way.
        </h1>
        <p className={styles.intro}>
          앞으로도 만드는 사람으로 살아가고 싶습니다.<br />
          개발하며 마주한 문제와 선택, 책과 컨퍼런스에서 얻은 생각,{" "}
          <br className={styles.desktopBreak} />
          직접 만든 도구와 에이전트 이야기를 기록합니다.
        </p>
        <div className={styles.actions}>
          <a href="#recent-posts" className={styles.primary}>글 둘러보기 <span aria-hidden="true">→</span></a>
          <Link className={styles.secondary} href="https://substantial-celsius-cbb.notion.site/f6160283ae074dd698fe85873462701b?pvs=4" target="_blank" rel="noopener noreferrer">
            저를 소개합니다 <span aria-hidden="true">→</span><span className="sr-only"> (새 탭)</span>
          </Link>
        </div>
      </div>
      <div className={styles.art}>
        <div className={styles.back} aria-hidden="true" />
        <div className={styles.panel} aria-hidden="true" />
        <span className={styles.plus} aria-hidden="true">+</span>
        <InteractiveCat />
        <div className={styles.words} aria-hidden="true">BUILD<br />LEARN<br />EXPLORE<br />REPEAT<br />—</div>
        <div className={styles.code} aria-hidden="true">
          <div className={styles.bar}><i /><i /><i /></div>
          <pre><em>const</em>{" ideas =\nstillMaking();\n// better tomorrow\n"}<em>│</em></pre>
        </div>
        <div className={styles.accent} aria-hidden="true" />
        <span id="cat-help" className={styles.hint}>고양이를 살짝 들어 올려보세요 ↗</span>
      </div>
    </section>
  );
}
