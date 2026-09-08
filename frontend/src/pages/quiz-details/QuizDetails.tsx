import { useEffect, useState, type FC } from "react";
import { useParams } from "react-router-dom";
import { questionService, quizService } from "@/services";
import type { Question } from "@/types/questions";
import { QuizHeader } from "@/components/quiz-details/quiz-header/QuizHeader";
import { QuestionViewer } from "@/components/quiz-details/question-viewer/QuestionViewer";
import Pagination from "@/components/shared/pagination/Pagination";
import styles from "./styles.module.scss";
import { Loader } from "@/components/shared/loader/Loader";
import NotFoundPage from "@/pages/not-found/NotFoundPage";
import ErrorPage from "@/pages/error/ErrorPage";

interface Quiz {
  id: number;
  title: string;
  questionsCount: number;
}

const PAGE_SIZE = 5;

const QuizDetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const quizId = Number(id);

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [isQuizLoading, setIsQuizLoading] = useState(true);
  const [quizError, setQuizError] = useState<string | null>(null);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [isQuestionsLoading, setIsQuestionsLoading] = useState(true);
  const [questionsError, setQuestionsError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let cancelled = false;

    const fetchQuiz = async () => {
      setIsQuizLoading(true);
      setQuizError(null);
      try {
        const data = await quizService.getById(quizId);
        if (!cancelled) setQuiz(data);
      } catch (err) {
        if (!cancelled) {
          setQuizError(
            err instanceof Error ? err.message : "Failed to load quiz",
          );
        }
      } finally {
        if (!cancelled) setIsQuizLoading(false);
      }
    };

    fetchQuiz();

    return () => {
      cancelled = true;
    };
  }, [id, quizId]);

  useEffect(() => {
    if (!id || Number.isNaN(quizId)) return;

    let cancelled = false;

    const fetchQuestions = async () => {
      setIsQuestionsLoading(true);
      setQuestionsError(null);
      try {
        const data = await questionService.getAll({
          quizId,
          page: currentPage,
          limit: PAGE_SIZE,
        });
        if (!cancelled) setQuestions(data.items);
      } catch (err) {
        if (!cancelled) {
          setQuestionsError(
            err instanceof Error ? err.message : "Failed to load questions",
          );
        }
      } finally {
        if (!cancelled) setIsQuestionsLoading(false);
      }
    };

    fetchQuestions();

    return () => {
      cancelled = true;
    };
  }, [id, quizId, currentPage]);

  const startNumber = (currentPage - 1) * PAGE_SIZE + 1;

  if (!id || Number.isNaN(quizId)) {
    return <NotFoundPage />;
  }

  if (isQuizLoading) {
    return <Loader label="Loading quiz..." />;
  }

  if (quizError) {
    return <ErrorPage message={quizError} />;
  }

  if (!quiz) {
    return <NotFoundPage />;
  }

  return (
    <div className={styles.page}>
      <QuizHeader
        title={quiz.title}
        currentPage={currentPage}
        pageSize={PAGE_SIZE}
        totalQuestions={quiz.questionsCount}
      />

      {isQuestionsLoading ? (
        <Loader label="Loading questions..." />
      ) : questionsError ? (
        <ErrorPage message={questionsError} />
      ) : (
        <QuestionViewer questions={questions} startNumber={startNumber} />
      )}

      <Pagination
        currentPage={currentPage}
        totalCount={quiz.questionsCount}
        limit={PAGE_SIZE}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default QuizDetailPage;
