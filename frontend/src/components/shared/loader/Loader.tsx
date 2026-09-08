import type { FC } from "react";
import styles from "./styles.module.scss";

interface Props {
  label?: string;
}

export const Loader: FC<Props> = ({ label = "Loading..." }) => {
  return (
    <div className={styles.loader} role="status" aria-label={label}>
      <span className={styles.spinner} aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
};
