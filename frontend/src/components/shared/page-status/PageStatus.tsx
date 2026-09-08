import type { FC, ReactNode } from "react";
import styles from "./styles.module.scss";

type StatusVariant = "not-found" | "error";

interface Props {
  variant: StatusVariant;
  title: string;
  message: string;
  action?: ReactNode;
}

export const PageStatus: FC<Props> = ({ variant, title, message, action }) => {
  return (
    <section className={styles.status} data-variant={variant}>
      <div className={styles.icon} aria-hidden="true">
        {variant === "not-found" ? "?" : "!"}
      </div>
      <p className={styles.eyebrow}>
        {variant === "not-found" ? "404 · Page not found" : "Something went wrong"}
      </p>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.message}>{message}</p>
      {action && <div className={styles.action}>{action}</div>}
    </section>
  );
};
