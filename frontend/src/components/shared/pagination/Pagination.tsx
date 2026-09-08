import type { FC } from "react";
import styles from "./styles.module.scss";

interface Props {
  currentPage: number;
  totalCount: number;
  limit: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}

const Pagination: FC<Props> = ({
  currentPage,
  totalCount,
  limit,
  onPageChange,
  siblingCount = 1,
}) => {
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));

  if (totalPages <= 1) return null;

  const getPageNumbers = (): (number | "ellipsis")[] => {
    const pages: (number | "ellipsis")[] = [];
    const start = Math.max(2, currentPage - siblingCount);
    const end = Math.min(totalPages - 1, currentPage + siblingCount);

    pages.push(1);
    if (start > 2) pages.push("ellipsis");
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages - 1) pages.push("ellipsis");
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <button
        type="button"
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={styles.control}
        aria-label="Previous page"
      >
        Prev
      </button>

      {getPageNumbers().map((page, idx) =>
        page === "ellipsis" ? (
          <span key={`ellipsis-${idx}`} className={styles.ellipsis}>
            &hellip;
          </span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={styles.page}
            aria-current={page === currentPage ? "page" : undefined}
            data-active={page === currentPage}
          >
            {page}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={styles.control}
        aria-label="Next page"
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;
