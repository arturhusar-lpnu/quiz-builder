import { QuizForm } from "@/components/quiz-form/QuizForm";
import type { FC } from "react";
import styles from "./styles.module.scss";

const QuizCreate: FC = () => {
  return (
    <div className={styles.page}>
      <p className={styles.eyebrow}>Build a study set</p>
      <h1 className={styles.title}>Create a new quiz</h1>
      <p className={styles.subtitle}>
        Start with a title, then add questions to make your set yours.
      </p>
      <QuizForm />
    </div>
  );
};

export default QuizCreate;
