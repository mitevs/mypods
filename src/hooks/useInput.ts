import { useCallback, useState, ChangeEvent } from "react";

export const useInput = (
  onChange?: (value: string) => void,
  initialValue = ""
) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setValue(e.target.value);

      if (onChange) {
        onChange(e.target.value);
      }
    },
    [onChange]
  );

  const clear = useCallback(() => {
    setValue("");

    if (onChange) {
      onChange("");
    }
  }, [onChange]);

  return {
    value,
    clear,
    onChange: handleChange,
  };
};
