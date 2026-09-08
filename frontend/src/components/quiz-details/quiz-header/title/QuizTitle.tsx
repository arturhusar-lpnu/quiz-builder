import type { FC } from "react";
import styles from "./styles.module.scss";

interface Props {
  title: string;
}

export const QuizTitle: FC<Props> = ({ title }) => {
  return <h1 className={styles.title}>{title}</h1>;
};
