import type { FC } from "react";
import styles from "./styles.module.scss";

interface Props {
  currentPage: number;
  pageSize: number;
  totalQuestions: number;
}

export const QuestionProgress: FC<Props> = ({
  currentPage,
  pageSize,
  totalQuestions,
}) => {
  const rangeStart =
    totalQuestions === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const rangeEnd = Math.min(currentPage * pageSize, totalQuestions);
  const percent =
    totalQuestions === 0 ? 0 : Math.round((rangeEnd / totalQuestions) * 100);

  return (
    <div className={styles.progress}>
      <span className={styles.label}>
        {totalQuestions === 0
          ? "No questions"
          : `Questions ${rangeStart}-${rangeEnd} of ${totalQuestions}`}
      </span>
      <div
        className={styles.bar}
        role="progressbar"
        aria-valuenow={rangeEnd}
        aria-valuemin={0}
        aria-valuemax={totalQuestions}
      >
        <div
          className={styles.fill}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};
