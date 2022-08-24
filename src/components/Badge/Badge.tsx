import { FC, ReactNode } from "react";

import styles from "./Badge.module.css";

export type BadgeProps = {
  children?: ReactNode;
};

export const Badge: FC<BadgeProps> = (props) => {
  const { children } = props;
  return <span className={styles.badge}>{children}</span>;
};
