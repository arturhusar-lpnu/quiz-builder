import type { FC } from "react";
import styles from "./styles.module.scss";

interface Props {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const InputQuestionEditor: FC<Props> = ({
  value,
  onChange,
  disabled,
}) => {
  return (
    <div className={styles.editor}>
      <label htmlFor="input-answer">Answer</label>
      <input
        className={styles.input}
        id="input-answer"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Expected answer"
      />
    </div>
  );
};
