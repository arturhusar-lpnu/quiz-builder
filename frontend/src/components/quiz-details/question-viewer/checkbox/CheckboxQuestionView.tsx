import type { FC } from "react";
import type { CheckboxQuestion } from "@/types/questions";
import styles from "./styles.module.scss";

interface Props {
  question: CheckboxQuestion;
}

export const CheckboxQuestionView: FC<Props> = ({ question }) => {
  return (
    <ul className={styles.options}>
      {question.options.map((opt) => {
        const isCorrect = question.answers.includes(opt.id);
        return (
          <li
            key={opt.id}
            className={styles.option}
            data-correct={isCorrect}
          >
            <input type="checkbox" checked={isCorrect} readOnly disabled />
            <span>{opt.option}</span>
          </li>
        );
      })}
    </ul>
  );
};
