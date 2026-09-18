import Link from "next/link";
import styles from "./Header.module.css";
import ModeToggle from "./ModeToggle";
import MobileNav from "./MobileNav";

const Header = () => {
  return (
    <header className="flex items-center justify-between py-10">
      <div>
        <Link href="/" className={styles.brand}>
          <span className={styles.logo} aria-hidden="true" />
          <span>Still Making</span>
        </Link>
      </div>
      <div className="flex items-center">
        <div className="hidden sm:block">
          <Link href="/posts/1" passHref>
            <span className="p-1 font-medium cursor-pointer sm:p-4">Posts</span>
          </Link>
          
          <Link href="/tags" passHref>
            <span className="p-1 font-medium cursor-pointer sm:p-4">Tags</span>
          </Link>
          
          <Link
            href="https://substantial-celsius-cbb.notion.site/f6160283ae074dd698fe85873462701b?pvs=4"
            passHref
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 font-medium cursor-pointer sm:p-4"
          >
            About
          </Link>
        </div>
        <ModeToggle />
        <MobileNav />
      </div>
    </header>
  );
};

export default Header;
