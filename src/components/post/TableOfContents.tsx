"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "../../lib/mdx";
import styles from "./TableOfContents.module.css";

/** 화면 상단에서 이 거리(px) 안에 들어온 마지막 제목을 현재 섹션으로 본다 */
const ACTIVE_OFFSET = 72;

function useActiveHeading(items: TocItem[]) {
  const [active, setActive] = useState<string | null>(items[0]?.id ?? null);
  useEffect(() => {
    if (items.length === 0) return;
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = headings[0]?.id ?? null;
      for (const el of headings) {
        if (el.getBoundingClientRect().top <= ACTIVE_OFFSET) current = el.id;
        else break;
      }
      // 페이지 끝까지 스크롤했으면 마지막 항목을 활성화
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) current = headings.at(-1)?.id ?? current;
      setActive(current);
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (frame) window.cancelAnimationFrame(frame); };
  }, [items]);
  return active;
}

/**
 * 글 목차. h2 아래에 h3 를 중첩한 목록을 그리고 현재 읽는 섹션을 강조한다.
 * 배치(우측 고정 / 상단 펼침 / 상단 접이식)는 부모가 담당한다.
 */
export function TableOfContents({ items, ariaLabel = "목차" }: { items: TocItem[]; ariaLabel?: string }) {
  const active = useActiveHeading(items);
  if (items.length === 0) return null;

  // h2 → 그 아래 h3 들로 묶는다. 첫 항목이 h3 이면 h2 없는 그룹으로 둔다.
  const groups: { head: TocItem | null; children: TocItem[] }[] = [];
  for (const item of items) {
    if (item.depth === 2 || groups.length === 0) groups.push({ head: item.depth === 2 ? item : null, children: item.depth === 3 ? [item] : [] });
    else groups[groups.length - 1].children.push(item);
  }

  const link = (item: TocItem) => (
    <a href={`#${item.id}`} className={`${styles.link} ${active === item.id ? styles.active : ""}`} aria-current={active === item.id ? "location" : undefined}>
      {item.text}
    </a>
  );

  return (
    <nav className={styles.toc} aria-label={ariaLabel}>
      <ol className={styles.list}>
        {groups.map((g, i) => (
          <li key={g.head?.id ?? `g${i}`}>
            {g.head ? link(g.head) : null}
            {g.children.length ? <ol className={styles.sub}>{g.children.map((c) => <li key={c.id}>{link(c)}</li>)}</ol> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
