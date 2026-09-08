import type { FC } from "react";
import type { Question } from "@/types/questions";
import { BooleanQuestionView } from "./boolean/BooleanQuestionView";
import { InputQuestionView } from "./input/InputQuestionView";
import { CheckboxQuestionView } from "./checkbox/CheckboxQuestionView";
import styles from "./styles.module.scss";

interface Props {
  questions: Question[];
  startNumber: number;
}

export const QuestionViewer: FC<Props> = ({ questions, startNumber }) => {
  if (questions.length === 0) {
    return <p className={styles.empty}>No questions to show.</p>;
  }

  return (
    <div className={styles.viewer}>
      {questions.map((question, idx) => (
        <div key={question.id} className={styles.item}>
          <div className={styles.itemHeader}>
            <QuestionNumber number={startNumber + idx} />
            <span className={styles.itemTitle}>
              {question.title}
            </span>
            <span
              className={`${styles.badge} ${styles[question.type]}`}
            >
              {question.type}
            </span>
          </div>

          <div className={styles.itemBody}>
            {question.type === "boolean" && (
              <BooleanQuestionView question={question} />
            )}
            {question.type === "input" && (
              <InputQuestionView question={question} />
            )}
            {question.type === "checkbox" && (
              <CheckboxQuestionView question={question} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

const QuestionNumber = ({ number }: { number: number }) => {
  return <span className={styles.number}>{number}.</span>;
};
