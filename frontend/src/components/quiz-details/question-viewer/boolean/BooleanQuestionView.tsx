import type { FC } from "react";
import type { BooleanQuestion } from "@/types/questions";
import styles from "./styles.module.scss";

interface Props {
  question: BooleanQuestion;
}

export const BooleanQuestionView: FC<Props> = ({ question }) => {
  return (
    <div className={styles.options}>
      <label
        className={styles.option}
        data-selected={question.answer === true}
      >
        <input
          type="radio"
          checked={question.answer === true}
          readOnly
          disabled
        />
        True
      </label>
      <label
        className={styles.option}
        data-selected={question.answer === false}
      >
        <input
          type="radio"
          checked={question.answer === false}
          readOnly
          disabled
        />
        False
      </label>
    </div>
  );
};
