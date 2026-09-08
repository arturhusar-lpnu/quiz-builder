import type { FC } from "react";
import styles from "./styles.module.scss";

interface Props {
  onClick: () => void;
  disabled?: boolean;
}

export const StartQuizButton: FC<Props> = ({ onClick, disabled }) => {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
    >
      Start
    </button>
  );
};
