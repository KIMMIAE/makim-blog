"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "../lib/nav";
import styles from "./Header.module.css";

/** 헤더 메뉴 링크. 현재 경로에 해당하는 항목을 강조한다. */
export function NavLinks() {
  const pathname = usePathname() ?? "/";
  return (
    <>
      {NAV_ITEMS.map((item) => {
        const active = item.isActive(pathname);
        return (
          <Link key={item.key} href={item.href} className={`${styles.link} ${active ? styles.active : ""}`} aria-current={active ? "page" : undefined}>
            {item.label}
          </Link>
        );
      })}
    </>
  );
}
