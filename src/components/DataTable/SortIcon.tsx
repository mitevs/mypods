import React, { FC } from "react";

import styles from "./SortIcon.module.css";

export type SortIconProps = {
  dir?: "asc" | "desc";
};

// generates the sort icons in the headers, makes it easier to keep the DataTable a bit cleaner
export const SortIcon: FC<SortIconProps> = (props) => {
  const { dir } = props;

  return (
    <i
      className={`fa-solid fa-sort${
        dir === "asc" ? "-up" : dir === "desc" ? "-down" : ""
      } ${styles.sortIcon}`}
    ></i>
  );
};
