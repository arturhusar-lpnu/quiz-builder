import { useEffect, useRef, useState, type FC } from "react";
import styles from "./styles.module.scss";
import { IoClose } from "react-icons/io5";

interface Props {
  onChange: (value: string) => void;
  debounceMs?: number;
  placeholder?: string;
}

export const SearchBar: FC<Props> = ({
  onChange,
  debounceMs = 300,
  placeholder = "Search quizzes...",
}) => {
  const [value, setValue] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;

    setValue(next);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      onChange(next);
    }, debounceMs);
  };

  const handleClear = () => {
    setValue("");

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    onChange("");
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return (
    <div className={styles.searchBar}>
      <span className={styles.icon} aria-hidden="true">⌕</span>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label="Search quizzes"
      />

      {value && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className={styles.clear}
        >
          <IoClose aria-hidden="true" />
        </button>
      )}
    </div>
  );
};
