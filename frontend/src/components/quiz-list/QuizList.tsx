import { useEffect, useState, type FC } from "react";
import type { QuizDto } from "@/types/quiz";
import { quizService } from "@/services";
import { QuizCard } from "../quiz-card/QuizCard";
import styles from "./styles.module.scss";

interface Props {
  searchTerm: string;
  page: number;
  limit: number;
  onStart: (quizId: number) => void;
  onTotalCountChange?: (count: number) => void;
  onLoadingChange?: (loading: boolean) => void;
  appendMode?: boolean;
}

const QuizList: FC<Props> = ({
  searchTerm,
  page,
  limit,
  onStart,
  onTotalCountChange,
  onLoadingChange,
  appendMode = false,
}) => {
  const [quizzes, setQuizzes] = useState<QuizDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deletingIds, setDeletingIds] = useState<Set<number>>(new Set());
  const [retryCount, setRetryCount] = useState(0);
  useEffect(() => {
    const fetchQuizzes = async () => {
      setIsLoading(true);
      onLoadingChange?.(true);
      setError(null);

      try {
        const response = await quizService.getAll({
          search: searchTerm,
          page,
          limit,
        });

        setQuizzes((prev) =>
          appendMode && page > 1
            ? [...prev, ...response.items]
            : response.items,
        );

        onTotalCountChange?.(response.meta.total);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load quizzes");
      } finally {
        setIsLoading(false);
        onLoadingChange?.(false);
      }
    };

    fetchQuizzes();

  }, [
    searchTerm,
    page,
    limit,
    appendMode,
    onLoadingChange,
    onTotalCountChange,
    retryCount,
  ]);

  const handleDelete = async (quizId: number) => {
    setDeletingIds((prev) => new Set(prev).add(quizId));

    try {
      await quizService.remove({ id: quizId });

      setQuizzes((prev) => prev.filter((q) => q.id !== quizId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete quiz");
    } finally {
      setDeletingIds((prev) => {
        const next = new Set(prev);
        next.delete(quizId);
        return next;
      });
    }
  };

  if (error) {
    return (
      <div className={styles.message}>
        {error}

        <button type="button" onClick={() => setRetryCount((prev) => prev + 1)}>
          Retry
        </button>
      </div>
    );
  }

  if (!isLoading && quizzes.length === 0) {
    return <div className={styles.message}>No quizzes found.</div>;
  }

  return (
    <div className={styles.list}>
      {quizzes.map((quiz) => (
        <QuizCard
          key={quiz.id}
          quiz={quiz}
          onStart={onStart}
          onDelete={handleDelete}
          isDeleting={deletingIds.has(quiz.id)}
        />
      ))}
    </div>
  );
};

export default QuizList;
