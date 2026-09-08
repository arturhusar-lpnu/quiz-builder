import { type FC } from "react";
import type { AddQuestionDto } from "@/types/questions";
import styles from "./styles.module.scss";

type QuestionType = AddQuestionDto["type"];

interface Props {
  value: QuestionType;
  onChange: (type: QuestionType) => void;
  disabled?: boolean;
}

const QUESTION_TYPES: { value: QuestionType; label: string }[] = [
  { value: "boolean", label: "True / False" },
  { value: "input", label: "Text answer" },
  { value: "checkbox", label: "Multiple choice" },
];

export const QuestionTypeSelector: FC<Props> = ({
  value,
  onChange,
  disabled = false,
}) => {
  return (
    <div
      className={styles.selector}
      role="radiogroup"
      aria-label="Question type"
    >
      {QUESTION_TYPES.map((opt) => (
        <button
          key={opt.value}
          type="button"
          role="radio"
          aria-checked={value === opt.value}
          data-selected={value === opt.value}
          disabled={disabled}
          onClick={() => onChange(opt.value)}
          className={styles.option}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
};
