import type { FC } from "react";
import listStyles from "../styles.module.scss";
import styles from "./styles.module.scss";

interface Props {
  count?: number;
}

export const QuizListSkeleton: FC<Props> = ({ count = 6 }) => {
  return (
    <div
      className={`${listStyles.list} ${styles.skeletonList}`}
      aria-busy="true"
      aria-label="Loading quizzes"
    >
      {Array.from({ length: count }).map((_, idx) => (
        <QuizCardSkeleton key={idx} />
      ))}
    </div>
  );
};

const QuizCardSkeleton: FC = () => {
  return (
    <div className={styles.card}>
      <div className={`${styles.line} ${styles.title}`} />
      <div className={`${styles.line} ${styles.description}`} />
      <div className={`${styles.line} ${styles.meta}`} />
      <div className={styles.button} />
    </div>
  );
};
