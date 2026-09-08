import { type FC } from "react";
import { type Question } from "@/types/questions";
import { QuestionCard } from "./question-card/QuestionCard";
import { AddQuestionButton } from "./add-question-btn/AddQuestionBtn";
import styles from "./styles.module.scss";

interface Props {
  questions: Question[];
  onRemoveQuestion: (questionId: number) => void;
  onAddQuestionClick: () => void;
  removingIds?: Set<number>;
  isAddDisabled?: boolean;
}

const QuestionList: FC<Props> = ({
  questions,
  onRemoveQuestion,
  onAddQuestionClick,
  removingIds = new Set(),
  isAddDisabled = false,
}) => {
  return (
    <div className={styles.list}>
      {questions.length === 0 && (
        <p className={styles.empty}>No questions yet. Add your first question below.</p>
      )}

      {questions.map((question) => (
        <QuestionCard
          key={question.id}
          question={question}
          onRemove={onRemoveQuestion}
          isRemoving={removingIds.has(question.id)}
        />
      ))}

      <AddQuestionButton
        onClick={onAddQuestionClick}
        disabled={isAddDisabled}
      />
    </div>
  );
};

export default QuestionList;
