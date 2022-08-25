import { FC, HTMLAttributes } from "react";
import { Checkbox } from "../Checkbox";

export type MultiCheckboxProps = {
  options: { value: string; label: string }[];
  onChange?: (value: string, checked: boolean) => void;
} & Omit<HTMLAttributes<HTMLElement>, "onChange">; // allow for various html attributes, need className to allow customizatioin on the root element, but avoid onChange, because we are redefining it here

export const MultiCheckbox: FC<MultiCheckboxProps> = (props) => {
  const { options, onChange, className } = props;

  return (
    <div className={className}>
      {options.map(({ value, label }) => (
        <Checkbox
          key={value}
          label={label}
          onChange={(checked) => {
            if (onChange) {
              onChange(value, checked);
            }
          }}
        />
      ))}
    </div>
  );
};
