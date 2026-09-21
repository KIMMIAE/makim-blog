import Link from "next/link";
import { SITE_NAME } from "../lib/nav";
import styles from "./Header.module.css";
import ModeToggle from "./ModeToggle";
import MobileNav from "./MobileNav";
import { NavLinks } from "./NavLinks";

const Header = () => {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.brand}>
        <span className={styles.logo} aria-hidden="true" />
        <span>{SITE_NAME}</span>
      </Link>
      <div className={styles.right}>
        <nav className={styles.nav} aria-label="메인 메뉴">
          <NavLinks />
        </nav>
        <ModeToggle />
        <MobileNav />
      </div>
    </header>
  );
};

export default Header;
