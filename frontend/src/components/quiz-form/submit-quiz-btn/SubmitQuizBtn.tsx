import { type FC } from "react";
import styles from "./styles.module.scss";

interface Props {
  isSubmitting?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

export const SubmitQuizButton: FC<Props> = ({
  isSubmitting = false,
  disabled = false,
  onClick,
}) => (
  <button
    type="button"
    className={styles.button}
    onClick={onClick}
    disabled={disabled || isSubmitting}
  >
    {isSubmitting ? "Submitting..." : "Submit quiz"}
  </button>
);
