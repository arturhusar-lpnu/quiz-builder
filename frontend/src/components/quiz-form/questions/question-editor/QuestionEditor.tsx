import { useState, useCallback, type FC } from "react";
import type { AddQuestionDto } from "@/types/questions";
import { QuestionTypeSelector } from "./type-selector/QuestionTypeSelector";
import { BooleanQuestionEditor } from "./boolean/BooleanEditor";
import { InputQuestionEditor } from "./input/InputEditor";
import { CheckboxQuestionEditor } from "./checkbox/CheckboxEditor";
import styles from "./styles.module.scss";

type QuestionType = AddQuestionDto["type"];

interface Props {
  quizId: number;
  onSubmit: (dto: AddQuestionDto) => void | Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export const QuestionEditor: FC<Props> = ({
  quizId,
  onSubmit,
  onCancel,
  isSubmitting = false,
}) => {
  const [type, setType] = useState<QuestionType>("boolean");
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [booleanAnswer, setBooleanAnswer] = useState(true);
  const [inputAnswer, setInputAnswer] = useState("");
  const [options, setOptions] = useState<string[]>(["", ""]);
  const [correctOptionIdx, setCorrectOptionIdx] = useState<Set<number>>(
    new Set(),
  );

  const handleTypeChange = useCallback((next: QuestionType) => {
    setType(next);
    setError(null);
  }, []);

  const buildDto = (): AddQuestionDto | null => {
    const questionTitle = title.trim();
    if (!questionTitle) {
      setError("Question title can't be empty");
      return null;
    }

    if (type === "boolean") {
      return { quizId, title: questionTitle, type: "boolean", answer: booleanAnswer };
    }

    if (type === "input") {
      if (!inputAnswer.trim()) {
        setError("Answer can't be empty");
        return null;
      }
      return { quizId, title: questionTitle, type: "input", answer: inputAnswer.trim() };
    }

    const cleanedOptions = options.map((o) => o.trim());
    if (cleanedOptions.some((o) => !o)) {
      setError("All options must have text");
      return null;
    }
    if (cleanedOptions.length < 2) {
      setError("Add at least 2 options");
      return null;
    }
    if (correctOptionIdx.size === 0) {
      setError("Mark at least one option as correct");
      return null;
    }

    return {
      quizId,
      title: questionTitle,
      type: "checkbox",
      options: cleanedOptions.map((option) => ({ option })),
      answers: Array.from(correctOptionIdx),
    };
  };

  const handleSubmit = async () => {
    setError(null);
    const dto = buildDto();
    if (!dto) return;
    await onSubmit(dto);
  };

  return (
    <div className={styles.editor}>
      <div className={styles.questionTitle}>
        <label htmlFor="question-title">Question</label>
        <input
          id="question-title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          disabled={isSubmitting}
          placeholder="Enter your question"
        />
      </div>

      <QuestionTypeSelector
        value={type}
        onChange={handleTypeChange}
        disabled={isSubmitting}
      />

      <div className={styles.body}>
        {type === "boolean" && (
          <BooleanQuestionEditor
            value={booleanAnswer}
            onChange={setBooleanAnswer}
            disabled={isSubmitting}
          />
        )}

        {type === "input" && (
          <InputQuestionEditor
            value={inputAnswer}
            onChange={setInputAnswer}
            disabled={isSubmitting}
          />
        )}

        {type === "checkbox" && (
          <CheckboxQuestionEditor
            options={options}
            onOptionsChange={setOptions}
            correctIndexes={correctOptionIdx}
            onCorrectIndexesChange={setCorrectOptionIdx}
            disabled={isSubmitting}
          />
        )}
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.actions}>
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className={styles.cancel}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={styles.submit}
        >
          {isSubmitting ? "Adding..." : "Add question"}
        </button>
      </div>
    </div>
  );
};
