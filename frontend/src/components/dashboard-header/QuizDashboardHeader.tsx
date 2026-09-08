import type { FC } from "react";
import { SearchBar } from "../shared/search-bar/SearchBar";
import { QuizCount } from "./quiz-count/QuizCount";
import styles from "./styles.module.scss";

type Props = {
  onSearchChange: (value: string) => void;
  totalCount: number;
  isLoading?: boolean;
  debounceMs?: number;
};

export const QuizDashboardHeader: FC<Props> = ({
  onSearchChange,
  totalCount,
  isLoading = false,
  debounceMs = 300,
}) => {
  return (
    <div className={styles.header}>
      <SearchBar onChange={onSearchChange} debounceMs={debounceMs} />
      <QuizCount count={totalCount} isLoading={isLoading} />
    </div>
  );
};
