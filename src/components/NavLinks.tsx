"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "../lib/nav";
import styles from "./Header.module.css";

/** 헤더 메뉴 링크. 현재 경로에 해당하는 항목을 강조하고, 외부 링크는 새 탭 + ↗ 표시. */
export function NavLinks() {
  const pathname = usePathname() ?? "/";
  return (
    <>
      {NAV_ITEMS.map((item) => {
        const active = item.isActive(pathname);
        const className = `${styles.link} ${active ? styles.active : ""}`;
        if (item.external) {
          return (
            <a key={item.key} href={item.href} className={className} target="_blank" rel="noopener noreferrer">
              {item.label} <span className={styles.ext} aria-hidden="true">↗</span><span className="sr-only"> (새 탭)</span>
            </a>
          );
        }
        return (
          <Link key={item.key} href={item.href} className={className} aria-current={active ? "page" : undefined}>
            {item.label}
          </Link>
        );
      })}
    </>
  );
}
