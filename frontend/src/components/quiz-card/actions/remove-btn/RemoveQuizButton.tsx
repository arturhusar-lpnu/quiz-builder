import type { FC } from "react";
import styles from "./styles.module.scss";
import { IoClose } from "react-icons/io5";

interface Props {
  visible: boolean;
  onClick: (e: React.MouseEvent) => void;
  disabled?: boolean;
}

export const RemoveQuizButton: FC<Props> = ({ visible, onClick, disabled }) => {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
      aria-label="Delete quiz"
      data-visible={visible}
    >
      <IoClose aria-hidden="true" />
    </button>
  );
};
