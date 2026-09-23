import type { Post } from "./Post";
import { AUTHOR, SITE_DESCRIPTION, SITE_LANGUAGE, SITE_NAME, SITE_URL, absoluteUrl, ogImagePath } from "./site";

/**
 * 구조화 데이터(schema.org) 빌더. 검색엔진·AI 답변 엔진이 "누가 언제 무엇을 썼는지" 를 표로 읽을 수 있게 한다.
 * @id 로 Person·WebSite 를 한 번 정의하고 글마다 참조한다.
 */
const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const toIsoKst = (yyyyMmDd: string) => `${yyyyMmDd}T00:00:00+09:00`;

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: AUTHOR.name,
    url: AUTHOR.url,
    sameAs: [...AUTHOR.sameAs],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    description: SITE_DESCRIPTION,
    inLanguage: SITE_LANGUAGE,
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
  };
}

export function blogPostingJsonLd(post: Post) {
  const url = absoluteUrl(`/${post.slug}`);
  // 한국어는 공백 단위가 어절이라 정확한 단어 수는 아니지만 schema.org wordCount 용도로는 충분하다
  const wordCount = post.content.split(/\s+/).filter(Boolean).length;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": url,
    headline: post.title,
    description: post.description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: absoluteUrl(ogImagePath(post.slug)),
    datePublished: toIsoKst(post.date),
    dateModified: toIsoKst(post.updated ?? post.date),
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    isPartOf: { "@id": WEBSITE_ID },
    inLanguage: SITE_LANGUAGE,
    keywords: post.tags ?? [],
    wordCount,
  };
}

export function collectionPageJsonLd(input: { name: string; description: string; pathname: string; posts: Post[] }) {
  const url = absoluteUrl(input.pathname);
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": url,
    name: input.name,
    description: input.description,
    url,
    isPartOf: { "@id": WEBSITE_ID },
    inLanguage: SITE_LANGUAGE,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: input.posts.map((post, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: absoluteUrl(`/${post.slug}`),
        name: post.title,
      })),
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; pathname: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.pathname),
    })),
  };
}
