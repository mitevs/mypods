import { FC } from "react";
import { useInput } from "../../hooks/useInput";

import styles from "./InputField.module.css";

export type InputFieldProps = {
  placeholder?: string;
  onChange?: (value: string) => void;
};

// custom input field with clear input feature
export const InputField: FC<InputFieldProps> = (props) => {
  const { onChange } = props;
  const { value, onChange: onInputChange, clear } = useInput(onChange);
  const { placeholder } = props;

  return (
    <div className={styles.inputField}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onInputChange}
      />
      <i className="fa-solid fa-eraser" onClick={clear}></i>
    </div>
  );
};
