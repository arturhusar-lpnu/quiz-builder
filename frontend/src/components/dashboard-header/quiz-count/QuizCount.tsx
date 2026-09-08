import type { FC } from "react";
import styles from "./styles.module.scss";

interface Props {
  count: number;
  isLoading?: boolean;
}

export const QuizCount: FC<Props> = ({ count, isLoading = false }) => {
  if (isLoading) {
    return <span className={`${styles.count} ${styles.loading}`}>Loading...</span>;
  }

  return (
    <span className={styles.count}>
      {count} {count === 1 ? "quiz" : "quizzes"}
    </span>
  );
};
