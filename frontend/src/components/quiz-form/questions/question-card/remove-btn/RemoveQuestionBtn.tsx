import type { FC } from "react";
import styles from "./styles.module.scss";

interface Props {
  onClick: () => void;
  disabled?: boolean;
}

const RemoveQuestionButton: FC<Props> = ({ onClick, disabled }) => {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
      aria-label="Remove question"
    >
      Remove
    </button>
  );
};

export default RemoveQuestionButton;
