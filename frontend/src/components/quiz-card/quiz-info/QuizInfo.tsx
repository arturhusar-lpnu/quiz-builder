import type { FC } from "react";
import type { QuizDto } from "@/types/quiz";
import styles from "./styles.module.scss";

interface Props {
  quiz: QuizDto;
}

export const QuizInfo: FC<Props> = ({ quiz }) => {
  return (
    <div className={styles.info}>
      <h3 className={styles.title}>{quiz.title}</h3>
      <div className={styles.meta}>
        <span>{quiz.questionsCount} questions</span>
      </div>
    </div>
  );
};
