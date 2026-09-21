"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { NAV_ITEMS, SITE_NAME } from "../lib/nav";
import ModeToggle from "./ModeToggle";
import styles from "./MobileNav.module.css";

/**
 * 모바일(≤639px) 메뉴. 햄버거 → 전체 화면 패널(메뉴 항목, 하단에 테마 토글).
 * Escape 또는 메뉴 항목 클릭 시 닫히고, 열려 있는 동안 body 스크롤을 잠근다.
 */
const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? "/";
  const panelId = useId();
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", onKey); };
  }, [open]);

  return (
    <div className={styles.root}>
      <button
        type="button"
        className={styles.trigger}
        aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>

      <div id={panelId} className={styles.panel} data-open={open || undefined} aria-hidden={!open}>
        <div className={styles.top}>
          <Link href="/" className={styles.brand} onClick={close} tabIndex={open ? 0 : -1}>
            <span className={styles.logo} aria-hidden="true" />
            <span>{SITE_NAME}</span>
          </Link>
          <button type="button" className={styles.trigger} aria-label="메뉴 닫기" onClick={close} tabIndex={open ? 0 : -1}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className={styles.menu} aria-label="메인 메뉴">
          {NAV_ITEMS.map((item) => {
            const active = item.isActive(pathname);
            const className = `${styles.item} ${active ? styles.active : ""}`;
            if (item.external) {
              return (
                <a key={item.key} href={item.href} className={className} target="_blank" rel="noopener noreferrer" onClick={close} tabIndex={open ? 0 : -1}>
                  {item.label} <span className={styles.ext} aria-hidden="true">↗</span><span className="sr-only"> (새 탭)</span>
                </a>
              );
            }
            return (
              <Link key={item.key} href={item.href} className={className} aria-current={active ? "page" : undefined} onClick={close} tabIndex={open ? 0 : -1}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className={styles.bottom}>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
