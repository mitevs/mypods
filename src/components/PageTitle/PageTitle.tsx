import { FC, ReactNode } from "react";

import styles from "./PageTitle.module.css";

export type PageTitleProps = {
  title: string;
  children?: ReactNode;
};

// allwos for rendering the page title and custom page controls where the filters are injected in the App component when the composition is done
export const PageTitle: FC<PageTitleProps> = (props) => {
  const { title, children } = props;
  return (
    <div className={styles.pageTitle}>
      <h1>{title}</h1>
      <div className={styles.pageControls}>{children}</div>
    </div>
  );
};
