import type { FC } from "react";
import type {
  Question,
  BooleanQuestion,
  CheckboxQuestion,
  InputQuestion,
} from "@/types/questions";
import styles from "./styles.module.scss";

interface Props {
  question: Question;
}

export const QuestionSummary: React.FC<Props> = ({ question }) => {
  return (
    <div className={styles.summary}>
      <div className={styles.header}>
        <span className={styles.title}>{question.title}</span>
        <span
          className={`${styles.badge} ${styles[question.type]}`}
        >
          {question.type}
        </span>
      </div>

      <div className={styles.body}>
        {question.type === "boolean" && <BooleanSummary question={question} />}
        {question.type === "input" && <InputSummary question={question} />}
        {question.type === "checkbox" && (
          <CheckboxSummary question={question} />
        )}
      </div>
    </div>
  );
};

const BooleanSummary: FC<{ question: BooleanQuestion }> = ({ question }) => {
  return (
    <div className={styles.answer}>
      <span>Answer:</span>
      <strong>{question.answer ? "True" : "False"}</strong>
    </div>
  );
};

const InputSummary: React.FC<{ question: InputQuestion }> = ({ question }) => {
  return (
    <div className={styles.answer}>
      <span>Answer:</span>
      <strong>{question.answer || "(empty)"}</strong>
    </div>
  );
};

const CheckboxSummary: FC<{ question: CheckboxQuestion }> = ({ question }) => {
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
            <input type="checkbox" checked={isCorrect} readOnly />
            <span>{opt.option}</span>
          </li>
        );
      })}
    </ul>
  );
};
