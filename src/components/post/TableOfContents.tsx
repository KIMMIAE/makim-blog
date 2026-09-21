"use client";

import { useEffect, useRef, useState } from "react";
import type { TocItem } from "../../lib/mdx";
import styles from "./TableOfContents.module.css";

/** 제목이 화면 위 이 거리(px) 안에 들어오면 그 섹션을 읽고 있다고 본다 */
const ACTIVE_OFFSET = 72;

/**
 * 현재 섹션 판정 기준선(뷰포트 기준 px).
 * 보통은 72px 고정. 마지막 한 화면 분량의 스크롤 구간에서는 화면 아래까지 내려간다.
 * 페이지 끝의 짧은 섹션들은 스크롤이 더 내려가지 않아 고정 기준선에 닿을 수 없기 때문에,
 * 이 구간에서만 제목이 화면에 들어오는 순서대로 활성화되게 한다.
 */
function readingLine(): number {
  const vh = window.innerHeight;
  const maxScroll = Math.max(0, document.documentElement.scrollHeight - vh);
  const tailStart = maxScroll - vh;
  const progress = tailStart <= 0 ? window.scrollY / Math.max(1, maxScroll) : Math.max(0, (window.scrollY - tailStart) / vh);
  return ACTIVE_OFFSET + Math.min(1, progress) * (vh - ACTIVE_OFFSET - 1);
}

function useActiveHeading(items: TocItem[]) {
  const [active, setActive] = useState<string | null>(items[0]?.id ?? null);
  /** 목차를 클릭해 이동한 항목. 사용자가 직접 스크롤하기 전까지는 기하 계산보다 우선한다. */
  const pinned = useRef<string | null>(null);

  useEffect(() => {
    if (items.length === 0) return;
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    let frame = 0;
    const update = () => {
      frame = 0;
      if (pinned.current) return;
      const line = readingLine();
      let current = headings[0]?.id ?? null;
      for (const el of headings) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
        else break;
      }
      setActive(current);
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    const unpin = () => { if (pinned.current) { pinned.current = null; onScroll(); } };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("wheel", unpin, { passive: true });
    window.addEventListener("touchstart", unpin, { passive: true });
    window.addEventListener("keydown", unpin);
    return () => {
      window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll);
      window.removeEventListener("wheel", unpin); window.removeEventListener("touchstart", unpin); window.removeEventListener("keydown", unpin);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [items]);

  const pin = (id: string) => { pinned.current = id; setActive(id); };
  return { active, pin };
}

/**
 * 글 목차. h2 아래에 h3 를 중첩한 목록을 그리고 현재 읽는 섹션을 강조한다.
 * 배치(우측 고정 / 상단 펼침 / 상단 접이식)는 부모가 담당한다.
 */
export function TableOfContents({ items, ariaLabel = "목차" }: { items: TocItem[]; ariaLabel?: string }) {
  const { active, pin } = useActiveHeading(items);
  if (items.length === 0) return null;

  // h2 → 그 아래 h3 들로 묶는다. 첫 항목이 h3 이면 h2 없는 그룹으로 둔다.
  const groups: { head: TocItem | null; children: TocItem[] }[] = [];
  for (const item of items) {
    if (item.depth === 2 || groups.length === 0) groups.push({ head: item.depth === 2 ? item : null, children: item.depth === 3 ? [item] : [] });
    else groups[groups.length - 1].children.push(item);
  }

  const link = (item: TocItem) => (
    <a href={`#${item.id}`} onClick={() => pin(item.id)} className={`${styles.link} ${active === item.id ? styles.active : ""}`} aria-current={active === item.id ? "location" : undefined}>
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
