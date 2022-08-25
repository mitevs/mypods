import { FC } from "react";

import styles from "./Footer.module.css";

export const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <strong>Stefan Mitev</strong>
      <a className={styles.footerLink} href="mailto:stefomitev@gmail.com">
        stefomitev@gmail.com
      </a>
    </footer>
  );
};
