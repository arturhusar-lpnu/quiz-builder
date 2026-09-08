import { questionService, quizService } from "@/services";
import type { AddQuestionDto, Question } from "@/types/questions";
import { useState, useCallback, type FC, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { QuizTitleField } from "./quiz-title-field/QuizTitleField";
import QuestionList from "./questions/QuestionsFiled";
import { SubmitQuizButton } from "./submit-quiz-btn/SubmitQuizBtn";
import { QuestionEditor } from "./questions/question-editor/QuestionEditor";
import styles from "./styles.module.scss";

export const QuizForm: FC = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState<string | undefined>();
  const [isCreatingQuiz, setIsCreatingQuiz] = useState(false);
  const [createQuizError, setCreateQuizError] = useState<string | null>(null);

  const [quizId, setQuizId] = useState<number | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [removingIds, setRemovingIds] = useState<Set<number>>(new Set());
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [isAddingQuestionPending, setIsAddingQuestionPending] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const handleCreateQuiz = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!title.trim()) {
        setTitleError("Title is required");
        return;
      }
      setTitleError(undefined);
      setCreateQuizError(null);
      setIsCreatingQuiz(true);

      try {
        const created = await quizService.create({ title });
        setQuizId(created.id);
      } catch (err) {
        setCreateQuizError(
          err instanceof Error ? err.message : "Failed to create quiz",
        );
      } finally {
        setIsCreatingQuiz(false);
      }
    },
    [title],
  );

  const handleRemoveQuestion = useCallback(async (questionId: number) => {
    setRemovingIds((prev) => new Set(prev).add(questionId));
    try {
      await quizService.remove({ id: questionId });
      setQuestions((prev) => prev.filter((q) => q.id !== questionId));
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Failed to remove question",
      );
    } finally {
      setRemovingIds((prev) => {
        const next = new Set(prev);
        next.delete(questionId);
        return next;
      });
    }
  }, []);

  const handleAddQuestionClick = useCallback(() => {
    setIsAddingQuestion(true);
  }, []);

  const handleQuestionCreated = useCallback(async (dto: AddQuestionDto) => {
    setIsAddingQuestionPending(true);
    try {
      const created = await questionService.create(dto);
      setQuestions((prev) => [...prev, created]);
      setIsAddingQuestion(false);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Failed to add question",
      );
    } finally {
      setIsAddingQuestionPending(false);
    }
  }, []);

  const handleSubmit = useCallback(() => {
    if (!quizId) return;
    setIsSubmitting(true);
    setSubmitError(null);
    navigate(`/quizzes/${quizId}`);
  }, [quizId, navigate]);

  if (!quizId) {
    return (
      <form className={styles.form} onSubmit={handleCreateQuiz}>
        <QuizTitleField value={title} onChange={setTitle} error={titleError} />

        {createQuizError && <p className={styles.error}>{createQuizError}</p>}

        <button
          className={styles.primaryButton}
          type="submit"
          disabled={isCreatingQuiz}
        >
          {isCreatingQuiz ? "Creating..." : "Create quiz"}
        </button>
      </form>
    );
  }

  return (
    <div className={styles.form}>
      <h2 className={styles.formTitle}>{title}</h2>

      <QuestionList
        questions={questions}
        onRemoveQuestion={handleRemoveQuestion}
        onAddQuestionClick={handleAddQuestionClick}
        removingIds={removingIds}
        isAddDisabled={isAddingQuestion || isSubmitting}
      />

      {isAddingQuestion && (
        <QuestionEditor
          quizId={quizId}
          onSubmit={handleQuestionCreated}
          onCancel={() => setIsAddingQuestion(false)}
          isSubmitting={isAddingQuestionPending}
        />
      )}

      {submitError && <p className={styles.error}>{submitError}</p>}

      <SubmitQuizButton
        isSubmitting={isSubmitting}
        disabled={questions.length === 0 || isAddingQuestion}
        onClick={handleSubmit}
      />
    </div>
  );
};
