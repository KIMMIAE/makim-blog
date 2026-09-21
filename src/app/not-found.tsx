import Link from "next/link";
import type { Metadata } from "next";
import { ReadMoreTrail } from "../components/home/ReadMoreTrail";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없어요",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className={styles.wrap} aria-labelledby="nf-title">
      {/* eslint-disable-next-line @next/next/no-img-element -- 픽셀 아트 SVG, 최적화 불필요 */}
      <img src="/cat/c-sleep.svg" alt="" width={128} height={128} className={styles.cat} aria-hidden="true" />
      <p className={styles.code} aria-hidden="true">404</p>
      <h1 id="nf-title" className={styles.title}>여기엔 아무것도 없어요</h1>
      <p className={styles.desc}>주소가 바뀌었거나 삭제된 글일 수 있어요. 고양이도 찾다가 잠들었네요.</p>
      <div className={styles.actions}>
        <Link href="/" className={styles.primary}>홈으로</Link>
        <Link href="/posts/1" className={styles.secondary}>
          전체 글 보기
          <ReadMoreTrail />
        </Link>
      </div>
    </section>
  );
}
