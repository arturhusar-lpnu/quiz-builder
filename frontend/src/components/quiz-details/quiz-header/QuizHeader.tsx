import type { FC } from "react";
import { QuizTitle } from "./title/QuizTitle";
import { QuestionProgress } from "./progress/QuizProgress";
import styles from "./styles.module.scss";

interface Props {
  title: string;
  currentPage: number;
  pageSize: number;
  totalQuestions: number;
}

export const QuizHeader: FC<Props> = ({
  title,
  currentPage,
  pageSize,
  totalQuestions,
}) => {
  return (
    <div className={styles.header}>
      <QuizTitle title={title} />
      <QuestionProgress
        currentPage={currentPage}
        pageSize={pageSize}
        totalQuestions={totalQuestions}
      />
    </div>
  );
};
