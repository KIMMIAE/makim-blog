import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <span>{`© ${new Date().getFullYear()} makim`}</span>
    </footer>
  );
};

export default Footer;
