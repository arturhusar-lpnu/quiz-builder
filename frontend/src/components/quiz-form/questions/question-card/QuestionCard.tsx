import type { FC } from "react";
import type { Question } from "@/types/questions";
import RemoveQuestionButton from "./remove-btn/RemoveQuestionBtn";
import { QuestionSummary } from "../question-summary/QuestionSummary";
import styles from "./styles.module.scss";

interface Props {
  question: Question;
  onRemove: (questionId: number) => void;
  isRemoving?: boolean;
}

export const QuestionCard: FC<Props> = ({
  question,
  onRemove,
  isRemoving = false,
}) => {
  return (
    <div className={styles.card} data-removing={isRemoving}>
      <QuestionSummary question={question} />
      <div className={styles.actions}>
        <RemoveQuestionButton
          onClick={() => onRemove(question.id)}
          disabled={isRemoving}
        />
      </div>
    </div>
  );
};
