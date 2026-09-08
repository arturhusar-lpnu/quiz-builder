import type { FC } from "react";
import styles from "./styles.module.scss";

interface Props {
  value: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
}

export const BooleanQuestionEditor: FC<Props> = ({
  value,
  onChange,
  disabled,
}) => {
  return (
    <div className={styles.editor}>
      <label className={styles.option}>
        <input
          type="radio"
          name="boolean-answer"
          checked={value === true}
          onChange={() => onChange(true)}
          disabled={disabled}
        />
        True
      </label>
      <label className={styles.option}>
        <input
          type="radio"
          name="boolean-answer"
          checked={value === false}
          onChange={() => onChange(false)}
          disabled={disabled}
        />
        False
      </label>
    </div>
  );
};
