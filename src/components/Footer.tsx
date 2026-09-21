import { ABOUT_LINK } from "../lib/nav";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <span>{`© ${new Date().getFullYear()} makim`}</span>
      <a href={ABOUT_LINK.href} className={styles.link} target="_blank" rel="noopener noreferrer">
        {ABOUT_LINK.label} <span aria-hidden="true">↗</span><span className="sr-only"> (새 탭)</span>
      </a>
    </footer>
  );
};

export default Footer;
