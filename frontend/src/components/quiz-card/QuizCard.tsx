import { useState } from "react";
import type { QuizDto } from "@/types/quiz";
import { QuizInfo } from "./quiz-info/QuizInfo";
import { StartQuizButton } from "./actions/start-btn/StartQuizButton";
import { RemoveQuizButton } from "./actions/remove-btn/RemoveQuizButton";
import styles from "./styles.module.scss";

interface QuizCardProps {
  quiz: QuizDto;
  onStart: (quizId: number) => void;
  onDelete: (quizId: number) => void;
  isDeleting?: boolean;
}

export const QuizCard: React.FC<QuizCardProps> = ({
  quiz,
  onStart,
  onDelete,
  isDeleting = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(quiz.id);
  };

  return (
    <div
      className={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-deleting={isDeleting}
    >
      <QuizInfo quiz={quiz} />

      <StartQuizButton onClick={() => onStart(quiz.id)} disabled={isDeleting} />

      <RemoveQuizButton
        visible={isHovered}
        onClick={handleDeleteClick}
        disabled={isDeleting}
      />
    </div>
  );
};
