import type { FC } from "react";
import styles from "./styles.module.scss";
import { IoClose } from "react-icons/io5";

interface Props {
  options: string[];
  onOptionsChange: (options: string[]) => void;
  correctIndexes: Set<number>;
  onCorrectIndexesChange: (indexes: Set<number>) => void;
  disabled?: boolean;
}

export const CheckboxQuestionEditor: FC<Props> = ({
  options,
  onOptionsChange,
  correctIndexes,
  onCorrectIndexesChange,
  disabled,
}) => {
  const handleOptionTextChange = (idx: number, text: string) => {
    const next = [...options];
    next[idx] = text;
    onOptionsChange(next);
  };

  const handleToggleCorrect = (idx: number) => {
    const next = new Set(correctIndexes);
    if (next.has(idx)) {
      next.delete(idx);
    } else {
      next.add(idx);
    }
    onCorrectIndexesChange(next);
  };

  const handleAddOption = () => {
    onOptionsChange([...options, ""]);
  };

  const handleRemoveOption = (idx: number) => {
    onOptionsChange(options.filter((_, i) => i !== idx));
    const next = new Set(
      Array.from(correctIndexes)
        .filter((i) => i !== idx)
        .map((i) => (i > idx ? i - 1 : i)),
    );
    onCorrectIndexesChange(next);
  };

  return (
    <div className={styles.editor}>
      {options.map((option, idx) => (
        <div key={idx} className={styles.option}>
          <input
            type="checkbox"
            checked={correctIndexes.has(idx)}
            onChange={() => handleToggleCorrect(idx)}
            disabled={disabled}
            aria-label={`Mark option ${idx + 1} as correct`}
          />
          <input
            type="text"
            value={option}
            onChange={(e) => handleOptionTextChange(idx, e.target.value)}
            disabled={disabled}
            placeholder={`Option ${idx + 1}`}
          />
          <button
            type="button"
            onClick={() => handleRemoveOption(idx)}
            disabled={disabled || options.length <= 2}
            aria-label={`Remove option ${idx + 1}`}
          >
            <IoClose aria-hidden="true" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddOption}
        disabled={disabled}
          className={styles.add}
      >
        + Add option
      </button>
    </div>
  );
};
