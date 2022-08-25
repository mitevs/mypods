import { FC, ReactNode } from "react";

import styles from "./PageTitle.module.css";

export type PageTitleProps = {
  title: string;
  children?: ReactNode;
};

export const PageTitle: FC<PageTitleProps> = (props) => {
  const { title, children } = props;
  return (
    <div className={styles.pageTitle}>
      <span>
        <h1>{title}</h1>
      </span>
      <span>{children}</span>
    </div>
  );
};
