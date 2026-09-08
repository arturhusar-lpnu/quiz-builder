import { useRef, useEffect, useCallback, type FC, type ReactNode } from "react";
import styles from "./styles.module.scss";

interface Props {
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
  children: ReactNode;
  rootMargin?: string;
}

const InfiniteScroll: FC<Props> = ({
  onLoadMore,
  hasMore,
  isLoading,
  children,
  rootMargin = "200px",
}) => {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const loadingRef = useRef(isLoading);

  useEffect(() => {
    loadingRef.current = isLoading;
  }, [isLoading]);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore && !loadingRef.current) {
        loadingRef.current = true;
        onLoadMore();
      }
    },
    [hasMore, onLoadMore],
  );

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin,
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, [handleIntersect, rootMargin]);

  return (
    <div className={styles.container}>
      {children}
      <div ref={sentinelRef} className={styles.sentinel} aria-hidden="true" />
      {isLoading && (
        <div className={styles.loading} role="status">Loading more...</div>
      )}
      {!hasMore && !isLoading && (
        <div className={styles.end}>No more quizzes</div>
      )}
    </div>
  );
};

export default InfiniteScroll;
