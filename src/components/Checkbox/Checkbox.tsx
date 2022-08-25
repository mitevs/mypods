import React, { FC } from "react";

import styles from "./Checkbox.module.css";

export type CheckboxProps = {
  label: string;
  onChange?: (checked: boolean) => void;
};

export const Checkbox: FC<CheckboxProps> = (props) => {
  const { label, onChange } = props;

  return (
    <label className={styles.checkbox}>
      {label}
      <input
        type="checkbox"
        onChange={(e) => {
          if (onChange) {
            onChange(e.target.checked);
          }
        }}
      />
      <span className={styles.checkmark}></span>
    </label>
  );
};
