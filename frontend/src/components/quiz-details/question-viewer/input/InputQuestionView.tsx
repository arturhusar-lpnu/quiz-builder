import type { FC } from "react";
import type { InputQuestion } from "@/types/questions";
import styles from "./styles.module.scss";

interface Props {
  question: InputQuestion;
}

export const InputQuestionView: FC<Props> = ({ question }) => {
  return (
    <div className={styles.view}>
      <input
        type="text"
        value={question.answer}
        readOnly
        disabled
        className={styles.field}
      />
    </div>
  );
};
