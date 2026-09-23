import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "../../components/seo/JsonLd";
import { breadcrumbJsonLd, personJsonLd } from "../../lib/jsonld";
import { AUTHOR, NOTION_URL, SITE_NAME, SITE_OG_IMAGE, alternatesFor } from "../../lib/site";
import styles from "./about.module.css";

const TITLE = "소개";
const DESCRIPTION = `${AUTHOR.name} 은 스타트업에서 기획부터 유지 보수까지 경험한 프론트엔드 개발자입니다. 소규모 팀을 리딩했고, 팀 생산성과 사용자 친화적인 서비스에 관심이 많습니다.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: alternatesFor("/about"),
  openGraph: { type: "profile", title: `${TITLE} · ${SITE_NAME}`, description: DESCRIPTION, url: "/about", images: [SITE_OG_IMAGE] },
};

const LINKS = [
  { label: "GitHub", href: AUTHOR.sameAs[0], external: true },
  { label: "Notion 이력", href: NOTION_URL, external: true },
  { label: "RSS", href: "/rss.xml", external: false },
];

export default function AboutPage() {
  return (
    <section className={styles.wrap} aria-labelledby="about-title">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            mainEntity: personJsonLd(),
          },
          breadcrumbJsonLd([
            { name: "홈", pathname: "/" },
            { name: TITLE, pathname: "/about" },
          ]),
        ]}
      />
      <header className={styles.head}>
        {/* eslint-disable-next-line @next/next/no-img-element -- 픽셀 아트 SVG, 최적화 불필요 */}
        <img src="/cat/c-awake.svg" alt="" width={96} height={96} className={styles.avatar} aria-hidden="true" />
        <div>
          <h1 id="about-title" className={styles.title}>{AUTHOR.name}</h1>
          <p className={styles.tagline}>앞으로도 만드는 사람으로 살아가고 싶습니다.</p>
        </div>
      </header>

      <div className={styles.section}>
        <h2 className={styles.heading}>하는 일</h2>
        <p className={styles.body}>
          스타트업에서 프론트엔드 개발자로 일하며 기획 단계부터 유지 보수까지 제품의 전 과정을 경험했고, 개발자·기획자·디자이너·CS
          담당자로 이루어진 4~6인 소규모 팀을 리딩했습니다.
        </p>
        <p className={styles.body}>
          기획한 내용이 팀원들과의 긴밀한 협력 속에서 실제 서비스가 되는 과정을 가장 즐거워합니다. 그래서 팀 전체의 생산성을 높이는 일과
          사용자 친화적인 서비스를 만드는 데 관심이 많고, 좋은 사용자 경험을 위해 사용성 개선과 최적화에 꾸준히 힘을 쏟습니다.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.heading}>이 블로그</h2>
        <p className={styles.body}>
          {SITE_NAME} 은 "여전히 만들고 있다"는 뜻입니다. 개발하며 마주한 문제와 선택, 책과 컨퍼런스에서 얻은 생각,
          직접 만든 도구와 에이전트 이야기를 기록합니다. 정답보다 그때의 고민과 결정 과정을 남기려고 합니다.
        </p>
        <p className={styles.body}>
          글은 <Link href="/posts/1">전체 글</Link>에서 시간순으로, <Link href="/tags">태그</Link>에서 주제별로 볼 수 있습니다.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.heading}>링크</h2>
        <ul className={styles.links}>
          {LINKS.map((link) =>
            link.external ? (
              <li key={link.label}>
                <a href={link.href} className={styles.link} target="_blank" rel="noopener noreferrer me">
                  {link.label} <span className={styles.ext} aria-hidden="true">↗</span><span className="sr-only"> (새 탭)</span>
                </a>
              </li>
            ) : (
              <li key={link.label}>
                <Link href={link.href} className={styles.link}>{link.label}</Link>
              </li>
            )
          )}
        </ul>
      </div>
    </section>
  );
}
