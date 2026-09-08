interface Props {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  maxLength?: number;
}

import styles from "./styles.module.scss";

export const QuizTitleField: React.FC<Props> = ({
  value,
  onChange,
  error,
  maxLength = 120,
}) => {
  return (
    <div className={styles.field}>
      <label htmlFor="quiz-title" className={styles.label}>
        Quiz title
      </label>
      <input
        id="quiz-title"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
        placeholder="Enter quiz title"
        aria-invalid={!!error}
        aria-describedby={error ? "quiz-title-error" : undefined}
        className={styles.input}
      />
      <div className={styles.footer}>
        {error && (
          <span id="quiz-title-error" className={styles.error}>
            {error}
          </span>
        )}
        <span className={styles.count}>
          {value.length}/{maxLength}
        </span>
      </div>
    </div>
  );
};
