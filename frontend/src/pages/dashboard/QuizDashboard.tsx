import { useState, useCallback, type FC } from "react";
import { QuizDashboardHeader } from "@/components/dashboard-header/QuizDashboardHeader";
import { QuizListSkeleton } from "@/components/quiz-list/skeleton/QuizListSkeleton";
import InfiniteScroll from "@/components/shared/infinite-scroll/InfiniteScroll";
import Pagination from "@/components/shared/pagination/Pagination";
import { useNavigate } from "react-router-dom";
import QuizList from "@/components/quiz-list/QuizList";
import useIsMobile from "@/hooks/useIsMobile.ts";
import styles from "./styles.module.scss";

const PAGE_SIZE = 12;

const QuizDashboard: FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const hasMore = page < totalPages;

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    setPage(1);
  }, []);

  const handlePageChange = useCallback((nextPage: number) => {
    setPage(nextPage);
  }, []);

  const handleLoadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [isLoading, hasMore]);

  const handleStart = useCallback(
    (quizId: number) => {
      navigate(`/quizzes/${quizId}`);
    },
    [navigate],
  );

  const listContent = (
    <QuizList
      key={isMobile ? "mobile" : `desktop-${page}`}
      searchTerm={searchTerm}
      page={page}
      limit={PAGE_SIZE}
      onStart={handleStart}
      onTotalCountChange={setTotalCount}
      onLoadingChange={setIsLoading}
      appendMode={isMobile}
    />
  );

  return (
    <div className={styles.dashboard}>
      <div className={styles.intro}>
        <p className={styles.eyebrow}>Your library</p>
        <h2 className={styles.title}>Your quizzes</h2>
        <p className={styles.subtitle}>
          Review your sets or jump into a quiz whenever you’re ready.
        </p>
      </div>

      <QuizDashboardHeader
        onSearchChange={handleSearchChange}
        totalCount={totalCount}
        isLoading={isLoading}
      />

      {isLoading && totalCount === 0 ? (
        <QuizListSkeleton />
      ) : isMobile ? (
        <InfiniteScroll
          onLoadMore={handleLoadMore}
          hasMore={hasMore}
          isLoading={isLoading}
        >
          {listContent}
        </InfiniteScroll>
      ) : (
        <>
          {listContent}
          <Pagination
            currentPage={page}
            totalCount={totalCount}
            limit={PAGE_SIZE}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default QuizDashboard;
